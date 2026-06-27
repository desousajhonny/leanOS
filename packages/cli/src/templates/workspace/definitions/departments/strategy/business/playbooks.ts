import type { PlaybookDefinition } from "../../../../types.js";

export const strategyBusinessPlaybooks: PlaybookDefinition[] = [
    {
      slug: "business-foundation",
      title: "Business Foundation",
      purpose: "Move from raw business context to usable identity, principles and operating model.",
      inputs: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      steps: ["Load the Business AGENT and Business Strategist role.", "Clarify business profile and mission.", "Identify principles that affect product, roadmap and execution decisions.", "Define how the founder and AI agents collaborate.", "Record decisions and open questions.", "Propose file updates and wait for confirmation before writing."],
      outputs: ["Business foundation summary", "Mission/principles proposal", "Operating model proposal", "Decision log entries"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"]
    }
  ];
