# Progression Gates

## Purpose

Define the concrete gates that decide whether LeanOS can move from one founder progression stage to the next.

Use this file with `founder-progression-model.md`. The model explains the journey. This file names the required context, allowed next stages and blocked next stages.

## Gate Matrix

| Stage | Required Context | Allowed Next Stages | Blocked Next Stages |
| --- | --- | --- | --- |
| Setup Seed | `leanos.yaml` seed context, active Strategy routes, founder start intent | Strategy Seed, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Seed | product idea, target user guess, problem guess, value promise guess | Strategy Baseline, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Baseline | problem statement, ICP or first user segment, value proposition, alternative, riskiest assumption, business model direction, immediate focus | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Idea Calibration | MVP Delivery Decision, Product Shaping, Implementation |
| Idea Calibration | idea restated, user and problem named, fit with ICP/value checked, evidence and assumptions visible | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Strategy Baseline | MVP Delivery Decision, Product Shaping, Implementation |
| MVP Validation Scope | Business Thesis, Target User, Core Problem, Promise, MVP Slice, Success Signals, Pivot Signals, MVP Validation Sequence | MVP Delivery Decision, Product Shaping when Product Ops is active, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist | Implementation |
| MVP Delivery Decision | Product Ops active, MVP backlog or delivery scope, PRD or equivalent scope, non-goals, acceptance criteria, dependencies | Product Shaping, Delivery Readiness | Implementation before Feature readiness |
| Product Shaping | Epic exists, scope type, milestone or release goal, expected Features, readiness gaps | Delivery Readiness, Feature Shaping | Implementation |
| Delivery Readiness | Feature exists, Product Ops criteria, Engineering criteria, Design/Security/DevOps criteria satisfied or not applicable | Implementation | Launch, Learning Loop without shipped or tested output |
| Implementation | Engineering active, branch plan, implementation plan, tests or validation plan, PR readiness path | Launch, Learning Loop, Post-Merge Continuation | Scaling / Operating Cadence without usage or recurring operation |
| Launch | release or MVP is available to users, launch owner, support path, rollback or recovery plan, learning signals | Learning Loop, Scaling / Operating Cadence | Implementation without a new ready Feature |
| Learning Loop | evidence, insight, decision, roadmap or backlog impact, next learning action | Strategy Baseline, Roadmap Inicial, MVP Validation Scope, Product Shaping | Scaling / Operating Cadence without recurring usage or operating rhythm |
| Scaling / Operating Cadence | product in use, recurring feedback or operations, metrics, cadence owner, backlog/launch/learning rhythm | Learning Loop, Roadmap Inicial, Delivery Readiness | Setup Seed |

## Required Context

Before moving stages, confirm:

- the current stage is named;
- required context for the current stage exists in active files or is explicitly unknown;
- assumptions are not treated as evidence;
- the next route exists or returns `activation_required`;
- the founder has confirmed any durable file update.

## Allowed Next Stages

Allowed next stages are the only stages LeanOS may recommend without explaining a blocked gate.

When multiple next stages are allowed, choose the smallest one that answers the founder's intent:

- if context is unclear, stay in Strategy Seed or Idea Calibration;
- if the founder wants fast business validation, move to MVP Validation Scope;
- if the founder wants sequence and the product is product_operating/growth_scaling or has multiple priorities, move to Roadmap Inicial;
- if the founder chose an MVP backlog, roadmap, backlog or delivery-scope item for delivery, request Product Ops activation and move to MVP Delivery Decision.
- if the founder confirms the first MVP validation scope and wants delivery, move from MVP Validation Scope directly to Product Ops / MVP Delivery Decision.

## Blocked Next Stages

Blocked stages require a founder-friendly explanation and the missing gate.

- Do not allow Engineering before Product Ops delivery readiness.
- Do not force Roadmap between MVP Validation Scope and Product Ops delivery planning.
- Do not allow Product Ops to create delivery scope before Strategy Baseline and MVP Validation Scope or a current MVP/backlog item exist.
- Do not allow Growth launch work before there is a productized, landing-page, concierge or release surface to put in front of users.
- Do not allow GitHub sync before local delivery assets or GitHub setup readiness exist.
- Do not allow Scaling / Operating Cadence before usage, feedback, release activity or recurring operations exist.

## Activation Rules

Use `activation_required` only when:

- the requested next stage belongs to an inactive area;
- the current stage gate is satisfied;
- the founder has been told why the active Strategy files are no longer enough;
- the founder confirms activation.

Do not use `activation_required` as a substitute for missing Strategy context.

## Founder-Friendly Output

When a gate blocks progress, say:

~~~text
Ainda falta uma decisao antes desse passo.
Estamos em: <current stage>.
Falta: <missing gate>.
Proximo passo seguro: <next route or question>.
~~~
