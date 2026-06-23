# Delivery Scope To Epic Workflow

## Purpose

Turn confirmed delivery scope into GitHub-ready epic drafts without creating sub-issues, branches or code.

## Required Areas

- product-ops

## Availability

All required areas are active in this department.


## Sequence

1. Confirm delivery scope exists and has scope_type, milestone and release_goal
2. Load Product Ops and choose Product Owner
3. Read delivery scope, PRD, acceptance criteria and ready-to-develop gate
4. Use GitHub templates to draft one or more epics with outcome, non-goals, risks and readiness notes
5. Route DevOps only when GitHub Project configuration, labels, milestones or sync state need validation
6. Route Engineering only when epic boundaries need technical feasibility review
7. Ask for confirmation before any GitHub API write or project sync
8. Stop before sub-issues, branches, code or PR work

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
O epic draft esta pronto.
Quer que eu quebre esse epic em sub-issues usando a Delivery Readiness Matrix?
```

Later-session triggers:

- "quebre esse epic em sub-issues"
- "crie as sub-issues desse epic"
- "vamos fatiar esse epic"
- "prepara as issues de implementacao"
- "quebre o epic #123"

Next route:

`epic-to-subissues`

Rules:

- Do not automatically start sub-issue creation without founder confirmation.
- If the founder says yes, declare the new route and load Product Ops epic-to-subissues assets before drafting sub-issues.
- If the founder says no, explain the epic draft outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `epic-to-subissues`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
