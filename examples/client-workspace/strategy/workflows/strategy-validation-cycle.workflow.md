# Strategy Validation Cycle Workflow

## Purpose

Coordinate company, product, roadmap and validation work inside Strategy.

## Founder Triggers

- "precisamos validar essa hipotese"
- "como vamos testar essa ideia?"
- "temos evidencia suficiente?"
- "o que precisamos aprender antes de priorizar?"
- "vamos rodar um ciclo de validacao"

## Owner

- Department: `strategy`
- Primary area: `validation`
- Supporting areas: `product`, `roadmap`

## Required Areas

- product
- roadmap
- validation

## Conditional Areas

- `growth.customer-experience`: Use activation_required only when validation depends on feedback from real customers, support notes or success moments.
- `operations.product-ops`: Use activation_required only when validation changes the delivery scope, MVP boundary or Epic readiness.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `strategy/AGENT.md`
- `strategy/workflows/strategy-validation-cycle.workflow.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/validation-notes.md`
- `strategy/roadmap/AGENT.md`
- `strategy/roadmap/knowledge/backlog.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/validation/README.md`

## Navigation Route

1. `AGENT.md`
2. `strategy/AGENT.md`
3. `strategy/workflows/strategy-validation-cycle.workflow.md`
4. `strategy/product/AGENT.md`
5. `strategy/product/roles/product-strategist.role.md`
6. `strategy/roadmap/AGENT.md`
7. `strategy/roadmap/roles/roadmap-planner.role.md`
8. `strategy/validation/README.md`
9. `strategy/validation/roles/validation-researcher.role.md`
10. `strategy/validation/skills/define-assumptions.skill.md`
11. `strategy/validation/playbooks/mvp-validation.playbook.md`

## Sequence

1. Read product strategy before defining what needs validation.
2. Review roadmap/backlog context to understand why this assumption matters now.
3. Identify the riskiest assumptions and separate known evidence from guesses.
4. Choose the smallest validation action that can produce useful learning.
5. Define success and failure signals before any experiment is treated as evidence.
6. Capture learning only after evidence exists.
7. Propose roadmap, backlog or delivery-scope impact only after the founder confirms the learning.
8. Route to Product Ops only when confirmed learning changes delivery scope or Epic readiness.

## Confirmation Gates

- Ask before creating or changing an experiment plan.
- Ask before recording learning as evidence.
- Ask before changing roadmap or backlog priority.
- Ask before routing to Product Ops or Growth.

## Allowed Updates

- `strategy/validation/assumptions.md`
- `strategy/validation/riskiest-assumptions.md`
- `strategy/validation/experiments.md`
- `strategy/validation/success-metrics.md`
- `strategy/validation/learning-log.md`
- `strategy/product/knowledge/validation-notes.md`
- `strategy/roadmap/knowledge/backlog.md after founder confirmation`
- `strategy/roadmap/knowledge/roadmap.md after founder confirmation`

## Forbidden Updates

- `Product Ops Epic assets until operations.product-ops is activated`
- `.github/`
- `.leanos/`
- `source code`
- `branches`
- `pull requests`
- `GitHub remote state`

## External Capabilities

- No external capability is required by default.
- Do not call survey, CRM, analytics or GitHub APIs from this workflow without a separate confirmed tool-specific flow.

## Stop Conditions

- Product context is too weak to identify the assumption.
- The founder wants implementation rather than validation.
- Validation evidence is not available yet.
- The founder does not confirm the proposed validation or learning update.
- The request requires external customer outreach or API execution that is not configured.

## Expected Output

- Assumption summary.
- Risk priority and why it matters.
- Validation action or evidence gap.
- Success/failure signals.
- Founder-friendly recommendation for roadmap, backlog, delivery scope or no change.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Se essa validacao mudar a prioridade, quer que eu leve o aprendizado para o roadmap ou backlog?
```

Later-session triggers:

- "a validacao mudou a prioridade"
- "vamos atualizar o roadmap com esse aprendizado"
- "isso entra no escopo agora?"
- "o que fazemos com esse aprendizado?"

Next route:

`idea-to-roadmap or activation_required: operations.product-ops depending on the founder decision`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Strategy area READMEs for each step to preserve area-first ownership.
