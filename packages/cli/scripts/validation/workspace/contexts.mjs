import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";
import { createTreeMarkdown, exampleAnswers } from "../../generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../../../dist/generators/file-writer.js";
import { activateWorkspaceArea } from "../../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../../../dist/templates/workspace-template.js";
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
} from "../fixtures.mjs";
import {
  assertExists,
  assertPlaybookFormat,
  assertRoleFormat,
  assertSkillFormat,
  ensureTrailingNewline,
  failOutOfDate,
  formatPathDiff
} from "../assertions.mjs";
import {
  assertIndexPathsExist,
  assertInitialContextCoherence,
  assertPathInside,
  collectPathStrings,
  exists,
  isInitialStrategyWorkspacePath,
  listFiles,
  resolveFixturePath
} from "../path-utils.mjs";
import { assertWorkflowContract, assertCommandContract } from "../contracts.mjs";
import {
  assertAiStandardAssetTaxonomy,
  assertAiStandardChecklists,
  assertAiStandardExamples,
  assertAiStandardInstructions,
  assertAiStandardReadiness,
  assertAiStandardTemplates,
  assertNoOldAiStandardReferences
} from "../ai-standard.mjs";
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
} from "../areas.mjs";

export async function validatePartialAreaSelection() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-partial-"));
  await generateWorkspace(rootDir, partialAreaAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, partialAreaAnswers.subareas);
}

export async function validateEngineeringOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-engineering-only-"));
  await generateWorkspace(rootDir, engineeringOnlyAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, engineeringOnlyAnswers.subareas);
}

export async function validateDesignOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-design-only-"));
  await generateWorkspace(rootDir, designOnlyAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, designOnlyAnswers.subareas);
}

export async function validateGrowthValidationContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-growth-validation-"));
  await generateWorkspace(rootDir, growthValidationAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, growthValidationAnswers.subareas);
  assert.equal(await exists(join(rootDir, ".env.local")), false, "Workspace should not generate .env.local when GitHub management was not requested");
}

async function assertProgressiveStrategyOnlyWorkspace(rootDir, founderSelectedSubareas) {
  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const rolesIndex = parse(await readFile(join(rootDir, ".leanos", "index", "roles.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "index", "playbooks.yaml"), "utf8"));
  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "context", "workspace-summary.md"), "utf8");

  await assertExists(join(rootDir, "strategy", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "business", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "product", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "AGENT.md"));
  assert.equal(await exists(join(rootDir, "strategy", "validation")), false, "Strategy Validation should not be generated");
  assert.equal(await exists(join(rootDir, "operations")), false, "Operations should wait for progressive activation");
  assert.equal(await exists(join(rootDir, "growth")), false, "Growth should wait for progressive activation");
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Progressive workspaces should not generate slash-command files");

  assert.deepEqual(yaml.departments.active, ["strategy"]);
  assert.deepEqual(yaml.activation.active_departments, ["strategy"]);
  assert.deepEqual(yaml.activation.inactive_departments, ["operations", "growth"]);
  assert.deepEqual(yaml.activation.active_areas, initialStrategySubareas);
  assert.deepEqual(yaml.subareas.active.map((subarea) => subarea.key), initialStrategySubareas);
  assert.deepEqual(yaml.activation.founder_selected_areas, founderSelectedSubareas);
  assert.deepEqual(yaml.activation.founder_selected_departments, selectedDepartmentsFromSubareas(founderSelectedSubareas));
  assert(yaml.activation.inactive_areas.includes("operations.product-ops"), "Product Ops should start inactive");
  assert(yaml.activation.inactive_areas.includes("operations.engineering"), "Engineering should start inactive");
  assert(yaml.activation.inactive_areas.includes("growth.marketing"), "Growth should start inactive");

  assert(rolesIndex.roles.some((role) => role.key === "product-strategist"), "Product role should be indexed in initial Strategy");
  assert.equal(rolesIndex.roles.some((role) => role.key === "validation-researcher"), false, "Validation role should not be generated");
  assert(skillsIndex.skills.some((skill) => skill.key === "mvp-validation-scope"), "MVP Validation Scope skill should be indexed in initial Strategy");
  assert.equal(rolesIndex.roles.some((role) => role.key === "senior-developer"), false, "Engineering role should wait for Operations activation");
  assert.equal(rolesIndex.roles.some((role) => role.key === "growth-lead"), false, "Growth role should wait for Growth activation");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "create-launch-plan"), false, "Growth skill should wait for Growth activation");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-backlog-planning"), false, "Product Ops playbook should wait for Operations activation");

  assert.equal(routingMap.routing.departments.strategy.agent, "../../strategy/AGENT.md");
  assert.equal(routingMap.routing.departments.operations, undefined);
  assert.equal(routingMap.routing.departments.growth, undefined);
  assert.equal(routingMap.routing.areas.product.agent, "../../strategy/product/AGENT.md");
  assert.equal(routingMap.routing.areas.validation, undefined);
  assert.equal(routingMap.routing.areas.engineering, undefined);
  assert.equal(routingMap.routing.areas.marketing, undefined);
  assert(workspaceSummary.includes("Active departments: strategy"), "Workspace summary should list only Strategy as active");
  assert(workspaceSummary.includes("Active areas: strategy.business, strategy.product, strategy.roadmap"), "Workspace summary should list initial Strategy areas");

  await assertIndexPathsExist(rootDir);
  await assertInitialContextCoherence(rootDir, founderSelectedSubareas);
}

function selectedDepartmentsFromSubareas(subareas) {
  const selected = new Set(subareas.map((subarea) => subarea.split(".")[0]));
  return ["strategy", "operations", "growth"].filter((department) => selected.has(department));
}
