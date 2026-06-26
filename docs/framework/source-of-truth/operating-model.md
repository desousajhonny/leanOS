# Modelo Operacional Do LeanOS

## Sequência Operacional

O LeanOS opera por meio desta progressão:

```text
Ideia / Contexto Inicial
-> Idea Calibration
-> Strategy Baseline
-> MVP Validation Scope
-> Roadmap Candidate
-> Delivery Scope
-> Epic
-> Features
-> Delivery
-> PR / Release
-> Learning Loop
```

A sequência nem sempre é linear em produtos maduros, mas os gates continuam valendo. Um founder pode entrar no LeanOS com um produto, codebase ou backlog existente. O LeanOS deve mapear o estágio atual antes de rotear.

O estágio atual do negócio é definido em `business-stages.md`. O Chief deve mapear esse estágio antes de qualquer ação, porque uma nova ideia pode aparecer tanto em um negócio recém-iniciado quanto em um produto já operando.

Toda nova ideia entra por `new-idea-intake`, e esse intake deve considerar o estágio atual do negócio.

## Fluxo Inicial

### 1. Contexto Inicial

A CLI captura apenas o contexto suficiente para começar:

- nome da empresa ou do produto;
- tipo de produto;
- descrição curta da ideia;
- usuário alvo;
- estágio;
- modo de operação;
- sinal de repo ou produto existente.

Isso não é a verdade final. É um insumo inicial para Strategy.

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

### 4. Roadmap Candidate

O roadmap começa como oportunidade e foco organizados, não como implementação garantida.

O roadmap pode conter:

- Now / Next / Later;
- itens de not-now;
- oportunidades de aprendizado;
- candidatos a MVP;
- oportunidades futuras de produto.

O roadmap não deve criar automaticamente Epics, Features ou issues no GitHub.

### 5. Delivery Scope

Delivery Scope traduz Strategy, MVP Validation Scope e direção selecionada do roadmap em escopo concreto de entrega.

Product Ops é dono do Delivery Scope. Se Product Ops estiver inativo, o LeanOS retorna `activation_required: operations.product-ops`.

### 6. Epic

Um Epic é um artefato local de Product Ops que transforma um item de roadmap ou Delivery Scope em contexto executável de entrega.

Um Epic não é uma issue do GitHub por padrão. O GitHub pode espelhá-lo depois.

### 7. Features

Features quebram um Epic em unidades implementáveis.

Cada Feature deve conter critérios de aceite, tasks internas e dimensões de readiness para Product Ops, Engineering e, quando aplicável, Design, Security e DevOps.

### 8. Delivery

Delivery começa apenas quando uma Feature está pronta para desenvolvimento ou quando um spike técnico explícito foi aprovado.

Engineering entra depois da readiness de Product Ops e de qualquer gate aplicável de Design, Security ou DevOps.

### 9. Ciclo De Aprendizado

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

É dono do escopo de MVP, Epics, Features, readiness de entrega, design, engineering, security, DevOps e continuação pós-merge.

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
