# /create issues

## Purpose

Draft GitHub-ready issues.

Draft GitHub-ready epics and features from roadmap, delivery scope and issue readiness criteria.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../ai-standard/templates/github/github-epic-template.md`
- `../../ai-standard/templates/github/github-feature-template.md`
- `../../ai-standard/templates/github/delivery-readiness-matrix-template.md`
- `../../.github/ISSUE_TEMPLATE/epic.yml`
- `../../.github/ISSUE_TEMPLATE/feature.yml`
- `../../operations/product-ops/playbooks/epic-to-features.playbook.md`

## Area Routing

- Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality.
- Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/README.md` and MVP knowledge files before drafting issues.
- Load `../../operations/engineering/AGENT.md` and `../../operations/engineering/README.md` when features require implementation criteria.
- Use `../../operations/design/AGENT.md` only when the epic or feature changes user-facing UX, screens, states, copy or interactions; use the README as the area map.
- Use `../../operations/security/AGENT.md` only when the issue touches data, auth, permissions, privacy, abuse risk, compliance, API security, database security, secrets, infrastructure or AI-generated-code risk.
- Use `../../operations/devops/AGENT.md` only when the issue touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.

## Process

1. Identify the roadmap item, delivery scope, milestone and parent epic context.
2. Route through Product Ops and load `../../operations/product-ops/playbooks/epic-to-features.playbook.md`.
3. Apply the Delivery Readiness Matrix (DRM) before drafting work.
4. Use Product Ops criteria for every epic and feature.
5. Use Engineering criteria for implementation-ready features.
6. Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected.
7. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
8. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
9. Split epics into features only when the parent epic has enough context.
10. Mark missing role input as an explicit gap; do not invent criteria.
11. Produce drafts first and ask for confirmation before any future GitHub API write.

## Allowed Updates

None by default.

`/create issues` may produce local drafts or a future GitHub payload in chat. It must not write local Epic/Feature files or remote GitHub issues unless the founder confirms the proposed output and the next route.

## Forbidden Updates

During `/create issues`, do not:

- create GitHub issues directly from model reasoning;
- call GitHub APIs;
- create branches, commits, PRs or code;
- create one issue per Task by default;
- write tokens, secrets or credentials;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`.

## Confirmation Rule

Ask for explicit founder confirmation before writing local files, generating an API-capable payload or asking a future capability/script to create remote GitHub items.

## Expected Output

- Epic draft or selected parent epic
- Proposed features
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
