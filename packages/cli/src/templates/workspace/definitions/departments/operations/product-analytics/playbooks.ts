import type { PlaybookDefinition } from "../../../../types.js";

export const operationsProductAnalyticsPlaybooks: PlaybookDefinition[] = [
  {
    slug: "analytics-readiness",
    title: "Analytics Readiness",
    purpose: "Prepare analytics requirements before a Feature, release or implementation depends on product behavior data.",
    useWhen: [
      "uma Feature precisa capturar eventos, funil ou comportamento de usuario antes de Engineering implementar",
      "Product Ops precisa decidir se analytics e aplicavel no implementation packet",
      "Engineering precisa de nomes de eventos, propriedades, privacidade e criterio de verificacao antes de codar"
    ],
    beforeActing: ["../AGENT.md", "../knowledge/tracking-plan.md", "../knowledge/event-taxonomy.md", "../knowledge/funnel-map.md", "../knowledge/tracking-privacy.md", "../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md when available"],
    inputs: ["Feature or release candidate", "Acceptance criteria", "Existing tracking plan", "Event taxonomy", "Funnel map", "Tracking privacy rules", "Engineering implementation context"],
    steps: [
      "Identify the product behavior decision the analytics must support.",
      "Check whether the Feature needs new events, changed events, new properties, funnel measurement or no analytics.",
      "Use `skills/tracking-plan/SKILL.md` to define event capture requirements and status.",
      "Use `skills/event-taxonomy/SKILL.md` to prevent duplicate event names and conflicting properties.",
      "Use `skills/tracking-privacy/SKILL.md` when PII, consent, sensitive data, customer data or logs could be involved.",
      "Write the analytics handoff into the Feature implementation packet before Engineering when the Feature is concrete.",
      "Route Engineering only after event names, properties, verification method and privacy status are explicit.",
      "Route Security if privacy or sensitive-data risk is unresolved."
    ],
    gates: [
      "Every proposed event has name, trigger moment, required properties, status and verification method.",
      "No analytics requirement includes PII, secrets, sensitive data or customer data without Security routing.",
      "Engineering handoff distinguishes planned, instrumented and verified events.",
      "The Feature implementation packet references the analytics source-of-truth files when analytics applies."
    ],
    outputs: ["Analytics readiness result", "Tracking requirements", "Event taxonomy decisions", "Privacy status", "Engineering handoff", "Blocking gaps"],
    filesToUpdate: [
      "Update `../knowledge/tracking-plan.md` only after confirmation.",
      "Update `../knowledge/event-taxonomy.md` only after confirmation.",
      "Update `../knowledge/funnel-map.md` only after confirmation.",
      "Update `../knowledge/tracking-privacy.md` only after confirmation.",
      "Update `../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md` only when the Feature packet exists and the founder confirms."
    ],
    stopConditions: [
      "Stop if the request asks for analytics conclusions but no evidence source exists.",
      "Stop if event capture would include PII, sensitive data or customer data before Security review.",
      "Stop before Engineering when event names, properties or verification method are unclear."
    ],
    redLines: [
      "Não invente eventos capturados, dashboards, taxas ou resultados.",
      "Não envie dados sensíveis para analytics.",
      "Não deixe Engineering implementar tracking sem taxonomia e privacidade explícitas.",
      "Não trate analytics como Growth evidence enquanto a instrumentação não for verificada."
    ]
  },
  {
    slug: "growth-evidence-review",
    title: "Growth Evidence Review",
    purpose: "Evaluate whether Growth experiments, landing pages or launches have enough analytics evidence to support a product or marketing decision.",
    useWhen: [
      "Growth trouxe resultado de experimento, landing page, campanha ou launch que precisa virar decisao",
      "lead source, UTM, funil ou conversao precisam ser interpretados antes de mudar roadmap ou marketing",
      "o founder colou resultados manuais e precisa separar evidencia, lacuna e proxima acao"
    ],
    beforeActing: ["../AGENT.md", "../knowledge/funnel-map.md", "../knowledge/utm-attribution.md", "../knowledge/tracking-plan.md", "../../../growth/marketing/knowledge/growth-experiments.md", "../../../growth/marketing/knowledge/acquisition-channels.md"],
    inputs: ["Growth experiment", "Manual result input", "UTM source", "Lead-source data", "Funnel map", "Tracking status", "Decision requested"],
    steps: [
      "Identify the exact Growth experiment or feedback record behind the request.",
      "Use `skills/funnel-analysis/SKILL.md` to separate volume, conversion, quality and missing data.",
      "Use `skills/utm-attribution/SKILL.md` to check UTM, lead source and deduplication quality.",
      "Check whether events are planned, instrumented, verified or manually reported.",
      "Classify evidence as usable, directional, insufficient, polluted or not-applicable.",
      "Return the evidence decision to Growth with the smallest next action: continue, iterate, stop, instrument or request more data.",
      "Route Strategy or Product Ops only when the evidence changes ICP, promise, roadmap, Epic, Feature or launch readiness."
    ],
    gates: [
      "Every decision names the source of evidence and collection window.",
      "Manual results are allowed only when labeled as founder-reported or manually collected.",
      "UTM and lead-source quality are explicit before channel conclusions.",
      "No roadmap or pricing decision is made from insufficient evidence."
    ],
    outputs: ["Evidence quality classification", "Funnel reading", "UTM and lead-source reading", "Decision recommendation", "Gaps", "Next route"],
    filesToUpdate: [
      "Update `../knowledge/funnel-map.md` only after confirmation.",
      "Update `../knowledge/utm-attribution.md` only after confirmation.",
      "Update `../../../growth/marketing/knowledge/growth-experiments.md` only after Growth routing and confirmation."
    ],
    stopConditions: [
      "Stop if no experiment, launch, campaign, support signal or manual result exists.",
      "Stop if the request asks for a conclusion but evidence is missing or polluted.",
      "Stop if the evidence would expose customer data or PII."
    ],
    redLines: [
      "Não transformar opinião em evidência.",
      "Não inferir canal vencedor sem UTM, origem ou janela de coleta.",
      "Não atualizar Growth, roadmap ou Feature status sem confirmação.",
      "Não ocultar lacunas de instrumentação."
    ]
  }
];
