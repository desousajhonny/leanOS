#!/usr/bin/env node

import pc from "picocolors";
import { runAiCommand } from "./commands/ai.js";

const [command] = process.argv.slice(2);

async function main(): Promise<void> {
  if (!command || command === "--help" || command === "-h") {
    showHelp();
    return;
  }

  if (command === "ai") {
    await runAiCommand();
    return;
  }

  console.log(pc.red(`Unknown command: ${command}`));
  showHelp();
  process.exitCode = 1;
}

function showHelp(): void {
  console.log(`
${pc.bold("LeanOS CLI")}

Usage:
  lean-os ai

Commands:
  ai    Create an agent-native LeanOS startup workspace
`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(pc.red("LeanOS failed to run."));
  console.error(pc.dim(message));
  process.exitCode = 1;
});
