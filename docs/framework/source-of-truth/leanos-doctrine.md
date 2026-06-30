# Doutrina Do LeanOS

## Propósito

LeanOS é um sistema operacional de startup nativo de agentes para founders que estão construindo produtos AI-first.

Seu propósito é ajudar o founder a transformar um negócio em um produto operacional: estratégia, decisões, escopo, entrega e aprendizado são tratados como partes do mesmo sistema, em vez de prompts, tasks ou mudanças de código espalhadas.

## Tese Central

O LeanOS trata o negócio do founder como um produto.

O aplicativo, SaaS, agente, marketplace ou ferramenta que será implementado é apenas uma manifestação desse negócio. Antes de existir software, o founder já está moldando um sistema de negócio: quem ele serve, qual dor resolve, qual promessa faz, como entrega valor, como aprende, como escolhe prioridades e como opera.

Por isso, o LeanOS deve ajudar o founder a construir o negócio e o produto juntos.

## Negócio Como Produto (Business as a Product)

Business as a Product é a doutrina central do LeanOS.

Ela significa que o negócio do founder não é tratado como um contexto de fundo ao redor do produto de software. O próprio negócio é o objeto que o LeanOS ajuda a desenhar, versionar, validar, operar e melhorar.

Assim como um produto, um negócio tem:

- usuários: clientes, founder, time, parceiros e mercado;
- proposta de valor;
- problemas a resolver;
- escopo;
- primeira versão;
- roadmap;
- critérios de qualidade;
- fluxos operacionais;
- riscos;
- métricas;
- feedback;
- ciclos de aprendizado.

Portanto, o LeanOS não deve começar pela pergunta "qual aplicativo vamos construir?".

Ele deve começar por:

```text
Qual negócio estamos moldando,
para quem,
para resolver qual problema,
com qual promessa,
e qual é a menor mudança de produto ou operação capaz de validar a próxima hipótese do negócio?
```

Isso muda a progressão padrão do framework.

Em vez de:

```text
Ideia -> aplicativo -> features -> código
```

O LeanOS opera como:

```text
Ideia de negócio
-> hipótese de cliente/problema/valor
-> Idea Calibration
-> Strategy Baseline mínima
-> primeiro escopo de validação do negócio
-> MVP ou artefato operacional necessário para validar
-> roadmap
-> Epics
-> Features
-> delivery
-> aprendizado
-> próxima versão do negócio
```

O objetivo não é apenas construir software. O objetivo é construir a capacidade do negócio de decidir o que construir, por que construir, como entregar e o que aprender em seguida.

## Camada De Progressão Do Negócio (Business Progression Layer)

Business Progression Layer é o mecanismo que torna Business as a Product operacional dentro do LeanOS.

A ideia é que o negócio do founder evolui como um produto. Ele não precisa nascer completo, com todas as áreas, processos, métricas, papéis e rituais. Assim como um produto começa com uma primeira versão pequena e evolui conforme o uso, o negócio também começa com uma superfície operacional mínima e cresce conforme novas necessidades aparecem.

No LeanOS, essa primeira versão do negócio começa normalmente por Strategy, porque antes de executar é preciso entender:

- quem o negócio serve;
- qual dor está tentando resolver;
- qual promessa está fazendo;
- quais princípios orientam decisões;
- quais hipóteses ainda são incertas;
- qual é o foco imediato.

Depois disso, outras capacidades do negócio vão nascendo conforme o estágio real exige:

- Product Ops nasce quando Strategy e MVP Validation Scope precisam virar Delivery Scope, Epic, Feature, critérios ou planejamento de entrega;
- Design nasce quando a experiência do produto precisa de fluxos, telas, componentes, UX, acessibilidade ou copy;
- Engineering nasce quando uma Feature está pronta para implementação ou quando um spike técnico foi explicitamente aprovado;
- DevOps nasce quando a entrega precisa de ambientes, CI/CD, deploy, observabilidade, release ou sincronização com GitHub;
- Security nasce quando surgem dados, autenticação, permissões, privacidade, API, banco, secrets, abuso, compliance, AI app runtime, agentes, RAG/vector DB, LLM input/output, tool permissions, prompt injection ou cost/rate abuse;
- Growth nasce quando lançamento, aquisição, feedback, retenção, onboarding, pricing ou aprendizado de mercado se tornam relevantes.

Essas capacidades não são criadas porque uma empresa "deveria ter departamentos". Elas são ativadas porque o negócio chegou a um estágio em que aquela capacidade é necessária para tomar a próxima decisão, executar o próximo ciclo ou reduzir o próximo risco.

Quando pricing se torna relevante, Growth Finance é o owner do Pricing Catalog. Planos, preços, trials, limites, quotas e entitlements devem ter uma fonte canônica em Finance antes de aparecerem em landing page, suporte, checkout, código ou billing provider.

Quando gastos, budget, burn, runway, ferramentas pagas, mídia paga, providers ou custos variáveis se tornam relevantes, Growth Finance é o owner do Spend Ledger. O LeanOS deve ajudar o founder a tomar decisões financeiras práticas sem fingir ser contabilidade, fiscal, banco ou ERP.

Progressive Workspace Activation é a implementação padrão dessa Business Progression Layer no filesystem e no framework gerado.

O wizard inicial pode oferecer uma opção avançada para preparar toda a superfície do LeanOS de uma vez. Essa opção existe para power users, demos, testes e casos em que o founder quer inspecionar tudo desde o primeiro momento. Ela não muda o padrão do produto: o caminho recomendado continua sendo começar pequeno e ativar Operations, Growth e áreas especializadas apenas quando a próxima decisão do negócio exigir.

O LeanOS organiza essa progressão em três camadas:

### 1. Camada De Negócio

Define o negócio que está sendo criado.

Ela cuida de:

- ICP ou primeiro segmento de cliente;
- problema;
- alternativa atual;
- proposta de valor;
- modelo de negócio;
- posicionamento;
- restrições;
- riscos;
- critérios de sucesso.

### 2. Camada Operacional

Define como o negócio decide e executa.

Ela cuida de:

- estágio de progressão;
- source of truth;
- lógica de roadmap;
- priorização;
- gates de ativação;
- papéis;
- workflows;
- handoffs;
- histórico de decisões.

### 3. Camada De Produto E Delivery

Define o que precisa ser construído, alterado ou entregue.

Ela cuida de:

- escopo de MVP;
- Epics;
- Features;
- tasks;
- critérios de Design;
- critérios de Security;
- plano de Engineering;
- readiness de DevOps;
- release;
- learning loop.

Toda entrega técnica no LeanOS deve conseguir responder:

```text
Qual hipótese de negócio, capacidade operacional ou promessa de produto esta entrega ajuda a validar, melhorar ou operar?
```

Se a resposta não estiver clara, o trabalho provavelmente ainda não está pronto para virar Feature.

## O Que O LeanOS É

- Um framework para operar uma startup com agentes de IA.
- Um sistema operacional local, baseado em arquivos, para strategy, produto, delivery e aprendizado.
- Um modelo de progressão Strategy-first que cresce apenas quando o founder chega ao próximo estágio.
- Um sistema de roteamento que transforma linguagem natural no workflow, área, role, skill, playbook e output corretos.
- Um sistema de delivery product-first: Roadmap -> Escopo de MVP -> Epic -> Features -> Delivery -> Aprendizado.
- Um sistema de guardrails que impede implementação antes que contexto, escopo e readiness sejam suficientes.

## O Que O LeanOS Não É

- Não é apenas um gerador de código.
- Não é um template genérico de projeto.
- Não é uma coleção de comandos.
- Não é um gerador de issues do GitHub.
- Não substitui o julgamento do founder.
- Não é um sistema que cria todos os departamentos no primeiro dia.
- Não é um sistema que trata toda ideia como algo a ser construído.

## Princípios Não Negociáveis

### 1. Strategy Antes De Delivery

O LeanOS não deve avançar para MVP, Epic, Feature ou implementação enquanto a Strategy Baseline estiver fraca demais.

No mínimo, Strategy deve esclarecer:

- usuário alvo ou ICP;
- problema ou dor;
- alternativa atual;
- proposta de valor;
- premissa mais arriscada;
- foco imediato.

### 2. Progressão Acima De Scaffolding

O LeanOS começa pequeno e ativa mais superfície operacional apenas quando o estágio do founder exige.

O workspace inicial é Strategy-first por padrão. Operations e Growth ficam disponíveis depois, mas não ficam ativos no caminho recomendado.

Uma opção avançada explícita pode preparar todas as áreas no setup inicial, desde que o wizard deixe claro que isso é menos progressivo e não substitui os gates de readiness.

### 3. Linguagem Natural É A Interface

O founder deve falar normalmente. O LeanOS Chief mapeia a intenção para estágio, gate, requisitos ativos e rota.

Arquivos gerados de slash-command não são a interface do LeanOS.

### 4. `AGENT.md` É Canônico Para O MVP

A convenção do MVP é `AGENT.md`, não `AGENTS.md`.

Mudar isso depois exige um plano de migração dedicado, regras de compatibilidade e validação.

### 5. Activation Required Significa Parar E Explicar

Se um departamento ou área necessário estiver inativo, o LeanOS não deve fingir que seus arquivos existem.

Ele deve retornar `activation_required`, explicar por que o próximo estágio operacional precisa daquela área e pedir confirmação antes de criar arquivos.

### 6. Trabalho Local De Produto É Primário

Os arquivos locais do LeanOS são a fonte da verdade operacional para Epics, Features, readiness, decisões e aprendizado.

GitHub é um espelho opcional de tracking e colaboração. Ele não deve se tornar automaticamente a fonte da verdade primária.

### 7. MVP É Validação De Negócio Por Meio De Delivery

O LeanOS não precisa forçar um processo formal e lento de validação antes de todo primeiro build.

Para o MVP, a validação pode acontecer por meio de um escopo de produto deliberadamente pequeno, landing page, sinal de aprendizado, revisão do founder, feedback de clientes ou evidência de uso, dependendo do negócio.

A regra importante não é "entrevistar primeiro"; a regra importante é "construir a menor coisa coerente capaz de ensinar algo real ao negócio."

### 8. Delivery Exige Readiness

Engineering não deve implementar ideias brutas, itens vagos de roadmap ou Epics não quebrados.

Implementação exige uma Feature ou issue mapeada do GitHub com critérios de readiness satisfeitos ou explicitamente marcados como não aplicáveis.

### 9. Workflows Coordenam, Playbooks Executam

Workflows são donos de progressão, gates, handoffs e coordenação entre áreas.

Playbooks executam trabalho prático dentro de uma área. Skills são capacidades reutilizáveis. Roles definem ownership e perspectiva operacional. Knowledge armazena fatos e regras confirmados.

### 10. Mudanças No Framework Devem Preservar Clareza Para O Founder

Quando o LeanOS adiciona estrutura, ele deve reduzir confusão, não aumentar cerimônia.

O founder deve sempre entender:

- o que já sabemos;
- o que ainda falta;
- por que a próxima rota é recomendada;
- o que será alterado;
- quando confirmação é necessária.

## Padrão De Decisão

Uma mudança no framework é boa apenas se melhorar pelo menos um destes resultados sem quebrar outro:

- clareza para o founder;
- correção da progressão;
- readiness de delivery;
- integridade da fonte da verdade local;
- ativação segura;
- qualidade de implementação;
- qualidade do learning loop;
- manutenibilidade dos assets gerados.

Se uma mudança principalmente adiciona mais arquivos, mais roles ou mais processo sem melhorar a próxima decisão do founder, rejeite ou adie.
