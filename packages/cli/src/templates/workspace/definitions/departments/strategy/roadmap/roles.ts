import type { RoleDefinition } from "../../../../types.js";

export const strategyRoadmapRoles: RoleDefinition[] = [
    {
      slug: "roadmap-planner",
      title: "Roadmap Planner",
      purpose: "Transforme restrições de negócio, produto e operação em um roadmap e plano de ciclo coerentes.",
      useWhen: ["a ordem do roadmap não está clara", "o backlog precisa de priorização", "planejamento de ciclo é necessário", "o negócio está em product_operating ou growth_scaling"],
      beforeActing: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      skills: ["roadmap", "backlog-prioritization"],
      playbooks: ["roadmap-cycle-planning"]
    }
  ];
