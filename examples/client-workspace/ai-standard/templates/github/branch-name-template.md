# Branch Name Template

Use focused branches tied to a local LeanOS Feature or mapped GitHub issue.

## Formats

```text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
```

## Examples

```text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
```

## Rules

- Use `feature/...` when the Feature exists only in the local LeanOS workspace.
- Use `issue/...` when the Feature is mapped to a real GitHub issue.
- Always include the real issue number when using the `issue/...` format.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- Do not implement Feature work on the default branch.
- If the branch already exists, ask before continuing.
