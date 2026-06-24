# Post Merge Continuation Workflow

## Purpose

Continue delivery after a founder confirms a merge without losing product, engineering, release or learning context.

## Founder Triggers

- "mergeado, vamos para a proxima"
- "o PR foi mergeado"
- "terminamos essa feature"
- "o que fazemos depois do merge?"
- "atualiza o contexto depois do merge"
- "qual a proxima feature?"

## Owner

- Department: `operations`
- Primary area: `product-ops`
- Supporting areas: `engineering`
- Conditional areas: `devops`, `security`, `growth/customer-experience`, `strategy/roadmap`

## Required Areas

- product-ops
- engineering

## Conditional Areas

- `devops`: the merged Feature needs release notes, deployment, environment checks, rollback notes or observability follow-up
- `security`: the merged Feature touched auth, permissions, data exposure, payments, privacy, API boundaries or abuse risk
- `growth/customer-experience`: the merged Feature affects onboarding, activation, customer learning, support, launch notes or feedback collection
- `strategy/roadmap`: the merge changes roadmap priority, milestone status, delivery scope or learning that affects product direction

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `operations/AGENT.md`
- `operations/workflows/README.md`
- `operations/workflows/post-merge-continuation.workflow.md`
- `operations/product-ops/AGENT.md`
- `operations/product-ops/knowledge/work-taxonomy.md`
- `operations/product-ops/knowledge/issue-readiness.md`
- `operations/product-ops/epics/README.md`
- `operations/engineering/AGENT.md`
- `operations/engineering/knowledge/pr-log.md`
- `operations/engineering/knowledge/implementation-notes.md`

## Navigation Route

1. `AGENT.md`
2. `operations/AGENT.md`
3. `operations/workflows/post-merge-continuation.workflow.md`
4. `operations/product-ops/AGENT.md`
5. `operations/product-ops/roles/product-owner.role.md`
6. `operations/engineering/AGENT.md`
7. `operations/engineering/roles/pr-reviewer.role.md`
8. `operations/devops/AGENT.md when release, deployment or observability follow-up is needed`
9. `operations/security/AGENT.md when the merged Feature has security-sensitive impact`
10. `growth/AGENT.md when customer learning, support or launch feedback should be captured`
11. `strategy/AGENT.md when roadmap, milestone or delivery-scope decisions changed`

## Sequence

1. Confirm the merged PR, local Feature or GitHub Feature issue. If the founder only says "mergeado", ask which PR or Feature before writing.
2. Map the merge back to the local Epic and Feature in `operations/product-ops/epics/` or to the confirmed GitHub Feature issue.
3. Summarize what shipped in founder-friendly language: user impact, technical scope, tests, risks and what did not ship.
4. Compare the merged work against the Feature acceptance criteria, PR validation result and Founder Testing Guide.
5. Propose the smallest local status/context updates before writing anything.
6. Ask whether release, deployment, environment or observability follow-up is needed. If yes, route DevOps through `operations/devops/AGENT.md` before any deploy action.
7. Ask whether the merge touched auth, permissions, data, privacy, payments, APIs or abuse risk. If yes, route Security through `operations/security/AGENT.md` before declaring the Feature fully safe.
8. Ask whether customer learning, support notes or launch feedback should be captured. If yes, bridge to Growth after the Operations update.
9. Identify remaining Features in the same Epic and the next likely route, but do not choose priority automatically.
10. Offer the founder one clear next step: release/deploy follow-up, next Feature in the Epic, roadmap review or customer learning loop.

## Confirmation Gates

- Ask before updating local Epic or Feature status.
- Ask before updating Product Ops Epic/Feature status, Engineering PR log or implementation notes.
- Ask before routing into DevOps, Security, Growth or Strategy follow-up.
- Ask before starting the next Feature delivery cycle.
- Ask before any GitHub write, deployment, release action, branch, code change or PR action.

## Allowed Updates

- `operations/product-ops/epics/<epic-slug>/<feature-slug>.md`
- `operations/product-ops/knowledge/issue-readiness.md`
- `operations/engineering/knowledge/pr-log.md`
- `operations/engineering/knowledge/implementation-notes.md`
- `operations/devops/knowledge/release-notes.md only after DevOps routing and founder confirmation`
- `growth/customer-experience/knowledge/customer-feedback.md only after Growth routing and founder confirmation`
- `strategy/roadmap/knowledge/current-cycle.md only after Strategy/Roadmap routing and founder confirmation`

## Forbidden Updates

- `source code, components, tests or product files`
- `branches, commits, PR creation, PR merge or deploy actions`
- `.github/ or GitHub remote state without an explicit GitHub sync/release step`
- `roadmap priority or delivery-scope changes without Strategy/Roadmap handoff`
- `parent Epic completion when only one Feature was merged`
- `new Features, Epics or roadmap items without routing to the proper workflow`
- `roles/, skills/, playbooks/, workflows/, commands/ or ai-standard/`

## External Capabilities

- GitHub may be read only when the founder provides or confirms a PR, issue or repository reference.
- Do not write to GitHub from this workflow unless a future GitHub sync/release workflow is explicitly confirmed.
- Do not deploy, merge, create branches, create PRs or run release automation from this workflow.
- If external evidence is unavailable, rely on the founder confirmation and clearly mark it as founder-confirmed.

## Stop Conditions

- The merged PR, Feature or issue cannot be identified.
- The founder has not confirmed that merge happened.
- Local Feature state and GitHub state conflict and cannot be reconciled safely.
- PR validation was blocked, tests failed or founder testing was not accepted.
- The request shifts into new implementation, deploy, roadmap reprioritization or GitHub write without confirmation.
- A required route file is missing.

## Expected Output

- Founder-friendly shipped summary.
- Feature/Epic state update proposal.
- Engineering PR log or implementation note proposal.
- Release, DevOps, Security, Growth and Strategy follow-up applicability with reasons.
- Remaining Epic progress summary.
- One clear next-step bridge.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
Essa feature foi mergeada.
Quer que eu prepare o proximo passo: release/deploy, proxima feature do mesmo Epic, revisao de prioridade ou aprendizado com usuarios?
```

Later-session triggers:

- "mergeado, vamos para a proxima"
- "o PR foi mergeado"
- "qual a proxima feature?"
- "atualiza depois do merge"
- "terminamos essa feature"

Next route:

`feature-to-delivery-cycle`

Rules:

- Do not automatically start the next Feature.
- If release or deploy is chosen, route to DevOps first.
- If roadmap priority changed, route to Strategy/Roadmap first.
- If customer learning is chosen, route to Growth/Customer Experience first.
- If the founder chooses the next Feature, restart from Root `AGENT.md` and route to `feature-to-delivery-cycle`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
