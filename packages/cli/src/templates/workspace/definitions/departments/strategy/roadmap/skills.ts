import type { SkillDefinition } from "../../../../types.js";

export const strategyRoadmapSkills: SkillDefinition[] = [
    {
      slug: "roadmap",
      title: "Roadmap",
      purpose: "Sequence roadmap work by business outcome, product value, operating stage and delivery constraints.",
      useWhen: ["the founder needs a roadmap for a product_operating business", "growth_scaling requires sequencing across multiple priorities", "backlog candidates need Now/Next/Later/Not Planned classification"],
      requiredContext: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      inputs: ["Business stage", "Product strategy", "Business constraints", "Known risks", "Customer or validation signals", "Candidate work"],
      process: ["Clarify the roadmap objective.", "Confirm the business is `product_operating` or `growth_scaling`, or that the founder explicitly asks to sequence multiple priorities.", "Do not use Roadmap as the mandatory continuation of first MVP validation.", "Separate Now, Next, Later and Not Planned.", "Connect items to outcomes, customer signals and validation or operating signals.", "Identify delivery scope type, milestone and release goal only when confirmed later by Product Ops.", "Identify dependencies and risks.", "Propose updates before writing."],
      checks: ["Now items are small enough to reason about.", "Roadmap items are not vague wishes.", "Product is operating/scaling or the founder explicitly needs multi-priority sequencing.", "Delivery scope is not expanded silently.", "MVP-building items are routed to Product Ops scope/backlog instead of Roadmap when they affect current delivery."],
      outputs: ["Roadmap proposal", "Current cycle proposal", "Risks and dependencies", "Open questions"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md"],
      redLines: ["Do not commit future work without founder confirmation.", "Do not invent milestones or dates.", "Do not turn backlog candidates into committed scope silently."]
    },
    {
      slug: "backlog-prioritization",
      title: "Backlog Prioritization",
      purpose: "Prioritize candidate work by value, risk, evidence, effort and current cycle fit.",
      useWhen: ["backlog is unordered", "a new idea needs placement", "the current cycle needs sharper priority"],
      requiredContext: ["../knowledge/backlog.md", "../knowledge/current-cycle.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Candidate backlog items", "Product value", "Risk", "Effort", "Dependencies"],
      process: ["Group candidate work.", "Score by outcome value, risk reduction, effort and dependency.", "Recommend keep, park, split or discard.", "Update only after confirmation."],
      checks: ["Top items have a clear user or business outcome.", "Large items are flagged for epic breakdown.", "Dependencies are visible."],
      outputs: ["Prioritized backlog", "Parked items", "Items needing epic breakdown"],
      filesToUpdate: ["../knowledge/backlog.md", "../knowledge/current-cycle.md"],
      redLines: ["Do not use priority as permission to implement.", "Do not hide uncertainty.", "Do not remove backlog items without confirmation."]
    }
  ];
