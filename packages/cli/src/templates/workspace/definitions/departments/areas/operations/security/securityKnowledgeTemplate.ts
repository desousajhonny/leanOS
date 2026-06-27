export function securityKnowledge(title: string, purpose: string, whatToDocument: string[], requiredChecks: string[], redLines: string[], relatedPlaybooks: string[], references: string[] = []): string {
  return `# ${title}

## Purpose

${purpose}

## What to Document

${whatToDocument.map((item) => `- ${item}`).join("\n")}

## Required Checks

${requiredChecks.map((item) => `- ${item}`).join("\n")}

## Red Lines

${redLines.map((item) => `- ${item}`).join("\n")}

## Related Playbooks

${relatedPlaybooks.map((item) => `- \`${item}\``).join("\n")}
${references.length ? `\n## References\n\n${references.map((item) => `- ${item}`).join("\n")}\n` : ""}`;
}
