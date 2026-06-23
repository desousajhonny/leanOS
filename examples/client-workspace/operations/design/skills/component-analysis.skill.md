# Component Analysis

## Purpose

Decide whether a Feature can reuse an existing component, adapt one or needs a new Design-owned component specification before Engineering starts.

## Use When

- a Feature affects UI, reusable components, tables, forms, cards, navigation, panels, modals or repeated interface patterns
- Engineering may need a component before implementing a screen or Feature

## Required Context

- Feature or GitHub Feature issue
- Parent Epic when available
- Design system knowledge
- Accessibility knowledge
- User-flow knowledge
- Component inventory
- Component spec template

## Inputs

- Feature goal
- Required UI behavior
- Known screens or flows
- Existing component inventory
- Design-system constraints
- Accessibility needs

## Process

1. Identify the UI surface involved in the Feature
2. Check `../knowledge/component-inventory.md` for an approved or planned component
3. Classify the decision as reuse, adapt, create-new, not-applicable or blocked
4. If reuse is possible, name the component and any usage constraints
5. If adaptation is needed, explain whether the change belongs in the reusable component or only in this Feature
6. If a new component is needed, require a component spec before Engineering starts
7. Use `../../../ai-standard/templates/design/component-spec-template.md` when drafting a new component contract

## Checks

- Do not create a new component when an approved one satisfies the need
- Do not adapt a component in a way that breaks existing usage
- Do not send Engineering to code a new user-facing component without a Design component spec
- Design and accessibility requirements are explicit before implementation

## Output

- Component decision: reuse, adapt, create-new, not-applicable or blocked
- Recommended component
- Required component spec
- Accessibility notes
- Engineering handoff notes
- Open questions

## Files to Update

- Update `../knowledge/component-inventory.md` only after explicit confirmation.
- Create or update a concrete component spec only when a real Feature requires it and the user confirms.

## Red Lines

- Do not invent component availability
- Do not create component specs for hypothetical future UI
- Do not let Engineering implement a new user-facing component from vague design notes.
