import { stringify } from "yaml";

export function stringifyYaml(value: unknown): string {
  return stringify(value, {
    lineWidth: 0
  });
}
