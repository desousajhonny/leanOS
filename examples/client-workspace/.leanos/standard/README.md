# AI Standard

## Propósito

Source of truth do LeanOS para criar, revisar e rotear assets AI-native do framework.

## Use Quando

Use esta pasta antes de criar ou alterar agentes, departamentos, áreas, roles, skills, playbooks, workflows, comandos, templates, checklists ou instruções.

## Rota Rápida

Use esta rota para a maior parte do trabalho de criação de assets:

1. Decida o tipo de asset com `foundation/asset-taxonomy.md`.
2. Confirme posicionamento e limites com `foundation/creation-rules.md`.
3. Confirme a nomenclatura com `foundation/naming-conventions.md`.
4. Use `foundation/guided-conversation.md` quando o asset pedir que o founder decida, classifique, priorize ou confirme.
5. Carregue o arquivo correspondente em `instructions/`.
6. Use o ponto de partida correspondente em `templates/`.
7. Valide o resultado com o arquivo correspondente em `checklists/`.
8. Abra `examples/` apenas se uma referência melhorar a qualidade.

## Mapa de Decisão

| Necessidade | Rota | Por quê |
| --- | --- | --- |
| Decidir qual é o tipo de asset | `foundation/asset-taxonomy.md` | Define AGENT, README, YAML, role, skill, playbook, knowledge, workflow e command. |
| Decidir como um modelo deve navegar pelo workspace | `foundation/navigation-chain.md` | Define navegação por owner primeiro e evita pular rotas. |
| Decidir o próximo estágio de progressão do founder | `foundation/founder-progression-model.md` | Define progressão Strategy-first, gates, activation_required e comportamento de roteamento do Chief. |
| Verificar se um movimento de progressão do founder é permitido | `foundation/progression-gates.md` | Define contexto obrigatório, próximos estágios permitidos e próximos estágios bloqueados. |
| Desenhar perguntas ou decisões amigáveis ao founder | `foundation/guided-conversation.md` | Define opções numeradas, pausas de decisão e prompts de confirmação. |
| Decidir se um novo arquivo deve existir | `foundation/creation-rules.md` | Evita proliferação de assets e ownership duplicado. |
| Nomear um arquivo ou pasta | `foundation/naming-conventions.md` | Mantém nomes previsíveis e legíveis por máquina. |
| Julgar qualidade quando nenhum checklist específico é suficiente | `foundation/quality-criteria.md` | Fornece critérios universais de qualidade e rejeição. |
| Criar um README de pasta | `foundation/folder-documentation-rules.md` e `instructions/create-readme-instructions.md` | Mantém READMEs como mapas, não executores. |
| Criar um asset | `instructions/` e depois `templates/` | Fornece o procedimento e a estrutura inicial. |
| Revisar um asset antes de aceitá-lo | `checklists/` | Aplica o gate de qualidade certo para o tipo de asset. |
| Ver como algo bom se parece | `examples/` | Fornece apenas formato de referência, não contexto ativo. |

## Rotas

### `foundation/`

Regras conceituais centrais. Use quando decidir o que pertence a cada lugar, como assets se relacionam, como a navegação funciona ou se um asset proposto é válido.

### `templates/`

Estruturas iniciais reutilizáveis. Use depois de escolher o tipo de asset e antes de rascunhar o arquivo.

### `checklists/`

Gates de qualidade. Use antes de aceitar um asset recém-criado ou modificado.

### `instructions/`

Procedimentos de criação. Use quando o usuário pedir para criar ou atualizar um asset LeanOS.

### `examples/`

Exemplos ilustrativos. Use apenas como referência; o contexto ativo do workspace prevalece.

## Fluxo de Criação

Para qualquer novo asset LeanOS:

1. Carregue apenas este README e os menores arquivos correspondentes.
2. Declare o tipo de asset selecionado e o owner.
3. Declare o path de destino.
4. Use a instrução e o template correspondentes.
5. Valide com o checklist correspondente.
6. Peça confirmação antes de escrever arquivos do framework.

## Não Carregar por Padrão

- Não carregue todos os arquivos de foundation.
- Não carregue todas as categorias de template.
- Não carregue todos os checklists.
- Não carregue exemplos a menos que uma referência seja necessária.
- Não deixe exemplos sobrescreverem o contexto ativo do workspace.

## Arquivos

- `foundation/`
- `templates/`
- `checklists/`
- `instructions/`
- `examples/`

## Pastas Relacionadas

- `../AGENT.md`

## Notas para Agentes

Não carregue todo `.leanos/standard/` por padrão. Escolha o menor arquivo de foundation, instrução, template e checklist necessário para o pedido ativo.

Se a próxima rota não estiver clara, comece por `foundation/asset-taxonomy.md`.
