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
    "Keep feedback lightweight and useful for learning loops."
  ],
  redLines: [
    "Do not store sensitive customer data, private identifiers or support secrets in these files.",
    "Do not treat one loud customer as validated market evidence.",
    "Do not promise roadmap changes without Strategy/Roadmap confirmation."
  ],
  sourceOfTruth: growthCustomerExperienceSourceOfTruth,
  files: growthCustomerExperienceFiles,
  roles: growthCustomerExperienceRoles,
  skills: growthCustomerExperienceSkills,
  playbooks: growthCustomerExperiencePlaybooks,
  commonPaths: growthCustomerExperienceCommonPaths
};
