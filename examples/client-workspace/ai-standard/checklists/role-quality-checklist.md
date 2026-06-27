# Role Quality Checklist

Use this checklist before accepting a `.role.md` file.

## Metadata

- [ ] The role has YAML frontmatter with `name` and `description`.
- [ ] The `description` starts with "Use when" and describes triggering conditions.

## Responsibility

- [ ] The role defines a clear operating persona.
- [ ] The role answers "with which hat should the agent act?"
- [ ] The role does not duplicate a skill or playbook.

## Context

- [ ] The role lists the context it should read before acting.
- [ ] The role points to relevant knowledge files when needed.
- [ ] The role does not ask for unrelated workspace context.

## Execution Assets

- [ ] The role points to relevant skills.
- [ ] The role points to relevant playbooks.
- [ ] The role does not reference missing files.

## Acceptance Criteria

- [ ] The role states the expected output or confirmation state under `## Acceptance Criteria`.
- [ ] The role states when to ask for clarification or confirmation.
