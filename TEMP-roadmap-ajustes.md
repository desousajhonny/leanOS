# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens relevantes forem implementados, validados e movidos para issues oficiais ou documentacao permanente.

Ultima limpeza: 2026-06-30.
Ultima priorizacao: 2026-06-30.

## Estado Atual

O LeanOS tem um MVP de framework local com:

- CLI `lean-os ai`.
- CLI `lean-os activate <area>` para ativacao progressiva.
- CLI `lean-os update [--dry-run]` para migrar workspaces existentes para o layout atual.
- Scaffold inicial Strategy-first dentro de `<product-slug>-os/`.
- `AGENT.md` raiz como ponto de entrada canonico do MVP.
- `leanos.yaml` com activation state progressivo e `paths.*` para Business OS, runtime e standard library.
- `.leanos/runtime/` como runtime leve: agent rules, context, indexes, traces e VS Code notes.
- `.leanos/standard/` como biblioteca de templates, checklists, instructions, examples e foundation.
- `<product-slug>-os/strategy/` ativa no setup inicial.
- `<product-slug>-os/operations/` e `<product-slug>-os/growth/` disponiveis para ativacao progressiva, nao criadas no setup inicial.
- GitHub readiness local em `.github/leanos/`, sem token versionado e sem escrita remota automatica.
- Workflow `ready-for-launch` em Operations quando Product Ops, Engineering e DevOps estao ativos, separando readiness de launch da execucao/aprendizado de Growth.

## Decisoes Canonicas Atuais

- [x] A interface principal e linguagem natural no chat, nao slash command.
- [x] `.leanos/commands/` nao e gerado e nao deve ser reintroduzido como interface operacional.
- [x] O root `AGENT.md` roteia intencoes naturais por estagio, gate, area ativa e `activation_required`.
- [x] `AGENT.md` fica como nome canonico do MVP.
- [x] Nao migrar para `AGENTS.md` agora; isso geraria churn grande de paths sem melhorar o fluxo inicial.
- [x] Se a decisao `AGENTS.md` voltar no futuro, ela deve ser tratada como migracao propria, com compatibilidade e testes.
- [x] `strategy/validation` nao faz parte do MVP scaffold.
- [x] `strategy-validation-cycle` nao faz parte dos workflows atuais.
- [x] `roadmap-to-github-project` nao deve existir como workflow Strategy.
- [x] GitHub sync deve espelhar Epics/Features locais para GitHub Projects por DevOps/Product Ops, com readiness, dry-run, confirmacao e capability segura futura.
- [x] GitHub nunca vira fonte primaria automatica do LeanOS; local Product Ops continua sendo a fonte operacional primaria.
- [x] Business OS vive em `<product-slug>-os/`; runtime do agente vive em `.leanos/runtime/`; padroes do framework vivem em `.leanos/standard/`.
- [x] Atualizacao de workspaces existentes deve ser feita por `lean-os update`, com preview via `--dry-run`, conflitos explicitos e preservacao de arquivos de produto.
- [x] Readiness de launch, go-live, beta ou usuarios reais pertence a Operations via `ready-for-launch`; Growth executa `mvp-launch` e `launch-learning-loop` depois do gate ou depois de lancamento executado.

## Concluido Nesta Branch

- [x] Founder Progression Model com gates e `activation_required`.
- [x] Scaffold inicial Strategy-only.
- [x] Activation state no `leanos.yaml`.
- [x] Activation CLI/helper para areas progressivas.
- [x] MVP Validation Scope como fluxo enxuto de primeira versao.
- [x] Workflows principais de Operations fortalecidos para Epic -> Features -> Delivery.
- [x] Product Work Taxonomy: Roadmap, Delivery Scope, Epic, Feature e Task.
- [x] GitHub readiness/sync conceitual como camada chat-first.
- [x] `strategy/validation` removido do scaffold padrao.
- [x] `strategy-validation-cycle` removido.
- [x] `roadmap-to-github-project` removido.
- [x] `.leanos/commands/` removido do workspace gerado.
- [x] `ai-standard` deixou de gerar templates/checklists/instructions/examples de commands.
- [x] Root `AGENT.md` usa `Progression Intent Routing`.
- [x] Root `AGENT.md` usa `Routing Narration` em vez de `Response Header` técnico obrigatório.
- [x] Preview `examples/client-workspace/` regenerado apos as mudancas estruturais relevantes.
- [x] `docs/framework/source-of-truth/` criado como base normativa do LeanOS.
- [x] Root `AGENT.md` aponta para a source of truth antes de decisoes de framework.
- [x] Skills migradas para pastas `skills/<skill-slug>/SKILL.md`.
- [x] Inventarios macro de skills, playbooks e workflows criados em `docs/framework/`.
- [x] Jornada inicial consolidada em `idea-calibration -> mvp-validation-scope -> Product Ops handoff`.
- [x] Fluxo inicial validado com `npm test` e `git diff --check`.
- [x] Asset Contract v2 fortalecido em workflows, playbooks, skills e validacoes automaticas.
- [x] Product Ops, Engineering, DevOps, Security e Design tiveram skills rasas fortalecidas com contratos verificaveis.
- [x] Engineering knowledge separado entre contratos duraveis e arquivos de estado/log.
- [x] Validacao adicionada para impedir `TBD` nos contratos duraveis de Engineering.
- [x] Textos humanos gerados padronizados em PT-BR, mantendo IDs, slugs, paths, chaves YAML/JSON e termos tecnicos estaveis.
- [x] Validacao de idioma adicionada ao generator para prevenir regressao de headings, frontmatter e frases operacionais em ingles.
- [x] Padroes de branch e PR fortalecidos com formatos `feature`, `issue`, `fix`, `chore`, `docs`, `spike`, titulo de PR estilo Conventional Commit, status de prontidao e `Deploy / Rollback`.
- [x] Wizard CLI simplificado em PT-BR, com setup progressivo como default e opcao avancada `all-at-once` para preparar todas as areas.
- [x] Layout Business OS implementado no scaffold: `<product-slug>-os/` para Strategy/Operations/Growth, `.leanos/standard/` para padroes e `.leanos/runtime/` para contexto, indices, traces e integracoes locais.
- [x] `lean-os update [--dry-run]` implementado para migrar workspaces legados, mover paths antigos quando nao ha conflito, reportar conflitos e preservar arquivos de produto existentes.
- [x] `examples/client-workspace/` regenerado no novo layout e validado com `npm test` e `git diff --check`.
- [x] `ready-for-launch` implementado como workflow de Operations, com decisao explicita (`ready_to_launch`, `ready_with_known_risks`, bloqueios por area e `not_ready_to_learn`), roteamento raiz separado de Growth, jornada do founder documentada e validacao automatica de ativacao sequencial Product Ops -> Engineering -> DevOps.

## Pendencias Ativas

### 1. Padronizacao PT-BR Dos Assets Humanos Gerados

Status: concluido nesta branch; manter aqui apenas ate o roadmap temporario ser limpo ou movido para historico oficial.

Objetivo: garantir que todo texto humano gerado pelo framework esteja em portugues do Brasil, sem misturar portugues e ingles na experiencia do founder ou dos modelos.

Escopo:

- traduzir headings, instrucoes, descricoes, roles, skills, playbooks, workflows, knowledge, READMEs, runtime e ai-standard;
- manter em ingles apenas IDs tecnicos, slugs, paths, nomes de arquivo, chaves YAML/JSON e termos tecnicos estabilizados como `PR`, `Epic`, `Feature`, `Design`, `DevOps`, `GitHub`, `API`, `MVP` e `LeanOS`;
- adicionar validacao automatica para evitar regressao de headings, frontmatter e frases operacionais em ingles;
- regenerar o preview `examples/client-workspace/` depois das mudancas.

Resultado esperado:

- O workspace gerado fala com founder/modelos em PT-BR de forma consistente.
- Skills deixam de misturar `Use when`, `Purpose`, `Process`, `Red Lines` e conteudo em ingles com trechos em portugues.
- O generator passa a prevenir regressao de idioma.

Fatia concluida:

- Renderers, `ai-standard`, `.leanos`, GitHub docs, Strategy, Operations, Growth, skills, playbooks, workflows e knowledge foram padronizados para PT-BR no texto humano.
- `packages/cli/scripts/validation/language.mjs` foi adicionado ao fluxo `validate-generator.mjs`.
- `examples/client-workspace/` foi regenerado depois da padronizacao.
- Validado com `npm test` e `git diff --check`.

### 2. LeanOS Asset Contract v2

Status: concluido nesta branch; manter aqui apenas ate o roadmap temporario ser limpo ou movido para historico oficial.

Objetivo: fortalecer workflows, playbooks e skills para ficarem mais parecidos com o padrao operacional do Superpowers: gatilhos claros, hard gates, red flags, stop conditions, outputs verificaveis e validacao automatica.

Motivacao:

- `feature-to-delivery-cycle` deve continuar sendo workflow, mas precisa ficar mais explicito como coordenador de areas e gates.
- `delivery-item-to-epic` e `epic-to-features` devem continuar sendo playbooks de Product Ops, com limites mais fortes entre Epic, Feature, GitHub e codigo.
- Skills precisam parecer mais com `SKILL.md` de Superpowers: descricao baseada em gatilho, processo por etapas, red lines, checks e comportamento testavel.
- O framework deve conseguir validar seus proprios assets, evitando regressao de ordem, filesToUpdate, gates e stop conditions.

Fatia concluida:

1. Corrigido `feature-to-delivery-cycle`:
   - explicitar fases: Intake -> Product Ops readiness -> areas condicionais -> Engineering -> PR preparation -> PR validation -> founder handoff;
   - garantir `prepare-pr` antes de `pr-validation`;
   - deixar claro que o workflow coordena, mas quem executa codigo e `engineering-delivery`;
   - tornar `activation_required` explicito quando Design, Security ou DevOps forem necessarios mas estiverem inativos.
2. Corrigido `epic-to-features`:
   - incluir criacao/atualizacao de `../epics/<epic-slug>/<feature-slug>.md` em `filesToUpdate`;
   - pedir confirmacao antes de criar Feature files locais, nao apenas antes de escrita remota;
   - reforcar que nao cria GitHub issue, branch, codigo ou PR.
3. Fortalecido `delivery-item-to-epic`:
   - adicionar lei operacional: este playbook cria Epic local, nao Feature, GitHub issue, branch, codigo ou PR;
   - deixar output esperado mais verificavel.
4. Expandidas skills rasas de Product Ops:
   - `write-acceptance-criteria`;
   - `check-delivery-coherence`;
   - `define-delivery-boundaries`.
5. Fortalecido Engineering:
   - `write-tests` com red flags semelhantes a TDD;
   - `create-pr` exigindo Founder Testing Guide;
   - `review-pr` com findings por severidade e evidencia antes de merge recommendation.
6. Adicionadas validacoes automaticas:
   - workflow com `confirmationGates`, `stopConditions` e `expectedOutput`;
   - playbooks importantes com `useWhen`, `gates`, `outputs`, `filesToUpdate` e `stopConditions`;
   - skills com frontmatter, description `Use when...`, steps, checks e red lines;
   - ordem `prepare-pr` antes de `pr-validation`;
   - `epic-to-features.filesToUpdate` contendo Feature file local.

7. Fortalecidas skills de DevOps, Security e Design com contratos ricos, outputs verificaveis e red lines.
8. Fortalecido Engineering knowledge com contratos duraveis para standards, implementacao, componentes, dados, testes e review.

Resultado esperado:

- O fluxo de Feature ate PR fica coerente, verificavel e menos dependente de memoria do agente.
- Playbooks deixam de ser apenas instrucoes e viram contratos de execucao.
- Skills ficam descobriveis e disciplinadas como Superpowers.
- O generator passa a prevenir regressao nesses contratos.

### 3. Validar Fluxo Inicial Com Founder

Status: importante, mas fica depois da primeira fatia do Asset Contract v2.

Base obrigatoria:

- `docs/framework/source-of-truth/leanos-doctrine.md`
- `docs/framework/source-of-truth/operating-model.md`
- `docs/framework/source-of-truth/decision-rules.md`

Objetivo: revisar a jornada real de um founder novo:

1. cria workspace com `lean-os ai`;
2. escolhe setup progressivo recomendado ou avancado `all-at-once`;
3. abre o workspace no agente;
4. diz "vamos comecar";
5. Chief le `leanos.yaml` e Strategy ativa no modo progressivo;
6. Chief faz uma pergunta guiada por vez;
7. Strategy Baseline fica clara;
8. roadmap candidate e MVP scope aparecem no momento certo;
9. Operations/Product Ops so e ativado quando o founder entra em escopo de entrega, exceto quando o founder escolheu explicitamente o modo avancado.

Perguntas a resolver:

- O que o Chief pergunta primeiro?
- Quando o roadmap inicial nasce?
- Quando o MVP scope nasce?
- O que conta como Strategy Baseline suficiente?
- Qual e o menor caminho agradavel para o founder nao sentir burocracia?

### 4. Launch Readiness

Status: concluido nesta branch; manter aqui apenas ate o roadmap temporario ser limpo ou movido para historico oficial.

Objetivo: criar `ready-for-launch` para decidir se uma release/produto esta pronto para usuarios reais.

Deve cobrir:

- negocio;
- usabilidade;
- acessibilidade;
- seguranca;
- privacidade;
- DevOps;
- observabilidade;
- rollback;
- suporte;
- go-to-market;
- aprendizado pos-lancamento.

Fatia concluida:

- `operations/workflows/ready-for-launch.workflow.md` passa a existir quando Product Ops, Engineering e DevOps estao ativos.
- Root `AGENT.md` separa readiness de launch/go-live/beta/usuarios reais de execucao de launch, aquisicao, onboarding e learning loop de Growth.
- O workflow exige Product Ops, Engineering e DevOps como areas obrigatorias, com DevOps como owner primario do gate.
- Design, Security, Growth Marketing, Growth Customer Experience e Strategy Product entram como gates condicionais.
- O output do workflow inclui decisoes explicitas: `ready_to_launch`, `ready_with_known_risks`, `blocked_by_product`, `blocked_by_design`, `blocked_by_security`, `blocked_by_engineering`, `blocked_by_devops`, `blocked_by_growth` e `not_ready_to_learn`.
- `docs/framework/founder-journeys/ready-for-launch.md` documenta a jornada founder-facing.
- `packages/cli/scripts/validation/founder-journey.mjs` valida a jornada e a ativacao sequencial ate DevOps.
- Validado com `npm test`.

### 5. `launch-learning-loop`

Status: planejado; agora explicitamente depois de `ready-for-launch` ou depois de um lancamento ja executado.

Objetivo: manter Growth enxuto, mas pronto para lancamento, feedback, learning loop e decisao de proximo ciclo.

### 6. Localizacao PT-BR

Status: concluido como parte da prioridade 1 deste roadmap.

Objetivo: traduzir textos humanos gerados em roles, skills, playbooks, workflows e knowledge na fonte do gerador.

Nao traduzir:

- nomes de pastas;
- nomes de arquivos;
- paths;
- chaves YAML/JSON;
- enums e IDs internos.

### 7. Teste Externo Da Founder Journey

Status: importante antes de release.

Cenario minimo:

- gerar workspace novo;
- confirmar Strategy-only;
- iniciar por linguagem natural;
- completar Strategy Baseline;
- definir MVP;
- ativar Product Ops;
- criar Epic e Features;
- simular implementacao/review;
- retomar em nova sessao sem perder contexto.

Fatia concluida em 2026-06-29:

- Jornada `Review e PR` documentada em `docs/framework/founder-journeys/review-pr.md`.
- `docs/framework/founder-journeys/journey-map.md` marcou a etapa 7 como concluida via `operations/engineering/playbooks/pr-validation.playbook.md`, sem criar workflow novo.
- `packages/cli/scripts/validation/founder-journey.mjs` valida a documentacao da jornada e uma ativacao sequencial Strategy-only -> Product Ops -> Engineering para garantir rota de PR/review sem pular Product Ops.

### 8. Release Publica Do MVP

Status: pendente.

Antes de publicar:

- rodar build;
- rodar validacao do generator;
- rodar smoke test local;
- rodar `npm publish --dry-run --access public`;
- publicar somente com confirmacao explicita.

## Pendencias Futuras Nao Bloqueantes

### Bootstrap Product

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir defaults de stack.
- [ ] Garantir que Engineering nao cria produto digital antes de Epic/Feature/readiness.
- [ ] Preservar repositorios existentes.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados, validados ou movidos para issues oficiais.
