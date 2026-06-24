# GitHub LeanOS

## Purpose

GitHub support files for LeanOS workflow conventions.

Use this folder when configuring GitHub Projects sync, issue labels, branch rules, PR validation guidance, security automation or deploy readiness.

## Start Here

`setup-guide.md`

Use the setup guide before running `/github-sync` for the first time or whenever GitHub readiness fails.

## Files

`setup-guide.md`

Founder-friendly guide for GitHub owner, repository, Project, token source and GitHub CLI readiness.

`capability-contract.md`

Boundary contract for future scripts/capabilities that perform GitHub reads and writes after dry-run and founder confirmation.

`github-settings.example.json`

Example shape for GitHub setup. It documents fields and token sources, but must not contain a real token.

`project-sync.yaml`

Workspace GitHub sync configuration. This is where owner, repository, Project, fields, sources and sync rules are recorded after confirmation.

`sync-state.yaml`

Remote sync index. It may store GitHub issue numbers, project item IDs, timestamps and conflict state. It must never store tokens or secrets.

`work-mapping.md`

Mapping contract for local LeanOS Epics, Features and Tasks to GitHub issues and checklists.

`labels.yaml`

Expected labels for LeanOS GitHub work.

`branch-rules.md`

Branch naming and safety rules.

`pr-validation-rules.md`

PR review and founder testing expectations.

`security-automation.md`

Security automation readiness notes. Guidance only until stack/build/test commands are known.

## Navigation

Route GitHub setup through `../../operations/devops/AGENT.md` before configuring project sync.

Route GitHub branch, PR and validation work through `../../operations/engineering/AGENT.md` before changing GitHub workflow files.

Route security automation readiness through `../../operations/security/AGENT.md` before adding scanner workflows or security gates.

## Readiness Rule

`/github-sync` must check GitHub readiness before preparing any sync payload.

If owner, repository, Project, labels, token source or sync state are incomplete, route to DevOps setup first:

```text
operations/devops/AGENT.md
-> roles/github-devops.role.md
-> skills/configure-github-project.skill.md
-> playbooks/configure-github-project.playbook.md
```

## Secret Rule

- Never store real tokens in this folder.
- Never ask the founder to paste a token into chat.
- Use local environment variables, secure prompts, system keychain or GitHub CLI auth.
- Prefer the smallest token scope that can access the selected repository and Project.

## Vercel Rule

Vercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create `vercel.json` only when a real app/framework needs overrides.
