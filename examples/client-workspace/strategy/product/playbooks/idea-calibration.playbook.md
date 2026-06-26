# Idea Calibration

## Purpose

Calibrate any founder idea against the current business stage, from first seed idea to product-operating change, without jumping into roadmap, MVP backlog or implementation.

## Inputs

- ../../../leanos.yaml
- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/positioning.md
- ../knowledge/validation-notes.md
- ../../business/knowledge/business-model-canvas.md

## Process

1. Load the Product AGENT and choose Product Strategist or Product Manager.
2. Use `skills/map-business-baseline/SKILL.md` first to read `leanos.yaml`, active Strategy context, business stage and Strategy Baseline gaps.
3. Choose the calibration path from the business stage: `seed` or `strategy_forming` builds baseline; `mvp_shaping` compares against MVP Validation Scope; `mvp_building` protects current delivery focus; `mvp_live_learning` checks learning signals; `product_operating` and `growth_scaling` evaluate fit with existing product, customers, roadmap, risks and timing.
4. Ask only the discovery questions needed to mature the idea for the current business stage.
5. Use `skills/define-product-core/SKILL.md` when there is enough signal to consolidate product, primary user, core problem, promise, differentiation and riskiest assumption.
6. Evaluate fit, assumptions, evidence, MVP impact and roadmap impact inside this playbook when the idea affects an existing MVP, product, roadmap, customer signal or operating cadence.
7. Route pricing, revenue, channel or delivery-model decisions to `../../business/skills/define-business-model/SKILL.md` only when they block the Product decision.
8. Separate facts, assumptions, open questions and founder decisions.
9. Present the calibrated idea with current business-stage reading, Product Core, fit assessment and smallest safe next route.
10. Ask the founder to confirm, correct or keep calibrating before writing knowledge files.
11. After confirmation, choose the bridge by business stage: `seed`, `strategy_forming` or `mvp_shaping` -> `playbooks/mvp-validation-scope.playbook.md`; `mvp_building` or `mvp_live_learning` -> `activation_required: operations.product-ops`; `product_operating` or `growth_scaling` -> `../../roadmap/playbooks/roadmap-cycle-planning.playbook.md`. Use a validation note when the idea is not ready. Do not create roadmap, Epics, Features or delivery scope here.

## Guided Conversation

Use `../../../ai-standard/foundation/guided-conversation.md`.

- Ask one useful question at a time, tied to the biggest Strategy Baseline or fit gap for the current business stage.
- Avoid interview fatigue; do not force every skill when the idea is already clear enough.
- Do not treat every new idea as MVP when the business is already building, validating, operating or scaling.
- Use numbered choices only when they make the founder's decision easier.
- Let the founder answer with a number or free-form text.
- End with a clear confirmation question before file updates.

Do not ask a rigid questionnaire. Ask only what is missing.

## Output

- Current business-stage reading
- Calibrated idea summary
- Fit assessment
- Strategy Baseline proposal or product-fit recommendation
- Known facts
- Assumptions
- Open questions
- Recommended next route

## Files to Update

- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/positioning.md
- ../knowledge/validation-notes.md

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
