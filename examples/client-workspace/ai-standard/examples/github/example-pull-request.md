# Add patient intake form flow

## Summary

Adds the initial patient intake form flow with required field validation and review state.

## Linked Issue

Closes #554

## Parent Epic

Epic #123

## LeanOS Context

- Department: Operations
- Area: Engineering
- Role: Senior Developer
- Skills: plan-implementation, create-pr
- Playbook: prepare-pr

## Product / Delivery Scope Alignment

- Roadmap item: MVP Intake Flow
- Delivery scope: guided intake flow
- Acceptance criteria: patient can complete and review required fields
- Validation or learning impact: enables first usability test

## Design Notes

Uses the current Design foundation for form labels, spacing and focus behavior.

## Security Notes

Avoids logging intake field values.

## Tests

- [x] Form validation tests
- [x] Manual keyboard navigation check

## Founder Testing Guide

### What Changed

Patients can now complete the first intake form flow, review answers and submit the intake.

### Where to Test

- Preview URL: use the PR preview URL when available
- Local route or screen: /intake
- Test account or data: use a test patient profile only

### How to Test

1. Open the intake route.
2. Complete the required questions.
3. Try submitting with one required answer missing.
4. Review the answers.
5. Submit the form.

### Expected Result

The founder should see validation for missing required answers, a review state and a final submitted state without exposing intake data in logs.

### Out of Scope

Staff review dashboard and diagnosis are not included in this PR.

### Known Risks or Limits

Question order still needs usability validation.

## Risks

- Scope risk: staff review remains separate
- Technical risk: persistence strategy may change
- Product risk: question order still needs user validation
- Security risk: retention policy is still open
