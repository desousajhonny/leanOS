# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens relevantes forem implementados, validados e incorporados ao fluxo normal do projeto ou movidos para issues oficiais.

Ultima limpeza: 2026-06-22.

## Estado Atual

O LeanOS ja tem um MVP forte de framework e scaffold:

- CLI `npx lean-os ai` com dois modos oficiais:
  - `new-product-workspace`
  - `existing-product-repo`
- workspace cliente com `AGENT.md`, `leanos.yaml`, `.leanos/`, `ai-standard/`, `strategy/`, `operations/`, `growth/` e `.github/`.
- LeanOS Chief preparado para VS Code/Copilot via `.github/agents/leanos-chief.agent.md`.
- prompt de inicio seguro via `/start-leanos`.
- arquitetura Navigation Chain:
  - `Root AGENT.md -> Department AGENT.md/README.md -> Area AGENT.md/README.md -> Role -> Skill -> Playbook -> Output`
- `ai-standard/` reorganizado como source-of-truth do framework.
- areas principais normalizadas com `AGENT.md`, `README.md`, `area.yaml`, `knowledge/`, `roles/`, `skills/` e `playbooks/`.
- `strategy/validation` saiu do scaffold padrao do MVP e fica como area opcional futura.

## Decisoes de Escopo

- [x] Nao expandir a arvore de pastas agora; a estrutura atual ja e suficiente para o MVP.
- [x] Manter `Company as a Product` como conceito de posicionamento e logica do framework.
- [x] Nao mover `Company as a Product` para dentro de `strategy/business/` como se fosse contexto operacional da empresa do usuario final.
- [x] Focar em profundidade operacional dos comandos, workflows e assets principais, nao em mais scaffolding.
- [x] Usar `TEMP-automation-flows.md` apenas como mapa historico/temporario dos fluxos.
- [x] Usar `TEMP-github-roadmap-flow.md` apenas como especificacao temporaria da futura camada GitHub.
- [x] Tratar `new-product-workspace` e `existing-product-repo` como modos oficiais de instalacao.
- [x] Manter GitHub/Vercel como readiness no MVP; nada de deploy automatico ou chamada remota sem confirmacao.
- [x] Manter UX chat-first: o founder fala a intencao no chat, e o LeanOS roteia para workflows, roles, skills e playbooks.

## Concluido

### 1. `/start-leanos`

- [x] Definido como bootstrap seguro, nao como comando generico.
- [x] Carrega contexto minimo: `AGENT.md`, `leanos.yaml`, `.leanos/context/*` e `.leanos/index/routing-map.yaml`.
- [x] Resume estado do workspace.
- [x] Identifica lacunas.
- [x] Propoe arquivos elegiveis para preenchimento.
- [x] Pede confirmacao antes de qualquer alteracao.
- [x] Nao enriquece roles, skills, playbooks, workflows, commands ou `ai-standard/` com contexto de empresa/produto durante init.
- [x] Funciona como comando de chat para VS Code, Codex, Claude, Gemini, Copilot e outros modelos.

### 2. `ai-standard/`

- [x] Criada taxonomia clara de assets.
- [x] Reorganizado em:
  - `foundation/`
  - `templates/`
  - `checklists/`
  - `instructions/`
  - `examples/`
- [x] Templates separados por categoria.
- [x] Checklists especificos por asset.
- [x] Instructions especificas por criacao.
- [x] Examples separados por categoria.
- [x] `ai-standard/README.md` funciona como roteador, sem exigir que o modelo carregue tudo.
- [x] `AGENT.md` raiz aponta para `ai-standard/README.md` quando precisar criar ou validar assets do framework.

### 3. Estrutura de areas

- [x] `strategy/business` normalizado.
- [x] `strategy/product` normalizado.
- [x] `strategy/roadmap` normalizado.
- [x] `strategy/validation` removido do MVP padrao e mantido como opcional futura.
- [x] `operations/product-ops` normalizado.
- [x] `operations/design` normalizado.
- [x] `operations/engineering` normalizado.
- [x] `operations/devops` normalizado.
- [x] `operations/security` normalizado.
- [x] `growth/customer-experience` normalizado.
- [x] `growth/marketing` normalizado.
- [x] `growth/finance` normalizado.

### 4. GitHub readiness inicial

- [x] Templates de issue, epic, sub-issue, PR, branch e readiness matrix criados no `ai-standard`.
- [x] Regras de branch por issue definidas.
- [x] Regras de PR e PR review definidas.
- [x] `.github/leanos/` preparado sem segredos.
- [x] `.env.local` gerado apenas quando o usuario escolhe preparar GitHub management.
- [x] Tokens reais nao sao persistidos pelo framework.
- [x] Fluxo conceitual Roadmap -> GitHub Project -> Epic -> Sub-issues -> Implementation documentado temporariamente.

### 5. Security baseline

- [x] `operations/security` cobre baseline minimo para MVP.
- [x] Inclui threat model, access control, data protection, database security, secrets, secure coding, infra hardening, incident response e security automation readiness.
- [x] Security entra condicionalmente em issues quando houver dados, auth, permissoes, privacidade, abuso, compliance, API, banco, secrets, infra, dependencia ou risco de codigo gerado por IA.

## Pendencias Ativas

### Regra de Execucao Para Esta Fase

Antes de padronizar comandos, fortalecer os workflows.

Racional:

- Comandos sao portas de entrada estaveis para intents conhecidas.
- Intencoes naturais do founder podem acionar o mesmo caminho sem slash command.
- Workflows sao donos do processo quando ha varias etapas, areas ou handoffs.
- Playbooks executam tarefas praticas dentro de uma area.
- Capabilities/scripts entram apenas no fim, quando houver confirmacao e necessidade de acao externa.

Plano passo a passo:

- [ ] Primeiro, mapear as intencoes principais do founder para workflows locais.
- [ ] Depois, revisar cada workflow para declarar contexto, participantes, sequencia, checkpoints, handoffs e output.
- [ ] Depois, ajustar comandos para carregar o workflow certo em vez de conter toda a logica do processo.
- [ ] Depois, garantir que pedidos em linguagem natural caiam no mesmo workflow que o comando equivalente.
- [ ] Depois, conectar GitHub/capabilities apenas como etapa final confirmada do workflow.
- [ ] Por fim, rodar a Founder Journey completa para validar se o modelo navega sem pular etapas.

### 1. Padronizar Comandos Principais

Status: importante, mas deve ser executado depois da revisao dos workflows.

Objetivo: garantir que os comandos centrais sejam portas de entrada consistentes, previsiveis, confirmaveis e roteadas pela Navigation Chain.

Regras gerais:

- [ ] Todo comando deve carregar contexto minimo antes de agir.
- [ ] Todo comando que aciona trabalho multi-area deve carregar o workflow correspondente antes de entrar em roles, skills ou playbooks.
- [ ] O comando nao deve duplicar a logica completa do workflow; ele deve normalizar a intencao, carregar contexto e apontar para o processo correto.
- [ ] Todo comando deve declarar:
  - purpose
  - load first
  - routing
  - allowed updates
  - forbidden updates
  - confirmation rule
  - expected output
- [ ] Todo comando que altera arquivo deve propor primeiro e escrever somente apos confirmacao.
- [ ] Todo comando que envolve GitHub/API deve gerar plano ou payload antes de qualquer chamada remota.
- [ ] Nenhum comando deve apontar para area inativa sem aviso explicito.
- [ ] Slash commands continuam como atalhos; a experiencia principal deve continuar chat-first.
- [ ] Pedido em linguagem natural e slash command equivalente devem seguir o mesmo workflow.

#### `/check coherence`

- [ ] Definir score de coerencia.
- [ ] Listar alinhamentos.
- [ ] Listar inconsistencias.
- [ ] Listar riscos.
- [ ] Recomendar proximo passo.
- [ ] Evitar recomendar areas inativas sem aviso.
- [ ] Verificar coerencia entre Strategy, MVP, Roadmap, Design, Security e Engineering quando essas areas estiverem ativas.

#### `/define mvp`

- [ ] Definir inputs obrigatorios.
- [ ] Carregar Strategy antes de Operations.
- [ ] Roteiar para `operations/product-ops/AGENT.md`.
- [ ] Separar:
  - MVP scope
  - non-goals
  - user stories
  - user flows
  - acceptance criteria
  - release checklist
  - PRD, quando fizer sentido
- [ ] Evitar definir MVP sem problema, ICP e value proposition minimamente claros.
- [ ] Pedir confirmacao antes de atualizar arquivos.

#### `/create issues`

- [ ] Converter MVP/roadmap em epics e sub-issues GitHub-ready.
- [ ] Usar templates de epic e sub-issue em `ai-standard/templates/github/`.
- [ ] Aplicar Delivery Readiness Matrix (DRM) com Product Ops, Design, Engineering, Security e DevOps conforme necessidade da issue.
- [ ] Design participa apenas quando houver UX, UI, fluxo, acessibilidade, copy ou experiencia de tela.
- [ ] Security participa quando houver dados, auth, privacidade, API, banco, secrets, compliance, infra ou risco de abuso.
- [ ] Incluir acceptance criteria.
- [ ] Incluir links para arquivos de contexto.
- [ ] Marcar dependencias, riscos e perguntas abertas.
- [ ] Gerar payload/draft antes de criar qualquer issue real.
- [ ] Exigir confirmacao antes de qualquer chamada GitHub.

#### `/workon issue`

- [ ] Carregar issue do GitHub ou draft local antes de planejar implementacao.
- [ ] Resumir a issue no chat para confirmacao do usuario.
- [ ] Roteiar para `operations/engineering/AGENT.md`.
- [ ] Exigir branch obrigatoria antes de editar codigo.
- [ ] Seguir naming convention de branch alinhada a issue.
- [ ] Definir plano de implementacao.
- [ ] Definir plano de testes.
- [ ] Identificar arquivos provaveis de mudanca.
- [ ] Respeitar Design e Security quando a issue exigir.

#### `/review pr`

- [ ] Validar PR contra escopo da issue.
- [ ] Validar contra acceptance criteria.
- [ ] Validar contra MVP scope quando aplicavel.
- [ ] Validar riscos de produto, design, seguranca e engenharia quando aplicavel.
- [ ] Separar bugs, riscos, perguntas e sugestoes.
- [ ] Usar templates e criterios de review em `ai-standard/templates/review/`.
- [ ] Evitar aprovar mudanca que contradiga contexto aprovado.

### 2. Revisar Workflows Locais

Status: primeira prioridade da proxima rodada.

Objetivo: transformar workflows em rotas realmente acionaveis pelos modelos, sem duplicar comandos e sem colocar workflow de negocio dentro de `.leanos/`.

Regras:

- [ ] Workflow coordena varias areas, etapas ou handoffs.
- [ ] Playbook executa uma tarefa pratica dentro de uma area.
- [ ] Workflows de negocio vivem no departamento/area dona do fluxo.
- [ ] `.leanos/` fica como runtime leve: commands, context, indexes e integracao.
- [ ] Workflows devem apontar para department/area AGENTs quando eles existirem.
- [ ] Workflows nao devem pular direto para role quando a area tem `AGENT.md`.
- [ ] Workflows devem declarar areas requeridas e disponibilidade.
- [ ] Workflows nao devem apontar para paths ausentes.

Decisao de delivery:

- [ ] Separar Issue Shaping de Issue Delivery.
- [ ] Issue Shaping acontece antes do desenvolvimento, principalmente em `operations/product-ops/playbooks/epic-to-subissues.playbook.md`.
- [ ] Issue Shaping aplica a Delivery Readiness Matrix (DRM) para envolver Product Ops, Design, Engineering, Security e DevOps quando aplicavel.
- [ ] Issue Delivery assume que a issue idealmente ja veio pronta; ele faz recheck, atualiza riscos e so entao inicia branch, implementacao, testes, PR e review.
- [ ] Product Ops, Design, Security e DevOps nao devem redescobrir tudo no momento de implementacao; entram como checkpoint quando a issue esta incompleta, mudou ou revelou risco novo.

Cada workflow deve responder:

- [ ] Qual intencao do founder dispara este workflow?
- [ ] Qual comando, se existir, tambem aponta para ele?
- [ ] Qual departamento e dono do workflow?
- [ ] Quais areas participam sempre?
- [ ] Quais areas entram condicionalmente?
- [ ] Qual contexto deve ser carregado primeiro?
- [ ] Qual e a sequencia de etapas?
- [ ] Onde ha checkpoints de confirmacao do usuario?
- [ ] Quais arquivos podem ser atualizados?
- [ ] Quais arquivos nao podem ser atualizados?
- [ ] Quando uma capability/script externo pode ser chamado?
- [ ] Qual output final esperado?

#### Workflow Map - Founder Journey Completa

Jornadas internas devem ser criadas em `docs/framework/founder-journeys/` usando `journey-template.md`.

| Etapa | Scaffold atualizado | Jornada criada | Momento | Workflow / Entrada | Intencao do Founder | Dono | Roles Principais | Playbooks Principais | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | [ ] | [ ] `docs/framework/founder-journeys/start-leanos.md` | Setup inicial | `.leanos/commands/start-leanos.md` + Strategy Baseline | "vamos comecar", "configurar o LeanOS", "iniciar o projeto" | LeanOS Chief + Strategy | Business Strategist, Product Strategist | `business-foundation`, `product-strategy` | Existe, garantir Strategy Baseline minima |
| 1 | [ ] | [ ] `docs/framework/founder-journeys/define-mvp.md` | Primeira definicao do produto | `operations/workflows/define-mvp.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Defina o MVP", "qual a primeira versao?", "o que entra no MVP?" | Product Ops | Product Owner, Delivery Architect, Product Designer quando aplicavel, Security Reviewer quando aplicavel | `mvp-delivery`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Playbook existe, decidir se vira workflow |
| 2 | [x] | [x] `docs/framework/founder-journeys/new-idea-intake.md` | Novas ideias e features | `strategy/workflows/new-idea-intake.workflow.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" | Strategy | Product Strategist, Product Manager, Business Strategist, Roadmap Planner | `product-strategy`, `business-foundation`, `roadmap-cycle-planning`, `mvp-delivery` | Jornada criada e scaffold ajustado para separar intake de roadmap |
| 3 | [ ] | [ ] `docs/framework/founder-journeys/idea-to-roadmap.md` | Decisao de roadmap | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" | Strategy / Roadmap | Product Strategist, Product Manager, Roadmap Planner | `roadmap-cycle-planning`, `product-strategy` | Deve transformar ideia validada em item de roadmap, sem assumir MVP ou GitHub |
| 4 | [ ] | [ ] `docs/framework/founder-journeys/roadmap-item-to-mvp-scope.md` | Decisao de MVP | `operations/workflows/roadmap-item-to-mvp-scope.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Isso entra no MVP?", "esse item precisa ir para a primeira versao?" | Product Ops + Strategy | Product Owner, Product Strategist, Delivery Architect, Product Designer/Security quando aplicavel | `mvp-delivery`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Decide se um item de roadmap vira escopo de MVP |
| 5 | [ ] | [ ] `docs/framework/founder-journeys/mvp-to-epic.md` | Planning de execucao | `operations/workflows/mvp-to-epic.workflow.md` ou `strategy/workflows/roadmap-to-github-project.workflow.md` | "Deseja quebrar o MVP em epics?", "crie os epics no GitHub" | Product Ops + DevOps | Product Owner, Roadmap Planner, GitHub DevOps, Senior Developer quando aplicavel | `roadmap-sync-prep`, `configure-github-project`, `delivery-readiness` | MVP scope deve virar trabalho rastreavel antes de implementacao |
| 6 | [ ] | [ ] `docs/framework/founder-journeys/epic-to-subissues.md` | Issue Shaping | `operations/workflows/epic-to-subissues.workflow.md` | "Quebre o epic #123 em sub-issues" | Operations / Product Ops | Product Owner, Product Designer, Security Reviewer, DevOps Engineer, Senior Developer | `epic-to-subissues`, `delivery-readiness`, `mvp-ux-flow`, `accessibility-review`, `pre-mvp-security-checklist`, `api-security-review`, `setup-ci-cd` | Falta criar workflow |
| 7 | [ ] | [ ] `docs/framework/founder-journeys/issue-delivery-cycle.md` | Implementacao | `operations/workflows/issue-delivery-cycle.workflow.md` | "Implemente a issue #554", "vamos comecar essa feature" | Operations / Engineering | Product Owner, Senior Developer, Test Engineer, PR Reviewer, Security Reviewer quando aplicavel | `delivery-readiness`, `branch-from-issue`, `issue-to-pr`, `test-planning`, `pr-validation`, `ai-generated-code-security-review` | Existe, precisa fortalecer |
| 8 | [ ] | [ ] `docs/framework/founder-journeys/review-pr.md` | Review e PR | Dentro de `issue-delivery-cycle` ou futuro workflow de review | "Revise o PR", "esta pronto para merge?" | Engineering + Security/DevOps quando aplicavel | PR Reviewer, Test Engineer, Security Reviewer, Release Manager | `pr-validation`, `pre-deploy-security-review`, `security-automation-readiness`, `release-operations` | Coberto por playbooks, talvez nao precise workflow separado |
| 9 | [ ] | [ ] `docs/framework/founder-journeys/post-merge-continuation.md` | Pos-merge | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a proxima issue", "o que atualizamos depois do merge?" | Operations | Product Owner, Senior Developer, Release Manager, CX Lead quando aplicavel | `release-operations`, `delivery-readiness`, `customer-learning-loop` | Existe, precisa fortalecer |
| 10 | [ ] | [ ] `docs/framework/founder-journeys/launch-learning-loop.md` | Lancamento e aprendizado | `growth/workflows/launch-learning-loop.workflow.md` | "Lancamos, o que aprendemos?", "como melhorar aquisicao/conversao?" | Growth | Growth Lead, CX Lead, Finance Operator | `mvp-launch`, `customer-learning-loop`, `finance-review` | Existe, pode ficar lean para depois |

MVP continua sendo o nome principal da etapa. O criterio de qualidade deve incluir uma Lovable Baseline:

- [ ] fluxo principal compreensivel;
- [ ] proposta de valor clara;
- [ ] experiencia minima digna;
- [ ] acessibilidade basica;
- [ ] criterios de seguranca minimos;
- [ ] nao parecer prototipo descartavel quando entregue a usuario real.

#### Regra de Uso

- [ ] Workflow coordena a jornada entre areas.
- [ ] Playbook executa uma parte pratica dentro de uma area.
- [ ] Comandos e linguagem natural devem apontar para o workflow correto.
- [ ] Se uma etapa envolver mais de uma area, preferir workflow.
- [ ] Se uma etapa for execucao local de uma area, usar playbook.

#### Regra Roadmap, MVP e GitHub

- [ ] Nem todo item de roadmap precisa virar issue, epic ou milestone no GitHub.
- [ ] Roadmap pode conter direcao estrategica, oportunidades futuras, backlog de produto e ideias ainda nao priorizadas.
- [ ] Todo item marcado como parte do MVP precisa virar trabalho executavel e rastreavel antes de implementacao.
- [ ] Um item de MVP deve passar por `mvp-to-epic` antes de Engineering iniciar desenvolvimento.
- [ ] Um epic de MVP deve passar por `epic-to-subissues` antes de virar trabalho de implementacao.
- [ ] GitHub Project deve representar principalmente o que esta em execucao, em preparacao para execucao ou explicitamente selecionado para delivery.
- [ ] O modelo deve pedir confirmacao antes de promover item de roadmap para MVP, antes de criar epic e antes de criar sub-issues via API.

#### Ordem Para Implementar Os Workflows

1. `strategy/workflows/new-idea-intake.workflow.md`
2. `strategy/workflows/idea-to-roadmap.workflow.md`
3. `operations/workflows/roadmap-item-to-mvp-scope.workflow.md` ou manter como fase de Product Ops
4. `operations/workflows/mvp-to-epic.workflow.md`
5. `operations/workflows/epic-to-subissues.workflow.md`
6. `operations/workflows/issue-delivery-cycle.workflow.md`
7. Decidir destino de `operations/workflows/mvp-to-pr.workflow.md`
8. `operations/workflows/post-merge-continuation.workflow.md`
9. `operations/workflows/define-mvp.workflow.md` ou manter como playbook em Product Ops
10. `strategy/workflows/roadmap-to-github-project.workflow.md`
11. `growth/workflows/launch-learning-loop.workflow.md`

Workflows a revisar:

- [ ] `operations/product-ops/playbooks/epic-to-subissues.playbook.md`
  - primeira execucao desta fase;
  - deve ser o processo oficial de Issue Shaping;
  - deve usar Delivery Readiness Matrix (DRM);
  - deve produzir sub-issues GitHub-ready antes do desenvolvimento;
  - deve envolver Design, Security e DevOps apenas quando aplicavel;
  - deve parar antes de qualquer GitHub API write sem confirmacao.

- [ ] `.leanos/commands/start-leanos.md`
  - deve criar Strategy Baseline minima, nao MVP completo;
  - baseline minima: negocio, produto/ideia principal, usuario alvo, problema/dor, promessa de valor, alternativa atual, hipotese mais arriscada e foco imediato;
  - deve deixar MVP scope como proximo passo quando ainda nao estiver definido.

- [ ] `operations/workflows/define-mvp.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md`
  - deve usar Strategy Baseline como entrada;
  - se Strategy Baseline nao existir, deve fazer perguntas de baseline antes de definir MVP;
  - deve definir MVP scope, non-goals, PRD, user stories, user flows, acceptance criteria e release checklist;
  - deve incluir Lovable Baseline como criterio de qualidade do MVP.

- [x] `strategy/workflows/new-idea-intake.workflow.md`
  - deve servir para ideias novas e features propostas em produtos ja iniciados;
  - deve capturar, qualificar e decidir o destino da ideia antes de qualquer roadmap change;
  - deve detalhar como o Product Strategist valida a ideia contra ICP, problema, valor, foco atual, evidencias e custo de oportunidade;
  - deve passar por Business, Product e Roadmap;
  - deve usar validacao leve em `strategy/product/knowledge/validation-notes.md`;
  - nao deve exigir `strategy/validation` no MVP padrao.
  - saidas possiveis: descartar, manter como pergunta aberta, registrar validation note ou propor promocao para roadmap.
- [ ] `strategy/workflows/idea-to-roadmap.workflow.md`
  - deve transformar uma ideia validada em item de roadmap;
  - deve definir problema, usuario afetado, valor esperado, dependencia, prioridade inicial e horizonte;
  - nao deve marcar automaticamente como MVP;
  - deve perguntar de forma founder-friendly se a ideia deve entrar no backlog/roadmap.
- [ ] `operations/workflows/roadmap-item-to-mvp-scope.workflow.md`
  - deve decidir se um item de roadmap entra no MVP;
  - deve atualizar MVP scope, PRD, non-goals, riscos e criterios minimos quando confirmado;
  - deve registrar por que o item entrou ou nao entrou no MVP;
  - deve preparar o item para `mvp-to-epic` quando aprovado.
- [ ] `operations/workflows/mvp-to-epic.workflow.md`
  - deve transformar itens de MVP em epics rastreaveis;
  - deve preparar payload/draft para GitHub Project quando configurado;
  - deve manter fora do GitHub itens de roadmap que nao estao selecionados para delivery;
  - deve pedir confirmacao antes de criar ou atualizar epics.
- [ ] `strategy/workflows/roadmap-to-github-project.workflow.md`
  - deve preparar sync de roadmap para GitHub;
  - deve focar em itens de MVP, current cycle e itens explicitamente selecionados para delivery;
  - deve tratar GitHub como plano/payload/dry-run antes de chamada real;
  - deve envolver Product/Roadmap e DevOps apenas para readiness/configuracao.
- [ ] `operations/workflows/issue-delivery-cycle.workflow.md`
  - deve coordenar Product Ops, Engineering, Design condicional, Security condicional e review.
- [ ] `operations/workflows/mvp-to-pr.workflow.md`
  - deve ser revisado para decidir se continua necessario ou se foi absorvido por issue-delivery-cycle.
- [ ] `operations/workflows/post-merge-continuation.workflow.md`
  - deve orientar retorno pos-merge: atualizar contexto, proxima issue, riscos e follow-up.
- [ ] `growth/workflows/launch-learning-loop.workflow.md`
  - deve continuar lean e usar area AGENTs/knowledge paths atualizados.

### 3. Camada GitHub Chat-First

Status: importante.

Objetivo: preparar a futura automacao GitHub sem transformar o founder em operador de terminal.

Decisao: o LeanOS Chief nao chama API diretamente. O modelo entende a intencao, carrega contexto, propoe plano/payload e pede confirmacao. A execucao real fica para capability/script seguro.

Pendencias:

- [ ] Reescrever `TEMP-github-roadmap-flow.md` ou mover o conteudo relevante para assets oficiais do workspace.
- [ ] Definir o fluxo GitHub como chat-first:
  - founder pede no chat;
  - modelo carrega contexto;
  - modelo prepara plano/draft/payload;
  - usuario confirma;
  - capability/script executa;
  - resultado volta para contexto.
- [ ] Definir capabilities futuras:
  - `github.configure`
  - `github.status`
  - `github.syncRoadmap`
  - `github.createSubissues`
  - `github.readIssue`
  - `github.createBranch`
  - `github.openPullRequest`
- [ ] Definir dry-run obrigatorio antes de escrita remota.
- [ ] Definir como registrar sync state sem segredos.
- [ ] Definir como evitar duplicidade em milestones, epics e sub-issues.
- [ ] Definir como lidar com repositorio existente vs produto novo.
- [ ] Documentar quais arquivos `.github/leanos/` sao configuracao, estado e templates.
- [ ] Garantir que tokens nunca sejam persistidos em arquivos versionados.

### 4. Teste Externo da Founder Journey

Status: importante.

Objetivo: validar se o MVP funciona para um founder real, sem depender de conhecimento interno do framework.

Cenario minimo:

- [ ] Rodar `npx lean-os ai`.
- [ ] Criar workspace novo.
- [ ] Instalar LeanOS em repo/produto existente sem sobrescrever arquivos importantes.
- [ ] Abrir workspace em VS Code, Codex, Claude ou outro agente.
- [ ] Selecionar LeanOS Chief quando aplicavel.
- [ ] Rodar `/start-leanos`.
- [ ] Definir Business/Product/Roadmap com confirmacao.
- [ ] Rodar `/define mvp`.
- [ ] Rodar `/define design` quando Design estiver ativo.
- [ ] Rodar `/check coherence`.
- [ ] Gerar plano de issues ou execucao.
- [ ] Simular `workon issue`.
- [ ] Simular `review pr`.
- [ ] Continuar o trabalho em uma nova sessao sem perder contexto.

Critérios de aceite:

- [ ] O usuario entende o proximo passo sem ler o template interno.
- [ ] O modelo navega pela cadeia correta.
- [ ] O modelo nao pula AGENTs de departamento/area.
- [ ] O modelo nao inventa workflow, role, skill ou playbook.
- [ ] O modelo nao modifica arquivos sensiveis sem confirmacao.
- [ ] O preview `examples/client-workspace/` representa exatamente o que o CLI gera.

### 5. Planejar Update/Migration de Workspaces

Status: futuro, nao bloqueia o MVP inicial.

Objetivo: preparar o caminho para evoluir workspaces ja criados sem destruir trabalho do usuario.

- [ ] Definir necessidade de um futuro `lean-os update`.
- [ ] Listar quais arquivos sao runtime do framework e podem receber update.
- [ ] Listar quais arquivos sao contexto/knowledge do cliente e nao devem ser sobrescritos.
- [ ] Definir estrategia de migracao segura:
  - detectar versao em `leanos.yaml`;
  - comparar arquivos runtime;
  - propor mudancas;
  - preservar alteracoes do usuario;
  - criar diff antes de aplicar.
- [ ] Nao implementar sem uma especificacao propria.

### 6. Preparar Release Publica do MVP

Status: pendente.

Objetivo: publicar uma versao confiavel para usuarios reais.

- [ ] Atualizar versao do pacote se necessario.
- [ ] Rodar build.
- [ ] Rodar validacao do gerador.
- [ ] Regenerar `examples/client-workspace/`.
- [ ] Rodar smoke test local com `node packages/cli/dist/index.js ai`.
- [ ] Rodar `npm publish --dry-run --access public` em `packages/cli`.
- [ ] Publicar somente apos confirmacao explicita.
- [ ] Testar via `npx lean-os ai` apos publicacao.

## Pendencias Futuras Nao Bloqueantes

### `/bootstrap product`

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir perguntas de stack: Next.js, Vite, API, dashboard ou outro.
- [ ] Definir defaults para founder iniciante.
- [ ] Definir como preparar Vercel sem criar `.vercel/` ou deploy automatico.
- [ ] Definir como preservar repositorios existentes.
- [ ] Garantir que o setup inicial nao cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json`.

### `strategy/validation`

- [ ] Reintroduzir como area opcional quando houver necessidade de discovery formal.
- [ ] Criar `AGENT.md` como Validation Lead.
- [ ] Criar `knowledge/` para evidencias, entrevistas, experimentos e aprendizado.
- [ ] Revisar roles, skills e playbooks de validacao formal.
- [ ] Garantir que ela nao volte a ser requisito do MVP padrao sem decisao explicita.

## Ordem Recomendada Atual

1. Revisar workflows locais.
2. Mapear intents naturais e comandos para esses workflows.
3. Padronizar comandos principais como portas de entrada, nao como donos do processo.
4. Formalizar camada GitHub chat-first como etapa final confirmada dos workflows.
5. Rodar teste externo da Founder Journey.
6. Ajustar lacunas descobertas no teste.
7. Preparar release publica do MVP.
8. Planejar update/migration.
9. Planejar `/bootstrap product`.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados, validados ou movidos para issues oficiais.
