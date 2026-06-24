# Epic To Features

## Purpose

Break a LeanOS epic into implementation-ready features with internal tasks using the Delivery Readiness Matrix (DRM) before Engineering starts work.

## When to Use

- The founder asks to break an epic into features.
- A roadmap epic needs implementation-ready feature slices.
- The team needs Product Ops, Design, Engineering, Security and DevOps criteria before work starts.

## Before Acting

- `../AGENT.md`
- `../knowledge/overview.md`
- `../knowledge/work-taxonomy.md`
- `../knowledge/issue-readiness.md`
- `../knowledge/ready-to-develop.md`
- `../mvp/prd.md`
- `../mvp/scope.md`
- `../mvp/acceptance-criteria.md`
- `../epics/README.md`
- `../../../strategy/product/AGENT.md`
- `../../../strategy/roadmap/AGENT.md`
- `../../../ai-standard/templates/product/epic-template.md`
- `../../../ai-standard/templates/product/feature-template.md`
- `../../../ai-standard/templates/github/github-epic-template.md`
- `../../../ai-standard/templates/github/github-feature-template.md`
- `../../../ai-standard/templates/github/delivery-readiness-matrix-template.md`

## Inputs

- Parent epic or roadmap item
- Milestone/current cycle
- MVP scope
- PRD
- Acceptance criteria
- Delivery Readiness Matrix (DRM)
- Design context when UX is affected
- Component inventory when UI components are affected
- Security context when sensitive surfaces are involved
- DevOps context when delivery or environment impact exists
- Engineering constraints and dependencies

## Steps

1. Load Product Ops AGENT and choose `roles/product-owner.role.md`.
2. Load the local Product Epic and Feature templates from `../../../ai-standard/templates/product/` before preparing any GitHub issue.
3. Load `skills/shape-epic.skill.md` and confirm the epic outcome, decision ownership, scope boundary, non-goals and Epic Readiness Matrix.
4. Load `skills/write-feature-criteria.skill.md` and apply the Feature-level Delivery Readiness Matrix (DRM).
5. Write Product Ops criteria for every feature.
6. Add internal tasks inside each feature.
7. Add Design criteria only when UX, UI, flow, copy, accessibility, screens, states, components or interaction is affected.
8. When a Feature depends on UI components, check whether it can reuse an approved component, adapt one or needs a new component spec.
9. Do not create the full component spec during Feature Shaping; add a Design task for `operations/design/playbooks/component-readiness.playbook.md` when a component spec is needed.
10. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
11. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
12. Ask Engineering to validate implementation boundaries, dependencies, test approach and feature size.
13. Mark non-applicable dimensions explicitly and explain why.
14. Prepare local feature drafts and ask for confirmation before any remote write.

## Security Gate

- Stop if the epic touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk and Security criteria are missing.
- Do not downgrade a Security dimension to not applicable without explaining why.

## Output

- Epic readiness summary
- Feature draft list
- Internal task checklist per feature
- DRM criteria for each feature
- Product Ops criteria
- Design criteria or not applicable with reason
- Component reuse/adaptation/spec decision when UI is affected
- Design task for component spec when needed
- Engineering criteria
- Security criteria or not applicable with reason
- DevOps criteria or not applicable with reason
- Dependencies and risks
- Missing context
- Confirmation question before remote issue creation

## Files to Update

- Do not update GitHub directly from the model.
- Do not update source code.
- Update `../knowledge/issue-readiness.md` or MVP files only when the user explicitly confirms a scope or criteria change.

## Stop Conditions

- Stop if the parent epic is missing outcome, scope or non-goals.
- Stop if Product Ops or Engineering criteria are missing.
- Stop if applicable Design, Security or DevOps criteria cannot be determined.
- Stop before any GitHub API write until the user explicitly confirms.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
