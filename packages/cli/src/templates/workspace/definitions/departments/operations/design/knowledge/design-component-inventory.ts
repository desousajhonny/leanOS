export function designComponentInventoryKnowledge(): string {
  return `# Component Inventory

## Propósito

Track reusable UI components that Design has specified, planned, implemented or identified as gaps.

This is not código-fonte. It is a lightweight Design catalog that helps the model decide whether a Feature can reuse an existing component, adapt one or needs a new component specification before Engineering starts.

## How To Use

- Check this file before asking Engineering to create or modify user-facing UI.
- Keep entries short and link to a component spec when one exists.
- Mark components as specified, planned, implemented, available, needs-spec, deprecated or unknown.
- Specified is not implemented. A component can be ready for Engineering without being available in code.
- Post-merge updates mark components as implemented/available only after the PR ships and the code path is known.
- Promote reusable component specs to \`operations/design/knowledge/components/<component-slug>.md\` only when Design confirms the component should outlive one Feature.
- Não invente componentes apenas para facilitar implementação.

## Component List

| Component | Status | Purpose | Used In | Spec | Code Path | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | unknown | TBD | TBD | TBD | TBD | TBD |

## Status Semantics

- \`needs-spec\`: Feature precisa do componente, mas Design ainda não especificou.
- \`specified\`: Design criou spec aprovada no implementation packet; Engineering ainda não implementou.
- \`planned\`: componente provável, mas ainda não pronto para Engineering.
- \`implemented\`: código existe em branch ou PR, mas disponibilidade depende de merge/release.
- \`available\`: componente mergeado e reutilizável em código.
- \`deprecated\`: componente não deve ser usado em novas Features.
- \`unknown\`: status não confirmado.

## Lacunas Conhecidas

| Gap | Needed For | Why It Matters | Next Step |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Reuse Rules

- Reuse an approved component when it satisfies the Feature behavior, states and accessibility needs.
- Adapt an existing component only when the change improves the reusable component without breaking existing usage.
- Create a new component only when reuse or adaptation would create unclear behavior, accessibility risk or brittle composition.
- If a new component is needed, create or request a component spec in the Feature implementation packet before Engineering implements it.
- Do not mark a component as \`available\` until post-merge confirms code path, tests or validation and PR/reference.

## Post-Merge Update

When a component ships, post-merge-continuation should update this inventory with:

- status: \`implemented\` or \`available\`;
- code path;
- first Feature or PR reference;
- tests, stories, screenshots or validation evidence;
- any reuse constraints.

## Durable Component Promotion

Promote reusable component specs from a Feature implementation packet to:

\`operations/design/knowledge/components/<component-slug>.md\`

Promotion should happen only when:

- the component is expected to be reused beyond one Feature;
- Design confirms the component's usage, variants, states, usability tips and Do / Don't guidance;
- token usage aligns with \`design-system.md\`;
- product behavior aligns with \`product-ui-spec.md\`;
- Engineering can point to a code path, PR/reference and validation evidence.

After promotion, update the Component List with the durable spec path and code path.

## Perguntas em Aberto

TBD
`;
}
