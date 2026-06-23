# Component Guidelines

## Purpose

Define how Engineering should create, reuse and modify UI components.

## Current State

Component work is implementation work, but the component contract belongs to Design.

Engineering should implement a reusable component only when the Feature requires it and Design has confirmed the structure, behavior, states and accessibility expectations.

## Design Dependency

- Read the approved Design component spec before implementing a new user-facing component.
- If no spec exists and the Feature needs a new or adapted component, route back to Design component readiness before branch/code.
- Use `../../design/knowledge/component-inventory.md` to confirm whether a component already exists, is planned or needs a spec.
- Use `../../design/knowledge/design-system.md` and `../../design/knowledge/accessibility.md` as the baseline for visual and accessibility decisions.
- Do not replace Design decisions with improvised UI choices in code.

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
- Do not hide missing states behind generic fallback UI.

## Styling

- Use Design tokens, theme utilities or existing styling conventions before adding new values.
- Do not hardcode colors, spacing, typography or copy that should come from Design, tokens, data or configuration.
- Keep styling composable and consistent with nearby components.

## Accessibility States

- Validate keyboard navigation and focus behavior for interactive components.
- Respect labels, descriptions, error messages and screen reader notes from the component spec.
- Confirm contrast and disabled/loading/error states when applicable.
- Do not ship a component that traps focus, hides essential state or relies only on color.

## Do Not Do

- Do not create a new user-facing component without a Design spec or explicit Design confirmation.
- Do not implement a screen first when a reusable component must be built first.
- Do not mix one-off Feature logic into a reusable component when a clean boundary is practical.
- Do not bypass tests, examples, stories or manual validation notes for states and accessibility.

## Decisions

- Component implementation decisions may be recorded in `implementation-notes.md` after confirmation.
- Design specs and component inventory are Design-owned; route back to Design before changing them.

## Open Questions

- Which repository pattern should new reusable components follow?
- Which validation surface exists in this repo: tests, Storybook, examples, screenshots or manual QA?
- Does this Feature need a reusable component or a one-off screen pattern?

## Next Update

Update this file only when the framework-level Engineering component rules change.
