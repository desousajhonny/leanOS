import type { SkillDefinition } from "../../../../types.js";

export const growthCustomerExperienceSkills: SkillDefinition[] = [
    {
      slug: "map-customer-feedback",
      title: "Map Customer Feedback",
      purpose: "Cluster feedback into product, support and growth signals.",
      useWhen: ["new customer feedback arrives", "feedback needs to inform roadmap or growth", "signals need clustering"],
      requiredContext: ["Customer feedback knowledge", "Product context when available", "Current roadmap when available"],
      inputs: ["Feedback", "Customer segment", "Source", "Frequency", "Impact"],
      process: ["Remove private details", "Cluster by problem or desired outcome", "Separate signal from opinion", "Identify product/growth/support impact", "Recommend next owner"],
      checks: ["No private customer data is stored", "Patterns are not overclaimed", "Roadmap impact is routed to Strategy/Roadmap"],
      outputs: ["Feedback clusters", "Learning themes", "Recommended next owner"],
      filesToUpdate: ["Update `../knowledge/customer-feedback.md` after explicit confirmation."],
      redLines: ["Do not invent evidence.", "Do not treat one-off feedback as validation."]
    },
    {
      slug: "synthesize-support-patterns",
      title: "Synthesize Support Patterns",
      purpose: "Turn support notes into learning and actions.",
      useWhen: ["support notes repeat", "onboarding friction appears", "retention or success patterns need synthesis"],
      requiredContext: ["Support notes", "Success moments", "Churn reasons"],
      inputs: ["Support notes", "Frequency", "Affected user segment", "Workarounds", "Outcome"],
      process: ["Identify recurring problems", "Separate product defects from education gaps", "Map friction to onboarding/product/growth", "Recommend next action"],
      checks: ["Sensitive support details removed", "Pattern has enough signal", "Owner is clear"],
      outputs: ["Support pattern summary", "Friction themes", "Recommended action"],
      filesToUpdate: ["Update `../knowledge/support-notes.md`, `../knowledge/success-moments.md` or `../knowledge/churn-reasons.md` after explicit confirmation."],
      redLines: ["Do not store secrets or customer private data.", "Do not promise fixes without Product Ops or Roadmap review."]
    }
  ];
