# Playbook Quality Checklist

Use this checklist before accepting a `.playbook.md` file.

## Metadata

- [ ] The playbook has YAML frontmatter with `name` and `description`.
- [ ] The `description` starts with "Use when" and describes triggering conditions.

## Sequence

- [ ] The playbook defines an ordered execution sequence.
- [ ] The playbook answers "in which order should the work happen?"
- [ ] The playbook uses skills rather than duplicating all skill content.
- [ ] The playbook has clear start and end conditions.

## Inputs and Outputs

- [ ] Inputs are listed.
- [ ] Process steps are listed.
- [ ] Stop conditions are listed under `## Stop Conditions`.
- [ ] Acceptance criteria and outputs are listed under `## Acceptance Criteria & Outputs`.
- [ ] Files to update are listed under `## Files to Update`.
- [ ] Red lines are listed under `## Red Lines`.

## Guided Conversation

- [ ] If the playbook asks the founder to choose, classify, prioritize or confirm, it references `../foundation/guided-conversation.md`.
- [ ] Guided questions use numbered options when the decision has predictable paths.
- [ ] The founder can answer with a number or free-form text.
- [ ] Technical paths appear after the founder understands the decision.

## Scope

- [ ] The playbook belongs to the correct area.
- [ ] The playbook does not duplicate a department workflow.
- [ ] The playbook does not reference inactive or missing paths.
