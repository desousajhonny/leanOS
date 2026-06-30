#!/usr/bin/env node

import { runAiCommand } from "./commands/ai.js";
import { runActivateCommand } from "./commands/activate.js";
import { runUpdateCommand } from "./commands/update.js";
import { ui } from "./ui/theme.js";

const [command, ...args] = process.argv.slice(2);

async function main(): Promise<void> {
  if (!command || command === "--help" || command === "-h") {
    showHelp();
    return;
  }

  if (command === "ai") {
    await runAiCommand();
    return;
  }

  if (command === "activate") {
    await runActivateCommand(args[0]);
    return;
  }

  if (command === "update") {
    await runUpdateCommand(args);
    return;
  }

  console.log(ui.error(`Unknown command: ${command}`));
  showHelp();
  process.exitCode = 1;
}

function showHelp(): void {
  console.log(`
${ui.title("LeanOS CLI")}
${ui.muted("Agent-native startup operating system")}

Usage:
  ${ui.command("npm create lean-os")}            Create a new LeanOS workspace
  ${ui.command("lean-os ai")}
  ${ui.command("lean-os activate <area>")}
  ${ui.command("lean-os update [--dry-run]")}

Commands:
  ${ui.command("ai")}          Create an agent-native LeanOS startup workspace (compatibility path)
  ${ui.command("activate")}    Activate a progressive LeanOS workspace area
  ${ui.command("update")}      Migrate an existing LeanOS workspace to the current layout
`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(ui.error("LeanOS failed to run."));
  console.error(ui.muted(message));
  process.exitCode = 1;
});
