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
    },
    {
      slug: "review-spend",
      title: "Revisar Gasto",
      purpose: "Avaliar se um gasto recorrente, ferramenta paga, campanha paga, provider novo ou custo variável relevante faz sentido para o estágio atual.",
      useWhen: ["um novo gasto está sendo considerado", "uma ferramenta paga deve ser contratada", "mídia paga ou campanha com orçamento aparece", "um provider novo ou custo variável relevante entra em produto ou operação"],
      requiredContext: ["../knowledge/spend-ledger.md", "../knowledge/budget.md", "../knowledge/unit-economics.md", "../knowledge/finance-risks.md", "Founder intent ou Feature/campanha relacionada"],
      inputs: ["Gasto proposto", "Categoria", "Valor", "Período", "Owner", "Motivo de negócio", "Feature, campanha ou operação vinculada", "Custo variável ou fixo", "Data de revisão"],
      process: ["Carregue `../knowledge/spend-ledger.md` antes de aceitar gasto relevante.", "Classifique categoria, tipo, período, owner e status.", "Compare com `../knowledge/budget.md` e unit economics.", "Identifique se o gasto valida aprendizado, mantém operação, destrava receita ou cria risco.", "Defina status proposto: proposed, approved, active, paused, cancelled ou rejected.", "Liste automações úteis como alerta de custo, usage cap, reminder de renovação ou import manual."],
      checks: ["Categoria e owner estão explícitos", "Valor e período estão claros ou marcados como unknown", "Motivo de negócio está ligado a aprendizado, operação, receita ou risco", "Impacto em budget, runway e unit economics está visível", "Gasto recorrente ou variável relevante não fica fora do Spend Ledger"],
      outputs: ["Spend decision", "Expense Register update", "Budget impact", "Runway impact", "Automation candidates", "Risks", "Founder decision needed"],
      filesToUpdate: ["Atualize `../knowledge/spend-ledger.md`, `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."],
      redLines: ["Não aprove gasto recorrente, ferramenta paga, campanha paga, provider novo ou custo variável relevante fora de `../knowledge/spend-ledger.md`.", "Não trate estimativa como gasto verificado.", "Não forneça aconselhamento contábil, fiscal, jurídico ou de investimento."]
    },
    {
      slug: "runway-check",
      title: "Checar Runway",
      purpose: "Estimar burn mensal, runway e riscos financeiros com base em gastos conhecidos e premissas explícitas.",
      useWhen: ["founder pergunta quanto tempo de runway existe", "burn mensal está incerto", "novo gasto pode reduzir runway", "release ou campanha depende de orçamento"],
      requiredContext: ["../knowledge/spend-ledger.md", "../knowledge/budget.md", "../knowledge/revenue-model.md", "../knowledge/unit-economics.md", "../knowledge/finance-risks.md"],
      inputs: ["Cash disponível quando informado", "Gastos recorrentes conhecidos", "Gastos variáveis conhecidos", "Receita atual ou prevista", "Novo gasto proposto", "Premissas ausentes"],
      process: ["Liste gastos conhecidos do Spend Ledger.", "Separe fixo, variável, one-off e unknown.", "Estime burn mensal com premissas explícitas.", "Calcule Runway estimate apenas quando houver cash disponível; caso contrário, liste lacuna.", "Identifique maior sensibilidade: AI/API, infra, people, mídia paga, ferramentas ou payment fees.", "Recomende próxima decisão de founder sem vender certeza falsa."],
      checks: ["burn mensal está separado entre conhecido e estimado", "Runway estimate declara premissas e lacunas", "Gastos unknown não são ignorados", "Risco financeiro tem owner ou próxima revisão"],
      outputs: ["Runway estimate", "burn mensal", "Assumptions", "Expense gaps", "Sensitivity risks", "Founder decisions needed"],
      filesToUpdate: ["Atualize `../knowledge/budget.md` ou `../knowledge/finance-risks.md` após confirmação explícita."],
      redLines: ["Não apresente runway como certeza quando dados de caixa ou gastos estiverem ausentes.", "Não faça aconselhamento financeiro, contábil, fiscal, jurídico ou de investimento.", "Não invente saldo de caixa, receita ou gasto."]
    },
    {
      slug: "budget-planning",
      title: "Planejar Budget",
      purpose: "Definir limites práticos por categoria, ciclo ou experimento para proteger runway e acelerar aprendizado.",
      useWhen: ["orçamento precisa ser definido", "limites por categoria estão ausentes", "campanha paga ou experimento precisa de teto", "custos de IA/API ou infra precisam de guardrails"],
      requiredContext: ["../knowledge/spend-ledger.md", "../knowledge/budget.md", "../knowledge/unit-economics.md", "../knowledge/finance-risks.md", "Ciclo atual ou objetivo de aprendizado"],
      inputs: ["Categoria", "Limite desejado", "Ciclo", "Objetivo de negócio", "Owner", "Risco", "Sinal para pausar ou aumentar gasto"],
      process: ["Carregue Spend Ledger e Budget.", "Defina limites por categoria e por ciclo.", "Separe budget fixo, variável e experimento.", "Defina thresholds de aprovação do founder.", "Defina sinal de stop, pausa, renegociação ou aumento.", "Liste automações candidatas para alertas, usage caps e reminders."],
      checks: ["limites por categoria estão explícitos", "Budget guardrails protegem runway e aprendizado", "Owner e review date existem", "Gastos sem owner ou sem evidência não recebem aumento automático"],
      outputs: ["Budget guardrails", "limites por categoria", "Approval thresholds", "Stop conditions", "Automation candidates", "Open questions"],
      filesToUpdate: ["Atualize `../knowledge/budget.md`, `../knowledge/spend-ledger.md` ou `../knowledge/finance-risks.md` após confirmação explícita."],
      redLines: ["Não crie orçamento sem owner e data de revisão.", "Não aprove aumento de gasto sem objetivo de negócio ou aprendizado.", "Não prometa retorno financeiro."]
    }
  ];
