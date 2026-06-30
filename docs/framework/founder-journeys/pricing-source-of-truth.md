# Jornada: Pricing Source Of Truth

## Intenção Do Founder

O founder pede algo como:

- "defina os planos";
- "qual preco vamos cobrar?";
- "coloque esses planos na landing page";
- "implemente checkout/paywall";
- "o suporte pode prometer esse limite?";
- "temos planos diferentes em lugares diferentes".

## Rota

1. Root `AGENT.md` identifica plano, preço, cobrança, pacote, assinatura ou entitlement.
2. Se `growth.finance` estiver inativo, retorna `activation_required: growth.finance`.
3. Quando Growth Finance está ativo, o agente entra em `growth/finance/AGENT.md`.
4. Finance Operator lê `growth/finance/knowledge/pricing.md`.
5. `skills/review-pricing/SKILL.md` revisa Pricing Catalog, status, entitlements e Runtime Source.
6. `playbooks/finance-review.playbook.md` produz decisão, lacunas e impactos nas áreas consumidoras.
7. Marketing, Customer Experience, Product Ops, Engineering, DevOps e Security consomem o catálogo conforme aplicável.

## Fonte Canônica

`growth/finance/knowledge/pricing.md` é a fonte canônica de negócio para:

- `plan_id`;
- nome público;
- preço;
- status;
- trial;
- limites;
- quotas;
- entitlements;
- Provider ID sem segredo;
- evidência e decisão.

O runtime source é separado: billing provider, banco, app config, code path, env vars e webhooks.

## Handoffs Obrigatórios

- Marketing usa o catálogo antes de landing page ou oferta com preço.
- Customer Experience usa o catálogo antes de explicar plano, limite, upgrade, trial ou desconto.
- Product Ops exige Pricing/Plan readiness em Features que tocam billing, checkout, paywall, subscription, quota, limite ou entitlement.
- Engineering não hardcoda plano, preço, limite, quota ou entitlement sem fonte runtime aprovada.
- DevOps mapeia provider IDs, env vars e webhook secrets sem salvar segredos.
- Security revisa quando dinheiro, acesso ou dados de cliente podem ser afetados.

## Stop Conditions

- Não há Pricing Catalog.
- Growth Finance está inativo.
- Plano/preço aparece na landing page ou código sem referência ao catálogo.
- Runtime Source está desconhecido para implementação de checkout, paywall ou entitlement.
- Security aplicável não foi revisada quando dinheiro, acesso ou dados de cliente são afetados.

## Checklist De Validação Da Jornada

- [x] Root `AGENT.md` roteia linguagem natural de pricing para `growth.finance`.
- [x] `pricing.md` contém Pricing Catalog, Runtime Source, Consumer Contract e Change Control.
- [x] Marketing e Customer Experience referenciam o catálogo.
- [x] Product Ops adiciona Pricing/Plan readiness.
- [x] Engineering bloqueia hardcoding e drift.
- [x] DevOps mapeia provider/runtime sem segredos.
- [x] Security cobre payment/billing/pricing/entitlement risk.
- [x] Generator valida regressão com `validatePricingSourceOfTruthContract`.
