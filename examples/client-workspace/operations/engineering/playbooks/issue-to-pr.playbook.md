# Issue to PR

## Purpose

Move from a scoped issue to a reviewable pull request.

## Inputs

- GitHub issue body
- Parent epic when available
- MVP scope
- PRD
- Acceptance criteria
- Product, Design, Engineering and Security criteria
- Branch name
- Engineering knowledge

## Process

1. Use this as the PR preparation step of `engineering-delivery.playbook.md`; do not use it before implementation and test status are clear
2. Read Engineering AGENT and choose the Senior Developer role
3. Read issue, PRD, MVP scope and acceptance criteria
4. Confirm issue readiness with Product and Engineering criteria
5. Check whether Design criteria are required for user-facing UX
6. Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance
7. Create or confirm an issue-linked branch before code changes
8. Use `skills/plan-implementation.skill.md` to plan implementation
9. Run `playbooks/component-implementation.playbook.md` before screen or Feature work when a new reusable component is required
10. Use `skills/follow-code-standards.skill.md` while changing code
11. Use `skills/review-data-change.skill.md` when data/API/persistence is involved
12. Use `skills/write-tests.skill.md` to update tests or explain gaps
13. Use `skills/create-pr.skill.md` to prepare PR using the PR template

## Output

- Implementation summary
- Branch used
- Files changed
- Tests run or proposed
- PR draft
- Known risks

## Files to Update

- Update `../knowledge/implementation-notes.md` when implementation decisions should persist.
- Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
