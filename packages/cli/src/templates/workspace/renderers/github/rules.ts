export function workspaceGitignore(): string {
  return `# Dependencies
node_modules/

# Build output
dist/
.next/
out/
build/

# Local environment and secrets
.env
.env.local
.env.*.local

# Vercel local project metadata
.vercel/

# Logs and OS files
*.log
.DS_Store
Thumbs.db
`;
}

export function branchRules(): string {
  return `# Branch Rules

## Required Formats

\`\`\`text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
\`\`\`

Examples:

\`\`\`text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Regras

- Create a branch before changing product code.
- Não implemente trabalho de Feature na branch padrão.
- Use \`feature/...\` when the work starts from a local LeanOS Feature without GitHub sync.
- Use \`issue/...\` when the Feature is mapped to a real GitHub issue.
- Always include the real GitHub issue number when using the \`issue/...\` format.
- Use a short kebab-case slug.
- Não inclua segredos, nomes de clientes ou detalhes sensíveis.
- If the branch already exists, ask before continuing.
- Keep branch scope aligned with the linked Feature, Epic, delivery scope and acceptance criteria.
`;
}

export function prValidationRules(): string {
  return `# PR Validation Rules

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
`;
}
