import type { AreaFileDefinition } from "../../../../types.js";
import { businessFoundationDraft, businessProfile, decisionLog, folderReadme } from "../../../../content/shared.js";
import { businessModelKnowledge } from "./knowledge/business-model.js";

export const strategyBusinessSourceOfTruth = ["knowledge/profile.md", "knowledge/mission.md", "knowledge/vision.md", "knowledge/principles.md", "knowledge/operating-model.md", "knowledge/business-model-canvas.md", "knowledge/decision-log.md"];

export const strategyBusinessFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Business Knowledge", "Contexto durável de negócio produzido por Strategy Business.", "Use ao definir identidade do negócio, lógica de marca, missão, princípios, modelo operacional, modelo de negócio ou decisões estratégicas.", "profile.md", ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "business-model-canvas.md", "decision-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../roadmap/"], "Mantenha contexto de negócio aqui. Não enriqueça roles, skills ou playbooks com fatos específicos do negócio.") },
    { path: "knowledge/profile.md", content: businessProfile },
    { path: "knowledge/mission.md", content: () => businessFoundationDraft("Missão", "Definir por que o negócio existe, quem ele ajuda primeiro e qual mudança promete gerar.") },
    { path: "knowledge/vision.md", content: () => businessFoundationDraft("Visão", "Descrever o estado futuro que o negócio quer tornar possível se a tese for validada.") },
    { path: "knowledge/principles.md", content: () => businessFoundationDraft("Princípios", "Registrar princípios práticos que guiam tradeoffs de produto, operação, segurança, growth e atendimento.") },
    { path: "knowledge/operating-model.md", content: () => businessFoundationDraft("Modelo Operacional", "Definir como founder, equipe e modelos de IA colaboram sem transferir decisões irreversíveis para automação.") },
    { path: "knowledge/business-model-canvas.md", content: businessModelKnowledge },
    { path: "knowledge/decision-log.md", content: () => decisionLog("Decision Log") }
  ];
