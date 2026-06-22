# Branch Name Template

Use focused branches tied to a GitHub issue.

## Format

```text
issue/<issue-number>-<short-kebab-slug>
```

## Examples

```text
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
```

## Rules

- Always include the real issue number.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- Do not implement issue work on the default branch.
- If the branch already exists, ask before continuing.
