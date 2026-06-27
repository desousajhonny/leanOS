import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { productProblemKnowledge } from "./knowledge/product-problem.js";
import { productIcpKnowledge } from "./knowledge/product-icp.js";
import { productJobsKnowledge } from "./knowledge/product-jobs.js";
import { productValuePropositionKnowledge } from "./knowledge/product-value-proposition.js";
import { productPositioningKnowledge } from "./knowledge/product-positioning.js";
import { productValidationNotesKnowledge } from "./knowledge/product-validation-notes.js";
import { productMvpValidationScopeKnowledge } from "./knowledge/product-mvp-validation-scope.js";

export const strategyProductSourceOfTruth = ["knowledge/brief.md", "knowledge/problem.md", "knowledge/icp.md", "knowledge/jobs-to-be-done.md", "knowledge/value-proposition.md", "knowledge/positioning.md", "knowledge/mvp-validation-scope.md", "knowledge/validation-notes.md"];

export const strategyProductFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Product Knowledge", "Durable product context produced by Strategy Product.", "Use when defining product strategy, product core, ICP, value proposition, MVP validation scope, positioning, lightweight validation notes or product coherence.", "brief.md", ["brief.md", "problem.md", "icp.md", "jobs-to-be-done.md", "value-proposition.md", "positioning.md", "mvp-validation-scope.md", "validation-notes.md"], ["../roles/", "../skills/", "../playbooks/", "../../business/", "../../roadmap/"], "Keep company/product context here. Do not enrich roles, skills or playbooks with company-specific facts.") },
    { path: "knowledge/brief.md", content: productBrief },
    { path: "knowledge/problem.md", content: productProblemKnowledge },
    { path: "knowledge/icp.md", content: productIcpKnowledge },
    { path: "knowledge/jobs-to-be-done.md", content: productJobsKnowledge },
    { path: "knowledge/value-proposition.md", content: productValuePropositionKnowledge },
    { path: "knowledge/positioning.md", content: productPositioningKnowledge },
    { path: "knowledge/mvp-validation-scope.md", content: productMvpValidationScopeKnowledge },
    { path: "knowledge/validation-notes.md", content: productValidationNotesKnowledge }
  ];
