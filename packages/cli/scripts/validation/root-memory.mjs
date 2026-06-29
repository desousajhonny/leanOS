import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projectRoot } from "./fixtures.mjs";

export async function validateRootModelMemory() {
  const modelMemory = await readFile(join(projectRoot, "MODEL_MEMORY.md"), "utf8");
  const rootAgent = await readFile(join(projectRoot, "AGENT.md"), "utf8");

  for (const requiredSection of [
    "# Memória de Modelo",
    "## Estado Atual",
    "## Decisões Recentes",
    "## Mudanças Recentes",
    "## Threads Abertas",
    "## Regras de Atualização"
  ]) {
    assert(modelMemory.includes(requiredSection), `MODEL_MEMORY.md should include ${requiredSection}`);
  }

  assert(
    modelMemory.includes("continuidade entre agentes/modelos"),
    "MODEL_MEMORY.md should state that it exists for agent/model continuity"
  );

  assert(
    modelMemory.includes("não é um arquivo canônico de doutrina"),
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
