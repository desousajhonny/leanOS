import type { AreaDefinition } from "../../../../types.js";
import { operationsDevopsSourceOfTruth, operationsDevopsFiles } from "./files.js";
import { operationsDevopsRoles } from "./roles.js";
import { operationsDevopsSkills } from "./skills.js";
import { operationsDevopsPlaybooks } from "./playbooks.js";
import { operationsDevopsCommonPaths } from "./common-paths.js";

export const operationsDevopsArea: AreaDefinition = {
  key: "operations.devops",
  root: "operations",
  slug: "devops",
  name: "DevOps",
  path: "operations/devops",
  lead: {
    title: "DevOps Lead",
    purpose: "Route GitHub setup, environments, CI/CD, deployment readiness, observability and release operations without storing secrets or deploying automatically."
  },
  routingKey: "devops",
  requestTypes: "deployment, environments, CI, observability, GitHub Projects or operations runbooks",
  purpose: "Own delivery infrastructure, environments, deployment, GitHub workflow setup and observability notes.",
  whenToUse: ["plan deployment", "configure CI", "configure GitHub Projects", "document environments", "define observability"],
  operatingRules: [
    "Treat DevOps as readiness and operational guidance first, execution second.",
    "Use GitHub/Vercel/provider files as configuration drafts until the founder confirms execution.",
    "Keep local, preview/staging and production environments distinct.",
    "Prefer dry-run, status checks and proposed payloads before any remote write.",
    "Route product code implementation back to Engineering and product scope questions back to Product Ops."
  ],
  redLines: [
    "Do not store tokens, secrets or credentials in workspace files.",
    "Do not ask the founder to paste tokens into chat or markdown files.",
    "Do not call GitHub, Vercel or any provider API without explicit confirmation.",
    "Do not create `.vercel/`, run `vercel link` or deploy automatically from the scaffold.",
    "Do not create or modify `vercel.json` until a real app/framework exists and overrides are required.",
    "Do not add CI deploy gates or branch protection changes without explaining impact and asking first."
  ],
  sourceOfTruth: operationsDevopsSourceOfTruth,
  files: operationsDevopsFiles,
  roles: operationsDevopsRoles,
  skills: operationsDevopsSkills,
  playbooks: operationsDevopsPlaybooks,
  commonPaths: operationsDevopsCommonPaths
};
