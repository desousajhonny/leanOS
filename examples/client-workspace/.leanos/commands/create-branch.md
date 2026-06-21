# /create branch

## Purpose

Prepare a safe branch name and branch creation plan for an issue.

Prepare a safe branch name before any implementation work.

## Load First

Read:

- `../../AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/skills/create-branch.skill.md`
- `../../operations/engineering/playbooks/branch-from-issue.playbook.md`
- `../../ai-standard/templates/branch-name-template.md`
- `../../.github/leanos/branch-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before creating a branch plan.

## Process

1. Confirm the issue number and issue title.
2. Use the required format: `issue/<issue-number>-<short-kebab-slug>`.
3. Keep the slug short and scoped to the issue.
4. Avoid secrets, customer names and sensitive details.
5. Ask before reusing an existing branch.
6. Do not run git commands unless the user explicitly asks in a tool-capable environment.

## Output

- Proposed branch name
- Linked issue
- Naming rationale
- Safety checks
- Next command recommendation

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
