import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { updateWorkspaceLayout } from "../../dist/generators/workspace-update.js";
import { execFileAsync, packageRoot } from "./fixtures.mjs";
import { assertExists } from "./assertions.mjs";
import { exists } from "./path-utils.mjs";

export async function validateWorkspaceUpdateCommand() {
  await validateWorkspaceUpdateMigratesLegacyLayout();
  await validateWorkspaceUpdateCli();
}

async function validateWorkspaceUpdateMigratesLegacyLayout() {
  const rootDir = await createLegacyWorkspace();

  const result = await updateWorkspaceLayout(rootDir);

  assert(result.movedPaths.includes("strategy -> clinic-assistant-ai-os/strategy"), "Update should move Strategy into the product OS");
  assert(result.movedPaths.includes("ai-standard -> .leanos/standard"), "Update should move AI Standard into .leanos/standard");
  assert(result.movedPaths.includes(".leanos/context -> .leanos/runtime/context"), "Update should move runtime context under .leanos/runtime");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "AGENT.md"));
  await assertExists(join(rootDir, ".leanos", "standard", "README.md"));
  await assertExists(join(rootDir, ".leanos", "runtime", "context", "current-focus.md"));
  await assertExists(join(rootDir, ".leanos", "runtime", "index", "routing-map.yaml"));
  await assertExists(join(rootDir, ".leanos", "runtime", "agent", "protocols", "where-we-are.md"));

  assert.equal(await exists(join(rootDir, "strategy")), false, "Update should remove the old root Strategy folder after moving it");
  assert.equal(await exists(join(rootDir, "ai-standard")), false, "Update should remove the old root AI Standard folder after moving it");
  assert.equal(await exists(join(rootDir, ".leanos", "context")), false, "Update should remove old direct .leanos/context after moving it");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  assert.equal(yaml.paths.business_os, "clinic-assistant-ai-os", "Update should write new path metadata");
  assert.equal(yaml.agent.standard_library, ".leanos/standard", "Update should point the agent to .leanos/standard");
  assert.equal(yaml.runtime.context, ".leanos/runtime/context", "Update should point runtime context to .leanos/runtime/context");

  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  assert(rootAgent.includes("clinic-assistant-ai-os/strategy/AGENT.md"), "Updated root AGENT should route through the product OS");
  assert(rootAgent.includes(".leanos/runtime/agent/protocols/where-we-are.md"), "Updated root AGENT should use runtime protocol paths");
  assert(rootAgent.includes(".leanos/standard/README.md"), "Updated root AGENT should use the standard library path");
}

async function validateWorkspaceUpdateCli() {
  const rootDir = await createLegacyWorkspace();

  const { stdout } = await execFileAsync("node", [join(packageRoot, "dist", "index.js"), "update"], {
    cwd: rootDir
  });

  assert(stdout.includes("Updated LeanOS workspace"), "Update CLI should report success");
  assert(stdout.includes("clinic-assistant-ai-os/strategy"), "Update CLI should report moved product OS paths");
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "AGENT.md"));
}

async function createLegacyWorkspace() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-update-legacy-"));

  await writeFile(join(rootDir, "leanos.yaml"), legacyYaml(), "utf8");
  await writeFile(join(rootDir, "AGENT.md"), "# Legacy Agent\n\nUse `strategy/AGENT.md`.\n", "utf8");
  await writeFile(join(rootDir, "README.md"), "# Legacy Workspace\n", "utf8");
  await writeFile(join(rootDir, ".gitignore"), ".env.local\n", "utf8");
  await writeFile(join(rootDir, ".env.local"), "LEANOS_GITHUB_TOKEN=\n", "utf8");

  await mkdir(join(rootDir, "strategy"), { recursive: true });
  await writeFile(join(rootDir, "strategy", "AGENT.md"), "# Legacy Strategy\n", "utf8");
  await mkdir(join(rootDir, "ai-standard"), { recursive: true });
  await writeFile(join(rootDir, "ai-standard", "README.md"), "# Legacy AI Standard\n", "utf8");
  await mkdir(join(rootDir, ".leanos", "context"), { recursive: true });
  await writeFile(join(rootDir, ".leanos", "context", "current-focus.md"), "# Legacy Focus\n", "utf8");
  await mkdir(join(rootDir, ".leanos", "index"), { recursive: true });
  await writeFile(join(rootDir, ".leanos", "index", "routing-map.yaml"), "routing: {}\n", "utf8");
  await mkdir(join(rootDir, ".leanos", "agent", "protocols"), { recursive: true });
  await writeFile(join(rootDir, ".leanos", "agent", "protocols", "where-we-are.md"), "# Legacy Protocol\n", "utf8");

  return rootDir;
}

function legacyYaml() {
  return `leanos:
  version: 0.1.0
  workspace_type: startup
workspace:
  mode: new-product-workspace
activation:
  mode: progressive
  active_areas:
    - strategy.business
    - strategy.product
    - strategy.roadmap
  inactive_areas:
    - operations.product-ops
    - operations.design
    - operations.engineering
    - operations.devops
    - operations.security
    - growth.customer-experience
    - growth.marketing
    - growth.finance
  founder_selected_areas:
    - strategy.business
    - strategy.product
    - strategy.roadmap
company:
  name: Acme AI
  stage: idea
  mode: solo-founder
product:
  name: Clinic Assistant AI
  status: new-product
  type: b2b-saas
  description: An AI receptionist for small clinics.
  target_user: Small clinic owners
github:
  status: pending_user_token
  project_management: prepared
`;
}
