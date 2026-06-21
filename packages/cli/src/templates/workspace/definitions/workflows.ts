import type { WorkflowDefinition } from "../types.js";

export const workflowDefinitions: WorkflowDefinition[] = [
  {
    slug: "new-product-mvp-validation",
    purpose: "Move from product strategy to MVP scope and validation plan.",
    requiredSubareas: ["strategy.product", "strategy.validation", "operations.core"],
    steps: ["Route to Strategy Product", "Define ICP", "Route to Operations Core", "Define MVP", "Route to Strategy Validation", "Plan experiment"]
  },
  {
    slug: "issue-to-pr",
    purpose: "Move from scoped MVP work to implementation and PR readiness.",
    requiredSubareas: ["operations.core", "operations.engineering"],
    steps: ["Route to Operations Core", "Confirm scope", "Route to Engineering", "Plan implementation", "Write tests", "Create PR"]
  },
  {
    slug: "launch-and-learn",
    purpose: "Launch, capture feedback and convert learning into the next cycle.",
    requiredSubareas: ["growth.marketing", "strategy.validation"],
    steps: ["Route to Growth Marketing", "Create launch plan", "Route to Strategy Validation", "Capture learning", "Recommend next action"]
  }
];
