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

## Qualidade Semântica

O LeanOS deve ser genérico no contexto de produto, mas específico na governança do trabalho.

Descriptions não podem ser circulares, repetir o nome do playbook ou dizer apenas que o playbook "é necessário". A `description` e `## Use Quando` precisam conter 2 ou mais sinais concretos de ativação, como artefato pronto, etapa de delivery, lacuna bloqueante, decisão do founder, handoff entre áreas ou risco operacional.

Exemplo ruim: `description: Use quando release operations é necessário para o pedido ativo`

Exemplo bom: `description: Use quando uma release precisa consolidar escopo, validação, rollback e observabilidade; tag ou GitHub Release só podem ser preparados depois do gate de release aprovado`

## Valide

Use `../checklists/playbook-quality-checklist.md`.

## Linhas Vermelhas

- Não duplique um workflow.
- Não esconda lacunas de role ou skill ausente.
- Não atualize arquivos duráveis sem confirmação.
