# Instruções para Criar Playbook

Use quando criar um arquivo `.playbook.md` dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Confirme se o playbook é execução tática dentro de uma área.
3. Verifique se um workflow de departamento deveria possuir o fluxo mais amplo.
4. Identifique as skills que o playbook deve usar.
5. Carregue `../foundation/guided-conversation.md` quando o playbook pedir que o founder escolha, classifique, priorize ou confirme.

## Escolha o Template

- Playbook: `../templates/execution/playbook-template.md`
- Playbook YAML: `../templates/execution/playbook-template.yaml`

## Processo

1. Defina gatilho e objetivo.
2. Adicione frontmatter YAML com `name` e uma `description` apenas de gatilho que começa com "Use quando".
3. Defina entradas.
4. Defina o processo ordenado.
5. Referencie skills em vez de duplicá-las.
6. Adicione `Conversa Guiada` quando entrada ou confirmação do founder fizer parte do playbook.
7. Defina condições de parada.
8. Defina critérios de aceite e saídas.
9. Defina arquivos para atualizar.

## Valide

Use `../checklists/playbook-quality-checklist.md`.

## Linhas Vermelhas

- Não duplique um workflow.
- Não esconda lacunas de role ou skill ausente.
- Não atualize arquivos duráveis sem confirmação.
