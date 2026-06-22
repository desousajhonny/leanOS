# Review Data Change

## Purpose

Review database, API, persistence, migration and data-sensitive changes before implementation or PR approval.

## Use When

- data model, migration, API contract, persistence, auth, permissions, privacy or sensitive data is involved

## Required Context

- Data guidelines
- Security context when sensitive data is involved
- Acceptance criteria
- Current schema or API patterns

## Inputs

- Proposed data change
- Data sensitivity
- Migration needs
- Rollback expectation
- Compatibility requirements

## Process

1. Classify data sensitivity
2. Identify schema or API impact
3. Check validation and authorization
4. Check migration and rollback implications
5. Check index/performance needs
6. Route to Security when privacy/auth/compliance risk exists

## Checks

- No destructive change without confirmation
- No sensitive data exposure
- Backward compatibility is considered
- Rollback path is visible

## Output

- Data-change review
- Risks
- Migration notes
- Security routing result
- Rollback notes

## Files to Update

- Update `../knowledge/data-guidelines.md` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
