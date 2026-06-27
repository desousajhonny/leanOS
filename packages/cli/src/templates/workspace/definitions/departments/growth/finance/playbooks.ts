import type { PlaybookDefinition } from "../../../../types.js";

export const growthFinancePlaybooks: PlaybookDefinition[] = [
    {
      slug: "finance-review",
      title: "Finance Review",
      purpose: "Review business assumptions and financial risk.",
      inputs: ["Pricing", "Revenue model", "Unit economics", "Budget", "Finance risks"],
      steps: ["Read Finance AGENT and choose Finance Operator", "Use `skills/review-pricing/SKILL.md` when pricing or packaging is involved", "Use `skills/model-unit-economics/SKILL.md` when costs, margins or spend are involved", "Separate assumptions from evidence", "Identify founder decisions needed", "Route product value questions to Strategy Product when needed"],
      outputs: ["Finance review", "Assumptions", "Risks", "Decisions needed", "Validation needs"],
      filesToUpdate: ["Update `../knowledge/pricing.md`, `../knowledge/revenue-model.md`, `../knowledge/unit-economics.md`, `../knowledge/budget.md` or `../knowledge/finance-risks.md` after explicit confirmation."]
    }
  ];
