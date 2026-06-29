import type { PlaybookDefinition } from "../../../../types.js";

export const strategyRoadmapPlaybooks: PlaybookDefinition[] = [
    {
      slug: "roadmap-cycle-planning",
      title: "Roadmap Cycle Planning",
      purpose: "Planeje o próximo ciclo coerente de roadmap a partir de estratégia de produto, restrições operacionais e riscos conhecidos.",
      inputs: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      steps: ["Carregue o AGENT de Roadmap e a role Roadmap Planner.", "Use apenas quando o produto estiver em `product_operating` ou `growth_scaling`, ou quando o founder pedir explicitamente para sequenciar múltiplas prioridades.", "Se o negócio estiver em `mvp_building` ou `mvp_live_learning`, roteie a ideia para `activation_required: operations.product-ops` para escopo de MVP, backlog ou planejamento de delivery.", "Revise estratégia de produto, sinais de cliente e notas de validação.", "Revise candidatos de backlog.", "Escolha limites de Now, Next, Later e Not Planned.", "Defina objetivo do ciclo atual e critérios de sucesso.", "Proponha atualizações e aguarde confirmação antes de escrever."],
      outputs: ["Resumo do ciclo de roadmap", "Proposta de ciclo atual", "Mudanças no backlog", "Follow-up de milestone"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md"]
    }
  ];
