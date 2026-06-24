# Feature To Delivery Cycle Workflow

## Purpose

Coordinate Operations areas from Feature interpretation to readiness, component/design checks, branch, implementation, review and PR.

## Founder Triggers

- "vamos comecar essa feature"
- "implemente a feature"
- "implemente a issue #554"
- "podemos iniciar o desenvolvimento?"
- "essa feature ja pode ir para codigo?"

## Owner

- Department: `operations`
- Primary area: `product-ops`
- Supporting areas: `engineering`
- Conditional areas: `design`, `security`, `devops`

## Required Areas

- product-ops
- engineering

## Conditional Areas

- `design`: Enter before Engineering when the Feature affects UI, screens, flows, copy, accessibility, interaction, design system usage or reusable components.
- `security`: Enter before Engineering when the Feature touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.
- `devops`: Enter before Engineering when the Feature touches environments, CI/CD, deploy, observability, config, GitHub sync or release readiness.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `operations/AGENT.md`
- `operations/workflows/README.md`
- `operations/workflows/feature-to-delivery-cycle.workflow.md`
- `operations/product-ops/AGENT.md`
- `operations/product-ops/knowledge/work-taxonomy.md`
- `operations/product-ops/knowledge/ready-to-develop.md`
- `operations/product-ops/epics/README.md`

## Navigation Route

1. `AGENT.md`
2. `operations/AGENT.md`
3. `operations/workflows/feature-to-delivery-cycle.workflow.md`
4. `operations/product-ops/AGENT.md`
5. `operations/product-ops/knowledge/ready-to-develop.md`
6. `operations/design/AGENT.md when UI, flow, accessibility, copy or component readiness is needed`
7. `operations/security/AGENT.md when security risk is involved`
8. `operations/devops/AGENT.md when delivery infrastructure is involved`
9. `operations/engineering/AGENT.md`
10. `operations/engineering/roles/senior-developer.role.md`
11. `operations/engineering/playbooks/branch-from-issue.playbook.md`
12. `operations/engineering/playbooks/component-implementation.playbook.md when a component spec is approved and needed`
13. `operations/engineering/playbooks/issue-to-pr.playbook.md`
14. `operations/engineering/playbooks/pr-validation.playbook.md`

## Sequence

1. Accept only a local Feature or GitHub Feature issue as input; do not start from a loose idea, roadmap item or unsplit Epic
2. Load Product Ops through `operations/product-ops/AGENT.md` first to identify the Feature, parent Epic, delivery scope and readiness state
3. Run `operations/product-ops/knowledge/ready-to-develop.md` before branch, code or PR work
4. If the Feature affects UI, screens, flows, copy, accessibility or reusable components, route Design before Engineering
5. Ask Design to confirm whether the Feature can reuse an existing component, adapt an existing component or needs a new component contract
6. If a new component spec is needed and no approved spec exists, route to `operations/design/playbooks/component-readiness.playbook.md` before branch or code
7. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved
8. Route DevOps only when environments, CI/CD, deploy, observability, configuration, GitHub sync or release readiness are affected
9. Record why Design, Security or DevOps are not applicable when they do not enter the flow
10. After Product Ops, Design, Security and DevOps readiness are ready or explicitly not applicable, create the issue-linked branch
11. Plan implementation in Engineering; if a component spec was approved, run `operations/engineering/playbooks/component-implementation.playbook.md` before the screen or Feature that depends on it
12. Run tests or explain gaps
13. Run PR validation
14. Prepare PR

## Confirmation Gates

- Ask before creating or updating local Feature files.
- Ask before creating or changing Design component specs.
- Ask before creating a branch.
- Ask before editing product code.
- Ask before running external GitHub actions, opening a PR or changing remote state.
- Ask before installing dependencies, changing package manager files or adding tooling.

## Allowed Updates

- `operations/product-ops/epics/<epic-slug>/<feature-slug>.md`
- `operations/design/knowledge/components/<component-slug>.md after Design confirmation`
- `product source files required by the confirmed Feature after branch confirmation`
- `tests required by the confirmed Feature`
- `pull request draft or description after implementation review`

## Forbidden Updates

- `loose roadmap items or unsplit Epics as implementation input`
- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `ai-standard/`
- `.leanos/`
- `.github/ without explicit GitHub step confirmation`
- `.env`
- `.env.local`
- `production deployment state`

## External Capabilities

- GitHub branch and PR actions are allowed only after Feature readiness and explicit founder confirmation.
- Do not merge PRs automatically.
- Do not deploy to production from this workflow.
- Do not treat GitHub issue presence as proof that the Feature is ready to develop.

## Stop Conditions

- The request is a loose idea, roadmap item or unsplit Epic instead of a Feature.
- The Feature cannot be mapped to a local Feature or GitHub Feature issue.
- `ready-to-develop.md` shows missing Product Ops, Design, Security, DevOps or Engineering readiness.
- A required Design component spec is missing.
- Security or DevOps triggers apply and cannot be resolved or marked not applicable with a reason.
- The founder does not confirm branch, code changes, external actions or PR preparation.
- Tests cannot be run or meaningfully replaced with a documented validation plan.

## Expected Output

- Feature readiness summary.
- Design, Security and DevOps applicability notes with reasons.
- Component readiness decision before Engineering when UI components are affected.
- Branch name and implementation plan after confirmation.
- Code and test changes summary.
- PR validation summary with risks, gaps and remaining checks.
- Founder-friendly next-step recommendation.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
A implementacao esta pronta para revisao.
Quer que eu conduza a validacao do PR antes do merge?
```

Later-session triggers:

- "revise o PR"
- "esta pronto para merge?"
- "mergeado, vamos para a proxima"
- "o PR foi aprovado"
- "o que fazemos depois do merge?"

Next route:

`post-merge-continuation`

Rules:

- Do not automatically merge.
- Run PR validation before recommending merge readiness.
- If the founder confirms merge happened, restart from Root `AGENT.md` and route to `post-merge-continuation`.
- If the PR is not ready, explain the gap and stay inside Engineering review assets.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
