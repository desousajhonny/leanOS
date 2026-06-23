# Define Delivery Scope

## Purpose

Decide whether a roadmap item becomes a concrete delivery scope and capture scope_type, milestone and release_goal.

## Use When

- a roadmap item may enter the next delivery
- the founder asks whether something enters MVP, release, beta or experiment scope
- a roadmap item needs Product Ops shaping before epic creation

## Required Context

- ../knowledge/delivery-scope.md
- ../../../strategy/roadmap/knowledge/roadmap.md
- ../../../strategy/roadmap/knowledge/backlog.md
- ../../../strategy/product/knowledge/brief.md

## Inputs

- Roadmap item
- Product outcome
- User/business value
- Evidence level
- Scope type
- Milestone
- Release goal
- Known constraints

## Process

1. Restate the roadmap item and outcome.
2. Confirm whether the item is ready for delivery scope or should remain roadmap/backlog.
3. Choose scope_type: MVP, Release, Experiment, Beta or Internal.
4. Define milestone and release_goal.
5. Identify non-goals, dependencies and risks.
6. Check Design, Security and DevOps applicability.
7. Propose file updates and wait for confirmation before writing.

## Checks

- The roadmap item is clear enough to scope.
- The scope_type is explicit.
- Milestone and release_goal are not invented silently.
- Non-goals are visible.
- The item is not sent to GitHub before delivery scope is confirmed.

## Output

- Delivery scope recommendation
- scope_type
- milestone
- release_goal
- Non-goals
- Dependencies
- Next workflow recommendation

## Files to Update

- Update `../knowledge/delivery-scope.md` only after explicit confirmation.
- Update `../mvp/scope.md` only when `scope_type` is MVP and the founder confirms.
- Do not create GitHub issues from this skill.

## Red Lines

- Do not treat roadmap priority as delivery commitment.
- Do not mark an item as MVP just because it is important.
- Do not create epics or features in this step.
