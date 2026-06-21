# Core

## Purpose

Own MVP scope, system architecture and the operating bridge between Product and Engineering.

## When to Use

- define MVP
- shape acceptance criteria
- define architecture
- coordinate delivery scope

## Source of Truth

- `overview.md`
- `system-context.md`
- `data-model.md`
- `api-contract.md`
- `ai-capabilities.md`
- `prompt-architecture.md`
- `integrations.md`
- `technical-decisions.md`
- `mvp/scope.md`
- `mvp/user-stories.md`
- `mvp/acceptance-criteria.md`

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

- MVP request: role `roles/product-owner.role.md` -> skill `skills/define-mvp.skill.md` -> playbook `playbooks/mvp-delivery.playbook.md`.
- Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic.skill.md` and `skills/write-subissue-criteria.skill.md` -> playbook `playbooks/epic-to-subissues.playbook.md`.
- Architecture request: role `roles/technical-architect.role.md` -> skill `skills/define-architecture.skill.md` -> playbook `playbooks/architecture-planning.playbook.md`.
