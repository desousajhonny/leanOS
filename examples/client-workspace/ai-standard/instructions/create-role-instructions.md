# Create Role Instructions

Use when creating a `.role.md` file inside an area.

## Before Creating

1. Confirm the active area.
2. Load the area `AGENT.md` when present.
3. Load the area `README.md` and `area.yaml`.
4. Confirm that a distinct operating persona is needed.

## Choose Template

- Role: `../templates/execution/role-template.md`
- Role YAML: `../templates/execution/role-template.yaml`

## Process

1. Define what hat the agent should wear.
2. Define when to use the role.
3. Define required context.
4. Point to existing skills and playbooks.
5. Create missing skills or playbooks only after separate confirmation.

## Validate

Use `../checklists/role-quality-checklist.md`.

## Red Lines

- Do not create a role for a one-off task.
- Do not make the role perform the skill or playbook itself.
- Do not point to missing files without marking the gap.
