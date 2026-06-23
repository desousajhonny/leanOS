# Security Automation Readiness

## Purpose

Track which automated security checks should be enabled for this repository before production readiness.

This file is guidance-only in the initial scaffold. Do not create scanner workflows from this file alone.

## Read First

- `../../operations/security/AGENT.md`
- `../../operations/security/knowledge/security-automation.md`
- `../../operations/security/playbooks/security-automation-readiness.playbook.md`
- `../../operations/devops/knowledge/ci-cd.md`

## Candidate Checks

- Secret scanning
- Dependency audit / dependency review
- SAST / code scanning
- IaC or config scanning
- API security checks
- Container scanning, when containers exist
- License/supply-chain review, when dependencies matter

## Activation Rules

- Enable only after language, framework, package manager and stable commands are known.
- Prefer GitHub-native security features when available and appropriate.
- Do not create blocking CI workflows before the project has reliable build/test commands.
- Do not disable or bypass existing scanners without explicit human review.
- Do not store scanner tokens, provider tokens or secrets in tracked files.

## Readiness Matrix

| Check | Status | Required Before Production | Notes |
|---|---|---|---|
| Secret scanning | not_configured | yes | Enable or document provider limitation. |
| Dependency audit | not_configured | yes | Depends on package manager. |
| SAST / code scanning | not_configured | recommended | Enable when language/framework is supported. |
| IaC/config scanning | not_applicable | conditional | Required when infra/config files exist. |
| API security checks | not_configured | conditional | Required for public or sensitive APIs. |

## Stop Conditions

- Production deploy requested while security automation status is unknown.
- Critical dependency or secret finding has no owner or mitigation.
- Scanner workflow would be created without known stack/build/test commands.
- Security automation requires paid/provider features the founder has not confirmed.
