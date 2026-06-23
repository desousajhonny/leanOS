# Write Subissue Criteria

## Purpose

Apply the Delivery Readiness Matrix (DRM) to draft implementation-ready sub-issues.

## Use When

- an epic is ready to be broken into sub-issues
- sub-issues need Product, Design, Engineering, Security or DevOps criteria
- GitHub issue drafts need to be prepared before remote creation

## Required Context

- ../AGENT.md
- ../knowledge/issue-readiness.md
- ../knowledge/ready-to-develop.md
- ../mvp/prd.md
- ../mvp/acceptance-criteria.md
- ../../../ai-standard/templates/github/delivery-readiness-matrix-template.md
- ../../../ai-standard/templates/github/github-subissue-template.md

## Inputs

- Ready epic
- MVP scope
- PRD
- Acceptance criteria
- Delivery Readiness Matrix
- Applicable Design, Security, DevOps and Engineering context

## Process

1. Write Product Ops criteria for every sub-issue.
2. Write Engineering criteria for every implementation sub-issue.
3. Add Design criteria only when the sub-issue affects UX, UI, flow, copy, accessibility or interaction.
4. Add Security criteria only when the sub-issue touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.
5. Add DevOps criteria only when the sub-issue touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.
6. Mark non-applicable dimensions explicitly with a reason.
7. Produce drafts and ask for confirmation before remote creation.

## Checks

- Every sub-issue has Product Ops and Engineering clarity.
- Design is included or explicitly not applicable.
- Security is included or explicitly not applicable.
- DevOps is included or explicitly not applicable.
- Dependencies and risks are visible.
- No GitHub write happens without confirmation.

## Output

- Sub-issue draft list
- DRM table per sub-issue or grouped by slice
- Dependencies
- Risks
- Missing context
- Draft payload readiness
- Confirmation question

## Files to Update

- Update `../knowledge/issue-readiness.md` only after explicit confirmation.
- Do not update GitHub directly from the model.

## Red Lines

- Do not create implementation-ready issues without Product Ops and Engineering criteria.
- Do not add fake Design, Security or DevOps criteria when not applicable.
- Do not call GitHub API directly from the model.
