# Delivery Scope Planning

## Purpose

Turn a roadmap item into a confirmed delivery scope without creating epics, issues or code.

## Inputs

- Roadmap item
- Product brief
- Backlog and roadmap status
- Existing delivery scope
- MVP scope when scope_type is MVP
- Known constraints

## Process

1. Read Product Ops AGENT and choose the Product Owner role.
2. Read roadmap item, product brief and current delivery scope.
3. Use `skills/define-delivery-scope.skill.md` to decide whether the item becomes delivery scope.
4. Set `scope_type`, `milestone` and `release_goal` only after the founder confirms.
5. Define non-goals, dependencies and applicability for Design, Security and DevOps.
6. If `scope_type` is MVP, map the decision to MVP files.
7. Propose file updates and wait for confirmation before writing.

## Output

- Delivery scope proposal
- scope_type
- milestone
- release_goal
- Non-goals
- Design/Security/DevOps applicability
- Recommended next workflow

## Files to Update

- Update `../knowledge/delivery-scope.md` only after explicit confirmation.
- Update `../mvp/scope.md`, `../mvp/prd.md`, `../mvp/non-goals.md` and `../mvp/acceptance-criteria.md` only when `scope_type` is MVP and the founder confirms.
- Do not update GitHub from this playbook.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
