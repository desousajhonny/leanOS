# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens relevantes forem implementados, validados e movidos para issues oficiais ou documentacao permanente.

Ultima limpeza: 2026-06-26.

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
- [x] Root `AGENT.md` usa `Routing Narration` em vez de `Response Header` tecnico obrigatorio.
- [x] Preview `examples/client-workspace/` regenerado apos as mudancas estruturais relevantes.
- [x] `docs/framework/source-of-truth/` criado como base normativa do LeanOS.
- [x] Root `AGENT.md` aponta para a source of truth antes de decisoes de framework.
- [x] Skills migradas para pastas `skills/<skill-slug>/SKILL.md`.
- [x] Inventarios macro de skills, playbooks e workflows criados em `docs/framework/`.
- [x] Jornada inicial redesenhada como `business-intake -> idea-calibration -> mvp-validation-scope -> Product Ops handoff`.
- [x] Fluxo inicial validado com `npm test` e `git diff --check`.

## Pendencias Ativas

### 1. Validar Fluxo Inicial Com Founder

Status: proximo assunto de produto.

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

### 2. LeanOS Asset Contract v2

Status: planejado.

Objetivo: fortalecer roles, skills, playbooks e knowledge com frontmatter, gatilhos, gates, red flags, stop conditions e criterios de aceite.

Ordem recomendada:

1. Definir contrato v2 para skill, role, playbook e knowledge.
2. Atualizar templates/checklists/instructions.
3. Aplicar aos assets principais.
4. Atualizar `validate-generator.mjs`.
5. Regenerar preview.

### 3. Launch Readiness

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

### 4. `launch-learning-loop`

Status: planejado.

Objetivo: manter Growth enxuto, mas pronto para lancamento, feedback, learning loop e decisao de proximo ciclo.

### 5. Localizacao PT-BR

Status: planejado depois do Asset Contract v2.

Objetivo: traduzir textos humanos gerados em roles, skills, playbooks, workflows e knowledge na fonte do gerador.

Nao traduzir:

- nomes de pastas;
- nomes de arquivos;
- paths;
- chaves YAML/JSON;
- enums e IDs internos.

### 6. Teste Externo Da Founder Journey

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

### 7. Release Publica Do MVP

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
