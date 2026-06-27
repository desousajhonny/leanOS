import type { AreaDefinition } from "../../../../types.js";
import { operationsProductOpsSourceOfTruth, operationsProductOpsFiles } from "./files.js";
import { operationsProductOpsRoles } from "./roles.js";
import { operationsProductOpsSkills } from "./skills.js";
import { operationsProductOpsPlaybooks } from "./playbooks.js";
import { operationsProductOpsCommonPaths } from "./common-paths.js";

export const operationsProductOpsArea: AreaDefinition = {
  key: "operations.product-ops",
  root: "operations",
  slug: "product-ops",
  name: "Product Ops",
  path: "operations/product-ops",
  lead: {
    title: "Product Ops Lead",
    purpose: "Route delivery scope, epic shaping, issue readiness and delivery-boundary work before Engineering starts implementation."
  },
  routingKey: "product_ops",
  requestTypes: "MVP backlog, delivery scope, acceptance criteria, epics, features, issue readiness or delivery boundaries",
  purpose: "Turn approved Strategy validation plans into MVP backlog, delivery scope, acceptance criteria and implementation-ready work.",
  whenToUse: ["record MVP backlog", "shape acceptance criteria", "break epics into features", "check issue readiness", "coordinate delivery scope"],
  sourceOfTruth: operationsProductOpsSourceOfTruth,
  files: operationsProductOpsFiles,
  roles: operationsProductOpsRoles,
  skills: operationsProductOpsSkills,
  playbooks: operationsProductOpsPlaybooks,
  commonPaths: operationsProductOpsCommonPaths
};
