# Product Ops

## Purpose

Turn Strategy and Roadmap into delivery scope, acceptance criteria and implementation-ready work.

## When to Use

- define MVP
- shape acceptance criteria
- break epics into sub-issues
- check issue readiness
- coordinate delivery scope

## Source of Truth

- `knowledge/overview.md`
- `knowledge/delivery-scope.md`
- `knowledge/delivery-context.md`
- `knowledge/issue-readiness.md`
- `knowledge/ready-to-develop.md`
- `knowledge/technical-decisions.md`
- `mvp/scope.md`
- `mvp/prd.md`
- `mvp/user-stories.md`
- `mvp/acceptance-criteria.md`




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

- Product Ops request: area lead `AGENT.md` -> choose Product Owner or Delivery Architect -> load only the required skills and playbook.
- Delivery scope request: role `roles/product-owner.role.md` -> skill `skills/define-delivery-scope.skill.md` -> playbook `playbooks/delivery-scope-planning.playbook.md`.
- MVP request: role `roles/product-owner.role.md` -> skill `skills/define-mvp.skill.md` -> playbook `playbooks/mvp-delivery.playbook.md`.
- Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic.skill.md` and `skills/write-subissue-criteria.skill.md` -> playbook `playbooks/epic-to-subissues.playbook.md`.
- Delivery readiness request: role `roles/delivery-architect.role.md` -> skill `skills/define-delivery-boundaries.skill.md` -> playbook `playbooks/delivery-readiness.playbook.md`.
