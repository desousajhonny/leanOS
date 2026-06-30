import type { AreaDefinition, DepartmentWorkflowDefinition, RootDepartmentDefinition } from "../../types.js";
import { toTitle } from "../../content/shared.js";
import { conditionalAreasSection, continuationBridgeSection, listSection, orderedSection, ownerSection } from "./sections.js";

export function departmentWorkflowFile(department: RootDepartmentDefinition, activeAreas: AreaDefinition[], workflow: DepartmentWorkflowDefinition): string {
  const activeSlugs = new Set(activeAreas.map((area) => area.slug));
  const missingAreas = workflow.requiredAreas.filter((area) => !activeSlugs.has(area));

  return `# Workflow ${toTitle(workflow.slug)}

## Propósito

${workflow.purpose}

${workflow.founderTriggers ? listSection("Gatilhos do Founder", workflow.founderTriggers.map((trigger) => `"${trigger}"`)) : ""}${workflow.progressionStage ? `## Estágio de Progressão\n\n${workflow.progressionStage}\n\n` : ""}${workflow.entryGate ? listSection("Gate de Entrada", workflow.entryGate) : ""}${workflow.activeRequirements ? listSection("Requisitos Ativos", workflow.activeRequirements) : ""}${workflow.activationRequirements ? listSection("Requisitos de Ativação", workflow.activationRequirements) : ""}${workflow.owner ? ownerSection(workflow.owner) : ""}## Áreas Obrigatórias

${workflow.requiredAreas.map((area) => `- ${area}`).join("\n")}

${workflow.conditionalAreas ? conditionalAreasSection(workflow.conditionalAreas) : ""}${missingAreas.length > 0 ? `## Disponibilidade\n\nEste workflow referencia áreas que ainda não estão ativas: ${missingAreas.join(", ")}.\n\nNão carregue paths de áreas ausentes. Pergunte se deve ativar ou criar a área antes de executar este workflow.\n` : "## Disponibilidade\n\nTodas as áreas obrigatórias estão ativas neste departamento.\n"}

${workflow.loadFirst ? listSection("Carregar Primeiro", workflow.loadFirst.map((path) => `\`${path}\``)) : ""}${workflow.navigationRoute ? orderedSection("Rota de Navegação", workflow.navigationRoute.map((path) => `\`${path}\``)) : ""}${workflow.phases ? listSection("Fases", workflow.phases) : ""}${workflow.decisionOutputs ? listSection("Decisões Possíveis", workflow.decisionOutputs.map((decision) => `\`${decision}\``)) : ""}${workflow.skillsUsed ? listSection("Skills Usadas", workflow.skillsUsed.map((skill) => `\`${skill}\``)) : ""}${workflow.playbooksUsed ? listSection("Playbooks Usados", workflow.playbooksUsed.map((playbook) => `\`${playbook}\``)) : ""}## Sequência

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

${workflow.confirmationGates ? listSection("Gates de Confirmação", workflow.confirmationGates) : ""}${workflow.allowedUpdates ? listSection("Atualizações Permitidas", workflow.allowedUpdates.map((path) => `\`${path}\``)) : ""}${workflow.forbiddenUpdates ? listSection("Atualizações Proibidas", workflow.forbiddenUpdates.map((path) => `\`${path}\``)) : ""}${workflow.externalCapabilities ? listSection("Capacidades Externas", workflow.externalCapabilities) : ""}${workflow.stopConditions ? listSection("Condições de Parada", workflow.stopConditions) : ""}${workflow.expectedOutput ? listSection("Saída Esperada", workflow.expectedOutput) : ""}${workflow.continuationBridge ? continuationBridgeSection(workflow) : ""}

## Navegação

Use os READMEs das áreas de ${department.name} em cada etapa para preservar ownership por área.
`;
}
