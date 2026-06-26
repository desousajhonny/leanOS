# Prepare PR

## Purpose

Prepare a reviewable pull request from a confirmed Feature implementation.

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
3. Read Feature or mapped GitHub issue, PRD, MVP scope and acceptance criteria
4. Confirm Feature readiness with Product and Engineering criteria
5. Check whether Design criteria are required for user-facing UX
6. Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance
7. Create or confirm a Feature-linked branch before code changes
8. Use `skills/plan-implementation/SKILL.md` to plan implementation
9. Run `playbooks/component-implementation.playbook.md` before screen or Feature work when a new reusable component is required
10. Use `skills/follow-code-standards/SKILL.md` while changing code
11. Use `skills/review-data-change/SKILL.md` when data/API/persistence is involved
12. Use `skills/write-tests/SKILL.md` to update tests or explain gaps
13. Use `skills/create-pr/SKILL.md` to prepare PR using the PR template
14. Fill the `Founder Testing Guide` with plain-language steps, where to test, expected result, out-of-scope notes and known limits
15. If there is no preview URL, provide the local route, command or manual fallback the founder can realistically use

## Output

- Implementation summary
- Branch used
- Files changed
- Tests run or proposed
- Founder Testing Guide
- PR draft
- Known risks

## Files to Update

- Update `../knowledge/implementation-notes.md` when implementation decisions should persist.
- Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
