// Shared helpers for generated area definitions.

export function growthKnowledge(title: string, purpose: string, sections: string[]): string {
  return `# ${title}

## Purpose

${purpose}

## Current State

TBD

${sections.map((section) => `## ${section}\n\nTBD`).join("\n\n")}

## Decisions

TBD

## Risks

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}
