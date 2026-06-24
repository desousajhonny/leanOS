import type { CommandDefinition } from "../types.js";

export const commandDefinitions: CommandDefinition[] = [
  { slug: "start-leanos", purpose: "Start LeanOS by reading AGENT.md, leanos.yaml, current focus and next actions." },
  { slug: "status-leanos", purpose: "Diagnose where the LeanOS workspace is and recommend the next safe route." },
  { slug: "define-icp", purpose: "Define ICP.", area: "strategy.product" },
  { slug: "shape-mvp", purpose: "Shape MVP scope with the LeanOS MVP decision gate.", area: "operations.product-ops" },
  { slug: "define-design", purpose: "Define the MVP design foundation.", area: "operations.design" },
  { slug: "check-coherence", purpose: "Check coherence across strategy, MVP, roadmap and issue.", area: "strategy.product" },
  { slug: "create-roadmap", purpose: "Create a validation-first roadmap.", area: "strategy.roadmap" },
  { slug: "create-issues", purpose: "Draft GitHub-ready issues.", area: "operations.product-ops" },
  { slug: "github-sync", purpose: "Prepare a safe dry-run sync from local LeanOS Epics and Features to GitHub.", area: "operations.devops" },
  { slug: "workon-issue", purpose: "Plan issue implementation.", area: "operations.engineering" },
  { slug: "create-branch", purpose: "Prepare a safe branch name and branch creation plan for an issue.", area: "operations.engineering" },
  { slug: "create-pr", purpose: "Prepare a PR summary.", area: "operations.engineering" },
  { slug: "review-pr", purpose: "Review a PR.", area: "operations.engineering" },
  { slug: "create-role", purpose: "Create a new area-owned role using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill", purpose: "Create a new area-owned skill using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-playbook", purpose: "Create a new area-owned playbook using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill-role-playbook", purpose: "Create a coherent role, skill and playbook set inside the correct area.", assetCreation: true }
];
