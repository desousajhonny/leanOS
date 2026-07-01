import type { FileEntry } from "../../types.js";
import { folderReadme } from "../../content/shared.js";
import { guidedConversation } from "./foundation/conversation.js";
import { founderProgressionModel, progressionGates } from "./foundation/progression.js";
import { aiStandardReadme, assetTaxonomy, creationRules, folderDocumentationRules, qualityCriteria } from "./foundation/rules.js";

export function foundationFiles(): FileEntry[] {
  return [
    { path: "ai-standard/README.md", content: aiStandardReadme() },
    { path: "ai-standard/foundation/README.md", content: folderReadme("Foundation", "Foundation central do LeanOS para taxonomia de assets, progressão, navegação, nomenclatura, conversa guiada, criação e qualidade.", "Comece aqui ao decidir que tipo de asset existe, qual estágio de progressão do founder está ativo, onde ele pertence, como falar com o founder ou como julgar qualidade.", "asset-taxonomy.md", ["asset-taxonomy.md", "navigation-chain.md", "founder-progression-model.md", "progression-gates.md", "guided-conversation.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-documentation-rules.md"], ["../templates/", "../checklists/", "../instructions/", "../examples/"], "Carregue apenas o arquivo de foundation necessário para a decisão ativa. Não carregue todos os arquivos de foundation por padrão.") },
    { path: "ai-standard/foundation/navigation-chain.md", content: "# Navigation Chain\n\nLeanOS usa navegação owner-first:\n\n`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Saída`\n\nUse a cadeia para escolher o próximo owner, um nível por vez.\n\n1. A raiz escolhe o departamento owner.\n2. O departamento escolhe um workflow ou área ativa.\n3. A área escolhe a role especialista quando tem `AGENT.md`; caso contrário, use seu `README.md` como mapa local.\n4. A role aponta para as skills e playbooks obrigatórios.\n5. Skills e playbooks estruturam o trabalho.\n6. A saída atualiza apenas o menor arquivo relevante de knowledge, decisão ou projeto.\n\nNão pule níveis porque um arquivo posterior parece relevante.\nNão carregue o workspace inteiro quando existe uma rota menor.\n" },
    { path: "ai-standard/foundation/founder-progression-model.md", content: founderProgressionModel() },
    { path: "ai-standard/foundation/progression-gates.md", content: progressionGates() },
    { path: "ai-standard/foundation/guided-conversation.md", content: guidedConversation() },
    { path: "ai-standard/foundation/asset-taxonomy.md", content: assetTaxonomy() },
    { path: "ai-standard/foundation/creation-rules.md", content: creationRules() },
    { path: "ai-standard/foundation/quality-criteria.md", content: qualityCriteria() },
    { path: "ai-standard/foundation/naming-conventions.md", content: "# Convenções de Nomenclatura\n\n- Use kebab-case minúsculo para pastas e nomes-base de arquivos.\n- Use nomes de asset diretos e no singular: `<direct-name>.role.md`, `<direct-name>/SKILL.md`, `<direct-name>.playbook.md`, `<direct-name>.workflow.md`.\n- Roles terminam com `.role.md`.\n- Pastas de skill usam kebab-case e seu arquivo principal é `SKILL.md`.\n- Playbooks terminam com `.playbook.md`.\n- Workflows terminam com `.workflow.md`.\n- Prefira nomes de capacidade de domínio como `accessibility/SKILL.md` or `design-system/SKILL.md` em vez de nomes de ação genéricos como `define-accessibility/SKILL.md`.\n- Use verbos de ação apenas quando o asset for realmente procedural, como `feature-branching/SKILL.md`.\n- Arquivos de knowledge não usam sufixos de asset; use nomes como `knowledge/design-system.md`.\n" },
    { path: "ai-standard/foundation/folder-documentation-rules.md", content: folderDocumentationRules() }
  ];
}
