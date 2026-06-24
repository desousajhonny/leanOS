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

- `knowledge/code-standards.md`
- `knowledge/implementation-rules.md`
- `knowledge/component-guidelines.md`
- `knowledge/data-guidelines.md`
- `knowledge/testing-strategy.md`
- `knowledge/review-criteria.md`
- `knowledge/implementation-notes.md`
- `knowledge/code-review-notes.md`
- `knowledge/pr-log.md`

## Operating Rules

- Read the issue, PRD, MVP scope and acceptance criteria before planning implementation.
- Create or confirm an issue-linked branch before changing code.
- Follow existing repository patterns before introducing new abstractions.
- Route user-facing UI work through Design when the design foundation or flow is missing.
- Read the approved Design component spec before implementing a new reusable component.
- Implement reusable component work before the screen or Feature that depends on it.
- Route data, auth, permissions, privacy, abuse or compliance work through Security when risk is present.
- Use `.github/leanos/branch-rules.md` and `.github/PULL_REQUEST_TEMPLATE.md` for branch and PR conventions.
- For implementation work that arrives from `feature-to-delivery-cycle`, route to Senior Developer and use `playbooks/engineering-delivery.playbook.md` as the master execution path before sub-playbooks.

## Red Lines

- Do not implement outside the confirmed issue or PRD scope.
- Do not create new user-facing components before Design defines the structure or confirms the component spec.
- Do not hardcode secrets, configuration, business rules, copy or design values.
- Do not create large unstructured files, components or functions when modular composition is possible.
- Do not make destructive data or migration changes without explicit confirmation and rollback notes.
- Do not open or recommend a PR without tests, manual validation notes or a clear test-gap explanation.


## Navigation

1. For operational work, start with `AGENT.md`.
2. Use this README as the directory map.
3. After the area AGENT selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- Branch request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/create-branch.skill.md` -> playbook `playbooks/branch-from-issue.playbook.md`.
- Component implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/implement-component.skill.md` -> playbook `playbooks/component-implementation.playbook.md`.
- Implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> playbook `playbooks/engineering-delivery.playbook.md` -> sub-playbooks `playbooks/branch-from-issue.playbook.md`, conditional `playbooks/component-implementation.playbook.md`, `playbooks/prepare-pr.playbook.md` and `playbooks/pr-validation.playbook.md`.
- Data change request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` or `roles/pr-reviewer.role.md` -> skill `skills/review-data-change.skill.md` -> route Security when sensitive risk exists.
- Test request: area lead `AGENT.md` -> role `roles/test-engineer.role.md` -> skill `skills/write-tests.skill.md` -> playbook `playbooks/test-planning.playbook.md`.
- PR review request: area lead `AGENT.md` -> role `roles/pr-reviewer.role.md` -> skills `skills/review-pr.skill.md`, `skills/follow-code-standards.skill.md` and conditional `skills/review-data-change.skill.md` -> playbook `playbooks/pr-validation.playbook.md`.
