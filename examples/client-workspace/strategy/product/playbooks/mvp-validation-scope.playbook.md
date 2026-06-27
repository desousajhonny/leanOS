---
name: mvp-validation-scope
description: Use when mvp validation scope is required for the active request
---

# MVP Validation Scope

## Purpose

Turn a confirmed Strategy Baseline into the smallest MVP validation scope before Product Ops delivery planning.

## When to Use

- Use when this execution sequence matches the active request.

## Before Acting

- `../AGENT.md`
- `../area.yaml`

## Inputs

- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../../business/knowledge/business-model-canvas.md
- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Process

1. Load the confirmed Strategy Baseline from Product knowledge.
2. Use `skills/mvp-validation-scope/SKILL.md` to identify the first business thesis to validate.
3. Choose the smallest validation artifact: product slice, landing page, manual/concierge workflow, prototype or simple automation.
4. Separate In Scope, Out of Scope, Manual / Concierge Parts and Productized Parts.
5. Define Success Signals and Pivot Signals.
6. Draft the MVP Validation Sequence without creating roadmap, Epics, Features, GitHub issues or implementation work.
7. Use `skills/coherence/SKILL.md` before proposing file updates.
8. Ask the founder to confirm the MVP validation scope before writing.
9. After confirmation, offer the handoff to Product Ops when the founder wants delivery scope or Epic planning.

## Guided Conversation

Use `../../../ai-standard/foundation/guided-conversation.md`.

- Start by restating the confirmed Strategy Baseline.
- Ask only for missing constraints or validation choices.
- When the founder wants speed, prefer the smallest artifact that can teach the business something real.
- Make the handoff explicit: Strategy validates what should be tried; Product Ops turns confirmed scope into delivery work.

Do not ask a rigid questionnaire. Ask only what is missing.

## Stop Conditions

- Stop and ask for confirmation before changing security-sensitive files.

## Acceptance Criteria & Outputs

- MVP Validation Scope
- Business thesis
- MVP slice
- Success signals
- Pivot signals
- MVP Validation Sequence
- Product Ops handoff recommendation

## Files to Update

- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Red Lines

- Do not duplicate a workflow.
- Do not duplicate skills.
- Do not invent missing context.
- Do not update files without explicit confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
