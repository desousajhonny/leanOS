# Secrets Management

## Purpose

Define how secrets, tokens and credentials are stored, rotated and reviewed.

## What to Document

- Secret sources for local, preview/staging and production.
- Who can access secrets.
- Rotation triggers.
- Leak response steps.
- CI/CD secret usage.

## Required Checks

- Secrets are stored in environment providers or secure stores, not tracked files.
- Leaked secrets have rotation steps.
- CI/CD secrets are scoped and least-privilege.
- Agents know not to request or echo secret values.

## Red Lines

- No secrets in Git, logs, prompts, screenshots or tracked files.
- No token pasted into chat.
- No secret copied into documentation.
- No broad token when scoped token is enough.

## Related Playbooks

- `../playbooks/secrets-rotation.playbook.md`
- `../playbooks/vulnerability-response.playbook.md`

## References

- NIST SSDF
- CIS Controls
