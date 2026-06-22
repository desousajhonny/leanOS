# Accessibility

## Purpose

Define accessibility expectations based on the MVP audience, context and product constraints.

## Use When

- accessibility baseline, keyboard navigation, focus, contrast, forms, errors or screen-reader implications are involved

## Required Context

- MVP audience
- User-flow knowledge
- Design-system knowledge
- Accessibility knowledge

## Inputs

- Target user context
- Core flows
- UI states
- Forms and errors
- Motion or interaction patterns

## Process

1. Use WCAG 2.2 AA as the baseline
2. Review keyboard navigation
3. Review focus states
4. Review color contrast
5. Review labels and instructions
6. Review error identification
7. Review screen-reader implications
8. Review reduced-motion needs
9. Identify when human accessibility review is required

## Checks

- Keyboard-only users can complete critical flows
- Focus order is logical
- Contrast intent is sufficient
- Forms and errors are identifiable
- Screen-reader implications are noted

## Output

- Accessibility baseline
- WCAG 2.2 AA notes
- Keyboard and focus notes
- Contrast notes
- Form and error notes
- Screen-reader notes
- Human review requirement

## Files to Update

- Update `../knowledge/accessibility.md` only after explicit confirmation.

## Red Lines

- Do not claim full accessibility compliance without expert validation
- Do not waive accessibility without a documented reason
- Ask for human accessibility review when risk is high.
