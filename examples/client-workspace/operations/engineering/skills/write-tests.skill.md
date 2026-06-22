# Write Tests

## Purpose

Define or update tests for changed behavior.

## Use When

- behavior changes
- bug fixes need regression coverage
- acceptance criteria require validation
- PR test gaps need explanation

## Required Context

- Testing strategy
- Acceptance criteria
- Changed behavior
- Known risks

## Inputs

- Implementation scope
- Changed behavior
- Acceptance criteria
- Existing test patterns

## Process

1. Identify behavior under test
2. Choose unit, integration, e2e or manual validation
3. Map tests to acceptance criteria
4. Add regression coverage for bugs
5. List test gaps honestly

## Checks

- Tests prove behavior, not implementation details
- Risky behavior has coverage or an explicit gap
- Manual checks are concrete

## Output

- Test plan
- Test changes
- Manual validation
- Known gaps

## Files to Update

- Update `../knowledge/implementation-notes.md` only when persistent testing decisions are useful.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
