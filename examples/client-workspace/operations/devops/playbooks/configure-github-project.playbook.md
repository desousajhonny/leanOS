# Configure GitHub Project

## Purpose

Prepare GitHub settings for roadmap sync without calling the API directly from the model.

## Inputs

- Founder GitHub owner or organization
- Repository name
- GitHub Project type
- GitHub Project URL or number
- Desired project fields
- Expected labels
- Milestone strategy
- Token source from environment, GitHub CLI, secure prompt or keychain
- Deployment target such as Vercel when known

## Process

1. Read DevOps AGENT and choose GitHub DevOps
2. Read `knowledge/github-management.md`
3. Read `../../../.github/leanos/setup-guide.md`
4. Read `../../../.github/leanos/github-settings.example.json`
5. Review `../../../.github/leanos/project-sync.yaml`
6. Review `../../../.github/leanos/labels.yaml` and `../../../.github/leanos/sync-state.yaml`
7. Ask guided questions for missing owner, repository, Project type, Project URL/number and field mapping
8. Explain where the founder can find owner/repository and Project URL/number
9. Confirm token source without asking the user to paste secrets into chat or files
10. If local tools are available and the founder allows it, use `gh auth status` only to validate auth status, not to expose credentials
11. Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it
12. Propose updates to GitHub management knowledge, project-sync and labels before writing
13. Validate that sync-state remains secret-free
14. End with whether `/github-sync` is ready for dry-run

## Output

- GitHub readiness summary
- Missing configuration
- Founder-friendly setup instructions
- Proposed project-sync.yaml updates
- Proposed labels.yaml updates
- Token-source guidance without token values
- Vercel readiness notes
- Next action for /github-sync

## Files to Update

- Update `../knowledge/github-management.md` after confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.
- Update `../../../.github/leanos/labels.yaml` only after explicit confirmation.
- Update `../../../.github/leanos/sync-state.yaml` only with non-secret sync metadata after a confirmed sync result.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
