# Plan Implementation

## Purpose

Turn a ready Feature into a scoped technical implementation plan before code changes.

## Use When

- a local Feature or mapped GitHub issue should be implemented
- a bug fix needs scope
- implementation work needs sequencing

## Required Context

- Feature body or mapped GitHub issue body
- PRD
- MVP scope
- Acceptance criteria
- Engineering implementation rules
- Code standards

## Inputs

- Feature
- Linked Epic or PRD
- Acceptance criteria
- Current repository patterns
- Known risks

## Process

1. Summarize the Feature in the chat
2. Identify files or modules likely involved
3. Classify Design, Security and data impact
4. Plan the smallest safe implementation steps
5. Identify tests and validation
6. Ask for confirmation before code changes when scope is unclear

## Checks

- Implementation plan stays inside Feature scope
- Existing repository patterns are preferred
- Dependencies and risks are explicit
- Design/Security/Data routing is explicit when applicable

## Output

- Feature summary
- Implementation plan
- Files likely involved
- Tests to run or add
- Risks
- Confirmation question when needed

## Files to Update

- Update `../knowledge/implementation-notes.md` only when implementation decisions should persist.

## Red Lines

- Do not begin code changes without branch context
- Do not expand scope silently
- Do not skip Design/Security/Data classification.
