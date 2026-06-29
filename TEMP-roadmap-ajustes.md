# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens relevantes forem implementados, validados e movidos para issues oficiais ou documentacao permanente.

Ultima limpeza: 2026-06-26.
Ultima priorizacao: 2026-06-29.

## Estado Atual

O LeanOS tem um MVP de framework local com:

- CLI `lean-os ai`.
- Scaffold inicial Strategy-first.
- `AGENT.md` raiz como ponto de entrada canonico do MVP.
- `leanos.yaml` com activation state progressivo.
- `.leanos/` como runtime leve: agent rules, context, indexes, traces e VS Code notes.
- `ai-standard/` como biblioteca de templates, checklists, instructions, examples e foundation.
- `strategy/` ativa no setup inicial.
- Operations e Growth disponiveis para ativacao progressiva, nao criadas no setup inicial.
- GitHub readiness local em `.github/leanos/`, sem token versionado e sem escrita remota automatica.

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
2. abre o workspace no agente;
3. diz "vamos comecar";
4. Chief le `leanos.yaml` e Strategy ativa;
5. Chief faz uma pergunta guiada por vez;
6. Strategy Baseline fica clara;
7. roadmap candidate e MVP scope aparecem no momento certo;
8. Operations/Product Ops so e ativado quando o founder entra em escopo de entrega.

Perguntas a resolver:

- O que o Chief pergunta primeiro?
- Quando o roadmap inicial nasce?
- Quando o MVP scope nasce?
- O que conta como Strategy Baseline suficiente?
- Qual e o menor caminho agradavel para o founder nao sentir burocracia?

### 4. Launch Readiness

Status: planejado.

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

### 5. `launch-learning-loop`

Status: planejado.

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

### 8. Release Publica Do MVP

Status: pendente.

Antes de publicar:

- rodar build;
- rodar validacao do generator;
- rodar smoke test local;
- rodar `npm publish --dry-run --access public`;
- publicar somente com confirmacao explicita.

## Pendencias Futuras Nao Bloqueantes

### Update/Migration

- [ ] Definir futuro `lean-os update`.
- [ ] Separar runtime atualizavel de contexto do cliente.
- [ ] Propor diff antes de aplicar.
- [ ] Preservar alteracoes do usuario.

### Bootstrap Product

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir defaults de stack.
- [ ] Garantir que Engineering nao cria produto digital antes de Epic/Feature/readiness.
- [ ] Preservar repositorios existentes.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados, validados ou movidos para issues oficiais.
