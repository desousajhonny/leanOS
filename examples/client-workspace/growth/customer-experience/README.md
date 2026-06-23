# Customer Experience

## Purpose

Own customer learning loops, support notes and experience feedback.

## When to Use

- capture customer feedback
- analyze support notes
- understand churn
- document success moments

## Source of Truth

- `knowledge/customer-feedback.md`
- `knowledge/support-notes.md`
- `knowledge/churn-reasons.md`
- `knowledge/success-moments.md`

## Operating Rules

- Treat customer signals as evidence, not product decisions by themselves.
- Route product changes back to Strategy Product or Product Ops when feedback affects scope.
- Keep feedback lightweight and useful for learning loops.

## Red Lines

- Do not store sensitive customer data, private identifiers or support secrets in these files.
- Do not treat one loud customer as validated market evidence.
- Do not promise roadmap changes without Strategy/Roadmap confirmation.


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

- Customer experience request: area lead `AGENT.md` -> role `roles/cx-lead.role.md` -> skills `skills/map-customer-feedback.skill.md` and conditional `skills/synthesize-support-patterns.skill.md` -> playbook `playbooks/customer-learning-loop.playbook.md`.
