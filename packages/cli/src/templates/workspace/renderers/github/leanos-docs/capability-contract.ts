export function githubCapabilityContract(): string {
  return `# GitHub Capability Contract

## Propósito

Define the boundary between LeanOS model reasoning and future GitHub execution capabilities.

The model prepares context, readiness checks, dry-run summaries and approved payloads. A tool/script/capability performs remote GitHub actions only after explicit founder confirmation.

## Core Rule

O modelo não deve chamar APIs do GitHub diretamente.

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
- update repository description, website and topics;
- create or update PR validation workflow files;
- create or update Epic issues;
- create or update Feature issues;
- add issues to GitHub Projects;
- update Project fields;
- create branches;
- open pull requests;
- configure branch protection or repository rulesets;
- create tags and GitHub Releases;
- return non-secret IDs and URLs for sync state.
- return a local file patch only after read-back verification passes.

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

### github.repositoryProfile

Purpose: update repository description, website and topics only from an approved product-first profile.

Inputs:

- owner;
- repository;
- current repository profile;
- proposed Repository description from DevOps \`repository-profile\`;
- proposed website URL, if confirmed;
- proposed topics;
- dry-run flag.

Returns:

- current profile summary;
- proposed profile summary;
- diff;
- applied state when confirmed;
- warnings.

Required behavior:

1. Não invente description, website ou topics a partir de palpites genéricos de produto.
2. Não sobrescreva um repository profile existente sem mostrar um diff.
3. Não inclua segredos, nomes de clientes ou detalhes sensíveis em topics ou description.
4. Require explicit founder confirmation before remote update.

### github.prValidationWorkflow

Purpose: prepare or update the PR validation workflow after DevOps confirms the repository commands and gates.

Inputs:

- repository files;
- package manager detection result;
- available scripts for lint, typecheck, test and build;
- LeanOS PR validation rules;
- dry-run flag.

Returns:

- workflow path;
- required status check name;
- detected scripts;
- skipped checks and reasons;
- warnings.

Required behavior:

1. Keep validation separate from deployment.
2. Run install, lint, typecheck, tests and build when those scripts exist.
3. Always include secret scan and LeanOS structure check when applicable.
4. Return the required status check name only after the workflow has run at least once.

### github.syncEpicsFeatures

Purpose: sync local LeanOS Epics and Features to GitHub issues and Project items.

Inputs:

- approved dry-run payload from GitHub Epics/Features sync;
- local Epic and Feature source paths;
- canonical Epic source path using \`epic.md\`, with \`README.md\` legacy fallback;
- current sync-state;
- target repository and Project;
- full rendered GitHub issue body for every Epic and Feature;
- milestone for each issue when local metadata requires one;
- Project field values for Status, Priority, Size, Effort, Area, Roadmap Item and Epic;
- relationship plan between Epics and Features;
- dry-run flag.

Returns:

- created or updated Epic issue numbers;
- created or updated Feature issue numbers;
- Project item IDs;
- milestone IDs or URLs;
- read-back verification result;
- verified issue URLs;
- relationship status;
- conflicts;
- skipped items and reasons;
- sync-state patch with no secrets;
- local file patch for each verified Epic and Feature.

Required behavior:

1. Create or update milestones, labels, issues and Project items only from an approved dry-run.
2. Render issue bodies from local markdown sections. Não publique um resumo de um parágrafo quando a fonte local contém conteúdo mais rico de Product Ops.
3. Set the issue milestone when local metadata contains a milestone.
4. Set Project fields for Status, Priority, Size, Effort, Area, Roadmap Item and Epic.
5. Link Features to their parent Epic using native parent/sub-issue relationships when available, Project field \`Epic\` and markdown backlinks.
6. Run Read-back verification after every remote write.
7. Return local patches only after verification passes.

Read-back verification must confirm:

- expected issue title, labels and state;
- required body sections are present;
- milestone is set;
- Project fields are set;
- relationships exist through native relationship when available, Project field or markdown links;
- issue URL is stable enough to write back locally.

The local file patch must update the source Epic and Feature markdown metadata:

~~~yaml
sync_status: synced
github_issue:
  url: https://github.com/<owner>/<repo>/issues/<number>
~~~

A capability não deve marcar \`synced\` antes da verificação remota passar. Se read-back verification falhar, retorne \`conflict\`, \`verification_failed\` ou \`partial_sync\` e mantenha \`sync_status\` local inalterado, a menos que o founder escolha explicitamente um caminho de recuperação.

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
- next founder prompt: \`Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?\`;
- warnings.

Required behavior:

1. Return the exact next founder prompt after the PR is created.
2. If the founder accepts the review prompt, route to \`operations/engineering/playbooks/pr-validation.playbook.md\` before any merge recommendation.
3. Não sugira que criação de PR significa prontidão de merge.

### github.branchProtection

Purpose: apply branch protection or repository rulesets only after the founder confirms the dry-run.

Inputs:

- owner;
- repository;
- protected branch, usually \`main\`;
- branch protection baseline from DevOps \`branch-protection\`;
- required status checks that have already appeared in PR validation;
- required review policy;
- force-push and deletion policy;
- dry-run flag.

Returns:

- proposed branch protection or ruleset summary;
- required status checks;
- review requirements;
- force-push and deletion policy;
- applied state when confirmed;
- warnings.

Required behavior:

1. Require PR before merge.
2. Require required status checks only after those checks exist.
3. Require branch up to date or an explicitly chosen equivalent policy.
4. Require conversation resolution before merge.
5. Dismiss stale approvals when new commits are pushed.
6. Block force pushes and deletion on the protected branch.
7. Não aplique required checks antes que PR validation rode ao menos uma vez.
8. Não aplique branch protection remota antes da confirmação explícita do founder.

### github.createRelease

Purpose: create an annotated tag and GitHub Release only after release readiness has passed.

Inputs:

- owner;
- repository;
- target branch or commit;
- proposed tag;
- release title;
- GitHub Release notes from DevOps \`prepare-release\`;
- linked issues or PRs;
- ready-for-launch or release-operations decision;
- dry-run flag.

Returns:

- tag;
- release URL;
- created state;
- warnings;
- post-release checklist.

Required behavior:

1. Não crie tag ou GitHub Release a menos que \`ready-for-launch\` ou \`release-operations\` tenha passado.
2. Não trate merge como prontidão de release.
3. Include user-facing impact, validation evidence, risks, rollback and post-release checks in release notes.
4. Require explicit founder confirmation before creating the tag or GitHub Release.

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
- verification status;
- source file path;
- body hash or comparable non-secret checksum when useful;
- last sync status.

O patch não deve incluir:

- tokens;
- secrets;
- personal credentials;
- private key material;
- raw API responses containing sensitive headers.

## Local File Patch Rules

Capabilities may return a local file patch for Product Ops Epic and Feature files after verified sync.

The patch may include:

- \`sync_status: synced\`;
- \`github_issue.url\`;
- non-secret issue number or Project item reference when a local template explicitly supports it;
- verification timestamp when a local template explicitly supports it.

O patch não deve incluir:

- tokens;
- secrets;
- raw API responses;
- remote body text that would overwrite richer local Product Ops context.

## Condições de Parada

- Token value appears in chat, markdown, logs or proposed sync-state.
- Founder has not confirmed the dry-run payload.
- Repository or Project target is ambiguous.
- Local Epic/Feature does not match work taxonomy.
- A duplicate or conflict is found and the founder has not chosen the resolution.
- Required permissions are missing.
`;
}
