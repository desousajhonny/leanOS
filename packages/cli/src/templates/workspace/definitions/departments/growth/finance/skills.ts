import type { SkillDefinition } from "../../../../types.js";

export const growthFinanceSkills: SkillDefinition[] = [
    {
      slug: "model-unit-economics",
      title: "Model Unit Economics",
      purpose: "Clarify acquisition, delivery and margin assumptions.",
      useWhen: ["unit economics are unclear", "pricing or acquisition cost needs rough evaluation", "growth spend is being considered"],
      requiredContext: ["Pricing", "Revenue model", "Budget", "Known costs"],
      inputs: ["Acquisition cost", "Delivery cost", "Price", "Gross margin", "Usage or value metric"],
      process: ["List assumptions", "Separate knowns from guesses", "Estimate unit economics directionally", "Identify sensitivity and missing evidence"],
      checks: ["Assumptions are explicit", "No false precision", "Risks are visible"],
      outputs: ["Unit economics summary", "Sensitive assumptions", "Risks", "Validation needs"],
      filesToUpdate: ["Update `../knowledge/unit-economics.md` after explicit confirmation."],
      redLines: ["Do not present estimates as validated facts.", "Do not make investment or accounting claims."]
    },
    {
      slug: "review-pricing",
      title: "Review Pricing",
      purpose: "Evaluate pricing hypotheses against customer value and costs.",
      useWhen: ["pricing is being considered", "packaging needs review", "willingness to pay is unclear"],
      requiredContext: ["Pricing", "Value proposition", "ICP", "Revenue model"],
      inputs: ["Target user", "Value created", "Pricing hypothesis", "Alternatives", "Costs"],
      process: ["Check value alignment", "Check package simplicity", "Identify willingness-to-pay assumptions", "List validation method"],
      checks: ["Pricing matches ICP/value", "Assumptions are not treated as proof", "Validation path exists"],
      outputs: ["Pricing review", "Risks", "Validation plan", "Open questions"],
      filesToUpdate: ["Update `../knowledge/pricing.md` or `../knowledge/revenue-model.md` after explicit confirmation."],
      redLines: ["Do not invent willingness-to-pay evidence.", "Do not promise revenue outcomes."]
    }
  ];
