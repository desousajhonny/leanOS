import { activateWorkspaceArea } from "../generators/workspace-activation.js";
import { ui } from "../ui/theme.js";
import { workspaceExists } from "../utils/paths.js";
import type { Subarea } from "../templates/workspace-template.js";

export async function runActivateCommand(areaKey?: string): Promise<void> {
  if (!areaKey) {
    console.error(ui.error("Missing activation target."));
    printActivateUsage();
    process.exitCode = 1;
    return;
  }

  if (!(await workspaceExists(process.cwd()))) {
    console.error(ui.error("No LeanOS workspace found in this directory."));
    console.error(ui.muted("Run this command from a directory with leanos.yaml."));
    process.exitCode = 1;
    return;
  }

  const result = await activateWorkspaceArea(process.cwd(), areaKey as Subarea);

  console.log(ui.success(`Activated ${result.activatedArea}`));
  console.log(ui.muted(`Department: ${result.activatedDepartment}`));
  console.log(ui.muted(`Written files: ${result.writtenPaths.length}`));
  console.log("");

  for (const writtenPath of result.writtenPaths) {
    console.log(`- ${writtenPath}`);
  }
}

function printActivateUsage(): void {
  console.log(`
Usage:
  ${ui.command("lean-os activate <area>")}

Example:
  ${ui.command("lean-os activate operations.product-ops")}
`);
}
