# Epic To Subissues

## Purpose

Break a GitHub epic into implementation-ready sub-issues with clear Product and Engineering criteria.

## Inputs

- Parent epic
- Roadmap item
- Milestone
- MVP scope
- PRD
- Acceptance criteria
- Issue readiness matrix
- Design context when UX is affected
- Security context when sensitive surfaces are involved

## Process

1. Read the parent epic, MVP scope and PRD
2. Confirm the epic outcome and non-goals
3. Apply the issue readiness matrix
4. Write Product criteria for every sub-issue
5. Write Engineering criteria for every implementation sub-issue
6. Include Design criteria only when the sub-issue affects user-facing UX
7. Include Security criteria only when data, auth, privacy, abuse or compliance is involved
8. Ask Engineering to validate size and dependencies
9. Prepare sub-issue drafts and ask for confirmation before any GitHub API write

## Output

- Sub-issue draft list
- Product criteria
- Engineering criteria
- Design criteria or not applicable
- Security criteria or not applicable
- Dependencies
- Risks
- Confirmation question before remote issue creation

## Files to Update

- Do not update GitHub directly from the model.
- Update MVP source-of-truth files only when the user explicitly confirms a scope or criteria change.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
