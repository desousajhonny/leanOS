# Creation Rules

Use these rules before creating or changing any LeanOS framework asset.

## Purpose

Creation rules protect the workspace from asset sprawl, duplicated responsibilities and route-breaking files.

They answer:

- Should this asset exist?
- Where should it live?
- Which existing asset should own this responsibility?
- What must be loaded before creating it?
- What should not be created?

## Load First

Before creating an asset, load:

1. `asset-taxonomy.md` to confirm the asset type.
2. `navigation-chain.md` to confirm where the asset belongs.
3. `naming-conventions.md` to name the file correctly.
4. The matching instruction in `../instructions/`.
5. The matching template in `../templates/`.
6. The matching checklist in `../checklists/`.

## Creation Decision

Create a new asset only when all are true:

- The request cannot be handled by an existing asset.
- The new asset has a clear owner in the Navigation Chain.
- The new asset has a stable reusable purpose.
- The asset will reduce ambiguity for future models.
- The user confirms the creation or update.

Do not create an asset when:

- A README note is enough.
- A role can reference an existing skill.
- A skill can be reused instead of a new skill.
- A playbook would duplicate an existing workflow.
- The asset is only a one-off answer to the current user.
- The asset would bypass department or area ownership.

## Placement Rules

- Root `AGENT.md` lives at workspace root.
- Department `AGENT.md`, `README.md`, `department.yaml` and `workflows/` live at department root.
- Area `AGENT.md`, `README.md`, `area.yaml`, `knowledge/`, `roles/`, `skills/` and `playbooks/` live inside the area.
- Roles, skills and playbooks do not live directly under root departments.
- Business workflows live in departments or areas, not in `.leanos/`.
- Framework standards, templates, checklists, instructions and examples live in `ai-standard/`.

## Responsibility Rules

- `AGENT.md` routes and sets operating boundaries.
- `README.md` maps a folder.
- `department.yaml` and `area.yaml` provide machine-readable structure.
- Role files define who acts.
- Skill files define reusable capabilities.
- Playbook files define execution sequence.
- Knowledge files store confirmed facts and decisions.
- Workflow files coordinate multi-step work across owners.

## Confirmation Rule

Before writing or changing framework assets:

1. State the asset type.
2. State the owner path.
3. State why an existing asset is not enough.
4. State which template and checklist will be used.
5. Ask for explicit confirmation.

## Red Lines

- Do not invent missing roles, skills, playbooks, workflows or templates.
- Do not create assets outside the owning department or area.
- Do not place product or company facts inside framework operating assets.
- Do not update `ai-standard/`, roles, skills, playbooks or workflows during startup.
- Do not create a broad asset when a narrow one would be clearer.
- Do not create files just to make the workspace look complete.

## Design Example

If Design needs a reusable capability for evaluating PRs:

- Asset type: skill.
- Owner: `operations/design/skills/`.
- File: `design-review.skill.md`.
- Role usage: Product Designer, Accessibility Specialist or UX Writer can load it when relevant.
- Do not create `design-review.playbook.md` unless there is a repeatable execution sequence beyond the skill itself.
