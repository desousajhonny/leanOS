import { getActiveSubareaKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry, WorkspaceAnswers } from "../types.js";
import { folderReadme, toTitle } from "../content/shared.js";

export function githubFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const engineeringActive = activeKeys.has("operations.engineering");
  const devopsActive = activeKeys.has("operations.devops");
  const engineeringNote = engineeringActive
    ? "Route GitHub and PR validation work through `../../operations/engineering/README.md` before changing GitHub workflow files."
    : "Operations Engineering is not active in this workspace. Ask before activating it or changing GitHub workflow files.";
  const devopsNote = devopsActive
    ? "Route GitHub setup through `../../operations/devops/README.md` before configuring project sync."
    : "Operations DevOps is not active in this workspace. Ask before configuring GitHub Project sync.";

  return [
    ...(answers.prepareGithubManagement ? [{ path: ".env.local", content: envLocal() }] : []),
    { path: ".gitignore", content: workspaceGitignore() },
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nStart from `../AGENT.md` and follow the LeanOS Navigation Chain before implementing product work.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    ...["feature", "bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: folderReadme("GitHub LeanOS", "GitHub support files for LeanOS workflow conventions.", "Use when configuring labels, GitHub Projects sync, branch rules, PR validation guidance or deploy readiness.", "project-sync.yaml", ["github-settings.example.json", "project-sync.yaml", "sync-state.yaml", "labels.yaml", "branch-rules.md", "pr-validation-rules.md"], ["../ISSUE_TEMPLATE/", "../../operations/devops/", "../../operations/engineering/"], `${devopsNote}\n\n${engineeringNote}\n\nVercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create \`vercel.json\` only when a real app/framework needs overrides.`) },
    { path: ".github/leanos/github-settings.example.json", content: githubSettingsExampleJson() },
    { path: ".github/leanos/labels.yaml", content: labelsYaml() },
    { path: ".github/leanos/project-sync.yaml", content: projectSyncYaml(answers) },
    { path: ".github/leanos/sync-state.yaml", content: syncStateYaml() },
    { path: ".github/leanos/branch-rules.md", content: "# Branch Rules\n\n- Use focused branches tied to a roadmap item or issue.\n- Keep branch scope aligned with MVP and validation goals.\n" },
    { path: ".github/leanos/pr-validation-rules.md", content: "# PR Validation Rules\n\n- Link the PR to a LeanOS issue or task.\n- Check MVP scope and acceptance criteria.\n- Confirm tests or manual validation.\n- Capture learning when relevant.\n" }
  ];
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

## LeanOS Context

- Active Department:
- Active Area:
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Summary

Describe what changed.

## Coherence Check

- Strategy alignment:
- MVP scope alignment:
- Acceptance criteria:
- Validation or learning impact:

## Tests

- [ ] Build or test command run
- [ ] Manual validation completed
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
      roadmap: ../../strategy/roadmap/roadmap.md
      milestones: ../../strategy/roadmap/milestones.md
      current_cycle: ../../strategy/roadmap/current-cycle.md
      mvp_scope: ../../operations/core/mvp/scope.md
      acceptance_criteria: ../../operations/core/mvp/acceptance-criteria.md
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
  sub_issues: {}
  notes:
    - This file may store GitHub IDs, issue numbers and sync metadata.
    - This file must never store tokens, secrets or personal credentials.
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
  - name: sub-issue
    color: "bfd4f2"
    description: Child issue created from an epic
  - name: validation
    color: "0e8a16"
    description: Validation or learning task
  - name: mvp
    color: "1d76db"
    description: MVP scope work
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
