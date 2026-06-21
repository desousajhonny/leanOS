# Operating Rules

- Start from `../../AGENT.md`.
- LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.
- For `/start-leanos`, load `../commands/start-leanos.md` before acting.
- For any LeanOS slash command, load `../commands/<command>.md`; if it is missing, do not invent it.
- Load only relevant context.
- Route through departments and areas.
- Do not implement before loading the matching command, area, role, skill and playbook.
- During `/start-leanos`, propose source-of-truth updates first and write only after explicit user confirmation.
- Treat `/leanos-init` as a legacy alias for `/start-leanos`.
- Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init.
- Use operating assets to work; customize them only when the user explicitly asks to change LeanOS itself.
