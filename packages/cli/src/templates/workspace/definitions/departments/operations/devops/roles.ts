import type { RoleDefinition } from "../../../../types.js";

export const operationsDevopsRoles: RoleDefinition[] = [
    {
      slug: "devops-engineer",
      title: "DevOps Engineer",
      purpose: "Prepare release, environment, GitHub workflow and observability practices.",
      useWhen: ["deployment or CI is involved", "GitHub Project setup is needed", "runtime operations need documentation", "environment risk exists"],
      beforeActing: ["../AGENT.md", "../area.yaml", "../knowledge/environments.md", "../knowledge/deployment-readiness.md", "../knowledge/ci-cd.md", "../knowledge/observability.md", ".github/leanos/project-sync.yaml"],
      skills: ["environment-management", "ci-pipeline", "branch-protection", "deployment-readiness", "observability", "release-readiness"],
      playbooks: ["ci-pipeline-cd", "github-safety-baseline", "deployment-readiness", "github-project-management", "environment-management", "observability", "release-operations"]
    },
    {
      slug: "github-devops",
      title: "GitHub DevOps",
      purpose: "Guide safe GitHub repository, Project, labels and sync configuration without storing secrets, and require README product-first confirmado before a novo repositório GitHub is created or published.",
      useWhen: ["the founder wants to connect GitHub", "um novo repositório GitHub precisa ser criado ou preparado", "Epics/Features sync needs setup", "GitHub Project fields or labels need validation"],
      beforeActing: ["../AGENT.md", "../knowledge/github-management.md", "../../../README.md", "Strategy Product -> Product Narrative Editor -> product-readme", ".github/leanos/setup-guide.md", ".github/leanos/capability-contract.md", ".github/leanos/github-settings.example.json", ".github/leanos/project-sync.yaml", ".github/leanos/sync-state.yaml", ".github/leanos/labels.yaml", "../skills/repository-profile/SKILL.md", "../skills/branch-protection/SKILL.md", "../playbooks/github-safety-baseline.playbook.md"],
      skills: ["github-project-management", "repository-profile", "branch-protection"],
      playbooks: ["github-project-management", "github-safety-baseline"],
      outputs: ["Resumo de prontidão do GitHub", "README status e README-ready para novo repositório", "Repository profile seguro", "Configuração segura de repositório/Project/labels", "Branch protection readiness", "Próxima ação sem expor segredos"],
      redLines: ["Não crie ou publique um novo repositório GitHub sem README product-first confirmado.", "Não invente narrativa de produto em DevOps; roteie para Strategy Product -> Product Narrative Editor -> product-readme.", "Não armazene tokens, segredos ou credenciais em arquivos do workspace."]
    },
    {
      slug: "release-manager",
      title: "Release Manager",
      purpose: "Prepare release readiness across CI/CD, environments, deployment, rollback and post-release checks.",
      useWhen: ["a release needs readiness review", "a PR is close to merge", "post-merge continuation needs operational checks", "rollback or monitoring risk exists"],
      beforeActing: ["../AGENT.md", "../knowledge/release-notes.md", "../knowledge/deployment-readiness.md", "../knowledge/ci-cd.md", "../knowledge/observability.md", "../../product-ops/mvp/release-checklist.md"],
      skills: ["release-readiness", "deployment-readiness", "observability"],
      playbooks: ["release-operations", "deployment-readiness", "observability"]
    }
  ];
