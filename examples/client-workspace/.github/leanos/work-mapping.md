# GitHub Work Mapping

## Propósito

Define how LeanOS local product work maps to GitHub tracking.

This file is a sync contract. It does not make GitHub the source of truth, and it does not authorize remote writes by itself.

## Source Of Truth

LeanOS local files are the primary operational source:

- Product hierarchy: `../../<product-slug>-os/operations/product-ops/knowledge/work-taxonomy.md`
- Business OS path: read `../../leanos.yaml` and use `paths.business_os`
- Local Epics and Features: `../../<product-slug>-os/operations/product-ops/epics/`
- Epic template: `../../.leanos/standard/templates/product/epic-template.md`
- Feature template: `../../.leanos/standard/templates/product/feature-template.md`

GitHub is an optional remote tracking layer.

## Default Mapping

| Local LeanOS item | GitHub item | Required labels | Notes |
| --- | --- | --- | --- |
| Epic artifact | Issue | `leanos`, `epic` | One GitHub issue per local Epic. Use `epic.md` as canonical source. Use `README.md` legado only when `epic.md` does not exist. |
| Feature markdown file | Issue | `leanos`, `feature` | One GitHub issue per local Feature. |
| Feature Tasks | Checklist inside Feature issue | none by default | Tasks stay inside the Feature issue unless separate tracking is justified. |
| Exceptional Task | Issue | `leanos`, `task` | Use only for separate ownership, review, deployment, security or external dependency. |

## Title Conventions

Epic issue:

~~~text
[EPIC] Customer Management
~~~

Feature issue:

~~~text
[FEATURE: Customer Management] Create customer profile
~~~

Exceptional task issue:

~~~text
[TASK: Create customer profile] Add database migration
~~~

## Rich Body Contract

GitHub issue bodies must be rendered from the local Epic or Feature markdown and must preserve the useful local sections. O sync não deve resumir o conteúdo local em um parágrafo.

Epic bodies must include, when present locally:

- local source path and stable Epic key;
- product status and `sync_status`;
- milestone real da issue;
- `Size`, `Effort`, `Priority`, `Area`, `Roadmap Item` e `Epic`;
- outcome, why now, scope, non-goals, decision criteria and success metrics;
- readiness matrix;
- risks, dependencies and open questions;
- Feature Breakdown with each child Feature key, title and GitHub issue URL when available.

Feature bodies must include, when present locally:

- local source path and stable Feature key;
- parent Epic key and Epic issue URL when available;
- product status and `sync_status`;
- milestone real da issue;
- `Size`, `Effort`, `Priority`, `Area`, `Roadmap Item` e `Epic`;
- purpose, user story, scope, non-goals and acceptance criteria;
- tasks as a checklist;
- Delivery Readiness Matrix;
- Design, Engineering, Security and DevOps criteria when applicable;
- Definition of Ready and Definition of Done.

Se o markdown local for longo demais, preserve os headings de seção e compacte somente prosa repetitiva. Não remova acceptance criteria, tasks, milestone, size, effort, links de relacionamento ou decisões de readiness.

## Milestone And Project Fields

When local metadata contains a milestone, the GitHub issue must use that milestone as the issue milestone. If the milestone is missing for an item marked `sync_ready`, stop and report `milestone_required_missing` instead of inventing one.

GitHub Projects fields must mirror local metadata:

| Local metadata | GitHub Project field |
| --- | --- |
| `status` | `Status` |
| `priority` | `Priority` |
| `size` | `Size` |
| `effort` | `Effort` |
| `area` | `Area` |
| `source_roadmap_item` | `Roadmap Item` |
| `parent_epic_key` or `epic_key` | `Epic` |

If a Project field is missing remotely, report a setup conflict and route to DevOps before writing.

## Relationships

Epic lista suas Features in the Epic issue body. Feature aponta para o Epic pai in the Feature issue body.

Use relationships in this order:

1. Native GitHub parent/sub-issue relationship when the capability supports it.
2. GitHub Project `Epic` field on each Feature.
3. Markdown links in both issue bodies.

Não dependa de apenas um mecanismo de relacionamento quando o body puder incluir backlink com segurança.

## Sync Metadata

Store remote IDs, issue numbers, project item IDs and conflict state in:

`sync-state.yaml`

Não armazene tokens, segredos ou credenciais pessoais no estado de sync.

## Sync Location Decision

Não crie nem dependa de `operations/product-ops/epics/synced/` no scaffold inicial.

Keep local Epics and Features in `operations/product-ops/epics/` and use `sync-state.yaml` as the index for remote status.

Reason: synced work is still product context. Moving it to an archive folder can hide useful context from future planning and implementation flows.

## Required Sync Behavior

Use a natural-language GitHub Epics/Features sync request as the chat intent for this flow.

Before creating or updating GitHub:

1. Read Product Ops work taxonomy.
2. Read the local Epic folder.
3. Read `epic.md`; if it does not exist, read `README.md` legado.
4. Read each Feature file being synced.
5. Compare local state with `sync-state.yaml`.
6. Prepare a dry-run summary with full body, milestone, Project fields and relationships.
7. Ask the founder for confirmation.
8. Only then call a future CLI/script capability for the remote write.
9. The capability must verificar o remoto depois da escrita by reading back issues and Project items.
10. After verification passes, atualizar o arquivo local com `github_issue.url` e `sync_status: synced`.
11. Update `sync-state.yaml` with non-secret IDs, URLs, Project item IDs and verification status.

## Local Patch After Verified Sync

After a confirmed and verified remote sync, patch each local Epic and Feature metadata:

~~~yaml
sync_status: synced
github_issue:
  url: https://github.com/<owner>/<repo>/issues/<number>
~~~

Não marque arquivos locais como `synced` antes que o read-back remoto prove que seções do issue body, labels, milestone, Project fields e relacionamentos existem.

## Conflict Rule

Se local e GitHub divergirem, não sobrescreva nenhum lado automaticamente.

Explain:

- what differs;
- which side is newer or more complete, if knowable;
- what would be changed;
- what the founder must confirm.

## Não Faça

- Não crie issues do GitHub para ideias brutas, notas de backlog ou Epics não quebrados.
- Não crie uma issue do GitHub por Task por padrão.
- Não trate `synced` como prontidão de produto.
- Não comece implementação apenas pelo sync do GitHub; a Feature deve passar por `ready-to-develop.md`.
- Não chame a API do GitHub diretamente a partir do raciocínio do modelo.
