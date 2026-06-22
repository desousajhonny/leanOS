# Follow Code Standards

## Purpose

Apply project coding standards, modularity, naming and hardcoding rules.

## Use When

- writing or reviewing code
- choosing a pattern
- splitting files or components
- deciding whether to introduce a new abstraction

## Required Context

- Code standards
- Implementation rules
- Existing repository patterns

## Inputs

- Target code area
- Existing files
- Proposed change
- Known project conventions

## Process

1. Inspect nearby patterns
2. Choose the smallest matching pattern
3. Separate UI, state, data access, validation and side effects where practical
4. Avoid hardcoded secrets/config/copy/design values
5. Keep functions and components focused
6. Document any intentional deviation

## Checks

- No unnecessary new abstraction
- No large unstructured component or file
- No hidden business rule
- No duplicated logic when a local reusable pattern exists

## Output

- Pattern decision
- Modularity notes
- Hardcoding risks
- Refactor or no-refactor recommendation

## Files to Update

- Update `../knowledge/code-standards.md` only when the user confirms a durable standard change.

## Red Lines

- Do not invent architecture that the repo does not need
- Do not hardcode values that belong in config, data, design tokens or copy sources.
