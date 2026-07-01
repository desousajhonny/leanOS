#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const outputRoot = join(rootDir, ".github-packages");
const repository = {
  type: "git",
  url: "git+https://github.com/desousajhonny/leanOS.git"
};

function readPackageJson(relativePath) {
  return JSON.parse(readFileSync(join(rootDir, relativePath), "utf8"));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function ensureExists(path, label) {
  if (!existsSync(path)) {
    throw new Error(`${label} does not exist: ${path}`);
  }
}

function copyFile(source, destination) {
  ensureExists(source, `Source file`);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination);
}

function copyDirectory(source, destination) {
  ensureExists(source, `Source directory`);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}

function prepareLeanOsPackage() {
  const sourcePackage = readPackageJson("packages/cli/package.json");
  const destination = join(outputRoot, "lean-os");

  mkdirSync(destination, { recursive: true });
  copyDirectory(join(rootDir, "packages", "cli", "dist"), join(destination, "dist"));
  copyFile(join(rootDir, "packages", "cli", "README.md"), join(destination, "README.md"));

  writeJson(join(destination, "package.json"), {
    ...sourcePackage,
    name: "@desousajhonny/lean-os",
    repository,
    publishConfig: {
      registry: "https://npm.pkg.github.com",
      access: "public"
    }
  });
}

function prepareCreateLeanOsPackage() {
  const sourcePackage = readPackageJson("packages/create/package.json");
  const cliPackage = readPackageJson("packages/cli/package.json");
  const destination = join(outputRoot, "create-lean-os");
  const sourceIndex = readFileSync(join(rootDir, "packages", "create", "index.js"), "utf8");
  const scopedIndex = sourceIndex.replace(
    'await import("lean-os/dist/commands/ai.js")',
    'await import("@desousajhonny/lean-os/dist/commands/ai.js")'
  );

  if (scopedIndex === sourceIndex) {
    throw new Error("create-lean-os index import was not rewritten for the scoped GitHub Packages mirror.");
  }

  mkdirSync(destination, { recursive: true });
  writeFileSync(join(destination, "index.js"), scopedIndex, "utf8");
  copyFile(join(rootDir, "packages", "create", "README.md"), join(destination, "README.md"));

  writeJson(join(destination, "package.json"), {
    ...sourcePackage,
    name: "@desousajhonny/create-lean-os",
    repository,
    dependencies: {
      "@desousajhonny/lean-os": `^${cliPackage.version}`
    },
    publishConfig: {
      registry: "https://npm.pkg.github.com",
      access: "public"
    }
  });
}

rmSync(outputRoot, { recursive: true, force: true });
prepareLeanOsPackage();
prepareCreateLeanOsPackage();

console.log(`Prepared GitHub Packages mirror packages in ${outputRoot}`);
console.log("- @desousajhonny/lean-os");
console.log("- @desousajhonny/create-lean-os");
