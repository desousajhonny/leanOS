export function engineeringComponentGuidelinesKnowledge(): string {
  return `# Component Guidelines

## Propósito

Define how Engineering should create, reuse and modify UI components.

## Estado Atual

Component work is implementation work, but the component contract belongs to Design.

Engineering should implement a reusable component only when the Feature requires it and Design has confirmed the structure, behavior, states and accessibility expectations.

## Design Dependency

- Read the approved Design component spec before implementing a new user-facing component.
- If no spec exists and the Feature needs a new or adapted component, route back to Design component readiness before branch/code.
- Use \`../../design/knowledge/component-inventory.md\` to confirm whether a component already exists, is planned or needs a spec.
- Use \`../../design/knowledge/design-system.md\` and \`../../design/knowledge/accessibility.md\` as the baseline for visual and accessibility decisions.
- Não substitua decisões de Design por escolhas improvisadas de UI no código.

## Reuse Existing Components

- Prefer an approved existing component when it satisfies the Feature.
- Adapt an existing component only when the change preserves current usage and Design confirms the adaptation.
- Create a new component only when reuse/adaptation is insufficient and the component spec is approved.
- If a component appears duplicated, stop and explain the reuse conflict before coding.

## Component Boundaries

- Implement reusable component behavior before the screen or Feature that consumes it.
- Keep reusable component behavior separate from one-off screen workflow logic.
- Keep data fetching, persistence, permissions and business rules outside the reusable UI component when practical.
- Keep component APIs small, explicit and aligned with existing repository patterns.

## State and Effects

- Validate required states before moving to the dependent screen or Feature.
- Cover default, loading, empty, error, success, disabled and focus states when applicable.
- Keep side effects predictable and local to the correct layer.
- Não esconda estados ausentes atrás de fallback genérico de UI.

## Styling

- Use Design tokens, theme utilities or existing styling conventions before adding new values.
- Não hardcode cores, espaçamento, tipografia ou copy que deveriam vir de Design, tokens, dados ou configuração.
- Keep styling composable and consistent with nearby components.

## Accessibility States

- Validate keyboard navigation and focus behavior for interactive components.
- Respect labels, descriptions, error messages and screen reader notes from the component spec.
- Confirm contrast and disabled/loading/error states when applicable.
- Não entregue componente que prende foco, esconde estado essencial ou depende apenas de cor.

## Não Faça

- Não crie um novo componente voltado ao usuário sem uma especificação de Design or explicit Design confirmation.
- Não implemente uma tela primeiro quando um componente reutilizável deve ser construído antes.
- Não misture lógica pontual de Feature em um componente reutilizável quando um limite limpo for prático.
- Não contorne testes, exemplos, stories ou notas de validação manual para estados e acessibilidade.

## Decisões

- Component implementation decisions may be recorded in \`implementation-notes.md\` after confirmation.
- Design specs and component inventory are Design-owned; route back to Design before changing them.

## Perguntas em Aberto

- Which repository pattern should new reusable components follow?
- Which validation surface exists in this repo: tests, Storybook, examples, screenshots or manual QA?
- Does this Feature need a reusable component or a one-off screen pattern?

## Próxima Atualização

Update this file only when the framework-level Engineering component rules change.
`;
}
