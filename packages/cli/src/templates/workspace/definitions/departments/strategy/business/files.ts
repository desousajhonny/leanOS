import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { businessModelKnowledge } from "./knowledge/business-model.js";

export const strategyBusinessSourceOfTruth = ["knowledge/profile.md", "knowledge/mission.md", "knowledge/vision.md", "knowledge/principles.md", "knowledge/operating-model.md", "knowledge/business-model-canvas.md", "knowledge/decision-log.md"];

export const strategyBusinessFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Business Knowledge", "Durable business context produced by Strategy Business.", "Use when defining business identity, brand logic, mission, principles, operating model, business model or strategic decisions.", "profile.md", ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "business-model-canvas.md", "decision-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../roadmap/"], "Keep business context here. Do not enrich roles, skills or playbooks with business-specific facts.") },
    { path: "knowledge/profile.md", content: businessProfile },
    { path: "knowledge/mission.md", content: () => titledDraft("Mission", "Define why the business exists and who it serves.") },
    { path: "knowledge/vision.md", content: () => titledDraft("Vision", "Describe the future state this business wants to create.") },
    { path: "knowledge/principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
    { path: "knowledge/operating-model.md", content: () => titledDraft("Operating Model", "Define how the business operates with humans and AI models.") },
    { path: "knowledge/business-model-canvas.md", content: businessModelKnowledge },
    { path: "knowledge/decision-log.md", content: () => decisionLog("Decision Log") }
  ];
