export function engineeringTestingStrategyKnowledge(): string {
  return `# Testing Strategy

## Propósito

Define how Engineering should choose and explain tests for implementation work.

## Estado Atual

Use repository test patterns first. When behavior is deterministic and feasible to automate, prefer RED/GREEN evidence before implementation.

## Unit Tests

- Use for pure logic, validation, formatting, permission decisions, reducers and isolated services.
- Teste comportamento e saídas observáveis, não detalhes privados de implementação.
- Keep each test focused on one behavior.
- Prefer real code over mocks unless the dependency is slow, external or nondeterministic.

## Integration Tests

- Use quando o comportamento cruza módulos, limites de API, database/persistência, auth ou roteamento de framework.
- Cover contracts between UI/API/data layers when a unit test would miss the risk.
- Prefer realistic setup with minimal fixtures.
- Include rollback or cleanup when data state is created.

## End-to-End Tests

- Use for critical user flows, onboarding, checkout, auth, high-risk regressions or founder-facing acceptance paths.
- Keep e2e coverage small and stable.
- Não substitua testes unitários/de integração focados por um único teste e2e amplo.
- Record commands, routes and expected results.

## Manual Validation

- Use only when automation is impractical or the repository lacks the needed test surface.
- Manual validation must include where to test, steps, expected result and observed result.
- Manual checks do not prove untested edge cases.
- Include screenshots, preview URL or local route when useful for founder review.

## Regression Checks

- Para bugs, escreva ou identifique primeiro o teste falhando quando viável.
- Verify RED before the fix and GREEN after the fix.
- If a regression cannot be automated, document the exact manual reproduction and validation path.
- Keep regression coverage tied to acceptance behavior.

## Test Gaps

- List every meaningful test gap honestly.
- Explain why the gap remains and what would close it.
- Não alegue cobertura apenas a partir de um plano de teste.
- Não marque founder-ready ou merge-ready enquanto uma lacuna arriscada não testada estiver escondida.

## Decisões

Record durable test strategy changes here only after confirmation. Feature-specific test evidence belongs in PR notes or implementation notes.

## Perguntas em Aberto

- Which command runs unit, integration and e2e tests?
- Which test framework and helpers are canonical?
- Quais caminhos exigem validação manual até existir automação?

## Próxima Atualização

Update when the repository adopts durable test commands, frameworks or validation expectations.
`;
}
