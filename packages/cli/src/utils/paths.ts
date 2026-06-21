import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

export async function workspaceExists(rootDir: string): Promise<boolean> {
  return (await pathExists(join(rootDir, "leanos.yaml"))) || (await pathExists(join(rootDir, "AGENT.md")));
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
