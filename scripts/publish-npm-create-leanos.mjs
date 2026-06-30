#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import process from "node:process";

const rootDir = process.cwd();
const localNpmrc = join(rootDir, ".npmrc");
const pnpmVersion = "10.12.1";

function run(command, args, label, options = {}) {
  console.log(`\n> ${label}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? rootDir,
    stdio: options.capture ? "pipe" : "inherit",
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  if (result.status !== 0) {
    const details = options.capture ? `${result.stdout ?? ""}${result.stderr ?? ""}`.trim() : "";
    throw new Error(`${label} failed${details ? `\n${details}` : ""}`);
  }

  return result.stdout?.trim() ?? "";
}

function npmView(packageName, ...fields) {
  const result = spawnSync("npm", ["view", packageName, ...fields], {
    cwd: rootDir,
    stdio: "pipe",
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status === 0) {
    return result.stdout.trim();
  }

  if (output.includes("E404") || output.includes("Not Found")) {
    return null;
  }

  throw new Error(`npm view ${packageName} ${fields.join(" ")} failed\n${output.trim()}`);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPublishedVersion(packageName, expectedVersion) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const publishedVersion = npmView(packageName, "version");
    if (publishedVersion === expectedVersion) {
      console.log(`${packageName}@${expectedVersion} verified in npm registry.`);
      return;
    }

    if (attempt < 6) {
      console.log(`Waiting for ${packageName}@${expectedVersion} to propagate in npm registry...`);
      await sleep(10_000);
    }
  }

  throw new Error(`${packageName}@${expectedVersion} was not visible in npm registry after publish.`);
}

function readPackageJson(relativePath) {
  return JSON.parse(readFileSync(join(rootDir, relativePath), "utf8"));
}

function validateGitIsCleanExceptLocalNpmrc() {
  const status = run("git", ["status", "--short"], "git status --short", { capture: true });
  const dirtyEntries = status
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line !== "?? .npmrc");

  if (dirtyEntries.length > 0) {
    throw new Error(
      [
        "Working tree has changes beyond local .npmrc.",
        "Commit or stash framework changes before publishing:",
        ...dirtyEntries
      ].join("\n")
    );
  }
}

function validateNpmAuth() {
  try {
    run("npm", ["whoami"], "npm whoami");
  } catch (error) {
    throw new Error(
      [
        "npm authentication is not ready.",
        "Prepare a local npm token before running this script.",
        "",
        "PowerShell:",
        '$token = [System.Net.NetworkCredential]::new("", (Read-Host "Cole o token npm_" -AsSecureString)).Password',
        '"//registry.npmjs.org/:_authToken=$token" | Set-Content -Encoding ascii .npmrc',
        "npm whoami",
        "",
        "Then run:",
        "npm run release:npm",
        "",
        "Use a Granular Access Token with read/write, All packages and Bypass 2FA."
      ].join("\n"),
      { cause: error }
    );
  }
}

async function publishIfNeeded(packageName, localVersion, filterName) {
  const publishedVersion = npmView(packageName, "version");

  if (publishedVersion === localVersion) {
    console.log(`${packageName}@${localVersion} already exists in npm registry. Skipping publish.`);
    return;
  }

  if (publishedVersion) {
    console.log(`${packageName} currently published at ${publishedVersion}; local version is ${localVersion}.`);
  } else {
    console.log(`${packageName} is not published yet.`);
  }

  run(
    "npx",
    [`pnpm@${pnpmVersion}`, "--filter", filterName, "publish", "--access", "public", "--no-git-checks"],
    `npx pnpm@${pnpmVersion} --filter ${filterName} publish --access public --no-git-checks`
  );

  await waitForPublishedVersion(packageName, localVersion);
}

function cleanupLocalNpmrc() {
  if (!existsSync(localNpmrc)) {
    return;
  }

  unlinkSync(localNpmrc);
  console.log("Local .npmrc removed.");
}

async function main() {
  const leanOsPackage = readPackageJson("packages/cli/package.json");
  const createPackage = readPackageJson("packages/create/package.json");
  const packDestination = join(tmpdir(), "leanos-create-pack-test");

  try {
    validateGitIsCleanExceptLocalNpmrc();
    validateNpmAuth();

    run("npm", ["test"], "npm test");
    run("npx", [`pnpm@${pnpmVersion}`, "-r", "build"], `npx pnpm@${pnpmVersion} -r build`);
    run("npm", ["pack", "--dry-run"], "npm pack --dry-run", { cwd: join(rootDir, "packages", "cli") });

    rmSync(packDestination, { recursive: true, force: true });
    run(
      "npx",
      [`pnpm@${pnpmVersion}`, "--filter", "create-lean-os", "pack", "--pack-destination", packDestination],
      `npx pnpm@${pnpmVersion} --filter create-lean-os pack --pack-destination <temp>`
    );

    await publishIfNeeded("lean-os", leanOsPackage.version, "lean-os");
    await publishIfNeeded("create-lean-os", createPackage.version, "create-lean-os");

    const createDependencies = npmView("create-lean-os", "dependencies", "--json");
    if (!createDependencies?.includes(`"lean-os": "^${leanOsPackage.version}"`)) {
      throw new Error(`create-lean-os dependency verification failed: ${createDependencies}`);
    }

    console.log("\nNPM release completed.");
    console.log(`lean-os@${leanOsPackage.version}`);
    console.log(`create-lean-os@${createPackage.version}`);
    console.log("Smoke command: npm create lean-os");
  } finally {
    cleanupLocalNpmrc();
  }
}

await main();
