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
- Review criteria

## Process

1. Read Engineering AGENT and choose PR Reviewer or Test Engineer as needed
2. Read PR context
3. Load `.github/leanos/pr-validation-rules.md` and `knowledge/review-criteria.md`
4. Use `skills/review-pr.skill.md` to check scope against issue, PRD and MVP
5. Use `skills/follow-code-standards.skill.md` to check code quality
6. Use `skills/review-data-change.skill.md` when data/API/persistence is involved
7. Validate Product criteria and acceptance criteria
8. Review Design criteria only when UX changed
9. Review Security criteria only when data, auth, privacy, abuse or compliance is involved
10. Review tests and manual validation
11. List findings by severity
12. Recommend merge, changes or blocked-by-context

## Output

- Findings by severity
- Product alignment
- Code quality result
- Design review result or not applicable
- Security/Data review result or not applicable
- Test confidence
- Merge recommendation

## Files to Update

- Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
