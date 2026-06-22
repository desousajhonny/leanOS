# Security

## Purpose

Own security, privacy, access control and threat-modeling context.

## When to Use

- review security risk
- define access control
- document data protection
- threat model a feature

## Source of Truth

- `threat-model.md`
- `data-protection.md`
- `access-control.md`




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

- Security request: role `roles/security-reviewer.role.md` -> skill `skills/review-security.skill.md` -> playbook `playbooks/security-review.playbook.md`.
