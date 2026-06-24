# /create branch

## Purpose

Prepare a safe branch name and branch creation plan for an issue.

Prepare a safe branch name before any implementation work.

## Load First

Read:

- `../../AGENT.md`
- `../../operations/engineering/AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/skills/create-branch.skill.md`
- `../../operations/engineering/playbooks/branch-from-issue.playbook.md`
- `../../ai-standard/templates/github/branch-name-template.md`
- `../../.github/leanos/branch-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before creating a branch plan.

## Process

1. Confirm the issue number and issue title.
2. Use the required format: `issue/<issue-number>-<short-kebab-slug>`.
3. Keep the slug short and scoped to the issue.
4. Avoid secrets, customer names and sensitive details.
5. Ask before reusing an existing branch.
6. Do not run git commands unless the user explicitly asks in a tool-capable environment.

## Allowed Updates

None by default.

This command proposes a safe branch name. Creating the branch requires explicit founder confirmation and a tool-capable environment.

## Forbidden Updates

During `/create branch`, do not:

- edit source code;
- create commits or PRs;
- create a branch without issue context;
- include secrets, customer names or sensitive details in the branch name;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`.

## Confirmation Rule

Ask before creating or reusing a branch.

## Expected Output

- Proposed branch name
- Linked issue
- Naming rationale
- Safety checks
- Next command recommendation

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
