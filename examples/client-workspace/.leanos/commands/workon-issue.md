# /workon issue

## Purpose

Plan issue implementation.

Plan implementation from a GitHub issue before changing code.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/engineering/README.md`
- `../../operations/engineering/roles/senior-developer.role.md`
- `../../operations/engineering/skills/plan-implementation.skill.md`
- `../../operations/engineering/skills/create-branch.skill.md`
- `../../operations/engineering/playbooks/issue-to-pr.playbook.md`
- `../../ai-standard/templates/github/issue-readiness-matrix-template.md`
- `../../.github/leanos/branch-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before planning implementation.

## Process

1. Read or request the full GitHub issue body.
2. Summarize the issue in the chat and ask the user to confirm the interpretation.
3. Check Product and Engineering readiness.
4. Check Design only when UX is affected.
5. Check Security only when data, auth, privacy, abuse or compliance is involved.
6. Propose the required issue-linked branch name before code changes.
7. Produce an implementation plan and test plan.
8. Ask for confirmation before modifying product code.

## Output

- Issue summary
- Readiness gaps
- Branch name proposal
- Implementation plan
- Test plan
- Likely files to change
- Risks
- Confirmation question before code changes

## Active Areas

- strategy.company
- strategy.product
- strategy.roadmap
- strategy.validation
- operations.core
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
