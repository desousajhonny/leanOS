# Folder Documentation Rules

Use these rules when creating or reviewing folder documentation, especially `README.md` files.

## Purpose

Folder documentation helps humans and models understand where they are, what belongs there and where to go next.

It answers:

- What is this folder for?
- When should an agent enter it?
- Which files are important?
- Which files are source of truth, operating assets or examples?
- Where should the agent route next?

## README Responsibility

A folder README is a map, not the operator.

It should:

- Explain the folder purpose.
- Explain when to use the folder.
- List important files and subfolders.
- Point to the operating owner when one exists.
- Identify related folders.
- Provide navigation notes.

It should not:

- Replace `AGENT.md` routing.
- Replace role instructions.
- Replace skill capabilities.
- Replace playbook sequence.
- Store product facts that belong in knowledge files.
- Become a catch-all document.

## Required Sections

Use these sections for important folders:

- `# <Folder Name>`
- `## Purpose`
- `## When to Use`
- `## Source of Truth` when the folder owns knowledge or durable context.
- `## Files`
- `## Related Folders`
- `## Navigation`
- `## Agent Notes`

If a section does not apply, omit it or state `Not applicable` when the absence matters.

## Navigation Rules

- If the folder has `AGENT.md`, tell agents to start there for operational work.
- If the folder has `department.yaml` or `area.yaml`, mention that it provides machine-readable structure.
- If the folder has `roles/`, `skills/` or `playbooks/`, explain that the area owner selects them.
- If the folder contains examples, say examples are references only.
- If the folder contains templates, say templates are starting structures, not active workspace context.

## Folder Type Examples

### Department Folder

Example: `operations/README.md`

- Explains what Operations owns.
- Points to `operations/AGENT.md`.
- Lists active areas.
- Points to `workflows/` for cross-area work.
- Does not list every role, skill or playbook from every area.

### Area Folder

Example: `operations/design/README.md`

- Explains what Design owns.
- Points to `operations/design/AGENT.md`.
- Lists `knowledge/`, `roles/`, `skills/` and `playbooks/`.
- Explains common paths at a high level.
- Does not execute the Design process itself.

### Knowledge Folder

Example: `operations/design/knowledge/README.md`

- Explains which durable Design facts live there.
- Lists knowledge files.
- Says updates require confirmation.
- Does not define skills or playbook sequence.

### AI Standard Folder

Example: `ai-standard/README.md`

- Routes to foundation, templates, checklists, instructions and examples.
- Explains when to use each route.
- Tells models not to load everything by default.

## Red Lines

- Do not make folder README files huge inventories.
- Do not duplicate all content from child files.
- Do not document paths that do not exist.
- Do not point directly to a role when an area AGENT should route first.
- Do not hide process rules inside a README when a playbook should own them.
