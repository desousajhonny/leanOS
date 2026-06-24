# Define Mvp Workflow

## Purpose

Shape the first MVP scope from Strategy context using the MVP Decision Gate before Epics, Features, GitHub sync, branch, code or PR work.

## Founder Triggers

- "defina o MVP"
- "define the MVP"
- "qual a primeira versao?"
- "o que entra no MVP?"
- "vamos definir a primeira entrega"
- "quero saber o que fica dentro e fora do MVP"

## Owner

- Department: `operations`
- Primary area: `operations/product-ops`
- Supporting areas: `strategy/product`, `strategy/roadmap`
- Conditional areas: `operations/design`, `operations/security`, `operations/engineering`, `operations/devops`

## Required Areas

- product-ops

## Conditional Areas

- `strategy/product`: Always inspect product strategy context before deciding MVP scope.
- `strategy/roadmap`: Enter when roadmap, backlog or current-cycle context exists or when the founder starts from an existing roadmap item.
- `operations/design`: Enter when MVP scope depends on UX, UI, flows, copy, accessibility, screens, states, interaction or design foundation.
- `operations/security`: Enter when MVP scope touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.
- `operations/engineering`: Enter for a small feasibility check when scope size, architecture, data model, AI behavior or integration risk can change the MVP boundary.
- `operations/devops`: Enter when environments, deploy, GitHub, observability, config or release constraints can change the MVP boundary.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `.leanos/commands/define-mvp.md when slash command is used`
- `.leanos/agent/protocols/where-we-are.md when the current product moment is unclear`
- `operations/AGENT.md`
- `operations/workflows/README.md`
- `operations/workflows/define-mvp.workflow.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/value-proposition.md`
- `operations/product-ops/AGENT.md`
- `operations/product-ops/knowledge/mvp-decision-gate.md`
- `operations/product-ops/mvp/scope.md`
- `operations/product-ops/mvp/prd.md`

## Navigation Route

1. `AGENT.md`
2. `.leanos/commands/define-mvp.md when slash command is used`
3. `operations/AGENT.md`
4. `operations/workflows/define-mvp.workflow.md`
5. `operations/product-ops/AGENT.md`
6. `operations/product-ops/roles/product-owner.role.md`
7. `operations/product-ops/knowledge/mvp-decision-gate.md`
8. `operations/product-ops/skills/define-mvp.skill.md`
9. `operations/product-ops/playbooks/mvp-delivery.playbook.md`
10. `operations/product-ops/mvp/*`
11. `Output`

## Sequence

1. Declare the route and explain that this workflow shapes MVP scope; it does not create Epics, Features, GitHub issues, branches, PRs or code.
2. Confirm there is enough Strategy Product context to evaluate the target user, problem, value proposition and business assumption.
3. If Strategy context is missing, stop and recommend `/start-leanos` or Strategy Product before MVP definition.
4. Load Product Ops through `operations/product-ops/AGENT.md` and choose `roles/product-owner.role.md`.
5. Load `operations/product-ops/knowledge/mvp-decision-gate.md` before deciding any item.
6. Use `skills/define-mvp.skill.md` and `playbooks/mvp-delivery.playbook.md` to evaluate Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk.
7. Ask guided questions only for missing inputs; use short options when the founder is unsure.
8. Separate candidates into in MVP now, later/backlog, needs discovery, needs specialist check or not now.
9. Route Design only when usability, accessibility, UI or flow uncertainty can change the MVP boundary.
10. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk can change the MVP boundary.
11. Route Engineering only for a small feasibility check that can change scope, not for implementation.
12. Route DevOps only when environment, deploy, GitHub, observability, config or release constraints can change scope.
13. Explain the MVP recommendation in founder-friendly language before mentioning file updates.
14. Ask for confirmation before writing MVP files.
15. After confirmation, offer the bridge to `roadmap-item-to-epic` only when the founder wants delivery planning.

## Confirmation Gates

- Ask before deciding that an item enters the MVP.
- Ask before writing MVP scope, PRD, stories, acceptance criteria, non-goals or release checklist.
- Ask before updating Product Ops overview or delivery scope.
- Ask before moving to `roadmap-item-to-epic`.

## Allowed Updates

- `operations/product-ops/mvp/scope.md`
- `operations/product-ops/mvp/prd.md`
- `operations/product-ops/mvp/user-stories.md`
- `operations/product-ops/mvp/user-flows.md`
- `operations/product-ops/mvp/acceptance-criteria.md`
- `operations/product-ops/mvp/non-goals.md`
- `operations/product-ops/mvp/release-checklist.md`
- `operations/product-ops/knowledge/overview.md`
- `operations/product-ops/knowledge/delivery-scope.md`

## Forbidden Updates

- `operations/product-ops/epics/`
- `Feature files`
- `operations/engineering/`
- `operations/design/knowledge/components/`
- `.github/`
- `.leanos/index/`
- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `ai-standard/`
- `source code`
- `branches`
- `pull requests`

## External Capabilities

- No external capability is required.
- Do not call GitHub APIs in this workflow.
- Do not create branches, commits, PRs or code in this workflow.

## Stop Conditions

- Product strategy is too unclear to evaluate Value Risk.
- The founder cannot identify the primary user, problem or first outcome.
- The MVP scope is too broad and needs splitting before a decision.
- Design, Security, Engineering or DevOps risk can change the MVP boundary and cannot be resolved or marked not applicable.
- The founder does not confirm the proposed MVP scope.
- The request shifts into Epic creation, Feature shaping, GitHub sync, branch, code or PR work.

## Expected Output

- Founder-friendly MVP recommendation.
- In MVP now.
- Later/backlog.
- Needs discovery.
- Needs specialist check.
- Not now.
- Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk result.
- Proposed MVP file updates.
- Clear next-step bridge to `roadmap-item-to-epic` when the founder wants delivery planning.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
O escopo inicial do MVP esta definido.
Quer que eu transforme um item confirmado desse MVP em um Epic local com milestone, release_goal e criterios iniciais?
```

Later-session triggers:

- "vamos transformar esse item do MVP em epic"
- "isso vira epic?"
- "crie um epic para esse item do MVP"
- "vamos planejar a entrega desse item"
- "isso entra na proxima entrega?"

Next route:

`roadmap-item-to-epic`

Rules:

- Do not automatically create Epics after MVP definition.
- If the founder says yes, declare the `roadmap-item-to-epic` route before loading the next workflow.
- If the founder says no, summarize the MVP decision and stop without writing anything else.
- If the founder returns later with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `roadmap-item-to-epic`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
