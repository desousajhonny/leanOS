import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { exampleAnswers } from "./generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../dist/generators/file-writer.js";
import { generateWorkspace } from "../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../dist/templates/workspace-template.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDir, "..");
const projectRoot = resolve(packageRoot, "..", "..");
const clientWorkspaceFixtureDir = resolve(projectRoot, "examples", "client-workspace");
const clientWorkspaceTreePath = resolve(projectRoot, "examples", "client-workspace-tree.md");

const answers = {
  companyName: "Acme AI",
  productName: "Clinic Assistant AI",
  productStatus: "new-product",
  productType: "b2b-saas",
  description: "An AI receptionist for small clinics.",
  targetUser: "Small clinic owners",
  stage: "idea",
  mode: "solo-founder",
  departments: ["product", "validation", "engineering", "design", "growth"]
};

const partialDepartmentAnswers = {
  ...answers,
  departments: ["product", "engineering"]
};

const engineeringOnlyAnswers = {
  ...answers,
  departments: ["engineering"]
};

const growthValidationAnswers = {
  ...answers,
  departments: ["growth", "validation"]
};

await validateWorkspaceFiles();
await validateClientWorkspaceFixture();
await validatePartialDepartmentSelection();
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
    ".leanos/ai-standard/README.md",
    ".leanos/ai-standard/navigation-chain.md",
    ".leanos/departments/README.md",
    ".leanos/index/README.md",
    ".github/leanos/README.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/vscode/README.md"
  ]) {
    assert(paths.has(expectedPath), `Expected generated path missing: ${expectedPath}`);
  }

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-generator-"));
  const result = await generateWorkspace(rootDir, answers);

  assert(result.writtenPaths.length > 0, "Expected files to be written");
  assert.equal(result.skippedPaths.length, 0, "Fresh generation should not skip files");

  await assertExists(join(rootDir, "AGENT.md"));
  await assertExists(join(rootDir, "leanos.yaml"));
  await assertExists(join(rootDir, ".leanos", "ai-standard", "README.md"));
  await assertExists(join(rootDir, ".leanos", "departments", "engineering", "roles", "senior-developer.role.md"));
  await assertExists(join(rootDir, ".github", "leanos", "README.md"));
  await assertExists(join(rootDir, ".github", "agents", "leanos-chief.agent.md"));
  await assertExists(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"));
  await assertExists(join(rootDir, ".leanos", "vscode", "README.md"));

  assert(result.createdGroups.includes(".github/agents"), "Expected created groups to mention VS Code agents");
  assert(result.createdGroups.includes(".github/prompts"), "Expected created groups to mention VS Code prompts");
  assert(result.createdGroups.includes(".leanos/vscode"), "Expected created groups to mention LeanOS VS Code docs");

  await assertVsCodeIntegration(rootDir);

  for (const forbiddenPath of [".leanos/roles", ".leanos/skills", ".leanos/playbooks"]) {
    assert.equal(await exists(join(rootDir, forbiddenPath)), false, `Legacy primary path should not be generated: ${forbiddenPath}`);
  }

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.equal(yaml.agent.entrypoint, "AGENT.md");
  assert.equal(yaml.agent.navigation_chain.enabled, true);
  assert.equal(yaml.roles.ownership, "department-first");
  assert.equal(yaml.skills.ownership, "department-first");
  assert.equal(yaml.playbooks.ownership, "department-first");

  for (const department of yaml.departments.active) {
    await assertExists(join(rootDir, ".leanos", "departments", department, "README.md"));
  }

  await assertInitialContextCoherence(rootDir, answers.departments);
}

async function validateClientWorkspaceFixture() {
  const requiredPaths = [
    "AGENT.md",
    "leanos.yaml",
    ".leanos/ai-standard/README.md",
    ".leanos/departments/product/README.md",
    ".leanos/index/routing-map.yaml",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/vscode/README.md"
  ];

  for (const requiredPath of requiredPaths) {
    if (!(await exists(resolveFixturePath(requiredPath)))) {
      failOutOfDate([`Missing fixture file: ${requiredPath}`]);
    }
  }

  if (!(await exists(clientWorkspaceTreePath))) {
    failOutOfDate(["Missing fixture tree: examples/client-workspace-tree.md"]);
  }

  const expectedFiles = createWorkspaceFiles(exampleAnswers);
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

async function validatePartialDepartmentSelection() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-partial-"));
  await generateWorkspace(rootDir, partialDepartmentAnswers);

  await assertExists(join(rootDir, ".leanos", "departments", "product", "README.md"));
  await assertExists(join(rootDir, ".leanos", "departments", "engineering", "README.md"));
  assert.equal(await exists(join(rootDir, ".leanos", "departments", "growth", "README.md")), false, "Growth department should not be generated when not active");
  assert.equal(await exists(join(rootDir, ".leanos", "departments", "validation", "README.md")), false, "Validation department should not be generated when not active");
  assert.equal(await exists(join(rootDir, ".leanos", "departments", "design", "README.md")), false, "Design department should not be generated when not active");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.deepEqual(yaml.departments.active, ["product", "engineering"]);
  assert.deepEqual(yaml.workflows.active, ["existing-product-audit", "issue-to-pr"]);
  assert.deepEqual(Object.keys(yaml.roles.active), ["product", "engineering"]);
  assert.equal(yaml.roles.active.growth, undefined);
  assert.equal(yaml.roles.active.validation, undefined);
  assert.equal(yaml.roles.active.design, undefined);

  const rolesIndex = parse(await readFile(join(rootDir, ".leanos", "index", "roles.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "index", "playbooks.yaml"), "utf8"));
  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");

  assert(rolesIndex.roles.some((role) => role.key === "product-strategist"), "Product role should be indexed");
  assert(rolesIndex.roles.some((role) => role.key === "senior-developer"), "Engineering role should be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "growth-lead"), false, "Inactive growth role should not be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "validation-researcher"), false, "Inactive validation role should not be indexed");
  assert.equal(rolesIndex.roles.some((role) => role.key === "ux-lead"), false, "Inactive design role should not be indexed");

  assert.equal(skillsIndex.skills.some((skill) => skill.key === "create-launch-plan"), false, "Inactive growth skill should not be indexed");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "define-assumptions"), false, "Inactive validation skill should not be indexed");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-launch"), false, "Inactive growth playbook should not be indexed");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-validation"), false, "Inactive validation playbook should not be indexed");

  assert.equal(routingMap.routing.strategy, "../departments/product/README.md");
  assert.equal(routingMap.routing.engineering, "../departments/engineering/README.md");
  assert.equal(routingMap.routing.asset_creation, "../ai-standard/README.md");
  assert.equal(routingMap.routing.growth, undefined);
  assert.equal(routingMap.routing.validation, undefined);
  assert.equal(routingMap.routing.ux, undefined);
  assert.equal(activeWorkflow.includes("- new-product-mvp-validation"), false, "Validation workflow should not be active without Validation department");
  assert(nextActions.includes("/define icp"), "Product-compatible next action should remain when Product is active");
  await assertInitialContextCoherence(rootDir, partialDepartmentAnswers.departments);
}

async function validateEngineeringOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-engineering-only-"));
  await generateWorkspace(rootDir, engineeringOnlyAnswers);

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");

  assert.deepEqual(yaml.departments.active, ["engineering"]);
  assert.deepEqual(yaml.workflows.active, ["issue-to-pr"]);
  assert.equal(nextActions.includes("/define icp"), false, "Engineering-only workspace should not suggest Product ICP command");
  assert.equal(nextActions.includes("/define mvp"), false, "Engineering-only workspace should not suggest Product MVP command");
  assert.equal(nextActions.includes("/check coherence"), false, "Engineering-only workspace should not suggest Product coherence command");
  assert(nextActions.includes("/status"), "Engineering-only workspace should start from status");
  assert.equal(activeWorkflow.includes("- new-product-mvp-validation"), false, "Engineering-only workspace should not activate Product + Validation workflow");
  assert.equal(activeWorkflow.includes("- existing-product-audit"), false, "Engineering-only workspace should not activate Product workflow");
  assert.equal(activeWorkflow.includes("- launch-and-learn"), false, "Engineering-only workspace should not activate Growth + Validation workflow");
  assert(activeWorkflow.includes("- issue-to-pr"), "Engineering-only workspace should activate Engineering workflow");
  assert(workspaceSummary.includes("Active departments: engineering"), "Workspace summary should list the active Engineering department");
  await assertInitialContextCoherence(rootDir, engineeringOnlyAnswers.departments);
}

async function validateGrowthValidationContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-growth-validation-"));
  await generateWorkspace(rootDir, growthValidationAnswers);

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "context", "active-workflow.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");
  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));

  assert.deepEqual(yaml.departments.active, ["validation", "growth"]);
  assert.deepEqual(yaml.workflows.active, ["launch-and-learn"]);
  assert.equal(await exists(join(rootDir, ".leanos", "departments", "product", "README.md")), false, "Product department should not be generated when not active");
  assert.equal(await exists(join(rootDir, ".leanos", "departments", "engineering", "README.md")), false, "Engineering department should not be generated when not active");
  assert(activeWorkflow.includes("- launch-and-learn"), "Growth + Validation workspace should activate launch workflow");
  assert.equal(activeWorkflow.includes("- new-product-mvp-validation"), false, "Growth + Validation workspace should not activate Product + Validation workflow");
  assert.equal(activeWorkflow.includes("- existing-product-audit"), false, "Growth + Validation workspace should not activate Product workflow");
  assert.equal(activeWorkflow.includes("- issue-to-pr"), false, "Growth + Validation workspace should not activate Engineering workflow");
  assert.equal(nextActions.includes("/define icp"), false, "Growth + Validation workspace should not suggest Product commands");
  assert.equal(nextActions.includes("/workon issue"), false, "Growth + Validation workspace should not suggest Engineering commands");
  assert(workspaceSummary.includes("Active departments: validation, growth"), "Workspace summary should use active department order from definitions");
  assert.equal(routingMap.routing.growth, "../departments/growth/README.md");
  assert.equal(routingMap.routing.validation, "../departments/validation/README.md");
  assert.equal(routingMap.routing.strategy, undefined);
  assert.equal(routingMap.routing.engineering, undefined);
  await assertInitialContextCoherence(rootDir, growthValidationAnswers.departments);
}

async function assertVsCodeIntegration(rootDir) {
  const agentFile = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const promptFile = await readFile(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"), "utf8");
  const vscodeReadme = await readFile(join(rootDir, ".leanos", "vscode", "README.md"), "utf8");

  assert(agentFile.includes("name: LeanOS Chief"), "LeanOS Chief agent should declare its VS Code name");
  assert(agentFile.includes("AGENT.md"), "LeanOS Chief agent should point to AGENT.md");
  assert(agentFile.includes("leanos.yaml"), "LeanOS Chief agent should point to leanos.yaml");
  assert(agentFile.includes("LeanOS Navigation Chain"), "LeanOS Chief agent should mention the Navigation Chain");
  assert(agentFile.includes("Respect active departments in `leanos.yaml`"), "LeanOS Chief agent should respect active departments");
  assert(agentFile.includes("Do not load missing department paths"), "LeanOS Chief agent should avoid missing department paths");

  for (const expectedLink of [
    "../../AGENT.md",
    "../../leanos.yaml",
    "../../.leanos/context/workspace-summary.md",
    "../../.leanos/context/current-focus.md",
    "../../.leanos/context/next-actions.md",
    "../../.leanos/index/routing-map.yaml"
  ]) {
    assert(promptFile.includes(expectedLink), `LeanOS init prompt should reference ${expectedLink}`);
  }

  assert(promptFile.includes("name: leanos-init"), "LeanOS init prompt should use the safe slash command name");
  assert(promptFile.includes("agent: 'LeanOS Chief'"), "LeanOS init prompt should target LeanOS Chief");
  assert(vscodeReadme.includes(".github/agents/leanos-chief.agent.md"), "VS Code README should document the agent path");
  assert(vscodeReadme.includes("/leanos-init"), "VS Code README should document the safe prompt command");
  assert.equal(await exists(join(rootDir, ".vscode", "settings.json")), false, "Generator should not write VS Code workspace settings");
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

async function assertInitialContextCoherence(rootDir, selectedDepartments) {
  const activeDepartments = new Set(selectedDepartments);
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
    { command: "/define icp", department: "product" },
    { command: "/define mvp", department: "product" },
    { command: "/check coherence", department: "product" },
    { command: "/create roadmap", department: "product" },
    { command: "/create issues", department: "product" },
    { command: "/workon issue", department: "engineering" },
    { command: "/create pr", department: "engineering" },
    { command: "/review pr", department: "engineering" }
  ];

  const workflowRequirements = [
    { workflow: "new-product-mvp-validation", departments: ["product", "validation"] },
    { workflow: "existing-product-audit", departments: ["product"] },
    { workflow: "issue-to-pr", departments: ["engineering"] },
    { workflow: "launch-and-learn", departments: ["growth", "validation"] }
  ];

  for (const requirement of commandRequirements) {
    if (!activeDepartments.has(requirement.department)) {
      assert.equal(
        initialContent.includes(requirement.command),
        false,
        `Initial context should not recommend ${requirement.command} without active ${requirement.department}`
      );
    }
  }

  for (const requirement of workflowRequirements) {
    const workflowAvailable = requirement.departments.every((department) => activeDepartments.has(department));
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
