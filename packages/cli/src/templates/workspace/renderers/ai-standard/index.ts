import type { FileEntry } from "../../types.js";
import { checklistFiles } from "./checklists.js";
import { exampleFiles } from "./examples.js";
import { foundationFiles } from "./foundation.js";
import { instructionFiles } from "./instructions.js";
import { templateFiles } from "./templates.js";

export function aiStandardFiles(): FileEntry[] {
  return [
    ...foundationFiles(),
    ...templateFiles(),
    ...checklistFiles(),
    ...instructionFiles(),
    ...exampleFiles()
  ];
}
