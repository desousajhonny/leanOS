export function componentSpecTemplate(): string {
  return `# Component Spec: <component-name>

Use this template when a Feature needs a reusable UI component that is not already approved in the Design component inventory.

This file is owned by Design. Engineering uses it as an implementation contract.

## Status

- Status: draft / approved / needs-review / deprecated
- Owner: Design
- Related Feature:
- Related Epic:
- Last Updated:

## Purpose

Explain what this component does and what user problem it helps solve.

## When To Use

- Use when...
- Use when...

## When Not To Use

- Do not use when...
- Do not use when...

## Anatomy

List the visible and structural parts of the component.

- Container:
- Header/title:
- Primary content:
- Actions:
- Supporting text:
- Feedback area:

## Variants

| Variant | Purpose | When To Use | Notes |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |

## States

| State | Expected Behavior | UX Copy | Accessibility Notes |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |
| Hover | TBD | TBD | TBD |
| Focus | TBD | TBD | TBD |
| Disabled | TBD | TBD | TBD |
| Loading | TBD | TBD | TBD |
| Empty | TBD | TBD | TBD |
| Error | TBD | TBD | TBD |
| Success | TBD | TBD | TBD |

## Behavior

- Interaction:
- Validation:
- Data loading:
- Error handling:
- Responsive behavior:

## Accessibility

- Keyboard behavior:
- Focus order:
- ARIA/semantic requirements:
- Contrast requirements:
- Screen reader notes:
- Reduced motion notes:

## Content Rules

- Labels:
- Helper text:
- Empty state:
- Error messages:
- Success messages:
- Copy red lines:

## Design Tokens

- Typography:
- Color intent:
- Spacing:
- Radius:
- Border:
- Shadow:
- Motion:

## Composition Rules

- Can contain:
- Can be contained by:
- Should not be nested with:
- Maximum recommended complexity:
- Reuse guidance:

## Engineering Notes

- Expected props or inputs:
- Data dependencies:
- Events/callbacks:
- Testing expectations:
- Performance concerns:
- Existing patterns to follow:

## Do Not Do

- Do not hardcode product copy that should come from Feature context.
- Do not hardcode colors outside the Design token intent.
- Do not create a one-off component when this should be reusable.
- Do not skip keyboard, focus, loading, empty or error states when applicable.

## Open Questions

- TBD
`;
}
