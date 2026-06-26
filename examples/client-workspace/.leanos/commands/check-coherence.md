# /check coherence

## Purpose

Diagnose coherence across strategy, MVP, roadmap, Design, Security, Engineering and Feature readiness.

Use this command to diagnose whether Strategy, MVP, Roadmap, Design, Security and Engineering point in the same direction before promoting work, creating Features or starting implementation.

This is a diagnostic command. It should recommend the next safe route, not rewrite the workspace by default.

## Load First

Always read:

- `../../AGENT.md`
- `../agent/protocols/where-we-are.md`
- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../index/routing-map.yaml`
- `../../leanos.yaml`

Strategy Product:

- `../../strategy/AGENT.md`
- `../../strategy/product/AGENT.md`
- `../../strategy/product/knowledge/brief.md`
- `../../strategy/product/knowledge/problem.md`
- `../../strategy/product/knowledge/icp.md`
- `../../strategy/product/knowledge/value-proposition.md`
- `../../strategy/product/knowledge/positioning.md`
- `../../strategy/product/knowledge/business-model-canvas.md`

Strategy Roadmap:

- `../../strategy/roadmap/AGENT.md`
- `../../strategy/roadmap/knowledge/backlog.md`
- `../../strategy/roadmap/knowledge/roadmap.md`
- `../../strategy/roadmap/knowledge/current-cycle.md`

Product Ops:

- `operations.product-ops` is not active. Name MVP and Feature readiness as unavailable instead of inventing delivery coherence.

Design:

- `operations.design` is not active. Mark Design coherence as not applicable unless the request is user-facing.

Security:

- `operations.security` is not active. Mark Security coherence as unavailable when data/auth/privacy risk is present.

Engineering:

- `operations.engineering` is not active. Mark Engineering coherence as unavailable for implementation readiness.

## Navigation Route

1. `../../AGENT.md`
2. `../agent/protocols/where-we-are.md`
3. Owning department or area `AGENT.md` for each active coherence dimension
4. Output diagnosis and next route

Do not enter roles, skills or playbooks unless the diagnosis shows a specific route is needed after the founder confirms the next step.

## Process

1. Classify the current product moment with `where-we-are.md`.
2. Compare Strategy Product against MVP scope and roadmap direction.
3. Compare MVP scope against PRD, acceptance criteria, non-goals and delivery scope.
4. Compare roadmap/backlog items against Epics and Features when Product Ops is active.
5. Check Design coherence only when UX, UI, copy, accessibility, screens, states, components or flows are relevant.
6. Check Security coherence only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is relevant.
7. Check Engineering coherence only when implementation, tests, code standards or delivery readiness are relevant.
8. Score coherence and explain the reason in founder-friendly language.
9. Recommend one next safe route; do not recommend several competing routes unless the founder asks for options.

## Scoring Model

Use a 0-100 score:

- 90-100: coherent enough to continue the next workflow.
- 70-89: mostly coherent, with named gaps to resolve soon.
- 40-69: risky; resolve the highest-impact gap before delivery work.
- 0-39: not coherent enough to plan delivery or implementation.

Always include:

- alignments;
- inconsistencies;
- risks;
- missing context;
- recommended next route.

## Allowed Updates

None by default.

`/check coherence` may propose updates, but it must not write files unless the founder explicitly asks to apply a specific correction after the diagnosis.

## Forbidden Updates

During `/check coherence`, do not:

- rewrite Strategy, MVP, Roadmap, Design, Security or Engineering files by default;
- create Epics, Features, branches, commits, PRs or GitHub payloads;
- call GitHub, deployment or external APIs;
- mark work as ready to develop without checking `where-we-are.md` and `ready-to-develop.md`;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`.

## Confirmation Rule

Ask before writing any file or moving into a workflow that changes product, roadmap, delivery or remote state.

## Expected Output

- Coherence score
- Current product moment
- What is aligned
- What is inconsistent
- What is missing
- Risks if the founder skips the gap
- Recommended next route
- Files inspected
- Optional proposed update, only after the plain-language diagnosis

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- strategy.validation
