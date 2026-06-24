# Shape Epic

## Purpose

Turn a roadmap epic into an implementation-ready scope boundary before features are created.

## Use When

- a roadmap item needs to become a local LeanOS Epic
- an existing epic needs enough clarity to be broken down
- the team needs to confirm outcome, scope and non-goals before features or remote sync

## Required Context

- ../AGENT.md
- ../knowledge/overview.md
- ../knowledge/work-taxonomy.md
- ../knowledge/issue-readiness.md
- ../knowledge/ready-to-develop.md
- ../mvp/prd.md
- ../mvp/scope.md
- ../epics/README.md
- ../../../strategy/product/knowledge/brief.md
- ../../../strategy/roadmap/knowledge/roadmap.md
- ../../../ai-standard/templates/product/epic-template.md
- ../../../ai-standard/templates/github/delivery-readiness-matrix-template.md

## Inputs

- Parent epic or roadmap item
- Product outcome
- MVP scope
- Non-goals
- Milestone or current cycle
- Known dependencies

## Process

1. Restate the epic outcome in one sentence.
2. Confirm the user, problem and business value.
3. Identify scope boundaries and non-goals.
4. Map the epic to delivery scope, PRD and roadmap milestone.
5. Use the Epic Readiness Matrix to decide which specialists must participate.
6. List likely feature slices without creating them yet.
7. Mark missing context explicitly instead of inventing it.

## Checks

- Outcome is clear.
- Scope and non-goals are explicit.
- The epic can be split without losing product intent.
- Missing Product, Design, Security, DevOps or Engineering input is called out.

## Output

- Epic readiness summary
- Decision ownership
- Scope boundary
- Non-goals
- Epic readiness matrix
- Likely feature groups
- Missing context
- Recommendation to proceed, refine or block

## Files to Update

- Update `../knowledge/issue-readiness.md` only after explicit confirmation.
- Do not update GitHub directly from the model.

## Red Lines

- Do not split an epic that lacks outcome or scope.
- Do not invent acceptance criteria.
- Do not bypass Design, Security or DevOps when their criteria are applicable.
