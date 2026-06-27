import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./fixtures.mjs";

const areaDefinitions = [
  ["strategy", "business"],
  ["strategy", "product"],
  ["strategy", "roadmap"],
  ["operations", "product-ops"],
  ["operations", "design"],
  ["operations", "engineering"],
  ["operations", "devops"],
  ["operations", "security"],
  ["growth", "customer-experience"],
  ["growth", "marketing"],
  ["growth", "finance"]
];

const areaModuleFiles = [
  "index.ts",
  "files.ts",
  "roles.ts",
  "skills.ts",
  "playbooks.ts",
  "common-paths.ts",
  join("knowledge", "index.ts")
];

export async function validateAreaDefinitionsAreModular() {
  const departmentsRoot = join(packageRoot, "src", "templates", "workspace", "definitions", "departments");

  await assertMissing(join(departmentsRoot, "areas"), "Legacy definitions/departments/areas directory should not exist");

  for (const [department, area] of areaDefinitions) {
    await assertAreaPackage(departmentsRoot, department, area);
  }
}

async function assertAreaPackage(departmentsRoot, department, area) {
  const areaDir = join(departmentsRoot, department, area);

  for (const fileName of areaModuleFiles) {
    await access(join(areaDir, fileName), constants.F_OK);
  }

  const indexLineCount = (await readFile(join(areaDir, "index.ts"), "utf8")).split(/\r?\n/).length;
  assert(indexLineCount <= 60, `Area definition index should stay as a small composition root: ${department}/${area}/index.ts`);
}

async function assertMissing(path, message) {
  try {
    await access(path, constants.F_OK);
  } catch {
    return;
  }

  assert.fail(message);
}
