# Component Implementation

## Purpose

Implement a reusable component from an approved Design spec before the screen or Feature that depends on it.

## Inputs

- Feature or GitHub Feature issue
- Approved Design component spec
- Design component inventory
- Design system
- Accessibility baseline
- Engineering component guidelines
- Code standards
- Testing strategy
- Skill: implement-component

## Process

1. Use this as the component step of `engineering-delivery.playbook.md`; return to engineering-delivery before implementing the dependent screen or Feature
2. Read Engineering AGENT and choose the Senior Developer role
3. Read the Feature and confirm that a reusable component is required
4. Load the Design component spec before changing code
5. Load `../../design/knowledge/component-inventory.md`, `../../design/knowledge/design-system.md` and `../../design/knowledge/accessibility.md`
6. Load `knowledge/component-guidelines.md`, `knowledge/code-standards.md` and `knowledge/testing-strategy.md`
7. Use `skills/implement-component.skill.md` to plan component implementation
8. Inspect existing component patterns before creating a new file
9. Create or confirm a Feature-linked branch before editing code
10. Implement the reusable component before the screen or Feature that consumes it
11. Validate required states, keyboard behavior, focus behavior and accessibility notes
12. Add tests, examples, stories or manual validation notes when the repository supports them
13. Summarize component readiness before continuing to the dependent screen or Feature

## Output

- Component implementation plan
- Branch used
- Files changed
- States implemented
- Accessibility validation
- Tests or manual validation
- Known gaps
- Decision to continue to screen or Feature implementation

## Files to Update

- Update `../knowledge/implementation-notes.md` when component implementation decisions should persist.
- Do not update Design component specs unless routed back to Design and confirmed by the user.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
