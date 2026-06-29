export function designComponentInventoryKnowledge(): string {
  return `# Component Inventory

## Propósito

Track reusable UI components that Design has approved, planned or identified as gaps.

This is not código-fonte. It is a lightweight Design catalog that helps the model decide whether a Feature can reuse an existing component, adapt one or needs a new component specification before Engineering starts.

## How To Use

- Check this file before asking Engineering to create or modify user-facing UI.
- Keep entries short and link to a component spec when one exists.
- Mark components as approved, planned, needs-spec, deprecated or unknown.
- Não invente componentes apenas para facilitar implementação.

## Component List

| Component | Status | Purpose | Used In | Spec | Notes |
| --- | --- | --- | --- | --- | --- |
| TBD | unknown | TBD | TBD | TBD | TBD |

## Lacunas Conhecidas

| Gap | Needed For | Why It Matters | Next Step |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Reuse Rules

- Reuse an approved component when it satisfies the Feature behavior, states and accessibility needs.
- Adapt an existing component only when the change improves the reusable component without breaking existing usage.
- Create a new component only when reuse or adaptation would create unclear behavior, accessibility risk or brittle composition.
- If a new component is needed, create or request a component spec before Engineering implements it.

## Perguntas em Aberto

TBD
`;
}
