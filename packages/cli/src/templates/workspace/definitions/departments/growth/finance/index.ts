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
    "Keep finance lightweight and hypothesis-driven for MVP.",
    "Route pricing assumptions back to Strategy Product when they affect positioning or value proposition.",
    "Route paid acquisition or spend decisions back to Marketing/Founder before committing."
  ],
  redLines: [
    "Do not present unvalidated pricing as fact.",
    "Do not make accounting, tax, legal or investment advice claims.",
    "Do not commit spend, revenue forecast or runway claims without explicit founder confirmation."
  ],
  sourceOfTruth: growthFinanceSourceOfTruth,
  files: growthFinanceFiles,
  roles: growthFinanceRoles,
  skills: growthFinanceSkills,
  playbooks: growthFinancePlaybooks,
  commonPaths: growthFinanceCommonPaths
};
