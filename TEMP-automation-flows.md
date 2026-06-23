# TEMP Automation Flows

Este arquivo e temporario. Ele lista os fluxos que o LeanOS deve automatizar no futuro e serve como mapa antes de detalhar cada fluxo em especificacoes proprias.

Quando os fluxos forem convertidos em workflows, comandos de chat, templates, skills e scripts/capabilities oficiais, este arquivo deve ser removido.

## Founder Journey Resumida

Esta e a jornada principal do founder no LeanOS, do primeiro setup ate uma issue implementada, validada e pronta para PR.

```text
npx lean-os ai
  -> /start-leanos
  -> Idea-to-roadmap
  -> Roadmap-sync-to-GitHub-Projects
  -> Epic-to-features
  -> Issue implementation
  -> Branch creation
  -> Code quality checks
  -> Model code review
  -> Pull request creation
  -> Founder merge
  -> Next issue
```

### 0. Setup Inicial Pelo CLI

Intencao inicial:

Criar ou instalar a camada operacional LeanOS no repositorio do founder.

Fluxo aplicado:

- `LeanOS install mode`

O que acontece:

- o CLI coleta contexto minimo;
- detecta se e produto novo ou repositorio existente;
- gera `AGENT.md`, `leanos.yaml`, `.leanos/`, `ai-standard/`, `strategy/`, `operations/`, `growth/` e GitHub/VScode support;
- preserva arquivos existentes por padrao;
- prepara GitHub management quando o founder pede;
- nao cria app code ainda.

Areas e roles:

- CLI executa o scaffold.
- LeanOS Chief ainda nao opera o negocio; ele fica preparado para iniciar no chat.

Resultado esperado:

- workspace versionavel criado;
- LeanOS Chief preparado;
- proximo passo claro: `/start-leanos`.

### 1. Primeira Sessao: `/start-leanos`

Intencao inicial:

Transformar o workspace vazio em uma primeira leitura operacional da empresa/produto, sem inventar fatos e sem modificar assets operacionais.

Fluxo aplicado:

- `Start LeanOS`
- base para `Idea-to-roadmap`

O que acontece:

- LeanOS Chief carrega `AGENT.md`, `leanos.yaml`, contexto e routing map;
- entrevista o founder apenas sobre o que falta;
- separa fatos, suposicoes, incertezas e decisoes;
- propoe atualizacoes em arquivos source-of-truth;
- pede confirmacao antes de escrever.

Areas e roles:

- `strategy/business/`
  - role: `business-strategist`
- `strategy/product/`
  - roles: `product-strategist`, `product-manager`
- `strategy/validation/`
  - role: `validation-researcher`
- `strategy/roadmap/`
  - role: `roadmap-planner`

Resultado esperado:

- business profile inicial;
- product brief inicial;
- problema, ICP, value proposition e hipoteses iniciais;
- proximo passo recomendado.

### 2. Idea-to-roadmap

Intencao inicial:

O founder discute uma ideia, feature ou direcao de produto com o modelo, e o LeanOS transforma isso em decisao rastreavel.

Fluxo aplicado:

- `Idea-to-roadmap`
- `strategy-validation-cycle`

O que acontece:

- o modelo avalia se a ideia fortalece ou contradiz strategy;
- identifica impacto em ICP, problema, MVP, validacao e roadmap;
- decide se a ideia deve ir para backlog, roadmap, experimento ou descarte;
- propoe atualizacoes antes de escrever.

Areas e roles:

- `strategy/product/`
  - `product-strategist`: coerencia entre usuario, problema, valor e posicionamento;
  - `product-manager`: transforma direcao em escopo operacional.
- `strategy/validation/`
  - `validation-researcher`: identifica hipoteses e evidencia necessaria.
- `strategy/roadmap/`
  - `roadmap-planner`: sequencia trabalho e define ciclo.
- `operations/product-ops/mvp/`
  - `product-owner`: traduz strategy em MVP scope e acceptance criteria.

Resultado esperado:

- decisao sobre a ideia;
- impacto em roadmap/backlog;
- hipoteses e criterios de validacao;
- MVP scope atualizado quando confirmado.

### 3. Roadmap-sync-to-GitHub-Projects

Intencao inicial:

Transformar roadmap local em estrutura executavel no GitHub: milestones, epics e project fields.

Fluxo aplicado:

- `Roadmap-sync-to-GitHub-Projects`

O que acontece:

- o modelo le roadmap, milestones, current cycle, backlog e MVP scope;
- valida GitHub settings sem pedir token em arquivo;
- gera plano/payload de sync;
- pede confirmacao;
- capability/script futuro executa a API.

Areas e roles:

- `strategy/roadmap/`
  - `roadmap-planner`: define prioridade, milestone e ciclo.
- `operations/product-ops/`
  - `product-owner`: garante MVP scope e acceptance criteria.
- `operations/devops/`
  - `github-devops`: guia configuracao GitHub Project, labels e sync state.
- `operations/engineering/`
  - `senior-developer`: valida viabilidade tecnica quando necessario.

Resultado esperado:

- epics GitHub-ready;
- milestones e project fields definidos;
- sync state sem segredos;
- nada remoto executado sem confirmacao.

### 4. Epic-to-features

Intencao inicial:

Quebrar um epic grande em Features pequenas, implementaveis e com criterios claros.

Fluxo aplicado:

- `Epic-to-features`
- matriz Product / Design / Engineering / Security

O que acontece:

- o modelo le o epic, roadmap item, milestone, MVP scope e acceptance criteria;
- aplica matriz de prontidao;
- cria Features com escopo, non-goals, criterios e riscos;
- inclui Design apenas quando ha UX, telas, estados, copy ou interacao;
- inclui Security apenas quando ha dados, auth, permissoes, privacidade, abuso ou compliance;
- pede confirmacao antes de criar issues via capability futura.

Areas e roles:

- `strategy/product/`
  - `product-manager`: valor, usuario, outcome e acceptance criteria.
- `operations/design/`
  - `ux-lead`: fluxo, telas, estados e acessibilidade quando aplicavel.
- `operations/security/`
  - `security-reviewer`: criterios de dados, auth, permissoes e risco quando aplicavel.
- `operations/engineering/`
  - `senior-developer`: viabilidade, dependencia tecnica, testes e tamanho.

Resultado esperado:

- Features GitHub-ready;
- labels, milestone e parent epic;
- criterios Product/Engineering sempre presentes;
- Design/Security presentes quando aplicavel;
- payload pronto para API apos confirmacao.

### 5. Issue Implementation

Intencao inicial:

O founder pede para implementar uma issue especifica, e o modelo transforma a issue em plano, branch, codigo, testes e PR.

Fluxo aplicado:

- `Issue implementation`
- `Branch creation`
- `Code quality and internal engineering checks`

O que acontece:

- modelo busca ou recebe a issue;
- resume objetivo, escopo, acceptance criteria e riscos;
- pede confirmacao antes de alterar codigo;
- cria ou propoe branch obrigatoria;
- implementa dentro do escopo;
- roda checks e testes disponiveis;
- prepara PR.

Areas e roles:

- `operations/engineering/`
  - `senior-developer`: implementa, cria branch, planeja testes e prepara PR.
- `operations/product-ops/`
  - `product-owner`: garante alinhamento com MVP e acceptance criteria.
- `operations/design/`
  - `ux-lead`: participa se a issue afetar UX.
- `operations/security/`
  - `security-reviewer`: participa se a issue tocar dados, auth, privacidade ou compliance.

Resultado esperado:

- branch `issue/<issue-number>-<short-slug>`;
- implementacao alinhada a issue;
- testes ou justificativa clara;
- resumo de arquivos alterados;
- PR draft.

### 6. Model Code Review E Pull Request

Intencao inicial:

Validar a implementacao antes do merge e abrir PR com contexto suficiente para revisao humana.

Fluxo aplicado:

- `Model code review`
- `Pull request creation`
- `PR validation`

O que acontece:

- modelo revisor le PR/diff, issue, epic, MVP scope e acceptance criteria;
- lista findings por severidade;
- valida Product, Engineering e testes;
- valida Design somente se UX mudou;
- valida Security somente se superficie sensivel existir;
- recomenda merge, changes ou blocked-by-context;
- PR segue template LeanOS.

Areas e roles:

- `operations/engineering/`
  - `pr-reviewer`: valida corretude, escopo, testes e coerencia.
- `operations/security/`
  - `security-reviewer`: participa quando ha risco de seguranca.
- `operations/design/`
  - `ux-lead`: participa quando ha impacto de experiencia.
- `operations/product-ops/`
  - `product-owner`: confirma MVP/acceptance criteria quando necessario.

Resultado esperado:

- PR descritivo;
- checklist LeanOS preenchido;
- riscos claros;
- recomendacao de review;
- founder decide merge manualmente no MVP.

### 7. Post-merge Continuation

Intencao inicial:

Depois do merge manual, continuar o ciclo sem perder contexto.

Fluxo aplicado:

- `Post-merge continuation`

O que acontece:

- founder informa que o merge foi concluido;
- modelo confirma status;
- registra learning ou decisao quando aplicavel;
- atualiza contexto/sync state quando capability existir;
- carrega a proxima issue;
- reinicia o fluxo de implementacao.

Areas e roles:

- `operations/engineering/`
  - `senior-developer`: prepara proxima implementacao.
- `strategy/validation/`
  - `validation-researcher`: registra aprendizado quando o merge gerar evidencia.
- `strategy/roadmap/`
  - `roadmap-planner`: reordena proximos passos se necessario.

Resultado esperado:

- ciclo continua para a proxima issue;
- contexto preservado;
- nenhuma conclusao ou aprendizado e inventado sem evidencia.

## Principio Geral

LeanOS deve transformar conversa em execucao rastreavel.

O modelo deve:

- discutir contexto com o founder;
- carregar os arquivos certos;
- aplicar roles, skills, playbooks e workflows;
- propor plano ou payload;
- pedir confirmacao quando houver escrita em arquivos, GitHub ou codigo.

O framework deve oferecer scripts/capabilities para:

- executar integracoes externas;
- chamar APIs;
- criar branches;
- criar issues;
- criar ou atualizar PRs;
- registrar estado quando necessario.

LeanOS deve ser chat-first. O founder nao deve precisar pensar em varios comandos de terminal para operar o sistema.

O LeanOS Chief continua sendo o dispatcher, mas modelos ativados como roles podem ter skills operacionais para guiar ou acionar capabilities do framework. Por exemplo, um modelo atuando como DevOps pode guiar a configuracao do GitHub Projects usando arquivos de settings pre-estruturados e scripts seguros.

O modelo nunca deve fingir que executou uma acao remota ou local se ela precisa de API, git ou filesystem. Ele deve acionar a capability correta quando disponivel, ou orientar o usuario claramente quando uma acao manual for necessaria.

## Principio de Interface

O fundador deve operar o LeanOS principalmente por conversa:

```text
configure meu GitHub
sincronize o roadmap
crie as Features do epic #654
implemente a issue #554
```

Comandos de chat como `/sync-roadmap` podem existir como atalhos, mas a implementacao real deve viver em workflows, skills e capabilities do framework. O usuario nao precisa conhecer o nome interno do script.

Quando uma acao exigir API, git, branch, issue, PR ou escrita em arquivo, o modelo deve:

1. carregar contexto;
2. explicar o que pretende fazer;
3. mostrar plano ou payload;
4. pedir confirmacao;
5. acionar a capability segura quando disponivel.

## Configuracao GitHub Base

O LeanOS deve gerar uma base de configuracao GitHub versionavel e sem segredos, para que uma role operacional, como DevOps, consiga guiar o founder.

Arquivos futuros esperados:

```text
.github/leanos/github-settings.example.json
.github/leanos/project-sync.yaml
.github/leanos/sync-state.yaml
.github/leanos/labels.yaml
.github/leanos/pr-validation-rules.md
```

Regras:

- nenhum token deve ser salvo no workspace;
- `github-settings.example.json` deve mostrar o formato esperado;
- `project-sync.yaml` pode guardar owner, repository, project number e field mapping;
- `sync-state.yaml` pode guardar IDs, issue numbers e status de sync sem segredos;
- o token deve vir de ambiente, prompt seguro, keychain ou integracao autorizada pelo usuario;
- a role DevOps deve validar a configuracao antes de qualquer sync.

## Mapa Dos Fluxos Principais

```text
0. LeanOS install mode
1. Idea-to-roadmap
2. Roadmap-sync-to-GitHub-Projects
2.1 Epic-to-features
3. Issue implementation
3.0 Branch creation
3.1 Code quality and internal engineering checks
3.2 Model code review
3.3 Pull request creation
4. Post-merge continuation
```

## 0. LeanOS Install Mode

Objetivo: tratar corretamente os dois cenarios de entrada do founder.

Modos:

- `new-product-workspace`: LeanOS cria o sistema operacional da empresa/produto antes de existir app code.
- `existing-product-repo`: LeanOS e instalado como camada operacional sobre um repositorio/produto existente.

Regras:

- produto novo nao cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json` no setup inicial;
- repo existente preserva codigo, package files, deploy config e workflows existentes;
- conflitos devem ter default conservador;
- Vercel fica em readiness/instrucoes ate existir app/framework definido;
- app code futuro deve nascer de um workflow especifico, como `/bootstrap product`.

## 1. Idea-to-roadmap

Objetivo: transformar novas ideias discutidas entre founder e modelo em estrategia, MVP e roadmap.

Entrada:

- ideia nova;
- contexto atual de business/product;
- validacao existente;
- MVP scope atual;
- roadmap atual;
- restricoes de negocio, tempo e tecnologia.

Areas envolvidas:

- `strategy/business/`
- `strategy/product/`
- `strategy/validation/`
- `strategy/roadmap/`
- `operations/product-ops/mvp/`

Resultado esperado:

- problema clarificado;
- ICP afetado;
- valor esperado;
- hipoteses e riscos;
- impacto em MVP ou roadmap;
- decisao: aceitar, descartar, validar antes ou colocar no backlog;
- atualizacao proposta para arquivos Strategy/MVP.

Comandos de chat futuros:

```text
/evaluate idea
/update roadmap
/check coherence
```

Workflows futuros:

- `.leanos/workflows/idea-to-roadmap.workflow.md`
- `strategy/workflows/strategy-validation-cycle.workflow.md`

Automacao futura via workflow/capability:

- atualizar roadmap Markdown apos confirmacao;
- gerar changelog de decisao;
- preparar epics candidatos para sync GitHub.

## 2. Roadmap-sync-to-GitHub-Projects

Objetivo: sincronizar roadmap definido em Markdown com GitHub Project, milestones e epic issues.

Entrada:

- roadmap;
- milestones;
- current cycle;
- backlog;
- MVP scope;
- GitHub config;
- project field mapping.

Areas envolvidas:

- `strategy/roadmap/`
- `operations/product-ops/mvp/`
- `operations/engineering/`
- `.github/leanos/`

Roles esperadas:

- Product define outcome e prioridade;
- Design antecipa criterios de experiencia quando o epic afeta UX;
- Security antecipa riscos e criterios quando ha dados, auth ou permissoes;
- Developer valida viabilidade tecnica e quebra futura.

Resultado esperado:

- GitHub milestones criados/atualizados;
- epic issues criadas/atualizadas;
- epics adicionadas ao GitHub Project;
- campos do project preenchidos;
- sync state atualizado sem segredos.

Comandos de chat futuros:

```text
/configure github
/sync roadmap
```

Capabilities futuras:

- conectar ou validar GitHub;
- ler settings locais do GitHub LeanOS;
- sincronizar roadmap com GitHub Projects;
- reportar status da conexao.

Nota: a interface primaria deve ser pelo chat. O founder pode dizer "configure o GitHub" ou "sincronize o roadmap", e o modelo com role adequada guia o fluxo e aciona a capability/script quando disponivel.

Spec temporaria:

- `TEMP-github-roadmap-flow.md`

## 2.1 Epic-to-features

Objetivo: quebrar um epic em Features prontas para implementacao.

Entrada:

- epic issue do GitHub;
- parent roadmap item;
- milestone;
- MVP scope;
- acceptance criteria;
- Product/Design/Security/Engineering context.

Areas envolvidas:

- `strategy/product/`
- `operations/product-ops/mvp/`
- `operations/design/`
- `operations/security/`
- `operations/engineering/`

Delivery Readiness Matrix obrigatoria:

- Product: valor, usuario, problema, outcome, acceptance criteria.
- Design: fluxo, telas, estados, UX, acessibilidade.
- Security: dados, auth, permissoes, privacidade, abuso, compliance.

Resultado esperado:

- Features propostas;
- criterios de aceite por feature;
- labels, milestone e project fields;
- dependencias;
- riscos;
- payload pronto para API;
- criacao via capability/script apos confirmacao.

Comando de chat futuro:

```text
/create issues
```

Capability futura:

- criar Features confirmadas para um epic;
- associar milestone/project;
- atualizar sync state.

## 3. Issue Implementation

Objetivo: implementar uma issue real do GitHub com rastreabilidade, branch obrigatoria, qualidade e PR.

Entrada:

- numero da issue;
- parent epic, se houver;
- Features relacionadas;
- MVP scope;
- acceptance criteria;
- codebase context.

Fluxo esperado quando usuario diz:

```text
implemente a issue #554
```

Passos:

1. Buscar issue #554 no GitHub.
2. Buscar parent epic e contexto relacionado.
3. Carregar `AGENT.md`, routing map e Engineering area.
4. Resumir no chat:
   - objetivo da issue;
   - escopo;
   - acceptance criteria;
   - riscos;
   - arquivos provaveis;
   - plano de implementacao;
   - plano de testes.
5. Pedir confirmacao do usuario antes de iniciar desenvolvimento.
6. Criar branch obrigatoria.
7. Implementar.
8. Rodar checks/testes.
9. Acionar code review por modelo.
10. Abrir PR.

Comandos de chat futuros:

```text
/implement issue
/plan issue
```

Capabilities futuras:

- buscar contexto da issue no GitHub;
- buscar parent epic, milestone e project fields;
- criar branch obrigatoria seguindo naming convention;
- validar codebase context antes de editar;
- abrir PR com template LeanOS;
- atualizar issue/project quando aplicavel.

## 3.0 Branch Creation

Objetivo: garantir que toda implementacao comece em branch correta e rastreavel.

Regra:

- nenhuma implementacao de issue deve acontecer direto na branch principal.
- branch deve ser criada antes de alterar codigo.
- nome da branch deve derivar da issue.

Convencao proposta:

```text
issue/<issue-number>-<short-slug>
```

Exemplos:

```text
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
```

Regras:

- usar numero real da issue;
- slug curto em kebab-case;
- limitar tamanho;
- nao incluir dados sensiveis;
- se a branch ja existir, perguntar se deve continuar nela.

## 3.1 Code Quality e Internal Engineering Checks

Objetivo: fazer o modelo seguir padroes internos antes de abrir PR.

Entradas:

- issue;
- codebase context;
- Engineering area;
- Security area quando aplicavel;
- DevOps area quando aplicavel.

Checks esperados:

- padrao de arquitetura;
- padrao de codigo;
- testes;
- seguranca;
- performance quando aplicavel;
- acessibilidade quando aplicavel;
- ausencia de escopo extra;
- alinhamento com acceptance criteria.

Outputs:

- resumo da implementacao;
- testes rodados;
- riscos restantes;
- arquivos alterados;
- decisao de prontidao para PR.

## 3.2 Model Code Review

Objetivo: um modelo revisor validar a implementacao antes do PR ou antes de solicitar review humano.

Entrada:

- diff local;
- issue;
- acceptance criteria;
- parent epic;
- MVP scope;
- diretrizes de engenharia;
- diretrizes de seguranca quando aplicavel.

Review deve avaliar:

- bugs;
- regressao;
- escopo extra;
- falta de teste;
- violacao de arquitetura;
- violacao de seguranca;
- divergencia com acceptance criteria;
- clareza do PR.

Output:

- findings por severidade;
- perguntas abertas;
- sugestoes;
- decisao: pronto para PR ou precisa ajuste.

## 3.3 Pull Request Creation

Objetivo: abrir PR com estrutura padrao e contexto suficiente para review.

Entrada:

- branch;
- issue;
- parent epic;
- resumo da implementacao;
- testes;
- riscos;
- checklist de aceite.

Template minimo de PR:

```md
## Summary

## Linked Issue

Closes #554

## Parent Epic

## What Changed

## Acceptance Criteria

## Tests

## Risks

## Screenshots or Notes

## LeanOS Review Checklist

- [ ] Issue context loaded
- [ ] Acceptance criteria addressed
- [ ] Tests run or explained
- [ ] Security/design criteria addressed when applicable
- [ ] No unrelated scope added
```

Capability futura:

- criar PR a partir da branch atual, issue carregada e template LeanOS;
- associar issue e parent epic;
- preencher descricao, checklist, testes e riscos;
- retornar link do PR e proximos passos.

## 4. Post-merge Continuation

Objetivo: continuar o ciclo apos o founder fazer merge manualmente.

Usuario pode dizer:

```text
mergeado. vamos para a proxima issue #598
```

Fluxo esperado:

1. Confirmar que PR anterior foi merged.
2. Atualizar contexto local se necessario.
3. Registrar learning ou decisao quando aplicavel.
4. Atualizar status da issue/project se API estiver configurada.
5. Buscar issue #598.
6. Resumir contexto.
7. Pedir confirmacao para iniciar novo ciclo de implementacao.

Regras:

- merge e decisao final continuam manuais no MVP.
- modelo nao deve assumir merge sem evidencia ou confirmacao.
- se houver conflito entre GitHub e contexto local, parar e pedir decisao.

## Sub-workflows Relacionados

Fluxos que provavelmente serao detalhados depois:

- security validation workflow;
- design readiness workflow;
- devops release readiness workflow;
- test planning workflow;
- production incident workflow;
- learning capture workflow;
- roadmap reprioritization workflow;
- PR validation workflow;
- workspace update/migration workflow.

## Ordem Recomendada de Detalhamento

1. `Idea-to-roadmap`
2. `Roadmap-sync-to-GitHub-Projects`
3. `Epic-to-features`
4. `Issue implementation`
5. `Branch creation`
6. `Model code review`
7. `PR creation`
8. `Post-merge continuation`

## Remocao

- [ ] Remover este arquivo quando os fluxos forem convertidos em specs, workflows, templates, comandos de chat, skills e capabilities oficiais.
