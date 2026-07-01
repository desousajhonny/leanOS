import type { SkillDefinition } from "../../../../types.js";

export const growthMarketingSkills: SkillDefinition[] = [
    {
      slug: "define-positioning",
      title: "Definir Posicionamento",
      purpose: "Definir posicionamento de mercado com categoria, ICP, alternativa, promessa, diferenciação, prova disponível e claims permitidos sem criar narrativa genérica ou promessas sem evidência.",
      useWhen: ["a mensagem de mercado está pouco clara", "a landing page precisa de posicionamento", "o lançamento precisa de uma narrativa focada", "copy ou oferta parecem genéricas", "claims de marketing precisam de prova ou experimento"],
      requiredContext: ["../knowledge/positioning.md", "../../strategy/product/knowledge/icp.md quando existir", "../../strategy/product/knowledge/problem.md quando existir", "../../strategy/product/knowledge/value-proposition.md quando existir", "../../strategy/product/knowledge/positioning.md quando existir", "../knowledge/growth-experiments.md quando claims precisarem de validação"],
      inputs: ["Categoria", "ICP ou audiência", "Problema", "Alternativa atual", "Promessa", "Diferenciação", "Prova disponível", "Claims desejados", "Objeções", "Objetivo de validação"],
      process: ["Carregue contexto de produto e Growth antes de escrever mensagem.", "Defina categoria, ICP, alternativa, promessa, diferenciação e prova disponível em campos separados.", "Compare a promessa com problema, alternativa e capacidade real do produto.", "Crie Mapa de claims: permitido, incerto, proibido, com motivo e fonte.", "Roteie claims sem prova para experimento de Growth antes de usar em landing page, anúncio ou sales copy.", "Escreva uma declaração de posicionamento curta e específica para o ICP.", "Liste riscos de mensagem, lacunas de prova e próxima validação recomendada."],
      checks: ["Categoria, ICP, alternativa, promessa, diferenciação e prova disponível estão explícitos.", "Mapa de claims: permitido, incerto, proibido existe.", "A promessa combina com ICP/problema e não exagera capacidade do produto.", "Diferenciação é específica o suficiente para o MVP.", "Claims sem prova foram roteados para experimento de Growth.", "A mensagem não poderia servir igualmente para qualquer produto da categoria."],
      outputs: ["Declaração de posicionamento", "Categoria e ICP", "Alternativa atual", "Promessa e diferenciação", "Prova disponível", "Mapa de claims: permitido, incerto, proibido", "Riscos de mensagem", "Experimentos necessários"],
      filesToUpdate: ["Atualize `../knowledge/positioning.md` após confirmação explícita."],
      redLines: ["Não invente evidência.", "Não prometa além da capacidade do produto.", "Não use posicionamento genérico que poderia servir para qualquer produto.", "Não use claim incerto ou proibido em landing page, anúncio ou sales copy sem experimento ou aprovação explícita.", "Não transforme posicionamento em mudança de produto sem Product Ops ou Strategy."]
    },
    {
      slug: "create-landing-page-copy",
      title: "Criar Copy De Landing Page",
      purpose: "Rascunhar copy clara para a primeira página de validação ou lançamento.",
      useWhen: ["copy de landing page é necessária", "uma página de validação do MVP é necessária", "a página de lançamento precisa de mensagem concisa", "a landing page mostra plano, preço, trial, desconto, pacote ou entitlement"],
      requiredContext: ["Positioning", "Product context", "../finance/knowledge/pricing.md quando houver plano ou preço", "Fundação de Design quando estrutura visual/UI for necessária"],
      inputs: ["Audiência", "Problem", "Oferta", "Planos exibidos se aplicável", "CTA", "Objeções", "Objetivo de validação"],
      process: ["Carregue posicionamento", "Se houver plano, preço, trial, desconto, pacote, limite ou entitlement, carregue `../finance/knowledge/pricing.md` antes de escrever a oferta", "Rascunhe hero, problema, oferta e CTA", "Trate objeções", "Defina sinal de validação", "Roteie necessidades de design visual para Operations Design", "Roteie alterações de plano, preço ou entitlement para Growth Finance"],
      checks: ["A copy está clara", "O CTA combina com o objetivo de aprendizado", "Nenhuma prova ou depoimento falso", "Planos e preços vêm do Pricing Catalog quando aparecem na página", "Dependência de Design é sinalizada quando necessária"],
      outputs: ["Copy de landing page", "CTA", "Sinal de validação", "Pricing Catalog references quando aplicável", "Follow-up de Design se necessário"],
      filesToUpdate: ["Atualize `../knowledge/landing-page.md` após confirmação explícita."],
      redLines: ["Não invente depoimentos ou métricas.", "Não crie preço, desconto, trial, limite ou entitlement novo; use `../finance/knowledge/pricing.md` ou bloqueie por Finance.", "Não defina design final de UI quando Design for necessário."]
    },
    {
      slug: "create-launch-plan",
      title: "Criar Plano De Lançamento",
      purpose: "Planejar ações de lançamento, canais e loops de aprendizado.",
      useWhen: ["o lançamento do MVP está sendo planejado", "canais de aquisição precisam de priorização", "aprendizado de lançamento precisa de estrutura", "mídia paga ou ferramenta de aquisição paga está sendo considerada"],
      requiredContext: ["Positioning", "Landing page", "Canais de aquisição", "Objetivos de aprendizado com clientes", "../finance/knowledge/spend-ledger.md quando houver mídia paga, ferramenta paga ou orçamento"],
      inputs: ["Objetivo de lançamento", "Audiência", "Canais", "Assets", "Timeline", "Métricas de aprendizado", "Budget ou gasto proposto"],
      process: ["Esclareça objetivo de lançamento", "Escolha os menores canais viáveis", "Liste assets necessários", "Defina métricas de aprendizado", "Se houver mídia paga, ferramenta paga ou orçamento, carregue `../finance/knowledge/spend-ledger.md` e roteie decisão para Growth Finance", "Roteie perguntas de orçamento para Finance"],
      checks: ["O lançamento é viável", "O objetivo de aprendizado está explícito", "Implicações de orçamento estão visíveis", "Mídia paga e ferramentas pagas têm owner e limite ou estão bloqueadas por Finance"],
      outputs: ["Plano de lançamento", "Experimentos de canal", "Métricas de aprendizado", "Budget impact quando aplicável", "Risks"],
      filesToUpdate: ["Atualize `../knowledge/launch-plan.md` e `../knowledge/acquisition-channels.md` após confirmação explícita."],
      redLines: ["Não comprometa gasto sem revisão de Finance.", "Não comprometa mídia paga, ferramenta paga ou campanha com orçamento sem Spend Ledger e confirmação de Finance.", "Não otimize apenas para métricas de vaidade."]
    },
    {
      slug: "plan-growth-experiment",
      title: "Planejar Experimento De Growth",
      purpose: "Transformar uma hipótese de aquisição, landing page, mensagem, oferta, onboarding ou venda assistida em experimento mensurável e leve.",
      useWhen: ["o founder quer validar uma landing page, canal, mensagem, oferta ou campanha", "um lançamento precisa de métrica de aprendizado", "há gasto, mídia paga ou ferramenta paga em Growth", "o modelo precisa preparar um teste sem integração automática de analytics"],
      requiredContext: ["../knowledge/growth-experiments.md", "../knowledge/positioning.md", "../knowledge/landing-page.md quando o asset for landing page", "../knowledge/acquisition-channels.md quando houver canal", "growth/finance/knowledge/spend-ledger.md quando houver gasto, mídia paga, ferramenta paga ou custo variável", "../customer-experience/knowledge/customer-feedback.md quando houver feedback de cliente existente"],
      inputs: ["Hipótese", "Canal", "Asset", "Audiência", "Duração", "Measurement source", "Critério de sucesso", "Critério de falha", "Budget ou spend proposto quando aplicável"],
      process: ["Defina a hipótese em uma frase testável e conectada a produto, canal ou oferta.", "Escolha o menor asset capaz de gerar aprendizado: landing page, post, email, DM, call script, anúncio, formulário, onboarding ou suporte.", "Crie um Measurement plan com fonte de medição, janela, métricas, sucesso, falha e owner. Fontes leves possíveis: Plausible, Google Analytics, Vercel Analytics, PostHog, formulário, CRM, agenda de calls, plataforma de anúncios ou input manual do founder.", "Quando houver spend, carregue `growth/finance/knowledge/spend-ledger.md` e roteie aprovação para Growth Finance antes de recomendar execução.", "Entregue um Manual Result Input Template para o founder colar resultados depois da execução.", "Proponha atualização de `../knowledge/growth-experiments.md` somente depois de confirmação explícita."],
      checks: ["A hipótese é mensurável", "Measurement source está explícito", "Success criteria e failure criteria foram definidos antes do resultado", "Gasto relevante passou por Growth Finance", "O template manual permite registrar visitors, leads, qualified_leads, calls, spend e objections"],
      outputs: ["Measurement plan", "Experiment Register update proposal", "Manual Result Input Template", "Rota de Finance/CX/Product Ops/Strategy quando aplicável"],
      filesToUpdate: ["Atualize `../knowledge/growth-experiments.md` somente após confirmação explícita.", "Atualize `../knowledge/launch-plan.md` ou `../knowledge/acquisition-channels.md` apenas quando a decisão de experimento mudar contexto durável de lançamento ou canal."],
      redLines: ["Não chame APIs externas de analytics, CRM, email, anúncios, pagamentos ou suporte a partir desta skill.", "Não invente telemetria, conversões, tráfego, receita, CAC ou feedback.", "Não aprove gasto sem Spend Ledger e confirmação de Finance quando orçamento estiver envolvido."]
    },
    {
      slug: "analyze-growth-result",
      title: "Analisar Resultado De Growth",
      purpose: "Transformar resultados de experimento ou feedback registrado em decisão de Growth sem inventar telemetria.",
      useWhen: ["o founder cola resultado manual de experimento", "um teste de Growth terminou", "há métricas de landing page, canal, oferta, campanha ou venda assistida para interpretar", "o launch-learning-loop precisa decidir o próximo ciclo"],
      requiredContext: ["../knowledge/growth-experiments.md", "Resultado colado pelo founder ou evidência registrada", "../customer-experience/knowledge/customer-feedback.md quando houver feedback qualitativo", "growth/finance/knowledge/spend-ledger.md quando o resultado incluir spend", "../finance/knowledge/pricing.md quando a decisão tocar preço, plano ou oferta"],
      inputs: ["experiment_id", "Measurement source", "Período", "visitors", "leads", "qualified_leads", "calls", "conversions", "revenue", "spend", "objections", "evidence links"],
      process: ["Valide se o resultado tem `experiment_id`, período e measurement_source. Se faltar evidência, peça o input manual em vez de concluir.", "Calcule métricas simples quando houver dados: conversion_rate = leads / visitors, qualified_rate = qualified_leads / leads, call_rate = calls / leads, cost_per_lead = spend / leads e cost_per_qualified_lead = spend / qualified_leads.", "Separe observação, interpretação e decisão. Não misture métrica com opinião.", "Compare resultado com success_criteria e failure_criteria definidos no experimento.", "Produza um Decision output usando exatamente uma decisão: continue, iterate_copy, iterate_pricing, open_product_ops_item, route_to_strategy, scale_spend or pause.", "Roteie `iterate_pricing` para Growth Finance, `open_product_ops_item` para Product Ops, `route_to_strategy` para Strategy Product e `scale_spend` para Finance antes de qualquer aumento de orçamento."],
      checks: ["conversion_rate foi calculado apenas quando havia visitors e leads", "cost_per_qualified_lead foi calculado apenas quando havia spend e qualified_leads", "A decisão usa o enum permitido", "Feedback qualitativo está separado de métrica", "Nenhum dado pessoal de lead ou cliente foi persistido"],
      outputs: ["Decision output", "Métricas calculadas com fórmulas", "Aprendizado confirmado ou lacuna de evidência", "Próxima rota LeanOS", "Atualização proposta do Experiment Register"],
      filesToUpdate: ["Atualize `../knowledge/growth-experiments.md` somente após confirmação explícita.", "Atualize Customer Experience, Finance, Strategy ou Product Ops apenas via rota da área correspondente e confirmação."],
      redLines: ["Não invente telemetria.", "Não trate um resultado sem fonte como decisão.", "Não aumente spend sem Growth Finance.", "Não transforme feedback em Feature sem Product Ops."]
    }
  ];
