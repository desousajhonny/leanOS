import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projectRoot } from "./fixtures.mjs";

export async function validateCreateLeanOsPackage() {
  const createPackageJson = JSON.parse(await readFile(join(projectRoot, "packages", "create", "package.json"), "utf8"));
  const createIndex = await readFile(join(projectRoot, "packages", "create", "index.js"), "utf8");
  const createReadme = await readFile(join(projectRoot, "packages", "create", "README.md"), "utf8");
  const rootReadme = await readFile(join(projectRoot, "README.md"), "utf8");
  const cliReadme = await readFile(join(projectRoot, "packages", "cli", "README.md"), "utf8");
  const manifest = await readFile(join(projectRoot, "MANIFEST.md"), "utf8");

  assert.equal(createPackageJson.name, "create-lean-os", "create package should publish as create-lean-os");
  assert.equal(createPackageJson.bin?.["create-lean-os"], "index.js", "create package should expose create-lean-os bin");
  assert.equal(createPackageJson.type, "module", "create package should be ESM");
  assert(createPackageJson.dependencies?.["lean-os"], "create package should depend on lean-os");
  assert(createPackageJson.files.includes("index.js"), "create package should publish index.js");

  assert(createIndex.startsWith("#!/usr/bin/env node"), "create package bin should be executable");
  assert(createIndex.includes('lean-os/dist/commands/ai.js'), "create package should reuse lean-os ai wizard");
  assert(createIndex.includes("runAiCommand"), "create package should call runAiCommand");

  for (const [label, content] of [
    ["README.md", rootReadme],
    ["packages/cli/README.md", cliReadme],
    ["packages/create/README.md", createReadme],
    ["MANIFEST.md", manifest]
  ]) {
    assert(content.includes("npm create lean-os"), `${label} should document npm create lean-os`);
  }

  assert(
    rootReadme.includes("npx lean-os ai") && /compatibility/i.test(rootReadme),
    "README.md should keep npx lean-os ai as compatibility path"
  );
}
