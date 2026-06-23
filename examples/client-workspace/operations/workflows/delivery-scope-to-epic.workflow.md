# Delivery Scope To Epic Workflow

## Purpose

Turn confirmed delivery scope into local LeanOS epic drafts without creating features, branches or code. GitHub sync is optional after confirmation.

## Required Areas

- product-ops

## Availability

All required areas are active in this department.


## Sequence

1. Confirm delivery scope exists and has scope_type, milestone and release_goal
2. Load Product Ops and choose Product Owner
3. Read work taxonomy, delivery scope, PRD, acceptance criteria and ready-to-develop gate
4. Use the local Product Epic template to draft one or more epics with outcome, decision ownership, scope, non-goals, risks and Epic Readiness Matrix
5. Route DevOps only when GitHub Project configuration, labels, milestones or sync state need validation
6. Route Engineering only when epic boundaries need technical feasibility review
7. Ask for confirmation before any durable write, GitHub API write or project sync
8. Stop before features, branches, code or PR work

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
O epic esta pronto.
Quer que eu quebre esse epic em features usando a Delivery Readiness Matrix?
```

Later-session triggers:

- "quebre esse epic em features"
- "crie as features desse epic"
- "vamos fatiar esse epic"
- "prepara as features de implementacao"
- "quebre o epic #123"

Next route:

`epic-to-features`

Rules:

- Do not automatically start feature creation without founder confirmation.
- If the founder says yes, declare the new route and load Product Ops epic-to-features assets before drafting features.
- If the founder says no, explain the epic draft outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `epic-to-features`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
