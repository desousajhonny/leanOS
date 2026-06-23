# Configure GitHub Project

## Purpose

Prepare GitHub settings for roadmap sync without calling the API directly from the model.

## Inputs

- Founder GitHub owner or organization
- Repository name
- GitHub Project URL or number
- Desired project fields
- Token source from environment, secure prompt or keychain
- Deployment target such as Vercel when known

## Process

1. Read DevOps AGENT and choose GitHub DevOps
2. Read `knowledge/github-management.md`
3. Read `.github/leanos/github-settings.example.json`
4. Review `.github/leanos/project-sync.yaml`
5. Ask for missing owner, repository, project and field mapping
6. Confirm token source without asking the user to paste secrets into files
7. Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it
8. Propose the project-sync update before writing
9. Validate that sync-state remains secret-free

## Output

- GitHub readiness summary
- Missing configuration
- Proposed project-sync.yaml updates
- Token-source guidance
- Vercel readiness notes
- Next action for roadmap sync

## Files to Update

- Update `../knowledge/github-management.md` after confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.
- Update `../../../.github/leanos/sync-state.yaml` only with non-secret sync metadata.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
