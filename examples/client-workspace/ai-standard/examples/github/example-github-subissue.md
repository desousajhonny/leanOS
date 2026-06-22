# Build patient intake form flow

## Parent Epic

- Epic: #123 Guided clinic intake MVP
- Milestone: MVP Alpha
- Roadmap item: MVP Intake Flow

## Purpose

Create the first patient-facing flow for collecting intake information.

## Scope

Implement start, question flow, review and submitted states.

## Non-goals

- Staff review dashboard
- Diagnosis
- Insurance processing

## Product Criteria

- User value: patient can submit intake before appointment
- Acceptance criteria: patient can complete and review all required fields
- Success or learning signal: test users complete the flow without assistance

## Design Criteria

- Flow: appointment link -> intake questions -> review -> submitted
- Screens or states: start, step, validation error, review, success
- UX constraints: clear progress and plain-language questions
- Accessibility: labeled inputs and keyboard navigation

## Engineering Criteria

- Suggested area: operations/engineering
- Technical notes: persist draft state locally or server-side based on selected stack
- Dependencies: product field list and validation rules
- Test expectations: validation, navigation and submit tests

## Security Criteria

- Data: patient-provided personal information
- Permissions: no staff-only data exposed to patient
- Privacy: no sensitive data in analytics events

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied
- [ ] Engineering criteria satisfied
- [ ] Security criteria satisfied
- [ ] Tests or validation plan defined
