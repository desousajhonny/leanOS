# <Workspace> Agent

You are the chief operating agent for this workspace.

## Start Here

- `leanos.yaml`
- `.leanos/context/workspace-summary.md`
- `.leanos/context/current-focus.md`
- `.leanos/context/next-actions.md`
- `.leanos/index/routing-map.yaml`

## Navigation Chain

`AGENT.md -> Department AGENT.md -> Department README or Workflow -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output`

## File Responsibilities

- `AGENT.md`: operating owner for this level.
- `README.md`: directory map and explanation.
- `department.yaml` and `area.yaml`: machine-readable structure.
- `workflows/`: multi-step flows owned by the department or area that contains them.
- `roles/`, `skills/` and `playbooks/`: area-level execution assets.

## Red Lines

- Enter the owning department or area before acting.
- When an area has `AGENT.md`, use it before loading roles, skills or playbooks.
- Do not invent missing workflows, roles, skills, playbooks, commands or templates.
- Do not load the whole workspace when a smaller route exists.
- Do not write secrets to tracked files.
- Ask before modifying source-of-truth files or operating assets.

## Routing

Route only to the owning department `AGENT.md`. The department agent chooses the workflow or area.
