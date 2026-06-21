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
  if (command.assetCreation) return assetCreationCommand(command, activeAreas);
  if (command.slug === "create-issues") return createIssuesCommand(command, activeKeys);
  if (command.slug === "workon-issue") return workonIssueCommand(command, activeKeys);
  if (command.slug === "create-branch") return createBranchCommand(command, activeKeys);
  if (command.slug === "create-pr") return createPrCommand(command, activeKeys);
  if (command.slug === "review-pr") return reviewPrCommand(command, activeKeys);

  return routingCommand(command, activeKeys);
}

function startCommand(activeAreas: AreaDefinition[]): string {
  const strategyFiles = getInitStrategySourceFiles(activeAreas);

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

- Company identity, mission, vision, principles and operating model -> \`strategy/company/\`
- Product description, problem, ICP, value proposition, positioning and business model -> \`strategy/product/\`
- Assumptions, riskiest assumptions, experiments, success metrics and learning -> \`strategy/validation/\`
- Roadmap, milestones, current cycle and backlog -> \`strategy/roadmap/\`

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

  if (activeKeys.has("strategy.company")) {
    files.push(
      "strategy/company/profile.md",
      "strategy/company/mission.md",
      "strategy/company/vision.md",
      "strategy/company/principles.md",
      "strategy/company/operating-model.md"
    );
  }

  if (activeKeys.has("strategy.product")) {
    files.push(
      "strategy/product/brief.md",
      "strategy/product/problem.md",
      "strategy/product/icp.md",
      "strategy/product/jobs-to-be-done.md",
      "strategy/product/value-proposition.md",
      "strategy/product/positioning.md",
      "strategy/product/business-model-canvas.md"
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
      "strategy/roadmap/roadmap.md",
      "strategy/roadmap/milestones.md",
      "strategy/roadmap/current-cycle.md",
      "strategy/roadmap/backlog.md"
    );
  }

  return files;
}

function createIssuesCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const active = new Set(activeSubareas);
  const coreNote = active.has("operations.core")
    ? "Load `../../operations/core/README.md` and MVP source-of-truth files before drafting issues."
    : "`operations.core` is not active. Do not draft implementation-ready issues until MVP scope and acceptance criteria are available or the user explicitly activates the area.";
  const productNote = active.has("strategy.product")
    ? "Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality."
    : "`strategy.product` is not active. Ask for product context before creating product-ready issues.";
  const engineeringNote = active.has("operations.engineering")
    ? "Load `../../operations/engineering/README.md` when sub-issues require implementation criteria."
    : "`operations.engineering` is not active. Draft only planning-level issues unless the user activates Engineering.";
  const designNote = active.has("operations.design")
    ? "Use `../../operations/design/README.md` only when the epic or sub-issue changes user-facing UX, screens, states, copy or interactions."
    : "Design is inactive. If the issue has UX impact, flag the gap and ask before adding Design criteria.";
  const securityNote = active.has("operations.security")
    ? "Use `../../operations/security/README.md` only when the issue touches data, auth, permissions, privacy, abuse risk or compliance."
    : "Security is inactive. If the issue has a security-sensitive surface, flag the gap and ask before adding Security criteria.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Draft GitHub-ready epics and sub-issues from roadmap, MVP scope and issue readiness criteria.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../ai-standard/templates/github-epic-template.md\`
- \`../../ai-standard/templates/github-subissue-template.md\`
- \`../../ai-standard/templates/issue-readiness-matrix-template.md\`
- \`../../.github/ISSUE_TEMPLATE/epic.yml\`
- \`../../.github/ISSUE_TEMPLATE/sub-issue.yml\`

## Area Routing

- ${productNote}
- ${coreNote}
- ${engineeringNote}
- ${designNote}
- ${securityNote}

## Process

1. Identify the roadmap item, MVP scope, milestone and parent epic context.
2. Apply the Issue Readiness Matrix before drafting work.
3. Use Product criteria for every epic and sub-issue.
4. Use Engineering criteria for implementation-ready sub-issues.
5. Add Design criteria only when user-facing UX is affected.
6. Add Security criteria only when data, auth, permissions, privacy, abuse or compliance is involved.
7. Split epics into sub-issues only when the parent epic has enough context.
8. Mark missing role input as an explicit gap; do not invent criteria.
9. Produce drafts first and ask for confirmation before any future GitHub API write.

## Output

- Epic draft or selected parent epic
- Proposed sub-issues
- Product criteria
- Design criteria or "not applicable"
- Engineering criteria
- Security criteria or "not applicable"
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

function workonIssueCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

Plan implementation from a GitHub issue before changing code.

## Load First

Read:

- \`../../AGENT.md\`
- \`../index/routing-map.yaml\`
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/roles/senior-developer.role.md\`
- \`../../operations/engineering/skills/plan-implementation.skill.md\`
- \`../../operations/engineering/skills/create-branch.skill.md\`
- \`../../operations/engineering/playbooks/issue-to-pr.playbook.md\`
- \`../../ai-standard/templates/issue-readiness-matrix-template.md\`
- \`../../.github/leanos/branch-rules.md\`

If \`operations.engineering\` is not active, do not load missing paths. Ask whether to activate or create Engineering before planning implementation.

## Process

1. Read or request the full GitHub issue body.
2. Summarize the issue in the chat and ask the user to confirm the interpretation.
3. Check Product and Engineering readiness.
4. Check Design only when UX is affected.
5. Check Security only when data, auth, privacy, abuse or compliance is involved.
6. Propose the required issue-linked branch name before code changes.
7. Produce an implementation plan and test plan.
8. Ask for confirmation before modifying product code.

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
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/skills/create-branch.skill.md\`
- \`../../operations/engineering/playbooks/branch-from-issue.playbook.md\`
- \`../../ai-standard/templates/branch-name-template.md\`
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
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/skills/create-pr.skill.md\`
- \`../../operations/engineering/playbooks/issue-to-pr.playbook.md\`
- \`../../ai-standard/templates/pull-request-template.md\`
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
8. Produce a PR body draft first and ask for confirmation before any remote PR creation.

## Output

- PR title
- PR body
- Linked issue and parent epic
- Checklist state
- Tests
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
- \`../../operations/engineering/README.md\`
- \`../../operations/engineering/roles/pr-reviewer.role.md\`
- \`../../operations/engineering/skills/review-pr.skill.md\`
- \`../../operations/engineering/playbooks/pr-validation.playbook.md\`
- \`../../ai-standard/templates/code-review-template.md\`
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
8. List findings first, ordered by severity.
9. Recommend approve, request changes or blocked by missing context.

## Output

- Findings by severity
- File or area references
- Product alignment result
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
- \`../../ai-standard/navigation-chain.md\`
- \`../../ai-standard/creation-rules.md\`
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
