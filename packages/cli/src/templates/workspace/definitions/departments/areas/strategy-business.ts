import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";

function businessModelKnowledge(): string {
  return `# Business Model Canvas

## Purpose

Define how the business can create, deliver and capture value as the product evolves.

## Current State

TBD

## Customer Segments

TBD

## Channels

TBD

## Revenue Model

TBD

## Cost Drivers

TBD

## Key Activities

TBD

## Key Partners

TBD

## Assumptions to Validate

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export const strategyBusinessArea: AreaDefinition = {
  key: "strategy.business",
  root: "strategy",
  slug: "business",
  name: "Business",
  path: "strategy/business",
  lead: {
    title: "Business Lead",
    purpose: "Route business identity, brand logic, mission, principles and operating model work."
  },
  routingKey: "business",
  requestTypes: "business, brand, mission, vision, principles, operating model, business model or revenue logic",
  purpose: "Keep business identity, principles, mission, operating decisions and business model coherent.",
  whenToUse: ["define business identity", "clarify mission", "capture principles", "define business model", "record strategic decisions"],
  sourceOfTruth: ["knowledge/profile.md", "knowledge/mission.md", "knowledge/vision.md", "knowledge/principles.md", "knowledge/operating-model.md", "knowledge/business-model-canvas.md", "knowledge/decision-log.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Business Knowledge", "Durable business context produced by Strategy Business.", "Use when defining business identity, brand logic, mission, principles, operating model, business model or strategic decisions.", "profile.md", ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "business-model-canvas.md", "decision-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../roadmap/"], "Keep business context here. Do not enrich roles, skills or playbooks with business-specific facts.") },
    { path: "knowledge/profile.md", content: businessProfile },
    { path: "knowledge/mission.md", content: () => titledDraft("Mission", "Define why the business exists and who it serves.") },
    { path: "knowledge/vision.md", content: () => titledDraft("Vision", "Describe the future state this business wants to create.") },
    { path: "knowledge/principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
    { path: "knowledge/operating-model.md", content: () => titledDraft("Operating Model", "Define how the business operates with humans and AI models.") },
    { path: "knowledge/business-model-canvas.md", content: businessModelKnowledge },
    { path: "knowledge/decision-log.md", content: () => decisionLog("Decision Log") }
  ],
  roles: [
    {
      slug: "business-strategist",
      title: "Business Strategist",
      purpose: "Clarify business context, principles, operating model, business model and decision quality.",
      useWhen: ["business direction is unclear", "operating model needs definition", "business model or revenue logic needs definition", "a strategic decision must be recorded"],
      beforeActing: ["../knowledge/profile.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/business-model-canvas.md", "../knowledge/decision-log.md"],
      skills: ["business-identity", "operating-model", "business-model"],
      playbooks: ["business-foundation"]
    }
  ],
  skills: [
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
  ],
  playbooks: [
    {
      slug: "business-foundation",
      title: "Business Foundation",
      purpose: "Move from raw business context to usable identity, principles and operating model.",
      inputs: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      steps: ["Load the Business AGENT and Business Strategist role.", "Clarify business profile and mission.", "Identify principles that affect product, roadmap and execution decisions.", "Define how the founder and AI agents collaborate.", "Record decisions and open questions.", "Propose file updates and wait for confirmation before writing."],
      outputs: ["Business foundation summary", "Mission/principles proposal", "Operating model proposal", "Decision log entries"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"]
    }
  ],
  commonPaths: [
    "Business request: `AGENT.md` -> role `roles/business-strategist.role.md` -> skill `skills/business-identity/SKILL.md`, `skills/operating-model/SKILL.md` or `skills/business-model/SKILL.md` -> playbook `playbooks/business-foundation.playbook.md` when foundation work is needed."
  ]
};
