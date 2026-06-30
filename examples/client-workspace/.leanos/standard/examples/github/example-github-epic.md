# Epic: Guided clinic intake MVP

## Outcome

Donos de clínica conseguem capturar intake estruturado do paciente antes da consulta.

## Contexto Estratégico

- Produto: Clinic Assistant AI
- ICP: donos de clínicas pequenas
- Problem: o intake da recepção é lento e inconsistente
- Proposta de valor: reduzir trabalho manual de intake antes das consultas
- Validation suposição: clínicas confiarão em intake guiado por IA para casos de baixo risco
- Evidence status: suposição

## Vínculo Com Escopo De Delivery

- scope_type: MVP
- milestone: MVP Alpha
- release_goal: validar o fluxo guiado de intake, resumo do intake e review da equipe
- Non-goals: automação de seguro, diagnóstico, tomada de decisão clínica
- Acceptance criteria: equipe consegue revisar e editar o resumo do intake
- Roadmap item: Fluxo De Intake Do MVP
- Milestone: MVP Alpha

## Critérios De Product

- Valor para usuário: menos tempo de recepção
- Jobs to be done: capturar informações de intake antes da visita
- Critérios de aceite: resumo do intake é compreensível e editável
- Sinal de aprendizado: pelo menos 5 clínicas completam sessões de teste de intake

## Critérios De Design

- Fluxo de usuário: paciente começa pelo link da consulta e envia o intake
- Telas ou estados: início, fluxo de perguntas, review, enviado
- Restrições de UX: linguagem simples, indicação de progresso, recuperação de erro
- Considerações de acessibilidade: navegação por teclado e labels de formulário legíveis

## Critérios De Engineering

- Abordagem técnica: fluxo de formulário com estado de rascunho persistido
- Limites do sistema: apenas intake do paciente e review da equipe
- Expectativas de teste: testes de validação de formulário e geração de resumo

## Critérios De Security

- Dados envolvidos: informações pessoais fornecidas pelo paciente
- Auth ou permissões: review somente pela equipe
- Considerações de privacidade: evitar expor dados de intake em logs
- Casos de abuso: submissões de spam

## Quebra Em Sub-Issues

- Status: ready_for_breakdown
- Features esperadas: formulário de intake, persistência de rascunho, review da equipe, controles de Security
- Perguntas abertas: retention policy
