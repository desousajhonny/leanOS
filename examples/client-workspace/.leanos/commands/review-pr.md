# /review pr

## Purpose

Review a PR.

Review a PR against LeanOS issue, MVP, product, design, security and engineering criteria.

## Load First

Read:

- `../../AGENT.md`
- `../../operations/engineering/AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/roles/pr-reviewer.role.md`
- `../../operations/engineering/knowledge/review-criteria.md`
- `../../operations/engineering/knowledge/code-standards.md`
- `../../operations/engineering/skills/review-pr.skill.md`
- `../../operations/engineering/playbooks/pr-validation.playbook.md`
- `../../ai-standard/templates/review/code-review-template.md`
- `../../.github/leanos/pr-validation-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before reviewing the PR.

## Process

1. Load the PR description, linked issue and diff when available.
2. Check scope against the issue and MVP acceptance criteria.
3. Review correctness and likely regressions.
4. Review tests and manual validation.
5. Review Product alignment.
6. Review Design only when UX changed.
7. Review Security only when data, auth, permissions, privacy, abuse or compliance is involved.
8. List findings first, ordered by severity.
9. Recommend approve, request changes or blocked by missing context.

## Output

- Findings by severity
- File or area references
- Product alignment result
- Design result or "not applicable"
- Security result or "not applicable"
- Test confidence
- Open questions
- Final recommendation

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- operations.product-ops
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
