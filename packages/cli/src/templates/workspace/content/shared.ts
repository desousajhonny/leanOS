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

Capture validated learning and its impact on the workspace.

## Current State

No learning recorded yet.

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD

## Learning Entries

| Date | Source | Learning | Impact |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
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
