import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./fixtures.mjs";

export async function validateWorkspaceRenderersAreModular() {
  await assertFacade("github.ts", "github", ["index.ts", "issue-templates.ts", "pull-request.ts", "workflows.ts", "leanos-docs.ts", "project-sync.ts", "labels.ts", "rules.ts"]);
  await assertFacade("github/leanos-docs.ts", "github/leanos-docs", ["index.ts", "readme.ts", "setup-guide.ts", "capability-contract.ts", "settings.ts", "work-mapping.ts", "security-automation.ts"]);
  await assertFacade("departments.ts", "departments", ["index.ts", "department.ts", "area.ts", "role.ts", "skill.ts", "playbook.ts", "workflow.ts", "sections.ts"]);
}

async function assertFacade(fileName, moduleDirectory, expectedModules) {
  const facadePath = join(packageRoot, "src", "templates", "workspace", "renderers", fileName);
  const moduleDir = join(packageRoot, "src", "templates", "workspace", "renderers", moduleDirectory);
  const facadeLineCount = (await readFile(facadePath, "utf8")).split(/\r?\n/).length;

  assert(facadeLineCount <= 60, `Workspace renderer facade should stay small: ${fileName}`);

  for (const moduleName of expectedModules) {
    await access(join(moduleDir, moduleName), constants.F_OK);
  }
}
