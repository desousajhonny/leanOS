export function githubEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Local Source

- Local epic key:
- Local epic path:
- Escopo de delivery:
- Roadmap item:
- Milestone:
- Priority:
- Size:
- Effort:
- Area:
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
- Milestone:
- Priority:
- Size:
- Effort:
- Area:
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

Use branches focadas e vinculadas a uma Feature local LeanOS, issue mapeada ou manutenção explicitamente escopada.

## Formats

\`\`\`text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
fix/<issue-number>-<short-kebab-slug>
chore/<short-kebab-slug>
docs/<short-kebab-slug>
spike/<short-kebab-slug>
\`\`\`

## Examples

\`\`\`text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
fix/612-handle-null-clinic-phone
chore/update-pr-validation-copy
docs/add-founder-testing-guide
spike/evaluate-webhook-retry-queue
\`\`\`

## Regras

- Use \`feature/...\` quando a Feature existe apenas no workspace local LeanOS.
- Use \`issue/...\` quando a Feature está mapeada para uma issue real do GitHub.
- Use \`fix/...\` para correção de bug vinculada a uma issue real.
- Use \`chore/...\` para manutenção interna sem mudança de produto.
- Use \`docs/...\` para mudanças de documentação.
- Use \`spike/...\` para investigação técnica aprovada e explicitamente limitada.
- Sempre inclua o número real da issue ao usar \`issue/...\` ou \`fix/...\`.
- Use um slug curto em kebab-case.
- Não inclua segredos, nomes de clientes ou detalhes sensíveis.
- Não implemente trabalho de Feature na branch padrão.
- Se a branch já existir, peça confirmação antes de continuar.
`;
}

export function pullRequestTemplate(): string {
  return `# Pull Request

## Título Do PR

Use um título curto em estilo Conventional Commit quando fizer sentido:

\`\`\`text
feat(<escopo>): <resumo curto>
fix(<escopo>): <resumo curto>
chore(<escopo>): <resumo curto>
docs(<escopo>): <resumo curto>
\`\`\`

## Resumo

Descreva o que mudou e por quê.

## Issue Vinculada

Closes #

## Epic Pai

Epic #

## Status De Prontidão

Status: draft | founder-ready | blocked-by-tests | blocked-by-context

Explique em uma frase por que este status é correto.

## Contexto LeanOS

- Department:
- Area:
- Role:
- Skills:
- Playbook:

## Alinhamento De Produto / Escopo De Delivery

- Item de roadmap:
- Escopo de delivery:
- Critérios de aceite:
- Impacto de validação ou aprendizado:

## Notas De Design

Declare "não aplicável" quando não houver mudança de UX voltada ao usuário.

## Notas De Security

Declare "não aplicável" quando não houver superfície sensível a Security.

## Testes

- [ ] Testes automatizados executados ou atualizados
- [ ] Validação manual concluída ou explicada

## Founder Testing Guide

Explique como um founder não técnico pode testar este PR antes do merge.

### O Que Mudou

Resumo em linguagem simples do comportamento de usuário ou negócio entregue.

### Onde Testar

- URL de preview:
- Rota ou tela local:
- Conta ou dados de teste:

### Como Testar

1. Abra...
2. Faça...
3. Confirme...

### Resultado Esperado

O que o founder deve ver quando o PR funcionar.

### Fora Do Escopo

O que este PR intencionalmente não cobre.

### Riscos Conhecidos Ou Limites

Qualquer coisa que o founder deva saber antes de aprovar.

## Deploy / Rollback

- Impacto de deploy:
- Migração necessária:
- Caminho de rollback:
- Observabilidade ou monitoramento:

## Riscos

- Risco de escopo:
- Risco técnico:
- Risco de produto:
- Risco de Security:

## Checklist De Review LeanOS

- [ ] Contexto da issue carregado
- [ ] Branch segue a nomenclatura LeanOS
- [ ] Critérios de aceite atendidos
- [ ] Testes executados ou explicados
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Critérios de Design atendidos ou não aplicáveis
- [ ] Critérios de Security atendidos ou não aplicáveis
- [ ] Nenhum escopo não relacionado adicionado
`;
}
