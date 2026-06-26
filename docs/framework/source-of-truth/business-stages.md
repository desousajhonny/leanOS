# Estágios Do Negócio No LeanOS

Este arquivo define os estágios canônicos do negócio dentro do LeanOS.

O estágio do negócio é a leitura durável do momento real da empresa/produto do founder. Ele orienta o LeanOS Chief antes de qualquer rota, jornada, ativação de área, roadmap, escopo de MVP ou implementação.

## Regra Central

Antes de qualquer ação, o LeanOS Chief deve mapear:

```text
Qual é o estágio real do negócio agora?
Quais áreas estão ativas no workspace?
Qual é a intenção do founder nesta mensagem?
Qual gate permite ou bloqueia o próximo passo?
```

O founder não deve escolher manualmente o estágio. O Chief infere o estágio a partir de `leanos.yaml`, contexto ativo, arquivos de Strategy, evidências existentes e conversa com o founder.

## O Que O Estágio Do Negócio Não É

O estágio do negócio não é:

- um comando;
- uma classificação que o founder precisa preencher;
- permissão automática para implementar;
- substituto para `idea-calibration`;
- substituto para readiness de Epic, Feature, Design, Security, DevOps ou Engineering.

Toda ideia entra por `idea-calibration`, e a calibragem usa o estágio atual do negócio como contexto.

## Estágios Canônicos

### 1. `seed`

O negócio está no ponto inicial.

Sinais:

- existe apenas nome, descrição vaga ou ideia curta;
- a CLI capturou contexto mínimo;
- usuário, dor, promessa e foco ainda são hipóteses fracas;
- não existe Strategy Baseline confiável.

Trabalho principal do Chief:

- iniciar `idea-calibration` em Strategy Product;
- entender usuário inicial, dor, alternativa atual, promessa e premissa mais arriscada;
- fazer uma pergunta útil por vez;
- evitar roadmap, MVP delivery scope, Epic, Feature e código.

Rotas típicas:

- `strategy/product/skills/map-business-baseline/SKILL.md`
- `strategy/product/playbooks/idea-calibration.playbook.md`

Próximo estágio saudável:

- `strategy_forming`

### 2. `strategy_forming`

O negócio está formando a baseline estratégica.

Sinais:

- usuário ou ICP inicial começa a ficar claro;
- dor principal está sendo escolhida;
- alternativa atual e proposta de valor ainda estão sendo refinadas;
- foco imediato ainda pode mudar;
- o founder ainda está descobrindo qual negócio está moldando.

Trabalho principal do Chief:

- fechar a Strategy Baseline mínima;
- separar fatos, hipóteses e incertezas;
- avaliar ideias novas com `idea-calibration`;
- impedir que pedidos de MVP ou implementação pulem a baseline.

Gate mínimo para avançar:

- usuário inicial ou ICP;
- dor principal;
- alternativa atual;
- promessa inicial;
- premissa mais arriscada;
- foco imediato.

Próximo estágio saudável:

- `mvp_shaping`

### 3. `mvp_shaping`

O negócio já tem baseline suficiente para estruturar o primeiro caminho de validação.

Sinais:

- Strategy Baseline mínima existe;
- o founder quer definir o que validar primeiro;
- existe direção de roadmap candidate ou MVP validation scope;
- ainda não existe necessariamente escopo executável de entrega.

Trabalho principal do Chief:

- transformar Strategy em MVP validation scope;
- organizar roadmap candidate sem virar backlog de implementação;
- decidir se Product Ops precisa ser ativado para escopo de entrega;
- manter Design, Engineering, Security, DevOps e Growth inativos até seus gates.

Rotas típicas:

- Strategy Product para MVP validation scope;
- `strategy/product/playbooks/mvp-validation-scope.playbook.md`;
- Strategy Roadmap para roadmap candidate;
- `activation_required: operations.product-ops` quando o founder entra em escopo de entrega.

Próximo estágio saudável:

- `mvp_building`

### 4. `mvp_building`

O negócio está construindo o primeiro MVP, experimento ou superfície de validação.

Sinais:

- Product Ops está ativo ou precisa ser ativado;
- existe escopo de MVP ou delivery scope;
- Epics e Features começam a ser estruturados;
- Engineering só entra depois de readiness de Feature ou spike técnico aprovado.

Trabalho principal do Chief:

- proteger a taxonomia Roadmap -> Escopo de MVP -> Epic -> Feature -> Task;
- garantir readiness antes de implementação;
- ativar Design, Security, DevOps ou Engineering apenas quando o escopo exige;
- impedir que ideias novas entrem direto no MVP sem intake.

Rotas típicas:

- `operations/workflows/define-mvp.workflow.md`
- `operations/workflows/roadmap-item-to-epic.workflow.md`
- `operations/workflows/epic-to-features.workflow.md`
- `operations/workflows/feature-to-delivery-cycle.workflow.md`

Próximo estágio saudável:

- `mvp_live_learning`

### 5. `mvp_live_learning`

O MVP, landing page, concierge MVP, protótipo operacional ou primeira superfície de validação já está exposta a usuários, leads ou uso real.

Sinais:

- existe algo que pode gerar aprendizado externo;
- feedback, uso, conversão, suporte ou comportamento do cliente começa a aparecer;
- a pergunta principal passa a ser o que aprender, manter, ajustar, pivotar ou pausar.

Trabalho principal do Chief:

- capturar evidência e aprendizado;
- comparar sinais com premissas;
- atualizar Strategy, Roadmap ou Product Ops conforme o aprendizado;
- ativar Growth quando lançamento, aquisição, onboarding, retenção ou feedback se tornam relevantes.

Rotas típicas:

- learning loop;
- post-merge continuation;
- Growth quando há movimento market-facing ou customer-facing.

Próximo estágio saudável:

- `product_operating`

### 6. `product_operating`

O produto já roda como operação contínua.

Sinais:

- há produto, clientes, usuários, backlog, roadmap ou releases recorrentes;
- novas ideias precisam ser avaliadas contra o produto existente;
- nem toda mudança é MVP;
- decisões passam por impacto em clientes, roadmap, operação, dívida técnica, risco e timing.

Trabalho principal do Chief:

- usar `idea-calibration` para toda nova ideia;
- avaliar fit com ICP, produto atual, roadmap, clientes, riscos e timing;
- impedir que ideias novas virem Feature sem roadmap/delivery readiness;
- manter o negócio operando com cadência de aprendizado e priorização.

Regra importante:

```text
Uma ideia nova em product_operating não é MVP por padrão.
Ela entra por `idea-calibration` e só depois pode virar roadmap candidate, delivery candidate, Epic ou Feature.
```

Próximo estágio saudável:

- `growth_scaling`

### 7. `growth_scaling`

O negócio está focado em crescimento, aquisição, retenção, monetização, operação e escala.

Sinais:

- existe produto em uso e aprendizado recorrente;
- aquisição, onboarding, pricing, retenção, suporte, métricas ou operação viram gargalos centrais;
- Growth, Finance, Customer Experience ou áreas similares podem ser necessárias.

Trabalho principal do Chief:

- conectar ideias e entregas a alavancas de crescimento;
- avaliar impacto em aquisição, retenção, monetização, suporte e operação;
- manter learning loop e roadmap alinhados com sinais reais;
- evitar que crescimento vire lista solta de campanhas ou features.

Rotas típicas:

- Growth quando market-facing ou customer-facing é necessário;
- Strategy/Roadmap quando o aprendizado muda direção;
- Product Ops/Engineering quando há entrega de produto com readiness.

## Como O Chief Usa O Estágio

### Ao Ouvir "Vamos Começar"

O Chief não executa um comando. Ele diagnostica o estado atual.

```text
Se business_stage = seed:
  conduzir descoberta inicial da ideia.

Se business_stage = strategy_forming:
  fechar lacunas da Strategy Baseline.

Se business_stage = mvp_shaping:
  ajudar a escolher MVP validation scope ou roadmap candidate.

Se business_stage = mvp_building:
  retomar escopo, Epics, Features ou readiness.

Se business_stage = mvp_live_learning:
  capturar aprendizado e decidir próximo ciclo.

Se business_stage = product_operating:
  resumir estado atual e perguntar qual frente avançar.

Se business_stage = growth_scaling:
  orientar crescimento, aprendizado e operação.
```

### Ao Receber Uma Nova Ideia

Toda nova ideia entra por `idea-calibration`, independentemente do estágio do negócio.

O intake deve avaliar a ideia contra o estágio atual:

- em `seed`, ajuda a descobrir usuário, dor, promessa e foco;
- em `strategy_forming`, verifica se fortalece ou muda a baseline;
- em `mvp_shaping`, verifica se ajuda ou distrai o MVP validation scope;
- em `mvp_building`, verifica impacto no escopo atual e risco de desviar entrega;
- em `mvp_live_learning`, verifica se responde a evidência real;
- em `product_operating`, verifica fit com produto, clientes, roadmap, riscos e timing;
- em `growth_scaling`, verifica impacto em aquisição, retenção, monetização, operação e aprendizado.

## Atualização Do Estágio

O estágio do negócio só deve mudar quando houver evidência suficiente ou confirmação explícita do founder.

O Chief deve propor a mudança antes de atualizar arquivos:

```text
Pelo que já registramos, parece que saímos de strategy_forming e entramos em mvp_shaping.
Isso significa que a próxima decisão saudável é escolher o caminho de validação do MVP, ainda sem criar Features ou código.
Quer que eu atualize o estágio do negócio para mvp_shaping?
```

## Regras De Bloqueio

- Não avance estágio apenas porque o founder pediu uma Feature.
- Não trate uma nova ideia como MVP automaticamente.
- Não use `activation_required` para compensar Strategy fraca.
- Não ative Product Ops antes de Strategy Baseline ou roadmap/MVP candidate suficiente.
- Não ative Engineering antes de Feature readiness.
- Não volte para `seed` quando um produto em operação traz uma ideia nova.
- Não peça que o founder escolha o estágio em uma lista; o Chief diagnostica e explica.
