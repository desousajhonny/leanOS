# /start-leanos

## Purpose

Start the LeanOS founder onboarding conversation.

Use this command to understand the product context from `leanos.yaml`, greet the founder and ask the first guided question. This is the beginning of the operating session, not a technical audit report.

## Load First

Read:

- `../../AGENT.md`
- `../../leanos.yaml`
- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../index/routing-map.yaml`
- `../../ai-standard/foundation/guided-conversation.md`
- `../../ai-standard/foundation/progression-gates.md`
- `../../strategy/workflows/founder-diagnosis.workflow.md`

## Internal Reading Rules

- Read these files silently.
- Do not print the full loaded context unless the founder asks for diagnostics.
- Do not print all active departments, active areas or compatible workflows during the first response.
- Use `leanos.yaml` as the primary seed for company name, product name, description, product status, stage, mode and primary user.
- Use context files only to avoid asking what is already known.
- If `leanos.yaml` is mostly empty or generic, ask one short open question first. Then move into guided questions once there is enough context.
- If `leanos.yaml` has enough initial context, start directly with a guided question.
- Match the founder's language. If the founder writes in Portuguese, respond in Portuguese.
- During `/start-leanos`, use `not applicable` for Active Role, Loaded Skills and Relevant Playbook unless you actually route into a department/area role after the founder confirms the next path.

## Guided Question Delivery

When asking the founder to choose between known options:

1. Prefer the host application's native selection UI when available.
2. If no native selection UI is available, use numbered options in the chat.
3. Always allow a free-form answer.
4. Ask one decision at a time.
5. Restate the selected meaning before continuing.

Do not ask broad open-ended questions when the current context supports useful guided options.

Use open-ended questions only when:

- `leanos.yaml` is empty or too generic to generate useful options;
- the founder explicitly asks to brainstorm freely;
- the options would create fake precision too early.

## What To Do

1. Read the initial product/company context from `leanos.yaml`.
2. Use `../../strategy/workflows/founder-diagnosis.workflow.md` as the continuation route for diagnosing the current founder stage.
3. Identify the smallest missing strategic context needed to continue.
4. Greet the founder in plain language.
5. Ask one guided question at a time using native selection UI when available, otherwise numbered options.
6. Accept a number or a free-form answer.
7. Restate how you interpreted the answer before moving to the next question.
8. Do not propose file updates in the first response unless the founder explicitly asks to write or continue from an already-confirmed plan.
9. After enough answers, summarize the proposed source-of-truth updates and ask for confirmation before writing.

After the first response, continue with the `founder-diagnosis` workflow instead of improvising a separate startup flow.

## First Response Shape

The first response should be short and founder-friendly.

Use this shape:

```text
Active Department: strategy
Active Area: not applicable
Active Role: not applicable
Loaded Skills: not applicable
Relevant Playbook: not applicable
Loaded Context: leanos.yaml, workspace-summary.md, current-focus.md, next-actions.md, routing-map.yaml

Ola, Founder!
Vi que voce esta buscando <goal/product context>. Vamos comecar?

Tenho algumas perguntas rapidas para alinhar o produto antes de qualquer roadmap ou implementacao.

<one guided question>

If the host supports selectable options, present the options as selectable choices.
If not, use:

1. <option>
2. <option>
3. <option>
4. <option>
5. Nao sei ainda, me ajude a decidir

Voce pode responder so com o numero ou do seu jeito.
```

Do not include:

- full workspace summary;
- full list of departments;
- full list of active areas;
- full list of compatible workflows;
- long gap analysis;
- technical file paths;
- proposed file update plan;
- all questions at once.

## Guided Founder Interview

Ask only what is missing. If the answer is already clear from the loaded context, do not ask it again.

Ask one important guided question at a time. Use numbered options whenever the founder can choose between predictable paths.

If the host can render a selectable UI, use it for these options. If the host cannot, write the numbered options directly in chat.

Required topics, in order:

1. Primary user / ICP.
2. Painful problem.
3. Value promise.
4. Current stage and immediate goal.
5. Riskiest assumption.
6. Useful MVP validation or learning target.
7. What not to build or decide too early.

Example first guided question:

```text
Para quem esse produto precisa gerar valor primeiro?

1. Founder solo validando uma ideia e buscando clareza antes de construir
2. Founder solo ou pequeno time que ja tem produto e precisa operar melhor
3. Startup early-stage tentando organizar roadmap, delivery e crescimento
4. Negocio existente tentando usar agentes para ganhar eficiencia operacional
5. Nao sei ainda, me ajude a decidir

Voce pode responder so com o numero ou do seu jeito.
```

## Optional Founder Interview

Ask these only when useful for the current stage:

- What alternatives or competitors does the user compare against?
- What business model or pricing assumption is being considered?
- What constraints matter now: time, budget, team, technical risk or compliance?
- How should humans and AI agents collaborate in this workspace?
- What existing codebase, product, audience or learning should be respected?
- What decision principle should guide tradeoffs when context is incomplete?

## Response Mapping

Map founder responses to source-of-truth files only when the matching area is active:

- Business identity, brand logic, mission, vision, principles and operating model -> `strategy/business/`
- Product description, problem, ICP, value proposition, positioning and business model -> `strategy/product/`
- MVP validation thesis, MVP slice, manual/concierge parts, productized parts, success signals and pivot signals -> `strategy/product/knowledge/mvp-validation-scope.md`
- Assumptions, experiments, success metrics and learning -> `strategy/validation/`
- Roadmap, milestones, current cycle and backlog -> `strategy/roadmap/knowledge/`

If a Strategy area is not active, do not propose writes to its missing path. Mention that the area is inactive and ask before activating or creating it.

Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before company, product and MVP validation context are coherent.

## Fact and Uncertainty Rules

- Treat user-provided facts as facts.
- Treat model inferences as assumptions.
- Do not turn assumptions into source-of-truth facts.
- Put unknowns into `## Open Questions` or the relevant assumptions file.
- Keep weak or unvalidated claims visibly tentative.
- Prefer `TBD` over invented specificity.

## Validation Evidence Rules

- Assumption: something believed but not yet proven.
- Evidence: something observed from users, behavior, data or shipped product.
- Insight: interpretation of evidence.
- Decision: a committed change in strategy, MVP, roadmap or backlog.
- Roadmap impact: what changes because of the decision.
- Do not record validated learning without evidence.

## Write Protocol

Do not write during the first response.

After the guided conversation captures enough context, show a short proposed change plan with:

- Files to update
- What each file will receive
- Which statements are facts
- Which statements are assumptions
- Which open questions will remain

Then ask for explicit confirmation.

Valid confirmation examples:

- "Yes, update these files."
- "Apply the proposal."
- "Write the proposed changes."

If the user says anything ambiguous, do not write. Ask a focused follow-up question.

## Allowed Updates

Only after explicit confirmation, `/start-leanos` may update:

- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../../strategy/business/knowledge/profile.md`
- `../../strategy/business/knowledge/mission.md`
- `../../strategy/business/knowledge/vision.md`
- `../../strategy/business/knowledge/principles.md`
- `../../strategy/business/knowledge/operating-model.md`
- `../../strategy/business/knowledge/decision-log.md`
- `../../strategy/product/knowledge/brief.md`
- `../../strategy/product/knowledge/problem.md`
- `../../strategy/product/knowledge/icp.md`
- `../../strategy/product/knowledge/jobs-to-be-done.md`
- `../../strategy/product/knowledge/value-proposition.md`
- `../../strategy/product/knowledge/positioning.md`
- `../../strategy/product/knowledge/business-model-canvas.md`
- `../../strategy/product/knowledge/mvp-validation-scope.md`
- `../../strategy/product/knowledge/validation-notes.md`
- `../../strategy/validation/assumptions.md`
- `../../strategy/validation/riskiest-assumptions.md`
- `../../strategy/validation/experiments.md`
- `../../strategy/validation/success-metrics.md`
- `../../strategy/validation/learning-log.md`
- `../../strategy/roadmap/knowledge/roadmap.md`
- `../../strategy/roadmap/knowledge/milestones.md`
- `../../strategy/roadmap/knowledge/current-cycle.md`
- `../../strategy/roadmap/knowledge/backlog.md`

Strategy Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before strategy is coherent.

## Forbidden Updates

During `/start-leanos`, do not modify:

- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `../../ai-standard/`
- `../commands/`
- `../../.github/`
- product code or files outside the LeanOS workspace
- Operations or Growth area files unless the user explicitly asks after init

Roles, skills, playbooks and workflows are operating assets. Use them to work; do not enrich them with company/product context during init.

## Confirmation Rule

Use propose-first mode.

Never write files during init until the user explicitly confirms the proposed source-of-truth updates.

If confirmation is ambiguous, do not write. Ask a focused follow-up question.

## Output

Default first response:

- Compact Response Header
- Friendly founder greeting
- One short interpretation of the known context
- One guided question with numbered options
- Reminder that free-form answers are accepted

Only show technical details, loaded file lists, gap analysis or proposed file updates when:

- the founder asks for diagnostics;
- the founder asks "where are we?";
- the founder asks what will be updated;
- the guided interview has enough answers and you are asking for write confirmation.

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- strategy.validation
