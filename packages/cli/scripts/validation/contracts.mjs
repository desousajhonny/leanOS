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

export async function assertWorkflowContract(rootDir) {
  const workflowsIndexPath = join(rootDir, ".leanos", "index", "workflows.yaml");
  const workflowsIndex = parse(await readFile(workflowsIndexPath, "utf8"));
  const workflows = workflowsIndex.workflows ?? [];
  const runtimeWorkflowDir = join(rootDir, ".leanos", "workflows");

  assert.equal(await exists(runtimeWorkflowDir), false, "Business workflows should not be generated in .leanos/workflows");

  for (const workflow of workflows) {
    assert.equal(workflow.active, true, `Workflow index should include only active workflows: ${workflow.key}`);
    assert(workflow.path, `Workflow index entry ${workflow.key} should include a path`);

    const workflowPath = resolve(dirname(workflowsIndexPath), workflow.path);
    assertPathInside(rootDir, workflowPath);
    assert.equal(await exists(workflowPath), true, `Workflow index points to missing path: ${workflow.path}`);

    const workflowRelativePath = relative(rootDir, workflowPath).split("\\").join("/");
    assert.equal(
      workflowRelativePath.startsWith(".leanos/workflows/"),
      false,
      `Business workflow should live in its owning department or area: ${workflowRelativePath}`
    );

    const content = await readFile(workflowPath, "utf8");
    assert.equal(
      content.includes(".leanos/workflows/"),
      false,
      `Workflow should not route business work through .leanos/workflows: ${workflowRelativePath}`
    );

    assertWorkflowRequiredSections(content, workflowRelativePath);
    assertWorkflowNavigationChain(content, workflowRelativePath);
    assertWorkflowExternalSafety(content, workflowRelativePath);
    assertFeatureDeliveryWorkflowContract(content, workflowRelativePath);
    await assertWorkflowPathReferences(rootDir, workflowRelativePath, content);
  }
}

function assertWorkflowRequiredSections(content, workflowRelativePath) {
  const requiredSections = [
    "Purpose",
    "Founder Triggers",
    "Owner",
    "Required Areas",
    "Availability",
    "Load First",
    "Navigation Route",
    "Sequence",
    "Confirmation Gates",
    "Allowed Updates",
    "Forbidden Updates",
    "External Capabilities",
    "Stop Conditions",
    "Expected Output",
    "Continuation Bridge"
  ];
  const missingSections = requiredSections.filter((section) => !content.includes(`## ${section}\n`));

  assert.deepEqual(
    missingSections,
    [],
    `Workflow does not follow the Workflow Contract Standard: ${workflowRelativePath}`
  );
}

function assertWorkflowNavigationChain(content, workflowRelativePath) {
  const navigationRoute = extractMarkdownSection(content, "Navigation Route");
  const areaAgentIndex = navigationRoute.indexOf("/AGENT.md");
  const roleIndex = navigationRoute.indexOf("/roles/");
  const skillIndex = navigationRoute.indexOf("/skills/");
  const playbookIndex = navigationRoute.indexOf("/playbooks/");

  if (roleIndex !== -1) {
    assert(
      areaAgentIndex !== -1 && areaAgentIndex < roleIndex,
      `Workflow should load area AGENT.md before a role in Navigation Route: ${workflowRelativePath}`
    );
  }

  if (skillIndex !== -1) {
    assert(
      roleIndex !== -1 && roleIndex < skillIndex,
      `Workflow should load a role before a skill in Navigation Route: ${workflowRelativePath}`
    );
  }

  if (playbookIndex !== -1) {
    assert(
      roleIndex !== -1 && roleIndex < playbookIndex,
      `Workflow should load a role before a playbook in Navigation Route: ${workflowRelativePath}`
    );

    if (skillIndex !== -1) {
      assert(
        skillIndex < playbookIndex,
        `Workflow should load skills before playbooks when both appear in Navigation Route: ${workflowRelativePath}`
      );
    }
  }
}

function assertWorkflowExternalSafety(content, workflowRelativePath) {
  const externalCapabilities = extractMarkdownSection(content, "External Capabilities");
  const needsRemoteWriteSafety = /GitHub sync requires|API-capable|remote write|payload/i.test(externalCapabilities);

  if (!needsRemoteWriteSafety) {
    return;
  }

  for (const expectedTerm of ["dry-run", "payload"]) {
    assert(
      content.toLowerCase().includes(expectedTerm),
      `Workflow with external write capability should mention ${expectedTerm}: ${workflowRelativePath}`
    );
  }

  assert(
    /confirm|confirmation/i.test(content),
    `Workflow with external write capability should require confirmation: ${workflowRelativePath}`
  );
}

function assertFeatureDeliveryWorkflowContract(content, workflowRelativePath) {
  if (!workflowRelativePath.endsWith("operations/workflows/feature-to-delivery-cycle.workflow.md")) {
    return;
  }

  const phases = extractMarkdownSection(content, "Phases");
  for (const expectedPhase of [
    "Intake",
    "Product Ops readiness",
    "Conditional area readiness",
    "Engineering delivery",
    "PR preparation",
    "PR validation",
    "Founder handoff"
  ]) {
    assert(
      phases.includes(expectedPhase),
      `Feature delivery workflow should include phase '${expectedPhase}': ${workflowRelativePath}`
    );
  }

  const sequence = extractMarkdownSection(content, "Sequence");
  const preparePrIndex = sequence.indexOf("prepare-pr");
  const prValidationIndex = sequence.indexOf("pr-validation");

  assert.notEqual(preparePrIndex, -1, `Feature delivery workflow should mention prepare-pr in Sequence: ${workflowRelativePath}`);
  assert.notEqual(prValidationIndex, -1, `Feature delivery workflow should mention pr-validation in Sequence: ${workflowRelativePath}`);
  assert(
    preparePrIndex < prValidationIndex,
    `Feature delivery workflow should prepare the PR before PR validation: ${workflowRelativePath}`
  );

  assert(
    /workflow coordinates|workflow coordina/i.test(content) && /engineering-delivery/i.test(content),
    `Feature delivery workflow should state that it coordinates while engineering-delivery executes implementation: ${workflowRelativePath}`
  );

  assert(
    content.includes("activation_required"),
    `Feature delivery workflow should name activation_required for inactive required conditional areas: ${workflowRelativePath}`
  );
}

async function assertWorkflowPathReferences(rootDir, workflowRelativePath, content) {
  const pathReferences = collectMarkdownPathReferences(content);

  for (const pathReference of pathReferences) {
    const absolutePath = resolve(rootDir, pathReference);
    assertPathInside(rootDir, absolutePath);
    assert.equal(
      await exists(absolutePath),
      true,
      `Workflow ${workflowRelativePath} references missing path: ${pathReference}`
    );
  }
}

function collectMarkdownPathReferences(content) {
  const knownPrefixes = [
    "AGENT.md",
    "leanos.yaml",
    ".env.local",
    ".github/",
    ".leanos/",
    "ai-standard/",
    "strategy/",
    "operations/",
    "growth/"
  ];
  const references = new Set();
  const backtickPattern = /`([^`]+)`/g;
  let match;

  while ((match = backtickPattern.exec(content)) !== null) {
    const candidate = match[1].trim();

    if (!knownPrefixes.some((prefix) => candidate === prefix || candidate.startsWith(prefix))) {
      continue;
    }

    if (candidate.includes(" ") || candidate.includes("*") || candidate.includes("<") || candidate.includes(">")) {
      continue;
    }

    references.add(candidate.replace(/\/$/, ""));
  }

  return [...references];
}

function extractMarkdownSection(content, title) {
  const marker = `## ${title}`;
  const start = content.indexOf(marker);

  if (start === -1) {
    return "";
  }

  const sectionStart = start + marker.length;
  const nextSection = content.indexOf("\n## ", sectionStart);

  return nextSection === -1 ? content.slice(sectionStart) : content.slice(sectionStart, nextSection);
}

export async function assertCommandContract(rootDir) {
  const commandsDir = join(rootDir, ".leanos", "commands");
  assert.equal(await exists(commandsDir), false, "Generated workspaces should not contain .leanos/commands");
  return;

  const commandFiles = (await readdir(commandsDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => entry.name)
    .sort();

  for (const commandFile of commandFiles) {
    const commandPath = join(commandsDir, commandFile);
    const commandRelativePath = relative(rootDir, commandPath).split("\\").join("/");
    const content = await readFile(commandPath, "utf8");

    assertCommandRequiredSections(content, commandRelativePath);
    assertCommandWorkflowRouting(commandFile, content, commandRelativePath);
    assertCommandExternalSafety(content, commandRelativePath);
    await assertCommandPathReferences(rootDir, commandsDir, commandRelativePath, content);
  }
}

function assertCommandRequiredSections(content, commandRelativePath) {
  const requiredSections = [
    "Purpose",
    "Load First",
    "Allowed Updates",
    "Forbidden Updates"
  ];
  const missingSections = requiredSections.filter((section) => !content.includes(`## ${section}\n`));

  assert.deepEqual(
    missingSections,
    [],
    `Command does not follow the Command Contract Standard: ${commandRelativePath}`
  );

  assert(
    content.includes("## Processo\n") || content.includes("## What To Do\n"),
    `Command should define Process or What To Do: ${commandRelativePath}`
  );
  assert(
    content.includes("## Saída Esperada\n") || content.includes("## Saída\n"),
    `Command should define Expected Output or Output: ${commandRelativePath}`
  );
}

function assertCommandWorkflowRouting(commandFile, content, commandRelativePath) {
  const workflowRequirements = {
    "create-features.md": [
      "../../operations/product-ops/playbooks/delivery-item-to-epic.playbook.md",
      "../../operations/product-ops/playbooks/epic-to-features.playbook.md"
    ],
    "workon-feature.md": ["../../operations/workflows/feature-to-delivery-cycle.workflow.md"]
  };
  const requiredWorkflows = workflowRequirements[commandFile] ?? [];

  if (requiredWorkflows.length === 0) {
    return;
  }

  const navigationRoute = extractMarkdownSection(content, "Navigation Route") || content;
  const firstExecutionAssetIndex = firstPositiveIndex([
    navigationRoute.indexOf("/roles/"),
    navigationRoute.indexOf("/skills/"),
    navigationRoute.indexOf("/playbooks/")
  ]);

  for (const workflowPath of requiredWorkflows) {
    const workflowIndex = navigationRoute.indexOf(workflowPath);

    assert(
      workflowIndex !== -1,
      `Command should load required workflow ${workflowPath}: ${commandRelativePath}`
    );

    if (firstExecutionAssetIndex !== -1) {
      assert(
        workflowIndex < firstExecutionAssetIndex,
        `Command should load workflow before role/skill/playbook: ${commandRelativePath}`
      );
    }
  }
}

function firstPositiveIndex(indexes) {
  const positives = indexes.filter((index) => index !== -1);
  return positives.length === 0 ? -1 : Math.min(...positives);
}

function assertCommandExternalSafety(content, commandRelativePath) {
  const mentionsRemoteWrite = /GitHub API|call GitHub|remote write|future GitHub API|API write/i.test(content);

  if (!mentionsRemoteWrite) {
    return;
  }

  assert(
    /confirm|confirmation/i.test(content),
    `Command with remote write capability should require confirmation: ${commandRelativePath}`
  );

  assert(
    /draft|dry-run|payload|plan/i.test(content),
    `Command with remote write capability should produce a draft, dry-run, payload or plan first: ${commandRelativePath}`
  );
}

async function assertCommandPathReferences(rootDir, commandsDir, commandRelativePath, content) {
  const pathReferences = collectCommandPathReferences(content);

  for (const pathReference of pathReferences) {
    if (isInactiveAreaWarning(content, pathReference)) {
      continue;
    }

    const absolutePath = pathReference.startsWith("../")
      ? resolve(commandsDir, pathReference)
      : resolve(rootDir, pathReference);
    assertPathInside(rootDir, absolutePath);
    assert.equal(
      await exists(absolutePath),
      true,
      `Command ${commandRelativePath} references missing path: ${pathReference}`
    );
  }
}

function collectCommandPathReferences(content) {
  const knownPrefixes = [
    "../",
    "../../",
    "AGENT.md",
    "leanos.yaml",
    ".env.local",
    ".github/",
    ".leanos/",
    "ai-standard/",
    "strategy/",
    "operations/",
    "growth/"
  ];
  const references = new Set();
  const backtickPattern = /`([^`]+)`/g;
  let match;

  while ((match = backtickPattern.exec(content)) !== null) {
    const candidate = match[1].trim();

    if (!knownPrefixes.some((prefix) => candidate === prefix || candidate.startsWith(prefix))) {
      continue;
    }

    if (candidate.includes(" ") || candidate.includes("*") || candidate.includes("<") || candidate.includes(">")) {
      continue;
    }

    references.add(candidate.replace(/\/$/, ""));
  }

  return [...references];
}

function isInactiveAreaWarning(content, pathReference) {
  const withTrailingSlash = `${pathReference}/`;

  return content
    .split("\n")
    .some((line) => (line.includes(`\`${pathReference}\``) || line.includes(`\`${withTrailingSlash}\``)) && line.includes("not active"));
}
