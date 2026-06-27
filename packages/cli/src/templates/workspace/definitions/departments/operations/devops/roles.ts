import type { RoleDefinition } from "../../../../types.js";

export const operationsDevopsRoles: RoleDefinition[] = [
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
  ];
