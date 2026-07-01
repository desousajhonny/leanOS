export function roleTemplate(): string {
  return `---
name: <role-name>
description: Use quando <gatilho ou situação específica>
---

# <Role Name>

## Propósito

Defina o limite de responsabilidade e o ponto de vista deste papel em uma ou duas frases.

## Use Quando

- <gatilho>
- <sintoma>

## Antes de Agir

Leia:

- \\\`../knowledge/<file>.md\\\`

## Skills Obrigatórias

- \\\`../skills/<skill-name>/SKILL.md\\\`

## Playbooks Relevantes

- \\\`../playbooks/<playbook-name>.playbook.md\\\`

## Critérios de Aceite

- <saída esperada ou estado de confirmação>

## Linhas Vermelhas

- Não invente fatos específicos do produto.
- Peça confirmação antes de modificar arquivos duráveis.
`;
}

export function roleYamlTemplate(): string {
  return `role:
  slug: <role-name>
  title: <Role Name>
  purpose: <Descrição da responsabilidade do papel>
  use_when:
    - <gatilho>
  before_acting:
    - <arquivo de contexto>
  skills:
    - <skill-name>
  playbooks:
    - <playbook-name>
  outputs:
    - <saída esperada>
`;
}

export function skillTemplate(): string {
  return `---
name: <skill-name>
description: Use quando <gatilho ou situação específica>
---

# <Skill Name>

## Visão Geral

Defina uma capacidade reutilizável em uma ou duas frases.

## Gatilhos De Ativação

Gatilho válido é um sinal concreto de trabalho: sintoma, contexto, artefato ausente, risco, decisão pendente ou handoff que permite ao agente decidir se esta skill se aplica.

A \`description\` deve começar com "Use quando" e conter 2 ou mais sinais concretos de ativação. Ela não pode repetir o nome da skill nem dizer apenas que a skill "é necessária".

Exemplo ruim:

\`\`\`yaml
description: Use quando <skill-name> é necessário para o pedido ativo
\`\`\`

Exemplo bom:

\`\`\`yaml
description: Use quando uma Feature altera contrato de API, dados persistidos ou permissões; migração, rollback ou compatibilidade precisam ser avaliados antes do PR
\`\`\`

## Use Quando

- <gatilho concreto 1>
- <gatilho concreto 2>
- <situação ou risco que ativa a skill>

## Contexto Obrigatório

- \`../knowledge/<file>.md\`
- Instruções do papel ativo
- Pedido do founder

## Entradas

- <input>
- <input>

## Processo

### Etapa 1

Confirme que esta skill se aplica ao pedido ativo.

### Etapa 2

Carregue apenas o contexto obrigatório.

### Etapa 3

Aplique a capacidade e produza a menor saída útil.

### Etapa 4

Verifique as linhas vermelhas antes de recomendar atualizações de arquivo ou handoffs.

## Verificações e Critérios de Aceite

- <check>
- <check>

## Saída

- <output>
- <output>

## Arquivos para Atualizar

- Atualize knowledge relevante da área somente depois de confirmação explícita.

## Linhas Vermelhas

- Não invente fatos específicos do produto.
- Não transforme esta skill em playbook ou workflow.
- Peça confirmação antes de modificar arquivos duráveis.
`;
}

export function skillYamlTemplate(): string {
  return `skill:
  slug: <skill-name>
  title: <Skill Name>
  purpose: <Uma capacidade reutilizável>
  use_when:
    - <gatilho>
  required_context:
    - <arquivo de contexto>
  process:
    - <etapa>
  checks:
    - <checagem>
  outputs:
    - <saída>
`;
}

export function playbookTemplate(): string {
  return `---
name: <playbook-name>
description: Use quando <gatilho ou situação específica>
---

# <Playbook Name>

## Propósito

Explique a tarefa prática que este playbook executa dentro de uma área.

## Gatilhos De Ativação

Gatilho válido é um sinal concreto de que uma sequência de execução deve começar: artefato pronto, lacuna bloqueante, decisão do founder, handoff entre áreas, risco operacional ou etapa de delivery.

A \`description\` deve começar com "Use quando" e conter 2 ou mais sinais concretos de ativação. Ela não pode repetir o nome do playbook nem dizer apenas que o playbook "é necessário".

Exemplo ruim:

\`\`\`yaml
description: Use quando <playbook-name> é necessário para o pedido ativo
\`\`\`

Exemplo bom:

\`\`\`yaml
description: Use quando uma Feature passou por ready-to-develop; branch, testes, riscos e Founder Testing Guide precisam ser organizados antes de abrir PR
\`\`\`

## Use Quando

- <gatilho concreto 1>
- <gatilho concreto 2>
- <handoff, risco ou decisão que ativa a sequência>

## Entradas

- ...
- ...
- ...

## Conversa Guiada

Use \`.leanos/standard/foundation/guided-conversation.md\` quando o playbook precisar que o founder escolha, classifique, priorize ou confirme.

Faça perguntas guiadas quando:

- contexto obrigatório estiver ausente;
- o founder precisar escolher entre caminhos previsíveis;
- uma atualização durável de arquivo depender de confirmação;
- o próximo passo mudar roadmap, MVP, issue, PR, implementação, launch ou estado de aprendizado.

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.

## Processo

1. ...
2. ...
3. ...

## Condições de Parada

- Peça confirmação antes de atualizar arquivos duráveis.
- Peça confirmação antes de chamar scripts, APIs ou capacidades externas.
- Peça confirmação antes de mudar estado de roadmap, MVP, issue, PR ou implementação.

## Critérios de Aceite e Saídas

- ...
- ...
- ...

## Arquivos para Atualizar

- ...

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

\`../AGENT.md -> roles/<role>.role.md -> skills/<skill>/SKILL.md -> playbooks/<this-playbook>.playbook.md -> Saída\`
`;
}

export function playbookYamlTemplate(): string {
  return `playbook:
  key: <playbook-key>
  title: <Playbook Name>
  owner_area: <department.area>
  purpose: <tarefa prática que este playbook executa>
  use_when:
    - <gatilho>
  inputs:
    - <entrada>
  guided_conversation:
    foundation: .leanos/standard/foundation/guided-conversation.md
    use_when:
      - decisão do founder é necessária
      - atualização durável precisa de confirmação
  process:
    - <etapa>
  outputs:
    - <saída>
  files_to_update:
    - <path>
  confirmation_required:
    - durable file updates
    - external actions
  red_lines:
    - não duplicar workflow
`;
}
