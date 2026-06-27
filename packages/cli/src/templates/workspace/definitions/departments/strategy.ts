import type { RootDepartmentDefinition } from "../../types.js";
import { strategyBusinessArea } from "./strategy/business/index.js";
import { strategyProductArea } from "./strategy/product/index.js";
import { strategyRoadmapArea } from "./strategy/roadmap/index.js";

export const strategyDepartment: RootDepartmentDefinition = {
  key: "strategy",
  name: "Strategy",
  purpose: "Own business direction, product strategy, roadmap and validation learning.",
  requestTypes: "business, product strategy, roadmap, validation, ICP or assumptions",
  areas: [strategyBusinessArea, strategyProductArea, strategyRoadmapArea],
  workflows: []
};
