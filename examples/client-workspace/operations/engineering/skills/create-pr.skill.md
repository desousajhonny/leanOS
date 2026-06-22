# Create PR

## Purpose

Prepare a PR summary tied to issue scope, tests and review criteria.

## Use When

- implementation is ready for review
- PR description needs structure
- merge risk needs communication

## Required Context

- PR template
- Linked issue
- Implementation notes
- Tests run
- Known risks

## Inputs

- Branch
- Linked issue
- Changed files
- Tests
- Risks
- Screenshots or UX notes when applicable

## Process

1. Load PR template
2. Summarize scope
3. List implementation notes
4. List tests and manual validation
5. Flag Design/Security/Data applicability
6. List known risks and follow-up

## Checks

- PR references the issue
- Tests or gaps are explicit
- Description does not hide known risk

## Output

- PR title
- PR body
- Test summary
- Risk notes

## Files to Update

- Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
