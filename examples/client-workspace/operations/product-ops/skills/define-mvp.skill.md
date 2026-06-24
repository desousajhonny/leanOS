# Define MVP

## Purpose

Apply the MVP Decision Gate to turn strategy into the smallest coherent first delivery scope.

## Use When

- the founder asks what enters the MVP
- the first product version needs scope
- `/shape-mvp` routes into Product Ops
- strategy exists but the MVP boundary is unclear

## Required Context

- ../AGENT.md
- ../knowledge/overview.md
- ../knowledge/work-taxonomy.md
- ../knowledge/mvp-decision-gate.md
- ../knowledge/delivery-scope.md
- ../mvp/scope.md
- ../mvp/prd.md
- ../mvp/user-stories.md
- ../mvp/acceptance-criteria.md
- ../../../strategy/product/knowledge/brief.md
- ../../../strategy/product/knowledge/problem.md
- ../../../strategy/product/knowledge/icp.md
- ../../../strategy/product/knowledge/value-proposition.md
- ../../../strategy/product/knowledge/business-model.md
- ../../../strategy/roadmap/knowledge/backlog.md
- ../../../strategy/roadmap/knowledge/roadmap.md

## Inputs

- Founder intent
- Product brief
- Problem
- ICP
- Value proposition
- Business model or business assumption
- Roadmap/backlog context when available
- Existing MVP scope and PRD

## Process

1. Restate the intended product outcome.
2. Identify the smallest useful version that can validate or deliver the core value.
3. Apply Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk from `mvp-decision-gate.md`.
4. Classify items as in MVP now, later/backlog, needs discovery, needs specialist check or not now.
5. Name Design, Security, Engineering or DevOps risks only when applicable.
6. Draft founder-friendly MVP scope before mentioning file updates.
7. Ask for confirmation before writing MVP files.

## Checks

- Value Risk is explicit.
- Usability Risk is explicit.
- Feasibility Risk is explicit.
- Business Viability Risk is explicit.
- The MVP is small enough to explain and later break into Epics/Features.
- Non-goals are visible.
- The skill does not create Epics, Features, GitHub issues, branches, PRs or code.

## Output

- MVP decision summary
- In MVP now
- Later/backlog
- Needs discovery
- Needs specialist check
- Not now
- Non-goals
- Risks
- Proposed file updates
- Next safe LeanOS route

## Files to Update

- Update `../mvp/scope.md` only after confirmation.
- Update `../mvp/prd.md` only after confirmation.
- Update `../mvp/user-stories.md` only after confirmation.
- Update `../mvp/acceptance-criteria.md` only after confirmation.
- Update `../mvp/non-goals.md` only after confirmation.
- Update `../knowledge/delivery-scope.md` only when MVP scope creates delivery-scope context.

## Red Lines

- Do not mark an item as MVP because it is interesting or urgent.
- Do not create Epics, Features, GitHub issues, branches, PRs or source code.
- Do not bypass `mvp-decision-gate.md`.
- Do not write before founder confirmation.
