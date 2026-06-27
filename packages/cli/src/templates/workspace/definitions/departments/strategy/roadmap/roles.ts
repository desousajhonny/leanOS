import type { RoleDefinition } from "../../../../types.js";

export const strategyRoadmapRoles: RoleDefinition[] = [
    {
      slug: "roadmap-planner",
      title: "Roadmap Planner",
      purpose: "Turn business, product and operating constraints into a coherent roadmap and cycle plan.",
      useWhen: ["roadmap order is unclear", "backlog needs prioritization", "cycle planning is needed", "the business is product_operating or growth_scaling"],
      beforeActing: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      skills: ["roadmap", "backlog-prioritization"],
      playbooks: ["roadmap-cycle-planning"]
    }
  ];
