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
  requestTypes: "roadmap, milestones, backlog, planejamento de ciclo, priorização ou sequenciamento de produto operando",
  purpose: "Possui sequência de roadmap, milestones, backlog e priorização de ciclo de planejamento para produtos operando ou escalando.",
  whenToUse: ["sequenciar trabalho de produto para product_operating ou growth_scaling", "priorizar múltiplos candidatos de backlog", "definir ciclo atual", "planejar milestones"],
  sourceOfTruth: strategyRoadmapSourceOfTruth,
  files: strategyRoadmapFiles,
  roles: strategyRoadmapRoles,
  skills: strategyRoadmapSkills,
  playbooks: strategyRoadmapPlaybooks,
  commonPaths: strategyRoadmapCommonPaths
};
