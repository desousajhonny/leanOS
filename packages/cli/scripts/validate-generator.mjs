import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
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
  subareas: ["growth.marketing", "strategy.validation"]
};

await validateWorkspaceFiles();
await validateClientWorkspaceFixture();
await validatePartialAreaSelection();
await validateEngineeringOnlyContext();
await validateGrowthValidationContext();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");

async function validateWorkspaceFiles() {
  const files = createWorkspaceFiles(answers);
  const paths = new Set(files.map((file) => file.path));

  for (const expectedPath of [
    "AGENT.md",
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
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    ".github/leanos/README.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/vscode/README.md"
  ]) {
    assert(paths.has(expectedPath), `Expected generated path missing: ${expectedPath}`);
  }

  for (const forbiddenPath of [
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
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "configure-environments.playbook.md"));
  await assertExists(join(rootDir, "operations", "devops", "playbooks", "define-observability.playbook.md"));
  await assertExists(join(rootDir, "operations", "security", "playbooks", "security-checklist.playbook.md"));
  await assertExists(join(rootDir, "growth", "marketing", "skills", "create-launch-plan.skill.md"));
  await assertExists(join(rootDir, ".github", "agents", "leanos-chief.agent.md"));
  await assertExists(join(rootDir, ".github", "prompts", "start-leanos.prompt.md"));
  await assertExists(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"));
  await assertExists(join(rootDir, ".leanos", "commands", "start-leanos.md"));
  await assertExists(join(rootDir, ".leanos", "vscode", "README.md"));

  assert(result.createdGroups.includes("ai-standard/"), "Expected created groups to mention root AI Standard");
  assert(result.createdGroups.includes("strategy/"), "Expected created groups to mention Strategy");
  assert(result.createdGroups.includes("operations/"), "Expected created groups to mention Operations");
  assert(result.createdGroups.includes("growth/"), "Expected created groups to mention Growth");

  await assertVsCodeIntegration(rootDir);
  await assertInitCommandRules(rootDir);
  await assertRootAgentMutationRules(rootDir);
  await assertOperationalPlaybookSections(rootDir);
  await assertSourceScaffoldSections(rootDir);

  for (const forbiddenPath of [
    ".leanos/departments",
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
    "leanos.yaml",
    "ai-standard/README.md",
    "strategy/product/README.md",
    "operations/core/mvp/README.md",
    "operations/design/roles/README.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    ".leanos/index/routing-map.yaml",
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

  await assertInitialContextCoherence(rootDir, growthValidationAnswers.subareas);
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

async function assertInitCommandRules(rootDir) {
  const startCommand = await readFile(join(rootDir, ".leanos", "commands", "start-leanos.md"), "utf8");
  const requiredSections = ["## Purpose", "## Load First", "## What To Do", "## Allowed Updates", "## Forbidden Updates", "## Confirmation Rule", "## Output"];
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
