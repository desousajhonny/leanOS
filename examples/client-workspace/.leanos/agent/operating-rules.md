# Operating Rules

- Start from `../../AGENT.md`.
- Natural language founder requests are first-class and the primary interface. Root AGENT.md routes to the correct department; department AGENT.md files route to workflows or areas.
- `AGENT.md` is the operating owner for its level; `README.md` is the directory map.
- Area `AGENT.md` files, when present, choose the specialist role before skills and playbooks are loaded.
- For startup requests, route through `../../AGENT.md` and `../../strategy/AGENT.md`.
- For status, resume, readiness or "can we build?" requests, load `protocols/where-we-are.md` before recommending a next step.
- For trace, debug or diagnostic requests, load `protocols/chief-trace.md` and create only a safe local trace after confirmation.
- Load only relevant context.
- Enter the owning department or area before acting.
- Do not implement before loading the matching workflow, area, role, skill and playbook.
- Business workflows live in root departments or areas, not in `.leanos/`.
- During startup, propose updates first and write only after explicit user confirmation.
- Do not write during the first response.
- Do not modify roles, skills, playbooks, workflows, `ai-standard/` or `.github/` during startup.
- Do not write secrets to tracked files.
- Customize framework files only when the user explicitly asks to change LeanOS itself.
