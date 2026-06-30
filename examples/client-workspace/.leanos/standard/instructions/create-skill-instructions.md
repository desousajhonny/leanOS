# Instruções para Criar Skill

Use quando criar uma pasta de skill dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Confirme qual role ou playbook usará a skill.
3. Verifique se uma skill existente já cobre a capacidade.
4. Crie `skills/<skill-name>/SKILL.md`.

## Escolha o Template

- Skill: `../templates/execution/skill-template.md`
- Skill YAML: `../templates/execution/skill-template.yaml`

## Processo

1. Defina uma capacidade reutilizável.
2. Adicione frontmatter YAML com `name` e uma `description` apenas de gatilho que começa com "Use quando".
3. Defina quando usar.
4. Defina contexto obrigatório e entradas.
5. Use headings `### Etapa N` dentro de `## Processo`.
6. Defina verificações, critérios de aceite e saídas.
7. Defina linhas vermelhas.
8. Evite transformar a skill em um processo ordenado completo.

## Valide

Use `../checklists/skill-quality-checklist.md`.

## Linhas Vermelhas

- Não duplique outra skill.
- Não crie uma skill para uma resposta única.
- Não coloque fatos duráveis de produto dentro de uma skill.
