import type { AreaDefinition } from "../../../../types.js";
import { operationsDesignSourceOfTruth, operationsDesignFiles } from "./files.js";
import { operationsDesignRoles } from "./roles.js";
import { operationsDesignSkills } from "./skills.js";
import { operationsDesignPlaybooks } from "./playbooks.js";
import { operationsDesignCommonPaths } from "./common-paths.js";

export const operationsDesignArea: AreaDefinition = {
  key: "operations.design",
  root: "operations",
  slug: "design",
  name: "Design",
  path: "operations/design",
  lead: {
    title: "UX Lead",
    purpose: "Lead Design work, choose the right design specialist and keep design decisions aligned with Product, MVP and implementation needs."
  },
  routingKey: "design",
  requestTypes: "screens, flows, UX, UI, onboarding or usability",
  purpose: "Own the MVP design foundation, accessibility baseline and user-flow clarity before implementation.",
  whenToUse: ["define design foundation", "map user flows", "define accessibility baseline", "design onboarding", "reason about usability"],
  sourceOfTruth: operationsDesignSourceOfTruth,
  files: operationsDesignFiles,
  roles: operationsDesignRoles,
  skills: operationsDesignSkills,
  playbooks: operationsDesignPlaybooks,
  commonPaths: operationsDesignCommonPaths
};
