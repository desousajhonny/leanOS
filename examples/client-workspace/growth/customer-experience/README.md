# Customer Experience

## Purpose

Own customer learning loops, support notes and experience feedback.

## When to Use

- capture customer feedback
- analyze support notes
- understand churn
- document success moments

## Source of Truth

- `customer-feedback.md`
- `support-notes.md`
- `churn-reasons.md`
- `success-moments.md`




## Navigation

1. Choose the relevant role from `roles/`.
2. Load only the required skills from `skills/`.
3. Use the matching playbook from `playbooks/`.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- Customer experience request: role `roles/cx-lead.role.md` -> skill `skills/map-customer-feedback.skill.md` -> playbook `playbooks/customer-learning-loop.playbook.md`.
