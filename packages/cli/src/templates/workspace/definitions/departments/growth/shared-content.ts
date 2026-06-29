// Shared helpers for generated area definitions.

export function growthKnowledge(title: string, purpose: string, sections: string[]): string {
  return `# ${title}

## Propósito

${purpose}

## Estado Atual

TBD

${sections.map((section) => `## ${section}\n\nTBD`).join("\n\n")}

## Decisões

TBD

## Riscos

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
