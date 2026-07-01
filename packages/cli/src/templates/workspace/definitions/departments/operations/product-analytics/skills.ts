import type { SkillDefinition } from "../../../../types.js";

export const operationsProductAnalyticsSkills: SkillDefinition[] = [
  {
    slug: "tracking-plan",
    title: "Tracking Plan",
    purpose: "Define events, properties, trigger moments, verification method and instrumentation status for product behavior measurement.",
    useWhen: [
      "uma Feature precisa capturar comportamento de usuario, conversao ou ativacao",
      "Engineering precisa de requisitos de analytics antes de implementar eventos",
      "o tracking atual tem eventos planejados, instrumentados e verificados misturados"
    ],
    requiredContext: ["Product Analytics AGENT", "tracking-plan.md", "event-taxonomy.md", "tracking-privacy.md", "Feature implementation packet when available"],
    inputs: ["Feature goal", "User action", "Event trigger", "Required properties", "Verification method", "Privacy notes"],
    process: [
      "Identify the behavior decision the event must support.",
      "List proposed events with trigger moment, required properties, optional properties and owner.",
      "Mark each event as planned, instrumented, verified, deprecated or blocked.",
      "Define how Engineering or Product Analytics will verify capture after implementation.",
      "Route privacy-sensitive properties to `tracking-privacy` and Security before approval."
    ],
    checks: ["Every event has a clear trigger moment", "Required properties are minimal", "Verification method is explicit", "Status is not overstated", "No PII, secrets or sensitive data are included"],
    outputs: ["Tracking plan update", "Event list", "Instrumentation status", "Verification notes", "Blocked analytics gaps"],
    filesToUpdate: ["Update `../knowledge/tracking-plan.md` only after confirmation.", "Update the Feature implementation packet analytics section only after confirmation."],
    redLines: ["Não trate evento planejado como verificado.", "Não crie eventos para curiosidade sem decisão associada.", "Não coloque PII ou segredos em propriedades."]
  },
  {
    slug: "event-taxonomy",
    title: "Event Taxonomy",
    purpose: "Keep event names, categories and properties consistent so product and Growth do not create conflicting metrics.",
    useWhen: [
      "novos eventos precisam de nomes consistentes antes de entrar no tracking plan",
      "dois eventos parecem medir o mesmo comportamento com nomes diferentes",
      "um funil ou experimento precisa comparar eventos sem ambiguidade"
    ],
    requiredContext: ["Product Analytics AGENT", "event-taxonomy.md", "tracking-plan.md", "funnel-map.md"],
    inputs: ["Proposed event names", "Existing taxonomy", "Funnel step", "Properties", "Product behavior being measured"],
    process: [
      "Normalize the behavior being measured before naming the event.",
      "Check existing events for duplicates, aliases or conflicting semantics.",
      "Assign category, funnel relationship and required properties.",
      "Document naming decision and deprecated aliases when needed.",
      "Return the approved event name or a blocked-by-ambiguity decision."
    ],
    checks: ["Event name describes observed behavior", "No duplicate event exists", "Properties are consistent with taxonomy", "Funnel relationship is explicit", "Deprecated aliases are visible"],
    outputs: ["Approved event name", "Taxonomy update", "Duplicate or alias decision", "Funnel relationship", "Open naming gaps"],
    filesToUpdate: ["Update `../knowledge/event-taxonomy.md` only after confirmation.", "Update `../knowledge/tracking-plan.md` only when event status changes."],
    redLines: ["Não criar dois nomes para o mesmo comportamento.", "Não usar evento vago como `clicked` sem objeto e contexto.", "Não incluir PII em propriedades obrigatórias."]
  },
  {
    slug: "funnel-analysis",
    title: "Funnel Analysis",
    purpose: "Interpret funnel evidence by separating volume, conversion, quality, attribution and missing instrumentation.",
    useWhen: [
      "o founder quer decidir com base em conversao, ativacao, trial, venda ou retencao",
      "Growth trouxe resultado de landing page, campanha ou launch que precisa de leitura de funil",
      "Product Ops precisa saber se um gargalo de funil deve virar Epic, Feature ou experimento"
    ],
    requiredContext: ["Product Analytics AGENT", "funnel-map.md", "tracking-plan.md", "utm-attribution.md", "Growth experiment when available"],
    inputs: ["Funnel steps", "Counts or manual result", "Time window", "Channel or source", "Known instrumentation gaps"],
    process: [
      "Confirm the funnel and time window before interpreting numbers.",
      "Separate traffic volume, step conversion, lead quality and retention signal.",
      "Check whether the data is verified, manual, directional, incomplete or polluted.",
      "Identify the highest-leverage gap without pretending causality.",
      "Recommend continue, iterate, stop, instrument or investigate with the evidence level clearly stated."
    ],
    checks: ["Source and window are explicit", "Manual evidence is labeled", "Conversion is not confused with lead quality", "Missing instrumentation is visible", "No causality is claimed without evidence"],
    outputs: ["Funnel evidence summary", "Conversion reading", "Quality notes", "Instrumentation gaps", "Decision recommendation"],
    filesToUpdate: ["Update `../knowledge/funnel-map.md` only after confirmation.", "Update Growth experiment notes only through Growth and after confirmation."],
    redLines: ["Não invente taxa de conversao.", "Não declare canal vencedor com amostra insuficiente.", "Não trate dado manual como telemetria verificada."]
  },
  {
    slug: "utm-attribution",
    title: "UTM Attribution",
    purpose: "Define UTM naming, lead-source handling and deduplication rules so Growth evidence remains comparable.",
    useWhen: [
      "uma landing page, campanha ou experimento precisa de UTM e origem de lead",
      "leads duplicados, origem inicial e ultima origem precisam de regra",
      "Growth quer comparar canais sem perder consistencia de attribution"
    ],
    requiredContext: ["Product Analytics AGENT", "utm-attribution.md", "funnel-map.md", "Growth acquisition channels"],
    inputs: ["Campaign", "Channel", "UTM values", "Lead capture path", "Deduplication key", "First-touch or last-touch need"],
    process: [
      "Map the campaign to source, medium, campaign, content and term.",
      "Define lead-source fields and whether first-touch, last-touch or both are needed.",
      "Define deduplication key and conflict handling.",
      "Check whether missing UTM values should block the comparison or be labeled unknown.",
      "Return attribution rules and Growth handoff."
    ],
    checks: ["UTM source, medium and campaign are defined", "Lead-source preservation is explicit", "Deduplication rule is explicit", "Unknown source is allowed only when labeled", "No PII is exposed in UTM values"],
    outputs: ["UTM pattern", "Lead-source rule", "Deduplication rule", "Attribution gaps", "Growth handoff"],
    filesToUpdate: ["Update `../knowledge/utm-attribution.md` only after confirmation.", "Update Growth acquisition channels only through Growth and after confirmation."],
    redLines: ["Não sobrescreva origem confirmada com dado incompleto.", "Não coloque PII em UTMs.", "Não compare canais sem attribution minima."]
  },
  {
    slug: "tracking-privacy",
    title: "Tracking Privacy",
    purpose: "Check analytics events, properties, lead-source data and logs for privacy, PII and sensitive-data risk.",
    useWhen: [
      "eventos, propriedades, logs ou analytics podem conter PII, dados sensiveis ou dados de cliente",
      "tracking publico, campanha ou lead capture precisa de limite de privacidade",
      "Security precisa receber um resumo claro do risco de analytics antes de revisar"
    ],
    requiredContext: ["Product Analytics AGENT", "tracking-privacy.md", "tracking-plan.md", "Security baseline when active"],
    inputs: ["Events", "Properties", "Data categories", "Consent or privacy note", "Customer-data boundary", "Destination tools"],
    process: [
      "Classify each property as public config, behavioral data, PII, sensitive data, secret or customer data.",
      "Remove or pseudonymize unnecessary identifiers.",
      "Check destination tools, logs and exports for exposure risk.",
      "Route unresolved privacy, LGPD, sensitive-data or customer-boundary questions to Security.",
      "Return allowed, needs-redaction, blocked-by-privacy or security-review-required."
    ],
    checks: ["No secret enters analytics", "PII is removed or explicitly routed", "Sensitive data is blocked until Security reviews", "Destination and retention questions are visible", "Customer data boundary is respected"],
    outputs: ["Privacy decision", "Allowed properties", "Blocked properties", "Security routing note", "Tracking privacy update"],
    filesToUpdate: ["Update `../knowledge/tracking-privacy.md` only after confirmation.", "Update Security notes only through Security and after confirmation."],
    redLines: ["Não aprove tracking com PII sem revisão.", "Não registre segredos, mensagens privadas ou dados sensíveis em analytics.", "Não assuma consentimento ou base legal quando desconhecido."]
  }
];
