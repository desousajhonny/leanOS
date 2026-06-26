# Regras De Decisão Do LeanOS

Use estas regras para avaliar toda mudança futura no framework.

## 1. Comece Pela Doutrina

Antes de mudar o comportamento do framework, leia:

1. `leanos-doctrine.md`
2. `operating-model.md`
3. `decision-log.md`

Se a mudança proposta entrar em conflito com a doutrina, rejeite a mudança ou atualize explicitamente a doutrina e o registro de decisões.

## 2. Prefira Clareza Para O Founder Em Vez De Completude Interna

Não adicione arquivos, papéis, workflows ou áreas apenas porque o framework poderia modelá-los.

Adicione estrutura apenas quando isso ajudar o founder ou o agente a tomar uma próxima decisão melhor.

## 3. Mantenha O Workspace Inicial Pequeno

O workspace inicial deve continuar Strategy-first.

Não ative Operations, Growth, Design, Engineering, Security ou DevOps durante o scaffold inicial, a menos que a direção do produto mude explicitamente e a doutrina seja atualizada.

## 4. Não Roteie Para Caminhos Inativos

Se uma rota precisar de uma área inativa, retorne `activation_required`.

Não referencie roles, skills, playbooks, workflows ou arquivos de knowledge de áreas inativas como se eles existissem.

## 5. Mantenha Linguagem Natural Como Interface Principal

Não reintroduza `.leanos/commands/` gerados como interface operacional.

Arquivos de prompt para um editor hospedeiro podem existir como auxiliares de integração, mas devem rotear pelo `AGENT.md` raiz e pelas regras de intenção em linguagem natural.

## 6. Proteja A Taxonomia De Trabalho Product-First

O LeanOS usa:

```text
Roadmap -> Escopo de MVP -> Epic -> Feature -> Task
```

A linguagem de issues do GitHub é uma representação remota, não a taxonomia central de produto.

## 7. Separe Planejamento De Implementação

Não permita que:

- itens de roadmap virem código;
- escopo de MVP vire código;
- Epics virem código;
- Features virem código sem readiness.

Engineering começa depois que a Feature passa pelos gates de readiness.

## 8. Trate MVP Como Aprendizado, Não Como Perfeição

O MVP deve ser pequeno o suficiente para validar uma premissa de negócio ou produto, mas bom o suficiente para criar uma primeira experiência crível.

Evite os dois extremos:

- discovery interminável sem aprendizado de produto;
- implementação apressada sem aprendizado estratégico.

## 9. Deixe Limites De Confirmação Explícitos

Peça confirmação antes de:

- criar ou ativar departamentos/áreas;
- alterar arquivos da fonte da verdade;
- criar Epics ou Features;
- escrever código;
- executar ações remotas de GitHub/API;
- atualizar estado de sync depois de execução remota.

## 10. Use O Registro De Decisões Para Escolhas Duráveis

Registre decisões duráveis quando elas afetarem:

- estrutura de arquivos gerados;
- convenções de nomenclatura;
- comportamento de roteamento;
- política de ativação;
- ownership da fonte da verdade;
- comportamento do GitHub;
- ordem do roadmap do framework.

## Critérios De Rejeição

Rejeite ou adie uma mudança quando ela:

- faz o founder escolher departamentos manualmente;
- faz o setup parecer burocracia;
- cria completude falsa;
- adiciona roteamento entre áreas sem gate;
- depende da memória do modelo em vez da fonte da verdade local;
- mistura responsabilidades de Strategy, Product Ops e Engineering;
- torna o GitHub a fonte da verdade padrão;
- reintroduz arquivos de comando como interface principal;
- contradiz decisões aceitas sem atualizar o registro de decisões.
