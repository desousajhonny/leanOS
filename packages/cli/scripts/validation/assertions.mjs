import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./fixtures.mjs";

export async function validateGeneratorScriptIsModular() {
  const runnerPath = join(packageRoot, "scripts", "validate-generator.mjs");
  const moduleDir = join(packageRoot, "scripts", "validation");
  const runnerLineCount = (await readFile(runnerPath, "utf8")).split(/\r?\n/).length;
  const expectedModules = [
    "fixtures.mjs",
    "workspace-files.mjs",
    "client-fixture.mjs",
    "activation.mjs",
    "existing-product-repo.mjs",
    "writer.mjs",
    "assertions.mjs",
    "path-utils.mjs"
  ];

  assert(runnerLineCount <= 80, "Generator validation runner should stay small; split validation logic into scripts/validation modules");

  for (const moduleName of expectedModules) {
    await access(join(moduleDir, moduleName), constants.F_OK);
  }

  const moduleLineLimit = 800;
  const modulePaths = await validationModulePaths(moduleDir);

  for (const modulePath of modulePaths) {
    const moduleLineCount = (await readFile(modulePath, "utf8")).split(/\r?\n/).length;
    assert(moduleLineCount <= moduleLineLimit, `Validation module should stay under ${moduleLineLimit} lines: ${modulePath}`);
  }
}

async function validationModulePaths(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const entryPath = join(rootDir, entry.name);

    if (entry.isDirectory()) {
      paths.push(...await validationModulePaths(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mjs")) {
      paths.push(entryPath);
    }
  }

  return paths;
}

export function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

export function formatPathDiff(label, paths) {
  if (paths.length === 0) {
    return [];
  }

  const shownPaths = paths.slice(0, 20).map((path) => `${label}: ${path}`);
  const hiddenCount = paths.length - shownPaths.length;

  return hiddenCount > 0 ? [...shownPaths, `${label}: ...and ${hiddenCount} more`] : shownPaths;
}

export function failOutOfDate(details) {
  throw new Error([
    "examples/client-workspace is out of date. Run npm run generate:client-workspace.",
    ...details
  ].join("\n"));
}

export async function assertExists(path) {
  assert.equal(await exists(path), true, `Expected path to exist: ${path}`);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function assertSkillFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} skill should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} skill frontmatter should declare name`);
  assert(content.includes("description: Use when"), `${expectedName} skill frontmatter should declare trigger description`);
  assert(content.includes("## Overview"), `${expectedName} skill should use Overview section`);
  assert(content.includes("## Process"), `${expectedName} skill should include Process section`);
  assert(content.includes("### Step 1"), `${expectedName} skill should use Step headings inside Process`);
}

export function assertRoleFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} role should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} role frontmatter should declare name`);
  assert(content.includes("description: Use when"), `${expectedName} role frontmatter should declare trigger description`);
  assert(content.includes("## Purpose"), `${expectedName} role should include Purpose section`);
  assert(content.includes("## When to Use"), `${expectedName} role should include When to Use section`);
  assert(content.includes("## Before Acting"), `${expectedName} role should include Before Acting section`);
  assert(content.includes("## Required Skills"), `${expectedName} role should include Required Skills section`);
  assert(content.includes("## Relevant Playbooks"), `${expectedName} role should include Relevant Playbooks section`);
  assert(content.includes("## Acceptance Criteria"), `${expectedName} role should include Acceptance Criteria section`);
  assert(content.includes("## Red Lines"), `${expectedName} role should include Red Lines section`);
}

export function assertPlaybookFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} playbook should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} playbook frontmatter should declare name`);
  assert(content.includes("description: Use when"), `${expectedName} playbook frontmatter should declare trigger description`);
  assert(content.includes("## Purpose"), `${expectedName} playbook should include Purpose section`);
  assert(content.includes("## When to Use"), `${expectedName} playbook should include When to Use section`);
  assert(content.includes("## Before Acting"), `${expectedName} playbook should include Before Acting section`);
  assert(content.includes("## Inputs"), `${expectedName} playbook should include Inputs section`);
  assert(content.includes("## Process"), `${expectedName} playbook should include Process section`);
  assert(content.includes("## Stop Conditions"), `${expectedName} playbook should include Stop Conditions section`);
  assert(content.includes("## Acceptance Criteria & Outputs"), `${expectedName} playbook should include Acceptance Criteria & Outputs section`);
  assert(content.includes("## Files to Update"), `${expectedName} playbook should include Files to Update section`);
  assert(content.includes("## Red Lines"), `${expectedName} playbook should include Red Lines section`);
}
