import type { WorkspaceAnswers } from "../types.js";

export function companyProfile(answers: WorkspaceAnswers): string {
  return `# Company Profile

## Purpose

Capture the initial company context collected by LeanOS.

## Current State

- Company: ${answers.companyName}
- Operating mode: ${answers.mode}
- Current stage: ${answers.stage}

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function productBrief(answers: WorkspaceAnswers): string {
  return `# Product Brief

## Purpose

Capture the initial product context collected by LeanOS.

## Current State

- Product: ${answers.productName}
- Type: ${answers.productType}
- Status: ${answers.productStatus}
- Primary user: ${answers.targetUser}

## Description

${answers.description}

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function folderReadme(title: string, purpose: string, whenToUse: string, sourceOfTruth: string, files: string[], relatedFolders: string[], agentNotes: string): string {
  return `# ${title}

## Purpose

${purpose}

## When to Use

${whenToUse}

## Source of Truth

\`${sourceOfTruth}\`

## Files

${files.map((file) => `- \`${file}\``).join("\n")}

## Related Folders

${relatedFolders.map((folder) => `- \`${folder}\``).join("\n")}

## Navigation

Use this README to choose the next specific file. Do not load unrelated files.

## Agent Notes

${agentNotes}
`;
}

export function titledDraft(title: string, guidance: string): string {
  return stateDraft(title, guidance);
}

export function stateDraft(title: string, purpose: string): string {
  return `# ${title}

## Purpose

${purpose}

## Current State

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function decisionLog(title: string): string {
  return `# ${title}

## Purpose

Capture durable decisions and why they were made.

## Current State

No decisions recorded yet.

## Decisions

| Date | Decision | Context | Owner |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Open Questions

TBD

## Next Update

TBD
`;
}

export function learningLog(): string {
  return `# Learning Log

## Purpose

Capture validated learning and its impact on roadmap, backlog and product decisions.

## Current State

No learning recorded yet.

## Validation Loop

Use this sequence:

1. Assumption
2. Experiment
3. Evidence
4. Insight
5. Decision
6. Roadmap impact

## Evidence Rules

- Assumption: something believed but not yet proven.
- Evidence: something observed from users, behavior, data or shipped product.
- Insight: interpretation of evidence.
- Decision: a committed change in strategy, MVP, roadmap or backlog.
- Roadmap impact: what changes because of the decision.

Do not record an assumption as validated learning without evidence.

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD

## Learning Entries

| Date | Assumption | Experiment | Evidence | Insight | Decision | Roadmap Impact |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |
`;
}

export function assumptionsRegister(): string {
  return `# Assumptions

## Purpose

List assumptions behind customer, problem, value and MVP before treating them as facts.

## Current State

No assumptions prioritized yet.

## How to Use

Use this file as the assumption register for product, customer, problem, value and MVP claims.

Do not write conclusions here as facts. Write them as assumptions until evidence exists.

## Validation Loop

Each assumption should move through:

\`assumption -> experiment -> evidence -> decision -> roadmap impact\`

## Assumption Types

- customer: who the product is for.
- problem: the pain, frequency or urgency being assumed.
- value: the outcome or promise believed to matter.
- MVP: the smallest scope believed to validate the product.
- channel: how the user will discover or adopt the product.
- business: pricing, willingness to pay or unit economics.

## Evidence Status

- untested: no evidence yet.
- weak_signal: anecdote, opinion or very small signal.
- tested: experiment completed, evidence recorded.
- validated: enough evidence to support a decision.
- invalidated: evidence suggests the assumption is false.

## Assumption Register

| ID | Assumption | Type | Source | Confidence | Evidence Status | Next Experiment |
| --- | --- | --- | --- | --- | --- | --- |
| A-001 | TBD | customer/problem/value/MVP | TBD | low/medium/high | untested | TBD |

## Entry Template

Use this shape when adding a new assumption:

| ID | Assumption | Type | Source | Confidence | Evidence Status | Next Experiment |
| --- | --- | --- | --- | --- | --- | --- |
| A-002 | We believe [primary user] has [problem] often enough to care about [value promise]. | problem | founder belief / user signal | low | untested | Interview 5 target users |

## Promotion Checklist

Before moving an assumption into learning or roadmap:

- [ ] Evidence source is named.
- [ ] Success or failure signal is defined.
- [ ] Evidence is separated from interpretation.
- [ ] Decision is explicit.
- [ ] Roadmap or backlog impact is recorded when relevant.

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function riskiestAssumptions(): string {
  return `# Riskiest Assumptions

## Purpose

Prioritize assumptions that could invalidate the product, MVP or roadmap.

## Current State

No riskiest assumptions selected yet.

## Prioritization Criteria

- Importance: would this break the product if false?
- Uncertainty: how little evidence do we have?
- Testability: can we learn quickly?
- Cost of delay: what happens if we postpone learning?

## Ranked Risks

| Rank | Assumption ID | Risk | Why It Matters | Next Experiment | Decision Needed |
| --- | --- | --- | --- | --- | --- |
| 1 | TBD | TBD | TBD | TBD | TBD |

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function validationExperiments(): string {
  return `# Experiments

## Purpose

Plan experiments that produce evidence for the riskiest assumptions.

## Current State

No experiments planned yet.

## Experiment Rules

- Every experiment must link to an assumption.
- Define success and failure signals before running it.
- Separate observed evidence from interpretation.
- Record decision and roadmap impact after the experiment.

## Experiment Plan

| ID | Assumption ID | Method | Audience | Success Signal | Failure Signal | Status |
| --- | --- | --- | --- | --- | --- | --- |
| E-001 | TBD | interview/landing-page/prototype/manual-test/data-review | TBD | TBD | TBD | planned |

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function validationSuccessMetrics(): string {
  return `# Success Metrics

## Purpose

Define validation signals before treating learning as evidence.

## Current State

No success metrics defined yet.

## Metric Rules

- Metrics must connect to assumptions or experiments.
- Qualitative evidence is allowed, but must name the source.
- A signal is not a decision; decisions are recorded after interpreting evidence.

## Metrics

| Metric | Linked Assumption or Experiment | Success Threshold | Failure Threshold | Evidence Source |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function checklist(title: string): string {
  return `# ${title}

## Purpose

Track readiness without inventing project-specific facts.

## Current State

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD

## Checklist

- [ ] Context reviewed
- [ ] Scope is coherent
- [ ] Risks are visible
- [ ] Next action is clear
`;
}

export function standardTemplate(fileName: string): string {
  return `# ${toTitle(fileName.replace(/\.(md|yaml)$/, ""))}

Use this template as a starting point.

## Required

- Purpose
- Inputs
- Process
- Output
- Navigation
`;
}

export function qualityChecklist(name: string): string {
  return `# ${name} Quality Checklist

- [ ] Purpose is clear
- [ ] Source-of-truth files are referenced
- [ ] Navigation is explicit
- [ ] Output expectations are clear
- [ ] No inactive or missing paths are required
`;
}

export function creationInstructions(assetName: string): string {
  return `# Create ${assetName} Instructions

1. Read \`../README.md\`.
2. Choose the active department and area.
3. Use the matching template.
4. Validate with the matching checklist.
5. Create the asset inside the selected area.
`;
}

export function formatCommandInvocation(slug: string): string {
  if (slug === "start-leanos") return "/start-leanos";

  return `/${slug.replace(/-/g, " ")}`;
}

export function toTitle(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
