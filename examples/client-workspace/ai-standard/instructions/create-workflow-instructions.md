# Instruções para Criar Workflow

Use quando criar um arquivo `.workflow.md`.

## Antes de Criar

1. Confirme se o workflow pertence a um departamento ou área.
2. Confirme se o fluxo atravessa múltiplas áreas, roles ou estágios.
3. Verifique se um playbook existente é suficiente.

## Escolha o Template

- Workflow: `../templates/execution/workflow-template.md`

## Processo

1. Defina o gatilho.
2. Defina áreas ou roles participantes.
3. Defina o contexto obrigatório.
4. Defina estágios ordenados e handoffs.
5. Marque participantes condicionais como condicionais.
6. Defina saídas e rotas de continuidade.

## Valide

Use `../checklists/workflow-quality-checklist.md`.

## Linhas Vermelhas

- Não coloque workflows de negócio em `.leanos/workflows/`.
- Não duplique playbooks de área.
- Não exija áreas inativas sem aviso.
