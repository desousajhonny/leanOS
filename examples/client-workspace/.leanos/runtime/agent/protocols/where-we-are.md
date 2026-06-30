# Protocolo Onde Estamos

## Propósito

Ajuda o LeanOS Chief a responder perguntas de status, retomada e readiness sem depender de memória ou inventar progresso.

Use este protocolo para diagnosticar o momento atual do produto, explicar o que existe, identificar o que falta e recomendar a próxima rota LeanOS mais segura.

## Frases de Gatilho

Use este protocolo quando o founder perguntar coisas como:

- "Onde paramos?"
- "O que temos ate agora?"
- "O que falta para o MVP?"
- "Qual o proximo passo?"
- "Ja podemos desenvolver?"
- "Vamos desenvolver o produto."
- "Estamos prontos para implementar?"
- "O que falta para lancar?"
- "O que temos até agora?"
- "Podemos começar a desenvolver?"

## Linhas Vermelhas

- Não responda apenas pela memória do chat.
- Não recomende implementação antes de checar readiness de produto, roadmap e entrega.
- Não invente trabalho concluído a partir de arquivos vazios ou placeholders.
- Não trate item de roadmap como escopo de entrega se o escopo de entrega não estiver definido explicitamente.
- Não trate escopo de entrega como GitHub-ready até checar readiness de Epic/issue.
- Não escreva arquivos durante este protocolo, a menos que o founder peça explicitamente uma atualização depois do diagnóstico.

## Ordem de Leitura

Carregue apenas os menores arquivos relevantes. Comece aqui:

1. `../../context/workspace-summary.md`
2. `../../context/current-focus.md`
3. `../../context/next-actions.md`
4. `../../index/workflows.yaml`
5. `leanos.yaml`

Depois inspecione fontes conforme a pergunta:

### Baseline de Strategy

- `example-ai-product-os/strategy/product/knowledge/brief.md`
- `example-ai-product-os/strategy/product/knowledge/problem.md`
- `example-ai-product-os/strategy/product/knowledge/icp.md`
- `example-ai-product-os/strategy/roadmap/knowledge/backlog.md`
- `example-ai-product-os/strategy/roadmap/knowledge/roadmap.md`

### Readiness de Entrega

- `example-ai-product-os/operations/product-ops/knowledge/delivery-scope.md`
- `example-ai-product-os/operations/product-ops/knowledge/issue-readiness.md`
- `example-ai-product-os/operations/product-ops/knowledge/ready-to-develop.md`
- `example-ai-product-os/operations/product-ops/mvp/prd.md`
- `example-ai-product-os/operations/product-ops/mvp/acceptance-criteria.md`
- `example-ai-product-os/operations/product-ops/mvp/release-checklist.md`

### Readiness de GitHub / Execução

- `.github/leanos/project-sync.yaml`
- `.github/leanos/sync-state.yaml`
- `.leanos/runtime/index/workflows.yaml`

Não leia todos estes arquivos se a resposta já estiver clara pelos arquivos anteriores.

## Níveis de Diagnóstico

Classifique o momento atual como um destes:

- Strategy ausente
- Estratégia de produto iniciada
- Roadmap ausente
- Roadmap pronto
- Epic local ausente
- Epic local pronta
- Planejamento de GitHub ausente
- Epics ou Features ausentes
- Pronto para implementação
- Em implementação
- Pronto para PR/review
- Pronto para launch
- Loop de aprendizado/growth

## Gate de Desenvolvimento

Antes de responder que o produto, item de roadmap, Epic ou issue está pronto para desenvolver, compare o workspace atual com `example-ai-product-os/operations/product-ops/knowledge/ready-to-develop.md`.

Não recomende implementação até o diagnóstico confirmar:

- a estratégia de produto tem contexto suficiente de ICP, problema e valor;
- existe item de roadmap ou backlog para o trabalho;
- existe escopo de entrega quando o trabalho pertence a MVP, release, experimento, beta ou entrega interna;
- existem PRD ou critérios de aceite quando comportamento de produto é afetado;
- existe Epic/Feature local, issue GitHub, ou o founder pediu explicitamente um fluxo de bootstrap em vez de trabalho baseado em issue;
- Design foi checado quando UX, UI, copy, acessibilidade, telas, estados ou fluxos de usuário são afetados;
- Security foi checado quando há risco de dados, auth, permissões, privacidade, abuso, API, banco de dados, secrets, compliance, infraestrutura ou código gerado por IA;
- DevOps foi checado quando ambientes, CI/CD, deploy, observabilidade, GitHub Project, config ou release readiness são afetados.

Se algo estiver ausente, explique a lacuna e recomende a próxima rota LeanOS em vez de codar.

## Rotas Recomendadas por Lacuna

- Strategy ausente -> `example-ai-product-os/strategy/AGENT.md`
- Estratégia de produto fraca -> Strategy Product via `example-ai-product-os/strategy/AGENT.md`
- Escopo de validação do MVP ausente ou fraco -> Strategy Product via `example-ai-product-os/strategy/AGENT.md`
- Backlog do MVP ausente depois que o MVP Validation Scope de Strategy foi aprovado -> playbook Product Ops `mvp-backlog-planning` quando Product Ops estiver ativo; caso contrário, ativar `operations.product-ops`
- Roadmap ausente para produto operando -> Strategy Roadmap via `example-ai-product-os/strategy/AGENT.md`
- Epic local ausente -> playbook Product Ops `delivery-item-to-epic`
- Features ausentes -> playbook Product Ops `epic-to-features` quando Product Ops estiver ativo
- Implementação pronta -> workflow Engineering `feature-to-delivery-cycle`
- PR/review necessário -> rota de validação de PR em Engineering
- Readiness de launch, go-live, beta ou usuários reais -> Operations workflow `ready-for-launch` quando Product Ops, Engineering e DevOps estiverem ativos
- Execução de lançamento ou aprendizado pós-lançamento -> Growth workflow `launch-learning-loop` quando Growth estiver ativo

## Formato de Resposta ao Founder

Responda primeiro em linguagem simples:

```text
Onde estamos:
<momento atual do produto>

O que ja temos:
- <item confirmado>
- <item confirmado>

O que falta:
- <pré-requisito ausente>
- <pré-requisito ausente>

Risco de pular etapa:
<explicação curta>

Proximo passo recomendado:
<rota ou workflow>

Quer seguir por esse caminho?
```

Somente depois disso, liste arquivos técnicos inspecionados ou atualizações sugeridas.

## Se o Founder Pediu para Desenvolver Cedo Demais

Seja claro, mas útil:

```text
Ainda nao recomendo comecar pelo codigo.

O motivo e que <item de readiness ausente>.
Se formos direto para implementacao agora, o risco e <risco>.

O proximo passo seguro e <rota recomendada>.
Quer que eu conduza esse passo agora?
```
