# Adicionar fluxo de formulário de intake do paciente

## Resumo

Adiciona o fluxo inicial de formulário de intake do paciente com validação de campos obrigatórios e estado de review.

## Issue Vinculada

Closes #554

## Epic Pai

Epic #123

## Contexto LeanOS

- Department: Operations
- Area: Engineering
- Role: Senior Developer
- Skills: implementation-planning, pull-request
- Playbook: prepare-pr

## Alinhamento De Product / Escopo De Delivery

- Roadmap item: Fluxo De Intake Do MVP
- Escopo de delivery: fluxo guiado de intake
- Critérios de aceite: paciente consegue completar e revisar campos obrigatórios
- Impacto de validação ou aprendizado: habilita primeiro teste de usabilidade

## Notas De Design

Usa a fundação atual de Design para labels de formulário, espaçamento e comportamento de foco.

## Notas De Security

Evita registrar valores de campos de intake em logs.

## Tests

- [x] Testes de validação de formulário
- [x] Check manual de navegação por teclado

## Founder Testing Guide

### O Que Mudou

Pacientes agora conseguem completar o primeiro fluxo de formulário de intake, revisar respostas e enviar o intake.

### Onde Testar

- URL de preview: use a URL de preview do PR quando disponível
- Rota ou tela local: /intake
- Conta ou dado de teste: use apenas perfil de paciente de teste

### Como Testar

1. Abra a rota de intake.
2. Complete as perguntas obrigatórias.
3. Tente enviar com uma resposta obrigatória ausente.
4. Revise as respostas.
5. Envie o formulário.

### Resultado Esperado

O founder deve ver validação para respostas obrigatórias ausentes, um estado de review e um estado final enviado sem expor dados de intake em logs.

### Fora Do Escopo

Dashboard de review da equipe and diagnosis are not included in this PR.

### Riscos Conhecidos Ou Limites

Ordem das perguntas ainda precisa de validação de usabilidade.

## Riscos

- Risco de escopo: review da equipe permanece separado
- Risco técnico: estratégia de persistência pode mudar
- Risco de Product: ordem das perguntas ainda precisa de validação com usuário
- Risco de Security: política de retenção ainda está aberta
