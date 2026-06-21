# TEMP Roadmap de Ajustes LeanOS

Este arquivo e temporario. Ele deve ser removido quando os itens abaixo forem implementados, validados e incorporados ao fluxo normal do projeto.

## Decisoes de Escopo

- [ ] Nao expandir a arvore de pastas agora; a estrutura atual ja e suficiente para o MVP.
- [ ] Manter `Company as a Product` como conceito de posicionamento e logica do framework.
- [ ] Nao mover `Company as a Product` para dentro de `strategy/company/` como se fosse contexto operacional da empresa do usuario final.
- [ ] Focar em profundidade operacional dos comandos principais, nao em mais scaffolding.
- [ ] Usar `TEMP-automation-flows.md` como mapa temporario dos fluxos que serao automatizados no futuro.
- [ ] Tratar `new-product-workspace` e `existing-product-repo` como modos oficiais de instalacao.

## 1. Fortalecer `/start-leanos`

Objetivo: transformar `/start-leanos` em uma primeira sessao guiada, clara e segura.

- [x] Definir roteiro de entrevista inicial do founder.
- [x] Separar perguntas obrigatorias de perguntas opcionais.
- [x] Mapear respostas para arquivos Strategy elegiveis.
- [x] Garantir que o Chief sempre proponha mudancas antes de escrever.
- [x] Garantir que nenhuma alteracao aconteca sem confirmacao explicita.
- [x] Registrar incertezas como perguntas abertas, nao como fatos inventados.
- [x] Definir output padrao do comando:
  - contexto carregado
  - resumo do workspace
  - lacunas detectadas
  - arquivos propostos para atualizacao
  - proximo comando recomendado
- [x] Atualizar testes para validar o comportamento esperado do comando.

## 2. Padronizar comandos principais

Objetivo: fazer os comandos centrais entregarem outputs consistentes, previsiveis e uteis.

Base para o fluxo Roadmap -> GitHub Project -> Epic -> Sub-issues -> Implementation:

- [ ] Usar `TEMP-automation-flows.md` como mapa de fluxos principais e sub-workflows.
- [ ] Usar `TEMP-github-roadmap-flow.md` como especificacao temporaria do fluxo GitHub.
- [ ] Separar responsabilidade: LeanOS Chief despacha, roles operacionais guiam e capabilities/scripts executam API.
- [ ] Garantir que comandos de chat gerem plano/payload antes de qualquer chamada remota.
- [ ] Garantir confirmacao explicita antes de executar GitHub API.
- [ ] Manter UX chat-first para founders que nao querem operar pelo terminal.

### `/check coherence`

- [ ] Definir score de coerencia.
- [ ] Listar alinhamentos.
- [ ] Listar inconsistencias.
- [ ] Listar riscos.
- [ ] Recomendar proximo comando.
- [ ] Garantir que nao recomende areas inativas sem aviso.

### `/define mvp`

- [ ] Definir inputs obrigatorios.
- [ ] Carregar Strategy antes de Operations.
- [ ] Separar MVP scope, non-goals, user stories, user flows e acceptance criteria.
- [ ] Evitar definir MVP sem problema, ICP e value proposition minimamente claros.
- [ ] Pedir confirmacao antes de atualizar arquivos.

### `/create issues`

- [ ] Converter MVP/roadmap em epics e sub-issues GitHub-ready.
- [ ] Criar template de epic.
- [ ] Criar template de sub-issue.
- [ ] Aplicar matriz 3D Product/Design/Security antes de criar sub-issues.
- [ ] Incluir acceptance criteria.
- [ ] Incluir links para source-of-truth files.
- [ ] Marcar dependencias e riscos.
- [ ] Evitar criar issue sem contexto de MVP.

### `/workon issue`

- [ ] Carregar issue/contexto antes de planejar implementacao.
- [ ] Roteiar para Engineering.
- [ ] Definir plano de implementacao.
- [ ] Definir plano de teste.
- [ ] Registrar arquivos provaveis de mudanca.

### `/review pr`

- [ ] Validar PR contra MVP scope.
- [ ] Validar contra acceptance criteria.
- [ ] Validar riscos de estrategia/produto quando aplicavel.
- [ ] Separar bugs, riscos, perguntas e sugestoes.
- [ ] Evitar aprovar mudanca que contradiga source-of-truth files.

## 3. Tornar o ciclo de validacao explicito

Objetivo: transformar validacao em loop operacional, nao apenas arquivos soltos.

- [ ] Definir ciclo: hipotese -> experimento -> evidencia -> decisao -> roadmap.
- [ ] Atualizar playbook de validation para seguir esse ciclo.
- [ ] Garantir que `learning-log.md` registre aprendizado validado.
- [ ] Garantir que decisoes relevantes sejam refletidas em roadmap ou backlog.
- [ ] Criar criterio para diferenciar insight, evidencia e decisao.
- [ ] Atualizar comandos para nao tratar suposicoes como fatos.

## 4. Preparar camada GitHub API

Objetivo: planejar integracao real com GitHub API, mantendo execucao segura via capabilities/scripts e nunca diretamente pelo LeanOS Chief.

- [ ] Revisar templates de issue.
- [ ] Revisar PR template.
- [ ] Revisar regras de validacao de PR.
- [x] Definir arquivos base de configuracao GitHub sem segredos.
- [x] Definir `.github/leanos/github-settings.example.json`.
- [x] Definir `.github/leanos/project-sync.yaml`.
- [x] Definir `.github/leanos/sync-state.yaml`.
- [x] Perguntar no wizard se o usuario quer preparar GitHub management.
- [x] Gerar `.env.local` apenas quando GitHub management for solicitado.
- [ ] Definir comando de chat `/configure github`.
- [ ] Definir comando de chat `/sync-roadmap`.
- [ ] Definir comando de chat `/create subissues`.
- [ ] Definir capability `github.configure`.
- [ ] Definir capability `github.status`.
- [ ] Definir capability `github.syncRoadmap`.
- [ ] Definir capability `github.createSubissues`.
- [ ] Garantir dry-run antes de escrita remota.
- [ ] Garantir que tokens nunca sejam persistidos no workspace.
- [ ] Documentar GitHub Project, milestones, epics, sub-issues e sync state.

## 5. Planejar update/migration de workspaces

Objetivo: preparar o caminho para evoluir workspaces ja criados.

- [ ] Definir necessidade de um futuro `lean-os update`.
- [ ] Listar quais arquivos sao runtime e poderiam ser atualizados pelo framework.
- [ ] Listar quais arquivos sao source-of-truth do cliente e nao devem ser sobrescritos.
- [ ] Definir estrategia de migracao segura:
  - detectar versao em `leanos.yaml`
  - comparar arquivos runtime
  - propor mudancas
  - preservar alteracoes do usuario
- [ ] Nao implementar agora sem uma especificacao propria.

## 5.1 Planejar `/bootstrap product`

Objetivo: definir o fluxo futuro que cria app code somente depois de Strategy, MVP e stack estarem claros.

- [ ] Definir quando o workspace esta pronto para criar app code.
- [ ] Definir perguntas de stack: Next.js, Vite, API, dashboard ou outro.
- [ ] Definir defaults para founder iniciante.
- [ ] Definir como preparar Vercel sem criar `.vercel/` ou deploy automatico.
- [ ] Definir como preservar repositorios existentes.
- [ ] Definir testes para garantir que o setup inicial nao cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json`.

## 6. Preparar release publica do MVP

Objetivo: deixar o pacote publicavel e testavel por usuarios reais.

- [ ] Atualizar versao do pacote se necessario.
- [ ] Rodar build.
- [ ] Rodar validacao do gerador.
- [ ] Regenerar `examples/client-workspace/`.
- [ ] Rodar smoke test local com `node packages/cli/dist/index.js ai`.
- [ ] Rodar `npm publish --dry-run --access public` em `packages/cli`.
- [ ] Publicar somente apos confirmacao explicita.
- [ ] Testar via `npx lean-os ai` apos publicacao.

## 7. Definicao de MVP pronto para teste externo

O MVP esta pronto para teste externo quando um usuario consegue:

- [ ] Rodar `npx lean-os ai`.
- [ ] Criar o workspace sem sobrescrever arquivos importantes por acidente.
- [ ] Abrir o workspace em VS Code, Codex, Claude ou outro agente.
- [ ] Rodar `/start-leanos`.
- [ ] Ser guiado por uma primeira sessao clara.
- [ ] Preencher Strategy com confirmacao.
- [ ] Rodar `/define mvp`.
- [ ] Rodar `/check coherence`.
- [ ] Gerar plano de issues ou execucao.
- [ ] Continuar o trabalho em uma nova sessao sem perder contexto.

## Ordem Recomendada

1. Fortalecer `/start-leanos`.
2. Mapear fluxos em `TEMP-automation-flows.md`.
3. Detalhar `Idea-to-roadmap`.
4. Detalhar `Roadmap-sync-to-GitHub-Projects`.
5. Detalhar `Epic-to-sub-issues`.
6. Detalhar `Issue implementation`.
7. Padronizar `/check coherence` e `/define mvp`.
8. Tornar o ciclo de validacao explicito.
9. Revisar artefatos GitHub/API.
10. Preparar release publica.

## Remocao

- [ ] Excluir este arquivo quando todos os itens relevantes forem implementados ou movidos para issues oficiais.
