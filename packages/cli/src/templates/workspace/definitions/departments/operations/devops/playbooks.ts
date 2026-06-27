import type { PlaybookDefinition } from "../../../../types.js";

export const operationsDevopsPlaybooks: PlaybookDefinition[] = [
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
  ];
