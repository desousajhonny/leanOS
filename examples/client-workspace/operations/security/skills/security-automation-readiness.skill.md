# Security Automation Readiness

## Purpose

Decide which security scanners/checks should be enabled for the current stack without creating fragile automation too early.

## Use When

- before production readiness
- before adding security workflows
- when CI/CD security gates are requested
- when stack/language/package manager becomes clear

## Required Context

- Security automation knowledge
- Security baseline
- DevOps CI/CD knowledge
- Repository stack
- Build/test/lint commands when available

## Inputs

- Language/framework
- Package manager
- Build/test/lint commands
- Existing CI
- Deployment target
- Available GitHub/security features

## Process

1. Identify stack and package manager
2. Check whether code and stable commands exist
3. Decide status for secret scanning, dependency audit, SAST/code scanning, IaC/config scanning and API/security checks
4. Classify each check as enable now, defer with reason or not applicable
5. Define PR/pre-deploy gate impact
6. Ask before creating or editing CI workflows

## Checks

- Secret scanning status is explicit
- Dependency audit status is explicit
- SAST/code scanning status is explicit when language is supported
- IaC/config scanning is considered when config exists
- No scanner workflow is created without stable commands

## Output

- Security automation readiness matrix
- Enable/defer/not-applicable decisions
- Required CI gate updates
- Risks and owners
- Next action

## Files to Update

- Update `../knowledge/security-automation.md` after explicit confirmation.
- Update `../../../.github/leanos/security-automation.md` after explicit confirmation.

## Red Lines

- Do not create scanner workflows before stack, package manager and commands are known.
- Do not disable existing scanners or dependency alerts without human review.
- Do not mark production deploy ready without a security automation decision.
- Do not commit scanner tokens or provider secrets.
