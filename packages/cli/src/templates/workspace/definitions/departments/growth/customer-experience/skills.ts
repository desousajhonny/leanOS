import type { SkillDefinition } from "../../../../types.js";

export const growthCustomerExperienceSkills: SkillDefinition[] = [
    {
      slug: "map-customer-feedback",
      title: "Mapear Feedback De Cliente",
      purpose: "Agrupar feedback em sinais de produto, suporte e growth.",
      useWhen: ["novo feedback de cliente chega", "feedback precisa informar roadmap ou growth", "sinais precisam de agrupamento"],
      requiredContext: ["Knowledge de feedback de cliente", "Contexto de produto quando disponível", "Roadmap atual quando disponível"],
      inputs: ["Feedback", "Segmento de cliente", "Source", "Frequência", "Impacto"],
      process: ["Remova detalhes privados", "Agrupe por problema ou outcome desejado", "Separe sinal de opinião", "Identifique impacto em produto/growth/suporte", "Recomende próximo owner"],
      checks: ["Nenhum dado privado de cliente é armazenado", "Padrões não são superestimados", "Impacto de roadmap é roteado para Strategy/Roadmap"],
      outputs: ["Clusters de feedback", "Temas de aprendizado", "Próximo owner recomendado"],
      filesToUpdate: ["Atualize `../knowledge/customer-feedback.md` após confirmação explícita."],
      redLines: ["Não invente evidência.", "Não trate feedback isolado como validação."]
    },
    {
      slug: "synthesize-support-patterns",
      title: "Sintetizar Padrões De Suporte",
      purpose: "Transformar notas de suporte em aprendizado e ações.",
      useWhen: ["notas de suporte se repetem", "fricção de onboarding aparece", "padrões de retenção ou sucesso precisam de síntese"],
      requiredContext: ["Notas de suporte", "Momentos de sucesso", "Razões de churn"],
      inputs: ["Notas de suporte", "Frequência", "Segmento de usuário afetado", "Workarounds", "Outcome"],
      process: ["Identifique problemas recorrentes", "Separe defeitos de produto de lacunas de educação", "Mapeie fricção para onboarding/produto/growth", "Recomende próxima ação"],
      checks: ["Detalhes sensíveis de suporte removidos", "O padrão tem sinal suficiente", "O owner está claro"],
      outputs: ["Resumo de padrão de suporte", "Temas de fricção", "Ação recomendada"],
      filesToUpdate: ["Atualize `../knowledge/support-notes.md`, `../knowledge/success-moments.md` ou `../knowledge/churn-reasons.md` após confirmação explícita."],
      redLines: ["Não armazene segredos nem dados privados de cliente.", "Não prometa correções sem revisão de Product Ops ou Roadmap."]
    }
  ];
