# Design

## Purpose

Own the MVP design foundation, accessibility baseline and user-flow clarity before implementation.

## When to Use

- define design foundation
- map user flows
- define accessibility baseline
- design onboarding
- reason about usability

## Source of Truth

- `knowledge/design-system.md`
- `knowledge/accessibility.md`
- `knowledge/user-flows.md`




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

- Design foundation request: area lead `AGENT.md` -> role `roles/product-designer.role.md` -> skills `skills/design-system.skill.md`, `skills/accessibility.skill.md` and `skills/user-flow-mapping.skill.md` -> playbook `playbooks/design-foundation.playbook.md`.
- Research request: area lead `AGENT.md` -> role `roles/ux-researcher.role.md` -> skill `skills/user-research.skill.md` -> playbook `playbooks/user-research.playbook.md`.
- Accessibility request: area lead `AGENT.md` -> role `roles/accessibility-specialist.role.md` -> skills `skills/accessibility.skill.md` and `skills/design-review.skill.md` when general UX evaluation is needed -> playbook `playbooks/accessibility-review.playbook.md`.
- UX writing request: area lead `AGENT.md` -> role `roles/ux-writer.role.md` -> skill `skills/microcopy.skill.md` -> playbook `playbooks/ux-writing.playbook.md`.
- Design review request: area lead `AGENT.md` -> role `roles/product-designer.role.md` or applicable specialist -> skill `skills/design-review.skill.md` -> output findings without creating a review playbook.
