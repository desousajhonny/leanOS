---
name: start-leanos
description: Start LeanOS Chief for this workspace.
agent: 'LeanOS Chief'
---
# Start LeanOS

Treat this prompt as the safe workspace bootstrap for LeanOS Chief.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/commands/start-leanos.md](../../.leanos/commands/start-leanos.md)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then follow `.leanos/commands/start-leanos.md`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/`, `.github/` or Operations/Growth files during init unless the user explicitly asks after init.
