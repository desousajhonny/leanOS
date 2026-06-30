import type { AreaDefinition } from "../../../../types.js";
import { growthMarketingSourceOfTruth, growthMarketingFiles } from "./files.js";
import { growthMarketingRoles } from "./roles.js";
import { growthMarketingSkills } from "./skills.js";
import { growthMarketingPlaybooks } from "./playbooks.js";
import { growthMarketingCommonPaths } from "./common-paths.js";

export const growthMarketingArea: AreaDefinition = {
  key: "growth.marketing",
  root: "growth",
  slug: "marketing",
  name: "Marketing",
  path: "growth/marketing",
  lead: {
    title: "Marketing Lead",
    purpose: "Route positioning, landing page copy, acquisition experiments and launch planning without turning early growth into heavy process."
  },
  routingKey: "marketing",
  requestTypes: "positioning, landing page, launch, acquisition or marketing",
  purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
  whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
  operatingRules: [
    "Use Strategy Product as the source for ICP, problem, value proposition and positioning claims.",
    "Use Growth Finance `knowledge/pricing.md` as the source for plans, prices, trials, discounts, limits and entitlements.",
    "Route visual design or UI structure to Operations Design when needed.",
    "Mantenha planos de lançamento focados em aprendizado, não em atividade de vaidade."
  ],
  redLines: [
    "Não invente prova, depoimentos ou resultados de clientes.",
    "Não invente nomes, preços, trials, descontos, limites ou entitlements de plano.",
    "Não crie direção de design visual sem Design quando detalhes de UX/brand importarem.",
    "Não gaste orçamento nem comprometa canais sem revisão de Finance quando houver dinheiro envolvido."
  ],
  sourceOfTruth: growthMarketingSourceOfTruth,
  files: growthMarketingFiles,
  roles: growthMarketingRoles,
  skills: growthMarketingSkills,
  playbooks: growthMarketingPlaybooks,
  commonPaths: growthMarketingCommonPaths
};
