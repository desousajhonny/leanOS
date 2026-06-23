# Secrets Rotation

## Purpose

Guide safe secret rotation after leak, suspected exposure or credential change.

## When to Use

- secret leak or suspected exposure
- token appears in Git/logs/chat/screenshots
- credential owner changes
- incident response requires rotation

## Before Acting

- `../AGENT.md`
- `../knowledge/secrets-management.md`
- `../knowledge/incident-response.md`
- `../../devops/knowledge/environments.md`

## Inputs

- Secret type
- Exposure location
- Affected environment
- Owner
- Access scope

## Steps

1. Load Cloud Security Reviewer
2. Classify exposure
3. Contain or revoke exposed credential
4. Rotate per environment
5. Update consumers through secure provider
6. Verify old secret no longer works
7. Record follow-up without secret values

## Security Gate

- Treat any exposed production credential as compromised.
- Block continuing deploy if active leaked secret is still valid.

## Output

- Rotation plan
- Containment status
- Verification steps
- Follow-up

## Files to Update

- Update `../knowledge/secrets-management.md` or `../knowledge/incident-response.md` after explicit confirmation. Never write secret values.

## Stop Conditions

- The user asks to paste or store the secret value.
- The affected system cannot be identified.
- Revocation/rotation owner is unknown.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
