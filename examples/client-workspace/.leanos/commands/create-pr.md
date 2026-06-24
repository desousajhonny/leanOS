# /create pr

## Purpose

Prepare a PR summary and Founder Testing Guide.

Prepare a pull request draft that follows LeanOS structure and GitHub conventions.

## Load First

Read:

- `../../AGENT.md`
- `../../operations/engineering/AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/knowledge/review-criteria.md`
- `../../operations/engineering/skills/create-pr.skill.md`
- `../../operations/engineering/playbooks/prepare-pr.playbook.md`
- `../../ai-standard/templates/github/pull-request-template.md`
- `../../.github/PULL_REQUEST_TEMPLATE.md`
- `../../.github/leanos/pr-validation-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before preparing a PR.

## Process

1. Confirm the linked issue, parent epic and branch.
2. Summarize changed behavior and why it matters.
3. Map changes to acceptance criteria.
4. Include Product/MVP alignment.
5. Include Design notes only when user-facing UX changed.
6. Include Security notes only when data, auth, privacy, abuse or compliance is involved.
7. Include tests run or explain why they were not run.
8. Include a Founder Testing Guide with where to test, how to test and expected result.
9. Produce a PR body draft first and ask for confirmation before any remote PR creation.

## Allowed Updates

None by default.

This command may draft a PR body in chat. Remote PR creation requires explicit founder confirmation and a future tool/script capability.

## Forbidden Updates

During `/create pr`, do not:

- create or update a remote PR directly from model reasoning;
- mark the PR merge-ready without PR validation;
- omit the Founder Testing Guide;
- hide missing tests, security checks or review gaps;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`.

## Confirmation Rule

Ask before any remote PR creation or PR update.

## Expected Output

- PR title
- PR body
- Linked issue and parent epic
- Checklist state
- Tests
- Founder Testing Guide
- Risks
- Confirmation question before remote PR creation

## Remote Write Rule

Do not create the PR directly from the model. Generate the draft and ask for explicit confirmation. A future CLI/script capability performs the actual GitHub write.

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
