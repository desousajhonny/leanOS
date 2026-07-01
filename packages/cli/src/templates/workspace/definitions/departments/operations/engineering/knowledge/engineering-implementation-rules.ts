export function engineeringImplementationRulesKnowledge(): string {
  return `# Implementation Rules

## Propósito

Define the non-negotiable engineering process before code changes start.

## Estado Atual

Engineering starts only after a Feature is ready for development or an explicit technical spike has been approved.

## Contexto Obrigatório Before Coding

- Confirm the work is a local Feature or mapped GitHub Feature issue.
- Read the parent Epic, PRD or MVP scope when applicable.
- Read acceptance criteria and internal tasks.
- Confirm Product Ops readiness from \`../../product-ops/knowledge/ready-to-develop.md\`.
- Load Design, Security and DevOps readiness when those dimensions are applicable.
- Identify likely files, modules, tests, data/API impact and rollout risk before editing.

## Branch Rule

- Create or confirm a Feature-linked branch before code changes.
- Use \`feature/<feature-slug>\` for local-only Features and \`issue/<issue-number>-<short-title>\` for mapped GitHub issues when local branch rules agree.
- Não reutilize uma branch existente sem checar seu escopo e pedir confirmação.
- Não inclua segredos, nomes de clientes ou termos vagos em nomes de branch.

## Escopo Control

- Implement the smallest slice that satisfies the Feature acceptance criteria.
- Não expanda para refactors adjacentes, nova arquitetura, limpeza não relacionada ou future-proofing sem confirmação do founder.
- If a necessary change exceeds the Feature boundary, stop and explain the scope change before coding.
- Keep implementation notes tied to durable technical decisions, not every minor edit.

## Design Dependency

- Route user-facing UI, layout, screens, flows, copy, accessibility, interaction and reusable components through Design when required.
- Não crie um novo componente voltado ao usuário sem uma especificação de componente aprovada por Design ou confirmação explícita de Design.
- Não adapte um componente reutilizável existente quando comportamento, estado, hierarquia visual, acessibilidade ou API pública mudarem sem confirmação de Design.
- Engineering may reuse an approved component only after checking the component inventory or local code pattern.
- If Design is not applicable, state why before implementation.

## Security and Data Dependency

- Route data, auth, permissions, privacy, API, database, secrets, compliance, infrastructure or AI-generated-code risk through Security when applicable.
- Use \`data-guidelines.md\` and \`skills/data-change-review/SKILL.md\` before schema, migration, API, persistence or permission changes.
- Não faça mudanças destrutivas de dados sem confirmação explícita e notas de rollback.
- Não armazene nem exponha segredos, credenciais, tokens ou dados sensíveis de cliente.

## Done Criteria

- Feature scope implemented or explicitly blocked.
- Testes executados, evidência RED/GREEN capturada quando viável ou explicação de lacuna de teste escrita.
- Design/Security/DevOps criteria are satisfied or marked not applicable with reasons.
- PR preparation includes implementation summary, changed files, validation, risks and Founder Testing Guide.
- PR validation runs before merge recommendation.

## Linhas Vermelhas

- Não escreva código antes de prontidão de Feature, contexto de branch e escopo estarem claros.
- Não implemente UI inventando decisões de Design.
- Não coloque responsabilidades não relacionadas em um arquivo grande quando limites modulares estiverem disponíveis.
- Não confie em dados de usuário, tenant, role ou permissão enviados pelo cliente para decisões server-side.
- Não recomende merge sem evidência de validação.

## Decisões

Record durable process changes here only when they should affect future implementation work.

## Perguntas em Aberto

- Does this repository have an app-specific bootstrap or architecture guide?
- Which commands prove build, typecheck, lint and tests?
- Which Design/Security/DevOps gates are active for the current Feature?

## Próxima Atualização

Update when Engineering's required implementation flow changes.
`;
}
