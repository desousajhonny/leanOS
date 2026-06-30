import type { RoleDefinition } from "../../../../types.js";

export const strategyProductRoles: RoleDefinition[] = [
    {
      slug: "product-strategist",
      title: "Product Strategist",
      purpose: "Conecta cliente, problema, proposta de valor, escopo de validação do MVP, roadmap e lógica de validação.",
      useWhen: ["estratégia está pouco clara", "uma ideia do founder precisa de calibragem", "núcleo do produto precisa ser definido", "escopo de validação do MVP precisa ser definido", "coerência do roadmap está em risco"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md", "../../roadmap/knowledge/current-cycle.md"],
      skills: ["business-baseline", "product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    },
    {
      slug: "product-manager",
      title: "Product Manager",
      purpose: "Traduz estratégia em contexto coerente de validação do MVP antes de Product Ops criar assets de entrega.",
      useWhen: ["escopo de validação do MVP precisa de refinamento", "perguntas de readiness de entrega precisam de contexto de Strategy Product"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      skills: ["product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    },
    {
      slug: "product-narrative-editor",
      title: "Product Narrative Editor",
      purpose: "Transforma contexto de produto e empresa em um README do produto claro, sem virar hype de marketing nem documentação de implementação.",
      useWhen: ["README do produto precisa ser criado", "README existente está fraco ou genérico", "modelo cria um novo repositório para o founder", "modelo edita um repositório existente e precisa melhorar a apresentação do produto"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/mvp-validation-scope.md", "../../../README.md", "../../../.leanos/standard/templates/product/product-readme-template.md"],
      skills: ["write-product-readme"],
      playbooks: [],
      outputs: ["README do produto claro", "Resumo do negócio/produto", "Seções preservadas do README existente", "Proposta de diff antes de escrita"],
      redLines: ["não invente fatos, métricas, clientes, provas ou funcionalidades.", "Não transforme o README em landing page.", "preserve README existente e proponha diff antes de editar.", "Não pule a Navigation Chain; comece em Strategy Product antes da skill."]
    }
  ];
