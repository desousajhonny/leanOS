# Branch Rules

## Required Formats

```text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
```

Examples:

```text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
```

## Rules

- Create a branch before changing product code.
- Do not implement Feature work on the default branch.
- Use `feature/...` when the work starts from a local LeanOS Feature without GitHub sync.
- Use `issue/...` when the Feature is mapped to a real GitHub issue.
- Always include the real GitHub issue number when using the `issue/...` format.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- If the branch already exists, ask before continuing.
- Keep branch scope aligned with the linked Feature, Epic, delivery scope and acceptance criteria.
