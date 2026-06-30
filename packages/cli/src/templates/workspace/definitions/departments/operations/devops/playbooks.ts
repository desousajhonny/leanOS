import type { PlaybookDefinition } from "../../../../types.js";

export const operationsDevopsPlaybooks: PlaybookDefinition[] = [
    {
      slug: "setup-ci-cd",
      title: "Configurar CI/CD",
      purpose: "Plan build, test and release automation for the workspace.",
      inputs: ["Repository structure", "Comando de build", "Comando de teste", "Deployment target", "Required validation gates", "Skill: setup-ci"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/ci-cd.md` and `.github/leanos/pr-validation-rules.md`", "Use `skills/setup-ci/SKILL.md` to identify build, test and validation gates", "Separate validation workflows from deployment automation", "Document secrets or environment needs without storing values", "Define failure handling and ask before changing workflow files"],
      outputs: ["CI/CD readiness", "Checks obrigatórios", "Automation gaps", "Próxima ação"],
      filesToUpdate: ["Atualize `../knowledge/ci-cd.md` após confirmação.", "Atualize `.github/workflows/*` somente após confirmação explícita do usuário."]
    },
    {
      slug: "plan-deployment",
      title: "Planejar Deploy",
      purpose: "Plan a safe deployment path.",
      inputs: ["Escopo de release", "Ambiente alvo", "Current validation status", "Riscos conhecidos", "Plano de ambiente", "Skill: plan-deployment"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Leia `knowledge/environments.md` e `knowledge/deployment-readiness.md`", "Confirme se código/framework de produto existe antes de planejamento de deployment específico de provider", "Use `skills/plan-deployment/SKILL.md` para definir gates de release, rollback e smoke checks", "Documente prontidão de Vercel apenas como orientação; não crie `.vercel/`, rode `vercel link` nem faça deploy automaticamente", "Peça confirmação antes de criar config de provider ou estado remoto"],
      outputs: ["Prontidão de deploy", "Deployment steps", "Risks", "Notas de rollback", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/deployment-readiness.md` after confirmation."]
    },
    {
      slug: "configure-github-project",
      title: "Configurar GitHub Project",
      purpose: "Prepare GitHub settings for Epics/Features sync without calling the API directly from the model.",
      inputs: ["Founder GitHub owner or organization", "Repository name", "GitHub Project type", "GitHub Project URL or number", "Desired project fields", "Expected labels", "Milestone strategy", "Fonte do token from environment, GitHub CLI, secure prompt or keychain", "Deployment target such as Vercel when known"],
      steps: ["Read DevOps AGENT and choose GitHub DevOps", "Read `knowledge/github-management.md`", "Read `.github/leanos/setup-guide.md`", "Read `.github/leanos/capability-contract.md`", "Read `.github/leanos/github-settings.example.json`", "Review `.github/leanos/project-sync.yaml`", "Review `.github/leanos/labels.yaml` and `.github/leanos/sync-state.yaml`", "Ask guided questions for missing owner, repository, Project type, Project URL/number and field mapping", "Confirm Project fields Status, Priority, Size, Effort, Area, Roadmap Item and Epic", "Explain where the founder can find owner/repository and Project URL/number", "Confirm token source without asking the user to paste secrets into chat or files", "Confirm that Epics/Features sync dry-run must include rich body, milestone, Project fields and relationships before remote write", "Confirm that the capability must run Read-back verification after remote write", "Confirm that the local file patch may set `github_issue.url` and `sync_status: synced` only after verification passes", "If local tools are available and the founder allows it, use `gh auth status` only to validate auth status, not to expose credentials", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it", "Propose updates to GitHub management knowledge, project-sync and labels before writing", "Validate that sync-state remains secret-free", "End with whether GitHub Epics/Features sync is ready for dry-run and verified writeback"],
      outputs: ["Resumo de prontidão do GitHub", "Configuração ausente", "Founder-friendly setup instructions", "Proposed project-sync.yaml updates", "Proposed labels.yaml updates", "Orientação de fonte de token without token values", "Read-back verification requirements", "Local file patch requirements", "Vercel readiness notes", "Próxima ação para sync de Epics/Features no GitHub"],
      filesToUpdate: ["Atualize `../knowledge/github-management.md` após confirmação.", "Atualize `.github/leanos/project-sync.yaml` somente após confirmação explícita.", "Atualize `.github/leanos/labels.yaml` somente após confirmação explícita.", "Update `.github/leanos/sync-state.yaml` only with non-secret sync metadata after a confirmed sync result."]
    },
    {
      slug: "configure-environments",
      title: "Configurar Ambientes",
      purpose: "Plan environment boundaries and configuration without inventing project-specific infrastructure.",
      inputs: ["Product stage", "Runtime requirements", "Secrets or integration needs", "Deployment target"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/environments.md`", "Use `skills/configure-environments/SKILL.md` to separate local, preview/staging and production", "List configuration needs", "Identify secrets and access boundaries without writing secret values", "Capture open questions"],
      outputs: ["Plano de ambiente", "Configuration needs", "Riscos de acesso", "Perguntas abertas"],
      filesToUpdate: ["Update `../knowledge/environments.md` after explicit confirmation."]
    },
    {
      slug: "define-observability",
      title: "Definir Observabilidade",
      purpose: "Define runtime visibility for logs, metrics, alerts and traces.",
      inputs: ["Fluxos críticos de usuário", "Modos de falha", "Arquitetura de runtime", "Support needs"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/observability.md`", "Use `skills/define-observability/SKILL.md` to identify logs, errors, metrics and alert candidates", "Define post-deploy checks", "List observability gaps"],
      outputs: ["Observability plan", "Sinais críticos", "Candidatos a alerta", "Lacunas de instrumentação", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/observability.md` after explicit confirmation."]
    },
    {
      slug: "release-operations",
      title: "Release Operations",
      purpose: "Prepare a release-ready operational path.",
      inputs: ["Escopo de release", "CI/CD readiness", "Plano de ambiente", "Deployment plan", "Observability plan", "Skill: prepare-release"],
      steps: ["Read DevOps AGENT and choose Release Manager", "Read `knowledge/release-notes.md`, `knowledge/ci-cd.md`, `knowledge/deployment-readiness.md` and `knowledge/observability.md`", "Use `skills/prepare-release/SKILL.md` to summarize release scope and linked issues", "Check CI/CD readiness", "Confirm environment target", "Review deployment path and rollback", "Confirm observability and post-deploy checks", "Summarize release readiness"],
      outputs: ["Release readiness", "Blocking risks", "Notas de rollback", "Post-release checks", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/release-notes.md` after explicit confirmation."]
    }
  ];
