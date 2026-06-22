# Agent Quality Checklist

Use this checklist before accepting an `AGENT.md`.

## Scope

- [ ] The agent owns routing for exactly one level: root, department or area.
- [ ] The agent states its operating scope.
- [ ] The agent does not try to be a full inventory of every child file.

## Routing

- [ ] Root agents route only to departments.
- [ ] Department agents route to workflows or active areas.
- [ ] Area agents route to specialist roles before skills or playbooks.
- [ ] The agent does not skip levels in the Navigation Chain.

## Context Loading

- [ ] The agent tells models which minimal files to load first.
- [ ] The agent avoids asking models to load the whole workspace.
- [ ] Missing paths are handled as gaps, not invented.

## Red Lines

- [ ] The agent protects secrets.
- [ ] The agent asks before modifying durable files.
- [ ] The agent does not enrich framework assets with product context during init.

## Output

- [ ] The agent defines the expected response header or output shape when relevant.
- [ ] The agent makes the next route clear.
