import type { RoleDefinition } from "../../../../types.js";

export const strategyProductRoles: RoleDefinition[] = [
    {
      slug: "product-strategist",
      title: "Product Strategist",
      purpose: "Connect customer, problem, value proposition, MVP validation scope, roadmap and validation logic.",
      useWhen: ["strategy is unclear", "a founder idea needs calibration", "product core needs definition", "MVP validation scope needs definition", "roadmap coherence is at risk"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md", "../../roadmap/knowledge/current-cycle.md"],
      skills: ["business-baseline", "product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    },
    {
      slug: "product-manager",
      title: "Product Manager",
      purpose: "Translate strategy into coherent MVP validation context before Product Ops creates delivery assets.",
      useWhen: ["MVP validation scope needs refinement", "delivery readiness questions need Strategy Product context"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      skills: ["product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    }
  ];
