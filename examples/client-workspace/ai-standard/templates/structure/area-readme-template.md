# <Area>

## Purpose

What this area owns.

## When to Use

- <intent or situation>

## Source of Truth

- `<file>.md`

## Navigation

1. If this area has `AGENT.md`, start there for operational routing.
2. Use this README as the directory map.
3. After the area owner selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `AGENT.md`: optional area operating owner.
- `README.md`: area map and explanation.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- <request>: role `roles/<role>.role.md` -> skill `skills/<skill>/SKILL.md` -> playbook `playbooks/<playbook>.playbook.md`.
