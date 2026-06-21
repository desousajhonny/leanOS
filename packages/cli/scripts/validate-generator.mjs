import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { createTreeMarkdown, exampleAnswers } from "./generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../dist/generators/file-writer.js";
import { generateWorkspace } from "../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../dist/templates/workspace-template.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDir, "..");
const projectRoot = resolve(packageRoot, "..", "..");
const clientWorkspaceFixtureDir = resolve(projectRoot, "examples", "client-workspace");
const clientWorkspaceTreePath = resolve(projectRoot, "examples", "client-workspace-tree.md");

const allSubareas = [
  "strategy.company",
  "strategy.product",
  "strategy.roadmap",
  "strategy.validation",
  "operations.core",
  "operations.design",
  "operations.engineering",
  "operations.devops",
  "operations.security",
  "growth.customer-experience",
  "growth.marketing",
  "growth.finance"
];

const answers = {
  workspaceMode: "new-product-workspace",
  detectedProject: {
    hasGit: false,
    hasPackageJson: false,
    hasSourceDir: false,
    hasGithubDir: false,
    hasVercelConfig: false
  },
  prepareGithubManagement: true,
  companyName: "Acme AI",
  productName: "Clinic Assistant AI",
  productStatus: "new-product",
  productType: "b2b-saas",
  description: "An AI receptionist for small clinics.",
  targetUser: "Small clinic owners",
  stage: "idea",
  mode: "solo-founder",
  subareas: allSubareas
};

const partialAreaAnswers = {
  ...answers,
  subareas: ["strategy.product", "operations.engineering"]
};

const engineeringOnlyAnswers = {
  ...answers,
  subareas: ["operations.engineering"]
};

const growthValidationAnswers = {
  ...answers,
  prepareGithubManagement: false,
  subareas: ["growth.marketing", "strategy.validation"]
};

const existingProductRepoAnswers = {
  ...answers,
  workspaceMode: "existing-product-repo",
  productStatus: "existing-product",
  stage: "existing-product-with-users",
  detectedProject: {
    hasGit: true,
    hasPackageJson: true,
    hasSourceDir: true,
    hasGithubDir: true,
    hasVercelConfig: true,
    gitRemoteOrigin: "git@github.com:example-org/example-repo.git"
  }
};

await validateWorkspaceFiles();
await validateClientWorkspaceFixture();
await validatePartialAreaSelection();
await validateEngineeringOnlyContext();
await validateGrowthValidationContext();
await validateExistingProductRepoMode();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");

async function validateWorkspaceFiles() {
  const files = createWorkspaceFiles(answers);
  const paths = new Set(files.map((file) => file.path));

  for (const expectedPath of [
    "AGENT.md",
    ".env.example",
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "ai-standard/navigation-chain.md",
    ".leanos/index/areas.yaml",
    ".leanos/index/routing-map.yaml",
    "strategy/AGENT.md",
    "operations/AGENT.md",
    "growth/AGENT.md",
    "strategy/product/README.md",
    "operations/core/mvp/README.md",
    "operations/design/roles/ux-lead.role.md",
    "operations/engineering/playbooks/issue-to-pr.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/roles/github-devops.role.md",
    "operations/devops/skills/configure-github-project.skill.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    ".github/leanos/README.md",
    ".github/leanos/github-settings.example.json",
    ".github/leanos/project-sync.yaml",
    ".github/leanos/sync-state.yaml",
    ".github/leanos/labels.yaml",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/vscode/README.md"
  ]) {
    assert(paths.has(expectedPath), `Expected generated path missing: ${expectedPath}`);
  }

  for (const forbiddenPath of [
    "src",
    "app",
    "pages",
    "package.json",
    "vercel.json",
    ".leanos/departments/README.md",
    ".leanos/ai-standard/README.md",
    "strategy/roles/README.md",
    "operations/skills/README.md",
    "growth/playbooks/README.md",
    "operations/devops/environments.md",
    "operations/devops/deployment.md",
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
    "operations/engineering/test-plan.md"
  ]) {
    assert.equal(paths.has(forbiddenPath), false, `Forbidden generated path should not exist: ${forbiddenPath}`);
  }

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-generator-"));
  const result = await generateWorkspace(rootDir, answers);

  assert(result.writtenPaths.length > 0, "Expected files to be written");
  assert.equal(result.skippedPaths.length, 0, "Fresh generation should not skip files");

  await assertExists(join(rootDir, "AGENT.md"));
  await assertExists(join(rootDir, ".env.example"));
  await assertExists(join(rootDir, ".env.local"));
  await assertExists(join(rootDir, ".gitignore"));
  await assertExists(join(rootDir, "leanos.yaml"));
  await assertExists(join(rootDir, "ai-standard", "README.md"));
  await assertExists(join(rootDir, "strategy", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "AGENT.md"));
  await assertExists(join(rootDir, "growth", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "product", "roles", "product-strategist.role.md"));
  await assertExists(join(rootDir, "operations", "core", "mvp", "README.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "mvp-ux-flow.playbook.md"));
  await assertExists(join(rootDir, "operations", "engineering", "skills", "plan-implementation.skill.md"));
  await assertExists(join(rootDir, "operations", "engineering", "playbooks", "test-planning.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "setup-ci-cd.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "plan-deployment.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "roles", "github-devops.role.md"));
  await assertExists(join(rootDir, "operations", "devops", "skills", "configure-github-project.skill.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "configure-github-project.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "configure-environments.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "define-observability.playbook.md"));
  await assertExists(join(rootDir, "operations", "security", "playbooks", "security-checklist.playbook.md"));
  await assertExists(join(rootDir, "growth", "marketing", "skills", "create-launch-plan.skill.md"));
  await assertExists(join(rootDir, ".github", "agents", "leanos-chief.agent.md"));
  await assertExists(join(rootDir, ".github", "leanos", "github-settings.example.json"));
  await assertExists(join(rootDir, ".github", "leanos", "project-sync.yaml"));
  await assertExists(join(rootDir, ".github", "leanos", "sync-state.yaml"));
  await assertExists(join(rootDir, ".github", "prompts", "start-leanos.prompt.md"));
  await assertExists(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"));
  await assertExists(join(rootDir, ".leanos", "commands", "start-leanos.md"));
  await assertExists(join(rootDir, ".leanos", "vscode", "README.md"));

  assert(result.createdGroups.includes("ai-standard/"), "Expected created groups to mention root AI Standard");
  assert(result.createdGroups.includes("strategy/"), "Expected created groups to mention Strategy");
  assert(result.createdGroups.includes("operations/"), "Expected created groups to mention Operations");
  assert(result.createdGroups.includes("growth/"), "Expected created groups to mention Growth");
  assert(result.createdGroups.includes(".github/leanos"), "Expected created groups to mention GitHub LeanOS support files");

  await assertVsCodeIntegration(rootDir);
  await assertGitHubReadiness(rootDir);
  await assertInitCommandRules(rootDir);
  await assertRootAgentMutationRules(rootDir);
  await assertOperationalPlaybookSections(rootDir);
  await assertSourceScaffoldSections(rootDir);

  for (const forbiddenPath of [
    ".leanos/departments",
    "src",
    "app",
    "pages",
    "package.json",
    "vercel.json",
    ".leanos/ai-standard",
    "strategy/roles",
    "strategy/skills",
    "strategy/playbooks",
    "operations/roles",
    "operations/skills",
    "operations/playbooks",
    "growth/roles",
    "growth/skills",
    "growth/playbooks",
    "operations/devops/environments.md",
    "operations/devops/deployment.md",
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
    "operations/engineering/test-plan.md"
  ]) {
    assert.equal(await exists(join(rootDir, forbiddenPath)), false, `Forbidden path should not be generated: ${forbiddenPath}`);
  }

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.equal(yaml.agent.entrypoint, "AGENT.md");
  assert.equal(yaml.agent.navigation_chain.enabled, true);
  assert.equal(yaml.workspace.mode, "new-product-workspace");
  assert.equal(yaml.workspace.product_code_policy, "do_not_create_app_code_during_initial_setup");
  assert.equal(yaml.github.status, "pending_user_token");
  assert.equal(yaml.github.project_management, "prepared");
  assert.equal(yaml.agent.navigation_chain.doc, "ai-standard/navigation-chain.md");
  assert.equal(yaml.ai_standard.path, "ai-standard/README.md");
  assert.equal(yaml.roles.ownership, "area-first");
  assert.equal(yaml.skills.ownership, "area-first");
  assert.equal(yaml.playbooks.ownership, "area-first");
  assert.deepEqual(yaml.departments.active, ["strategy", "operations", "growth"]);

  for (const subarea of yaml.subareas.active) {
    await assertExists(join(rootDir, subarea.path));
  }

  await assertIndexPathsExist(rootDir);
  await assertInitialContextCoherence(rootDir, answers.subareas);
}

async function validateClientWorkspaceFixture() {
  const requiredPaths = [
    "AGENT.md",
    ".env.example",
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "strategy/product/README.md",
    "operations/core/mvp/README.md",
    "operations/design/roles/README.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/roles/github-devops.role.md",
    "operations/devops/skills/configure-github-project.skill.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    ".leanos/index/routing-map.yaml",
    ".github/leanos/github-settings.example.json",
    ".github/leanos/project-sync.yaml",
    ".github/leanos/sync-state.yaml",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/vscode/README.md"
  ];

  for (const requiredPath of requiredPaths) {
    if (!(await exists(resolveFixturePath(requiredPath)))) {
      failOutOfDate([`Missing fixture file: ${requiredPath}`]);
    }
  }

  for (const forbiddenPath of [
    ".leanos/departments",
    "src",
    "app",
    "pages",
    "package.json",
    "vercel.json",
    ".leanos/ai-standard",
    "operations/devops/environments.md",
    "operations/devops/deployment.md",
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
    "operations/engineering/test-plan.md"
  ]) {
    if (await exists(resolveFixturePath(forbiddenPath))) {
      failOutOfDate([`Forbidden fixture path exists: ${forbiddenPath}`]);
    }
  }

  if (!(await exists(clientWorkspaceTreePath))) {
    failOutOfDate(["Missing fixture tree: examples/client-workspace-tree.md"]);
  }

  const expectedFiles = createWorkspaceFiles(exampleAnswers);
  const actualTreeContent = await readFile(clientWorkspaceTreePath, "utf8");
  const expectedTreeContent = ensureTrailingNewline(createTreeMarkdown(expectedFiles));

  if (actualTreeContent !== expectedTreeContent) {
    failOutOfDate(["Changed fixture tree: examples/client-workspace-tree.md"]);
  }

  const expectedPaths = expectedFiles.map((file) => file.path).sort();
  const actualPaths = (await listFiles(clientWorkspaceFixtureDir)).sort();

  const expectedPathSet = new Set(expectedPaths);
  const actualPathSet = new Set(actualPaths);
  const missingPaths = expectedPaths.filter((path) => !actualPathSet.has(path));
  const extraPaths = actualPaths.filter((path) => !expectedPathSet.has(path));

  if (missingPaths.length > 0 || extraPaths.length > 0) {
    failOutOfDate([
      ...formatPathDiff("Missing", missingPaths),
      ...formatPathDiff("Extra", extraPaths)
    ]);
  }

  const changedPaths = [];

  for (const file of expectedFiles) {
    const actualContent = await readFile(resolveFixturePath(file.path), "utf8");
    const expectedContent = ensureTrailingNewline(file.content);

    if (actualContent !== expectedContent) {
      changedPaths.push(file.path);
    }
  }

  if (changedPaths.length > 0) {
    failOutOfDate(formatPathDiff("Changed", changedPaths));
  }
}

async function validatePartialAreaSelection() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-partial-"));
  await generateWorkspace(rootDir, partialAreaAnswers);

  await assertExists(join(rootDir, "strategy", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "product", "README.md"));
  await assertExists(join(rootDir, "operations", "engineering", "README.md"));
  assert.equal(await exists(join(rootDir, "growth", "AGENT.md")), false, "Growth department should not be generated when no Growth area is active");
  assert.equal(await exists(join(rootDir, "strategy", "validation", "README.md")), false, "Inactive validation area should not be generated");
  assert.equal(await exists(join(rootDir, "operations", "design", "README.md")), false, "Inactive design area should not be generated");
  assert.equal(await exists(join(rootDir, "operations", "core", "README.md")), false, "Inactive core area should not be generated");
  assert.equal(await exists(join(rootDir, "strategy", "roles")), false, "Root Strategy should not own roles directly");
  assert.equal(await exists(join(rootDir, "operations", "playbooks")), false, "Root Operations should not own playbooks directly");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.deepEqual(yaml.departments.active, ["strategy", "operations"]);
  assert.deepEqual(yaml.workflows.active, []);
  assert.deepEqual(Object.keys(yaml.roles.active), ["strategy.product", "operations.engineering"]);
  assert.equal(yaml.roles.active["growth.marketing"], undefined);
  assert.equal(yaml.roles.active["strategy.validation"], undefined);
  assert.equal(yaml.roles.active["operations.design"], undefined);

  const rolesIndex = parse(await readFile(join(rootDir, ".leanos", "index", "roles.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "index", "playbooks.yaml"), "utf8"));
  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");

  assert(rolesIndex.roles.some((role) => role.key === "product-strategist"), "Product role should be indexed");
  assert(rolesIndex.roles.some((role) => role.key === "senior-developer"), "Engineering role should be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "growth-lead"), false, "Inactive marketing role should not be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "validation-researcher"), false, "Inactive validation role should not be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "ux-lead"), false, "Inactive design role should not be indexed");

  assert.equal(skillsIndex.skills.some((skill) => skill.key === "create-launch-plan"), false, "Inactive marketing skill should not be indexed");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-validation"), false, "Inactive validation playbook should not be indexed");

  assert.equal(routingMap.routing.areas.product, "../../strategy/product/README.md");
  assert.equal(routingMap.routing.areas.engineering, "../../operations/engineering/README.md");
  assert.equal(routingMap.routing.asset_creation, "../../ai-standard/README.md");
  assert.equal(routingMap.routing.areas.marketing, undefined);
  assert.equal(routingMap.routing.areas.validation, undefined);
  assert.equal(routingMap.routing.areas.design, undefined);
  assert.equal(activeWorkflow.includes("- new-product-mvp-validation"), false, "Product + Engineering alone should not activate Product + Validation + Core workflow");
  assert(nextActions.includes("/define icp"), "Product-compatible next action should remain when Product is active");
  assert.equal(nextActions.includes("/define mvp"), false, "Core command should not appear when Core is inactive");

  await assertIndexPathsExist(rootDir);
  await assertInitialContextCoherence(rootDir, partialAreaAnswers.subareas);
}

async function validateEngineeringOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-engineering-only-"));
  await generateWorkspace(rootDir, engineeringOnlyAnswers);

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");

  assert.deepEqual(yaml.departments.active, ["operations"]);
  assert.deepEqual(yaml.workflows.active, []);
  assert.equal(await exists(join(rootDir, "strategy")), false, "Strategy should not be generated when no Strategy area is active");
  assert.equal(await exists(join(rootDir, "growth")), false, "Growth should not be generated when no Growth area is active");
  assert.equal(nextActions.includes("/define icp"), false, "Engineering-only workspace should not suggest Product ICP command");
  assert.equal(nextActions.includes("/define mvp"), false, "Engineering-only workspace should not suggest Core MVP command");
  assert.equal(nextActions.includes("/check coherence"), false, "Engineering-only workspace should not suggest Product coherence command");
  assert(nextActions.includes("/workon issue"), "Engineering-only workspace should suggest Engineering issue work");
  assert.equal(activeWorkflow.includes("- issue-to-pr"), false, "Engineering-only workspace should not activate issue-to-pr without Core");
  assert(workspaceSummary.includes("Active departments: operations"), "Workspace summary should list Operations");
  assert(workspaceSummary.includes("Active areas: operations.engineering"), "Workspace summary should list the active Engineering area");

  await assertInitialContextCoherence(rootDir, engineeringOnlyAnswers.subareas);
}

async function validateGrowthValidationContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-growth-validation-"));
  await generateWorkspace(rootDir, growthValidationAnswers);

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");
  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));

  assert.deepEqual(yaml.departments.active, ["strategy", "growth"]);
  assert.deepEqual(yaml.workflows.active, ["launch-and-learn"]);
  assert.equal(await exists(join(rootDir, "strategy", "product", "README.md")), false, "Product area should not be generated when not active");
  assert.equal(await exists(join(rootDir, "operations")), false, "Operations department should not be generated when not active");
  assert(activeWorkflow.includes("- launch-and-learn"), "Growth Marketing + Strategy Validation should activate launch workflow");
  assert.equal(activeWorkflow.includes("- new-product-mvp-validation"), false, "Growth + Validation workspace should not activate Product + Validation + Core workflow");
  assert.equal(activeWorkflow.includes("- issue-to-pr"), false, "Growth + Validation workspace should not activate Engineering workflow");
  assert.equal(nextActions.includes("/define icp"), false, "Growth + Validation workspace should not suggest Product commands");
  assert.equal(nextActions.includes("/workon issue"), false, "Growth + Validation workspace should not suggest Engineering commands");
  assert(workspaceSummary.includes("Active departments: strategy, growth"), "Workspace summary should use active department order from definitions");
  assert.equal(routingMap.routing.areas.marketing, "../../growth/marketing/README.md");
  assert.equal(routingMap.routing.areas.validation, "../../strategy/validation/README.md");
  assert.equal(routingMap.routing.areas.product, undefined);
  assert.equal(routingMap.routing.areas.engineering, undefined);
  assert.equal(await exists(join(rootDir, ".env.local")), false, "Workspace should not generate .env.local when GitHub management was not requested");

  await assertInitialContextCoherence(rootDir, growthValidationAnswers.subareas);
}

async function validateExistingProductRepoMode() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-existing-product-"));
  await mkdir(join(rootDir, "src"), { recursive: true });
  await mkdir(join(rootDir, ".github", "workflows"), { recursive: true });
  await writeFile(join(rootDir, "README.md"), "Existing product README\n", "utf8");
  await writeFile(join(rootDir, "package.json"), "{\"name\":\"existing-product\"}\n", "utf8");
  await writeFile(join(rootDir, "src", "index.ts"), "export const existing = true;\n", "utf8");
  await writeFile(join(rootDir, "vercel.json"), "{\"framework\":\"nextjs\"}\n", "utf8");
  await writeFile(join(rootDir, ".github", "workflows", "existing.yml"), "name: Existing\n", "utf8");

  const result = await generateWorkspace(rootDir, existingProductRepoAnswers, {
    overwriteExisting: false,
    mode: "missing-only"
  });

  assert(result.skippedPaths.includes("README.md"), "Existing README should be skipped in missing-only mode");
  assert.equal(await readFile(join(rootDir, "README.md"), "utf8"), "Existing product README\n", "Existing README should be preserved");
  assert.equal(await readFile(join(rootDir, "package.json"), "utf8"), "{\"name\":\"existing-product\"}\n", "Existing package.json should be preserved");
  assert.equal(await readFile(join(rootDir, "src", "index.ts"), "utf8"), "export const existing = true;\n", "Existing source code should be preserved");
  assert.equal(await readFile(join(rootDir, "vercel.json"), "utf8"), "{\"framework\":\"nextjs\"}\n", "Existing Vercel config should be preserved");
  assert.equal(await readFile(join(rootDir, ".github", "workflows", "existing.yml"), "utf8"), "name: Existing\n", "Existing GitHub workflow should be preserved");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const projectSync = parse(await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8"));

  assert.equal(yaml.workspace.mode, "existing-product-repo");
  assert.equal(yaml.workspace.product_code_policy, "preserve_existing_product_code");
  assert.equal(yaml.workspace.detected_project.has_git, true);
  assert.equal(yaml.workspace.detected_project.has_package_json, true);
  assert.equal(yaml.workspace.detected_project.has_source_dir, true);
  assert.equal(yaml.workspace.detected_project.has_github_dir, true);
  assert.equal(yaml.workspace.detected_project.has_vercel_config, true);
  assert.equal(projectSync.github.owner, "example-org");
  assert.equal(projectSync.github.repository, "example-repo");
  assert.equal(await exists(join(rootDir, ".env.local")), true, "Existing repo should generate .env.local when GitHub management is requested and the file is missing");
  assert(workspaceSummary.includes("LeanOS is installed as an operating layer over an existing product repository"), "Existing repo summary should describe LeanOS as an operating layer");
  assert(nextActions.includes("capture current product and codebase context"), "Existing repo next actions should start with product/codebase context intake");
}

async function assertVsCodeIntegration(rootDir) {
  const agentFile = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const startPromptFile = await readFile(join(rootDir, ".github", "prompts", "start-leanos.prompt.md"), "utf8");
  const aliasPromptFile = await readFile(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"), "utf8");
  const vscodeReadme = await readFile(join(rootDir, ".leanos", "vscode", "README.md"), "utf8");

  assert(agentFile.includes("name: LeanOS Chief"), "LeanOS Chief agent should declare its VS Code name");
  assert(agentFile.includes("AGENT.md"), "LeanOS Chief agent should point to AGENT.md");
  assert(agentFile.includes("leanos.yaml"), "LeanOS Chief agent should point to leanos.yaml");
  assert(agentFile.includes("LeanOS Navigation Chain"), "LeanOS Chief agent should mention the Navigation Chain");
  assert(agentFile.includes("Respect active departments and areas in `leanos.yaml`"), "LeanOS Chief agent should respect active departments and areas");
  assert(agentFile.includes("Do not load missing area paths"), "LeanOS Chief agent should avoid missing area paths");
  assert(agentFile.includes("propose-first mode"), "LeanOS Chief agent should use propose-first mode during init");
  assert(agentFile.includes("Do not enrich roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/`"), "LeanOS Chief agent should protect operating assets during init");

  for (const expectedLink of [
    "../../AGENT.md",
    "../../leanos.yaml",
    "../../.leanos/commands/start-leanos.md",
    "../../.leanos/context/workspace-summary.md",
    "../../.leanos/context/current-focus.md",
    "../../.leanos/context/next-actions.md",
    "../../.leanos/index/routing-map.yaml"
  ]) {
    assert(startPromptFile.includes(expectedLink), `LeanOS start prompt should reference ${expectedLink}`);
    assert(aliasPromptFile.includes(expectedLink), `LeanOS init alias prompt should reference ${expectedLink}`);
  }

  assert(startPromptFile.includes("name: start-leanos"), "LeanOS start prompt should use the primary slash command name");
  assert(startPromptFile.includes("agent: 'LeanOS Chief'"), "LeanOS start prompt should target LeanOS Chief");
  assert(startPromptFile.includes("Then follow `.leanos/commands/start-leanos.md`"), "LeanOS start prompt should defer to the command file");
  assert(startPromptFile.includes("Ask the Required Founder Interview questions only when the loaded context does not already answer them"), "LeanOS start prompt should avoid duplicate founder questions");
  assert(startPromptFile.includes("Use propose-first mode"), "LeanOS start prompt should use propose-first mode");
  assert(startPromptFile.includes("Write only after explicit user confirmation"), "LeanOS start prompt should require confirmation before writes");
  assert(startPromptFile.includes("Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/`, `.github/`"), "LeanOS start prompt should protect operating assets");
  assert(aliasPromptFile.includes("name: leanos-init"), "LeanOS init alias prompt should keep the legacy slash command name");
  assert(aliasPromptFile.includes("Prefer `/start-leanos`"), "LeanOS init alias prompt should point users to /start-leanos");
  assert(vscodeReadme.includes(".github/agents/leanos-chief.agent.md"), "VS Code README should document the agent path");
  assert(vscodeReadme.includes("/start-leanos"), "VS Code README should document the primary start command");
  assert(vscodeReadme.includes("/leanos-init"), "VS Code README should document the legacy alias command");
  assert.equal(await exists(join(rootDir, ".vscode", "settings.json")), false, "Generator should not write VS Code workspace settings");
}

async function assertGitHubReadiness(rootDir) {
  const envExample = await readFile(join(rootDir, ".env.example"), "utf8");
  const envLocal = await readFile(join(rootDir, ".env.local"), "utf8");
  const gitignore = await readFile(join(rootDir, ".gitignore"), "utf8");
  const settingsExample = await readFile(join(rootDir, ".github", "leanos", "github-settings.example.json"), "utf8");
  const projectSync = await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8");
  const syncState = await readFile(join(rootDir, ".github", "leanos", "sync-state.yaml"), "utf8");
  const labels = await readFile(join(rootDir, ".github", "leanos", "labels.yaml"), "utf8");
  const githubReadme = await readFile(join(rootDir, ".github", "leanos", "README.md"), "utf8");
  const githubRole = await readFile(join(rootDir, "operations", "devops", "roles", "github-devops.role.md"), "utf8");
  const githubSkill = await readFile(join(rootDir, "operations", "devops", "skills", "configure-github-project.skill.md"), "utf8");
  const githubPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "configure-github-project.playbook.md"), "utf8");
  const settings = JSON.parse(settingsExample);
  const projectSyncYaml = parse(projectSync);

  assert(envExample.includes("LEANOS_GITHUB_TOKEN="), ".env.example should expose LEANOS_GITHUB_TOKEN placeholder");
  assert(envExample.includes("Optional. LeanOS does not need this for /start-leanos"), ".env.example should explain that GitHub token setup is optional");
  assert(envExample.includes("Do not commit real tokens"), ".env.example should warn against committing tokens");
  assert(envLocal.includes("Local only. Do not commit."), ".env.local should be clearly local-only");
  assert(envLocal.includes("LEANOS_GITHUB_TOKEN="), ".env.local should include LEANOS_GITHUB_TOKEN placeholder");
  assert(envLocal.includes("GITHUB_TOKEN="), ".env.local should include GITHUB_TOKEN placeholder");
  assert(gitignore.includes(".env"), ".gitignore should ignore .env");
  assert(gitignore.includes(".env.local"), ".gitignore should ignore .env.local");
  assert(gitignore.includes(".env.*.local"), ".gitignore should ignore local env variants");
  assert(gitignore.includes(".vercel/"), ".gitignore should ignore Vercel local metadata");
  assert.equal(settings.security.store_token_in_workspace, false, "GitHub settings example should forbid token storage");
  assert.equal(settingsExample.includes('"token":'), false, "GitHub settings example should not include a token value field");
  assert(settingsExample.includes("env:LEANOS_GITHUB_TOKEN"), "GitHub settings example should document LEANOS_GITHUB_TOKEN as a token source");
  assert.equal(projectSyncYaml.github.status, "pending_user_token", "GitHub project sync should wait for a user token when management is prepared");
  assert.equal(projectSyncYaml.github.project_sync.status, "pending_configuration", "GitHub project sync should record pending configuration when management is prepared");
  assert.equal(projectSyncYaml.github.project_sync.enabled, false, "GitHub project sync should start disabled");
  assert.equal(projectSyncYaml.github.rules.never_store_token, true, "GitHub project sync should forbid token storage");
  assert.equal(projectSyncYaml.github.rules.dry_run_before_remote_write, true, "GitHub project sync should require dry-run before remote writes");
  assert.equal(projectSyncYaml.github.rules.require_confirmation_before_api_write, true, "GitHub project sync should require confirmation before API writes");
  assert(syncState.includes("must never store tokens"), "GitHub sync state should warn against storing tokens");
  assert(labels.includes("name: epic"), "GitHub labels should include epic");
  assert(labels.includes("name: sub-issue"), "GitHub labels should include sub-issue");
  assert(githubReadme.includes("Route GitHub setup through `../../operations/devops/README.md`"), "GitHub README should route setup through DevOps when active");
  assert(githubReadme.includes("Vercel readiness is guidance-only"), "GitHub README should document Vercel readiness without execution");
  assert(githubRole.includes("Guide safe GitHub repository, Project, labels and sync configuration"), "GitHub DevOps role should describe GitHub setup ownership");
  assert(githubSkill.includes("without storing secrets"), "GitHub setup skill should protect secrets");
  assert(githubPlaybook.includes("Confirm token source without asking the user to paste secrets into files"), "GitHub setup playbook should protect token handling");
  assert(githubPlaybook.includes("Propose the project-sync update before writing"), "GitHub setup playbook should require propose-first updates");
  assert(githubPlaybook.includes("do not create `.vercel/`, run `vercel link` or add `vercel.json`"), "GitHub setup playbook should keep Vercel readiness guidance-only");
}

async function assertInitCommandRules(rootDir) {
  const startCommand = await readFile(join(rootDir, ".leanos", "commands", "start-leanos.md"), "utf8");
  const requiredSections = [
    "## Purpose",
    "## Load First",
    "## What To Do",
    "## Required Founder Interview",
    "## Optional Founder Interview",
    "## Response Mapping",
    "## Fact and Uncertainty Rules",
    "## Write Protocol",
    "## Allowed Updates",
    "## Forbidden Updates",
    "## Confirmation Rule",
    "## Output"
  ];
  const forbiddenTargets = ["`roles/`", "`skills/`", "`playbooks/`", "`workflows/`", "`../../ai-standard/`", "`../commands/`", "`../../.github/`"];
  const strategyTargets = [
    "../../strategy/company/profile.md",
    "../../strategy/product/brief.md",
    "../../strategy/validation/assumptions.md",
    "../../strategy/roadmap/roadmap.md"
  ];

  for (const section of requiredSections) {
    assert(startCommand.includes(section), `start-leanos.md should include ${section}`);
  }

  for (const target of forbiddenTargets) {
    assert(startCommand.includes(target), `start-leanos.md should forbid ${target}`);
  }

  for (const target of strategyTargets) {
    assert(startCommand.includes(target), `start-leanos.md should mention Strategy source-of-truth target ${target}`);
  }

  assert(startCommand.includes("# /start-leanos"), "start-leanos.md should document the primary command");
  assert(startCommand.includes("Ask only what is missing"), "start-leanos.md should avoid asking already-known founder questions");
  assert(startCommand.includes("What is the riskiest assumption right now?"), "start-leanos.md should include validation-oriented founder interview questions");
  assert(startCommand.includes("Map founder responses to source-of-truth files only when the matching area is active"), "start-leanos.md should map answers only to active areas");
  assert(startCommand.includes("Do not turn assumptions into source-of-truth facts"), "start-leanos.md should protect facts from assumptions");
  assert(startCommand.includes("Put unknowns into `## Open Questions`"), "start-leanos.md should preserve unknowns as open questions");
  assert(startCommand.includes("Before writing, show a proposed change plan"), "start-leanos.md should require a pre-write change plan");
  assert(startCommand.includes("Never write files during init until the user explicitly confirms"), "start-leanos.md should require explicit confirmation before writes");
  assert(startCommand.includes("Operations or Growth area files unless the user explicitly asks after init"), "start-leanos.md should keep Operations/Growth out of init scope");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "init-leanos.md")), false, "init-leanos.md should not be generated as an internal command");
}

async function assertRootAgentMutationRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "agent", "operating-rules.md"), "utf8");

  assert(rootAgent.includes("## Workspace Mutation Rules"), "AGENT.md should include Workspace Mutation Rules");
  assert(rootAgent.includes("## Command Handling"), "AGENT.md should include portable command handling");
  assert(rootAgent.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "AGENT.md should make commands model-agnostic");
  assert(rootAgent.includes("`.leanos/commands/start-leanos.md`"), "AGENT.md should map /start-leanos to its command file");
  assert(rootAgent.includes("When the user invokes legacy `/leanos-init`, treat it as `/start-leanos`"), "AGENT.md should document the legacy init alias");
  assert(rootAgent.includes("Source-of-truth files describe what the company knows"), "AGENT.md should explain source-of-truth files");
  assert(rootAgent.includes("Operating assets describe how LeanOS works"), "AGENT.md should explain operating assets");
  assert(rootAgent.includes("Do not enrich roles, skills, playbooks, workflows, commands or `ai-standard/`"), "AGENT.md should protect operating assets during init");
  assert(rootAgent.includes("`/create role`, `/create skill` or `/create playbook`"), "AGENT.md should route operating asset customization to creation commands");
  assert(operatingRules.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "operating rules should make commands model-agnostic");
  assert(operatingRules.includes("For `/start-leanos`, load `../commands/start-leanos.md` before acting"), "operating rules should map /start-leanos to its command file");
  assert(operatingRules.includes("During `/start-leanos`, propose source-of-truth updates first"), "operating rules should require propose-first start");
  assert(operatingRules.includes("Treat `/leanos-init` as a legacy alias for `/start-leanos`"), "operating rules should document the legacy init alias");
  assert(operatingRules.includes("Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init"), "operating rules should protect operating assets during init");
}

async function assertOperationalPlaybookSections(rootDir) {
  const playbooks = [
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md"
  ];
  const requiredSections = ["## Purpose", "## Inputs", "## Process", "## Output", "## Files to Update", "## Navigation"];

  for (const playbook of playbooks) {
    const content = await readFile(join(rootDir, playbook), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${playbook} should include ${section}`);
    }
  }
}

async function assertSourceScaffoldSections(rootDir) {
  const scaffoldFiles = [
    "strategy/company/profile.md",
    "strategy/company/decision-log.md",
    "strategy/product/brief.md",
    "strategy/company/mission.md",
    "strategy/product/icp.md",
    "strategy/roadmap/roadmap.md",
    "strategy/validation/assumptions.md",
    "strategy/validation/learning-log.md",
    "operations/core/overview.md",
    "operations/core/technical-decisions.md",
    "operations/core/mvp/scope.md",
    "operations/core/mvp/release-checklist.md",
    "operations/design/screen-specs.md",
    "operations/design/ux-decisions.md",
    "operations/engineering/implementation-notes.md",
    "operations/engineering/pr-log.md",
    "operations/security/threat-model.md",
    "growth/customer-experience/customer-feedback.md",
    "growth/marketing/landing-page.md",
    "growth/finance/pricing.md"
  ];
  const requiredSections = ["## Purpose", "## Current State", "## Decisions", "## Open Questions", "## Next Update"];

  for (const scaffoldFile of scaffoldFiles) {
    const content = await readFile(join(rootDir, scaffoldFile), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${scaffoldFile} should include ${section}`);
    }
  }
}

async function validateWriterSkipsExistingFiles() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-writer-skip-"));
  await writeFile(join(rootDir, "README.md"), "original\n", "utf8");

  const result = await writeWorkspaceFiles(
    rootDir,
    [
      { path: "README.md", content: "updated" },
      { path: "AGENT.md", content: "created" }
    ],
    { overwriteExisting: false }
  );

  assert.deepEqual(result.skippedPaths, ["README.md"]);
  assert(result.writtenPaths.includes("AGENT.md"), "Expected AGENT.md to be written");
  assert.equal(await readFile(join(rootDir, "README.md"), "utf8"), "original\n");
}

async function validateWriterOverwritesWhenAllowed() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-writer-overwrite-"));
  await writeFile(join(rootDir, "README.md"), "original\n", "utf8");

  const result = await writeWorkspaceFiles(
    rootDir,
    [{ path: "README.md", content: "updated" }],
    { overwriteExisting: true }
  );

  assert.deepEqual(result.skippedPaths, []);
  assert.deepEqual(result.writtenPaths, ["README.md"]);
  assert.equal(await readFile(join(rootDir, "README.md"), "utf8"), "updated\n");
}

async function assertIndexPathsExist(rootDir) {
  const indexRoot = join(rootDir, ".leanos", "index");
  const files = ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml"];

  for (const file of files) {
    await assertExists(join(indexRoot, file));
  }

  const documents = await Promise.all(files.map(async (file) => parse(await readFile(join(indexRoot, file), "utf8"))));
  const paths = [];

  for (const document of documents) {
    collectPathStrings(document, paths);
  }

  for (const path of paths) {
    if (!path.startsWith("../")) continue;
    await assertExists(resolve(indexRoot, path));
  }
}

function collectPathStrings(value, paths) {
  if (Array.isArray(value)) {
    for (const item of value) collectPathStrings(item, paths);
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "path" && typeof child === "string") {
        paths.push(child);
        continue;
      }
      collectPathStrings(child, paths);
    }
    return;
  }

  if (typeof value === "string" && value.startsWith("../")) {
    paths.push(value);
  }
}

async function assertInitialContextCoherence(rootDir, selectedSubareas) {
  const activeSubareas = new Set(selectedSubareas);
  const initialFiles = [
    "README.md",
    "AGENT.md",
    join(".leanos", "context", "current-focus.md"),
    join(".leanos", "context", "next-actions.md"),
    join(".leanos", "context", "active-workflow.md")
  ];
  const initialContent = (
    await Promise.all(initialFiles.map((file) => readFile(join(rootDir, file), "utf8")))
  ).join("\n");
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");

  const commandRequirements = [
    { command: "/define icp", area: "strategy.product" },
    { command: "/define mvp", area: "operations.core" },
    { command: "/check coherence", area: "strategy.product" },
    { command: "/create roadmap", area: "strategy.roadmap" },
    { command: "/create issues", area: "operations.core" },
    { command: "/workon issue", area: "operations.engineering" },
    { command: "/create pr", area: "operations.engineering" },
    { command: "/review pr", area: "operations.engineering" }
  ];

  const workflowRequirements = [
    { workflow: "new-product-mvp-validation", subareas: ["strategy.product", "strategy.validation", "operations.core"] },
    { workflow: "issue-to-pr", subareas: ["operations.core", "operations.engineering"] },
    { workflow: "launch-and-learn", subareas: ["growth.marketing", "strategy.validation"] }
  ];

  for (const requirement of commandRequirements) {
    if (!activeSubareas.has(requirement.area)) {
      assert.equal(
        initialContent.includes(requirement.command),
        false,
        `Initial context should not recommend ${requirement.command} without active ${requirement.area}`
      );
    }
  }

  for (const requirement of workflowRequirements) {
    const workflowAvailable = requirement.subareas.every((subarea) => activeSubareas.has(subarea));
    if (!workflowAvailable) {
      assert.equal(
        activeWorkflow.includes(`- ${requirement.workflow}`),
        false,
        `Active workflow context should not list unavailable workflow ${requirement.workflow}`
      );
    }
  }
}

async function listFiles(rootDir, currentDir = rootDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const entryPath = join(currentDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(rootDir, entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(relative(rootDir, entryPath).split("\\").join("/"));
    }
  }

  return files;
}

function resolveFixturePath(path) {
  const targetPath = resolve(clientWorkspaceFixtureDir, path);
  assertPathInside(clientWorkspaceFixtureDir, targetPath);
  return targetPath;
}

function assertPathInside(parentPath, childPath) {
  const childRelativePath = relative(parentPath, childPath);

  if (childRelativePath === "" || (!childRelativePath.startsWith("..") && !isAbsolute(childRelativePath))) {
    return;
  }

  throw new Error(`Unexpected fixture path outside ${parentPath}: ${childPath}`);
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function formatPathDiff(label, paths) {
  if (paths.length === 0) {
    return [];
  }

  const shownPaths = paths.slice(0, 20).map((path) => `${label}: ${path}`);
  const hiddenCount = paths.length - shownPaths.length;

  return hiddenCount > 0 ? [...shownPaths, `${label}: ...and ${hiddenCount} more`] : shownPaths;
}

function failOutOfDate(details) {
  throw new Error([
    "examples/client-workspace is out of date. Run npm run generate:client-workspace.",
    ...details
  ].join("\n"));
}

async function assertExists(path) {
  assert.equal(await exists(path), true, `Expected path to exist: ${path}`);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
