# New Idea Intake Workflow

## Purpose

Capture, qualify and decide the next destination of a founder idea before it becomes roadmap, delivery scope or implementation work.

## Founder Triggers

- "tenho uma ideia"
- "quero avaliar uma feature nova"
- "isso faz sentido para o produto?"
- "pensei em uma melhoria"
- "vale a pena fazer isso?"

## Owner

- Department: `strategy`
- Primary area: `product`
- Supporting areas: `roadmap`
- Conditional areas: `validation`

## Required Areas

- product
- roadmap

## Conditional Areas

- `validation`: Enter only when the active workspace includes Validation and the idea depends on risky assumptions that need explicit evidence planning.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `strategy/AGENT.md`
- `strategy/workflows/README.md`
- `strategy/workflows/new-idea-intake.workflow.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/value-proposition.md`
- `strategy/product/knowledge/validation-notes.md`

## Navigation Route

1. `AGENT.md`
2. `strategy/AGENT.md`
3. `strategy/workflows/new-idea-intake.workflow.md`
4. `strategy/product/AGENT.md`
5. `strategy/product/roles/product-strategist.role.md`
6. `strategy/product/skills/evaluate-idea.skill.md`
7. `strategy/product/playbooks/product-strategy.playbook.md`
8. `strategy/roadmap/AGENT.md only after founder confirms roadmap or backlog promotion`

## Sequence

1. Read product strategy before judging the idea
2. Restate the founder idea in plain language and ask only the minimum guided questions needed to remove ambiguity
3. Evaluate idea against ICP, problem, value proposition, evidence, current focus and opportunity cost
4. Identify assumptions, evidence gaps, dependencies and why this idea may or may not matter now
5. Use Validation only when it exists and risky assumptions need explicit experiment planning; do not require Validation for the default MVP path
6. Recommend one outcome: reject, refine, park, validation note, backlog candidate or roadmap candidate
7. Explain the recommendation in founder-friendly language
8. Ask for confirmation before recording the idea anywhere or starting the roadmap promotion workflow

## Confirmation Gates

- Ask before recording the idea as a note.
- Ask before updating product knowledge.
- Ask before routing to Roadmap.
- Ask before starting `idea-to-roadmap`.

## Allowed Updates

- `strategy/product/knowledge/validation-notes.md`

## Forbidden Updates

- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/backlog.md`
- `Product Ops delivery assets until operations.product-ops is activated`
- `local Epic assets until operations.product-ops is activated`
- `.github/`
- `.leanos/`
- `source code`
- `branches`
- `pull requests`

## External Capabilities

- No external capability is required.
- Do not call GitHub APIs.
- Do not create branches, commits, code or PRs.

## Stop Conditions

- The idea is too vague to evaluate after guided questions.
- Product strategy is missing enough context to judge fit.
- The founder does not confirm recording the note or moving to Roadmap.
- The request shifts into delivery scope, Epic creation, GitHub sync, branch, code or PR work.

## Expected Output

- Plain-language restatement of the idea.
- Fit assessment against product strategy.
- Risks, assumptions and evidence gaps.
- Recommendation: reject, refine, park, validation note, backlog candidate or roadmap candidate.
- Founder-friendly confirmation question for the next step.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Essa ideia parece forte o bastante para ser acompanhada.
Quer que eu transforme isso em um item de roadmap ou backlog para decidirmos prioridade e momento?
```

Later-session triggers:

- "vamos colocar aquela ideia no roadmap"
- "quero salvar essa ideia no backlog"
- "vamos priorizar a ideia que discutimos"
- "essa ideia merece entrar no produto?"

Next route:

`idea-to-roadmap`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Strategy area READMEs for each step to preserve area-first ownership.
