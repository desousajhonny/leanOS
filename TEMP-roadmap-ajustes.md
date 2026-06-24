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
- [x] Regras de branch product-first definidas:
  - `feature/<feature-slug>-<short-kebab-slug>` para Features locais;
  - `issue/<issue-number>-<short-kebab-slug>` apenas quando a Feature estiver mapeada para uma GitHub issue real.
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

### 0. MVP Decision System

Status: concluido.

Objetivo: fortalecer a decisao central do LeanOS: o que entra na primeira versao do produto e por que.

Diagnostico:

- O LeanOS esta forte depois que ja existe Roadmap, Epic e Feature.
- A lacuna principal esta antes disso: transformar Strategy Baseline em MVP claro, pequeno, coerente e defensavel.
- `/define-mvp`, `define-mvp.skill.md` e `mvp-delivery.playbook.md` foram fortalecidos para guiar essa decisao.

Principio:

- MVP nao e uma lista de tudo que seria bom construir.
- MVP e o menor escopo coerente para provar valor, reduzir risco e entregar uma primeira experiencia digna.
- Importancia nao significa entrada automatica no MVP.
- Ideia validada ainda precisa passar por criterio de escopo antes de virar Epic/Feature.

#### Arquivos Envolvidos

Comando:

- [x] `.leanos/commands/define-mvp.md`
  - virou porta de entrada para o workflow;
  - nao duplica toda a logica;
  - carrega Strategy primeiro;
  - pede confirmacao antes de atualizar Product Ops.

Workflow:

- [x] `operations/workflows/define-mvp.workflow.md`
  - criado como workflow local de Operations;
  - aplica Workflow Contract Standard;
  - dono: Operations / Product Ops;
  - areas requeridas: `product-ops`;
  - areas condicionais:
    - Strategy/Product quando Strategy Baseline estiver fraca;
    - Strategy/Roadmap quando ja houver backlog/roadmap;
    - Design quando UX, fluxo, acessibilidade ou lovable baseline impactar escopo;
    - Security quando dados, auth, permissoes, privacidade, API, banco, secrets ou abuso impactarem escopo;
    - Engineering quando feasibility, stack, integrações ou risco tecnico impactarem escopo;
    - DevOps quando ambientes, deploy, config ou release readiness impactarem escopo.
  - termina em proposta de MVP scope, nao em implementacao.

Knowledge / Gate:

- [x] `operations/product-ops/knowledge/mvp-decision-gate.md`
  - criado como criterio fixo de decisao, semelhante ao `ready-to-develop.md`;
  - nao e status log do produto;
  - e usado por `/define-mvp`, `define-mvp.workflow.md`, `define-mvp.skill.md` e `mvp-delivery.playbook.md`;
  - classifica risco e readiness do MVP.

Skill:

- [x] `operations/product-ops/skills/define-mvp.skill.md`
  - deixou de ser placeholder;
  - ensina como decidir MVP;
  - usa `mvp-decision-gate.md`;
  - separar:
    - must-have now;
    - should-have later;
    - not-now;
    - unknown / needs discovery;
  - nao cria Epic, Feature, branch, PR ou GitHub issue.

Playbook:

- [x] `operations/product-ops/playbooks/mvp-delivery.playbook.md`
  - transformado em conversa guiada para founder;
  - faz perguntas progressivas, com opcoes quando possivel;
  - produz proposta clara de MVP antes de escrever;
  - atualiza arquivos apenas apos confirmacao.

Jornada interna:

- [x] `docs/framework/founder-journeys/define-mvp.md`
  - criado com Mermaid e passo a passo;
  - provar Navigation Chain:
    - Root `AGENT.md`
    - `.leanos/commands/define-mvp.md` quando slash command for usado
    - `operations/AGENT.md`
    - `operations/workflows/define-mvp.workflow.md`
    - `operations/product-ops/AGENT.md`
    - Product Owner
    - `define-mvp.skill.md`
    - `mvp-delivery.playbook.md`
    - `mvp-decision-gate.md`
    - Output / confirmaçao

#### Inputs Obrigatorios

Antes de definir MVP, o modelo deve verificar:

- [x] produto/ideia principal;
- [x] usuario ou ICP inicial;
- [x] problema/dor;
- [x] promessa de valor;
- [x] alternativa atual do usuario;
- [x] risco mais importante;
- [x] objetivo da primeira versao;
- [x] criterio de sucesso minimo;
- [x] restricoes de tempo, equipe, custo, stack ou compliance.

Se faltar base:

- [x] voltar para Strategy Product ou `/start-leanos`;
- [x] explicar ao founder por que definir MVP agora seria chute;
- [x] fazer perguntas guiadas em vez de inventar contexto.

#### MVP Decision Gate

Criar criterio com quatro riscos principais:

- [x] Value Risk:
  - o usuario tem dor real?
  - a promessa de valor e clara?
  - o escopo resolve algo importante o suficiente?
- [x] Usability Risk:
  - o fluxo principal e compreensivel?
  - o usuario consegue completar a tarefa principal?
  - precisa de Design Foundation ou user-flow antes?
- [x] Feasibility Risk:
  - e possivel construir com a stack/time/contexto atual?
  - ha dependencia tecnica, integracao, banco, IA, infra ou API critica?
  - precisa de technical spike antes de entrar no MVP?
- [x] Business Viability Risk:
  - isso ajuda o negocio a aprender, vender, reter ou validar?
  - o escopo esta alinhado com modelo de negocio ou posicionamento?
  - ha risco de custo, operacao ou suporte que inviabiliza a primeira versao?

Estados sugeridos:

- [x] `ready-for-mvp`
- [x] `needs-product-clarity`
- [x] `needs-usability-flow`
- [x] `needs-technical-spike`
- [x] `needs-business-viability-check`
- [x] `too-large-for-mvp`
- [x] `not-a-fit-now`

#### Arquivos Que Podem Ser Atualizados

Somente apos confirmacao:

- [x] `operations/product-ops/mvp/scope.md`
- [x] `operations/product-ops/mvp/prd.md`
- [x] `operations/product-ops/mvp/user-stories.md`
- [x] `operations/product-ops/mvp/user-flows.md`
- [x] `operations/product-ops/mvp/acceptance-criteria.md`
- [x] `operations/product-ops/mvp/non-goals.md`
- [x] `operations/product-ops/mvp/release-checklist.md`
- [x] `operations/product-ops/knowledge/overview.md`, apenas se o resumo Product Ops mudar.

Nao atualizar durante este fluxo:

- [x] `operations/product-ops/epics/`
- [x] `operations/engineering/`
- [x] `operations/design/knowledge/components/`
- [x] `.github/`
- [x] codigo fonte;
- [x] branches, commits, PRs ou issues remotas;
- [x] roles, skills, playbooks, workflows, commands ou `ai-standard/`.

#### Output Esperado

O modelo deve entregar:

- [x] resumo founder-friendly do MVP recomendado;
- [x] o que entra;
- [x] o que fica fora;
- [x] por que esse escopo e pequeno o suficiente;
- [x] quais riscos ainda existem;
- [x] quais perguntas continuam abertas;
- [x] quais arquivos ele propoe atualizar;
- [x] pergunta de confirmacao antes de escrever;
- [x] ponte para `roadmap-item-to-epic` somente depois do MVP scope confirmado.

#### Relacao Com Outros Fluxos

- [x] `/start-leanos` cria Strategy Baseline minima, nao MVP completo.
- [x] `/status-leanos` pode diagnosticar "MVP missing" e recomendar `/define-mvp`.
- [x] `new-idea-intake` e `idea-to-roadmap` podem gerar candidatos futuros, mas nao alteram MVP automaticamente.
- [x] `roadmap-item-to-epic` so deve ser sugerido depois que um item estiver claro e houver delivery/MVP decision suficiente.
- [x] `epic-to-features` depende de Epic local, nao de MVP cru.
- [x] `feature-to-delivery-cycle` nunca deve iniciar de MVP scope direto.

#### Validacoes Necessarias

- [x] `define-mvp.md` carrega `define-mvp.workflow.md`.
- [x] `define-mvp.workflow.md` segue Workflow Contract Standard.
- [x] `define-mvp.workflow.md` carrega `mvp-decision-gate.md`.
- [x] `define-mvp.skill.md` contem Value, Usability, Feasibility e Business Viability Risk.
- [x] `mvp-delivery.playbook.md` usa conversa guiada e confirmacao antes de escrita.
- [x] `mvp-decision-gate.md` existe e nao e placeholder.
- [x] `/status-leanos` recomenda `/define-mvp` quando o MVP estiver faltando.
- [x] Nenhum arquivo de Epic, Feature, GitHub ou codigo e gerado no fluxo de define MVP.

### 1. Padronizar Comandos Principais

Status: comandos principais padronizados no scaffold; falta validar em teste externo de Founder Journey.

Objetivo: garantir que os comandos centrais sejam portas de entrada consistentes, previsiveis, confirmaveis e roteadas pela Navigation Chain.

#### Command Contract Standard

Objetivo: todo comando gerado em `.leanos/commands/` deve ser uma porta de entrada segura, nao o dono completo do processo.

- [x] Definir contrato minimo para comandos:
  - Purpose
  - Load First
  - Navigation Route ou Routing
  - Process
  - Allowed Updates
  - Forbidden Updates
  - Confirmation Rule ou Confirmation Gates
  - Expected Output
- [x] Atualizar os comandos principais para seguir o contrato sem duplicar workflow.
- [x] Atualizar `validate-generator.mjs` para validar o contrato minimo dos comandos principais.
- [x] Validar que comandos multi-area carregam o workflow correspondente antes de role/skill/playbook.
- [x] Validar que comandos de GitHub/API declaram dry-run/payload e confirmacao antes de escrita remota.
- [x] Validar que comandos de diagnostico, como `/status-leanos` e `/check coherence`, nao escrevem arquivos por padrao.
- [x] Validar que comandos ligados a areas inativas mostram aviso em vez de apontar para paths ausentes.

#### Mapa Canonico De Intencoes

Objetivo: garantir que linguagem natural e slash commands equivalentes caiam no mesmo fluxo.

- [x] Mapear intencoes naturais para comandos/departamentos/workflows sem poluir o root:
  - "onde paramos?", "o que falta?", "podemos desenvolver agora?" -> `status-leanos` / `where-we-are`
  - "vamos definir o MVP" -> `/define-mvp` -> `operations/workflows/define-mvp.workflow.md`
  - "tenho uma ideia" -> `strategy/workflows/new-idea-intake.workflow.md`
  - "coloque essa ideia no roadmap" -> `strategy/workflows/idea-to-roadmap.workflow.md`
  - "transforme esse item em epic" -> `operations/workflows/roadmap-item-to-epic.workflow.md`
  - "quebre esse epic em features" -> `operations/workflows/epic-to-features.workflow.md`
  - "implemente essa feature" -> `operations/workflows/feature-to-delivery-cycle.workflow.md`
  - "PR mergeado, e agora?" -> `operations/workflows/post-merge-continuation.workflow.md`
- [x] Atualizar `AGENT.md` raiz com `Natural Intent Map` curto:
  - o root aponta para comando/departamento correto;
  - workflow detalhado continua sendo decisao do department/area `AGENT.md`;
  - nao lista todos os workflows nem pula a Navigation Chain.
- [ ] Validar no teste externo que o modelo nao precisa de slash command para chegar ao fluxo correto.

Regras gerais:

- [x] Todo comando deve carregar contexto minimo antes de agir.
- [x] Todo comando que aciona trabalho multi-area deve carregar o workflow correspondente antes de entrar em roles, skills ou playbooks.
- [x] O comando nao deve duplicar a logica completa do workflow; ele deve normalizar a intencao, carregar contexto e apontar para o processo correto.
- [x] Todo comando deve declarar:
  - purpose
  - load first
  - routing
  - allowed updates
  - forbidden updates
  - confirmation rule
  - expected output
- [x] Todo comando que altera arquivo deve propor primeiro e escrever somente apos confirmacao.
- [x] Todo comando que envolve GitHub/API deve gerar plano ou payload antes de qualquer chamada remota.
- [x] Nenhum comando deve apontar para area inativa sem aviso explicito.
- [x] Slash commands continuam como atalhos; a experiencia principal deve continuar chat-first.
- [x] Pedido em linguagem natural e slash command equivalente devem seguir o mesmo workflow ou o mesmo department owner.

#### `/check coherence`

- [x] Definir score de coerencia.
- [x] Listar alinhamentos.
- [x] Listar inconsistencias.
- [x] Listar riscos.
- [x] Recomendar proximo passo.
- [x] Evitar recomendar areas inativas sem aviso.
- [x] Verificar coerencia entre Strategy, MVP, Roadmap, Design, Security e Engineering quando essas areas estiverem ativas.
- [x] Manter comando diagnostico, sem escrita por padrao.

#### `/define-mvp`

- [x] Definir inputs obrigatorios.
- [x] Carregar Strategy antes de Operations.
- [x] Roteiar para `operations/workflows/define-mvp.workflow.md` e depois `operations/product-ops/AGENT.md`.
- [x] Separar:
  - MVP scope
  - non-goals
  - user stories
  - user flows
  - acceptance criteria
  - release checklist
  - PRD, quando fizer sentido
- [x] Evitar definir MVP sem problema, ICP e value proposition minimamente claros.
- [x] Pedir confirmacao antes de atualizar arquivos.

#### `/create features`

- [x] Substituir o comando antigo `/create issues` por `/create features`.
- [x] Converter delivery scope em Epics locais e, depois, Features com Tasks internas.
- [x] Usar templates de Epic e Feature; GitHub templates ficam como representacao remota opcional.
- [x] Aplicar Delivery Readiness Matrix (DRM) com Product Ops, Design, Engineering, Security e DevOps conforme necessidade da Feature.
- [x] Design participa apenas quando houver UX, UI, fluxo, acessibilidade, copy ou experiencia de tela.
- [x] Security participa quando houver dados, auth, privacidade, API, banco, secrets, compliance, infra ou risco de abuso.
- [x] Incluir acceptance criteria.
- [x] Incluir links para arquivos de contexto.
- [x] Marcar dependencias, riscos e perguntas abertas.
- [x] Gerar payload/draft antes de criar qualquer GitHub issue real.
- [x] Exigir confirmacao antes de qualquer chamada GitHub.

#### `/workon feature`

- [x] Substituir o comando antigo `/workon issue` por `/workon feature`.
- [x] Carregar Feature local ou GitHub issue mapeada antes de planejar implementacao.
- [x] Resumir a Feature no chat para confirmacao do usuario.
- [x] Roteiar para `operations/workflows/feature-to-delivery-cycle.workflow.md` antes de Engineering.
- [x] Roteiar para `operations/engineering/AGENT.md` quando a Feature estiver pronta para implementacao.
- [x] Exigir branch obrigatoria antes de editar codigo.
- [x] Seguir naming convention de branch alinhada a Feature:
  - `feature/...` para Feature local;
  - `issue/...` para GitHub issue mapeada.
- [x] Definir plano de implementacao.
- [x] Definir plano de testes.
- [x] Identificar arquivos provaveis de mudanca.
- [x] Respeitar Design e Security quando a Feature exigir.

#### `/review pr`

- [x] Validar PR contra escopo da Feature ou GitHub issue mapeada.
- [x] Validar contra acceptance criteria.
- [x] Validar contra MVP scope quando aplicavel.
- [x] Validar riscos de produto, design, seguranca e engenharia quando aplicavel.
- [x] Separar bugs, riscos, perguntas e sugestoes.
- [x] Usar templates e criterios de review em `ai-standard/templates/review/`.
- [x] Validar `Founder Testing Guide` para founder nao tecnico.
- [x] Evitar aprovar mudanca que contradiga contexto aprovado.

### 2. Revisar Workflows Locais

Status: primeira prioridade da proxima rodada.

Objetivo: transformar workflows em rotas realmente acionaveis pelos modelos, sem duplicar comandos e sem colocar workflow de negocio dentro de `.leanos/`.

#### Workflow Contract Standard

Objetivo: todos os workflows locais devem seguir um contrato comum para preservar a LeanOS Navigation Chain e evitar que o modelo pule de uma intencao direto para codigo, role, skill ou playbook.

Status: contrato definido. A aplicacao e validada workflow por workflow na lista de revisao abaixo.

Regra central:

- Workflow coordena varias areas, etapas ou handoffs.
- Playbook executa uma tarefa pratica dentro de uma area.
- Skill aplica uma capacidade especifica.
- Role define o chapeu operacional.
- Knowledge guarda contexto, fatos, criterios e decisoes.
- Comandos e linguagem natural devem apontar para o workflow correto quando a intencao envolver mais de uma area.

Todo workflow deve ter:

- `Purpose`
- `Founder Triggers`
- `Owner`
- `Required Areas`
- `Conditional Areas`
- `Load First`
- `Navigation Route`
- `Sequence`
- `Confirmation Gates`
- `Allowed Updates`
- `Forbidden Updates`
- `External Capabilities`
- `Stop Conditions`
- `Expected Output`
- `Continuation Bridge`

Regras de navegacao:

- Workflows de negocio vivem no departamento/area dona do fluxo.
- `.leanos/` fica como runtime leve: commands, context, indexes e integracao.
- Workflow deve apontar para department/area `AGENT.md` quando ele existir.
- Workflow nao deve pular direto para role quando a area tem `AGENT.md`.
- Workflow nao deve pular direto para skill ou playbook quando existe role responsavel.
- Workflow deve declarar areas requeridas e disponibilidade.
- Workflow deve declarar areas condicionais e quando elas entram.
- Workflow nao deve apontar para paths ausentes.
- Workflow deve explicar quando parar antes de escrita, API, branch, codigo ou PR.
- Workflow deve oferecer proxima rota quando concluir ou quando faltar contexto.

Primeira aplicacao concluida:

- [x] `operations/workflows/roadmap-item-to-epic.workflow.md` ja segue este contrato no scaffold gerado.

#### Decisao de Delivery

- [x] Separar Feature Shaping de Feature Delivery.
- [x] Feature Shaping acontece antes do desenvolvimento em `operations/product-ops/playbooks/epic-to-features.playbook.md`.
- [x] Feature Shaping aplica a Delivery Readiness Matrix (DRM) para envolver Product Ops, Design, Engineering, Security e DevOps quando aplicavel.
- [x] Feature Delivery assume que a Feature idealmente ja veio pronta; ele faz recheck, atualiza riscos e so entao inicia branch, implementacao, testes, PR e review.
- [x] Product Ops, Design, Security e DevOps nao devem redescobrir tudo no momento de implementacao; entram como checkpoint quando a Feature esta incompleta, mudou ou revelou risco novo.

#### Ordem De Revisao Dos Workflows

Comecar por Operations porque e onde a entrega acontece e onde mais existe risco de o modelo pular etapas.

- [x] `operations/workflows/roadmap-item-to-epic.workflow.md`
  - aplicar Workflow Contract Standard;
  - garantir que cria/atualiza Epic local, mas nao cria Feature, GitHub issue, branch ou codigo;
  - manter `scope_type`, `milestone` e `release_goal` como campos do Epic;
  - garantir ponte para `epic-to-features`.
  - contrato aplicado e validacao adicionada.
- [x] `operations/workflows/epic-to-features.workflow.md`
  - aplicar Workflow Contract Standard;
  - garantir Feature Shaping com Product Ops, Engineering e DRM;
  - Design, Security e DevOps entram condicionalmente;
  - componentes geram task de Design, nao spec completa nessa etapa;
  - garantir ponte para `feature-to-delivery-cycle`.
  - contrato aplicado e validacao adicionada.
- [x] `operations/workflows/feature-to-delivery-cycle.workflow.md`
  - aplicar Workflow Contract Standard;
  - aceitar apenas Feature local ou GitHub Feature issue;
  - Product Ops entra primeiro com `ready-to-develop`;
  - Design/Security/DevOps entram como checkpoints condicionais;
  - Engineering so entra depois de readiness;
  - garantir PR validation dentro do ciclo e ponte para post-merge.
  - contrato aplicado e validacao adicionada.
- [x] `operations/workflows/post-merge-continuation.workflow.md`
  - aplicar Workflow Contract Standard;
  - orientar o que atualizar apos merge;
  - sugerir proxima Feature/issue sem inventar prioridade;
  - conectar aprendizado com Product Ops, Growth ou Roadmap quando aplicavel.
  - contrato aplicado, jornada criada e validacao adicionada.
- [x] Workflow legado MVP-to-PR
  - removido do scaffold;
  - responsabilidade absorvida por `feature-to-delivery-cycle`;
  - evita workflow legado que incentive pular Epic/Feature Shaping.
- [x] `strategy/workflows/new-idea-intake.workflow.md`
  - aplicar Workflow Contract Standard;
  - garantir intake antes de roadmap;
  - nao exigir `strategy/validation` no MVP padrao.
- [x] `strategy/workflows/idea-to-roadmap.workflow.md`
  - aplicar Workflow Contract Standard;
  - garantir que nao marca automaticamente como delivery/MVP;
  - ponte para `roadmap-item-to-epic`.
- [x] `strategy/workflows/roadmap-to-github-project.workflow.md`
  - revisar se continua em Strategy ou se deve virar camada GitHub/DevOps posterior;
  - tratar GitHub como dry-run/payload antes de escrita remota.
- [x] `growth/workflows/launch-learning-loop.workflow.md`
  - aplicar Workflow Contract Standard de forma lean;
  - manter como pos-lancamento, nao bloqueador do MVP inicial.

#### Engineering Delivery Assets Review

Status: importante, proximo bloco recomendado antes de `post-merge-continuation`.

Objetivo: garantir que, quando `feature-to-delivery-cycle` entrega uma Feature pronta para Engineering, o modelo siga uma trilha tecnica segura e nao pule direto para codigo, PR ou merge.

Decisao: nao criar `engineering-delivery.workflow.md` agora. Como a execucao acontece dentro da area Engineering, o asset correto e um playbook mestre:

`operations/engineering/playbooks/engineering-delivery.playbook.md`

Esse playbook deve orquestrar os playbooks e skills tecnicos existentes, sem duplicar todo o conteudo deles.

Ordem esperada:

1. Confirmar Feature input e readiness herdado do `feature-to-delivery-cycle`.
2. Criar/confirmar branch obrigatoria.
   - `operations/engineering/playbooks/branch-for-feature.playbook.md`
3. Planejar implementacao antes de editar arquivos.
   - `operations/engineering/skills/plan-implementation.skill.md`
4. Implementar componente primeiro, se a Feature depender de componente novo/aprovado.
   - `operations/engineering/playbooks/component-implementation.playbook.md`
   - `operations/engineering/skills/implement-component.skill.md`
5. Implementar a Feature seguindo padroes de codigo.
   - `operations/engineering/skills/follow-code-standards.skill.md`
6. Revisar dados/API/banco quando aplicavel.
   - `operations/engineering/skills/review-data-change.skill.md`
7. Criar/atualizar testes ou explicar gap de teste.
   - `operations/engineering/skills/write-tests.skill.md`
8. Preparar PR.
   - `operations/engineering/playbooks/prepare-pr.playbook.md`
9. Validar PR antes de recomendar merge.
   - `operations/engineering/playbooks/pr-validation.playbook.md`
   - `operations/engineering/skills/review-pr.skill.md`

Checklist de implementacao:

- [x] Criar `operations/engineering/playbooks/engineering-delivery.playbook.md`.
- [x] Atualizar `operations/engineering/AGENT.md` para roteamento de implementacao apontar primeiro para `engineering-delivery`.
- [x] Atualizar `feature-to-delivery-cycle.workflow.md` para, depois de readiness, entrar em Engineering via `engineering-delivery.playbook.md`.
- [x] Atualizar `senior-developer.role.md` para incluir `engineering-delivery` como playbook principal de implementacao.
- [x] Revisar `pr-reviewer.role.md` e `test-engineer.role.md`: sem mudanca necessaria; eles continuam especialistas de review/teste e nao devem duplicar o playbook mestre.
- [x] Adicionar notas de contexto nos playbooks menores:
  - `branch-for-feature.playbook.md`: etapa inicial do `engineering-delivery`;
  - `component-implementation.playbook.md`: usado quando existe component spec aprovada;
  - `prepare-pr.playbook.md`: usado depois de implementacao e testes;
  - `pr-validation.playbook.md`: etapa final antes de recomendar merge.
- [x] Garantir que `engineering-delivery` declare gates:
  - nao editar codigo antes de branch;
  - nao implementar componente novo sem spec de Design quando aplicavel;
  - nao abrir PR sem resumo de testes ou justificativa de gap;
  - nao recomendar merge sem PR validation.
- [x] Atualizar `validate-generator.mjs` para validar existencia e referencias do playbook mestre.
- [x] Regenerar `examples/client-workspace/` e `examples/client-workspace-tree.md`.

#### Founder Acceptance Guide No PR

Status: concluido.

Objetivo: garantir que, quando o modelo abre ou prepara um PR, o founder consiga testar o que foi entregue sem precisar entender codigo, diff ou detalhes tecnicos avancados.

Decisao: nao colocar isso na Feature como regra principal. A Feature define o que deve ser entregue; o PR deve traduzir a entrega em um guia pratico de teste para o founder.

Checklist de implementacao:

- [x] Atualizar o template de PR em `ai-standard/templates/github/` para incluir uma secao obrigatoria `Founder Testing Guide`.
- [x] A secao deve conter:
  - o que mudou em linguagem simples;
  - onde testar: preview URL, rota local, tela, conta ou dados de teste;
  - como testar passo a passo;
  - resultado esperado;
  - o que esta fora de escopo;
  - riscos, limitacoes ou gaps conhecidos.
- [x] Atualizar `operations/engineering/playbooks/prepare-pr.playbook.md` para exigir o `Founder Testing Guide` ao preparar o PR.
- [x] Atualizar `operations/engineering/playbooks/engineering-delivery.playbook.md` para tratar esse guia como gate antes de considerar o PR pronto para founder review.
- [x] Atualizar `operations/engineering/playbooks/pr-validation.playbook.md` para validar:
  - guia existe;
  - passos batem com acceptance criteria da Feature;
  - ha preview/rota/instrucao alternativa;
  - o escopo e os limites estao claros;
  - founder consegue testar sem ler codigo.
- [x] Atualizar `feature-to-delivery-cycle.workflow.md` para deixar claro que PR aberto nao significa pronto para merge sem founder acceptance.
- [x] Atualizar validacoes do generator para proteger a existencia da secao no template de PR e referencias nos playbooks.

#### Validacoes Necessarias

- [x] Atualizar `validate-generator.mjs` para validar o contrato minimo dos workflows principais.
- [x] Validar que `.leanos/index/workflows.yaml` aponta apenas para workflows existentes.
- [x] Validar que nenhum workflow de negocio e gerado em `.leanos/workflows/`.
- [x] Validar que workflow nao referencia area inativa sem aviso de disponibilidade.
- [x] Validar que workflows multi-area carregam area `AGENT.md` antes de role/skill/playbook.
- [x] Validar que workflows com GitHub/API declaram dry-run, payload e confirmacao antes de escrita remota.
- [x] Validar que cada workflow tem `Stop Conditions` e `Continuation Bridge`.

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
- [x] Atualizar Engineering flow para componentes:
  - Engineering deve ler a component spec antes de implementar componente novo;
  - Engineering deve implementar primeiro o componente reutilizavel, validar estados/acessibilidade/testes, e so depois implementar a tela/feature que usa o componente;
  - Engineering nao pode criar componente novo sem spec ou confirmacao explicita de Design.
- [x] Criar/atualizar jornada `docs/framework/founder-journeys/feature-to-delivery-cycle.md`:
  - este e o proximo passo depois de fortalecer o workflow no scaffold;
  - mostrar caminho: Founder intent -> Root AGENT -> Operations AGENT -> feature-to-delivery-cycle -> Product Ops readiness -> Design component readiness se necessario -> Engineering -> PR validation;
  - deixar claro por que cada salto acontece: por regra do AGENT, por workflow ou por playbook;
  - incluir exemplo founder-friendly quando faltar component spec.
- [x] Decidir estrutura para specs concretas de componentes:
  - opcao preferida: `operations/design/knowledge/components/<component-name>.md`;
  - nao gerar specs concretas no scaffold inicial;
  - criar arquivo apenas quando uma Feature real exigir componente novo.
- [x] Planejar `screen-spec-template.md` para etapa futura:
  - provavel local: `ai-standard/templates/design/screen-spec-template.md`;
  - screen spec deve documentar tela/fluxo concreto, nao ser gerada no scaffold inicial;
  - deve cobrir layout, required components, actions, states, table rules, accessibility, responsive behavior e analytics/events quando aplicavel.
  - plano interno criado em `docs/framework/screen-spec-template-plan.md`.

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
  - `roadmap-item-to-epic` termina em Epic local, com GitHub sync opcional em fluxo posterior;
  - proximo fluxo passa a ser `epic-to-features`;
  - `feature-to-delivery-cycle` deve aceitar Feature local ou GitHub issue como entrada, desde que passe pelo `ready-to-develop`.

#### Workflow Map - Founder Journey Completa

Jornadas internas devem ser criadas em `docs/framework/founder-journeys/` usando `journey-template.md`.

| Etapa | Scaffold atualizado | Jornada criada | Momento | Workflow / Entrada | Intencao do Founder | Dono | Roles Principais | Playbooks Principais | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | [ ] | [ ] `docs/framework/founder-journeys/start-leanos.md` | Setup inicial | `.leanos/commands/start-leanos.md` + Strategy Baseline | "vamos comecar", "configurar o LeanOS", "iniciar o projeto" | LeanOS Chief + Strategy | Business Strategist, Product Strategist | `business-foundation`, `product-strategy` | Existe, garantir Strategy Baseline minima |
| 1 | [x] | [x] `docs/framework/founder-journeys/define-mvp.md` | Primeira definicao do produto | `.leanos/commands/define-mvp.md` + `operations/workflows/define-mvp.workflow.md` | "Defina o MVP", "qual a primeira versao?", "o que entra no MVP?" | Product Ops | Product Owner, Delivery Architect, Product Designer quando aplicavel, Security Reviewer quando aplicavel | `mvp-delivery`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Jornada criada; scaffold atualizado com MVP Decision Gate, conversa guiada, confirmacao e ponte para `roadmap-item-to-epic` |
| 2 | [x] | [x] `docs/framework/founder-journeys/new-idea-intake.md` | Novas ideias e features | `strategy/workflows/new-idea-intake.workflow.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" | Strategy | Product Strategist, Product Manager, Business Strategist, Roadmap Planner | `product-strategy`, `business-foundation`, `roadmap-cycle-planning`, `mvp-delivery` | Jornada criada e scaffold ajustado para separar intake de roadmap |
| 3 | [x] | [x] `docs/framework/founder-journeys/idea-to-roadmap.md` | Decisao de roadmap | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" | Strategy / Roadmap | Product Strategist, Product Manager, Roadmap Planner | `roadmap-cycle-planning`, `product-strategy` | Jornada criada; scaffold existente validado; gap futuro: delivery scope deve ser contexto opcional no Roadmap Planner |
| 4 | [x] | [x] `docs/framework/founder-journeys/roadmap-item-to-epic.md` | Roadmap item para Epic local | `operations/workflows/roadmap-item-to-epic.workflow.md` | "Isso entra na proxima entrega?", "isso entra no MVP?", "crie um epic para esse item" | Product Ops + Strategy | Product Owner, Product Strategist, Delivery Architect, Product Designer/Security/DevOps/Engineering quando aplicavel | `delivery-scope-planning`, `delivery-readiness`, `design-foundation`, `pre-mvp-security-checklist` | Jornada criada; consolidou os dois passos antigos; GitHub write fica opcional e posterior |
| 5 | [x] | [x] `docs/framework/founder-journeys/epic-to-features.md` | Feature Shaping | `operations/workflows/epic-to-features.workflow.md` | "Quebre esse epic em features", "quais features precisamos para esse epic?" | Operations / Product Ops | Product Owner, Product Designer, Security Reviewer, DevOps Engineer, Senior Developer | `epic-to-features`, `delivery-readiness`, `mvp-ux-flow`, `accessibility-review`, `pre-mvp-security-checklist`, `api-security-review`, `setup-ci-cd` | Jornada criada; scaffold atualizado com Workflow Contract Standard e DRM completa |
| 6 | [x] | [x] `docs/framework/founder-journeys/feature-to-delivery-cycle.md` | Implementacao | `operations/workflows/feature-to-delivery-cycle.workflow.md` | "Implemente a feature", "implemente a issue #554", "vamos comecar essa feature" | Operations / Engineering | Product Owner, Product Designer quando UI/componente for afetado, Senior Developer, Test Engineer, PR Reviewer, Security Reviewer quando aplicavel | `delivery-readiness`, `component-readiness`, `branch-for-feature`, `prepare-pr`, `test-planning`, `pr-validation`, `ai-generated-code-security-review` | Jornada criada; scaffold atualizado com Workflow Contract Standard, ready-to-develop, component readiness, branch local `feature/...`, branch GitHub `issue/...`, PR e post-merge bridge |
| 7 | [x] | N/A | Review e PR | Dentro de `feature-to-delivery-cycle` | "Revise o PR", "esta pronto para merge?" | Engineering + Security/DevOps quando aplicavel | PR Reviewer, Test Engineer, Security Reviewer, Release Manager | `pr-validation`, `pre-deploy-security-review`, `security-automation-readiness`, `release-operations` | Nao criar workflow separado por enquanto; PR validation e parte do feature delivery cycle |
| 8 | [x] | [x] `docs/framework/founder-journeys/post-merge-continuation.md` | Pos-merge | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a proxima Feature", "o que atualizamos depois do merge?" | Operations | Product Owner, Senior Developer, Release Manager, CX Lead quando aplicavel | `release-operations`, `delivery-readiness`, `customer-learning-loop` | Jornada criada; scaffold fortalecido com Workflow Contract Standard, status/context update, conditional DevOps/Security/Growth/Strategy e ponte para proxima rota |
| 9 | [ ] | [ ] `docs/framework/founder-journeys/launch-learning-loop.md` | Lancamento e aprendizado | `growth/workflows/launch-learning-loop.workflow.md` | "Lancamos, o que aprendemos?", "como melhorar aquisicao/conversao?" | Growth | Growth Lead, CX Lead, Finance Operator | `mvp-launch`, `customer-learning-loop`, `finance-review` | Existe, pode ficar lean para depois |

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
- [ ] Um item de roadmap/backlog deve passar por `roadmap-item-to-epic` antes de Engineering iniciar desenvolvimento.
- [ ] Um epic de MVP deve passar por `epic-to-features` antes de virar trabalho de implementacao.
- [ ] GitHub Project deve representar principalmente o que esta em execucao, em preparacao para execucao ou explicitamente selecionado para delivery.
- [ ] O modelo deve pedir confirmacao antes de promover item de roadmap para Epic local e antes de sincronizar Epics/Features com GitHub.

#### Ordem Para Implementar Os Workflows

1. `strategy/workflows/new-idea-intake.workflow.md`
2. `strategy/workflows/idea-to-roadmap.workflow.md`
3. `operations/workflows/roadmap-item-to-epic.workflow.md`
4. `operations/workflows/epic-to-features.workflow.md`
5. `operations/workflows/feature-to-delivery-cycle.workflow.md`
6. Workflow legado MVP-to-PR removido/absorvido por `feature-to-delivery-cycle`
7. `operations/workflows/post-merge-continuation.workflow.md` - concluido
8. `operations/workflows/define-mvp.workflow.md` - concluido, acionado por `/define-mvp`
9. `strategy/workflows/roadmap-to-github-project.workflow.md`
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

- [x] `operations/workflows/define-mvp.workflow.md` com `operations/product-ops/playbooks/mvp-delivery.playbook.md`
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
- [x] `operations/workflows/roadmap-item-to-epic.workflow.md`
  - deve transformar item de roadmap/backlog em Epic local rastreavel;
  - deve registrar `scope_type`, `milestone` e `release_goal` como campos do Epic;
  - deve tratar MVP como um tipo inicial de delivery scope, nao como modelo permanente do roadmap;
  - deve registrar outcome, non-goals, riscos, provaveis grupos de Features e criterios minimos quando confirmado;
  - deve manter GitHub sync como opcional e posterior;
  - deve pedir confirmacao antes de criar ou atualizar o Epic local;
  - jornada criada em `docs/framework/founder-journeys/roadmap-item-to-epic.md`;
  - substitui os dois fluxos antigos de delivery-scope intermediario e epic local.
- [x] `operations/workflows/epic-to-features.workflow.md`
  - deve transformar Epic local confirmado em Feature files com Tasks internas;
  - deve aplicar DRM com Product Ops e Engineering como base;
  - deve acionar Design, Security e DevOps apenas quando aplicavel;
  - componentes geram task de Design para component readiness, nao spec completa nesta etapa;
  - deve pedir confirmacao antes de escrever Feature files;
  - deve parar antes de branch, codigo, PR, deploy ou GitHub sync;
  - jornada criada em `docs/framework/founder-journeys/epic-to-features.md`;
  - ponte oficial para `feature-to-delivery-cycle`.
- [x] `strategy/workflows/roadmap-to-github-project.workflow.md`
  - deve preparar sync de roadmap para GitHub;
  - deve focar em itens de delivery scope, current cycle e itens explicitamente selecionados para delivery;
  - deve tratar GitHub como plano/payload/dry-run antes de chamada real;
  - deve envolver Product/Roadmap e DevOps apenas para readiness/configuracao.
- [x] `operations/workflows/feature-to-delivery-cycle.workflow.md`
  - deve coordenar Product Ops, Engineering, Design condicional, Security condicional e review.
- [x] Workflow legado MVP-to-PR
  - removido por redundancia;
  - fluxo de implementacao oficial e `feature-to-delivery-cycle`.
- [x] `operations/workflows/post-merge-continuation.workflow.md`
  - orienta retorno pos-merge: atualizar contexto, proxima Feature, riscos e follow-up;
  - nao inicia proxima Feature automaticamente;
  - roteia DevOps, Security, Growth ou Strategy apenas quando aplicavel.
- [x] `growth/workflows/launch-learning-loop.workflow.md`
  - deve continuar lean e usar area AGENTs/knowledge paths atualizados.

### 3. Camada GitHub Chat-First

Status: importante, mas deve ser definido conceitualmente antes de implementacao.

Objetivo: preparar a futura automacao GitHub sem transformar o founder em operador de terminal.

Decisao: o LeanOS Chief nao chama API diretamente. O modelo entende a intencao, carrega contexto, propoe plano/payload e pede confirmacao. A execucao real fica para capability/script seguro.

Antes de implementar, decidir:

- [ ] Qual e a fonte de verdade primaria para Epics e Features:
  - local LeanOS primeiro;
  - GitHub como espelho/sync opcional;
  - ou GitHub como fonte primaria apos sync.
- [ ] Como o modelo identifica o que ja foi sincronizado sem reler todos os Epics sempre.
- [ ] Se `sync-state.yaml` e suficiente ou se precisamos de uma estrutura adicional.
- [ ] Como representar itens locais que ainda nao foram enviados ao GitHub.
- [ ] Como representar itens que existem no GitHub mas nao existem localmente.
- [ ] Como tratar conflitos entre Epic/Feature local e GitHub issue.
- [ ] Como evitar duplicidade de milestones, Epics e Features.
- [ ] Como o fundador confirma o payload antes da execucao real.
- [ ] Quais capabilities/scripts executam a chamada real, sem o modelo chamar API diretamente.
- [ ] Como preservar a experiencia chat-first para founder iniciante.

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
- [ ] Rodar `/define-mvp`.
- [ ] Rodar `/define design` quando Design estiver ativo.
- [ ] Rodar `/check coherence`.
- [ ] Gerar plano de issues ou execucao.
- [ ] Simular `Workon feature`.
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

1. Padronizar comandos principais como portas de entrada, nao como donos do processo.
2. Mapear intents naturais e comandos para os workflows locais.
3. Discutir e definir a camada GitHub chat-first antes de implementar capability/script.
4. Rodar teste externo da Founder Journey.
5. Ajustar lacunas descobertas no teste.
6. Criar `ready-for-launch` quando a cadeia de entrega estiver validada.
7. Preparar release publica do MVP.
8. Planejar update/migration.
9. Planejar `/bootstrap product`.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados, validados ou movidos para issues oficiais.
