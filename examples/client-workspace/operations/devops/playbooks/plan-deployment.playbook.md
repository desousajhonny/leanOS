# Plan Deployment

## Purpose

Plan a safe deployment path.

## Inputs

- Release scope
- Target environment
- Current validation status
- Known risks
- Environment plan
- Skill: plan-deployment

## Process

1. Read DevOps AGENT and choose DevOps Engineer
2. Read `knowledge/environments.md` and `knowledge/deployment-readiness.md`
3. Confirm product code/framework exists before provider-specific deployment planning
4. Use `skills/plan-deployment.skill.md` to define release gates, rollback and smoke checks
5. Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or deploy automatically
6. Ask before creating provider config or remote state

## Output

- Deployment readiness
- Deployment steps
- Risks
- Rollback notes
- Next action

## Files to Update

- Update `../knowledge/deployment-readiness.md` after confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
