# Write Feature Criteria

## Purpose

Apply the Delivery Readiness Matrix (DRM) to draft implementation-ready features with internal tasks.

## Use When

- an epic is ready to be broken into features
- features need Product, Design, Engineering, Security or DevOps criteria
- GitHub issue drafts need to be prepared before remote creation

## Required Context

- ../AGENT.md
- ../knowledge/work-taxonomy.md
- ../knowledge/issue-readiness.md
- ../knowledge/ready-to-develop.md
- ../mvp/prd.md
- ../mvp/acceptance-criteria.md
- ../epics/README.md
- ../../../ai-standard/templates/product/feature-template.md
- ../../../ai-standard/templates/github/delivery-readiness-matrix-template.md
- ../../../ai-standard/templates/github/github-feature-template.md

## Inputs

- Ready epic
- MVP scope
- PRD
- Acceptance criteria
- Delivery Readiness Matrix
- Applicable Design, Security, DevOps and Engineering context

## Process

1. Write Product Ops criteria for every feature.
2. Write Engineering criteria for every implementation-ready feature.
3. Add internal tasks inside each feature.
4. Add Design criteria only when the feature affects UX, UI, flow, copy, accessibility, screens, states, components or interaction.
5. When Design is applicable, identify whether the feature can reuse a component, adapt a component or needs a new component spec.
6. Do not write the full component spec during Feature Shaping; add a Design task for `component-readiness` when a spec is required.
7. Add Security criteria only when the feature touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.
8. Add DevOps criteria only when the feature touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.
9. Mark non-applicable dimensions explicitly with a reason.
10. Produce local feature drafts and ask for confirmation before remote creation.

## Checks

- Every feature has Product Ops and Engineering clarity.
- Every feature has internal tasks.
- Design is included or explicitly not applicable.
- UI features identify component reuse, adaptation or required component spec.
- Features that need a new component include a Design task before Engineering work.
- Security is included or explicitly not applicable.
- DevOps is included or explicitly not applicable.
- Dependencies and risks are visible.
- No GitHub write happens without confirmation.

## Output

- Feature draft list
- DRM table per feature
- Internal task checklist per feature
- Component readiness decision when UI is affected
- Design task for component spec when needed
- Dependencies
- Risks
- Missing context
- Draft payload readiness
- Confirmation question

## Files to Update

- Update `../knowledge/issue-readiness.md` only after explicit confirmation.
- Do not update GitHub directly from the model.

## Red Lines

- Do not create implementation-ready features without Product Ops and Engineering criteria.
- Do not add fake Design, Security or DevOps criteria when not applicable.
- Do not call GitHub API directly from the model.
