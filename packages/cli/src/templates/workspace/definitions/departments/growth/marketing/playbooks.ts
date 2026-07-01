import type { PlaybookDefinition } from "../../../../types.js";

export const growthMarketingPlaybooks: PlaybookDefinition[] = [
    {
      slug: "mvp-launch",
      title: "MVP Launch",
      purpose: "Launch the MVP into a focused learning loop.",
      useWhen: ["o MVP passou por ready-for-launch e precisa de plano de lançamento ou primeira campanha", "landing page, mensagem, canal ou CTA precisam ser preparados para aprendizado de mercado", "Growth precisa conectar lançamento, experimento, feedback de CX e próximos sinais de validação"],
      inputs: ["Product positioning", "Copy de landing page", "Canais de aquisição", "Objetivo de lançamento", "Customer feedback plan"],
      steps: ["Leia o AGENT de Marketing e escolha Growth Lead", "Use `skills/positioning/SKILL.md` se o posicionamento estiver pouco claro", "Se a landing page mostrar plano ou preço, leia `../finance/knowledge/pricing.md` antes de escrever oferta, tabela ou CTA", "Use `skills/landing-page-copy/SKILL.md` para preparar copy de lançamento", "Use `skills/launch-plan/SKILL.md` para escolher canais e métricas de aprendizado", "Use `playbooks/growth-experiment.playbook.md` quando o lançamento precisar de hipótese, métrica, input manual ou análise de resultado", "Roteie design visual para Operations Design quando necessário", "Roteie implicações de orçamento/pricing para Growth Finance quando necessário", "Planeje como Customer Experience capturará feedback"],
      outputs: ["Plano de lançamento", "Copy de landing page", "Acquisition experiment", "Learning loop", "Open risks"],
      filesToUpdate: ["Update `../knowledge/positioning.md`, `../knowledge/landing-page.md`, `../knowledge/acquisition-channels.md` or `../knowledge/launch-plan.md` after explicit confirmation."]
    },
    {
      slug: "growth-experiment",
      title: "Experimento De Growth",
      purpose: "Planejar ou analisar um experimento de Growth com evidência registrada antes de decidir o próximo ciclo.",
      useWhen: ["o founder quer validar canal, landing page, mensagem, oferta, campanha ou onboarding", "o founder cola resultado de teste manual", "o launch-learning-loop precisa decidir próximo passo com evidência"],
      beforeActing: ["../AGENT.md", "../roles/growth-lead.role.md", "../knowledge/growth-experiments.md"],
      inputs: ["Hipótese ou resultado", "Canal", "Asset", "Measurement source", "Critérios de sucesso/falha", "Budget/spend quando aplicável", "Feedback de Customer Experience quando existir"],
      steps: ["Modo 1: Planejar experimento - use `skills/growth-experiment-planning/SKILL.md` quando ainda não houver resultado.", "Modo 2: Analisar resultado - use `skills/growth-result-analysis/SKILL.md` quando o founder colar métricas, feedback ou resumo de execução.", "Carregue `../knowledge/growth-experiments.md` antes de responder e preserve o Experiment Register como fonte local.", "Quando houver spend, mídia paga, ferramenta paga ou custo variável, carregue `../finance/knowledge/spend-ledger.md` e roteie aprovação para Growth Finance.", "Quando houver feedback qualitativo, carregue Customer Experience antes de transformar opinião em aprendizado.", "Entregue ou peça o Manual Result Input Template quando faltarem dados suficientes para análise.", "Antes de atualizar arquivos, peça confirmação explícita do founder."],
      outputs: ["Plano de experimento ou Decision output", "Measurement plan ou métricas calculadas", "Manual Result Input Template quando faltarem resultados", "Próxima rota: Marketing, Customer Experience, Finance, Strategy Product ou Product Ops", "Atualização proposta para `../knowledge/growth-experiments.md`"],
      filesToUpdate: ["Atualize `../knowledge/growth-experiments.md` somente após confirmação explícita.", "Atualize `../knowledge/landing-page.md`, `../knowledge/acquisition-channels.md` ou `../knowledge/launch-plan.md` apenas quando a decisão mudar contexto durável."],
      stopConditions: ["Não há hipótese nem resultado para analisar.", "Falta measurement_source ou evidência mínima.", "A decisão exige Finance, Strategy, Product Ops ou Customer Experience e a área não está ativa.", "O founder não confirmou atualização de arquivo."],
      redLines: ["Não invente telemetria.", "Não tome decisão de Growth apenas por intuição.", "Não escale spend sem Growth Finance.", "Não transforme resultado em Feature sem Product Ops."]
    }
  ];
