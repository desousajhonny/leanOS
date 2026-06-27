import type { AreaDefinition } from "../../../../../types.js";
import { folderReadme } from "../../../../../content/shared.js";
import { devopsGithubManagementKnowledge } from "./devopsGithubManagementKnowledge.js";
import { devopsEnvironmentsKnowledge } from "./devopsEnvironmentsKnowledge.js";
import { devopsDeploymentReadinessKnowledge } from "./devopsDeploymentReadinessKnowledge.js";
import { devopsCiCdKnowledge } from "./devopsCiCdKnowledge.js";
import { devopsObservabilityKnowledge } from "./devopsObservabilityKnowledge.js";
import { devopsReleaseNotesKnowledge } from "./devopsReleaseNotesKnowledge.js";

export const operationsDevopsArea: AreaDefinition = {
  key: "operations.devops",
  root: "operations",
  slug: "devops",
  name: "DevOps",
  path: "operations/devops",
  lead: {
    title: "DevOps Lead",
    purpose: "Route GitHub setup, environments, CI/CD, deployment readiness, observability and release operations without storing secrets or deploying automatically."
  },
  routingKey: "devops",
  requestTypes: "deployment, environments, CI, observability, GitHub Projects or operations runbooks",
  purpose: "Own delivery infrastructure, environments, deployment, GitHub workflow setup and observability notes.",
  whenToUse: ["plan deployment", "configure CI", "configure GitHub Projects", "document environments", "define observability"],
  operatingRules: [
    "Treat DevOps as readiness and operational guidance first, execution second.",
    "Use GitHub/Vercel/provider files as configuration drafts until the founder confirms execution.",
    "Keep local, preview/staging and production environments distinct.",
    "Prefer dry-run, status checks and proposed payloads before any remote write.",
    "Route product code implementation back to Engineering and product scope questions back to Product Ops."
  ],
  redLines: [
    "Do not store tokens, secrets or credentials in workspace files.",
    "Do not ask the founder to paste tokens into chat or markdown files.",
    "Do not call GitHub, Vercel or any provider API without explicit confirmation.",
    "Do not create `.vercel/`, run `vercel link` or deploy automatically from the scaffold.",
    "Do not create or modify `vercel.json` until a real app/framework exists and overrides are required.",
    "Do not add CI deploy gates or branch protection changes without explaining impact and asking first."
  ],
  sourceOfTruth: [
    "knowledge/github-management.md",
    "knowledge/environments.md",
    "knowledge/deployment-readiness.md",
    "knowledge/ci-cd.md",
    "knowledge/observability.md",
    "knowledge/release-notes.md"
  ],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("DevOps Knowledge", "Persistent operational context for GitHub, environments, CI/CD, deployment readiness, observability and release notes.", "Use when preparing automation, release operations, GitHub Project sync or deploy readiness.", "github-management.md", ["github-management.md", "environments.md", "deployment-readiness.md", "ci-cd.md", "observability.md", "release-notes.md"], ["../AGENT.md", "../../../.github/leanos/", "../playbooks/"], "Keep secrets out of these files. Record token source and readiness decisions, never token values.") },
    { path: "knowledge/github-management.md", content: () => devopsGithubManagementKnowledge() },
    { path: "knowledge/environments.md", content: () => devopsEnvironmentsKnowledge() },
    { path: "knowledge/deployment-readiness.md", content: () => devopsDeploymentReadinessKnowledge() },
    { path: "knowledge/ci-cd.md", content: () => devopsCiCdKnowledge() },
    { path: "knowledge/observability.md", content: () => devopsObservabilityKnowledge() },
    { path: "knowledge/release-notes.md", content: () => devopsReleaseNotesKnowledge() }
  ],
  roles: [
    {
      slug: "devops-engineer",
      title: "DevOps Engineer",
      purpose: "Prepare release, environment, GitHub workflow and observability practices.",
      useWhen: ["deployment or CI is involved", "GitHub Project setup is needed", "runtime operations need documentation", "environment risk exists"],
      beforeActing: ["../AGENT.md", "../area.yaml", "../knowledge/environments.md", "../knowledge/deployment-readiness.md", "../knowledge/ci-cd.md", "../knowledge/observability.md", "../../../.github/leanos/project-sync.yaml"],
      skills: ["configure-environments", "setup-ci", "plan-deployment", "define-observability", "prepare-release"],
      playbooks: ["setup-ci-cd", "plan-deployment", "configure-github-project", "configure-environments", "define-observability", "release-operations"]
    },
    {
      slug: "github-devops",
      title: "GitHub DevOps",
      purpose: "Guide safe GitHub repository, Project, labels and sync configuration without storing secrets.",
      useWhen: ["the founder wants to connect GitHub", "Epics/Features sync needs setup", "GitHub Project fields or labels need validation"],
      beforeActing: ["../AGENT.md", "../knowledge/github-management.md", "../../../.github/leanos/setup-guide.md", "../../../.github/leanos/capability-contract.md", "../../../.github/leanos/github-settings.example.json", "../../../.github/leanos/project-sync.yaml", "../../../.github/leanos/sync-state.yaml", "../../../.github/leanos/labels.yaml"],
      skills: ["configure-github-project"],
      playbooks: ["configure-github-project"]
    },
    {
      slug: "release-manager",
      title: "Release Manager",
      purpose: "Prepare release readiness across CI/CD, environments, deployment, rollback and post-release checks.",
      useWhen: ["a release needs readiness review", "a PR is close to merge", "post-merge continuation needs operational checks", "rollback or monitoring risk exists"],
      beforeActing: ["../AGENT.md", "../knowledge/release-notes.md", "../knowledge/deployment-readiness.md", "../knowledge/ci-cd.md", "../knowledge/observability.md", "../../product-ops/mvp/release-checklist.md"],
      skills: ["prepare-release", "plan-deployment", "define-observability"],
      playbooks: ["release-operations", "plan-deployment", "define-observability"]
    }
  ],
  skills: [
    {
      slug: "configure-github-project",
      title: "Configure GitHub Project",
      purpose: "Guide GitHub repository, Project fields, labels and token source setup without storing secrets.",
      useWhen: ["GitHub Project sync is requested", "repository/project mapping is unclear", "labels or milestones need setup", "local Epics/Features sync needs readiness checks"],
      requiredContext: ["DevOps AGENT", "GitHub setup guide", "GitHub capability contract", "GitHub management knowledge", "Project sync file", "Labels file", "Sync state file", "Repository owner/name", "Token source", "Epic/Feature sync intent"],
      inputs: ["Owner or organization", "Repository", "Project type", "Project URL or number", "Project fields", "Labels", "Milestone approach", "Token source", "Optional GitHub CLI auth status"],
      process: ["Load `.github/leanos/setup-guide.md` before asking setup questions", "Load `.github/leanos/capability-contract.md` before describing remote execution", "Check `project-sync.yaml` for TODO owner/repository/project values", "Check `labels.yaml` for minimum labels", "Check `sync-state.yaml` exists and contains no secrets", "Separate setup local, token readiness, Project readiness, labels/milestones readiness and dry-run readiness", "Confirm token source without asking for token values", "Prepare a readiness summary and proposed updates before writing"],
      checks: ["No token stored in workspace", "Founder never pastes token into chat", "Owner and repository are known", "Project type and URL or number are known", "Project fields are mapped", "Labels and milestones are declared or planned", "Dry-run required before write", "Duplicate sync risk is visible"],
      outputs: ["GitHub readiness summary", "Missing configuration", "Founder-friendly setup guidance", "Proposed project-sync update", "Token-source guidance", "Dry-run readiness", "Next action for GitHub Epics/Features sync"],
      filesToUpdate: ["Update `../knowledge/github-management.md` after confirmation.", "Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/labels.yaml` only after explicit confirmation."]
    },
    {
      slug: "configure-environments",
      title: "Configure Environments",
      purpose: "Define local, preview/staging and production boundaries without inventing infrastructure.",
      useWhen: ["environment variables are needed", "preview or production behavior is unclear", "secrets or integrations need boundaries"],
      requiredContext: ["Product stage", "Runtime needs", "Deployment target", "Secrets/integrations", "Access expectations"],
      inputs: ["Environment names", "Runtime variables", "Secret sources", "Access levels", "Preview/production expectations"],
      process: ["Separate local, preview/staging and production", "Classify config vs secret values", "Identify access owners", "List missing environment decisions", "Document open questions"],
      checks: ["Secrets are not written into markdown", "Production access is explicit", "Preview and production are not confused"],
      outputs: ["Environment map", "Config needs", "Secret handling guidance", "Access risks", "Open questions"],
      filesToUpdate: ["Update `../knowledge/environments.md` only after explicit confirmation."]
    },
    {
      slug: "setup-ci",
      title: "Setup CI",
      purpose: "Define build, test and validation automation before PRs are considered merge-ready.",
      useWhen: ["CI checks are missing", "PR validation needs automation", "branch protection or required checks need planning"],
      requiredContext: ["Repository structure", "Build command", "Test command", "PR validation rules", "Branch rules"],
      inputs: ["Build command", "Test command", "Lint/static checks", "Required PR checks", "Failure handling"],
      process: ["Identify available scripts", "Define minimum required checks", "Separate validation from deployment", "Document failure behavior", "Ask before changing workflow files"],
      checks: ["CI does not deploy automatically by default", "Required checks match project maturity", "Failures block unsafe merges"],
      outputs: ["CI readiness", "Required checks", "Workflow gaps", "Branch protection notes", "Next action"],
      filesToUpdate: ["Update `../knowledge/ci-cd.md` after confirmation.", "Update `.github/workflows/*` only after explicit user confirmation."]
    },
    {
      slug: "plan-deployment",
      title: "Plan Deployment",
      purpose: "Plan safe release and rollback flow without creating provider state automatically.",
      useWhen: ["deployment target is being discussed", "release readiness is unclear", "rollback or smoke checks are needed"],
      requiredContext: ["Product code/framework", "Environment plan", "CI/CD readiness", "Release scope", "Provider target when known"],
      inputs: ["Target environment", "Framework/app type", "Build/runtime config", "Release scope", "Rollback expectation"],
      process: ["Confirm app/framework exists", "Check Vercel/framework detection readiness", "Identify required env vars", "Define release gates", "Define rollback and smoke checks"],
      checks: ["No `.vercel/` creation", "No automatic deploy", "No `vercel.json` unless overrides are required", "Rollback path is explicit"],
      outputs: ["Deployment readiness", "Release gates", "Rollback notes", "Smoke checks", "Provider notes"],
      filesToUpdate: ["Update `../knowledge/deployment-readiness.md` only after explicit confirmation."]
    },
    {
      slug: "define-observability",
      title: "Define Observability",
      purpose: "Define runtime visibility for logs, errors, metrics, alerts and post-deploy checks.",
      useWhen: ["critical flows need monitoring", "release risk needs visibility", "support/debugging needs baseline signals"],
      requiredContext: ["Critical user flows", "Runtime architecture", "Failure modes", "Support expectations"],
      inputs: ["Critical flows", "Expected errors", "Important metrics", "Alert candidates", "Post-deploy checks"],
      process: ["Identify critical signals", "Define logs and errors", "Define metrics and alerts", "Define post-deploy checks", "List instrumentation gaps"],
      checks: ["Signals map to user or business risk", "Alerts are actionable", "Post-deploy checks are practical"],
      outputs: ["Observability baseline", "Critical signals", "Alert candidates", "Instrumentation gaps", "Next action"],
      filesToUpdate: ["Update `../knowledge/observability.md` only after explicit confirmation."]
    },
    {
      slug: "prepare-release",
      title: "Prepare Release",
      purpose: "Summarize release scope, readiness, risks, rollback and follow-up.",
      useWhen: ["a release is being prepared", "a PR is ready for merge", "post-merge checks are needed", "release notes are requested"],
      requiredContext: ["Linked issues", "PR validation result", "CI/CD readiness", "Deployment readiness", "Observability baseline"],
      inputs: ["Release scope", "Linked issues", "Tests/CI", "Deployment target", "Risks", "Rollback"],
      process: ["Summarize scope", "Check CI/CD and deployment readiness", "Check observability/post-deploy checks", "List risks and rollback", "Prepare follow-up notes"],
      checks: ["Release does not hide known risk", "Rollback is explicit", "Post-release checks are visible"],
      outputs: ["Release notes", "Readiness summary", "Risks", "Rollback notes", "Post-release checklist"],
      filesToUpdate: ["Update `../knowledge/release-notes.md` only after explicit confirmation."]
    }
  ],
  playbooks: [
    {
      slug: "setup-ci-cd",
      title: "Setup CI/CD",
      purpose: "Plan build, test and release automation for the workspace.",
      inputs: ["Repository structure", "Build command", "Test command", "Deployment target", "Required validation gates", "Skill: setup-ci"],
      steps: ["Read DevOps AGENT and choose DevOps Engineer", "Read `knowledge/ci-cd.md` and `.github/leanos/pr-validation-rules.md`", "Use `skills/setup-ci/SKILL.md` to identify build, test and validation gates", "Separate validation workflows from deployment automation", "Document secrets or environment needs without storing values", "Define failure handling and ask before changing workflow files"],
      outputs: ["CI/CD readiness", "Required checks", "Automation gaps", "Next action"],
      filesToUpdate: ["Update `../knowledge/ci-cd.md` after confirmation.", "Update `.github/workflows/*` only after explicit user confirmation."]
    },
    {
      slug: "plan-deployment",
      title: "Plan Deployment",
      purpose: "Plan a safe deployment path.",
      inputs: ["Release scope", "Target environment", "Current validation status", "Known risks", "Environment plan", "Skill: plan-deployment"],
      steps: ["Read DevOps AGENT and choose DevOps Engineer", "Read `knowledge/environments.md` and `knowledge/deployment-readiness.md`", "Confirm product code/framework exists before provider-specific deployment planning", "Use `skills/plan-deployment/SKILL.md` to define release gates, rollback and smoke checks", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or deploy automatically", "Ask before creating provider config or remote state"],
      outputs: ["Deployment readiness", "Deployment steps", "Risks", "Rollback notes", "Next action"],
      filesToUpdate: ["Update `../knowledge/deployment-readiness.md` after confirmation."]
    },
    {
      slug: "configure-github-project",
      title: "Configure GitHub Project",
      purpose: "Prepare GitHub settings for Epics/Features sync without calling the API directly from the model.",
      inputs: ["Founder GitHub owner or organization", "Repository name", "GitHub Project type", "GitHub Project URL or number", "Desired project fields", "Expected labels", "Milestone strategy", "Token source from environment, GitHub CLI, secure prompt or keychain", "Deployment target such as Vercel when known"],
      steps: ["Read DevOps AGENT and choose GitHub DevOps", "Read `knowledge/github-management.md`", "Read `../../../.github/leanos/setup-guide.md`", "Read `../../../.github/leanos/capability-contract.md`", "Read `../../../.github/leanos/github-settings.example.json`", "Review `../../../.github/leanos/project-sync.yaml`", "Review `../../../.github/leanos/labels.yaml` and `../../../.github/leanos/sync-state.yaml`", "Ask guided questions for missing owner, repository, Project type, Project URL/number and field mapping", "Explain where the founder can find owner/repository and Project URL/number", "Confirm token source without asking the user to paste secrets into chat or files", "If local tools are available and the founder allows it, use `gh auth status` only to validate auth status, not to expose credentials", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it", "Propose updates to GitHub management knowledge, project-sync and labels before writing", "Validate that sync-state remains secret-free", "End with whether GitHub Epics/Features sync is ready for dry-run"],
      outputs: ["GitHub readiness summary", "Missing configuration", "Founder-friendly setup instructions", "Proposed project-sync.yaml updates", "Proposed labels.yaml updates", "Token-source guidance without token values", "Vercel readiness notes", "Next action for GitHub Epics/Features sync"],
      filesToUpdate: ["Update `../knowledge/github-management.md` after confirmation.", "Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/labels.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/sync-state.yaml` only with non-secret sync metadata after a confirmed sync result."]
    },
    {
      slug: "configure-environments",
      title: "Configure Environments",
      purpose: "Plan environment boundaries and configuration without inventing project-specific infrastructure.",
      inputs: ["Product stage", "Runtime requirements", "Secrets or integration needs", "Deployment target"],
      steps: ["Read DevOps AGENT and choose DevOps Engineer", "Read `knowledge/environments.md`", "Use `skills/configure-environments/SKILL.md` to separate local, preview/staging and production", "List configuration needs", "Identify secrets and access boundaries without writing secret values", "Capture open questions"],
      outputs: ["Environment plan", "Configuration needs", "Access risks", "Open questions"],
      filesToUpdate: ["Update `../knowledge/environments.md` after explicit confirmation."]
    },
    {
      slug: "define-observability",
      title: "Define Observability",
      purpose: "Define runtime visibility for logs, metrics, alerts and traces.",
      inputs: ["Critical user flows", "Failure modes", "Runtime architecture", "Support needs"],
      steps: ["Read DevOps AGENT and choose DevOps Engineer", "Read `knowledge/observability.md`", "Use `skills/define-observability/SKILL.md` to identify logs, errors, metrics and alert candidates", "Define post-deploy checks", "List observability gaps"],
      outputs: ["Observability plan", "Critical signals", "Alert candidates", "Instrumentation gaps", "Next action"],
      filesToUpdate: ["Update `../knowledge/observability.md` after explicit confirmation."]
    },
    {
      slug: "release-operations",
      title: "Release Operations",
      purpose: "Prepare a release-ready operational path.",
      inputs: ["Release scope", "CI/CD readiness", "Environment plan", "Deployment plan", "Observability plan", "Skill: prepare-release"],
      steps: ["Read DevOps AGENT and choose Release Manager", "Read `knowledge/release-notes.md`, `knowledge/ci-cd.md`, `knowledge/deployment-readiness.md` and `knowledge/observability.md`", "Use `skills/prepare-release/SKILL.md` to summarize release scope and linked issues", "Check CI/CD readiness", "Confirm environment target", "Review deployment path and rollback", "Confirm observability and post-deploy checks", "Summarize release readiness"],
      outputs: ["Release readiness", "Blocking risks", "Rollback notes", "Post-release checks", "Next action"],
      filesToUpdate: ["Update `../knowledge/release-notes.md` after explicit confirmation."]
    }
  ],
  commonPaths: [
    "GitHub setup request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/configure-github-project/SKILL.md` -> playbook `playbooks/configure-github-project.playbook.md`.",
    "Environment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/configure-environments/SKILL.md` -> playbook `playbooks/configure-environments.playbook.md`.",
    "Deployment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment/SKILL.md` -> playbook `playbooks/plan-deployment.playbook.md`.",
    "CI request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/setup-ci/SKILL.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.",
    "Observability request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/define-observability/SKILL.md` -> playbook `playbooks/define-observability.playbook.md`.",
    "Release request: area lead `AGENT.md` -> role `roles/release-manager.role.md` -> skill `skills/prepare-release/SKILL.md` -> playbook `playbooks/release-operations.playbook.md`."
  ]
};
