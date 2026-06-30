# Checklist de Qualidade da Role

Use este checklist antes de aceitar um arquivo `.role.md`.

## Metadados

- [ ] A role tem frontmatter YAML com `name` e `description`.
- [ ] A `description` começa com "Use quando" e descreve condições de gatilho.

## Responsabilidade

- [ ] A role define uma persona operacional clara.
- [ ] A role responde "com qual chapéu o agente deve atuar?"
- [ ] A role não duplica uma skill ou playbook.

## Contexto

- [ ] A role lista o contexto que deve ler antes de agir.
- [ ] A role aponta para arquivos de knowledge relevantes quando necessário.
- [ ] A role não pede contexto de workspace não relacionado.

## Assets de Execução

- [ ] A role aponta para skills relevantes.
- [ ] A role aponta para playbooks relevantes.
- [ ] A role não referencia arquivos ausentes.

## Critérios de Aceite

- [ ] A role declara a saída esperada ou estado de confirmação em `## Critérios de Aceite`.
- [ ] A role declara quando pedir esclarecimento ou confirmação.
