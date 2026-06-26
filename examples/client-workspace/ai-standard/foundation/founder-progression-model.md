# Founder Progression Model

## Purpose

Define how LeanOS moves a founder from a raw idea to an operating startup without creating the whole workspace too early.

The model keeps the Chief focused on the current startup stage, active files and next founder decision. It is the source of truth for progressive workspace activation, stage gates and natural-language startup routing.

## When To Use

Use this file when the founder asks to start, diagnose an idea, continue from an unclear point, create a roadmap, define an MVP, prepare delivery, launch, learn from evidence or activate a new department.

Use `progression-gates.md` for concrete required context, allowed next stages and blocked next stages. This file explains the journey; the gate matrix decides whether the next step is allowed.

Use `guided-conversation.md` for the actual question style after this model identifies the next stage.

## Core Rule

Progression is stage-first and activation-aware.

Do not load inactive departments, roles, skills, playbooks, workflows or knowledge.

If the next step needs an inactive workspace area, return an `activation_required` decision with the department or area that should be created next. Do not pretend the path exists.

## Startup Progression Stages

| Stage | Active Scope | Founder State | Chief Job | Gate To Next |
| --- | --- | --- | --- | --- |
| Setup Seed | `leanos.yaml`, root `AGENT.md`, minimal Strategy | The founder described the idea in the wizard or has almost no structure. | Read the seed context and orient the founder. | Founder wants to begin and accepts guided diagnosis. |
| Strategy Seed | Strategy only | There is a rough idea, but problem, customer and value are incomplete. | Ask guided diagnosis questions and fill the minimum Strategy knowledge. | Problem, ICP, value proposition and assumptions are minimally clear. |
| Strategy Baseline | Strategy only | The business direction is coherent enough to compare options. | Confirm positioning, business model, validation risk and current constraints. | Founder confirms a baseline worth turning into MVP validation scope or operating roadmap planning. |
| Idea Calibration | Strategy only | The founder needs to understand what the idea is, for whom and why now. | Calibrate clarity, risk and evidence without jumping to execution. | One clear opportunity or validation path is selected. |
| MVP Validation Scope | Strategy only | The founder wants to validate the business through a first MVP path. | Define business thesis, target user, core problem, MVP slice, manual/concierge parts, productized parts, success signals, pivot signals and MVP Validation Sequence. | Founder confirms the MVP validation scope is ready for Product Ops delivery planning or later operating roadmap planning. |
| Roadmap Inicial | Strategy only | The product is operating/scaling or the founder explicitly needs to sequence multiple priorities. | Convert Strategy, customer signals and product constraints into roadmap options, prioritization and current cycle planning. | Founder chooses a near-term roadmap item or operating priority. |
| MVP Delivery Decision | Strategy plus Product Ops activation when needed | The founder wants to turn an approved MVP/backlog/roadmap item into Product Ops backlog or delivery scope. | Decide MVP backlog, delivery boundary, PRD, non-goals, acceptance criteria and dependencies. | If Product Ops is missing, return `activation_required` for Product Ops/Operations. |
| Product Shaping | Product Ops active | A delivery item needs scope, non-goals and acceptance criteria. | Shape epic/feature candidates and delivery readiness. | Feature scope has Product and Engineering readiness inputs. |
| Delivery Readiness | Product Ops plus required supporting areas | Work is nearly implementation-ready. | Check Design, Security and DevOps applicability before Engineering starts. | Required criteria are ready or explicitly not applicable. |
| Implementation | Engineering active | The founder approved a ready feature or issue. | Route to delivery workflow, implementation plan, tests and PR readiness. | Feature is merged, shipped or explicitly stopped. |
| Launch | Marketing/Sales/Customer Success active as needed | The product change needs market, sales or onboarding motion. | Prepare launch, messaging, onboarding and feedback capture. | Launch signals and owner follow-up are recorded. |
| Learning Loop | Strategy plus active delivery/market areas | Evidence exists after launch, experiment or user feedback. | Compare results against assumptions and update roadmap decisions. | Keep, iterate, pivot or pause decision is confirmed. |
| Scaling / Operating Cadence | Multiple active departments | The startup needs repeated operating rhythm. | Maintain cadence, metrics, backlog, risks and cross-department focus. | Next operating cycle is scheduled and owners are clear. |

## Chief Behavior At Startup

When the founder says "quero começar", "como começar", "iniciar leanos", "quero começar agora" or a similar natural-language start intent:

1. Load only the root routing context, `leanos.yaml` and active Strategy files.
2. Summarize what is already known from `seed_context` and Strategy.
3. State the current stage.
4. Identify the smallest missing Strategy decision.
5. Ask one guided question with useful options.
6. Do not ask empty questions such as "tell me more".
7. Do not create roadmap, delivery MVP, feature or implementation files until the Strategy gate is satisfied.

Use this response shape:

```text
O que já temos:
O que ainda falta:
Próximo passo recomendado:
Pergunta:
```

## Guided Question Rules

- Ask one decision at a time.
- Offer 3 to 5 concrete options when the founder may not know the answer.
- Include one "not sure / help me decide" option when uncertainty is likely.
- Tie every question to the next file or decision it unlocks.
- Prefer founder language over internal framework terms.
- After each answer, restate the updated understanding and the next gate.

## Progression Intent Routing

Use intent routing as a stage-aware decision table:

```text
Intent -> Current Stage -> Gate -> Active Requirements -> Route
```

Routing rules:

1. If the current stage can handle the intent with active files, route to the smallest active workflow or playbook.
2. If the intent belongs to a future stage, explain the missing gate before proceeding.
3. If the future stage requires a missing department or area, return `activation_required`.
4. Root routing must not point directly to roles, skills, playbooks or knowledge.
5. Root routing must not point to commands.

## Activation Gates

Activation creates workspace surface area only when the founder's stage needs it.

| Activation | Required When | Must Be True First |
| --- | --- | --- |
| Product Ops / Operations | MVP backlog planning, product scope, epics, features or delivery shaping begins. | Strategy Baseline is coherent and MVP Validation Scope or a confirmed current MVP/backlog item exists. |
| Design | User-facing flow, screen, copy, accessibility or design system decisions are needed. | A feature, experiment or MVP scope has UX impact. |
| Engineering | Implementation, technical planning, branch, tests or PR work begins. | Feature is delivery-ready or an explicitly approved technical spike exists. |
| Security | Data, auth, permissions, privacy, abuse, API or compliance risk appears. | The active feature or workflow has a security-sensitive surface. |
| DevOps | Environments, CI/CD, deploy, release, observability or GitHub automation are needed. | Delivery scope requires operational execution. |
| Marketing / Sales / Customer Success | Launch, acquisition, sales motion, onboarding or retention work begins. | Product or validation direction has a market-facing motion. |
| Finance / Legal / Data | Pricing, budget, contracts, risk, compliance, analytics or metrics become necessary. | The founder decision depends on that specialty. |

## activation_required Response

When activation is required, the Chief should not try to open missing paths.

Do not answer with only `activation_required`.

First explain the next natural operating step in founder language:

```text
Esse pedido ja passou do ponto de estrategia. Minha sugestao e abrir Product Ops agora para transformar isso em escopo executavel.
```

Then ask for confirmation before creating or activating any department or area:

```text
Posso ativar Operations/Product Ops e criar os arquivos minimos para esse proximo passo?
```

After confirmation, run `lean-os activate <area>` from the workspace root, then reload `leanos.yaml`, context and routing indexes before opening the activated area.

Then include the structured activation decision:

```yaml
activation_required:
  target: operations/product-ops
  reason: approved MVP validation scope needs Product Ops ownership before epics or features exist.
  prerequisite_met: MVP Validation Scope or current MVP/backlog item confirmed
  next_action: create the minimal Product Ops workspace and route to mvp-backlog-planning.playbook.md
```

If the prerequisite is not met, say what Strategy decision must happen first.

## Red Lines

- Do not load inactive departments.
- Do not access roles, skills, playbooks, workflows or knowledge that are not active or generated.
- Do not treat "available" as "exists".
- Do not create all departments during setup.
- Do not skip Strategy because the founder asks for an MVP.
- Do not ask broad empty questions when a guided diagnostic question can move the founder forward.
- Do not route to implementation until Product and Engineering readiness are clear.
- Do not mutate durable files without confirming the founder-facing summary.

## Practical Routing Examples

| Founder Says | Stage | Route |
| --- | --- | --- |
| "Quero começar agora" | Setup Seed or Strategy Seed | Active Strategy founder diagnosis workflow. |
| "Minha ideia faz sentido?" | Strategy Seed or Idea Calibration | Calibrate problem, ICP, promise, evidence and risk before roadmap. |
| "Vamos montar o roadmap" | Product operating, growth scaling or explicit multi-priority sequencing | Strategy Roadmap through `strategy/roadmap/AGENT.md` if the operating gate is met. |
| "Vamos definir o MVP" | Idea Calibration or MVP Validation Scope | Strategy Product defines MVP Validation Scope and MVP Validation Sequence. Roadmap is not mandatory after first MVP validation. |
| "Vamos transformar esse item do MVP em entrega" | MVP Validation Scope or MVP Delivery Decision | MVP Validation Scope can hand off directly to Product Ops. Return `activation_required` for Product Ops if not active; then route to MVP backlog planning. |
| "Quebre isso em features" | Product Shaping | Require Product Ops active and delivery scope confirmed. |
| "Implemente essa feature" | Delivery Readiness or Implementation | Return `activation_required` for Engineering if not active; then route to delivery cycle. |
| "Lance isso" | Launch | Activate market-facing departments only as needed. |
| "O que aprendemos?" | Learning Loop | Compare evidence with assumptions and update roadmap decisions. |

## Minimum Strategy Gate

Before MVP Validation Scope, Roadmap Inicial or MVP Delivery Decision, Strategy should contain at least:

- problem statement
- ICP or first user segment
- value proposition
- MVP validation scope when the founder is asking for the first MVP path
- key assumptions
- evidence level
- business model direction or explicit uncertainty
- founder priority for the next step

If any item is missing, ask the smallest guided question that fills it.
