# Launch Learning Loop Workflow

## Purpose

Coordinate marketing, customer experience and finance after launch.

## Founder Triggers

- "vamos lancar"
- "como aprendemos com os usuarios?"
- "o que fazer depois do lancamento?"
- "vamos analisar feedback dos clientes"
- "o lancamento rodou, e agora?"

## Owner

- Department: `growth`
- Primary area: `marketing`
- Supporting areas: `customer-experience`
- Conditional areas: `finance`, `strategy.product`, `operations.product-ops`

## Required Areas

- marketing
- customer-experience

## Conditional Areas

- `growth/finance`: Enter when pricing, budget, revenue, cost or unit economics are part of the launch decision.
- `strategy/product`: Enter when launch learning changes positioning, ICP, problem framing or value proposition.
- `operations/product-ops`: Enter when customer learning should become delivery scope, Epics or Features.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `growth/AGENT.md`
- `growth/workflows/launch-learning-loop.workflow.md`
- `growth/marketing/AGENT.md`
- `growth/marketing/knowledge/launch-plan.md`
- `growth/marketing/knowledge/positioning.md`
- `growth/customer-experience/AGENT.md`
- `growth/customer-experience/knowledge/customer-feedback.md`
- `growth/customer-experience/knowledge/success-moments.md`
- `growth/customer-experience/knowledge/churn-reasons.md`

## Navigation Route

1. `AGENT.md`
2. `growth/AGENT.md`
3. `growth/workflows/launch-learning-loop.workflow.md`
4. `growth/marketing/AGENT.md`
5. `growth/marketing/roles/growth-lead.role.md`
6. `growth/marketing/skills/create-launch-plan.skill.md`
7. `growth/marketing/playbooks/mvp-launch.playbook.md`
8. `growth/customer-experience/AGENT.md`
9. `growth/customer-experience/roles/cx-lead.role.md`
10. `growth/customer-experience/skills/map-customer-feedback.skill.md`
11. `growth/customer-experience/playbooks/customer-learning-loop.playbook.md`
12. `growth/finance/AGENT.md when pricing, budget or unit economics are involved`
13. `strategy/product/AGENT.md when positioning or ICP should change`
14. `operations/product-ops/AGENT.md when learning should become delivery work`

## Sequence

1. Read Marketing AGENT and launch knowledge before planning or summarizing launch work.
2. Read Customer Experience AGENT and customer feedback before claiming what users learned or felt.
3. Separate launch activity, customer evidence, founder interpretation and next decision.
4. Review Finance AGENT only when pricing, budget, revenue, cost or unit economics are involved.
5. Route to Strategy Product only when learning changes ICP, positioning, problem framing or value proposition.
6. Route to Product Ops only when learning should become delivery scope, Epics or Features.
7. Recommend the next learning loop in founder-friendly language.
8. Ask for confirmation before updating launch, feedback, finance, strategy or delivery files.

## Confirmation Gates

- Ask before updating launch plan or positioning.
- Ask before recording feedback as learning.
- Ask before changing pricing, revenue, budget or unit economics notes.
- Ask before routing learning into Strategy or Product Ops.
- Ask before creating delivery work from customer learning.

## Allowed Updates

- `growth/marketing/knowledge/launch-plan.md`
- `growth/marketing/knowledge/positioning.md after founder confirmation`
- `growth/customer-experience/knowledge/customer-feedback.md`
- `growth/customer-experience/knowledge/success-moments.md`
- `growth/customer-experience/knowledge/churn-reasons.md`
- `growth/finance/knowledge/pricing.md when Finance is involved and founder confirms`
- `growth/finance/knowledge/unit-economics.md when Finance is involved and founder confirms`

## Forbidden Updates

- `operations/product-ops/epics/ without Product Ops route and founder confirmation`
- `strategy/roadmap/knowledge/roadmap.md without Strategy route and founder confirmation`
- `.github/`
- `.leanos/`
- `source code`
- `branches`
- `pull requests`

## External Capabilities

- No external capability is required by default.
- Do not call analytics, CRM, email, payment, GitHub or deployment APIs from this workflow without a separate confirmed tool-specific flow.
- When external evidence is missing, ask the founder for the available signal instead of inventing it.

## Stop Conditions

- There is no launch activity or customer evidence to review.
- The founder asks for implementation rather than learning-loop planning.
- Customer feedback is too vague to turn into learning.
- The founder does not confirm updates or next routing.
- External analytics or CRM access is required but not available.

## Expected Output

- Launch status summary.
- Customer evidence summary separated from interpretation.
- Learning, risk and opportunity list.
- Recommended next loop: marketing, CX, finance, strategy or delivery.
- Founder-friendly confirmation question before any update.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Esse aprendizado parece apontar para o proximo ciclo.
Quer que eu transforme isso em ajuste de marketing/CX, revisao de estrategia ou trabalho de produto?
```

Later-session triggers:

- "o que aprendemos com o lancamento?"
- "transforme feedback em proximos passos"
- "isso vira roadmap?"
- "isso muda o posicionamento?"
- "isso vira feature?"

Next route:

`strategy/product/AGENT.md or operations/product-ops/AGENT.md depending on the founder decision`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Growth area READMEs for each step to preserve area-first ownership.
