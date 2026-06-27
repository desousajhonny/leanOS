import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { customerFeedbackKnowledge } from "./knowledge/customer-feedback.js";
import { supportNotesKnowledge } from "./knowledge/support-notes.js";
import { successMomentsKnowledge } from "./knowledge/success-moments.js";
import { churnReasonsKnowledge } from "./knowledge/churn-reasons.js";

export const growthCustomerExperienceSourceOfTruth = ["knowledge/customer-feedback.md", "knowledge/support-notes.md", "knowledge/churn-reasons.md", "knowledge/success-moments.md"];

export const growthCustomerExperienceFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Customer Experience Knowledge", "Customer learning context for feedback, support patterns, success moments and churn reasons.", "Use after launch or user testing when customer signals should inform product or growth decisions.", "customer-feedback.md", ["customer-feedback.md", "support-notes.md", "success-moments.md", "churn-reasons.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../marketing/", "../../finance/"], "Keep customer data minimal. Capture patterns and learning, not private details.") },
    { path: "knowledge/customer-feedback.md", content: () => customerFeedbackKnowledge() },
    { path: "knowledge/support-notes.md", content: () => supportNotesKnowledge() },
    { path: "knowledge/churn-reasons.md", content: () => churnReasonsKnowledge() },
    { path: "knowledge/success-moments.md", content: () => successMomentsKnowledge() }
  ];
