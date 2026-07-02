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

## 3. Preserve Topologia De Fluxo, Não Organograma

Antes de criar ou mover área, role, skill, playbook, workflow ou source of truth, responda:

- qual fluxo de valor melhora;
- qual carga cognitiva reduz;
- qual ownership esclarece;
- qual handoff elimina, simplifica ou torna verificável;
- qual risco reduz.

Não aprove mudança estrutural apenas porque ela parece "mais completa" ou "mais parecida com uma empresa".

Use a Lei de Conway como restrição: a comunicação modelada pelo LeanOS tende a aparecer no produto gerado. Se a mudança cria silo, duplicação de fonte da verdade ou handoff sem evidência, ela aumenta risco arquitetural e operacional.

Use Team Topologies como lente prática:

- stream-aligned deve ficar perto do resultado do founder;
- enabling/specialist deve entrar por gatilho claro e sair com output consumível;
- platform deve reduzir fricção e padronizar caminhos seguros;
- Product Ops coordena delivery, mas não deve concentrar toda decisão do negócio.

## 4. Mantenha O Workspace Inicial Pequeno

O workspace inicial deve continuar Strategy-first por padrão.

Não ative Operations, Growth, Design, Engineering, Security ou DevOps durante o scaffold inicial recomendado.

Exceção: o wizard pode oferecer uma opção avançada única para preparar todas as áreas de uma vez. Essa opção não deve virar multiselect de departamentos/áreas e não deve ser o default. Mesmo no modo avançado, readiness, activation gates e fonte da verdade local continuam valendo.

## 5. Não Roteie Para Caminhos Inativos

Se uma rota precisar de uma área inativa, retorne `activation_required`.

Não referencie roles, skills, playbooks, workflows ou arquivos de knowledge de áreas inativas como se eles existissem.

## 6. Mantenha Linguagem Natural Como Interface Principal

Não reintroduza `.leanos/commands/` gerados como interface operacional.

Não gere arquivos de agente/prompt específicos de editor como interface do LeanOS. O ponto de entrada operacional é o `AGENT.md` raiz, com linguagem natural e roteamento por `intent-map.yaml`.

## 7. Não Transforme O Root AGENT Em Inventário

O root `AGENT.md` deve conter red lines, contexto mínimo de boot, protocolo de ativação e regras de navegação.

Novas intenções naturais duráveis devem ser adicionadas em `.leanos/runtime/index/intent-map.yaml` e cobertas por validação automatizada.

O root pode usar pistas do intent map para conferir coerência, mas deve carregar apenas o departamento dono ativo. Roles, skills, playbooks, workflows e knowledge continuam sendo escolhidos pelo departamento ou área dona.

## 8. Proteja A Taxonomia De Trabalho Product-First

O LeanOS usa:

```text
Roadmap -> Escopo de MVP -> Epic -> Feature -> Task
```

A linguagem de issues do GitHub é uma representação remota, não a taxonomia central de produto.

## 9. Separe Planejamento De Implementação

Não permita que:

- itens de roadmap virem código;
- escopo de MVP vire código;
- Epics virem código;
- Features virem código sem readiness.

Engineering começa depois que a Feature passa pelos gates de readiness.

## 10. Trate MVP Como Aprendizado, Não Como Perfeição

O MVP deve ser pequeno o suficiente para validar uma premissa de negócio ou produto, mas bom o suficiente para criar uma primeira experiência crível.

Evite os dois extremos:

- discovery interminável sem aprendizado de produto;
- implementação apressada sem aprendizado estratégico.

## 11. Deixe Limites De Confirmação Explícitos

Peça confirmação antes de:

- criar ou ativar departamentos/áreas;
- alterar arquivos da fonte da verdade;
- criar Epics ou Features;
- escrever código;
- executar ações remotas de GitHub/API;
- atualizar estado de sync depois de execução remota.

## 12. Não Deixe Artefatos Temporários Virarem Produto

Scripts temporários, probes locais, arquivos de debug e checagens descartáveis criados por humanos ou agentes devem ir para `.leanos/runtime/scratch/` quando precisarem existir como arquivo.

Antes de preparar PR, validar PR ou recomendar merge:

- rode um `Temporary Artifact Sweep`;
- remova scripts temporários que não pertencem ao produto;
- confirme que `.leanos/runtime/scratch/` não tem arquivo versionado além do README;
- bloqueie `debug-*`, `temp-*`, `scratch-*`, `check-*`, `verify-*` e equivalentes sem owner, propósito, documentação e comando oficial;
- roteie para Security/DevOps quando o script tocar dados, secrets, APIs externas, banco, filesystem amplo ou automação remota.

Script permanente precisa ser tratado como produto interno: ter owner, propósito, comando oficial, documentação, entradas, saídas, riscos e validação.

## 13. Exija Gatilhos Semânticos Concretos

O LeanOS deve ser genérico no contexto de produto, mas específico na governança do trabalho.

Skills e playbooks gerados precisam ter `description` começando com "Use quando" e contendo sinais concretos de ativação. Não aceite descriptions que:

- repetem o nome do asset;
- dizem que o asset "é necessário para o pedido ativo";
- dizem que "esta sequência de execução corresponder ao pedido ativo";
- descrevem apenas intenção genérica sem artefato, risco, sintoma, decisão, handoff ou estado de prontidão.

Toda skill e todo playbook devem declarar 2 ou mais sinais concretos em `description` e `## Use Quando`.

## 14. Use Capability Packs Para Classes Recorrentes De Trabalho

Quando uma Feature ou workflow tocar uma classe operacional recorrente que atravessa áreas, use um capability pack explícito antes de Engineering.

Na v1, os packs opcionais de Operations são:

- `operations.product-analytics`: eventos, tracking plan, funis, UTM, origem de lead, deduplicação e privacidade de analytics;
- `operations.external-integrations`: APIs externas, webhooks, payloads, retry, idempotência, autenticação, fallback e logs seguros.

Se o pack estiver inativo, retorne `activation_required` para a menor área necessária. Não deixe Engineering, Growth ou DevOps improvisarem source of truth paralelo.

## 15. Use `lean-os validate` Como Diagnóstico Read-Only

Quando o founder pedir para validar, auditar, conferir ou diagnosticar se o LeanOS local está correto, rode `lean-os validate` na raiz do workspace antes de propor correções, quando ferramentas locais estiverem disponíveis.

Use o resultado como triagem:

- `blocker` e `high` exigem correção antes de confiar no roteamento;
- `medium` e `low` são avisos que podem virar backlog ou limpeza;
- validação não deve alterar arquivos;
- correção estrutural deve acontecer por `lean-os update`, edição guiada ou workflow apropriado.

## 16. Use O Registro De Decisões Para Escolhas Duráveis

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
- cria organograma em pasta em vez de fluxo de valor;
- cria área especialista sem gatilho claro;
- duplica source of truth entre áreas;
- adiciona handoff sem artefato verificável;
- adiciona roteamento entre áreas sem gate;
- adiciona casos longos de intenção natural diretamente no root `AGENT.md`;
- depende da memória do modelo em vez da fonte da verdade local;
- mistura responsabilidades de Strategy, Product Ops e Engineering;
- torna o GitHub a fonte da verdade padrão;
- reintroduz arquivos de comando como interface principal;
- deixa scripts temporários, probes ou arquivos de debug acumularem no repositório;
- gera skill ou playbook com description circular, genérica ou sem sinais concretos de ativação;
- contradiz decisões aceitas sem atualizar o registro de decisões.
