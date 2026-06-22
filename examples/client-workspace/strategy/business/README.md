# Business

## Purpose

Keep business identity, principles, mission and operating decisions coherent.

## When to Use

- define business identity
- clarify mission
- capture principles
- record strategic decisions

## Source of Truth

- `knowledge/profile.md`
- `knowledge/mission.md`
- `knowledge/vision.md`
- `knowledge/principles.md`
- `knowledge/operating-model.md`
- `knowledge/decision-log.md`




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

- Business request: `AGENT.md` -> role `roles/business-strategist.role.md` -> skill `skills/define-business-identity.skill.md` or `skills/clarify-operating-model.skill.md` -> playbook `playbooks/business-foundation.playbook.md`.
