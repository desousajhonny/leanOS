import type { AreaDefinition, SkillDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";

export function skillFile(area: AreaDefinition, skill: SkillDefinition): string {
  const frontmatter = skillFrontmatter(skill);

  if (skill.useWhen || skill.requiredContext || skill.inputs || skill.process || skill.checks || skill.outputs || skill.filesToUpdate || skill.redLines) {
    return `${frontmatter}

# ${skill.title}

## Visão Geral

${skill.purpose}

## Use Quando

${skill.useWhen.map((item) => `- ${item}`).join("\n")}

## Contexto Obrigatório

${(skill.requiredContext ?? ["README da área", "Instruções do papel ativo", "Pedido do usuário"]).map((item) => `- ${item}`).join("\n")}

## Entradas

${(skill.inputs ?? ["Knowledge relevante da área", "Instruções do papel ativo", "Pedido do usuário"]).map((item) => `- ${item}`).join("\n")}

## Processo

${renderSkillProcess(skill.process ?? ["Leia o menor contexto relevante.", "Aplique esta skill ao pedido.", "Prepare uma saída concisa ou atualização de arquivo."])}

## Verificações e Critérios de Aceite

${(skill.checks ?? ["Verifique se a saída responde ao pedido ativo.", "Verifique se nenhum fato de produto sem evidência foi inventado."]).map((item) => `- ${item}`).join("\n")}

## Saída

${(skill.outputs ?? ["Resumo", "Decisões", "Atualizações de arquivo sugeridas"]).map((item) => `- ${item}`).join("\n")}

## Arquivos para Atualizar

${(skill.filesToUpdate ?? ["Atualize knowledge relevante da área somente depois de confirmação explícita."]).map((item) => `- ${item}`).join("\n")}

## Linhas Vermelhas

${(skill.redLines ?? ["Não invente fatos específicos do produto.", "Peça confirmação antes de modificar arquivos."]).map((item) => `- ${item}`).join("\n")}
`;
  }

  return `${frontmatter}

# ${skill.title}

## Visão Geral

${skill.purpose}

## Área

\`${area.path}\`

## Entradas

- Arquivos de fonte da verdade da área
- Instruções do papel ativo
- Pedido do usuário

## Processo

${renderSkillProcess(["Leia os menores arquivos relevantes de fonte da verdade.", "Aplique esta skill ao pedido do usuário.", "Prepare uma saída concisa ou atualização de arquivo."])}

## Saída

- Resumo
- Decisões
- Atualizações de arquivo sugeridas
`;
}

function skillFrontmatter(skill: SkillDefinition): string {
  return `---
${stringifyYaml({
  name: skill.slug,
  description: skillDescription(skill)
}).trimEnd()}
---`;
}

function skillDescription(skill: SkillDefinition): string {
  return `Use quando ${skill.useWhen.join("; ")}`;
}

function renderSkillProcess(steps: string[]): string {
  return steps.map((step, index) => `### Etapa ${index + 1}\n\n${step}`).join("\n\n");
}
