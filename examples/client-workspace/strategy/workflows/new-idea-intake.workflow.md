# New Idea Intake Workflow

## Purpose

Capture, qualify and decide whether a founder idea should refine strategy, update MVP Validation Scope or become a roadmap candidate.

## Founder Triggers

- "tenho uma ideia"
- "quero avaliar uma feature nova"
- "isso faz sentido para o produto?"
- "pensei em uma melhoria"
- "vale a pena fazer isso?"

## Entry Gate

- Root AGENT must read `leanos.yaml` before this workflow is selected.
- Chief must identify the current business stage from `activation.current_stage`, `company.stage`, active Strategy files and the founder message.
- This workflow must re-check `leanos.yaml` and the current business-stage reading before evaluating the idea.

## Owner

- Department: `strategy`
- Primary area: `product`
- Supporting areas: `roadmap`

## Required Areas

- product
- roadmap

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `leanos.yaml`
- `strategy/AGENT.md`
- `strategy/workflows/README.md`
- `strategy/workflows/new-idea-intake.workflow.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/value-proposition.md`
- `strategy/product/knowledge/mvp-validation-scope.md`
- `strategy/product/knowledge/validation-notes.md`

## Navigation Route

1. `AGENT.md`
2. `leanos.yaml`
3. `Chief business-stage diagnosis before Strategy route`
4. `strategy/AGENT.md`
5. `strategy/workflows/new-idea-intake.workflow.md`
6. `new-idea-intake state re-check before Product evaluation`
7. `strategy/product/AGENT.md`
8. `strategy/product/roles/product-strategist.role.md`
9. `strategy/product/skills/evaluate-idea.skill.md`
10. `strategy/product/skills/define-mvp-validation-scope.skill.md`
11. `strategy/product/playbooks/product-strategy.playbook.md`
12. `strategy/roadmap/AGENT.md only after founder confirms roadmap or backlog promotion`

## Sequence

1. Re-check `leanos.yaml` and confirm the Chief's current business-stage diagnosis before evaluating the idea
2. If the business stage is unclear, ask the smallest diagnostic question or route to `founder-diagnosis`; do not judge the idea yet
3. Read product strategy before judging the idea
4. Restate the founder idea in plain language and ask only the minimum guided questions needed to remove ambiguity
5. Evaluate idea against ICP, problem, value proposition, evidence, current focus and opportunity cost
6. Identify assumptions, evidence gaps, dependencies and why this idea may or may not matter now
7. Use `validation-notes.md` for lightweight assumptions and evidence gaps; do not route to a formal Strategy Validation area
8. When the founder wants speed, treat MVP as the default business validation path and decide whether to define or update MVP Validation Scope
9. Recommend one outcome: reject, refine, park, validation note, MVP Validation Scope update, backlog candidate or roadmap candidate
10. Explain the recommendation in founder-friendly language
11. Ask for confirmation before recording the idea anywhere or starting the roadmap promotion workflow

## Confirmation Gates

- Ask before recording the idea as a note.
- Ask before updating product knowledge.
- Ask before routing to Roadmap.
- Ask before starting `idea-to-roadmap`.

## Allowed Updates

- `strategy/product/knowledge/mvp-validation-scope.md`
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

- The current business stage is unclear after the smallest useful diagnostic question.
- The idea is too vague to evaluate after guided questions.
- Product strategy is missing enough context to judge fit.
- The founder does not confirm recording the note or moving to Roadmap.
- The request shifts into delivery scope, Epic creation, GitHub sync, branch, code or PR work.

## Expected Output

- Current business-stage reading and why it matters for this idea.
- Plain-language restatement of the idea.
- Fit assessment against product strategy.
- Risks, assumptions and evidence gaps.
- Recommendation: reject, refine, park, validation note, MVP Validation Scope update, backlog candidate or roadmap candidate.
- MVP Validation Scope recommendation when the idea is strong enough for an MVP validation path.
- Founder-friendly confirmation question for the next step.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Essa ideia parece forte o bastante para virar um MVP de validacao.
Quer que eu transforme isso em MVP Validation Scope e depois em um MVP Candidate Roadmap?
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
