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

- [x] Templates de issue, epic, feature, PR, branch e readiness matrix criados no `ai-standard`.
  - atualizar depois para linguagem product-first: Epic -> Feature -> Tasks, com GitHub issue como representacao remota.
- [x] Regras de branch por issue definidas.
- [x] Regras de PR e PR review definidas.
- [x] `.github/leanos/` preparado sem segredos.
- [x] `.env.local` gerado apenas quando o usuario escolhe preparar GitHub management.
- [x] Tokens reais nao sao persistidos pelo framework.
- [x] Fluxo conceitual Roadmap -> GitHub Project -> Epic -> Features -> Implementation documentado temporariamente.
  - revisar depois para Epic -> Features -> Tasks internas, mantendo GitHub como camada opcional.

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

- [ ] Converter delivery scope em Epics locais e, depois, Features com Tasks internas.
- [ ] Usar templates de Epic e Feature; GitHub templates ficam como representacao remota opcional.
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

- [ ] Separar Feature Shaping de Feature Delivery.
- [ ] Feature Shaping acontece antes do desenvolvimento, principalmente em futuro `operations/product-ops/playbooks/epic-to-features.playbook.md`.
- [ ] Feature Shaping aplica a Delivery Readiness Matrix (DRM) para envolver Product Ops, Design, Engineering, Security e DevOps quando aplicavel.
- [ ] Feature Delivery assume que a Feature idealmente ja veio pronta; ele faz recheck, atualiza riscos e so entao inicia branch, implementacao, testes, PR e review.
- [ ] Product Ops, Design, Security e DevOps nao devem redescobrir tudo no momento de implementacao; entram como checkpoint quando a Feature esta incompleta, mudou ou revelou risco novo.

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

#### Readiness Criteria / Gates

Objetivo: manter apenas gates fixos que realmente ajudam o modelo a decidir se pode avancar para desenvolvimento ou lancamento. O diagnostico do momento do produto continua no protocolo `where-we-are.md`; os gates abaixo sao reguas de decisao, nao status logs do produto.

- [x] Criar `operations/product-ops/knowledge/ready-to-develop.md`
  - define quando um roadmap item, delivery scope, epic ou issue pode entrar em desenvolvimento;
  - exige Product, Delivery Scope, Issue, Design, Security, Engineering e DevOps readiness como satisfeitos ou explicitamente nao aplicaveis;
  - e usado pelo protocolo `.leanos/agent/protocols/where-we-are.md`.
- [ ] Criar `ready-for-launch`
  - deve cobrir negocio, usabilidade, acessibilidade, seguranca, privacidade, DevOps, observabilidade, rollback, suporte, marketing/go-to-market e aprendizado pos-lancamento;
  - deve responder se o produto/release esta pronto para ir para usuarios reais, nao apenas se o codigo esta pronto.

#### Component Readiness / Design To Engineering

Objetivo: impedir que o modelo implemente UI improvisada, componentes duplicados ou componentes hardcoded sem contrato de Design. O Design decide e documenta o componente; Engineering implementa seguindo esse contrato.

Decisao proposta:

- [x] Documentar fluxo operacional de Component Readiness dentro de `feature-to-delivery-cycle`:
  - Founder pede implementacao de uma Feature ou GitHub Feature issue;
  - Root `AGENT.md` identifica intencao de delivery/implementacao e roteia para `operations/AGENT.md`;
  - `operations/AGENT.md` carrega `operations/workflows/feature-to-delivery-cycle.workflow.md`;
  - workflow entra primeiro em Product Ops para identificar Feature, Epic pai e readiness;
  - Product Ops usa `operations/product-ops/knowledge/ready-to-develop.md`;
  - se a Feature tem UI/tela/fluxo/componente, workflow roteia para Design antes de Engineering;
  - Design analisa componente existente vs componente novo;
  - se componente novo for necessario, Design cria/atualiza spec em `operations/design/knowledge/components/<component-name>.md` usando `ai-standard/templates/design/component-spec-template.md`;
  - Design atualiza `operations/design/knowledge/component-inventory.md`;
  - workflow volta ao readiness check;
  - Engineering so entra depois de Design readiness, Security readiness e DevOps readiness estarem prontos ou explicitamente nao aplicaveis.
- [x] Criar `operations/design/knowledge/component-inventory.md`
  - lista simples de componentes aprovados, planejados e gaps;
  - nao contem codigo fonte;
  - deve informar nome, proposito, status, onde e usado, notas e proximo passo.
- [x] Criar `ai-standard/templates/design/component-spec-template.md`
  - template base do framework para documentar componentes;
  - deve cobrir Purpose, When To Use, When Not To Use, Anatomy, Variants, States, Behavior, Accessibility, Content Rules, Design Tokens, Composition Rules, Engineering Notes, Do Not Do e Open Questions.
- [x] Criar `operations/design/skills/component-analysis.skill.md`
  - analisa se uma Feature com UI usa componente existente, adapta componente existente ou precisa de componente novo;
  - consulta `design-system.md`, `accessibility.md`, `user-flows.md` e `component-inventory.md`;
  - produz recomendacao de reuso/criacao e gaps para Engineering.
- [x] Criar `operations/design/playbooks/component-readiness.playbook.md`
  - executa a especificacao de componente quando a Feature precisa de componente novo;
  - usa o template `ai-standard/templates/design/component-spec-template.md`;
  - atualiza `component-inventory.md`;
  - cria ou recomenda criar uma spec concreta somente quando houver Feature real.
- [x] Criar `operations/engineering/skills/implement-component.skill.md`
  - implementa componente seguindo component spec, design system, acessibilidade e padroes do repositorio;
  - impede cores, copy, regra de negocio ou estado hardcoded quando deveriam vir do contrato de Design ou do sistema.
- [x] Criar `operations/engineering/playbooks/component-implementation.playbook.md`
  - sequencia pratica para Engineering implementar componente reutilizavel antes da tela/feature;
  - deve exigir leitura da component spec, design system, accessibility, component inventory e code standards;
  - deve incluir testes/validacao de estados, acessibilidade e composicao.
- [x] Atualizar `ready-to-develop.md`
  - se a Feature tem UI, os componentes necessarios devem estar conhecidos;
  - se um componente novo e necessario, a Feature nao esta `ready-to-code` ate Design criar ou confirmar a component spec;
  - Feature pode ter uma task de Design pendente antes de Engineering.
- [x] Atualizar `epic-to-features`
  - durante Feature Shaping, Design detecta necessidade de componentes;
  - nao precisa escrever spec completa nessa etapa;
  - deve adicionar task na Feature quando component spec for necessaria.
- [x] Atualizar `feature-to-delivery-cycle`
  - aceitar Feature local ou GitHub Feature issue, nunca Epic/roadmap/ideia solta direto;
  - iniciar por Operations workflow, nao por Root chamando Product Ops diretamente;
  - Product Ops e o primeiro checkpoint de readiness;
  - antes de Engineering codar, verificar se a Feature com UI tem component spec quando necessaria;
  - se faltar spec, rotear para Design antes de branch/codigo;
  - depois da spec aprovada, Engineering implementa o componente e entao a tela/feature;
  - se Design/Security/DevOps nao se aplicam, registrar explicitamente o motivo.
- [ ] Atualizar Engineering flow para componentes:
  - Engineering deve ler a component spec antes de implementar componente novo;
  - Engineering deve implementar primeiro o componente reutilizavel, validar estados/acessibilidade/testes, e so depois implementar a tela/feature que usa o componente;
  - Engineering nao pode criar componente novo sem spec ou confirmacao explicita de Design.
- [x] Criar/atualizar jornada `docs/framework/founder-journeys/feature-to-delivery-cycle.md`:
  - este e o proximo passo depois de fortalecer o workflow no scaffold;
  - mostrar caminho: Founder intent -> Root AGENT -> Operations AGENT -> feature-to-delivery-cycle -> Product Ops readiness -> Design component readiness se necessario -> Engineering -> PR validation;
  - deixar claro por que cada salto acontece: por regra do AGENT, por workflow ou por playbook;
  - incluir exemplo founder-friendly quando faltar component spec.
- [ ] Decidir estrutura para specs concretas de componentes:
  - opcao preferida: `operations/design/knowledge/components/<component-name>.md`;
  - nao gerar specs concretas no scaffold inicial;
  - criar arquivo apenas quando uma Feature real exigir componente novo.
- [ ] Planejar `screen-spec-template.md` para etapa futura:
  - provavel local: `ai-standard/templates/design/screen-spec-template.md`;
  - screen spec deve documentar tela/fluxo concreto, nao ser gerada no scaffold inicial;
  - deve cobrir layout, required components, actions, states, table rules, accessibility, responsive behavior e analytics/events quando aplicavel.

#### Product Work Taxonomy

Objetivo: definir uma linguagem product-first antes de implementar o proximo fluxo. O LeanOS nao deve depender do vocabulario do GitHub para organizar trabalho.

Decisao proposta:

- [x] Criar `operations/product-ops/knowledge/work-taxonomy.md`
  - deve explicar Roadmap, Backlog, Delivery Scope, Epic, Feature e Task;
  - deve deixar claro como cada item entra no sistema;
  - deve definir que Epic e uma initiative ou bloco grande de entrega;
  - deve definir que Epic e quebrado em Features;
  - deve definir que Feature contem Tasks internas;
  - deve definir que GitHub issue e representacao remota opcional, nao a linguagem central do LeanOS.
- [x] Atualizar linguagem do framework:
  - substituir termos antigos de decomposicao GitHub por "features" quando estivermos falando da decomposicao LeanOS local;
  - manter "issues" apenas para GitHub, PRs e tracking remoto;
  - tratar GitHub labels/templates como mapeamento: Epic -> issue `epic`, Feature -> issue `feature`, Task -> checklist interna ou task operacional.
- [x] Criar/ajustar templates:
  - criar `ai-standard/templates/product/epic-template.md`;
  - criar `ai-standard/templates/product/feature-template.md`;
  - revisar `ai-standard/templates/github/github-epic-template.md`;
  - revisar `ai-standard/templates/github/github-feature-template.md`;
  - garantir que o Epic tenha outcome, ownership, scope, non-goals, readiness matrix, riscos e expected features;
  - garantir que a Feature tenha parent epic, user story, acceptance criteria, tasks internas e DRM por Product Ops, Engineering, Design, Security e DevOps quando aplicavel.
- [x] Definir naming convention para titulos de Epic e Feature:
  - Epic deve ter prefixo claro, por exemplo `[EPIC] Customer Management` ou `[EPIC: Customer Management]`;
  - Feature deve ter prefixo claro, por exemplo `[FEATURE] Create customer profile` ou `[FEATURE: Customer Management] Create customer profile`;
  - evitar letras manuais tipo `[EPIC A]`, porque envelhecem mal quando a ordem muda;
  - se precisar de codigo estavel, preferir campo separado como `epic_key: customer-management` no YAML/frontmatter ou no corpo do template;
  - GitHub title deve seguir o mesmo padrao para facilitar busca, labels e sync.
- [x] Criar estrutura local para epics:
  - `operations/product-ops/epics/README.md`;
  - cada epic local vive em uma pasta propria: `operations/product-ops/epics/<epic-slug>/`;
  - `operations/product-ops/epics/<epic-slug>/README.md` descreve o Epic;
  - cada arquivo dentro da pasta do Epic representa uma Feature daquele Epic;
  - nao criar subpasta `features/` no MVP; tudo dentro da pasta do Epic e considerado parte dele;
  - Tasks ficam como checklist interna dentro de cada Feature;
  - GitHub sync deve mapear epic local para issue remota quando existir.
- [x] Definir ciclo de vida e ownership:
  - status de produto: `idea`, `candidate`, `scoped`, `ready`, `in-progress`, `blocked`, `done`;
  - status de sync remoto: `not_synced`, `sync_ready`, `synced`, `conflict`;
  - Roadmap/Backlog pertence a Strategy Roadmap;
  - Delivery Scope, Epic e Feature Shaping pertencem a Product Ops;
  - Task execution pertence a Engineering ou area responsavel;
  - Design, Security e DevOps entram como criterios condicionais na Feature.
- [x] Definir regra local vs GitHub:
  - LeanOS local e a fonte operacional primaria;
  - GitHub e camada opcional de tracking/sync;
  - se houver conflito entre local e GitHub, o modelo deve explicar a diferenca e pedir confirmacao antes de sobrescrever qualquer lado.
- [x] Definir DRM por Epic e Feature nos templates:
  - Epic-level DRM decide quais dimensoes precisam participar antes de quebrar o Epic;
  - Feature-level DRM transforma essas dimensoes em criterios concretos e tarefas internas;
  - Product Ops sempre;
  - Engineering sempre;
  - Design quando houver UX/UI/copy/acessibilidade/fluxo/tela;
  - Security quando houver dados/auth/API/privacy/permissoes/abuso/compliance;
  - DevOps quando houver ambiente/deploy/config/observabilidade/GitHub Project.
- [x] Aplicar a DRM completa no workflow/jornada `epic-to-features`.
- [x] Definir Definition of Ready:
  - Feature so entra em desenvolvimento depois de passar pelo `ready-to-develop`;
  - Feature pode existir localmente antes de estar pronta para desenvolvimento;
  - o modelo deve explicar gaps antes de sugerir implementacao.
- [x] Definir GitHub mapping:
  - Epic local -> GitHub issue com label `epic`;
  - Feature local -> GitHub issue com label `feature`;
  - Tasks -> checklist interna dentro da Feature issue por padrao;
  - criar issue separada para Task somente se houver necessidade operacional clara.
- [x] Planejar comando/chat intent `/github-sync`:
  - o modelo deve ler `operations/product-ops/epics/`;
  - identificar Epics/Features ainda nao sincronizados;
  - preparar payload/dry-run;
  - pedir confirmacao antes de criar/atualizar GitHub issues;
  - atualizar sync state sem segredos.
- [x] Avaliar pasta de sync local:
  - decisao: nao criar `operations/product-ops/epics/synced/` no scaffold inicial;
  - manter Epics e Features em `operations/product-ops/epics/`;
  - usar `.github/leanos/sync-state.yaml` como indice de sync remoto;
  - motivo: mover arquivos sincronizados pode esconder contexto util do modelo em planejamentos futuros.
- [x] Criar/ajustar skill:
  - manter `write-feature-criteria` como skill de criterios e usar o playbook `epic-to-features` para a quebra completa;
  - a skill deve gerar Features com Tasks internas;
  - cada Feature deve conter Product Ops, Engineering e DRM aplicavel: Design, Security e DevOps quando necessario.
- [x] Criar/ajustar playbook:
  - manter `epic-to-features` como playbook oficial de Feature Shaping;
  - o playbook deve quebrar Epic em Features;
  - Tasks ficam dentro de cada Feature;
  - GitHub sync de Features vira etapa opcional posterior.
- [x] Atualizar workflows e jornadas:
  - `delivery-scope-to-epic` termina em Epic local, com GitHub sync opcional;
  - proximo fluxo passa a ser `epic-to-features`;
  - `feature-to-delivery-cycle` deve aceitar Feature local ou GitHub issue como entrada, desde que passe pelo `ready-to-develop`.

#### Workflow Map - Founder Journey Completa

Jornadas internas devem ser criadas em `docs/framework/founder-journeys/` usando `journey-template.md`.

| Etapa | Scaffold atualizado | Jornada criada | Momento | Workflow / Entrada | Intencao do Founder | Dono | Roles Principais | Playbooks Principais | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | [ ] | [ ] `docs/framework/founder-journeys/start-leanos.md` | Setup inicial | `.leanos/commands/start-leanos.md` + Strategy Baseline | "vamos comecar", "configurar o LeanOS", "iniciar o projeto" | LeanOS Chief + Strategy | Business Strategist, Product Strategist | `business-foundation`, `product-strategy` | Existe, garantir Strategy Baseline minima |
| 1 | [ ] | [ ] `docs/framework/founder-journeys/define-mvp.md` | Primeira definicao do produto | `operations/workflows/define-mvp.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Defina o MVP", "qual a primeira versao?", "o que entra no MVP?" | Product Ops | Product Owner, Delivery Architect, Product Designer quando aplicavel, Security Reviewer quando aplicavel | `mvp-delivery`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Playbook existe, decidir se vira workflow |
| 2 | [x] | [x] `docs/framework/founder-journeys/new-idea-intake.md` | Novas ideias e features | `strategy/workflows/new-idea-intake.workflow.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" | Strategy | Product Strategist, Product Manager, Business Strategist, Roadmap Planner | `product-strategy`, `business-foundation`, `roadmap-cycle-planning`, `mvp-delivery` | Jornada criada e scaffold ajustado para separar intake de roadmap |
| 3 | [x] | [x] `docs/framework/founder-journeys/idea-to-roadmap.md` | Decisao de roadmap | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" | Strategy / Roadmap | Product Strategist, Product Manager, Roadmap Planner | `roadmap-cycle-planning`, `product-strategy` | Jornada criada; scaffold existente validado; gap futuro: delivery scope deve ser contexto opcional no Roadmap Planner |
| 4 | [x] | [x] `docs/framework/founder-journeys/roadmap-item-to-delivery-scope.md` | Decisao de delivery scope | `operations/workflows/roadmap-item-to-delivery-scope.workflow.md` | "Isso entra na proxima entrega?", "isso entra no MVP?", "qual milestone recebe esse item?" | Product Ops + Strategy | Product Owner, Product Strategist, Delivery Architect, Product Designer/Security quando aplicavel | `delivery-scope-planning`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Jornada criada e scaffold atualizado; MVP e apenas um tipo de delivery scope |
| 5 | [x] | [x] `docs/framework/founder-journeys/delivery-scope-to-epic.md` | Planning de execucao | `operations/workflows/delivery-scope-to-epic.workflow.md` | "Deseja quebrar esse escopo em epics?", "crie os epics no GitHub" | Product Ops + DevOps | Product Owner, Roadmap Planner, GitHub DevOps, Senior Developer quando aplicavel | `roadmap-sync-prep`, `configure-github-project`, `delivery-readiness` | Jornada criada e scaffold atualizado; GitHub write exige confirmacao |
| 6 | [x] | [x] `docs/framework/founder-journeys/epic-to-features.md` | Feature Shaping | `operations/workflows/epic-to-features.workflow.md` | "Quebre esse epic em features", "quais features precisamos para esse epic?" | Operations / Product Ops | Product Owner, Product Designer, Security Reviewer, DevOps Engineer, Senior Developer | `epic-to-features`, `delivery-readiness`, `mvp-ux-flow`, `accessibility-review`, `pre-mvp-security-checklist`, `api-security-review`, `setup-ci-cd` | Jornada criada; scaffold deve gerar workflow local e aplicar DRM completa |
| 7 | [x] | [x] `docs/framework/founder-journeys/feature-to-delivery-cycle.md` | Implementacao | `operations/workflows/feature-to-delivery-cycle.workflow.md` | "Implemente a feature", "implemente a issue #554", "vamos comecar essa feature" | Operations / Engineering | Product Owner, Product Designer quando UI/componente for afetado, Senior Developer, Test Engineer, PR Reviewer, Security Reviewer quando aplicavel | `delivery-readiness`, `component-readiness`, `branch-from-issue`, `issue-to-pr`, `test-planning`, `pr-validation`, `ai-generated-code-security-review` | Scaffold fortalecido com Component Readiness; jornada criada; falta criar assets concretos de component readiness |
| 8 | [ ] | [ ] `docs/framework/founder-journeys/review-pr.md` | Review e PR | Dentro de `feature-to-delivery-cycle` ou futuro workflow de review | "Revise o PR", "esta pronto para merge?" | Engineering + Security/DevOps quando aplicavel | PR Reviewer, Test Engineer, Security Reviewer, Release Manager | `pr-validation`, `pre-deploy-security-review`, `security-automation-readiness`, `release-operations` | Coberto por playbooks, talvez nao precise workflow separado |
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
- [ ] Um item de delivery scope deve passar por `delivery-scope-to-epic` antes de Engineering iniciar desenvolvimento.
- [ ] Um epic de MVP deve passar por `epic-to-features` antes de virar trabalho de implementacao.
- [ ] GitHub Project deve representar principalmente o que esta em execucao, em preparacao para execucao ou explicitamente selecionado para delivery.
- [ ] O modelo deve pedir confirmacao antes de promover item de roadmap para delivery scope, antes de criar epic e antes de sincronizar epics/features com GitHub.

#### Ordem Para Implementar Os Workflows

1. `strategy/workflows/new-idea-intake.workflow.md`
2. `strategy/workflows/idea-to-roadmap.workflow.md`
3. `operations/workflows/roadmap-item-to-delivery-scope.workflow.md` ou manter como fase de Product Ops
4. `operations/workflows/delivery-scope-to-epic.workflow.md`
5. `operations/workflows/epic-to-features.workflow.md`
6. `operations/workflows/feature-to-delivery-cycle.workflow.md`
7. Decidir destino de `operations/workflows/mvp-to-pr.workflow.md`
8. `operations/workflows/post-merge-continuation.workflow.md`
9. `operations/workflows/define-mvp.workflow.md` ou manter como playbook em Product Ops
10. `strategy/workflows/roadmap-to-github-project.workflow.md`
11. `growth/workflows/launch-learning-loop.workflow.md`

Workflows a revisar:

- [x] `operations/product-ops/playbooks/epic-to-features.playbook.md`
  - primeira execucao desta fase;
  - deve ser o processo oficial de Feature Shaping;
  - deve usar Delivery Readiness Matrix (DRM);
  - deve produzir Features locais com Tasks internas antes do desenvolvimento;
  - deve envolver Design, Security e DevOps apenas quando aplicavel;
  - deve tratar GitHub sync como opcional;
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
- [x] `strategy/workflows/idea-to-roadmap.workflow.md`
  - deve transformar uma ideia validada em item de roadmap;
  - deve definir problema, usuario afetado, valor esperado, dependencia, prioridade inicial e horizonte;
  - nao deve marcar automaticamente como MVP;
  - deve perguntar de forma founder-friendly se a ideia deve entrar no backlog/roadmap;
  - jornada criada em `docs/framework/founder-journeys/idea-to-roadmap.md`;
  - gap futuro: Roadmap Planner deve tratar `operations/product-ops/mvp/scope.md` como contexto opcional, nao como dependencia obrigatoria desta jornada.
- [x] `operations/workflows/roadmap-item-to-delivery-scope.workflow.md`
  - deve decidir se um item de roadmap entra em um delivery scope;
  - deve registrar `scope_type`, `milestone` e `release_goal` quando confirmado;
  - deve tratar MVP como um tipo inicial de delivery scope, nao como modelo permanente do roadmap;
  - deve atualizar scope, PRD, non-goals, riscos e criterios minimos quando confirmado;
  - deve registrar por que o item entrou ou nao entrou no delivery scope;
  - deve preparar o item para `delivery-scope-to-epic` quando aprovado;
  - jornada criada em `docs/framework/founder-journeys/roadmap-item-to-delivery-scope.md`.
- [x] `operations/workflows/delivery-scope-to-epic.workflow.md`
  - deve transformar itens de delivery scope em epics rastreaveis;
  - deve preparar payload/draft para GitHub Project quando configurado;
  - deve manter fora do GitHub itens de roadmap que nao estao selecionados para delivery;
  - deve pedir confirmacao antes de criar ou atualizar epics.
  - jornada criada em `docs/framework/founder-journeys/delivery-scope-to-epic.md`.
- [ ] `strategy/workflows/roadmap-to-github-project.workflow.md`
  - deve preparar sync de roadmap para GitHub;
  - deve focar em itens de delivery scope, current cycle e itens explicitamente selecionados para delivery;
  - deve tratar GitHub como plano/payload/dry-run antes de chamada real;
  - deve envolver Product/Roadmap e DevOps apenas para readiness/configuracao.
- [ ] `operations/workflows/feature-to-delivery-cycle.workflow.md`
  - deve coordenar Product Ops, Engineering, Design condicional, Security condicional e review.
- [ ] `operations/workflows/mvp-to-pr.workflow.md`
  - deve ser revisado para decidir se continua necessario ou se foi absorvido por feature-to-delivery-cycle.
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
  - `github.createFeatures` ou equivalente, se decidirmos sincronizar Features como GitHub issues;
  - `github.readIssue`
  - `github.createBranch`
  - `github.openPullRequest`
- [ ] Definir dry-run obrigatorio antes de escrita remota.
- [ ] Definir como registrar sync state sem segredos.
- [ ] Definir como evitar duplicidade em milestones, epics e features/issues sincronizadas.
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

### `/bootstrap product` / `/bootstrap-app`

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir perguntas de stack: Next.js, Vite, API, dashboard ou outro.
- [ ] Definir defaults para founder iniciante.
- [ ] Definir se o comando canonico sera `/bootstrap product`, `/bootstrap-app` ou um alias entre os dois.
- [ ] Criar futura skill de Engineering para planejar estrutura inicial do app, como `plan-app-structure.skill.md` ou `bootstrap-app-structure.skill.md`.
- [ ] Criar futuro playbook de Engineering para criar a fundacao do produto digital, como `app-foundation.playbook.md` ou `bootstrap-product-app.playbook.md`.
- [ ] Definir templates por tipo de produto digital em `ai-standard/templates/engineering/`, por exemplo:
  - webapp;
  - mobile/native app;
  - desktop app;
  - API/service;
  - dashboard/admin app;
  - agent app.
- [ ] Definir uma tree padrao por tipo de app para orientar onde ficam componentes, modules/features, design system/UI, lib, API/server, styles, tests e assets.
- [ ] Garantir que Engineering nao cria `src/`, `app/`, `pages/`, componentes ou stack inicial sem passar por esse fluxo.
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
