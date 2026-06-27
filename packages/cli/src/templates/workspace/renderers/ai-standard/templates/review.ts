export function codeReviewTemplate(): string {
  return `# Code Review Template

## Review Context

- PR:
- Linked issue:
- Parent epic:
- Delivery scope:
- Acceptance criteria:

## Findings

List findings by severity.

| Severity | File/Area | Finding | Required Change |
| --- | --- | --- | --- |
| blocker/high/medium/low | TBD | TBD | TBD |

## Review Dimensions

- Correctness
- Scope control
- Tests
- Architecture
- Security/privacy when applicable
- Design/UX when applicable
- LeanOS source-of-truth alignment

## Decision

- [ ] Ready to merge
- [ ] Needs changes
- [ ] Blocked by missing context

## Open Questions

TBD
`;
}
