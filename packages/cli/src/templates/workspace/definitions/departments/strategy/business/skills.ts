import type { SkillDefinition } from "../../../../types.js";

export const strategyBusinessSkills: SkillDefinition[] = [
    {
      slug: "business-identity",
      title: "Business Identity",
      purpose: "Clarificar identidade, missão, visão e princípios do negócio usando perguntas simples e guiadas para founders.",
      useWhen: ["identidade do negócio está pouco clara", "missão ou princípios precisam de definição", "trabalho de produto carece de contexto de negócio"],
      requiredContext: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../../../.leanos/standard/foundation/guided-conversation.md"],
      inputs: ["Nome do negócio", "Contexto seed do wizard", "Contexto do produto", "Respostas guiadas do founder", "Princípios conhecidos"],
      process: ["Não faça pergunta aberta como caminho principal; ofereça opções numeradas e aceite resposta por número.", "Pergunte uma decisão por vez e pare quando a próxima lacuna de identidade estiver resolvida.", "Use esta pergunta quando o segmento inicial estiver ausente: `Quem vamos ajudar primeiro?` Opções: pessoas/consumidores finais; pequenas empresas/equipes; empresas maiores/área específica; profissionais independentes/criadores; ainda não sei, recomende.", "Use esta pergunta quando a promessa estiver ausente: `Qual mudança o negócio promete?` Opções: economizar tempo; reduzir custo/erro/risco; aumentar receita/vendas/leads; organizar operação/decisão; melhorar experiência/suporte/relacionamento.", "Use esta pergunta quando o propósito estiver ausente: `Por que o negócio deve existir?` Opções: resolver uma dor frequente; tornar algo caro/lento acessível; automatizar trabalho repetitivo; dar clareza para decidir melhor; criar uma nova forma de entregar valor.", "Use esta pergunta quando princípios estiverem ausentes: `Qual princípio deve guiar decisões difíceis?` Opções: simplicidade para o cliente; segurança e privacidade primeiro; velocidade com escopo pequeno; qualidade acima de volume; atendimento humano quando a IA não for suficiente.", "Use esta pergunta para limites de marca e escopo: `O que não devemos prometer agora?` Opções: resultado financeiro garantido; substituição total de humanos; automação 100% sem revisão; integrações complexas no MVP; escala enterprise agora.", "Separe respostas como suposições do founder até existir evidência; use `business_foundation_status: draft` e `confidence: founder-assumption`.", "Proponha atualizações antes de escrever."],
      checks: ["A missão está clara o suficiente para guiar tradeoffs.", "Os princípios são acionáveis.", "Cada resposta guiada foi mapeada para profile, mission, vision ou principles.", "Suposições do founder não foram registradas como fatos validados.", "Perguntas em aberto estão visíveis."],
      outputs: ["Resumo da identidade do negócio", "Proposta de atualização de missão/visão/princípios", "business_foundation_status: draft", "confidence: founder-assumption", "Perguntas em aberto"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md"],
      redLines: ["Não invente claims de marca ou prova de mercado.", "Não transforme preferências do founder em fatos validados.", "Não atualize arquivos sem confirmação."]
    },
    {
      slug: "operating-model",
      title: "Operating Model",
      purpose: "Definir como humanos e modelos de IA colaboram no negócio.",
      useWhen: ["modelo operacional precisa de definição", "colaboração IA/humano está pouco clara", "ownership de decisão está ambíguo"],
      requiredContext: ["../knowledge/operating-model.md", "../knowledge/principles.md", "../knowledge/decision-log.md", "../../../.leanos/standard/foundation/guided-conversation.md"],
      inputs: ["Papel do founder", "Responsabilidades dos modelos de IA", "Restrições de decisão", "Respostas guiadas sobre operação"],
      process: ["Não faça pergunta aberta como caminho principal; ofereça opções numeradas e aceite resposta por número.", "Use esta pergunta quando o modelo operacional estiver ausente: `Como founder e IA devem operar?` Opções: IA propõe, founder decide; IA executa tarefas aprovadas; IA monitora e sugere próximos passos; IA automatiza rotinas de baixo risco; ainda não definido.", "Defina o que humanos possuem.", "Defina em que agentes de IA podem ajudar.", "Nomeie decisões que exigem confirmação do founder.", "Registre decisões duráveis no decision log apenas depois de confirmação."],
      checks: ["Pontos de aprovação humana estão explícitos.", "Responsabilidades de IA não excedem as regras do workspace.", "Decisões são registradas com contexto.", "Automação de baixo risco não virou autorização ampla."],
      outputs: ["Operating model update", "business_foundation_status: draft", "confidence: founder-assumption", "Proposta de decision log", "Riscos em aberto"],
      filesToUpdate: ["../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      redLines: ["Não conceda aos modelos autoridade para tomar decisões de negócio irreversíveis.", "Não armazene secrets ou credenciais privadas.", "Não atualize arquivos sem confirmação."]
    },
    {
      slug: "business-model",
      title: "Business Model",
      purpose: "Rascunhar receita, canais, custos e modelo de entrega no nível de negócio.",
      useWhen: ["lógica de pricing ou receita está pouco clara", "suposições de modelo de negócio afetam o escopo do MVP", "go-to-market precisa de baseline de modelo de negócio"],
      requiredContext: ["../knowledge/business-model-canvas.md", "../../product/knowledge/icp.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Segmento de cliente", "Suposição de disposição a pagar", "Modelo de entrega", "Suposição de canal", "Drivers de custo", "Respostas guiadas do founder"],
      process: ["Não faça pergunta aberta como caminho principal; ofereça opções numeradas e aceite resposta por número.", "Use esta pergunta quando receita estiver ausente: `Como o negócio pretende ganhar dinheiro?` Opções: assinatura; serviço/setup/implantação; comissão ou success fee; uso/créditos; ainda é hipótese.", "Use esta pergunta quando canal estiver ausente: `Como o cliente deve descobrir ou chegar até isso primeiro?` Opções: indicação/rede do founder; conteúdo ou comunidade; outbound/vendas diretas; marketplace/parcerias; ainda é hipótese.", "Use esta pergunta quando entrega estiver ausente: `Como o valor será entregue no começo?` Opções: produto self-service; serviço concierge/manual; automação assistida por IA; consultoria + produto; ainda é hipótese.", "Rascunhe o modelo de receita viável mais simples.", "Liste suposições de custo e entrega.", "Identifique riscos de pricing.", "Roteie modelagem financeira detalhada para Growth Finance quando necessário."],
      checks: ["O modelo de receita é plausível para o ICP.", "Suposições de custo e entrega estão visíveis.", "Desconhecidos estão registrados.", "Pricing detalhado não foi inventado sem Growth Finance ou confirmação do founder."],
      outputs: ["Atualização do business model canvas", "business_foundation_status: draft", "confidence: founder-assumption", "Suposições de pricing", "Perguntas de follow-up financeiro"],
      filesToUpdate: ["../knowledge/business-model-canvas.md", "../../growth/finance/knowledge/pricing.md"],
      redLines: ["Não invente validação de pricing.", "Não assuma compromissos financeiros sem evidência.", "Não atualize Growth Finance a menos que a área esteja ativa ou o usuário confirme."]
    }
  ];
