# Screen Spec Template Plan

This document is internal to the LeanOS framework. It should not be generated into the client workspace yet.

## Purpose

Plan the future `screen-spec-template.md` so Design can document concrete screens before Engineering implements them.

Screen specs are different from component specs:

- Component spec: reusable UI part, such as table, import panel, modal or status badge.
- Screen spec: concrete screen or view that composes components, content, actions, states and rules.

## Proposed Location

Future template:

`ai-standard/templates/design/screen-spec-template.md`

Future concrete specs:

`operations/design/knowledge/screens/<screen-name>.md`

Do not create `screens/` or concrete screen specs in the initial scaffold until a real Feature requires them.

## When To Create A Screen Spec

Create a screen spec only when:

- a real Feature requires a concrete screen, page, view, modal or flow step;
- Product Ops has confirmed Feature context and acceptance criteria;
- Design foundation and accessibility baseline exist or are explicitly enough for the Feature;
- required component specs are known, reused or planned;
- the founder confirms the Design step.

## Suggested Template Sections

The future template should include:

- `# <Screen Name>`
- `## Purpose`
- `## User Goal`
- `## Entry Points`
- `## Layout Structure`
- `## Required Components`
- `## Primary Actions`
- `## Secondary Actions`
- `## Content Rules`
- `## Data Rules`
- `## States`
- `## Validation And Errors`
- `## Accessibility`
- `## Responsive Behavior`
- `## Analytics Or Events`
- `## Engineering Handoff`
- `## Do Not Do`
- `## Open Questions`

## Required States

Screen specs should consider these when applicable:

- default
- loading
- empty
- error
- success
- disabled
- permission denied
- partial data
- offline or network failure

## Design To Engineering Flow

1. Product Ops confirms the Feature.
2. Design checks component readiness.
3. Design creates or confirms component specs when needed.
4. Design creates the screen spec only when the screen is concrete enough.
5. Engineering implements required reusable components first.
6. Engineering implements the screen using approved components and screen spec.
7. PR review checks implementation against Feature, component specs and screen spec.

## Do Not Do

- Do not create screen specs for vague ideas, roadmap items or unsplit Epics.
- Do not use screen specs as product requirements.
- Do not let a screen spec bypass Product Ops readiness.
- Do not let Engineering invent layout, copy, component behavior or states that Design has not defined or confirmed.
- Do not create a full screen-spec system before real Feature delivery needs it.

## Future Implementation Notes

When this becomes part of the scaffold, update:

- `ai-standard/templates/design/README.md`
- `operations/design/knowledge/README.md`
- `operations/design/skills/screen-specification.skill.md`
- `operations/design/playbooks/component-readiness.playbook.md` or a future screen-readiness playbook
- `operations/workflows/feature-to-delivery-cycle.workflow.md`
- `operations/engineering/knowledge/component-guidelines.md`
- generator validation for no speculative screen specs in initial scaffold
