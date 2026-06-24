import { commandDefinitions } from "../definitions/commands.js";
import { getAllAreas, getArea, getAvailableCommands } from "../selectors.js";
import type { AreaDefinition, CommandDefinition, FileEntry, Subarea } from "../types.js";
import { folderReadme, formatCommandInvocation } from "../content/shared.js";

export function commandFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = activeAreas.map((area) => area.key);
  const availableCommands = getAvailableCommands(activeAreas);

  return [
    { path: ".leanos/commands/README.md", content: folderReadme("Commands", "Slash command instructions for LeanOS agent chats.", "Use when the user invokes or describes a LeanOS command.", "../index/routing-map.yaml", commandDefinitions.map((command) => `${command.slug}.md`), ["../context/", "../index/", "../../ai-standard/"], `Available now: ${availableCommands.map((command) => formatCommandInvocation(command.slug)).join(", ")}. Commands tied to inactive areas include a warning and require explicit activation before use.`) },
    ...commandDefinitions.map((command) => ({
      path: `.leanos/commands/${command.slug}.md`,
      content: commandContent(command, activeAreas, activeKeys)
    }))
  ];
}

function commandContent(command: CommandDefinition, activeAreas: AreaDefinition[], activeKeys: Subarea[]): string {
  if (command.slug === "start-leanos") return startCommand(activeAreas);
  if (command.slug === "status-leanos") return statusLeanOSCommand(command, activeKeys);
  if (command.slug === "check-coherence") return checkCoherenceCommand(command, activeKeys);
  if (command.assetCreation) return assetCreationCommand(command, activeAreas);
  if (command.slug === "define-mvp") return defineMvpCommand(command, activeKeys);
  if (command.slug === "define-design") return defineDesignCommand(command, activeKeys);
  if (command.slug === "create-features") return createFeaturesCommand(command, activeKeys);
  if (command.slug === "github-sync") return githubSyncCommand(command, activeKeys);
  if (command.slug === "workon-feature") return workonFeatureCommand(command, activeKeys);
  if (command.slug === "create-branch") return createBranchCommand(command, activeKeys);
  if (command.slug === "create-pr") return createPrCommand(command, activeKeys);
  if (command.slug === "review-pr") return reviewPrCommand(command, activeKeys);

  return routingCommand(command, activeKeys);
}

function statusLeanOSCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command as the explicit LeanOS status and readiness diagnosis entrypoint.

It must load the \`where-we-are\` protocol before recommending implementation, roadmap changes, GitHub work or the next workflow.

## Load First

Read:

- \`../../AGENT.md\`
- \`../agent/protocols/where-we-are.md\`
- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/workflows.yaml\`
- \`../index/routing-map.yaml\`
- \`../../leanos.yaml\`

Then follow the reading order inside:

- \`../agent/protocols/where-we-are.md\`

## Process

1. Treat \`/status-leanos\` as a request to run the \`where-we-are\` protocol.
2. Do not route directly to a department, role, skill or playbook before reading the protocol.
3. Use the protocol to classify the current moment of the product/workspace.
4. Inspect only the smallest set of files needed to answer the founder.
5. Explain what exists, what is missing, the risk of skipping steps and the next safe LeanOS route.
6. If the founder asks to continue, declare the next route before loading its workflow or command.

## Allowed Updates

None by default.

\`/status-leanos\` is diagnostic. It may propose updates, but it must not write files unless the founder explicitly asks to update something after the diagnosis.

## Forbidden Updates

During \`/status-leanos\`, do not:

- write product, strategy, roadmap, Epic, Feature, Design, Engineering, Growth or framework files;
- create branches, commits, PRs, issues or GitHub payloads;
- call GitHub, deployment or external APIs;
- mark work as ready to develop without checking \`where-we-are.md\` and \`ready-to-develop.md\`;
- invent completed work from empty or placeholder files.

## Expected Output

Use founder-friendly language first:

\`\`\`text
Onde estamos:
<current product/workspace moment>

O que ja temos:
- <confirmed thing>

O que falta:
- <missing prerequisite>

Risco de pular etapa:
<short explanation>

Proximo passo recomendado:
<route or workflow>

Quer seguir por esse caminho?
\`\`\`

After the founder-friendly answer, optionally list the files inspected.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function checkCoherenceCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const productLoad = active.has("strategy.product")
    ? [
        "- `../../strategy/AGENT.md`",
        "- `../../strategy/product/AGENT.md`",
        "- `../../strategy/product/knowledge/brief.md`",
        "- `../../strategy/product/knowledge/problem.md`",
        "- `../../strategy/product/knowledge/icp.md`",
        "- `../../strategy/product/knowledge/value-proposition.md`",
        "- `../../strategy/product/knowledge/positioning.md`",
        "- `../../strategy/product/knowledge/business-model-canvas.md`"
      ].join("\n")
    : "- `strategy.product` is not active. Do not load missing Strategy Product paths; ask for product context before scoring product coherence.";
  const roadmapLoad = active.has("strategy.roadmap")
    ? [
        "- `../../strategy/roadmap/AGENT.md`",
        "- `../../strategy/roadmap/knowledge/backlog.md`",
        "- `../../strategy/roadmap/knowledge/roadmap.md`",
        "- `../../strategy/roadmap/knowledge/current-cycle.md`"
      ].join("\n")
    : "- `strategy.roadmap` is not active. Name roadmap coherence as unavailable instead of inventing roadmap state.";
  const productOpsLoad = active.has("operations.product-ops")
    ? [
        "- `../../operations/AGENT.md`",
        "- `../../operations/product-ops/AGENT.md`",
        "- `../../operations/product-ops/knowledge/mvp-decision-gate.md`",
        "- `../../operations/product-ops/knowledge/ready-to-develop.md`",
        "- `../../operations/product-ops/mvp/scope.md`",
        "- `../../operations/product-ops/mvp/prd.md`",
        "- `../../operations/product-ops/mvp/acceptance-criteria.md`",
        "- `../../operations/product-ops/epics/README.md`"
      ].join("\n")
    : "- `operations.product-ops` is not active. Name MVP and Feature readiness as unavailable instead of inventing delivery coherence.";
  const designLoad = active.has("operations.design")
    ? [
        "- `../../operations/design/AGENT.md`",
        "- `../../operations/design/knowledge/design-system.md`",
        "- `../../operations/design/knowledge/accessibility.md`",
        "- `../../operations/design/knowledge/user-flows.md`",
        "- `../../operations/design/knowledge/component-inventory.md`"
      ].join("\n")
    : "- `operations.design` is not active. Mark Design coherence as not applicable unless the request is user-facing.";
  const securityLoad = active.has("operations.security")
    ? [
        "- `../../operations/security/AGENT.md`",
        "- `../../operations/security/knowledge/security-baseline.md`",
        "- `../../operations/security/knowledge/threat-model.md`",
        "- `../../operations/security/knowledge/data-protection.md`"
      ].join("\n")
    : "- `operations.security` is not active. Mark Security coherence as unavailable when data/auth/privacy risk is present.";
  const engineeringLoad = active.has("operations.engineering")
    ? [
        "- `../../operations/engineering/AGENT.md`",
        "- `../../operations/engineering/knowledge/implementation-rules.md`",
        "- `../../operations/engineering/knowledge/code-standards.md`",
        "- `../../operations/engineering/knowledge/testing-strategy.md`"
      ].join("\n")
    : "- `operations.engineering` is not active. Mark Engineering coherence as unavailable for implementation readiness.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command to diagnose whether Strategy, MVP, Roadmap, Design, Security and Engineering point in the same direction before promoting work, creating Features or starting implementation.

This is a diagnostic command. It should recommend the next safe route, not rewrite the workspace by default.

## Load First

Always read:

- \`../../AGENT.md\`
- \`../agent/protocols/where-we-are.md\`
- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/routing-map.yaml\`
- \`../../leanos.yaml\`

Strategy Product:

${productLoad}

Strategy Roadmap:

${roadmapLoad}

Product Ops:

${productOpsLoad}

Design:

${designLoad}

Security:

${securityLoad}

Engineering:

${engineeringLoad}

## Navigation Route

1. \`../../AGENT.md\`
2. \`../agent/protocols/where-we-are.md\`
3. Owning department or area \`AGENT.md\` for each active coherence dimension
4. Output diagnosis and next route

Do not enter roles, skills or playbooks unless the diagnosis shows a specific route is needed after the founder confirms the next step.

## Process

1. Classify the current product moment with \`where-we-are.md\`.
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

\`/check coherence\` may propose updates, but it must not write files unless the founder explicitly asks to apply a specific correction after the diagnosis.

## Forbidden Updates

During \`/check coherence\`, do not:

- rewrite Strategy, MVP, Roadmap, Design, Security or Engineering files by default;
- create Epics, Features, branches, commits, PRs or GitHub payloads;
- call GitHub, deployment or external APIs;
- mark work as ready to develop without checking \`where-we-are.md\` and \`ready-to-develop.md\`;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`.

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

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function defineMvpCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const productOpsActive = active.has("operations.product-ops");
  const productActive = active.has("strategy.product");
  const roadmapActive = active.has("strategy.roadmap");
  const productOpsLoad = productOpsActive
    ? [
        "- `../../operations/AGENT.md`",
        "- `../../operations/workflows/define-mvp.workflow.md`",
        "- `../../operations/product-ops/AGENT.md`",
        "- `../../operations/product-ops/roles/product-owner.role.md`",
        "- `../../operations/product-ops/knowledge/mvp-decision-gate.md`",
        "- `../../operations/product-ops/skills/define-mvp.skill.md`",
        "- `../../operations/product-ops/playbooks/mvp-delivery.playbook.md`",
        "- `../../operations/product-ops/mvp/scope.md`",
        "- `../../operations/product-ops/mvp/prd.md`",
        "- `../../operations/product-ops/mvp/user-stories.md`",
        "- `../../operations/product-ops/mvp/acceptance-criteria.md`",
        "- `../../operations/product-ops/mvp/non-goals.md`"
      ].join("\n")
    : "- `operations.product-ops` is not active. Do not load missing Product Ops paths. Ask whether to activate Product Ops before shaping MVP scope.";
  const productLoad = productActive
    ? [
        "- `../../strategy/AGENT.md`",
        "- `../../strategy/product/AGENT.md`",
        "- `../../strategy/product/knowledge/brief.md`",
        "- `../../strategy/product/knowledge/problem.md`",
        "- `../../strategy/product/knowledge/icp.md`",
        "- `../../strategy/product/knowledge/value-proposition.md`",
        "- `../../strategy/product/knowledge/business-model-canvas.md`"
      ].join("\n")
    : "- `strategy.product` is not active. Ask for enough product strategy context before shaping MVP scope.";
  const roadmapLoad = roadmapActive
    ? [
        "- `../../strategy/roadmap/AGENT.md`",
        "- `../../strategy/roadmap/knowledge/backlog.md`",
        "- `../../strategy/roadmap/knowledge/roadmap.md`",
        "- `../../strategy/roadmap/knowledge/current-cycle.md`"
      ].join("\n")
    : "- `strategy.roadmap` is not active. MVP can be shaped from strategy, but roadmap/cycle gaps must be named.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command when the founder asks to define the first version of the product, decide what enters the MVP or clarify what must stay out before delivery planning.

This command routes into the local Operations workflow. It does not create Epics, Features, GitHub issues, branches, PRs or code.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../leanos.yaml\`
- \`../agent/protocols/where-we-are.md\`
- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/routing-map.yaml\`

Then load Strategy context:

${productLoad}

Roadmap context:

${roadmapLoad}

Then load Product Ops:

${productOpsLoad}

## Navigation Route

1. \`../../AGENT.md\`
2. \`../../operations/AGENT.md\`
3. \`../../operations/workflows/define-mvp.workflow.md\`
4. \`../../operations/product-ops/AGENT.md\`
5. \`../../operations/product-ops/roles/product-owner.role.md\`
6. \`../../operations/product-ops/knowledge/mvp-decision-gate.md\`
7. \`../../operations/product-ops/skills/define-mvp.skill.md\`
8. \`../../operations/product-ops/playbooks/mvp-delivery.playbook.md\`
9. Founder output and confirmed MVP file updates

## Process

1. Treat \`/define-mvp\` as the safe entrypoint for MVP scope definition.
2. Run the \`where-we-are\` protocol if the current product moment is unclear.
3. Load Strategy Product context before Product Ops decides scope.
4. Use \`define-mvp.workflow.md\` to preserve department-level ownership.
5. Use \`mvp-decision-gate.md\` to evaluate Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk.
6. Use guided conversation only for missing information.
7. Separate what enters the MVP now, what stays for later, what needs discovery and what is not a fit now.
8. Explain the decision in founder-friendly language before naming file updates.
9. Propose updates and ask for explicit confirmation before writing.
10. Offer the next safe bridge only after the founder confirms the MVP scope.

## Allowed Updates

Only after explicit founder confirmation:

- \`../../operations/product-ops/mvp/scope.md\`
- \`../../operations/product-ops/mvp/prd.md\`
- \`../../operations/product-ops/mvp/user-stories.md\`
- \`../../operations/product-ops/mvp/user-flows.md\`
- \`../../operations/product-ops/mvp/acceptance-criteria.md\`
- \`../../operations/product-ops/mvp/non-goals.md\`
- \`../../operations/product-ops/mvp/release-checklist.md\`
- \`../../operations/product-ops/knowledge/overview.md\`
- \`../../operations/product-ops/knowledge/delivery-scope.md\`

## Forbidden Updates

During \`/define-mvp\`, do not:

- create or update local Epics or Features;
- create GitHub issues, GitHub Project items or GitHub payloads;
- create branches, commits, PRs or source code;
- modify Design component specs;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`;
- mark work as \`ready-to-develop\` before the Feature-level readiness gate runs later.

## Confirmation Rule

Do not write files until the founder confirms the proposed MVP decision.

Ask in plain language:

\`\`\`text
Quer que eu transforme essa decisao no escopo inicial do MVP?
\`\`\`

## Expected Output

Return:

- MVP decision summary
- Included now
- Excluded now
- Needs discovery
- Needs design/security/technical check, if applicable
- Value Risk result
- Usability Risk result
- Feasibility Risk result
- Business Viability Risk result
- Files proposed for update
- Next safe route

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function defineDesignCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const designActive = active.has("operations.design");
  const productActive = active.has("strategy.product");
  const productOpsActive = active.has("operations.product-ops");
  const designLoad = designActive
    ? [
        "- `../../operations/AGENT.md`",
        "- `../../operations/design/AGENT.md`",
        "- `../../operations/design/README.md`",
        "- `../../operations/design/roles/product-designer.role.md`",
        "- `../../operations/design/skills/design-system.skill.md`",
        "- `../../operations/design/skills/accessibility.skill.md`",
        "- `../../operations/design/skills/user-flow-mapping.skill.md`",
        "- `../../operations/design/playbooks/design-foundation.playbook.md`",
        "- `../../operations/design/knowledge/design-system.md`",
        "- `../../operations/design/knowledge/accessibility.md`",
        "- `../../operations/design/knowledge/user-flows.md`"
      ].join("\n")
    : "- `operations.design` is not active. Do not load missing Design paths. Ask whether to activate or create the Design area before executing.";
  const productLoad = productActive
    ? [
        "- `../../strategy/AGENT.md`",
        "- `../../strategy/product/README.md`",
        "- `../../strategy/product/AGENT.md`",
        "- `../../strategy/product/knowledge/brief.md`",
        "- `../../strategy/product/knowledge/icp.md`",
        "- `../../strategy/product/knowledge/problem.md`",
        "- `../../strategy/product/knowledge/value-proposition.md`"
      ].join("\n")
    : "- `strategy.product` is not active. Ask for product, ICP, problem and value proposition context before defining Design.";
  const mvpLoad = productOpsActive
    ? [
        "- `../../operations/product-ops/README.md`",
        "- `../../operations/product-ops/mvp/scope.md`",
        "- `../../operations/product-ops/mvp/prd.md`",
        "- `../../operations/product-ops/mvp/user-stories.md`",
        "- `../../operations/product-ops/mvp/acceptance-criteria.md`"
      ].join("\n")
    : "- `operations.product-ops` is not active. Ask for delivery scope and acceptance criteria before finalizing Design.";
  const allowedUpdates = designActive
    ? [
        "- `../../operations/design/knowledge/design-system.md`",
        "- `../../operations/design/knowledge/accessibility.md`",
        "- `../../operations/design/knowledge/user-flows.md`"
      ].join("\n")
    : "- No file updates are allowed until `operations.design` is active.";
  const forbiddenUpdates = designActive
    ? [
        "- screen-specific design files before a concrete feature or screen requires them",
        "- product code",
        "- roles, skills, playbooks, workflows or `ai-standard/`"
      ].join("\n")
    : [
        "- Do not create Design paths before the user activates or creates the Design area.",
        "- product code",
        "- roles, skills, playbooks, workflows or `ai-standard/`"
      ].join("\n");

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Prepare the MVP design foundation before implementation: design system, accessibility baseline and primary user flows.

## Load First

Always read:

- \`../../AGENT.md\`
- \`../context/current-focus.md\`
- \`../index/routing-map.yaml\`

Design context:

${designLoad}

Product context:

${productLoad}

MVP context:

${mvpLoad}

## Process

1. Confirm the target user, problem, value proposition and delivery scope.
2. If Product or MVP context is missing, ask focused questions before writing Design knowledge.
3. Define the design system baseline: tokens, color intent, typography, spacing, component principles and interaction principles.
4. Define accessibility expectations for the MVP audience and core flows.
5. Map the primary user flows needed before implementation.
6. Leave screen-specific artifacts for later feature or screen-specific work.
7. Propose file updates before writing.
8. Write only after explicit user confirmation.

## Allowed Updates

Only after explicit confirmation, update:

${allowedUpdates}

## Forbidden Updates

During \`/define design\`, do not create or update:

${forbiddenUpdates}

## Output

- Loaded context
- Missing Product or MVP context
- Design system baseline
- Accessibility baseline
- Primary user flows
- Proposed file updates
- Open questions
- Confirmation question before writing

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function startCommand(activeAreas: AreaDefinition[]): string {
  const strategyFiles = getInitStrategySourceFiles(activeAreas);
  const activeKeys = new Set(activeAreas.map((area) => area.key));
  const validationMapping = activeKeys.has("strategy.validation")
    ? "- Assumptions, experiments, success metrics and learning -> `strategy/validation/`"
    : "- Lightweight assumptions, evidence, learning and validation needs -> `strategy/product/knowledge/validation-notes.md`";

  return `# /start-leanos

## Purpose

Initialize LeanOS safely by loading the workspace map, summarizing active context and proposing Strategy-first source-of-truth updates.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../leanos.yaml\`
- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../context/active-workflow.md\`
- \`../index/routing-map.yaml\`

## What To Do

1. Summarize the active departments, active areas, compatible workflows and recommended next action.
2. Check whether there is enough founder context to update Strategy source-of-truth files.
3. If context is missing, run the Required Founder Interview before proposing file changes.
4. Identify Strategy source-of-truth files that could receive the user's company/product context.
5. Propose a concise update plan before editing any file.
6. Ask for explicit confirmation before writing changes.
7. If the user does not confirm, return the update plan and next recommended command only.

## Required Founder Interview

Ask only what is missing. If the answer is already clear from the loaded context, do not ask it again.

Required questions:

1. What company or startup are we operating?
2. What product, service or idea are we building?
3. Who is the primary user or customer?
4. What painful problem are we solving for that user?
5. What value promise do we believe is compelling?
6. What is the current stage of the company or product?
7. What is the riskiest assumption right now?
8. What would count as useful validation or learning in the next cycle?
9. What should we avoid building or deciding too early?

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

- Business identity, brand logic, mission, vision, principles and operating model -> \`strategy/business/\`
- Product description, problem, ICP, value proposition, positioning and business model -> \`strategy/product/\`
${validationMapping}
- Roadmap, milestones, current cycle and backlog -> \`strategy/roadmap/knowledge/\`

If a Strategy area is not active, do not propose writes to its missing path. Mention that the area is inactive and ask before activating or creating it.

Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before company, product and validation context are coherent.

## Fact and Uncertainty Rules

- Treat user-provided facts as facts.
- Treat model inferences as assumptions.
- Do not turn assumptions into source-of-truth facts.
- Put unknowns into \`## Open Questions\` or the relevant assumptions file.
- Keep weak or unvalidated claims visibly tentative.
- Prefer \`TBD\` over invented specificity.

## Validation Evidence Rules

- Assumption: something believed but not yet proven.
- Evidence: something observed from users, behavior, data or shipped product.
- Insight: interpretation of evidence.
- Decision: a committed change in strategy, MVP, roadmap or backlog.
- Roadmap impact: what changes because of the decision.
- Do not record validated learning without evidence.

## Write Protocol

Before writing, show a proposed change plan with:

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

Only after explicit confirmation, \`/start-leanos\` may update:

- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
${strategyFiles.map((file) => `- \`../../${file}\``).join("\n")}

Strategy Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before strategy is coherent.

## Forbidden Updates

During \`/start-leanos\`, do not modify:

- \`roles/\`
- \`skills/\`
- \`playbooks/\`
- \`workflows/\`
- \`../../ai-standard/\`
- \`../commands/\`
- \`../../.github/\`
- product code or files outside the LeanOS workspace
- Operations or Growth area files unless the user explicitly asks after init

Roles, skills, playbooks and workflows are operating assets. Use them to work; do not enrich them with company/product context during init.

## Confirmation Rule

Use propose-first mode.

Never write files during init until the user explicitly confirms the proposed source-of-truth updates.

If confirmation is ambiguous, do not write. Ask a focused follow-up question.

## Output

Return:

- Loaded context
- Workspace summary
- Active departments and areas
- Compatible workflows
- Missing founder context
- Gaps detected
- Proposed Strategy source-of-truth updates
- Files that would change after confirmation
- Open questions
- Next recommended command

## Active Areas

${activeAreas.map((area) => `- ${area.key}`).join("\n")}
`;
}

function getInitStrategySourceFiles(activeAreas: AreaDefinition[]): string[] {
  const activeKeys = new Set(activeAreas.map((area) => area.key));
  const files: string[] = [];

  if (activeKeys.has("strategy.business")) {
    files.push(
      "strategy/business/knowledge/profile.md",
      "strategy/business/knowledge/mission.md",
      "strategy/business/knowledge/vision.md",
      "strategy/business/knowledge/principles.md",
      "strategy/business/knowledge/operating-model.md",
      "strategy/business/knowledge/decision-log.md"
    );
  }

  if (activeKeys.has("strategy.product")) {
    files.push(
      "strategy/product/knowledge/brief.md",
      "strategy/product/knowledge/problem.md",
      "strategy/product/knowledge/icp.md",
      "strategy/product/knowledge/jobs-to-be-done.md",
      "strategy/product/knowledge/value-proposition.md",
      "strategy/product/knowledge/positioning.md",
      "strategy/product/knowledge/business-model-canvas.md",
      "strategy/product/knowledge/validation-notes.md"
    );
  }

  if (activeKeys.has("strategy.validation")) {
    files.push(
      "strategy/validation/assumptions.md",
      "strategy/validation/riskiest-assumptions.md",
      "strategy/validation/experiments.md",
      "strategy/validation/success-metrics.md",
      "strategy/validation/learning-log.md"
    );
  }

  if (activeKeys.has("strategy.roadmap")) {
    files.push(
      "strategy/roadmap/knowledge/roadmap.md",
      "strategy/roadmap/knowledge/milestones.md",
      "strategy/roadmap/knowledge/current-cycle.md",
      "strategy/roadmap/knowledge/backlog.md"
    );
  }

  return files;
}

function createFeaturesCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const productOpsNote = active.has("operations.product-ops")
    ? "Route through `../../operations/AGENT.md`, then load `../../operations/workflows/roadmap-item-to-epic.workflow.md` or `../../operations/workflows/epic-to-features.workflow.md` before Product Ops roles, skills or playbooks."
    : "`operations.product-ops` is not active. Do not draft implementation-ready Features until delivery scope and acceptance criteria are available or the user explicitly activates the area.";
  const productNote = active.has("strategy.product")
    ? "Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality."
    : "`strategy.product` is not active. Ask for product context before creating product-ready Features.";
  const engineeringNote = active.has("operations.engineering")
    ? "Load `../../operations/engineering/AGENT.md` and `../../operations/engineering/README.md` when features require implementation criteria."
    : "`operations.engineering` is not active. Draft only planning-level Features unless the user activates Engineering.";
  const designNote = active.has("operations.design")
    ? "Use `../../operations/design/AGENT.md` only when the epic or feature changes user-facing UX, screens, states, copy or interactions; use the README as the area map."
    : "Design is inactive. If the Feature has UX impact, flag the gap and ask before adding Design criteria.";
  const securityNote = active.has("operations.security")
    ? "Use `../../operations/security/AGENT.md` only when the Feature touches data, auth, permissions, privacy, abuse risk, compliance, API security, database security, secrets, infrastructure or AI-generated-code risk."
    : "Security is inactive. If the Feature has a security-sensitive surface, flag the gap and ask before adding Security criteria.";
  const devopsNote = active.has("operations.devops")
    ? "Use `../../operations/devops/AGENT.md` only when the Feature touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness."
    : "DevOps is inactive. If the Feature has delivery, environment or release impact, flag the gap and ask before adding DevOps criteria.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command to turn a confirmed local Epic into local LeanOS Features, or to route a roadmap/delivery item into the Epic-first flow before Feature creation.

This command must route through the local Operations workflows before roles, skills or playbooks. GitHub issue payloads are optional and come only after local Epic/Feature structure is clear.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../operations/AGENT.md\`
- \`../../operations/workflows/roadmap-item-to-epic.workflow.md\`
- \`../../operations/workflows/epic-to-features.workflow.md\`
- \`../../operations/product-ops/AGENT.md\`
- \`../../operations/product-ops/knowledge/work-taxonomy.md\`
- \`../../operations/product-ops/epics/README.md\`
- \`../../strategy/roadmap/AGENT.md\`
- \`../../strategy/roadmap/knowledge/roadmap.md\`
- \`../../strategy/roadmap/knowledge/backlog.md\`
- \`../../ai-standard/templates/github/github-epic-template.md\`
- \`../../ai-standard/templates/github/github-feature-template.md\`
- \`../../ai-standard/templates/github/delivery-readiness-matrix-template.md\`
- \`../../.github/ISSUE_TEMPLATE/epic.yml\`
- \`../../.github/ISSUE_TEMPLATE/feature.yml\`

## Navigation Route

1. \`../../AGENT.md\`
2. \`../../operations/AGENT.md\`
3. \`../../operations/workflows/roadmap-item-to-epic.workflow.md\` when starting from roadmap/backlog/delivery scope
4. \`../../operations/workflows/epic-to-features.workflow.md\` when starting from a confirmed local Epic
5. \`../../operations/product-ops/AGENT.md\`
6. \`../../operations/product-ops/roles/product-owner.role.md\`
7. \`../../operations/product-ops/skills/shape-epic.skill.md\` or \`../../operations/product-ops/skills/write-feature-criteria.skill.md\`
8. \`../../operations/product-ops/playbooks/delivery-scope-planning.playbook.md\` or \`../../operations/product-ops/playbooks/epic-to-features.playbook.md\`
9. Optional GitHub payload only after local Epic/Feature structure is clear and founder confirms

## Area Routing

- ${productNote}
- ${productOpsNote}
- ${engineeringNote}
- ${designNote}
- ${securityNote}
- ${devopsNote}

## Process

1. Identify whether the founder is asking for roadmap item to Epic, Epic to Features, or optional GitHub issue payload.
2. If input is a roadmap/backlog/delivery item, load \`../../operations/workflows/roadmap-item-to-epic.workflow.md\` before Product Ops execution assets.
3. If input is a confirmed local Epic, load \`../../operations/workflows/epic-to-features.workflow.md\` before Product Ops execution assets.
4. If input is only a loose idea, stop and route to \`../../strategy/workflows/new-idea-intake.workflow.md\` or \`../../strategy/workflows/idea-to-roadmap.workflow.md\`.
5. Apply the Delivery Readiness Matrix (DRM) before drafting GitHub-ready work.
6. Use Product Ops criteria for every Epic and Feature.
7. Use Engineering criteria for implementation-ready Features.
8. Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected.
9. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
10. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
11. Mark missing role input as an explicit gap; do not invent criteria.
12. Produce local drafts or a GitHub payload first and ask for confirmation before any future GitHub API write.

## Allowed Updates

None by default.

\`/create features\` may produce local Feature drafts or a future GitHub payload in chat. It must not write local Epic/Feature files or remote GitHub issues unless the founder confirms the proposed output and the next route.

## Forbidden Updates

During \`/create features\`, do not:

- create GitHub issues directly from model reasoning;
- call GitHub APIs;
- create branches, commits, PRs or code;
- create one issue per Task by default;
- write tokens, secrets or credentials;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`.

## Confirmation Rule

Ask for explicit founder confirmation before writing local files, generating an API-capable payload or asking a future capability/script to create remote GitHub items.

## Expected Output

- Epic draft or selected parent epic
- Proposed features
- Delivery Readiness Matrix (DRM)
- Product Ops criteria
- Design criteria or "not applicable" with reason
- Engineering criteria
- Security criteria or "not applicable" with reason
- DevOps criteria or "not applicable" with reason
- Dependencies and risks
- Source-of-truth files used
- Missing context
- Confirmation question before remote creation

## Remote Write Rule

Do not call GitHub API directly from the model. Generate a draft payload and ask for explicit confirmation. A future CLI/script capability performs the actual API write.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function githubSyncCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const productOpsNote = active.has("operations.product-ops")
    ? "Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/knowledge/work-taxonomy.md` and `../../operations/product-ops/epics/README.md` before reading local Epics and Features."
    : "`operations.product-ops` is not active. Do not sync product work until Product Ops exists or the founder explicitly activates it.";
  const devopsNote = active.has("operations.devops")
    ? "Load `../../operations/devops/AGENT.md`, `../../operations/devops/roles/github-devops.role.md`, `../../operations/devops/skills/configure-github-project.skill.md` and `../../operations/devops/playbooks/configure-github-project.playbook.md` before preparing GitHub sync."
    : "`operations.devops` is not active. Do not prepare remote sync until DevOps exists or the founder explicitly activates it.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command when the founder asks to sync local LeanOS Epics and Features to GitHub issues or GitHub Projects.

This command always starts with GitHub readiness. It prepares setup guidance, a sync plan and a dry-run payload. It does not authorize the model to call GitHub APIs directly.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../operations/product-ops/AGENT.md\`
- \`../../operations/product-ops/knowledge/work-taxonomy.md\`
- \`../../operations/product-ops/knowledge/ready-to-develop.md\`
- \`../../operations/product-ops/epics/README.md\`
- \`../../operations/devops/AGENT.md\`
- \`../../operations/devops/knowledge/github-management.md\`
- \`../../operations/devops/roles/github-devops.role.md\`
- \`../../operations/devops/skills/configure-github-project.skill.md\`
- \`../../operations/devops/playbooks/configure-github-project.playbook.md\`
- \`../../.github/leanos/work-mapping.md\`
- \`../../.github/leanos/project-sync.yaml\`
- \`../../.github/leanos/sync-state.yaml\`
- \`../../.github/leanos/labels.yaml\`
- \`../../.github/ISSUE_TEMPLATE/epic.yml\`
- \`../../.github/ISSUE_TEMPLATE/feature.yml\`

## Area Routing

- ${productOpsNote}
- ${devopsNote}

## Process

1. Run the GitHub readiness check.
2. If readiness is incomplete, stop sync and guide setup through DevOps.
3. If readiness passes, prepare a dry-run sync from local Epics and Features.
4. Ask for explicit founder confirmation before any remote write.
5. Hand the approved payload to a future CLI/script/capability.
6. Update sync state only after the capability reports successful remote writes.

## Phase 1: GitHub Readiness Check

Start here before reading Epics for sync.

Check:

1. \`../../.github/leanos/project-sync.yaml\` exists.
2. \`project-sync.yaml\` has owner, repository, project type and project URL or number filled in.
3. \`../../.github/leanos/sync-state.yaml\` exists.
4. \`../../.github/leanos/work-mapping.md\` exists and explains Epic -> Feature -> Task mapping.
5. \`../../.github/leanos/labels.yaml\` declares labels \`leanos\`, \`epic\` and \`feature\`.
6. GitHub issue templates exist:
   - \`../../.github/ISSUE_TEMPLATE/epic.yml\`
   - \`../../.github/ISSUE_TEMPLATE/feature.yml\`
7. AI Standard GitHub templates exist:
   - \`../../ai-standard/templates/github/github-epic-template.md\`
   - \`../../ai-standard/templates/github/github-feature-template.md\`
8. Token source is configured as one of:
   - \`LEANOS_GITHUB_TOKEN\`
   - \`GITHUB_TOKEN\`
   - \`GH_TOKEN\`
   - authenticated GitHub CLI
9. If \`../../.env.local\` exists, check only whether the expected variable names are present. Never print token values.
10. If a local tool-capable agent is available and the founder allows local checks, \`gh auth status\` may be used to validate GitHub CLI auth. Do not require terminal usage from the founder when chat guidance is enough.
11. For existing product repositories, confirm a Git remote is configured or ask the founder which GitHub repository should receive the sync.

## Phase 2: Setup Fallback

If readiness is incomplete, do not prepare a sync payload yet.

Instead:

1. Explain what is missing in founder-friendly language.
2. Route through DevOps:
   - \`../../operations/devops/AGENT.md\`
   - \`../../operations/devops/roles/github-devops.role.md\`
   - \`../../operations/devops/skills/configure-github-project.skill.md\`
   - \`../../operations/devops/playbooks/configure-github-project.playbook.md\`
3. Ask guided questions for missing owner, repository, project URL/number, project type, labels, fields and token source.
4. Propose updates before writing to:
   - \`../../operations/devops/knowledge/github-management.md\`
   - \`../../.github/leanos/project-sync.yaml\`
   - \`../../.github/leanos/labels.yaml\`
5. Never ask the founder to paste a token into chat or into a tracked file.
6. Tell the founder to store real tokens only in local environment variables, secure prompts, keychain, GitHub CLI auth or untracked local env files.
7. Stop after setup guidance unless the founder confirms the readiness updates and asks to continue to dry-run sync.

## Phase 3: Dry-Run Sync Process

Only run this phase after readiness passes.

1. Read \`../../operations/product-ops/epics/\`.
2. Identify local Epic folders and Feature files.
3. Ignore raw ideas, backlog notes, unsplit Epics and anything that does not follow Product Ops Epic/Feature structure.
4. Compare local Epics and Features with \`../../.github/leanos/sync-state.yaml\`.
5. Classify each item as \`create\`, \`update\`, \`already_synced\`, \`conflict\` or \`skip\`.
6. Map local Epics to GitHub issues with labels \`leanos\` and \`epic\`.
7. Map local Features to GitHub issues with labels \`leanos\` and \`feature\`.
8. Keep Feature Tasks as checklists inside the Feature issue by default.
9. Create separate Task issues only when a task needs separate ownership, review, deployment, security or external tracking.
10. Prepare a dry-run summary and draft payload.
11. Ask for explicit founder confirmation before any future GitHub API write.

## Phase 4: Confirmation Rule

Before any remote write, ask the founder to confirm:

- target owner and repository;
- GitHub Project URL or number;
- Epics to create or update;
- Features to create or update;
- milestones to create or update;
- labels and Project fields to apply;
- conflicts and skipped items;
- files that would be updated after successful sync.

If the founder does not confirm, stop after reporting the dry-run.

## Phase 5: Capability Handoff

The model must not perform the GitHub write itself.

After confirmation, hand the approved payload to a future CLI/script/capability that can:

- create or update milestones;
- create or update labels;
- create or update Epic issues;
- create or update Feature issues;
- add issues to GitHub Project;
- fill Project fields;
- return GitHub IDs, issue numbers, Project item IDs, timestamps and conflicts.

Only after that external capability reports success should LeanOS propose updating \`../../.github/leanos/sync-state.yaml\`.

## Allowed Updates

Only after explicit founder confirmation, update setup files:

- \`../../operations/devops/knowledge/github-management.md\`
- \`../../.github/leanos/project-sync.yaml\`
- \`../../.github/leanos/labels.yaml\`

Only after a future tool/script reports successful remote writes, and only after confirmation, update:

- \`../../.github/leanos/sync-state.yaml\`

\`sync-state.yaml\` may store GitHub issue numbers, IDs, project item IDs, timestamps and conflict state. It must never store tokens, secrets or credentials.

## Forbidden Updates

During \`/github-sync\`, do not:

- call GitHub API directly from model reasoning;
- assume GitHub is ready before Phase 1 passes;
- write tokens, secrets or credentials to any tracked file;
- ask the founder to paste a token into chat;
- create GitHub issues for raw ideas, backlog notes or unsplit Epics;
- create one GitHub issue per Task by default;
- treat \`synced\` as product readiness;
- start implementation from sync alone;
- overwrite local or remote state when there is a conflict.

## Output

Return:

- GitHub configuration status
- Token-source status without exposing token values
- GitHub CLI/auth status when checked
- Missing setup steps
- Founder-friendly setup guidance when readiness is incomplete
- Local Epics found
- Local Features found
- Items to create
- Items to update
- Items already synced
- Conflicts
- Skipped items and reasons
- Dry-run payload summary
- Files that would be updated after successful sync
- Confirmation question before any remote write

## Remote Write Rule

Do not call GitHub API directly from the model. Generate the dry-run payload and ask for explicit confirmation. A future CLI/script capability performs the actual GitHub write and returns results for \`sync-state.yaml\`.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function workonFeatureCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Use this command to start Feature delivery from a local Feature or mapped GitHub Feature issue.

This command must route through \`feature-to-delivery-cycle\` before Engineering implementation assets. A GitHub issue number alone is not enough to start coding.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../operations/AGENT.md\`
- \`../../operations/workflows/feature-to-delivery-cycle.workflow.md\`
- \`../../operations/product-ops/AGENT.md\`
- \`../../operations/product-ops/knowledge/work-taxonomy.md\`
- \`../../operations/product-ops/knowledge/ready-to-develop.md\`
- \`../../operations/product-ops/epics/README.md\`
- \`../../operations/engineering/AGENT.md\`
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/roles/senior-developer.role.md\`
- \`../../operations/engineering/knowledge/implementation-rules.md\`
- \`../../operations/engineering/knowledge/code-standards.md\`
- \`../../operations/engineering/knowledge/testing-strategy.md\`
- \`../../operations/engineering/skills/plan-implementation.skill.md\`
- \`../../operations/engineering/skills/create-branch.skill.md\`
- \`../../operations/engineering/skills/follow-code-standards.skill.md\`
- \`../../operations/engineering/playbooks/prepare-pr.playbook.md\`
- \`../../ai-standard/templates/github/delivery-readiness-matrix-template.md\`
- \`../../.github/leanos/branch-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before planning implementation.

## Navigation Route

1. \`../../AGENT.md\`
2. \`../../operations/AGENT.md\`
3. \`../../operations/workflows/feature-to-delivery-cycle.workflow.md\`
4. \`../../operations/product-ops/AGENT.md\`
5. \`../../operations/product-ops/knowledge/ready-to-develop.md\`
6. \`../../operations/design/AGENT.md when UI, flow, accessibility, copy or component readiness is needed\`
7. \`../../operations/security/AGENT.md when security risk is involved\`
8. \`../../operations/devops/AGENT.md when delivery infrastructure is involved\`
9. \`../../operations/engineering/AGENT.md\`
10. \`../../operations/engineering/roles/senior-developer.role.md\`
11. \`../../operations/engineering/playbooks/engineering-delivery.playbook.md\`

## Process

1. Read or request the full local Feature or mapped GitHub Feature issue body.
2. Summarize the Feature in the chat and ask the founder to confirm the interpretation.
3. Load \`../../operations/workflows/feature-to-delivery-cycle.workflow.md\` before Engineering execution assets.
4. Check Product Ops and Engineering readiness with the Delivery Readiness Matrix (DRM).
5. Check Design only when UX, UI, flow, accessibility, copy or interaction is affected.
6. Check Security only when data, auth, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
7. Check DevOps only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
8. Stop before code if Feature readiness is missing.
9. Propose the required Feature-linked branch name before code changes.
10. Produce an implementation plan and test plan.
11. Ask for confirmation before modifying product code.

## Allowed Updates

None by default.

\`/workon feature\` plans implementation. Product code, tests, branch creation and PR work require explicit founder confirmation and should proceed through \`feature-to-delivery-cycle\` and Engineering assets.

## Forbidden Updates

During \`/workon feature\`, do not:

- edit source code before readiness and branch confirmation;
- create branches, commits or PRs without explicit confirmation;
- skip Product Ops, Design, Security or DevOps readiness when applicable;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`;
- treat a GitHub issue number as proof that the Feature is ready to develop.

## Confirmation Rule

Ask the founder to confirm the Feature interpretation, readiness summary, branch name and implementation plan before editing code.

## Expected Output

- Feature summary
- Readiness gaps
- Branch name proposal
- Implementation plan
- Test plan
- Likely files to change
- Risks
- Confirmation question before code changes

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function createBranchCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Prepare a safe branch name before any implementation work.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../operations/engineering/AGENT.md\`
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/skills/create-branch.skill.md\`
- \`../../operations/engineering/playbooks/branch-for-feature.playbook.md\`
- \`../../ai-standard/templates/github/branch-name-template.md\`
- \`../../.github/leanos/branch-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before creating a branch plan.

## Process

1. Confirm the local Feature slug or mapped GitHub issue number.
2. Use \`feature/<feature-slug>-<short-kebab-slug>\` for local-only Features.
3. Use \`issue/<issue-number>-<short-kebab-slug>\` only when the Feature is mapped to a real GitHub issue.
4. Keep the slug short and scoped to the Feature.
5. Avoid secrets, customer names and sensitive details.
6. Ask before reusing an existing branch.
7. Do not run git commands unless the user explicitly asks in a tool-capable environment.

## Allowed Updates

None by default.

This command proposes a safe branch name. Creating the branch requires explicit founder confirmation and a tool-capable environment.

## Forbidden Updates

During \`/create branch\`, do not:

- edit source code;
- create commits or PRs;
- create a branch without Feature or mapped GitHub issue context;
- include secrets, customer names or sensitive details in the branch name;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`.

## Confirmation Rule

Ask before creating or reusing a branch.

## Expected Output

- Proposed branch name
- Linked Feature or GitHub issue
- Naming rationale
- Safety checks
- Next command recommendation

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function createPrCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Prepare a pull request draft that follows LeanOS structure and GitHub conventions.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../operations/engineering/AGENT.md\`
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/knowledge/review-criteria.md\`
- \`../../operations/engineering/skills/create-pr.skill.md\`
- \`../../operations/engineering/playbooks/prepare-pr.playbook.md\`
- \`../../ai-standard/templates/github/pull-request-template.md\`
- \`../../.github/PULL_REQUEST_TEMPLATE.md\`
- \`../../.github/leanos/pr-validation-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before preparing a PR.

## Process

1. Confirm the linked issue, parent epic and branch.
2. Summarize changed behavior and why it matters.
3. Map changes to acceptance criteria.
4. Include Product/MVP alignment.
5. Include Design notes only when user-facing UX changed.
6. Include Security notes only when data, auth, privacy, abuse or compliance is involved.
7. Include tests run or explain why they were not run.
8. Include a Founder Testing Guide with where to test, how to test and expected result.
9. Produce a PR body draft first and ask for confirmation before any remote PR creation.

## Allowed Updates

None by default.

This command may draft a PR body in chat. Remote PR creation requires explicit founder confirmation and a future tool/script capability.

## Forbidden Updates

During \`/create pr\`, do not:

- create or update a remote PR directly from model reasoning;
- mark the PR merge-ready without PR validation;
- omit the Founder Testing Guide;
- hide missing tests, security checks or review gaps;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`.

## Confirmation Rule

Ask before any remote PR creation or PR update.

## Expected Output

- PR title
- PR body
- Linked issue and parent epic
- Checklist state
- Tests
- Founder Testing Guide
- Risks
- Confirmation question before remote PR creation

## Remote Write Rule

Do not create the PR directly from the model. Generate the draft and ask for explicit confirmation. A future CLI/script capability performs the actual GitHub write.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function reviewPrCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Review a PR against the linked LeanOS Feature or mapped GitHub issue, MVP, product, design, security, testing and engineering criteria.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../operations/engineering/AGENT.md\`
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/roles/pr-reviewer.role.md\`
- \`../../operations/engineering/knowledge/review-criteria.md\`
- \`../../operations/engineering/knowledge/code-standards.md\`
- \`../../operations/engineering/skills/review-pr.skill.md\`
- \`../../operations/engineering/playbooks/pr-validation.playbook.md\`
- \`../../operations/product-ops/knowledge/ready-to-develop.md\`
- \`../../operations/product-ops/epics/README.md\`
- \`../../ai-standard/templates/review/code-review-template.md\`
- \`../../.github/leanos/pr-validation-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before reviewing the PR.

## Process

1. Load the PR description, linked Feature or GitHub issue and diff when available.
2. Check scope against the Feature, parent Epic and MVP acceptance criteria.
3. Review correctness and likely regressions.
4. Review tests and manual validation.
5. Review Product alignment.
6. Review Design only when UX changed.
7. Review Security only when data, auth, permissions, privacy, abuse or compliance is involved.
8. Validate that the Founder Testing Guide lets a non-technical founder test the PR.
9. List findings first, ordered by severity.
10. Recommend approve, request changes or blocked by missing context.

## Allowed Updates

None by default.

\`/review pr\` reports findings and recommendations. It may propose code changes, test changes or PR description updates, but must not apply them without explicit confirmation.

## Forbidden Updates

During \`/review pr\`, do not:

- approve or merge PRs automatically;
- edit source code from review mode without founder confirmation;
- ignore product, Design, Security or testing gaps when applicable;
- convert suggestions into changes without approval;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\`.

## Confirmation Rule

Ask before applying review fixes, updating PR text or changing remote PR state.

## Expected Output

- Findings by severity
- File or area references
- Feature scope result
- Product alignment result
- Founder acceptance result
- Design result or "not applicable"
- Security result or "not applicable"
- Test confidence
- Open questions
- Final recommendation

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function routingCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const areaAvailable = !command.area || activeSubareas.includes(command.area);
  const areaGuidance = command.area
    ? areaAvailable
      ? `Route through \`../../${getArea(command.area).path}/README.md\`.`
      : `This command normally uses \`${command.area}\`, which is not active in this workspace. Do not load missing paths. Ask whether to activate or create that area before executing.`
    : "Use AGENT.md and the routing map to choose the smallest active area context.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Load First

Read:

- \`../../AGENT.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/routing-map.yaml\`

## Process

1. ${areaGuidance}
2. Load the department AGENT.md or README first.
3. Activate the role named by the area README.
4. Load only the required skills and playbook.
5. Produce the requested output.

## Validation Rules

- Separate assumption, evidence, insight, decision and roadmap impact.
- Do not treat assumptions as validated learning.
- If the request affects roadmap, MVP or issue scope, identify whether evidence exists.
- If evidence is missing, propose a validation step before committing roadmap or implementation changes.

## Allowed Updates

None by default.

This command may propose updates after routing to the correct area. It must not write files unless the founder confirms the proposed change.

## Forbidden Updates

Do not:

- skip the department or area route;
- load missing inactive-area paths;
- create branches, commits, PRs or remote GitHub writes;
- modify roles, skills, playbooks, workflows, commands or \`ai-standard/\` unless this is an explicit asset-creation command;
- invent evidence, learning or roadmap decisions.

## Confirmation Rule

Ask before writing any file or moving to a workflow that changes product, roadmap, delivery or remote state.

## Expected Output

- Route selected
- Context loaded
- Relevant role, skill or playbook recommendation
- Output requested by the founder
- Missing context or inactive-area warning when applicable

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function assetCreationCommand(command: CommandDefinition, activeAreas: AreaDefinition[]): string {
  const activeKeys = new Set(activeAreas.map((area) => area.key));

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Load First

First consult:

- \`../../ai-standard/README.md\`
- \`../../ai-standard/foundation/navigation-chain.md\`
- \`../../ai-standard/foundation/creation-rules.md\`
- \`../../ai-standard/templates/\`
- \`../../ai-standard/checklists/\`
- \`../../ai-standard/instructions/\`

## Area-First Rule

Create role, skill and playbook assets inside the correct active area:

${getAllAreas().map((area) => `- ${area.name} assets: \`../../${area.path}/\`${activeKeys.has(area.key) ? "" : " (not active; ask before activating or creating it)"}`).join("\n")}

## Process

1. Identify the correct department and active area.
2. Load the area README or AGENT.md before creating assets.
3. Load the relevant AI Standard taxonomy, instructions, template and checklist.
4. Propose the asset path, name and purpose.
5. Ask for confirmation before writing files.
6. Create only the requested asset type and keep it inside the owning area.

## Allowed Updates

Only after explicit founder confirmation:

- new or updated role files inside an active area \`roles/\`;
- new or updated skill files inside an active area \`skills/\`;
- new or updated playbook files inside an active area \`playbooks/\`;
- related README or area index updates when needed and confirmed.

## Forbidden Updates

Do not:

- create assets at department root;
- create assets inside inactive areas without explicit activation or confirmation;
- modify product source code;
- write secrets or credentials;
- modify unrelated roles, skills, playbooks, workflows, commands or \`ai-standard/\`;
- use examples as active workspace context.

## Confirmation Rule

Ask before creating or updating any asset file.

## Expected Output

- Selected department and area
- Assets to create
- Templates used
- Checklists used
- Files created or updated

## Active Areas

${activeAreas.map((area) => `- ${area.key}`).join("\n")}
`;
}
