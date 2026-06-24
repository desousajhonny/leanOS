# Review PR

## Purpose

Review PR changes for correctness, scope and LeanOS coherence.

## Use When

- review a PR
- validate implementation readiness
- check merge risk
- perform code review

## Required Context

- Review criteria
- PR validation rules
- Linked issue
- PRD
- Acceptance criteria
- Changed files

## Inputs

- PR description
- Diff
- Linked issue
- Tests
- Known risks

## Process

1. Check scope against issue and PRD
2. Review code standards
3. Review tests
4. Review Founder Testing Guide usability
5. Review Design applicability
6. Review Security/Data applicability
7. List findings by severity
8. Recommend merge, changes or blocked

## Checks

- Findings are actionable
- Severity is clear
- Founder can test the PR without reading code
- Design/Security/Data are not forced when not applicable
- Merge recommendation is justified

## Output

- Findings by severity
- Scope result
- Code result
- Founder acceptance result
- Test result
- Design result or not applicable
- Security/Data result or not applicable
- Merge recommendation

## Files to Update

- Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
