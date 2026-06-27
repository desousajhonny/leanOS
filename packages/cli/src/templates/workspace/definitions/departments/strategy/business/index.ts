import type { AreaDefinition } from "../../../../types.js";
import { strategyBusinessSourceOfTruth, strategyBusinessFiles } from "./files.js";
import { strategyBusinessRoles } from "./roles.js";
import { strategyBusinessSkills } from "./skills.js";
import { strategyBusinessPlaybooks } from "./playbooks.js";
import { strategyBusinessCommonPaths } from "./common-paths.js";

export const strategyBusinessArea: AreaDefinition = {
  key: "strategy.business",
  root: "strategy",
  slug: "business",
  name: "Business",
  path: "strategy/business",
  lead: {
    title: "Business Lead",
    purpose: "Route business identity, brand logic, mission, principles and operating model work."
  },
  routingKey: "business",
  requestTypes: "business, brand, mission, vision, principles, operating model, business model or revenue logic",
  purpose: "Keep business identity, principles, mission, operating decisions and business model coherent.",
  whenToUse: ["define business identity", "clarify mission", "capture principles", "define business model", "record strategic decisions"],
  sourceOfTruth: strategyBusinessSourceOfTruth,
  files: strategyBusinessFiles,
  roles: strategyBusinessRoles,
  skills: strategyBusinessSkills,
  playbooks: strategyBusinessPlaybooks,
  commonPaths: strategyBusinessCommonPaths
};
