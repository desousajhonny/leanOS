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

1. Read Engineering AGENT and choose the Senior Developer role
2. Read issue, PRD, MVP scope and acceptance criteria
3. Confirm issue readiness with Product and Engineering criteria
4. Check whether Design criteria are required for user-facing UX
5. Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance
6. Create or confirm an issue-linked branch before code changes
7. Use `skills/plan-implementation.skill.md` to plan implementation
8. Use `skills/follow-code-standards.skill.md` while changing code
9. Use `skills/review-data-change.skill.md` when data/API/persistence is involved
10. Use `skills/write-tests.skill.md` to update tests or explain gaps
11. Use `skills/create-pr.skill.md` to prepare PR using the PR template

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
