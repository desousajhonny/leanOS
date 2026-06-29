# Model Memory

This file exists for agent/model continuity across Claude, Codex and other coding agents.

Use it as a fast handoff index for the current work, recent decisions, recent changes and open threads. It is not a canonical doctrine file and must not replace `AGENT.md`, `docs/framework/source-of-truth/`, `TEMP-roadmap-ajustes.md`, git history or generated workspace knowledge.

## Current State

- Repository: `desousajhonny/leanOS`.
- Local branch when this memory was created: `feature/asset-contract-workflow-v2`.
- Remote `origin/main` was pushed to commit `6e1d7508522a1d46ded81cd658f546e07535e0c5` on 2026-06-29.
- Root `AGENT.md` is the entry point for project-level agent behavior.
- Framework source of truth lives in `docs/framework/source-of-truth/`.
- Temporary implementation roadmap lives in `TEMP-roadmap-ajustes.md`.

## Recent Decisions

- 2026-06-29: Add a root-level model continuity memory for agents. This memory is for handoff/status/next-step continuity only; durable framework decisions still belong in `docs/framework/source-of-truth/decision-log.md`.
- 2026-06-29: Keep framework doctrine and decision rules in `docs/framework/source-of-truth/`; do not use model memory as the source of truth for LeanOS behavior.
- 2026-06-29: Strengthen LeanOS Asset Contract v2 through validation-backed workflow, playbook and skill contracts.

## Recent Changes

- `2ecf591 Strengthen LeanOS delivery asset contracts`
  - Strengthened `feature-to-delivery-cycle`, `delivery-item-to-epic`, `epic-to-features` and Product Ops skill contracts.
- `be2958a Strengthen engineering skill contracts`
  - Strengthened Engineering `write-tests`, `create-pr` and `review-pr` with validation-backed RED/GREEN evidence, PR readiness and review evidence.
- `6e1d750 Strengthen operations review skill contracts`
  - Strengthened DevOps, Security and Design review/decision skills with readiness decisions, evidence outputs and red lines.

## Open Threads

- Update `TEMP-roadmap-ajustes.md` so Asset Contract v2 reflects the work already completed.
- Run the Founder Journey test from Strategy-only setup through Product Ops activation, Epic/Feature creation, implementation, PR and review simulation.
- Design and implement `ready-for-launch` after the Founder Journey is validated.
- Consider adding a framework rule that model memory should be updated at the end of significant local sessions before switching agents.

## Update Rules

- Read this file at the beginning of any continuation, status, resume, next-step or model-switch session.
- Update this file after meaningful framework decisions, commits, pushes, roadmap changes or handoff-relevant discoveries.
- Keep entries short and link to canonical files or commits instead of duplicating full context.
- Do not record secrets, tokens, credentials, private customer data or speculative claims.
- If a note becomes a durable framework decision, update `docs/framework/source-of-truth/decision-log.md` as well.
- If this file conflicts with `AGENT.md` or `docs/framework/source-of-truth/`, treat the source of truth as authoritative and update this file.
