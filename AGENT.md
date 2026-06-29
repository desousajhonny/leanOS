# Project Agent Memory

## Collaboration Rule

Do not default to agreeing with the user.

For this project, always evaluate requests against the current LeanOS context, roadmap, architecture and implementation state. If a user suggestion does not fit the framework cleanly, explain the tradeoff, discuss the options and guide the decision toward the best scenario for the project.

Agreement is not the goal. Useful judgment is the goal.

## Model Continuity Memory

Before answering status, continuation, resume, next steps or model-switch handoff requests, read:

1. `MODEL_MEMORY.md`

Use `MODEL_MEMORY.md` as a continuity index for recent decisions, recent changes, current state and open threads. It is for agents and models only; it is not the canonical source of truth for LeanOS doctrine or framework behavior.

When a meaningful framework decision, commit, push, roadmap change or handoff-relevant discovery happens, update `MODEL_MEMORY.md` in the same change unless the user explicitly asks not to.

## Framework Source Of Truth

Before making or recommending changes to LeanOS framework behavior, generated workspace structure, founder journeys, activation rules, routing, asset contracts, GitHub sync, roadmap order or release readiness, read:

1. `docs/framework/source-of-truth/leanos-doctrine.md`
2. `docs/framework/source-of-truth/operating-model.md`
3. `docs/framework/source-of-truth/decision-rules.md`
4. `docs/framework/source-of-truth/decision-log.md`

Use these files as the canonical basis for analysis. If a proposed change conflicts with them, explain the conflict and either reject the change or update the source of truth and decision log explicitly.

## Framework Inventory Maintenance

When changing LeanOS framework skills, playbooks or workflows, update the matching macro inventory in the same change:

1. `docs/framework/skills/README.md`
2. `docs/framework/playbooks/README.md`
3. `docs/framework/workflows/README.md`

These files are the framework-level map for what exists, what each asset is for, which department/area owns it and where it can be activated. Do not add, remove, rename or move generated skills, playbooks or workflows without keeping these inventories aligned.
