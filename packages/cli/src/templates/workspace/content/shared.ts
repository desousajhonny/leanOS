import type { WorkspaceAnswers } from "../types.js";

export function companyProfile(answers: WorkspaceAnswers): string {
  return `# Company Profile

- Company: ${answers.companyName}
- Operating mode: ${answers.mode}
- Current stage: ${answers.stage}

## Draft

Describe what the company is building, who it serves and why now.
`;
}

export function productBrief(answers: WorkspaceAnswers): string {
  return `# Product Brief

- Product: ${answers.productName}
- Type: ${answers.productType}
- Status: ${answers.productStatus}
- Primary user: ${answers.targetUser}

## Description

${answers.description}

## Draft

Clarify customer, problem, value proposition, MVP and validation path.
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
  return `# ${title}

${guidance}

## Draft

TBD
`;
}

export function decisionLog(title: string): string {
  return `# ${title}

| Date | Decision | Context | Owner |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
`;
}

export function learningLog(): string {
  return `# Learning Log

| Date | Source | Learning | Impact |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
`;
}

export function checklist(title: string): string {
  return `# ${title}

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
  return `/${slug.replace(/-/g, " ")}`;
}

export function toTitle(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
