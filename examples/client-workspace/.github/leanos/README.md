# GitHub LeanOS

## Propósito

GitHub support files for LeanOS workflow conventions.

Use this folder when configuring GitHub Projects sync, issue labels, branch rules, PR validation guidance, security automation or deploy readiness.

## Comece Aqui

`setup-guide.md`

Use the setup guide before the first GitHub Epics/Features sync dry-run or whenever GitHub readiness fails.

## Arquivos

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

## Navegação

Operations DevOps não está ativo neste workspace. Peça confirmação antes de configurar sync de GitHub Project.

Operations Engineering não está ativo neste workspace. Peça confirmação antes de ativá-lo ou alterar arquivos de workflow do GitHub.

Operations Security não está ativo neste workspace. Peça confirmação antes de adicionar automação de Security ou workflows de scanner.

## Readiness Rule

GitHub Epics/Features sync must check GitHub readiness before preparing any sync payload.

If owner, repository, Project, labels, token source or sync state are incomplete, route to DevOps setup first:

```text
<product-slug>-os/operations/devops/AGENT.md
-> roles/github-devops.role.md
-> skills/configure-github-project/SKILL.md
-> playbooks/configure-github-project.playbook.md
```

## Secret Rule

- Never store real tokens in this folder.
- Never ask the founder to paste a token into chat.
- Use local environment variables, secure prompts, system keychain or GitHub CLI auth.
- Prefer the smallest token scope that can access the selected repository and Project.

## Vercel Rule

Vercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create `vercel.json` only when a real app/framework needs overrides.
