import type { PlaybookDefinition } from "../../../../types.js";

export const growthCustomerExperiencePlaybooks: PlaybookDefinition[] = [
    {
      slug: "customer-learning-loop",
      title: "Customer Learning Loop",
      purpose: "Turn customer experience signals into next actions without overbuilding process.",
      inputs: ["Customer feedback", "Support notes", "Success moments", "Churn reasons", "Current product/roadmap context when available"],
      steps: ["Read Customer Experience AGENT and choose CX Lead", "Use `skills/map-customer-feedback/SKILL.md` to cluster feedback", "Use `skills/synthesize-support-patterns/SKILL.md` when support patterns exist", "Identify friction, success moments and churn risks", "Route product changes to Strategy/Product or Product Ops when needed", "Route messaging/launch implications to Marketing when needed"],
      outputs: ["Learning summary", "Customer signal clusters", "Recommended product/growth/support follow-up", "Open questions"],
      filesToUpdate: ["Update `../knowledge/customer-feedback.md`, `../knowledge/support-notes.md`, `../knowledge/success-moments.md` or `../knowledge/churn-reasons.md` after explicit confirmation."]
    }
  ];
