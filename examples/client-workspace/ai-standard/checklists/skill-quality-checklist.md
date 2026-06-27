# Skill Quality Checklist

Use this checklist before accepting a skill folder with `SKILL.md`.

## Capability

- [ ] The skill defines one reusable capability.
- [ ] The skill answers "which capability should be applied?"
- [ ] The skill is reusable by one or more roles or playbooks.
- [ ] The skill does not become a full process sequence.
- [ ] The skill lives at `skills/<skill-name>/SKILL.md`.
- [ ] The skill has YAML frontmatter with `name` and `description`.
- [ ] The `description` starts with "Use when" and describes triggering conditions.

## Operating Detail

- [ ] The skill states when to use it.
- [ ] The skill states required context.
- [ ] The skill states inputs.
- [ ] The skill uses `### Step N` headings inside `## Process`.
- [ ] The skill states checks under `## Checks & Acceptance Criteria`.
- [ ] The skill states outputs.
- [ ] The skill states red lines.

## Boundaries

- [ ] The skill does not invent product facts.
- [ ] The skill does not update files without confirmation when durable context changes.
- [ ] The skill does not duplicate another skill.
