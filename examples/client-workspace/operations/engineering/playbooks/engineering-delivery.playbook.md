# Engineering Delivery

## Purpose

Orchestrate the internal Engineering path from a ready Feature to branch, implementation, tests, PR and PR validation.

## When to Use

- a Feature has passed ready-to-develop
- implementation should begin
- Engineering needs the safe execution order
- the founder asks to implement a Feature

## Before Acting

- `../AGENT.md`
- `../../product-ops/knowledge/ready-to-develop.md`
- `../../product-ops/epics/README.md`
- `../knowledge/implementation-rules.md`
- `../knowledge/code-standards.md`
- `../knowledge/component-guidelines.md`
- `../knowledge/data-guidelines.md`
- `../knowledge/testing-strategy.md`
- `../../../.github/leanos/branch-rules.md`
- `../../../.github/leanos/pr-validation-rules.md`

## Inputs

- Confirmed local Feature or mapped GitHub Feature issue
- Ready-to-develop result
- Parent Epic
- Acceptance criteria
- Design component spec when applicable
- Security and DevOps readiness when applicable
- Branch rules
- PR validation rules

## Steps

1. Confirm the request is a ready Feature, not a loose idea, roadmap item or unsplit Epic
2. Confirm Product Ops readiness from `../../product-ops/knowledge/ready-to-develop.md`
3. Use `playbooks/branch-from-issue.playbook.md` before editing code
4. Use `skills/plan-implementation.skill.md` to summarize the Feature, likely files, risks and tests
5. If a new reusable component is required, confirm the approved Design component spec before code and run `playbooks/component-implementation.playbook.md` first
6. Use `skills/follow-code-standards.skill.md` during implementation to preserve modularity, local patterns and no-hardcoding rules
7. Use `skills/review-data-change.skill.md` when data, API, persistence, auth, permissions or privacy are involved
8. Use `skills/write-tests.skill.md` to add or update tests, or explain the test gap clearly
9. Use `playbooks/issue-to-pr.playbook.md` to prepare PR scope, test notes, risks and screenshots or UX notes when applicable
10. Use `playbooks/pr-validation.playbook.md` before recommending merge readiness

## Security Gate

- Stop before implementation when Security triggers apply and no Security readiness exists.
- Stop before data migration, destructive data changes or permission changes without explicit confirmation and rollback notes.
- Do not commit secrets, tokens, credentials or sensitive customer data.

## Output

- Branch name and branch status
- Implementation plan
- Files changed
- Component implementation summary when applicable
- Tests run or test-gap explanation
- PR draft summary
- PR validation result
- Remaining risks and next step

## Files to Update

- Update `../knowledge/implementation-notes.md` when implementation decisions should persist.
- Update `../knowledge/pr-log.md` after PR creation or when the user asks for persistent PR records.

## Stop Conditions

- Feature readiness is missing or blocked.
- No issue-linked branch can be created or confirmed.
- A required Design component spec is missing.
- Security or DevOps readiness is required and missing.
- The implementation would exceed the confirmed Feature scope.
- Tests cannot be run and no useful manual validation can be described.
- PR validation finds blocking risk.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
