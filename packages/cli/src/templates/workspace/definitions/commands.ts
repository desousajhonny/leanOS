import type { CommandDefinition } from "../types.js";

export const commandDefinitions: CommandDefinition[] = [
  { slug: "start-leanos", purpose: "Start LeanOS by reading AGENT.md, leanos.yaml, current focus and next actions." },
  { slug: "status-leanos", purpose: "Diagnose where the LeanOS workspace is and recommend the next safe route." },
  { slug: "define-icp", purpose: "Define ICP.", area: "strategy.product" },
  { slug: "define-mvp", purpose: "Define MVP scope with the LeanOS MVP decision gate.", area: "operations.product-ops" },
  { slug: "define-design", purpose: "Define the MVP design foundation.", area: "operations.design" },
  { slug: "check-coherence", purpose: "Diagnose coherence across strategy, MVP, roadmap, Design, Security, Engineering and Feature readiness.", area: "strategy.product" },
  { slug: "create-roadmap", purpose: "Create a validation-first roadmap.", area: "strategy.roadmap" },
  { slug: "create-features", purpose: "Create local LeanOS Features from a confirmed Epic and prepare optional GitHub issue payloads.", area: "operations.product-ops" },
  { slug: "github-sync", purpose: "Prepare a safe dry-run sync from local LeanOS Epics and Features to GitHub.", area: "operations.devops" },
  { slug: "workon-feature", purpose: "Plan Feature delivery before implementation.", area: "operations.engineering" },
  { slug: "create-branch", purpose: "Prepare a safe branch name and branch creation plan for a Feature or mapped GitHub issue.", area: "operations.engineering" },
  { slug: "create-pr", purpose: "Prepare a PR summary and Founder Testing Guide.", area: "operations.engineering" },
  { slug: "review-pr", purpose: "Review a PR against Feature scope, tests, founder acceptance and LeanOS criteria.", area: "operations.engineering" },
  { slug: "create-role", purpose: "Create a new area-owned role using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill", purpose: "Create a new area-owned skill using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-playbook", purpose: "Create a new area-owned playbook using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill-role-playbook", purpose: "Create a coherent role, skill and playbook set inside the correct area.", assetCreation: true }
];
