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
  expectedGeneratedPath,
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

export async function validateClientWorkspaceFixture() {
  const ignoredGeneratedFixturePaths = new Set([
    ".env.local"
  ]);
  const requiredPaths = [
    "AGENT.md",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "ai-standard/foundation/progression-gates.md",
    "strategy/product/README.md",
    "strategy/product/knowledge/mvp-validation-scope.md",
    "strategy/product/skills/business-baseline/SKILL.md",
    "strategy/product/skills/product-core/SKILL.md",
    "strategy/product/skills/mvp-validation-scope/SKILL.md",
    "strategy/product/knowledge/validation-notes.md",
    "strategy/business/knowledge/business-model-canvas.md",
    "strategy/business/skills/business-model/SKILL.md",
    "operations/product-ops/AGENT.md",
    "operations/product-ops/knowledge/README.md",
    "operations/product-ops/knowledge/implementation-packets/README.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/mvp/README.md",
    "operations/product-ops/mvp/backlog.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/skills/shape-epic/SKILL.md",
    "operations/product-ops/skills/write-feature-criteria/SKILL.md",
    "operations/product-ops/skills/define-delivery-boundaries/SKILL.md",
    "operations/product-ops/playbooks/mvp-backlog-planning.playbook.md",
    "operations/product-ops/playbooks/delivery-item-to-epic.playbook.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "ai-standard/templates/product/implementation-packet-template.md",
    "ai-standard/templates/design/component-spec-template.md",
    "ai-standard/templates/design/screen-spec-template.md",
    "operations/design/knowledge/README.md",
    "operations/design/knowledge/design-system.md",
    "operations/design/knowledge/accessibility.md",
    "operations/design/knowledge/user-flows.md",
    "operations/design/knowledge/component-inventory.md",
    "operations/design/knowledge/components/README.md",
    "operations/design/roles/README.md",
    "operations/design/skills/design-system/SKILL.md",
    "operations/design/skills/accessibility/SKILL.md",
    "operations/design/skills/component-analysis/SKILL.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/design/playbooks/screen-readiness.playbook.md",
    "operations/design/playbooks/component-readiness.playbook.md",
    "operations/workflows/feature-to-delivery-cycle.workflow.md",
    "operations/workflows/post-merge-continuation.workflow.md",
    "operations/engineering/AGENT.md",
    "operations/engineering/knowledge/code-standards.md",
    "operations/engineering/knowledge/implementation-rules.md",
    "operations/engineering/knowledge/component-guidelines.md",
    "operations/engineering/knowledge/data-guidelines.md",
    "operations/engineering/knowledge/testing-strategy.md",
    "operations/engineering/knowledge/review-criteria.md",
    "operations/engineering/roles/test-engineer.role.md",
    "operations/engineering/skills/follow-code-standards/SKILL.md",
    "operations/engineering/skills/implement-component/SKILL.md",
    "operations/engineering/skills/review-data-change/SKILL.md",
    "operations/engineering/skills/create-branch/SKILL.md",
    "operations/engineering/playbooks/branch-for-feature.playbook.md",
    "operations/engineering/playbooks/component-implementation.playbook.md",
    "operations/devops/AGENT.md",
    "operations/devops/knowledge/README.md",
    "operations/devops/knowledge/github-management.md",
    "operations/devops/knowledge/environments.md",
    "operations/devops/knowledge/deployment-readiness.md",
    "operations/devops/knowledge/ci-cd.md",
    "operations/devops/knowledge/observability.md",
    "operations/devops/knowledge/release-notes.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/roles/devops-engineer.role.md",
    "operations/devops/roles/github-devops.role.md",
    "operations/devops/roles/release-manager.role.md",
    "operations/devops/skills/setup-ci/SKILL.md",
    "operations/devops/skills/plan-deployment/SKILL.md",
    "operations/devops/skills/configure-github-project/SKILL.md",
    "operations/devops/skills/configure-environments/SKILL.md",
    "operations/devops/skills/define-observability/SKILL.md",
    "operations/devops/skills/prepare-release/SKILL.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/AGENT.md",
    "operations/security/knowledge/README.md",
    "operations/security/knowledge/security-baseline.md",
    "operations/security/knowledge/threat-model.md",
    "operations/security/knowledge/access-control.md",
    "operations/security/knowledge/data-protection.md",
    "operations/security/knowledge/database-security.md",
    "operations/security/knowledge/secrets-management.md",
    "operations/security/knowledge/infra-hardening.md",
    "operations/security/knowledge/secure-coding.md",
    "operations/security/knowledge/incident-response.md",
    "operations/security/roles/application-security-engineer.role.md",
    "operations/security/roles/cloud-security-reviewer.role.md",
    "operations/security/roles/data-protection-reviewer.role.md",
    "operations/security/skills/ai-generated-code-security/SKILL.md",
    "operations/security/skills/security-automation-readiness/SKILL.md",
    "operations/security/playbooks/pre-deploy-security-review.playbook.md",
    "operations/security/playbooks/ai-generated-code-security-review.playbook.md",
    "operations/security/playbooks/security-automation-readiness.playbook.md",
    "growth/customer-experience/AGENT.md",
    "growth/customer-experience/knowledge/customer-feedback.md",
    "growth/customer-experience/knowledge/support-notes.md",
    "growth/customer-experience/knowledge/success-moments.md",
    "growth/customer-experience/knowledge/churn-reasons.md",
    "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
    "growth/marketing/AGENT.md",
    "growth/marketing/knowledge/positioning.md",
    "growth/marketing/knowledge/landing-page.md",
    "growth/marketing/knowledge/acquisition-channels.md",
    "growth/marketing/knowledge/launch-plan.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    "growth/finance/AGENT.md",
    "growth/finance/knowledge/pricing.md",
    "growth/finance/knowledge/revenue-model.md",
    "growth/finance/knowledge/unit-economics.md",
    "growth/finance/knowledge/budget.md",
    "growth/finance/knowledge/finance-risks.md",
    "growth/finance/playbooks/finance-review.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    ".leanos/index/routing-map.yaml",
    ".github/leanos/github-settings.example.json",
    ".github/leanos/setup-guide.md",
    ".github/leanos/capability-contract.md",
    ".github/leanos/work-mapping.md",
    ".github/leanos/project-sync.yaml",
    ".github/leanos/sync-state.yaml",
    ".github/ISSUE_TEMPLATE/epic.yml",
    ".github/ISSUE_TEMPLATE/feature.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/leanos/branch-rules.md",
    ".github/leanos/pr-validation-rules.md",
    ".github/leanos/security-automation.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/vscode/README.md"
  ];

  for (const requiredPath of requiredPaths.filter(isInitialStrategyWorkspacePath)) {
    const generatedPath = expectedGeneratedPath(requiredPath, exampleAnswers);
    if (!(await exists(resolveFixturePath(generatedPath)))) {
      failOutOfDate([`Missing fixture file: ${generatedPath}`]);
    }
  }

  for (const forbiddenPath of [
    ".leanos/departments",
    ".leanos/workflows",
    "src",
    "app",
    "pages",
    "package.json",
    "vercel.json",
    ".leanos/ai-standard",
    "operations",
    "growth",
    "operations/devops/environments.md",
    "operations/devops/deployment.md",
    "operations/devops/deployment-readiness.md",
    "operations/devops/github-management.md",
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/release-notes.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
    "operations/security/threat-model.md",
    "operations/security/access-control.md",
    "operations/security/data-protection.md",
    "operations/security/skills/threat-model/SKILL.md",
    "operations/security/skills/review-security/SKILL.md",
    "operations/security/playbooks/security-review.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "growth/customer-experience/customer-feedback.md",
    "growth/customer-experience/support-notes.md",
    "growth/customer-experience/success-moments.md",
    "growth/customer-experience/churn-reasons.md",
    "growth/marketing/positioning.md",
    "growth/marketing/landing-page.md",
    "growth/marketing/acquisition-channels.md",
    "growth/marketing/launch-plan.md",
    "growth/finance/pricing.md",
    "growth/finance/revenue-model.md",
    "growth/finance/unit-economics.md",
    "growth/finance/budget.md",
    "growth/finance/finance-risks.md",
    "operations/engineering/test-plan.md",
    "operations/design/design-principles.md",
    "operations/design/user-flows.md",
    "operations/design/screen-specs.md",
    "operations/design/ux-decisions.md",
    "operations/design/usability-notes.md"
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

  const expectedFixtureFiles = expectedFiles.filter((file) => !ignoredGeneratedFixturePaths.has(file.path));
  const expectedPaths = expectedFixtureFiles.map((file) => file.path).sort();
  const actualPaths = (await listFiles(clientWorkspaceFixtureDir))
    .filter((path) => !ignoredGeneratedFixturePaths.has(path))
    .sort();

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

  for (const file of expectedFixtureFiles) {
    const actualContent = await readFile(resolveFixturePath(file.path), "utf8");
    const expectedContent = ensureTrailingNewline(file.content);

    if (actualContent !== expectedContent) {
      changedPaths.push(file.path);
    }
  }

  if (changedPaths.length > 0) {
    failOutOfDate(formatPathDiff("Changed", changedPaths));
  }

  await assertNoOldAiStandardReferences(clientWorkspaceFixtureDir);
  await assertWorkflowContract(clientWorkspaceFixtureDir);
  await assertCommandContract(clientWorkspaceFixtureDir);
}
