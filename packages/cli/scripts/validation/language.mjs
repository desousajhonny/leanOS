import assert from "node:assert/strict";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

const technicalTermAllowlist = [
  "AGENT",
  "AI",
  "API",
  "B2B",
  "CLI",
  "CI/CD",
  "DevOps",
  "Epic",
  "Feature",
  "GitHub",
  "LeanOS",
  "MVP",
  "Product Ops",
  "PR",
  "README",
  "Strategy",
  "TBD",
  "VS Code"
];

const forbiddenEnglishPatterns = [
  /^## (Overview|Purpose|Use When|When to Use|Required Context|Inputs|Process|Checks & Acceptance Criteria|Output|Files to Update|Red Lines|Before Acting|Required Skills|Relevant Playbooks|Acceptance Criteria|Navigation|Gates|Stop Conditions|Acceptance Criteria & Outputs|Founder Triggers|Progression Stage|Entry Gate|Active Requirements|Activation Requirements|Required Areas|Conditional Areas|Availability|Load First|Navigation Route|Phases|Skills Used|Playbooks Used|Sequence|Confirmation Gates|Allowed Updates|Forbidden Updates|External Capabilities|Expected Output|Continuation Bridge|Guided Conversation|Owner|Operating Scope|Routing Rules|Journey Signals|Active Areas|Workflow Entry|Playbook Entry|Files|Start Here|Related Folders|Agent Notes|File Responsibilities|Common Paths|Current State|Open Questions|Next Update|Decisions)\b/m,
  /\bdescription: Use when\b/,
  /\bUse when this capability is required\b/,
  /\bDo not (invent|load|write|skip|create|modify|answer|recommend|treat)\b/,
  /\bAsk before (modifying|creating|editing|running|marking)\b/,
  /\bStart from `/
];

export function validateGeneratedHumanLanguage() {
  const files = createWorkspaceFiles(answers);
  const humanReadableFiles = files.filter((file) => isHumanReadableMarkdown(file.path));

  for (const file of humanReadableFiles) {
    for (const pattern of forbiddenEnglishPatterns) {
      assert(
        !pattern.test(file.content),
        `${file.path} should use PT-BR human-facing language instead of matching ${pattern}`
      );
    }
  }

  assert(
    technicalTermAllowlist.every((term) => typeof term === "string" && term.length > 0),
    "Technical term allowlist should stay explicit"
  );
}

function isHumanReadableMarkdown(path) {
  if (!path.endsWith(".md")) {
    return false;
  }

  return !path.startsWith(".github/workflows/");
}
