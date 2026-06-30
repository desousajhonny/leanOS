import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";
import { createTreeMarkdown, exampleAnswers } from "../generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../../dist/generators/file-writer.js";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import {
  answers,
  clientWorkspaceFixtureDir,
  clientWorkspaceTreePath,
  designOnlyAnswers,
  engineeringOnlyAnswers,
  execFileAsync,
  existingProductRepoAnswers,
  growthValidationAnswers,
  initialStrategySubareas,
  packageRoot,
  partialAreaAnswers,
  projectRoot
} from "./fixtures.mjs";
import {
  assertExists,
  assertPlaybookFormat,
  assertRoleFormat,
  assertSkillFormat,
  ensureTrailingNewline,
  failOutOfDate,
  formatPathDiff
} from "./assertions.mjs";
import {
  assertIndexPathsExist,
  assertInitialContextCoherence,
  assertPathInside,
  collectPathStrings,
  exists,
  isInitialStrategyWorkspacePath,
  listFiles,
  resolveFixturePath
} from "./path-utils.mjs";
import { assertWorkflowContract, assertCommandContract } from "./contracts.mjs";
import {
  assertAiStandardAssetTaxonomy,
  assertAiStandardChecklists,
  assertAiStandardExamples,
  assertAiStandardInstructions,
  assertAiStandardReadiness,
  assertAiStandardTemplates,
  assertNoOldAiStandardReferences
} from "./ai-standard.mjs";
import {
  assertBusinessAreaPattern,
  assertDesignFoundation,
  assertDevOpsAreaPattern,
  assertEngineeringAreaPattern,
  assertGrowthAreaPattern,
  assertMvpValidationScopeSections,
  assertNaturalStartupRules,
  assertOperationalPlaybookSections,
  assertProductAreaPattern,
  assertProductOpsPrdSections,
  assertRoadmapAreaPattern,
  assertRootAgentMutationRules,
  assertSecurityAreaPattern,
  assertSourceScaffoldSections,
  assertTraceDiagnostics
} from "./areas.mjs";

export async function validateProductOpsActivation() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-product-ops-activation-"));
  await generateWorkspace(rootDir, answers);

  const result = await activateWorkspaceArea(rootDir, "operations.product-ops");

  assert(result.writtenPaths.length > 0, "Product Ops activation should write files");
  assert.equal(result.activatedArea, "operations.product-ops");
  assert.equal(result.activatedDepartment, "operations");
  assert(result.writtenPaths.includes("clinic-assistant-ai-os/operations/AGENT.md"), "Product Ops activation should create Operations");
  assert(result.writtenPaths.includes("clinic-assistant-ai-os/operations/product-ops/AGENT.md"), "Product Ops activation should create Product Ops");
  assert.equal(result.writtenPaths.some((writtenPath) => writtenPath.startsWith(".leanos/commands/")), false, "Activation should not create slash-command files");
  assert(result.writtenPaths.includes("leanos.yaml"), "Product Ops activation should update leanos.yaml");
  assert.equal(result.writtenPaths.some((writtenPath) => writtenPath.startsWith(".leanos/standard/")), false, "Activation should not regenerate AI Standard");
  assert.equal(result.writtenPaths.some((writtenPath) => writtenPath.startsWith(".github/")), false, "Activation should not regenerate GitHub support files");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design")), false, "Product Ops activation should not generate Design");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering")), false, "Product Ops activation should not generate Engineering");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "growth")), false, "Product Ops activation should not generate Growth");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "define-mvp.workflow.md")), false, "Product Ops activation should not create define-mvp workflow");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "roadmap-item-to-epic.workflow.md")), false, "Product Ops activation should not create obsolete roadmap-item-to-epic workflow");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "delivery-item-to-epic.workflow.md")), false, "Product Ops activation should not create delivery-item-to-epic workflow");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "epic-to-features.workflow.md")), false, "Product Ops activation should not create epic-to-features workflow");
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "knowledge", "mvp-decision-gate.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "knowledge", "ready-to-develop.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "mvp", "backlog.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "mvp", "prd.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "skills", "define-mvp", "SKILL.md")), false, "Product Ops should not generate broad define-mvp skill");
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Product Ops activation should not create commands");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.deepEqual(yaml.departments.active, ["strategy", "operations"]);
  assert.equal(yaml.departments.routes.operations.agent, "clinic-assistant-ai-os/operations/AGENT.md");
  assert.deepEqual(yaml.activation.active_departments, ["strategy", "operations"]);
  assert.deepEqual(yaml.activation.inactive_departments, ["growth"]);
  assert(yaml.activation.active_areas.includes("operations.product-ops"), "Product Ops should become active");
  assert.equal(yaml.activation.inactive_areas.includes("operations.product-ops"), false, "Product Ops should leave inactive areas");
  assert(yaml.activation.inactive_areas.includes("operations.engineering"), "Engineering should remain inactive");
  assert.equal(yaml.workflows.active.includes("define-mvp"), false, "Product Ops activation should not enable define-mvp workflow");
  assert.equal(yaml.workflows.active.includes("roadmap-item-to-epic"), false, "Product Ops activation should not enable obsolete roadmap-item-to-epic workflow");
  assert.equal(yaml.workflows.active.includes("delivery-item-to-epic"), false, "Product Ops activation should not enable delivery-item-to-epic as workflow");
  assert.equal(yaml.workflows.active.includes("epic-to-features"), false, "Product Ops activation should not enable epic-to-features as workflow");
  assert.equal(yaml.workflows.active.includes("feature-to-delivery-cycle"), false, "Engineering workflows should wait for Engineering activation");

  const routingMap = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "routing-map.yaml"), "utf8"));
  const rolesIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "roles.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "playbooks.yaml"), "utf8"));
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "runtime", "context", "workspace-summary.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "runtime", "context", "next-actions.md"), "utf8");
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");

  assert.equal(routingMap.routing.departments.operations.agent, "../../../clinic-assistant-ai-os/operations/AGENT.md");
  assert.equal(routingMap.routing.areas.product_ops.agent, "../../../clinic-assistant-ai-os/operations/product-ops/AGENT.md");
  assert(rolesIndex.roles.some((role) => role.key === "product-owner"), "Product Owner role should be indexed after Product Ops activation");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-backlog-planning"), "MVP backlog planning playbook should be indexed after Product Ops activation");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "delivery-item-to-epic"), "Delivery item to Epic playbook should be indexed after Product Ops activation");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "epic-to-features"), "Epic to Features playbook should be indexed after Product Ops activation");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-delivery"), false, "Obsolete MVP delivery playbook should not be indexed after Product Ops activation");
  assert(workspaceSummary.includes("Active departments: strategy, operations"), "Workspace summary should include active Operations");
  assert(workspaceSummary.includes("operations.product-ops"), "Workspace summary should include Product Ops");
  assert(nextActions.includes("Product Ops"), "Next actions should mention active Product Ops without exposing slash commands");
  assert(rootAgent.includes("- Operations: `clinic-assistant-ai-os/operations/AGENT.md`"), "Root AGENT should route to Operations after activation");

  await assertIndexPathsExist(rootDir);
}

export async function validateActivationCliCommand() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-activation-cli-"));
  await generateWorkspace(rootDir, answers);

  const { stdout } = await execFileAsync(process.execPath, [join(packageRoot, "dist", "index.js"), "activate", "operations.product-ops"], {
    cwd: rootDir,
    env: {
      ...process.env,
      NO_COLOR: "1"
    }
  });

  assert(stdout.includes("Activated operations.product-ops"), "Activation CLI should report the activated area");
  assert(stdout.includes("clinic-assistant-ai-os/operations/AGENT.md"), "Activation CLI should report created Operations files");
  assert.equal(stdout.includes(".leanos/commands/"), false, "Activation CLI should not report command files");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));

  assert(yaml.activation.active_areas.includes("operations.product-ops"), "Activation CLI should update leanos.yaml");
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "AGENT.md"));
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Activation CLI should not create commands");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering")), false, "Activation CLI should not activate Engineering with Product Ops");
}
