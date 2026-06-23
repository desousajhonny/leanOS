# Epic: Guided clinic intake MVP

## Outcome

Clinic owners can capture structured patient intake before the appointment.

## Strategic Context

- Product: Clinic Assistant AI
- ICP: small clinic owners
- Problem: front-desk intake is slow and inconsistent
- Value proposition: reduce manual intake work before appointments
- Validation assumption: clinics will trust guided AI intake for low-risk cases
- Evidence status: assumption

## Delivery Scope Linkage

- scope_type: MVP
- milestone: MVP Alpha
- release_goal: validate the guided intake flow, intake summary and staff review
- Non-goals: insurance automation, diagnosis, clinical decision-making
- Acceptance criteria: staff can review and edit the intake summary
- Roadmap item: MVP Intake Flow
- Milestone: MVP Alpha

## Product Criteria

- User value: less front-desk time
- Jobs to be done: capture intake information before visit
- Acceptance criteria: intake summary is understandable and editable
- Learning signal: at least 5 clinics complete test intake sessions

## Design Criteria

- User flow: patient starts from appointment link and submits intake
- Screens or states: start, question flow, review, submitted
- UX constraints: simple language, progress indication, error recovery
- Accessibility considerations: keyboard navigation and readable form labels

## Engineering Criteria

- Technical approach: form flow with persisted draft state
- System boundaries: patient intake and staff review only
- Test expectations: form validation and summary generation tests

## Security Criteria

- Data involved: patient-provided personal information
- Auth or permissions: staff-only review
- Privacy considerations: avoid exposing intake data in logs
- Abuse cases: spam submissions

## Sub-issue Breakdown

- Status: ready_for_breakdown
- Expected features: intake form, draft persistence, staff review, security controls
- Open questions: retention policy
