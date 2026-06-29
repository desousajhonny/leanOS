export function engineeringReviewCriteriaKnowledge(): string {
  return `# Review Criteria

## Propósito

Define how Engineering reviews implementation, tests, risk and PR readiness.

## Estado Atual

Use estes critérios antes de recomendar prontidão de merge. A evidência revisada deve estar explícita.

## Escopo Review

- Confirm the PR maps to a local Feature or mapped GitHub Feature issue.
- Compare changed behavior with PRD, MVP scope and acceptance criteria.
- Flag scope expansion, hidden refactors, unrelated files and missing non-goal explanations.
- Confirm Design, Security, Data and DevOps dimensions are satisfied or explicitly not applicable.

## Code Review

- Prefer existing repository patterns over new architecture.
- Check modularity, naming, boundaries, side effects, configuration and hardcoding.
- Flag large unstructured files, mixed concerns and hidden business rules.
- Check dependencies, generated code and broad file edits for necessity.

## Test Review

- Confirme que testes ou validação manual mapeiam para critérios de aceite.
- Look for RED/GREEN evidence when test-first was feasible.
- Check that risky behavior has coverage or explicit test-gap explanation.
- Não aceite testes deletados, enfraquecidos ou fabricados como validação.

## Design Review

- Required when UX, UI, layout, copy, accessibility, screens, states, flows or components changed.
- Confirm Design readiness, component spec or not-applicable reason.
- Check screenshots, preview URL or Founder Testing Guide when user-facing UI changed.
- Não aprove decisões improvisadas de UI que contornam Design.

## Security Review

- Required when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
- Confirm Security review or a clear not-applicable reason.
- Block hardcoded secrets, unsafe permissions, missing server-side authorization and sensitive data leakage.
- Route unclear risk back to Security before merge recommendation.

## Data Review

- Required when schema, API contract, persistence, migration, auth/ownership or sensitive data changed.
- Confirm validation, migration safety, rollback and compatibility.
- Check tenant/user isolation and server-side permission enforcement.
- Block destructive data changes without explicit confirmation and rollback notes.

## Findings By Severity

- Critical: must be fixed before proceeding; likely breakage, security risk, data loss or wrong product behavior.
- Important: should be fixed before merge; meaningful maintainability, test, UX or scope risk.
- Minor: can be fixed later; small cleanup or clarity issue.
- Note: context or follow-up that does not block.

Findings should include file/line or artifact references when possible.

## Merge Recommendation

- Recommend \`merge-ready\` only when scope, code, tests, founder testing path and applicable Design/Security/Data/DevOps checks have evidence.
- Recommend \`changes-requested\` when fixable issues remain.
- Recommend \`blocked-by-context\` when required Product, Design, Security, Data, DevOps or validation context is missing.
- State evidence reviewed before the recommendation.

## Decisões

Record durable review criteria changes here only after confirmation.

## Perguntas em Aberto

- Which checks are required by branch protection?
- Which review surfaces exist: PR diff, preview URL, screenshots, storybook, logs or test reports?
- Who owns approval when Design, Security, Data or DevOps risk is present?

## Próxima Atualização

Update when PR validation rules, review ownership or merge-readiness criteria change.
`;
}
