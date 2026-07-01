import type { AreaFileDefinition } from "../../../../types.js";
import { stateDraft } from "../../../../content/shared.js";
import { engineeringCodeStandardsKnowledge } from "./knowledge/engineering-code-standards.js";
import { engineeringComponentGuidelinesKnowledge } from "./knowledge/engineering-component-guidelines.js";
import { engineeringDataGuidelinesKnowledge } from "./knowledge/engineering-data-guidelines.js";
import { engineeringImplementationNotesKnowledge } from "./knowledge/engineering-implementation-notes.js";
import { engineeringImplementationRulesKnowledge } from "./knowledge/engineering-implementation-rules.js";
import { engineeringPrLogKnowledge } from "./knowledge/engineering-pr-log.js";
import { engineeringReviewCriteriaKnowledge } from "./knowledge/engineering-review-criteria.js";
import { engineeringTestingStrategyKnowledge } from "./knowledge/engineering-testing-strategy.js";
import { engineeringWorkspaceHygieneKnowledge } from "./knowledge/engineering-workspace-hygiene.js";

export const operationsEngineeringSourceOfTruth = ["knowledge/code-standards.md", "knowledge/implementation-rules.md", "knowledge/component-guidelines.md", "knowledge/data-guidelines.md", "knowledge/workspace-hygiene.md", "knowledge/testing-strategy.md", "knowledge/review-criteria.md", "knowledge/implementation-notes.md", "knowledge/code-review-notes.md", "knowledge/pr-log.md"];

function engineeringKnowledgeReadme(): string {
  return `# Engineering Knowledge

## Propósito

Durable rules, standards and execution notes for Engineering work.

## When To Use

Use this folder before planning code changes, branch work, tests, PRs or reviews.

## Responsabilidades dos Arquivos

- \`code-standards.md\`: durable code quality, modularization, naming, error handling and configuration rules.
- \`implementation-rules.md\`: required process before and during implementation, including branch, scope, Design, Security, Data and done criteria.
- \`component-guidelines.md\`: durable rules for component creation, reuse, ownership, accessibility and Design dependency.
- \`data-guidelines.md\`: durable rules for API, persistence, schema, migration, validation, sensitive data and rollback work.
- \`workspace-hygiene.md\`: regras para scripts temporários, scratch local, sweep antes de PR e promoção de scripts permanentes.
- \`testing-strategy.md\`: orientação durável para testes unitários, integração, e2e, validação manual, cobertura de regressão e lacunas de teste.
- \`review-criteria.md\`: durable criteria for Engineering review and merge recommendation.
- \`implementation-notes.md\`: active or Feature-specific engineering notes; promote only durable repeated lessons into the framework rule files.
- \`code-review-notes.md\`: temporary observations from a specific review cycle; do not treat as global policy.
- \`pr-log.md\`: PR preparation and handoff state; do not treat as global policy.

## Related Inputs

- \`../roles/\`
- \`../skills/\`
- \`../playbooks/\`
- \`../../product-ops/mvp/\`
- \`.github/leanos/\`

## Boundary

Engineering knowledge defines how code should be changed. It does not replace issue scope, PRD, Design, Security, DevOps or founder approval.
`;
}

export const operationsEngineeringFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: engineeringKnowledgeReadme },
    { path: "knowledge/code-standards.md", content: engineeringCodeStandardsKnowledge },
    { path: "knowledge/implementation-rules.md", content: engineeringImplementationRulesKnowledge },
    { path: "knowledge/component-guidelines.md", content: engineeringComponentGuidelinesKnowledge },
    { path: "knowledge/data-guidelines.md", content: engineeringDataGuidelinesKnowledge },
    { path: "knowledge/workspace-hygiene.md", content: engineeringWorkspaceHygieneKnowledge },
    { path: "knowledge/testing-strategy.md", content: engineeringTestingStrategyKnowledge },
    { path: "knowledge/review-criteria.md", content: engineeringReviewCriteriaKnowledge },
    { path: "knowledge/implementation-notes.md", content: engineeringImplementationNotesKnowledge },
    { path: "knowledge/code-review-notes.md", content: () => stateDraft("Code Review Notes", "Capture review observations and risks.") },
    { path: "knowledge/pr-log.md", content: engineeringPrLogKnowledge }
  ];
