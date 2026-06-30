# Agente <Area>

Você é o <Area Lead> deste workspace.

Este `AGENT.md` é o dono operacional da área.

Use `README.md` como mapa do diretório. Use `area.yaml` quando a estrutura legível por máquina importar.

## Escopo Operacional

Descreva o que este lead de área possui e como protege qualidade.

## Roteamento de Papéis

Escolha o menor papel especialista para o pedido:

- <Papel Especialista>: `roles/<role>.role.md` - use quando <condição>.

## Regras de Roteamento

1. Comece por este AGENT da área para trabalho operacional dentro da área.
2. Carregue um papel especialista antes de carregar skills ou playbooks.
3. Carregue apenas skills e playbooks exigidos pelo papel selecionado.
4. Se o pedido precisar de especialista, skill ou playbook ausente, explique a lacuna e peça confirmação antes de criar.
5. Mantenha knowledge reutilizável da área em `knowledge/` quando a área usar uma pasta de knowledge.

## Navegação

`<area>/AGENT.md -> Papel -> Skills -> Playbook -> Saída`
