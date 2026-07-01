---
name: product-readme
description: Use quando o modelo criar um novo repositório para o founder; um repositório existente tiver README fraco, genérico ou desatualizado; o modelo editar um repositório existente e precisar melhorar a apresentação do produto; o founder pedir para melhorar o README do produto; o README atual falar mais do LeanOS do que do negócio/produto
---

# Escrever README Do Produto

## Visão Geral

Transformar contexto de empresa/produto em um README.md user-friendly, claro para founders, colaboradores e modelos, preservando repositórios existentes.

## Use Quando

- o modelo criar um novo repositório para o founder
- um repositório existente tiver README fraco, genérico ou desatualizado
- o modelo editar um repositório existente e precisar melhorar a apresentação do produto
- o founder pedir para melhorar o README do produto
- o README atual falar mais do LeanOS do que do negócio/produto

## Contexto Obrigatório

- ../../../README.md quando existir
- ../../../leanos.yaml
- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/positioning.md
- ../knowledge/mvp-validation-scope.md
- ../../../.leanos/standard/templates/product/product-readme-template.md

## Entradas

- Nome do produto
- Empresa
- Descrição curta
- Usuário ou ICP
- Problema
- Proposta de valor
- Status atual
- Modo novo ou repositório existente
- Estrutura real do repositório
- README existente quando houver

## Processo

### Etapa 1

Entre pela Navigation Chain: Root -> Strategy -> Product -> Product Narrative Editor -> product-readme.

### Etapa 2

Rota oficial da área: Strategy Product -> Product Narrative Editor -> product-readme.

### Etapa 3

Use quando o modelo criar um novo repositório para o founder.

### Etapa 4

Use quando um repositório existente tiver README fraco, genérico ou desatualizado.

### Etapa 5

Leia o README existente antes de propor qualquer alteração.

### Etapa 6

Leia o contexto de Strategy Product disponível e separe fatos confirmados de lacunas.

### Etapa 7

Use `.leanos/standard/templates/product/product-readme-template.md` como estrutura base, adaptando ao estágio e ao tipo de repositório.

### Etapa 8

Escreva primeiro uma proposta de README ou diff resumido; deve propor diff antes de escrever e pedir confirmação explícita antes de atualizar `../../../README.md`.

### Etapa 9

Em repositório existente, preserve comandos, badges, links, instruções de setup e notas técnicas úteis já presentes.

### Etapa 10

Em repositório novo sem app/código, explique que o app ou código de produto ainda não foi criado pelo LeanOS e aponte para o Business OS.

### Etapa 11

Mantenha a seção LeanOS curta e no fim; o começo do README deve explicar o produto/empresa.

## Verificações e Critérios de Aceite

- O README começa explicando o produto, não o framework.
- O README inclui O Que É, Para Quem É, Problema, Proposta De Valor, Status Atual, Estrutura, Foco Atual e LeanOS.
- Fatos incertos aparecem como lacunas ou próximos passos, não como afirmações inventadas.
- README existente é preservado quando contém instruções técnicas úteis.
- A saída é útil para um founder, um colaborador novo e um modelo que abre o repo pela primeira vez.

## Saída

- README do produto proposto
- Resumo do que foi preservado do README existente
- Lacunas de contexto de produto
- Próxima pergunta ou confirmação para escrita
- Diff proposto quando houver README existente

## Arquivos para Atualizar

- Atualize `../../../README.md` somente após confirmação explícita.
- Atualize Strategy Product knowledge somente se o founder confirmar que o README revelou uma decisão durável de produto.

## Linhas Vermelhas

- Não sobrescreva README existente sem confirmação explícita.
- Não remova instruções técnicas úteis de setup, build, test ou deploy.
- Não invente clientes, métricas, provas, features, stack ou comandos.
- Não transforme o README em landing page.
- Não polua o root `AGENT.md`; use a Navigation Chain LeanOS para chegar nesta skill.
