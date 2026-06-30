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

export async function validateExistingProductRepoMode() {
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
  const workspaceSummary = await readFile(join(rootDir, ".leanos", "runtime", "context", "workspace-summary.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "runtime", "context", "next-actions.md"), "utf8");
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
  assert(nextActions.includes("Start Or Continue Strategy"), "Existing repo next actions should start with natural Strategy routing");
}
