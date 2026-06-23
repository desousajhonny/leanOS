# Define Observability

## Purpose

Define runtime visibility for logs, errors, metrics, alerts and post-deploy checks.

## Use When

- critical flows need monitoring
- release risk needs visibility
- support/debugging needs baseline signals

## Required Context

- Critical user flows
- Runtime architecture
- Failure modes
- Support expectations

## Inputs

- Critical flows
- Expected errors
- Important metrics
- Alert candidates
- Post-deploy checks

## Process

1. Identify critical signals
2. Define logs and errors
3. Define metrics and alerts
4. Define post-deploy checks
5. List instrumentation gaps

## Checks

- Signals map to user or business risk
- Alerts are actionable
- Post-deploy checks are practical

## Output

- Observability baseline
- Critical signals
- Alert candidates
- Instrumentation gaps
- Next action

## Files to Update

- Update `../knowledge/observability.md` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
