# Epic To Subissues

## Purpose

Break a GitHub epic into implementation-ready sub-issues using the Delivery Readiness Matrix (DRM) before Engineering starts work.

## When to Use

- The founder asks to break an epic into sub-issues.
- A roadmap epic needs GitHub-ready implementation slices.
- The team needs Product Ops, Design, Engineering, Security and DevOps criteria before work starts.

## Before Acting

- `../AGENT.md`
- `../knowledge/overview.md`
- `../knowledge/issue-readiness.md`
- `../mvp/prd.md`
- `../mvp/scope.md`
- `../mvp/acceptance-criteria.md`
- `../../../strategy/product/AGENT.md`
- `../../../strategy/roadmap/AGENT.md`
- `../../../ai-standard/templates/github/github-epic-template.md`
- `../../../ai-standard/templates/github/github-subissue-template.md`
- `../../../ai-standard/templates/github/delivery-readiness-matrix-template.md`

## Inputs

- Parent epic or roadmap item
- Milestone/current cycle
- MVP scope
- PRD
- Acceptance criteria
- Delivery Readiness Matrix (DRM)
- Design context when UX is affected
- Security context when sensitive surfaces are involved
- DevOps context when delivery or environment impact exists
- Engineering constraints and dependencies

## Steps

1. Load Product Ops AGENT and choose `roles/product-owner.role.md`.
2. Load `skills/shape-epic.skill.md` and confirm the epic outcome, scope boundary and non-goals.
3. Load `skills/write-subissue-criteria.skill.md` and apply the Delivery Readiness Matrix (DRM).
4. Write Product Ops criteria for every sub-issue.
5. Add Design criteria only when UX, UI, flow, copy, accessibility or interaction is affected.
6. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
7. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
8. Ask Engineering to validate implementation boundaries, dependencies, test approach and issue size.
9. Mark non-applicable dimensions explicitly and explain why.
10. Prepare GitHub-ready sub-issue drafts and ask for confirmation before any remote write.

## Security Gate

- Stop if the epic touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk and Security criteria are missing.
- Do not downgrade a Security dimension to not applicable without explaining why.

## Output

- Epic readiness summary
- Sub-issue draft list
- DRM criteria for each sub-issue
- Product Ops criteria
- Design criteria or not applicable with reason
- Engineering criteria
- Security criteria or not applicable with reason
- DevOps criteria or not applicable with reason
- Dependencies and risks
- Missing context
- Confirmation question before remote issue creation

## Files to Update

- Do not update GitHub directly from the model.
- Do not update source code.
- Update `../knowledge/issue-readiness.md`, `../knowledge/delivery-context.md` or MVP files only when the user explicitly confirms a scope or criteria change.

## Stop Conditions

- Stop if the parent epic is missing outcome, scope or non-goals.
- Stop if Product Ops or Engineering criteria are missing.
- Stop if applicable Design, Security or DevOps criteria cannot be determined.
- Stop before any GitHub API write until the user explicitly confirms.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
