import { getActiveSubareaKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry } from "../types.js";
import { folderReadme, toTitle } from "../content/shared.js";

export function githubFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const engineeringActive = getActiveSubareaKeys(activeAreas).has("operations.engineering");
  const engineeringNote = engineeringActive
    ? "Route GitHub and PR validation work through `../../operations/engineering/README.md` before changing GitHub workflow files."
    : "Operations Engineering is not active in this workspace. Ask before activating it or changing GitHub workflow files.";

  return [
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nStart from `../AGENT.md` and follow the LeanOS Navigation Chain before implementing product work.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    ...["feature", "bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: folderReadme("GitHub LeanOS", "GitHub support files for LeanOS workflow conventions.", "Use when configuring labels, branch rules or PR validation guidance.", "pr-validation-rules.md", ["labels.yaml", "project-sync.yaml", "branch-rules.md", "pr-validation-rules.md"], ["../ISSUE_TEMPLATE/", "../../operations/engineering/"], engineeringNote) },
    { path: ".github/leanos/labels.yaml", content: labelsYaml() },
    { path: ".github/leanos/project-sync.yaml", content: "github:\n  status: not_configured\n  project_sync: disabled\n" },
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

function labelsYaml(): string {
  return `labels:
  - name: leanos
    color: "5319e7"
    description: LeanOS managed work
  - name: validation
    color: "0e8a16"
    description: Validation or learning task
  - name: mvp
    color: "1d76db"
    description: MVP scope work
  - name: strategy
    color: "fbca04"
    description: Strategy or product definition
`;
}
