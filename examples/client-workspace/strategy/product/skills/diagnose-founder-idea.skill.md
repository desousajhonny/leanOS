# Diagnose Founder Idea

## Purpose

Diagnose a raw founder idea into a Strategy Baseline gap, next guided question and safe next route.

## Use When

- the founder is starting LeanOS
- the product idea is raw
- the Chief needs to identify the current progression stage before roadmap or MVP validation scope

## Required Context

- ../../../leanos.yaml
- ../../../ai-standard/foundation/founder-progression-model.md
- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/business-model-canvas.md
- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Inputs

- Seed context
- Founder message
- Known product facts
- Known assumptions
- Current stage
- Open Strategy gaps

## Process

1. Read only active Strategy context.
2. Restate what is known from seed context and Product knowledge.
3. Classify the current founder progression stage.
4. Identify Strategy Baseline gaps: target user, problem, promise, alternative, riskiest assumption, immediate focus and MVP validation target.
5. Choose the smallest next guided question.
6. Recommend the next route only when the gate is satisfied.

## Checks

- The output names baseline gaps instead of asking a generic question.
- The next question is tied to one missing decision.
- Roadmap and MVP validation are recommended only after Strategy Baseline is minimally coherent.
- activation_required is used only for inactive areas after the gate permits it.

## Output

- Current progression stage
- Known context summary
- Strategy Baseline gaps
- Next guided question
- Safe next route

## Files to Update

- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/business-model-canvas.md
- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Red Lines

- Do not ask broad empty questions such as tell me more.
- Do not create roadmap, MVP delivery scope, Epics, Features or implementation work.
- Do not activate Operations, Growth or GitHub from founder diagnosis.
