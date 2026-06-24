# PR Validation

## Purpose

Validate implementation before merge.

## Inputs

- PR description
- Linked issue
- Parent epic when available
- MVP scope
- PRD
- Acceptance criteria
- Changed files
- Tests or validation evidence
- Founder Testing Guide
- Review criteria

## Process

1. Use this as the final validation step of `engineering-delivery.playbook.md`; do not recommend merge before this review is complete
2. Read Engineering AGENT and choose PR Reviewer or Test Engineer as needed
3. Read PR context
4. Load `.github/leanos/pr-validation-rules.md` and `knowledge/review-criteria.md`
5. Use `skills/review-pr.skill.md` to check scope against issue, PRD and MVP
6. Use `skills/follow-code-standards.skill.md` to check code quality
7. Use `skills/review-data-change.skill.md` when data/API/persistence is involved
8. Validate Product criteria and acceptance criteria
9. Review the Founder Testing Guide and confirm a non-technical founder can test the PR
10. Review Design criteria only when UX changed
11. Review Security criteria only when data, auth, privacy, abuse or compliance is involved
12. Review tests and manual validation
13. List findings by severity
14. Recommend merge, changes or blocked-by-context

## Output

- Findings by severity
- Product alignment
- Code quality result
- Founder acceptance result
- Design review result or not applicable
- Security/Data review result or not applicable
- Test confidence
- Merge recommendation

## Files to Update

- Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
