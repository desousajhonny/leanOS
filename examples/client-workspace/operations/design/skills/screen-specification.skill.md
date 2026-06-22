# Screen Specification

## Purpose

Define screen purpose, content, states, interactions and engineering handoff notes when a concrete screen exists.

## Use When

- a concrete screen, view, form, modal or page needs definition
- Engineering needs implementation-ready UI details

## Required Context

- Product brief
- MVP scope
- User-flow knowledge
- Design-system knowledge
- Accessibility knowledge

## Inputs

- Screen purpose
- User goal
- Required content
- Primary and secondary actions
- Validation rules
- Known constraints

## Process

1. Define screen purpose
2. Define user goal
3. Structure content
4. Define primary and secondary actions
5. Define validation and errors
6. Define default, loading, empty, error, success and edge-case states
7. Add accessibility notes
8. Add engineering handoff notes

## Checks

- Every screen state has a user outcome
- Errors are actionable
- The screen maps to an MVP flow
- Engineering handoff notes avoid visual ambiguity

## Output

- Screen purpose
- Content structure
- Actions
- Validation and error rules
- Default/loading/empty/error/success states
- Accessibility notes
- Engineering handoff notes

## Files to Update

- Do not create screen-specific files until a concrete feature or screen requires them.
- Update issue or implementation notes only after confirmation.

## Red Lines

- Do not invent screens without a concrete feature or flow
- Do not skip loading, empty, error or success states when they are relevant.
