# Memória de Modelo

Este arquivo existe para continuidade entre agentes/modelos como Claude, Codex e outros coding agents.

Use como índice rápido de handoff para trabalho atual, decisões recentes, mudanças recentes e threads abertas. Ele não é um arquivo canônico de doutrina e não substitui `AGENT.md`, `docs/framework/source-of-truth/`, `TEMP-roadmap-ajustes.md`, histórico git ou knowledge gerado do workspace.

## Estado Atual

- Repositório: `desousajhonny/leanOS`.
- Branch local de trabalho atual: `main`.
- Remote `origin/main` está em `d8aef7c` em 2026-07-01.
- `AGENT.md` raiz é o ponto de entrada para comportamento de agente no nível do projeto.
- Source of truth do framework vive em `docs/framework/source-of-truth/`.
- Roadmap temporário de implementação vive em `TEMP-roadmap-ajustes.md`.

## Decisões Recentes

- 2026-06-30: Adotar layout Business OS no scaffold: `<product-slug>-os/` para Strategy/Operations/Growth, `.leanos/standard/` para padrões do framework e `.leanos/runtime/` para agent/context/index/traces/vscode. Adicionar `lean-os update` para migrar workspaces existentes com preview via `--dry-run`.
- 2026-06-30: Adotar `npm create lean-os` como comando principal de criação de workspace via pacote `create-lean-os`. Manter `npx lean-os ai` como compatibilidade e `npx lean-os activate/update` como comandos operacionais.
- 2026-06-30: Publicações futuras de `lean-os` + `create-lean-os` devem começar mostrando ao usuário o comando PowerShell explícito que cria `.npmrc` via token granular npm com bypass 2FA, depois usar `npm run release:npm`, com validações automáticas, publish `lean-os` antes de `create-lean-os`, verificação do registry e remoção de `.npmrc`.
- 2026-06-30: Security hardening fica em Operations/Security via workflow `security-hardening-cycle`. Pedidos como auditoria, vulnerabilidade, LGPD, dados de cliente, token vazado e proteção de API roteiam para `operations.security`; se inativo, retornam `activation_required: operations.security`.
- 2026-06-30: AI app security passa a ser gate explícito de produto com role `AI Security Engineer`, skill `ai-runtime-security-review`, playbook `ai-app-security-review` e knowledge `ai-app-security.md`. Riscos AI-native cobertos: LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection e cost/rate abuse.
- 2026-06-30: Pricing Catalog passa a ser fonte canônica de Growth Finance em `growth/finance/knowledge/pricing.md`, com Runtime Source separado. Root `AGENT.md` roteia planos/preços/cobrança/entitlements para `activation_required: growth.finance`; Marketing, CX, Product Ops, Engineering, DevOps e Security consomem o catálogo sem reinventar valores.
- 2026-06-30: Spend Ledger passa a ser fonte canônica leve de Growth Finance em `growth/finance/knowledge/spend-ledger.md`, com `budget.md` para Monthly Budget, Runway Snapshot e Approval Thresholds. Root `AGENT.md` roteia gastos/budget/burn/runway/custos para `activation_required: growth.finance`; Marketing, Product Ops, Engineering, DevOps e Security consomem sem criar custo relevante fora dessa fonte.
- 2026-06-30: Growth Experiment Ledger passa a ser fonte canônica leve de Growth Marketing em `growth/marketing/knowledge/growth-experiments.md`. Decisões de Growth devem usar experimento registrado ou feedback de Customer Experience; Marketing ganhou `plan-growth-experiment`, `analyze-growth-result` e playbook `growth-experiment`.
- 2026-06-30: README raiz gerado deve ser product-first e founder-friendly. Melhorias de README devem entrar pela Navigation Chain `Strategy Product -> Product Narrative Editor -> write-product-readme`, usando template em `.leanos/standard/templates/product/` e preservando README existente com diff antes de escrita.
- 2026-06-30: Novo repositório GitHub exige gate `README-ready`. DevOps/GitHub DevOps verifica o gate, mas não escreve narrativa de produto; se faltar README confirmado, deve rotear para `Strategy Product -> Product Narrative Editor -> write-product-readme` antes de create/publish/connect remoto.
- 2026-06-30: Fortalecer sync GitHub de Epics/Features. Epic local canônico passa a ser `epics/<epic-slug>/epic.md` com fallback legado para `README.md`; sync exige body rico, milestone, Size/Effort, relações Epic/Feature, read-back verification e patch local de `github_issue.url` + `sync_status: synced`.
- 2026-07-01: GitHub branch protection usa skill `branch-protection` em DevOps/GitHub DevOps, nunca `configure-branch-protection`. Required checks só entram depois que PR Validation rodar ao menos uma vez. Após criar PR, o modelo deve perguntar: `Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?` e, se aceito, rotear para Engineering `pr-validation`.
- 2026-07-01: GitHub Safety Baseline passa a ser playbook de DevOps/GitHub DevOps para repository profile, PR validation workflow real, branch protection e release gates. A skill `repository-profile` deriva About do README product-first; PR Validation roda scripts existentes, secret scan e LeanOS structure check; tags/GitHub Releases exigem `ready-for-launch` ou `release-operations`.
- 2026-06-30: Implementar `ready-for-launch` como workflow de Operations. Readiness de launch/go-live/beta/usuários reais fica em Operations com Product Ops + Engineering + DevOps; Growth executa `mvp-launch`/`launch-learning-loop` depois do gate ou depois de lançamento executado.
- 2026-06-30: Simplificar o wizard CLI em PT-BR. O setup recomendado passa a ser `progressive`; a opção avançada `all-at-once` prepara todas as áreas, mas não reintroduz multiselect manual de departamentos.
- 2026-06-29: Expandir padrões gerados de branch e PR. Branches agora cobrem `feature`, `issue`, `fix`, `chore`, `docs` e `spike`; templates de PR passam a exigir título estilo Conventional Commit quando fizer sentido, status de prontidão e seção `Deploy / Rollback`.
- 2026-06-29: Adicionar memória de continuidade de modelo na raiz. Esta memória serve apenas para continuidade de handoff/status/próximo passo; decisões duráveis do framework continuam em `docs/framework/source-of-truth/decision-log.md`.
- 2026-06-29: Manter doutrina e regras de decisão do framework em `docs/framework/source-of-truth/`; não usar a memória de modelo como source of truth do comportamento LeanOS.
- 2026-06-29: Fortalecer o LeanOS Asset Contract v2 com contratos de workflow, playbook e skill apoiados por validação.
- 2026-06-29: Manter arquivos de knowledge de Engineering. Tratar `code-standards.md`, `implementation-rules.md`, `component-guidelines.md`, `data-guidelines.md`, `testing-strategy.md` e `review-criteria.md` como contratos duráveis do framework; tratar `implementation-notes.md`, `code-review-notes.md` e `pr-log.md` como estado de Feature/review.
- 2026-06-29: Padronizar textos humanos gerados pelo LeanOS em PT-BR. Manter IDs, paths, slugs, chaves YAML e termos técnicos de interoperabilidade estáveis em inglês quando fizer sentido.

## Mudanças Recentes

- Working tree: scaffold reorganizado para gerar `<product-slug>-os/README.md`, departamentos dentro do Business OS, `.leanos/standard/` e `.leanos/runtime/`; `leanos.yaml.paths` registra os novos roots; validação `validateBusinessOsLayout` cobre paths físicos e impede referências antigas como `ai-standard/` e `.leanos/context`.
- Working tree: pacote `packages/create` adicionado como `create-lean-os`; o binário chama o wizard `runAiCommand` do pacote `lean-os`, docs promovem `npm create lean-os` e validação `validateCreateLeanOsPackage` cobre o contrato.
- Working tree: Pricing Source of Truth em implementação na branch `feature/pricing-source-of-truth`. Foram adicionados contratos para Pricing Catalog, Runtime Source, Consumer Contract, rota root de Finance, gates de Product Ops/Engineering/DevOps/Security e validação `validatePricingSourceOfTruthContract`.
- Working tree: Spend/Budget Source of Truth em implementação na branch `feature/pricing-source-of-truth`. Foram adicionados `spend-ledger.md`, Budget fortalecido, skills `review-spend`, `runway-check`, `budget-planning`, playbooks `spend-approval`, `monthly-finance-check`, gates de Marketing/Product Ops/Engineering/DevOps/Security e validação `validateSpendBudgetSourceOfTruthContract`.
- Working tree: Growth Experiment Learning em implementação na branch `feature/pricing-source-of-truth`. Foram adicionados `growth-experiments.md`, skills `plan-growth-experiment` e `analyze-growth-result`, playbook `growth-experiment`, journey `growth-experiment-learning.md` e validação `validateGrowthExperimentContract`.
- Working tree: GitHub Safety Baseline em implementação na `main`. Foram adicionados `repository-profile`, playbook `github-safety-baseline`, PR Validation adaptativo, capabilities `github.repositoryProfile`, `github.prValidationWorkflow`, `github.branchProtection` e `github.createRelease`, além de validações de DevOps/GitHub.
- Working tree: runbook `scripts/publish-npm-create-leanos.mjs` existe para futuras publicações npm; `AGENT.md`, README e decision log apontam para `npm run release:npm` e para o comando seguro `Set-Content -LiteralPath ".npmrc"` antes de publicar.
- Working tree: README raiz do scaffold agora explica produto/empresa antes do LeanOS; Strategy Product ganhou role `Product Narrative Editor`, skill `write-product-readme`, common path no AGENT da área e template `.leanos/standard/templates/product/product-readme-template.md`; validação `validateProductReadmeContract` cobre rota, preservação de README existente e sections obrigatórias.
- Working tree: DevOps/GitHub DevOps agora exige `README-ready` para novo repositório GitHub, registra Repository mode/README status/source em `github-management.md`, bloqueia create/publish/connect remoto sem README product-first confirmado e valida isso com `validateGithubRepositoryReadmeGate`.
- Working tree: contrato GitHub sync fortalecido em `.github/leanos/project-sync.yaml`, `work-mapping.md`, `capability-contract.md`, Product Ops e DevOps. Nova validação `validateGithubSyncContract` cobre `epic.md`, fallback README legado, body rico, milestone, Effort, relações, read-back verification e patch local de `github_issue.url`/`sync_status`.
- Working tree: workflow `ready-for-launch` adicionado em Operations, com `decisionOutputs`, gate Product Ops + Engineering + DevOps, bridges para Growth e retorno para `feature-to-delivery-cycle`; root `AGENT.md` agora separa readiness de launch de execução/aprendizado de Growth.
- Working tree: jornada `docs/framework/founder-journeys/ready-for-launch.md`, inventário `docs/framework/workflows/README.md`, source-of-truth e roadmap temporário atualizados para Launch Readiness.
- Working tree: validação `validateFounderJourneyReadyForLaunch` adicionada ao generator; cobre docs da jornada e ativação sequencial Strategy-only -> Product Ops -> Engineering -> DevOps sem ativar Growth automaticamente.
- Working tree: comando `lean-os update [--dry-run]` adicionado. Ele move diretórios legados (`strategy`, `operations`, `growth`, `ai-standard`, `.leanos/context|index|agent|traces|vscode`) para o novo layout quando o destino não existe, reporta conflitos e sobrescreve apenas arquivos de framework/runtime/roteamento, preservando arquivos de produto existentes como missing-only.
- Working tree: wizard `lean-os ai` simplificado para nome do produto, tipo, descrição, modo de preparação e GitHub; perguntas de usuário alvo, estágio e modo de operação foram removidas do fluxo interativo; generator ganhou `initialActivationMode` com `progressive` e `all-at-once`; validação `validateCliWizardProgressiveSetup` adicionada.
- Working tree: padrões de branch/PR fortalecidos em `.github/leanos/branch-rules.md`, `.github/PULL_REQUEST_TEMPLATE.md`, templates GitHub do `ai-standard`, skill `create-pr`, playbooks `branch-for-feature` e `prepare-pr`, com validação `validateBranchAndPrStandards`.
- Working tree: documentação da jornada `Review e PR` adicionada em `docs/framework/founder-journeys/review-pr.md`, `journey-map.md` marcado como concluído para a etapa 7 e validação `validateFounderJourneyReviewPr` adicionada ao generator. A validação cobre documentação da jornada e ativação sequencial Strategy-only -> Product Ops -> Engineering para rota de PR/review.
- Working tree: limpeza de Engineering knowledge preenche contratos duráveis de Engineering e adiciona validação do generator para impedir que knowledge de Engineering em nível de framework saia com placeholders `TBD`.
- Working tree: padronização PT-BR concluída em renderers, ai-standard, `.leanos`, GitHub docs, Strategy, Operations, Growth, skills, playbooks, workflows, knowledge e validações correspondentes.
- Working tree: `packages/cli/scripts/validation/language.mjs` adicionado ao generator para prevenir regressão de headings, frontmatter e frases operacionais em inglês.
- Working tree: `examples/client-workspace/` regenerado e validado com `npm test` e `git diff --check`.
- `2ecf591 Strengthen LeanOS delivery asset contracts`
  - Fortaleceu `feature-to-delivery-cycle`, `delivery-item-to-epic`, `epic-to-features` e contratos de skills de Product Ops.
- `be2958a Strengthen engineering skill contracts`
  - Fortaleceu `write-tests`, `create-pr` e `review-pr` de Engineering com evidência RED/GREEN, prontidão de PR e evidência de review apoiadas por validação.
- `6e1d750 Strengthen operations review skill contracts`
  - Fortaleceu skills de review/decisão de DevOps, Security e Design com decisões de prontidão, saídas de evidência e linhas vermelhas.

## Threads Abertas

- Continuar teste Founder Journey do setup progressivo Strategy-only até ativação de Product Ops, criação de Epic/Feature, implementação, PR e simulação de review. A fatia de Review/PR agora tem jornada documentada e validação automatizada da rota sequencial até Engineering; ainda falta a simulação externa completa com Epic/Feature e implementação.
- Completar futuramente a jornada ampla `launch-learning-loop` de Growth depois do gate `ready-for-launch`; a fatia de experimento/resultado manual já tem ledger, skills, playbook e validação.
- Considerar regra do framework para atualizar esta memória ao fim de sessões locais significativas antes de trocar agentes.

## Regras de Atualização

- Leia este arquivo no começo de qualquer sessão de continuação, status, retomada, próximo passo ou troca de modelo.
- Atualize este arquivo depois de decisões relevantes do framework, commits, pushes, mudanças de roadmap ou descobertas importantes para handoff.
- Mantenha entradas curtas e aponte para arquivos canônicos ou commits em vez de duplicar contexto completo.
- Não registre segredos, tokens, credenciais, dados privados de cliente ou alegações especulativas.
- Se uma nota virar decisão durável do framework, atualize também `docs/framework/source-of-truth/decision-log.md`.
- Se este arquivo conflitar com `AGENT.md` ou `docs/framework/source-of-truth/`, trate o source of truth como autoritativo e atualize este arquivo.
