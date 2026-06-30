# Modelo Operacional Do LeanOS

## Sequência Operacional

O LeanOS opera por meio desta progressão:

```text
Ideia / Contexto Inicial
-> Idea Calibration
-> Strategy Baseline
-> MVP Validation Scope
-> MVP Validation Sequence
-> Product Ops / MVP Backlog
-> Epic
-> Features
-> Delivery
-> PR / Release
-> Ready for Launch
-> Learning Loop
```

Roadmap não é uma etapa obrigatória depois de MVP Validation Scope.

Quando o negócio está em `mvp_building` ou `mvp_live_learning`, uma ideia calibrada que afeta o MVP atual deve seguir para Product Ops. Quando o negócio está em `product_operating` ou `growth_scaling`, Roadmap entra para ordenar ciclo, backlog e múltiplas prioridades.

A sequência nem sempre é linear em produtos maduros, mas os gates continuam valendo. Um founder pode entrar no LeanOS com um produto, codebase ou backlog existente. O LeanOS deve mapear o estágio atual antes de rotear.

O estágio atual do negócio é definido em `business-stages.md`. O Chief deve mapear esse estágio antes de qualquer ação, porque uma nova ideia pode aparecer tanto em um negócio recém-iniciado quanto em um produto já operando.

Toda ideia entra por `idea-calibration`, e essa calibragem deve considerar o estágio atual do negócio.

## Fluxo Inicial

### 1. Contexto Inicial

A CLI captura apenas o contexto suficiente para começar:

- nome do produto;
- se o LeanOS parte de uma ideia/produto novo ou será conectado a um projeto existente;
- tipo de produto;
- descrição curta da ideia;
- sinal de repo ou produto existente.
- modo de preparação do ambiente:
  - progressivo recomendado: Strategy ativa agora, Operations e Growth disponíveis para ativação posterior;
  - avançado: preparar todas as áreas de uma vez.
- preferência inicial de suporte GitHub.

Isso não é a verdade final. É um insumo inicial para Strategy.

O wizard não deve perguntar usuário alvo, estágio inicial ou modo de operação no setup curto. Para ideia nova, esses campos podem começar com defaults internos e ser refinados por Strategy. Para projeto existente, o LeanOS deve tratar o contexto real do repositório e da conversa como fonte para calibrar estágio e público depois.

### 2. Idea Calibration E Strategy Baseline

O LeanOS Chief começa em Strategy e usa `idea-calibration` para transformar a ideia ou contexto inicial em uma Strategy Baseline mínima de negócio/produto.

O Chief deve fazer uma pergunta útil por vez e evitar a fadiga de entrevistas abertas.

Arquivos de knowledge só devem ser atualizados depois que o founder confirma a baseline calibrada.

### 3. MVP Validation Scope

O MVP Validation Scope traduz a Strategy Baseline confirmada no menor caminho de validação do negócio.

Ele pode ser produto pequeno, landing page, concierge/manual workflow, protótipo ou automação simples.

Strategy é dona desta decisão porque ela responde:

- qual hipótese do negócio queremos validar;
- qual menor artefato pode ensinar algo real;
- quais sinais indicam sucesso, pivô ou pausa.

MVP Validation Scope não cria Epic, Feature, GitHub issue, branch ou código.

### 4. MVP Validation Sequence

MVP Validation Sequence organiza a ordem mínima para aprender com o MVP: o que tentar primeiro, quais sinais observar, quando pivotar e quando passar para Product Ops.

Ela não cria Roadmap, backlog, Epic, Feature, GitHub issue, branch ou código.

### 5. Roadmap

O roadmap começa como oportunidade e foco organizados, não como implementação garantida. Ele é condicional: deve ser usado quando o produto está operando, escalando ou quando há múltiplas prioridades para ordenar.

O roadmap pode conter:

- Now / Next / Later;
- itens de not-now;
- oportunidades de aprendizado;
- oportunidades de produto;
- oportunidades futuras de produto.

O roadmap não deve criar automaticamente Epics, Features ou issues no GitHub.

### 6. MVP Backlog

MVP Backlog traduz o MVP Validation Scope aprovado em itens operacionais de Product Ops.

Product Ops é dono do MVP Backlog. Se Product Ops estiver inativo, o LeanOS retorna `activation_required: operations.product-ops`.

O MVP Backlog responde:

- o que entra;
- o que fica fora;
- qual hipótese cada item valida;
- quais sinais indicam que funcionou;
- quais riscos precisam de Design, Security, Engineering ou DevOps;
- quais itens estão aprovados para virar Epic.

### 7. Delivery Scope E Epic

Delivery Scope é uma decisão dentro de Product Ops que confirma `scope_type`, milestone, release goal, não objetivos e fronteiras de entrega.

Um Epic é um artefato local de Product Ops que transforma um item aprovado de MVP Backlog, roadmap, backlog ou Delivery Scope em contexto executável de entrega.

Um Epic não é uma issue do GitHub por padrão. O GitHub pode espelhá-lo depois.

### 8. Features

Features quebram um Epic em unidades implementáveis.

Cada Feature deve conter critérios de aceite, tasks internas e dimensões de readiness para Product Ops, Engineering e, quando aplicável, Design, Security e DevOps.

Security é aplicável quando a Feature toca dados, autenticação, permissões, privacidade, abuso, API, banco, secrets, compliance, infraestrutura, código gerado por IA ou risco AI-native como LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection e cost/rate abuse.

### 9. Delivery

Delivery começa apenas quando uma Feature está pronta para desenvolvimento ou quando um spike técnico explícito foi aprovado.

Engineering entra depois da readiness de Product Ops e de qualquer gate aplicável de Design, Security ou DevOps.

### 10. Ready For Launch

Ready for Launch é o gate operacional antes de expor uma release, beta, MVP slice ou versão a usuários reais.

Ele pertence a Operations porque precisa combinar:

- escopo, release goal, critérios de aceite e não objetivos de Product Ops;
- evidência de PR, testes, build, validação manual e riscos técnicos de Engineering;
- ambiente alvo, deploy path, rollback, release notes, observabilidade e post-release checks de DevOps;
- Design, Security, Growth ou Strategy apenas quando seus gatilhos forem aplicáveis.

Quando Security for aplicável, Ready for Launch deve exigir `security_gate_passed`, risco conhecido aceito explicitamente ou decisão `blocked_by_security` antes de qualquer exposição a usuários reais.

O resultado deve ser uma decisão explícita:

- `ready_to_launch`;
- `ready_with_known_risks`;
- `blocked_by_product`;
- `blocked_by_design`;
- `blocked_by_security`;
- `blocked_by_engineering`;
- `blocked_by_devops`;
- `blocked_by_growth`;
- `not_ready_to_learn`.

Growth executa lançamento aprovado e aprendizado pós-lançamento. Ele não substitui o gate de readiness operacional.

### 11. Ciclo De Aprendizado

Depois da entrega, o LeanOS deve capturar o que mudou, o que foi aprendido, o que continua incerto e qual rota deve acontecer em seguida.

O aprendizado pode rotear de volta para Strategy, Roadmap, Product Ops, Growth ou outra área ativa.

## Modelo De Ativação

O LeanOS distingue:

- `active`: os arquivos existem e podem ser carregados agora;
- `available`: o LeanOS sabe como criar a área depois;
- `inactive`: ainda não pode ser carregada;
- `pending_activation`: proposta, mas ainda não confirmada;
- `missing`: um asset ativo esperado está ausente e deve interromper a rota.

O Chief nunca deve tratar `available` como carregável.

## Responsabilidades Dos Departamentos

### Strategy

É dono do contexto de negócio, estratégia de produto, ICP, problema, proposta de valor, candidatos de roadmap e aprendizado estratégico.

### Operations

É dono do MVP Backlog, Delivery Scope, Epics, Features, readiness de entrega, design, engineering, security, DevOps e continuação pós-merge.

Operations é ativado apenas quando o founder chega ao trabalho de entrega.

### Growth

É dono de lançamento, aquisição, feedback, onboarding, retenção, pricing e ciclos de aprendizado depois que existe algo relevante para lançar ou medir.

Growth é ativado apenas quando operações voltadas ao mercado ou ao cliente se tornam relevantes.

## Modelo GitHub

GitHub é uma infraestrutura opcional para tracking e colaboração.

A fonte da verdade local do LeanOS vem primeiro:

```text
operations/product-ops/epics/
-> optional dry-run payload
-> GitHub issues / GitHub Projects
-> sync-state metadata
```

Regras:

- nenhum token em arquivos versionados;
- nenhuma escrita remota sem dry-run e confirmação explícita;
- nenhuma issue do GitHub para ideias brutas;
- nenhuma sincronização com GitHub como prova de readiness de entrega;
- nenhum ID ou número de issue do GitHub inventado.

## Modelo De Resposta

O LeanOS Chief deve comunicar o roteamento operacional em linguagem amigável para o founder:

```text
O que já temos:
O que ainda falta:
Próximo passo recomendado:
Pergunta:
```

Para trabalho roteado, use uma Narração de Rota curta:

```text
LeanOS Chief: vou rotear isso para Strategy / Product porque ainda estamos fechando a hipótese central antes de falar de MVP.
```

Não use um cabeçalho técnico obrigatório em todas as respostas.
