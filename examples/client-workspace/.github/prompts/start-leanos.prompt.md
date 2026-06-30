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
- [.leanos/runtime/context/workspace-summary.md](../../.leanos/runtime/context/workspace-summary.md)
- [.leanos/runtime/context/current-focus.md](../../.leanos/runtime/context/current-focus.md)
- [.leanos/runtime/context/next-actions.md](../../.leanos/runtime/context/next-actions.md)
- [.leanos/runtime/index/routing-map.yaml](../../.leanos/runtime/index/routing-map.yaml)

Then route startup through `AGENT.md` -> `example-ai-product-os/strategy/AGENT.md` -> `example-ai-product-os/strategy/product/AGENT.md` -> `example-ai-product-os/strategy/product/playbooks/idea-calibration.playbook.md`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Não modifique roles, skills, playbooks, workflows, `.leanos/standard/`, `.github/` ou arquivos de Operations/Growth durante startup, a menos que o usuário peça explicitamente depois do startup.
