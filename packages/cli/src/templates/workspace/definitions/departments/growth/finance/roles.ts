import type { RoleDefinition } from "../../../../types.js";

export const growthFinanceRoles: RoleDefinition[] = [
    {
      slug: "finance-operator",
      title: "Finance Operator",
      purpose: "Reason about pricing, unit economics, budget and revenue assumptions.",
      useWhen: ["pricing or revenue model is involved", "budget risk needs review", "unit economics estão pouco claros"],
      beforeActing: ["../AGENT.md", "../knowledge/pricing.md", "../knowledge/revenue-model.md", "../knowledge/unit-economics.md", "../knowledge/budget.md", "../knowledge/finance-risks.md"],
      skills: ["model-unit-economics", "review-pricing"],
      playbooks: ["finance-review"],
      outputs: ["Pricing or unit economics summary", "Financial assumptions", "Risks", "Founder decisions needed"],
      redLines: ["Não invente validação de pricing.", "Não forneça aconselhamento contábil, fiscal, jurídico ou de investimento.", "Não comprometa gastos ou previsões sem confirmação do founder."]
    }
  ];
