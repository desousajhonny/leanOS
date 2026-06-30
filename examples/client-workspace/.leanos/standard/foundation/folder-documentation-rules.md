# Regras de Documentação de Pasta

Use these rules when creating or reviewing folder documentation, especially `README.md` files.

## Propósito

Documentação de pasta ajuda humanos e modelos a entender onde estão, o que pertence ali e para onde ir em seguida.

It answers:

- Para que serve esta pasta?
- Quando um agente deve entrar nela?
- Quais arquivos são importantes?
- Quais arquivos são source of truth, assets operacionais ou exemplos?
- Para onde o agente deve rotear em seguida?

## Responsabilidade do README

Um README de pasta é um mapa, não o operador.

Ele deve:

- Explicar o propósito da pasta.
- Explicar quando usar a pasta.
- Listar arquivos e subpastas importantes.
- Apontar para o owner operacional quando existir.
- Identificar pastas relacionadas.
- Fornecer notas de navegação.

Ele não deve:

- Replace `AGENT.md` routing.
- Substituir instruções de role.
- Substituir capacidades de skill.
- Substituir sequência de playbook.
- Armazenar fatos de produto que pertencem a arquivos de knowledge.
- Virar um documento genérico para tudo.

## Seções Obrigatórias

Use these sections for important folders:

- `# <Folder Name>`
- `## Propósito`
- `## Use Quando`
- `## Source of Truth` when the folder owns knowledge or durable context.
- `## Arquivos`
- `## Pastas Relacionadas`
- `## Navegação`
- `## Notas para Agentes`

If a section does not apply, omit it or state `Not applicable` when the absence matters.

## Regras de Navegação

- If the folder has `AGENT.md`, tell agents to start there for operational work.
- If the folder has `department.yaml` or `area.yaml`, mention that it provides machine-readable structure.
- If the folder has `roles/`, `skills/` or `playbooks/`, explain that the area owner selects them.
- Se a pasta contiver exemplos, diga que exemplos são apenas referências.
- Se a pasta contiver templates, diga que templates são estruturas iniciais, não contexto ativo do workspace.

## Exemplos por Tipo de Pasta

### Pasta de Departamento

Exemplo: `operations/README.md`

- Explica o que Operations possui.
- Aponta para `operations/AGENT.md`.
- Lista áreas ativas.
- Aponta para `workflows/` para trabalho entre áreas.
- Não lista toda role, skill ou playbook de cada área.

### Pasta de Área

Exemplo: `operations/design/README.md`

- Explica o que Design possui.
- Aponta para `operations/design/AGENT.md`.
- Lists `knowledge/`, `roles/`, `skills/` and `playbooks/`.
- Explica caminhos comuns em alto nível.
- Não executa o processo de Design por conta própria.

### Pasta de Knowledge

Exemplo: `operations/design/knowledge/README.md`

- Explica quais fatos duráveis de Design vivem ali.
- Lista arquivos de knowledge.
- Diz que atualizações exigem confirmação.
- Não define skills nem sequência de playbook.

### Pasta de AI Standard

Exemplo: `.leanos/standard/README.md`

- Roteia para foundation, templates, checklists, instruções e exemplos.
- Explica quando usar cada rota.
- Orienta modelos a não carregar tudo por padrão.

## Linhas Vermelhas

- Não transforme READMEs de pasta em inventários enormes.
- Não duplique todo o conteúdo de arquivos filhos.
- Não documente paths que não existem.
- Não aponte diretamente para uma role quando um AGENT de área deve rotear primeiro.
- Não esconda regras de processo dentro de um README quando um playbook deve possuí-las.
