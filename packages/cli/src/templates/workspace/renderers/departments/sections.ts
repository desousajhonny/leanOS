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
  return `## Owner

- Department: \`${owner.department}\`
${owner.primaryArea ? `- Primary area: \`${owner.primaryArea}\`\n` : ""}${owner.supportingAreas?.length ? `- Supporting areas: ${owner.supportingAreas.map((area) => `\`${area}\``).join(", ")}\n` : ""}${owner.conditionalAreas?.length ? `- Conditional areas: ${owner.conditionalAreas.map((area) => `\`${area}\``).join(", ")}\n` : ""}
`;
}

export function conditionalAreasSection(conditionalAreas: NonNullable<DepartmentWorkflowDefinition["conditionalAreas"]>): string {
  return `## Conditional Areas

${conditionalAreas.map((item) => `- \`${item.area}\`: ${item.when}`).join("\n")}

`;
}

export function continuationBridgeSection(workflow: DepartmentWorkflowDefinition): string {
  const bridge = workflow.continuationBridge;
  if (!bridge) {
    return "";
  }

  const rules = bridge.rules ?? [
    "Do not automatically start the next journey without founder confirmation.",
    "If the founder says yes, declare the new route before loading the next workflow.",
    "If the founder says no, explain the current outcome and stop without writing anything else.",
    "If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally."
  ];

  return `## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

\`\`\`text
${bridge.immediate}
\`\`\`

Later-session triggers:

${bridge.laterTriggers.map((trigger) => `- "${trigger}"`).join("\n")}

Next route:

\`${bridge.nextRoute}\`

Rules:

${rules.map((rule) => `- ${rule}`).join("\n")}
`;
}

export function guidedConversationSection(items: string[]): string {
  return `## Guided Conversation

Use \`../../../ai-standard/foundation/guided-conversation.md\`.

${items.map((item) => `- ${item}`).join("\n")}

Do not ask a rigid questionnaire. Ask only what is missing.`;
}
