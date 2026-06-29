import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { businessModelKnowledge } from "./knowledge/business-model.js";

export const strategyBusinessSourceOfTruth = ["knowledge/profile.md", "knowledge/mission.md", "knowledge/vision.md", "knowledge/principles.md", "knowledge/operating-model.md", "knowledge/business-model-canvas.md", "knowledge/decision-log.md"];

export const strategyBusinessFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Business Knowledge", "Contexto durável de negócio produzido por Strategy Business.", "Use ao definir identidade do negócio, lógica de marca, missão, princípios, modelo operacional, modelo de negócio ou decisões estratégicas.", "profile.md", ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "business-model-canvas.md", "decision-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../roadmap/"], "Mantenha contexto de negócio aqui. Não enriqueça roles, skills ou playbooks com fatos específicos do negócio.") },
    { path: "knowledge/profile.md", content: businessProfile },
    { path: "knowledge/mission.md", content: () => titledDraft("Mission", "Define why the business exists and who it serves.") },
    { path: "knowledge/vision.md", content: () => titledDraft("Vision", "Describe the future state this business wants to create.") },
    { path: "knowledge/principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
    { path: "knowledge/operating-model.md", content: () => titledDraft("Operating Model", "Define how the business operates with humans and AI models.") },
    { path: "knowledge/business-model-canvas.md", content: businessModelKnowledge },
    { path: "knowledge/decision-log.md", content: () => decisionLog("Decision Log") }
  ];
