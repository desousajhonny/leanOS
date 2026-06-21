# Company

## Purpose

Keep company identity, principles, mission and operating decisions coherent.

## When to Use

- define company
- clarify mission
- capture principles
- record strategic decisions

## Source of Truth

- `profile.md`
- `mission.md`
- `vision.md`
- `principles.md`
- `operating-model.md`
- `decision-log.md`

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

- Company request: role `roles/company-strategist.role.md` -> skill `skills/define-company.skill.md` -> playbook `playbooks/company-foundation.playbook.md`.
