export function engineeringPrLogKnowledge(): string {
  return `# PR Log

## Purpose

Keep a lightweight delivery log of PRs, reviews and merges so the founder and future agents can understand what shipped without rereading every code change.

Use this file for quick delivery summaries. Use \`implementation-notes.md\` for technical lessons learned.

## How To Use

- Add an entry after PR creation, review, founder testing or merge when a persistent record is useful.
- Keep each entry founder-readable.
- Link each PR back to its Feature or Epic when possible.
- Record risks accepted, test gaps and follow-ups clearly.

## PR Summary Log

| Date | PR | Feature / Epic | Status | What Shipped | Validation | Founder Testing | Follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Latest Merge Summary

TBD

## Open Follow-Ups

TBD

## Do Not Use For

- Deep technical lessons learned.
- Product roadmap priority.
- Design specs.
- Secrets, credentials or private customer data.
`;
}
