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
      filesToUpdate: ["Update `../knowledge/github-management.md` after confirmation.", "Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/labels.yaml` only after explicit confirmation."],
      redLines: ["Do not ask the founder to paste tokens into chat or files.", "Do not perform remote GitHub writes without explicit confirmation and dry-run readiness.", "Do not make GitHub the primary source of truth over local Epics and Features."]
    },
    {
      slug: "configure-environments",
      title: "Configure Environments",
      purpose: "Define local, preview/staging and production boundaries with explicit readiness status and secret handling.",
      useWhen: ["environment variables are needed", "preview or production behavior is unclear", "secrets or integrations need boundaries", "deployment or CI depends on runtime configuration"],
      requiredContext: ["Product stage", "Runtime needs", "Deployment target", "Secrets/integrations", "Access expectations", "Existing env examples or provider settings when available"],
      inputs: ["Environment names", "Runtime variables", "Secret sources", "Access levels", "Preview/production expectations", "Provider or CI secret mechanism when known"],
      process: ["Separate local, preview/staging and production", "Classify each value as public config, private config or secret", "Map the source of truth and owner for each secret", "Identify which values are required for build, test, preview and production runtime", "List missing environment decisions and who must answer them", "Mark Environment readiness status as ready, blocked-by-secrets, blocked-by-provider or blocked-by-unknowns", "Document open questions without storing secret values"],
      checks: ["Secrets are not written into markdown", "Every secret has a source and access owner or is explicitly blocked", "Production access is explicit", "Preview and production are not confused", "Readiness status matches the known config and secret gaps"],
      outputs: ["Environment readiness status", "Environment map", "Config needs", "Secret handling guidance", "Access risks", "Provider/CI secret notes", "Open questions"],
      filesToUpdate: ["Update `../knowledge/environments.md` only after explicit confirmation."],
      redLines: ["Do not write secret values into markdown, `.env` or generated instructions.", "Do not invent environment names, access owners or provider details without confirmation.", "Do not confuse preview/staging behavior with production behavior.", "Do not mark environments ready while required secrets, owners or provider targets are unknown."]
    },
    {
      slug: "setup-ci",
      title: "Setup CI",
      purpose: "Define build, test and validation automation with an explicit CI gate decision before PRs are considered merge-ready.",
      useWhen: ["CI checks are missing", "PR validation needs automation", "branch protection or required checks need planning", "existing checks are flaky or unclear"],
      requiredContext: ["Repository structure", "Build command", "Test command", "PR validation rules", "Branch rules", "Existing workflow files when present"],
      inputs: ["Build command", "Test command", "Lint/static checks", "Required PR checks", "Failure handling", "Current local validation evidence"],
      process: ["Identify available scripts and existing workflow files", "Confirm the local command for each proposed required check", "Define minimum required checks by repository maturity", "Separate validation from deployment", "Define failure behavior and merge blocking behavior", "Mark CI gate decision as enable-now, defer-with-reason, blocked or not-applicable", "Ask before changing workflow files"],
      checks: ["CI does not deploy automatically by default", "Every required check has a known command or explicit gap", "Required checks match project maturity", "Failures block unsafe merges", "Flaky or unavailable checks are not made required without an owner"],
      outputs: ["CI readiness", "CI gate decision", "Required checks", "Validation evidence", "Workflow gaps", "Branch protection notes", "Next action"],
      filesToUpdate: ["Update `../knowledge/ci-cd.md` after confirmation.", "Update `.github/workflows/*` only after explicit user confirmation."],
      redLines: ["Do not create CI workflows before stable build and test commands are known.", "Do not deploy from validation workflows by default.", "Do not add required checks that cannot run reliably in the current repository.", "Do not call a PR merge-ready when CI gate status is blocked or unknown."]
    },
    {
      slug: "plan-deployment",
      title: "Plan Deployment",
      purpose: "Plan safe release, smoke checks and rollback flow without creating provider state automatically.",
      useWhen: ["deployment target is being discussed", "release readiness is unclear", "rollback or smoke checks are needed", "provider configuration might be required"],
      requiredContext: ["Product code/framework", "Environment plan", "CI/CD readiness", "Release scope", "Provider target when known", "Rollback expectation"],
      inputs: ["Target environment", "Framework/app type", "Build/runtime config", "Release scope", "Rollback expectation", "Smoke-check expectations"],
      process: ["Confirm app/framework exists", "Check provider/framework detection readiness without linking remote state", "Identify required env vars and missing deployment decisions", "Define release gates and required validation evidence", "Define smoke checks with expected results", "Define rollback path and owner", "Mark Deploy/no-deploy decision as ready, blocked-by-env, blocked-by-ci, blocked-by-rollback or blocked-by-provider"],
      checks: ["No `.vercel/` creation", "No automatic deploy", "No `vercel.json` unless overrides are required", "Rollback path is explicit", "Smoke checks are concrete enough to execute", "Deploy/no-deploy decision reflects environment, CI and rollback readiness"],
      outputs: ["Deployment readiness", "Deploy/no-deploy decision", "Release gates", "Rollback notes", "Smoke checks", "Provider notes", "Open blockers"],
      filesToUpdate: ["Update `../knowledge/deployment-readiness.md` only after explicit confirmation."],
      redLines: ["Do not deploy, link providers or create remote state from this skill.", "Do not create provider config unless a real app/framework requires it.", "Do not declare deployment ready without environment, rollback and smoke-check notes.", "Do not hide no-deploy blockers behind generic provider notes."]
    },
    {
      slug: "define-observability",
      title: "Define Observability",
      purpose: "Define runtime visibility for logs, errors, metrics, alerts and post-deploy checks with owners and actions.",
      useWhen: ["critical flows need monitoring", "release risk needs visibility", "support/debugging needs baseline signals", "post-deploy confidence depends on runtime evidence"],
      requiredContext: ["Critical user flows", "Runtime architecture", "Failure modes", "Support expectations", "Release or incident risk"],
      inputs: ["Critical flows", "Expected errors", "Important metrics", "Alert candidates", "Post-deploy checks", "Owners or response expectations"],
      process: ["Identify critical user and business flows", "Map each flow to logs, errors, metrics or traces", "Define alert candidates only when an owner and action exist", "Define post-deploy checks with expected results", "Classify signals as enable-now, defer-with-reason or not-applicable", "List instrumentation gaps and owner/action needs", "Flag sensitive data that must not be logged"],
      checks: ["Signals map to user or business risk", "Each alert has an owner and action or stays deferred", "Post-deploy checks are practical", "Sensitive data is excluded from logs and alerts", "Instrumentation gaps are not represented as verified visibility"],
      outputs: ["Observability baseline", "Signal owner/action map", "Critical signals", "Alert candidates", "Post-deploy checks", "Instrumentation gaps", "Next action"],
      filesToUpdate: ["Update `../knowledge/observability.md` only after explicit confirmation."],
      redLines: ["Do not log secrets, credentials, tokens or sensitive customer data.", "Do not create noisy alerts that have no clear owner or action.", "Do not treat instrumentation guesses as verified runtime visibility.", "Do not mark release visibility ready without post-deploy checks or known gaps."]
    },
    {
      slug: "prepare-release",
      title: "Prepare Release",
      purpose: "Summarize release scope, readiness, risks, rollback, post-release checks and release decision.",
      useWhen: ["a release is being prepared", "a PR is ready for merge", "post-merge checks are needed", "release notes are requested"],
      requiredContext: ["Linked issues", "PR validation result", "CI/CD readiness", "Deployment readiness", "Observability baseline", "Known risks"],
      inputs: ["Release scope", "Linked issues", "Tests/CI", "Deployment target", "Risks", "Rollback", "Post-release checks"],
      process: ["Summarize scope and linked issues", "Check PR validation, tests and CI/CD readiness", "Check deployment readiness and environment status", "Check observability and post-release checks", "List known risks, test gaps and rollback gaps", "Mark Release readiness status as ready, blocked-by-tests, blocked-by-deploy, blocked-by-rollback or blocked-by-risk", "Prepare release notes and follow-up notes"],
      checks: ["Release does not hide known risk", "Tests/CI or explicit test gaps are present", "Rollback is explicit", "Post-release checks are visible", "Release readiness status matches blockers"],
      outputs: ["Release readiness status", "Release notes", "Readiness summary", "Validation evidence", "Risks", "Rollback notes", "Post-release checklist"],
      filesToUpdate: ["Update `../knowledge/release-notes.md` only after explicit confirmation."],
      redLines: ["Do not hide known release risks, test gaps or rollback gaps.", "Do not mark a release ready without tests/CI or explicit test gaps.", "Do not mark a release ready without post-release checks.", "Do not merge, deploy or change remote state automatically."]
    }
  ];
