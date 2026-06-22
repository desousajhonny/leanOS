# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens abaixo forem implementados, validados e incorporados ao fluxo normal do projeto.

## Decisoes de Escopo

- [ ] Nao expandir a arvore de pastas agora; a estrutura atual ja e suficiente para o MVP.
- [ ] Manter `Company as a Product` como conceito de posicionamento e logica do framework.
- [ ] Nao mover `Company as a Product` para dentro de `strategy/business/` como se fosse contexto operacional da empresa do usuario final.
- [ ] Focar em profundidade operacional dos comandos principais, nao em mais scaffolding.
- [ ] Usar `TEMP-automation-flows.md` como mapa temporario dos fluxos que serao automatizados no futuro.
- [ ] Tratar `new-product-workspace` e `existing-product-repo` como modos oficiais de instalacao.

## 1. Fortalecer `/start-leanos`

Objetivo: transformar `/start-leanos` em uma primeira sessao guiada, clara e segura.

- [x] Definir roteiro de entrevista inicial do founder.
- [x] Separar perguntas obrigatorias de perguntas opcionais.
- [x] Mapear respostas para arquivos Strategy elegiveis.
- [x] Garantir que o Chief sempre proponha mudancas antes de escrever.
- [x] Garantir que nenhuma alteracao aconteca sem confirmacao explicita.
- [x] Registrar incertezas como perguntas abertas, nao como fatos inventados.
- [x] Definir output padrao do comando:
  - contexto carregado
  - resumo do workspace
  - lacunas detectadas
  - arquivos propostos para atualizacao
  - proximo comando recomendado
- [x] Atualizar testes para validar o comportamento esperado do comando.

## 2. Padronizar comandos principais

Objetivo: fazer os comandos centrais entregarem outputs consistentes, previsiveis e uteis.

Base para o fluxo Roadmap -> GitHub Project -> Epic -> Sub-issues -> Implementation:

- [ ] Usar `TEMP-automation-flows.md` como mapa de fluxos principais e sub-workflows.
- [ ] Usar `TEMP-github-roadmap-flow.md` como especificacao temporaria do fluxo GitHub.
- [ ] Separar responsabilidade: LeanOS Chief despacha, roles operacionais guiam e capabilities/scripts executam API.
- [ ] Garantir que comandos de chat gerem plano/payload antes de qualquer chamada remota.
- [ ] Garantir confirmacao explicita antes de executar GitHub API.
- [ ] Manter UX chat-first para founders que nao querem operar pelo terminal.

### `/check coherence`

- [ ] Definir score de coerencia.
- [ ] Listar alinhamentos.
- [ ] Listar inconsistencias.
- [ ] Listar riscos.
- [ ] Recomendar proximo comando.
- [ ] Garantir que nao recomende areas inativas sem aviso.

### `/define mvp`

- [ ] Definir inputs obrigatorios.
- [ ] Carregar Strategy antes de Operations.
- [ ] Separar MVP scope, non-goals, user stories, user flows e acceptance criteria.
- [ ] Evitar definir MVP sem problema, ICP e value proposition minimamente claros.
- [ ] Pedir confirmacao antes de atualizar arquivos.

### `/create issues`

- [ ] Converter MVP/roadmap em epics e sub-issues GitHub-ready.
- [ ] Criar template de epic.
- [ ] Criar template de sub-issue.
- [ ] Aplicar matriz 3D Product/Design/Security antes de criar sub-issues.
- [ ] Incluir acceptance criteria.
- [ ] Incluir links para source-of-truth files.
- [ ] Marcar dependencias e riscos.
- [ ] Evitar criar issue sem contexto de MVP.

### `/workon issue`

- [ ] Carregar issue/contexto antes de planejar implementacao.
- [ ] Roteiar para Engineering.
- [ ] Definir plano de implementacao.
- [ ] Definir plano de teste.
- [ ] Registrar arquivos provaveis de mudanca.

### `/review pr`

- [ ] Validar PR contra MVP scope.
- [ ] Validar contra acceptance criteria.
- [ ] Validar riscos de estrategia/produto quando aplicavel.
- [ ] Separar bugs, riscos, perguntas e sugestoes.
- [ ] Evitar aprovar mudanca que contradiga source-of-truth files.

## 3. Tornar o ciclo de validacao explicito

Objetivo: transformar validacao em loop operacional, nao apenas arquivos soltos.

- [x] Definir ciclo: hipotese -> experimento -> evidencia -> decisao -> roadmap.
- [x] Atualizar playbook de validation para seguir esse ciclo.
- [x] Garantir que `learning-log.md` registre aprendizado validado.
- [x] Garantir que decisoes relevantes sejam refletidas em roadmap ou backlog.
- [x] Criar criterio para diferenciar insight, evidencia e decisao.
- [x] Atualizar comandos para nao tratar suposicoes como fatos.

## 4. Preparar camada GitHub API

Objetivo: planejar integracao real com GitHub API, mantendo execucao segura via capabilities/scripts e nunca diretamente pelo LeanOS Chief.

- [x] Revisar templates de issue.
- [x] Revisar PR template.
- [x] Revisar regras de validacao de PR.
- [x] Definir regra de branch obrigatoria por issue.
- [x] Definir arquivos base de configuracao GitHub sem segredos.
- [x] Definir `.github/leanos/github-settings.example.json`.
- [x] Definir `.github/leanos/project-sync.yaml`.
- [x] Definir `.github/leanos/sync-state.yaml`.
- [x] Perguntar no wizard se o usuario quer preparar GitHub management.
- [x] Gerar `.env.local` apenas quando GitHub management for solicitado.
- [ ] Definir comando de chat `/configure github`.
- [ ] Definir comando de chat `/sync-roadmap`.
- [ ] Definir comando de chat `/create subissues`.
- [ ] Definir capability `github.configure`.
- [ ] Definir capability `github.status`.
- [ ] Definir capability `github.syncRoadmap`.
- [ ] Definir capability `github.createSubissues`.
- [ ] Garantir dry-run antes de escrita remota.
- [ ] Garantir que tokens nunca sejam persistidos no workspace.
- [ ] Documentar GitHub Project, milestones, epics, sub-issues e sync state.

## 5. Planejar update/migration de workspaces

Objetivo: preparar o caminho para evoluir workspaces ja criados.

- [ ] Definir necessidade de um futuro `lean-os update`.
- [ ] Listar quais arquivos sao runtime e poderiam ser atualizados pelo framework.
- [ ] Listar quais arquivos sao source-of-truth do cliente e nao devem ser sobrescritos.
- [ ] Definir estrategia de migracao segura:
  - detectar versao em `leanos.yaml`
  - comparar arquivos runtime
  - propor mudancas
  - preservar alteracoes do usuario
- [ ] Nao implementar agora sem uma especificacao propria.

## 5.1 Planejar `/bootstrap product`

Objetivo: definir o fluxo futuro que cria app code somente depois de Strategy, MVP e stack estarem claros.

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir perguntas de stack: Next.js, Vite, API, dashboard ou outro.
- [ ] Definir defaults para founder iniciante.
- [ ] Definir como preparar Vercel sem criar `.vercel/` ou deploy automatico.
- [ ] Definir como preservar repositorios existentes.
- [ ] Definir testes para garantir que o setup inicial nao cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json`.

## 6. Preparar release publica do MVP

Objetivo: deixar o pacote publicavel e testavel por usuarios reais.

- [ ] Atualizar versao do pacote se necessario.
- [ ] Rodar build.
- [ ] Rodar validacao do gerador.
- [ ] Regenerar `examples/client-workspace/`.
- [ ] Rodar smoke test local com `node packages/cli/dist/index.js ai`.
- [ ] Rodar `npm publish --dry-run --access public` em `packages/cli`.
- [ ] Publicar somente apos confirmacao explicita.
- [ ] Testar via `npx lean-os ai` apos publicacao.

## 7. Fortalecer `ai-standard/` como source-of-truth do framework

Objetivo: transformar `ai-standard/` em uma biblioteca clara de padroes do LeanOS, para humanos e modelos saberem exatamente onde procurar, o que criar e como validar cada tipo de asset.

Principio: nao fazer apenas reorganizacao visual. Cada pasta, template, checklist e instruction deve ter responsabilidade propria e conteudo especifico.

### 7.1 Reorganizar arquitetura de informacao do `ai-standard/`

- [ ] Definir a nova estrutura alvo do `ai-standard/`.
- [x] Agrupar arquivos raiz soltos em uma pasta de fundacao, `foundation/`:
  - `asset-taxonomy.md`
  - `navigation-chain.md`
  - `creation-rules.md`
  - `naming-conventions.md`
  - `quality-criteria.md`
  - `folder-documentation-rules.md`
- [x] Atualizar `ai-standard/README.md` para explicar:
  - o que e `foundation/`
  - o que e `templates/`
  - o que e `checklists/`
  - o que e `instructions/`
  - o que e `examples/`
  - quando carregar cada rota
- [x] Atualizar todas as referencias internas para os novos paths.
- [x] Atualizar `leanos.yaml`, `.leanos/index/routing-map.yaml`, comandos e AGENTs se algum path mudar.
- [x] Garantir que modelos nao precisem carregar tudo: README deve funcionar como roteador do `ai-standard`.

### 7.2 Separar templates por categoria

- [x] Definir subpastas para templates:
  - `templates/agents/`
  - `templates/structure/`
  - `templates/execution/`
  - `templates/commands/`
  - `templates/github/`
  - `templates/review/`
- [x] Mover templates de agent para `templates/agents/`.
- [x] Mover templates de department, area, README e YAML para `templates/structure/`.
- [x] Mover templates de role, skill, playbook e workflow para `templates/execution/`.
- [x] Mover command template para `templates/commands/`.
- [x] Mover templates de GitHub issue, epic, sub-issue, PR, branch e readiness matrix para `templates/github/`.
- [x] Mover code review template para `templates/review/`.
- [x] Atualizar `templates/README.md` para explicar cada categoria e quando usar.
- [x] Atualizar instructions e commands que apontam para templates antigos.

### 7.3 Tornar checklists especificos por asset

- [x] Substituir checklists genericos identicos por checklists especificos.
- [x] `agent-quality-checklist.md`: validar roteamento, red lines, nivel correto e ausencia de inventario excessivo.
- [x] `readme-quality-checklist.md`: validar mapa de pasta, quando usar, arquivos, relacionados e notas de navegacao.
- [x] `department-quality-checklist.md`: validar areas ativas, workflows locais, ausencia de roles/skills/playbooks no root.
- [x] `area-quality-checklist.md`: validar `AGENT.md` quando necessario, `area.yaml`, knowledge, roles, skills e playbooks.
- [x] `role-quality-checklist.md`: validar responsabilidade, contexto necessario, skills/playbooks apontados e output esperado.
- [x] `skill-quality-checklist.md`: validar capability reutilizavel, limites, checks, outputs e red lines.
- [x] `playbook-quality-checklist.md`: validar sequencia, entradas, processo, outputs e arquivos atualizaveis.
- [x] `workflow-quality-checklist.md`: adicionar checklist de workflow se ainda nao existir.
- [x] `command-quality-checklist.md`: validar load first, allowed updates, forbidden updates, confirmation rule e output.
- [ ] Criar checklists GitHub/review se fizer sentido apos reorganizar templates.

### 7.4 Tornar instructions especificas por criacao

- [x] Substituir instructions genericas identicas por instructions especificas.
- [x] `create-agent-instructions.md`: quando criar root, department ou area AGENT; como evitar duplicar inventario.
- [x] `create-readme-instructions.md`: como criar README como mapa, nao como executor.
- [x] `create-department-instructions.md`: como criar departamento raiz com workflows e areas, sem roles/skills/playbooks diretos.
- [x] `create-area-instructions.md`: como criar area com `AGENT.md` opcional, knowledge, roles, skills e playbooks.
- [x] `create-role-instructions.md`: como definir persona/responsabilidade e apontar skills/playbooks.
- [x] `create-skill-instructions.md`: como definir capability reutilizavel sem virar processo completo.
- [x] `create-playbook-instructions.md`: como criar sequencia pratica usando skills.
- [x] `create-workflow-instructions.md`: como criar fluxo multi-area ou multi-stage.
- [x] `create-command-instructions.md`: como criar comando de chat seguro, com carregamento minimo e confirmacao.
- [x] Atualizar `instructions/README.md` para explicar qual instruction usar em cada situacao.

### 7.5 Melhorar examples por categoria

- [x] Separar examples por categoria, se ajudar:
  - `examples/agents/`
  - `examples/structure/`
  - `examples/execution/`
  - `examples/github/`
- [x] Garantir que examples sejam claramente ilustrativos e nao sobrescrevam o contexto ativo.
- [x] Adicionar exemplos bons para:
  - area `AGENT.md`
  - role
  - skill
  - playbook
  - workflow
  - command
  - GitHub epic/sub-issue/PR

### 7.6 Atualizar gerador, preview e validacoes

- [x] Atualizar `packages/cli/src/templates/workspace/renderers/ai-standard.ts`.
- [x] Atualizar qualquer comando, AGENT ou renderer que aponte para paths antigos.
- [x] Atualizar `packages/cli/scripts/validate-generator.mjs`.
- [x] Regenerar `examples/client-workspace/`.
- [x] Garantir que `examples/client-workspace-tree.md` reflita a nova estrutura.
- [x] Validar que nenhum link antigo quebrado permaneceu.
- [x] Rodar:
  - `npm --prefix packages/cli run build`
  - `npm run generate:client-workspace`
  - `node packages/cli/scripts/validate-generator.mjs`
  - `npm test`
  - `node packages/cli/dist/index.js --help`
  - `git diff --check`

### 7.7 Criterio de pronto

- [x] Um modelo consegue abrir `ai-standard/README.md` e saber exatamente onde ir.
- [x] Cada checklist tem criterios especificos para seu asset type.
- [x] Cada instruction orienta criacao real, nao texto generico.
- [x] Templates estao separados por responsabilidade.
- [x] Paths internos estao consistentes.
- [x] Preview gerado esta sincronizado com o template real.

### 7.8 Normalizar areas do workspace pelo padrao Design

Objetivo: aplicar nas demais areas a logica que ficou definida em `operations/design/`: area com mapa claro, `AGENT.md` quando houver roteamento interno relevante, `knowledge/` para contexto duravel, roles/skills/playbooks especificos e poucos arquivos soltos.

Principio de MVP: gerar apenas o que todo negocio precisa independentemente do setor. Arquivos muito especificos, tardios ou dependentes de stack devem ser criados por fluxo posterior, nao no scaffold inicial.

#### Padrao alvo para areas

- [ ] Definir regra objetiva para quando uma area deve ter `AGENT.md`:
  - criar quando a area tiver multiplas roles, multiplos caminhos operacionais ou precisar decidir qual especialista ativar;
  - evitar quando a area tiver apenas uma responsabilidade simples e o README for suficiente.
- [ ] Padronizar `README.md` como mapa da area, nao como executor.
- [ ] Padronizar `AGENT.md` como lider operacional da area, quando existir.
- [ ] Padronizar `area.yaml` para declarar:
  - key
  - department
  - path
  - agent, quando existir
  - readme
  - knowledge files
  - roles
  - skills
  - playbooks
  - workflows locais, quando houver
- [ ] Criar `knowledge/` nas areas que mantem fatos, decisoes, contexto ou materiais de referencia.
- [ ] Mover arquivos de conhecimento soltos para `knowledge/`.
- [ ] Remover arquivos soltos que nao fazem sentido para o MVP inicial.
- [ ] Manter `roles/`, `skills/` e `playbooks/` dentro da area, nao no departamento raiz.
- [ ] Garantir naming convention:
  - `[direct-name].role.md`
  - `[direct-name].skill.md`
  - `[direct-name].playbook.md`
  - `[direct-name].workflow.md`
- [ ] Atualizar `ai-standard` se alguma regra nova de area/knowledge precisar virar padrao oficial.
- [ ] Atualizar `.leanos/index/*` para nao apontar para paths antigos.
- [ ] Atualizar `leanos.yaml` para refletir agents, knowledge e assets por area.
- [ ] Atualizar validacao para impedir arquivos soltos indevidos em areas normalizadas.

#### Diagnostico atual

- [x] `operations/design` ja segue o padrao alvo:
  - tem `AGENT.md`
  - tem `knowledge/`
  - tem roles especializadas
  - tem skills/playbooks especificos
  - nao tem arquivos soltos no root da area.
- [x] `strategy/business` foi renomeado de `strategy/company` e normalizado para `AGENT.md` + `knowledge/`:
  - `decision-log.md`
  - `mission.md`
  - `operating-model.md`
  - `principles.md`
  - `profile.md`
  - `vision.md`
- [x] `strategy/product` foi normalizado para `AGENT.md` + `knowledge/`:
  - `brief.md`
  - `business-model-canvas.md`
  - `icp.md`
  - `jobs-to-be-done.md`
  - `positioning.md`
  - `problem.md`
  - `value-proposition.md`
- [ ] `strategy/validation` esta em standby para decisao de escopo do MVP:
  - `assumptions.md`
  - `experiments.md`
  - `interview-script.md`
  - `learning-log.md`
  - `riskiest-assumptions.md`
  - `success-metrics.md`
- [x] `strategy/roadmap` foi normalizado para `AGENT.md` + `knowledge/`:
  - `backlog.md`
  - `current-cycle.md`
  - `milestones.md`
  - `roadmap.md`
- [x] `operations/product-ops` foi normalizado para Product Ops Lead + `knowledge/` + `mvp/`:
  - `knowledge/overview.md`
  - `knowledge/delivery-context.md`
  - `knowledge/issue-readiness.md`
  - `knowledge/technical-decisions.md`
  - `mvp/`
  - arquivos prematuros de arquitetura foram adiados ate existir stack/app real.
- [ ] `operations/engineering` ainda tem conhecimento solto:
  - `code-review-notes.md`
  - `implementation-notes.md`
  - `pr-log.md`
- [ ] `operations/devops` nao tem knowledge root, mas precisa avaliar se falta contexto minimo para GitHub, ambientes, deploy e Vercel readiness.
- [ ] `operations/security` ainda tem conhecimento solto:
  - `access-control.md`
  - `data-protection.md`
  - `threat-model.md`
- [ ] `growth/customer-experience` ainda tem conhecimento solto:
  - `churn-reasons.md`
  - `customer-feedback.md`
  - `success-moments.md`
  - `support-notes.md`
- [ ] `growth/marketing` ainda tem conhecimento solto:
  - `acquisition-channels.md`
  - `landing-page.md`
  - `launch-plan.md`
  - `positioning.md`
- [ ] `growth/finance` ainda tem conhecimento solto:
  - `budget.md`
  - `finance-risks.md`
  - `pricing.md`
  - `revenue-model.md`
  - `unit-economics.md`

#### Strategy areas

- [x] `strategy/business`: criar `AGENT.md` como Business Lead.
- [x] `strategy/business`: criar `knowledge/` para identidade e operacao do negocio.
- [x] `strategy/business`: manter no MVP inicial:
  - `knowledge/profile.md`
  - `knowledge/mission.md`
  - `knowledge/vision.md`
  - `knowledge/principles.md`
  - `knowledge/operating-model.md`
  - `knowledge/decision-log.md`
- [x] `strategy/business`: revisar roles:
  - trocar `company-strategist.role.md` por `business-strategist.role.md`;
  - `founder-ceo.role.md` nao foi criado nesta rodada para evitar duplicar `business-strategist`.
- [x] `strategy/business`: revisar skills:
  - trocar `define-company.skill.md` por `define-business-identity.skill.md`
  - `clarify-operating-model.skill.md`
  - `decision-making.skill.md` nao foi criado nesta rodada.
- [x] `strategy/business`: revisar playbooks:
  - trocar `company-foundation.playbook.md` por `business-foundation.playbook.md`;
  - garantir que ele preencha knowledge, nao roles/skills/playbooks.

- [x] `strategy/product`: criar `AGENT.md` como Product Lead quando houver roteamento entre estrategia, ICP, posicionamento, modelo de negocio e ideia nova.
- [x] `strategy/product`: criar `knowledge/` para contexto de produto.
- [x] `strategy/product`: manter no MVP inicial:
  - `knowledge/brief.md`
  - `knowledge/problem.md`
  - `knowledge/icp.md`
  - `knowledge/jobs-to-be-done.md`
  - `knowledge/value-proposition.md`
  - `knowledge/positioning.md`
  - `knowledge/business-model-canvas.md`
- [x] `strategy/product`: revisar se `business-model-canvas.md` deve ser simples o suficiente para founder iniciante.
- [x] `strategy/product`: revisar roles:
  - `product-strategist.role.md`
  - `product-manager.role.md`
  - `product-discovery-lead.role.md` nao foi criado nesta rodada para evitar duplicar `product-strategist`.
- [x] `strategy/product`: revisar skills:
  - `evaluate-idea.skill.md`
  - `define-product.skill.md`
  - `define-icp.skill.md`
  - `define-value-proposition.skill.md`
  - `define-business-model.skill.md`
  - `check-coherence.skill.md`
- [x] `strategy/product`: revisar e enriquecer `product-strategy.playbook.md`.
- [ ] `strategy/product`: avaliar um playbook mais claro para `idea-to-roadmap` junto com workflow de Strategy.

- [ ] `strategy/validation`: criar `AGENT.md` como Validation Lead.
- [ ] `strategy/validation`: criar `knowledge/` para evidencias e aprendizado.
- [ ] `strategy/validation`: manter no MVP inicial:
  - `knowledge/assumptions.md`
  - `knowledge/riskiest-assumptions.md`
  - `knowledge/experiments.md`
  - `knowledge/interview-script.md`
  - `knowledge/success-metrics.md`
  - `knowledge/learning-log.md`
- [ ] `strategy/validation`: revisar roles:
  - manter `validation-researcher.role.md`;
  - avaliar `customer-interviewer.role.md` apenas se nao duplicar Growth/CX.
- [ ] `strategy/validation`: revisar skills:
  - `define-assumptions.skill.md`
  - `create-interview-script.skill.md`
  - `define-success-metrics.skill.md`
  - avaliar `synthesize-evidence.skill.md`.
- [ ] `strategy/validation`: revisar playbooks:
  - manter/enriquecer `mvp-validation.playbook.md`;
  - garantir ciclo hipotese -> experimento -> evidencia -> decisao -> roadmap.

- [x] `strategy/roadmap`: criar `AGENT.md` como Roadmap Lead.
- [x] `strategy/roadmap`: criar `knowledge/` para planejamento versionavel.
- [x] `strategy/roadmap`: manter no MVP inicial:
  - `knowledge/roadmap.md`
  - `knowledge/milestones.md`
  - `knowledge/current-cycle.md`
  - `knowledge/backlog.md`
- [x] `strategy/roadmap`: revisar roles:
  - manter `roadmap-planner.role.md`;
  - `product-ops.role.md` nao foi criado nesta rodada para evitar duplicar `roadmap-planner`.
- [x] `strategy/roadmap`: revisar skills:
  - `create-roadmap.skill.md`
  - `prioritize-backlog.skill.md`
  - `prepare-roadmap-sync.skill.md`
- [x] `strategy/roadmap`: revisar playbooks:
  - trocar `validation-cycle-planning.playbook.md` por `roadmap-cycle-planning.playbook.md`
  - `roadmap-sync-prep.playbook.md`
- [ ] `strategy/workflows`: garantir que `idea-to-roadmap.workflow.md` e `roadmap-to-github-project.workflow.md` apontem para area AGENTs e knowledge paths atualizados.

#### Operations areas

- [x] `operations/product-ops`: decidir papel da area: Product Ops = MVP scope, acceptance criteria, issue readiness, epic/sub-issue shaping e delivery boundaries.
- [x] `operations/product-ops`: criar `AGENT.md` como Product Ops Lead.
- [x] `operations/product-ops`: criar `knowledge/` e reduzir arquivos tecnicos prematuros.
- [x] `operations/product-ops`: manter no MVP inicial:
  - `knowledge/overview.md`
  - `knowledge/delivery-context.md`
  - `knowledge/issue-readiness.md`
  - `knowledge/technical-decisions.md`
  - `mvp/README.md`
  - `mvp/scope.md`
  - `mvp/non-goals.md`
  - `mvp/user-stories.md`
  - `mvp/user-flows.md`
  - `mvp/acceptance-criteria.md`
  - `mvp/release-checklist.md`
- [x] `operations/product-ops`: adiar estes arquivos ate stack/arquitetura existir:
  - `api-contract.md`
  - `data-model.md`
  - `integrations.md`
  - `prompt-architecture.md`
  - `ai-capabilities.md`
- [x] `operations/product-ops`: revisar roles:
  - `product-owner.role.md`
  - trocar `technical-architect.role.md` por `delivery-architect.role.md`.
- [x] `operations/product-ops`: revisar skills:
  - `define-mvp.skill.md`
  - `write-acceptance-criteria.skill.md`
  - `shape-epic.skill.md`
  - `write-subissue-criteria.skill.md`
  - `check-delivery-coherence.skill.md`
  - trocar arquitetura prematura por `define-delivery-boundaries.skill.md`.
- [x] `operations/product-ops`: revisar playbooks:
  - `mvp-delivery.playbook.md`
  - `epic-to-subissues.playbook.md`
  - trocar `architecture-planning.playbook.md` por `delivery-readiness.playbook.md`

- [x] `operations/engineering`: criar `AGENT.md` como Engineering Lead.
- [x] `operations/engineering`: criar `knowledge/` para padroes, regras, historico tecnico e criterios de review.
- [x] `operations/engineering`: manter no MVP inicial:
  - `knowledge/code-standards.md`
  - `knowledge/implementation-rules.md`
  - `knowledge/component-guidelines.md`
  - `knowledge/data-guidelines.md`
  - `knowledge/testing-strategy.md`
  - `knowledge/review-criteria.md`
  - `knowledge/implementation-notes.md`
  - `knowledge/code-review-notes.md`
  - `knowledge/pr-log.md`
- [x] `operations/engineering`: revisar roles:
  - `senior-developer.role.md`
  - `pr-reviewer.role.md`
  - adicionar `test-engineer.role.md`.
- [x] `operations/engineering`: revisar skills:
  - `plan-implementation.skill.md`
  - `follow-code-standards.skill.md`
  - `create-branch.skill.md`
  - `create-pr.skill.md`
  - `review-pr.skill.md`
  - `write-tests.skill.md`
  - `review-data-change.skill.md`
- [x] `operations/engineering`: revisar playbooks:
  - `branch-from-issue.playbook.md`
  - `issue-to-pr.playbook.md`
  - `pr-validation.playbook.md`
  - `test-planning.playbook.md`
- [x] `operations/engineering`: garantir que branch, PR e review usem templates GitHub em `ai-standard/templates/github/`.

- [ ] `operations/devops`: criar `AGENT.md` como DevOps/GitHub Operations Lead.
- [ ] `operations/devops`: criar `knowledge/` para setup e readiness operacional.
- [ ] `operations/devops`: manter no MVP inicial:
  - `knowledge/github-management.md`
  - `knowledge/environments.md`
  - `knowledge/deployment-readiness.md`
  - `knowledge/ci-cd.md`
  - `knowledge/observability.md`
- [ ] `operations/devops`: garantir que GitHub token/env seja orientado sem salvar segredo no workspace.
- [ ] `operations/devops`: manter Vercel como readiness, nao como deploy automatico.
- [ ] `operations/devops`: revisar roles:
  - `github-devops.role.md`
  - `devops-engineer.role.md`
  - avaliar `release-manager.role.md`.
- [ ] `operations/devops`: revisar skills:
  - `configure-github-project.skill.md`
  - `configure-environments.skill.md`
  - `setup-ci.skill.md`
  - `plan-deployment.skill.md`
  - `define-observability.skill.md`
- [ ] `operations/devops`: revisar playbooks:
  - `configure-github-project.playbook.md`
  - `configure-environments.playbook.md`
  - `setup-ci-cd.playbook.md`
  - `plan-deployment.playbook.md`
  - `define-observability.playbook.md`
  - `release-operations.playbook.md`

- [ ] `operations/security`: criar `AGENT.md` como Security Lead.
- [ ] `operations/security`: criar `knowledge/` para baseline de seguranca.
- [ ] `operations/security`: manter no MVP inicial:
  - `knowledge/threat-model.md`
  - `knowledge/access-control.md`
  - `knowledge/data-protection.md`
  - avaliar `knowledge/security-baseline.md`.
- [ ] `operations/security`: revisar roles:
  - `security-reviewer.role.md`
  - avaliar `privacy-reviewer.role.md` apenas se nao virar escopo juridico pesado.
- [ ] `operations/security`: revisar skills:
  - `threat-model.skill.md`
  - `review-security.skill.md`
  - avaliar `access-control-review.skill.md`.
- [ ] `operations/security`: revisar playbooks:
  - `security-checklist.playbook.md`
  - `security-review.playbook.md`
- [ ] `operations/security`: garantir participacao condicional em sub-issues apenas quando houver dados, auth, permissoes, privacidade, abuso ou compliance.

- [ ] `operations/workflows`: revisar workflows de departamento:
  - `issue-delivery-cycle.workflow.md`
  - `mvp-to-pr.workflow.md`
  - `post-merge-continuation.workflow.md`
- [ ] `operations/workflows`: garantir que workflows de departamento roteiem para area AGENTs, nao diretamente para roles quando houver area AGENT.

#### Growth areas

- [ ] `growth/customer-experience`: criar `AGENT.md` como Customer Experience Lead.
- [ ] `growth/customer-experience`: criar `knowledge/` para sinais e aprendizado pos-lancamento.
- [ ] `growth/customer-experience`: manter no MVP inicial:
  - `knowledge/customer-feedback.md`
  - `knowledge/support-notes.md`
  - `knowledge/success-moments.md`
  - `knowledge/churn-reasons.md`
- [ ] `growth/customer-experience`: revisar roles:
  - `cx-lead.role.md`
  - avaliar `customer-researcher.role.md` apenas se nao duplicar Strategy/Validation.
- [ ] `growth/customer-experience`: revisar skills:
  - `map-customer-feedback.skill.md`
  - `synthesize-support-patterns.skill.md`
- [ ] `growth/customer-experience`: revisar playbooks:
  - `customer-learning-loop.playbook.md`.

- [ ] `growth/marketing`: criar `AGENT.md` como Marketing/Growth Lead.
- [ ] `growth/marketing`: criar `knowledge/` para go-to-market inicial.
- [ ] `growth/marketing`: manter no MVP inicial:
  - `knowledge/positioning.md`
  - `knowledge/landing-page.md`
  - `knowledge/launch-plan.md`
  - `knowledge/acquisition-channels.md`
- [ ] `growth/marketing`: revisar roles:
  - `growth-lead.role.md`
  - avaliar `positioning-strategist.role.md` ou `copywriter.role.md` apenas se necessario.
- [ ] `growth/marketing`: revisar skills:
  - `define-positioning.skill.md`
  - `create-landing-page-copy.skill.md`
  - `create-launch-plan.skill.md`
- [ ] `growth/marketing`: revisar playbooks:
  - `mvp-launch.playbook.md`.
- [ ] `growth/marketing`: garantir que design visual de landing page seja roteado para `operations/design` quando necessario.

- [ ] `growth/finance`: decidir se precisa de `AGENT.md` ou se README basta no MVP.
- [ ] `growth/finance`: criar `knowledge/` para modelo financeiro basico.
- [ ] `growth/finance`: manter no MVP inicial:
  - `knowledge/pricing.md`
  - `knowledge/revenue-model.md`
  - `knowledge/unit-economics.md`
  - `knowledge/budget.md`
  - `knowledge/finance-risks.md`
- [ ] `growth/finance`: revisar roles:
  - `finance-operator.role.md`.
- [ ] `growth/finance`: revisar skills:
  - `review-pricing.skill.md`
  - `model-unit-economics.skill.md`.
- [ ] `growth/finance`: revisar playbooks:
  - `finance-review.playbook.md`.

- [ ] `growth/workflows`: revisar `launch-learning-loop.workflow.md` para usar area AGENTs e knowledge paths atualizados.

#### Conteudo minimo por arquivo

- [ ] Knowledge files devem ser scaffolds estruturados e preenchiveis, nao arquivos quase vazios.
- [ ] Cada knowledge file deve ter secoes especificas ao assunto, como foi feito em Design:
  - contexto atual
  - decisoes
  - criterios
  - riscos
  - perguntas abertas
  - proxima revisao
- [ ] Role files devem declarar:
  - responsabilidade
  - quando usar
  - contexto que deve carregar
  - skills disponiveis
  - playbooks recomendados
  - output esperado
  - red lines especificas.
- [ ] Skill files devem declarar:
  - capability reutilizavel
  - inputs
  - metodo
  - checks
  - output
  - limites.
- [ ] Playbook files devem declarar:
  - objetivo
  - entradas
  - passos
  - decisoes/confirmacoes
  - arquivos que pode atualizar
  - arquivos que nao pode atualizar
  - output esperado.
- [ ] Area AGENTs devem ser curtos e focados em roteamento, como `operations/design/AGENT.md`.
- [ ] READMEs devem explicar a pasta e apontar rotas, sem repetir todas as regras do AGENT.

#### Validacao e preview

- [ ] Atualizar `packages/cli/scripts/validate-generator.mjs` para validar o padrao por area.
- [ ] Atualizar fixture `examples/client-workspace/`.
- [ ] Atualizar `examples/client-workspace-tree.md`.
- [ ] Garantir que areas desativadas nao gerem AGENT, knowledge, roles, skills ou playbooks.
- [ ] Garantir que indexes nao apontem para arquivos removidos ou movidos.
- [ ] Rodar:
  - `npm --prefix packages/cli run build`
  - `npm run generate:client-workspace`
  - `node packages/cli/scripts/validate-generator.mjs`
  - `npm test`
  - `node packages/cli/dist/index.js --help`
  - `git diff --check`

## 8. Definicao de MVP pronto para teste externo

O MVP esta pronto para teste externo quando um usuario consegue:

- [ ] Rodar `npx lean-os ai`.
- [ ] Criar o workspace sem sobrescrever arquivos importantes por acidente.
- [ ] Abrir o workspace em VS Code, Codex, Claude ou outro agente.
- [ ] Rodar `/start-leanos`.
- [ ] Ser guiado por uma primeira sessao clara.
- [ ] Preencher Strategy com confirmacao.
- [ ] Rodar `/define mvp`.
- [ ] Rodar `/check coherence`.
- [ ] Gerar plano de issues ou execucao.
- [ ] Continuar o trabalho em uma nova sessao sem perder contexto.

## Ordem Recomendada

1. Fortalecer `/start-leanos`.
2. Mapear fluxos em `TEMP-automation-flows.md`.
3. Detalhar `Idea-to-roadmap`.
4. Detalhar `Roadmap-sync-to-GitHub-Projects`.
5. Detalhar `Epic-to-sub-issues`.
6. Detalhar `Issue implementation`.
7. Padronizar `/check coherence` e `/define mvp`.
8. Tornar o ciclo de validacao explicito.
9. Revisar artefatos GitHub/API.
10. Fortalecer `ai-standard/` como source-of-truth do framework.
11. Preparar release publica.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados ou movidos para issues oficiais.
