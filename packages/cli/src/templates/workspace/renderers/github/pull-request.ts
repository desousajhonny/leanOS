export function pullRequestTemplate(): string {
  return `# Pull Request

## Summary

Describe what changed and why.

## Linked Issue

Closes #

## Parent Epic

Epic #

## LeanOS Context

- Active Department:
- Active Area:
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Product / Delivery Scope Alignment

- Strategy alignment:
- Delivery scope alignment:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Security Notes

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Build or test command run
- [ ] Manual validation completed

## Founder Testing Guide

Explain how a non-technical founder can test this PR before merge.

### What Changed

Plain-language summary of the user-facing or business behavior delivered.

### Where to Test

- Preview URL:
- Local route or screen:
- Test account or data:

### How to Test

1. Open...
2. Do...
3. Confirm...

### Expected Result

What the founder should see when the PR works.

### Out of Scope

What this PR intentionally does not cover.

### Known Risks or Limits

Anything the founder should know before approving.

## Risks

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## LeanOS Review Checklist

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Tests run or explained
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] No unrelated scope added
`;
}
