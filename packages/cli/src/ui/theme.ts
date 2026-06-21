import pc from "picocolors";

export const ui = {
  brand: (value: string) => pc.cyan(value),
  command: (value: string) => pc.cyan(value),
  path: (value: string) => pc.dim(value),
  title: (value: string) => pc.bold(value),
  success: (value: string) => pc.green(value),
  warning: (value: string) => pc.yellow(value),
  error: (value: string) => pc.red(value),
  muted: (value: string) => pc.dim(value)
};

export function stepLabel(step: number, total: number, label: string): string {
  return `${ui.brand(`Step ${step}/${total}`)} ${ui.muted("-")} ${ui.title(label)}`;
}

export function keyValue(label: string, value: string): string {
  return `${ui.muted(`${label}:`)} ${value}`;
}

export function bullet(value: string): string {
  return `- ${value}`;
}
