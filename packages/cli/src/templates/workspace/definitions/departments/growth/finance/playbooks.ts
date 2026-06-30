import type { PlaybookDefinition } from "../../../../types.js";

export const growthFinancePlaybooks: PlaybookDefinition[] = [
    {
      slug: "finance-review",
      title: "Finance Review",
      purpose: "Revisar premissas de negócio, Pricing Catalog, runtime source e risco financeiro.",
      inputs: ["Pricing Catalog", "Modelo de receita", "Unit economics", "Budget", "Finance risks", "Runtime Source quando existir"],
      steps: ["Leia o AGENT de Finance e escolha Finance Operator", "Confirme `../knowledge/pricing.md` como fonte canônica antes de aceitar plano, preço, trial, limite ou entitlement", "Use `skills/review-pricing/SKILL.md` quando pricing, packaging, cobrança ou entitlement estiver envolvido", "Use `skills/model-unit-economics/SKILL.md` quando custos, margens ou gasto estiverem envolvidos", "Verifique provider IDs, database table e code paths quando o preço já tiver implementação", "Separe premissas de evidência", "Identifique decisões necessárias do founder", "Roteie perguntas de valor de produto para Strategy Product quando necessário", "Roteie mudanças de landing page para Marketing, suporte para Customer Experience, implementação para Product Ops/Engineering, ambiente para DevOps e risco de cobrança/acesso para Security"],
      outputs: ["Finance review", "Pricing Catalog decision", "Runtime Source status", "Suposições", "Risks", "Decisions needed", "Necessidades de validação"],
      filesToUpdate: ["Atualize `../knowledge/pricing.md`, `../knowledge/revenue-model.md`, `../knowledge/unit-economics.md`, `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."]
    }
  ];
