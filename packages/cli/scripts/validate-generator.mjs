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

  for (const expectedPath of [
    "AGENT.md",
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "ai-standard/foundation/README.md",
    "ai-standard/foundation/navigation-chain.md",
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
    "ai-standard/examples/execution/example-playbook-issue-to-pr.md",
    "ai-standard/examples/execution/example-workflow-issue-delivery-cycle.md",
    "ai-standard/examples/commands/README.md",
    "ai-standard/examples/commands/example-command-define-design.md",
    "ai-standard/examples/github/README.md",
    "ai-standard/examples/github/example-github-epic.md",
    "ai-standard/examples/github/example-github-subissue.md",
    "ai-standard/examples/github/example-pull-request.md",
    "ai-standard/examples/review/README.md",
    "ai-standard/examples/review/example-code-review.md",
    ".leanos/index/areas.yaml",
    ".leanos/index/routing-map.yaml",
    "strategy/AGENT.md",
    "operations/AGENT.md",
    "growth/AGENT.md",
    "strategy/product/README.md",
    "strategy/product/skills/evaluate-idea.skill.md",
    "strategy/workflows/idea-to-roadmap.workflow.md",
    "strategy/workflows/roadmap-to-github-project.workflow.md",
    "strategy/roadmap/skills/prepare-roadmap-sync.skill.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/core/mvp/README.md",
    "operations/core/skills/shape-epic.skill.md",
    "operations/core/skills/write-subissue-criteria.skill.md",
    "operations/core/playbooks/epic-to-subissues.playbook.md",
    "operations/workflows/issue-delivery-cycle.workflow.md",
    "operations/workflows/post-merge-continuation.workflow.md",
    ".leanos/commands/define-design.md",
    "operations/design/knowledge/README.md",
    "operations/design/knowledge/design-system.md",
    "operations/design/knowledge/accessibility.md",
    "operations/design/knowledge/user-flows.md",
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
    "operations/engineering/playbooks/issue-to-pr.playbook.md",
    "operations/engineering/playbooks/branch-from-issue.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/engineering/skills/create-branch.skill.md",
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
    ".github/ISSUE_TEMPLATE/epic.yml",
    ".github/ISSUE_TEMPLATE/sub-issue.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/leanos/branch-rules.md",
    ".github/leanos/pr-validation-rules.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/commands/create-issues.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md",
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
    ".leanos/workflows/issue-delivery-cycle.workflow.md",
    ".leanos/workflows/new-product-mvp-validation.workflow.md",
    ".leanos/workflows/issue-to-pr.workflow.md",
    ".leanos/workflows/launch-and-learn.workflow.md",
    ".leanos/commands/evaluate-idea.md",
    ".leanos/commands/sync-roadmap.md",
    ".leanos/commands/create-subissues.md",
    ".leanos/commands/implement-issue.md",
    ".leanos/commands/post-merge.md",
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
    "ai-standard/templates/github-subissue-template.md",
    "ai-standard/templates/issue-readiness-matrix-template.md",
    "ai-standard/templates/branch-name-template.md",
    "ai-standard/templates/pull-request-template.md",
    "ai-standard/templates/code-review-template.md",
    "ai-standard/examples/example-agent.md",
    "ai-standard/examples/example-folder-readme.md",
    "ai-standard/examples/example-role-senior-developer.md",
    "ai-standard/examples/example-skill-check-coherence.md",
    "ai-standard/examples/example-playbook-issue-to-pr.md"
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
  await assertExists(join(rootDir, "operations", "AGENT.md"));
  await assertExists(join(rootDir, "growth", "AGENT.md"));
  await assertExists(join(rootDir, "strategy", "workflows", "idea-to-roadmap.workflow.md"));
  await assertExists(join(rootDir, "strategy", "workflows", "roadmap-to-github-project.workflow.md"));
  await assertExists(join(rootDir, "strategy", "product", "roles", "product-strategist.role.md"));
  await assertExists(join(rootDir, "strategy", "product", "skills", "evaluate-idea.skill.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "skills", "prepare-roadmap-sync.skill.md"));
  await assertExists(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-sync-prep.playbook.md"));
  await assertExists(join(rootDir, "operations", "core", "mvp", "README.md"));
  await assertExists(join(rootDir, "operations", "core", "skills", "shape-epic.skill.md"));
  await assertExists(join(rootDir, "operations", "core", "skills", "write-subissue-criteria.skill.md"));
  await assertExists(join(rootDir, "operations", "core", "playbooks", "epic-to-subissues.playbook.md"));
  await assertExists(join(rootDir, "operations", "workflows", "issue-delivery-cycle.workflow.md"));
  await assertExists(join(rootDir, "operations", "workflows", "post-merge-continuation.workflow.md"));
  await assertExists(join(rootDir, ".leanos", "commands", "define-design.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "README.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "design-system.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "accessibility.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "user-flows.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "design-system.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "accessibility.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "design-foundation.playbook.md"));
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
  assert.equal(await exists(join(rootDir, ".leanos", "workflows")), false, "Business workflows should not be generated under .leanos/workflows");

  assert(result.createdGroups.includes("ai-standard/"), "Expected created groups to mention root AI Standard");
  assert(result.createdGroups.includes("strategy/"), "Expected created groups to mention Strategy");
  assert(result.createdGroups.includes("operations/"), "Expected created groups to mention Operations");
  assert(result.createdGroups.includes("growth/"), "Expected created groups to mention Growth");
  assert(result.createdGroups.includes(".github/leanos"), "Expected created groups to mention GitHub LeanOS support files");

  await assertVsCodeIntegration(rootDir);
  await assertGitHubReadiness(rootDir);
  await assertGitHubIssuePrWorkflow(rootDir);
  await assertFounderIntentRouting(rootDir);
  await assertDesignFoundation(rootDir);
  await assertAiStandardAssetTaxonomy(rootDir);
  await assertAiStandardTemplates(rootDir);
  await assertAiStandardChecklists(rootDir);
  await assertAiStandardInstructions(rootDir);
  await assertAiStandardExamples(rootDir);
  await assertInitCommandRules(rootDir);
  await assertRootAgentMutationRules(rootDir);
  await assertOperationalPlaybookSections(rootDir);
  await assertSourceScaffoldSections(rootDir);
  await assertValidationLoopSections(rootDir);

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
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
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
    "ai-standard/templates/github-subissue-template.md",
    "ai-standard/templates/issue-readiness-matrix-template.md",
    "ai-standard/templates/branch-name-template.md",
    "ai-standard/templates/pull-request-template.md",
    "ai-standard/templates/code-review-template.md",
    "ai-standard/examples/example-agent.md",
    "ai-standard/examples/example-folder-readme.md",
    "ai-standard/examples/example-role-senior-developer.md",
    "ai-standard/examples/example-skill-check-coherence.md",
    "ai-standard/examples/example-playbook-issue-to-pr.md"
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
  assert.equal(yaml.departments.routes.operations.agent, "operations/AGENT.md");
  assert.equal(yaml.departments.routes.growth.readme, "growth/README.md");
  assert(yaml.workflows.active.includes("idea-to-roadmap"), "Expected active local Strategy idea-to-roadmap workflow");
  assert(yaml.workflows.active.includes("roadmap-to-github-project"), "Expected active local Strategy GitHub roadmap workflow");
  assert(yaml.workflows.active.includes("issue-delivery-cycle"), "Expected active local Operations issue delivery workflow");
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
    ".env.local",
    ".gitignore",
    "leanos.yaml",
    "ai-standard/README.md",
    "strategy/product/README.md",
    "strategy/product/skills/evaluate-idea.skill.md",
    "strategy/workflows/idea-to-roadmap.workflow.md",
    "strategy/workflows/roadmap-to-github-project.workflow.md",
    "strategy/roadmap/skills/prepare-roadmap-sync.skill.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/core/mvp/README.md",
    "operations/core/skills/shape-epic.skill.md",
    "operations/core/skills/write-subissue-criteria.skill.md",
    "operations/core/playbooks/epic-to-subissues.playbook.md",
    "operations/design/knowledge/README.md",
    "operations/design/knowledge/design-system.md",
    "operations/design/knowledge/accessibility.md",
    "operations/design/knowledge/user-flows.md",
    "operations/design/roles/README.md",
    "operations/design/skills/design-system.skill.md",
    "operations/design/skills/accessibility.skill.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/workflows/issue-delivery-cycle.workflow.md",
    "operations/workflows/post-merge-continuation.workflow.md",
    "operations/engineering/skills/create-branch.skill.md",
    "operations/engineering/playbooks/branch-from-issue.playbook.md",
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
    ".github/ISSUE_TEMPLATE/epic.yml",
    ".github/ISSUE_TEMPLATE/sub-issue.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/leanos/branch-rules.md",
    ".github/leanos/pr-validation-rules.md",
    ".github/agents/leanos-chief.agent.md",
    ".github/prompts/start-leanos.prompt.md",
    ".github/prompts/leanos-init.prompt.md",
    ".leanos/commands/start-leanos.md",
    ".leanos/commands/define-design.md",
    ".leanos/commands/create-issues.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md",
    ".leanos/vscode/README.md"
  ];

  for (const requiredPath of requiredPaths) {
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
    "operations/devops/environments.md",
    "operations/devops/deployment.md",
    "operations/devops/ci-cd.md",
    "operations/devops/observability.md",
    "operations/devops/runbooks.md",
    "operations/security/security-checklist.md",
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
  assert.equal(rolesIndex.roles.some((role) => role.key === "product-designer"), false, "Inactive design specialist role should not be indexed");

  assert.equal(skillsIndex.skills.some((skill) => skill.key === "create-launch-plan"), false, "Inactive marketing skill should not be indexed");
  assert.equal(playbooksIndex.playbooks.some((playbook) => playbook.key === "mvp-validation"), false, "Inactive validation playbook should not be indexed");

  assert.equal(routingMap.routing.areas.product, "../../strategy/product/README.md");
  assert.equal(routingMap.routing.areas.engineering, "../../operations/engineering/README.md");
  assert.equal(routingMap.routing.departments.strategy.agent, "../../strategy/AGENT.md");
  assert.equal(routingMap.routing.departments.strategy.readme, "../../strategy/README.md");
  assert.equal(routingMap.routing.departments.operations.agent, "../../operations/AGENT.md");
  assert.equal(routingMap.routing.departments.operations.readme, "../../operations/README.md");
  assert.equal(routingMap.routing.departments.growth, undefined);
  assert.equal(routingMap.routing.asset_creation, "../../ai-standard/README.md");
  assert.equal(routingMap.routing.areas.marketing, undefined);
  assert.equal(routingMap.routing.areas.validation, undefined);
  assert.equal(routingMap.routing.areas.design, undefined);
  assert.equal(activeWorkflow.includes("- idea-to-roadmap"), false, "Product + Engineering alone should not activate Strategy idea workflow without Roadmap and Validation");
  assert(nextActions.includes("/define icp"), "Product-compatible next action should remain when Product is active");
  assert.equal(nextActions.includes("/define mvp"), false, "Core command should not appear when Core is inactive");

  const defineDesignCommand = await readFile(join(rootDir, ".leanos", "commands", "define-design.md"), "utf8");
  assert(defineDesignCommand.includes("`operations.design` is not active"), "Define design command should warn when Design is inactive");
  assert.equal(defineDesignCommand.includes("../../operations/design/AGENT.md"), false, "Inactive Design command should not point to missing Design AGENT");
  assert.equal(defineDesignCommand.includes("../../operations/design/README.md"), false, "Inactive Design command should not point to missing Design README");
  assert.equal(defineDesignCommand.includes("../../operations/design/knowledge/design-system.md"), false, "Inactive Design command should not point to missing Design knowledge paths");

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
  assert.equal(activeWorkflow.includes("- issue-delivery-cycle"), false, "Engineering-only workspace should not activate issue delivery without Core");
  assert(workspaceSummary.includes("Active departments: operations"), "Workspace summary should list Operations");
  assert(workspaceSummary.includes("Active areas: operations.engineering"), "Workspace summary should list the active Engineering area");

  const routingMap = parse(await readFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "utf8"));
  assert.equal(routingMap.routing.departments.operations.agent, "../../operations/AGENT.md");
  assert.equal(routingMap.routing.departments.operations.readme, "../../operations/README.md");
  assert.equal(routingMap.routing.departments.strategy, undefined);
  assert.equal(routingMap.routing.departments.growth, undefined);

  await assertInitialContextCoherence(rootDir, engineeringOnlyAnswers.subareas);
}

async function validateDesignOnlyContext() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-design-only-"));
  await generateWorkspace(rootDir, designOnlyAnswers);

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const defineDesignCommand = await readFile(join(rootDir, ".leanos", "commands", "define-design.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "context", "next-actions.md"), "utf8");

  assert.deepEqual(yaml.departments.active, ["operations"]);
  assert.deepEqual(yaml.subareas.active.map((subarea) => subarea.key), ["operations.design"]);
  assert.equal(yaml.subareas.active[0].agent, "operations/design/AGENT.md");
  await assertExists(join(rootDir, "operations", "design", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "design-system.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "accessibility.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "user-flows.md"));
  assert.equal(await exists(join(rootDir, "strategy")), false, "Strategy should not be generated in Design-only workspace");
  assert(defineDesignCommand.includes("`strategy.product` is not active"), "Define design should ask for Product context when Product is inactive");
  assert(defineDesignCommand.includes("`operations.core` is not active"), "Define design should ask for MVP context when Core is inactive");
  assert(defineDesignCommand.includes("../../operations/design/AGENT.md"), "Active Design command should point to Design area AGENT");
  assert(defineDesignCommand.includes("../../operations/design/knowledge/design-system.md"), "Active Design command should point to Design knowledge files");
  assert.equal(nextActions.includes("/define design"), false, "Design-only workspace should not recommend /define design before Product and MVP context exist");

  await assertInitialContextCoherence(rootDir, designOnlyAnswers.subareas);
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
  assert.deepEqual(yaml.workflows.active, []);
  assert.equal(await exists(join(rootDir, "strategy", "product", "README.md")), false, "Product area should not be generated when not active");
  assert.equal(await exists(join(rootDir, "operations")), false, "Operations department should not be generated when not active");
  assert.equal(activeWorkflow.includes("- launch-learning-loop"), false, "Growth Marketing without Customer Experience should not activate launch workflow");
  assert.equal(activeWorkflow.includes("- idea-to-roadmap"), false, "Growth + Validation workspace should not activate Strategy idea workflow");
  assert.equal(activeWorkflow.includes("- issue-delivery-cycle"), false, "Growth + Validation workspace should not activate Engineering workflow");
  assert.equal(nextActions.includes("/define icp"), false, "Growth + Validation workspace should not suggest Product commands");
  assert.equal(nextActions.includes("/workon issue"), false, "Growth + Validation workspace should not suggest Engineering commands");
  assert(workspaceSummary.includes("Active departments: strategy, growth"), "Workspace summary should use active department order from definitions");
  assert.equal(routingMap.routing.departments.strategy.agent, "../../strategy/AGENT.md");
  assert.equal(routingMap.routing.departments.strategy.readme, "../../strategy/README.md");
  assert.equal(routingMap.routing.departments.growth.agent, "../../growth/AGENT.md");
  assert.equal(routingMap.routing.departments.growth.readme, "../../growth/README.md");
  assert.equal(routingMap.routing.departments.operations, undefined);
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

async function assertGitHubIssuePrWorkflow(rootDir) {
  const epicTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "epic.yml"), "utf8");
  const subIssueTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "sub-issue.yml"), "utf8");
  const prTemplate = await readFile(join(rootDir, ".github", "PULL_REQUEST_TEMPLATE.md"), "utf8");
  const branchRules = await readFile(join(rootDir, ".github", "leanos", "branch-rules.md"), "utf8");
  const prRules = await readFile(join(rootDir, ".github", "leanos", "pr-validation-rules.md"), "utf8");
  const aiEpicTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "github-epic-template.md"), "utf8");
  const aiSubIssueTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "github-subissue-template.md"), "utf8");
  const issueMatrix = await readFile(join(rootDir, "ai-standard", "templates", "github", "issue-readiness-matrix-template.md"), "utf8");
  const branchTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "branch-name-template.md"), "utf8");
  const aiPrTemplate = await readFile(join(rootDir, "ai-standard", "templates", "github", "pull-request-template.md"), "utf8");
  const codeReviewTemplate = await readFile(join(rootDir, "ai-standard", "templates", "review", "code-review-template.md"), "utf8");
  const epicToSubissuesPlaybook = await readFile(join(rootDir, "operations", "core", "playbooks", "epic-to-subissues.playbook.md"), "utf8");
  const branchSkill = await readFile(join(rootDir, "operations", "engineering", "skills", "create-branch.skill.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "branch-from-issue.playbook.md"), "utf8");
  const issueToPrPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "issue-to-pr.playbook.md"), "utf8");
  const prValidationPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  const createIssuesCommand = await readFile(join(rootDir, ".leanos", "commands", "create-issues.md"), "utf8");
  const workonIssueCommand = await readFile(join(rootDir, ".leanos", "commands", "workon-issue.md"), "utf8");
  const createBranchCommand = await readFile(join(rootDir, ".leanos", "commands", "create-branch.md"), "utf8");
  const createPrCommand = await readFile(join(rootDir, ".leanos", "commands", "create-pr.md"), "utf8");
  const reviewPrCommand = await readFile(join(rootDir, ".leanos", "commands", "review-pr.md"), "utf8");

  assert(epicTemplate.includes("Product / Design / Engineering / Security criteria"), "Epic issue template should include cross-functional criteria");
  assert(subIssueTemplate.includes("Parent epic"), "Sub-issue template should require parent epic linkage");
  assert(subIssueTemplate.includes("Required only when user-facing UX"), "Sub-issue template should make Design conditional");
  assert(subIssueTemplate.includes("Required only when data, auth, permissions, privacy, abuse or compliance"), "Sub-issue template should make Security conditional");
  assert(prTemplate.includes("## Linked Issue"), "PR template should include linked issue");
  assert(prTemplate.includes("## Parent Epic"), "PR template should include parent epic");
  assert(prTemplate.includes("## Design Notes"), "PR template should include design notes");
  assert(prTemplate.includes("## Security Notes"), "PR template should include security notes");
  assert(prTemplate.includes("## LeanOS Review Checklist"), "PR template should include LeanOS review checklist");
  assert(branchRules.includes("issue/<issue-number>-<short-kebab-slug>"), "Branch rules should define the required issue branch format");
  assert(branchRules.includes("Do not implement issue work on the default branch"), "Branch rules should forbid default-branch implementation");
  assert(prRules.includes("Product alignment"), "PR validation rules should require Product alignment");
  assert(prRules.includes("Design: required only when user-facing UX changed"), "PR validation rules should make Design conditional");
  assert(prRules.includes("Security: required when data, auth, permissions, privacy, abuse or compliance is involved"), "PR validation rules should make Security conditional");

  for (const templateContent of [aiEpicTemplate, aiSubIssueTemplate, issueMatrix, branchTemplate, aiPrTemplate, codeReviewTemplate]) {
    assert(templateContent.includes("# "), "AI Standard GitHub templates should have markdown content");
  }

  assert(issueMatrix.includes("Product | Always"), "Issue readiness matrix should require Product");
  assert(issueMatrix.includes("Design | User-facing flow"), "Issue readiness matrix should make Design conditional");
  assert(issueMatrix.includes("Engineering | Always for implementation work"), "Issue readiness matrix should require Engineering for implementation");
  assert(issueMatrix.includes("Security | Data, auth, permissions, privacy, abuse or compliance"), "Issue readiness matrix should make Security conditional");
  assert(epicToSubissuesPlaybook.includes("Break a GitHub epic into implementation-ready sub-issues"), "Operations Core should own epic-to-subissues playbook");
  assert(epicToSubissuesPlaybook.includes("Write Product criteria for every sub-issue"), "Epic breakdown should require Product criteria");
  assert(epicToSubissuesPlaybook.includes("Include Design criteria only when"), "Epic breakdown should make Design conditional");
  assert(epicToSubissuesPlaybook.includes("Include Security criteria only when"), "Epic breakdown should make Security conditional");
  assert(branchSkill.includes("safe issue-linked branch name"), "Engineering should include create-branch skill");
  assert(branchPlaybook.includes("Load `.github/leanos/branch-rules.md`"), "Branch playbook should load branch rules");
  assert(issueToPrPlaybook.includes("Check whether Design criteria are required for user-facing UX"), "Issue-to-PR playbook should conditionally check Design");
  assert(issueToPrPlaybook.includes("Check whether Security criteria are required for data, auth, privacy, abuse or compliance"), "Issue-to-PR playbook should conditionally check Security");
  assert(prValidationPlaybook.includes("List findings by severity"), "PR validation playbook should output findings by severity");

  assert(createIssuesCommand.includes("Issue Readiness Matrix"), "Create issues command should use the readiness matrix");
  assert(createIssuesCommand.includes("Add Design criteria only when user-facing UX is affected"), "Create issues command should make Design conditional");
  assert(createIssuesCommand.includes("Add Security criteria only when data, auth, permissions, privacy, abuse or compliance is involved"), "Create issues command should make Security conditional");
  assert(createIssuesCommand.includes("Do not call GitHub API directly from the model"), "Create issues command should forbid direct model API writes");
  assert(workonIssueCommand.includes("Propose the required issue-linked branch name before code changes"), "Workon issue should require branch proposal before code changes");
  assert(createBranchCommand.includes("issue/<issue-number>-<short-kebab-slug>"), "Create branch command should require LeanOS branch format");
  assert(createPrCommand.includes("A future CLI/script capability performs the actual GitHub write"), "Create PR command should keep remote writes out of the model");
  assert(reviewPrCommand.includes("List findings first, ordered by severity"), "Review PR command should enforce code review output shape");
}

async function assertFounderIntentRouting(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const strategyAgent = await readFile(join(rootDir, "strategy", "AGENT.md"), "utf8");
  const operationsAgent = await readFile(join(rootDir, "operations", "AGENT.md"), "utf8");
  const growthAgent = await readFile(join(rootDir, "growth", "AGENT.md"), "utf8");
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "agent", "operating-rules.md"), "utf8");
  const vscodeAgent = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const workflowsIndex = parse(await readFile(join(rootDir, ".leanos", "index", "workflows.yaml"), "utf8"));
  const rootAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "root-agent-template.md"), "utf8");
  const departmentAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "department-agent-template.md"), "utf8");
  const areaAgentTemplate = await readFile(join(rootDir, "ai-standard", "templates", "agents", "area-agent-template.md"), "utf8");
  const areaReadmeTemplate = await readFile(join(rootDir, "ai-standard", "templates", "structure", "area-readme-template.md"), "utf8");

  assert.equal(rootAgent.includes("## Founder Intent Routing"), false, "Root AGENT.md should not contain separate Founder Intent Routing");
  assert.equal(rootAgent.includes("strategy/workflows/idea-to-roadmap.workflow.md"), false, "Root AGENT.md should not bypass Strategy AGENT for workflows");
  assert.equal(rootAgent.includes("operations/workflows/issue-delivery-cycle.workflow.md"), false, "Root AGENT.md should not bypass Operations AGENT for workflows");
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
  assert(rootAgent.includes("## Asset Creation Routing"), "Root AGENT.md should route framework asset creation through AI Standard");
  assert(rootAgent.includes("Load `ai-standard/README.md`"), "Root AGENT.md should load AI Standard for asset creation");
  assert(rootAgent.includes("`AGENT.md`: operational owner for that level"), "Root AGENT.md should define AGENT.md responsibility");
  assert(rootAgent.includes("`README.md`: directory map and explanation"), "Root AGENT.md should define README responsibility");
  assert(rootAgent.includes("Enter the owning department or area before acting"), "Root AGENT.md should use owner-first red lines");
  assert(rootAgent.includes("When an area has its own `AGENT.md`, use it as the area operating owner"), "Root AGENT.md should understand area-level agents");
  assert(rootAgent.includes("Do not invent missing workflows, roles, skills, playbooks, commands or templates"), "Root AGENT.md should prevent asset invention");
  assert(rootAgent.includes("## Root Routing"), "Root AGENT.md should have a single root routing section");
  assert(rootAgent.includes("Strategy: `strategy/AGENT.md`"), "Root AGENT.md should route Strategy through its AGENT");
  assert(rootAgent.includes("Operations: `operations/AGENT.md`"), "Root AGENT.md should route Operations through its AGENT");
  assert(rootAgent.includes("Growth: `growth/AGENT.md`"), "Root AGENT.md should route Growth through its AGENT");
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
  assert(operationsAgent.includes("CTO / Operations Lead"), "Operations AGENT should define its executive operating owner");
  assert(operationsAgent.includes("## Routing Rules"), "Operations AGENT should define department-level routing rules");
  assert(operationsAgent.includes("workflows/README.md"), "Operations AGENT should point to workflow index instead of enumerating workflows");
  assert.equal(operationsAgent.includes("workflows/issue-delivery-cycle.workflow.md"), false, "Operations AGENT should not enumerate every workflow path");
  assert(growthAgent.includes("Growth / Marketing / Finance Lead"), "Growth AGENT should define its executive operating owner");
  assert(growthAgent.includes("## Routing Rules"), "Growth AGENT should define department-level routing rules");
  assert(runtimeReadme.includes("Business workflows live in departments or areas"), ".leanos README should keep workflows local to departments or areas");
  assert(operatingRules.includes("Natural language founder requests are first-class"), "Operating rules should support natural-language founder intent");
  assert(operatingRules.includes("Root AGENT.md routes to the correct department; department AGENT.md files route to workflows or areas"), "Operating rules should route workflow selection through department agents");
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

  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "idea-to-roadmap" && workflow.path === "../../strategy/workflows/idea-to-roadmap.workflow.md"), "Workflows index should point to Strategy idea workflow");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-to-github-project" && workflow.path === "../../strategy/workflows/roadmap-to-github-project.workflow.md"), "Workflows index should point to Strategy roadmap sync workflow");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "issue-delivery-cycle" && workflow.path === "../../operations/workflows/issue-delivery-cycle.workflow.md"), "Workflows index should point to Operations issue delivery workflow");
  assert(rootAgentTemplate.includes("## Root Routing"), "Root agent template should keep root routing department-level");
  assert(rootAgentTemplate.includes("Use this section only to choose the owning department"), "Root agent template should keep routing scoped to departments");
  assert(rootAgentTemplate.includes("LeanOS uses owner-first navigation"), "Root agent template should explain owner-first navigation");
  assert(rootAgentTemplate.includes("Do not skip levels because a later file looks relevant"), "Root agent template should prevent route skipping");
  assert(rootAgentTemplate.includes("## Red Lines / Non-Negotiable Rules"), "Root agent template should include scalable red lines");
  assert(rootAgentTemplate.includes("## Response Header"), "Root agent template should include response header");
  assert(rootAgentTemplate.includes("## Natural Language Handling"), "Root agent template should include natural language handling");
  assert(rootAgentTemplate.includes("## Asset Creation Routing"), "Root agent template should include asset creation routing");
  assert(rootAgentTemplate.includes("When an area has its own `AGENT.md`, use it as the area operating owner before loading roles, skills or playbooks"), "Root agent template should include area AGENT rule");
  assert(departmentAgentTemplate.includes("If the request spans multiple active areas, open `workflows/README.md`"), "Department agent template should route cross-area work through workflow index");
  assert(departmentAgentTemplate.includes("route to that area `AGENT.md` when present"), "Department agent template should route to area AGENT when present");
  assert(departmentAgentTemplate.includes("Do not load roles, skills or playbooks before entering the owning area"), "Department agent template should keep roles/skills/playbooks area-owned");
  assert(areaAgentTemplate.includes("Choose the smallest specialist role"), "Area AGENT template should route to specialist roles");
  assert(areaAgentTemplate.includes("Keep reusable area knowledge in `knowledge/`"), "Area AGENT template should keep area knowledge modular");
  assert(areaReadmeTemplate.includes("`README.md`: area map and explanation"), "Area README template should define map responsibility");
}

async function assertAiStandardAssetTaxonomy(rootDir) {
  const aiStandardReadme = await readFile(join(rootDir, "ai-standard", "README.md"), "utf8");
  const foundationReadme = await readFile(join(rootDir, "ai-standard", "foundation", "README.md"), "utf8");
  const assetTaxonomy = await readFile(join(rootDir, "ai-standard", "foundation", "asset-taxonomy.md"), "utf8");
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
  assert(foundationReadme.includes("folder-documentation-rules.md"), "Foundation README should list folder documentation rules");
  assert(assetTaxonomy.includes("# Asset Taxonomy"), "Asset taxonomy should have expected title");
  assert(assetTaxonomy.includes("Role = who acts."), "Asset taxonomy should define role concept");
  assert(assetTaxonomy.includes("Skill = capability used."), "Asset taxonomy should define skill concept");
  assert(assetTaxonomy.includes("Playbook = execution sequence."), "Asset taxonomy should define playbook concept");
  assert(assetTaxonomy.includes("Knowledge = information/source of truth."), "Asset taxonomy should define knowledge concept");
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
  const reviewReadme = await readFile(join(rootDir, "ai-standard", "templates", "review", "README.md"), "utf8");

  assert(templatesReadme.includes("agents/"), "Templates README should route to agents");
  assert(templatesReadme.includes("structure/"), "Templates README should route to structure");
  assert(templatesReadme.includes("execution/"), "Templates README should route to execution");
  assert(templatesReadme.includes("commands/"), "Templates README should route to commands");
  assert(templatesReadme.includes("github/"), "Templates README should route to GitHub");
  assert(templatesReadme.includes("review/"), "Templates README should route to review");
  assert(templatesReadme.includes("Do not load every template by default"), "Templates README should discourage loading every template");
  assert(agentsReadme.includes("root-agent-template.md"), "Agent templates README should list root agent template");
  assert(structureReadme.includes("department-template.yaml"), "Structure templates README should list department YAML template");
  assert(executionReadme.includes("role-template.md"), "Execution templates README should list role template");
  assert(executionReadme.includes("workflow-template.md"), "Execution templates README should list workflow template");
  assert(commandsReadme.includes("command-template.md"), "Command templates README should list command template");
  assert(githubReadme.includes("github-epic-template.md"), "GitHub templates README should list epic template");
  assert(githubReadme.includes("pull-request-template.md"), "GitHub templates README should list PR template");
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
  assert(contents["create-playbook"].includes("../checklists/playbook-quality-checklist.md"), "Create playbook instructions should point to playbook checklist");
  assert(contents["create-playbook"].includes("Reference skills instead of duplicating them"), "Create playbook instructions should reference skills");
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
  const playbookExample = await readFile(join(examplesRoot, "execution", "example-playbook-issue-to-pr.md"), "utf8");
  const workflowExample = await readFile(join(examplesRoot, "execution", "example-workflow-issue-delivery-cycle.md"), "utf8");
  const commandExample = await readFile(join(examplesRoot, "commands", "example-command-define-design.md"), "utf8");
  const epicExample = await readFile(join(examplesRoot, "github", "example-github-epic.md"), "utf8");
  const subissueExample = await readFile(join(examplesRoot, "github", "example-github-subissue.md"), "utf8");
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
  assert(executionReadme.includes("example-playbook-issue-to-pr.md"), "Execution examples README should list playbook example");
  assert(executionReadme.includes("example-workflow-issue-delivery-cycle.md"), "Execution examples README should list workflow example");
  assert(commandsReadme.includes("example-command-define-design.md"), "Command examples README should list command example");
  assert(githubReadme.includes("example-github-epic.md"), "GitHub examples README should list epic example");
  assert(githubReadme.includes("example-github-subissue.md"), "GitHub examples README should list sub-issue example");
  assert(githubReadme.includes("example-pull-request.md"), "GitHub examples README should list PR example");
  assert(reviewReadme.includes("example-code-review.md"), "Review examples README should list code review example");

  assert(areaAgentExample.includes("# Design Agent"), "Area AGENT example should use a concrete Design area");
  assert(areaAgentExample.includes("Role Routing"), "Area AGENT example should show role routing");
  assert(areaAgentExample.includes("operations/design/AGENT.md -> Role -> Skills -> Playbook -> Output"), "Area AGENT example should show area Navigation Chain");
  assert(areaReadmeExample.includes("## File Responsibilities"), "Area README example should show file responsibilities");
  assert(roleExample.includes("# Senior Developer"), "Role example should use Senior Developer");
  assert(skillExample.includes("Check Coherence"), "Skill example should use Check Coherence");
  assert(playbookExample.includes("Issue to PR"), "Playbook example should use Issue to PR");
  assert(workflowExample.includes("Participating Areas"), "Workflow example should show participating areas");
  assert(workflowExample.includes("Design: conditional"), "Workflow example should mark Design as conditional");
  assert(workflowExample.includes("Security: conditional"), "Workflow example should mark Security as conditional");
  assert(commandExample.includes("## Load First"), "Command example should define Load First");
  assert(commandExample.includes("## Allowed Updates"), "Command example should define allowed updates");
  assert(commandExample.includes("## Forbidden Updates"), "Command example should define forbidden updates");
  assert(epicExample.includes("## Product Criteria"), "Epic example should include Product criteria");
  assert(epicExample.includes("## Design Criteria"), "Epic example should include Design criteria");
  assert(epicExample.includes("## Security Criteria"), "Epic example should include Security criteria");
  assert(subissueExample.includes("## Definition of Done"), "Sub-issue example should include Definition of Done");
  assert(prExample.includes("## LeanOS Context"), "PR example should include LeanOS context");
  assert(codeReviewExample.includes("## Findings"), "Code review example should include findings");

  for (const oldFlatExample of [
    "example-agent.md",
    "example-folder-readme.md",
    "example-role-senior-developer.md",
    "example-skill-check-coherence.md",
    "example-playbook-issue-to-pr.md"
  ]) {
    assert.equal(await exists(join(examplesRoot, oldFlatExample)), false, `Old flat example should not exist: ${oldFlatExample}`);
  }
}

async function assertDesignFoundation(rootDir) {
  const designReadme = await readFile(join(rootDir, "operations", "design", "README.md"), "utf8");
  const designAgent = await readFile(join(rootDir, "operations", "design", "AGENT.md"), "utf8");
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
  const userResearchSkill = await readFile(join(rootDir, "operations", "design", "skills", "user-research.skill.md"), "utf8");
  const userFlowMappingSkill = await readFile(join(rootDir, "operations", "design", "skills", "user-flow-mapping.skill.md"), "utf8");
  const designSystemSkill = await readFile(join(rootDir, "operations", "design", "skills", "design-system.skill.md"), "utf8");
  const screenSpecificationSkill = await readFile(join(rootDir, "operations", "design", "skills", "screen-specification.skill.md"), "utf8");
  const microcopySkill = await readFile(join(rootDir, "operations", "design", "skills", "microcopy.skill.md"), "utf8");
  const accessibilitySkill = await readFile(join(rootDir, "operations", "design", "skills", "accessibility.skill.md"), "utf8");
  const designReviewSkill = await readFile(join(rootDir, "operations", "design", "skills", "design-review.skill.md"), "utf8");

  await assertExists(join(rootDir, "operations", "design", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "README.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "design-system.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "accessibility.md"));
  await assertExists(join(rootDir, "operations", "design", "knowledge", "user-flows.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "ux-researcher.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "product-designer.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "accessibility-specialist.role.md"));
  await assertExists(join(rootDir, "operations", "design", "roles", "ux-writer.role.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "design-system.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "accessibility.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "user-research.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "user-flow-mapping.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "screen-specification.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "microcopy.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "skills", "design-review.skill.md"));
  await assertExists(join(rootDir, "operations", "design", "playbooks", "user-research.playbook.md"));
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

  for (const skillContent of [userResearchSkill, userFlowMappingSkill, designSystemSkill, screenSpecificationSkill, microcopySkill, accessibilitySkill, designReviewSkill]) {
    for (const heading of ["## Purpose", "## Use When", "## Required Context", "## Inputs", "## Process", "## Checks", "## Output", "## Files to Update", "## Red Lines"]) {
      assert(skillContent.includes(heading), `Design skill should include ${heading}`);
    }
  }

  assert(userResearchSkill.includes("Separate evidence from assumptions"), "User research skill should separate evidence from assumptions");
  assert(userResearchSkill.includes("Do not treat hypotheses as facts"), "User research skill should avoid treating hypotheses as facts");
  assert(userFlowMappingSkill.includes("Avoid flows larger than the MVP"), "User flow mapping should avoid oversized MVP flows");
  assert(designSystemSkill.includes("Prioritize flow clarity before visual polish"), "Design system skill should avoid polish before flow clarity");
  assert(screenSpecificationSkill.includes("default, loading, empty, error, success and edge-case states"), "Screen specification should include required UX states");
  assert(microcopySkill.includes("labels, helper text, empty states, errors, success messages and onboarding hints"), "Microcopy skill should cover key copy surfaces");
  assert(accessibilitySkill.includes("WCAG 2.2 AA"), "Accessibility skill should use WCAG 2.2 AA baseline");
  assert(designReviewSkill.includes("pass, concerns, blocked or not applicable"), "Design review skill should classify review result");
  assert(designReviewSkill.includes("Findings are ordered by severity"), "Design review skill should order findings by severity");

  assert(designReadme.includes("knowledge/design-system.md"), "Design README should point to Design knowledge");
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
  assert.equal(areaYaml.area.skills.includes("ux-states"), false, "Design area YAML should not list ux-states skill");
  assert(skillsIndex.skills.some((skill) => skill.key === "design-review" && skill.path === "../../operations/design/skills/design-review.skill.md"), "Skills index should list design-review");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "ux-states"), false, "Skills index should not list ux-states");
  assert.deepEqual(areaYaml.area.source_of_truth, ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md"]);
  assert(productDesigner.includes("../knowledge/design-system.md"), "Product Designer should read design-system knowledge");
  assert(productDesigner.includes("../knowledge/user-flows.md"), "Product Designer should read user-flow knowledge");
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
  assert(defineDesignCommand.includes("../../operations/core/mvp/scope.md"), "Define design should load MVP context when active");
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
  assert(nextActions.includes("/define design"), "Full workspace should recommend /define design when Product, Core and Design are active");
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

  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "AGENT.md should not include the old Workspace Mutation Rules section");
  assert(rootAgent.includes("## Command Handling"), "AGENT.md should include portable command handling");
  assert(rootAgent.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "AGENT.md should make commands model-agnostic");
  assert(rootAgent.includes("`.leanos/commands/start-leanos.md`"), "AGENT.md should map /start-leanos to its command file");
  assert(rootAgent.includes("When the user invokes legacy `/leanos-init`, treat it as `/start-leanos`"), "AGENT.md should document the legacy init alias");
  assert(rootAgent.includes("During `/start-leanos`, do not enrich roles, skills, playbooks, workflows, commands or `ai-standard/`"), "AGENT.md should protect framework assets during init from Red Lines");
  assert(rootAgent.includes("Ask before modifying knowledge, decision or framework files"), "AGENT.md should require confirmation before file mutation");
  assert.equal(rootAgent.includes("Source-of-truth files describe what the company knows"), false, "AGENT.md should avoid old source-of-truth taxonomy");
  assert.equal(rootAgent.includes("Operating assets describe how LeanOS works"), false, "AGENT.md should avoid old operating-assets taxonomy");
  assert(operatingRules.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), "operating rules should make commands model-agnostic");
  assert(operatingRules.includes("For `/start-leanos`, load `../commands/start-leanos.md` before acting"), "operating rules should map /start-leanos to its command file");
  assert(operatingRules.includes("During `/start-leanos`, propose updates first"), "operating rules should require propose-first start");
  assert(operatingRules.includes("Treat `/leanos-init` as a legacy alias for `/start-leanos`"), "operating rules should document the legacy init alias");
  assert(operatingRules.includes("Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init"), "operating rules should protect operating assets during init");
}

async function assertOperationalPlaybookSections(rootDir) {
  const playbooks = [
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/core/playbooks/epic-to-subissues.playbook.md",
    "operations/design/playbooks/design-foundation.playbook.md",
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
    { command: "/create branch", area: "operations.engineering" },
    { command: "/create pr", area: "operations.engineering" },
    { command: "/review pr", area: "operations.engineering" }
  ];

  const workflowRequirements = [
    { workflow: "idea-to-roadmap", subareas: ["strategy.product", "strategy.roadmap", "strategy.validation"] },
    { workflow: "roadmap-to-github-project", subareas: ["strategy.product", "strategy.roadmap"] },
    { workflow: "issue-delivery-cycle", subareas: ["operations.core", "operations.engineering"] },
    { workflow: "post-merge-continuation", subareas: ["operations.core", "operations.engineering"] },
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
