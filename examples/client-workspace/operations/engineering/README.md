# Engineering

## Purpose

Own implementation, tests, code quality and PR readiness.

## When to Use

- implement a feature
- fix a bug
- modify code
- create or review a PR
- write tests
- work on a GitHub issue

## Source of Truth

- `implementation-notes.md`
- `code-review-notes.md`
- `pr-log.md`

## Navigation

1. Choose the relevant role from `roles/`.
2. Load only the required skills from `skills/`.
3. Use the matching playbook from `playbooks/`.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- Branch request: role `roles/senior-developer.role.md` -> skill `skills/create-branch.skill.md` -> playbook `playbooks/branch-from-issue.playbook.md`.
- Implementation request: role `roles/senior-developer.role.md` -> skills `skills/plan-implementation.skill.md` and `skills/write-tests.skill.md` -> playbook `playbooks/issue-to-pr.playbook.md`.
- PR review request: role `roles/pr-reviewer.role.md` -> skill `skills/review-pr.skill.md` -> playbook `playbooks/pr-validation.playbook.md`.
