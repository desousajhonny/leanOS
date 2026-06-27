import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { engineeringCodeStandardsKnowledge } from "./knowledge/engineering-code-standards.js";
import { engineeringComponentGuidelinesKnowledge } from "./knowledge/engineering-component-guidelines.js";
import { engineeringDataGuidelinesKnowledge } from "./knowledge/engineering-data-guidelines.js";
import { engineeringImplementationNotesKnowledge } from "./knowledge/engineering-implementation-notes.js";
import { engineeringImplementationRulesKnowledge } from "./knowledge/engineering-implementation-rules.js";
import { engineeringPrLogKnowledge } from "./knowledge/engineering-pr-log.js";
import { engineeringReviewCriteriaKnowledge } from "./knowledge/engineering-review-criteria.js";
import { engineeringTestingStrategyKnowledge } from "./knowledge/engineering-testing-strategy.js";

export const operationsEngineeringSourceOfTruth = ["knowledge/code-standards.md", "knowledge/implementation-rules.md", "knowledge/component-guidelines.md", "knowledge/data-guidelines.md", "knowledge/testing-strategy.md", "knowledge/review-criteria.md", "knowledge/implementation-notes.md", "knowledge/code-review-notes.md", "knowledge/pr-log.md"];

export const operationsEngineeringFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Engineering Knowledge", "Durable Engineering rules, standards and implementation notes.", "Use before planning code changes, branch work, tests, PRs or reviews.", "implementation-rules.md", ["code-standards.md", "implementation-rules.md", "component-guidelines.md", "data-guidelines.md", "testing-strategy.md", "review-criteria.md", "implementation-notes.md", "code-review-notes.md", "pr-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product-ops/mvp/", "../../../.github/leanos/"], "Engineering knowledge defines how code should be changed. It does not replace issue scope, PRD, Design or Security review.") },
    { path: "knowledge/code-standards.md", content: engineeringCodeStandardsKnowledge },
    { path: "knowledge/implementation-rules.md", content: engineeringImplementationRulesKnowledge },
    { path: "knowledge/component-guidelines.md", content: engineeringComponentGuidelinesKnowledge },
    { path: "knowledge/data-guidelines.md", content: engineeringDataGuidelinesKnowledge },
    { path: "knowledge/testing-strategy.md", content: engineeringTestingStrategyKnowledge },
    { path: "knowledge/review-criteria.md", content: engineeringReviewCriteriaKnowledge },
    { path: "knowledge/implementation-notes.md", content: engineeringImplementationNotesKnowledge },
    { path: "knowledge/code-review-notes.md", content: () => stateDraft("Code Review Notes", "Capture review observations and risks.") },
    { path: "knowledge/pr-log.md", content: engineeringPrLogKnowledge }
  ];
