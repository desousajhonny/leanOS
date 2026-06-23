# Roadmap Item To Delivery Scope Workflow

## Purpose

Decide whether a roadmap item becomes a concrete delivery scope before epic, issue or implementation work.

## Required Areas

- product-ops

## Availability

All required areas are active in this department.


## Sequence

1. Confirm the roadmap item exists and has enough product context
2. Load Product Ops and choose Product Owner
3. Use delivery scope planning to decide scope_type, milestone and release_goal
4. Route Design only when user-facing UX is affected
5. Route Security only when data, auth, privacy, abuse, API, compliance or AI-generated-code risk is involved
6. Route DevOps only when environments, deploy, GitHub project, observability or release readiness are affected
7. Ask for confirmation before updating delivery scope or MVP files
8. Stop before GitHub epics, sub-issues, branches or code

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Esse delivery scope esta definido.
Quer que eu prepare isso para virar epicos no GitHub Projects?
```

Later-session triggers:

- "vamos criar o epico disso"
- "manda esse scope para o GitHub"
- "cria os epicos desse delivery item"
- "vamos quebrar isso em epicos"
- "vamos atualizar o GitHub Projects com esse delivery item"

Next route:

`delivery-scope-to-epic`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading GitHub, DevOps or epic-planning files.
- If the founder says no, explain the delivery-scope outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `delivery-scope-to-epic`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
