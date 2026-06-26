# Registro De Decisões Do LeanOS

Este arquivo registra decisões duráveis do framework LeanOS. Adicione novas decisões quando uma escolha afetar estrutura gerada, roteamento, ownership da fonte da verdade, ativação, comportamento do GitHub ou ordem do roadmap.

## 2026-06-26 - Manter `AGENT.md` Como Entrada Canônica Do MVP

Decisão:

- Manter `AGENT.md` como o nome canônico do arquivo de instruções de agente para o MVP.
- Não migrar os assets gerados para `AGENTS.md` agora.

Justificativa:

- O repo atual, o generator, o preview e os workflows já usam `AGENT.md`.
- Migrar agora criaria muito churn de paths sem melhorar o fluxo imediato do founder.
- Se a nomenclatura plural voltar depois, deve ser uma migração dedicada com regras de compatibilidade e validação.

## 2026-06-26 - Linguagem Natural Acima De Arquivos De Comando Gerados

Decisão:

- Linguagem natural é a interface principal do LeanOS.
- Não gerar `.leanos/commands/`.
- Não manter templates de comando, checklists de comando, instruções de comando ou exemplos de comando no `ai-standard` gerado.

Justificativa:

- A experiência do founder não deve depender de memorizar comandos.
- O `AGENT.md` raiz pode rotear a intenção por gates de progressão e áreas ativas.
- Arquivos de comando criavam uma segunda camada de roteamento e aumentavam o risco de contradição.

## 2026-06-26 - Workspace Progressivo Strategy-First

Decisão:

- O scaffold inicial cria apenas Strategy e runtime.
- Operations e Growth ficam disponíveis para ativação progressiva.

Justificativa:

- Founders não devem começar com um organograma completo.
- Strategy deve esclarecer a baseline de negócio/produto antes que superfícies de delivery ou Growth sejam úteis.
- A ativação mantém o framework menor e sensível ao estágio.

## 2026-06-26 - MVP Como Validação Prática De Negócio

Decisão:

- A validação de MVP pode acontecer por meio de um pequeno escopo de produto, landing page, sinal de aprendizado, feedback de clientes ou evidência de uso.
- Não exigir uma área formal separada de validação no scaffold de MVP.

Justificativa:

- A execução assistida por IA dá velocidade ao founder como vantagem.
- O framework deve evitar transformar validação inicial em burocracia.
- O gate importante é se o MVP é pequeno, coerente e capaz de ensinar algo real ao negócio.

## 2026-06-26 - Remover `strategy/validation` Do Scaffold De MVP

Decisão:

- `strategy/validation` não faz parte do scaffold padrão de MVP.
- Notas leves de validação vivem sob Strategy/Product.

Justificativa:

- Um departamento/área dedicada de validação cria processo inicial demais.
- Discovery formal pode voltar depois como capacidade opcional se o negócio precisar.

## 2026-06-26 - Remover Workflow Roadmap-To-GitHub

Decisão:

- `roadmap-to-github-project` não deve existir como workflow de Strategy.
- A sincronização com GitHub deve espelhar Epics/Features locais confirmados, não itens brutos de roadmap.

Justificativa:

- Roadmap é direção estratégica, não trabalho automaticamente executável.
- Product Ops é dono de Epics e Features.
- DevOps/GitHub é dono de readiness, dry-run e limites de sync externo.

## 2026-06-26 - Trabalho Local De Product Ops É Primário

Decisão:

- Epics/Features locais do LeanOS são a fonte primária para tracking de delivery.
- GitHub é representação remota opcional e tracking de colaboração.

Justificativa:

- O LeanOS deve preservar linguagem product-first.
- A estrutura de issues do GitHub não deve ditar o pensamento de produto.
- O estado de sync pode mapear artefatos locais para IDs remotos sem tornar o GitHub a fonte da verdade.

## 2026-06-26 - Business Stage Como Diagnóstico Primário

Decisão:

- O LeanOS deve diagnosticar o estágio real do negócio antes de qualquer rota.
- Os estágios canônicos são: `seed`, `strategy_forming`, `mvp_shaping`, `mvp_building`, `mvp_live_learning`, `product_operating` e `growth_scaling`.
- Toda nova ideia deve entrar por `new-idea-intake`, que avalia a ideia considerando o `business_stage` atual.

Justificativa:

- Uma nova ideia pode aparecer em qualquer estágio do negócio.
- Um produto em operação não deve tratar toda ideia nova como MVP.
- O founder não deve escolher estágios manualmente.
- Centralizar ideias novas em `new-idea-intake` mantém o framework simples e evita burocracia adicional.
