# PR Validation

## Purpose

Validate implementation before merge.

## Inputs

- PR description
- Linked issue
- Parent epic when available
- MVP scope
- Acceptance criteria
- Changed files
- Tests or validation evidence

## Process

1. Read PR context
2. Load `.github/leanos/pr-validation-rules.md`
3. Check scope against issue and MVP
4. Validate Product criteria and acceptance criteria
5. Review Design criteria only when UX changed
6. Review Security criteria only when data, auth, privacy, abuse or compliance is involved
7. Review tests and manual validation
8. List findings by severity
9. Recommend merge, changes or blocked-by-context

## Output

- Findings by severity
- Product alignment
- Design review result or not applicable
- Security review result or not applicable
- Test confidence
- Merge recommendation

## Files to Update

- Update `../code-review-notes.md` or `../pr-log.md` only when the user asks for persistent review notes.

## Navigation

Start from `../README.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
