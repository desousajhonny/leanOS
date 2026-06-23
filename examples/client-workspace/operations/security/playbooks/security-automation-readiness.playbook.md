# Security Automation Readiness

## Purpose

Decide which automated security checks are required, enabled, deferred or not applicable for this workspace.

## When to Use

- before production readiness
- before adding security CI workflows
- when stack and repository commands become clear
- when DevOps prepares release gates

## Before Acting

- `../AGENT.md`
- `../knowledge/security-automation.md`
- `../knowledge/security-baseline.md`
- `../../devops/AGENT.md`
- `../../devops/knowledge/ci-cd.md`
- `../../../.github/leanos/security-automation.md`

## Inputs

- Repository stack
- Package manager
- Build/test/lint commands
- Existing CI/CD
- Deployment target
- Security baseline
- Known GitHub/security features

## Steps

1. Load Security Lead and Cloud Security Reviewer
2. Use `skills/security-automation-readiness.skill.md`
3. Classify secret scanning, dependency audit, SAST/code scanning, IaC/config scanning and API/security checks
4. Mark each item as enable now, defer with reason or not applicable
5. Define whether each check should block PR, block deploy or warn only
6. Ask before editing CI, GitHub settings or scanner configuration

## Security Gate

- Production deploy requires explicit security automation status.
- Block production readiness if secret scanning and dependency audit are neither enabled nor explicitly deferred with reason.
- Block creating scanner workflows when stack, package manager or commands are unknown.

## Output

- Security automation readiness matrix
- Required security gates
- Deferred checks and reasons
- Suggested next file changes
- Safe-to-continue decision

## Files to Update

- Update `../knowledge/security-automation.md` after explicit confirmation.
- Update `../../../.github/leanos/security-automation.md` after explicit confirmation.

## Stop Conditions

- The repository stack is unknown.
- Build/test commands are unstable or missing.
- The request asks to enable scanners without understanding false-positive or CI impact.
- The request would require provider credentials or paid features not configured by the founder.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
