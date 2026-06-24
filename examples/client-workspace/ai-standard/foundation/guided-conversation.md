# Guided Conversation

## Purpose

Make LeanOS feel guided for founders without turning workflows into rigid forms.

Use this foundation when an agent, workflow, playbook or command needs to ask the founder for context, classification, prioritization, confirmation or a decision.

## Core Rule

When the founder needs to choose between predictable paths, use numbered options instead of only open-ended questions.

Use:

- the host application's native selection UI when available;
- 3 to 5 numbered options;
- one "not sure / help me decide" option;
- one question at a time when the decision changes state, roadmap, MVP, issue, PR or implementation;
- plain founder-friendly language before technical paths;
- free-form answers as valid input.

If no native selection UI is available, write numbered options directly in chat.

Always allow:

```text
You can reply with the number, or describe it in your own words.
```

## When To Use Guided Questions

Use guided questions when:

- the founder needs to choose a destination for an idea;
- the model lacks required context;
- a decision changes roadmap, MVP, issue, PR, implementation, launch or learning state;
- a file update depends on founder confirmation;
- the founder may not know the correct LeanOS command or workflow name.

Do not use guided questions when:

- the answer is a simple factual clarification;
- the founder already gave a clear decision;
- the model can safely summarize and ask for confirmation;
- the question would create fake precision too early.

## Question Types

### Discovery Question

Use to understand missing context.

Example:

```text
Quem essa ideia ajudaria primeiro?

1. Um usuario novo tentando entender o produto
2. Um usuario ativo tentando concluir uma tarefa
3. Um cliente pagante com problema operacional
4. O founder/time interno
5. Nao sei ainda, me ajude a descobrir
```

### Decision Question

Use to choose the next path.

Example:

```text
Qual destino faz mais sentido para essa ideia agora?

1. Refinar melhor comigo
2. Registrar como hipotese para validar depois
3. Guardar como candidata ao roadmap
4. Descartar por enquanto
5. Nao sei, me ajude a decidir
```

### Priority Question

Use to rank urgency or impact.

Example:

```text
Por que essa ideia parece importante agora?

1. Resolve uma dor clara do usuario
2. Pode aumentar conversao ou receita
3. Reduz trabalho manual
4. Melhora retencao ou experiencia
5. Ainda e so uma intuicao
```

### Confirmation Question

Use before durable updates or external actions.

Example:

```text
Posso registrar essa ideia como candidata ao roadmap?

1. Sim, registre no backlog
2. Nao, vamos apenas manter na conversa
3. Quero ajustar a ideia antes
```

### Risk Question

Use when a path may introduce risk.

Example:

```text
Essa ideia envolve dados sensiveis, login, pagamento ou permissoes?

1. Sim
2. Nao
3. Talvez, nao tenho certeza
```

## Writing Rules

- Ask one important guided question at a time.
- Prefer native selectable options when the host supports them; otherwise use numbered options.
- Do not ask a long questionnaire unless the playbook explicitly requires an intake form.
- Put the human decision before file paths.
- Explain the recommendation before asking for confirmation.
- If the founder answers with a number, restate the selected meaning before continuing.
- If the founder answers freely, map the answer to the closest option and say how you interpreted it.

## Output Shape

Recommended shape:

```text
Minha leitura:
<short evaluation>

Proximo passo:
<recommended path>

Escolha uma opcao:
1. <option>
2. <option>
3. <option>
4. Nao sei, me ajude a decidir

Voce pode responder so com o numero ou do seu jeito.
```

## Red Lines

- Do not make a decision for the founder when the decision changes durable state.
- Do not hide file updates behind friendly language.
- Do not expose technical paths before the founder understands the decision.
- Do not force numbered options when the founder needs open exploration.
