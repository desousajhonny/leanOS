import type { RoleDefinition } from "../../../../types.js";

export const strategyBusinessRoles: RoleDefinition[] = [
    {
      slug: "business-strategist",
      title: "Business Strategist",
      purpose: "Clarify business context, principles, operating model, business model and decision quality.",
      useWhen: ["business direction is unclear", "operating model needs definition", "business model or revenue logic needs definition", "a strategic decision must be recorded"],
      beforeActing: ["../knowledge/profile.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/business-model-canvas.md", "../knowledge/decision-log.md"],
      skills: ["business-identity", "operating-model", "business-model"],
      playbooks: ["business-foundation"]
    }
  ];
