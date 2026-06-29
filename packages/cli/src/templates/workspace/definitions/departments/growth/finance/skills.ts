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
      purpose: "Avaliar hipóteses de pricing contra valor ao cliente e custos.",
      useWhen: ["pricing está sendo considerado", "packaging precisa de revisão", "disposição a pagar está incerta"],
      requiredContext: ["Pricing", "Proposta de valor", "ICP", "Modelo de receita"],
      inputs: ["Usuário alvo", "Valor criado", "Hipótese de pricing", "Alternativas", "Costs"],
      process: ["Cheque alinhamento de valor", "Cheque simplicidade do pacote", "Identifique premissas de disposição a pagar", "Liste método de validação"],
      checks: ["Pricing combina com ICP/valor", "Suposições não são tratadas como prova", "Caminho de validação existe"],
      outputs: ["Revisão de pricing", "Risks", "Plano de validação", "Perguntas abertas"],
      filesToUpdate: ["Atualize `../knowledge/pricing.md` ou `../knowledge/revenue-model.md` após confirmação explícita."],
      redLines: ["Não invente evidência de disposição a pagar.", "Não prometa resultados de receita."]
    }
  ];
