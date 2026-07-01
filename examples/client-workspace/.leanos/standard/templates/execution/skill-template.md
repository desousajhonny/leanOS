---
name: <skill-name>
description: Use quando <gatilho ou situação específica>
---

# <Skill Name>

## Visão Geral

Defina uma capacidade reutilizável em uma ou duas frases.

## Gatilhos De Ativação

Gatilho válido é um sinal concreto de trabalho: sintoma, contexto, artefato ausente, risco, decisão pendente ou handoff que permite ao agente decidir se esta skill se aplica.

A `description` deve começar com "Use quando" e conter 2 ou mais sinais concretos de ativação. Ela não pode repetir o nome da skill nem dizer apenas que a skill "é necessária".

Exemplo ruim:

```yaml
description: Use quando <skill-name> é necessário para o pedido ativo
```

Exemplo bom:

```yaml
description: Use quando uma Feature altera contrato de API, dados persistidos ou permissões; migração, rollback ou compatibilidade precisam ser avaliados antes do PR
```

## Use Quando

- <gatilho concreto 1>
- <gatilho concreto 2>
- <situação ou risco que ativa a skill>

## Contexto Obrigatório

- `../knowledge/<file>.md`
- Instruções do papel ativo
- Pedido do founder

## Entradas

- <input>
- <input>

## Processo

### Etapa 1

Confirme que esta skill se aplica ao pedido ativo.

### Etapa 2

Carregue apenas o contexto obrigatório.

### Etapa 3

Aplique a capacidade e produza a menor saída útil.

### Etapa 4

Verifique as linhas vermelhas antes de recomendar atualizações de arquivo ou handoffs.

## Verificações e Critérios de Aceite

- <check>
- <check>

## Saída

- <output>
- <output>

## Arquivos para Atualizar

- Atualize knowledge relevante da área somente depois de confirmação explícita.

## Linhas Vermelhas

- Não invente fatos específicos do produto.
- Não transforme esta skill em playbook ou workflow.
- Peça confirmação antes de modificar arquivos duráveis.
