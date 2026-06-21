import type { CommandDefinition } from "../types.js";

export const commandDefinitions: CommandDefinition[] = [
  { slug: "start-leanos", purpose: "Start LeanOS by reading AGENT.md, leanos.yaml, current focus and next actions." },
  { slug: "status", purpose: "Summarize the current LeanOS workspace status." },
  { slug: "define-icp", purpose: "Define ICP.", area: "strategy.product" },
  { slug: "define-mvp", purpose: "Define MVP scope.", area: "operations.core" },
  { slug: "check-coherence", purpose: "Check coherence across strategy, MVP, roadmap and issue.", area: "strategy.product" },
  { slug: "create-roadmap", purpose: "Create a validation-first roadmap.", area: "strategy.roadmap" },
  { slug: "create-issues", purpose: "Draft GitHub-ready issues.", area: "operations.core" },
  { slug: "workon-issue", purpose: "Plan issue implementation.", area: "operations.engineering" },
  { slug: "create-pr", purpose: "Prepare a PR summary.", area: "operations.engineering" },
  { slug: "review-pr", purpose: "Review a PR.", area: "operations.engineering" },
  { slug: "create-role", purpose: "Create a new area-owned role using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill", purpose: "Create a new area-owned skill using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-playbook", purpose: "Create a new area-owned playbook using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill-role-playbook", purpose: "Create a coherent role, skill and playbook set inside the correct area.", assetCreation: true }
];
