import type { FileEntry } from "../../types.js";
import { folderReadme } from "../../content/shared.js";
import { guidedConversation } from "./foundation/conversation.js";
import { founderProgressionModel, progressionGates } from "./foundation/progression.js";
import { aiStandardReadme, assetTaxonomy, creationRules, folderDocumentationRules, qualityCriteria } from "./foundation/rules.js";

export function foundationFiles(): FileEntry[] {
  return [
    { path: "ai-standard/README.md", content: aiStandardReadme() },
    { path: "ai-standard/foundation/README.md", content: folderReadme("Foundation", "Core LeanOS foundation for asset taxonomy, progression, navigation, naming, guided conversation, creation and quality.", "Start here when deciding what kind of asset exists, which founder progression stage is active, where it belongs, how to talk to the founder or how to judge quality.", "asset-taxonomy.md", ["asset-taxonomy.md", "navigation-chain.md", "founder-progression-model.md", "progression-gates.md", "guided-conversation.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-documentation-rules.md"], ["../templates/", "../checklists/", "../instructions/", "../examples/"], "Load only the foundation file needed for the active decision. Do not load all foundation files by default.") },
    { path: "ai-standard/foundation/navigation-chain.md", content: "# Navigation Chain\n\nLeanOS uses owner-first navigation:\n\n`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output`\n\nUse the chain to choose the next owner, one level at a time.\n\n1. Root chooses the owning department.\n2. Department chooses a workflow or active area.\n3. Area chooses the specialist role when it has `AGENT.md`; otherwise use its `README.md` as the local map.\n4. Role points to the required skills and playbooks.\n5. Skills and playbooks shape the work.\n6. Output updates only the smallest relevant knowledge, decision or project file.\n\nDo not skip levels because a later file looks relevant.\nDo not load the whole workspace when a smaller route exists.\n" },
    { path: "ai-standard/foundation/founder-progression-model.md", content: founderProgressionModel() },
    { path: "ai-standard/foundation/progression-gates.md", content: progressionGates() },
    { path: "ai-standard/foundation/guided-conversation.md", content: guidedConversation() },
    { path: "ai-standard/foundation/asset-taxonomy.md", content: assetTaxonomy() },
    { path: "ai-standard/foundation/creation-rules.md", content: creationRules() },
    { path: "ai-standard/foundation/quality-criteria.md", content: qualityCriteria() },
    { path: "ai-standard/foundation/naming-conventions.md", content: "# Naming Conventions\n\n- Use lowercase kebab-case for folders and file basenames.\n- Use direct, singular asset names: `<direct-name>.role.md`, `<direct-name>/SKILL.md`, `<direct-name>.playbook.md`, `<direct-name>.workflow.md`.\n- Roles end with `.role.md`.\n- Skill folders use kebab-case and their main file is `SKILL.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n- Prefer domain capability names such as `accessibility/SKILL.md` or `design-system/SKILL.md` over generic action names such as `define-accessibility/SKILL.md`.\n- Use action verbs only when the asset is truly procedural, such as `create-branch/SKILL.md`.\n- Knowledge files do not use asset suffixes; use names such as `knowledge/design-system.md`.\n" },
    { path: "ai-standard/foundation/folder-documentation-rules.md", content: folderDocumentationRules() }
  ];
}
