# Construir fluxo de formulário de intake do paciente

## Epic Pai

- Epic: #123 Guided clinic intake MVP
- Milestone: MVP Alpha
- Roadmap item: Fluxo De Intake Do MVP

## Propósito

Criar o primeiro fluxo voltado ao paciente para coletar informações de intake.

## Escopo

Implementar estados de início, fluxo de perguntas, review e enviado.

## Não Objetivos

- Dashboard de review da equipe
- Diagnóstico
- Processamento de seguro

## Critérios De Product

- Valor para usuário: paciente consegue enviar intake antes da consulta
- Critérios de aceite: paciente consegue completar e revisar todos os campos obrigatórios
- Sinal de sucesso ou aprendizado: usuários de teste completam o fluxo sem ajuda

## Critérios De Design

- Fluxo: link da consulta -> perguntas de intake -> review -> enviado
- Telas ou estados: início, etapa, erro de validação, review, sucesso
- Restrições de UX: progresso claro e perguntas em linguagem simples
- Acessibilidade: inputs com label e navegação por teclado

## Critérios De Engineering

- Área sugerida: operations/engineering
- Notas técnicas: persistir estado de rascunho localmente ou server-side conforme stack escolhida
- Dependências: lista de campos de produto e regras de validação
- Expectativas de teste: testes de validação, navegação e submit

## Critérios De Security

- Dados: informações pessoais fornecidas pelo paciente
- Permissões: nenhum dado apenas da equipe exposto ao paciente
- Privacidade: nenhum dado sensível em eventos de analytics

## Definição De Pronto

- [ ] Critérios de Product satisfeitos
- [ ] Critérios de Design satisfeitos
- [ ] Critérios de Engineering satisfeitos
- [ ] Critérios de Security satisfeitos
- [ ] Testes ou plano de validação definidos
