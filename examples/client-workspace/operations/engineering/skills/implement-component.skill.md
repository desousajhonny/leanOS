# Implement Component

## Purpose

Implement reusable UI components from a Design component spec before dependent screen or Feature work.

## Use When

- a Feature requires a new user-facing component
- Design has produced or confirmed a component spec
- a screen depends on a reusable component that does not exist yet
- component behavior, states or accessibility must be implemented before feature delivery

## Required Context

- Feature or GitHub Feature issue
- Design component spec
- Design component inventory
- Design system
- Accessibility baseline
- Engineering component guidelines
- Code standards
- Testing strategy

## Inputs

- Approved component spec
- Parent Feature acceptance criteria
- Existing component patterns
- Design tokens
- Accessibility requirements
- Expected states
- Repository UI conventions

## Process

1. Read the Feature and confirm why the component is needed
2. Read the component spec from Design before changing code
3. Check `../../design/knowledge/component-inventory.md` and nearby code for an existing reusable component
4. Load `../../design/knowledge/design-system.md`, `../../design/knowledge/accessibility.md` and `../knowledge/component-guidelines.md`
5. Implement the reusable component before the screen or Feature that consumes it
6. Keep styling, copy, variants, states and accessibility aligned with the Design contract
7. Separate reusable component behavior from one-off screen logic
8. Add tests, examples, stories or manual validation notes when the repository supports them

## Checks

- Component follows the Design spec
- Design tokens and accessibility requirements are respected
- No duplicate component already exists
- Component is reusable and composable
- Required states are handled
- Feature-specific workflow logic is kept outside the reusable component
- Tests or validation gaps are explicit

## Output

- Component implementation plan
- Files changed
- States covered
- Accessibility notes
- Tests or manual validation
- Known gaps
- Next screen or Feature implementation step

## Files to Update

- Update `../knowledge/implementation-notes.md` when component implementation decisions should persist.
- Do not update Design component specs unless routed back to Design and confirmed by the user.

## Red Lines

- Do not implement a new user-facing component without a Design spec or explicit Design confirmation
- Do not hardcode colors, spacing, copy, business rules or states that belong in Design, data or configuration
- Do not mix reusable component code with one-off screen behavior when separation is practical
- Do not bypass accessibility states, keyboard behavior or focus requirements.
