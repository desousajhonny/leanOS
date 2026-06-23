# Security Automation Readiness

## Purpose

Define which automated security checks are required before production, and when they can be safely activated for the current stack.

## What to Document

- Detected language, framework, package manager and build/test commands.
- Status of secret scanning, dependency audit, SAST/code scanning, IaC/config scanning and API/security checks.
- Which checks are required for PR, pre-deploy and production release gates.
- Which checks are deferred, why they are deferred and what must happen before activation.
- False-positive triage owner and minimum response expectations.

## Required Checks

- Do not create scanner workflows until stack, package manager and stable commands are known.
- Secret scanning and dependency audit must be explicitly enabled, planned or deferred with reason before production.
- SAST/code scanning should be enabled when the language/framework is supported and code exists.
- IaC/config scanning is required only when infrastructure/config files exist.
- Security automation status must be reviewed before production deploy.

## Red Lines

- Do not add fragile security workflows that fail every project by default.
- Do not disable existing security scanners or dependency alerts without explicit human review.
- Do not mark production deploy ready without a security automation decision.
- Do not bypass a critical scanner finding without owner, reason and follow-up.
- Do not commit scanner tokens, credentials or provider secrets.

## Related Playbooks

- `../playbooks/security-automation-readiness.playbook.md`
- `../playbooks/pre-deploy-security-review.playbook.md`
- `../playbooks/vulnerability-response.playbook.md`
- `../playbooks/ai-generated-code-security-review.playbook.md`

## References

- OWASP Top 10
- OWASP API Security Top 10
- OWASP Secure Coding with AI
- NIST SSDF
- CIS Controls
