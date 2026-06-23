# Incident Response

## Purpose

Define a lightweight response path for leaks, vulnerabilities, abuse, outages and security regressions.

## What to Document

- Incident types and severity.
- Who decides pause, rollback or rotation.
- Evidence to collect.
- Communication notes.
- Post-incident follow-up.

## Required Checks

- Secrets leaks trigger rotation.
- Critical vulnerabilities trigger mitigation plan.
- Production incidents include rollback or containment.
- Customer-impacting incidents capture timeline and follow-up.

## Red Lines

- Do not hide security incidents in implementation notes.
- Do not continue deployment when containment is unclear.
- Do not delete evidence needed for review.
- Do not claim resolution without verification.

## Related Playbooks

- `../playbooks/incident-response.playbook.md`
- `../playbooks/vulnerability-response.playbook.md`
- `../playbooks/secrets-rotation.playbook.md`

## References

- NIST SSDF
- CIS Controls
