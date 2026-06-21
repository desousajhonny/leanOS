import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";

export type FileEntry = {
  path: string;
  content: string;
};

export type WriteWorkspaceOptions = {
  overwriteExisting?: boolean;
};

export type WriteWorkspaceResult = {
  writtenPaths: string[];
  skippedPaths: string[];
};

export async function findExistingFilePaths(rootDir: string, files: FileEntry[]): Promise<string[]> {
  const existingPaths: string[] = [];

  for (const file of files) {
    const targetPath = join(rootDir, file.path);

    if (await fileExists(targetPath)) {
      existingPaths.push(file.path);
    }
  }

  return existingPaths;
}

export async function writeWorkspaceFiles(rootDir: string, files: FileEntry[], options: WriteWorkspaceOptions = {}): Promise<WriteWorkspaceResult> {
  const overwriteExisting = options.overwriteExisting ?? true;
  const writtenPaths: string[] = [];
  const skippedPaths: string[] = [];

  for (const file of files) {
    const targetPath = join(rootDir, file.path);

    if (!overwriteExisting && (await fileExists(targetPath))) {
      skippedPaths.push(file.path);
      continue;
    }

    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, ensureTrailingNewline(file.content), "utf8");
    writtenPaths.push(file.path);
  }

  return {
    writtenPaths,
    skippedPaths
  };
}

function ensureTrailingNewline(content: string): string {
  return content.endsWith("\n") ? content : `${content}\n`;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
