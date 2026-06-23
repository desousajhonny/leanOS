# Founder Journeys

This folder is internal framework design documentation.

It is not generated into the client workspace and should not be copied into `examples/client-workspace/`.

## Purpose

Founder Journeys describe how a founder intent should move through LeanOS before it becomes a workflow, command, playbook or generated asset.

Use this folder to design and test the human journey before changing the scaffold.

## Files

- `journey-template.md`: template for describing a founder intent journey.
- `journey-map.md`: checklist of journeys that still need to be written.

## Rule

Every journey must be testable.

If a journey says the model should go from one file to another, the workspace must provide evidence:

- an `AGENT.md` route;
- a README explanation;
- a YAML/index path;
- a role pointing to a skill or playbook;
- or a workflow declaring the handoff.

If there is no evidence, the framework route is still too implicit.
