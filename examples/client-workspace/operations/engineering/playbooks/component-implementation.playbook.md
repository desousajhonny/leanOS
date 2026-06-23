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

1. Read Engineering AGENT and choose the Senior Developer role
2. Read the Feature and confirm that a reusable component is required
3. Load the Design component spec before changing code
4. Load `../../design/knowledge/component-inventory.md`, `../../design/knowledge/design-system.md` and `../../design/knowledge/accessibility.md`
5. Load `knowledge/component-guidelines.md`, `knowledge/code-standards.md` and `knowledge/testing-strategy.md`
6. Use `skills/implement-component.skill.md` to plan component implementation
7. Inspect existing component patterns before creating a new file
8. Create or confirm an issue-linked branch before editing code
9. Implement the reusable component before the screen or Feature that consumes it
10. Validate required states, keyboard behavior, focus behavior and accessibility notes
11. Add tests, examples, stories or manual validation notes when the repository supports them
12. Summarize component readiness before continuing to the dependent screen or Feature

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
