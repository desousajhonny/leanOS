import type { AreaDefinition } from "../../../../types.js";
import { growthCustomerExperienceSourceOfTruth, growthCustomerExperienceFiles } from "./files.js";
import { growthCustomerExperienceRoles } from "./roles.js";
import { growthCustomerExperienceSkills } from "./skills.js";
import { growthCustomerExperiencePlaybooks } from "./playbooks.js";
import { growthCustomerExperienceCommonPaths } from "./common-paths.js";

export const growthCustomerExperienceArea: AreaDefinition = {
  key: "growth.customer-experience",
  root: "growth",
  slug: "customer-experience",
  name: "Customer Experience",
  path: "growth/customer-experience",
  lead: {
    title: "Customer Experience Lead",
    purpose: "Route customer feedback, support patterns, success moments and churn signals into practical learning loops."
  },
  routingKey: "customer_experience",
  requestTypes: "customer feedback, support, onboarding, retention or success moments",
  purpose: "Own customer learning loops, support notes and experience feedback.",
  whenToUse: ["capture customer feedback", "analyze support notes", "understand churn", "document success moments"],
  operatingRules: [
    "Treat customer signals as evidence, not product decisions by themselves.",
    "Route product changes back to Strategy Product or Product Ops when feedback affects scope.",
    "Route plan, billing, limit or entitlement questions through Growth Finance `knowledge/pricing.md`.",
    "Mantenha feedback leve e útil para loops de aprendizado."
  ],
  redLines: [
    "Não armazene dados sensíveis de clientes, identificadores privados ou segredos de suporte nestes arquivos.",
    "Não trate um cliente barulhento como evidência validada de mercado.",
    "Não prometa plano, preço, desconto, trial, upgrade, limite ou entitlement fora do Pricing Catalog.",
    "Não prometa mudanças de roadmap sem confirmação de Strategy/Roadmap."
  ],
  sourceOfTruth: growthCustomerExperienceSourceOfTruth,
  files: growthCustomerExperienceFiles,
  roles: growthCustomerExperienceRoles,
  skills: growthCustomerExperienceSkills,
  playbooks: growthCustomerExperiencePlaybooks,
  commonPaths: growthCustomerExperienceCommonPaths
};
