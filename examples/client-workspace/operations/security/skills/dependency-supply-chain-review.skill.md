# Dependency Supply Chain Review

## Purpose

Review dependency changes for hallucinated packages, vulnerable versions and risky supply-chain behavior.

## Use When

- dependencies change
- AI suggests a new package
- lockfile changes unexpectedly
- vulnerability alert exists

## Required Context

- Secure coding knowledge
- Package manager files
- Dependency diff
- Known vulnerability context

## Inputs

- Package name/version
- Reason for dependency
- Alternatives
- Lockfile diff
- Vulnerability signal

## Process

1. Confirm package exists and is maintained
2. Check necessity
3. Check known CVEs when available
4. Review lockfile changes
5. Recommend accept/replace/remove

## Checks

- No hallucinated dependency
- No critical vulnerable dependency without mitigation
- No unnecessary broad package

## Output

- Dependency decision
- Risk level
- Required mitigation
- Follow-up

## Files to Update

- Update `../knowledge/secure-coding.md` when a durable dependency rule is discovered.

## Red Lines

- Do not approve hallucinated dependencies.
- Do not approve critical vulnerable dependency without mitigation or explicit decision.
