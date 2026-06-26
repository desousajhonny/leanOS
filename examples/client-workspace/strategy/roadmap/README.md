# Roadmap

## Purpose

Own roadmap sequence, milestones, backlog and planning-cycle prioritization for operating or scaling products.

## When to Use

- sequence product work for product_operating or growth_scaling
- prioritize multiple backlog candidates
- define current cycle
- plan milestones

## Source of Truth

- `knowledge/roadmap.md`
- `knowledge/milestones.md`
- `knowledge/current-cycle.md`
- `knowledge/backlog.md`




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

- Roadmap request: `AGENT.md` -> role `roles/roadmap-planner.role.md` -> skill `skills/create-roadmap/SKILL.md` -> playbook `playbooks/roadmap-cycle-planning.playbook.md`.
