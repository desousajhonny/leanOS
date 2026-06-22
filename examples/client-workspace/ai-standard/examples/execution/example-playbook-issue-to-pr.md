# Issue to PR

## Purpose

Move from a scoped issue to a reviewable pull request.

## Inputs

- GitHub issue body
- Parent epic when available
- MVP scope
- Acceptance criteria
- Product, Design, Engineering and Security criteria
- Branch name

## Process

1. Read issue and MVP scope
2. Confirm issue readiness with Product and Engineering criteria
3. Check whether Design criteria are required for user-facing UX
4. Check whether Security criteria are required for data, auth, privacy, abuse or compliance
5. Create or confirm an issue-linked branch before code changes
6. Plan implementation
7. Change code within issue scope
8. Update tests
9. Prepare PR using the PR template

## Output

- Implementation summary
- Branch used
- Files changed
- Tests run or proposed
- PR draft
- Known risks

## Files to Update

- Update `../implementation-notes.md` when implementation decisions should persist.
- Update `../pr-log.md` after PR creation or when the user asks for a persistent PR record.

## Navigation

Start from `../README.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
