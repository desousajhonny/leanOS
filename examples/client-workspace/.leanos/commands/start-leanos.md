# /start-leanos

## Purpose

Initialize LeanOS safely by loading the workspace map, summarizing active context and proposing Strategy-first source-of-truth updates.

## Load First

Read:

- `../../AGENT.md`
- `../../leanos.yaml`
- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../context/active-workflow.md`
- `../index/routing-map.yaml`

## What To Do

1. Summarize the active departments, active areas, compatible workflows and recommended next action.
2. Identify Strategy source-of-truth files that could receive the user's company/product context.
3. Propose a concise update plan before editing any file.
4. Ask for explicit confirmation before writing changes.
5. If the user does not confirm, return the update plan and next recommended command only.

## Allowed Updates

Only after explicit confirmation, `/start-leanos` may update:

- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../../strategy/company/profile.md`
- `../../strategy/company/mission.md`
- `../../strategy/company/vision.md`
- `../../strategy/company/principles.md`
- `../../strategy/company/operating-model.md`
- `../../strategy/product/brief.md`
- `../../strategy/product/problem.md`
- `../../strategy/product/icp.md`
- `../../strategy/product/jobs-to-be-done.md`
- `../../strategy/product/value-proposition.md`
- `../../strategy/product/positioning.md`
- `../../strategy/product/business-model-canvas.md`
- `../../strategy/validation/assumptions.md`
- `../../strategy/validation/riskiest-assumptions.md`
- `../../strategy/validation/experiments.md`
- `../../strategy/validation/success-metrics.md`
- `../../strategy/validation/learning-log.md`
- `../../strategy/roadmap/roadmap.md`
- `../../strategy/roadmap/milestones.md`
- `../../strategy/roadmap/current-cycle.md`
- `../../strategy/roadmap/backlog.md`

Strategy Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before strategy is coherent.

## Forbidden Updates

During `/start-leanos`, do not modify:

- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `../../ai-standard/`
- `../commands/`
- `../../.github/`
- product code or files outside the LeanOS workspace
- Operations or Growth area files unless the user explicitly asks after init

Roles, skills, playbooks and workflows are operating assets. Use them to work; do not enrich them with company/product context during init.

## Confirmation Rule

Use propose-first mode.

Never write files during init until the user explicitly confirms the proposed source-of-truth updates.

If confirmation is ambiguous, do not write. Ask a focused follow-up question.

## Output

Return:

- Loaded context
- Active departments and areas
- Compatible workflows
- Proposed Strategy source-of-truth updates
- Files that would change after confirmation
- Next recommended command

## Active Areas

- strategy.company
- strategy.product
- strategy.roadmap
- strategy.validation
- operations.core
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
