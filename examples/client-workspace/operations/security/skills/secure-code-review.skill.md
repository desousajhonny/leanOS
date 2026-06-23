# Secure Code Review

## Purpose

Review code for common MVP security failures and unsafe implementation choices.

## Use When

- PR review
- auth/data/API code changed
- generated code changed sensitive paths
- security-sensitive implementation

## Required Context

- Secure coding knowledge
- Engineering review criteria
- PR diff or implementation plan
- Security baseline

## Inputs

- Changed code
- Linked issue
- Tests
- Auth/data/API impact
- Dependencies

## Process

1. Check auth and authorization
2. Check input validation and output leakage
3. Check dangerous shell/file operations
4. Check dependency and test changes
5. Check scope drift

## Checks

- No hardcoded secret
- No unsafe command
- No fabricated/deleted tests
- No auth/infra change without review

## Output

- Security findings by severity
- Required fixes
- Approval/block decision
- Open questions

## Files to Update

- Update `../knowledge/secure-coding.md` only when a durable rule is discovered.

## Red Lines

- Do not approve security-sensitive code without review evidence.
- Do not allow tests to be deleted or fabricated to pass CI.
