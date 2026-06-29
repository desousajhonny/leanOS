import type { AreaDefinition } from "../../../../types.js";
import { growthFinanceSourceOfTruth, growthFinanceFiles } from "./files.js";
import { growthFinanceRoles } from "./roles.js";
import { growthFinanceSkills } from "./skills.js";
import { growthFinancePlaybooks } from "./playbooks.js";
import { growthFinanceCommonPaths } from "./common-paths.js";

export const growthFinanceArea: AreaDefinition = {
  key: "growth.finance",
  root: "growth",
  slug: "finance",
  name: "Finance",
  path: "growth/finance",
  lead: {
    title: "Finance Lead",
    purpose: "Route pricing, revenue model, unit economics, budget and finance-risk questions without overbuilding finance operations."
  },
  routingKey: "finance",
  requestTypes: "pricing, revenue model, budget, unit economics or finance",
  purpose: "Own pricing, revenue model, unit economics, budget and financial risks.",
  whenToUse: ["define pricing", "review unit economics", "track budget", "reason about revenue model"],
  operatingRules: [
    "Mantenha Finance leve e orientado por hipóteses no MVP.",
    "Route pricing assumptions back to Strategy Product when they affect positioning or value proposition.",
    "Route paid acquisition or spend decisions back to Marketing/Founder before committing."
  ],
  redLines: [
    "Não apresente pricing não validado como fato.",
    "Não faça alegações de aconselhamento contábil, fiscal, jurídico ou de investimento.",
    "Não comprometa gasto, previsão de receita ou afirmações de runway sem confirmação explícita do founder."
  ],
  sourceOfTruth: growthFinanceSourceOfTruth,
  files: growthFinanceFiles,
  roles: growthFinanceRoles,
  skills: growthFinanceSkills,
  playbooks: growthFinancePlaybooks,
  commonPaths: growthFinanceCommonPaths
};
