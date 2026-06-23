# /create issues

## Purpose

Draft GitHub-ready issues.

Draft GitHub-ready epics and sub-issues from roadmap, MVP scope and issue readiness criteria.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../ai-standard/templates/github/github-epic-template.md`
- `../../ai-standard/templates/github/github-subissue-template.md`
- `../../ai-standard/templates/github/delivery-readiness-matrix-template.md`
- `../../.github/ISSUE_TEMPLATE/epic.yml`
- `../../.github/ISSUE_TEMPLATE/sub-issue.yml`
- `../../operations/product-ops/playbooks/epic-to-subissues.playbook.md`

## Area Routing

- Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality.
- Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/README.md` and MVP knowledge files before drafting issues.
- Load `../../operations/engineering/AGENT.md` and `../../operations/engineering/README.md` when sub-issues require implementation criteria.
- Use `../../operations/design/AGENT.md` only when the epic or sub-issue changes user-facing UX, screens, states, copy or interactions; use the README as the area map.
- Use `../../operations/security/AGENT.md` only when the issue touches data, auth, permissions, privacy, abuse risk, compliance, API security, database security, secrets, infrastructure or AI-generated-code risk.
- Use `../../operations/devops/AGENT.md` only when the issue touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.

## Process

1. Identify the roadmap item, MVP scope, milestone and parent epic context.
2. Route through Product Ops and load `../../operations/product-ops/playbooks/epic-to-subissues.playbook.md`.
3. Apply the Delivery Readiness Matrix (DRM) before drafting work.
4. Use Product Ops criteria for every epic and sub-issue.
5. Use Engineering criteria for implementation-ready sub-issues.
6. Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected.
7. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
8. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
9. Split epics into sub-issues only when the parent epic has enough context.
10. Mark missing role input as an explicit gap; do not invent criteria.
11. Produce drafts first and ask for confirmation before any future GitHub API write.

## Output

- Epic draft or selected parent epic
- Proposed sub-issues
- Delivery Readiness Matrix (DRM)
- Product Ops criteria
- Design criteria or "not applicable" with reason
- Engineering criteria
- Security criteria or "not applicable" with reason
- DevOps criteria or "not applicable" with reason
- Dependencies and risks
- Source-of-truth files used
- Missing context
- Confirmation question before remote creation

## Remote Write Rule

Do not call GitHub API directly from the model. Generate a draft payload and ask for explicit confirmation. A future CLI/script capability performs the actual API write.

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- operations.product-ops
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
