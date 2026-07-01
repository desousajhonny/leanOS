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
  expectedGeneratedPath,
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

import {
  assertFounderIntentRouting,
  assertGitHubIssuePrWorkflow,
  assertGitHubReadiness,
  assertNoEditorAgentIntegration
} from "./integrations.mjs";
export async function validateWorkspaceFiles() {
  const files = createWorkspaceFiles(answers);
  const paths = new Set(files.map((file) => file.path));

  const expectedWorkspacePaths = [
    "AGENT.md",
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "ai-standard/foundation/README.md",
    "ai-standard/foundation/navigation-chain.md",
    "ai-standard/foundation/founder-progression-model.md",
    "ai-standard/foundation/progression-gates.md",
    "ai-standard/foundation/guided-conversation.md",
    "ai-standard/foundation/asset-taxonomy.md",
    "ai-standard/foundation/creation-rules.md",
    "ai-standard/foundation/quality-criteria.md",
    "ai-standard/foundation/folder-documentation-rules.md",
    "ai-standard/templates/agents/README.md",
    "ai-standard/templates/agents/root-agent-template.md",
    "ai-standard/templates/structure/README.md",
    "ai-standard/templates/structure/area-template.yaml",
    "ai-standard/templates/execution/README.md",
    "ai-standard/templates/execution/role-template.md",
    "ai-standard/templates/github/README.md",
    "ai-standard/templates/github/github-epic-template.md",
    "ai-standard/templates/github/github-feature-template.md",
    "ai-standard/templates/github/delivery-readiness-matrix-template.md",
    "ai-standard/templates/product/README.md",
    "ai-standard/templates/product/epic-template.md",
    "ai-standard/templates/product/feature-template.md",
    "ai-standard/templates/product/implementation-packet-template.md",
    "ai-standard/templates/design/README.md",
    "ai-standard/templates/design/component-spec-template.md",
    "ai-standard/templates/design/screen-spec-template.md",
    "ai-standard/templates/review/README.md",
    "ai-standard/templates/review/code-review-template.md",
    "ai-standard/checklists/agent-quality-checklist.md",
    "ai-standard/checklists/area-quality-checklist.md",
    "ai-standard/checklists/department-quality-checklist.md",
    "ai-standard/checklists/playbook-quality-checklist.md",
    "ai-standard/checklists/readme-quality-checklist.md",
    "ai-standard/checklists/role-quality-checklist.md",
    "ai-standard/checklists/skill-quality-checklist.md",
    "ai-standard/checklists/workflow-quality-checklist.md",
    "ai-standard/instructions/README.md",
    "ai-standard/instructions/create-agent-instructions.md",
    "ai-standard/instructions/create-area-instructions.md",
    "ai-standard/instructions/create-department-instructions.md",
    "ai-standard/instructions/create-playbook-instructions.md",
    "ai-standard/instructions/create-readme-instructions.md",
    "ai-standard/instructions/create-role-instructions.md",
    "ai-standard/instructions/create-skill-instructions.md",
    "ai-standard/instructions/create-workflow-instructions.md",
    "ai-standard/examples/README.md",
    "ai-standard/examples/agents/README.md",
    "ai-standard/examples/agents/example-root-agent.md",
    "ai-standard/examples/agents/example-area-agent.md",
    "ai-standard/examples/structure/README.md",
    "ai-standard/examples/structure/example-folder-readme.md",
    "ai-standard/examples/structure/example-area-readme.md",
    "ai-standard/examples/execution/README.md",
    "ai-standard/examples/execution/example-role-senior-developer.md",
    "ai-standard/examples/execution/example-skill-coherence.md",
    "ai-standard/examples/execution/example-playbook-prepare-pr.md",
    "ai-standard/examples/execution/example-workflow-feature-to-delivery-cycle.md",
    "ai-standard/examples/github/README.md",
    "ai-standard/examples/github/example-github-epic.md",
    "ai-standard/examples/github/example-github-feature.md",
    "ai-standard/examples/github/example-pull-request.md",
    "ai-standard/examples/review/README.md",
    "ai-standard/examples/review/example-code-review.md",
    ".leanos/index/areas.yaml",
    ".leanos/index/routing-map.yaml",
    ".leanos/agent/protocols/chief-trace.md",
    ".leanos/scratch/README.md",
    ".leanos/traces/README.md",
    ".leanos/traces/trace-index.yaml",
    ".leanos/traces/trace-template.md",
    "strategy/AGENT.md",
    "operations/AGENT.md",
    "growth/AGENT.md",
    "strategy/business/AGENT.md",
    "strategy/business/README.md",
    "strategy/business/knowledge/README.md",
    "strategy/business/knowledge/profile.md",
    "strategy/business/knowledge/mission.md",
    "strategy/business/knowledge/vision.md",
    "strategy/business/knowledge/principles.md",
    "strategy/business/knowledge/operating-model.md",
    "strategy/business/knowledge/business-model-canvas.md",
    "strategy/business/knowledge/decision-log.md",
    "strategy/business/roles/business-strategist.role.md",
    "strategy/business/skills/business-identity/SKILL.md",
    "strategy/business/skills/operating-model/SKILL.md",
    "strategy/business/skills/business-model/SKILL.md",
    "strategy/business/playbooks/business-foundation.playbook.md",
    "strategy/product/AGENT.md",
    "strategy/product/README.md",
    "strategy/product/knowledge/README.md",
    "strategy/product/knowledge/brief.md",
    "strategy/product/knowledge/problem.md",
    "strategy/product/knowledge/icp.md",
    "strategy/product/knowledge/jobs-to-be-done.md",
    "strategy/product/knowledge/value-proposition.md",
    "strategy/product/knowledge/positioning.md",
    "strategy/product/knowledge/mvp-validation-scope.md",
    "strategy/product/skills/business-baseline/SKILL.md",
    "strategy/product/skills/product-core/SKILL.md",
    "strategy/product/skills/mvp-validation-scope/SKILL.md",
    "strategy/product/playbooks/idea-calibration.playbook.md",
    "strategy/product/playbooks/mvp-validation-scope.playbook.md",
    "strategy/roadmap/AGENT.md",
    "strategy/roadmap/knowledge/README.md",
    "strategy/roadmap/knowledge/roadmap.md",
    "strategy/roadmap/knowledge/milestones.md",
    "strategy/roadmap/knowledge/current-cycle.md",
    "strategy/roadmap/knowledge/backlog.md",
    "strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md",
    "operations/product-ops/AGENT.md",
    "operations/product-ops/README.md",
    "operations/product-ops/knowledge/README.md",
    "operations/product-ops/knowledge/implementation-packets/README.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/knowledge/technical-decisions.md",
    "operations/product-ops/epics/README.md",
    "operations/product-ops/mvp/README.md",
    "operations/product-ops/mvp/backlog.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/skills/shape-epic/SKILL.md",
    "operations/product-ops/skills/feature-criteria/SKILL.md",
    "operations/product-ops/skills/delivery-boundaries/SKILL.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "operations/product-ops/playbooks/mvp-backlog-planning.playbook.md",
    "operations/product-ops/playbooks/delivery-item-to-epic.playbook.md",
    "operations/workflows/feature-to-delivery-cycle.workflow.md",
    "operations/workflows/post-merge-continuation.workflow.md",
    "operations/design/knowledge/README.md",
    "operations/design/knowledge/design-system.md",
    "operations/design/knowledge/accessibility.md",
    "operations/design/knowledge/user-flows.md",
    "operations/design/knowledge/component-inventory.md",
    "operations/design/knowledge/components/README.md",
    "operations/design/AGENT.md",
    "operations/design/roles/ux-researcher.role.md",
    "operations/design/roles/product-designer.role.md",
    "operations/design/roles/accessibility-specialist.role.md",
    "operations/design/roles/ux-writer.role.md",
    "operations/design/skills/design-system/SKILL.md",
    "operations/design/skills/accessibility/SKILL.md",
    "operations/design/skills/user-research/SKILL.md",
    "operations/design/skills/user-flow-mapping/SKILL.md",
    "operations/design/skills/screen-specification/SKILL.md",
    "operations/design/skills/microcopy/SKILL.md",
    "operations/design/skills/design-review/SKILL.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/design/playbooks/screen-readiness.playbook.md",
    "operations/design/playbooks/user-research.playbook.md",
    "operations/design/playbooks/accessibility-review.playbook.md",
    "operations/design/playbooks/ux-writing.playbook.md",
    "operations/engineering/AGENT.md",
    "operations/engineering/knowledge/README.md",
    "operations/engineering/knowledge/code-standards.md",
    "operations/engineering/knowledge/implementation-rules.md",
    "operations/engineering/knowledge/component-guidelines.md",
    "operations/engineering/knowledge/data-guidelines.md",
    "operations/engineering/knowledge/workspace-hygiene.md",
    "operations/engineering/knowledge/testing-strategy.md",
    "operations/engineering/knowledge/review-criteria.md",
    "operations/engineering/knowledge/implementation-notes.md",
    "operations/engineering/knowledge/code-review-notes.md",
    "operations/engineering/knowledge/pr-log.md",
    "operations/engineering/roles/test-engineer.role.md",
    "operations/engineering/skills/follow-code-standards/SKILL.md",
    "operations/engineering/skills/component-implementation/SKILL.md",
    "operations/engineering/skills/temporary-artifact-hygiene/SKILL.md",
    "operations/engineering/skills/data-change-review/SKILL.md",
    "operations/engineering/playbooks/engineering-delivery.playbook.md",
    "operations/engineering/playbooks/prepare-pr.playbook.md",
    "operations/engineering/playbooks/component-implementation.playbook.md",
    "operations/engineering/playbooks/branch-for-feature.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/engineering/skills/feature-branching/SKILL.md",
    "operations/devops/AGENT.md",
    "operations/devops/knowledge/README.md",
    "operations/devops/knowledge/github-management.md",
    "operations/devops/knowledge/environments.md",
    "operations/devops/knowledge/deployment-readiness.md",
    "operations/devops/knowledge/ci-cd.md",
    "operations/devops/knowledge/observability.md",
    "operations/devops/knowledge/release-notes.md",
    "operations/devops/playbooks/ci-pipeline-cd.playbook.md",
    "operations/devops/playbooks/deployment-readiness.playbook.md",
    "operations/devops/roles/devops-engineer.role.md",
    "operations/devops/roles/github-devops.role.md",
    "operations/devops/roles/release-manager.role.md",
    "operations/devops/skills/ci-pipeline/SKILL.md",
    "operations/devops/skills/deployment-readiness/SKILL.md",
    "operations/devops/skills/github-project-management/SKILL.md",
    "operations/devops/skills/environment-management/SKILL.md",
    "operations/devops/skills/observability/SKILL.md",
    "operations/devops/skills/release-readiness/SKILL.md",
    "operations/devops/playbooks/github-project-management.playbook.md",
    "operations/devops/playbooks/environment-management.playbook.md",
    "operations/devops/playbooks/observability.playbook.md",
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
    "operations/security/knowledge/security-automation.md",
    "operations/security/knowledge/security-automation.md",
    "operations/security/roles/security-reviewer.role.md",
    "operations/security/roles/application-security-engineer.role.md",
    "operations/security/roles/cloud-security-reviewer.role.md",
    "operations/security/roles/data-protection-reviewer.role.md",
    "operations/security/skills/threat-modeling/SKILL.md",
    "operations/security/skills/access-control-review/SKILL.md",
    "operations/security/skills/api-security-review/SKILL.md",
    "operations/security/skills/database-security-review/SKILL.md",
    "operations/security/skills/secrets-management/SKILL.md",
    "operations/security/skills/secure-code-review/SKILL.md",
    "operations/security/skills/dependency-supply-chain-review/SKILL.md",
    "operations/security/skills/infra-hardening-review/SKILL.md",
    "operations/security/skills/incident-response/SKILL.md",
    "operations/security/skills/ai-generated-code-security/SKILL.md",
    "operations/security/skills/security-automation-readiness/SKILL.md",
    "operations/security/playbooks/security-foundation.playbook.md",
    "operations/security/playbooks/pre-mvp-security-checklist.playbook.md",
    "operations/security/playbooks/pre-deploy-security-review.playbook.md",
    "operations/security/playbooks/api-security-review.playbook.md",
    "operations/security/playbooks/database-security-review.playbook.md",
    "operations/security/playbooks/secrets-rotation.playbook.md",
    "operations/security/playbooks/vulnerability-response.playbook.md",
    "operations/security/playbooks/incident-response.playbook.md",
    "operations/security/playbooks/ai-generated-code-security-review.playbook.md",
    "operations/security/playbooks/security-automation-readiness.playbook.md",
    "growth/customer-experience/AGENT.md",
    "growth/customer-experience/knowledge/README.md",
    "growth/customer-experience/knowledge/customer-feedback.md",
    "growth/customer-experience/knowledge/support-notes.md",
    "growth/customer-experience/knowledge/success-moments.md",
    "growth/customer-experience/knowledge/churn-reasons.md",
    "growth/customer-experience/roles/cx-lead.role.md",
    "growth/customer-experience/skills/customer-feedback-mapping/SKILL.md",
    "growth/customer-experience/skills/support-patterns/SKILL.md",
    "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
    "growth/marketing/AGENT.md",
    "growth/marketing/knowledge/README.md",
    "growth/marketing/knowledge/positioning.md",
    "growth/marketing/knowledge/landing-page.md",
    "growth/marketing/knowledge/acquisition-channels.md",
    "growth/marketing/knowledge/launch-plan.md",
    "growth/marketing/roles/growth-lead.role.md",
    "growth/marketing/skills/positioning/SKILL.md",
    "growth/marketing/skills/landing-page-copy/SKILL.md",
    "growth/marketing/skills/launch-plan/SKILL.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    "growth/finance/AGENT.md",
    "growth/finance/knowledge/README.md",
    "growth/finance/knowledge/pricing.md",
    "growth/finance/knowledge/revenue-model.md",
    "growth/finance/knowledge/unit-economics.md",
    "growth/finance/knowledge/budget.md",
    "growth/finance/knowledge/finance-risks.md",
    "growth/finance/roles/finance-operator.role.md",
    "growth/finance/skills/pricing-review/SKILL.md",
    "growth/finance/skills/model-unit-economics/SKILL.md",
    "growth/finance/playbooks/finance-review.playbook.md",
    ".github/leanos/README.md",
    ".github/leanos/setup-guide.md",
    ".github/leanos/capability-contract.md",
    ".github/leanos/github-settings.example.json",
    ".github/leanos/work-mapping.md",
    ".github/leanos/project-sync.yaml",
    ".github/leanos/sync-state.yaml",
    ".github/leanos/labels.yaml",
    ".github/ISSUE_TEMPLATE/epic.yml",
    ".github/ISSUE_TEMPLATE/feature.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/leanos/branch-rules.md",
    ".github/leanos/pr-validation-rules.md",
    ".github/leanos/security-automation.md"
  ];

  for (const expectedPath of expectedWorkspacePaths.filter(isInitialStrategyWorkspacePath)) {
    const generatedPath = expectedGeneratedPath(expectedPath, answers);
    assert(paths.has(generatedPath), `Expected generated path missing: ${generatedPath}`);
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
    "operations/AGENT.md",
    "operations/product-ops/README.md",
    "operations/engineering/README.md",
    "growth/AGENT.md",
    "growth/marketing/README.md",
    ".leanos/commands",
    "strategy/validation",
    "strategy/workflows/strategy-validation-cycle.workflow.md",
    "strategy/workflows/roadmap-to-github-project.workflow.md",
    "strategy/roadmap/skills/prepare-roadmap-sync/SKILL.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
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
    "operations/security/database-security.md",
    "operations/security/secrets-management.md",
    "operations/security/infra-hardening.md",
    "operations/security/secure-coding.md",
    "operations/security/incident-response.md",
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
    "operations/engineering/implementation-notes.md",
    "operations/engineering/code-review-notes.md",
    "operations/engineering/pr-log.md",
    "operations/engineering/test-plan.md",
    "operations/design/design-principles.md",
    "operations/design/user-flows.md",
    "operations/design/screen-specs.md",
    "operations/design/ux-decisions.md",
    "operations/design/usability-notes.md",
    "operations/design/roles/ux-lead.role.md",
    "operations/design/skills/map-user-flow/SKILL.md",
    "operations/design/skills/create-screen-spec/SKILL.md",
    "operations/design/skills/define-ux-states/SKILL.md",
    ".github/agents",
    ".github/prompts",
    ".leanos/vscode",
    ".leanos/runtime/vscode",
    ".leanos/workflows/README.md",
    ".leanos/workflows/idea-to-roadmap.workflow.md",
    ".leanos/workflows/roadmap-to-github-project.workflow.md",
    ".leanos/workflows/feature-to-delivery-cycle.workflow.md",
    ".leanos/workflows/new-product-mvp-validation.workflow.md",
    ".leanos/workflows/prepare-pr.workflow.md",
    ".leanos/workflows/launch-and-learn.workflow.md",
    ".leanos/commands/evaluate-idea.md",
    ".leanos/commands/sync-roadmap.md",
    ".leanos/commands/create-issues.md",
    ".leanos/commands/workon-issue.md",
    ".leanos/commands/implement-issue.md",
    ".leanos/commands/post-merge.md",
    "strategy/company/README.md",
    "strategy/company/profile.md",
    "strategy/company/mission.md",
    "strategy/company/vision.md",
    "strategy/company/principles.md",
    "strategy/company/operating-model.md",
    "strategy/company/decision-log.md",
    "strategy/company/roles/company-strategist.role.md",
    "strategy/company/skills/define-company/SKILL.md",
    "strategy/company/playbooks/company-foundation.playbook.md",
    "strategy/product/brief.md",
    "strategy/product/problem.md",
    "strategy/product/icp.md",
    "strategy/product/jobs-to-be-done.md",
    "strategy/product/value-proposition.md",
    "strategy/product/positioning.md",
    "strategy/product/business-model-canvas.md",
    "strategy/roadmap/roadmap.md",
    "strategy/roadmap/milestones.md",
    "strategy/roadmap/current-cycle.md",
    "strategy/roadmap/backlog.md",
    "strategy/roadmap/playbooks/validation-cycle-planning.playbook.md",
    "strategy/workflows/idea-to-roadmap.workflow.md",
    "ai-standard/navigation-chain.md",
    "ai-standard/asset-taxonomy.md",
    "ai-standard/creation-rules.md",
    "ai-standard/quality-criteria.md",
    "ai-standard/naming-conventions.md",
    "ai-standard/folder-readme-rules.md",
    "ai-standard/folder-documentation-rules.md",
    "ai-standard/standards/README.md",
    "ai-standard/standards/navigation-chain.md",
    "ai-standard/standards/asset-taxonomy.md",
    "ai-standard/standards/creation-rules.md",
    "ai-standard/standards/quality-criteria.md",
    "ai-standard/standards/naming-conventions.md",
    "ai-standard/standards/folder-readme-rules.md",
    "ai-standard/templates/root-agent-template.md",
    "ai-standard/templates/department-agent-template.md",
    "ai-standard/templates/area-agent-template.md",
    "ai-standard/templates/role-template.md",
    "ai-standard/templates/skill-template.md",
    "ai-standard/templates/playbook-template.md",
    "ai-standard/templates/workflow-template.md",
    "ai-standard/templates/command-template.md",
    "ai-standard/templates/github-epic-template.md",
    "ai-standard/templates/github-feature-template.md",
    "ai-standard/templates/issue-readiness-matrix-template.md",
    "ai-standard/templates/branch-name-template.md",
    "ai-standard/templates/pull-request-template.md",
    "ai-standard/templates/code-review-template.md",
    "ai-standard/examples/example-agent.md",
    "ai-standard/examples/example-folder-readme.md",
    "ai-standard/examples/example-role-senior-developer.md",
    "ai-standard/examples/example-skill-check-coherence.md",
    "ai-standard/examples/example-playbook-prepare-pr.md"
  ]) {
    assert.equal(paths.has(forbiddenPath), false, `Forbidden generated path should not exist: ${forbiddenPath}`);
  }

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-generator-"));
  const result = await generateWorkspace(rootDir, answers);

  assert(result.writtenPaths.length > 0, "Expected files to be written");
  assert.equal(result.skippedPaths.length, 0, "Fresh generation should not skip files");

  await assertExists(join(rootDir, "AGENT.md"));
  await assertExists(join(rootDir, ".env.local"));
  await assertExists(join(rootDir, ".gitignore"));
  await assertExists(join(rootDir, "leanos.yaml"));
  await assertExists(join(rootDir, ".leanos", "standard", "README.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "README.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "asset-taxonomy.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "navigation-chain.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "progression-gates.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "creation-rules.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "quality-criteria.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "foundation", "folder-documentation-rules.md"));
  await assertExists(join(rootDir, ".leanos", "runtime", "scratch", "README.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "AGENT.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations")), false, "Operations should not be generated during initial Strategy-only setup");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "growth")), false, "Growth should not be generated during initial Strategy-only setup");
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "business", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "business", "knowledge", "profile.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "business", "knowledge", "business-model-canvas.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "business", "roles", "business-strategist.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "business", "skills", "business-model/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "knowledge", "README.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "knowledge", "brief.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "knowledge", "icp.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "knowledge", "validation-notes.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "knowledge", "mvp-validation-scope.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "roadmap", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "roadmap", "knowledge", "roadmap.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "roadmap", "playbooks", "roadmap-cycle-planning.playbook.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "validation")), false, "Strategy Validation should not be generated");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "idea-to-roadmap.workflow.md")), false, "Strategy should not generate idea-to-roadmap workflow");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "business-intake.workflow.md")), false, "Business intake workflow should not be generated");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "new-idea-intake.workflow.md")), false, "New idea intake workflow should not be generated");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "strategy-validation-cycle.workflow.md")), false, "Strategy validation workflow should not be generated");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "roadmap-to-github-project.workflow.md")), false, "Roadmap-to-GitHub workflow should not be generated");
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "roles", "product-strategist.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "skills", "business-baseline/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "skills", "product-core/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "skills", "mvp-validation-scope/SKILL.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "roadmap", "skills", "prepare-roadmap-sync/SKILL.md")), false, "Strategy Roadmap should not own GitHub sync skills");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "roadmap", "playbooks", "roadmap-sync-prep.playbook.md")), false, "Strategy Roadmap should not own GitHub sync playbooks");
  await assertExists(join(rootDir, ".github", "leanos", "github-settings.example.json"));
  await assertExists(join(rootDir, ".github", "leanos", "work-mapping.md"));
  await assertExists(join(rootDir, ".github", "leanos", "project-sync.yaml"));
  await assertExists(join(rootDir, ".github", "leanos", "sync-state.yaml"));
  await assertExists(join(rootDir, ".github", "leanos", "security-automation.md"));
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Generated workspaces should not use slash-command files as an interface");
  assert.equal(await exists(join(rootDir, ".leanos", "workflows")), false, "Business workflows should not be generated under .leanos/workflows");

  assert(result.createdGroups.includes(".leanos/standard/"), "Expected created groups to mention AI Standard under .leanos");
  assert(result.createdGroups.includes("-os/"), "Expected created groups to mention the product OS folder");
  assert.equal(result.createdGroups.some((group) => group === "operations/" || group === "growth/"), false, "Initial setup should not mention root Operations or Growth as created");
  assert(result.createdGroups.includes(".github/leanos"), "Expected created groups to mention GitHub LeanOS support files");

  await assertNoEditorAgentIntegration(rootDir);
  await assertFounderIntentRouting(rootDir);
  await assertBusinessAreaPattern(rootDir);
  await assertProductAreaPattern(rootDir);
  await assertRoadmapAreaPattern(rootDir);
  await assertAiStandardAssetTaxonomy(rootDir);
  await assertAiStandardTemplates(rootDir);
  await assertAiStandardChecklists(rootDir);
  await assertAiStandardInstructions(rootDir);
  await assertAiStandardExamples(rootDir);
  await assertAiStandardReadiness(rootDir);
  await assertNaturalStartupRules(rootDir);
  await assertRootAgentMutationRules(rootDir);
  await assertTraceDiagnostics(rootDir);
  await assertMvpValidationScopeSections(rootDir);
  await assertNoOldAiStandardReferences(rootDir);

  for (const forbiddenPath of [
    ".leanos/departments",
    "src",
    "app",
    "pages",
    "package.json",
    "vercel.json",
    ".leanos/workflows",
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
    "operations/security/database-security.md",
    "operations/security/secrets-management.md",
    "operations/security/infra-hardening.md",
    "operations/security/secure-coding.md",
    "operations/security/incident-response.md",
    "operations/security/skills/threat-model/SKILL.md",
    "operations/security/skills/review-security/SKILL.md",
    "operations/security/playbooks/security-review.playbook.md",
    "operations/security/playbooks/security-checklist.playbook.md",
    "operations/engineering/test-plan.md",
    "operations/design/design-principles.md",
    "operations/design/user-flows.md",
    "operations/design/screen-specs.md",
    "operations/design/ux-decisions.md",
    "operations/design/usability-notes.md",
    "ai-standard/navigation-chain.md",
    "ai-standard/asset-taxonomy.md",
    "ai-standard/creation-rules.md",
    "ai-standard/quality-criteria.md",
    "ai-standard/naming-conventions.md",
    "ai-standard/folder-readme-rules.md",
    "ai-standard/folder-documentation-rules.md",
    "ai-standard/standards",
    "ai-standard/templates/root-agent-template.md",
    "ai-standard/templates/department-agent-template.md",
    "ai-standard/templates/area-agent-template.md",
    "ai-standard/templates/role-template.md",
    "ai-standard/templates/skill-template.md",
    "ai-standard/templates/playbook-template.md",
    "ai-standard/templates/workflow-template.md",
    "ai-standard/templates/command-template.md",
    "ai-standard/templates/github-epic-template.md",
    "ai-standard/templates/github-feature-template.md",
    "ai-standard/templates/issue-readiness-matrix-template.md",
    "ai-standard/templates/branch-name-template.md",
    "ai-standard/templates/pull-request-template.md",
    "ai-standard/templates/code-review-template.md",
    "ai-standard/examples/example-agent.md",
    "ai-standard/examples/example-folder-readme.md",
    "ai-standard/examples/example-role-senior-developer.md",
    "ai-standard/examples/example-skill-check-coherence.md",
    "ai-standard/examples/example-playbook-prepare-pr.md"
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
  assert.equal(yaml.paths.business_os, "clinic-assistant-ai-os");
  assert.equal(yaml.paths.runtime, ".leanos/runtime");
  assert.equal(yaml.paths.standard_library, ".leanos/standard");
  assert.equal(yaml.paths.strategy, "clinic-assistant-ai-os/strategy");
  assert.equal(yaml.paths.operations, "clinic-assistant-ai-os/operations");
  assert.equal(yaml.paths.growth, "clinic-assistant-ai-os/growth");
  assert.equal(yaml.runtime.scratch, ".leanos/runtime/scratch", "leanos.yaml should point runtime scratch to .leanos/runtime/scratch");
  assert.equal(yaml.agent.navigation_chain.doc, ".leanos/standard/foundation/navigation-chain.md");
  assert.equal(yaml.ai_standard.path, ".leanos/standard/README.md");
  assert.equal(yaml.ai_standard.foundation, ".leanos/standard/foundation");
  assert.equal(yaml.roles.ownership, "area-first");
  assert.equal(yaml.skills.ownership, "area-first");
  assert.equal(yaml.playbooks.ownership, "area-first");
  assert.equal(yaml.workflows.ownership, "department-local");
  assert.equal(yaml.departments.routes.strategy.agent, "clinic-assistant-ai-os/strategy/AGENT.md");
  assert.equal(yaml.departments.routes.strategy.readme, "clinic-assistant-ai-os/strategy/README.md");
  assert.equal(yaml.departments.routes.operations, undefined, "Operations should not be an active route during initial setup");
  assert.equal(yaml.departments.routes.growth, undefined, "Growth should not be an active route during initial setup");
  assert.equal(yaml.workflows.active.includes("idea-to-roadmap"), false, "Strategy should not expose idea-to-roadmap workflow");
  assert.equal(yaml.workflows.active.includes("business-intake"), false, "Strategy should not expose business-intake workflow");
  assert.equal(yaml.workflows.active.includes("new-idea-intake"), false, "Strategy should not expose new-idea-intake workflow");
  assert.equal(yaml.workflows.active.includes("strategy-validation-cycle"), false, "Strategy validation workflow should not be active");
  assert.equal(yaml.workflows.active.includes("roadmap-to-github-project"), false, "Strategy should not expose roadmap-to-GitHub workflow");
  assert.equal(yaml.workflows.active.includes("roadmap-item-to-epic"), false, "Operations workflows should not be active during initial setup");
  assert.equal(yaml.workflows.active.includes("roadmap-item-to-delivery-scope"), false, "Obsolete roadmap item to delivery scope workflow should not be active");
  assert.equal(yaml.workflows.active.includes("delivery-scope-to-epic"), false, "Obsolete delivery scope to epic workflow should not be active");
  assert.equal(yaml.workflows.active.includes("mvp-to-pr"), false, "Obsolete MVP to PR workflow should not be active");
  assert.equal(yaml.workflows.active.includes("epic-to-features"), false, "Operations workflows should not be active during initial setup");
  assert.equal(yaml.workflows.active.includes("feature-to-delivery-cycle"), false, "Operations workflows should not be active during initial setup");
  assert.deepEqual(yaml.departments.active, ["strategy"]);
  assert.equal(yaml.activation.mode, "progressive", "leanos.yaml should declare progressive activation mode");
  assert.equal(yaml.activation.current_stage, "setup-seed", "leanos.yaml should start at setup seed");
  assert.equal(yaml.activation.progression_model, ".leanos/standard/foundation/founder-progression-model.md", "leanos.yaml should point to the Founder Progression Model");
  assert.equal(yaml.activation.progression_gates, ".leanos/standard/foundation/progression-gates.md", "leanos.yaml should point to Progression Gates");
  assert.deepEqual(yaml.activation.inactive_departments, ["operations", "growth"], "leanos.yaml should mark Operations and Growth inactive at setup");
  assert.deepEqual(yaml.activation.available_departments, ["strategy", "operations", "growth"], "leanos.yaml should list departments that can be activated later");
  assert.deepEqual(yaml.activation.active_departments, yaml.departments.active, "leanos.yaml activation state should mirror active departments");
  assert.deepEqual(yaml.activation.active_areas, initialStrategySubareas, "Initial setup should activate only core Strategy areas");
  assert(yaml.activation.inactive_areas.includes("operations.product-ops"), "Initial setup should keep Product Ops inactive");
  assert(yaml.activation.inactive_areas.includes("operations.engineering"), "Initial setup should keep Engineering inactive");
  assert(yaml.activation.inactive_areas.includes("growth.marketing"), "Initial setup should keep Growth areas inactive");
  assert.deepEqual(yaml.activation.founder_selected_departments, ["strategy", "operations", "growth"], "leanos.yaml should preserve founder-selected departments for later activation");
  assert.deepEqual(yaml.activation.founder_selected_areas, answers.subareas, "leanos.yaml should preserve founder-selected areas for later activation");
  assert.deepEqual(yaml.activation.active_areas, yaml.subareas.active.map((subarea) => subarea.key), "leanos.yaml activation state should mirror active areas");
  assert.equal(yaml.activation.available_means, "can_be_activated_later_not_path_exists", "leanos.yaml should explain available does not mean path exists");
  assert.equal(yaml.activation.missing_asset_behavior, "return_activation_required", "leanos.yaml should require activation_required for missing inactive assets");

  for (const subarea of yaml.subareas.active) {
    await assertExists(join(rootDir, subarea.path));
  }

  await assertIndexPathsExist(rootDir);
  await assertInitialContextCoherence(rootDir, answers.subareas);
}
