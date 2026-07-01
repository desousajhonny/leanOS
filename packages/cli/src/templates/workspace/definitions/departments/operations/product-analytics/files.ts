import type { AreaFileDefinition } from "../../../../types.js";
import { folderReadme } from "../../../../content/shared.js";

export const operationsProductAnalyticsSourceOfTruth = [
  "knowledge/tracking-plan.md",
  "knowledge/event-taxonomy.md",
  "knowledge/funnel-map.md",
  "knowledge/utm-attribution.md",
  "knowledge/tracking-privacy.md"
];

export const operationsProductAnalyticsFiles: AreaFileDefinition[] = [
  {
    path: "knowledge/README.md",
    content: () => folderReadme(
      "Product Analytics Knowledge",
      "Fonte da verdade para instrumentacao de produto, eventos, funis, UTMs, origem de lead e privacidade de tracking.",
      "Use quando uma Feature, experimento de Growth ou decisao de produto depender de evidencia comportamental.",
      "tracking-plan.md",
      ["tracking-plan.md", "event-taxonomy.md", "funnel-map.md", "utm-attribution.md", "tracking-privacy.md"],
      ["../roles/", "../skills/", "../playbooks/", "../../product-ops/knowledge/implementation-packets/", "../../../growth/marketing/knowledge/growth-experiments.md"],
      "Nao invente metricas. Registre somente eventos planejados, instrumentados ou reportados pelo founder, com fonte e status explicitos."
    )
  },
  { path: "knowledge/tracking-plan.md", content: trackingPlanKnowledge },
  { path: "knowledge/event-taxonomy.md", content: eventTaxonomyKnowledge },
  { path: "knowledge/funnel-map.md", content: funnelMapKnowledge },
  { path: "knowledge/utm-attribution.md", content: utmAttributionKnowledge },
  { path: "knowledge/tracking-privacy.md", content: trackingPrivacyKnowledge }
];

function trackingPlanKnowledge(): string {
  return `# Tracking Plan

## Propósito

Definir quais eventos, propriedades, fontes e estados de instrumentacao o produto usa para gerar evidencia de comportamento.

## Estado Atual

TBD

## Escopo

| Evento | Jornada | Momento | Propriedades | Status | Fonte |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | planned/instrumented/verified | TBD |

## Status de Instrumentacao

- planned: evento planejado, ainda nao implementado.
- instrumented: evento implementado, ainda sem verificacao de captura.
- verified: evento capturado e conferido em ferramenta, banco ou log aprovado.
- deprecated: evento antigo que nao deve orientar decisao nova.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function eventTaxonomyKnowledge(): string {
  return `# Event Taxonomy

## Propósito

Manter nomes, propriedades e convencoes de eventos consistentes para evitar metricas duplicadas, funil quebrado e leitura errada de produto.

## Estado Atual

TBD

## Naming Rules

- Use nomes orientados a comportamento observado, como \`lead_submitted\`, \`checkout_started\` ou \`invite_sent\`.
- Nao use nomes diferentes para o mesmo comportamento.
- Nao registre PII em propriedades de evento.

## Taxonomia

| Evento | Categoria | Funil | Propriedades Obrigatorias | Propriedades Proibidas |
| --- | --- | --- | --- | --- |
| TBD | acquisition/activation/engagement/revenue/retention | TBD | TBD | PII, secrets |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function funnelMapKnowledge(): string {
  return `# Funnel Map

## Propósito

Mapear funis de aquisicao, ativacao, receita e retencao para que decisoes usem conversao real ou lacunas declaradas.

## Estado Atual

TBD

## Funis

| Funil | Entrada | Passos | Conversao Esperada | Fonte de Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | draft/measured/blocked |

## Leitura de Conversão

- Diferencie volume, taxa de conversao e qualidade do lead.
- Nao compare canais sem janela de tempo e fonte de origem.
- Marque lacunas como desconhecidas quando a telemetria nao existir.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function utmAttributionKnowledge(): string {
  return `# UTM Attribution

## Propósito

Definir padrao de UTM, origem de lead, deduplicacao e leitura de canal para campanhas, landing pages e experimentos.

## Estado Atual

TBD

## Padrao UTM

| Campo | Regra | Exemplo | Obrigatorio |
| --- | --- | --- | --- |
| utm_source | origem do canal | google, linkedin, newsletter | sim |
| utm_medium | tipo de meio | cpc, social, email, referral | sim |
| utm_campaign | campanha ou experimento | mvp-waitlist-jul | sim |
| utm_content | variacao criativa | headline-a | opcional |
| utm_term | termo pago quando existir | crm-clinicas | opcional |

## Deduplicação

- Defina chave de deduplicacao antes de consolidar leads.
- Preserve primeira origem e ultima origem quando isso importar para vendas.
- Nao sobrescreva origem confirmada com dados incompletos.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function trackingPrivacyKnowledge(): string {
  return `# Tracking Privacy

## Propósito

Definir limites de privacidade para eventos, analytics, origem de lead, logs de campanha e qualquer dado comportamental.

## Estado Atual

TBD

## Regras de Privacidade

- Nao envie PII, segredos, dados sensiveis, mensagens privadas ou dados de cliente para eventos sem revisao.
- Use identificadores pseudonimos quando possivel.
- Marque consentimento, base legal ou decisao de nao aplicabilidade quando tracking publico estiver envolvido.
- Separe dados operacionais de suporte de dados de analytics.

## Dados Proibidos em Eventos

| Tipo | Exemplo | Risco | Rota |
| --- | --- | --- | --- |
| PII | email, telefone, documento | privacidade/LGPD | Security |
| segredo | token, API key | incidente | Security |
| dado sensivel | saude, pagamento, mensagem privada | exposicao | Security |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
