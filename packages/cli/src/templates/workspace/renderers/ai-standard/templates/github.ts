export function githubEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Local Source

- Local epic key:
- Local epic path:
- Escopo de delivery:
- Roadmap item:
- GitHub sync status:

## Outcome

What business, user or validation outcome this epic should create.

## Decisão Ownership

- Owner: Product Ops / Product Owner
- Strategy/Roadmap reviewer:
- Engineering reviewer when technical feasibility matters:
- Design reviewer when UX is affected:
- Security reviewer when data/auth/privacy/security is affected:
- DevOps reviewer when GitHub, deploy or environment readiness is affected:

## Contexto Estratégico

- Product:
- ICP:
- Problem:
- Proposta de valor:
- Validation suposição:
- Evidence status:

## Vínculo Com Escopo De Delivery

- scope_type:
- milestone:
- release_goal:
- Non-goals:
- Roadmap item:

## Escopo

What is included.

## Não Objetivos

What is explicitly excluded.

## Critérios De Product

- User value:
- Jobs to be done:
- Learning or success signal:

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

Use this matrix to decide which specialists must shape the features under this epic.

| Dimension | Required? | Why / Not Applicable | Required Output |
| --- | --- | --- | --- |
| Product Ops | yes | Epic ownership and delivery scope | outcome, scope, non-goals, expected features |
| Strategy / Roadmap | yes | Roadmap and milestone alignment | priority rationale |
| Engineering | conditional | Feasibility, dependencies or unknown complexity | feasibility notes |
| Design | conditional | UX, UI, flow, copy or accessibility impact | design criteria for affected features |
| Security | conditional | data, auth, permissions, privacy, abuse, API or compliance risk | security criteria for affected features |
| DevOps | conditional | GitHub sync, CI/CD, env, deploy, observability or config impact | operational criteria |

## Critérios De Design

Use only when the epic affects user experience.

- User flow:
- Screens or states:
- UX constraints:
- Accessibility considerations:
- Design dependency:

If not applicable, write: "Not applicable; no user-facing design change."

## Critérios De Engineering

- Technical approach:
- System boundaries:
- Data or API impact:
- Test expectations:
- Operational risks:

## Critérios De Security

Use quando a Epic envolver dados, auth, permissões, privacidade, risco de abuso ou compliance.

- Data involved:
- Auth or permissions:
- Privacy considerations:
- Abuse cases:
- Compliance constraints:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Feature Breakdown

- Status: not_started
- Expected features:
- Perguntas abertas:

## Próximo Passo

After this epic is confirmed, break it into local features with internal tasks before implementation.
`;
}

export function githubFeatureTemplate(): string {
  return `# [FEATURE: <epic title>] <feature title>

## Local Source

- Local feature key:
- Local feature path:
- Epic pai key:
- GitHub sync status:

## Epic Pai

- Epic:
- Milestone:
- Roadmap item:

## Propósito

Why this feature exists.

## Escopo

What should be implemented.

## Não Objetivos

What should not be implemented.

## Critérios De Product

- User story:
- User value:
- Acceptance criteria:
- Success or learning signal:

## Tasks

Use tarefas como checklist interno desta Feature.

~~~text
Create model
Create UI
Adicionar validação
Adicionar testes
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | deploy, env, CI/CD, observability, config or GitHub sync impact |

## Critérios De Design

Use only when this feature changes a user-facing flow, screen, state, copy or interaction.

- Flow:
- Screens or states:
- UX constraints:
- Accessibility:
- Design asset or decision needed:

If not applicable, write: "Not applicable; no user-facing design change."

## Critérios De Engineering

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Critérios De Security

Use quando esta Feature tocar dados, auth, permissões, privacidade, risco de abuso ou compliance.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Definition of Ready

- [ ] Epic pai is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition Of Done

- [ ] Critérios de Product satisfeitos
- [ ] Critérios de Design satisfeitos or explicitly not applicable
- [ ] Critérios de Engineering satisfeitos
- [ ] Critérios de Security satisfeitos or explicitly not applicable
- [ ] Testes ou plano de validação definidos
- [ ] Epic pai updated if needed
`;
}

export function deliveryReadinessMatrixTemplate(): string {
  return `# Delivery Readiness Matrix (DRM)

Use this before creating epics, features or implementation plans.

The DRM shapes work before development starts. It prevents the model from coding before the feature or issue has enough Product, Design, Engineering, Security and DevOps clarity.

Epic-level DRM decides which dimensions must participate and what kinds of feature criteria will be needed.

Feature-level DRM turns those dimensions into concrete, testable criteria and internal tasks.

| Dimension | Required When | Required Output | Status |
| --- | --- | --- | --- |
| Product Ops | Always | outcome, scope boundary, non-goals, acceptance criteria, milestone, parent epic linkage | TBD |
| Design | User-facing flow, screen, state, copy, accessibility or interaction changes | user flow, required screens/states, component/design-system notes, accessibility notes | not_applicable/TBD |
| Engineering | Always for implementation work | implementation boundary, dependencies, test plan, branch/PR expectation | TBD |
| Security | Data, auth, permissions, privacy, abuse, API, database, secrets, compliance or AI-generated-code risk | risk notes, security criteria, data/auth/privacy requirements | not_applicable/TBD |
| DevOps | Environment, deploy, CI/CD, GitHub Project, observability, config or release impact | environment/config notes, CI/deploy/release/observability criteria | not_applicable/TBD |

## Readiness Rule

Não crie features prontas para implementação nem issues do GitHub até Product Ops e Engineering estarem claros.

Design is required only when user experience is affected.

Security is required only when the issue has a security-sensitive surface.

DevOps is required only when delivery, environment, automation, release or operational readiness is affected.

## Regra de Saída

If a dimension is not applicable, say why. If it is applicable but unclear, mark it as missing context and stop before creating GitHub issues.
`;
}

export function branchNameTemplate(): string {
  return `# Branch Name Template

Use focused branches tied to a local LeanOS Feature or mapped GitHub issue.

## Formats

\`\`\`text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
\`\`\`

## Examples

\`\`\`text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Regras

- Use \`feature/...\` when the Feature exists only in the local LeanOS workspace.
- Use \`issue/...\` when the Feature is mapped to a real GitHub issue.
- Always include the real issue number when using the \`issue/...\` format.
- Use a short kebab-case slug.
- Não inclua segredos, nomes de clientes ou detalhes sensíveis.
- Não implemente trabalho de Feature na branch padrão.
- If the branch already exists, ask before continuing.
`;
}

export function pullRequestTemplate(): string {
  return `# Pull Request

## Resumo

What changed and why.

## Issue Vinculada

Closes #

## Epic Pai

Epic #

## Contexto LeanOS

- Department:
- Area:
- Role:
- Skills:
- Playbook:

## Alinhamento De Product / Escopo De Delivery

- Roadmap item:
- Escopo de delivery:
- Acceptance criteria:
- Validation or learning impact:

## Notas De Design

State "Not applicable" when no user-facing design change exists.

## Notas De Security

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Automated tests run or updated
- [ ] Manual validation completed or explained

## Founder Testing Guide

Explain how a non-technical founder can test this PR before merge.

### O Que Mudou

Plain-language summary of the user-facing or business behavior delivered.

### Onde Testar

- Preview URL:
- Local route or screen:
- Test account or data:

### Como Testar

1. Open...
2. Do...
3. Confirm...

### Resultado Esperado

What the founder should see when the PR works.

### Fora Do Escopo

What this PR intentionally does not cover.

### Riscos Conhecidos Ou Limites

Anything the founder should know before approving.

## Riscos

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## Checklist De Review LeanOS

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Testes executados ou explicados
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] Nenhum escopo não relacionado adicionado
`;
}
