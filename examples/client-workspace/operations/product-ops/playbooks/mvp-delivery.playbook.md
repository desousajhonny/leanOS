# MVP Delivery

## Purpose

Turn product strategy into executable MVP scope.

## When to Use

- the founder asks to shape MVP scope
- `/shape-mvp` routes into Product Ops
- strategy is ready enough to decide a first delivery scope
- the MVP boundary needs founder confirmation before roadmap-to-Epic planning

## Before Acting

- `../AGENT.md`
- `../knowledge/overview.md`
- `../knowledge/work-taxonomy.md`
- `../knowledge/mvp-decision-gate.md`
- `../knowledge/delivery-scope.md`
- `../mvp/scope.md`
- `../mvp/prd.md`
- `../mvp/user-stories.md`
- `../mvp/acceptance-criteria.md`
- `../../../strategy/product/AGENT.md`
- `../../../strategy/product/knowledge/brief.md`
- `../../../strategy/product/knowledge/problem.md`
- `../../../strategy/product/knowledge/icp.md`
- `../../../strategy/product/knowledge/value-proposition.md`
- `../../../strategy/roadmap/knowledge/backlog.md`
- `../../../strategy/roadmap/knowledge/roadmap.md`

## Inputs

- Product brief
- Problem
- ICP
- Value proposition
- Business model or assumption
- Roadmap/backlog context when available
- Existing MVP scope
- Existing PRD when available
- MVP Decision Gate

## Steps

1. Read Product Ops AGENT and choose the Product Owner role.
2. Read product strategy and existing MVP knowledge.
3. Load `../knowledge/mvp-decision-gate.md` before deciding scope.
4. Use `skills/define-mvp.skill.md` to classify candidate items by Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk.
5. Use guided conversation only for missing inputs.
6. Define the smallest coherent MVP scope.
7. Write or refine the MVP PRD draft.
8. Write or refine user stories.
9. Define acceptance criteria.
10. Confirm non-goals.
11. Identify Design, Security, Engineering or DevOps dependencies.
12. Explain the recommendation in founder-friendly language.
13. Propose file updates and wait for confirmation before writing.
14. After confirmation, offer the bridge to `roadmap-item-to-epic` only when the founder wants delivery planning.

## Guided Conversation

Use `../../../ai-standard/foundation/guided-conversation.md`.

- Ask at most two questions at a time.
- Offer short options when the founder may not know how to answer.
- Prefer questions that reduce Value Risk, Usability Risk, Feasibility Risk or Business Viability Risk.
- Stop the questionnaire when the gate decision is clear enough.

Do not ask a rigid questionnaire. Ask only what is missing.

## Gates

- Value Risk is pass, explicit gap or discovery-needed.
- Usability Risk is pass, explicit gap or design-needed.
- Feasibility Risk is pass, explicit gap or spike-needed.
- Business Viability Risk is pass, explicit gap or viability-check-needed.
- Founder confirms before files are updated.

## Security Gate

- Stop when security context is missing or risk is unclear.

## Output

- MVP scope proposal
- PRD proposal
- User stories
- Acceptance criteria
- Non-goals
- Dependencies
- Open questions

## Files to Update

- Update `../mvp/scope.md`, `../mvp/prd.md`, `../mvp/user-stories.md`, `../mvp/acceptance-criteria.md` and `../mvp/non-goals.md` only after explicit confirmation.
- Update `../knowledge/overview.md` when Product Ops summary changes.
- Update `../knowledge/delivery-scope.md` only after founder confirms the MVP delivery-scope decision.

## Stop Conditions

- Stop if product strategy is too unclear to evaluate Value Risk.
- Stop if the founder does not confirm the proposed MVP scope.
- Stop before Epics, Features, GitHub sync, branches, PRs or code.
- Stop if the request becomes implementation work before MVP scope is confirmed.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
