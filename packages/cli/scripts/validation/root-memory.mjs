import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projectRoot } from "./fixtures.mjs";

export async function validateRootModelMemory() {
  const modelMemory = await readFile(join(projectRoot, "MODEL_MEMORY.md"), "utf8");
  const rootAgent = await readFile(join(projectRoot, "AGENT.md"), "utf8");

  for (const requiredSection of [
    "# Model Memory",
    "## Current State",
    "## Recent Decisions",
    "## Recent Changes",
    "## Open Threads",
    "## Update Rules"
  ]) {
    assert(modelMemory.includes(requiredSection), `MODEL_MEMORY.md should include ${requiredSection}`);
  }

  assert(
    modelMemory.includes("agent/model continuity"),
    "MODEL_MEMORY.md should state that it exists for agent/model continuity"
  );

  assert(
    modelMemory.includes("not a canonical doctrine file"),
    "MODEL_MEMORY.md should avoid becoming a replacement for framework source of truth"
  );

  assert(
    rootAgent.includes("MODEL_MEMORY.md"),
    "Root AGENT.md should route model continuity through MODEL_MEMORY.md"
  );

  assert(
    /status|continuation|resume|next steps/i.test(rootAgent),
    "Root AGENT.md should use MODEL_MEMORY.md for status, continuation, resume or next-step requests"
  );
}
