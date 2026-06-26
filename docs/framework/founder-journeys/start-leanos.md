# Journey: Start LeanOS

This journey designs how LeanOS should handle a founder saying:

```text
"Vamos comecar."
```

The purpose is not to build a full MVP, roadmap or delivery plan immediately. The purpose is to diagnose the founder's current stage, build the minimum Strategy Baseline and identify the next safe route.

## Human Overview

- **Trigger:** founder wants to start, restart or understand where to begin.
- **Goal:** turn seed context into a clear Strategy Baseline gap and one guided next question.
- **Starts at:** root `AGENT.md`.
- **Passes through:** `strategy/AGENT.md`, `strategy/workflows/founder-diagnosis.workflow.md`, Product Strategist and Product Strategy playbook.
- **Ends with:** confirmed Strategy knowledge updates or a next route such as `new-idea-intake`, MVP Validation Scope or `idea-to-roadmap`.
- **Does not do:** create roadmap items, define MVP delivery scope, create Epics/Features, activate Operations/Growth or start implementation.

## Flow Diagram

```mermaid
flowchart TD
  A["Founder: vamos comecar"]
  B["Root AGENT.md"]
  C["Read leanos.yaml + active indexes"]
  D["Strategy AGENT"]
  E["founder-diagnosis workflow"]
  F["Product Strategist"]
  G["diagnose-founder-idea skill"]
  H["Product Strategy playbook"]
  I{"Strategy Baseline ready?"}
  J["Ask one guided question"]
  K["Propose Strategy updates"]
  L["Handoff: new-idea-intake / MVP Validation Scope / idea-to-roadmap"]
  M["Stop without writing"]

  A --> B --> C --> D --> E --> F --> G --> H --> I
  I -->|No| J --> K
  I -->|Yes| L
  K -->|Founder declines| M
```

## Flow In Plain Words

The model starts at root `AGENT.md` because the founder speaks in natural language. Root routing reads `leanos.yaml`, current phase and active indexes before entering Strategy. It then follows `founder-diagnosis.workflow.md` because startup is a progression-stage decision, not delivery work.

Strategy Product uses `diagnose-founder-idea.skill.md` to name the current stage, baseline gaps and next guided question. The journey ends when the founder confirms Strategy updates or chooses a safe next route.

## Founder Trigger

Real phrases that can start this journey:

- "Vamos comecar."
- "Quero comecar agora."
- "Como eu inicio o LeanOS?"
- "Por onde comecamos?"
- "Quero configurar o LeanOS."

## Route Contract

The required route is:

```text
Root AGENT.md
-> leanos.yaml
-> active .leanos/index/*
-> strategy/AGENT.md
-> strategy/workflows/founder-diagnosis.workflow.md
-> strategy/product/AGENT.md
-> strategy/product/roles/product-strategist.role.md
-> strategy/product/skills/diagnose-founder-idea.skill.md
-> strategy/product/playbooks/product-strategy.playbook.md
```

## Stop Rules

- Do not ask a generic "tell me more" question when a specific baseline gap is visible.
- Do not create roadmap items before Strategy Baseline is minimally coherent.
- Do not define MVP delivery scope before Product Ops is active.
- Do not create Epics, Features, branches, PRs or source code.
- Do not activate Operations or Growth from this journey without a later confirmed gate.

## Completion Checklist

- [x] Root `AGENT.md` routes startup intent into Strategy.
- [x] Strategy has a `founder-diagnosis` workflow.
- [x] Product has a `diagnose-founder-idea` skill.
- [x] The workflow names stage, gate, active requirements and activation limits.
- [x] The journey stops before roadmap, MVP delivery scope, Epic, Feature and implementation work.
