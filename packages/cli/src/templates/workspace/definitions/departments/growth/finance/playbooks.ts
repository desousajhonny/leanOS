import type { PlaybookDefinition } from "../../../../types.js";

export const growthFinancePlaybooks: PlaybookDefinition[] = [
    {
      slug: "finance-review",
      title: "Finance Review",
      purpose: "Revisar premissas de negócio, Pricing Catalog, runtime source e risco financeiro.",
      useWhen: ["planos, preços, cobrança, entitlement ou runtime source precisam de revisão financeira", "custos, margem, unit economics ou budget podem afetar Product, Growth ou Engineering", "uma decisão de produto ou campanha depende de pricing catalog, revenue model ou risco financeiro"],
      inputs: ["Pricing Catalog", "Modelo de receita", "Unit economics", "Budget", "Finance risks", "Runtime Source quando existir"],
      steps: ["Leia o AGENT de Finance e escolha Finance Operator", "Confirme `../knowledge/pricing.md` como fonte canônica antes de aceitar plano, preço, trial, limite ou entitlement", "Use `skills/pricing-review/SKILL.md` quando pricing, packaging, cobrança ou entitlement estiver envolvido", "Use `skills/model-unit-economics/SKILL.md` quando custos, margens ou gasto estiverem envolvidos", "Verifique provider IDs, database table e code paths quando o preço já tiver implementação", "Separe premissas de evidência", "Identifique decisões necessárias do founder", "Roteie perguntas de valor de produto para Strategy Product quando necessário", "Roteie mudanças de landing page para Marketing, suporte para Customer Experience, implementação para Product Ops/Engineering, ambiente para DevOps e risco de cobrança/acesso para Security"],
      outputs: ["Finance review", "Pricing Catalog decision", "Runtime Source status", "Suposições", "Risks", "Decisions needed", "Necessidades de validação"],
      filesToUpdate: ["Atualize `../knowledge/pricing.md`, `../knowledge/revenue-model.md`, `../knowledge/unit-economics.md`, `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."]
    },
    {
      slug: "spend-approval",
      title: "Spend Approval",
      purpose: "Decidir se um gasto proposto deve ser aprovado, bloqueado, pausado ou registrado como experimento.",
      useWhen: ["um novo gasto, ferramenta, campanha, provider pago ou custo usage-based precisa de decisão", "budget, runway, owner ou período do gasto estão ausentes antes da contratação", "Marketing, DevOps, Product Ops ou Engineering quer aprovar custo recorrente ou variável"],
      inputs: ["Gasto proposto", "Spend Ledger", "Budget", "Unit economics", "Finance risks", "Feature/campanha/provider vinculado"],
      steps: ["Leia o AGENT de Finance e escolha Finance Operator", "Carregue `../knowledge/spend-ledger.md` e `../knowledge/budget.md`", "Use `skills/spend-review/SKILL.md` para classificar categoria, owner, período e impacto", "Use `skills/runway-analysis/SKILL.md` quando o gasto afetar burn ou runway", "Classifique decisão como spend_approved, spend_rejected, spend_paused, needs-founder-confirmation ou needs-more-context", "Liste automações candidatas como alerta de custo, usage cap ou reminder de renovação", "Peça confirmação antes de atualizar arquivos"],
      outputs: ["spend_approved ou decisão equivalente", "Expense Register update", "Budget impact", "Runway impact", "Automation candidates", "Risks", "Founder decision needed"],
      filesToUpdate: ["Atualize `../knowledge/spend-ledger.md`, `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."]
    },
    {
      slug: "monthly-finance-check",
      title: "Monthly Finance Check",
      purpose: "Revisar monthly burn, runway, gastos sem owner e riscos financeiros sem transformar Finance em contabilidade pesada.",
      useWhen: ["o founder quer revisar burn mensal, runway ou gastos recorrentes", "Spend Ledger tem gastos sem owner, sem revisão ou com custo variável crescente", "decisões de continuidade, pausa, renegociação ou alerta de custo precisam ser priorizadas"],
      inputs: ["Spend Ledger", "Budget", "Revenue model", "Unit economics", "Finance risks", "Pricing Catalog"],
      steps: ["Leia o AGENT de Finance e escolha Finance Operator", "Carregue `../knowledge/spend-ledger.md`, `../knowledge/budget.md`, `../knowledge/unit-economics.md` e `../knowledge/finance-risks.md`", "Agrupe gastos por categoria, status e owner", "Estime monthly burn separando conhecido, estimado e unknown", "Use `skills/runway-analysis/SKILL.md` para revisar runway quando houver dados suficientes", "Identifique gastos sem owner, sem uso claro, sem data de revisão ou com custo variável crescente", "Recomende pausar, manter, revisar, renegociar, automatizar alerta ou pedir decisão do founder"],
      outputs: ["monthly burn", "runway", "Spend summary", "Gastos sem owner", "Automation candidates", "Finance risks", "Founder decisions needed"],
      filesToUpdate: ["Atualize `../knowledge/spend-ledger.md`, `../knowledge/budget.md`, `../knowledge/unit-economics.md` ou `../knowledge/finance-risks.md` após confirmação explícita."]
    }
  ];
