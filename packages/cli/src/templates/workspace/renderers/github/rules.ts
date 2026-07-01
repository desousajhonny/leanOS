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

# LeanOS local scratch artifacts
.leanos/runtime/scratch/*
!.leanos/runtime/scratch/README.md

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
fix/<issue-number>-<short-kebab-slug>
chore/<short-kebab-slug>
docs/<short-kebab-slug>
spike/<short-kebab-slug>
\`\`\`

Examples:

\`\`\`text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
fix/612-handle-null-clinic-phone
chore/update-pr-validation-copy
docs/add-founder-testing-guide
spike/evaluate-webhook-retry-queue
\`\`\`

## Regras

- Crie ou confirme uma branch antes de alterar código de produto.
- Não implemente trabalho de Feature na branch padrão.
- Use \`feature/...\` quando o trabalho nasce de uma Feature local LeanOS sem sync com GitHub.
- Use \`issue/...\` quando a Feature está mapeada para uma issue real do GitHub.
- Use \`fix/...\` para correção de bug vinculada a uma issue real.
- Use \`chore/...\` para manutenção interna sem mudança de produto.
- Use \`docs/...\` para mudanças de documentação.
- Use \`spike/...\` para investigação técnica aprovada e explicitamente limitada.
- Sempre inclua o número real da issue ao usar \`issue/...\` ou \`fix/...\`.
- Use um slug curto em kebab-case.
- Não inclua segredos, nomes de clientes ou detalhes sensíveis.
- Se a branch já existir, peça confirmação antes de continuar.
- Mantenha o escopo da branch alinhado à Feature, Epic, escopo de delivery e critérios de aceite vinculados.
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
- Temporary Artifact Sweep.

## Review Dimensions

- Correctness: does the change work?
- Scope control: does it avoid unrelated work?
- Product alignment: does it satisfy user value and acceptance criteria?
- Founder acceptance: can a non-technical founder test the change from the PR?
- Design: required only when user-facing UX changed.
- Security: required when data, auth, permissions, privacy, abuse or compliance is involved.
- Tests: are automated or manual checks sufficient?
- Workspace hygiene: no temporary scripts, probes or scratch files should remain in the PR.
- LeanOS coherence: does it contradict source-of-truth files?

## Decision

- Approve only when acceptance criteria are addressed, risks are clear and the Founder Testing Guide is usable.
- Request changes for bugs, missing tests, scope drift or security/design gaps.
- Request changes when the PR cannot be tested by the founder from the provided steps or preview/local route instructions.
- Request changes when debug-*, temp-*, scratch-*, check-* or verify-* scripts remain without owner, purpose, documentation and official command.
- Mark "blocked by missing context" when issue, MVP or criteria are unclear.
`;
}
