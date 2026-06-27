import type { RoleDefinition } from "../../../../types.js";

export const growthMarketingRoles: RoleDefinition[] = [
    {
      slug: "growth-lead",
      title: "Growth Lead",
      purpose: "Translate product strategy into positioning, launch and acquisition experiments.",
      useWhen: ["growth, positioning, landing pages, acquisition or launch is involved"],
      beforeActing: ["../AGENT.md", "../knowledge/positioning.md", "../knowledge/landing-page.md", "../knowledge/acquisition-channels.md", "../knowledge/launch-plan.md", "../../../strategy/product/README.md"],
      skills: ["define-positioning", "create-landing-page-copy", "create-launch-plan"],
      playbooks: ["mvp-launch"],
      outputs: ["Positioning or launch recommendation", "Customer-facing copy draft", "Acquisition experiment", "Open risks"],
      redLines: ["Do not invent proof or customer quotes.", "Do not define visual design without Operations Design when required.", "Do not commit paid acquisition spend without Finance review."]
    }
  ];
