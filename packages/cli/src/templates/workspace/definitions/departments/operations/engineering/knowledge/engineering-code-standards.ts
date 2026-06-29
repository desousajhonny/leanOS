export function engineeringCodeStandardsKnowledge(): string {
  return `# Code Standards

## Propósito

Define how Engineering should write maintainable code inside this product.

## Estado Atual

Use these standards before changing código-fonte. They are framework defaults until the repository defines stricter local conventions.

## Existing Patterns First

- Inspect nearby files before creating a new pattern.
- Prefer the repository's existing framework, router, state, API, styling, validation and test patterns.
- Add a new abstraction only when it removes real complexity or matches an established local pattern.
- If the existing code is inconsistent, choose the smallest pattern that keeps the current Feature safe and document the tradeoff.

## Modularization

- Keep files focused on one responsibility.
- Separate UI, state, data access, validation, side effects and business rules when practical.
- Split large components or modules when a section can be named, tested or reused independently.
- Keep Feature-specific workflow logic out of reusable components and shared helpers.
- Avoid "god files" that combine rendering, fetching, persistence, permissions, formatting and copy.

## Component and Module Boundaries

- UI components should receive explicit props and avoid hidden global assumptions.
- Reusable components should not own Feature-specific data fetching, authorization or persistence.
- Domain or Feature modules should expose small, clear interfaces.
- Shared helpers must be genuinely shared by current code, not created for hypothetical reuse.
- Side effects should live at the correct boundary: route/action/service/hook/job, not deep inside generic UI.

## Naming

- Use names that describe product behavior, not implementation tricks.
- Keep route, component, helper, test and file names consistent with nearby code.
- Avoid vague names like \`utils\`, \`helpers\`, \`common\` or \`manager\` when a domain-specific name is available.
- Name booleans as questions or states, such as \`isReady\`, \`hasPermission\` or \`canSubmit\`.

## Error Handling

- Handle expected errors explicitly at user or system boundaries.
- Não engula erros silenciosamente.
- Keep user-facing errors actionable and aligned with Product/Design copy when the message is visible.
- Não vaze segredos, credenciais, tokens, stack traces ou dados sensíveis de cliente em UI, logs ou respostas.

## Configuration

- Keep environment-specific values in config or environment variables, not hardcoded in source.
- Never commit secrets, credentials, tokens or private customer data.
- Não hardcode cores, espaçamento, copy, regras de negócio ou valores de permissão que pertencem a Design, conteúdo, dados ou configuração.
- Prefer typed or validated config access when the repository supports it.

## Não Faça

- Não comece a partir de ideia solta, Epic não quebrada ou item vago de roadmap.
- Não invente arquitetura antes de ler padrões locais.
- Não crie novos componentes voltados ao usuário sem prontidão de Design.
- Não adapte comportamento de componente reutilizável sem confirmação de Design quando comportamento, estado, acessibilidade ou API mudarem.
- Não coloque toda a implementação em um arquivo só quando houver limites claros disponíveis.
- Não adicione dependências amplas, código gerado, estado global ou mudanças de framework sem motivo no nível da Feature.
- Não contorne testes, review ou validação porque a mudança parece pequena.

## Decisões

Record durable coding-standard changes in this file only after explicit confirmation. Feature-specific implementation lessons belong in \`implementation-notes.md\`.

## Perguntas em Aberto

- Which repository-specific folder pattern should new code follow?
- Which local lint, format, typecheck and test commands are authoritative?
- Which component/story/example surface exists for UI validation?

## Próxima Atualização

Update when the codebase adopts durable standards that future Features should follow.
`;
}
