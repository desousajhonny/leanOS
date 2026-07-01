import type { AreaDefinition } from "../../../../types.js";
import { operationsProductAnalyticsSourceOfTruth, operationsProductAnalyticsFiles } from "./files.js";
import { operationsProductAnalyticsRoles } from "./roles.js";
import { operationsProductAnalyticsSkills } from "./skills.js";
import { operationsProductAnalyticsPlaybooks } from "./playbooks.js";
import { operationsProductAnalyticsCommonPaths } from "./common-paths.js";

export const operationsProductAnalyticsArea: AreaDefinition = {
  key: "operations.product-analytics",
  root: "operations",
  slug: "product-analytics",
  name: "Product Analytics",
  path: "operations/product-analytics",
  lead: {
    title: "Product Analytics Lead",
    purpose: "Route event taxonomy, tracking plan, funnel evidence, UTM attribution and privacy-safe analytics before Product, Growth or Engineering decisions use metrics."
  },
  routingKey: "product_analytics",
  requestTypes: "product analytics, events, funnels, UTM attribution, lead source, tracking privacy or growth evidence",
  purpose: "Own privacy-safe product measurement and analytics evidence for product, delivery and growth decisions.",
  whenToUse: [
    "a Feature needs events, funnel metrics or tracking requirements before Engineering",
    "a Growth experiment needs UTM, lead-source or attribution rules",
    "a launch or product decision depends on analytics evidence",
    "tracking could expose PII, customer data or sensitive behavior"
  ],
  operatingRules: [
    "Use Product Analytics as the source of truth for event names, funnel steps, UTM rules and analytics privacy.",
    "Route implementation of event capture to Engineering only after analytics requirements are explicit.",
    "Route privacy, PII, consent, sensitive data and customer-data-boundary risk to Security before tracking is approved.",
    "Route campaign, landing-page and experiment interpretation back to Growth after evidence quality is known.",
    "If this area is inactive and a request needs events, funnel evidence, UTM, lead source or tracking privacy, return `activation_required: operations.product-analytics`."
  ],
  redLines: [
    "Não invente métricas, taxas de conversão, eventos capturados ou resultados de experimento.",
    "Não trate evento planejado como evento instrumentado ou verificado.",
    "Não registre PII, segredos, dados sensíveis ou mensagens privadas em eventos, logs ou analytics.",
    "Não deixe Growth, Product Ops ou Engineering criarem nomes de eventos conflitantes fora da taxonomia.",
    "Não use dados de analytics sem fonte, janela de tempo e status de confiabilidade."
  ],
  sourceOfTruth: operationsProductAnalyticsSourceOfTruth,
  files: operationsProductAnalyticsFiles,
  roles: operationsProductAnalyticsRoles,
  skills: operationsProductAnalyticsSkills,
  playbooks: operationsProductAnalyticsPlaybooks,
  commonPaths: operationsProductAnalyticsCommonPaths
};
