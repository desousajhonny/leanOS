import type { SkillDefinition } from "../../../../types.js";

export const operationsDevopsSkills: SkillDefinition[] = [
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
  ];
