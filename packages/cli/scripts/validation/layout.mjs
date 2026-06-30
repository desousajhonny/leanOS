import assert from "node:assert/strict";
import { parse } from "yaml";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export async function validateBusinessOsLayout() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const paths = files.map((file) => file.path);
  const pathSet = new Set(paths);
  const yaml = parse(files.find((file) => file.path === "leanos.yaml").content);

  assert(pathSet.has("clinic-assistant-ai-os/README.md"), "Business OS root README should be generated under the product OS folder");
  assert(pathSet.has("clinic-assistant-ai-os/strategy/AGENT.md"), "Strategy should live inside the product OS folder");
  assert(pathSet.has("clinic-assistant-ai-os/operations/AGENT.md"), "Operations should live inside the product OS folder");
  assert(pathSet.has("clinic-assistant-ai-os/growth/AGENT.md"), "Growth should live inside the product OS folder");

  assert(pathSet.has(".leanos/standard/README.md"), "AI Standard should live under .leanos/standard");
  assert(pathSet.has(".leanos/runtime/context/current-focus.md"), "Runtime context should live under .leanos/runtime/context");
  assert(pathSet.has(".leanos/runtime/index/routing-map.yaml"), "Runtime indexes should live under .leanos/runtime/index");
  assert(pathSet.has(".leanos/runtime/agent/protocols/where-we-are.md"), "Runtime agent protocols should live under .leanos/runtime/agent");

  assert.equal(paths.some((path) => path.startsWith("strategy/")), false, "Strategy should not be generated at the repository root");
  assert.equal(paths.some((path) => path.startsWith("operations/")), false, "Operations should not be generated at the repository root");
  assert.equal(paths.some((path) => path.startsWith("growth/")), false, "Growth should not be generated at the repository root");
  assert.equal(paths.some((path) => path.startsWith("ai-standard/")), false, "AI Standard should not be generated at the repository root");
  assert.equal(paths.some((path) => path.startsWith(".leanos/context/")), false, "Runtime context should not be generated directly under .leanos");
  assert.equal(paths.some((path) => path.startsWith(".leanos/index/")), false, "Runtime indexes should not be generated directly under .leanos");
  assert.equal(paths.some((path) => path.startsWith(".leanos/agent/")), false, "Runtime agent files should not be generated directly under .leanos");

  for (const file of files) {
    assert.equal(file.content.includes("ai-standard/"), false, `Generated content should not reference root ai-standard/: ${file.path}`);
    assert.equal(file.content.includes(".leanos/context"), false, `Generated content should not reference old runtime context path: ${file.path}`);
    assert.equal(file.content.includes(".leanos/index"), false, `Generated content should not reference old runtime index path: ${file.path}`);
    assert.equal(file.content.includes(".leanos/agent"), false, `Generated content should not reference old runtime agent path: ${file.path}`);
    assert.equal(file.content.includes(".leanos/traces"), false, `Generated content should not reference old runtime traces path: ${file.path}`);
  }

  assert.equal(yaml.paths.business_os, "clinic-assistant-ai-os");
  assert.equal(yaml.paths.runtime, ".leanos/runtime");
  assert.equal(yaml.paths.standard_library, ".leanos/standard");
  assert.equal(yaml.paths.strategy, "clinic-assistant-ai-os/strategy");
  assert.equal(yaml.paths.operations, "clinic-assistant-ai-os/operations");
  assert.equal(yaml.paths.growth, "clinic-assistant-ai-os/growth");
}
