import type { RootDepartmentDefinition } from "../../types.js";
import { strategyBusinessArea } from "./areas/strategy-business.js";
import { strategyProductArea } from "./areas/strategy-product.js";
import { strategyRoadmapArea } from "./areas/strategy-roadmap.js";

export const strategyDepartment: RootDepartmentDefinition = {
  key: "strategy",
  name: "Strategy",
  purpose: "Own business direction, product strategy, roadmap and validation learning.",
  requestTypes: "business, product strategy, roadmap, validation, ICP or assumptions",
  areas: [strategyBusinessArea, strategyProductArea, strategyRoadmapArea],
  workflows: []
};
