import type { DepartmentWorkflowDefinition } from "../../types.js";

export function listSection(title: string, items: string[]): string {
  return `## ${title}

${items.map((item) => `- ${item}`).join("\n")}

`;
}

export function orderedSection(title: string, items: string[]): string {
  return `## ${title}

${items.map((item, index) => `${index + 1}. ${item}`).join("\n")}

`;
}

export function ownerSection(owner: NonNullable<DepartmentWorkflowDefinition["owner"]>): string {
  return `## Dono

- Departamento: \`${owner.department}\`
${owner.primaryArea ? `- Área primária: \`${owner.primaryArea}\`\n` : ""}${owner.supportingAreas?.length ? `- Áreas de apoio: ${owner.supportingAreas.map((area) => `\`${area}\``).join(", ")}\n` : ""}${owner.conditionalAreas?.length ? `- Áreas condicionais: ${owner.conditionalAreas.map((area) => `\`${area}\``).join(", ")}\n` : ""}
`;
}

export function conditionalAreasSection(conditionalAreas: NonNullable<DepartmentWorkflowDefinition["conditionalAreas"]>): string {
  return `## Áreas Condicionais

${conditionalAreas.map((item) => `- \`${item.area}\`: ${item.when}`).join("\n")}

`;
}

export function continuationBridgeSection(workflow: DepartmentWorkflowDefinition): string {
  const bridge = workflow.continuationBridge;
  if (!bridge) {
    return "";
  }

  const rules = bridge.rules ?? [
    "Não inicie automaticamente a próxima jornada sem confirmação do founder.",
    "Se o founder disser sim, declare a nova rota antes de carregar o próximo workflow.",
    "Se o founder disser não, explique o resultado atual e pare sem escrever mais nada.",
    "Se o founder retornar em uma sessão futura com um gatilho compatível, reinicie pelo `AGENT.md` raiz e roteie normalmente."
  ];

  return `## Ponte de Continuação

Ao final deste workflow, ofereça uma ponte clara para o próximo passo quando existir um fluxo seguinte seguro.

Ponte imediata:

\`\`\`text
${bridge.immediate}
\`\`\`

Gatilhos para sessões futuras:

${bridge.laterTriggers.map((trigger) => `- "${trigger}"`).join("\n")}

Próxima rota:

\`${bridge.nextRoute}\`

Regras:

${rules.map((rule) => `- ${rule}`).join("\n")}
`;
}

export function guidedConversationSection(items: string[]): string {
  return `## Conversa Guiada

Use \`../../../ai-standard/foundation/guided-conversation.md\`.

${items.map((item) => `- ${item}`).join("\n")}

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.`;
}
