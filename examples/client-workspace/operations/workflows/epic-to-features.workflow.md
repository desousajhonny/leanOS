# Epic To Features Workflow

## Purpose

Break a confirmed local LeanOS Epic into implementation-ready Feature files with internal Tasks and Delivery Readiness Matrix criteria before Engineering starts work.

## Required Areas

- product-ops
- engineering

## Availability

All required areas are active in this department.


## Sequence

1. Confirm the local Epic folder exists under `operations/product-ops/epics/` and has outcome, scope, non-goals, ownership and Epic Readiness Matrix
2. Load Product Ops and choose Product Owner
3. Load `operations/product-ops/playbooks/epic-to-features.playbook.md`
4. Use `shape-epic.skill.md` to verify the Epic is ready for feature breakdown
5. Use `write-feature-criteria.skill.md` and the local Product Feature template to draft Feature files inside the Epic folder
6. Route Design only when UX, UI, flow, copy, accessibility, screens, states or interaction are affected
7. When Design is applicable, identify component reuse, component adaptation or the need for a future component spec task
8. Do not write full component specs in this workflow; add a Design task for component readiness when a spec is needed
9. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved
10. Route DevOps only when environments, CI/CD, deploy, observability, config, GitHub sync or release readiness are affected
11. Ask Engineering to validate implementation boundaries, dependencies, tests and feature size
12. Ask for confirmation before writing Feature files, syncing GitHub or starting implementation
13. Stop before branch, code, PR or remote write

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
As features foram definidas.
Quer que eu verifique se alguma delas ja esta pronta para desenvolvimento?
```

Later-session triggers:

- "vamos implementar essa feature"
- "essa feature esta pronta para desenvolver?"
- "podemos iniciar o desenvolvimento?"
- "comece pela feature"
- "implemente a feature"

Next route:

`feature-to-delivery-cycle`

Rules:

- Do not automatically start implementation after feature shaping.
- If the founder says yes, run the ready-to-develop gate before routing to Engineering.
- If readiness is missing, explain the gap in founder-friendly language and recommend the next LeanOS route.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `feature-to-delivery-cycle` only after readiness is confirmed.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
