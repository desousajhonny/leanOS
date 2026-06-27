import type { AreaDefinition } from "../../../../types.js";
import { growthMarketingSourceOfTruth, growthMarketingFiles } from "./files.js";
import { growthMarketingRoles } from "./roles.js";
import { growthMarketingSkills } from "./skills.js";
import { growthMarketingPlaybooks } from "./playbooks.js";
import { growthMarketingCommonPaths } from "./common-paths.js";

export const growthMarketingArea: AreaDefinition = {
  key: "growth.marketing",
  root: "growth",
  slug: "marketing",
  name: "Marketing",
  path: "growth/marketing",
  lead: {
    title: "Marketing Lead",
    purpose: "Route positioning, landing page copy, acquisition experiments and launch planning without turning early growth into heavy process."
  },
  routingKey: "marketing",
  requestTypes: "positioning, landing page, launch, acquisition or marketing",
  purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
  whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
  operatingRules: [
    "Use Strategy Product as the source for ICP, problem, value proposition and positioning claims.",
    "Route visual design or UI structure to Operations Design when needed.",
    "Keep launch plans focused on learning, not vanity activity."
  ],
  redLines: [
    "Do not invent proof, testimonials or customer results.",
    "Do not create visual design direction without Design when UX/brand details matter.",
    "Do not spend budget or commit channels without Finance review when money is involved."
  ],
  sourceOfTruth: growthMarketingSourceOfTruth,
  files: growthMarketingFiles,
  roles: growthMarketingRoles,
  skills: growthMarketingSkills,
  playbooks: growthMarketingPlaybooks,
  commonPaths: growthMarketingCommonPaths
};
