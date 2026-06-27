import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { roadmapKnowledge } from "./knowledge/roadmap.js";
import { roadmapMilestonesKnowledge } from "./knowledge/roadmap-milestones.js";
import { roadmapCurrentCycleKnowledge } from "./knowledge/roadmap-current-cycle.js";
import { roadmapBacklogKnowledge } from "./knowledge/roadmap-backlog.js";

export const strategyRoadmapSourceOfTruth = ["knowledge/roadmap.md", "knowledge/milestones.md", "knowledge/current-cycle.md", "knowledge/backlog.md"];

export const strategyRoadmapFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Roadmap Knowledge", "Durable roadmap context produced by Strategy Roadmap.", "Use when sequencing product work, planning milestones, choosing the current cycle or preparing Product Ops handoff.", "roadmap.md", ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../../.github/leanos/"], "Keep roadmap planning context here. Do not turn candidate backlog items into committed scope without explicit confirmation.") },
    { path: "knowledge/roadmap.md", content: roadmapKnowledge },
    { path: "knowledge/milestones.md", content: roadmapMilestonesKnowledge },
    { path: "knowledge/current-cycle.md", content: roadmapCurrentCycleKnowledge },
    { path: "knowledge/backlog.md", content: roadmapBacklogKnowledge }
  ];
