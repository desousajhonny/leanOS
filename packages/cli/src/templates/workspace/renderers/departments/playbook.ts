import type { AreaDefinition, PlaybookDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";
import { guidedConversationSection } from "./sections.js";

function playbookDescription(playbook: PlaybookDefinition): string {
  const triggers = playbook.useWhen?.length ? playbook.useWhen.join("; ") : `${playbook.title.toLowerCase()} é necessário para o pedido ativo`;
  return `Use quando ${triggers}`;
}

function playbookFrontmatter(playbook: PlaybookDefinition): string {
  return `---
${stringifyYaml({
    name: playbook.slug,
    description: playbookDescription(playbook)
  }).trimEnd()}
---`;
}

export function playbookFile(area: AreaDefinition, playbook: PlaybookDefinition): string {
  const areaOwner = area.lead ? "../AGENT.md" : "../README.md";
  const frontmatter = playbookFrontmatter(playbook);

  const guidedConv = playbook.guidedConversation ? `\n\n${guidedConversationSection(playbook.guidedConversation)}` : "";
  const gatesSec = playbook.gates ? `\n\n## Gates\n\n${playbook.gates.map((item) => `- ${item}`).join("\n")}` : "";

  return `${frontmatter}

# ${playbook.title}

## Propósito

${playbook.purpose}

## Use Quando

${(playbook.useWhen ?? ["Use quando esta sequência de execução corresponder ao pedido ativo."]).map((item) => `- ${item}`).join("\n")}

## Antes de Agir

${(playbook.beforeActing ?? [areaOwner, "../area.yaml"]).map((item) => `- \`${item}\``).join("\n")}

## Entradas

${(playbook.inputs ?? ["Knowledge da área", "Instruções do papel ativo", "Pedido do usuário"]).map((input) => `- ${input}`).join("\n")}

## Processo

${playbook.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}${guidedConv}${gatesSec}

## Condições de Parada

${(playbook.stopConditions ?? ["Pare e peça confirmação antes de alterar arquivos sensíveis de segurança."]).map((item) => `- ${item}`).join("\n")}

## Critérios de Aceite e Saídas

${(playbook.outputs ?? ["Resumo da decisão ou ação", "Arquivos de knowledge atualizados quando solicitado", "Próxima ação LeanOS recomendada"]).map((output) => `- ${output}`).join("\n")}

## Arquivos para Atualizar

${(playbook.filesToUpdate ?? ["Atualize knowledge relevante da área somente depois de confirmação explícita."]).map((file) => `- ${file}`).join("\n")}

## Linhas Vermelhas

${(playbook.redLines ?? ["Não duplique um workflow.", "Não duplique skills.", "Não invente contexto ausente.", "Não atualize arquivos sem confirmação explícita."]).map((item) => `- ${item}`).join("\n")}

## Navegação

Comece em \`${areaOwner}\`, escolha um papel em \`../roles/\`, carregue as skills necessárias em \`../skills/\` e então use este playbook.
`;
}
