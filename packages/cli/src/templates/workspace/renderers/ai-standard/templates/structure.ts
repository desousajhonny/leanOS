export function areaReadmeTemplate(): string {
  return `# <Area>

## Propósito

O que esta área possui.

## Use Quando

- <intent or situation>

## Fonte da Verdade

- \`<file>.md\`

## Navegação

1. Se esta área tiver \`AGENT.md\`, comece ali para roteamento operacional.
2. Use este README como mapa do diretório.
3. Depois que o dono da área selecionar um papel, carregue apenas skills e playbooks obrigatórios.
4. Produza a saída solicitada e atualize arquivos de fonte da verdade quando necessário.

## Responsabilidades dos Arquivos

- \`AGENT.md\`: dono operacional opcional da área.
- \`README.md\`: mapa e explicação da área.
- \`area.yaml\`: estrutura legível por máquina para esta área.
- \`roles/\`: personas operacionais desta área.
- \`skills/\`: capacidades focadas usadas por roles.
- \`playbooks/\`: sequências táticas de execução.

## Caminhos Comuns

- <request>: role \`roles/<role>.role.md\` -> skill \`skills/<skill>/SKILL.md\` -> playbook \`playbooks/<playbook>.playbook.md\`.
`;
}
