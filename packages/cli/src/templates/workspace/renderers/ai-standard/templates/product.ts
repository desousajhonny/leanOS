export function productEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Metadados

~~~yaml
epic_key: <stable-kebab-key>
source_roadmap_item: <roadmap item or backlog reference>
delivery_scope:
  scope_type: MVP | Release | Experiment | Beta | Internal
  milestone:
  release_goal:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
priority: low | medium | high | critical
size: XS | S | M | L | XL
effort: 1 | 2 | 3 | 5 | 8 | 13
area: Product Ops
owner: Product Ops
decision_owner: Product Owner
supporting_roles:
  - Roadmap Planner
  - Product Strategist
  - Senior Developer when technical feasibility matters
  - Product Designer when UX is affected
  - Security Reviewer when data/auth/privacy/security is affected
  - DevOps Engineer when delivery, deploy or GitHub sync is affected
github_issue:
  url:
~~~

## Outcome

What user, business or validation outcome this epic should create.

## Why Now

Why this epic belongs in the current delivery scope instead of backlog or later roadmap.

## Starting Point

Use these inputs before shaping the epic:

- Product brief:
- ICP / user segment:
- Problem:
- Roadmap item:
- Escopo de delivery:
- PRD or MVP scope:
- Existing evidence:
- Known constraints:

## Escopo

What is included.

## Não Objetivos

What is explicitly excluded.

## Epic Decision Criteria

- User value:
- Business value:
- Strategic fit:
- Evidence level:
- Opportunity cost:
- Milestone fit:
- Risk level:

## Success Metrics

- Primary success metric:
- Supporting metric:
- Qualitative signal:
- Learning signal:

## Epic Done When

The Epic is done when all confirmed Features are delivered or explicitly descoped, the outcome can be measured, and the parent delivery scope is updated.

## Approval Gate

- Product Owner approval:
- Roadmap / Strategy approval:
- Engineering feasibility checked:
- Design checked or not applicable:
- Security checked or not applicable:
- DevOps checked or not applicable:
- Founder confirmation:

## Epic Readiness Matrix

Use this to decide which specialists must participate before breaking the epic into features.

| Dimension | Required? | Why / Not Applicable | Required Output |
| --- | --- | --- | --- |
| Product Ops | yes | Epic ownership and delivery scope | outcome, scope, non-goals, feature candidates |
| Roadmap / Strategy | yes | Roadmap and milestone alignment | roadmap linkage and priority rationale |
| Engineering | conditional | Technical feasibility, dependencies or unknown complexity | feasibility notes and implementation boundary |
| Design | conditional | User-facing flow, screen, state, copy or accessibility impact | UX notes and design questions |
| Security | conditional | Data, auth, permissions, privacy, abuse, API or compliance risk | security criteria and risks |
| DevOps | conditional | GitHub sync, CI/CD, environment, release, observability or config impact | operational criteria |

## Expected Features

Liste Features candidatas. Não detalhe tudo aqui; cada Feature recebe seu próprio arquivo de Feature.

| Feature | User Outcome | Required Dimensions | Notes |
| --- | --- | --- | --- |
| <feature title> | <outcome> | Product Ops, Engineering, Design/Security/DevOps if applicable | <notes> |

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Riscos

- Product risk:
- Technical risk:
- Design risk:
- Security risk:
- Delivery risk:

## Perguntas em Aberto

- TBD

## Próximo Passo

After this epic is confirmed, run \`epic-to-features\` to create feature files with internal tasks and Delivery Readiness Matrix criteria.
`;
}

export function productReadmeTemplate(): string {
  return `# <Nome Do Produto>

Resumo em uma frase do que o produto faz e para quem.

## O Que É

Explique o produto ou empresa em linguagem direta. Priorize o que existe ou está sendo validado agora.

## Para Quem É

- Usuário principal:
- Segmento ou ICP:
- Contexto em que esse usuário sente o problema:

## Problema

Descreva a dor, oportunidade ou trabalho a ser feito. Separe fatos conhecidos de hipóteses.

## Proposta De Valor

Explique o resultado que o produto promete criar para o usuário ou negócio.

## Status Atual

- Estágio:
- O que já existe:
- O que está sendo validado:
- O que ainda não existe:

## O Que Existe Neste Repositório

Explique se o repositório contém app/código, documentação, Business OS LeanOS, protótipos, scripts ou apenas estrutura inicial.

## Como Rodar Localmente

Use esta seção somente quando houver código ou comandos reais.

~~~bash
<comando real>
~~~

Se ainda não houver app ou código, diga isso claramente e aponte o próximo passo.

## Estrutura

- \`<product-slug>-os/\`: sistema operacional de negócio do produto.
- \`.leanos/\`: runtime e biblioteca padrão do LeanOS.
- \`.github/\`: integração com GitHub, agentes e templates.
- \`src/\`, \`app/\` ou equivalente: código do produto quando existir.

## Foco Atual

Explique o foco atual em uma lista curta:

- Estratégia:
- MVP ou validação:
- Próxima decisão:

## LeanOS

Explique em poucas linhas que o LeanOS organiza estratégia, operações, delivery e crescimento. Não deixe esta seção substituir a explicação do produto.
`;
}

export function implementationPacketTemplate(): string {
  return `# Implementation Packet: <feature-slug>

Feature implementation packet for a single Feature. Product Ops owns this packet; Design, Security, DevOps, Finance, Growth and Engineering add only the artifacts that are applicable to the Feature.

Feature: ../../epics/<epic-slug>/<feature-slug>.md
Parent Epic: ../../epics/<epic-slug>/epic.md

## Propósito

Centralizar tudo que Engineering precisa ler antes de implementar uma Feature.

Engineering não inicia código enquanto qualquer gate aplicável estiver missing, pending ou blocked.

## Status

- Packet status: draft / ready / blocked / done
- Owner: Product Ops
- Feature status:
- Last updated:

## Readiness Gates

| Área | Status | Artefato | Observação |
| --- | --- | --- | --- |
| Product Ops | pending | Feature file | Critérios e escopo |
| Design | not_applicable | design/screen-specs/ ou design/component-specs/ | UI, tela, fluxo, componente, copy ou acessibilidade |
| Security | not_applicable | security/ | Dados, auth, permissões, privacidade, API, abuse ou AI runtime |
| DevOps | not_applicable | devops/ | Ambientes, deploy, CI/CD, observabilidade ou release |
| Finance/Growth | not_applicable | growth/ ou finance/ | Pricing, planos, custo, campanha, suporte ou aprendizado |
| Engineering | pending | engineering/implementation-plan.md | Plano técnico antes do código |

## Artefatos Esperados

- \`design/screen-specs/<screen-slug>.md\`
- \`design/component-specs/<component-slug>.md\`
- \`security/security-review.md\`
- \`devops/deploy-readiness.md\`
- \`engineering/implementation-plan.md\`

Crie apenas os artefatos aplicáveis. Não crie arquivos vazios só para preencher a pasta.

## Design Handoff

- Screen specs:
- Component specs:
- Microcopy:
- Accessibility:
- Design decision:

## Security Handoff

- Security status:
- Sensitive surfaces:
- Security acceptance criteria:
- Known risks:

## DevOps Handoff

- Environment impact:
- CI/CD impact:
- Deploy/rollback:
- Observability:

## Engineering Handoff

- Implementation boundary:
- Files likely affected:
- Tests expected:
- Known risks:

## Regra De Uso

- Product Ops cria ou confirma este packet antes de Engineering.
- Áreas especialistas escrevem seus artefatos aqui quando o gate é aplicável.
- Engineering lê o packet inteiro antes de branch/código.
- PR Validation compara o PR contra Feature + este packet.

## Não Faça

- Não trate issue do GitHub como substituto deste packet.
- Não marque Design, Security ou DevOps como not_applicable sem motivo.
- Não marque componente especificado como disponível antes do merge.
- Não altere código sem packet pronto ou lacuna explicitamente aceita pelo founder.
`;
}

export function productFeatureTemplate(): string {
  return `# [FEATURE: <epic title>] <feature title>

## Metadados

~~~yaml
feature_key: <stable-kebab-key>
parent_epic_key: <epic-key>
source_roadmap_item: <roadmap item or backlog reference>
milestone:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
priority: low | medium | high | critical
size: XS | S | M | L | XL
effort: 1 | 2 | 3 | 5 | 8 | 13
area: Product Ops | Engineering | Design | Security | DevOps
owner: Product Ops
execution_owner: Engineering
github_issue:
  url:
~~~

## Implementation Packet

- Path: operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md
- Status: missing | draft | ready | blocked | done
- Required before code: yes, unless the founder explicitly accepts a documented spike.

## Epic Pai

- Epic:
- Epic outcome:
- Milestone:
- Escopo de delivery:

## User Story

As a <user>, I want <capability> so that <outcome>.

## Propósito

Why this feature exists.

## Escopo

What should be implemented.

## Não Objetivos

What should not be implemented.

## Critérios de Aceite

- TBD

## Tasks

Use tarefas como checklist interno de implementação. Mantenha-as pequenas o suficiente para orientar Engineering.

~~~text
Create database model
Create UI
Adicionar validação
Adicionar testes
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | required only for UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | required only for data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | required only for deploy, env, CI/CD, observability, config or GitHub sync impact |

## Critérios De Design

If not applicable, say why.

- Flow:
- Screens or states:
- Component/design-system notes:
- Accessibility:

## Critérios De Engineering

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Critérios De Security

If not applicable, say why.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

## Definition of Ready

- [ ] Epic pai is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition Of Done

- [ ] Acceptance criteria satisfied
- [ ] Tasks completed or explicitly descoped
- [ ] Tests or validation evidence recorded
- [ ] Design review completed or explicitly not applicable
- [ ] Security review completed or explicitly not applicable
- [ ] DevOps/release notes completed or explicitly not applicable
- [ ] Epic pai updated with result
`;
}
