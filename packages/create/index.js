#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
LeanOS Create
Agent-native startup operating system scaffold

Usage:
  npm create lean-os

Compatibility:
  npx lean-os ai
`);
  process.exit(0);
}

const { runAiCommand } = await import("lean-os/dist/commands/ai.js");
await runAiCommand();
