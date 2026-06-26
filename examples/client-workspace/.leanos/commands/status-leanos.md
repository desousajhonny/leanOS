# /status-leanos

## Purpose

Diagnose where the LeanOS workspace is and recommend the next safe route.

Use this command as the explicit LeanOS status and readiness diagnosis entrypoint.

It must load the `where-we-are` protocol before recommending implementation, roadmap changes, GitHub work or the next workflow.

## Load First

Read:

- `../../AGENT.md`
- `../agent/protocols/where-we-are.md`
- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../index/workflows.yaml`
- `../index/routing-map.yaml`
- `../../leanos.yaml`

Then follow the reading order inside:

- `../agent/protocols/where-we-are.md`

## Process

1. Treat `/status-leanos` as a request to run the `where-we-are` protocol.
2. Do not route directly to a department, role, skill or playbook before reading the protocol.
3. Use the protocol to classify the current moment of the product/workspace.
4. Inspect only the smallest set of files needed to answer the founder.
5. Explain what exists, what is missing, the risk of skipping steps and the next safe LeanOS route.
6. If the founder asks to continue, declare the next route before loading its workflow or command.

## Allowed Updates

None by default.

`/status-leanos` is diagnostic. It may propose updates, but it must not write files unless the founder explicitly asks to update something after the diagnosis.

## Forbidden Updates

During `/status-leanos`, do not:

- write product, strategy, roadmap, Epic, Feature, Design, Engineering, Growth or framework files;
- create branches, commits, PRs, issues or GitHub payloads;
- call GitHub, deployment or external APIs;
- mark work as ready to develop without checking `where-we-are.md` and `ready-to-develop.md`;
- invent completed work from empty or placeholder files.

## Expected Output

Use founder-friendly language first:

```text
Onde estamos:
<current product/workspace moment>

O que ja temos:
- <confirmed thing>

O que falta:
- <missing prerequisite>

Risco de pular etapa:
<short explanation>

Proximo passo recomendado:
<route or workflow>

Quer seguir por esse caminho?
```

After the founder-friendly answer, optionally list the files inspected.

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- strategy.validation
