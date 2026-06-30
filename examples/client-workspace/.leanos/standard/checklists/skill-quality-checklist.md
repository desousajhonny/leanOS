# Checklist de Qualidade da Skill

Use este checklist antes de aceitar uma pasta de skill com `SKILL.md`.

## Capacidade

- [ ] A skill define uma capacidade reutilizável.
- [ ] A skill responde "qual capacidade deve ser aplicada?"
- [ ] A skill é reutilizável por uma ou mais roles ou playbooks.
- [ ] A skill não se torna uma sequência completa de processo.
- [ ] A skill vive em `skills/<skill-name>/SKILL.md`.
- [ ] A skill tem frontmatter YAML com `name` e `description`.
- [ ] A `description` começa com "Use quando" e descreve condições de gatilho.

## Detalhe Operacional

- [ ] A skill declara quando usar.
- [ ] A skill declara contexto obrigatório.
- [ ] A skill declara entradas.
- [ ] A skill usa headings `### Etapa N` dentro de `## Processo`.
- [ ] A skill declara verificações em `## Verificações e Critérios de Aceite`.
- [ ] A skill declara saídas.
- [ ] A skill declara linhas vermelhas.

## Limites

- [ ] A skill não inventa fatos de produto.
- [ ] A skill não atualiza arquivos sem confirmação quando contexto durável muda.
- [ ] A skill não duplica outra skill.
