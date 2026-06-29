export function githubCapabilityContract(): string {
  return `# GitHub Capability Contract

## Propósito

Define the boundary between LeanOS model reasoning and future GitHub execution capabilities.

The model prepares context, readiness checks, dry-run summaries and approved payloads. A tool/script/capability performs remote GitHub actions only after explicit founder confirmation.

## Core Rule

The model must not call GitHub APIs directly.

The model may:

- read local LeanOS files;
- inspect non-secret GitHub configuration files;
- prepare dry-run payloads;
- explain risks and conflicts;
- ask for confirmation.

The future capability/script may:

- read GitHub state;
- create or update labels;
- create or update milestones;
- create or update Epic issues;
- create or update Feature issues;
- add issues to GitHub Projects;
- update Project fields;
- create branches;
- open pull requests;
- return non-secret IDs and URLs for sync state.

## Ownership

Product Ops decides whether a local Epic or Feature is ready to sync.

Strategy/Roadmap decides milestone, cycle and roadmap linkage when applicable.

DevOps/GitHub DevOps validates repository, Project, fields, labels, token source and execution readiness.

Engineering owns branch and PR execution after a Feature is ready to develop.

Security reviews token, permission and automation risk when needed.

## Capability Interfaces

### github.status

Purpose: inspect GitHub readiness without writing.

Inputs:

- owner;
- repository;
- project type;
- project URL or number;
- token source name, never token value.

Returns:

- authenticated: true | false | unknown;
- repository found: true | false | unknown;
- project found: true | false | unknown;
- missing scopes or permissions, if knowable;
- safe diagnostic message.

### github.configure

Purpose: create or validate labels, fields and Project mapping after founder confirmation.

Inputs:

- owner;
- repository;
- project;
- desired labels;
- desired field mapping;
- dry-run flag.

Returns:

- labels created or found;
- fields found or missing;
- project item readiness;
- warnings.

### github.syncEpicsFeatures

Purpose: sync local LeanOS Epics and Features to GitHub issues and Project items.

Inputs:

- approved dry-run payload from GitHub Epics/Features sync;
- local Epic and Feature source paths;
- current sync-state;
- target repository and Project;
- dry-run flag.

Returns:

- created or updated Epic issue numbers;
- created or updated Feature issue numbers;
- Project item IDs;
- milestone IDs or URLs;
- conflicts;
- skipped items and reasons;
- sync-state patch with no secrets.

### github.readIssue

Purpose: read a mapped GitHub Feature issue before implementation or review.

Inputs:

- owner;
- repository;
- issue number.

Returns:

- title;
- body;
- labels;
- milestone;
- state;
- linked URLs;
- safe summary.

### github.createBranch

Purpose: create a branch only after Feature readiness passes.

Inputs:

- owner;
- repository;
- base branch;
- branch name from \`.github/leanos/branch-rules.md\`;
- linked local Feature or GitHub issue.

Returns:

- branch name;
- branch URL;
- base commit;
- warnings.

### github.openPullRequest

Purpose: open a PR only after implementation, tests and PR draft are ready.

Inputs:

- owner;
- repository;
- branch name;
- base branch;
- PR title;
- PR body from LeanOS template;
- linked Feature or issue.

Returns:

- PR number;
- PR URL;
- created state;
- warnings.

## Required Safety Gates

Every write-capable capability must require:

- explicit founder confirmation;
- dry-run or preview payload before remote write;
- token source without exposing token value;
- no token in logs, markdown or sync-state;
- duplicate check before creation;
- conflict report before overwrite;
- result payload suitable for \`sync-state.yaml\`.

## Sync-State Patch Rules

Capabilities may return a patch for \`.github/leanos/sync-state.yaml\`.

The patch may include:

- issue numbers;
- issue URLs;
- Project item IDs;
- milestone IDs or URLs;
- timestamps;
- conflict state;
- last sync status.

The patch must not include:

- tokens;
- secrets;
- personal credentials;
- private key material;
- raw API responses containing sensitive headers.

## Condições de Parada

- Token value appears in chat, markdown, logs or proposed sync-state.
- Founder has not confirmed the dry-run payload.
- Repository or Project target is ambiguous.
- Local Epic/Feature does not match work taxonomy.
- A duplicate or conflict is found and the founder has not chosen the resolution.
- Required permissions are missing.
`;
}
