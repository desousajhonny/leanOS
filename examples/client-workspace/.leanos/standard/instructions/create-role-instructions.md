# Instruções para Criar Role

Use quando criar um arquivo `.role.md` dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Carregue o `AGENT.md` da área quando existir.
3. Carregue o `README.md` e o `area.yaml` da área.
4. Confirme se uma persona operacional distinta é necessária.

## Escolha o Template

- Role: `../templates/execution/role-template.md`
- Role YAML: `../templates/execution/role-template.yaml`

## Processo

1. Defina qual chapéu operacional o agente deve vestir.
2. Adicione frontmatter YAML com `name` e uma `description` apenas de gatilho que começa com "Use quando".
3. Defina quando usar a role.
4. Defina o contexto obrigatório.
5. Aponte para skills e playbooks existentes.
6. Crie skills ou playbooks ausentes apenas depois de confirmação separada.

## Valide

Use `../checklists/role-quality-checklist.md`.

## Linhas Vermelhas

- Não crie uma role para uma tarefa única.
- Não faça a role executar a skill ou o playbook por conta própria.
- Não aponte para arquivos ausentes sem marcar a lacuna.
