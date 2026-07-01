export function devopsEnvironmentsKnowledge(): string {
  return `# Environments

## Propósito

Define local, preview/staging and production environment boundaries before deployment or GitHub automation.

## Estado Atual

TBD

## Local

TBD

## Preview / Staging

TBD

## Production

TBD

## Environment Variables

TBD

## Billing Provider Mapping

Use this section when the product has plans, checkout, subscription, usage limits, quotas or entitlements.

- Business source: \`../../growth/finance/knowledge/pricing.md\`
- Runtime config owner: TBD
- billing provider: TBD
- provider IDs: TBD
- webhook secrets: stored only in provider or CI/hosting secret manager
- environment variables: TBD
- runtime config: TBD
- database table: TBD
- code path: TBD
- verification status: not-started | mapped | implemented | verified | drift-detected

Não armazene valores secretos aqui. Este arquivo registra onde provider IDs, webhook secrets, variáveis de ambiente e runtime config são gerenciados.

## Cost Controls

Use this section when environments, providers, observability, AI/API, storage, queues, workers, logs, analytics or CI/CD can create meaningful recurring or usage-based cost.

- Finance source: \`../../growth/finance/knowledge/spend-ledger.md\`
- paid providers: TBD
- quotas: TBD
- budgets: TBD
- usage caps: TBD
- cost alerts: TBD
- owner: TBD
- review date: TBD

Não crie providers pagos, quotas, budgets ou usage caps sem owner claro e rota de Finance.

## Secrets

TBD

## Access

TBD

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
