export function designComponentSpecsReadme(): string {
  return `# Component Specs

## Propósito

Store concrete Design component specifications created for real Features.

This folder is intentionally empty in the initial scaffold except for this README. Não crie especificações especulativas de componente.

## When To Create A Spec

Create \`<component-name>.md\` only when:

- a real Feature needs a new or adapted reusable component;
- Product Ops has confirmed the Feature context;
- Design has enough product, user-flow, design-system and accessibility context;
- the founder confirms the component readiness work.

## Naming

- Use kebab-case: \`customer-table.md\`, \`csv-import-panel.md\`, \`billing-status-badge.md\`.
- Name the component by reusable purpose, not by one screen.
- Link the spec from \`../component-inventory.md\`.

## Required Template

Use:

\`../../../../.leanos/standard/templates/design/component-spec-template.md\`

## Não Faça

- Não armazene código-fonte aqui.
- Não crie especificações para componentes futuros hipotéticos.
- Não deixe Engineering implementar um novo componente voltado ao usuário a partir de notas que não são uma especificação de componente.
- Não duplique uma especificação de componente quando um componente aprovado puder ser reutilizado ou adaptado.
`;
}
