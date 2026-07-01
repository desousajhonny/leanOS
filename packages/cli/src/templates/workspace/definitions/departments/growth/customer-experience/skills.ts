import type { SkillDefinition } from "../../../../types.js";

export const growthCustomerExperienceSkills: SkillDefinition[] = [
    {
      slug: "customer-feedback-mapping",
      title: "Mapear Feedback De Cliente",
      purpose: "Transformar feedback bruto de cliente em sinais seguros, privados e acionáveis, separando PII, opinião, evidência, força do sinal, owner e próxima rota sem promover feedback isolado a Feature.",
      useWhen: ["novo feedback de cliente chega", "feedback precisa informar roadmap ou Growth", "sinais precisam de agrupamento", "suporte, call, ticket, formulário ou entrevista trouxe aprendizado", "o founder quer saber se um pedido de cliente deve virar produto"],
      requiredContext: ["../knowledge/customer-feedback.md", "../knowledge/support-notes.md quando houver suporte", "../knowledge/churn-reasons.md quando houver churn", "../knowledge/success-moments.md quando houver sinal positivo", "../../strategy/product/knowledge/icp.md quando existir", "../../strategy/roadmap/knowledge/roadmap.md quando roadmap for impactado"],
      inputs: ["Feedback bruto", "Segmento de cliente", "Fonte", "Frequência", "Impacto percebido", "Plano ou tier citado", "Momento da jornada", "Pedido explícito do cliente", "Workaround atual"],
      process: ["Remova PII, segredos, dados sensíveis e identificadores desnecessários antes de registrar qualquer coisa.", "Separe citação útil, opinião, comportamento observado, dor, workaround e outcome desejado.", "Agrupe feedback por problema, momento da jornada, segmento e resultado esperado.", "Classifique força do sinal como isolated, repeated, pattern ou critical, explicando fonte e frequência.", "Classifique impacto em suporte, onboarding, retenção, aquisição, pricing, roadmap ou delivery.", "Recomende Próxima rota: Customer Experience, Product Ops, Strategy, Growth Marketing ou Finance.", "Proponha atualização de knowledge somente depois de confirmação explícita e sem dados sensíveis."],
      checks: ["PII, segredos, dados sensíveis e identificadores desnecessários foram removidos.", "Sinal está separado de opinião e interpretação.", "Força do sinal isolated, repeated, pattern ou critical está explícita.", "Feedback isolado não virou Feature, roadmap ou promessa de correção.", "Owner e próxima rota estão claros.", "Questões de plano, preço, limite ou entitlement foram roteadas para Finance quando aplicável."],
      outputs: ["Feedback sanitizado", "Clusters de feedback", "Força do sinal: isolated, repeated, pattern ou critical", "Temas de aprendizado", "Impacto em suporte/produto/growth/finance", "Próxima rota: Customer Experience, Product Ops, Strategy, Growth Marketing ou Finance", "Atualização proposta de knowledge"],
      filesToUpdate: ["Atualize `../knowledge/customer-feedback.md` após confirmação explícita."],
      redLines: ["Não invente evidência.", "Não trate feedback isolado como validação.", "Não transforme feedback isolado em Feature sem Product Ops.", "Não armazene PII, segredos, dados sensíveis ou identificadores desnecessários.", "Não prometa correção, desconto, limite, upgrade ou mudança de produto sem a rota dona."]
    },
    {
      slug: "support-patterns",
      title: "Sintetizar Padrões De Suporte",
      purpose: "Transformar notas de suporte em aprendizado e ações.",
      useWhen: ["notas de suporte se repetem", "fricção de onboarding aparece", "padrões de retenção ou sucesso precisam de síntese", "clientes perguntam sobre plano, cobrança, trial, limite, upgrade ou entitlement"],
      requiredContext: ["Notas de suporte", "Momentos de sucesso", "Razões de churn", "../finance/knowledge/pricing.md quando plano, billing ou entitlement aparecer"],
      inputs: ["Notas de suporte", "Frequência", "Segmento de usuário afetado", "Workarounds", "Outcome", "Plano citado se aplicável"],
      process: ["Identifique problemas recorrentes", "Separe defeitos de produto de lacunas de educação", "Se houver plano, cobrança, trial, upgrade, limite ou entitlement, carregue `../finance/knowledge/pricing.md` antes de sintetizar ou responder", "Mapeie fricção para onboarding/produto/growth", "Roteie dúvidas ou inconsistências de plano para Growth Finance", "Recomende próxima ação"],
      checks: ["Detalhes sensíveis de suporte removidos", "O padrão tem sinal suficiente", "O owner está claro", "Questões de plano ou entitlement usam o Pricing Catalog"],
      outputs: ["Resumo de padrão de suporte", "Temas de fricção", "Questões de plano ou billing quando aplicável", "Ação recomendada"],
      filesToUpdate: ["Atualize `../knowledge/support-notes.md`, `../knowledge/success-moments.md` ou `../knowledge/churn-reasons.md` após confirmação explícita."],
      redLines: ["Não armazene segredos nem dados privados de cliente.", "Não prometa upgrade, desconto, limite, trial ou entitlement sem `../finance/knowledge/pricing.md`.", "Não prometa correções sem revisão de Product Ops ou Roadmap."]
    }
  ];
