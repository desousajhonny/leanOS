# Rich GitHub Sync Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the LeanOS GitHub Epics/Features sync contract so generated GitHub issues preserve rich local content, metadata, milestones, relationships and verified local sync metadata.

**Architecture:** Add scaffold validation that checks the generated GitHub/Product Ops contract, then update templates and knowledge files to make `epic.md` canonical with `README.md` fallback. The model/capability boundary will require dry-run, remote verification, Project field updates and local metadata updates after confirmed sync.

**Tech Stack:** TypeScript template renderers, Node.js validation scripts, YAML/Markdown scaffold contracts.

---

### Task 1: GitHub Sync Contract Validation

**Files:**
- Create: `packages/cli/scripts/validation/github-sync.mjs`
- Modify: `packages/cli/scripts/validate-generator.mjs`

- [ ] **Step 1: Write the failing validation**

Add assertions that generated workspaces include the rich sync contract:

```js
import assert from "node:assert/strict";
import { parse } from "yaml";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export async function validateGithubSyncContract() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));
  const businessOs = parse(byPath.get("leanos.yaml")).paths.business_os;

  assert(byPath.has(".github/leanos/project-sync.yaml"));
  assert(byPath.has(".github/leanos/work-mapping.md"));
  assert(byPath.has(".github/leanos/capability-contract.md"));
  assert(byPath.has(`${businessOs}/operations/product-ops/knowledge/work-taxonomy.md`));
  assert(byPath.has(`${businessOs}/operations/product-ops/knowledge/epics/README.md`));
}
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `npm test`

Expected: FAIL because current scaffold still maps Epic README as the canonical source and does not require rich payload, remote verification or local metadata patching.

### Task 2: Canonical Epic Source

**Files:**
- Modify: `packages/cli/src/templates/workspace/renderers/github/project-sync.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/github/leanos-docs/work-mapping.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/product-ops/knowledge/product-ops-work-taxonomy.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/product-ops/knowledge/product-ops-epicsreadme.ts`

- [ ] **Step 1: Implement `epic.md` canonical source with README fallback**

Update contract text and YAML to prefer:

```text
operations/product-ops/epics/<epic-slug>/epic.md
```

and support legacy:

```text
operations/product-ops/epics/<epic-slug>/README.md
```

- [ ] **Step 2: Run validation**

Run: `npm test`

Expected: still FAIL until rich payload and local update rules exist.

### Task 3: Rich Payload and GitHub Project Metadata

**Files:**
- Modify: `packages/cli/src/templates/workspace/renderers/github/project-sync.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/github/leanos-docs/work-mapping.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/github/leanos-docs/capability-contract.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/ai-standard/templates/product.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/ai-standard/templates/github.ts`

- [ ] **Step 1: Add required fields and body rules**

Require `milestone`, `size`, `effort`, `priority`, `area`, `roadmap_item`, `epic`, source path, full sections and non-lossy body rendering.

- [ ] **Step 2: Add relationship rules**

Require Epic bodies to list Feature keys/links, Feature bodies to reference parent Epic, and Project field `Epic` to be set. Native parent/sub-issue links are preferred when the capability supports them.

- [ ] **Step 3: Run validation**

Run: `npm test`

Expected: still FAIL until post-sync local update rules exist.

### Task 4: Verified Remote Result and Local Metadata Patch

**Files:**
- Modify: `packages/cli/src/templates/workspace/renderers/github/leanos-docs/capability-contract.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/github/leanos-docs/work-mapping.ts`
- Modify: `packages/cli/src/templates/workspace/renderers/github/project-sync.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/knowledge/devops-github-management.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/skills.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/playbooks.ts`

- [ ] **Step 1: Require remote verification before local patching**

After write, the capability must read back created/updated issues and Project items, verify body sections, milestone, labels, Project fields and relationships, then return a local patch.

- [ ] **Step 2: Require local file update**

The local patch must update each synced Epic and Feature:

```yaml
sync_status: synced
github_issue:
  url: https://github.com/<owner>/<repo>/issues/<number>
```

and update `.github/leanos/sync-state.yaml` with IDs, URLs, Project item IDs and verification status.

- [ ] **Step 3: Run validation**

Run: `npm test`

Expected: PASS once all contract assertions are satisfied.

### Task 5: Roadmap, Memory and Final Verification

**Files:**
- Modify: `TEMP-roadmap-ajustes.md`
- Modify: `MODEL_MEMORY.md`

- [ ] **Step 1: Update roadmap and memory**

Record the GitHub rich sync contract decision, `epic.md` canonical source and post-sync local patch rule.

- [ ] **Step 2: Run full verification**

Run:

```bash
npm test
git diff --check
```

Expected: PASS with clean whitespace.
