import type { PlaybookDefinition } from "../../../../types.js";

export const growthFinancePlaybooks: PlaybookDefinition[] = [
    {
      slug: "finance-review",
      title: "Finance Review",
      purpose: "Revisar premissas de negócio e risco financeiro.",
      inputs: ["Pricing", "Modelo de receita", "Unit economics", "Budget", "Finance risks"],
      steps: ["Leia o AGENT de Finance e escolha Finance Operator", "Use `skills/review-pricing/SKILL.md` quando pricing ou packaging estiver envolvido", "Use `skills/model-unit-economics/SKILL.md` quando custos, margens ou gasto estiverem envolvidos", "Separe premissas de evidência", "Identifique decisões necessárias do founder", "Roteie perguntas de valor de produto para Strategy Product quando necessário"],
      outputs: ["Finance review", "Suposições", "Risks", "Decisions needed", "Necessidades de validação"],
      filesToUpdate: ["Atualize `../knowledge/pricing.md`, `../knowledge/revenue-model.md`, `../knowledge/unit-economics.md`, `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."]
    }
  ];
