# Plano Do Template De Spec De Tela

Este documento registra a decisão implementada no framework LeanOS em 2026-07-01.

## Propósito

Registrar o contrato de `screen-spec-template.md` para que Design documente telas concretas antes de Engineering implementá-las.

Specs de tela são diferentes de specs de componente:

- Spec de componente: parte reutilizável da UI, como tabela, painel de importação, modal ou badge de status.
- Spec de tela: tela ou view concreta que compõe componentes, conteúdo, ações, estados e regras.

## Local Proposto

Template gerado:

`.leanos/standard/templates/design/screen-spec-template.md`

Specs concretas:

`operations/product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md`

Não crie specs concretas de tela no scaffold inicial até que uma Feature real exija isso.

## Quando Criar Uma Spec De Tela

Crie uma spec de tela apenas quando:

- uma Feature real exige uma tela, página, view, modal ou etapa de fluxo concreta;
- Product Ops confirmou contexto de Feature e critérios de aceite;
- a foundation de Design e a baseline de acessibilidade existem ou são explicitamente suficientes para a Feature;
- specs de componentes necessárias são conhecidas, reutilizadas ou planejadas;
- o founder confirma a etapa de Design.

## Seções Sugeridas Para O Template

O template deve incluir:

- `# <Screen Name>`
- `## Propósito`
- `## Objetivo Do Usuário`
- `## Pontos De Entrada`
- `## Estrutura De Layout`
- `## Componentes Necessários`
- `## Ações Primárias`
- `## Ações Secundárias`
- `## Regras De Conteúdo`
- `## Regras De Dados`
- `## Estados`
- `## Validação E Erros`
- `## Acessibilidade`
- `## Comportamento Responsivo`
- `## Analytics Ou Eventos`
- `## Handoff Para Engineering`
- `## Não Fazer`
- `## Perguntas Em Aberto`

## Estados Obrigatórios

Specs de tela devem considerar estes estados quando aplicável:

- padrão
- carregando
- vazio
- erro
- sucesso
- desabilitado
- permissão negada
- dados parciais
- offline ou falha de rede

## Fluxo De Design Para Engineering

1. Product Ops confirma a Feature.
2. Design verifica readiness de componentes.
3. Design cria ou confirma specs de componentes quando necessário.
4. Design cria a spec de tela apenas quando a tela está concreta o suficiente.
5. Engineering implementa primeiro os componentes reutilizáveis necessários.
6. Engineering implementa a tela usando componentes aprovados e a spec de tela.
7. O review do PR verifica a implementação contra a Feature, specs de componentes e spec de tela.

## Não Fazer

- Não crie specs de tela para ideias vagas, itens de roadmap ou Epics não quebrados.
- Não use specs de tela como requisitos de produto.
- Não deixe uma spec de tela contornar a readiness de Product Ops.
- Não deixe Engineering inventar layout, copy, comportamento de componente ou estados que Design não definiu ou confirmou.
- Não crie um sistema completo de screen-spec antes que uma entrega real de Feature precise disso.

## Implementado Em 2026-07-01

Arquivos e contratos atualizados:

- `.leanos/standard/templates/design/README.md`
- `operations/design/knowledge/README.md`
- `operations/design/skills/screen-specification/SKILL.md`
- `operations/design/playbooks/screen-readiness.playbook.md`
- `operations/design/playbooks/component-readiness.playbook.md`
- `operations/workflows/feature-to-delivery-cycle.workflow.md`
- `operations/engineering/knowledge/component-guidelines.md`
- `operations/engineering/playbooks/pr-validation.playbook.md`
- validação `validateImplementationPacketContract`
