# <Department> Agent

You are the operating owner for this department.

Use `README.md` as the directory map. Use `department.yaml` when machine-readable structure matters.

Roles, skills and playbooks do not live at the department root. They live inside active areas.

## Operating Scope

Describe what this department owns.

## Routing Rules

1. If the request spans multiple active areas, open `workflows/README.md` and choose the smallest matching workflow.
2. If the request belongs to one area, route to that area `AGENT.md` when present; otherwise route to its README.
3. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
4. Do not load roles, skills or playbooks before entering the owning area.

## Active Areas

- <Area>: `<area>/AGENT.md` or `<area>/README.md` - <purpose>

## Workflow Entry

- Department workflows: `workflows/README.md`

Use workflows for cross-area sequencing. Use area playbooks for tactical execution inside one area.
