---
name: roadmap-cycle-planning
description: Use when roadmap cycle planning is required for the active request
---

# Roadmap Cycle Planning

## Purpose

Plan the next coherent roadmap cycle from product strategy, operating constraints and known risks.

## When to Use

- Use when this execution sequence matches the active request.

## Before Acting

- `../AGENT.md`
- `../area.yaml`

## Inputs

- ../../../leanos.yaml
- ../knowledge/roadmap.md
- ../knowledge/current-cycle.md
- ../knowledge/backlog.md
- ../../product/knowledge/brief.md
- ../../product/knowledge/problem.md
- ../../product/knowledge/value-proposition.md
- ../../product/knowledge/validation-notes.md

## Process

1. Load the Roadmap AGENT and Roadmap Planner role.
2. Use only when the product is `product_operating` or `growth_scaling`, or when the founder explicitly asks to sequence multiple priorities.
3. If the business is `mvp_building` or `mvp_live_learning`, route the idea to `activation_required: operations.product-ops` for MVP scope, backlog or delivery planning.
4. Review product strategy, customer signals and validation notes.
5. Review backlog candidates.
6. Choose Now, Next, Later and Not Planned boundaries.
7. Define current cycle goal and success criteria.
8. Propose updates and wait for confirmation before writing.

## Stop Conditions

- Stop and ask for confirmation before changing security-sensitive files.

## Acceptance Criteria & Outputs

- Roadmap cycle summary
- Current cycle proposal
- Backlog changes
- Milestone follow-up

## Files to Update

- ../knowledge/roadmap.md
- ../knowledge/current-cycle.md
- ../knowledge/backlog.md

## Red Lines

- Do not duplicate a workflow.
- Do not duplicate skills.
- Do not invent missing context.
- Do not update files without explicit confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
