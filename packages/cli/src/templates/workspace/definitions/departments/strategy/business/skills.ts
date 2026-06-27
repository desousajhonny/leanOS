import type { SkillDefinition } from "../../../../types.js";

export const strategyBusinessSkills: SkillDefinition[] = [
    {
      slug: "business-identity",
      title: "Business Identity",
      purpose: "Clarify business context, mission, principles and identity.",
      useWhen: ["business identity is unclear", "mission or principles need definition", "product work lacks business context"],
      requiredContext: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
      inputs: ["Business name", "Founder intent", "Target customer", "Product context", "Known principles"],
      process: ["Summarize what the business is.", "Clarify why it exists.", "Identify principles that should guide product and operational decisions.", "Separate founder beliefs from validated facts.", "Propose updates before writing."],
      checks: ["Mission is clear enough to guide tradeoffs.", "Principles are actionable.", "Open questions are visible."],
      outputs: ["Business identity summary", "Mission/principles update proposal", "Open questions"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
      redLines: ["Do not invent brand claims or market proof.", "Do not turn founder preferences into validated facts.", "Do not update files without confirmation."]
    },
    {
      slug: "operating-model",
      title: "Operating Model",
      purpose: "Define how humans and AI models collaborate in the business.",
      useWhen: ["operating model needs definition", "AI/human collaboration is unclear", "decision ownership is ambiguous"],
      requiredContext: ["../knowledge/operating-model.md", "../knowledge/principles.md", "../knowledge/decision-log.md"],
      inputs: ["Operating mode", "Founder role", "AI model responsibilities", "Decision constraints"],
      process: ["Define what humans own.", "Define what AI agents can assist with.", "Name decisions that require founder confirmation.", "Record durable decisions in the decision log."],
      checks: ["Human approval points are explicit.", "AI responsibilities do not exceed the workspace rules.", "Decisions are recorded with context."],
      outputs: ["Operating model update", "Decision log proposal", "Open risks"],
      filesToUpdate: ["../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      redLines: ["Do not grant models authority to make irreversible business decisions.", "Do not store secrets or private credentials.", "Do not update files without confirmation."]
    },
    {
      slug: "business-model",
      title: "Business Model",
      purpose: "Draft revenue, channels, costs and delivery model at the business level.",
      useWhen: ["pricing or revenue logic is unclear", "business model assumptions affect MVP scope", "go-to-market needs a business model baseline"],
      requiredContext: ["../knowledge/business-model-canvas.md", "../../product/knowledge/icp.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Customer segment", "Willingness-to-pay assumption", "Delivery model", "Channel assumption", "Cost drivers"],
      process: ["Draft the simplest viable revenue model.", "List cost and delivery assumptions.", "Identify pricing risks.", "Route detailed finance modeling to Growth Finance when needed."],
      checks: ["Revenue model is plausible for the ICP.", "Costs and delivery assumptions are visible.", "Unknowns are recorded."],
      outputs: ["Business model canvas update", "Pricing assumptions", "Finance follow-up questions"],
      filesToUpdate: ["../knowledge/business-model-canvas.md", "../../../growth/finance/pricing.md"],
      redLines: ["Do not invent pricing validation.", "Do not make financial commitments without evidence.", "Do not update Growth Finance unless that area is active or the user confirms."]
    }
  ];
