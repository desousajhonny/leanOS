---
name: founder-experience
description: Use quando fluxo, wizard, jornada, resposta do Chief ou documentação visível pode afetar clareza e carga cognitiva do founder.
---

# Founder Experience

## Visão Geral

Skill de uso interno do framework para revisar se uma mudança torna o LeanOS mais claro, guiado e útil para founders.

## Use Quando

- Mudança altera wizard, founder journeys, README, root response, prompts de ativação ou perguntas.
- O mantenedor pergunta se algo está founder-friendly.
- Um fluxo parece burocrático, longo ou técnico demais.

## Contexto Obrigatório

- Momento da jornada.
- Perfil do founder como usuário leigo no framework.
- Próxima decisão esperada.
- Arquivos ou prompts visíveis.

## Entradas

- Fluxo/resposta avaliada.
- Perguntas feitas ao founder.
- Confirmações exigidas.
- Evidências de atrito.

## Processo

### Etapa 1: Checar clareza

Verifique se o founder entende o que já existe, o que falta, próximo passo e pergunta.

### Etapa 2: Checar carga cognitiva

Confirme que o founder não precisa escolher departamentos, roles, skills ou playbooks.

### Etapa 3: Checar confirmação

Garanta confirmação antes de ativar áreas, alterar source of truth, criar Epic/Feature, escrever código ou executar remoto.

### Etapa 4: Registrar Evidências

Liste textos, perguntas e arquivos avaliados.

### Etapa 5: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- O founder entende o próximo passo em linguagem natural?
- A resposta mostra o que já temos e o que falta?
- Existe uma pergunta por vez quando há dúvida?
- Alguma escolha de departamento/role/skill foi empurrada para o founder?
- Confirmações críticas aparecem antes de escrita, ativação ou ação remota?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Clareza | Próximo passo óbvio | Parcialmente claro | Founder precisa decifrar |
| Perguntas | Uma pergunta por vez | Perguntas abertas demais | Entrevista longa |
| Roteamento | Natural e invisível | Termos internos demais | Founder escolhe área |
| Confirmação | Ponto crítico confirmado | Confirmação fraca | Ação crítica sem confirmação |
| Progressão | Pequena e útil | Cerimônia parcial | Completa demais cedo |

## Sinais De Alerta

- Perguntas de setup que Strategy poderia calibrar depois.
- Resposta cheia de nomes de áreas sem necessidade.
- "Escolha os departamentos" ou equivalente.
- Confirmação ausente antes de mexer em source of truth.
- Explicação longa que não leva a decisão.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "Founder inteligente entende" | O produto deve ser claro sem treino interno. |
| "Mais opções dão controle" | Controle sem contexto vira carga cognitiva. |
| "Uma pergunta aberta é mais flexível" | Pergunta guiada reduz fadiga quando suficiente. |
| "A confirmação atrapalha fluidez" | Confirmação protege ações irreversíveis ou importantes. |

## Exemplo De Saída

```text
Founder experience review:
- Status: risk
- Severity: medium
- Momento da jornada: setup inicial
- Evidências: wizard pergunta usuário alvo e estágio
- Atritos: pergunta aberta cedo demais
- Copy recomendada: mover para Strategy calibration com opções guiadas
```

## Verificações e Critérios de Aceite

- A mudança reduz confusão.
- Perguntas são guiadas quando possível.
- Confirmações críticas não são omitidas.
- Status final é `pass, risk ou blocked`.

## Saída

```text
Founder experience review:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Momento da jornada:
- Evidências:
- Atritos:
- Copy recomendada:
```

## Arquivos para Atualizar

- `docs/framework/founder-journeys/**`
- Wizard CLI.
- Templates de `AGENT.md`.
- README gerado.
- Validações de linguagem.

## Linhas Vermelhas

- Não force o founder a entender organograma.
- Não adicione pergunta aberta desnecessária.
- Não oculte confirmação crítica.
- Não transforme setup em entrevista longa.
