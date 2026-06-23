# Finance

## Purpose

Own pricing, revenue model, unit economics, budget and financial risks.

## When to Use

- define pricing
- review unit economics
- track budget
- reason about revenue model

## Source of Truth

- `knowledge/pricing.md`
- `knowledge/revenue-model.md`
- `knowledge/unit-economics.md`
- `knowledge/budget.md`
- `knowledge/finance-risks.md`

## Operating Rules

- Keep finance lightweight and hypothesis-driven for MVP.
- Route pricing assumptions back to Strategy Product when they affect positioning or value proposition.
- Route paid acquisition or spend decisions back to Marketing/Founder before committing.

## Red Lines

- Do not present unvalidated pricing as fact.
- Do not make accounting, tax, legal or investment advice claims.
- Do not commit spend, revenue forecast or runway claims without explicit founder confirmation.


## Navigation

1. For operational work, start with `AGENT.md`.
2. Use this README as the directory map.
3. After the area AGENT selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- Finance request: area lead `AGENT.md` -> role `roles/finance-operator.role.md` -> skills `skills/review-pricing.skill.md` and conditional `skills/model-unit-economics.skill.md` -> playbook `playbooks/finance-review.playbook.md`.
