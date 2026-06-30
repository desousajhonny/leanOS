import type { SkillDefinition } from "../../../../types.js";

export const growthFinanceSkills: SkillDefinition[] = [
    {
      slug: "model-unit-economics",
      title: "Modelar Unit Economics",
      purpose: "Esclarecer premissas de aquisição, delivery e margem.",
      useWhen: ["unit economics estão pouco claros", "pricing ou custo de aquisição precisa de avaliação aproximada", "gasto de growth está sendo considerado"],
      requiredContext: ["Pricing", "Modelo de receita", "Budget", "Custos conhecidos"],
      inputs: ["Custo de aquisição", "Custo de delivery", "Preço", "Margem bruta", "Métrica de uso ou valor"],
      process: ["Liste premissas", "Separe fatos conhecidos de chutes", "Estime unit economics de forma direcional", "Identifique sensibilidade e evidência ausente"],
      checks: ["Suposições estão explícitas", "Sem falsa precisão", "Riscos estão visíveis"],
      outputs: ["Resumo de unit economics", "Premissas sensíveis", "Risks", "Necessidades de validação"],
      filesToUpdate: ["Atualize `../knowledge/unit-economics.md` após confirmação explícita."],
      redLines: ["Não apresente estimativas como fatos validados.", "Não faça afirmações de investimento ou contabilidade."]
    },
    {
      slug: "review-pricing",
      title: "Revisar Pricing",
      purpose: "Avaliar hipóteses de pricing, planos, trials, limites e entitlements contra valor ao cliente, custos e runtime source.",
      useWhen: ["pricing está sendo considerado", "packaging precisa de revisão", "planos, cobrança, assinatura, trial, limites ou entitlements estão sendo definidos", "disposição a pagar está incerta"],
      requiredContext: ["../knowledge/pricing.md", "../knowledge/revenue-model.md", "Proposta de valor", "ICP", "Runtime Source quando existir", "Billing provider ou banco quando existir"],
      inputs: ["Usuário alvo", "Valor criado", "Hipótese de pricing", "plan_id", "Nome público", "Preço", "Entitlements", "Provider ID ou lacuna", "Alternativas", "Costs"],
      process: ["Carregue `../knowledge/pricing.md` antes de aceitar qualquer nome, preço, trial, limite ou entitlement.", "Cheque alinhamento de valor e ICP.", "Cheque simplicidade do pacote e entitlements.", "Classifique cada plano como draft, active, deprecated, grandfathered, hidden ou archived.", "Mapeie Runtime Source: billing provider, database table, code path, runtime config e sync status.", "Identifique premissas de disposição a pagar.", "Liste método de validação e impacto em Marketing, CX, Product Ops, Engineering, DevOps e Security."],
      checks: ["Pricing combina com ICP/valor", "Suposições não são tratadas como prova", "Cada plano tem plan_id, nome público, preço, status e entitlements", "Runtime Source está mapeado ou a lacuna está explícita", "Caminho de validação existe", "Consumidores não estão criando preço fora do Pricing Catalog"],
      outputs: ["Pricing Catalog decision", "Runtime Source", "Planos e entitlements afetados", "Risks", "Plano de validação", "Impacto em áreas consumidoras", "Perguntas abertas"],
      filesToUpdate: ["Atualize `../knowledge/pricing.md` ou `../knowledge/revenue-model.md` após confirmação explícita."],
      redLines: ["Não invente evidência de disposição a pagar.", "Não aprove plano, preço, trial, limite ou entitlement fora de `../knowledge/pricing.md`.", "Não salve secrets, tokens, webhook secrets ou credenciais de billing no markdown.", "Não prometa resultados de receita."]
    }
  ];
