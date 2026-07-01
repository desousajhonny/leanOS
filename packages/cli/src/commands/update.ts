import { updateWorkspaceLayout } from "../generators/workspace-update.js";
import { ui } from "../ui/theme.js";
import { workspaceExists } from "../utils/paths.js";

export async function runUpdateCommand(args: string[] = []): Promise<void> {
  const dryRun = args.includes("--dry-run");

  if (!(await workspaceExists(process.cwd()))) {
    console.error(ui.error("No LeanOS workspace found in this directory."));
    console.error(ui.muted("Run this command from a directory with leanos.yaml."));
    process.exitCode = 1;
    return;
  }

  const result = await updateWorkspaceLayout(process.cwd(), {
    dryRun
  });

  console.log(ui.success(dryRun ? "LeanOS update preview" : "Updated LeanOS workspace"));
  console.log(ui.muted(`Moved paths: ${result.movedPaths.length}`));
  console.log(ui.muted(`Removed obsolete files: ${result.removedPaths.length}`));
  console.log(ui.muted(`Written files: ${result.writtenPaths.length}`));
  console.log(ui.muted(`Skipped existing product files: ${result.skippedPaths.length}`));

  if (result.conflictPaths.length > 0) {
    console.log(ui.error(`Conflicts: ${result.conflictPaths.length}`));
  }

  printSection("Moved", result.movedPaths);
  printSection("Removed obsolete files", result.removedPaths);
  printSection("Conflicts", result.conflictPaths);

  if (result.conflictPaths.length > 0) {
    process.exitCode = 1;
  }
}

function printSection(title: string, paths: string[]): void {
  if (paths.length === 0) {
    return;
  }

  console.log("");
  console.log(ui.muted(`${title}:`));

  for (const path of paths) {
    console.log(`- ${path}`);
  }
}
