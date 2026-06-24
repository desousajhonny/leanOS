# Feature To Delivery Cycle Workflow

## Purpose

Move a confirmed local Feature or mapped GitHub issue from understanding to branch, implementation, review and PR readiness.

## Trigger

The founder asks to implement a specific Feature, or a GitHub issue that represents a Feature.

## Participating Areas

- Product Ops: confirms delivery scope, issue readiness and delivery boundaries.
- Engineering: plans, implements, tests and prepares PR.
- Design: conditional, only when UX changes.
- Security: conditional, only when data, auth, permissions, privacy, abuse risk or compliance is involved.

## Sequence

1. Load the Feature, parent Epic and MVP context.
2. Summarize the Feature in chat and ask for confirmation.
3. Check Product and Engineering readiness.
4. Add Design criteria only when user-facing UX changes.
5. Add Security criteria only when the issue has a security-sensitive surface.
6. Create a Feature-linked branch plan.
7. Implement only after confirmation.
8. Run tests or explain why they cannot run.
9. Prepare a PR draft using the PR template.
10. Route to review before merge.

## Output

- Confirmed Feature summary
- Implementation plan
- Branch name
- Test plan
- PR draft
- Review readiness notes
