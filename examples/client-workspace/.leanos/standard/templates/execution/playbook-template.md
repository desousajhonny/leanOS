---
name: <playbook-name>
description: Use quando <gatilho ou situação específica>
---

# <Playbook Name>

## Propósito

Explique a tarefa prática que este playbook executa dentro de uma área.

## Gatilhos De Ativação

Gatilho válido é um sinal concreto de que uma sequência de execução deve começar: artefato pronto, lacuna bloqueante, decisão do founder, handoff entre áreas, risco operacional ou etapa de delivery.

A `description` deve começar com "Use quando" e conter 2 ou mais sinais concretos de ativação. Ela não pode repetir o nome do playbook nem dizer apenas que o playbook "é necessário".

Exemplo ruim:

```yaml
description: Use quando <playbook-name> é necessário para o pedido ativo
```

Exemplo bom:

```yaml
description: Use quando uma Feature passou por ready-to-develop; branch, testes, riscos e Founder Testing Guide precisam ser organizados antes de abrir PR
```

## Use Quando

- <gatilho concreto 1>
- <gatilho concreto 2>
- <handoff, risco ou decisão que ativa a sequência>

## Entradas

- ...
- ...
- ...

## Conversa Guiada

Use `.leanos/standard/foundation/guided-conversation.md` quando o playbook precisar que o founder escolha, classifique, priorize ou confirme.

Faça perguntas guiadas quando:

- contexto obrigatório estiver ausente;
- o founder precisar escolher entre caminhos previsíveis;
- uma atualização durável de arquivo depender de confirmação;
- o próximo passo mudar roadmap, MVP, issue, PR, implementação, launch ou estado de aprendizado.

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.

## Processo

1. ...
2. ...
3. ...

## Condições de Parada

- Peça confirmação antes de atualizar arquivos duráveis.
- Peça confirmação antes de chamar scripts, APIs ou capacidades externas.
- Peça confirmação antes de mudar estado de roadmap, MVP, issue, PR ou implementação.

## Critérios de Aceite e Saídas

- ...
- ...
- ...

## Arquivos para Atualizar

- ...

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

`../AGENT.md -> roles/<role>.role.md -> skills/<skill>/SKILL.md -> playbooks/<this-playbook>.playbook.md -> Saída`
