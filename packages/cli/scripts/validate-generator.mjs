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
  "strategy.business",
  "strategy.product",
  "strategy.roadmap",
  "strategy.validation",
  "operations.product-ops",
  "operations.design",
  "operations.engineering",
  "operations.devops",
  "operations.security",
  "growth.customer-experience",
  "growth.marketing",
  "growth.finance"
];

const initialStrategySubareas = [
  "strategy.business",
  "strategy.product",
  "strategy.roadmap",
  "strategy.validation"
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

const designOnlyAnswers = {
  ...answers,
  subareas: ["operations.design"]
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
await validateDesignOnlyContext();
await validateGrowthValidationContext();
await validateExistingProductRepoMode();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");

async function validateWorkspaceFiles() {
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
    "ai-standard/templates/commands/README.md",
    "ai-standard/templates/commands/command-template.md",
    "ai-standard/templates/github/README.md",
    "ai-standard/templates/github/github-epic-template.md",
    "ai-standard/templates/github/github-feature-template.md",
    "ai-standard/templates/github/delivery-readiness-matrix-template.md",
    "ai-standard/templates/product/README.md",
    "ai-standard/templates/product/epic-template.md",
    "ai-standard/templates/product/feature-template.md",
    "ai-standard/templates/design/README.md",
    "ai-standard/templates/design/component-spec-template.md",
    "ai-standard/templates/review/README.md",
    "ai-standard/templates/review/code-review-template.md",
    "ai-standard/checklists/agent-quality-checklist.md",
    "ai-standard/checklists/area-quality-checklist.md",
    "ai-standard/checklists/command-quality-checklist.md",
    "ai-standard/checklists/department-quality-checklist.md",
    "ai-standard/checklists/playbook-quality-checklist.md",
    "ai-standard/checklists/readme-quality-checklist.md",
    "ai-standard/checklists/role-quality-checklist.md",
    "ai-standard/checklists/skill-quality-checklist.md",
    "ai-standard/checklists/workflow-quality-checklist.md",
    "ai-standard/instructions/README.md",
    "ai-standard/instructions/create-agent-instructions.md",
    "ai-standard/instructions/create-area-instructions.md",
    "ai-standard/instructions/create-command-instructions.md",
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
    "ai-standard/examples/execution/example-skill-check-coherence.md",
    "ai-standard/examples/execution/example-playbook-prepare-pr.md",
    "ai-standard/examples/execution/example-workflow-feature-to-delivery-cycle.md",
    "ai-standard/examples/commands/README.md",
    "ai-standard/examples/commands/example-command-define-design.md",
    "ai-standard/examples/github/README.md",
    "ai-standard/examples/github/example-github-epic.md",
    "ai-standard/examples/github/example-github-feature.md",
    "ai-standard/examples/github/example-pull-request.md",
    "ai-standard/examples/review/README.md",
    "ai-standard/examples/review/example-code-review.md",
    ".leanos/index/areas.yaml",
    ".leanos/index/routing-map.yaml",
    ".leanos/agent/protocols/chief-trace.md",
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
    "strategy/business/knowledge/decision-log.md",
    "strategy/business/roles/business-strategist.role.md",
    "strategy/business/skills/define-business-identity.skill.md",
    "strategy/business/skills/clarify-operating-model.skill.md",
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
    "strategy/product/knowledge/business-model-canvas.md",
    "strategy/product/skills/evaluate-idea.skill.md",
    "strategy/workflows/new-idea-intake.workflow.md",
    "strategy/workflows/idea-to-roadmap.workflow.md",
    "strategy/workflows/roadmap-to-github-project.workflow.md",
    "strategy/roadmap/AGENT.md",
    "strategy/roadmap/knowledge/README.md",
    "strategy/roadmap/knowledge/roadmap.md",
    "strategy/roadmap/knowledge/milestones.md",
    "strategy/roadmap/knowledge/current-cycle.md",
    "strategy/roadmap/knowledge/backlog.md",
    "strategy/roadmap/skills/prepare-roadmap-sync.skill.md",
    "strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/product-ops/AGENT.md",
    "operations/product-ops/README.md",
    "operations/product-ops/knowledge/README.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/knowledge/technical-decisions.md",
    "operations/product-ops/epics/README.md",
    "operations/product-ops/mvp/README.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/skills/shape-epic.skill.md",
    "operations/product-ops/skills/write-feature-criteria.skill.md",
    "operations/product-ops/skills/define-delivery-boundaries.skill.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "operations/workflows/epic-to-features.workflow.md",
    "operations/workflows/feature-to-delivery-cycle.workflow.md",
    "operations/workflows/post-merge-continuation.workflow.md",
    ".leanos/commands/define-design.md",
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
    "operations/design/skills/design-system.skill.md",
    "operations/design/skills/accessibility.skill.md",
    "operations/design/skills/user-research.skill.md",
    "operations/design/skills/user-flow-mapping.skill.md",
    "operations/design/skills/screen-specification.skill.md",
    "operations/design/skills/microcopy.skill.md",
    "operations/design/skills/design-review.skill.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/design/playbooks/user-research.playbook.md",
    "operations/design/playbooks/accessibility-review.playbook.md",
    "operations/design/playbooks/ux-writing.playbook.md",
    "operations/engineering/AGENT.md",
    "operations/engineering/knowledge/README.md",
    "operations/engineering/knowledge/code-standards.md",
    "operations/engineering/knowledge/implementation-rules.md",
    "operations/engineering/knowledge/component-guidelines.md",
    "operations/engineering/knowledge/data-guidelines.md",
    "operations/engineering/knowledge/testing-strategy.md",
    "operations/engineering/knowledge/review-criteria.md",
    "operations/engineering/knowledge/implementation-notes.md",
    "operations/engineering/knowledge/code-review-notes.md",
    "operations/engineering/knowledge/pr-log.md",
    "operations/engineering/roles/test-engineer.role.md",
    "operations/engineering/skills/follow-code-standards.skill.md",
    "operations/engineering/skills/implement-component.skill.md",
    "operations/engineering/skills/review-data-change.skill.md",
    "operations/engineering/playbooks/engineering-delivery.playbook.md",
    "operations/engineering/playbooks/prepare-pr.playbook.md",
    "operations/engineering/playbooks/component-implementation.playbook.md",
    "operations/engineering/playbooks/branch-for-feature.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/engineering/skills/create-branch.skill.md",
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
    "operations/devops/skills/setup-ci.skill.md",
    "operations/devops/skills/plan-deployment.skill.md",
    "operations/devops/skills/configure-github-project.skill.md",
    "operations/devops/skills/configure-environments.skill.md",
    "operations/devops/skills/define-observability.skill.md",
    "operations/devops/skills/prepare-release.skill.md",
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
    "operations/security/knowledge/security-automation.md",
    "operations/security/knowledge/security-automation.md",
    "operations/security/roles/security-reviewer.role.md",
    "operations/security/roles/application-security-engineer.role.md",
    "operations/security/roles/cloud-security-reviewer.role.md",
    "operations/security/roles/data-protection-reviewer.role.md",
    "operations/security/skills/threat-modeling.skill.md",
    "operations/security/skills/access-control-review.skill.md",
    "operations/security/skills/api-security-review.skill.md",
    "operations/security/skills/database-security-review.skill.md",
    "operations/security/skills/secrets-management.skill.md",
    "operations/security/skills/secure-code-review.skill.md",
    "operations/security/skills/dependency-supply-chain-review.skill.md",
    "operations/security/skills/infra-hardening-review.skill.md",
    "operations/security/skills/incident-response.skill.md",
    "operations/security/skills/ai-generated-code-security.skill.md",
    "operations/security/skills/security-automation-readiness.skill.md",
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
    "growth/customer-experience/skills/map-customer-feedback.skill.md",
    "growth/customer-experience/skills/synthesize-support-patterns.skill.md",
    "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
    "growth/marketing/AGENT.md",
    "growth/marketing/knowledge/README.md",
    "growth/marketing/knowledge/positioning.md",
    "growth/marketing/knowledge/landing-page.md",
    "growth/marketing/knowledge/acquisition-channels.md",
    "growth/marketing/knowledge/launch-plan.md",
    "growth/marketing/roles/growth-lead.role.md",
    "growth/marketing/skills/define-positioning.skill.md",
    "growth/marketing/skills/create-landing-page-copy.skill.md",
    "growth/marketing/skills/create-launch-plan.skill.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    "growth/finance/AGENT.md",
    "growth/finance/knowledge/README.md",
    "growth/finance/knowledge/pricing.md",
    "growth/finance/knowledge/revenue-model.md",
    "growth/finance/knowledge/unit-economics.md",
    "growth/finance/knowledge/budget.md",
    "growth/finance/knowledge/finance-risks.md",
    "growth/finance/roles/finance-operator.role.md",
    "growth/finance/skills/review-pricing.skill.md",
    "growth/finance/skills/model-unit-economics.skill.md",
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
    ".github/leanos/security-automation.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/commands/create-features.md",
    ".leanos/commands/github-sync.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md",
    ".leanos/vscode/README.md"
  ];

  for (const expectedPath of expectedWorkspacePaths.filter(isInitialStrategyWorkspacePath)) {
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
    "operations/AGENT.md",
    "operations/product-ops/README.md",
    "operations/engineering/README.md",
    "growth/AGENT.md",
    "growth/marketing/README.md",
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
    "operations/security/skills/threat-model.skill.md",
    "operations/security/skills/review-security.skill.md",
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
    "operations/design/skills/map-user-flow.skill.md",
    "operations/design/skills/create-screen-spec.skill.md",
    "operations/design/skills/define-ux-states.skill.md",
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
    "strategy/company/skills/define-company.skill.md",
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
  await assertExists(join(rootDir, "ai-standard", "README.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "README.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "asset-taxonomy.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "navigation-chain.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "creation-rules.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "quality-criteria.md"));
  await assertExists(join(rootDir, "ai-standard", "foundation", "folder-documentation-rules.md"));
  await assertExists(join(rootDir, "strategy", "AGENT.md"));
  assert.equal(await exists(join(rootDir, "operations")), false, "Operations should not be generated during initial Strategy-only setup");
  assert.equal(await exists(join(rootDir, "growth")), false, "Growth should not be generated during initial Strategy-only setup");
  await assertExists(join(rootDir, "strategy", "business", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "business", "knowledge", "profile.md"));
  await assertExists(join(rootDir, "strategy", "business", "roles", "business-strategist.role.md"));
  await assertExists(join(rootDir, "strategy", "product", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "product", "knowledge", "README.md"));
  await assertExists(join(rootDir, "strategy", "product", "knowledge", "brief.md"));
  await assertExists(join(rootDir, "strategy", "product", "knowledge", "icp.md"));
  await assertExists(join(rootDir, "strategy", "product", "knowledge", "validation-notes.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "knowledge", "roadmap.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-cycle-planning.playbook.md"));
  await assertExists(join(rootDir, "strategy", "validation", "README.md"));
  await assertExists(join(rootDir, "strategy", "validation", "assumptions.md"));
  await assertExists(join(rootDir, "strategy", "validation", "experiments.md"));
  await assertExists(join(rootDir, "strategy", "workflows", "new-idea-intake.workflow.md"));
  await assertExists(join(rootDir, "strategy", "workflows", "idea-to-roadmap.workflow.md"));
  await assertExists(join(rootDir, "strategy", "workflows", "roadmap-to-github-project.workflow.md"));
  const newIdeaWorkflow = await readFile(join(rootDir, "strategy", "workflows", "new-idea-intake.workflow.md"), "utf8");
  const ideaToRoadmapWorkflow = await readFile(join(rootDir, "strategy", "workflows", "idea-to-roadmap.workflow.md"), "utf8");
  assert(newIdeaWorkflow.includes("## Continuation Bridge"), "New idea intake workflow should offer a continuation bridge");
  assert(newIdeaWorkflow.includes("Next route:\n\n`idea-to-roadmap`"), "New idea intake workflow should bridge to idea-to-roadmap");
  assert(newIdeaWorkflow.includes("## Founder Triggers"), "New idea intake workflow should define founder triggers");
  assert(newIdeaWorkflow.includes("## Confirmation Gates"), "New idea intake workflow should define confirmation gates");
  assert(newIdeaWorkflow.includes("## Allowed Updates"), "New idea intake workflow should define allowed updates");
  assert(newIdeaWorkflow.includes("## Forbidden Updates"), "New idea intake workflow should define forbidden updates");
  assert(newIdeaWorkflow.includes("Use Validation only when it exists"), "New idea intake workflow should not require Validation by default");
  assert(ideaToRoadmapWorkflow.includes("## Continuation Bridge"), "Idea-to-roadmap workflow should offer a continuation bridge");
  assert(
    ideaToRoadmapWorkflow.includes("Next route:\n\n`activation_required: operations.product-ops, then roadmap-item-to-epic`"),
    "Idea-to-roadmap workflow should request Product Ops activation before roadmap-item-to-epic"
  );
  assert(ideaToRoadmapWorkflow.includes("## Founder Triggers"), "Idea-to-roadmap workflow should define founder triggers");
  assert(ideaToRoadmapWorkflow.includes("## Confirmation Gates"), "Idea-to-roadmap workflow should define confirmation gates");
  assert(ideaToRoadmapWorkflow.includes("Do not mark as delivery scope, MVP, Epic or GitHub work"), "Idea-to-roadmap should not automatically promote roadmap items to delivery");
  assert(ideaToRoadmapWorkflow.includes("## Stop Conditions"), "Idea-to-roadmap workflow should define stop conditions");
  await assertExists(join(rootDir, "strategy", "product", "roles", "product-strategist.role.md"));
  await assertExists(join(rootDir, "strategy", "product", "skills", "evaluate-idea.skill.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "skills", "prepare-roadmap-sync.skill.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-sync-prep.playbook.md"));
  await assertExists(join(rootDir, ".github", "agents", "leanos-chief.agent.md"));
  await assertExists(join(rootDir, ".github", "leanos", "github-settings.example.json"));
  await assertExists(join(rootDir, ".github", "leanos", "work-mapping.md"));
  await assertExists(join(rootDir, ".github", "leanos", "project-sync.yaml"));
  await assertExists(join(rootDir, ".github", "leanos", "sync-state.yaml"));
  await assertExists(join(rootDir, ".github", "leanos", "security-automation.md"));
  await assertExists(join(rootDir, ".github", "prompts", "start-leanos.prompt.md"));
  await assertExists(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"));
  await assertExists(join(rootDir, ".leanos", "commands", "start-leanos.md"));
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "github-sync.md")), false, "GitHub sync command should wait for DevOps activation");
  await assertExists(join(rootDir, ".leanos", "vscode", "README.md"));
  assert.equal(await exists(join(rootDir, ".leanos", "workflows")), false, "Business workflows should not be generated under .leanos/workflows");

  assert(result.createdGroups.includes("ai-standard/"), "Expected created groups to mention root AI Standard");
  assert(result.createdGroups.includes("strategy/"), "Expected created groups to mention Strategy");
  assert.equal(result.createdGroups.includes("operations/"), false, "Initial setup should not mention Operations as created");
  assert.equal(result.createdGroups.includes("growth/"), false, "Initial setup should not mention Growth as created");
  assert(result.createdGroups.includes(".github/leanos"), "Expected created groups to mention GitHub LeanOS support files");

  await assertVsCodeIntegration(rootDir);
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
  await assertInitCommandRules(rootDir);
  await assertRootAgentMutationRules(rootDir);
  await assertTraceDiagnostics(rootDir);
  await assertValidationLoopSections(rootDir);
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
    "operations/security/skills/threat-model.skill.md",
    "operations/security/skills/review-security.skill.md",
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
  assert.equal(yaml.agent.navigation_chain.doc, "ai-standard/foundation/navigation-chain.md");
  assert.equal(yaml.ai_standard.path, "ai-standard/README.md");
  assert.equal(yaml.ai_standard.foundation, "ai-standard/foundation");
  assert.equal(yaml.roles.ownership, "area-first");
  assert.equal(yaml.skills.ownership, "area-first");
  assert.equal(yaml.playbooks.ownership, "area-first");
  assert.equal(yaml.workflows.ownership, "department-local");
  assert.equal(yaml.departments.routes.strategy.agent, "strategy/AGENT.md");
  assert.equal(yaml.departments.routes.strategy.readme, "strategy/README.md");
  assert.equal(yaml.departments.routes.operations, undefined, "Operations should not be an active route during initial setup");
  assert.equal(yaml.departments.routes.growth, undefined, "Growth should not be an active route during initial setup");
  assert(yaml.workflows.active.includes("new-idea-intake"), "Expected active local Strategy new-idea-intake workflow");
  assert(yaml.workflows.active.includes("idea-to-roadmap"), "Expected active local Strategy idea-to-roadmap workflow");
  assert(yaml.workflows.active.includes("roadmap-to-github-project"), "Expected active local Strategy GitHub roadmap workflow");
  assert.equal(yaml.workflows.active.includes("roadmap-item-to-epic"), false, "Operations workflows should not be active during initial setup");
  assert.equal(yaml.workflows.active.includes("roadmap-item-to-delivery-scope"), false, "Obsolete roadmap item to delivery scope workflow should not be active");
  assert.equal(yaml.workflows.active.includes("delivery-scope-to-epic"), false, "Obsolete delivery scope to epic workflow should not be active");
  assert.equal(yaml.workflows.active.includes("mvp-to-pr"), false, "Obsolete MVP to PR workflow should not be active");
  assert.equal(yaml.workflows.active.includes("epic-to-features"), false, "Operations workflows should not be active during initial setup");
  assert.equal(yaml.workflows.active.includes("feature-to-delivery-cycle"), false, "Operations workflows should not be active during initial setup");
  assert.deepEqual(yaml.departments.active, ["strategy"]);
  assert.equal(yaml.activation.mode, "progressive", "leanos.yaml should declare progressive activation mode");
  assert.equal(yaml.activation.current_stage, "setup-seed", "leanos.yaml should start at setup seed");
  assert.equal(yaml.activation.progression_model, "ai-standard/foundation/founder-progression-model.md", "leanos.yaml should point to the Founder Progression Model");
  assert.deepEqual(yaml.activation.inactive_departments, ["operations", "growth"], "leanos.yaml should mark Operations and Growth inactive at setup");
  assert.deepEqual(yaml.activation.available_departments, ["strategy", "operations", "growth"], "leanos.yaml should list departments that can be activated later");
  assert.deepEqual(yaml.activation.active_departments, yaml.departments.active, "leanos.yaml activation state should mirror active departments");
  assert.deepEqual(yaml.activation.active_areas, ["strategy.business", "strategy.product", "strategy.roadmap", "strategy.validation"], "Initial setup should activate only Strategy areas");
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

async function validateClientWorkspaceFixture() {
  const requiredPaths = [
    "AGENT.md",
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "strategy/product/README.md",
    "strategy/product/skills/evaluate-idea.skill.md",
    "strategy/product/knowledge/validation-notes.md",
    "strategy/workflows/new-idea-intake.workflow.md",
    "strategy/workflows/idea-to-roadmap.workflow.md",
    "strategy/workflows/roadmap-to-github-project.workflow.md",
    "strategy/roadmap/skills/prepare-roadmap-sync.skill.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/product-ops/AGENT.md",
    "operations/product-ops/knowledge/README.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/mvp/README.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/skills/shape-epic.skill.md",
    "operations/product-ops/skills/write-feature-criteria.skill.md",
    "operations/product-ops/skills/define-delivery-boundaries.skill.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "ai-standard/templates/design/component-spec-template.md",
    "operations/design/knowledge/README.md",
    "operations/design/knowledge/design-system.md",
    "operations/design/knowledge/accessibility.md",
    "operations/design/knowledge/user-flows.md",
    "operations/design/knowledge/component-inventory.md",
    "operations/design/knowledge/components/README.md",
    "operations/design/roles/README.md",
    "operations/design/skills/design-system.skill.md",
    "operations/design/skills/accessibility.skill.md",
    "operations/design/skills/component-analysis.skill.md",
    "operations/design/playbooks/design-foundation.playbook.md",
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
    "operations/engineering/skills/follow-code-standards.skill.md",
    "operations/engineering/skills/implement-component.skill.md",
    "operations/engineering/skills/review-data-change.skill.md",
    "operations/engineering/skills/create-branch.skill.md",
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
    "operations/devops/skills/setup-ci.skill.md",
    "operations/devops/skills/plan-deployment.skill.md",
    "operations/devops/skills/configure-github-project.skill.md",
    "operations/devops/skills/configure-environments.skill.md",
    "operations/devops/skills/define-observability.skill.md",
    "operations/devops/skills/prepare-release.skill.md",
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
    "operations/security/skills/ai-generated-code-security.skill.md",
    "operations/security/skills/security-automation-readiness.skill.md",
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
    ".leanos/commands/start-leanos.md",
    ".leanos/commands/define-design.md",
    ".leanos/commands/create-features.md",
    ".leanos/commands/github-sync.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md",
    ".leanos/vscode/README.md"
  ];

  for (const requiredPath of requiredPaths.filter(isInitialStrategyWorkspacePath)) {
    if (!(await exists(resolveFixturePath(requiredPath)))) {
      failOutOfDate([`Missing fixture file: ${requiredPath}`]);
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
    "operations/security/skills/threat-model.skill.md",
    "operations/security/skills/review-security.skill.md",
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

  await assertNoOldAiStandardReferences(clientWorkspaceFixtureDir);
  await assertWorkflowContract(clientWorkspaceFixtureDir);
  await assertCommandContract(clientWorkspaceFixtureDir);
}

async function validatePartialAreaSelection() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-partial-"));
  await generateWorkspace(rootDir, partialAreaAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, partialAreaAnswers.subareas);
}

async function validateEngineeringOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-engineering-only-"));
  await generateWorkspace(rootDir, engineeringOnlyAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, engineeringOnlyAnswers.subareas);
}

async function validateDesignOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-design-only-"));
  await generateWorkspace(rootDir, designOnlyAnswers);

  await assertProgressiveStrategyOnlyWorkspace(rootDir, designOnlyAnswers.subareas);
}

async function validateGrowthValidationContext() {
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
  await assertExists(join(rootDir, "strategy", "validation", "README.md"));
  assert.equal(await exists(join(rootDir, "operations")), false, "Operations should wait for progressive activation");
  assert.equal(await exists(join(rootDir, "growth")), false, "Growth should wait for progressive activation");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "define-mvp.md")), false, "Product Ops command should wait for activation");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "define-design.md")), false, "Design command should wait for activation");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "workon-feature.md")), false, "Engineering command should wait for activation");

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
  assert(rolesIndex.roles.some((role) => role.key === "validation-researcher"), "Validation role should be indexed in initial Strategy");
  assert.equal(rolesIndex.roles.some((role) => role.key === "senior-developer"), false, "Engineering role should wait for Operations activation");
  assert.equal(rolesIndex.roles.some((role) => role.key === "growth-lead"), false, "Growth role should wait for Growth activation");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "create-launch-plan"), false, "Growth skill should wait for Growth activation");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-delivery"), false, "Product Ops playbook should wait for Operations activation");

  assert.equal(routingMap.routing.departments.strategy.agent, "../../strategy/AGENT.md");
  assert.equal(routingMap.routing.departments.operations, undefined);
  assert.equal(routingMap.routing.departments.growth, undefined);
  assert.equal(routingMap.routing.areas.product.agent, "../../strategy/product/AGENT.md");
  assert.equal(routingMap.routing.areas.validation, "../../strategy/validation/README.md");
  assert.equal(routingMap.routing.areas.engineering, undefined);
  assert.equal(routingMap.routing.areas.marketing, undefined);
  assert(workspaceSummary.includes("Active departments: strategy"), "Workspace summary should list only Strategy as active");
  assert(workspaceSummary.includes("Active areas: strategy.business, strategy.product, strategy.roadmap, strategy.validation"), "Workspace summary should list initial Strategy areas");

  await assertIndexPathsExist(rootDir);
  await assertInitialContextCoherence(rootDir, founderSelectedSubareas);
}

function selectedDepartmentsFromSubareas(subareas) {
  const selected = new Set(subareas.map((subarea) => subarea.split(".")[0]));
  return ["strategy", "operations", "growth"].filter((department) => selected.has(department));
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
  const envLocal = await readFile(join(rootDir, ".env.local"), "utf8");
  const gitignore = await readFile(join(rootDir, ".gitignore"), "utf8");
  const settingsExample = await readFile(join(rootDir, ".github", "leanos", "github-settings.example.json"), "utf8");
  const workMapping = await readFile(join(rootDir, ".github", "leanos", "work-mapping.md"), "utf8");
  const projectSync = await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8");
  const syncState = await readFile(join(rootDir, ".github", "leanos", "sync-state.yaml"), "utf8");
  const labels = await readFile(join(rootDir, ".github", "leanos", "labels.yaml"), "utf8");
  const githubSyncCommand = await readFile(join(rootDir, ".leanos", "commands", "github-sync.md"), "utf8");
  const githubReadme = await readFile(join(rootDir, ".github", "leanos", "README.md"), "utf8");
  const githubSetupGuide = await readFile(join(rootDir, ".github", "leanos", "setup-guide.md"), "utf8");
  const githubCapabilityContract = await readFile(join(rootDir, ".github", "leanos", "capability-contract.md"), "utf8");
  const githubRole = await readFile(join(rootDir, "operations", "devops", "roles", "github-devops.role.md"), "utf8");
  const githubSkill = await readFile(join(rootDir, "operations", "devops", "skills", "configure-github-project.skill.md"), "utf8");
  const githubPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "configure-github-project.playbook.md"), "utf8");
  const settings = JSON.parse(settingsExample);
  const projectSyncYaml = parse(projectSync);

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
  assert(settingsExample.includes("env:GH_TOKEN"), "GitHub settings example should document GH_TOKEN as a token source");
  assert(settingsExample.includes("github_cli_auth"), "GitHub settings example should document GitHub CLI auth as a token source");
  assert.equal(projectSyncYaml.github.status, "pending_user_token", "GitHub project sync should wait for a user token when management is prepared");
  assert.equal(projectSyncYaml.github.project_sync.status, "pending_configuration", "GitHub project sync should record pending configuration when management is prepared");
  assert.equal(projectSyncYaml.github.project_sync.enabled, false, "GitHub project sync should start disabled");
  assert.equal(projectSyncYaml.github.work_mapping.epic.github_target, "issue", "GitHub mapping should sync Epics to issues");
  assert.equal(projectSyncYaml.github.work_mapping.feature.github_target, "issue", "GitHub mapping should sync Features to issues");
  assert.equal(projectSyncYaml.github.work_mapping.task.github_target, "feature_issue_checklist", "GitHub mapping should keep Tasks as Feature checklists by default");
  assert.equal(projectSyncYaml.github.work_mapping.task.separate_issue_default, false, "GitHub mapping should not create task issues by default");
  assert.equal(projectSyncYaml.github.rules.never_store_token, true, "GitHub project sync should forbid token storage");
  assert.equal(projectSyncYaml.github.rules.dry_run_before_remote_write, true, "GitHub project sync should require dry-run before remote writes");
  assert.equal(projectSyncYaml.github.rules.require_confirmation_before_api_write, true, "GitHub project sync should require confirmation before API writes");
  assert(workMapping.includes("Epic folder README"), "GitHub work mapping should map local Epic README files");
  assert(workMapping.includes("Feature markdown file"), "GitHub work mapping should map local Feature files");
  assert(workMapping.includes("Feature Tasks"), "GitHub work mapping should keep Feature tasks as checklists");
  assert(workMapping.includes("Exceptional Task"), "GitHub work mapping should define task issue exceptions");
  assert(workMapping.includes("Use `/github-sync` as the chat intent for this flow"), "GitHub work mapping should route sync through /github-sync");
  assert(workMapping.includes("Do not create or depend on `operations/product-ops/epics/synced/`"), "GitHub work mapping should avoid a synced archive folder");
  assert(workMapping.includes("use `sync-state.yaml` as the index"), "GitHub work mapping should use sync-state as the sync index");
  assert(githubSyncCommand.includes("# /github-sync"), "GitHub sync command should be generated");
  assert(githubSyncCommand.includes("operations/product-ops/epics/"), "GitHub sync command should read local Epics and Features");
  assert(githubSyncCommand.includes(".github/leanos/work-mapping.md"), "GitHub sync command should load work mapping");
  assert(githubSyncCommand.includes(".github/leanos/sync-state.yaml"), "GitHub sync command should compare sync state");
  assert(githubSyncCommand.includes("## Phase 1: GitHub Readiness Check"), "GitHub sync command should start with readiness check");
  assert(githubSyncCommand.includes("## Phase 2: Setup Fallback"), "GitHub sync command should guide setup when readiness fails");
  assert(githubSyncCommand.includes("## Phase 3: Dry-Run Sync Process"), "GitHub sync command should separate dry-run sync from readiness");
  assert(githubSyncCommand.includes("## Phase 5: Capability Handoff"), "GitHub sync command should hand off remote writes to a future capability");
  assert(githubSyncCommand.includes(".github/leanos/capability-contract.md"), "GitHub sync command should load capability contract");
  assert(githubSyncCommand.includes("gh auth status"), "GitHub sync command should mention optional GitHub CLI auth checks");
  assert(githubSyncCommand.includes("Never ask the founder to paste a token into chat"), "GitHub sync command should protect token handling");
  assert(githubSyncCommand.includes("assume GitHub is ready before Phase 1 passes"), "GitHub sync command should not assume GitHub is ready");
  assert(githubSyncCommand.includes("dry-run summary"), "GitHub sync command should prepare a dry-run");
  assert(githubSyncCommand.includes("Do not call GitHub API directly from the model"), "GitHub sync command should block direct model API writes");
  assert(githubSyncCommand.includes("Feature Tasks as checklists"), "GitHub sync command should keep tasks as feature checklists by default");
  assert(githubSyncCommand.includes("may store GitHub issue numbers"), "GitHub sync command should allow only non-secret sync-state updates");
  assert(syncState.includes("must never store tokens"), "GitHub sync state should warn against storing tokens");
  assert(syncState.includes("features: {}"), "GitHub sync state should track features");
  assert(syncState.includes("task_issues: {}"), "GitHub sync state should track exceptional task issues");
  assert.equal(syncState.includes("sub_issues"), false, "GitHub sync state should not use old sub_issues terminology");
  assert(labels.includes("name: epic"), "GitHub labels should include epic");
  assert(labels.includes("name: feature"), "GitHub labels should include feature");
  assert(labels.includes("name: task"), "GitHub labels should include exceptional task issues");
  assert(githubReadme.includes("Route GitHub setup through `../../operations/devops/AGENT.md`"), "GitHub README should route setup through DevOps when active");
  assert(githubReadme.includes("setup-guide.md"), "GitHub README should point to setup guide");
  assert(githubReadme.includes("capability-contract.md"), "GitHub README should point to capability contract");
  assert(githubReadme.includes("`/github-sync` must check GitHub readiness before preparing any sync payload"), "GitHub README should document readiness-first sync");
  assert(githubReadme.includes("Never ask the founder to paste a token into chat"), "GitHub README should protect token handling");
  assert(githubSetupGuide.includes("## Owner And Repository"), "GitHub setup guide should explain owner/repository");
  assert(githubSetupGuide.includes("## GitHub Project"), "GitHub setup guide should explain GitHub Project");
  assert(githubSetupGuide.includes("## Token Source"), "GitHub setup guide should explain token sources");
  assert(githubSetupGuide.includes("gh auth status"), "GitHub setup guide should mention optional GitHub CLI auth check");
  assert(githubSetupGuide.includes("Ready For Dry-Run"), "GitHub setup guide should define dry-run readiness");
  assert(githubCapabilityContract.includes("The model must not call GitHub APIs directly"), "GitHub capability contract should block direct model API calls");
  assert(githubCapabilityContract.includes("### github.syncEpicsFeatures"), "GitHub capability contract should define Epic/Feature sync interface");
  assert(githubCapabilityContract.includes("### github.createBranch"), "GitHub capability contract should define branch interface");
  assert(githubCapabilityContract.includes("### github.openPullRequest"), "GitHub capability contract should define PR interface");
  assert(githubCapabilityContract.includes("Sync-State Patch Rules"), "GitHub capability contract should define sync-state patch rules");
  assert(githubCapabilityContract.includes("The patch must not include"), "GitHub capability contract should forbid secrets in sync-state patches");
  assert(githubReadme.includes("Vercel readiness is guidance-only"), "GitHub README should document Vercel readiness without execution");
  assert(githubRole.includes("Guide safe GitHub repository, Project, labels and sync configuration"), "GitHub DevOps role should describe GitHub setup ownership");
  assert(githubSkill.includes("without storing secrets"), "GitHub setup skill should protect secrets");
  assert(githubSkill.includes("Separate setup local, token readiness, Project readiness, labels/milestones readiness and dry-run readiness"), "GitHub setup skill should separate readiness dimensions");
  assert(githubSkill.includes(".github/leanos/capability-contract.md"), "GitHub setup skill should load capability contract before remote execution");
  assert(githubPlaybook.includes("Confirm token source without asking the user to paste secrets into chat or files"), "GitHub setup playbook should protect token handling");
  assert(githubPlaybook.includes("../../../.github/leanos/capability-contract.md"), "GitHub setup playbook should load capability contract");
  assert(githubPlaybook.includes("Propose updates to GitHub management knowledge, project-sync and labels before writing"), "GitHub setup playbook should require propose-first updates");
  assert(githubPlaybook.includes("do not create `.vercel/`, run `vercel link` or add `vercel.json`"), "GitHub setup playbook should keep Vercel readiness guidance-only");
}

async function assertGitHubIssuePrWorkflow(rootDir) {
  const epicTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "epic.yml"), "utf8");
  const featureTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "feature.yml"), "utf8");
  const prTemplate = await readFile(join(rootDir, ".github", "PULL_REQUEST_TEMPLATE.md"), "utf8");
  const branchRules = await readFile(join(rootDir, ".github", "leanos", "branch-rules.md"), "utf8");
  const prRules = await readFile(join(rootDir, ".github", "leanos", "pr-validation-rules.md"), "utf8");
  const aiEpicTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "github-epic-template.md"), "utf8");
  const aiFeatureTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "github-feature-template.md"), "utf8");
  const productEpicTemplate = await readFile(join(rootDir, "ai-standard", "templates", "product", "epic-template.md"), "utf8");
  const productFeatureTemplate = await readFile(join(rootDir, "ai-standard", "templates", "product", "feature-template.md"), "utf8");
  const productOpsEpicsReadme = await readFile(join(rootDir, "operations", "product-ops", "epics", "README.md"), "utf8");
  const issueMatrix = await readFile(join(rootDir, "ai-standard", "templates", "github", "delivery-readiness-matrix-template.md"), "utf8");
  const branchTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "branch-name-template.md"), "utf8");
  const aiPrTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "pull-request-template.md"), "utf8");
  const codeReviewTemplate = await readFile(join(rootDir, "ai-standard", "templates", "review", "code-review-template.md"), "utf8");
  const epicToFeaturesPlaybook = await readFile(join(rootDir, "operations", "product-ops", "playbooks", "epic-to-features.playbook.md"), "utf8");
  const shapeEpicSkill = await readFile(join(rootDir, "operations", "product-ops", "skills", "shape-epic.skill.md"), "utf8");
  const branchSkill = await readFile(join(rootDir, "operations", "engineering", "skills", "create-branch.skill.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "branch-for-feature.playbook.md"), "utf8");
  const preparePrPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const prValidationPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  const createFeaturesCommand = await readFile(join(rootDir, ".leanos", "commands", "create-features.md"), "utf8");
  const workonFeatureCommand = await readFile(join(rootDir, ".leanos", "commands", "workon-feature.md"), "utf8");
  const createBranchCommand = await readFile(join(rootDir, ".leanos", "commands", "create-branch.md"), "utf8");
  const createPrCommand = await readFile(join(rootDir, ".leanos", "commands", "create-pr.md"), "utf8");
  const reviewPrCommand = await readFile(join(rootDir, ".leanos", "commands", "review-pr.md"), "utf8");

  assert(epicTemplate.includes('title: "[EPIC] "'), "Epic issue form should use canonical EPIC title prefix");
  assert(featureTemplate.includes('title: "[FEATURE: <epic>] "'), "Feature issue form should use canonical FEATURE title prefix");
  assert(epicTemplate.includes("Decision ownership"), "Epic issue template should include decision ownership");
  assert(epicTemplate.includes("Epic readiness matrix"), "Epic issue template should include Epic readiness matrix");
  assert(featureTemplate.includes("Parent epic"), "Feature template should require parent epic linkage");
  assert(featureTemplate.includes("Delivery Readiness Matrix"), "Feature template should include the DRM");
  assert(featureTemplate.includes("Required only when user-facing UX"), "Feature template should make Design conditional");
  assert(featureTemplate.includes("Required only when data, auth, permissions, privacy, abuse or compliance"), "Feature template should make Security conditional");
  assert(prTemplate.includes("## Linked Issue"), "PR template should include linked issue");
  assert(prTemplate.includes("## Parent Epic"), "PR template should include parent epic");
  assert(prTemplate.includes("## Design Notes"), "PR template should include design notes");
  assert(prTemplate.includes("## Security Notes"), "PR template should include security notes");
  assert(prTemplate.includes("## Founder Testing Guide"), "PR template should include founder testing guide");
  assert(prTemplate.includes("## LeanOS Review Checklist"), "PR template should include LeanOS review checklist");
  assert(prTemplate.includes("Founder Testing Guide is clear enough for a non-technical founder"), "PR template should include founder testing review checkbox");
  assert(branchRules.includes("feature/<feature-slug>-<short-kebab-slug>"), "Branch rules should define the local Feature branch format");
  assert(branchRules.includes("issue/<issue-number>-<short-kebab-slug>"), "Branch rules should define the mapped GitHub issue branch format");
  assert(branchRules.includes("Do not implement Feature work on the default branch"), "Branch rules should forbid default-branch Feature implementation");
  assert(prRules.includes("Product alignment"), "PR validation rules should require Product alignment");
  assert(prRules.includes("Founder acceptance"), "PR validation rules should require Founder acceptance");
  assert(prRules.includes("Founder Testing Guide"), "PR validation rules should validate Founder Testing Guide");
  assert(prRules.includes("Design: required only when user-facing UX changed"), "PR validation rules should make Design conditional");
  assert(prRules.includes("Security: required when data, auth, permissions, privacy, abuse or compliance is involved"), "PR validation rules should make Security conditional");

  for (const templateContent of [aiEpicTemplate, aiFeatureTemplate, productEpicTemplate, productFeatureTemplate, issueMatrix, branchTemplate, aiPrTemplate, codeReviewTemplate]) {
    assert(templateContent.includes("# "), "AI Standard templates should have markdown content");
  }

  assert(productEpicTemplate.includes("# [EPIC] <epic title>"), "Product epic template should define local epic title format");
  assert(productEpicTemplate.includes("## Decision Ownership") || productEpicTemplate.includes("decision_owner"), "Product epic template should define decision ownership");
  assert(productEpicTemplate.includes("## Success Metrics"), "Product epic template should include success metrics");
  assert(productEpicTemplate.includes("## Epic Done When"), "Product epic template should include done criteria");
  assert(productEpicTemplate.includes("## Approval Gate"), "Product epic template should include an approval gate");
  assert(productEpicTemplate.includes("## Epic Readiness Matrix"), "Product epic template should include Epic Readiness Matrix");
  assert(productEpicTemplate.includes("Expected Features"), "Product epic template should list expected features");
  assert(productEpicTemplate.includes("status: candidate | scoped | ready | in-progress | blocked | done"), "Product epic template should use lifecycle status");
  assert(productEpicTemplate.includes("sync_status: not_synced | sync_ready | synced | conflict"), "Product epic template should use separate sync status");
  assert(productFeatureTemplate.includes("# [FEATURE:"), "Product feature template should define local feature title format");
  assert(productFeatureTemplate.includes("## Delivery Readiness Matrix"), "Product feature template should include feature-level DRM");
  assert(productFeatureTemplate.includes("## Tasks"), "Product feature template should keep tasks inside the feature");
  assert(productFeatureTemplate.includes("## Definition of Ready"), "Product feature template should include Definition of Ready");
  assert(productFeatureTemplate.includes("## Definition of Done"), "Product feature template should include Definition of Done");
  assert(productFeatureTemplate.includes("status: candidate | scoped | ready | in-progress | blocked | done"), "Product feature template should use lifecycle status");
  assert(productFeatureTemplate.includes("sync_status: not_synced | sync_ready | synced | conflict"), "Product feature template should use separate sync status");
  assert(aiPrTemplate.includes("## Founder Testing Guide"), "AI Standard PR template should include founder testing guide");
  assert(productOpsEpicsReadme.includes("operations/product-ops/epics/"), "Product Ops epics README should describe local epic root");
  assert(productOpsEpicsReadme.includes("<epic-slug>/"), "Product Ops epics README should describe local epic folders");
  assert(productOpsEpicsReadme.includes("Every markdown file inside an Epic folder, except `README.md`, is a Feature"), "Product Ops epics README should define files as features");
  assert(productOpsEpicsReadme.includes("GitHub sync is optional"), "Product Ops epics README should keep GitHub sync optional");
  assert(productOpsEpicsReadme.includes("Do not use `synced` as a product status"), "Product Ops epics README should separate sync status from product status");
  assert(shapeEpicSkill.includes("local LeanOS Epic"), "Shape Epic skill should be local-first, not GitHub-first");
  assert(shapeEpicSkill.includes("../epics/README.md"), "Shape Epic skill should load local epics README");
  assert.equal(shapeEpicSkill.includes("become a GitHub epic"), false, "Shape Epic skill should not route to GitHub first");
  assert(issueMatrix.includes("# Delivery Readiness Matrix (DRM)"), "Delivery readiness matrix should use the DRM name");
  assert(issueMatrix.includes("Epic-level DRM decides"), "Delivery readiness matrix should distinguish Epic-level DRM");
  assert(issueMatrix.includes("Feature-level DRM turns"), "Delivery readiness matrix should distinguish Feature-level DRM");
  assert(issueMatrix.includes("Product Ops | Always"), "Delivery readiness matrix should require Product Ops");
  assert(issueMatrix.includes("Design | User-facing flow"), "Delivery readiness matrix should make Design conditional");
  assert(issueMatrix.includes("Engineering | Always for implementation work"), "Issue readiness matrix should require Engineering for implementation");
  assert(issueMatrix.includes("Security | Data, auth, permissions, privacy, abuse"), "Issue readiness matrix should make Security conditional");
  assert(issueMatrix.includes("DevOps | Environment, deploy, CI/CD"), "Delivery readiness matrix should make DevOps conditional");
  assert(epicToFeaturesPlaybook.includes("Break a LeanOS epic into implementation-ready features"), "Product Ops should own epic-to-features playbook");
  assert(epicToFeaturesPlaybook.includes("../epics/README.md"), "Epic to features playbook should load local epics README");
  assert(epicToFeaturesPlaybook.includes("Delivery Readiness Matrix (DRM)"), "Epic breakdown should use the DRM");
  assert(epicToFeaturesPlaybook.includes("Write Product Ops criteria for every feature"), "Epic breakdown should require Product Ops criteria");
  assert(epicToFeaturesPlaybook.includes("Add Design criteria only when"), "Epic breakdown should make Design conditional");
  assert(epicToFeaturesPlaybook.includes("When a Feature depends on UI components"), "Epic breakdown should detect component needs");
  assert(epicToFeaturesPlaybook.includes("Do not create the full component spec during Feature Shaping"), "Epic breakdown should defer full component specs");
  assert(epicToFeaturesPlaybook.includes("Design task for component spec"), "Epic breakdown should add a Design task when component spec is required");
  assert(epicToFeaturesPlaybook.includes("Add Security criteria only when"), "Epic breakdown should make Security conditional");
  assert(epicToFeaturesPlaybook.includes("Add DevOps criteria only when"), "Epic breakdown should make DevOps conditional");
  assert(epicToFeaturesPlaybook.includes("Stop before any GitHub API write until the user explicitly confirms"), "Epic breakdown should require confirmation before GitHub writes");
  assert(branchSkill.includes("safe Feature-linked branch name"), "Engineering should include create-branch skill");
  assert(branchPlaybook.includes("Load `.github/leanos/branch-rules.md`"), "Branch playbook should load branch rules");
  assert(preparePrPlaybook.includes("Check whether Design criteria are required for user-facing UX"), "Prepare PR playbook should conditionally check Design");
  assert(preparePrPlaybook.includes("Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance"), "Prepare PR playbook should conditionally check Security/Data");
  assert(prValidationPlaybook.includes("List findings by severity"), "PR validation playbook should output findings by severity");

  assert(createFeaturesCommand.includes("Delivery Readiness Matrix (DRM)"), "Create features command should use the DRM");
  assert(createFeaturesCommand.includes("operations/product-ops/playbooks/epic-to-features.playbook.md"), "Create features command should load the epic-to-features playbook");
  assert(createFeaturesCommand.includes("Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected"), "Create features command should make Design conditional");
  assert(createFeaturesCommand.includes("Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved"), "Create features command should make Security conditional");
  assert(createFeaturesCommand.includes("Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected"), "Create features command should make DevOps conditional");
  assert(createFeaturesCommand.includes("../../operations/devops/AGENT.md"), "Create features command should route DevOps through AGENT.md when applicable");
  assert(createFeaturesCommand.includes("Do not call GitHub API directly from the model"), "Create features command should forbid direct model API writes");
  assert(workonFeatureCommand.includes("Propose the required Feature-linked branch name before code changes"), "Workon feature should require branch proposal before code changes");
  assert(createBranchCommand.includes("feature/<feature-slug>-<short-kebab-slug>"), "Create branch command should support local Feature branches");
  assert(createBranchCommand.includes("issue/<issue-number>-<short-kebab-slug>"), "Create branch command should support mapped GitHub issue branches");
  assert(createPrCommand.includes("Founder Testing Guide"), "Create PR command should require Founder Testing Guide");
  assert(createPrCommand.includes("A future CLI/script capability performs the actual GitHub write"), "Create PR command should keep remote writes out of the model");
  assert(reviewPrCommand.includes("Founder Testing Guide"), "Review PR command should validate Founder Testing Guide");
  assert(reviewPrCommand.includes("List findings first, ordered by severity"), "Review PR command should enforce code review output shape");
}

async function assertFounderIntentRouting(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const strategyAgent = await readFile(join(rootDir, "strategy", "AGENT.md"), "utf8");
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "agent", "operating-rules.md"), "utf8");
  const whereWeAreProtocol = await readFile(join(rootDir, ".leanos", "agent", "protocols", "where-we-are.md"), "utf8");
  const commandsReadme = await readFile(join(rootDir, ".leanos", "commands", "README.md"), "utf8");
  const statusLeanOSCommand = await readFile(join(rootDir, ".leanos", "commands", "status-leanos.md"), "utf8");
  const checkCoherenceCommand = await readFile(join(rootDir, ".leanos", "commands", "check-coherence.md"), "utf8");
  const vscodeAgent = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const workflowsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "workflows.yaml"), "utf8"));
  const rootAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "root-agent-template.md"), "utf8");
  const departmentAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "department-agent-template.md"), "utf8");
  const areaAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "area-agent-template.md"), "utf8");
  const areaReadmeTemplate = await readFile(join(rootDir, "ai-standard", "templates", "structure", "area-readme-template.md"), "utf8");

  assert.equal(rootAgent.includes("## Founder Intent Routing"), false, "Root AGENT.md should not contain separate Founder Intent Routing");
  assert.equal(rootAgent.includes("strategy/workflows/idea-to-roadmap.workflow.md"), false, "Root AGENT.md should not bypass Strategy AGENT for workflows");
  assert.equal(rootAgent.includes("operations/workflows/feature-to-delivery-cycle.workflow.md"), false, "Root AGENT.md should not bypass Operations AGENT for workflows");
  assert.equal(rootAgent.includes("Root AGENT.md must not bypass department AGENT.md"), false, "Root AGENT.md should avoid narrow workflow-bypass prohibitions");
  assert(rootAgent.includes("## File Responsibilities"), "Root AGENT.md should define file responsibilities");
  assert(rootAgent.includes("LeanOS uses owner-first navigation"), "Root AGENT.md should explain owner-first navigation");
  assert(rootAgent.includes("Root chooses the owning department"), "Root AGENT.md should explain root-level navigation");
  assert(rootAgent.includes("Department chooses a workflow or active area"), "Root AGENT.md should explain department-level navigation");
  assert(rootAgent.includes("Area chooses the specialist role when it has `AGENT.md`"), "Root AGENT.md should explain area-level navigation");
  assert(rootAgent.includes("Output updates only the smallest relevant knowledge, decision or project file"), "Root AGENT.md should keep output scope narrow");
  assert(rootAgent.includes("## Red Lines / Non-Negotiable Rules"), "Root AGENT.md should define scalable red lines");
  assert(rootAgent.includes("## Response Header"), "Root AGENT.md should define the response header");
  assert(rootAgent.includes("Active Department:"), "Root AGENT.md should require active department in response header");
  assert(rootAgent.includes("Active Area:"), "Root AGENT.md should require active area in response header");
  assert(rootAgent.includes("Active Role:"), "Root AGENT.md should require active role in response header");
  assert(rootAgent.includes("Loaded Skills:"), "Root AGENT.md should require loaded skills in response header");
  assert(rootAgent.includes("Relevant Playbook:"), "Root AGENT.md should require relevant playbook in response header");
  assert(rootAgent.includes("Loaded Context:"), "Root AGENT.md should require loaded context in response header");
  assert(rootAgent.includes("## Natural Language Handling"), "Root AGENT.md should route natural-language requests");
  assert(rootAgent.includes("If a natural-language request clearly matches an existing LeanOS command"), "Root AGENT.md should map natural language to commands when clear");
  assert(rootAgent.includes("## Progression Intent Routing"), "Root AGENT.md should include progression intent routing");
  assert(rootAgent.includes("`ai-standard/foundation/founder-progression-model.md`"), "Root AGENT.md should reference the Founder Progression Model");
  assert(rootAgent.includes("Intent -> Current Stage -> Gate -> Active Requirements -> Route"), "Root AGENT.md should define the progression routing decision shape");
  assert(rootAgent.includes("If the next step requires an inactive or missing department or area, return `activation_required`"), "Root AGENT.md should return activation_required instead of inventing missing areas");
  assert(rootAgent.includes("Do not load inactive departments"), "Root AGENT.md should forbid inactive department loading");
  assert(rootAgent.includes("Do not treat `available` as `exists`"), "Root AGENT.md should distinguish available from existing workspace assets");
  assert(rootAgent.includes("Start, restart or idea diagnosis: `strategy/AGENT.md`"), "Root AGENT.md should route start and diagnosis through Strategy AGENT");
  assert(rootAgent.includes("## Natural Intent Map"), "Root AGENT.md should include a compact natural intent map");
  assert(rootAgent.includes("Use this map as routing guidance, not as execution detail"), "Root AGENT.md should keep intent map lightweight");
  assert(rootAgent.includes("New idea or feature evaluation: `strategy/AGENT.md`"), "Root AGENT.md should route idea evaluation through Strategy AGENT");
  assert(rootAgent.includes("Roadmap item to Epic or Epic to Features: return `activation_required` for `operations.product-ops`"), "Root AGENT.md should gate delivery planning behind Product Ops activation");
  assert(rootAgent.includes("Feature implementation: return `activation_required` for `operations.engineering`"), "Root AGENT.md should gate implementation behind Engineering activation");
  assert(rootAgent.includes("GitHub setup, GitHub Projects configuration or GitHub sync: return `activation_required` for `operations.devops`"), "Root AGENT.md should gate GitHub sync behind DevOps activation");
  assert(rootAgent.includes("## Status And Readiness Questions"), "Root AGENT.md should handle status and readiness questions");
  assert(rootAgent.includes("`.leanos/agent/protocols/where-we-are.md`"), "Root AGENT.md should route status and readiness questions to the where-we-are protocol");
  assert(rootAgent.includes("## Trace And Diagnostics"), "Root AGENT.md should handle trace and diagnostic questions");
  assert(rootAgent.includes("`.leanos/agent/protocols/chief-trace.md`"), "Root AGENT.md should route trace diagnostics to the chief-trace protocol");
  assert(rootAgent.includes("do not answer from memory"), "Root AGENT.md should avoid memory-only status answers");
  assert(rootAgent.includes("## Framework Standards Routing"), "Root AGENT.md should route framework standards through AI Standard");
  assert(rootAgent.includes("Use `ai-standard/README.md` only when the user asks to create, change, review or validate LeanOS framework assets"), "Root AGENT.md should load AI Standard only for framework asset work");
  assert(rootAgent.includes("Do not guess the correct template, checklist or instruction from memory"), "Root AGENT.md should prevent framework asset hallucination");
  assert(rootAgent.includes("Follow its route to the smallest needed foundation, instruction, template, checklist or example"), "Root AGENT.md should delegate AI Standard internals to AI Standard README");
  assert(rootAgent.includes("Do not use `ai-standard/` to define product strategy, MVP, roadmap, design, engineering work or growth work"), "Root AGENT.md should keep product work on the Navigation Chain");
  assert.equal(rootAgent.includes("Load the matching creation instruction from `ai-standard/instructions/`"), false, "Root AGENT.md should not list AI Standard internals directly");
  assert.equal(rootAgent.includes("Use the matching template from `ai-standard/templates/`"), false, "Root AGENT.md should not list template internals directly");
  assert.equal(rootAgent.includes("Validate with the matching checklist from `ai-standard/checklists/`"), false, "Root AGENT.md should not list checklist internals directly");
  assert(rootAgent.includes("`AGENT.md`: operational owner for that level"), "Root AGENT.md should define AGENT.md responsibility");
  assert(rootAgent.includes("`README.md`: directory map and explanation"), "Root AGENT.md should define README responsibility");
  assert(rootAgent.includes("Enter the owning department or area before acting"), "Root AGENT.md should use owner-first red lines");
  assert(rootAgent.includes("When an area has its own `AGENT.md`, use it as the area operating owner"), "Root AGENT.md should understand area-level agents");
  assert(rootAgent.includes("Do not invent missing workflows, roles, skills, playbooks, commands or templates"), "Root AGENT.md should prevent asset invention");
  assert(rootAgent.includes("## Root Routing"), "Root AGENT.md should have a single root routing section");
  assert(rootAgent.includes("Strategy: `strategy/AGENT.md`"), "Root AGENT.md should route Strategy through its AGENT");
  assert.equal(rootAgent.includes("Operations: `operations/AGENT.md`"), false, "Root AGENT.md should not expose inactive Operations as an active route");
  assert.equal(rootAgent.includes("Growth: `growth/AGENT.md`"), false, "Root AGENT.md should not expose inactive Growth as an active route");
  assert.equal(rootAgent.includes("## Active Root Departments"), false, "Root AGENT.md should not duplicate active departments and routing");
  assert.equal(rootAgent.includes("## Routing"), false, "Root AGENT.md should use Root Routing instead of a separate Routing section");
  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "Root AGENT.md should not keep the old mutation rules section");
  assert.equal(rootAgent.includes("`strategy/product/README.md`"), false, "Root AGENT.md should not route directly to Strategy Product area");
  assert.equal(rootAgent.includes("`operations/engineering/README.md`"), false, "Root AGENT.md should not route directly to Operations Engineering area");
  assert(rootAgent.includes("Operational workflows live in root departments"), "AGENT.md should keep business workflows out of .leanos");
  assert(strategyAgent.includes("CEO / PMO / Product Strategy operator"), "Strategy AGENT should define its executive operating owner");
  assert(strategyAgent.includes("## Routing Rules"), "Strategy AGENT should define department-level routing rules");
  assert(strategyAgent.includes("workflows/README.md"), "Strategy AGENT should point to workflow index instead of enumerating workflows");
  assert.equal(strategyAgent.includes("workflows/idea-to-roadmap.workflow.md"), false, "Strategy AGENT should not enumerate every workflow path");
  assert(runtimeReadme.includes("Business workflows live in departments or areas"), ".leanos README should keep workflows local to departments or areas");
  assert(operatingRules.includes("Natural language founder requests are first-class"), "Operating rules should support natural-language founder intent");
  assert(operatingRules.includes("Root AGENT.md routes to the correct department; department AGENT.md files route to workflows or areas"), "Operating rules should route workflow selection through department agents");
  assert(operatingRules.includes("For status, resume, readiness or \"can we build?\" requests, load `protocols/where-we-are.md`"), "Operating rules should route status and readiness through where-we-are protocol");
  assert(whereWeAreProtocol.includes("# Where We Are Protocol"), "Where-we-are protocol should be generated");
  assert(whereWeAreProtocol.includes("Do not recommend implementation before checking product, roadmap and delivery readiness"), "Where-we-are protocol should prevent premature implementation");
  assert(whereWeAreProtocol.includes("operations/product-ops/knowledge/ready-to-develop.md"), "Where-we-are protocol should load the ready-to-develop gate");
  assert(whereWeAreProtocol.includes("## Development Gate"), "Where-we-are protocol should define a development gate");
  assert(whereWeAreProtocol.includes("local Epic/Feature exists"), "Where-we-are protocol should support local Epic/Feature readiness");
  assert(whereWeAreProtocol.includes("Local epic missing -> `roadmap-item-to-epic`"), "Where-we-are protocol should route missing local epic");
  assert(whereWeAreProtocol.includes("## Recommended Routes By Gap"), "Where-we-are protocol should recommend routes by gap");
  assert(whereWeAreProtocol.includes("Ainda nao recomendo comecar pelo codigo"), "Where-we-are protocol should provide founder-friendly early-development feedback");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "status.md")), false, "Legacy /status command should not be generated");
  assert(commandsReadme.includes("status-leanos.md"), "Commands README should list status-leanos.md");
  assert(commandsReadme.includes("/status-leanos"), "Commands README should list /status-leanos");
  assert.equal(commandsReadme.includes("/status,"), false, "Commands README should not advertise legacy /status");
  assert(statusLeanOSCommand.includes("# /status-leanos"), "Status LeanOS command should use /status-leanos heading");
  assert(statusLeanOSCommand.includes("../agent/protocols/where-we-are.md"), "Status LeanOS command should load where-we-are protocol");
  assert(statusLeanOSCommand.includes("Treat `/status-leanos` as a request to run the `where-we-are` protocol"), "Status LeanOS command should be a where-we-are entrypoint");
  assert(statusLeanOSCommand.includes("None by default"), "Status LeanOS command should be diagnostic by default");
  assert(statusLeanOSCommand.includes("`/status-leanos` is diagnostic"), "Status LeanOS command should explicitly forbid writes by default");
  assert(statusLeanOSCommand.includes("mark work as ready to develop without checking `where-we-are.md` and `ready-to-develop.md`"), "Status LeanOS command should guard development readiness");
  assert(checkCoherenceCommand.includes("# /check coherence"), "Check coherence command should use /check coherence heading");
  assert(checkCoherenceCommand.includes("Use a 0-100 score"), "Check coherence command should define a coherence score");
  assert(checkCoherenceCommand.includes("alignments"), "Check coherence command should report alignments");
  assert(checkCoherenceCommand.includes("inconsistencies"), "Check coherence command should report inconsistencies");
  assert(checkCoherenceCommand.includes("risks"), "Check coherence command should report risks");
  assert(checkCoherenceCommand.includes("Recommended next route"), "Check coherence command should recommend a next route");
  assert(checkCoherenceCommand.includes("None by default"), "Check coherence command should be diagnostic by default");
  assert(checkCoherenceCommand.includes("must not write files unless the founder explicitly asks"), "Check coherence command should not write by default");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "shape-mvp.md")), false, "Shape MVP command should not be generated");
  assert.equal(commandsReadme.includes("define-mvp.md"), false, "Commands README should not list inactive define-mvp command during setup");
  assert.equal(commandsReadme.includes("/define-mvp"), false, "Commands README should not advertise inactive /define-mvp during setup");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "define-mvp.md")), false, "Define MVP command should wait for Product Ops activation");
  assert.equal(rootAgent.includes("\"define the MVP\" -> `.leanos/commands/define-mvp.md`"), false, "Root AGENT should not route MVP language to an inactive command");
  assert(operatingRules.includes("`AGENT.md` is the operating owner for its level; `README.md` is the directory map"), "Operating rules should define AGENT and README responsibilities");
  assert(operatingRules.includes("Area `AGENT.md` files, when present, choose the specialist role"), "Operating rules should define area AGENT responsibility");
  assert.equal(operatingRules.includes("Root AGENT.md must not bypass department AGENT.md"), false, "Operating rules should avoid narrow workflow-bypass prohibitions");
  assert(operatingRules.includes("Business workflows live in root departments or areas, not in `.leanos/`"), "Operating rules should keep business workflows out of .leanos");
  assert(vscodeAgent.includes("Founder requests can be natural language"), "VS Code agent should support founder intent routing");
  assert(vscodeAgent.includes("Then use the department `AGENT.md` to choose the workflow folder or active area"), "VS Code agent should route workflows through department AGENT files");
  assert(vscodeAgent.includes("Enter the owning department or area before acting"), "VS Code agent should use owner-first routing");
  assert(vscodeAgent.includes("When an area has its own `AGENT.md`, use it before loading roles, skills or playbooks"), "VS Code agent should understand area-level agents");
  assert.equal(vscodeAgent.includes("Do not bypass department `AGENT.md`"), false, "VS Code agent should avoid narrow workflow-bypass prohibitions");
  assert.equal(await exists(join(rootDir, ".leanos", "workflows")), false, ".leanos/workflows should not be generated");

  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "new-idea-intake" && workflow.path === "../../strategy/workflows/new-idea-intake.workflow.md"), "Workflows index should point to Strategy new idea intake workflow");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "idea-to-roadmap" && workflow.path === "../../strategy/workflows/idea-to-roadmap.workflow.md"), "Workflows index should point to Strategy idea-to-roadmap workflow");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-to-github-project" && workflow.path === "../../strategy/workflows/roadmap-to-github-project.workflow.md"), "Workflows index should point to Strategy roadmap sync workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-item-to-epic"), false, "Workflows index should not include inactive Operations workflows during setup");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-item-to-delivery-scope"), false, "Workflows index should not include obsolete roadmap item to delivery scope workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "delivery-scope-to-epic"), false, "Workflows index should not include obsolete delivery scope to epic workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "mvp-to-pr"), false, "Workflows index should not include obsolete MVP to PR workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "epic-to-features"), false, "Workflows index should not include inactive Operations epic workflow during setup");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "feature-to-delivery-cycle"), false, "Workflows index should not include inactive Operations delivery workflow during setup");
  assert(rootAgentTemplate.includes("## Root Routing"), "Root agent template should keep root routing department-level");
  assert(rootAgentTemplate.includes("Use this section only to choose the owning department"), "Root agent template should keep routing scoped to departments");
  assert(rootAgentTemplate.includes("LeanOS uses owner-first navigation"), "Root agent template should explain owner-first navigation");
  assert(rootAgentTemplate.includes("Do not skip levels because a later file looks relevant"), "Root agent template should prevent route skipping");
  assert(rootAgentTemplate.includes("## Red Lines / Non-Negotiable Rules"), "Root agent template should include scalable red lines");
  assert(rootAgentTemplate.includes("## Response Header"), "Root agent template should include response header");
  assert(rootAgentTemplate.includes("## Natural Language Handling"), "Root agent template should include natural language handling");
  assert(rootAgentTemplate.includes("## Status And Readiness Questions"), "Root agent template should include status and readiness handling");
  assert(rootAgentTemplate.includes("`.leanos/agent/protocols/where-we-are.md`"), "Root agent template should point to where-we-are protocol");
  assert(rootAgentTemplate.includes("## Trace And Diagnostics"), "Root agent template should include trace diagnostics handling");
  assert(rootAgentTemplate.includes("`.leanos/agent/protocols/chief-trace.md`"), "Root agent template should point to chief-trace protocol");
  assert(rootAgentTemplate.includes("## Framework Standards Routing"), "Root agent template should include framework standards routing");
  assert(rootAgentTemplate.includes("Use `ai-standard/README.md` only when the user asks to create, change, review or validate LeanOS framework assets"), "Root agent template should route framework standards through AI Standard README");
  assert(rootAgentTemplate.includes("Do not guess the correct template, checklist or instruction from memory"), "Root agent template should prevent framework asset hallucination");
  assert(rootAgentTemplate.includes("When an area has its own `AGENT.md`, use it as the area operating owner before loading roles, skills or playbooks"), "Root agent template should include area AGENT rule");
  assert(departmentAgentTemplate.includes("If the founder request is a journey, open `workflows/README.md`"), "Department agent template should route journeys through workflow index");
  assert(departmentAgentTemplate.includes("A journey changes state, priority, scope, handoff, roadmap, delivery, launch or learning"), "Department agent template should define workflow journey signals");
  assert(departmentAgentTemplate.includes("route to that area `AGENT.md` when present"), "Department agent template should route to area AGENT when present");
  assert(departmentAgentTemplate.includes("Do not load roles, skills or playbooks before entering the owning area"), "Department agent template should keep roles/skills/playbooks area-owned");
  assert(areaAgentTemplate.includes("Choose the smallest specialist role"), "Area AGENT template should route to specialist roles");
  assert(areaAgentTemplate.includes("Keep reusable area knowledge in `knowledge/`"), "Area AGENT template should keep area knowledge modular");
  assert(areaReadmeTemplate.includes("`README.md`: area map and explanation"), "Area README template should define map responsibility");
}

async function assertAiStandardAssetTaxonomy(rootDir) {
  const aiStandardReadme = await readFile(join(rootDir, "ai-standard", "README.md"), "utf8");
  const foundationReadme = await readFile(join(rootDir, "ai-standard", "foundation", "README.md"), "utf8");
  const founderProgressionModel = await readFile(join(rootDir, "ai-standard", "foundation", "founder-progression-model.md"), "utf8");
  const assetTaxonomy = await readFile(join(rootDir, "ai-standard", "foundation", "asset-taxonomy.md"), "utf8");
  const guidedConversation = await readFile(join(rootDir, "ai-standard", "foundation", "guided-conversation.md"), "utf8");
  const creationRules = await readFile(join(rootDir, "ai-standard", "foundation", "creation-rules.md"), "utf8");
  const qualityCriteria = await readFile(join(rootDir, "ai-standard", "foundation", "quality-criteria.md"), "utf8");
  const folderDocumentationRules = await readFile(join(rootDir, "ai-standard", "foundation", "folder-documentation-rules.md"), "utf8");

  assert(aiStandardReadme.includes("foundation/"), "AI Standard README should route to foundation");
  assert(aiStandardReadme.includes("templates/"), "AI Standard README should route to templates");
  assert(aiStandardReadme.includes("checklists/"), "AI Standard README should route to checklists");
  assert(aiStandardReadme.includes("instructions/"), "AI Standard README should route to instructions");
  assert(aiStandardReadme.includes("examples/"), "AI Standard README should route to examples");
  assert(aiStandardReadme.includes("Do not load all of `ai-standard/` by default"), "AI Standard README should encourage minimal loading");
  assert(foundationReadme.includes("asset-taxonomy.md"), "Foundation README should list asset taxonomy");
  assert(foundationReadme.includes("navigation-chain.md"), "Foundation README should list navigation chain");
  assert(foundationReadme.includes("founder-progression-model.md"), "Foundation README should list founder progression model");
  assert(foundationReadme.includes("guided-conversation.md"), "Foundation README should list guided conversation");
  assert(foundationReadme.includes("folder-documentation-rules.md"), "Foundation README should list folder documentation rules");
  assert(aiStandardReadme.includes("foundation/founder-progression-model.md"), "AI Standard README should route founder progression decisions");
  assert(aiStandardReadme.includes("foundation/guided-conversation.md"), "AI Standard README should route guided conversation decisions");
  for (const expected of [
    "Setup Seed",
    "Strategy Seed",
    "Strategy Baseline",
    "Idea Diagnosis",
    "Roadmap Inicial",
    "MVP Decision",
    "Product Shaping",
    "Delivery Readiness",
    "Implementation",
    "Launch",
    "Learning Loop",
    "Scaling / Operating Cadence",
    "activation_required",
    "Progression Intent Routing",
    "Do not load inactive departments"
  ]) {
    assert(founderProgressionModel.includes(expected), `Founder Progression Model should include ${expected}`);
  }
  assert(guidedConversation.includes("# Guided Conversation"), "Guided conversation should have expected title");
  assert(guidedConversation.includes("the host application's native selection UI when available"), "Guided conversation should prefer native selection UI when available");
  assert(guidedConversation.includes("If no native selection UI is available, write numbered options directly in chat"), "Guided conversation should define numbered fallback");
  assert(guidedConversation.includes("3 to 5 numbered options"), "Guided conversation should define numbered options");
  assert(guidedConversation.includes("not sure / help me decide"), "Guided conversation should include a help-me-decide option");
  assert(guidedConversation.includes("You can reply with the number"), "Guided conversation should support low-friction answers");
  assert(assetTaxonomy.includes("# Asset Taxonomy"), "Asset taxonomy should have expected title");
  assert(assetTaxonomy.includes("Role = who acts."), "Asset taxonomy should define role concept");
  assert(assetTaxonomy.includes("Skill = capability used."), "Asset taxonomy should define skill concept");
  assert(assetTaxonomy.includes("Playbook = practical task execution inside an area."), "Asset taxonomy should define playbook concept");
  assert(assetTaxonomy.includes("Knowledge = information/source of truth."), "Asset taxonomy should define knowledge concept");
  assert(assetTaxonomy.includes("Workflow = coordination across areas, stages or handoffs."), "Asset taxonomy should define workflow concept");
  assert(assetTaxonomy.includes("## Workflow vs Playbook"), "Asset taxonomy should distinguish workflows from playbooks");
  assert(assetTaxonomy.includes("Workflow = coordinates multiple areas, stages or handoffs."), "Asset taxonomy should clarify workflow scope");
  assert(assetTaxonomy.includes("Playbook = executes a practical task inside one area."), "Asset taxonomy should clarify playbook scope");
  assert(assetTaxonomy.includes("| Asset | What It Is | Question It Answers |"), "Asset taxonomy should include summary table");
  assert(assetTaxonomy.includes("`AGENT.md`"), "Asset taxonomy should explain AGENT.md");
  assert(assetTaxonomy.includes("`README.md`"), "Asset taxonomy should explain README.md");
  assert(assetTaxonomy.includes("`department.yaml`"), "Asset taxonomy should explain department.yaml");
  assert(assetTaxonomy.includes("`area.yaml`"), "Asset taxonomy should explain area.yaml");
  assert(assetTaxonomy.includes("### Role"), "Asset taxonomy should explain roles");
  assert(assetTaxonomy.includes("### Skill"), "Asset taxonomy should explain skills");
  assert(assetTaxonomy.includes("### Playbook"), "Asset taxonomy should explain playbooks");
  assert(assetTaxonomy.includes("### Knowledge"), "Asset taxonomy should explain knowledge");
  assert(assetTaxonomy.includes("### Workflow"), "Asset taxonomy should explain workflows");
  assert(assetTaxonomy.includes("### Command"), "Asset taxonomy should explain commands");
  assert(assetTaxonomy.includes("operations/design/AGENT.md"), "Asset taxonomy should include Design AGENT example");
  assert(assetTaxonomy.includes("operations/design/skills/accessibility.skill.md"), "Asset taxonomy should include Design skill example");
  assert(assetTaxonomy.includes("operations/design/playbooks/design-foundation.playbook.md"), "Asset taxonomy should include Design playbook example");
  assert(assetTaxonomy.includes("operations/design/knowledge/design-system.md"), "Asset taxonomy should include Design knowledge example");
  assert(creationRules.includes("## Creation Decision"), "Creation rules should explain creation decisions");
  assert(creationRules.includes("## Placement Rules"), "Creation rules should explain placement rules");
  assert(creationRules.includes("## Confirmation Rule"), "Creation rules should explain confirmation rules");
  assert(creationRules.includes("Do not create files just to make the workspace look complete"), "Creation rules should prevent cosmetic scaffolding");
  assert(qualityCriteria.includes("## Universal Criteria"), "Quality criteria should include universal criteria");
  assert(qualityCriteria.includes("## Asset-Specific Signals"), "Quality criteria should include asset-specific signals");
  assert(qualityCriteria.includes("## Rejection Criteria"), "Quality criteria should include rejection criteria");
  assert(folderDocumentationRules.includes("# Folder Documentation Rules"), "Folder documentation rules should have expected title");
  assert(folderDocumentationRules.includes("A folder README is a map, not the operator"), "Folder documentation rules should define README responsibility");
  assert(folderDocumentationRules.includes("## Required Sections"), "Folder documentation rules should define required sections");
  assert(folderDocumentationRules.includes("Do not make folder README files huge inventories"), "Folder documentation rules should prevent huge inventories");
}

async function assertAiStandardTemplates(rootDir) {
  const templatesReadme = await readFile(join(rootDir, "ai-standard", "templates", "README.md"), "utf8");
  const agentsReadme = await readFile(join(rootDir, "ai-standard", "templates", "agents", "README.md"), "utf8");
  const structureReadme = await readFile(join(rootDir, "ai-standard", "templates", "structure", "README.md"), "utf8");
  const executionReadme = await readFile(join(rootDir, "ai-standard", "templates", "execution", "README.md"), "utf8");
  const commandsReadme = await readFile(join(rootDir, "ai-standard", "templates", "commands", "README.md"), "utf8");
  const githubReadme = await readFile(join(rootDir, "ai-standard", "templates", "github", "README.md"), "utf8");
  const designReadme = await readFile(join(rootDir, "ai-standard", "templates", "design", "README.md"), "utf8");
  const reviewReadme = await readFile(join(rootDir, "ai-standard", "templates", "review", "README.md"), "utf8");
  const playbookTemplate = await readFile(join(rootDir, "ai-standard", "templates", "execution", "playbook-template.md"), "utf8");
  const componentSpecTemplate = await readFile(join(rootDir, "ai-standard", "templates", "design", "component-spec-template.md"), "utf8");

  assert(templatesReadme.includes("agents/"), "Templates README should route to agents");
  assert(templatesReadme.includes("structure/"), "Templates README should route to structure");
  assert(templatesReadme.includes("execution/"), "Templates README should route to execution");
  assert(templatesReadme.includes("commands/"), "Templates README should route to commands");
  assert(templatesReadme.includes("github/"), "Templates README should route to GitHub");
  assert(templatesReadme.includes("design/"), "Templates README should route to Design templates");
  assert(templatesReadme.includes("review/"), "Templates README should route to review");
  assert(templatesReadme.includes("Do not load every template by default"), "Templates README should discourage loading every template");
  assert(agentsReadme.includes("root-agent-template.md"), "Agent templates README should list root agent template");
  assert(structureReadme.includes("department-template.yaml"), "Structure templates README should list department YAML template");
  assert(executionReadme.includes("role-template.md"), "Execution templates README should list role template");
  assert(executionReadme.includes("playbook-template.md"), "Execution templates README should list playbook template");
  assert(executionReadme.includes("workflow-template.md"), "Execution templates README should list workflow template");
  assert(playbookTemplate.includes("## Guided Conversation"), "Playbook template should include guided conversation section");
  assert(playbookTemplate.includes("../../../ai-standard/foundation/guided-conversation.md"), "Playbook template should point to guided conversation foundation");
  assert(commandsReadme.includes("command-template.md"), "Command templates README should list command template");
  assert(githubReadme.includes("github-epic-template.md"), "GitHub templates README should list epic template");
  assert(githubReadme.includes("github-feature-template.md"), "GitHub templates README should list feature template");
  assert(githubReadme.includes("pull-request-template.md"), "GitHub templates README should list PR template");
  assert(designReadme.includes("component-spec-template.md"), "Design templates README should list component spec template");
  for (const heading of ["## When To Use", "## Anatomy", "## Variants", "## States", "## Accessibility", "## Composition Rules", "## Engineering Notes", "## Do Not Do"]) {
    assert(componentSpecTemplate.includes(heading), `Component spec template should include ${heading}`);
  }
  assert(reviewReadme.includes("code-review-template.md"), "Review templates README should list code review template");
}

async function assertAiStandardChecklists(rootDir) {
  const checklistsReadme = await readFile(join(rootDir, "ai-standard", "checklists", "README.md"), "utf8");
  const agentChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "agent-quality-checklist.md"), "utf8");
  const readmeChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "readme-quality-checklist.md"), "utf8");
  const departmentChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "department-quality-checklist.md"), "utf8");
  const areaChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "area-quality-checklist.md"), "utf8");
  const roleChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "role-quality-checklist.md"), "utf8");
  const skillChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "skill-quality-checklist.md"), "utf8");
  const playbookChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "playbook-quality-checklist.md"), "utf8");
  const workflowChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "workflow-quality-checklist.md"), "utf8");
  const commandChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "command-quality-checklist.md"), "utf8");

  assert(checklistsReadme.includes("workflow-quality-checklist.md"), "Checklists README should list workflow checklist");
  assert(checklistsReadme.includes("Do not treat all checklists as interchangeable"), "Checklists README should explain checklist specificity");
  assert(agentChecklist.includes("Root agents route only to departments"), "Agent checklist should validate root routing boundaries");
  assert(agentChecklist.includes("does not try to be a full inventory"), "Agent checklist should prevent giant inventories");
  assert(readmeChecklist.includes("The README is a map, not the operator"), "README checklist should define README responsibility");
  assert(readmeChecklist.includes("does not duplicate the full content of child files"), "README checklist should prevent duplication");
  assert(departmentChecklist.includes("does not contain `roles/`, `skills/` or `playbooks/` directly"), "Department checklist should enforce area-first execution assets");
  assert(departmentChecklist.includes("Department workflows coordinate across areas or stages"), "Department checklist should validate workflow ownership");
  assert(areaChecklist.includes("has `roles/`, `skills/` and `playbooks/`"), "Area checklist should validate execution folders");
  assert(areaChecklist.includes("Area AGENT, when present, chooses the specialist role"), "Area checklist should validate area routing");
  assert(roleChecklist.includes("with which hat should the agent act"), "Role checklist should validate persona responsibility");
  assert(roleChecklist.includes("points to relevant skills"), "Role checklist should require skill pointers");
  assert(skillChecklist.includes("one reusable capability"), "Skill checklist should validate reusable capability");
  assert(skillChecklist.includes("does not become a full process sequence"), "Skill checklist should avoid playbook duplication");
  assert(playbookChecklist.includes("ordered execution sequence"), "Playbook checklist should validate sequencing");
  assert(playbookChecklist.includes("uses skills rather than duplicating all skill content"), "Playbook checklist should avoid skill duplication");
  assert(playbookChecklist.includes("## Guided Conversation"), "Playbook checklist should include guided conversation criteria");
  assert(playbookChecklist.includes("numbered options"), "Playbook checklist should validate guided numbered options");
  assert(workflowChecklist.includes("does not live in `.leanos/workflows/`"), "Workflow checklist should keep workflows local to departments or areas");
  assert(workflowChecklist.includes("defines handoffs between owners"), "Workflow checklist should validate handoffs");
  assert(commandChecklist.includes("Allowed updates are explicit"), "Command checklist should validate allowed updates");
  assert(commandChecklist.includes("Remote writes require confirmation"), "Command checklist should validate remote write safety");
}

async function assertAiStandardInstructions(rootDir) {
  const instructionsRoot = join(rootDir, "ai-standard", "instructions");
  const instructionsReadme = await readFile(join(instructionsRoot, "README.md"), "utf8");
  const instructionFiles = [
    "create-agent",
    "create-area",
    "create-command",
    "create-department",
    "create-playbook",
    "create-readme",
    "create-role",
    "create-skill",
    "create-workflow"
  ];
  const contents = Object.fromEntries(
    await Promise.all(instructionFiles.map(async (name) => [name, await readFile(join(instructionsRoot, `${name}-instructions.md`), "utf8")]))
  );

  assert(instructionsReadme.includes("Do not use one instruction for every asset type"), "Instructions README should explain instruction specificity");
  assert(instructionsReadme.includes("../foundation/asset-taxonomy.md"), "Instructions README should point to asset taxonomy");
  assert(instructionsReadme.includes("../foundation/creation-rules.md"), "Instructions README should point to creation rules");
  assert(instructionsReadme.includes("../templates/"), "Instructions README should point to templates");
  assert(instructionsReadme.includes("../checklists/"), "Instructions README should point to checklists");

  assert(contents["create-agent"].includes("../templates/agents/root-agent-template.md"), "Create agent instructions should point to root agent template");
  assert(contents["create-agent"].includes("../templates/agents/department-agent-template.md"), "Create agent instructions should point to department agent template");
  assert(contents["create-agent"].includes("../templates/agents/area-agent-template.md"), "Create agent instructions should point to area agent template");
  assert(contents["create-agent"].includes("../checklists/agent-quality-checklist.md"), "Create agent instructions should point to agent checklist");
  assert(contents["create-agent"].includes("Do not make root AGENT route directly to area roles or skills"), "Create agent instructions should protect Navigation Chain levels");

  assert(contents["create-readme"].includes("../foundation/folder-documentation-rules.md"), "Create README instructions should point to folder documentation rules");
  assert(contents["create-readme"].includes("../templates/structure/folder-readme-template.md"), "Create README instructions should point to folder README template");
  assert(contents["create-readme"].includes("../checklists/readme-quality-checklist.md"), "Create README instructions should point to README checklist");
  assert(contents["create-readme"].includes("Keep it a map, not an executor"), "Create README instructions should keep README as a map");

  assert(contents["create-department"].includes("../templates/agents/department-agent-template.md"), "Create department instructions should point to department agent template");
  assert(contents["create-department"].includes("../templates/structure/department-template.yaml"), "Create department instructions should point to department YAML template");
  assert(contents["create-department"].includes("../checklists/department-quality-checklist.md"), "Create department instructions should point to department checklist");
  assert(contents["create-department"].includes("Do not create roles, skills or playbooks at department root"), "Create department instructions should protect area-owned assets");

  assert(contents["create-area"].includes("../templates/structure/area-template.yaml"), "Create area instructions should point to area YAML template");
  assert(contents["create-area"].includes("../templates/agents/area-agent-template.md"), "Create area instructions should point to area agent template");
  assert(contents["create-area"].includes("../checklists/area-quality-checklist.md"), "Create area instructions should point to area checklist");
  assert(contents["create-area"].includes("Create `roles/`, `skills/`, `playbooks/` and `knowledge/` only when they are needed"), "Create area instructions should avoid decorative folders");

  assert(contents["create-role"].includes("../templates/execution/role-template.md"), "Create role instructions should point to role template");
  assert(contents["create-role"].includes("../checklists/role-quality-checklist.md"), "Create role instructions should point to role checklist");
  assert(contents["create-role"].includes("Define what hat the agent should wear"), "Create role instructions should define persona responsibility");
  assert(contents["create-role"].includes("Do not create a role for a one-off task"), "Create role instructions should avoid one-off roles");

  assert(contents["create-skill"].includes("../templates/execution/skill-template.md"), "Create skill instructions should point to skill template");
  assert(contents["create-skill"].includes("../checklists/skill-quality-checklist.md"), "Create skill instructions should point to skill checklist");
  assert(contents["create-skill"].includes("Define one reusable capability"), "Create skill instructions should define reusable capability");
  assert(contents["create-skill"].includes("Avoid turning the skill into a full ordered process"), "Create skill instructions should avoid playbook duplication");

  assert(contents["create-playbook"].includes("../templates/execution/playbook-template.md"), "Create playbook instructions should point to playbook template");
  assert(contents["create-playbook"].includes("../foundation/guided-conversation.md"), "Create playbook instructions should point to guided conversation foundation when needed");
  assert(contents["create-playbook"].includes("../checklists/playbook-quality-checklist.md"), "Create playbook instructions should point to playbook checklist");
  assert(contents["create-playbook"].includes("Reference skills instead of duplicating them"), "Create playbook instructions should reference skills");
  assert(contents["create-playbook"].includes("Guided Conversation"), "Create playbook instructions should require guided conversation when founder input is needed");
  assert(contents["create-playbook"].includes("Do not duplicate a workflow"), "Create playbook instructions should avoid workflow duplication");

  assert(contents["create-workflow"].includes("../templates/execution/workflow-template.md"), "Create workflow instructions should point to workflow template");
  assert(contents["create-workflow"].includes("../checklists/workflow-quality-checklist.md"), "Create workflow instructions should point to workflow checklist");
  assert(contents["create-workflow"].includes("spans multiple areas, roles or stages"), "Create workflow instructions should explain workflow scope");
  assert(contents["create-workflow"].includes("Do not place business workflows in `.leanos/workflows/`"), "Create workflow instructions should keep business workflows local");

  assert(contents["create-command"].includes("../templates/commands/command-template.md"), "Create command instructions should point to command template");
  assert(contents["create-command"].includes("../checklists/command-quality-checklist.md"), "Create command instructions should point to command checklist");
  assert(contents["create-command"].includes("Require confirmation before durable or remote changes"), "Create command instructions should require confirmation");
  assert(contents["create-command"].includes("Do not ask the model to perform remote writes directly"), "Create command instructions should protect remote writes");

  for (const [name, content] of Object.entries(contents)) {
    assert.equal(content.includes("Choose the active department and area"), false, `${name} instructions should not use the old generic body`);
  }

  assert(new Set(Object.values(contents)).size === instructionFiles.length, "Instructions should be specific, not identical copies");
}

async function assertAiStandardExamples(rootDir) {
  const examplesRoot = join(rootDir, "ai-standard", "examples");
  const examplesReadme = await readFile(join(examplesRoot, "README.md"), "utf8");
  const agentsReadme = await readFile(join(examplesRoot, "agents", "README.md"), "utf8");
  const structureReadme = await readFile(join(examplesRoot, "structure", "README.md"), "utf8");
  const executionReadme = await readFile(join(examplesRoot, "execution", "README.md"), "utf8");
  const commandsReadme = await readFile(join(examplesRoot, "commands", "README.md"), "utf8");
  const githubReadme = await readFile(join(examplesRoot, "github", "README.md"), "utf8");
  const reviewReadme = await readFile(join(examplesRoot, "review", "README.md"), "utf8");
  const areaAgentExample = await readFile(join(examplesRoot, "agents", "example-area-agent.md"), "utf8");
  const areaReadmeExample = await readFile(join(examplesRoot, "structure", "example-area-readme.md"), "utf8");
  const roleExample = await readFile(join(examplesRoot, "execution", "example-role-senior-developer.md"), "utf8");
  const skillExample = await readFile(join(examplesRoot, "execution", "example-skill-check-coherence.md"), "utf8");
  const playbookExample = await readFile(join(examplesRoot, "execution", "example-playbook-prepare-pr.md"), "utf8");
  const workflowExample = await readFile(join(examplesRoot, "execution", "example-workflow-feature-to-delivery-cycle.md"), "utf8");
  const commandExample = await readFile(join(examplesRoot, "commands", "example-command-define-design.md"), "utf8");
  const epicExample = await readFile(join(examplesRoot, "github", "example-github-epic.md"), "utf8");
  const featureExample = await readFile(join(examplesRoot, "github", "example-github-feature.md"), "utf8");
  const prExample = await readFile(join(examplesRoot, "github", "example-pull-request.md"), "utf8");
  const codeReviewExample = await readFile(join(examplesRoot, "review", "example-code-review.md"), "utf8");

  assert(examplesReadme.includes("Examples show what \"good enough\" can look like"), "Examples README should explain examples are quality references");
  assert(examplesReadme.includes("They are not active workspace context, not templates and not instructions"), "Examples README should prevent example misuse");
  assert(examplesReadme.includes("agents/"), "Examples README should route to agents examples");
  assert(examplesReadme.includes("structure/"), "Examples README should route to structure examples");
  assert(examplesReadme.includes("execution/"), "Examples README should route to execution examples");
  assert(examplesReadme.includes("commands/"), "Examples README should route to command examples");
  assert(examplesReadme.includes("github/"), "Examples README should route to GitHub examples");
  assert(examplesReadme.includes("review/"), "Examples README should route to review examples");

  assert(agentsReadme.includes("example-root-agent.md"), "Agent examples README should list root agent example");
  assert(agentsReadme.includes("example-area-agent.md"), "Agent examples README should list area agent example");
  assert(structureReadme.includes("example-folder-readme.md"), "Structure examples README should list folder README example");
  assert(structureReadme.includes("example-area-readme.md"), "Structure examples README should list area README example");
  assert(executionReadme.includes("example-role-senior-developer.md"), "Execution examples README should list role example");
  assert(executionReadme.includes("example-skill-check-coherence.md"), "Execution examples README should list skill example");
  assert(executionReadme.includes("example-playbook-prepare-pr.md"), "Execution examples README should list playbook example");
  assert(executionReadme.includes("example-workflow-feature-to-delivery-cycle.md"), "Execution examples README should list workflow example");
  assert(commandsReadme.includes("example-command-define-design.md"), "Command examples README should list command example");
  assert(githubReadme.includes("example-github-epic.md"), "GitHub examples README should list epic example");
  assert(githubReadme.includes("example-github-feature.md"), "GitHub examples README should list feature example");
  assert(githubReadme.includes("example-pull-request.md"), "GitHub examples README should list PR example");
  assert(reviewReadme.includes("example-code-review.md"), "Review examples README should list code review example");

  assert(areaAgentExample.includes("# Design Agent"), "Area AGENT example should use a concrete Design area");
  assert(areaAgentExample.includes("Role Routing"), "Area AGENT example should show role routing");
  assert(areaAgentExample.includes("operations/design/AGENT.md -> Role -> Skills -> Playbook -> Output"), "Area AGENT example should show area Navigation Chain");
  assert(areaReadmeExample.includes("## File Responsibilities"), "Area README example should show file responsibilities");
  assert(roleExample.includes("# Senior Developer"), "Role example should use Senior Developer");
  assert(skillExample.includes("Check Coherence"), "Skill example should use Check Coherence");
  assert(playbookExample.includes("Prepare PR"), "Playbook example should use Prepare PR");
  assert(workflowExample.includes("Participating Areas"), "Workflow example should show participating areas");
  assert(workflowExample.includes("Design: conditional"), "Workflow example should mark Design as conditional");
  assert(workflowExample.includes("Security: conditional"), "Workflow example should mark Security as conditional");
  assert(commandExample.includes("## Load First"), "Command example should define Load First");
  assert(commandExample.includes("## Allowed Updates"), "Command example should define allowed updates");
  assert(commandExample.includes("## Forbidden Updates"), "Command example should define forbidden updates");
  assert(epicExample.includes("## Product Criteria"), "Epic example should include Product criteria");
  assert(epicExample.includes("## Design Criteria"), "Epic example should include Design criteria");
  assert(epicExample.includes("## Security Criteria"), "Epic example should include Security criteria");
  assert(featureExample.includes("## Definition of Done"), "Feature example should include Definition of Done");
  assert(prExample.includes("## LeanOS Context"), "PR example should include LeanOS context");
  assert(codeReviewExample.includes("## Findings"), "Code review example should include findings");

  for (const oldFlatExample of [
    "example-agent.md",
    "example-folder-readme.md",
    "example-role-senior-developer.md",
    "example-skill-check-coherence.md",
    "example-playbook-prepare-pr.md"
  ]) {
    assert.equal(await exists(join(examplesRoot, oldFlatExample)), false, `Old flat example should not exist: ${oldFlatExample}`);
  }
}

async function assertNoOldAiStandardReferences(rootDir) {
  const oldReferences = [
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
    "ai-standard/examples/example-playbook-prepare-pr.md",
    ".leanos/ai-standard",
    ".leanos/departments"
  ];
  const files = await listFiles(rootDir);

  for (const file of files) {
    const content = await readFile(join(rootDir, file), "utf8");

    for (const oldReference of oldReferences) {
      assert.equal(
        content.includes(oldReference),
        false,
        `Old AI Standard path reference should not appear in ${file}: ${oldReference}`
      );
    }
  }
}

async function assertWorkflowContract(rootDir) {
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
    await assertWorkflowPathReferences(rootDir, workflowRelativePath, content);
  }
}

function assertWorkflowRequiredSections(content, workflowRelativePath) {
  const requiredSections = [
    "Purpose",
    "Founder Triggers",
    "Owner",
    "Required Areas",
    "Conditional Areas",
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

async function assertCommandContract(rootDir) {
  const commandsDir = join(rootDir, ".leanos", "commands");
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
    content.includes("## Process\n") || content.includes("## What To Do\n"),
    `Command should define Process or What To Do: ${commandRelativePath}`
  );
  assert(
    content.includes("## Expected Output\n") || content.includes("## Output\n"),
    `Command should define Expected Output or Output: ${commandRelativePath}`
  );
}

function assertCommandWorkflowRouting(commandFile, content, commandRelativePath) {
  const workflowRequirements = {
    "define-mvp.md": ["../../operations/workflows/define-mvp.workflow.md"],
    "create-features.md": [
      "../../operations/workflows/roadmap-item-to-epic.workflow.md",
      "../../operations/workflows/epic-to-features.workflow.md"
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

async function assertAiStandardReadiness(rootDir) {
  const aiStandardReadme = await readFile(join(rootDir, "ai-standard", "README.md"), "utf8");
  const requiredRoutes = [
    "foundation/asset-taxonomy.md",
    "foundation/navigation-chain.md",
    "foundation/creation-rules.md",
    "foundation/naming-conventions.md",
    "foundation/quality-criteria.md",
    "foundation/folder-documentation-rules.md",
    "instructions/",
    "templates/",
    "checklists/",
    "examples/"
  ];
  const requiredSections = [
    "## Fast Route",
    "## Decision Map",
    "## Routes",
    "## Creation Flow",
    "## Do Not Load By Default",
    "## Agent Notes"
  ];

  for (const route of requiredRoutes) {
    assert(aiStandardReadme.includes(route), `AI Standard README should route to ${route}`);
  }

  for (const section of requiredSections) {
    assert(aiStandardReadme.includes(section), `AI Standard README should include ${section}`);
  }

  assert(aiStandardReadme.includes("Use this route for most asset creation work"), "AI Standard README should give a default creation route");
  assert(aiStandardReadme.includes("If the next route is unclear, start with `foundation/asset-taxonomy.md`"), "AI Standard README should provide a fallback route");
  assert(aiStandardReadme.includes("Do not load every template category"), "AI Standard README should discourage loading all templates");
  assert(aiStandardReadme.includes("Do not let examples override active workspace context"), "AI Standard README should keep examples subordinate to context");

  const fileChecks = [
    ["ai-standard/foundation/asset-taxonomy.md", ["Role = who acts.", "Skill = capability used.", "Playbook = practical task execution inside an area.", "Knowledge = information/source of truth.", "Workflow = coordination across areas, stages or handoffs."]],
    ["ai-standard/checklists/agent-quality-checklist.md", ["Root agents route only to departments", "does not try to be a full inventory"]],
    ["ai-standard/checklists/skill-quality-checklist.md", ["one reusable capability", "does not become a full process sequence"]],
    ["ai-standard/instructions/create-skill-instructions.md", ["Define one reusable capability", "../templates/execution/skill-template.md", "../checklists/skill-quality-checklist.md"]],
    ["ai-standard/templates/execution/skill-template.md", ["# Skill Template", "## Required", "Purpose", "Navigation"]],
    ["ai-standard/examples/README.md", ["They are not active workspace context, not templates and not instructions"]]
  ];

  for (const [path, snippets] of fileChecks) {
    const content = await readFile(join(rootDir, path), "utf8");

    for (const snippet of snippets) {
      assert(content.includes(snippet), `${path} should include readiness snippet: ${snippet}`);
    }
  }
}

async function assertBusinessAreaPattern(rootDir) {
  const businessAgent = await readFile(join(rootDir, "strategy", "business", "AGENT.md"), "utf8");
  const businessReadme = await readFile(join(rootDir, "strategy", "business", "README.md"), "utf8");
  const businessAreaYaml = parse(await readFile(join(rootDir, "strategy", "business", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "business", "knowledge", "README.md"), "utf8");
  const profile = await readFile(join(rootDir, "strategy", "business", "knowledge", "profile.md"), "utf8");
  const role = await readFile(join(rootDir, "strategy", "business", "roles", "business-strategist.role.md"), "utf8");
  const identitySkill = await readFile(join(rootDir, "strategy", "business", "skills", "define-business-identity.skill.md"), "utf8");
  const operatingModelSkill = await readFile(join(rootDir, "strategy", "business", "skills", "clarify-operating-model.skill.md"), "utf8");
  const playbook = await readFile(join(rootDir, "strategy", "business", "playbooks", "business-foundation.playbook.md"), "utf8");

  assert(businessAgent.includes("# Business Agent"), "Business should have an area AGENT");
  assert(businessAgent.includes("You are the Business Lead"), "Business AGENT should act as Business Lead");
  assert(businessAgent.includes("Choose the smallest specialist role"), "Business AGENT should route to specialist roles");
  assert(businessReadme.includes("start with `AGENT.md`"), "Business README should route operational work through AGENT.md");
  assert.equal(businessAreaYaml.area.agent, "AGENT.md", "Business area.yaml should declare AGENT.md");
  assert(businessAreaYaml.area.source_of_truth.includes("knowledge/profile.md"), "Business area.yaml should list knowledge source files");
  assert(knowledgeReadme.includes("# Business Knowledge"), "Business knowledge folder should include a README");
  assert(profile.includes("# Business Profile"), "Business profile should use Business naming");
  assert(role.includes("# Business Strategist"), "Business should use Business Strategist role");
  assert(role.includes("../knowledge/profile.md"), "Business Strategist should load Business knowledge files");
  assert(identitySkill.includes("## Required Context"), "Business identity skill should use rich skill structure");
  assert(identitySkill.includes("../knowledge/profile.md"), "Business identity skill should update Business knowledge");
  assert(operatingModelSkill.includes("Human approval points are explicit"), "Operating model skill should preserve human approval points");
  assert(playbook.includes("Business Foundation"), "Business foundation playbook should exist");
  assert(playbook.includes("../knowledge/operating-model.md"), "Business foundation playbook should update operating model knowledge");

  assert.equal(await exists(join(rootDir, "strategy", "company")), false, "Old strategy/company path should not be generated");
}

async function assertProductAreaPattern(rootDir) {
  const productAgent = await readFile(join(rootDir, "strategy", "product", "AGENT.md"), "utf8");
  const productReadme = await readFile(join(rootDir, "strategy", "product", "README.md"), "utf8");
  const productAreaYaml = parse(await readFile(join(rootDir, "strategy", "product", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "product", "knowledge", "README.md"), "utf8");
  const problem = await readFile(join(rootDir, "strategy", "product", "knowledge", "problem.md"), "utf8");
  const icp = await readFile(join(rootDir, "strategy", "product", "knowledge", "icp.md"), "utf8");
  const valueProposition = await readFile(join(rootDir, "strategy", "product", "knowledge", "value-proposition.md"), "utf8");
  const positioning = await readFile(join(rootDir, "strategy", "product", "knowledge", "positioning.md"), "utf8");
  const businessModel = await readFile(join(rootDir, "strategy", "product", "knowledge", "business-model-canvas.md"), "utf8");
  const validationNotes = await readFile(join(rootDir, "strategy", "product", "knowledge", "validation-notes.md"), "utf8");
  const productStrategistRole = await readFile(join(rootDir, "strategy", "product", "roles", "product-strategist.role.md"), "utf8");
  const productManagerRole = await readFile(join(rootDir, "strategy", "product", "roles", "product-manager.role.md"), "utf8");
  const productStrategyPlaybook = await readFile(join(rootDir, "strategy", "product", "playbooks", "product-strategy.playbook.md"), "utf8");

  assert(productAgent.includes("# Product Agent"), "Product should have an area AGENT");
  assert(productAgent.includes("You are the Product Lead"), "Product AGENT should act as Product Lead");
  assert(productAgent.includes("Choose the smallest specialist role"), "Product AGENT should route to specialist roles");
  assert(productReadme.includes("start with `AGENT.md`"), "Product README should route operational work through AGENT.md");
  assert.equal(productAreaYaml.area.agent, "AGENT.md", "Product area.yaml should declare AGENT.md");
  assert(productAreaYaml.area.source_of_truth.includes("knowledge/brief.md"), "Product area.yaml should list knowledge source files");
  assert(knowledgeReadme.includes("# Product Knowledge"), "Product knowledge folder should include a README");
  assert(problem.includes("## Problem Statement"), "Product problem knowledge should include a problem statement section");
  assert(problem.includes("## Existing Alternatives"), "Product problem knowledge should include alternatives");
  assert(icp.includes("## Primary Segment"), "Product ICP knowledge should include primary segment");
  assert(icp.includes("## Exclusions"), "Product ICP knowledge should include exclusions");
  assert(valueProposition.includes("## Promise"), "Product value proposition should include promise");
  assert(valueProposition.includes("## Differentiation"), "Product value proposition should include differentiation");
  assert(positioning.includes("## Category"), "Product positioning should include category");
  assert(positioning.includes("## Do Not Say"), "Product positioning should include Do Not Say");
  assert(businessModel.includes("## Revenue Model"), "Product business model should include revenue model");
  assert(businessModel.includes("## Assumptions to Validate"), "Product business model should include assumptions to validate");
  assert(validationNotes.includes("## Key Assumptions"), "Product validation notes should include key assumptions");
  assert(validationNotes.includes("## Evidence"), "Product validation notes should include evidence");
  assert(validationNotes.includes("## Roadmap Impact"), "Product validation notes should include roadmap impact");
  assert(productAreaYaml.area.source_of_truth.includes("knowledge/validation-notes.md"), "Product area.yaml should list validation notes as source of truth");
  assert(productStrategistRole.includes("../knowledge/brief.md"), "Product Strategist should load Product knowledge files");
  assert(productManagerRole.includes("../knowledge/brief.md"), "Product Manager should load Product knowledge files");
  assert(productStrategyPlaybook.includes("## Guided Conversation"), "Product strategy playbook should include guided conversation");
  assert(productStrategyPlaybook.includes("../../../ai-standard/foundation/guided-conversation.md"), "Product strategy playbook should point to guided conversation standard");
  assert(productStrategyPlaybook.includes("Offer numbered choices for idea destination"), "Product strategy playbook should guide idea-destination choices");

  for (const oldPath of [
    "brief.md",
    "problem.md",
    "icp.md",
    "jobs-to-be-done.md",
    "value-proposition.md",
    "positioning.md",
    "business-model-canvas.md"
  ]) {
    assert.equal(await exists(join(rootDir, "strategy", "product", oldPath)), false, `Product should not generate loose root file ${oldPath}`);
  }
}

async function assertRoadmapAreaPattern(rootDir) {
  const roadmapAgent = await readFile(join(rootDir, "strategy", "roadmap", "AGENT.md"), "utf8");
  const roadmapReadme = await readFile(join(rootDir, "strategy", "roadmap", "README.md"), "utf8");
  const roadmapAreaYaml = parse(await readFile(join(rootDir, "strategy", "roadmap", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "README.md"), "utf8");
  const roadmap = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "roadmap.md"), "utf8");
  const milestones = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "milestones.md"), "utf8");
  const currentCycle = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "current-cycle.md"), "utf8");
  const backlog = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "backlog.md"), "utf8");
  const role = await readFile(join(rootDir, "strategy", "roadmap", "roles", "roadmap-planner.role.md"), "utf8");
  const createRoadmapSkill = await readFile(join(rootDir, "strategy", "roadmap", "skills", "create-roadmap.skill.md"), "utf8");
  const prioritizeBacklogSkill = await readFile(join(rootDir, "strategy", "roadmap", "skills", "prioritize-backlog.skill.md"), "utf8");
  const prepareSyncSkill = await readFile(join(rootDir, "strategy", "roadmap", "skills", "prepare-roadmap-sync.skill.md"), "utf8");
  const cyclePlaybook = await readFile(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-cycle-planning.playbook.md"), "utf8");
  const syncPlaybook = await readFile(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-sync-prep.playbook.md"), "utf8");
  const projectSync = await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8");

  assert(roadmapAgent.includes("# Roadmap Agent"), "Roadmap should have an area AGENT");
  assert(roadmapAgent.includes("You are the Roadmap Lead"), "Roadmap AGENT should act as Roadmap Lead");
  assert(roadmapAgent.includes("Choose the smallest specialist role"), "Roadmap AGENT should route to specialist roles");
  assert(roadmapReadme.includes("start with `AGENT.md`"), "Roadmap README should route operational work through AGENT.md");
  assert.equal(roadmapAreaYaml.area.agent, "AGENT.md", "Roadmap area.yaml should declare AGENT.md");
  assert(roadmapAreaYaml.area.source_of_truth.includes("knowledge/roadmap.md"), "Roadmap area.yaml should list knowledge source files");
  assert(roadmapAreaYaml.area.playbooks.includes("roadmap-cycle-planning"), "Roadmap area.yaml should list roadmap-cycle-planning");
  assert.equal(roadmapAreaYaml.area.playbooks.includes("validation-cycle-planning"), false, "Roadmap area.yaml should not list validation-cycle-planning");
  assert(knowledgeReadme.includes("# Roadmap Knowledge"), "Roadmap knowledge folder should include a README");
  assert(roadmap.includes("## Now"), "Roadmap knowledge should include Now");
  assert(roadmap.includes("## Next"), "Roadmap knowledge should include Next");
  assert(roadmap.includes("## Not Planned"), "Roadmap knowledge should include Not Planned");
  assert(milestones.includes("## Active Milestones"), "Milestones knowledge should include active milestones");
  assert(currentCycle.includes("## Cycle Goal"), "Current cycle knowledge should include cycle goal");
  assert(currentCycle.includes("## Success Criteria"), "Current cycle knowledge should include success criteria");
  assert(backlog.includes("## Candidate Items"), "Backlog knowledge should include candidate items");
  assert(role.includes("../knowledge/roadmap.md"), "Roadmap Planner should load Roadmap knowledge files");
  assert(createRoadmapSkill.includes("## Required Context"), "Create roadmap skill should use rich skill structure");
  assert(prioritizeBacklogSkill.includes("Large items are flagged for epic breakdown"), "Prioritize backlog skill should identify large items");
  assert(prepareSyncSkill.includes("Do not call GitHub API directly from the model"), "Prepare roadmap sync skill should block direct API calls");
  assert(cyclePlaybook.includes("Roadmap Cycle Planning"), "Roadmap cycle playbook should replace validation cycle planning");
  assert(cyclePlaybook.includes("../knowledge/current-cycle.md"), "Roadmap cycle playbook should update current-cycle knowledge");
  assert(syncPlaybook.includes("../knowledge/milestones.md"), "Roadmap sync playbook should use knowledge milestones");
  assert(projectSync.includes("../../strategy/roadmap/knowledge/roadmap.md"), "GitHub project sync should point to roadmap knowledge");

  for (const oldPath of ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"]) {
    assert.equal(await exists(join(rootDir, "strategy", "roadmap", oldPath)), false, `Roadmap should not generate loose root file ${oldPath}`);
  }

  assert.equal(await exists(join(rootDir, "strategy", "roadmap", "playbooks", "validation-cycle-planning.playbook.md")), false, "Roadmap should not generate validation-cycle-planning playbook in MVP roadmap scaffold");
}

async function assertDesignFoundation(rootDir) {
  const designReadme = await readFile(join(rootDir, "operations", "design", "README.md"), "utf8");
  const designAgent = await readFile(join(rootDir, "operations", "design", "AGENT.md"), "utf8");
  const designKnowledgeReadme = await readFile(join(rootDir, "operations", "design", "knowledge", "README.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "operations", "design", "area.yaml"), "utf8"));
  const productDesigner = await readFile(join(rootDir, "operations", "design", "roles", "product-designer.role.md"), "utf8");
  const uxResearcher = await readFile(join(rootDir, "operations", "design", "roles", "ux-researcher.role.md"), "utf8");
  const accessibilitySpecialist = await readFile(join(rootDir, "operations", "design", "roles", "accessibility-specialist.role.md"), "utf8");
  const uxWriter = await readFile(join(rootDir, "operations", "design", "roles", "ux-writer.role.md"), "utf8");
  const defineDesignCommand = await readFile(join(rootDir, ".leanos", "commands", "define-design.md"), "utf8");
  const designFoundationPlaybook = await readFile(join(rootDir, "operations", "design", "playbooks", "design-foundation.playbook.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "skills.yaml"), "utf8"));
  const designSystemKnowledge = await readFile(join(rootDir, "operations", "design", "knowledge", "design-system.md"), "utf8");
  const accessibilityKnowledge = await readFile(join(rootDir, "operations", "design", "knowledge", "accessibility.md"), "utf8");
  const userFlowsKnowledge = await readFile(join(rootDir, "operations", "design", "knowledge", "user-flows.md"), "utf8");
  const componentInventoryKnowledge = await readFile(join(rootDir, "operations", "design", "knowledge", "component-inventory.md"), "utf8");
  const componentSpecsReadme = await readFile(join(rootDir, "operations", "design", "knowledge", "components", "README.md"), "utf8");
  const userResearchSkill = await readFile(join(rootDir, "operations", "design", "skills", "user-research.skill.md"), "utf8");
  const userFlowMappingSkill = await readFile(join(rootDir, "operations", "design", "skills", "user-flow-mapping.skill.md"), "utf8");
  const designSystemSkill = await readFile(join(rootDir, "operations", "design", "skills", "design-system.skill.md"), "utf8");
  const componentAnalysisSkill = await readFile(join(rootDir, "operations", "design", "skills", "component-analysis.skill.md"), "utf8");
  const screenSpecificationSkill = await readFile(join(rootDir, "operations", "design", "skills", "screen-specification.skill.md"), "utf8");
  const microcopySkill = await readFile(join(rootDir, "operations", "design", "skills", "microcopy.skill.md"), "utf8");
  const accessibilitySkill = await readFile(join(rootDir, "operations", "design", "skills", "accessibility.skill.md"), "utf8");
  const designReviewSkill = await readFile(join(rootDir, "operations", "design", "skills", "design-review.skill.md"), "utf8");
  const componentReadinessPlaybook = await readFile(join(rootDir, "operations", "design", "playbooks", "component-readiness.playbook.md"), "utf8");

  await assertExists(join(rootDir, "operations", "design", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "README.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "design-system.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "accessibility.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "user-flows.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "component-inventory.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "components", "README.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "ux-researcher.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "product-designer.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "accessibility-specialist.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "ux-writer.role.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "design-system.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "accessibility.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "user-research.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "user-flow-mapping.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "component-analysis.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "screen-specification.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "microcopy.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "design-review.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "user-research.playbook.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "component-readiness.playbook.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "accessibility-review.playbook.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "ux-writing.playbook.md"));
  assert.equal(await exists(join(rootDir, "operations", "design", "design-principles.md")), false, "Design principles should move out of the Design area root");
  assert.equal(await exists(join(rootDir, "operations", "design", "user-flows.md")), false, "User flows should move into Design knowledge");
  assert.equal(await exists(join(rootDir, "operations", "design", "screen-specs.md")), false, "Screen specs should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "operations", "design", "ux-decisions.md")), false, "UX decisions should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "operations", "design", "usability-notes.md")), false, "Usability notes should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "operations", "design", "roles", "ux-lead.role.md")), false, "UX Lead should be the area AGENT, not a specialist role file");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "define-design-system.skill.md")), false, "Design skill should use direct naming without define- prefix");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "define-accessibility.skill.md")), false, "Accessibility skill should use direct naming without define- prefix");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "map-user-flow.skill.md")), false, "User flow skill should use direct naming");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "create-screen-spec.skill.md")), false, "Screen spec skill should use direct naming");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "ux-states.skill.md")), false, "UX states should be incorporated into screen specification");
  assert.equal(await exists(join(rootDir, "operations", "design", "skills", "define-ux-states.skill.md")), false, "UX states skill should use direct naming");

  for (const heading of ["## Tokens", "## Typography", "## Color Intent", "## Spacing", "## Components", "## Interaction Principles", "## Do Not Do", "## Open Questions"]) {
    assert(designSystemKnowledge.includes(heading), `Design system knowledge should include ${heading}`);
  }

  for (const heading of ["## Accessibility Baseline", "## WCAG Target", "## Keyboard Navigation", "## Focus Rules", "## Contrast Rules", "## Forms and Errors", "## Screen Reader Notes", "## Known Risks"]) {
    assert(accessibilityKnowledge.includes(heading), `Accessibility knowledge should include ${heading}`);
  }

  for (const heading of ["## Primary Flow", "## Entry Point", "## User Goal", "## Steps", "## Edge Cases", "## Required Screens", "## Open Questions"]) {
    assert(userFlowsKnowledge.includes(heading), `User flows knowledge should include ${heading}`);
  }

  for (const heading of ["## Purpose", "## How To Use", "## Component List", "## Known Gaps", "## Reuse Rules", "## Open Questions"]) {
    assert(componentInventoryKnowledge.includes(heading), `Component inventory knowledge should include ${heading}`);
  }
  assert(componentInventoryKnowledge.includes("approved, planned, needs-spec, deprecated or unknown"), "Component inventory should define practical component statuses");
  assert(componentSpecsReadme.includes("Store concrete Design component specifications created for real Features"), "Component specs README should explain its purpose");
  assert(componentSpecsReadme.includes("intentionally empty in the initial scaffold except for this README"), "Component specs folder should avoid speculative specs");
  assert(componentSpecsReadme.includes("<component-name>.md"), "Component specs README should define component spec naming");
  assert(componentSpecsReadme.includes("../../../../ai-standard/templates/design/component-spec-template.md"), "Component specs README should point to the component spec template");
  const componentSpecEntries = await readdir(join(rootDir, "operations", "design", "knowledge", "components"));
  assert.deepEqual(componentSpecEntries, ["README.md"], "Component specs folder should not generate concrete component specs in the initial scaffold");

  for (const skillContent of [userResearchSkill, userFlowMappingSkill, designSystemSkill, componentAnalysisSkill, screenSpecificationSkill, microcopySkill, accessibilitySkill, designReviewSkill]) {
    for (const heading of ["## Purpose", "## Use When", "## Required Context", "## Inputs", "## Process", "## Checks", "## Output", "## Files to Update", "## Red Lines"]) {
      assert(skillContent.includes(heading), `Design skill should include ${heading}`);
    }
  }

  assert(userResearchSkill.includes("Separate evidence from assumptions"), "User research skill should separate evidence from assumptions");
  assert(userResearchSkill.includes("Do not treat hypotheses as facts"), "User research skill should avoid treating hypotheses as facts");
  assert(userFlowMappingSkill.includes("Avoid flows larger than the MVP"), "User flow mapping should avoid oversized MVP flows");
  assert(designSystemSkill.includes("Prioritize flow clarity before visual polish"), "Design system skill should avoid polish before flow clarity");
  assert(componentAnalysisSkill.includes("reuse, adapt, create-new, not-applicable or blocked"), "Component analysis should classify component readiness decisions");
  assert(componentAnalysisSkill.includes("component-inventory.md"), "Component analysis should read component inventory");
  assert(componentAnalysisSkill.includes("component-spec-template.md"), "Component analysis should use the component spec template");
  assert(screenSpecificationSkill.includes("default, loading, empty, error, success and edge-case states"), "Screen specification should include required UX states");
  assert(microcopySkill.includes("labels, helper text, empty states, errors, success messages and onboarding hints"), "Microcopy skill should cover key copy surfaces");
  assert(accessibilitySkill.includes("WCAG 2.2 AA"), "Accessibility skill should use WCAG 2.2 AA baseline");
  assert(designReviewSkill.includes("pass, concerns, blocked or not applicable"), "Design review skill should classify review result");
  assert(designReviewSkill.includes("Findings are ordered by severity"), "Design review skill should order findings by severity");

  assert(designReadme.includes("knowledge/design-system.md"), "Design README should point to Design knowledge");
  assert(designKnowledgeReadme.includes("components/README.md"), "Design knowledge README should include component specs folder guidance");
  assert(designKnowledgeReadme.includes("Create component specs inside `components/` only when a real Feature requires them"), "Design knowledge README should prevent speculative component specs");
  assert(designReadme.includes("Design foundation request"), "Design README should expose the design foundation common path");
  assert(designReadme.includes("For operational work, start with `AGENT.md`"), "Design README should point operational work to the area AGENT");
  assert(designAgent.includes("You are the UX Lead"), "Design AGENT should define UX Lead as the area owner");
  assert(designAgent.includes("Product Designer: `roles/product-designer.role.md`"), "Design AGENT should route product design work");
  assert(designAgent.includes("UX Researcher: `roles/ux-researcher.role.md`"), "Design AGENT should route research work");
  assert(designAgent.includes("Accessibility Specialist: `roles/accessibility-specialist.role.md`"), "Design AGENT should route accessibility work");
  assert(designAgent.includes("UX Writer: `roles/ux-writer.role.md`"), "Design AGENT should route UX writing work");
  assert(designAgent.includes("Keep reusable area knowledge in `knowledge/`"), "Design AGENT should keep knowledge modular");
  assert.equal(areaYaml.area.agent, "AGENT.md");
  assert(areaYaml.area.skills.includes("design-review"), "Design area YAML should list design-review skill");
  assert(areaYaml.area.skills.includes("component-analysis"), "Design area YAML should list component-analysis skill");
  assert(areaYaml.area.playbooks.includes("component-readiness"), "Design area YAML should list component-readiness playbook");
  assert.equal(areaYaml.area.skills.includes("ux-states"), false, "Design area YAML should not list ux-states skill");
  assert(skillsIndex.skills.some((skill) => skill.key === "design-review" && skill.path === "../../operations/design/skills/design-review.skill.md"), "Skills index should list design-review");
  assert(skillsIndex.skills.some((skill) => skill.key === "component-analysis" && skill.path === "../../operations/design/skills/component-analysis.skill.md"), "Skills index should list component-analysis");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "ux-states"), false, "Skills index should not list ux-states");
  assert.deepEqual(areaYaml.area.source_of_truth, ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md", "knowledge/component-inventory.md"]);
  assert(productDesigner.includes("../knowledge/design-system.md"), "Product Designer should read design-system knowledge");
  assert(productDesigner.includes("../knowledge/user-flows.md"), "Product Designer should read user-flow knowledge");
  assert(productDesigner.includes("../knowledge/component-inventory.md"), "Product Designer should read component inventory");
  assert(productDesigner.includes("../skills/component-analysis.skill.md"), "Product Designer should point to component-analysis skill");
  assert(productDesigner.includes("../playbooks/component-readiness.playbook.md"), "Product Designer should point to component-readiness playbook");
  assert(productDesigner.includes("../skills/design-review.skill.md"), "Product Designer should point to design-review skill");
  assert(uxResearcher.includes("../knowledge/user-flows.md"), "UX Researcher should read user-flow knowledge");
  assert(accessibilitySpecialist.includes("../knowledge/accessibility.md"), "Accessibility Specialist should read accessibility knowledge");
  assert(accessibilitySpecialist.includes("../skills/design-review.skill.md"), "Accessibility Specialist should point to design-review skill");
  assert(uxWriter.includes("../knowledge/user-flows.md"), "UX Writer should read user-flow knowledge");
  assert(uxWriter.includes("../skills/design-review.skill.md"), "UX Writer should point to design-review skill");

  assert(defineDesignCommand.includes("# /define design"), "Define design command should use the expected invocation");
  assert(defineDesignCommand.includes("Prepare the MVP design foundation before implementation"), "Define design command should explain the design foundation purpose");
  assert(defineDesignCommand.includes("../../operations/design/AGENT.md"), "Define design should load Design area AGENT");
  assert(defineDesignCommand.includes("../../operations/design/roles/product-designer.role.md"), "Define design should load Product Designer role");
  assert(defineDesignCommand.includes("../../strategy/product/README.md"), "Define design should load Product context when active");
  assert(defineDesignCommand.includes("../../operations/product-ops/mvp/scope.md"), "Define design should load MVP context when active");
  assert(defineDesignCommand.includes("../../operations/design/skills/design-system.skill.md"), "Define design should load the direct design-system skill name");
  assert(defineDesignCommand.includes("../../operations/design/skills/accessibility.skill.md"), "Define design should load the direct accessibility skill name");
  assert(defineDesignCommand.includes("../../operations/design/skills/user-flow-mapping.skill.md"), "Define design should load user-flow-mapping skill");
  assert.equal(defineDesignCommand.includes("../../operations/design/roles/ux-lead.role.md"), false, "Define design should not load old UX Lead role file");
  assert.equal(defineDesignCommand.includes("../../operations/design/skills/define-design-system.skill.md"), false, "Define design should not load define-prefixed design-system skill");
  assert.equal(defineDesignCommand.includes("../../operations/design/skills/define-accessibility.skill.md"), false, "Define design should not load define-prefixed accessibility skill");
  assert(defineDesignCommand.includes("../../operations/design/knowledge/design-system.md"), "Define design should update design-system knowledge");
  assert(defineDesignCommand.includes("Leave screen-specific artifacts for later feature or screen-specific work"), "Define design should defer screen-specific files");
  assert.equal(defineDesignCommand.includes("screen-specs.md"), false, "Define design should not reference removed screen specs file");
  assert.equal(defineDesignCommand.includes("usability-notes.md"), false, "Define design should not reference removed usability notes file");
  assert.equal(defineDesignCommand.includes("ux-decisions.md"), false, "Define design should not reference removed UX decisions file");
  assert(defineDesignCommand.includes("Write only after explicit user confirmation"), "Define design should use propose-first writes");
  assert(designFoundationPlaybook.includes("Design system baseline"), "Design foundation playbook should output a design system baseline");
  assert(designFoundationPlaybook.includes("Accessibility baseline"), "Design foundation playbook should output an accessibility baseline");
  assert(componentReadinessPlaybook.includes("Component readiness result"), "Component readiness playbook should output a readiness result");
  assert(componentReadinessPlaybook.includes("component-spec-template.md"), "Component readiness playbook should use the component spec template");
  assert(componentReadinessPlaybook.includes("Return the Design readiness result to Product Ops and Engineering"), "Component readiness should hand off to Product Ops and Engineering");
  assert(nextActions.includes("/define design"), "Full workspace should recommend /define design when Product, Product Ops and Design are active");
}

async function assertEngineeringAreaPattern(rootDir) {
  const engineeringReadme = await readFile(join(rootDir, "operations", "engineering", "README.md"), "utf8");
  const engineeringAgent = await readFile(join(rootDir, "operations", "engineering", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "operations", "engineering", "area.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "index", "playbooks.yaml"), "utf8"));
  const codeStandards = await readFile(join(rootDir, "operations", "engineering", "knowledge", "code-standards.md"), "utf8");
  const implementationRules = await readFile(join(rootDir, "operations", "engineering", "knowledge", "implementation-rules.md"), "utf8");
  const componentGuidelines = await readFile(join(rootDir, "operations", "engineering", "knowledge", "component-guidelines.md"), "utf8");
  const dataGuidelines = await readFile(join(rootDir, "operations", "engineering", "knowledge", "data-guidelines.md"), "utf8");
  const testingStrategy = await readFile(join(rootDir, "operations", "engineering", "knowledge", "testing-strategy.md"), "utf8");
  const reviewCriteria = await readFile(join(rootDir, "operations", "engineering", "knowledge", "review-criteria.md"), "utf8");
  const seniorDeveloper = await readFile(join(rootDir, "operations", "engineering", "roles", "senior-developer.role.md"), "utf8");
  const testEngineer = await readFile(join(rootDir, "operations", "engineering", "roles", "test-engineer.role.md"), "utf8");
  const prReviewer = await readFile(join(rootDir, "operations", "engineering", "roles", "pr-reviewer.role.md"), "utf8");
  const planImplementation = await readFile(join(rootDir, "operations", "engineering", "skills", "plan-implementation.skill.md"), "utf8");
  const followCodeStandards = await readFile(join(rootDir, "operations", "engineering", "skills", "follow-code-standards.skill.md"), "utf8");
  const implementComponent = await readFile(join(rootDir, "operations", "engineering", "skills", "implement-component.skill.md"), "utf8");
  const reviewDataChange = await readFile(join(rootDir, "operations", "engineering", "skills", "review-data-change.skill.md"), "utf8");
  const engineeringDelivery = await readFile(join(rootDir, "operations", "engineering", "playbooks", "engineering-delivery.playbook.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "branch-for-feature.playbook.md"), "utf8");
  const componentImplementation = await readFile(join(rootDir, "operations", "engineering", "playbooks", "component-implementation.playbook.md"), "utf8");
  const preparePr = await readFile(join(rootDir, "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const prValidation = await readFile(join(rootDir, "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  const workonFeatureCommand = await readFile(join(rootDir, ".leanos", "commands", "workon-feature.md"), "utf8");

  await assertExists(join(rootDir, "operations", "engineering", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "engineering", "knowledge", "README.md"));
  assert.equal(await exists(join(rootDir, "operations", "engineering", "implementation-notes.md")), false, "Engineering notes should move into knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "engineering", "code-review-notes.md")), false, "Code review notes should move into knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "engineering", "pr-log.md")), false, "PR log should move into knowledge/");

  assert(engineeringReadme.includes("start with `AGENT.md`"), "Engineering README should route operational work through AGENT.md");
  assert(engineeringReadme.includes("Read the approved Design component spec before implementing a new reusable component"), "Engineering README should require Design component spec before component work");
  assert(engineeringReadme.includes("Do not create new user-facing components before Design defines the structure or confirms the component spec"), "Engineering README should include component red line");
  assert(engineeringAgent.includes("You are the Engineering Lead"), "Engineering AGENT should define Engineering Lead");
  assert(engineeringAgent.includes("Senior Developer: `roles/senior-developer.role.md`"), "Engineering AGENT should route Senior Developer work");
  assert(engineeringAgent.includes("Test Engineer: `roles/test-engineer.role.md`"), "Engineering AGENT should route Test Engineer work");
  assert(engineeringAgent.includes("PR Reviewer: `roles/pr-reviewer.role.md`"), "Engineering AGENT should route PR Reviewer work");
  assert(engineeringAgent.includes("Create or confirm a Feature-linked branch before changing code"), "Engineering AGENT should require branch before code changes");
  assert(engineeringAgent.includes("Implement reusable component work before the screen or Feature that depends on it"), "Engineering AGENT should implement reusable component before dependent Feature");
  assert(engineeringAgent.includes("playbooks/engineering-delivery.playbook.md"), "Engineering AGENT should route implementation through engineering-delivery");
  assert(engineeringAgent.includes("Do not hardcode secrets, configuration, business rules, copy or design values"), "Engineering AGENT should forbid hardcoding");
  assert.equal(areaYaml.area.agent, "AGENT.md", "Engineering area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/code-standards.md"), "Engineering area.yaml should list code standards");
  assert(areaYaml.area.roles.includes("test-engineer"), "Engineering area.yaml should list test-engineer");
  assert(areaYaml.area.skills.includes("follow-code-standards"), "Engineering area.yaml should list follow-code-standards");
  assert(areaYaml.area.skills.includes("implement-component"), "Engineering area.yaml should list implement-component");
  assert(areaYaml.area.skills.includes("review-data-change"), "Engineering area.yaml should list review-data-change");
  assert(areaYaml.area.playbooks.includes("engineering-delivery"), "Engineering area.yaml should list engineering-delivery");
  assert(areaYaml.area.playbooks.includes("component-implementation"), "Engineering area.yaml should list component-implementation");
  assert(skillsIndex.skills.some((skill) => skill.key === "implement-component" && skill.path === "../../operations/engineering/skills/implement-component.skill.md"), "Skills index should list implement-component");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "engineering-delivery" && playbook.path === "../../operations/engineering/playbooks/engineering-delivery.playbook.md"), "Playbooks index should list engineering-delivery");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "component-implementation" && playbook.path === "../../operations/engineering/playbooks/component-implementation.playbook.md"), "Playbooks index should list component-implementation");

  for (const content of [codeStandards, implementationRules, componentGuidelines, dataGuidelines, testingStrategy, reviewCriteria]) {
    for (const section of ["## Purpose", "## Current State", "## Decisions", "## Open Questions", "## Next Update"]) {
      assert(content.includes(section), `Engineering knowledge should include ${section}`);
    }
  }

  assert(componentGuidelines.includes("## Design Dependency"), "Component guidelines should define Design dependency");
  assert(componentGuidelines.includes("Read the approved Design component spec before implementing a new user-facing component"), "Component guidelines should require Design spec before component implementation");
  assert(componentGuidelines.includes("../../design/knowledge/component-inventory.md"), "Component guidelines should point to component inventory");
  assert(componentGuidelines.includes("Implement reusable component behavior before the screen or Feature that consumes it"), "Component guidelines should implement component before dependent Feature");
  assert(componentGuidelines.includes("Do not create a new user-facing component without a Design spec"), "Component guidelines should block component work without Design spec");
  assert(componentGuidelines.includes("## Do Not Do"), "Component guidelines should include Do Not Do");
  assert(dataGuidelines.includes("## Migrations"), "Data guidelines should include migrations");
  assert(dataGuidelines.includes("## Rollback"), "Data guidelines should include rollback");
  assert(testingStrategy.includes("## Test Gaps"), "Testing strategy should include test gaps");
  assert(reviewCriteria.includes("## Merge Recommendation"), "Review criteria should include merge recommendation");
  assert(seniorDeveloper.includes("../knowledge/code-standards.md"), "Senior Developer should read code standards");
  assert(seniorDeveloper.includes("../knowledge/component-guidelines.md"), "Senior Developer should read component guidelines");
  assert(seniorDeveloper.includes("../playbooks/engineering-delivery.playbook.md"), "Senior Developer should use engineering delivery playbook");
  assert(seniorDeveloper.includes("../skills/implement-component.skill.md"), "Senior Developer should use implement-component skill");
  assert(seniorDeveloper.includes("../playbooks/component-implementation.playbook.md"), "Senior Developer should use component implementation playbook");
  assert(testEngineer.includes("../knowledge/testing-strategy.md"), "Test Engineer should read testing strategy");
  assert(prReviewer.includes("../knowledge/review-criteria.md"), "PR Reviewer should read review criteria");

  for (const skillContent of [planImplementation, followCodeStandards, implementComponent, reviewDataChange]) {
    for (const heading of ["## Purpose", "## Use When", "## Required Context", "## Inputs", "## Process", "## Checks", "## Output"]) {
      assert(skillContent.includes(heading), `Engineering skill should include ${heading}`);
    }
  }

  assert(planImplementation.includes("Do not begin code changes without branch context"), "Plan implementation should block code without branch context");
  assert(followCodeStandards.includes("No large unstructured component or file"), "Code standards skill should enforce modularity");
  assert(implementComponent.includes("Design component spec"), "Implement component skill should require Design component spec");
  assert(implementComponent.includes("../../design/knowledge/component-inventory.md"), "Implement component skill should read Design component inventory");
  assert(implementComponent.includes("../knowledge/component-guidelines.md"), "Implement component skill should read Engineering component guidelines");
  assert(implementComponent.includes("Do not implement a new user-facing component without a Design spec"), "Implement component skill should block component work without Design spec");
  assert(engineeringDelivery.includes("Orchestrate the internal Engineering path"), "Engineering delivery playbook should define the master Engineering path");
  assert(engineeringDelivery.includes("playbooks/branch-for-feature.playbook.md"), "Engineering delivery playbook should start with branch playbook");
  assert(engineeringDelivery.includes("skills/plan-implementation.skill.md"), "Engineering delivery playbook should require implementation planning");
  assert(engineeringDelivery.includes("playbooks/component-implementation.playbook.md"), "Engineering delivery playbook should include component implementation when needed");
  assert(engineeringDelivery.includes("skills/follow-code-standards.skill.md"), "Engineering delivery playbook should use code standards skill");
  assert(engineeringDelivery.includes("skills/review-data-change.skill.md"), "Engineering delivery playbook should use data review when applicable");
  assert(engineeringDelivery.includes("skills/write-tests.skill.md"), "Engineering delivery playbook should require tests or test-gap explanation");
  assert(engineeringDelivery.includes("playbooks/prepare-pr.playbook.md"), "Engineering delivery playbook should prepare PR through prepare-pr");
  assert(engineeringDelivery.includes("playbooks/pr-validation.playbook.md"), "Engineering delivery playbook should end with PR validation");
  assert(engineeringDelivery.includes("Founder Testing Guide"), "Engineering delivery should require Founder Testing Guide before founder review");
  assert(engineeringDelivery.includes("## Gates"), "Engineering delivery playbook should declare explicit gates");
  assert(engineeringDelivery.includes("Do not edit code before a Feature-linked branch"), "Engineering delivery should gate code behind branch creation");
  assert(engineeringDelivery.includes("Do not implement a new user-facing component without an approved Design component spec"), "Engineering delivery should gate new components behind Design spec");
  assert(engineeringDelivery.includes("Do not open or prepare a PR without tests"), "Engineering delivery should gate PR behind tests or validation notes");
  assert(engineeringDelivery.includes("Do not recommend merge before `playbooks/pr-validation.playbook.md` is complete"), "Engineering delivery should gate merge recommendation behind PR validation");
  assert(engineeringDelivery.includes("Stop Conditions"), "Engineering delivery playbook should include stop conditions");
  assert(componentImplementation.includes("Approved Design component spec"), "Component implementation playbook should require approved Design spec");
  assert(branchPlaybook.includes("branch step of `engineering-delivery.playbook.md`"), "Branch playbook should identify itself as engineering-delivery branch step");
  assert(componentImplementation.includes("../../design/knowledge/component-inventory.md"), "Component implementation playbook should read component inventory");
  assert(componentImplementation.includes("component step of `engineering-delivery.playbook.md`"), "Component implementation playbook should identify itself as engineering-delivery component step");
  assert(componentImplementation.includes("Implement the reusable component before the screen or Feature"), "Component implementation playbook should implement component before dependent Feature");
  assert(componentImplementation.includes("skills/implement-component.skill.md"), "Component implementation playbook should use implement-component skill");
  assert(reviewDataChange.includes("No destructive change without confirmation"), "Data review skill should block destructive changes");
  assert(preparePr.includes("skills/follow-code-standards.skill.md"), "Prepare PR playbook should use code standards skill");
  assert(preparePr.includes("PR preparation step of `engineering-delivery.playbook.md`"), "Prepare PR playbook should identify itself as engineering-delivery PR preparation step");
  assert(preparePr.includes("playbooks/component-implementation.playbook.md"), "Prepare PR playbook should run component implementation when needed");
  assert(preparePr.includes("skills/review-data-change.skill.md"), "Prepare PR playbook should use data review when applicable");
  assert(preparePr.includes("Founder Testing Guide"), "Prepare PR playbook should prepare Founder Testing Guide");
  assert(preparePr.includes("where to test"), "Prepare PR playbook should tell the founder where to test");
  assert(prValidation.includes("knowledge/review-criteria.md"), "PR validation should load review criteria");
  assert(prValidation.includes("final validation step of `engineering-delivery.playbook.md`"), "PR validation playbook should identify itself as engineering-delivery final validation step");
  assert(prValidation.includes("Founder Testing Guide"), "PR validation should validate Founder Testing Guide");
  assert(prValidation.includes("non-technical founder can test"), "PR validation should require founder-testable instructions");
  assert(prValidation.includes("Security/Data review result or not applicable"), "PR validation should classify Security/Data result");
  assert(workonFeatureCommand.includes("../../operations/engineering/AGENT.md"), "Workon feature command should load Engineering AGENT");
  assert(workonFeatureCommand.includes("../../operations/engineering/knowledge/code-standards.md"), "Workon feature command should load code standards");
}

async function assertDevOpsAreaPattern(rootDir) {
  const devopsReadme = await readFile(join(rootDir, "operations", "devops", "README.md"), "utf8");
  const devopsAgent = await readFile(join(rootDir, "operations", "devops", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "operations", "devops", "area.yaml"), "utf8"));
  const githubManagement = await readFile(join(rootDir, "operations", "devops", "knowledge", "github-management.md"), "utf8");
  const environments = await readFile(join(rootDir, "operations", "devops", "knowledge", "environments.md"), "utf8");
  const deploymentReadiness = await readFile(join(rootDir, "operations", "devops", "knowledge", "deployment-readiness.md"), "utf8");
  const ciCd = await readFile(join(rootDir, "operations", "devops", "knowledge", "ci-cd.md"), "utf8");
  const observability = await readFile(join(rootDir, "operations", "devops", "knowledge", "observability.md"), "utf8");
  const releaseNotes = await readFile(join(rootDir, "operations", "devops", "knowledge", "release-notes.md"), "utf8");
  const devopsEngineer = await readFile(join(rootDir, "operations", "devops", "roles", "devops-engineer.role.md"), "utf8");
  const githubDevops = await readFile(join(rootDir, "operations", "devops", "roles", "github-devops.role.md"), "utf8");
  const releaseManager = await readFile(join(rootDir, "operations", "devops", "roles", "release-manager.role.md"), "utf8");
  const configureGithubProject = await readFile(join(rootDir, "operations", "devops", "skills", "configure-github-project.skill.md"), "utf8");
  const configureEnvironments = await readFile(join(rootDir, "operations", "devops", "skills", "configure-environments.skill.md"), "utf8");
  const setupCi = await readFile(join(rootDir, "operations", "devops", "skills", "setup-ci.skill.md"), "utf8");
  const planDeployment = await readFile(join(rootDir, "operations", "devops", "skills", "plan-deployment.skill.md"), "utf8");
  const defineObservability = await readFile(join(rootDir, "operations", "devops", "skills", "define-observability.skill.md"), "utf8");
  const prepareRelease = await readFile(join(rootDir, "operations", "devops", "skills", "prepare-release.skill.md"), "utf8");
  const githubProjectPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "configure-github-project.playbook.md"), "utf8");
  const setupCiCdPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "setup-ci-cd.playbook.md"), "utf8");
  const planDeploymentPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "plan-deployment.playbook.md"), "utf8");
  const releaseOperationsPlaybook = await readFile(join(rootDir, "operations", "devops", "playbooks", "release-operations.playbook.md"), "utf8");

  await assertExists(join(rootDir, "operations", "devops", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "devops", "knowledge", "README.md"));
  assert.equal(await exists(join(rootDir, "operations", "devops", "github-management.md")), false, "DevOps GitHub management should live in knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "devops", "environments.md")), false, "DevOps environments should live in knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "devops", "deployment-readiness.md")), false, "DevOps deployment readiness should live in knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "devops", "ci-cd.md")), false, "DevOps CI/CD should live in knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "devops", "observability.md")), false, "DevOps observability should live in knowledge/");
  assert.equal(await exists(join(rootDir, "operations", "devops", "release-notes.md")), false, "DevOps release notes should live in knowledge/");

  assert(devopsReadme.includes("start with `AGENT.md`"), "DevOps README should route operational work through AGENT.md");
  assert(devopsReadme.includes("Do not store tokens, secrets or credentials in workspace files"), "DevOps README should include token storage red line");
  assert(devopsAgent.includes("You are the DevOps Lead"), "DevOps AGENT should define DevOps Lead");
  assert(devopsAgent.includes("GitHub DevOps: `roles/github-devops.role.md`"), "DevOps AGENT should route GitHub DevOps work");
  assert(devopsAgent.includes("DevOps Engineer: `roles/devops-engineer.role.md`"), "DevOps AGENT should route DevOps Engineer work");
  assert(devopsAgent.includes("Release Manager: `roles/release-manager.role.md`"), "DevOps AGENT should route Release Manager work");
  assert(devopsAgent.includes("Do not store tokens, secrets or credentials in workspace files"), "DevOps AGENT should protect secrets");
  assert(devopsAgent.includes("Do not create `.vercel/`, run `vercel link` or deploy automatically"), "DevOps AGENT should block automatic Vercel actions");
  assert.equal(areaYaml.area.agent, "AGENT.md", "DevOps area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/github-management.md"), "DevOps area.yaml should list GitHub management knowledge");
  assert(areaYaml.area.source_of_truth.includes("knowledge/deployment-readiness.md"), "DevOps area.yaml should list deployment readiness knowledge");
  assert(areaYaml.area.roles.includes("release-manager"), "DevOps area.yaml should list release-manager");
  assert(areaYaml.area.skills.includes("prepare-release"), "DevOps area.yaml should list prepare-release");

  for (const content of [environments, deploymentReadiness, ciCd, observability, releaseNotes]) {
    for (const section of ["## Purpose", "## Current State", "## Decisions", "## Open Questions", "## Next Update"]) {
      assert(content.includes(section), `DevOps knowledge should include ${section}`);
    }
  }

  for (const section of ["## Purpose", "## Setup Status", "## Repository", "## GitHub Project", "## Project Fields", "## Token Source", "## Readiness Checklist", "## Dry Run", "## Decisions", "## Open Questions", "## Next Update"]) {
    assert(githubManagement.includes(section), `GitHub management knowledge should include ${section}`);
  }
  assert(githubManagement.includes("## Token Source"), "GitHub management knowledge should define token source");
  assert(githubManagement.includes("## Dry Run"), "GitHub management knowledge should define dry-run readiness");
  assert(githubManagement.includes("Never store token values in this file"), "GitHub management knowledge should protect token values");
  assert(githubManagement.includes("Owner and repository are known"), "GitHub management knowledge should include readiness checklist");
  assert(githubManagement.includes("Capability contract reviewed"), "GitHub management knowledge should track capability contract review");
  assert(environments.includes("## Preview / Staging"), "Environments knowledge should separate preview/staging");
  assert(environments.includes("## Secrets"), "Environments knowledge should include secret handling");
  assert(deploymentReadiness.includes("## Vercel Readiness"), "Deployment readiness should include Vercel readiness");
  assert(deploymentReadiness.includes("## Framework Detection"), "Deployment readiness should include framework detection");
  assert(deploymentReadiness.includes("## Rollback"), "Deployment readiness should include rollback");
  assert(ciCd.includes("## Required Checks"), "CI/CD knowledge should include required checks");
  assert(ciCd.includes("## Failure Handling"), "CI/CD knowledge should include failure handling");
  assert(observability.includes("## Logs"), "Observability knowledge should include logs");
  assert(observability.includes("## Errors"), "Observability knowledge should include errors");
  assert(observability.includes("## Metrics"), "Observability knowledge should include metrics");
  assert(observability.includes("## Post-Deploy Checks"), "Observability knowledge should include post-deploy checks");
  assert(releaseNotes.includes("## Linked Issues"), "Release notes should include linked issues");
  assert(releaseNotes.includes("## Rollback"), "Release notes should include rollback");

  assert(devopsEngineer.includes("../knowledge/environments.md"), "DevOps Engineer should load environments knowledge");
  assert(devopsEngineer.includes("../knowledge/deployment-readiness.md"), "DevOps Engineer should load deployment readiness knowledge");
  assert(githubDevops.includes("../knowledge/github-management.md"), "GitHub DevOps should load GitHub management knowledge");
  assert(githubDevops.includes("../../../.github/leanos/capability-contract.md"), "GitHub DevOps should load capability contract");
  assert(releaseManager.includes("../knowledge/release-notes.md"), "Release Manager should load release notes knowledge");

  for (const skillContent of [configureGithubProject, configureEnvironments, setupCi, planDeployment, defineObservability, prepareRelease]) {
    for (const heading of ["## Purpose", "## Use When", "## Required Context", "## Inputs", "## Process", "## Checks", "## Output"]) {
      assert(skillContent.includes(heading), `DevOps skill should include ${heading}`);
    }
  }

  assert(configureGithubProject.includes("No token stored in workspace"), "Configure GitHub Project should protect tokens");
  assert(configureGithubProject.includes("Founder never pastes token into chat"), "Configure GitHub Project should prevent token paste in chat");
  assert(configureGithubProject.includes("Dry-run readiness"), "Configure GitHub Project should output dry-run readiness");
  assert(configureEnvironments.includes("Secrets are not written into markdown"), "Configure Environments should protect secrets");
  assert(setupCi.includes("CI does not deploy automatically by default"), "Setup CI should avoid automatic deploy");
  assert(planDeployment.includes("No `.vercel/` creation"), "Plan Deployment should block Vercel metadata creation");
  assert(defineObservability.includes("Post-deploy checks"), "Define Observability should include post-deploy checks");
  assert(prepareRelease.includes("Rollback is explicit"), "Prepare Release should include rollback checks");
  assert(githubProjectPlaybook.includes("Read DevOps AGENT and choose GitHub DevOps"), "GitHub project playbook should start at DevOps AGENT");
  assert(githubProjectPlaybook.includes("../../../.github/leanos/setup-guide.md"), "GitHub project playbook should load setup guide");
  assert(githubProjectPlaybook.includes("../../../.github/leanos/capability-contract.md"), "GitHub project playbook should load capability contract");
  assert(githubProjectPlaybook.includes("where the founder can find owner/repository and Project URL/number"), "GitHub project playbook should guide founders to find GitHub details");
  assert(githubProjectPlaybook.includes("End with whether `/github-sync` is ready for dry-run"), "GitHub project playbook should bridge back to /github-sync");
  assert(githubProjectPlaybook.includes("knowledge/github-management.md"), "GitHub project playbook should update GitHub knowledge");
  assert(setupCiCdPlaybook.includes("skills/setup-ci.skill.md"), "Setup CI/CD playbook should use setup-ci skill");
  assert(planDeploymentPlaybook.includes("do not create `.vercel/`, run `vercel link` or deploy automatically"), "Plan deployment playbook should preserve Vercel safety");
  assert(releaseOperationsPlaybook.includes("skills/prepare-release.skill.md"), "Release operations should use prepare-release skill");
  assert(releaseOperationsPlaybook.includes("knowledge/release-notes.md"), "Release operations should update release notes");
}

async function assertSecurityAreaPattern(rootDir) {
  const securityReadme = await readFile(join(rootDir, "operations", "security", "README.md"), "utf8");
  const securityAgent = await readFile(join(rootDir, "operations", "security", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "operations", "security", "area.yaml"), "utf8"));
  const baseline = await readFile(join(rootDir, "operations", "security", "knowledge", "security-baseline.md"), "utf8");
  const threatModel = await readFile(join(rootDir, "operations", "security", "knowledge", "threat-model.md"), "utf8");
  const accessControl = await readFile(join(rootDir, "operations", "security", "knowledge", "access-control.md"), "utf8");
  const dataProtection = await readFile(join(rootDir, "operations", "security", "knowledge", "data-protection.md"), "utf8");
  const databaseSecurity = await readFile(join(rootDir, "operations", "security", "knowledge", "database-security.md"), "utf8");
  const secretsManagement = await readFile(join(rootDir, "operations", "security", "knowledge", "secrets-management.md"), "utf8");
  const infraHardening = await readFile(join(rootDir, "operations", "security", "knowledge", "infra-hardening.md"), "utf8");
  const secureCoding = await readFile(join(rootDir, "operations", "security", "knowledge", "secure-coding.md"), "utf8");
  const incidentResponse = await readFile(join(rootDir, "operations", "security", "knowledge", "incident-response.md"), "utf8");
  const securityAutomation = await readFile(join(rootDir, "operations", "security", "knowledge", "security-automation.md"), "utf8");
  const securityReviewer = await readFile(join(rootDir, "operations", "security", "roles", "security-reviewer.role.md"), "utf8");
  const appSecEngineer = await readFile(join(rootDir, "operations", "security", "roles", "application-security-engineer.role.md"), "utf8");
  const cloudSecurityReviewer = await readFile(join(rootDir, "operations", "security", "roles", "cloud-security-reviewer.role.md"), "utf8");
  const dataProtectionReviewer = await readFile(join(rootDir, "operations", "security", "roles", "data-protection-reviewer.role.md"), "utf8");
  const aiGeneratedCodeSecurity = await readFile(join(rootDir, "operations", "security", "skills", "ai-generated-code-security.skill.md"), "utf8");
  const securityAutomationReadiness = await readFile(join(rootDir, "operations", "security", "skills", "security-automation-readiness.skill.md"), "utf8");
  const apiSecurityReview = await readFile(join(rootDir, "operations", "security", "skills", "api-security-review.skill.md"), "utf8");
  const databaseSecurityReview = await readFile(join(rootDir, "operations", "security", "skills", "database-security-review.skill.md"), "utf8");
  const preDeployReview = await readFile(join(rootDir, "operations", "security", "playbooks", "pre-deploy-security-review.playbook.md"), "utf8");
  const aiGeneratedReview = await readFile(join(rootDir, "operations", "security", "playbooks", "ai-generated-code-security-review.playbook.md"), "utf8");
  const securityAutomationPlaybook = await readFile(join(rootDir, "operations", "security", "playbooks", "security-automation-readiness.playbook.md"), "utf8");
  const githubSecurityAutomation = await readFile(join(rootDir, ".github", "leanos", "security-automation.md"), "utf8");
  const createFeaturesCommand = await readFile(join(rootDir, ".leanos", "commands", "create-features.md"), "utf8");

  for (const oldPath of ["threat-model.md", "access-control.md", "data-protection.md"]) {
    assert.equal(await exists(join(rootDir, "operations", "security", oldPath)), false, `Security ${oldPath} should live in knowledge/`);
  }

  assert(securityReadme.includes("start with `AGENT.md`"), "Security README should route operational work through AGENT.md");
  assert(securityReadme.includes("No public production database"), "Security README should include baseline red lines");
  assert(securityReadme.includes("quality gate"), "Security README should explain quality gate role");
  assert(securityAgent.includes("You are the Security Lead"), "Security AGENT should define Security Lead");
  assert(securityAgent.includes("Application Security Engineer: `roles/application-security-engineer.role.md`"), "Security AGENT should route AppSec work");
  assert(securityAgent.includes("Cloud Security Reviewer: `roles/cloud-security-reviewer.role.md`"), "Security AGENT should route cloud security work");
  assert(securityAgent.includes("Data Protection Reviewer: `roles/data-protection-reviewer.role.md`"), "Security AGENT should route data protection work");
  assert(securityAgent.includes("No public production database"), "Security AGENT should include public database red line");
  assert(securityAgent.includes("AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review"), "Security AGENT should include AI agent red line");
  assert.equal(areaYaml.area.agent, "AGENT.md", "Security area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/security-baseline.md"), "Security area.yaml should list security baseline");
  assert(areaYaml.area.source_of_truth.includes("knowledge/security-automation.md"), "Security area.yaml should list security automation readiness");
  assert(areaYaml.area.source_of_truth.includes("knowledge/database-security.md"), "Security area.yaml should list database security");
  assert(areaYaml.area.roles.includes("application-security-engineer"), "Security area.yaml should list AppSec role");
  assert(areaYaml.area.skills.includes("ai-generated-code-security"), "Security area.yaml should list AI generated code security skill");
  assert(areaYaml.area.skills.includes("security-automation-readiness"), "Security area.yaml should list security automation readiness skill");
  assert(areaYaml.area.playbooks.includes("pre-deploy-security-review"), "Security area.yaml should list pre-deploy security review");
  assert(areaYaml.area.playbooks.includes("security-automation-readiness"), "Security area.yaml should list security automation readiness playbook");

  for (const content of [baseline, threatModel, accessControl, dataProtection, databaseSecurity, secretsManagement, infraHardening, secureCoding, incidentResponse, securityAutomation]) {
    for (const section of ["## Purpose", "## What to Document", "## Required Checks", "## Red Lines", "## Related Playbooks"]) {
      assert(content.includes(section), `Security knowledge should include ${section}`);
    }
  }

  for (const redLine of [
    "No public production database.",
    "No secrets in Git, logs, prompts, screenshots or tracked files.",
    "No private endpoint without server-side authentication and authorization.",
    "Every user-owned or tenant-owned object access must validate ownership server-side.",
    "Never trust userId, tenantId, role or isAdmin from the client.",
    "Never build SQL with string concatenation.",
    "Sensitive data must not appear in logs, analytics, errors or events.",
    "Admin access requires RBAC, MFA when available and audit trail.",
    "Production, staging and development must use separate databases, secrets and permissions.",
    "Production deploy requires backup, rollback path and security review.",
    "AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review."
  ]) {
    assert(baseline.includes(redLine), `Security baseline should include red line: ${redLine}`);
  }

  assert(baseline.includes("OWASP Top 10"), "Security baseline should reference OWASP Top 10");
  assert(baseline.includes("OWASP API Security Top 10"), "Security baseline should reference OWASP API Security Top 10");
  assert(baseline.includes("NIST SSDF"), "Security baseline should reference NIST SSDF");
  assert(databaseSecurity.includes("OWASP Database Security Cheat Sheet"), "Database security should reference OWASP Database Security Cheat Sheet");
  assert(secureCoding.includes("OWASP Secure Coding with AI"), "Secure coding should reference OWASP Secure Coding with AI");
  assert(securityAutomation.includes("Secret scanning"), "Security automation knowledge should mention secret scanning");
  assert(securityAutomation.toLowerCase().includes("dependency audit"), "Security automation knowledge should mention dependency audit");
  assert(securityAutomation.includes("SAST/code scanning"), "Security automation knowledge should mention SAST/code scanning");
  assert(securityAutomation.includes("IaC/config scanning"), "Security automation knowledge should mention IaC/config scanning");
  assert(securityAutomation.includes("Do not create scanner workflows until stack, package manager and stable commands are known"), "Security automation knowledge should avoid fragile early workflows");

  for (const roleContent of [securityReviewer, appSecEngineer, cloudSecurityReviewer, dataProtectionReviewer]) {
    for (const section of ["## Purpose", "## When to Use", "## Source of Truth", "## Required Skills", "## Relevant Playbooks", "## Output", "## Red Lines"]) {
      assert(roleContent.includes(section), `Security role should include ${section}`);
    }
  }

  for (const skillContent of [aiGeneratedCodeSecurity, apiSecurityReview, databaseSecurityReview, securityAutomationReadiness]) {
    for (const section of ["## Purpose", "## Use When", "## Required Context", "## Process", "## Checks", "## Output", "## Files to Update", "## Red Lines"]) {
      assert(skillContent.includes(section), `Security skill should include ${section}`);
    }
  }

  for (const aiRisk of [
    "hallucinated dependencies",
    "outdated dependencies with CVEs",
    "prompt injection via issues, PRs, docs or logs",
    "unsafe shell commands",
    "out-of-scope file edits",
    "test deletion or fabricated tests",
    "secrets/context leakage",
    "auth, secrets, CI/CD, infra or dependencies without human review",
    "broad MCP/tool permissions"
  ]) {
    assert(aiGeneratedCodeSecurity.includes(aiRisk), `AI generated code security skill should cover ${aiRisk}`);
  }

  for (const section of ["## Purpose", "## When to Use", "## Before Acting", "## Steps", "## Security Gate", "## Output", "## Files to Update", "## Stop Conditions"]) {
    assert(preDeployReview.includes(section), `Pre-deploy security review should include ${section}`);
    assert(aiGeneratedReview.includes(section), `AI generated code review playbook should include ${section}`);
    assert(securityAutomationPlaybook.includes(section), `Security automation readiness playbook should include ${section}`);
  }

  for (const blocker of [
    "public database",
    "missing authorization",
    "secrets in code",
    "client-side token exposure",
    "unsafe query",
    "open CORS without justification",
    "no rate limit on login or sensitive APIs",
    "sensitive data in logs",
    "no backup or rollback path",
    "critical vulnerable dependency",
    "over-permissive service account",
    "missing tenant isolation"
  ]) {
    assert(preDeployReview.includes(blocker), `Pre-deploy security review should block ${blocker}`);
  }

  assert(createFeaturesCommand.includes("../../operations/security/AGENT.md"), "Create features command should route Security through AGENT.md");
  assert.equal(createFeaturesCommand.includes("../../operations/security/README.md` only when"), false, "Create features command should not route Security directly to README");
  assert(securityAutomationReadiness.includes("Secret scanning status is explicit"), "Security automation skill should check secret scanning status");
  assert(securityAutomationReadiness.includes("Dependency audit status is explicit"), "Security automation skill should check dependency audit status");
  assert(securityAutomationReadiness.includes("No scanner workflow is created without stable commands"), "Security automation skill should avoid fragile scanner workflows");
  assert(securityAutomationPlaybook.includes("Production deploy requires explicit security automation status"), "Security automation playbook should gate production readiness");
  assert(securityAutomationPlaybook.includes("Block creating scanner workflows when stack, package manager or commands are unknown"), "Security automation playbook should block premature scanner workflows");
  assert(preDeployReview.includes("security automation readiness status"), "Pre-deploy review should include security automation readiness");
  assert(githubSecurityAutomation.includes("This file is guidance-only in the initial scaffold"), "GitHub security automation doc should be guidance-only");
  assert(githubSecurityAutomation.includes("Secret scanning"), "GitHub security automation doc should mention secret scanning");
  assert(githubSecurityAutomation.includes("Dependency audit"), "GitHub security automation doc should mention dependency audit");
  assert(githubSecurityAutomation.includes("Do not create blocking CI workflows before the project has reliable build/test commands"), "GitHub security automation doc should avoid fragile blocking workflows");
}

async function assertGrowthAreaPattern(rootDir) {
  const cxReadme = await readFile(join(rootDir, "growth", "customer-experience", "README.md"), "utf8");
  const cxAgent = await readFile(join(rootDir, "growth", "customer-experience", "AGENT.md"), "utf8");
  const cxYaml = parse(await readFile(join(rootDir, "growth", "customer-experience", "area.yaml"), "utf8"));
  const customerFeedback = await readFile(join(rootDir, "growth", "customer-experience", "knowledge", "customer-feedback.md"), "utf8");
  const supportNotes = await readFile(join(rootDir, "growth", "customer-experience", "knowledge", "support-notes.md"), "utf8");
  const cxRole = await readFile(join(rootDir, "growth", "customer-experience", "roles", "cx-lead.role.md"), "utf8");
  const customerLearningLoop = await readFile(join(rootDir, "growth", "customer-experience", "playbooks", "customer-learning-loop.playbook.md"), "utf8");

  const marketingReadme = await readFile(join(rootDir, "growth", "marketing", "README.md"), "utf8");
  const marketingAgent = await readFile(join(rootDir, "growth", "marketing", "AGENT.md"), "utf8");
  const marketingYaml = parse(await readFile(join(rootDir, "growth", "marketing", "area.yaml"), "utf8"));
  const landingPage = await readFile(join(rootDir, "growth", "marketing", "knowledge", "landing-page.md"), "utf8");
  const growthLead = await readFile(join(rootDir, "growth", "marketing", "roles", "growth-lead.role.md"), "utf8");
  const mvpLaunch = await readFile(join(rootDir, "growth", "marketing", "playbooks", "mvp-launch.playbook.md"), "utf8");

  const financeReadme = await readFile(join(rootDir, "growth", "finance", "README.md"), "utf8");
  const financeAgent = await readFile(join(rootDir, "growth", "finance", "AGENT.md"), "utf8");
  const financeYaml = parse(await readFile(join(rootDir, "growth", "finance", "area.yaml"), "utf8"));
  const pricing = await readFile(join(rootDir, "growth", "finance", "knowledge", "pricing.md"), "utf8");
  const financeOperator = await readFile(join(rootDir, "growth", "finance", "roles", "finance-operator.role.md"), "utf8");
  const financeReview = await readFile(join(rootDir, "growth", "finance", "playbooks", "finance-review.playbook.md"), "utf8");
  const growthWorkflow = await readFile(join(rootDir, "growth", "workflows", "launch-learning-loop.workflow.md"), "utf8");

  for (const oldPath of [
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
    "growth/finance/finance-risks.md"
  ]) {
    assert.equal(await exists(join(rootDir, oldPath)), false, `Growth loose path should move into knowledge/: ${oldPath}`);
  }

  for (const [readme, agent, yaml, expectedAgentTitle] of [
    [cxReadme, cxAgent, cxYaml, "Customer Experience Lead"],
    [marketingReadme, marketingAgent, marketingYaml, "Marketing Lead"],
    [financeReadme, financeAgent, financeYaml, "Finance Lead"]
  ]) {
    assert(readme.includes("start with `AGENT.md`"), "Growth area README should route operational work through AGENT.md");
    assert(agent.includes(`You are the ${expectedAgentTitle}`), `Growth area AGENT should define ${expectedAgentTitle}`);
    assert.equal(yaml.area.agent, "AGENT.md", "Growth area.yaml should declare AGENT.md");
  }

  for (const content of [customerFeedback, supportNotes, landingPage, pricing]) {
    for (const section of ["## Purpose", "## Current State", "## Decisions", "## Risks", "## Open Questions", "## Next Update"]) {
      assert(content.includes(section), `Growth knowledge should include ${section}`);
    }
  }

  assert(cxYaml.area.source_of_truth.includes("knowledge/customer-feedback.md"), "CX area.yaml should list customer feedback knowledge");
  assert(marketingYaml.area.source_of_truth.includes("knowledge/landing-page.md"), "Marketing area.yaml should list landing page knowledge");
  assert(financeYaml.area.source_of_truth.includes("knowledge/pricing.md"), "Finance area.yaml should list pricing knowledge");
  assert(cxRole.includes("## Red Lines"), "CX role should include red lines");
  assert(growthLead.includes("## Red Lines"), "Growth Lead should include red lines");
  assert(financeOperator.includes("## Red Lines"), "Finance Operator should include red lines");
  assert(customerLearningLoop.includes("skills/map-customer-feedback.skill.md"), "Customer learning loop should use feedback mapping skill");
  assert(customerLearningLoop.includes("Strategy/Product or Product Ops"), "Customer learning loop should route product changes back to product owners");
  assert(mvpLaunch.includes("Route visual design to Operations Design"), "MVP launch should route design work to Operations Design");
  assert(mvpLaunch.includes("Route budget/pricing implications to Growth Finance"), "MVP launch should route finance work to Finance");
  assert(financeReadme.includes("Do not make accounting, tax, legal or investment advice claims"), "Finance should avoid professional advice claims");
  assert(growthWorkflow.includes("Read Marketing AGENT"), "Growth workflow should route through Marketing AGENT");
  assert(growthWorkflow.includes("Read Customer Experience AGENT"), "Growth workflow should route through Customer Experience AGENT");
  assert(growthWorkflow.includes("growth/finance/AGENT.md when pricing, budget or unit economics are involved"), "Growth workflow should make Finance conditional");
}

async function assertInitCommandRules(rootDir) {
  const startCommand = await readFile(join(rootDir, ".leanos", "commands", "start-leanos.md"), "utf8");
  const requiredSections = [
    "## Purpose",
    "## Load First",
    "## Internal Reading Rules",
    "## Guided Question Delivery",
    "## What To Do",
    "## First Response Shape",
    "## Guided Founder Interview",
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
    "../../strategy/business/knowledge/profile.md",
    "../../strategy/product/knowledge/brief.md",
    "../../strategy/validation/assumptions.md",
    "../../strategy/roadmap/knowledge/roadmap.md"
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
  assert(startCommand.includes("This is the beginning of the operating session, not a technical audit report"), "start-leanos.md should avoid technical audit behavior");
  assert(startCommand.includes("Do not print the full loaded context unless the founder asks for diagnostics"), "start-leanos.md should keep internal context silent by default");
  assert(startCommand.includes("Do not print all active departments, active areas or compatible workflows during the first response"), "start-leanos.md should avoid first-response dumps");
  assert(startCommand.includes("Use `leanos.yaml` as the primary seed"), "start-leanos.md should start from leanos.yaml");
  assert(startCommand.includes("If `leanos.yaml` is mostly empty or generic, ask one short open question first"), "start-leanos.md should handle empty yaml before guided questions");
  assert(startCommand.includes("Prefer the host application's native selection UI when available"), "start-leanos.md should prefer native selection UI when available");
  assert(startCommand.includes("If no native selection UI is available, use numbered options in the chat"), "start-leanos.md should fall back to numbered options");
  assert(startCommand.includes("Do not ask broad open-ended questions when the current context supports useful guided options"), "start-leanos.md should avoid broad open questions when guided options fit");
  assert(startCommand.includes("Ask one guided question at a time using native selection UI when available, otherwise numbered options"), "start-leanos.md should use guided questions");
  assert(startCommand.includes("Active Role: not applicable"), "start-leanos.md should avoid fake role activation on first response");
  assert(startCommand.includes("Para quem esse produto precisa gerar valor primeiro?"), "start-leanos.md should include a founder-friendly first guided question");
  assert(startCommand.includes("Voce pode responder so com o numero ou do seu jeito"), "start-leanos.md should allow numeric or free-form answers");
  assert(startCommand.includes("Ask only what is missing"), "start-leanos.md should avoid asking already-known founder questions");
  assert(startCommand.includes("Riskiest assumption"), "start-leanos.md should include validation-oriented founder interview topics");
  assert(startCommand.includes("Map founder responses to source-of-truth files only when the matching area is active"), "start-leanos.md should map answers only to active areas");
  assert(startCommand.includes("Do not turn assumptions into source-of-truth facts"), "start-leanos.md should protect facts from assumptions");
  assert(startCommand.includes("Put unknowns into `## Open Questions`"), "start-leanos.md should preserve unknowns as open questions");
  assert(startCommand.includes("Do not write during the first response"), "start-leanos.md should avoid writing in the first response");
  assert(startCommand.includes("After the guided conversation captures enough context, show a short proposed change plan"), "start-leanos.md should require a pre-write change plan after guided context");
  assert(startCommand.includes("Never write files during init until the user explicitly confirms"), "start-leanos.md should require explicit confirmation before writes");
  assert(startCommand.includes("Operations or Growth area files unless the user explicitly asks after init"), "start-leanos.md should keep Operations/Growth out of init scope");
  assert.equal(startCommand.includes("- Workspace summary\n- Active departments and areas\n- Compatible workflows"), false, "start-leanos.md should not require a technical dump by default");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "init-leanos.md")), false, "init-leanos.md should not be generated as an internal command");
}

async function assertRootAgentMutationRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "agent", "operating-rules.md"), "utf8");

  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "AGENT.md should not include the old Workspace Mutation Rules section");
  assert(rootAgent.includes("## Command Handling"), "AGENT.md should include portable command handling");
  assert(rootAgent.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "AGENT.md should make commands model-agnostic");
  assert(rootAgent.includes("`.leanos/commands/start-leanos.md`"), "AGENT.md should map /start-leanos to its command file");
  assert(rootAgent.includes("When the user invokes legacy `/leanos-init` or inverted `/leanos-start`, treat it as `/start-leanos`"), "AGENT.md should document the legacy and inverted init aliases");
  assert(rootAgent.includes("Do not create or modify LeanOS framework assets from memory. Route through `ai-standard/README.md`"), "AGENT.md should route framework asset changes through AI Standard README");
  assert(rootAgent.includes("## Framework Standards Routing"), "AGENT.md should include Framework Standards Routing");
  assert(rootAgent.includes("During `/start-leanos`, do not enrich roles, skills, playbooks, workflows, commands or `ai-standard/`"), "AGENT.md should protect framework assets during init from Red Lines");
  assert(rootAgent.includes("Ask before modifying knowledge, decision or framework files"), "AGENT.md should require confirmation before file mutation");
  assert(rootAgent.includes("## Trace And Diagnostics"), "AGENT.md should include Trace And Diagnostics");
  assert(rootAgent.includes("`.leanos/agent/protocols/chief-trace.md`"), "AGENT.md should route trace diagnostics to chief-trace protocol");
  assert(rootAgent.includes("GitHub setup, GitHub Projects configuration or GitHub sync"), "AGENT.md should route natural GitHub setup requests to github-sync");
  assert.equal(rootAgent.includes("Source-of-truth files describe what the company knows"), false, "AGENT.md should avoid old source-of-truth taxonomy");
  assert.equal(rootAgent.includes("Operating assets describe how LeanOS works"), false, "AGENT.md should avoid old operating-assets taxonomy");
  assert(operatingRules.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "operating rules should make commands model-agnostic");
  assert(operatingRules.includes("For `/start-leanos`, load `../commands/start-leanos.md` before acting"), "operating rules should map /start-leanos to its command file");
  assert(operatingRules.includes("For trace, debug or diagnostic requests, load `protocols/chief-trace.md`"), "operating rules should route trace diagnostics");
  assert(operatingRules.includes("During `/start-leanos`, propose updates first"), "operating rules should require propose-first start");
  assert(operatingRules.includes("Treat `/leanos-init` and `/leanos-start` as aliases for `/start-leanos`"), "operating rules should document start command aliases");
  assert(operatingRules.includes("Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init"), "operating rules should protect operating assets during init");
}

async function assertTraceDiagnostics(rootDir) {
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const protocolReadme = await readFile(join(rootDir, ".leanos", "agent", "protocols", "README.md"), "utf8");
  const traceReadme = await readFile(join(rootDir, ".leanos", "traces", "README.md"), "utf8");
  const traceTemplate = await readFile(join(rootDir, ".leanos", "traces", "trace-template.md"), "utf8");
  const chiefTrace = await readFile(join(rootDir, ".leanos", "agent", "protocols", "chief-trace.md"), "utf8");
  const traceIndex = parse(await readFile(join(rootDir, ".leanos", "traces", "trace-index.yaml"), "utf8"));

  assert(runtimeReadme.includes("traces/"), "LeanOS runtime README should list traces folder");
  assert(runtimeReadme.includes("Traces are local diagnostics, not telemetry"), "LeanOS runtime README should explain trace scope");
  assert(protocolReadme.includes("chief-trace.md"), "Agent protocols README should list chief-trace protocol");
  assert(traceReadme.includes("Traces are local, opt-in and safe-by-default"), "Trace README should explain local opt-in diagnostics");
  assert(traceReadme.includes("Do not store full transcripts, secrets, tokens"), "Trace README should forbid sensitive trace content");
  assert(Array.isArray(traceIndex.traces), "trace-index.yaml should expose a traces array");
  assert(traceTemplate.includes("## Detected Route"), "Trace template should capture detected route");
  assert(traceTemplate.includes("## Navigation Chain Check"), "Trace template should capture Navigation Chain check");
  assert(traceTemplate.includes("## Sensitive Data Review"), "Trace template should capture sensitive data review");
  assert(chiefTrace.includes("Ask before writing a trace file"), "Chief trace protocol should require confirmation before writing");
  assert(chiefTrace.includes("Do not store full chat transcripts"), "Chief trace protocol should forbid full transcript storage");
  assert(chiefTrace.includes(".leanos/traces/YYYY-MM-DD-<short-kebab-intent>.trace.md"), "Chief trace protocol should define trace naming");
  assert(chiefTrace.includes("Do not update:"), "Chief trace protocol should forbid product/runtime mutations outside traces");
}

async function assertOperationalPlaybookSections(rootDir) {
  const playbooks = [
    "strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/product-ops/playbooks/mvp-delivery.playbook.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/playbooks/security-foundation.playbook.md",
    "operations/security/playbooks/pre-mvp-security-checklist.playbook.md",
    "operations/security/playbooks/pre-deploy-security-review.playbook.md",
    "operations/security/playbooks/api-security-review.playbook.md",
    "operations/security/playbooks/database-security-review.playbook.md",
    "operations/security/playbooks/secrets-rotation.playbook.md",
    "operations/security/playbooks/vulnerability-response.playbook.md",
    "operations/security/playbooks/incident-response.playbook.md",
    "operations/security/playbooks/ai-generated-code-security-review.playbook.md",
    "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    "growth/finance/playbooks/finance-review.playbook.md"
  ];
  const requiredSections = ["## Purpose", "## Inputs", "## Output", "## Files to Update", "## Navigation"];

  for (const playbook of playbooks) {
    const content = await readFile(join(rootDir, playbook), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${playbook} should include ${section}`);
    }

    assert(content.includes("## Process") || content.includes("## Steps"), `${playbook} should include ## Process or ## Steps`);
  }
}

async function assertSourceScaffoldSections(rootDir) {
  const scaffoldFiles = [
    "strategy/business/knowledge/profile.md",
    "strategy/business/knowledge/decision-log.md",
    "strategy/product/knowledge/brief.md",
    "strategy/business/knowledge/mission.md",
    "strategy/product/knowledge/icp.md",
    "strategy/product/knowledge/validation-notes.md",
    "strategy/roadmap/knowledge/roadmap.md",
    "strategy/validation/assumptions.md",
    "strategy/validation/learning-log.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/knowledge/technical-decisions.md",
    "operations/product-ops/mvp/scope.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/mvp/release-checklist.md",
    "operations/engineering/knowledge/code-standards.md",
    "operations/engineering/knowledge/implementation-rules.md",
    "operations/engineering/knowledge/component-guidelines.md",
    "operations/engineering/knowledge/data-guidelines.md",
    "operations/engineering/knowledge/testing-strategy.md",
    "operations/engineering/knowledge/review-criteria.md",
    "operations/devops/knowledge/github-management.md",
    "operations/devops/knowledge/environments.md",
    "operations/devops/knowledge/deployment-readiness.md",
    "operations/devops/knowledge/ci-cd.md",
    "operations/devops/knowledge/observability.md",
    "operations/devops/knowledge/release-notes.md",
    "growth/customer-experience/knowledge/customer-feedback.md",
    "growth/customer-experience/knowledge/support-notes.md",
    "growth/customer-experience/knowledge/success-moments.md",
    "growth/customer-experience/knowledge/churn-reasons.md",
    "growth/marketing/knowledge/positioning.md",
    "growth/marketing/knowledge/landing-page.md",
    "growth/marketing/knowledge/acquisition-channels.md",
    "growth/marketing/knowledge/launch-plan.md",
    "growth/finance/knowledge/pricing.md",
    "growth/finance/knowledge/revenue-model.md",
    "growth/finance/knowledge/unit-economics.md",
    "growth/finance/knowledge/budget.md",
    "growth/finance/knowledge/finance-risks.md"
  ];
  const requiredSections = ["## Purpose", "## Current State", "## Decisions", "## Open Questions", "## Next Update"];

  for (const scaffoldFile of scaffoldFiles) {
    const content = await readFile(join(rootDir, scaffoldFile), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${scaffoldFile} should include ${section}`);
    }
  }
}

async function assertProductOpsPrdSections(rootDir) {
  const prd = await readFile(join(rootDir, "operations", "product-ops", "mvp", "prd.md"), "utf8");
  const requiredSections = [
    "## Product Outcome",
    "## Problem",
    "## Target User",
    "## Requirements",
    "## User Stories",
    "## Acceptance Criteria",
    "## Design Considerations",
    "## Security and Privacy Considerations",
    "## Non-Goals"
  ];

  for (const section of requiredSections) {
    assert(prd.includes(section), `Product Ops PRD should include ${section}`);
  }
}

async function assertValidationLoopSections(rootDir) {
  const assumptions = await readFile(join(rootDir, "strategy", "validation", "assumptions.md"), "utf8");
  const riskiestAssumptions = await readFile(join(rootDir, "strategy", "validation", "riskiest-assumptions.md"), "utf8");
  const experiments = await readFile(join(rootDir, "strategy", "validation", "experiments.md"), "utf8");
  const successMetrics = await readFile(join(rootDir, "strategy", "validation", "success-metrics.md"), "utf8");
  const learningLog = await readFile(join(rootDir, "strategy", "validation", "learning-log.md"), "utf8");
  const validationPlaybook = await readFile(join(rootDir, "strategy", "validation", "playbooks", "mvp-validation.playbook.md"), "utf8");
  const startCommand = await readFile(join(rootDir, ".leanos", "commands", "start-leanos.md"), "utf8");
  const createRoadmapCommand = await readFile(join(rootDir, ".leanos", "commands", "create-roadmap.md"), "utf8");

  assert(assumptions.includes("assumption -> experiment -> evidence -> decision -> roadmap impact"), "assumptions.md should state the validation loop");
  assert(assumptions.includes("## Assumption Types"), "assumptions.md should explain assumption types");
  assert(assumptions.includes("Evidence Status"), "assumptions.md should track evidence status");
  assert(assumptions.includes("## Entry Template"), "assumptions.md should provide an entry template");
  assert(assumptions.includes("## Promotion Checklist"), "assumptions.md should include a promotion checklist");
  assert(riskiestAssumptions.includes("Importance"), "riskiest-assumptions.md should define prioritization criteria");
  assert(experiments.includes("Every experiment must link to an assumption"), "experiments.md should link experiments to assumptions");
  assert(successMetrics.includes("A signal is not a decision"), "success-metrics.md should separate signals from decisions");
  assert(learningLog.includes("Assumption | Experiment | Evidence | Insight | Decision | Roadmap Impact"), "learning-log.md should capture the full validation chain");
  assert(learningLog.includes("Do not record an assumption as validated learning without evidence"), "learning-log.md should prevent assumptions becoming learning");
  assert(validationPlaybook.includes("Run the validation loop from assumption to roadmap impact"), "mvp-validation playbook should state the validation loop purpose");
  assert(validationPlaybook.includes("Separate evidence from insight"), "mvp-validation playbook should separate evidence from insight");
  assert(validationPlaybook.includes("Update `../learning-log.md` only when evidence supports learning"), "mvp-validation playbook should protect learning-log quality");
  assert(startCommand.includes("## Validation Evidence Rules"), "start-leanos should include validation evidence rules");
  assert(createRoadmapCommand.includes("Do not treat assumptions as validated learning"), "roadmap command should not treat assumptions as validated learning");
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

async function assertInitialContextCoherence(rootDir) {
  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeSubareas = new Set(yaml.activation?.active_areas ?? yaml.subareas.active.map((subarea) => subarea.key));
  const initialFiles = [
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
    { command: "/define-mvp", area: "operations.product-ops" },
    { command: "/check coherence", area: "strategy.product" },
    { command: "/create roadmap", area: "strategy.roadmap" },
    { command: "/create features", area: "operations.product-ops" },
    { command: "/workon feature", area: "operations.engineering" },
    { command: "/create branch", area: "operations.engineering" },
    { command: "/create pr", area: "operations.engineering" },
    { command: "/review pr", area: "operations.engineering" }
  ];

  const workflowRequirements = [
    { workflow: "new-idea-intake", subareas: ["strategy.product", "strategy.roadmap"] },
    { workflow: "idea-to-roadmap", subareas: ["strategy.product", "strategy.roadmap"] },
    { workflow: "roadmap-to-github-project", subareas: ["strategy.product", "strategy.roadmap"] },
    { workflow: "define-mvp", subareas: ["operations.product-ops"] },
    { workflow: "roadmap-item-to-epic", subareas: ["operations.product-ops"] },
    { workflow: "epic-to-features", subareas: ["operations.product-ops", "operations.engineering"] },
    { workflow: "feature-to-delivery-cycle", subareas: ["operations.product-ops", "operations.engineering"] },
    { workflow: "post-merge-continuation", subareas: ["operations.product-ops", "operations.engineering"] },
    { workflow: "launch-learning-loop", subareas: ["growth.marketing", "growth.customer-experience"] }
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

function isInitialStrategyWorkspacePath(path) {
  const inactiveCommandPaths = new Set([
    ".leanos/commands/define-mvp.md",
    ".leanos/commands/define-design.md",
    ".leanos/commands/create-features.md",
    ".leanos/commands/github-sync.md",
    ".leanos/commands/workon-feature.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md"
  ]);

  if (inactiveCommandPaths.has(path)) {
    return false;
  }

  return !path.startsWith("operations/") && !path.startsWith("growth/");
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
