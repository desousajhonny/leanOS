# /create roadmap

## Purpose

Create a validation-first roadmap.

## Load First

Read:

- `../../AGENT.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../index/routing-map.yaml`

## Process

1. Route through `../../strategy/roadmap/README.md`.
2. Load the department AGENT.md or README first.
3. Activate the role named by the area README.
4. Load only the required skills and playbook.
5. Produce the requested output.

## Validation Rules

- Separate assumption, evidence, insight, decision and roadmap impact.
- Do not treat assumptions as validated learning.
- If the request affects roadmap, MVP or issue scope, identify whether evidence exists.
- If evidence is missing, propose a validation step before committing roadmap or implementation changes.

## Allowed Updates

None by default.

This command may propose updates after routing to the correct area. It must not write files unless the founder confirms the proposed change.

## Forbidden Updates

Do not:

- skip the department or area route;
- load missing inactive-area paths;
- create branches, commits, PRs or remote GitHub writes;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/` unless this is an explicit asset-creation command;
- invent evidence, learning or roadmap decisions.

## Confirmation Rule

Ask before writing any file or moving to a workflow that changes product, roadmap, delivery or remote state.

## Expected Output

- Route selected
- Context loaded
- Relevant role, skill or playbook recommendation
- Output requested by the founder
- Missing context or inactive-area warning when applicable

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- strategy.validation
