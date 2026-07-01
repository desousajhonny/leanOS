import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readdir, readFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";
import { clientWorkspaceFixtureDir } from "./fixtures.mjs";
import { assertExists } from "./assertions.mjs";
import { createWorkspacePaths, materializeWorkspacePath } from "../../dist/templates/workspace/paths.js";

export function expectedGeneratedPath(path, answers) {
  return materializeWorkspacePath(path, createWorkspacePaths(answers));
}

export async function assertIndexPathsExist(rootDir) {
  const indexRoot = join(rootDir, ".leanos", "runtime", "index");
  const files = ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml", "intent-map.yaml"];

  for (const file of files) {
    await assertExists(join(indexRoot, file));
  }

  const documents = await Promise.all(files.map(async (file) => parse(await readFile(join(indexRoot, file), "utf8"))));
  const paths = [];

  for (const document of documents) {
    collectPathStrings(document, paths);
  }

  for (const path of paths) {
    if (!path.startsWith("../")) continue;
    await assertExists(resolve(indexRoot, path));
  }
}

export function collectPathStrings(value, paths) {
  if (Array.isArray(value)) {
    for (const item of value) collectPathStrings(item, paths);
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "path" && typeof child === "string") {
        paths.push(child);
        continue;
      }
      collectPathStrings(child, paths);
    }
    return;
  }

  if (typeof value === "string" && value.startsWith("../")) {
    paths.push(value);
  }
}

export async function assertInitialContextCoherence(rootDir) {
  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const activeSubareas = new Set(yaml.activation?.active_areas ?? yaml.subareas.active.map((subarea) => subarea.key));
  const initialFiles = [
    join(".leanos", "runtime", "context", "current-focus.md"),
    join(".leanos", "runtime", "context", "next-actions.md"),
    join(".leanos", "runtime", "context", "active-workflow.md")
  ];
  const initialContent = (
    await Promise.all(initialFiles.map((file) => readFile(join(rootDir, file), "utf8")))
  ).join("\n");
  const activeWorkflow = await readFile(join(rootDir, ".leanos", "runtime", "context", "active-workflow.md"), "utf8");

  const commandRequirements = [
    { command: "/define icp", area: "strategy.product" },
    { command: "/define-mvp", area: "operations.product-ops" },
    { command: "/check coherence", area: "strategy.product" },
    { command: "/create roadmap", area: "strategy.roadmap" },
    { command: "/create features", area: "operations.product-ops" },
    { command: "/workon feature", area: "operations.engineering" },
    { command: "/create branch", area: "operations.engineering" },
    { command: "/create pr", area: "operations.engineering" },
    { command: "/review pr", area: "operations.engineering" }
  ];

  const workflowRequirements = [
    { workflow: "feature-to-delivery-cycle", subareas: ["operations.product-ops", "operations.engineering"] },
    { workflow: "post-merge-continuation", subareas: ["operations.product-ops", "operations.engineering"] },
    { workflow: "launch-learning-loop", subareas: ["growth.marketing", "growth.customer-experience"] }
  ];

  for (const requirement of commandRequirements) {
    if (!activeSubareas.has(requirement.area)) {
      assert.equal(
        initialContent.includes(requirement.command),
        false,
        `Initial context should not recommend ${requirement.command} without active ${requirement.area}`
      );
    }
  }

  for (const requirement of workflowRequirements) {
    const workflowAvailable = requirement.subareas.every((subarea) => activeSubareas.has(subarea));
    if (!workflowAvailable) {
      assert.equal(
        activeWorkflow.includes(`- ${requirement.workflow}`),
        false,
        `Active workflow context should not list unavailable workflow ${requirement.workflow}`
      );
    }
  }
}

export async function listFiles(rootDir, currentDir = rootDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const entryPath = join(currentDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(rootDir, entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(relative(rootDir, entryPath).split("\\").join("/"));
    }
  }

  return files;
}

export function resolveFixturePath(path) {
  const targetPath = resolve(clientWorkspaceFixtureDir, path);
  assertPathInside(clientWorkspaceFixtureDir, targetPath);
  return targetPath;
}

export function assertPathInside(parentPath, childPath) {
  const childRelativePath = relative(parentPath, childPath);

  if (childRelativePath === "" || (!childRelativePath.startsWith("..") && !isAbsolute(childRelativePath))) {
    return;
  }

  throw new Error(`Unexpected fixture path outside ${parentPath}: ${childPath}`);
}

export function isInitialStrategyWorkspacePath(path) {
  const inactiveCommandPaths = new Set([
    ".leanos/commands/define-mvp.md",
    ".leanos/commands/define-design.md",
    ".leanos/commands/create-features.md",
    ".leanos/commands/github-sync.md",
    ".leanos/commands/workon-feature.md",
    ".leanos/commands/create-branch.md",
    ".leanos/commands/create-pr.md",
    ".leanos/commands/review-pr.md"
  ]);

  if (path.startsWith(".leanos/commands/") || inactiveCommandPaths.has(path)) {
    return false;
  }

  return !path.startsWith("operations/") && !path.startsWith("growth/");
}

export async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
