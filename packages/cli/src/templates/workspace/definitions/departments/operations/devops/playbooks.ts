import type { PlaybookDefinition } from "../../../../types.js";

export const operationsDevopsPlaybooks: PlaybookDefinition[] = [
    {
      slug: "ci-pipeline-cd",
      title: "Configurar CI/CD",
      purpose: "Plan build, test and release automation for the workspace.",
      inputs: ["Repository structure", "Comando de build", "Comando de teste", "Deployment target", "Required validation gates", "Skill: ci-pipeline", "Skill: branch-protection quando required checks virarem gate de merge"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/ci-cd.md` and `.github/leanos/pr-validation-rules.md`", "Use `skills/ci-pipeline/SKILL.md` to identify build, test and validation gates", "Use `skills/branch-protection/SKILL.md` only after PR validation has run at least once and required checks are known", "Separate validation workflows from deployment automation", "Document secrets or environment needs without storing values", "Define failure handling and ask before changing workflow files or remote branch protection"],
      outputs: ["CI/CD readiness", "Checks obrigatórios", "Branch protection readiness", "Automation gaps", "Próxima ação"],
      filesToUpdate: ["Atualize `../knowledge/ci-cd.md` após confirmação.", "Atualize `.github/workflows/*` somente após confirmação explícita do usuário."]
    },
    {
      slug: "deployment-readiness",
      title: "Planejar Deploy",
      purpose: "Plan a safe deployment path.",
      inputs: ["Escopo de release", "Ambiente alvo", "Current validation status", "Riscos conhecidos", "Plano de ambiente", "Skill: deployment-readiness"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Leia `knowledge/environments.md` e `knowledge/deployment-readiness.md`", "Confirme se código/framework de produto existe antes de planejamento de deployment específico de provider", "Use `skills/deployment-readiness/SKILL.md` para definir gates de release, rollback e smoke checks", "Documente prontidão de Vercel apenas como orientação; não crie `.vercel/`, rode `vercel link` nem faça deploy automaticamente", "Peça confirmação antes de criar config de provider ou estado remoto"],
      outputs: ["Prontidão de deploy", "Deployment steps", "Risks", "Notas de rollback", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/deployment-readiness.md` after confirmation."]
    },
    {
      slug: "github-project-management",
      title: "Configurar GitHub Project",
      purpose: "Prepare GitHub settings for Epics/Features sync without calling the API directly from the model.",
      inputs: ["Founder GitHub owner or organization", "Repository name", "Repository mode", "README status", "README source", "GitHub Project type", "GitHub Project URL or number", "Desired project fields", "Expected labels", "Milestone strategy", "Fonte do token from environment, GitHub CLI, secure prompt or keychain", "Deployment target such as Vercel when known"],
      steps: ["Read DevOps AGENT and choose GitHub DevOps", "Read `knowledge/github-management.md`", "Read `.github/leanos/setup-guide.md`", "Read `.github/leanos/capability-contract.md`", "Read `.github/leanos/github-settings.example.json`", "Review `.github/leanos/project-sync.yaml`", "Review `.github/leanos/labels.yaml` and `.github/leanos/sync-state.yaml`", "Check Repository mode and README status before repository bootstrap", "For Repository mode `new`, require README-ready before creating, publishing or connecting a new GitHub repository", "If README status is missing, draft or unclear, stop DevOps and route to Strategy Product -> Product Narrative Editor -> product-readme", "Não crie ou publique um novo repositório GitHub sem README product-first confirmado", "Ask guided questions for missing owner, repository, Project type, Project URL/number and field mapping", "Confirm Project fields Status, Priority, Size, Effort, Area, Roadmap Item and Epic", "Explain where the founder can find owner/repository and Project URL/number", "Confirm token source without asking the user to paste secrets into chat or files", "Confirm that Epics/Features sync dry-run must include rich body, milestone, Project fields and relationships before remote write", "Confirm that the capability must run Read-back verification after remote write", "Confirm that the local file patch may set `github_issue.url` and `sync_status: synced` only after verification passes", "If local tools are available and the founder allows it, use `gh auth status` only to validate auth status, not to expose credentials", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it", "Propose updates to GitHub management knowledge, project-sync and labels before writing", "Validate that sync-state remains secret-free", "End with whether GitHub Epics/Features sync is ready for dry-run and verified writeback"],
      outputs: ["Resumo de prontidão do GitHub", "README status e README-ready", "Configuração ausente", "Founder-friendly setup instructions", "Proposed project-sync.yaml updates", "Proposed labels.yaml updates", "Orientação de fonte de token without token values", "Read-back verification requirements", "Local file patch requirements", "Vercel readiness notes", "Próxima ação para sync de Epics/Features no GitHub"],
      filesToUpdate: ["Atualize `../knowledge/github-management.md` após confirmação.", "Atualize `.github/leanos/project-sync.yaml` somente após confirmação explícita.", "Atualize `.github/leanos/labels.yaml` somente após confirmação explícita.", "Update `.github/leanos/sync-state.yaml` only with non-secret sync metadata after a confirmed sync result."]
    },
    {
      slug: "github-safety-baseline",
      title: "GitHub Safety Baseline",
      purpose: "Preparar o baseline seguro de GitHub para founder operar delivery com README-ready, Repository profile, PR validation workflow, labels e branch protection.",
      inputs: ["Repository owner/name", "Repository mode", "README status", "Repository profile atual", "Scripts disponíveis", "Branch principal", "PR validation workflow", "Resultado da primeira execução de PR validation", "Skill: repository-profile", "Skill: ci-pipeline", "Skill: branch-protection"],
      steps: ["Leia DevOps AGENT e escolha GitHub DevOps", "Leia `knowledge/github-management.md`, `.github/leanos/setup-guide.md` e `.github/leanos/capability-contract.md`", "Confirme README-ready antes de repository profile público ou mudanças remotas de setup; se faltar, roteie para Strategy Product -> Product Narrative Editor -> product-readme", "Use `skills/repository-profile/SKILL.md` para preparar Repository profile description, website e topics a partir da narrativa product-first", "Confirme que `.github/PULL_REQUEST_TEMPLATE.md`, `.github/leanos/branch-rules.md` e `.github/leanos/pr-validation-rules.md` existem", "Use `skills/ci-pipeline/SKILL.md` para avaliar o PR validation workflow e os scripts disponíveis", "Confirme que o PR validation workflow está presente e consegue rodar install, lint, typecheck, tests, build, secret scan e LeanOS structure check quando aplicável", "Não aplique branch protection até que PR validation rode ao menos uma vez e os required checks estejam visíveis", "Use `skills/branch-protection/SKILL.md` para propor require PR before merge, required status checks, branch up to date, resolved conversations, stale approval dismissal, force-push block e deletion block", "Prepare dry-run summaries para repository profile e branch protection antes de escritas remotas", "Peça confirmação explícita do founder antes de qualquer escrita via GitHub API"],
      outputs: ["GitHub Safety Baseline status", "Repository profile", "PR validation workflow readiness", "Required checks proposal", "Branch protection readiness", "Remote dry-run summary", "Bloqueios abertos", "Próxima ação segura"],
      filesToUpdate: ["Atualize `../knowledge/github-management.md` após confirmação.", "Atualize `../knowledge/ci-cd.md` quando checks obrigatórios mudarem.", "Atualize `.github/workflows/pr-validation.yml` somente após confirmação explícita.", "Não atualize estado remoto sem confirmação explícita."]
    },
    {
      slug: "environment-management",
      title: "Configurar Ambientes",
      purpose: "Plan environment boundaries and configuration without inventing project-specific infrastructure.",
      inputs: ["Product stage", "Runtime requirements", "Secrets or integration needs", "Deployment target"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/environments.md`", "Use `skills/environment-management/SKILL.md` to separate local, preview/staging and production", "List configuration needs", "Identify secrets and access boundaries without writing secret values", "Capture open questions"],
      outputs: ["Plano de ambiente", "Configuration needs", "Riscos de acesso", "Perguntas abertas"],
      filesToUpdate: ["Update `../knowledge/environments.md` after explicit confirmation."]
    },
    {
      slug: "observability",
      title: "Definir Observabilidade",
      purpose: "Define runtime visibility for logs, metrics, alerts and traces.",
      inputs: ["Fluxos críticos de usuário", "Modos de falha", "Arquitetura de runtime", "Support needs"],
      steps: ["Leia o AGENT de DevOps e escolha DevOps Engineer", "Read `knowledge/observability.md`", "Use `skills/observability/SKILL.md` to identify logs, errors, metrics and alert candidates", "Define post-deploy checks", "List observability gaps"],
      outputs: ["Observability plan", "Sinais críticos", "Candidatos a alerta", "Lacunas de instrumentação", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/observability.md` after explicit confirmation."]
    },
    {
      slug: "release-operations",
      title: "Release Operations",
      purpose: "Prepare a release-ready operational path.",
      inputs: ["Escopo de release", "CI/CD readiness", "Plano de ambiente", "Deployment plan", "Observability plan", "Tag proposta", "GitHub Release target", "Skill: release-readiness"],
      steps: ["Read DevOps AGENT and choose Release Manager", "Read `knowledge/release-notes.md`, `knowledge/ci-cd.md`, `knowledge/deployment-readiness.md` and `knowledge/observability.md`", "Use `skills/release-readiness/SKILL.md` to summarize release scope and linked issues", "Check CI/CD readiness", "Confirm environment target", "Review deployment path and rollback", "Confirm observability and post-deploy checks", "Prepare tag and GitHub Release notes only when `ready-for-launch` or release readiness has passed", "Summarize release readiness"],
      outputs: ["Release readiness", "Tag proposta", "GitHub Release notes", "Blocking risks", "Notas de rollback", "Post-release checks", "Próxima ação"],
      filesToUpdate: ["Update `../knowledge/release-notes.md` after explicit confirmation."]
    }
  ];
