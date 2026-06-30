export function pricingKnowledge(): string {
  return `# Pricing

## Propósito

Growth Finance é o owner do Pricing Catalog. Use este arquivo como fonte canônica de planos, preços, packaging, trials, limites e entitlements antes de landing page, checkout, billing, suporte ou implementação.

Não use chat, landing page, código ou README como fonte canônica de preço.

## Estado Atual

TBD

## Pricing Catalog

Registre cada plano em formato estável. Um plano pode estar em \`draft, active, deprecated, grandfathered, hidden, archived\`.

| plan_id | Nome público | Descrição curta | Preço | Período | Status | Entitlements | Limites / quotas | Trial | Provider ID | Evidência |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | draft | TBD | TBD | TBD | TBD | TBD |

Campos obrigatórios:

- \`plan_id\`: identificador estável usado por produto, código, suporte e billing.
- Nome público: nome que aparece para cliente.
- Preço: valor, moeda, período e impostos quando aplicável.
- Status: \`draft, active, deprecated, grandfathered, hidden, archived\`.
- Entitlements: capacidades, features, limites, quotas e direitos incluídos.
- Provider ID: ID do billing provider quando existir. Não coloque segredos.
- Evidência: fonte da decisão, teste, founder decision ou observação de mercado.

## Runtime Source

O markdown é a fonte de decisão de negócio. O runtime source é onde o app realmente lê preço, plano, checkout, paywall e entitlement.

Preencha quando existir implementação:

- billing provider: TBD
- database table: TBD
- code path: TBD
- runtime config: TBD
- webhook/event source: TBD
- owner de sync: TBD
- sync status: not-started | mapped | implemented | verified | drift-detected

Nenhum código deve hardcodar preço, nome de plano, trial, limite, quota ou entitlement sem apontar para este catálogo e para o runtime source.

## Consumer Contract

- Strategy Product pode questionar valor, posicionamento e fit, mas não redefine preço aqui sem Finance.
- Marketing usa este arquivo para landing page, campanhas e copy de oferta; não inventa nomes, preços, descontos, trials, limites ou entitlements.
- Customer Experience usa este arquivo para suporte, onboarding e explicação de planos; não promete direitos fora do catálogo.
- Product Ops exige este arquivo quando Feature toca billing, paywall, checkout, subscription, quota, limite ou entitlement.
- Engineering implementa contra runtime source aprovado, não contra texto solto, README ou conversa.
- DevOps mapeia provider IDs, env vars e webhooks sem salvar segredos.
- Security revisa risco quando preço, cobrança, plano, checkout ou entitlement afetam dinheiro, acesso ou dados de cliente.

## Change Control

Toda mudança em plano, preço, trial, limite ou entitlement deve registrar:

- motivo da mudança;
- owner da decisão;
- status anterior e novo status;
- impacto em landing page, checkout, suporte, banco, provider e código;
- migração ou regra para clientes existentes;
- data de ativação;
- evidência de verificação no runtime source.

## Decisões

TBD

## Riscos

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
