# Registro De Decisões Do LeanOS

Este arquivo registra decisões duráveis do framework LeanOS. Adicione novas decisões quando uma escolha afetar estrutura gerada, roteamento, ownership da fonte da verdade, ativação, comportamento do GitHub ou ordem do roadmap.

## 2026-06-30 - Growth Experiment Ledger Como Fonte De Aprendizado De Mercado

Decisão:

- Growth Marketing é owner do Growth Experiment Ledger em `growth/marketing/knowledge/growth-experiments.md`.
- Toda decisão de Growth depois de lançamento, campanha, landing page, aquisição, oferta ou onboarding deve usar experimento registrado ou feedback registrado em Customer Experience.
- O ledger registra hipótese, canal, asset, fonte de medição, critérios de sucesso/falha, resultado, decisão e relação com spend quando aplicável.
- Marketing ganha:
  - skill `growth-experiment-planning`;
  - skill `growth-result-analysis`;
  - playbook `growth-experiment`.
- `launch-learning-loop` deve exigir evidência antes de recomendar decisão e deve produzir `Decision output` com o enum:
  - `continue`;
  - `iterate_copy`;
  - `iterate_pricing`;
  - `open_product_ops_item`;
  - `route_to_strategy`;
  - `scale_spend`;
  - `pause`.
- O framework deve funcionar sem integração automática de analytics: o founder pode colar resultados por Manual Result Input Template.
- Skills e playbooks não podem chamar APIs externas de analytics, CRM, email, ads, suporte ou pagamentos por padrão.
- Quando houver spend, mídia paga, ferramenta paga ou decisão `scale_spend`, Growth Finance deve revisar Spend Ledger antes de execução ou escala.
- Quando o resultado mudar ICP, problema, proposta, categoria ou posicionamento, Strategy Product deve entrar.
- Quando o resultado virar escopo de produto, Product Ops deve entrar antes de Epic, Feature ou GitHub.
- O generator valida esse contrato com `validateGrowthExperimentContract`.

Justificativa:

- Founders AI builders frequentemente rodam landing pages, mensagens e campanhas sem registrar hipótese, métrica ou decisão, criando aprendizado perdido.
- Exigir integração automática cedo demais atrasaria a v1; input manual preserva velocidade e disciplina.
- Um ledger simples evita que Growth tome decisões por intuição ou métricas de vaidade.
- Conectar Marketing, Customer Experience, Finance, Strategy e Product Ops cria um loop claro entre mercado, aprendizado e execução.

## 2026-06-30 - Pricing Catalog Como Fonte Canônica De Planos E Entitlements

Decisão:

- Growth Finance é o owner do Pricing Catalog em `growth/finance/knowledge/pricing.md`.
- O Pricing Catalog é a fonte canônica de negócio para plano, preço, trial, desconto, limite, quota e entitlement.
- O runtime source do produto continua separado do markdown e deve ser mapeado quando existir implementação:
  - billing provider;
  - database table;
  - code path;
  - runtime config;
  - webhook/event source;
  - status de sync/verificação.
- O root `AGENT.md` deve rotear pedidos de planos, preços, cobrança, pacotes, assinatura ou entitlements para `growth.finance`; se Finance estiver inativo, retorna `activation_required: growth.finance`.
- Marketing e Customer Experience podem consumir planos e preços, mas não podem inventar nomes, valores, trials, limites ou entitlements.
- Product Ops deve exigir Pricing/Plan readiness antes de marcar Feature como pronta quando o trabalho tocar checkout, billing, paywall, subscription, trial, quota, limite ou entitlement.
- Engineering deve bloquear hardcoding de plano, preço, trial, quota, limite ou entitlement sem vínculo com Pricing Catalog e runtime source aprovado.
- DevOps deve mapear provider IDs, env vars, webhook secrets e runtime config sem salvar segredos em markdown.
- Security deve revisar mudanças de payment, billing, pricing ou entitlement quando dinheiro, acesso ou dados de cliente forem afetados.
- O generator valida esse contrato com `validatePricingSourceOfTruthContract`.

Justificativa:

- Founders sofrem quando plano, preço e limite aparecem divergentes em landing page, código, banco, provider de pagamento e suporte.
- Separar decisão de negócio de runtime source evita usar markdown como config de produção, sem perder clareza operacional.
- Conectar Finance, Marketing, CX, Product Ops, Engineering, DevOps e Security cria uma rota única para mudar pricing sem drift.
- A validação automática impede que o framework volte a gerar apenas uma hipótese rasa de pricing.

## 2026-06-30 - Spend Ledger Como Fonte Canônica De Gastos E Runway

Decisão:

- Growth Finance é o owner do Spend Ledger em `growth/finance/knowledge/spend-ledger.md`.
- O Spend Ledger é a fonte canônica leve de gastos recorrentes, pontuais, ferramentas pagas, mídia paga, providers, custos variáveis e compromissos financeiros operacionais.
- `growth/finance/knowledge/budget.md` registra Monthly Budget, Runway Snapshot e Approval Thresholds.
- O root `AGENT.md` deve rotear pedidos de gastos, orçamento, budget, burn, runway, custos, ferramentas pagas, infra paga, mídia paga ou unit economics para `growth.finance`; se Finance estiver inativo, retorna `activation_required: growth.finance`.
- Finance ganha:
  - skill `spend-review`;
  - skill `runway-analysis`;
  - skill `budget-planning`;
  - playbook `spend-approval`;
  - playbook `monthly-finance-check`.
- Marketing deve consultar Finance antes de mídia paga, campanha com orçamento ou ferramenta de aquisição paga.
- Product Ops deve exigir Cost/Spend readiness quando uma Feature cria gasto recorrente, provider pago, ferramenta paga ou custo variável relevante.
- Engineering deve rotear AI/API, storage, worker, queue, vector DB, logging, analytics e paid providers para Finance quando houver custo variável relevante.
- DevOps deve mapear providers pagos, quotas, budgets, usage caps e cost alerts sem criar gasto escondido.
- Security mantém cost/rate abuse como guardrail quando usuários, agentes, automações ou APIs podem gerar custo fora de controle.
- O generator valida esse contrato com `validateSpendBudgetSourceOfTruthContract`.

Justificativa:

- Founders AI builders frequentemente perdem controle de custos de IA, infra, ferramentas e mídia paga antes de terem receita previsível.
- O framework precisa ajudar na decisão prática sem virar contabilidade, ERP ou aconselhamento financeiro.
- Um ledger leve com owner, motivo, categoria, custo, review date e automações candidatas reduz desperdício e cria clareza para runway.
- Conectar Finance a Marketing, Product Ops, Engineering, DevOps e Security evita custos escondidos no código, em providers, campanhas ou automações.

## 2026-06-30 - Security Hardening E AI App Security Como Gate De Produto

Decisão:

- Security continua sendo área de Operations, não um novo departamento.
- Pedidos diretos como "audite segurança", "tem vulnerabilidade?", "dados de cliente", "LGPD", "vazou token", "proteger API" e "hardening" devem rotear para Security.
- Se Security estiver inativo, o root `AGENT.md` deve retornar `activation_required: operations.security`.
- Criar workflow `operations/workflows/security-hardening-cycle.workflow.md` quando `operations.security` estiver ativo.
- O workflow exige apenas Security para preservar ativação progressiva, mas pode rotear follow-up para Product Ops, Engineering, DevOps, Growth ou Strategy quando necessário.
- AI app security passa a ser parte explícita de Security, cobrindo:
  - LLM input/output;
  - tool permissions;
  - RAG/vector DB;
  - customer data boundary;
  - prompt injection;
  - cost/rate abuse.
- Security ganha role `AI Security Engineer`, skill `ai-runtime-security-review`, playbook `ai-app-security-review` e knowledge `ai-app-security.md`.
- `feature-to-delivery-cycle`, Product Ops `ready-to-develop`, Engineering `review-criteria` e `ready-for-launch` devem tratar risco AI-native como Security readiness.
- Quando Security for aplicável em Ready for Launch, o gate exige `security_gate_passed`, risco conhecido aceito explicitamente ou `blocked_by_security`.

Justificativa:

- Produtos AI-first criam riscos que não aparecem em AppSec tradicional: prompt injection, tool use, RAG leakage, dados de cliente em embeddings/logs e abuso de custo/rate.
- Founders pedem segurança em linguagem natural; o framework precisa responder com rota clara, sem exigir que o usuário conheça departamentos.
- Manter tudo dentro de Operations/Security preserva o modelo progressivo e evita criar burocracia ou setor novo.
- O gate impede que uma release vá para usuários reais com Security aplicável mas sem evidência de revisão.

## 2026-06-30 - Runbook Versionado Para Publicar `npm create lean-os`

Decisão:

- Publicações futuras dos pacotes npm do LeanOS devem usar o script versionado:

```bash
npm run release:npm
```

- O script vive em `scripts/publish-npm-create-leanos.mjs`.
- O agente não deve reconstruir manualmente os comandos de publish a partir da memória.
- O usuário prepara autenticação npm localmente via `.npmrc` ou `NODE_AUTH_TOKEN`; o token nunca deve ser colado em chat ou commitado.
- Sempre que o usuário pedir para atualizar, publicar ou fazer release do pacote/framework/npm, o agente deve primeiro entregar este comando PowerShell, sem tentar OTP:

```powershell
$secureToken = Read-Host "Cole seu token npm granular" -AsSecureString
$token = [System.Net.NetworkCredential]::new("", $secureToken).Password
Set-Content -LiteralPath ".npmrc" -Value "//registry.npmjs.org/:_authToken=$token" -Encoding ASCII
Remove-Variable token, secureToken
npm whoami
```

- O script deve:
  - validar `npm whoami`;
  - impedir publish com working tree suja, exceto `.npmrc` local;
  - rodar `npm test`;
  - rodar `npx pnpm@10.12.1 -r build`;
  - rodar dry-run/pack dos pacotes;
  - publicar `lean-os` antes de `create-lean-os`;
  - verificar versões no registry;
  - validar que `create-lean-os` depende de `lean-os`;
  - remover `.npmrc` local ao final da tentativa.
- O root `AGENT.md` deve rotear pedidos como "atualizar o pacote", "publicar nova versão" ou "atualizar npm create lean-os" para esse runbook.
- Se um token for colado em chat, ele deve ser tratado como comprometido e o usuário deve revogá-lo.

Justificativa:

- O publish de `npm create lean-os` tem ordem e validações específicas; depender da memória do modelo aumenta risco operacional.
- Um runbook versionado reduz repetição manual, preserva segurança de token e evita publicar `create-lean-os` contra uma versão de `lean-os` ainda não disponível.
- A regra mantém o framework alinhado com a decisão anterior: `npm create lean-os` é o comando principal de setup, enquanto `lean-os` continua sendo o CLI operacional.

## 2026-06-30 - `npm create lean-os` Como Comando Principal De Setup

Decisão:

- O comando principal para criar um novo workspace LeanOS passa a ser:

```bash
npm create lean-os
```

- O pacote npm responsável por esse fluxo é `create-lean-os`.
- `create-lean-os` deve ser um wrapper fino que chama o mesmo wizard do pacote `lean-os`, sem duplicar lógica de scaffold.
- `npx lean-os ai` permanece como caminho de compatibilidade.
- `lean-os` continua sendo o pacote operacional para comandos depois que o workspace existe, como:
  - `lean-os activate <area>`;
  - `lean-os update [--dry-run]`.
- A publicação deve publicar `lean-os` antes de `create-lean-os`, porque o pacote create depende do CLI operacional.
- A validação do framework deve impedir regressão do pacote `create-lean-os`, do binário `create-lean-os` e da documentação do comando principal.

Justificativa:

- `npm create <name>` é o padrão mais reconhecível para scaffold inicial no ecossistema npm.
- Separar `create-lean-os` de `lean-os` clarifica a experiência:
  - create package para primeiro setup;
  - CLI operacional para manutenção do workspace.
- Manter `npx lean-os ai` evita quebrar usuários, docs ou scripts existentes.

## 2026-06-30 - Novo Repositório GitHub Exige `README-ready`

Decisão:

- DevOps/GitHub DevOps é dono de setup, bootstrap, Project, labels, token source, dry-run e limites de escrita remota do GitHub.
- DevOps não é dono da narrativa do produto.
- Antes de criar, publicar ou conectar um novo repositório GitHub, DevOps deve verificar `README-ready`.
- `README-ready` significa que o root `README.md` está product-first, confirmado e adequado para founder, colaborador novo e modelo que abre o repo.
- Se o README estiver ausente, fraco, genérico, em draft ou incerto, DevOps deve parar o bootstrap remoto e rotear para:
  - Strategy Product;
  - Product Narrative Editor;
  - `product-readme`.
- Em repositório existente, DevOps deve registrar se o README foi preservado e não deve sobrescrever comandos, badges, links, setup ou documentação técnica útil.
- O knowledge de GitHub deve registrar:
  - `Repository mode`;
  - `README status`;
  - `README source`;
  - regra de gate para novo repositório.
- A validação do generator deve impedir regressão desse gate em DevOps/GitHub DevOps.

Justificativa:

- Um repositório novo é frequentemente a primeira superfície pública ou colaborativa do produto; se o README sair fraco, o GitHub vira um espelho pobre do negócio.
- Strategy Product tem contexto e skill para escrever a narrativa correta; DevOps tem contexto para segurança operacional e GitHub.
- Separar ownership evita que DevOps invente proposta de valor ou transforme README em setup técnico sem contexto de produto.
- O gate cria uma ordem prática: narrativa de produto confirmada primeiro, publicação/configuração remota depois.

## 2026-06-30 - README Do Produto Via Strategy Product

Decisão:

- O `README.md` raiz gerado pelo scaffold deve ser product-first e founder-friendly.
- O início do README deve explicar produto/empresa, usuário, problema, proposta de valor, status, estrutura e foco atual antes de explicar o LeanOS.
- A seção LeanOS deve existir, mas ficar curta e no fim.
- Melhorias de README devem entrar pela Navigation Chain, sem adicionar regra específica no `AGENT.md` raiz:
  - Strategy Product;
  - role `Product Narrative Editor`;
  - skill `product-readme`;
  - template `.leanos/standard/templates/product/product-readme-template.md`.
- Em repositório existente, o modelo deve ler e preservar o README atual, manter instruções técnicas úteis e propor diff antes de escrever.
- A skill não pode inventar clientes, métricas, provas, features, stack ou comandos.
- A validação do generator deve cobrir o README raiz, a rota da Navigation Chain, a skill, a role e o template de README de produto.

Justificativa:

- Founders e colaboradores novos precisam entender o negócio/produto primeiro, não o framework.
- Modelos também se orientam melhor quando o README apresenta contexto de produto antes de regras operacionais.
- Colocar a instrução em Strategy Product preserva o root `AGENT.md` como roteador enxuto e evita duplicar política fora da Navigation Chain.
- Preservar README existente reduz risco de quebrar projetos que já rodam e já possuem comandos, badges, links, setup ou documentação técnica útil.

## 2026-06-30 - Sync GitHub Rico E Epic Como `epic.md`

Decisão:

- O artefato canônico de Epic local passa a ser `operations/product-ops/epics/<epic-slug>/epic.md`.
- `README.md` dentro da pasta de Epic é fallback legado e mapa de pasta; quando `epic.md` existir, ele vence.
- O sync de Epics/Features para GitHub não pode publicar apenas um resumo simples quando o markdown local contém conteúdo rico.
- O payload aprovado de sync deve preservar body rico, seções locais, milestone, labels, campos de GitHub Projects e relações Epic/Feature.
- Campos mínimos de Project para sync de produto: `Status`, `Priority`, `Size`, `Effort`, `Area`, `Roadmap Item` e `Epic`.
- Milestone local deve virar milestone real da issue quando definido; se faltar em item `sync_ready`, o sync deve bloquear ou reportar conflito em vez de inventar.
- Relações devem existir em camadas:
  - relação nativa parent/sub-issue quando a capability suportar;
  - campo `Epic` no GitHub Project;
  - links markdown no body das issues.
- Depois da escrita remota, a capability deve fazer read-back verification para confirmar body, milestone, labels, Project fields e relacionamentos.
- Somente depois da verificação remota passar, o LeanOS pode atualizar arquivos locais com:
  - `sync_status: synced`;
  - `github_issue.url`.
- `.github/leanos/sync-state.yaml` continua sendo índice remoto sem segredos, com IDs, URLs, Project item IDs, milestone IDs/URLs e status de verificação.

Justificativa:

- GitHub é espelho operacional e colaboração, não substituto da fonte local de Product Ops.
- Issues pobres fazem o founder e os modelos perderem critérios, riscos, tasks e decisões que já existiam localmente.
- `epic.md` reduz ambiguidade: README volta a ser mapa de pasta, enquanto Epic é um artefato de produto.
- Read-back verification evita marcar localmente `synced` quando o GitHub recebeu apenas um resumo, perdeu milestone, não entrou no Project ou perdeu relações.

## 2026-06-30 - Ready For Launch Como Workflow De Operations

Decisão:

- Criar `ready-for-launch` como workflow departamental de Operations.
- O workflow vive em `operations/workflows/ready-for-launch.workflow.md` quando `operations.product-ops`, `operations.engineering` e `operations.devops` estão ativos.
- Readiness de launch, go-live, beta ou exposição a usuários reais pertence a Operations antes de Growth.
- DevOps é a área primária do gate; Product Ops e Engineering são áreas obrigatórias de apoio.
- Design, Security, Growth Marketing, Growth Customer Experience e Strategy Product entram apenas como gates condicionais.
- O workflow deve produzir decisão explícita:
  - `ready_to_launch`;
  - `ready_with_known_risks`;
  - `blocked_by_product`;
  - `blocked_by_design`;
  - `blocked_by_security`;
  - `blocked_by_engineering`;
  - `blocked_by_devops`;
  - `blocked_by_growth`;
  - `not_ready_to_learn`.
- Growth continua dono de `mvp-launch` e `launch-learning-loop`, mas apenas depois do gate de readiness ou quando o lançamento já ocorreu.
- O root `AGENT.md` deve separar pedidos de readiness ("está pronto para lançar?") de pedidos de execução/aprendizado de Growth ("lançamento aprovado", "o que aprendemos?").
- O workflow não faz deploy, campanha, email, CRM, analytics, pagamento, GitHub write ou qualquer ação externa automaticamente.

Justificativa:

- "Pode lançar?" é uma decisão de prontidão operacional, não uma execução de marketing.
- Um lançamento para usuários reais depende de escopo, critérios, evidência de entrega, ambiente, rollback, observabilidade, riscos de produto e riscos técnicos.
- Colocar o gate em Operations preserva ownership de Product Ops, Engineering e DevOps sem impedir Growth de executar lançamento e aprendizado depois.
- A decisão explícita reduz ambiguidade para founders e modelos, deixando claro se o próximo passo é launch, risco aceito, desbloqueio ou retorno para delivery.

## 2026-06-30 - Layout Business OS E Comando De Update

Decisão:

- O scaffold passa a separar a operação do produto da infraestrutura do LeanOS:
  - `<product-slug>-os/` contém `strategy/`, `operations/` e `growth/`;
  - `.leanos/standard/` contém templates, checklists, instructions, examples e foundation do framework;
  - `.leanos/runtime/` contém `agent/`, `context/`, `index/`, `traces/` e `vscode/`.
- O setup progressivo continua criando Strategy como primeira superfície de negócio; Operations e Growth aparecem fisicamente quando ativados ou quando o modo avançado `all-at-once` é usado.
- `leanos.yaml` passa a registrar `paths.business_os`, `paths.runtime`, `paths.standard_library`, `paths.strategy`, `paths.operations` e `paths.growth`.
- A CLI passa a oferecer `lean-os update [--dry-run]` para migrar workspaces existentes para o layout atual.
- O update move paths legados somente quando o destino ainda não existe, reporta conflitos e preserva arquivos de produto existentes como missing-only.
- Modelos devem tratar pedidos como "atualizar LeanOS" ou "migrar LeanOS" como atualização de framework via `lean-os update`, não como reorganização manual de código de produto.

Justificativa:

- Founders precisam enxergar o sistema operacional do negócio como uma área própria e legível, sem misturar padrões internos do framework com operação do produto.
- `.leanos/` deve ser runtime/standard do LeanOS, não um lugar onde toda a empresa fica escondida.
- O novo layout é mais founder-friendly e também mais claro para modelos: negócio em `<product-slug>-os/`, padrões em `.leanos/standard/`, estado operacional do agente em `.leanos/runtime/`.
- O comando de update dá uma rota segura para evoluir workspaces existentes sem quebrar produto, código, knowledge ou arquivos que já rodam.

## 2026-06-30 - Wizard CLI Curto Com Ativação Progressiva Por Padrão

Decisão:

- Simplificar o wizard `lean-os ai` para perguntar apenas:
  - ideia/produto novo ou projeto existente;
  - nome do produto;
  - tipo de produto;
  - descrição curta;
  - modo de preparação do ambiente;
  - suporte inicial de GitHub.
- Remover do wizard curto as perguntas de usuário alvo, estágio inicial e modo de operação.
- Usar defaults internos para esses campos:
  - ideia/produto novo: `stage: idea`, `target_user: A definir com Strategy`, `mode: founder-plus-ai-agents`;
  - projeto existente: `stage: existing-product-with-users`, `target_user: Usuários atuais do produto`, `mode: founder-plus-ai-agents`.
- Substituir a seleção manual de áreas/departamentos por duas opções:
  - `progressive`: padrão recomendado, cria Strategy agora e deixa Operations/Growth disponíveis para ativação posterior;
  - `all-at-once`: opção avançada que prepara Strategy, Operations, Growth e todas as áreas desde o setup.
- Não reintroduzir multiselect de departamentos/áreas no wizard.
- Mostrar o wizard em português do Brasil.

Justificativa:

- O setup inicial estava longo e ainda refletia a mentalidade antiga de escolher departamentos manualmente.
- Business as a Product pede que a estrutura operacional apareça conforme a necessidade do negócio.
- A opção avançada preserva flexibilidade para power users, demos e testes, mas não muda o caminho recomendado.
- Remover perguntas prematuras reduz fricção e deixa Strategy calibrar usuário, estágio e operação com melhor contexto.

## 2026-06-29 - Padrões De Branch E PR Mais Completos

Decisão:

- Expandir a convenção de branches gerada pelo LeanOS para suportar:
  - `feature/<feature-slug>-<short-kebab-slug>` para Features locais;
  - `issue/<issue-number>-<short-kebab-slug>` para Features mapeadas para issue real;
  - `fix/<issue-number>-<short-kebab-slug>` para bugfix vinculado a issue real;
  - `chore/<short-kebab-slug>` para manutenção interna;
  - `docs/<short-kebab-slug>` para documentação;
  - `spike/<short-kebab-slug>` para investigação técnica aprovada.
- Manter `feature/...` e `issue/...` como caminhos preferenciais para delivery de produto, preservando a taxonomia Product-first.
- Adicionar ao template de PR:
  - título em estilo Conventional Commit quando fizer sentido;
  - status de prontidão `draft | founder-ready | blocked-by-tests | blocked-by-context`;
  - seção `Deploy / Rollback`;
  - headings humanos em PT-BR.
- Fazer Engineering exigir esses campos via `pull-request`, `branch-for-feature` e `prepare-pr`.
- Validar regressão desses padrões no generator.

Justificativa:

- O padrão anterior cobria bem delivery de Feature, mas era estreito para bugfixes, manutenção, documentação e spikes.
- Títulos compatíveis com Conventional Commit melhoram legibilidade, changelog e release notes sem impor automação prematura.
- Status de prontidão e `Deploy / Rollback` tornam PRs mais claros para founder, reviewer e agentes futuros.
- A mudança preserva a regra local-first/Product-first: GitHub continua sendo espelho/colaboração, não fonte primária automática.

## 2026-06-29 - Textos Humanos Gerados Em PT-BR

Decisão:

- Padronizar textos humanos gerados pelo LeanOS em português do Brasil.
- Aplicar PT-BR em READMEs, `AGENT.md`, runtime `.leanos/`, `ai-standard`, roles, skills, playbooks, workflows, knowledge, templates e exemplos.
- Manter em inglês IDs técnicos, slugs, paths, nomes de arquivos, chaves YAML/JSON, enums e termos técnicos estabilizados quando a interoperabilidade depender deles.
- Validar regressões de idioma no generator para evitar retorno de headings, frontmatter e frases operacionais em inglês.

Justificativa:

- A experiência do founder e dos modelos não deve alternar entre português e inglês sem necessidade.
- Slugs, paths e chaves técnicas precisam permanecer estáveis para evitar churn estrutural.
- Uma validação automática torna a decisão operacional e reduz regressão em novos assets.

## 2026-06-29 - Engineering Knowledge Como Contratos E Estado

Decisão:

- Manter os arquivos de knowledge de Engineering.
- Tratar `code-standards.md`, `implementation-rules.md`, `component-guidelines.md`, `data-guidelines.md`, `testing-strategy.md` e `review-criteria.md` como contratos duráveis do framework.
- Tratar `implementation-notes.md`, `code-review-notes.md` e `pr-log.md` como arquivos de estado, notas de Feature ou handoff de review/PR.
- Validar que os contratos duráveis de Engineering não sejam gerados com placeholders `TBD`.
- O `knowledge/README.md` de Engineering deve distinguir responsabilidades de contratos, notas e logs.

Justificativa:

- Engineering precisa de regras operacionais claras antes de escrever código.
- Arquivos de estado podem começar vazios ou com placeholders porque são preenchidos durante a execução de uma Feature.
- Separar contrato durável de estado evita transformar notas temporárias em política global do framework.
- A validação impede que padrões essenciais de implementação, dados, testes e review saiam rasos no scaffold gerado.

## 2026-06-26 - MVP Backlog Como Fonte Operacional Do MVP

Decisão:

- Remover `operations/workflows/define-mvp.workflow.md`.
- Remover `operations/product-ops/skills/define-mvp/SKILL.md`.
- Substituir o playbook `mvp-delivery` por `mvp-backlog-planning`.
- Criar `operations/product-ops/mvp/backlog.md` como fonte operacional dos itens do MVP.
- Renomear `roadmap-item-to-epic` para `delivery-item-to-epic`.
- Manter `delivery-item-to-epic` como playbook de Product Ops, não workflow.
- Manter `epic-to-features` como playbook de Product Ops, não workflow.
- Um item aprovado de MVP backlog, roadmap, backlog ou delivery scope deve virar Epic local antes de ser quebrado em Features.

Justificativa:

- Strategy Product define o MVP Validation Scope: hipótese, menor artefato de validação, sinais de sucesso, sinais de pivô e riscos.
- Product Ops não deve "definir MVP" de forma ampla; ele transforma uma decisão aprovada de Strategy em backlog operacional.
- O backlog do MVP evita forçar Roadmap no estágio `mvp_building`.
- `delivery-item-to-epic` descreve melhor o fluxo real, porque a origem do item pode ser MVP backlog, roadmap, backlog ou delivery scope.
- Criar Epic local e quebrar Epic em Features são procedimentos de Product Ops; eles não coordenam implementação de ponta a ponta.
- Workflow volta a fazer sentido em `feature-to-delivery-cycle`, quando Product Ops, Engineering e áreas condicionais passam a coordenar entrega.
- A ordem oficial fica: MVP Validation Scope aprovado -> MVP Backlog -> Epic -> Features -> Delivery.

## 2026-06-26 - Núcleo De Produto E Dono Do Modelo De Negócio

Decisão:

- Remover as skills soltas `define-product`, `define-icp` e `define-value-proposition` de Strategy Product.
- Criar `define-product-core` para consolidar produto, usuário primário, problema central, alternativa, promessa, diferenciação e hipótese mais arriscada.
- Remover `evaluate-idea` como skill solta e absorver a avaliação de fit, evidência, impacto de MVP e impacto de roadmap dentro do playbook `idea-calibration`.
- Manter `define-business-model` fora do fluxo principal de Product e mover essa skill para Strategy Business.
- Strategy Business passa a ser dona de `knowledge/business-model-canvas.md`.
- Strategy Product mantém `map-business-baseline`, `define-product-core`, `define-mvp-validation-scope` e `check-coherence`.

Justificativa:

- A descoberta de produto, ICP e proposta de valor acontece junta na conversa real com o founder.
- Separar essas capacidades em três skills criava mais roteamento do que clareza.
- Avaliar uma ideia depende do estágio atual do negócio e do contexto conversacional; por isso faz mais sentido dentro de `idea-calibration`.
- Modelo de negócio, receita, canais e custos são decisões de negócio, não fonte da verdade de Product.
- O fluxo principal fica menor: mapear baseline -> calibrar Product Core -> definir MVP Validation Scope quando o founder confirmar.

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

## 2026-06-26 - Business Stage Como Leitura Primária

Decisão:

- O LeanOS deve mapear o estágio real do negócio antes de qualquer rota.
- Os estágios canônicos são: `seed`, `strategy_forming`, `mvp_shaping`, `mvp_building`, `mvp_live_learning`, `product_operating` e `growth_scaling`.
- Toda ideia deve entrar por `idea-calibration`, que usa `map-business-baseline` para avaliar a ideia considerando o `business_stage` atual.

Justificativa:

- Uma nova ideia pode aparecer em qualquer estágio do negócio.
- Um produto em operação não deve tratar toda ideia nova como MVP.
- O founder não deve escolher estágios manualmente.
- Centralizar ideias em `idea-calibration` mantém o framework simples e evita duplicar workflow para uma conversa que pertence a Strategy Product.

## 2026-06-26 - Idea Calibration E MVP Validation Scope

Decisão:

- O fluxo inicial Strategy não usa workflow dedicado de intake.
- `business-intake.workflow.md` e `new-idea-intake.workflow.md` não fazem parte do scaffold.
- A skill `diagnose-founder-idea` passa a ser `map-business-baseline`.
- O playbook genérico `product-strategy` passa a ser `idea-calibration`.
- Strategy Product ganha o playbook `mvp-validation-scope`.
- Strategy Product calibra qualquer ideia com `idea-calibration`.
- Strategy Product define o MVP Validation Scope quando o founder confirma que quer analisar o menor caminho de validação.
- Product Ops transforma um MVP Validation Scope confirmado em Delivery Scope, Epic e Features quando o founder quiser delivery.

Justificativa:

- `diagnosis` soava pesado demais para a experiência inicial.
- `product-strategy` era genérico e confundia o papel de playbook, skill e workflow.
- `business-intake` e `new-idea-intake` duplicavam o papel de `idea-calibration` e aumentavam o risco de rotas concorrentes.
- `idea-calibration` descreve melhor a conversa guiada para chegar a uma Strategy Baseline confirmada ou a uma avaliação de fit em produtos mais maduros.
- Separar `mvp-validation-scope` evita que a ideia calibrada pule direto para Epic.
- A sequência fica mais natural para o founder: calibrar ideia -> analisar MVP de validação -> decidir se vira entrega.

## 2026-06-26 - Remover `idea-to-roadmap` E Roteamento Stage-Aware

Decisão:

- Remover `strategy/workflows/idea-to-roadmap.workflow.md` do framework.
- `idea-calibration` decide o próximo caminho pelo `business_stage`.
- `seed`, `strategy_forming` e `mvp_shaping` seguem para `mvp-validation-scope` quando a ideia já está calibrada.
- `mvp_building` e `mvp_live_learning` seguem para Product Ops quando a ideia afeta escopo, backlog ou entrega do MVP atual.
- `product_operating` e `growth_scaling` seguem para `roadmap-cycle-planning` quando há ciclo, backlog ou múltiplas prioridades para ordenar.
- `mvp-validation-scope` não atualiza Roadmap ou backlog; ele produz uma sequência de validação e uma recomendação de handoff.

Justificativa:

- Roadmap não deve ser uma etapa obrigatória entre MVP Validation Scope e delivery.
- Durante `mvp_building`, novas ideias precisam proteger ou ajustar o MVP em construção, não virar roadmap estratégico por padrão.
- Em produto operando, Roadmap volta a fazer sentido porque existe cadência, clientes, backlog, timing e múltiplas frentes para priorizar.
- O controle por estágio reduz a necessidade de manter regras frágeis em vários `AGENT.md` e evita rotas concorrentes.

## 2026-06-26 - Skills Como Pastas Com `SKILL.md`

Decisão:

- As skills geradas pelo LeanOS passam a viver em `skills/<skill-name>/SKILL.md`.
- Cada `SKILL.md` deve ter frontmatter YAML com `name` e `description`.
- A seção `## Process` deve usar headings `### Step N` em vez de lista numerada simples.

Justificativa:

- O formato fica mais próximo do padrão de skills usado pelo Superpowers.
- `SKILL.md` melhora descoberta, leitura e evolução futura das skills.
- Steps com headings permitem detalhar capacidades complexas sem transformar a skill em playbook.

## 2026-07-01 - Business Foundation Guiada No Start LeanOS

Decisão:

- A jornada "vamos começar" deve incluir Business Foundation mínima quando missão, princípios, modelo de receita, canal, entrega, limites de promessa ou colaboração founder/IA bloquearem a Strategy Baseline.
- Strategy Product continua detectando lacunas por `business-baseline`, mas lacunas de negócio são roteadas para `strategy/business/playbooks/business-foundation.playbook.md`.
- Business Foundation deve usar perguntas guiadas com opções, uma por vez, sem entrevista aberta como padrão.
- Respostas iniciais entram como `business_foundation_status: draft` e `confidence: founder-assumption` até existir evidência.

Justificativa:

- Founders precisam de orientação simples, não formulários livres difíceis de responder.
- Product não deve inventar missão, princípios ou modelo de negócio para conseguir avançar Product Core.
- Marcar hipóteses evita que o LeanOS trate crenças iniciais como fatos validados.

## 2026-07-01 - Branch Protection E Convite Pós-PR

Decisão:

- A capacidade de proteção de branch deve se chamar `branch-protection`, não `configure-branch-protection`.
- DevOps/GitHub DevOps é dono de branch protection, required status checks, review policy, bloqueio de force push e bloqueio de deleção da branch principal.
- Branch protection é obrigatória quando GitHub estiver ativo para delivery real, mas required checks só podem ser aplicados depois que PR Validation existir e rodar ao menos uma vez.
- Depois de criar um PR, o modelo deve responder: `Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?`
- Se o founder aceitar, a rota entra em `operations/engineering/playbooks/pr-validation.playbook.md` antes de qualquer recomendação de merge.

Justificativa:

- Skills devem usar nomes diretos de capacidade, não verbos de ação, para preservar a semântica do framework.
- Branch protection reduz risco operacional de push direto, merge sem validação, force push, branch deletion e PR sem checks.
- Required checks precisam existir no GitHub antes de virarem obrigatórios; caso contrário a automação pode travar o time com um check inexistente ou flaky.
- PR criado não significa PR validado; o convite pós-PR cria uma transição natural para review sem executar merge ou validação automaticamente.

## 2026-07-01 - GitHub Safety Baseline Para Repositórios Do Founder

Decisão:

- DevOps/GitHub DevOps ganha o playbook `github-safety-baseline` para preparar repositórios GitHub novos ou existentes antes de delivery real.
- A baseline cobre:
  - `Repository profile` público: description, website e topics;
  - workflow `.github/workflows/pr-validation.yml`;
  - template de PR, regras de branch e regras de PR validation;
  - labels/Project readiness quando houver sync;
  - `branch-protection` depois que PR Validation rodar ao menos uma vez.
- DevOps ganha a skill `repository-profile`, derivando description, website e topics somente de README product-first ou narrativa confirmada por Strategy Product.
- Repository profile existente não pode ser sobrescrito sem diff e confirmação explícita do founder.
- O PR Validation gerado deixa de ser placeholder e passa a ser adaptativo:
  - detecta `npm`, `pnpm` ou `yarn`;
  - instala dependências quando `package.json` existe;
  - roda lint, typecheck, test e build quando os scripts existem;
  - roda secret scan;
  - roda LeanOS structure check quando `leanos.yaml` existe.
- O contrato de capabilities GitHub passa a declarar:
  - `github.repositoryProfile`;
  - `github.prValidationWorkflow`;
  - `github.branchProtection`;
  - `github.createRelease`.
- Nenhuma capability de escrita remota pode aplicar profile, workflow, branch protection, tag ou GitHub Release sem dry-run/preview e confirmação explícita.
- Tags e GitHub Releases só podem ser criadas depois de `ready-for-launch` ou `release-operations` aprovado.
- O generator valida a baseline com contratos de DevOps, capability contract, workflow real de PR Validation e fixture `examples/client-workspace`.

Justificativa:

- Founder precisa de um GitHub pronto para operar produto, não apenas um repositório criado.
- Repository About fraco, PR Validation ausente e branch principal desprotegida criam risco operacional e passam má impressão para cliente, colaborador e agente.
- PR Validation deve se adaptar ao projeto em vez de exigir stack fixa ou falhar em repositórios sem Node.
- Branch protection só é segura depois que os checks existem no GitHub; aplicar antes pode travar a main por configuração fantasma.
- Release tag é ato de distribuição, não consequência automática de merge.

## 2026-07-01 - Root AGENT Enxuto Com Intent Map

Decisão:

- O root `AGENT.md` continua sendo o bootloader e guardião das linhas vermelhas do workspace.
- Casos detalhados de linguagem natural não devem ficar inline no root `AGENT.md`.
- O scaffold gera `.leanos/runtime/index/intent-map.yaml` como mapa estruturado de intenção natural.
- O root deve usar o intent map para classificar intenção, identificar departamento dono, áreas obrigatórias e `activation_required`.
- O root deve conferir `leanos.yaml` antes de qualquer rota e usar `.leanos/runtime/index/routing-map.yaml` para abrir somente o `AGENT.md` do departamento ativo.
- O intent map pode declarar pistas profundas de área, role, skill, playbook e workflow esperados, mas essas pistas não autorizam o root a carregar esses arquivos diretamente.
- Departamentos e áreas continuam donos de escolher role, skill, playbook, workflow e knowledge local.
- Novas intenções naturais duráveis devem entrar no intent map e em validações, não como listas longas dentro do root.

Justificativa:

- O root precisa barrar ações perigosas e preservar activation gates, mas não deve virar inventário frágil de casos.
- Um mapa YAML é mais fácil de validar, versionar e atualizar sem poluir a experiência do founder.
- Separar classificação de intenção e navegação real preserva a Nav Chain LeanOS: root -> departamento -> área -> role -> skill/playbook -> output.
- A mudança mantém força nas red lines e melhora escalabilidade de novas áreas, roles, skills e workflows.

## 2026-07-01 - Skill Quality Pass Para Áreas Críticas

Decisão:

- Skills críticas devem seguir o template completo gerado: frontmatter `name`/`description`, visão geral, use quando, contexto obrigatório, entradas, processo com `### Etapa N`, verificações, saída, arquivos para atualizar e linhas vermelhas.
- Security ganhou contratos mais fortes em `api-security-review`, `database-security-review` e `incident-response`, com decisão explícita, evidência revisada, stop conditions, contenção, rotação de secrets, comunicação e postmortem.
- Design ganhou skills em PT-BR com decisões estruturadas para research, fluxo, design system, componentes, tela, microcopy, acessibilidade e review.
- Growth/CX/Finance ganhou contratos mais objetivos em `positioning`, `customer-feedback-mapping` e `model-unit-economics`, evitando posicionamento genérico, feedback superestimado e falsa precisão financeira.
- Strategy Product `coherence` passa a usar Matriz de coerência com classificação por dimensão, critérios e evidência, sem aprovar implementação.
- O generator valida esse quality pass com `validateSkillQualityPass` para impedir regressão em estrutura, idioma e decisões críticas.

Justificativa:

- Skills são o ponto onde o modelo transforma contexto em ação; skills rasas geram resposta genérica, decisão sem evidência ou risco operacional.
- Security, dados, incidentes, pricing, feedback e Design handoff têm risco alto para founders e clientes.
- Uma skill deve ser uma capacidade reutilizável com critérios claros, não uma opinião solta do modelo nem um playbook disfarçado.

## 2026-07-01 - Implementation Packet Como Handoff Central De Feature

Decisão:

- Toda Feature em delivery normal deve passar por um Feature implementation packet em `operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md`.
- Product Ops é dono do packet e do gate de readiness.
- Design, Security, DevOps, Growth, Finance e Engineering escrevem artefatos Feature-scoped dentro do packet quando seus gates forem aplicáveis.
- Screen specs ficam em `operations/product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md`.
- Component specs Feature-scoped ficam em `operations/product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md`.
- `operations/design/knowledge/components/` fica reservado para specs duráveis/reutilizáveis que devem sobreviver a uma Feature específica.
- Component inventory diferencia `specified` de `implemented/available`; Design pode registrar a spec como `specified`, mas o componente só vira `implemented/available` depois de implementação, merge e post-merge update.
- Engineering deve ler o packet antes de branch/código; PR Validation deve comparar PR contra Feature + packet, incluindo screen specs e component specs quando existirem.
- `post-merge-continuation` deve propor atualização de component inventory quando um componente reutilizável foi entregue.

Justificativa:

- Founder não consegue lembrar todos os gates de Design/Security/DevOps/Engineering; o framework precisa forçar o caminho seguro.
- Centralizar artefatos da Feature reduz risco de Engineering implementar a partir de issue resumida, memória solta ou UI improvisada.
- Separar spec de disponibilidade evita tratar componente desenhado como componente já existente em código.

## 2026-07-01 - Framework Governance Interna

Decisão:

- O LeanOS passa a ter uma camada interna de Framework Governance em `docs/framework/governance/`.
- Essa camada não é gerada no workspace do founder e serve apenas para manutenção/evolução do framework.
- A governança opera em dois modos:
  - Checklist Antes De Commit/PR;
  - Auditoria Sob Demanda.
- O gate interno cobre:
  - `framework-change-review`;
  - `doctrine-alignment-review`;
  - `nav-chain-audit`;
  - `asset-quality-review`;
  - `department-handoff-review`;
  - `founder-experience-review`.
- Skills internas de governança usam nomes de capacidade/tema, não verbos: `framework-change`, `doctrine-alignment`, `nav-chain`, `framework-asset`, `department-handoff` e `founder-experience`.
- Playbooks internos de governança devem declarar quando são obrigatórios, matriz de avaliação, escala `blocker / high / medium / low`, cenários de pressão, racionalizações comuns e resultado obrigatório.
- Skills internas de governança devem declarar perguntas de auditoria, matriz de avaliação, sinais de alerta, racionalizações comuns e exemplo de saída com `Status` e `Severity`.
- O root `AGENT.md` deve apontar para `docs/framework/governance/` com uma regra curta, sem absorver critérios detalhados nem virar inventário.
- O generator passa a validar a existência e o contrato mínimo dessa governança para evitar regressão.

Justificativa:

- O framework precisa de critérios estáveis para avaliar se mudanças continuam seguindo Business as a Product, Strategy-first, Navigation Chain, source of truth local e founder-friendliness.
- Sem playbooks internos, cada modelo poderia inventar critérios diferentes ao revisar Nav Chain, skills, handoffs ou alinhamento doutrinário.
- A governança deve melhorar qualidade antes de commit/PR e também responder auditorias sob demanda, sem criar burocracia para o founder.
