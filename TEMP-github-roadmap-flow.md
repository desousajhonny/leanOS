# TEMP GitHub Roadmap Flow

Este arquivo e temporario. Ele documenta o fluxo Roadmap -> GitHub Project -> Epic -> Sub-issues -> Implementation antes da implementacao definitiva em comandos de chat, workflows, templates, skills e capabilities/scripts.

Quando esse fluxo for incorporado ao LeanOS, este arquivo deve ser removido ou convertido em documentacao oficial.

## Visao Geral

O LeanOS deve transformar estrategia e roadmap em execucao rastreavel no GitHub.

A cadeia operacional desejada e:

```text
Strategy -> MVP Scope -> Roadmap -> GitHub Project Sync -> Epic Issues -> 3D Issue Matrix -> Sub-issues -> Implementation Workflow
```

O objetivo nao e apenas gerar issues. O objetivo e garantir que cada issue criada tenha origem clara em estrategia, MVP, roadmap, validacao e criterios cross-area.

## Regra Central

O LeanOS Chief nao chama a GitHub API diretamente.

O modelo deve:

- ler contexto;
- identificar gaps;
- propor plano;
- gerar drafts ou payloads;
- pedir confirmacao explicita;
- explicar riscos e dependencias.

Roles operacionais, como DevOps, Engineering, Product ou Security, podem guiar o founder e acionar capabilities/scripts seguros do framework quando disponiveis.

A capability/script deve:

- autenticar;
- chamar GitHub API;
- criar ou atualizar projects, milestones, issues e sub-issues;
- registrar sync state sem segredos;
- reportar sucesso, falha ou conflito.

Tokens nunca devem ser salvos no workspace.

## Fontes de Verdade Antes do GitHub

Antes de sincronizar com GitHub, o LeanOS Chief deve confirmar que existem fontes minimas:

- `strategy/product/brief.md`
- `strategy/product/problem.md`
- `strategy/product/icp.md`
- `strategy/product/value-proposition.md`
- `strategy/validation/assumptions.md`
- `strategy/validation/success-metrics.md`
- `operations/core/mvp/scope.md`
- `operations/core/mvp/non-goals.md`
- `operations/core/mvp/acceptance-criteria.md`
- `strategy/roadmap/roadmap.md`
- `strategy/roadmap/current-cycle.md`
- `strategy/roadmap/milestones.md`
- `strategy/roadmap/backlog.md`

Se esses arquivos estiverem vazios ou incoerentes, o agente deve recomendar voltar para `/start-leanos`, `/define mvp`, `/check coherence` ou `/create roadmap` antes de sincronizar GitHub.

## Fase 1: Strategy e MVP

O usuario define:

- company context;
- product strategy;
- validation assumptions;
- MVP scope;
- non-goals;
- acceptance criteria;
- roadmap;
- milestones;
- current cycle.

Resultado esperado:

- roadmap claro o suficiente para virar epics;
- MVP claro o suficiente para limitar escopo;
- acceptance criteria claros o suficiente para avaliar issues;
- validacao clara o suficiente para evitar construir coisa sem aprendizado esperado.

## Fase 2: GitHub Connect

Fluxo de chat futuro:

```text
configure meu GitHub
/configure github
```

Responsabilidade:

- conectar LeanOS a um owner/org;
- selecionar repository;
- selecionar ou criar GitHub Project v2;
- mapear campos do project;
- configurar labels LeanOS;
- validar acesso a milestones, issues, projects e sub-issues;
- salvar configuracao sem segredos.

Role principal:

- DevOps guia o founder na configuracao.
- Product pode validar project fields relacionados a roadmap.
- Engineering pode validar repository e branch strategy.

Arquivos base esperados:

```text
.github/leanos/github-settings.example.json
.github/leanos/project-sync.yaml
.github/leanos/sync-state.yaml
.github/leanos/labels.yaml
.github/leanos/pr-validation-rules.md
```

Regras:

- `github-settings.example.json` mostra o formato, mas nao guarda token;
- `project-sync.yaml` guarda owner, repo, project number, field mapping e labels;
- `sync-state.yaml` guarda IDs e numeros gerados pelo sync, sem segredos;
- o token vem de ambiente, prompt seguro, keychain ou integracao autorizada;
- se a capability ainda nao existir, o modelo deve orientar o founder passo a passo sem fingir execucao.

Configuracao esperada:

```yaml
github:
  status: configured
  owner: example-org
  repository: example-repo
  project:
    type: organization
    number: 12
    url: https://github.com/orgs/example-org/projects/12
  fields:
    status: Status
    priority: Priority
    size: Size
    area: Area
    roadmap_item: Roadmap Item
    epic: Epic
  labels:
    - leanos
    - epic
    - sub-issue
    - product
    - design
    - security
```

O token deve vir de ambiente:

```text
GITHUB_TOKEN
LEANOS_GITHUB_TOKEN
```

O workspace pode salvar owner, repo, project number e field mapping. Nao pode salvar token.

## Fase 3: Roadmap Sync

Comando de chat futuro:

```text
sincronize o roadmap
/sync-roadmap
```

Entrada:

- roadmap Markdown;
- milestones Markdown;
- backlog Markdown;
- MVP scope;
- acceptance criteria;
- GitHub config.

Responsabilidade:

- ler roadmap definido no workspace;
- detectar epics planejados;
- criar ou atualizar milestones no repositorio;
- criar ou atualizar epic issues;
- adicionar epic issues ao GitHub Project;
- preencher campos do project;
- registrar IDs e numeros em sync state sem segredos.

Como deve funcionar:

1. o modelo carrega roadmap, MVP scope, milestones e GitHub config;
2. o modelo mostra o plano de sync e os itens que seriam criados/atualizados;
3. o usuario confirma;
4. a capability/script executa o sync;
5. o modelo resume resultado, conflitos e proximos passos.

Sync state esperado:

```yaml
roadmap_sync:
  last_synced_at: "TBD"
  repository: example-org/example-repo
  project_number: 12
  milestones:
    mvp-validation-cycle-1:
      github_number: 1
      title: MVP Validation Cycle 1
  epics:
    onboarding-flow:
      issue_number: 654
      milestone: mvp-validation-cycle-1
      project_item_id: TBD
```

O sync deve ser idempotente: rodar duas vezes nao deve criar duplicatas.

## Fase 4: Epic Issue

Cada epic do roadmap vira uma GitHub issue maior.

Epic issue deve representar um bloco de outcome, nao uma tarefa pequena.

Template minimo de epic:

```md
# Epic: <title>

## Outcome

What business, user or validation outcome this epic should create.

## Strategic Context

- Product:
- ICP:
- Problem:
- Value proposition:
- Validation assumption:

## MVP Linkage

- MVP scope:
- Non-goals:
- Acceptance criteria:
- Roadmap item:
- Milestone:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Product Criteria

- User value:
- Jobs to be done:
- Acceptance criteria:
- Metrics or learning signal:

## Design Criteria

- User flow:
- Screens or states:
- UX constraints:
- Accessibility considerations:

## Security Criteria

- Data involved:
- Auth or permissions:
- Privacy considerations:
- Abuse cases:
- Compliance constraints:

## Dependencies

- Technical:
- Product:
- Design:
- Security:

## Sub-issue Breakdown

- Status: not_started
- Expected sub-issues:
- Open questions:
```

## Fase 5: Sub-issue Creation

Usuario pede no chat:

```text
crie as sub-issues do epic #654
```

LeanOS Chief deve carregar:

- epic #654;
- `strategy/roadmap/roadmap.md`;
- `strategy/roadmap/current-cycle.md`;
- `operations/core/mvp/scope.md`;
- `operations/core/mvp/non-goals.md`;
- `operations/core/mvp/acceptance-criteria.md`;
- `.leanos/index/routing-map.yaml`;
- `strategy/product/README.md`;
- `operations/design/README.md`, se ativo;
- `operations/security/README.md`, se ativo;
- `operations/engineering/README.md`, se ativo.

Se Design, Security ou Engineering nao estiverem ativos, o agente deve avisar e pedir confirmacao antes de criar uma decomposicao incompleta.

## Matriz 3D da Issue

Toda sub-issue gerada a partir de epic deve passar por uma matriz 3D:

### Product

Perguntas:

- Qual usuario recebe valor?
- Qual problema ou job esta sendo resolvido?
- Qual outcome da epic esta sendo destravado?
- Qual acceptance criteria prova que isso ficou pronto?
- Qual learning ou metrica sera afetada?

Output Product:

- user value;
- problem statement;
- acceptance criteria;
- success signal;
- scope boundary.

### Design

Perguntas:

- Existe fluxo de usuario?
- Existem telas, estados ou microcopy?
- Existem empty states, loading states ou error states?
- Existem criterios de acessibilidade?
- Existe risco de UX ambigua?

Output Design:

- flow notes;
- screen/state requirements;
- UX constraints;
- accessibility notes;
- design dependencies.

### Security

Perguntas:

- Quais dados entram, saem ou sao armazenados?
- Existe autenticacao ou autorizacao?
- Existe risco de permissao incorreta?
- Existe dado sensivel?
- Existe abuso plausivel?

Output Security:

- data classification;
- auth/permission criteria;
- privacy notes;
- abuse cases;
- security acceptance criteria.

## Sub-issue Template

Template minimo de sub-issue:

```md
# <sub-issue title>

## Parent Epic

- Epic: #654
- Milestone:
- Roadmap item:

## Purpose

Why this issue exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Product Criteria

- User value:
- Acceptance criteria:
- Success signal:

## Design Criteria

- Flow:
- States:
- UX constraints:
- Accessibility:

## Security Criteria

- Data:
- Permissions:
- Privacy:
- Abuse cases:

## Technical Notes

- Suggested area:
- Dependencies:
- Risks:

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied or explicitly not applicable
- [ ] Security criteria satisfied or explicitly not applicable
- [ ] Tests or validation plan defined
- [ ] Parent epic updated if needed
```

## Fase 6: Criacao via API

Depois que o usuario confirma as sub-issues propostas, a capability/script deve:

1. criar cada issue;
2. associar milestone;
3. adicionar labels;
4. adicionar ao GitHub Project;
5. preencher campos do project;
6. ligar como sub-issue da epic pai;
7. atualizar sync state;
8. responder com resumo e links.

Comando de chat futuro:

```text
crie as sub-issues do epic #654
/create subissues
```

O agente gera o plano, pede confirmacao e aciona a capability segura quando ela estiver disponivel. Se a capability ainda nao existir, ele entrega o payload/draft e explica o que falta sem fingir que criou as issues.

## Fase 7: Implementation Handoff

Depois das sub-issues criadas, o usuario pode pedir:

```text
implemente a issue #554
```

Esse pedido deve entrar em outro workflow:

```text
Issue -> Engineering Context -> Implementation Plan -> Code -> Tests -> PR
```

Esse workflow sera definido separadamente. Ele deve carregar:

- issue #554;
- parent epic;
- MVP scope;
- acceptance criteria;
- Engineering area;
- relevant role, skills and playbook;
- codebase context.

## Workflows Futuros

Adicionar ou fortalecer:

- `.leanos/workflows/roadmap-to-github-project.workflow.md`
- `.leanos/workflows/epic-to-subissues.workflow.md`
- `.leanos/workflows/issue-to-implementation.workflow.md`

Esses workflows devem ser cross-area e apontar para areas especificas:

- Strategy Roadmap;
- Operations Core;
- Operations Design;
- Operations Security;
- Operations Engineering;
- GitHub runtime/config.

## Templates Futuros

Adicionar:

- `ai-standard/templates/github/github-epic-template.md`
- `ai-standard/templates/github/github-subissue-template.md`
- `ai-standard/templates/github/issue-readiness-matrix-template.md`

Esses templates devem ser usados pelo modelo antes de qualquer chamada API.

## Config e Estado GitHub

Arquivos possiveis:

- `.github/leanos/github-settings.example.json`
- `.github/leanos/project-sync.yaml`
- `.github/leanos/sync-state.yaml`
- `.github/leanos/labels.yaml`
- `.github/leanos/pr-validation-rules.md`

Regras:

- config pode conter owner, repo, project number, labels e field mapping;
- state pode conter issue numbers, project item IDs e milestone IDs;
- nenhum arquivo pode conter token;
- se houver conflito entre Markdown local e GitHub, a capability/script deve parar e pedir confirmacao.

## Capabilities Futuras Do Framework

Essas capabilities podem ser implementadas por scripts internos, MCP, extension ou outra camada tecnica. Elas nao precisam ser expostas ao founder como comandos de terminal no MVP.

Capabilities esperadas:

- `github.configure`: valida owner, repo, project, fields, labels e token source.
- `github.status`: mostra conexao, repo, project, fields e ultimo sync.
- `github.syncRoadmap`: sincroniza roadmap Markdown para milestones e epics.
- `github.createSubissues`: cria sub-issues confirmadas para um epic.
- `github.issueContext`: carrega issue, parent epic, milestone e project fields.

## Comandos Futuros de Chat

```text
/configure github
/sync roadmap
/sync-roadmap
/create subissues
/plan issue
/implement issue
```

O chat command deve carregar contexto, gerar plano, pedir confirmacao e acionar a capability segura quando disponivel.

## Direcao GitHub API

Usar GitHub REST API oficial como padrao inicial:

- Projects v2 REST endpoints para project, fields, items e field values.
- Issues REST endpoints para criar/atualizar issues.
- Milestones REST endpoints para criar/atualizar milestones.
- Sub-issues REST endpoints para relacionar sub-issues ao epic pai.

Referencias oficiais:

- https://docs.github.com/rest/projects
- https://docs.github.com/en/rest/projects/items
- https://docs.github.com/rest/issues
- https://docs.github.com/v3/issues/milestones
- https://docs.github.com/en/rest/issues/sub-issues

GraphQL fica como fallback se algum campo de Projects v2 nao for coberto de forma suficiente pelo REST API.

## Regras de Seguranca

- Nunca salvar token no workspace.
- Nunca chamar API sem confirmacao explicita do usuario.
- Sempre oferecer dry-run antes de escrita remota.
- Sempre mostrar quantos milestones, epics e sub-issues serao criados ou atualizados.
- Sempre detectar duplicatas por stable key antes de criar.
- Sempre registrar sync state sem segredos.
- Nunca deixar o modelo inventar GitHub IDs, issue numbers ou project item IDs.
- Se a API falhar parcialmente, reportar o que foi criado e o que ficou pendente.

## Acceptance Criteria Do Fluxo

Este fluxo estara pronto para implementacao quando houver decisao sobre:

- formato do roadmap Markdown;
- formato de stable keys para epics;
- campos minimos do GitHub Project;
- labels padrao;
- milestone naming;
- template de epic;
- template de sub-issue;
- formato de sync state;
- comandos de chat;
- capabilities/scripts necessarios;
- estrategia de dry-run;
- politica de conflito local vs remoto.

## Testes Futuros

Quando implementar:

- teste de parse de roadmap Markdown;
- teste de geracao de epic payload;
- teste de geracao de sub-issue payload;
- teste de matriz Product/Design/Security;
- teste de dry-run sem GitHub;
- teste de idempotencia para nao criar duplicatas;
- teste de erro de token ausente;
- smoke test manual com repositorio/projeto de teste.

## Remocao

- [ ] Remover este arquivo quando o fluxo for convertido em workflows, templates, comandos de chat, skills e capabilities oficiais do LeanOS.
