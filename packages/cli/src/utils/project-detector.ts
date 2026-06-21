import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";
import type { DetectedProject } from "../templates/workspace-template.js";

const execFileAsync = promisify(execFile);

export async function detectProject(rootDir: string): Promise<DetectedProject> {
  const [hasGit, hasPackageJson, hasSrc, hasApp, hasPages, hasGithubDir, hasVercelJson, hasVercelTs] = await Promise.all([
    pathExists(join(rootDir, ".git")),
    pathExists(join(rootDir, "package.json")),
    pathExists(join(rootDir, "src")),
    pathExists(join(rootDir, "app")),
    pathExists(join(rootDir, "pages")),
    pathExists(join(rootDir, ".github")),
    pathExists(join(rootDir, "vercel.json")),
    pathExists(join(rootDir, "vercel.ts"))
  ]);

  const gitRemoteOrigin = hasGit ? await getGitRemoteOrigin(rootDir) : undefined;

  return {
    hasGit,
    hasPackageJson,
    hasSourceDir: hasSrc || hasApp || hasPages,
    hasGithubDir,
    hasVercelConfig: hasVercelJson || hasVercelTs,
    ...(gitRemoteOrigin ? { gitRemoteOrigin } : {})
  };
}

export function hasExistingProjectSignals(project: DetectedProject): boolean {
  return project.hasGit || project.hasPackageJson || project.hasSourceDir || project.hasGithubDir || project.hasVercelConfig;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function getGitRemoteOrigin(rootDir: string): Promise<string | undefined> {
  try {
    const { stdout } = await execFileAsync("git", ["remote", "get-url", "origin"], {
      cwd: rootDir,
      windowsHide: true
    });
    const remote = stdout.trim();
    return remote || undefined;
  } catch {
    return undefined;
  }
}
