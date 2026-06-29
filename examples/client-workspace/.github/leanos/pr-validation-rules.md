# PR Validation Rules

## Contexto Obrigatório

- Linked issue and parent epic when available.
- Delivery scope and non-goals.
- Acceptance criteria.
- Relevant Product, Design, Engineering and Security criteria.
- Evidência de testes ou validação manual.
- Founder Testing Guide from the PR description.

## Review Dimensions

- Correctness: does the change work?
- Scope control: does it avoid unrelated work?
- Product alignment: does it satisfy user value and acceptance criteria?
- Founder acceptance: can a non-technical founder test the change from the PR?
- Design: required only when user-facing UX changed.
- Security: required when data, auth, permissions, privacy, abuse or compliance is involved.
- Tests: are automated or manual checks sufficient?
- LeanOS coherence: does it contradict source-of-truth files?

## Decision

- Approve only when acceptance criteria are addressed, risks are clear and the Founder Testing Guide is usable.
- Request changes for bugs, missing tests, scope drift or security/design gaps.
- Request changes when the PR cannot be tested by the founder from the provided steps or preview/local route instructions.
- Mark "blocked by missing context" when issue, MVP or criteria are unclear.
