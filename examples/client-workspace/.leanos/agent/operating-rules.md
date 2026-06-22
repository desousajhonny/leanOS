# Operating Rules

- Start from `../../AGENT.md`.
- LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.
- Natural language founder requests are first-class. Root AGENT.md routes to the correct department; department AGENT.md files route to workflows or areas.
- `AGENT.md` is the operating owner for its level; `README.md` is the directory map.
- Area `AGENT.md` files, when present, choose the specialist role before skills and playbooks are loaded.
- For `/start-leanos`, load `../commands/start-leanos.md` before acting.
- For any LeanOS slash command, load `../commands/<command>.md`; if it is missing, do not invent it.
- Load only relevant context.
- Enter the owning department or area before acting.
- Do not implement before loading the matching workflow or command, area, role, skill and playbook.
- Business workflows live in root departments or areas, not in `.leanos/`.
- During `/start-leanos`, propose updates first and write only after explicit user confirmation.
- Treat `/leanos-init` as a legacy alias for `/start-leanos`.
- Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init.
- Do not write secrets to tracked files.
- Customize framework files only when the user explicitly asks to change LeanOS itself.
