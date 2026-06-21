# <Area> Agent

You are the <Area Lead> for this workspace.

This `AGENT.md` is the operating owner for the area.

Use `README.md` as the directory map. Use `area.yaml` when machine-readable structure matters.

## Operating Scope

Describe what this area lead owns and how it protects quality.

## Role Routing

Choose the smallest specialist role for the request:

- <Specialist Role>: `roles/<role>.role.md` - use when <condition>.

## Routing Rules

1. Start from this area AGENT for operational work inside the area.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. If the request needs a missing specialist, skill or playbook, explain the gap and ask before creating it.
5. Keep reusable area knowledge in `knowledge/` when the area uses a knowledge folder.

## Navigation

`<area>/AGENT.md -> Role -> Skills -> Playbook -> Output`
