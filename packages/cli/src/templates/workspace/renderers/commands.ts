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
  if (command.assetCreation) return assetCreationCommand(command, activeAreas);
  if (command.slug === "shape-mvp") return shapeMvpCommand(command, activeKeys);
  if (command.slug === "define-design") return defineDesignCommand(command, activeKeys);
  if (command.slug === "create-issues") return createIssuesCommand(command, activeKeys);
  if (command.slug === "github-sync") return githubSyncCommand(command, activeKeys);
  if (command.slug === "workon-issue") return workonIssueCommand(command, activeKeys);
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

function shapeMvpCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
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
        "- `../../strategy/product/knowledge/business-model.md`"
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

Use this command when the founder asks to shape the first version of the product, decide what enters the MVP or clarify what must stay out before delivery planning.

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

1. Treat \`/shape-mvp\` as the safe entrypoint for MVP scope definition.
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

During \`/shape-mvp\`, do not:

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

function createIssuesCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const productOpsNote = active.has("operations.product-ops")
    ? "Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/README.md` and MVP knowledge files before drafting issues."
    : "`operations.product-ops` is not active. Do not draft implementation-ready issues until delivery scope and acceptance criteria are available or the user explicitly activates the area.";
  const productNote = active.has("strategy.product")
    ? "Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality."
    : "`strategy.product` is not active. Ask for product context before creating product-ready issues.";
  const engineeringNote = active.has("operations.engineering")
    ? "Load `../../operations/engineering/AGENT.md` and `../../operations/engineering/README.md` when features require implementation criteria."
    : "`operations.engineering` is not active. Draft only planning-level issues unless the user activates Engineering.";
  const designNote = active.has("operations.design")
    ? "Use `../../operations/design/AGENT.md` only when the epic or feature changes user-facing UX, screens, states, copy or interactions; use the README as the area map."
    : "Design is inactive. If the issue has UX impact, flag the gap and ask before adding Design criteria.";
  const securityNote = active.has("operations.security")
    ? "Use `../../operations/security/AGENT.md` only when the issue touches data, auth, permissions, privacy, abuse risk, compliance, API security, database security, secrets, infrastructure or AI-generated-code risk."
    : "Security is inactive. If the issue has a security-sensitive surface, flag the gap and ask before adding Security criteria.";
  const devopsNote = active.has("operations.devops")
    ? "Use `../../operations/devops/AGENT.md` only when the issue touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness."
    : "DevOps is inactive. If the issue has delivery, environment or release impact, flag the gap and ask before adding DevOps criteria.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Draft GitHub-ready epics and features from roadmap, delivery scope and issue readiness criteria.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../ai-standard/templates/github/github-epic-template.md\`
- \`../../ai-standard/templates/github/github-feature-template.md\`
- \`../../ai-standard/templates/github/delivery-readiness-matrix-template.md\`
- \`../../.github/ISSUE_TEMPLATE/epic.yml\`
- \`../../.github/ISSUE_TEMPLATE/feature.yml\`
- \`../../operations/product-ops/playbooks/epic-to-features.playbook.md\`

## Area Routing

- ${productNote}
- ${productOpsNote}
- ${engineeringNote}
- ${designNote}
- ${securityNote}
- ${devopsNote}

## Process

1. Identify the roadmap item, delivery scope, milestone and parent epic context.
2. Route through Product Ops and load \`../../operations/product-ops/playbooks/epic-to-features.playbook.md\`.
3. Apply the Delivery Readiness Matrix (DRM) before drafting work.
4. Use Product Ops criteria for every epic and feature.
5. Use Engineering criteria for implementation-ready features.
6. Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected.
7. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
8. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
9. Split epics into features only when the parent epic has enough context.
10. Mark missing role input as an explicit gap; do not invent criteria.
11. Produce drafts first and ask for confirmation before any future GitHub API write.

## Output

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

This command prepares a sync plan and dry-run payload. It does not authorize the model to call GitHub APIs directly.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../operations/product-ops/AGENT.md\`
- \`../../operations/product-ops/knowledge/work-taxonomy.md\`
- \`../../operations/product-ops/knowledge/ready-to-develop.md\`
- \`../../operations/product-ops/epics/README.md\`
- \`../../.github/leanos/work-mapping.md\`
- \`../../.github/leanos/project-sync.yaml\`
- \`../../.github/leanos/sync-state.yaml\`
- \`../../.github/leanos/labels.yaml\`
- \`../../.github/ISSUE_TEMPLATE/epic.yml\`
- \`../../.github/ISSUE_TEMPLATE/feature.yml\`

## Area Routing

- ${productOpsNote}
- ${devopsNote}

## Preflight

Before proposing any sync:

1. Confirm GitHub configuration exists in \`../../.github/leanos/project-sync.yaml\`.
2. Confirm the token source is an environment or secure prompt source; never ask the founder to paste tokens into tracked files.
3. Confirm labels \`leanos\`, \`epic\` and \`feature\` exist or will be created by a future script.
4. Read \`../../.github/leanos/work-mapping.md\` before mapping local files to remote issues.
5. If configuration is missing, stop and recommend GitHub setup through DevOps before sync.

## Process

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

## Allowed Updates

Only after a future tool/script reports successful remote writes, and only after confirmation, update:

- \`../../.github/leanos/sync-state.yaml\`

\`sync-state.yaml\` may store GitHub issue numbers, IDs, project item IDs, timestamps and conflict state. It must never store tokens, secrets or credentials.

## Forbidden Updates

During \`/github-sync\`, do not:

- call GitHub API directly from model reasoning;
- write tokens, secrets or credentials to any tracked file;
- create GitHub issues for raw ideas, backlog notes or unsplit Epics;
- create one GitHub issue per Task by default;
- treat \`synced\` as product readiness;
- start implementation from sync alone;
- overwrite local or remote state when there is a conflict.

## Output

Return:

- GitHub configuration status
- Token-source status without exposing token values
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

function workonIssueCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Plan implementation from a GitHub issue before changing code.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
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

## Process

1. Read or request the full GitHub issue body.
2. Summarize the issue in the chat and ask the user to confirm the interpretation.
3. Check Product Ops and Engineering readiness with the Delivery Readiness Matrix (DRM).
4. Check Design only when UX, UI, flow, accessibility, copy or interaction is affected.
5. Check Security only when data, auth, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
6. Check DevOps only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
7. Propose the required issue-linked branch name before code changes.
8. Produce an implementation plan and test plan.
9. Ask for confirmation before modifying product code.

## Output

- Issue summary
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
- \`../../operations/engineering/playbooks/branch-from-issue.playbook.md\`
- \`../../ai-standard/templates/github/branch-name-template.md\`
- \`../../.github/leanos/branch-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before creating a branch plan.

## Process

1. Confirm the issue number and issue title.
2. Use the required format: \`issue/<issue-number>-<short-kebab-slug>\`.
3. Keep the slug short and scoped to the issue.
4. Avoid secrets, customer names and sensitive details.
5. Ask before reusing an existing branch.
6. Do not run git commands unless the user explicitly asks in a tool-capable environment.

## Output

- Proposed branch name
- Linked issue
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

## Output

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

Review a PR against LeanOS issue, MVP, product, design, security and engineering criteria.

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
- \`../../ai-standard/templates/review/code-review-template.md\`
- \`../../.github/leanos/pr-validation-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before reviewing the PR.

## Process

1. Load the PR description, linked issue and diff when available.
2. Check scope against the issue and MVP acceptance criteria.
3. Review correctness and likely regressions.
4. Review tests and manual validation.
5. Review Product alignment.
6. Review Design only when UX changed.
7. Review Security only when data, auth, permissions, privacy, abuse or compliance is involved.
8. Validate that the Founder Testing Guide lets a non-technical founder test the PR.
9. List findings first, ordered by severity.
10. Recommend approve, request changes or blocked by missing context.

## Output

- Findings by severity
- File or area references
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

## Before Acting

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

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function assetCreationCommand(command: CommandDefinition, activeAreas: AreaDefinition[]): string {
  const activeKeys = new Set(activeAreas.map((area) => area.key));

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

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
