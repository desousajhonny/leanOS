import { getActiveSubareaKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry, WorkspaceAnswers } from "../types.js";
import { folderReadme, toTitle } from "../content/shared.js";

export function githubFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const engineeringActive = activeKeys.has("operations.engineering");
  const devopsActive = activeKeys.has("operations.devops");
  const securityActive = activeKeys.has("operations.security");
  const engineeringNote = engineeringActive
    ? "Route GitHub branch, PR and validation work through `../../operations/engineering/AGENT.md` before changing GitHub workflow files."
    : "Operations Engineering is not active in this workspace. Ask before activating it or changing GitHub workflow files.";
  const devopsNote = devopsActive
    ? "Route GitHub setup through `../../operations/devops/AGENT.md` before configuring project sync."
    : "Operations DevOps is not active in this workspace. Ask before configuring GitHub Project sync.";
  const securityNote = securityActive
    ? "Route security automation readiness through `../../operations/security/AGENT.md` before adding scanner workflows or security gates."
    : "Operations Security is not active in this workspace. Ask before adding security automation or scanner workflows.";

  return [
    ...(answers.prepareGithubManagement ? [{ path: ".env.local", content: envLocal() }] : []),
    { path: ".gitignore", content: workspaceGitignore() },
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nStart from `../AGENT.md` and follow the LeanOS Navigation Chain before implementing product work.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    { path: ".github/ISSUE_TEMPLATE/epic.yml", content: epicIssueTemplate() },
    { path: ".github/ISSUE_TEMPLATE/feature.yml", content: featureIssueTemplate() },
    ...["bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: folderReadme("GitHub LeanOS", "GitHub support files for LeanOS workflow conventions.", "Use when configuring labels, GitHub Projects sync, branch rules, PR validation guidance, security automation or deploy readiness.", "project-sync.yaml", ["github-settings.example.json", "work-mapping.md", "project-sync.yaml", "sync-state.yaml", "labels.yaml", "branch-rules.md", "pr-validation-rules.md", "security-automation.md"], ["../ISSUE_TEMPLATE/", "../../operations/devops/", "../../operations/engineering/", "../../operations/security/"], `${devopsNote}\n\n${engineeringNote}\n\n${securityNote}\n\nVercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create \`vercel.json\` only when a real app/framework needs overrides.`) },
    { path: ".github/leanos/github-settings.example.json", content: githubSettingsExampleJson() },
    { path: ".github/leanos/work-mapping.md", content: workMappingRules() },
    { path: ".github/leanos/labels.yaml", content: labelsYaml() },
    { path: ".github/leanos/project-sync.yaml", content: projectSyncYaml(answers) },
    { path: ".github/leanos/sync-state.yaml", content: syncStateYaml() },
    { path: ".github/leanos/branch-rules.md", content: branchRules() },
    { path: ".github/leanos/pr-validation-rules.md", content: prValidationRules() },
    { path: ".github/leanos/security-automation.md", content: securityAutomationReadiness() }
  ];
}

function epicIssueTemplate(): string {
  return `name: Epic
description: Roadmap-level LeanOS epic.
title: "[EPIC] "
labels: ["leanos", "epic"]
body:
  - type: input
    id: local-epic-key
    attributes:
      label: Local epic key
      description: Stable LeanOS epic key, for example customer-management.
    validations:
      required: true
  - type: textarea
    id: outcome
    attributes:
      label: Outcome
      description: What business, user or validation outcome should this epic create?
    validations:
      required: true
  - type: textarea
    id: strategic-context
    attributes:
      label: Strategic context
      description: Product, ICP, problem, value proposition and validation assumption.
    validations:
      required: true
  - type: textarea
    id: delivery-scope-linkage
    attributes:
      label: Delivery scope and roadmap linkage
      description: Delivery scope, non-goals, acceptance criteria, roadmap item and milestone.
    validations:
      required: true
  - type: textarea
    id: decision-ownership
    attributes:
      label: Decision ownership
      description: Product Owner, Roadmap/Strategy reviewer and any conditional Engineering, Design, Security or DevOps reviewer.
    validations:
      required: true
  - type: textarea
    id: epic-readiness-matrix
    attributes:
      label: Epic readiness matrix
      description: Product Ops and Roadmap are required; Engineering, Design, Security and DevOps are conditional. Explain required/not applicable for each.
    validations:
      required: true
  - type: textarea
    id: feature-breakdown
    attributes:
      label: Feature breakdown
      description: Expected features, dependencies, risks and open questions.
`;
}

function featureIssueTemplate(): string {
  return `name: Feature
description: Implementation-ready feature derived from an epic.
title: "[FEATURE: <epic>] "
labels: ["leanos", "feature"]
body:
  - type: input
    id: local-feature-key
    attributes:
      label: Local feature key
      description: Stable LeanOS feature key, for example create-customer-profile.
    validations:
      required: true
  - type: input
    id: parent-epic
    attributes:
      label: Parent epic
      description: Link the parent epic issue number.
      placeholder: "#654"
    validations:
      required: true
  - type: textarea
    id: purpose-scope
    attributes:
      label: Purpose and scope
      description: Why this feature exists, what is included and what is explicitly excluded.
    validations:
      required: true
  - type: textarea
    id: product-criteria
    attributes:
      label: Product criteria
      description: User story, user value, acceptance criteria and success or learning signal.
    validations:
      required: true
  - type: textarea
    id: tasks
    attributes:
      label: Tasks
      description: Internal implementation checklist for this feature.
    validations:
      required: true
  - type: textarea
    id: delivery-readiness-matrix
    attributes:
      label: Delivery Readiness Matrix
      description: Product Ops and Engineering are required. Design, Security and DevOps are required only when applicable; otherwise explain why not applicable.
    validations:
      required: true
  - type: textarea
    id: design-criteria
    attributes:
      label: Design criteria
      description: Required only when user-facing UX, screens, states, copy or interactions are involved. Otherwise say not applicable.
  - type: textarea
    id: engineering-criteria
    attributes:
      label: Engineering criteria
      description: Technical notes, dependencies, test expectations and operational notes.
    validations:
      required: true
  - type: textarea
    id: security-criteria
    attributes:
      label: Security criteria
      description: Required only when data, auth, permissions, privacy, abuse or compliance are involved. Otherwise say not applicable.
`;
}

function issueTemplate(fileName: string, name: string, description: string): FileEntry {
  return {
    path: `.github/ISSUE_TEMPLATE/${fileName}`,
    content: `name: ${name}
description: ${description}
title: "[${name}]: "
labels: ["leanos"]
body:
  - type: textarea
    id: context
    attributes:
      label: Context
      description: What problem, assumption, roadmap item or workflow does this relate to?
    validations:
      required: true
  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: What should be done?
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance criteria
      description: How will we know this is complete?
    validations:
      required: true
`
  };
}

function envLocal(): string {
  return `# LeanOS local environment
# Local only. Do not commit.
# Used by future LeanOS GitHub capabilities after /configure github.

LEANOS_GITHUB_TOKEN=
GITHUB_TOKEN=
`;
}

function workspaceGitignore(): string {
  return `# Dependencies
node_modules/

# Build output
dist/
.next/
out/
build/

# Local environment and secrets
.env
.env.local
.env.*.local

# Vercel local project metadata
.vercel/

# Logs and OS files
*.log
.DS_Store
Thumbs.db
`;
}

function pullRequestTemplate(): string {
  return `# Pull Request

## Summary

Describe what changed and why.

## Linked Issue

Closes #

## Parent Epic

Epic #

## LeanOS Context

- Active Department:
- Active Area:
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Product / Delivery Scope Alignment

- Strategy alignment:
- Delivery scope alignment:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Security Notes

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Build or test command run
- [ ] Manual validation completed

## Founder Testing Guide

Explain how a non-technical founder can test this PR before merge.

### What Changed

Plain-language summary of the user-facing or business behavior delivered.

### Where to Test

- Preview URL:
- Local route or screen:
- Test account or data:

### How to Test

1. Open...
2. Do...
3. Confirm...

### Expected Result

What the founder should see when the PR works.

### Out of Scope

What this PR intentionally does not cover.

### Known Risks or Limits

Anything the founder should know before approving.

## Risks

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## LeanOS Review Checklist

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Tests run or explained
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] No unrelated scope added
`;
}

function branchRules(): string {
  return `# Branch Rules

## Required Format

\`\`\`text
issue/<issue-number>-<short-kebab-slug>
\`\`\`

Examples:

\`\`\`text
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Rules

- Create a branch before changing product code.
- Do not implement issue work on the default branch.
- Always include the real GitHub issue number.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- If the branch already exists, ask before continuing.
- Keep branch scope aligned with the linked issue, delivery scope and acceptance criteria.
`;
}

function prValidationRules(): string {
  return `# PR Validation Rules

## Required Context

- Linked issue and parent epic when available.
- Delivery scope and non-goals.
- Acceptance criteria.
- Relevant Product, Design, Engineering and Security criteria.
- Tests or manual validation evidence.
- Founder Testing Guide from the PR description.

## Review Dimensions

- Correctness: does the change work?
- Scope control: does it avoid unrelated work?
- Product alignment: does it satisfy user value and acceptance criteria?
- Founder acceptance: can a non-technical founder test the change from the PR?
- Design: required only when user-facing UX changed.
- Security: required when data, auth, permissions, privacy, abuse or compliance is involved.
- Tests: are automated or manual checks sufficient?
- LeanOS coherence: does it contradict source-of-truth files?

## Decision

- Approve only when acceptance criteria are addressed, risks are clear and the Founder Testing Guide is usable.
- Request changes for bugs, missing tests, scope drift or security/design gaps.
- Request changes when the PR cannot be tested by the founder from the provided steps or preview/local route instructions.
- Mark "blocked by missing context" when issue, MVP or criteria are unclear.
`;
}

function securityAutomationReadiness(): string {
  return `# Security Automation Readiness

## Purpose

Track which automated security checks should be enabled for this repository before production readiness.

This file is guidance-only in the initial scaffold. Do not create scanner workflows from this file alone.

## Read First

- \`../../operations/security/AGENT.md\`
- \`../../operations/security/knowledge/security-automation.md\`
- \`../../operations/security/playbooks/security-automation-readiness.playbook.md\`
- \`../../operations/devops/knowledge/ci-cd.md\`

## Candidate Checks

- Secret scanning
- Dependency audit / dependency review
- SAST / code scanning
- IaC or config scanning
- API security checks
- Container scanning, when containers exist
- License/supply-chain review, when dependencies matter

## Activation Rules

- Enable only after language, framework, package manager and stable commands are known.
- Prefer GitHub-native security features when available and appropriate.
- Do not create blocking CI workflows before the project has reliable build/test commands.
- Do not disable or bypass existing scanners without explicit human review.
- Do not store scanner tokens, provider tokens or secrets in tracked files.

## Readiness Matrix

| Check | Status | Required Before Production | Notes |
|---|---|---|---|
| Secret scanning | not_configured | yes | Enable or document provider limitation. |
| Dependency audit | not_configured | yes | Depends on package manager. |
| SAST / code scanning | not_configured | recommended | Enable when language/framework is supported. |
| IaC/config scanning | not_applicable | conditional | Required when infra/config files exist. |
| API security checks | not_configured | conditional | Required for public or sensitive APIs. |

## Stop Conditions

- Production deploy requested while security automation status is unknown.
- Critical dependency or secret finding has no owner or mitigation.
- Scanner workflow would be created without known stack/build/test commands.
- Security automation requires paid/provider features the founder has not confirmed.
`;
}

function prValidationWorkflow(): string {
  return `name: LeanOS PR Validation

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  static-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: LeanOS placeholder validation
        run: echo "LeanOS PR validation rules are documented in .github/leanos/pr-validation-rules.md"
`;
}

function githubSettingsExampleJson(): string {
  return `{
  "github": {
    "status": "not_configured",
    "token_source": "env:LEANOS_GITHUB_TOKEN",
    "owner": "example-org",
    "repository": "example-repo",
    "project": {
      "type": "organization",
      "number": 12,
      "url": "https://github.com/orgs/example-org/projects/12"
    },
    "fields": {
      "status": "Status",
      "priority": "Priority",
      "size": "Size",
      "area": "Area",
      "roadmap_item": "Roadmap Item",
      "epic": "Epic"
    }
  },
  "security": {
    "store_token_in_workspace": false,
    "allowed_token_sources": [
      "env:GITHUB_TOKEN",
      "env:LEANOS_GITHUB_TOKEN",
      "secure_prompt",
      "system_keychain"
    ]
  }
}
`;
}

function workMappingRules(): string {
  return `# GitHub Work Mapping

## Purpose

Define how LeanOS local product work maps to GitHub tracking.

This file is a sync contract. It does not make GitHub the source of truth, and it does not authorize remote writes by itself.

## Source Of Truth

LeanOS local files are the primary operational source:

- Product hierarchy: \`../../operations/product-ops/knowledge/work-taxonomy.md\`
- Local Epics and Features: \`../../operations/product-ops/epics/\`
- Epic template: \`../../ai-standard/templates/product/epic-template.md\`
- Feature template: \`../../ai-standard/templates/product/feature-template.md\`

GitHub is an optional remote tracking layer.

## Default Mapping

| Local LeanOS item | GitHub item | Required labels | Notes |
| --- | --- | --- | --- |
| Epic folder README | Issue | \`leanos\`, \`epic\` | One GitHub issue per local Epic. |
| Feature markdown file | Issue | \`leanos\`, \`feature\` | One GitHub issue per local Feature. |
| Feature Tasks | Checklist inside Feature issue | none by default | Tasks stay inside the Feature issue unless separate tracking is justified. |
| Exceptional Task | Issue | \`leanos\`, \`task\` | Use only for separate ownership, review, deployment, security or external dependency. |

## Title Conventions

Epic issue:

~~~text
[EPIC] Customer Management
~~~

Feature issue:

~~~text
[FEATURE: Customer Management] Create customer profile
~~~

Exceptional task issue:

~~~text
[TASK: Create customer profile] Add database migration
~~~

## Sync Metadata

Store remote IDs, issue numbers, project item IDs and conflict state in:

\`sync-state.yaml\`

Do not store tokens, secrets or personal credentials in sync state.

## Sync Location Decision

Do not create or depend on \`operations/product-ops/epics/synced/\` in the initial scaffold.

Keep local Epics and Features in \`operations/product-ops/epics/\` and use \`sync-state.yaml\` as the index for remote status.

Reason: synced work is still product context. Moving it to an archive folder can hide useful context from future planning and implementation flows.

## Required Sync Behavior

Use \`/github-sync\` as the chat intent for this flow.

Before creating or updating GitHub:

1. Read Product Ops work taxonomy.
2. Read the local Epic folder.
3. Read each Feature file being synced.
4. Compare local state with \`sync-state.yaml\`.
5. Prepare a dry-run summary.
6. Ask the founder for confirmation.
7. Only then call a future CLI/script capability for the remote write.

## Conflict Rule

If local and GitHub disagree, do not overwrite either side automatically.

Explain:

- what differs;
- which side is newer or more complete, if knowable;
- what would be changed;
- what the founder must confirm.

## Do Not Do

- Do not create GitHub issues for raw ideas, backlog notes or unsplit Epics.
- Do not create one GitHub issue per Task by default.
- Do not treat \`synced\` as product readiness.
- Do not start implementation from GitHub sync alone; the Feature must pass \`ready-to-develop.md\`.
- Do not call GitHub API directly from model reasoning.
`;
}

function projectSyncYaml(answers: WorkspaceAnswers): string {
  const githubRemote = parseGithubRemote(answers.detectedProject?.gitRemoteOrigin);
  const owner = githubRemote?.owner ?? "TODO";
  const repository = githubRemote?.repository ?? "TODO";

  return `github:
  status: ${answers.prepareGithubManagement ? "pending_user_token" : "not_configured"}
  token_source: env:LEANOS_GITHUB_TOKEN
  owner: ${owner}
  repository: ${repository}
  project:
    type: organization
    number: TODO
    url: TODO
  fields:
    status: Status
    priority: Priority
    size: Size
    area: Area
    roadmap_item: Roadmap Item
    epic: Epic
  project_sync:
    status: ${answers.prepareGithubManagement ? "pending_configuration" : "not_requested"}
    enabled: false
    source:
      roadmap: ../../strategy/roadmap/knowledge/roadmap.md
      milestones: ../../strategy/roadmap/knowledge/milestones.md
      current_cycle: ../../strategy/roadmap/knowledge/current-cycle.md
      mvp_scope: ../../operations/product-ops/mvp/scope.md
      acceptance_criteria: ../../operations/product-ops/mvp/acceptance-criteria.md
      epics: ../../operations/product-ops/epics/
  work_mapping:
    epic:
      local_source: operations/product-ops/epics/<epic-slug>/README.md
      github_target: issue
      required_labels: [leanos, epic]
      title_format: "[EPIC] <epic title>"
    feature:
      local_source: operations/product-ops/epics/<epic-slug>/<feature-slug>.md
      github_target: issue
      required_labels: [leanos, feature]
      title_format: "[FEATURE: <epic title>] <feature title>"
    task:
      local_source: feature_file_checklist
      github_target: feature_issue_checklist
      separate_issue_default: false
  rules:
    never_store_token: true
    dry_run_before_remote_write: true
    require_confirmation_before_api_write: true
    no_duplicate_epics_without_review: true
`;
}

function parseGithubRemote(remote?: string): { owner: string; repository: string } | undefined {
  if (!remote) {
    return undefined;
  }

  const normalized = remote.replace(/\.git$/, "");
  const httpsMatch = normalized.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  const sshMatch = normalized.match(/^git@github\.com:([^/]+)\/([^/]+)$/);
  const sshUrlMatch = normalized.match(/^ssh:\/\/git@github\.com\/([^/]+)\/([^/]+)$/);
  const match = httpsMatch ?? sshMatch ?? sshUrlMatch;

  if (!match) {
    return undefined;
  }

  return {
    owner: match[1],
    repository: match[2]
  };
}

function syncStateYaml(): string {
  return `github_sync_state:
  status: not_configured
  last_checked_at: null
  last_synced_at: null
  repository: null
  project_number: null
  milestones: {}
  epics: {}
  features: {}
  task_issues: {}
  notes:
    - This file may store GitHub IDs, issue numbers and sync metadata.
    - This file must never store tokens, secrets or personal credentials.
    - Local LeanOS files remain the operational source unless the founder confirms a remote overwrite.
`;
}

function labelsYaml(): string {
  return `labels:
  - name: leanos
    color: "5319e7"
    description: LeanOS managed work
  - name: epic
    color: "7057ff"
    description: Roadmap epic
  - name: feature
    color: "bfd4f2"
    description: Feature created from an epic
  - name: task
    color: "d4c5f9"
    description: Exceptional task issue created from a feature checklist item
  - name: validation
    color: "0e8a16"
    description: Validation or learning task
  - name: mvp
    color: "1d76db"
    description: MVP delivery scope work
  - name: strategy
    color: "fbca04"
    description: Strategy or product definition
  - name: design
    color: "c5def5"
    description: UX or interface work
  - name: security
    color: "d73a4a"
    description: Security, privacy or access control work
  - name: devops
    color: "5319e7"
    description: Delivery, environment or GitHub operations work
`;
}
