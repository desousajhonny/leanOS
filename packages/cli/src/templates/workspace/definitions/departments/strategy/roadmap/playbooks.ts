import type { PlaybookDefinition } from "../../../../types.js";

export const strategyRoadmapPlaybooks: PlaybookDefinition[] = [
    {
      slug: "roadmap-cycle-planning",
      title: "Roadmap Cycle Planning",
      purpose: "Plan the next coherent roadmap cycle from product strategy, operating constraints and known risks.",
      inputs: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      steps: ["Load the Roadmap AGENT and Roadmap Planner role.", "Use only when the product is `product_operating` or `growth_scaling`, or when the founder explicitly asks to sequence multiple priorities.", "If the business is `mvp_building` or `mvp_live_learning`, route the idea to `activation_required: operations.product-ops` for MVP scope, backlog or delivery planning.", "Review product strategy, customer signals and validation notes.", "Review backlog candidates.", "Choose Now, Next, Later and Not Planned boundaries.", "Define current cycle goal and success criteria.", "Propose updates and wait for confirmation before writing."],
      outputs: ["Roadmap cycle summary", "Current cycle proposal", "Backlog changes", "Milestone follow-up"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md"]
    }
  ];
