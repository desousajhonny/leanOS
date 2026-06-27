import type { AreaDefinition } from "../../../../types.js";
import { strategyProductSourceOfTruth, strategyProductFiles } from "./files.js";
import { strategyProductRoles } from "./roles.js";
import { strategyProductSkills } from "./skills.js";
import { strategyProductPlaybooks } from "./playbooks.js";
import { strategyProductCommonPaths } from "./common-paths.js";

export const strategyProductArea: AreaDefinition = {
  key: "strategy.product",
  root: "strategy",
  slug: "product",
  name: "Product",
  path: "strategy/product",
  lead: {
    title: "Product Lead",
    purpose: "Route product strategy work, choose the right product role and keep product decisions aligned with validation, roadmap and delivery scope."
  },
  routingKey: "product",
  requestTypes: "idea calibration, product strategy, product core, ICP, value proposition, MVP validation scope or positioning",
  purpose: "Own product strategy, product core, ICP, value proposition, MVP validation scope and positioning coherence.",
  whenToUse: ["start or calibrate a founder idea", "define product core", "clarify ICP", "shape value proposition", "define MVP validation scope", "check product coherence"],
  sourceOfTruth: strategyProductSourceOfTruth,
  files: strategyProductFiles,
  roles: strategyProductRoles,
  skills: strategyProductSkills,
  playbooks: strategyProductPlaybooks,
  commonPaths: strategyProductCommonPaths
};
