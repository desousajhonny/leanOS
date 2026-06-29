export function founderProgressionModel(): string {
  return `# Modelo de Progressão do Founder

## Propósito

Define como o LeanOS move um founder de uma ideia bruta para uma startup operando sem criar o workspace inteiro cedo demais.

O modelo mantém o Chief focado no estágio atual da startup, nos arquivos ativos e na próxima decisão do founder. Ele é o source of truth para ativação progressiva do workspace, gates de estágio e roteamento de startup em linguagem natural.

## Use Quando

Use este arquivo quando o founder pedir para começar, diagnosticar uma ideia, continuar de um ponto incerto, criar roadmap, definir MVP, preparar delivery, lançar, aprender com evidência ou ativar um novo departamento.

Use \`progression-gates.md\` for concrete required context, allowed next stages and blocked next stages. This file explains the journey; the gate matrix decides whether the next step is allowed.

Use \`guided-conversation.md\` for the actual question style after this model identifies the next stage.

## Regra Central

A progressão é stage-first e activation-aware.

Não carregue departamentos, roles, skills, playbooks, workflows ou knowledge inativos.

If the next step needs an inactive workspace area, return an \`activation_required\` decision with the department or area that should be created next. Não finja que o path existe.

## Estágios de Progressão de Startup

| Stage | Active Scope | Founder State | Chief Job | Gate To Next |
| --- | --- | --- | --- | --- |
| Setup Seed | \`leanos.yaml\`, root \`AGENT.md\`, minimal Strategy | O founder descreveu a ideia no wizard ou quase não tem estrutura. | Leia o contexto seed e oriente o founder. | Founder quer começar e aceita diagnóstico guiado. |
| Strategy Seed | Strategy only | There is a rough idea, but problem, customer and value are incomplete. | Ask guided diagnosis questions and fill the minimum Strategy knowledge. | Problem, ICP, proposta de valor and suposiçãos are minimally clear. |
| Strategy Baseline | Strategy only | A direção do negócio está coerente o suficiente para comparar opções. | Confirme posicionamento, modelo de negócio, risco de validação e restrições atuais. | Founder confirma uma baseline que vale virar MVP validation scope ou planejamento operacional de roadmap. |
| Idea Calibration | Strategy only | The founder needs to understand what the idea is, for whom and why now. | Calibrate clarity, risk and evidence without jumping to execution. | One clear opportunity or validation path is selected. |
| MVP Validation Scope | Strategy only | The founder wants to validate the business through a first MVP path. | Define business thesis, target user, core problem, MVP slice, manual/concierge parts, productized parts, success signals, pivot signals and MVP Validation Sequence. | Founder confirms the MVP validation scope is ready for Product Ops delivery planning or later operating roadmap planning. |
| Roadmap Inicial | Strategy only | The product is operating/scaling or the founder explicitly needs to sequence multiple priorities. | Convert Strategy, customer signals and product constraints into roadmap options, prioritization and current cycle planning. | Founder chooses a near-term roadmap item or operating priority. |
| MVP Delivery Decision | Strategy plus Product Ops activation when needed | The founder wants to turn an approved MVP/backlog/roadmap item into Product Ops backlog or delivery scope. | Decide MVP backlog, delivery boundary, PRD, non-goals, acceptance criteria and dependencies. | If Product Ops is missing, return \`activation_required\` for Product Ops/Operations. |
| Product Shaping | Product Ops active | A delivery item needs scope, non-goals and acceptance criteria. | Shape epic/feature candidates and delivery readiness. | Feature scope has Product and Engineering readiness inputs. |
| Delivery Readiness | Product Ops plus required supporting areas | Work is nearly implementation-ready. | Check Design, Security and DevOps applicability before Engineering starts. | Required criteria are ready or explicitly not applicable. |
| Implementation | Engineering active | The founder approved a ready feature or issue. | Route to delivery workflow, implementation plan, tests and PR readiness. | Feature is merged, shipped or explicitly stopped. |
| Launch | Marketing/Sales/Customer Success ativos conforme necessário | A mudança de produto precisa de movimento de mercado, vendas ou onboarding. | Prepare lançamento, mensagem, onboarding e captura de feedback. | Sinais de lançamento e follow-up de owner são registrados. |
| Learning Loop | Strategy plus active delivery/market areas | Evidence exists after launch, experiment or user feedback. | Compare results against suposiçãos and update roadmap decisions. | Keep, iterate, pivot or pause decision is confirmed. |
| Scaling / Operating Cadence | Multiple active departments | The startup needs repeated operating rhythm. | Maintain cadence, metrics, backlog, risks and cross-department focus. | Next operating cycle is scheduled and owners are clear. |

## Comportamento do Chief no Startup

Quando o founder disser "quero começar", "como começar", "iniciar leanos", "quero começar agora" ou intenção similar de início em linguagem natural:

1. Carregue somente o contexto de roteamento raiz, \`leanos.yaml\` e arquivos ativos de Strategy.
2. Summarize what is already known from \`seed_context\` and Strategy.
3. Declare o estágio atual.
4. Identifique a menor decisão de Strategy ausente.
5. Faça uma pergunta guiada com opções úteis.
6. Não faça perguntas vazias como "me conte mais".
7. Não crie roadmap, MVP de delivery, feature ou arquivos de implementação até o gate de Strategy estar satisfeito.

Use este formato de resposta:

\`\`\`text
O que já temos:
O que ainda falta:
Próximo passo recomendado:
Pergunta:
\`\`\`

## Regras de Perguntas Guiadas

- Faça uma decisão por vez.
- Ofereça 3 a 5 opções concretas quando o founder puder não saber a resposta.
- Inclua uma opção "não tenho certeza / me ajude a decidir" quando houver incerteza provável.
- Conecte cada pergunta ao próximo arquivo ou decisão que ela desbloqueia.
- Prefira linguagem do founder a termos internos do framework.
- Depois de cada resposta, reafirme o entendimento atualizado e o próximo gate.

## Roteamento de Intenção de Progressão

Use roteamento de intenção como tabela de decisão consciente do estágio:

\`\`\`text
Intenção -> Estágio Atual -> Gate -> Requisitos Ativos -> Rota
\`\`\`

Regras de roteamento:

1. Se o estágio atual consegue lidar com a intenção usando arquivos ativos, roteie para o menor workflow ou playbook ativo.
2. Se a intenção pertence a um estágio futuro, explique o gate ausente antes de prosseguir.
3. If the future stage requires a missing department or area, return \`activation_required\`.
4. Roteamento raiz não deve apontar diretamente para roles, skills, playbooks ou knowledge.
5. Roteamento raiz não deve apontar para commands.

## Portões de Ativação

Ativação cria superfície de workspace apenas quando o estágio do founder precisa dela.

| Activation | Required When | Must Be True First |
| --- | --- | --- |
| Product Ops / Operations | MVP backlog planning, product scope, epics, features or delivery shaping begins. | Strategy Baseline is coherent and MVP Validation Scope or a confirmed current MVP/backlog item exists. |
| Design | User-facing flow, screen, copy, accessibility or design system decisions are needed. | A feature, experiment or MVP scope has UX impact. |
| Engineering | Implementation, technical planning, branch, tests or PR work begins. | Feature is delivery-ready or an explicitly approved technical spike exists. |
| Security | Data, auth, permissions, privacy, abuse, API or compliance risk appears. | The active feature or workflow has a security-sensitive surface. |
| DevOps | Environments, CI/CD, deploy, release, observability or GitHub automation are needed. | Escopo de delivery requires operational execution. |
| Marketing / Sales / Customer Success | Launch, acquisition, sales motion, onboarding or retention work begins. | Product or validation direction has a market-facing motion. |
| Finance / Legal / Data | Pricing, budget, contracts, risk, compliance, analytics or metrics become necessary. | The founder decision depends on that specialty. |

## Resposta activation_required

Quando ativação for necessária, o Chief não deve tentar abrir paths ausentes.

Não responda apenas com \`activation_required\`.

Primeiro explique o próximo passo operacional natural na linguagem do founder:

\`\`\`text
Esse pedido ja passou do ponto de estrategia. Minha sugestao e abrir Product Ops agora para transformar isso em escopo executavel.
\`\`\`

Depois peça confirmação antes de criar ou ativar qualquer departamento ou área:

\`\`\`text
Posso ativar Operations/Product Ops e criar os arquivos minimos para esse proximo passo?
\`\`\`

After confirmation, run \`lean-os activate <area>\` from the workspace root, then reload \`leanos.yaml\`, context and routing indexes before opening the activated area.

Depois inclua a decisão estruturada de ativação:

\`\`\`yaml
activation_required:
  target: operations/product-ops
  reason: approved MVP validation scope needs Product Ops ownership before epics or features exist.
  prerequisite_met: MVP Validation Scope or current MVP/backlog item confirmed
  next_action: create the minimal Product Ops workspace and route to mvp-backlog-planning.playbook.md
\`\`\`

Se o pré-requisito não estiver satisfeito, diga qual decisão de Strategy deve acontecer primeiro.

## Linhas Vermelhas

- Não carregue departamentos inativos.
- Não acesse roles, skills, playbooks, workflows ou knowledge que não estejam ativos ou gerados.
- Não trate "available" como "exists".
- Não crie todos os departamentos durante setup.
- Não pule Strategy porque o founder pediu um MVP.
- Não faça perguntas amplas e vazias quando uma pergunta diagnóstica guiada pode mover o founder adiante.
- Não roteie para implementação até Product e Engineering readiness estarem claras.
- Não altere arquivos duráveis sem confirmar o resumo voltado ao founder.

## Exemplos Práticos de Roteamento

| Founder Says | Stage | Route |
| --- | --- | --- |
| "Quero começar agora" | Setup Seed or Strategy Seed | Active Strategy founder diagnosis workflow. |
| "Minha ideia faz sentido?" | Strategy Seed or Idea Calibration | Calibrate problem, ICP, promise, evidence and risk before roadmap. |
| "Vamos montar o roadmap" | Product operating, growth scaling or explicit multi-priority sequencing | Strategy Roadmap through \`strategy/roadmap/AGENT.md\` if the operating gate is met. |
| "Vamos definir o MVP" | Idea Calibration or MVP Validation Scope | Strategy Product defines MVP Validation Scope and MVP Validation Sequence. Roadmap is not mandatory after first MVP validation. |
| "Vamos transformar esse item do MVP em entrega" | MVP Validation Scope or MVP Delivery Decision | MVP Validation Scope can hand off directly to Product Ops. Retorne \`activation_required\` para Product Ops se não estiver ativo; depois roteie para planejamento de backlog do MVP. |
| "Quebre isso em features" | Product Shaping | Require Product Ops active and delivery scope confirmed. |
| "Implemente essa feature" | Delivery Readiness or Implementation | Retorne \`activation_required\` para Engineering se não estiver ativo; depois roteie para o ciclo de entrega. |
| "Lance isso" | Launch | Activate market-facing departments only as needed. |
| "O que aprendemos?" | Learning Loop | Compare evidence with suposiçãos and update roadmap decisions. |

## Gate Mínimo de Strategy

Antes de MVP Validation Scope, Roadmap Inicial ou MVP Delivery Decision, Strategy deve conter pelo menos:

- declaração do problema
- ICP ou primeiro segmento de usuário
- proposta de valor
- escopo de validação do MVP quando o founder está pedindo o primeiro caminho de MVP
- suposições-chave
- nível de evidência
- direção de modelo de negócio ou incerteza explícita
- prioridade do founder para o próximo passo

Se algum item estiver ausente, faça a menor pergunta guiada que o preencha.
`;
}

export function progressionGates(): string {
  return `# Gates de Progressão

## Propósito

Define os gates concretos que decidem se o LeanOS pode mover de um estágio de progressão do founder para o próximo.

Use this file with \`founder-progression-model.md\`. The model explains the journey. This file names the required context, allowed next stages and blocked next stages.

## Matriz de Gates

| Estágio | Contexto Obrigatório | Próximos Estágios Permitidos | Próximos Estágios Bloqueados |
| --- | --- | --- | --- |
| Setup Seed | \`leanos.yaml\` seed context, active Strategy routes, founder start intent | Strategy Seed, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Seed | product idea, target user guess, problem guess, value promise guess | Strategy Baseline, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Baseline | declaração do problema, ICP ou primeiro segmento de usuário, proposta de valor, alternative, riskiest suposição, business model direction, immediate focus | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Idea Calibration | MVP Delivery Decision, Product Shaping, Implementation |
| Idea Calibration | idea restated, user and problem named, fit with ICP/value checked, evidence and suposiçãos visible | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Strategy Baseline | MVP Delivery Decision, Product Shaping, Implementation |
| MVP Validation Scope | Business Thesis, Target User, Core Problem, Promessa, MVP Slice, Success Signals, Pivot Signals, MVP Validation Sequence | MVP Delivery Decision, Product Shaping when Product Ops is active, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist | Implementation |
| MVP Delivery Decision | Product Ops active, MVP backlog or delivery scope, PRD or equivalent scope, non-goals, acceptance criteria, dependencies | Product Shaping, Delivery Readiness | Implementation before Feature readiness |
| Product Shaping | Epic exists, scope type, milestone or release goal, expected Features, readiness gaps | Delivery Readiness, Feature Shaping | Implementation |
| Delivery Readiness | Feature exists, Product Ops criteria, Engineering criteria, Design/Security/DevOps criteria satisfied or not applicable | Implementation | Launch, Learning Loop without shipped or tested output |
| Implementation | Engineering active, branch plan, implementation plan, tests or validation plan, PR readiness path | Launch, Learning Loop, Post-Merge Continuation | Scaling / Operating Cadence without usage or recurring operation |
| Launch | release or MVP is available to users, launch owner, support path, rollback or recovery plan, learning signals | Learning Loop, Scaling / Operating Cadence | Implementation without a new ready Feature |
| Learning Loop | evidence, insight, decision, roadmap or backlog impact, next learning action | Strategy Baseline, Roadmap Inicial, MVP Validation Scope, Product Shaping | Scaling / Operating Cadence without recurring usage or operating rhythm |
| Scaling / Operating Cadence | product in use, recurring feedback or operations, metrics, cadence owner, backlog/launch/learning rhythm | Learning Loop, Roadmap Inicial, Delivery Readiness | Setup Seed |

## Contexto Obrigatório

Antes de mover estágios, confirme:

- o estágio atual está nomeado;
- o contexto obrigatório do estágio atual existe em arquivos ativos ou está explicitamente desconhecido;
- suposições não são tratadas como evidência;
- the next route exists or returns \`activation_required\`;
- o founder confirmou qualquer atualização de arquivo durável.

## Próximos Estágios Permitidos

Próximos estágios permitidos são os únicos que o LeanOS pode recomendar sem explicar um gate bloqueado.

Quando múltiplos próximos estágios forem permitidos, escolha o menor que responda à intenção do founder:

- se o contexto estiver incerto, permaneça em Strategy Seed ou Idea Calibration;
- se o founder quiser validação rápida de negócio, mova para MVP Validation Scope;
- se o founder quiser sequência e o produto estiver em product_operating/growth_scaling ou tiver múltiplas prioridades, mova para Roadmap Inicial;
- se o founder escolheu um item de MVP backlog, roadmap, backlog ou delivery-scope para entrega, peça ativação de Product Ops e mova para MVP Delivery Decision.
- se o founder confirmar o primeiro escopo de validação do MVP e quiser delivery, mova de MVP Validation Scope diretamente para Product Ops / MVP Delivery Decision.

## Próximos Estágios Bloqueados

Estágios bloqueados exigem uma explicação amigável ao founder e o gate ausente.

- Não permita Engineering antes de Product Ops delivery readiness.
- Não force Roadmap entre MVP Validation Scope e planejamento de entrega de Product Ops.
- Não permita Product Ops criar escopo de delivery antes de Strategy Baseline e MVP Validation Scope ou um item atual de MVP/backlog existir.
- Não permita trabalho de launch de Growth antes de existir superfície productizada, landing page, concierge ou release para colocar diante de usuários.
- Não permita sync com GitHub antes de existirem assets locais de delivery ou prontidão de setup do GitHub.
- Não permita Scaling / Operating Cadence antes de existirem uso, feedback, atividade de release ou operações recorrentes.

## Regras de Ativação

Use \`activation_required\` only when:

- o próximo estágio solicitado pertence a uma área inativa;
- o gate do estágio atual está satisfeito;
- o founder foi informado por que os arquivos ativos de Strategy não são mais suficientes;
- o founder confirma a ativação.

Não use \`activation_required\` como substituto para contexto de Strategy ausente.

## Founder-Friendly Output

Quando um gate bloquear progresso, diga:

~~~text
Ainda falta uma decisao antes desse passo.
Estamos em: <current stage>.
Falta: <missing gate>.
Proximo passo seguro: <next route or question>.
~~~
`;
}
