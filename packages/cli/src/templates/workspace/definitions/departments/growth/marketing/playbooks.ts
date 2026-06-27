import type { PlaybookDefinition } from "../../../../types.js";

export const growthMarketingPlaybooks: PlaybookDefinition[] = [
    {
      slug: "mvp-launch",
      title: "MVP Launch",
      purpose: "Launch the MVP into a focused learning loop.",
      inputs: ["Product positioning", "Landing page copy", "Acquisition channels", "Launch goal", "Customer feedback plan"],
      steps: ["Read Marketing AGENT and choose Growth Lead", "Use `skills/define-positioning/SKILL.md` if positioning is unclear", "Use `skills/create-landing-page-copy/SKILL.md` to prepare launch copy", "Use `skills/create-launch-plan/SKILL.md` to choose channels and learning metrics", "Route visual design to Operations Design when needed", "Route budget/pricing implications to Growth Finance when needed", "Plan how Customer Experience will capture feedback"],
      outputs: ["Launch plan", "Landing page copy", "Acquisition experiment", "Learning loop", "Open risks"],
      filesToUpdate: ["Update `../knowledge/positioning.md`, `../knowledge/landing-page.md`, `../knowledge/acquisition-channels.md` or `../knowledge/launch-plan.md` after explicit confirmation."]
    }
  ];
