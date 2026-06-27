import type { AreaDefinition } from "../../../../types.js";
import { strategyRoadmapSourceOfTruth, strategyRoadmapFiles } from "./files.js";
import { strategyRoadmapRoles } from "./roles.js";
import { strategyRoadmapSkills } from "./skills.js";
import { strategyRoadmapPlaybooks } from "./playbooks.js";
import { strategyRoadmapCommonPaths } from "./common-paths.js";

export const strategyRoadmapArea: AreaDefinition = {
  key: "strategy.roadmap",
  root: "strategy",
  slug: "roadmap",
  name: "Roadmap",
  path: "strategy/roadmap",
  lead: {
    title: "Roadmap Lead",
    purpose: "Route roadmap planning, prioritization and cycle planning."
  },
  routingKey: "roadmap",
  requestTypes: "roadmap, milestones, backlog, cycle planning, prioritization or operating product sequencing",
  purpose: "Own roadmap sequence, milestones, backlog and planning-cycle prioritization for operating or scaling products.",
  whenToUse: ["sequence product work for product_operating or growth_scaling", "prioritize multiple backlog candidates", "define current cycle", "plan milestones"],
  sourceOfTruth: strategyRoadmapSourceOfTruth,
  files: strategyRoadmapFiles,
  roles: strategyRoadmapRoles,
  skills: strategyRoadmapSkills,
  playbooks: strategyRoadmapPlaybooks,
  commonPaths: strategyRoadmapCommonPaths
};
