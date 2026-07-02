import { validateLeanOsWorkspace, type ValidationFinding, type ValidationSeverity, type WorkspaceValidationResult } from "../validators/workspace-validator.js";
import { ui } from "../ui/theme.js";

export async function runValidateCommand(): Promise<void> {
  const result = await validateLeanOsWorkspace(process.cwd());

  printValidationResult(result);

  if (!result.passed) {
    process.exitCode = 1;
  }
}

function printValidationResult(result: WorkspaceValidationResult): void {
  const totalFindings = result.findings.length;
  const title = result.passed
    ? totalFindings > 0
      ? ui.warning("Validacao LeanOS aprovada com avisos")
      : ui.success("Validacao LeanOS aprovada")
    : ui.error("Validacao LeanOS falhou");

  console.log(title);
  console.log(ui.muted(`Workspace: ${result.rootDir}`));
  console.log(summaryLine(result));

  if (result.findings.length === 0) {
    return;
  }

  console.log("");
  console.log(ui.title("Findings"));

  for (const finding of result.findings) {
    printFinding(finding);
  }
}

function summaryLine(result: WorkspaceValidationResult): string {
  return [
    `Findings: ${result.findings.length}`,
    `blocker: ${result.summary.blocker}`,
    `high: ${result.summary.high}`,
    `medium: ${result.summary.medium}`,
    `low: ${result.summary.low}`
  ].join(" | ");
}

function printFinding(finding: ValidationFinding): void {
  const label = severityLabel(finding.severity);
  const path = finding.path ? ` ${ui.path(finding.path)}` : "";

  console.log(`${label} ${finding.code}${path}`);
  console.log(`  ${finding.message}`);

  if (finding.suggestion) {
    console.log(ui.muted(`  Sugestao: ${finding.suggestion}`));
  }
}

function severityLabel(severity: ValidationSeverity): string {
  const label = `[${severity}]`;

  if (severity === "blocker" || severity === "high") {
    return ui.error(label);
  }

  if (severity === "medium") {
    return ui.warning(label);
  }

  return ui.muted(label);
}
