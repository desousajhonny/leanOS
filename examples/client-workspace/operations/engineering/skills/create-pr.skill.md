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
- Founder Testing Guide requirements

## Inputs

- Branch
- Linked issue
- Changed files
- Tests
- Risks
- Screenshots or UX notes when applicable
- Preview URL or local route when available

## Process

1. Load PR template
2. Summarize scope
3. List implementation notes
4. List tests and manual validation
5. Write the Founder Testing Guide in plain language
6. Include where to test, how to test and expected result
7. Flag Design/Security/Data applicability
8. List known risks and follow-up

## Checks

- PR references the issue
- Tests or gaps are explicit
- Founder Testing Guide is usable by a non-technical founder
- Description does not hide known risk

## Output

- PR title
- PR body
- Founder Testing Guide
- Test summary
- Risk notes

## Files to Update

- Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
