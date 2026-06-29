export function securityKnowledge(title: string, purpose: string, whatToDocument: string[], requiredChecks: string[], redLines: string[], relatedPlaybooks: string[], references: string[] = []): string {
  return `# ${title}

## Propósito

${purpose}

## O Que Documentar

${whatToDocument.map((item) => `- ${item}`).join("\n")}

## Verificações Obrigatórias

${requiredChecks.map((item) => `- ${item}`).join("\n")}

## Linhas Vermelhas

${redLines.map((item) => `- ${item}`).join("\n")}

## Related Playbooks

${relatedPlaybooks.map((item) => `- \`${item}\``).join("\n")}
${references.length ? `\n## References\n\n${references.map((item) => `- ${item}`).join("\n")}\n` : ""}`;
}
