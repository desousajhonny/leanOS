# Memória de Modelo

Este arquivo existe para continuidade entre agentes/modelos como Claude, Codex e outros coding agents.

Use como índice rápido de handoff para trabalho atual, decisões recentes, mudanças recentes e threads abertas. Ele não é um arquivo canônico de doutrina e não substitui `AGENT.md`, `docs/framework/source-of-truth/`, `TEMP-roadmap-ajustes.md`, histórico git ou knowledge gerado do workspace.

## Estado Atual

- Repositório: `desousajhonny/leanOS`.
- Branch local de trabalho atual: `feature/business-os-layout`.
- Remote `origin/main` foi enviado para o commit `765ec67` em 2026-06-29.
- `AGENT.md` raiz é o ponto de entrada para comportamento de agente no nível do projeto.
- Source of truth do framework vive em `docs/framework/source-of-truth/`.
- Roadmap temporário de implementação vive em `TEMP-roadmap-ajustes.md`.

## Decisões Recentes

- 2026-06-30: Adotar layout Business OS no scaffold: `<product-slug>-os/` para Strategy/Operations/Growth, `.leanos/standard/` para padrões do framework e `.leanos/runtime/` para agent/context/index/traces/vscode. Adicionar `lean-os update` para migrar workspaces existentes com preview via `--dry-run`.
- 2026-06-30: Simplificar o wizard CLI em PT-BR. O setup recomendado passa a ser `progressive`; a opção avançada `all-at-once` prepara todas as áreas, mas não reintroduz multiselect manual de departamentos.
- 2026-06-29: Expandir padrões gerados de branch e PR. Branches agora cobrem `feature`, `issue`, `fix`, `chore`, `docs` e `spike`; templates de PR passam a exigir título estilo Conventional Commit quando fizer sentido, status de prontidão e seção `Deploy / Rollback`.
- 2026-06-29: Adicionar memória de continuidade de modelo na raiz. Esta memória serve apenas para continuidade de handoff/status/próximo passo; decisões duráveis do framework continuam em `docs/framework/source-of-truth/decision-log.md`.
- 2026-06-29: Manter doutrina e regras de decisão do framework em `docs/framework/source-of-truth/`; não usar a memória de modelo como source of truth do comportamento LeanOS.
- 2026-06-29: Fortalecer o LeanOS Asset Contract v2 com contratos de workflow, playbook e skill apoiados por validação.
- 2026-06-29: Manter arquivos de knowledge de Engineering. Tratar `code-standards.md`, `implementation-rules.md`, `component-guidelines.md`, `data-guidelines.md`, `testing-strategy.md` e `review-criteria.md` como contratos duráveis do framework; tratar `implementation-notes.md`, `code-review-notes.md` e `pr-log.md` como estado de Feature/review.
- 2026-06-29: Padronizar textos humanos gerados pelo LeanOS em PT-BR. Manter IDs, paths, slugs, chaves YAML e termos técnicos de interoperabilidade estáveis em inglês quando fizer sentido.

## Mudanças Recentes

- Working tree: scaffold reorganizado para gerar `<product-slug>-os/README.md`, departamentos dentro do Business OS, `.leanos/standard/` e `.leanos/runtime/`; `leanos.yaml.paths` registra os novos roots; validação `validateBusinessOsLayout` cobre paths físicos e impede referências antigas como `ai-standard/` e `.leanos/context`.
- Working tree: comando `lean-os update [--dry-run]` adicionado. Ele move diretórios legados (`strategy`, `operations`, `growth`, `ai-standard`, `.leanos/context|index|agent|traces|vscode`) para o novo layout quando o destino não existe, reporta conflitos e sobrescreve apenas arquivos de framework/runtime/roteamento, preservando arquivos de produto existentes como missing-only.
- Working tree: wizard `lean-os ai` simplificado para nome do produto, tipo, descrição, modo de preparação e GitHub; perguntas de usuário alvo, estágio e modo de operação foram removidas do fluxo interativo; generator ganhou `initialActivationMode` com `progressive` e `all-at-once`; validação `validateCliWizardProgressiveSetup` adicionada.
- Working tree: padrões de branch/PR fortalecidos em `.github/leanos/branch-rules.md`, `.github/PULL_REQUEST_TEMPLATE.md`, templates GitHub do `ai-standard`, skill `create-pr`, playbooks `branch-for-feature` e `prepare-pr`, com validação `validateBranchAndPrStandards`.
- Working tree: documentação da jornada `Review e PR` adicionada em `docs/framework/founder-journeys/review-pr.md`, `journey-map.md` marcado como concluído para a etapa 7 e validação `validateFounderJourneyReviewPr` adicionada ao generator. A validação cobre documentação da jornada e ativação sequencial Strategy-only -> Product Ops -> Engineering para rota de PR/review.
- Working tree: limpeza de Engineering knowledge preenche contratos duráveis de Engineering e adiciona validação do generator para impedir que knowledge de Engineering em nível de framework saia com placeholders `TBD`.
- Working tree: padronização PT-BR concluída em renderers, ai-standard, `.leanos`, GitHub docs, Strategy, Operations, Growth, skills, playbooks, workflows, knowledge e validações correspondentes.
- Working tree: `packages/cli/scripts/validation/language.mjs` adicionado ao generator para prevenir regressão de headings, frontmatter e frases operacionais em inglês.
- Working tree: `examples/client-workspace/` regenerado e validado com `npm test` e `git diff --check`.
- `2ecf591 Strengthen LeanOS delivery asset contracts`
  - Fortaleceu `feature-to-delivery-cycle`, `delivery-item-to-epic`, `epic-to-features` e contratos de skills de Product Ops.
- `be2958a Strengthen engineering skill contracts`
  - Fortaleceu `write-tests`, `create-pr` e `review-pr` de Engineering com evidência RED/GREEN, prontidão de PR e evidência de review apoiadas por validação.
- `6e1d750 Strengthen operations review skill contracts`
  - Fortaleceu skills de review/decisão de DevOps, Security e Design com decisões de prontidão, saídas de evidência e linhas vermelhas.

## Threads Abertas

- Continuar teste Founder Journey do setup progressivo Strategy-only até ativação de Product Ops, criação de Epic/Feature, implementação, PR e simulação de review. A fatia de Review/PR agora tem jornada documentada e validação automatizada da rota sequencial até Engineering; ainda falta a simulação externa completa com Epic/Feature e implementação.
- Desenhar e implementar `ready-for-launch` depois que Founder Journey estiver validado.
- Considerar regra do framework para atualizar esta memória ao fim de sessões locais significativas antes de trocar agentes.

## Regras de Atualização

- Leia este arquivo no começo de qualquer sessão de continuação, status, retomada, próximo passo ou troca de modelo.
- Atualize este arquivo depois de decisões relevantes do framework, commits, pushes, mudanças de roadmap ou descobertas importantes para handoff.
- Mantenha entradas curtas e aponte para arquivos canônicos ou commits em vez de duplicar contexto completo.
- Não registre segredos, tokens, credenciais, dados privados de cliente ou alegações especulativas.
- Se uma nota virar decisão durável do framework, atualize também `docs/framework/source-of-truth/decision-log.md`.
- Se este arquivo conflitar com `AGENT.md` ou `docs/framework/source-of-truth/`, trate o source of truth como autoritativo e atualize este arquivo.
