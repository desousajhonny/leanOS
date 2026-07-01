export function engineeringDataGuidelinesKnowledge(): string {
  return `# Data Guidelines

## Propósito

Define how Engineering should handle database, API, persistence and data-sensitive changes.

## Estado Atual

Use these rules for data implementation. Security owns risk review; Engineering owns safe implementation, migration discipline and validation.

## Schema Changes

- Tie every schema change to a Feature, bug fix or explicit technical decision.
- Prefer additive changes over destructive changes.
- Keep ownership, tenant isolation, nullability, defaults and compatibility visible.
- Não adicione campos que armazenem dados sensíveis sem revisão de Security.

## Migrations

- Use the repository's migration tool and naming convention.
- Keep migrations small enough to review and roll back.
- Separate schema migration from data backfill when risk is meaningful.
- Não rode nem comite migrações destrutivas sem confirmação explícita.
- Include local verification or dry-run evidence when the repository supports it.

## Validation

- Validate data at server/API boundaries, not only in the client.
- Validate inputs before persistence.
- Keep database constraints aligned with application validation when practical.
- Return safe, actionable errors without leaking sensitive internals.

## Sensitive Data

- Classify whether the change touches personal, private, financial, health, credential, tenant or customer data.
- Não registre segredos, credenciais, tokens ou dados sensíveis de cliente.
- Não coloque dados reais de clientes em seeds, fixtures, screenshots, markdown ou testes.
- Route privacy, auth, permission or compliance risk to Security before implementation.

## Pricing And Entitlements

- If code touches plans, prices, billing, checkout, paywall, subscription, trial, usage limit, quota or entitlement, read \`../../growth/finance/knowledge/pricing.md\` and Product Ops readiness before implementation.
- Identify the runtime source before coding: billing provider, database table, code path, runtime config and webhook/event source when applicable.
- Não trate markdown como runtime config; markdown registra a decisão de negócio, enquanto o código deve ler da fonte runtime aprovada.
- Não hardcode plano, preço, trial, limite, quota ou entitlement in UI, API, tests or seed data unless the Feature explicitly defines a temporary fixture and links it to the Pricing Catalog.
- Route money, access or customer-data risk to Security before implementation.

## Cost And Usage Controls

- If implementation introduces AI/API, storage, worker, queue, vector DB, logging, analytics or paid provider cost that scales with usage, read \`../../growth/finance/knowledge/spend-ledger.md\` and Product Ops Cost/Spend readiness before implementation.
- Identify the cost driver, usage unit, expected cap, owner and monitoring path before coding usage-based behavior.
- Prefer explicit limits, rate limits, quotas, batching or backoff when a provider can generate runaway cost.
- Não adicione provider pago, usage-based API, background job, log volume, vector DB, analytics pipeline or AI call path without naming the cost owner or Finance gap.
- Route cost/rate abuse risk to Security when public traffic, automation, agents or untrusted users can trigger the cost.

## Indexes and Performance

- Consider indexes for new filters, joins, lookups, ordering and uniqueness requirements.
- Avoid broad unbounded queries on user-facing or production paths.
- Prefer pagination or limits when returning lists.
- Não otimize prematuramente, mas registre risco óbvio de query.

## Backward Compatibility

- Consider existing data, clients, API consumers and deployed versions.
- Prefer expand-and-contract migration when removing or renaming data fields.
- Keep API responses compatible unless the Feature explicitly changes the contract.
- Document any breaking change and its rollout path.

## Rollback

- Define how to reverse schema, migration, configuration and code changes.
- For risky changes, name backup, restore or mitigation expectations before deploy.
- Não marque uma mudança de dados como pronta sem notas de rollback ou motivo explícito para rollback não ser necessário.

## Decisões

Record durable data implementation decisions here only after confirmation. Feature-specific migration notes belong in implementation notes or PR notes.

## Perguntas em Aberto

- Which ORM, query builder or migration tool is authoritative in this repository?
- Which environments have real data?
- What backup and restore path exists before production data changes?

## Próxima Atualização

Update when the repository adopts durable database, API or persistence conventions.
`;
}
