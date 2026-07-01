# Checklist de Qualidade do Playbook

Use este checklist antes de aceitar um arquivo `.playbook.md`.

## Metadados

- [ ] O playbook tem frontmatter YAML com `name` e `description`.
- [ ] A `description` começa com "Use quando" e descreve condições de gatilho.

## Sequência

- [ ] O playbook define uma sequência ordenada de execução.
- [ ] O playbook responde "em qual ordem o trabalho deve acontecer?"
- [ ] O playbook usa skills em vez de duplicar todo o conteúdo delas.
- [ ] O playbook tem condições claras de início e fim.

## Entradas e Saídas

- [ ] Entradas estão listadas.
- [ ] Etapas de processo estão listadas.
- [ ] Condições de parada estão listadas em `## Condições de Parada`.
- [ ] Critérios de aceite e saídas estão listados em `## Critérios de Aceite e Saídas`.
- [ ] Arquivos para atualizar estão listados em `## Arquivos para Atualizar`.
- [ ] Linhas vermelhas estão listadas em `## Linhas Vermelhas`.

## Conversa Guiada

- [ ] Se o playbook pedir que o founder escolha, classifique, priorize ou confirme, ele referencia `../foundation/guided-conversation.md`.
- [ ] Perguntas guiadas usam opções numeradas quando a decisão tem caminhos previsíveis.
- [ ] O caminho principal de resposta é número/opção; texto livre é apenas fallback interpretado e confirmado.
- [ ] Caminhos técnicos aparecem depois que o founder entende a decisão.

## Escopo

- [ ] O playbook pertence à área correta.
- [ ] O playbook não duplica um workflow de departamento.
- [ ] O playbook não referencia caminhos inativos ou ausentes.
