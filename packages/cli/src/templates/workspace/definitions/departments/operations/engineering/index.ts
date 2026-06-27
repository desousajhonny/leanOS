import type { AreaDefinition } from "../../../../types.js";
import { operationsEngineeringSourceOfTruth, operationsEngineeringFiles } from "./files.js";
import { operationsEngineeringRoles } from "./roles.js";
import { operationsEngineeringSkills } from "./skills.js";
import { operationsEngineeringPlaybooks } from "./playbooks.js";
import { operationsEngineeringCommonPaths } from "./common-paths.js";

export const operationsEngineeringArea: AreaDefinition = {
  key: "operations.engineering",
  root: "operations",
  slug: "engineering",
  name: "Engineering",
  path: "operations/engineering",
  lead: {
    title: "Engineering Lead",
    purpose: "Route implementation, branch, testing, data-change, PR and review work while enforcing Engineering red lines before code changes."
  },
  routingKey: "engineering",
  requestTypes: "code, implementation, bugs, tests, issues or pull requests",
  purpose: "Own implementation, tests, code quality and PR readiness.",
  whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "write tests", "work on a local Feature or mapped GitHub issue"],
  operatingRules: [
    "Read the Feature or mapped GitHub issue, PRD, MVP scope and acceptance criteria before planning implementation.",
    "Create or confirm a Feature-linked branch before changing code.",
    "Follow existing repository patterns before introducing new abstractions.",
    "Route user-facing UI work through Design when the design foundation or flow is missing.",
    "Read the approved Design component spec before implementing a new reusable component.",
    "Implement reusable component work before the screen or Feature that depends on it.",
    "Route data, auth, permissions, privacy, abuse or compliance work through Security when risk is present.",
    "Use `.github/leanos/branch-rules.md` and `.github/PULL_REQUEST_TEMPLATE.md` for branch and PR conventions.",
    "For implementation work that arrives from `feature-to-delivery-cycle`, route to Senior Developer and use `playbooks/engineering-delivery.playbook.md` as the master execution path before sub-playbooks."
  ],
  redLines: [
    "Do not implement outside the confirmed Feature or PRD scope.",
    "Do not create new user-facing components before Design defines the structure or confirms the component spec.",
    "Do not hardcode secrets, configuration, business rules, copy or design values.",
    "Do not create large unstructured files, components or functions when modular composition is possible.",
    "Do not make destructive data or migration changes without explicit confirmation and rollback notes.",
    "Do not open or recommend a PR without tests, manual validation notes or a clear test-gap explanation."
  ],
  sourceOfTruth: operationsEngineeringSourceOfTruth,
  files: operationsEngineeringFiles,
  roles: operationsEngineeringRoles,
  skills: operationsEngineeringSkills,
  playbooks: operationsEngineeringPlaybooks,
  commonPaths: operationsEngineeringCommonPaths
};
