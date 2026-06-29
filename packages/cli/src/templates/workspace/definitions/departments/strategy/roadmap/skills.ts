import type { SkillDefinition } from "../../../../types.js";

export const strategyRoadmapSkills: SkillDefinition[] = [
    {
      slug: "roadmap",
      title: "Roadmap",
      purpose: "Sequencie trabalho de roadmap por resultado de negócio, valor de produto, estágio operacional e restrições de delivery.",
      useWhen: ["o founder precisa de roadmap para um negócio product_operating", "growth_scaling exige sequenciamento entre múltiplas prioridades", "candidatos de backlog precisam de classificação Now/Next/Later/Not Planned"],
      requiredContext: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      inputs: ["Estágio de negócio", "Estratégia de produto", "Restrições de negócio", "Riscos conhecidos", "Sinais de cliente ou validação", "Trabalho candidato"],
      process: ["Esclareça o objetivo do roadmap.", "Confirme se o negócio está em `product_operating` ou `growth_scaling`, ou se o founder pediu explicitamente para sequenciar múltiplas prioridades.", "Não use Roadmap como continuação obrigatória da primeira validação de MVP.", "Separe Now, Next, Later e Not Planned.", "Conecte itens a outcomes, sinais de cliente e sinais de validação ou operação.", "Identifique tipo de escopo de delivery, milestone e objetivo de release apenas quando confirmado depois por Product Ops.", "Identifique dependências e riscos.", "Proponha atualizações antes de escrever."],
      checks: ["Itens Now são pequenos o bastante para raciocinar sobre eles.", "Itens de roadmap não são desejos vagos.", "O produto está operando/escalando ou o founder precisa explicitamente de sequenciamento multi-prioridade.", "Escopo de delivery não é expandido silenciosamente.", "Itens de construção de MVP são roteados para escopo/backlog de Product Ops em vez de Roadmap quando afetam delivery atual."],
      outputs: ["Proposta de roadmap", "Proposta de ciclo atual", "Riscos e dependências", "Perguntas abertas"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md"],
      redLines: ["Não comprometa trabalho futuro sem confirmação do founder.", "Não invente milestones ou datas.", "Não transforme candidatos de backlog em escopo comprometido silenciosamente."]
    },
    {
      slug: "backlog-prioritization",
      title: "Backlog Prioritization",
      purpose: "Prioritize candidate work by value, risk, evidence, effort and current cycle fit.",
      useWhen: ["backlog is unordered", "a new idea needs placement", "the current cycle needs sharper priority"],
      requiredContext: ["../knowledge/backlog.md", "../knowledge/current-cycle.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Candidate backlog items", "Product value", "Risk", "Effort", "Dependencies"],
      process: ["Agrupe trabalhos candidatos.", "Pontue por valor de outcome, redução de risco, esforço e dependência.", "Recomende manter, estacionar, dividir ou descartar.", "Atualize somente após confirmação."],
      checks: ["Top items have a clear user or business outcome.", "Itens grandes são marcados para quebra em Epic.", "Dependencies are visible."],
      outputs: ["Prioritized backlog", "Parked items", "Items needing epic breakdown"],
      filesToUpdate: ["../knowledge/backlog.md", "../knowledge/current-cycle.md"],
      redLines: ["Não use prioridade como permissão para implementar.", "Não esconda incerteza.", "Não remova itens de backlog sem confirmação."]
    }
  ];
