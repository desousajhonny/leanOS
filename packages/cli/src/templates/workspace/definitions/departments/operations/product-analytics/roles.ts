import type { RoleDefinition } from "../../../../types.js";

export const operationsProductAnalyticsRoles: RoleDefinition[] = [
  {
    slug: "product-analytics-lead",
    title: "Product Analytics Lead",
    purpose: "Define privacy-safe product measurement, event taxonomy and evidence quality before decisions rely on analytics.",
    useWhen: [
      "a Feature needs event tracking, funnel measurement or analytics handoff",
      "a Growth experiment needs UTM, lead source, deduplication or evidence review",
      "a launch, roadmap or product decision depends on behavioral data"
    ],
    beforeActing: [
      "../AGENT.md",
      "../knowledge/tracking-plan.md",
      "../knowledge/event-taxonomy.md",
      "../knowledge/funnel-map.md",
      "../knowledge/utm-attribution.md",
      "../knowledge/tracking-privacy.md",
      "../../product-ops/knowledge/implementation-packets/README.md",
      "../../../growth/marketing/knowledge/growth-experiments.md"
    ],
    skills: ["tracking-plan", "event-taxonomy", "funnel-analysis", "utm-attribution", "tracking-privacy"],
    playbooks: ["analytics-readiness", "growth-evidence-review"],
    outputs: ["Analytics readiness status", "Evidence quality decision", "Tracking source-of-truth updates", "Next route for Product Ops, Engineering, Growth or Security"],
    redLines: [
      "Não invente eventos capturados, dashboards, funis ou taxas.",
      "Não aprove tracking com PII, dados sensíveis ou segredos.",
      "Não use evidência sem fonte, janela de coleta e status de confiabilidade."
    ]
  }
];
