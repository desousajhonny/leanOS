import type { SkillDefinition } from "../../../../types.js";

export const operationsDevopsSkills: SkillDefinition[] = [
    {
      slug: "configure-github-project",
      title: "Configurar GitHub Project",
      purpose: "Guiar configuração de repositório GitHub, campos do Project, labels e fonte de token sem armazenar segredos.",
      useWhen: ["sync de GitHub Project foi solicitado", "novo repositório GitHub precisa ser criado, preparado ou publicado", "mapeamento de repositório/project está incerto", "labels ou milestones precisam de configuração", "sync local de Epics/Features precisa de checks de prontidão"],
      requiredContext: ["DevOps AGENT", "GitHub setup guide", "GitHub capability contract", "GitHub management knowledge", "README.md raiz", "Strategy Product -> Product Narrative Editor -> write-product-readme", "Project sync file", "Labels file", "Sync state file", "Repository owner/name", "Fonte do token", "Intenção de sync de Epic/Feature"],
      inputs: ["Owner ou organização", "Repository", "Repository mode", "README status", "README source", "Project type", "Project URL or number", "Project fields", "Labels", "Milestone approach", "Fonte do token", "Status opcional de auth do GitHub CLI"],
      process: ["Carregue `.github/leanos/setup-guide.md` antes de fazer perguntas de setup", "Carregue `.github/leanos/capability-contract.md` antes de descrever execução remota", "Verifique `../knowledge/github-management.md` por Repository mode, README status e README source", "Quando Repository mode for `new`, confirme `README-ready` antes de criar, publicar ou conectar um novo repositório GitHub", "Se README status for missing, draft ou incerto, pare DevOps e roteie para Strategy Product -> Product Narrative Editor -> write-product-readme", "Verifique `project-sync.yaml` por valores TODO de owner/repository/project", "Verifique `labels.yaml` por labels mínimas", "Verifique que `sync-state.yaml` existe e não contém segredos", "Separe setup local, prontidão de README, prontidão de token, prontidão de Project, prontidão de labels/milestones e prontidão de dry-run", "Confirme que fields de Project incluem Status, Priority, Size, Effort, Area, Roadmap Item e Epic", "Confirme que o dry-run inclui body rico, milestone, Project fields e relacionamentos", "Exija Read-back verification antes de aceitar sync remoto como concluído", "Garanta que a capability retorne local file patch com `github_issue.url` e `sync_status: synced` somente após verificação", "Confirme a fonte do token sem pedir valores de token", "Prepare um resumo de prontidão e atualizações propostas antes de escrever"],
      checks: ["Nenhum token armazenado no workspace", "O founder nunca cola token no chat", "Owner e repositório são conhecidos", "Repository mode está explícito como existing ou new", "README status está explícito", "Novo repositório só avança quando README-ready estiver confirmado", "Tipo do Project e URL ou número são conhecidos", "Campos do Project estão mapeados", "Campo Effort está mapeado ou o bloqueio está claro", "Labels e milestones estão declarados ou planejados", "Dry-run obrigatório antes de escrita", "Read-back verification obrigatória depois da escrita", "Patch local só marca `synced` depois de verificação remota", "Risco de sync duplicado está visível"],
      outputs: ["Resumo de prontidão do GitHub", "README status e README-ready", "Configuração ausente", "Orientação de setup amigável ao founder", "Atualização proposta de project-sync", "Orientação de fonte de token", "Prontidão de dry-run", "Critério de Read-back verification", "Regras de local file patch", "Próxima ação para sync de Epics/Features no GitHub"],
      filesToUpdate: ["Atualize `../knowledge/github-management.md` após confirmação.", "Não atualize `../../../README.md` a partir de DevOps; quando o README faltar ou estiver fraco, roteie para Strategy Product.", "Atualize `.github/leanos/project-sync.yaml` somente após confirmação explícita.", "Atualize `.github/leanos/labels.yaml` somente após confirmação explícita."],
      redLines: ["Não crie ou publique um novo repositório GitHub sem README product-first confirmado.", "Não invente narrativa de produto em DevOps; use Strategy Product -> Product Narrative Editor -> write-product-readme.", "Não peça ao founder para colar tokens no chat ou em arquivos.", "Não faça escritas remotas no GitHub sem confirmação explícita e prontidão de dry-run.", "Não torne o GitHub a fonte primária da verdade acima de Epics e Features locais."]
    },
    {
      slug: "configure-environments",
      title: "Configurar Ambientes",
      purpose: "Definir limites de local, preview/staging e produção com status explícito de prontidão e tratamento de segredos.",
      useWhen: ["variáveis de ambiente são necessárias", "comportamento de preview ou produção está incerto", "segredos ou integrações precisam de limites", "deploy ou CI depende de configuração de runtime", "billing provider price IDs, checkout webhooks ou subscription config precisam de ambiente", "paid providers, quotas, budgets or usage caps precisam de mapeamento"],
      requiredContext: ["Product stage", "Runtime needs", "Deployment target", "Secrets/integrations", "Access expectations", "Growth Finance pricing catalog quando billing ou entitlement existir", "Growth Finance spend ledger quando provider pago ou custo usage-based existir", "Exemplos de env existentes ou settings de provider quando disponíveis"],
      inputs: ["Nomes de ambiente", "Variáveis de runtime", "Fontes de segredo", "Níveis de acesso", "Expectativas de preview/produção", "billing provider price IDs", "paid providers, quotas, budgets or usage caps", "Webhook/event sources", "Mecanismo de segredo do provider ou CI quando conhecido"],
      process: ["Separe local, preview/staging e produção", "Classifique cada valor como config pública, config privada ou segredo", "Mapeie a fonte da verdade e owner de cada segredo", "Quando billing existir, mapeie provider IDs, price IDs, webhook secrets, runtime config e owner sem escrever valores secretos", "Quando provider pago ou custo usage-based existir, mapeie quotas, budgets, usage caps, cost alerts e owner em `../knowledge/environments.md` e roteie decisão de gasto para Growth Finance", "Identifique quais valores são obrigatórios para build, teste, preview e runtime de produção", "Liste decisões de ambiente ausentes e quem deve respondê-las", "Marque status de prontidão de ambiente como ready, blocked-by-secrets, blocked-by-provider ou blocked-by-unknowns", "Documente perguntas abertas sem armazenar valores secretos"],
      checks: ["Segredos não são escritos em markdown", "Todo segredo tem fonte e owner de acesso ou está explicitamente bloqueado", "Price IDs e provider IDs têm fonte e ambiente declarados quando billing existe", "Paid providers, quotas, budgets e usage caps têm owner ou bloqueio explícito", "Acesso de produção está explícito", "Preview e produção não são confundidos", "Status de prontidão corresponde às lacunas conhecidas de config e segredo"],
      outputs: ["Status de prontidão de ambiente", "Mapa de ambientes", "Necessidades de config", "Billing provider mapping quando aplicável", "Cost controls quando aplicável", "Orientação de tratamento de segredos", "Riscos de acesso", "Notas de segredo de provider/CI", "Perguntas abertas"],
      filesToUpdate: ["Atualize `../knowledge/environments.md` somente após confirmação explícita."],
      redLines: ["Não escreva valores secretos em markdown, `.env` ou instruções geradas.", "Não escreva price IDs, webhook secrets ou billing secrets em markdown sem distinguir IDs públicos de segredos e confirmar o owner.", "Não invente nomes de ambiente, owners de acesso ou detalhes de provider sem confirmação.", "Não confunda comportamento de preview/staging com comportamento de produção.", "Não marque ambientes como prontos enquanto segredos, owners ou alvos de provider obrigatórios forem desconhecidos."]
    },
    {
      slug: "setup-ci",
      title: "Configurar CI",
      purpose: "Definir automação de build, teste e validação com decisão explícita de gate de CI antes de PRs serem considerados prontos para merge.",
      useWhen: ["checks de CI estão ausentes", "validação de PR precisa de automação", "branch protection ou checks obrigatórios precisam de planejamento", "checks existentes estão flaky ou pouco claros"],
      requiredContext: ["Repository structure", "Comando de build", "Comando de teste", "PR validation rules", "Branch rules", "Arquivos de workflow existentes quando presentes"],
      inputs: ["Comando de build", "Comando de teste", "Checks de lint/static", "Checks obrigatórios de PR", "Tratamento de falha", "Evidência atual de validação local"],
      process: ["Identifique scripts disponíveis e arquivos de workflow existentes", "Confirme o comando local de cada check obrigatório proposto", "Defina checks mínimos obrigatórios pela maturidade do repositório", "Separe validação de deploy", "Defina comportamento de falha e bloqueio de merge", "Marque decisão de gate de CI como enable-now, defer-with-reason, blocked ou not-applicable", "Peça confirmação antes de alterar arquivos de workflow"],
      checks: ["CI não faz deploy automaticamente por padrão", "Todo check obrigatório tem comando conhecido ou lacuna explícita", "Checks obrigatórios combinam com a maturidade do projeto", "Falhas bloqueiam merges inseguros", "Checks flaky ou indisponíveis não viram obrigatórios sem owner"],
      outputs: ["Prontidão de CI", "Decisão de gate de CI", "Checks obrigatórios", "Evidência de validação", "Lacunas de workflow", "Notas de branch protection", "Próxima ação"],
      filesToUpdate: ["Atualize `../knowledge/ci-cd.md` após confirmação.", "Atualize `.github/workflows/*` somente após confirmação explícita do usuário."],
      redLines: ["Não crie workflows de CI antes de comandos estáveis de build e test serem conhecidos.", "Não faça deploy por workflows de validação por padrão.", "Não adicione checks obrigatórios que não conseguem rodar de forma confiável no repositório atual.", "Não chame um PR de merge-ready quando o status do gate de CI estiver bloqueado ou desconhecido."]
    },
    {
      slug: "plan-deployment",
      title: "Planejar Deploy",
      purpose: "Planejar release segura, smoke checks e fluxo de rollback sem criar estado de provider automaticamente.",
      useWhen: ["alvo de deploy está sendo discutido", "prontidão de release está incerta", "rollback ou smoke checks são necessários", "configuração de provider pode ser necessária"],
      requiredContext: ["Código/framework do produto", "Plano de ambiente", "CI/CD readiness", "Escopo de release", "Alvo de provider quando conhecido", "Expectativa de rollback"],
      inputs: ["Ambiente alvo", "Tipo de framework/app", "Config de build/runtime", "Escopo de release", "Expectativa de rollback", "Expectativas de smoke-check"],
      process: ["Confirme que app/framework existe", "Cheque prontidão de detecção de provider/framework sem vincular estado remoto", "Identifique env vars obrigatórias e decisões de deploy ausentes", "Defina gates de release e evidência obrigatória de validação", "Defina smoke checks com resultados esperados", "Defina caminho e owner de rollback", "Marque decisão deploy/no-deploy como ready, blocked-by-env, blocked-by-ci, blocked-by-rollback ou blocked-by-provider"],
      checks: ["Nenhuma criação de `.vercel/`", "Nenhum deploy automático", "Nenhum `vercel.json` salvo quando overrides não forem obrigatórios", "Caminho de rollback está explícito", "Smoke checks são concretos o suficiente para executar", "Decisão deploy/no-deploy reflete prontidão de ambiente, CI e rollback"],
      outputs: ["Prontidão de deploy", "Decisão deploy/no-deploy", "Gates de release", "Notas de rollback", "Smoke checks", "Notas de provider", "Bloqueios abertos"],
      filesToUpdate: ["Atualize `../knowledge/deployment-readiness.md` somente após confirmação explícita."],
      redLines: ["Não faça deploy, link de providers ou crie estado remoto a partir desta skill.", "Não crie config de provider a menos que um app/framework real exija.", "Não declare deployment pronto sem notas de ambiente, rollback e smoke-check.", "Não esconda bloqueios de no-deploy atrás de notas genéricas de provider."]
    },
    {
      slug: "define-observability",
      title: "Definir Observabilidade",
      purpose: "Definir visibilidade de runtime para logs, erros, métricas, alertas e checks pós-deploy com owners e ações.",
      useWhen: ["fluxos críticos precisam de monitoramento", "risco de release precisa de visibilidade", "suporte/debugging precisa de sinais baseline", "confiança pós-deploy depende de evidência de runtime"],
      requiredContext: ["Fluxos críticos de usuário", "Arquitetura de runtime", "Modos de falha", "Expectativas de suporte", "Risco de release ou incidente"],
      inputs: ["Fluxos críticos", "Erros esperados", "Métricas importantes", "Candidatos a alerta", "Checks pós-deploy", "Owners ou expectativas de resposta"],
      process: ["Identifique fluxos críticos de usuário e negócio", "Mapeie cada fluxo para logs, erros, métricas ou traces", "Defina candidatos a alerta somente quando owner e ação existirem", "Defina checks pós-deploy com resultados esperados", "Classifique sinais como enable-now, defer-with-reason ou not-applicable", "Liste lacunas de instrumentação e necessidades de owner/ação", "Sinalize dados sensíveis que não devem ser logados"],
      checks: ["Sinais mapeiam para risco de usuário ou negócio", "Cada alerta tem owner e ação ou permanece adiado", "Checks pós-deploy are practical", "Dados sensíveis são excluídos de logs e alertas", "Lacunas de instrumentação não são representadas como visibilidade verificada"],
      outputs: ["Baseline de observabilidade", "Mapa de owner/ação por sinal", "Sinais críticos", "Candidatos a alerta", "Checks pós-deploy", "Lacunas de instrumentação", "Próxima ação"],
      filesToUpdate: ["Atualize `../knowledge/observability.md` somente após confirmação explícita."],
      redLines: ["Não registre segredos, credenciais, tokens ou dados sensíveis de cliente.", "Não crie alertas ruidosos sem owner ou ação clara.", "Não trate chutes de instrumentação como visibilidade de runtime verificada.", "Não marque visibilidade de release como pronta sem checks pós-deploy ou lacunas conhecidas."]
    },
    {
      slug: "prepare-release",
      title: "Preparar Release",
      purpose: "Resumir escopo de release, prontidão, riscos, rollback, checks pós-release e decisão de release.",
      useWhen: ["uma release está sendo preparada", "um PR está pronto para merge", "checks pós-merge são necessários", "notas de release foram solicitadas"],
      requiredContext: ["Issues vinculadas", "Resultado de validação do PR", "CI/CD readiness", "Prontidão de deploy", "Baseline de observabilidade", "Riscos conhecidos"],
      inputs: ["Escopo de release", "Issues vinculadas", "Testes/CI", "Deployment target", "Risks", "Rollback", "Post-release checks"],
      process: ["Resuma escopo e issues vinculadas", "Cheque validação do PR, testes e prontidão de CI/CD", "Cheque prontidão de deploy e status de ambiente", "Cheque observabilidade e checks pós-release", "Liste riscos conhecidos, lacunas de teste e lacunas de rollback", "Marque status de prontidão de release como ready, blocked-by-tests, blocked-by-deploy, blocked-by-rollback ou blocked-by-risk", "Prepare notas de release e notas de follow-up"],
      checks: ["Release não esconde risco conhecido", "Testes/CI ou lacunas explícitas de teste estão presentes", "Rollback está explícito", "Checks pós-release estão visíveis", "Status de prontidão de release corresponde aos bloqueios"],
      outputs: ["Status de prontidão de release", "Notas de release", "Resumo de prontidão", "Evidência de validação", "Riscos", "Notas de rollback", "Checklist pós-release"],
      filesToUpdate: ["Atualize `../knowledge/release-notes.md` somente após confirmação explícita."],
      redLines: ["Não esconda riscos conhecidos de release, lacunas de teste ou lacunas de rollback.", "Não marque uma release como pronta sem testes/CI ou lacunas explícitas de teste.", "Não marque uma release como pronta sem checks pós-release.", "Não faça merge, deploy ou mudança de estado remoto automaticamente."]
    }
  ];
