import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { customerFeedbackKnowledge } from "./knowledge/customer-feedback.js";
import { supportNotesKnowledge } from "./knowledge/support-notes.js";
import { successMomentsKnowledge } from "./knowledge/success-moments.js";
import { churnReasonsKnowledge } from "./knowledge/churn-reasons.js";

export const growthCustomerExperienceSourceOfTruth = ["knowledge/customer-feedback.md", "knowledge/support-notes.md", "knowledge/churn-reasons.md", "knowledge/success-moments.md"];

export const growthCustomerExperienceFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Customer Experience Knowledge", "Contexto de aprendizado de clientes para feedback, padrões de suporte, momentos de sucesso e razões de churn.", "Use após lançamento ou teste com usuários quando sinais de clientes devem informar decisões de produto ou growth.", "customer-feedback.md", ["customer-feedback.md", "support-notes.md", "success-moments.md", "churn-reasons.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../marketing/", "../../finance/"], "Mantenha dados de cliente mínimos. Capture padrões e aprendizados, não detalhes privados.") },
    { path: "knowledge/customer-feedback.md", content: () => customerFeedbackKnowledge() },
    { path: "knowledge/support-notes.md", content: () => supportNotesKnowledge() },
    { path: "knowledge/churn-reasons.md", content: () => churnReasonsKnowledge() },
    { path: "knowledge/success-moments.md", content: () => successMomentsKnowledge() }
  ];
