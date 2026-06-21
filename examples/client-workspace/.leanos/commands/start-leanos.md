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
2. Check whether there is enough founder context to update Strategy source-of-truth files.
3. If context is missing, run the Required Founder Interview before proposing file changes.
4. Identify Strategy source-of-truth files that could receive the user's company/product context.
5. Propose a concise update plan before editing any file.
6. Ask for explicit confirmation before writing changes.
7. If the user does not confirm, return the update plan and next recommended command only.

## Required Founder Interview

Ask only what is missing. If the answer is already clear from the loaded context, do not ask it again.

Required questions:

1. What company or startup are we operating?
2. What product, service or idea are we building?
3. Who is the primary user or customer?
4. What painful problem are we solving for that user?
5. What value promise do we believe is compelling?
6. What is the current stage of the company or product?
7. What is the riskiest assumption right now?
8. What would count as useful validation or learning in the next cycle?
9. What should we avoid building or deciding too early?

## Optional Founder Interview

Ask these only when useful for the current stage:

- What alternatives or competitors does the user compare against?
- What business model or pricing assumption is being considered?
- What constraints matter now: time, budget, team, technical risk or compliance?
- How should humans and AI agents collaborate in this workspace?
- What existing codebase, product, audience or learning should be respected?
- What decision principle should guide tradeoffs when context is incomplete?

## Response Mapping

Map founder responses to source-of-truth files only when the matching area is active:

- Company identity, mission, vision, principles and operating model -> `strategy/company/`
- Product description, problem, ICP, value proposition, positioning and business model -> `strategy/product/`
- Assumptions, riskiest assumptions, experiments, success metrics and learning -> `strategy/validation/`
- Roadmap, milestones, current cycle and backlog -> `strategy/roadmap/`

If a Strategy area is not active, do not propose writes to its missing path. Mention that the area is inactive and ask before activating or creating it.

Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before company, product and validation context are coherent.

## Fact and Uncertainty Rules

- Treat user-provided facts as facts.
- Treat model inferences as assumptions.
- Do not turn assumptions into source-of-truth facts.
- Put unknowns into `## Open Questions` or the relevant assumptions file.
- Keep weak or unvalidated claims visibly tentative.
- Prefer `TBD` over invented specificity.

## Validation Evidence Rules

- Assumption: something believed but not yet proven.
- Evidence: something observed from users, behavior, data or shipped product.
- Insight: interpretation of evidence.
- Decision: a committed change in strategy, MVP, roadmap or backlog.
- Roadmap impact: what changes because of the decision.
- Do not record validated learning without evidence.

## Write Protocol

Before writing, show a proposed change plan with:

- Files to update
- What each file will receive
- Which statements are facts
- Which statements are assumptions
- Which open questions will remain

Then ask for explicit confirmation.

Valid confirmation examples:

- "Yes, update these files."
- "Apply the proposal."
- "Write the proposed changes."

If the user says anything ambiguous, do not write. Ask a focused follow-up question.

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
- Workspace summary
- Active departments and areas
- Compatible workflows
- Missing founder context
- Gaps detected
- Proposed Strategy source-of-truth updates
- Files that would change after confirmation
- Open questions
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
