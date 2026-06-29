import type { SkillDefinition } from "../../../../types.js";

export const strategyBusinessSkills: SkillDefinition[] = [
    {
      slug: "business-identity",
      title: "Business Identity",
      purpose: "Clarificar contexto de negócio, missão, princípios e identidade.",
      useWhen: ["identidade do negócio está pouco clara", "missão ou princípios precisam de definição", "trabalho de produto carece de contexto de negócio"],
      requiredContext: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
      inputs: ["Nome do negócio", "Intenção do founder", "Cliente-alvo", "Contexto do produto", "Princípios conhecidos"],
      process: ["Resuma o que é o negócio.", "Clarifique por que ele existe.", "Identifique princípios que devem guiar decisões de produto e operação.", "Separe crenças do founder de fatos validados.", "Proponha atualizações antes de escrever."],
      checks: ["A missão está clara o suficiente para guiar tradeoffs.", "Os princípios são acionáveis.", "Perguntas em aberto estão visíveis."],
      outputs: ["Resumo da identidade do negócio", "Proposta de atualização de missão/princípios", "Perguntas em aberto"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
      redLines: ["Não invente claims de marca ou prova de mercado.", "Não transforme preferências do founder em fatos validados.", "Não atualize arquivos sem confirmação."]
    },
    {
      slug: "operating-model",
      title: "Operating Model",
      purpose: "Definir como humanos e modelos de IA colaboram no negócio.",
      useWhen: ["modelo operacional precisa de definição", "colaboração IA/humano está pouco clara", "ownership de decisão está ambíguo"],
      requiredContext: ["../knowledge/operating-model.md", "../knowledge/principles.md", "../knowledge/decision-log.md"],
      inputs: ["Modo operacional", "Papel do founder", "Responsabilidades dos modelos de IA", "Restrições de decisão"],
      process: ["Defina o que humanos possuem.", "Defina em que agentes de IA podem ajudar.", "Nomeie decisões que exigem confirmação do founder.", "Registre decisões duráveis no decision log."],
      checks: ["Pontos de aprovação humana estão explícitos.", "Responsabilidades de IA não excedem as regras do workspace.", "Decisões são registradas com contexto."],
      outputs: ["Modo operacionall update", "Proposta de decision log", "Riscos em aberto"],
      filesToUpdate: ["../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      redLines: ["Não conceda aos modelos autoridade para tomar decisões de negócio irreversíveis.", "Não armazene secrets ou credenciais privadas.", "Não atualize arquivos sem confirmação."]
    },
    {
      slug: "business-model",
      title: "Business Model",
      purpose: "Rascunhar receita, canais, custos e modelo de entrega no nível de negócio.",
      useWhen: ["lógica de pricing ou receita está pouco clara", "suposições de modelo de negócio afetam o escopo do MVP", "go-to-market precisa de baseline de modelo de negócio"],
      requiredContext: ["../knowledge/business-model-canvas.md", "../../product/knowledge/icp.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Segmento de cliente", "Suposição de disposição a pagar", "Modelo de entrega", "Suposição de canal", "Drivers de custo"],
      process: ["Rascunhe o modelo de receita viável mais simples.", "Liste suposições de custo e entrega.", "Identifique riscos de pricing.", "Roteie modelagem financeira detalhada para Growth Finance quando necessário."],
      checks: ["O modelo de receita é plausível para o ICP.", "Suposições de custo e entrega estão visíveis.", "Desconhecidos estão registrados."],
      outputs: ["Atualização do business model canvas", "Suposições de pricing", "Perguntas de follow-up financeiro"],
      filesToUpdate: ["../knowledge/business-model-canvas.md", "../../../growth/finance/pricing.md"],
      redLines: ["Não invente validação de pricing.", "Não assuma compromissos financeiros sem evidência.", "Não atualize Growth Finance a menos que a área esteja ativa ou o usuário confirme."]
    }
  ];
