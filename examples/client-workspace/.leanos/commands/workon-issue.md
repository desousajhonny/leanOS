# /workon issue

## Purpose

Plan issue implementation.

Plan implementation from a GitHub issue before changing code.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/engineering/AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/roles/senior-developer.role.md`
- `../../operations/engineering/knowledge/implementation-rules.md`
- `../../operations/engineering/knowledge/code-standards.md`
- `../../operations/engineering/knowledge/testing-strategy.md`
- `../../operations/engineering/skills/plan-implementation.skill.md`
- `../../operations/engineering/skills/create-branch.skill.md`
- `../../operations/engineering/skills/follow-code-standards.skill.md`
- `../../operations/engineering/playbooks/prepare-pr.playbook.md`
- `../../ai-standard/templates/github/delivery-readiness-matrix-template.md`
- `../../.github/leanos/branch-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before planning implementation.

## Process

1. Read or request the full GitHub issue body.
2. Summarize the issue in the chat and ask the user to confirm the interpretation.
3. Check Product Ops and Engineering readiness with the Delivery Readiness Matrix (DRM).
4. Check Design only when UX, UI, flow, accessibility, copy or interaction is affected.
5. Check Security only when data, auth, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
6. Check DevOps only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
7. Propose the required issue-linked branch name before code changes.
8. Produce an implementation plan and test plan.
9. Ask for confirmation before modifying product code.

## Allowed Updates

None by default.

`/workon issue` plans implementation. Product code, tests, branch creation and PR work require explicit founder confirmation and should proceed through `feature-to-delivery-cycle` and Engineering assets.

## Forbidden Updates

During `/workon issue`, do not:

- edit source code before readiness and branch confirmation;
- create branches, commits or PRs without explicit confirmation;
- skip Product Ops, Design, Security or DevOps readiness when applicable;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`;
- treat a GitHub issue number as proof that the Feature is ready to develop.

## Confirmation Rule

Ask the founder to confirm the issue interpretation, readiness summary, branch name and implementation plan before editing code.

## Expected Output

- Issue summary
- Readiness gaps
- Branch name proposal
- Implementation plan
- Test plan
- Likely files to change
- Risks
- Confirmation question before code changes

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
