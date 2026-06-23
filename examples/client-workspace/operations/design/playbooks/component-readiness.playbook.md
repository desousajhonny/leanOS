# Component Readiness

## Purpose

Prepare a Design component decision or component spec when a Feature needs UI/component clarity before Engineering.

## When to Use

- Use when this execution sequence matches the active request.

## Before Acting

- `../AGENT.md`
- `../area.yaml`

## Inputs

- Feature or GitHub Feature issue
- Parent Epic when available
- Design system knowledge
- Accessibility knowledge
- User-flow knowledge
- Component inventory
- Template: ../../../ai-standard/templates/design/component-spec-template.md
- Skill: component-analysis

## Steps

1. Read the Feature goal, acceptance criteria and UI impact.
2. Read `../knowledge/design-system.md`, `../knowledge/accessibility.md`, `../knowledge/user-flows.md` and `../knowledge/component-inventory.md`.
3. Use `skills/component-analysis.skill.md` to classify reuse, adapt, create-new, not-applicable or blocked.
4. If reuse is enough, document the chosen component and usage notes.
5. If adaptation is needed, define what changes and who must approve them.
6. If a new component is needed, use `../../../ai-standard/templates/design/component-spec-template.md` to draft the component contract.
7. Update `../knowledge/component-inventory.md` after confirmation.
8. Return the Design readiness result to Product Ops and Engineering.

## Security Gate

- Stop if accessibility, focus, keyboard behavior, contrast or error-state risk is unclear for a new user-facing component.
- Stop if the component would collect, display or modify sensitive user data and Security has not reviewed the relevant risk.

## Output

- Component readiness result
- Reuse/adapt/create-new decision
- Component spec draft when required
- Inventory update proposal
- Engineering handoff notes
- Blocking gaps

## Files to Update

- Update `../knowledge/component-inventory.md` only after explicit confirmation.
- Create or update `../knowledge/components/<component-name>.md` only for a real Feature after confirmation.

## Stop Conditions

- Stop if the Feature is hypothetical or not tied to a real delivery need.
- Stop if a new component is needed but the component spec cannot be drafted from available Product, Design and accessibility context.
- Stop before Engineering if the component decision is blocked or missing founder confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
