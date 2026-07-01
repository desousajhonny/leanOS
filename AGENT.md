# Project Agent Memory

## Collaboration Rule

Do not default to agreeing with the user.

For this project, always evaluate requests against the current LeanOS context, roadmap, architecture and implementation state. If a user suggestion does not fit the framework cleanly, explain the tradeoff, discuss the options and guide the decision toward the best scenario for the project.

Agreement is not the goal. Useful judgment is the goal.

## Model Continuity Memory

Before answering status, continuation, resume, next steps or model-switch handoff requests, read:

1. `MODEL_MEMORY.md`

Use `MODEL_MEMORY.md` as a continuity index for recent decisions, recent changes, current state and open threads. It is for agents and models only; it is not the canonical source of truth for LeanOS doctrine or framework behavior.

When a meaningful framework decision, commit, push, roadmap change or handoff-relevant discovery happens, update `MODEL_MEMORY.md` in the same change unless the user explicitly asks not to.

## Framework Source Of Truth

Before making or recommending changes to LeanOS framework behavior, generated workspace structure, founder journeys, activation rules, routing, asset contracts, GitHub sync, roadmap order or release readiness, read:

1. `docs/framework/source-of-truth/leanos-doctrine.md`
2. `docs/framework/source-of-truth/operating-model.md`
3. `docs/framework/source-of-truth/decision-rules.md`
4. `docs/framework/source-of-truth/decision-log.md`

Use these files as the canonical basis for analysis. If a proposed change conflicts with them, explain the conflict and either reject the change or update the source of truth and decision log explicitly.

## Generated Root Agent Contract

When changing the generated workspace root `AGENT.md` or routing behavior:

1. Preserve the generated root red lines and confirmation gates.
2. Do not add long natural-intent inventories directly to the generated root.
3. Put durable natural intents in `.leanos/runtime/index/intent-map.yaml` and cover them with generator validation.
4. The generated root must classify with `intent-map.yaml`, check `leanos.yaml`, then route through `.leanos/runtime/index/routing-map.yaml` to the active owner department only.
5. Deep hints in the intent map may name area, role, skill, playbook or workflow, but they are not permission for the root to load those files directly.
6. Departments and areas remain responsible for choosing roles, skills, playbooks, workflows and local knowledge.

## Framework Inventory Maintenance

When changing LeanOS framework skills, playbooks or workflows, update the matching macro inventory in the same change:

1. `docs/framework/skills/README.md`
2. `docs/framework/playbooks/README.md`
3. `docs/framework/workflows/README.md`

These files are the framework-level map for what exists, what each asset is for, which department/area owns it and where it can be activated. Do not add, remove, rename or move generated skills, playbooks or workflows without keeping these inventories aligned.

## Framework Governance

Before commits, PRs or meaningful LeanOS framework changes, consult `docs/framework/governance/` and apply the internal governance playbooks that match the change. Use them as a lightweight gate for framework behavior, Nav Chain integrity, asset quality, department handoffs, doctrine alignment and founder experience; keep detailed criteria in governance docs instead of expanding this root file.

## NPM Release Protocol

When the user asks to update, publish or release the public LeanOS packages, use the repository runbook instead of reconstructing commands from memory.

Route requests such as "atualizar o pacote", "publicar nova versao", "atualizar npm create lean-os" or "publicar no npm" to:

```bash
npm run release:npm
```

Before anything else in these requests, send the user this exact PowerShell command block to prepare the local npm token. Do this every time, without trying OTP first:

```powershell
$secureToken = Read-Host "Cole seu token npm granular" -AsSecureString
$token = [System.Net.NetworkCredential]::new("", $secureToken).Password
Set-Content -LiteralPath ".npmrc" -Value "//registry.npmjs.org/:_authToken=$token" -Encoding ASCII
Remove-Variable token, secureToken
npm whoami
```

Before running it:

1. Confirm package versions in `packages/cli/package.json` and `packages/create/package.json`.
2. Commit and push framework changes, leaving only a local `.npmrc` if npm auth is needed.
3. Ask the user to prepare npm auth locally with the command block above, without pasting tokens in chat.

Then run `npm run release:npm`. The script validates npm auth, tests, build, package dry-runs, publishes `lean-os` before `create-lean-os`, verifies the registry, and removes the local `.npmrc`.

Never store npm tokens in committed files, logs, docs, model memory or chat. If a token is pasted into chat, treat it as compromised and ask the user to revoke it.
