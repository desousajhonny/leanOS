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

export async function assertVsCodeIntegration(rootDir) {
  const agentFile = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const startPromptFile = await readFile(join(rootDir, ".github", "prompts", "start-leanos.prompt.md"), "utf8");
  const aliasPromptFile = await readFile(join(rootDir, ".github", "prompts", "leanos-init.prompt.md"), "utf8");
  const vscodeReadme = await readFile(join(rootDir, ".leanos", "runtime", "vscode", "README.md"), "utf8");

  assert(agentFile.includes("name: LeanOS Chief"), "LeanOS Chief agent should declare its VS Code name");
  assert(agentFile.includes("AGENT.md"), "LeanOS Chief agent should point to AGENT.md");
  assert(agentFile.includes("leanos.yaml"), "LeanOS Chief agent should point to leanos.yaml");
  assert(agentFile.includes("LeanOS Navigation Chain"), "LeanOS Chief agent should mention the Navigation Chain");
  assert(agentFile.includes("Respect active departments and areas in `leanos.yaml`"), "LeanOS Chief agent should respect active departments and areas");
  assert(agentFile.includes("Não carregue paths de áreas ausentes"), "LeanOS Chief agent should avoid missing area paths");
  assert(agentFile.includes("propose-first mode"), "LeanOS Chief agent should use propose-first mode during init");
  assert(agentFile.includes("Não enriqueça roles, skills, playbooks, workflows, `.leanos/standard/` ou `.github/`"), "LeanOS Chief agent should protect operating assets during init");
  assert.equal(agentFile.includes(".leanos/commands"), false, "LeanOS Chief agent should not depend on generated command files");

  for (const expectedLink of [
    "../../AGENT.md",
    "../../leanos.yaml",
    "../../.leanos/runtime/context/workspace-summary.md",
    "../../.leanos/runtime/context/current-focus.md",
    "../../.leanos/runtime/context/next-actions.md",
    "../../.leanos/runtime/index/routing-map.yaml"
  ]) {
    assert(startPromptFile.includes(expectedLink), `LeanOS start prompt should reference ${expectedLink}`);
    assert(aliasPromptFile.includes(expectedLink), `LeanOS init alias prompt should reference ${expectedLink}`);
  }

  assert(startPromptFile.includes("name: start-leanos"), "LeanOS start prompt should use the primary slash command name");
  assert(startPromptFile.includes("agent: 'LeanOS Chief'"), "LeanOS start prompt should target LeanOS Chief");
  assert.equal(startPromptFile.includes(".leanos/commands"), false, "LeanOS start prompt should not defer to command files");
  assert(startPromptFile.includes("Ask the Required Founder Interview questions only when the loaded context does not already answer them"), "LeanOS start prompt should avoid duplicate founder questions");
  assert(startPromptFile.includes("Use propose-first mode"), "LeanOS start prompt should use propose-first mode");
  assert(startPromptFile.includes("Write only after explicit user confirmation"), "LeanOS start prompt should require confirmation before writes");
  assert(startPromptFile.includes("Não modifique roles, skills, playbooks, workflows, `.leanos/standard/`, `.github/`"), "LeanOS start prompt should protect operating assets");
  assert(aliasPromptFile.includes("name: leanos-init"), "LeanOS init alias prompt should keep the legacy slash command name");
  assert(aliasPromptFile.includes("compatibility alias"), "LeanOS init alias prompt should be compatibility-only");
  assert.equal(aliasPromptFile.includes(".leanos/commands"), false, "LeanOS init alias prompt should not defer to command files");
  assert(vscodeReadme.includes(".github/agents/leanos-chief.agent.md"), "VS Code README should document the agent path");
  assert(vscodeReadme.includes("linguagem natural"), "VS Code README should document natural-language startup");
  assert.equal(vscodeReadme.includes("\n/start-leanos\n"), false, "VS Code README should not advertise slash commands");
  assert.equal(vscodeReadme.includes("\n/leanos-init\n"), false, "VS Code README should not advertise legacy slash commands");
  assert.equal(await exists(join(rootDir, ".vscode", "settings.json")), false, "Generator should not write VS Code workspace settings");
}

export async function assertGitHubReadiness(rootDir) {
  const envLocal = await readFile(join(rootDir, ".env.local"), "utf8");
  const gitignore = await readFile(join(rootDir, ".gitignore"), "utf8");
  const settingsExample = await readFile(join(rootDir, ".github", "leanos", "github-settings.example.json"), "utf8");
  const workMapping = await readFile(join(rootDir, ".github", "leanos", "work-mapping.md"), "utf8");
  const projectSync = await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8");
  const syncState = await readFile(join(rootDir, ".github", "leanos", "sync-state.yaml"), "utf8");
  const labels = await readFile(join(rootDir, ".github", "leanos", "labels.yaml"), "utf8");
  const githubReadme = await readFile(join(rootDir, ".github", "leanos", "README.md"), "utf8");
  const githubSetupGuide = await readFile(join(rootDir, ".github", "leanos", "setup-guide.md"), "utf8");
  const githubCapabilityContract = await readFile(join(rootDir, ".github", "leanos", "capability-contract.md"), "utf8");
  const githubRole = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "roles", "github-devops.role.md"), "utf8");
  const githubSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "configure-github-project/SKILL.md"), "utf8");
  const githubPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "configure-github-project.playbook.md"), "utf8");
  const settings = JSON.parse(settingsExample);
  const projectSyncYaml = parse(projectSync);

  assert(envLocal.includes("Local apenas. Não faça commit."), ".env.local should be clearly local-only");
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
  assert(workMapping.includes("Use a natural-language GitHub Epics/Features sync request as the chat intent for this flow"), "GitHub work mapping should route sync through natural-language Epics/Features sync");
  assert(workMapping.includes("Não crie nem dependa de `operations/product-ops/epics/synced/`"), "GitHub work mapping should avoid a synced archive folder");
  assert(workMapping.includes("use `sync-state.yaml` as the index"), "GitHub work mapping should use sync-state as the sync index");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "github-sync.md")), false, "GitHub sync command should not be generated");
  assert.equal(projectSyncYaml.github.project_sync.source.epics, "../../operations/product-ops/epics/", "GitHub project sync should read local Epics and Features");
  assert.equal(projectSyncYaml.github.project_sync.source.work_mapping, "../../.github/leanos/work-mapping.md", "GitHub project sync should reference work mapping");
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
  assert(githubReadme.includes("GitHub Epics/Features sync must check GitHub readiness before preparing any sync payload"), "GitHub README should document readiness-first sync");
  assert(githubReadme.includes("Never ask the founder to paste a token into chat"), "GitHub README should protect token handling");
  assert(githubSetupGuide.includes("## Responsável e Repositório"), "GitHub setup guide should explain owner/repository");
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

export async function assertGitHubIssuePrWorkflow(rootDir) {
  const epicTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "epic.yml"), "utf8");
  const featureTemplate = await readFile(join(rootDir, ".github", "ISSUE_TEMPLATE", "feature.yml"), "utf8");
  const prTemplate = await readFile(join(rootDir, ".github", "PULL_REQUEST_TEMPLATE.md"), "utf8");
  const branchRules = await readFile(join(rootDir, ".github", "leanos", "branch-rules.md"), "utf8");
  const prRules = await readFile(join(rootDir, ".github", "leanos", "pr-validation-rules.md"), "utf8");
  const aiEpicTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "github-epic-template.md"), "utf8");
  const aiFeatureTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "github-feature-template.md"), "utf8");
  const productEpicTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "product", "epic-template.md"), "utf8");
  const productFeatureTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "product", "feature-template.md"), "utf8");
  const productOpsEpicsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "epics", "README.md"), "utf8");
  const issueMatrix = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "delivery-readiness-matrix-template.md"), "utf8");
  const branchTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "branch-name-template.md"), "utf8");
  const aiPrTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "pull-request-template.md"), "utf8");
  const codeReviewTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "review", "code-review-template.md"), "utf8");
  const epicToFeaturesPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "playbooks", "epic-to-features.playbook.md"), "utf8");
  const shapeEpicSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "skills", "shape-epic/SKILL.md"), "utf8");
  const branchSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "create-branch/SKILL.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "branch-for-feature.playbook.md"), "utf8");
  const preparePrPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const prValidationPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Fully activated workspace should not generate command files");

  assert(epicTemplate.includes('title: "[EPIC] "'), "Epic issue form should use canonical EPIC title prefix");
  assert(featureTemplate.includes('title: "[FEATURE: <epic>] "'), "Feature issue form should use canonical FEATURE title prefix");
  assert(epicTemplate.includes("Decision ownership"), "Epic issue template should include decision ownership");
  assert(epicTemplate.includes("Epic readiness matrix"), "Epic issue template should include Epic readiness matrix");
  assert(featureTemplate.includes("Parent epic"), "Feature template should require parent epic linkage");
  assert(featureTemplate.includes("Delivery Readiness Matrix"), "Feature template should include the DRM");
  assert(featureTemplate.includes("Required only when user-facing UX"), "Feature template should make Design conditional");
  assert(featureTemplate.includes("Required only when data, auth, permissions, privacy, abuse or compliance"), "Feature template should make Security conditional");
  assert(prTemplate.includes("## Título Do PR"), "PR template should include a title convention");
  assert(prTemplate.includes("feat(<escopo>): <resumo curto>"), "PR template should recommend Conventional Commit style titles");
  assert(prTemplate.includes("## Issue Vinculada"), "PR template should include linked issue");
  assert(prTemplate.includes("## Epic Pai"), "PR template should include parent epic");
  assert(prTemplate.includes("## Status De Prontidão"), "PR template should include review readiness status");
  assert(prTemplate.includes("draft | founder-ready | blocked-by-tests | blocked-by-context"), "PR template should define readiness status values");
  assert(prTemplate.includes("## Notas De Design"), "PR template should include design notes");
  assert(prTemplate.includes("## Security Notes"), "PR template should include security notes");
  assert(prTemplate.includes("## Deploy / Rollback"), "PR template should include deploy and rollback notes");
  assert(prTemplate.includes("## Founder Testing Guide"), "PR template should include founder testing guide");
  assert(prTemplate.includes("## LeanOS Review Checklist"), "PR template should include LeanOS review checklist");
  assert(prTemplate.includes("Founder Testing Guide is clear enough for a non-technical founder"), "PR template should include founder testing review checkbox");
  assert(branchRules.includes("feature/<feature-slug>-<short-kebab-slug>"), "Branch rules should define the local Feature branch format");
  assert(branchRules.includes("issue/<issue-number>-<short-kebab-slug>"), "Branch rules should define the mapped GitHub issue branch format");
  assert(branchRules.includes("fix/<issue-number>-<short-kebab-slug>"), "Branch rules should define bug fix branches");
  assert(branchRules.includes("chore/<short-kebab-slug>"), "Branch rules should define maintenance branches");
  assert(branchRules.includes("docs/<short-kebab-slug>"), "Branch rules should define documentation branches");
  assert(branchRules.includes("spike/<short-kebab-slug>"), "Branch rules should define technical spike branches");
  assert(branchRules.includes("Não implemente trabalho de Feature na branch padrão"), "Branch rules should forbid default-branch Feature implementation");
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
  assert(aiPrTemplate.includes("## Título Do PR"), "AI Standard PR template should include a title convention");
  assert(aiPrTemplate.includes("## Status De Prontidão"), "AI Standard PR template should include readiness status");
  assert(aiPrTemplate.includes("## Deploy / Rollback"), "AI Standard PR template should include deploy and rollback notes");
  assert(productOpsEpicsReadme.includes("operations/product-ops/epics/"), "Product Ops epics README should describe local epic root");
  assert(productOpsEpicsReadme.includes("<epic-slug>/"), "Product Ops epics README should describe local epic folders");
  assert(productOpsEpicsReadme.includes("Every markdown file inside an Epic folder, except `README.md`, is a Feature"), "Product Ops epics README should define files as features");
  assert(productOpsEpicsReadme.includes("GitHub sync is optional"), "Product Ops epics README should keep GitHub sync optional");
  assert(productOpsEpicsReadme.includes("Não use `synced` como status de produto"), "Product Ops epics README should separate sync status from product status");
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
  assert(epicToFeaturesPlaybook.includes("Não crie a especificação completa do componente durante Feature Shaping"), "Epic breakdown should defer full component specs");
  assert(epicToFeaturesPlaybook.includes("Design task for component spec"), "Epic breakdown should add a Design task when component spec is required");
  assert(epicToFeaturesPlaybook.includes("Add Security criteria only when"), "Epic breakdown should make Security conditional");
  assert(epicToFeaturesPlaybook.includes("Add DevOps criteria only when"), "Epic breakdown should make DevOps conditional");
  assert(epicToFeaturesPlaybook.includes("Stop before any GitHub API write until the user explicitly confirms"), "Epic breakdown should require confirmation before GitHub writes");
  assert(branchSkill.includes("safe Feature-linked branch name"), "Engineering should include create-branch skill");
  assert(branchPlaybook.includes("Load `.github/leanos/branch-rules.md`"), "Branch playbook should load branch rules");
  assert(preparePrPlaybook.includes("Check whether Design criteria are required for user-facing UX"), "Prepare PR playbook should conditionally check Design");
  assert(preparePrPlaybook.includes("Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance"), "Prepare PR playbook should conditionally check Security/Data");
  assert(prValidationPlaybook.includes("List findings by severity"), "PR validation playbook should output findings by severity");

  assert(epicToFeaturesPlaybook.includes("Delivery Readiness Matrix (DRM)"), "Epic-to-features playbook should use the DRM");
  assert(epicToFeaturesPlaybook.includes("Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected"), "Epic-to-features playbook should make Design conditional");
  assert(epicToFeaturesPlaybook.includes("Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved"), "Epic-to-features playbook should make Security conditional");
  assert(epicToFeaturesPlaybook.includes("Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected"), "Epic-to-features playbook should make DevOps conditional");
  assert(epicToFeaturesPlaybook.includes("Stop before any GitHub API write until the user explicitly confirms"), "Epic-to-features playbook should forbid direct model API writes");
  assert(preparePrPlaybook.includes("Create or confirm a Feature-linked branch before code changes"), "Engineering delivery should require branch proposal before code changes");
  assert(branchRules.includes("feature/<feature-slug>-<short-kebab-slug>"), "Branch rules should support local Feature branches");
  assert(branchRules.includes("issue/<issue-number>-<short-kebab-slug>"), "Branch rules should support mapped GitHub issue branches");
  assert(branchTemplate.includes("fix/<issue-number>-<short-kebab-slug>"), "AI Standard branch template should include fix branches");
  assert(branchTemplate.includes("chore/<short-kebab-slug>"), "AI Standard branch template should include chore branches");
  assert(branchTemplate.includes("docs/<short-kebab-slug>"), "AI Standard branch template should include docs branches");
  assert(branchTemplate.includes("spike/<short-kebab-slug>"), "AI Standard branch template should include spike branches");
  assert(preparePrPlaybook.includes("Founder Testing Guide"), "Prepare PR playbook should require Founder Testing Guide");
  assert(preparePrPlaybook.includes("Use `skills/create-pr/SKILL.md` to prepare PR using the PR template"), "Prepare PR playbook should keep PR write as a prepared output");
  assert(prValidationPlaybook.includes("Founder Testing Guide"), "PR validation playbook should validate Founder Testing Guide");
  assert(prValidationPlaybook.includes("List findings by severity"), "PR validation playbook should enforce code review output shape");
}

export async function assertFounderIntentRouting(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const strategyAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "strategy", "AGENT.md"), "utf8");
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "runtime", "agent", "operating-rules.md"), "utf8");
  const whereWeAreProtocol = await readFile(join(rootDir, ".leanos", "runtime", "agent", "protocols", "where-we-are.md"), "utf8");
  const vscodeAgent = await readFile(join(rootDir, ".github", "agents", "leanos-chief.agent.md"), "utf8");
  const workflowsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "workflows.yaml"), "utf8"));
  const rootAgentTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "agents", "root-agent-template.md"), "utf8");
  const departmentAgentTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "agents", "department-agent-template.md"), "utf8");
  const areaAgentTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "agents", "area-agent-template.md"), "utf8");
  const areaReadmeTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "structure", "area-readme-template.md"), "utf8");

  assert.equal(rootAgent.includes("## Founder Intent Routing"), false, "Root AGENT.md should not contain separate Founder Intent Routing");
  assert.equal(rootAgent.includes("strategy/workflows/idea-to-roadmap.workflow.md"), false, "Root AGENT.md should not bypass Strategy AGENT for workflows");
  assert.equal(rootAgent.includes("operations/workflows/feature-to-delivery-cycle.workflow.md"), false, "Root AGENT.md should not bypass Operations AGENT for workflows");
  assert.equal(rootAgent.includes("Root AGENT.md must not bypass department AGENT.md"), false, "Root AGENT.md should avoid narrow workflow-bypass prohibitions");
  assert(rootAgent.includes("## Responsabilidades dos Arquivos"), "Root AGENT.md should define file responsibilities");
  assert(rootAgent.includes("LeanOS usa navegação owner-first"), "Root AGENT.md should explain owner-first navigation");
  assert(rootAgent.includes("A raiz escolhe o departamento dono"), "Root AGENT.md should explain root-level navigation");
  assert(rootAgent.includes("O departamento escolhe um workflow ou área ativa"), "Root AGENT.md should explain department-level navigation");
  assert(rootAgent.includes("A área escolhe o papel especialista quando tem `AGENT.md`"), "Root AGENT.md should explain area-level navigation");
  assert(rootAgent.includes("A saída atualiza apenas o menor arquivo relevante"), "Root AGENT.md should keep output scope narrow");
  assert(rootAgent.includes("## Linhas Vermelhas / Regras Não Negociáveis"), "Root AGENT.md should define scalable red lines");
  assert.equal(rootAgent.includes("## Response Header"), false, "Root AGENT.md should not require the old technical response header");
  assert.equal(rootAgent.includes("Active Department:"), false, "Root AGENT.md should not require technical header fields");
  assert(rootAgent.includes("## Narração de Rota"), "Root AGENT.md should define founder-friendly routing narration");
  assert(rootAgent.includes("mostre a rota em uma frase curta"), "Root AGENT.md should keep routing visible without a fixed table");
  assert(rootAgent.includes("## Tratamento de Linguagem Natural"), "Root AGENT.md should route natural-language requests");
  assert.equal(rootAgent.includes("If a natural-language request clearly matches an existing LeanOS command"), false, "Root AGENT.md should not route natural language through command files");
  assert(rootAgent.includes("## Roteamento de Intenção de Progressão"), "Root AGENT.md should include progression intent routing");
  assert(rootAgent.includes("`.leanos/standard/foundation/founder-progression-model.md`"), "Root AGENT.md should reference the Founder Progression Model");
  assert(rootAgent.includes("`.leanos/standard/foundation/progression-gates.md`"), "Root AGENT.md should reference progression gates");
  assert(rootAgent.includes("Intenção -> Estágio Atual -> Gate -> Requisitos Ativos -> Rota"), "Root AGENT.md should define the progression routing decision shape");
  assert(rootAgent.includes("retorne `activation_required` em vez de abrir ou inventar paths"), "Root AGENT.md should return activation_required instead of inventing missing areas");
  assert(rootAgent.includes("Não responda apenas com `activation_required`"), "Root AGENT.md should require natural activation language");
  assert(rootAgent.includes("Explique o próximo passo operacional natural"), "Root AGENT.md should explain why activation is the next operating step");
  assert(rootAgent.includes("Peça confirmação antes de criar ou ativar um departamento ou área"), "Root AGENT.md should ask before activation");
  assert(rootAgent.includes("lean-os activate <area>"), "Root AGENT.md should name the activation CLI capability");
  assert(rootAgent.includes("Leia `leanos.yaml` primeiro e diferencie `active_*`, `inactive_*` e `founder_selected_*`"), "Root AGENT.md should distinguish activation state fields");
  assert(rootAgent.includes("Não carregue departamentos inativos"), "Root AGENT.md should forbid inactive department loading");
  assert(rootAgent.includes("Não trate `available` como `exists`"), "Root AGENT.md should distinguish available from existing workspace assets");
  assert(rootAgent.includes("Começo, retomada ou calibração de ideia: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT.md should route start and idea calibration through Strategy Product");
  assert(rootAgent.includes("Escopo inicial de validação do MVP, roadmap, priorização ou rota de validação: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT.md should route initial MVP validation scope through Strategy");
  assert(rootAgent.includes("Escopo de validação do MVP ou primeiro roadmap do MVP: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT.md should keep first MVP roadmap in Strategy");
  assert(rootAgent.includes("Planejamento de backlog do MVP: retorne `activation_required` para `operations.product-ops`"), "Root AGENT.md should gate MVP backlog planning behind Product Ops activation");
  assert(rootAgent.includes("## Mapa de Intenções Naturais"), "Root AGENT.md should include a compact natural intent map");
  assert(rootAgent.includes("Use este mapa como orientação de roteamento, não como detalhe de execução"), "Root AGENT.md should keep intent map lightweight");
  assert(rootAgent.includes("Nova ideia ou avaliação de Feature: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT.md should route idea evaluation through Strategy AGENT");
  assert(rootAgent.includes("Item de entrega para Epic ou Epic para Features: retorne `activation_required` para `operations.product-ops`"), "Root AGENT.md should gate delivery planning behind Product Ops activation");
  assert(rootAgent.includes("Implementação de Feature: retorne `activation_required` para `operations.engineering`"), "Root AGENT.md should gate implementation behind Engineering activation");
  assert(rootAgent.includes("Setup de GitHub, configuração de GitHub Projects ou sync de Epics/Features: retorne `activation_required` para `operations.devops`"), "Root AGENT.md should gate GitHub sync behind DevOps activation");
  assert(rootAgent.includes("## Perguntas de Status e Readiness"), "Root AGENT.md should handle status and readiness questions");
  assert(rootAgent.includes("`.leanos/runtime/agent/protocols/where-we-are.md`"), "Root AGENT.md should route status and readiness questions to the where-we-are protocol");
  assert(rootAgent.includes("## Trace e Diagnóstico"), "Root AGENT.md should handle trace and diagnostic questions");
  assert(rootAgent.includes("`.leanos/runtime/agent/protocols/chief-trace.md`"), "Root AGENT.md should route trace diagnostics to the chief-trace protocol");
  assert(rootAgent.includes("não responda de memória"), "Root AGENT.md should avoid memory-only status answers");
  assert(rootAgent.includes("## Roteamento de Padrões do Framework"), "Root AGENT.md should route framework standards through AI Standard");
  assert(rootAgent.includes("Use `.leanos/standard/README.md` somente quando o usuário pedir para criar, alterar, revisar ou validar assets do framework LeanOS"), "Root AGENT.md should load AI Standard only for framework asset work");
  assert(rootAgent.includes("Não adivinhe o template, checklist ou instrução correta de memória"), "Root AGENT.md should prevent framework asset hallucination");
  assert(rootAgent.includes("Siga sua rota até a menor foundation, instrução, template, checklist ou exemplo necessário"), "Root AGENT.md should delegate AI Standard internals to AI Standard README");
  assert(rootAgent.includes("Não use `.leanos/standard/` para definir estratégia de produto"), "Root AGENT.md should keep product work on the Navigation Chain");
  assert.equal(rootAgent.includes("Load the matching creation instruction from `.leanos/standard/instructions/`"), false, "Root AGENT.md should not list AI Standard internals directly");
  assert.equal(rootAgent.includes("Use the matching template from `.leanos/standard/templates/`"), false, "Root AGENT.md should not list template internals directly");
  assert.equal(rootAgent.includes("Validate with the matching checklist from `.leanos/standard/checklists/`"), false, "Root AGENT.md should not list checklist internals directly");
  assert(rootAgent.includes("`AGENT.md`: dono operacional daquele nível"), "Root AGENT.md should define AGENT.md responsibility");
  assert(rootAgent.includes("`README.md`: mapa e explicação do diretório"), "Root AGENT.md should define README responsibility");
  assert(rootAgent.includes("Entre no departamento ou área dona antes de agir"), "Root AGENT.md should use owner-first red lines");
  assert(rootAgent.includes("Quando uma área tiver seu próprio `AGENT.md`"), "Root AGENT.md should understand area-level agents");
  assert(rootAgent.includes("Não invente workflows, roles, skills, playbooks ou templates ausentes"), "Root AGENT.md should prevent asset invention");
  assert(rootAgent.includes("## Roteamento Raiz"), "Root AGENT.md should have a single root routing section");
  assert(rootAgent.includes("Strategy: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT.md should route Strategy through its AGENT");
  assert.equal(rootAgent.includes("Operations: `clinic-assistant-ai-os/operations/AGENT.md`"), false, "Root AGENT.md should not expose inactive Operations as an active route");
  assert.equal(rootAgent.includes("Growth: `clinic-assistant-ai-os/growth/AGENT.md`"), false, "Root AGENT.md should not expose inactive Growth as an active route");
  assert.equal(rootAgent.includes("## Active Root Departments"), false, "Root AGENT.md should not duplicate active departments and routing");
  assert.equal(rootAgent.includes("## Roteamento\n"), false, "Root AGENT.md should use Root Routing instead of a separate Routing section");
  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "Root AGENT.md should not keep the old mutation rules section");
  assert.equal(rootAgent.includes("`strategy/product/README.md`"), false, "Root AGENT.md should not route directly to Strategy Product area");
  assert.equal(rootAgent.includes("`operations/engineering/README.md`"), false, "Root AGENT.md should not route directly to Operations Engineering area");
  assert(rootAgent.includes("Workflows operacionais vivem no OS do produto"), "AGENT.md should keep business workflows out of .leanos");
  assert(strategyAgent.includes("CEO / PMO / Product Strategy operator"), "Strategy AGENT should define its executive operating owner");
  assert(strategyAgent.includes("## Regras de Roteamento"), "Strategy AGENT should define department-level routing rules");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "README.md")), false, "Strategy should not generate workflow index when no Strategy workflow is active");
  assert.equal(strategyAgent.includes("workflows/README.md"), false, "Strategy AGENT should not point to workflow index when no Strategy workflow is active");
  assert(strategyAgent.includes("## Entrada de Playbook"), "Strategy AGENT should route multi-step Strategy work through area playbooks");
  assert.equal(strategyAgent.includes("workflows/idea-to-roadmap.workflow.md"), false, "Strategy AGENT should not enumerate every workflow path");
  assert(runtimeReadme.includes("Workflows de negócio vivem no OS do produto"), ".leanos README should keep workflows local to the product OS");
  assert(operatingRules.includes("Pedidos em linguagem natural do founder são first-class"), "Operating rules should support natural-language founder intent");
  assert(operatingRules.includes("O AGENT.md raiz roteia para o departamento correto"), "Operating rules should route workflow selection through department agents");
  assert(operatingRules.includes("Para pedidos de status, retomada, readiness"), "Operating rules should route status and readiness through where-we-are protocol");
  assert(whereWeAreProtocol.includes("# Protocolo Onde Estamos"), "Where-we-are protocol should be generated");
  assert(whereWeAreProtocol.includes("Não recomende implementação antes de checar readiness de produto"), "Where-we-are protocol should prevent premature implementation");
  assert(whereWeAreProtocol.includes("operations/product-ops/knowledge/ready-to-develop.md"), "Where-we-are protocol should load the ready-to-develop gate");
  assert(whereWeAreProtocol.includes("## Gate de Desenvolvimento"), "Where-we-are protocol should define a development gate");
  assert(whereWeAreProtocol.includes("existe Epic/Feature local"), "Where-we-are protocol should support local Epic/Feature readiness");
  assert(whereWeAreProtocol.includes("Epic local ausente -> playbook Product Ops `delivery-item-to-epic`"), "Where-we-are protocol should route missing local epic");
  assert(whereWeAreProtocol.includes("## Rotas Recomendadas por Lacuna"), "Where-we-are protocol should recommend routes by gap");
  assert(whereWeAreProtocol.includes("Ainda nao recomendo comecar pelo codigo"), "Where-we-are protocol should provide founder-friendly early-development feedback");
  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Generated workspace should not contain .leanos/commands");
  assert.equal(rootAgent.includes("\"define the MVP\" -> `.leanos/commands/define-mvp.md`"), false, "Root AGENT should not route MVP language to an inactive command");
  assert(operatingRules.includes("`AGENT.md` é o dono operacional do seu nível; `README.md` é o mapa do diretório"), "Operating rules should define AGENT and README responsibilities");
  assert(operatingRules.includes("Arquivos `AGENT.md` de área, quando presentes, escolhem o papel especialista"), "Operating rules should define area AGENT responsibility");
  assert.equal(operatingRules.includes("Root AGENT.md must not bypass department AGENT.md"), false, "Operating rules should avoid narrow workflow-bypass prohibitions");
  assert(operatingRules.includes("Workflows de negócio vivem no OS do produto, não em `.leanos/`"), "Operating rules should keep business workflows out of .leanos");
  assert(vscodeAgent.includes("Founder requests can be natural language"), "VS Code agent should support founder intent routing");
  assert(vscodeAgent.includes("Then use the department `AGENT.md` to choose either a coordination workflow or the smallest active area"), "VS Code agent should route workflows and area work through department AGENT files");
  assert(vscodeAgent.includes("Enter the owning department or area before acting"), "VS Code agent should use owner-first routing");
  assert(vscodeAgent.includes("When an area has its own `AGENT.md`, use it before loading roles, skills or playbooks"), "VS Code agent should understand area-level agents");
  assert.equal(vscodeAgent.includes("Não contorne o `AGENT.md` do departamento"), false, "VS Code agent should avoid narrow workflow-bypass prohibitions");
  assert.equal(await exists(join(rootDir, ".leanos", "workflows")), false, ".leanos/workflows should not be generated");

  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "idea-to-roadmap"), false, "Workflows index should not include removed idea-to-roadmap workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "business-intake"), false, "Workflows index should not include business-intake");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "new-idea-intake"), false, "Workflows index should not include new-idea-intake");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "strategy-validation-cycle"), false, "Workflows index should not include removed Strategy validation workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-to-github-project"), false, "Workflows index should not include removed roadmap-to-GitHub workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "define-mvp"), false, "Workflows index should not include removed define-mvp workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-item-to-epic"), false, "Workflows index should not include removed roadmap-item-to-epic workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "delivery-item-to-epic"), false, "Workflows index should not include delivery-item-to-epic as workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "roadmap-item-to-delivery-scope"), false, "Workflows index should not include obsolete roadmap item to delivery scope workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "delivery-scope-to-epic"), false, "Workflows index should not include obsolete delivery scope to epic workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "mvp-to-pr"), false, "Workflows index should not include obsolete MVP to PR workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "epic-to-features"), false, "Workflows index should not include epic-to-features as workflow");
  assert.equal(workflowsIndex.workflows.some((workflow) => workflow.key === "feature-to-delivery-cycle"), false, "Workflows index should not include inactive Operations delivery workflow during setup");
  assert(rootAgentTemplate.includes("## Roteamento Raiz"), "Root agent template should keep root routing department-level");
  assert(rootAgentTemplate.includes("Use esta seção apenas para escolher o departamento dono"), "Root agent template should keep routing scoped to departments");
  assert(rootAgentTemplate.includes("LeanOS usa navegação owner-first"), "Root agent template should explain owner-first navigation");
  assert(rootAgentTemplate.includes("Não pule níveis porque um arquivo posterior parece relevante"), "Root agent template should prevent route skipping");
  assert(rootAgentTemplate.includes("## Linhas Vermelhas / Regras Não Negociáveis"), "Root agent template should include scalable red lines");
  assert.equal(rootAgentTemplate.includes("## Response Header"), false, "Root agent template should not include the old response header");
  assert(rootAgentTemplate.includes("## Narração de Rota"), "Root agent template should include routing narration");
  assert(rootAgentTemplate.includes("## Tratamento de Linguagem Natural"), "Root agent template should include natural language handling");
  assert(rootAgentTemplate.includes("## Perguntas de Status e Readiness"), "Root agent template should include status and readiness handling");
  assert(rootAgentTemplate.includes("`.leanos/runtime/agent/protocols/where-we-are.md`"), "Root agent template should point to where-we-are protocol");
  assert(rootAgentTemplate.includes("## Trace e Diagnóstico"), "Root agent template should include trace diagnostics handling");
  assert(rootAgentTemplate.includes("`.leanos/runtime/agent/protocols/chief-trace.md`"), "Root agent template should point to chief-trace protocol");
  assert(rootAgentTemplate.includes("## Roteamento de Padrões do Framework"), "Root agent template should include framework standards routing");
  assert(rootAgentTemplate.includes("Use `.leanos/standard/README.md` somente quando o usuário pedir para criar, alterar, revisar ou validar assets do framework LeanOS"), "Root agent template should route framework standards through AI Standard README");
  assert(rootAgentTemplate.includes("Não adivinhe o template, checklist ou instrução correta de memória"), "Root agent template should prevent framework asset hallucination");
  assert(rootAgentTemplate.includes("Quando uma área tiver seu próprio `AGENT.md`, use esse arquivo como dono operacional da área"), "Root agent template should include area AGENT rule");
  assert(departmentAgentTemplate.includes("Se o pedido do founder precisar de coordenação multiárea"), "Department agent template should route coordination journeys through workflow index");
  assert(departmentAgentTemplate.includes("Use `workflows/README.md` quando o founder pedir decisão ou transição com múltiplas etapas"), "Department agent template should define workflow journey signals");
  assert(departmentAgentTemplate.includes("roteie para essa área via `AGENT.md` quando existir"), "Department agent template should route to area AGENT when present");
  assert(departmentAgentTemplate.includes("Não carregue roles, skills ou playbooks antes de entrar na área dona"), "Department agent template should keep roles/skills/playbooks area-owned");
  assert(areaAgentTemplate.includes("Escolha o menor papel especialista"), "Area AGENT template should route to specialist roles");
  assert(areaAgentTemplate.includes("Mantenha knowledge reutilizável da área em `knowledge/`"), "Area AGENT template should keep area knowledge modular");
  assert(areaReadmeTemplate.includes("`README.md`: mapa e explicação da área"), "Area README template should define map responsibility");
}
