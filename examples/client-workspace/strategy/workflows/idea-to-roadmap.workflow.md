# Idea To Roadmap Workflow

## Purpose

Promote a qualified idea or MVP Validation Scope into an MVP Candidate Roadmap or backlog item without creating delivery scope or GitHub execution.

## Founder Triggers

- "vamos colocar essa ideia no roadmap"
- "salve isso no backlog"
- "isso entra no backlog do produto?"
- "vamos priorizar essa ideia"
- "essa ideia entra no roadmap?"

## Owner

- Department: `strategy`
- Primary area: `roadmap`
- Supporting areas: `product`

## Required Areas

- product
- roadmap

## Conditional Areas

- `operations.product-ops`: Use activation_required only after the founder confirms that a roadmap item should become delivery work or a local Epic.
- `growth.customer-experience`: Use activation_required only when customer evidence, support patterns or launch learning should influence priority.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `strategy/AGENT.md`
- `strategy/workflows/README.md`
- `strategy/workflows/idea-to-roadmap.workflow.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/value-proposition.md`
- `strategy/product/knowledge/mvp-validation-scope.md`
- `strategy/product/knowledge/validation-notes.md`
- `strategy/roadmap/AGENT.md`
- `strategy/roadmap/knowledge/backlog.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/current-cycle.md`

## Navigation Route

1. `AGENT.md`
2. `strategy/AGENT.md`
3. `strategy/workflows/idea-to-roadmap.workflow.md`
4. `strategy/product/AGENT.md`
5. `strategy/product/roles/product-strategist.role.md`
6. `strategy/product/skills/define-mvp-validation-scope.skill.md`
7. `strategy/roadmap/AGENT.md`
8. `strategy/roadmap/roles/roadmap-planner.role.md`
9. `strategy/roadmap/skills/prioritize-backlog.skill.md`
10. `strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md`

## Sequence

1. Confirm the idea already passed `new-idea-intake` or that the founder explicitly asked for roadmap or backlog promotion
2. Read product strategy, MVP Validation Scope and roadmap context before classifying the item
3. Preserve the qualified idea context; do not redo the entire intake unless key context is missing
4. Define problem, user, expected value, dependencies, evidence level, MVP validation goal and opportunity cost
5. When this is the first product path, create an MVP Candidate Roadmap from the MVP Validation Scope
6. Classify the item as backlog, Now, Next, Later or Not Planned
7. Do not create Epics, Features or implementation work in this workflow
8. Propose roadmap or backlog updates in founder-friendly language and wait for confirmation before writing
9. After confirmation, update only the appropriate roadmap or backlog knowledge files

## Confirmation Gates

- Ask before writing to backlog or roadmap.
- Ask before changing current cycle or milestone language.
- Ask before requesting activation for operations.product-ops and the `roadmap-item-to-epic` route.
- Ask before changing anything outside Strategy.

## Allowed Updates

- `strategy/roadmap/knowledge/backlog.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/current-cycle.md`
- `strategy/product/knowledge/mvp-validation-scope.md`
- `strategy/product/knowledge/validation-notes.md`

## Forbidden Updates

- `Product Ops Epic assets until operations.product-ops is activated`
- `Product Ops delivery-scope knowledge until operations.product-ops is activated`
- `Product Ops MVP assets until operations.product-ops is activated`
- `.github/`
- `.leanos/`
- `source code`
- `branches`
- `pull requests`
- `GitHub remote state`

## External Capabilities

- No external capability is required.
- Do not call GitHub APIs.
- Do not create Epics, Features, branches, commits, code or PRs.

## Stop Conditions

- The idea did not pass intake and the founder has not explicitly asked for roadmap or backlog promotion.
- Product fit, user, problem or expected value is still unclear.
- Roadmap context is missing enough to classify the item.
- The founder does not confirm the proposed roadmap or backlog update.
- The request shifts into delivery scope, Epic creation, GitHub sync, branch, code or PR work.

## Expected Output

- MVP Candidate Roadmap when the item is the initial MVP validation path.
- Roadmap/backlog classification with reason.
- Founder-friendly summary of why the item belongs in backlog, Now, Next, Later or Not Planned.
- Proposed update to roadmap or backlog knowledge.
- Explicit statement that Epic, Feature and implementation status is not decided here.
- Clear next-step bridge to activation_required for operations.product-ops when the founder wants to plan delivery.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Esse item agora esta organizado como MVP Candidate Roadmap ou backlog.
Quer que eu ative Product Ops para transformar o item escolhido em um Epic local com escopo, milestone e criterios iniciais?
```

Later-session triggers:

- "isso entra no MVP?"
- "isso entra na proxima entrega?"
- "vamos planejar a entrega desse item"
- "vamos transformar esse item do roadmap em epic"
- "qual milestone recebe esse item?"

Next route:

`activation_required: operations.product-ops, then roadmap-item-to-epic`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Strategy area READMEs for each step to preserve area-first ownership.
