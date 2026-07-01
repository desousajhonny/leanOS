import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { assertExists, assertPlaybookFormat, assertSkillFormat } from "./assertions.mjs";
import { projectRoot } from "./fixtures.mjs";

const governanceRoot = join(projectRoot, "docs", "framework", "governance");

const playbooks = [
  "framework-change-review",
  "doctrine-alignment-review",
  "nav-chain-audit",
  "asset-quality-review",
  "department-handoff-review",
  "founder-experience-review"
];

const skills = [
  "framework-change",
  "doctrine-alignment",
  "nav-chain",
  "framework-asset",
  "department-handoff",
  "founder-experience"
];

export async function validateFrameworkGovernance() {
  const agent = await readFile(join(projectRoot, "AGENT.md"), "utf8");
  const frameworkReadme = await readFile(join(projectRoot, "docs", "framework", "README.md"), "utf8");
  const doctrine = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "leanos-doctrine.md"), "utf8");
  const operatingModel = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "operating-model.md"), "utf8");
  const decisionRules = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "decision-rules.md"), "utf8");
  const skillsInventory = await readFile(join(projectRoot, "docs", "framework", "skills", "README.md"), "utf8");
  const playbooksInventory = await readFile(join(projectRoot, "docs", "framework", "playbooks", "README.md"), "utf8");
  const governanceReadmePath = join(governanceRoot, "README.md");

  await assertExists(governanceReadmePath);

  const governanceReadme = await readFile(governanceReadmePath, "utf8");

  assert(governanceReadme.includes("uso interno do framework"), "Governance README should declare internal framework-only usage");
  assert(governanceReadme.includes("Checklist Antes De Commit/PR"), "Governance README should define the pre-commit/PR checklist mode");
  assert(governanceReadme.includes("Auditoria Sob Demanda"), "Governance README should define the on-demand audit mode");
  assert(governanceReadme.includes("Framework Governance Check"), "Governance README should define the governance output block");

  assert(frameworkReadme.includes("governance/"), "Framework README should route maintainers to governance docs");
  assert(agent.includes("docs/framework/governance/"), "Root AGENT should route framework changes to governance without expanding the root inventory");
  assert(agent.includes("Framework Governance"), "Root AGENT should name the governance gate for future agents");
  assert(skillsInventory.includes("## Framework Governance"), "Skills inventory should list internal governance skills separately");
  assert(playbooksInventory.includes("## Framework Governance"), "Playbooks inventory should list internal governance playbooks separately");

  assert(doctrine.includes("Topologia Operacional Como Produto"), "LeanOS doctrine should define operational topology as doctrine");
  assert(doctrine.includes("Lei de Conway"), "LeanOS doctrine should include Conway's Law as a framework design constraint");
  assert(doctrine.includes("Team Topologies"), "LeanOS doctrine should include Team Topologies as a practical lens");
  assert(doctrine.includes("topologia operacional orientada a fluxo de valor"), "LeanOS doctrine should reject org-chart-first structure");
  assert(doctrine.includes("Topologia De Comunicação Acima De Organograma"), "LeanOS doctrine should make communication topology a non-negotiable principle");
  assert(operatingModel.includes("## Topologia Operacional"), "Operating model should map LeanOS areas to operational topology");
  assert(operatingModel.includes("Stream-aligned de delivery orchestration"), "Operating model should classify Product Ops in the value stream");
  assert(operatingModel.includes("Enabling / specialist"), "Operating model should classify specialist/enabling capabilities");
  assert(operatingModel.includes("Platform"), "Operating model should classify platform capabilities");
  assert(decisionRules.includes("Preserve Topologia De Fluxo, Não Organograma"), "Decision rules should prevent org-chart-first changes");
  assert(decisionRules.includes("Use a Lei de Conway como restrição"), "Decision rules should use Conway as an evaluation rule");
  assert(decisionRules.includes("Use Team Topologies como lente prática"), "Decision rules should use Team Topologies as an evaluation rule");

  for (const playbook of playbooks) {
    const content = await readFile(join(governanceRoot, "playbooks", `${playbook}.playbook.md`), "utf8");

    assertPlaybookFormat(content, playbook);
    assert(content.includes("Checklist Antes De Commit/PR"), `${playbook} should support pre-commit/PR usage`);
    assert(content.includes("Auditoria Sob Demanda"), `${playbook} should support on-demand audits`);
    assert(content.includes("pass / risk / blocked"), `${playbook} should produce explicit governance status`);
    assert(content.includes("## Quando Este Playbook É Obrigatório"), `${playbook} should define mandatory trigger conditions`);
    assert(content.includes("## Matriz De Avaliação"), `${playbook} should include an evaluation matrix`);
    assert(content.includes("## Escala De Severidade"), `${playbook} should classify severity`);
    assert(content.includes("blocker / high / medium / low"), `${playbook} should use blocker/high/medium/low severity scale`);
    assert(content.includes("## Cenários De Pressão"), `${playbook} should include pressure scenarios`);
    assert(content.includes("## Racionalizações Comuns"), `${playbook} should counter common model rationalizations`);
    assert(content.includes("## Resultado Obrigatório"), `${playbook} should define a required output shape`);
  }

  for (const skill of skills) {
    const content = await readFile(join(governanceRoot, "skills", skill, "SKILL.md"), "utf8");

    assertSkillFormat(content, skill);
    assert(content.includes("uso interno do framework"), `${skill} should be internal framework-only`);
    assert(content.includes("Evidências"), `${skill} should require evidence-based assessment`);
    assert(content.includes("pass, risk ou blocked"), `${skill} should produce explicit status`);
    assert(content.includes("## Perguntas De Auditoria"), `${skill} should define audit questions`);
    assert(content.includes("## Matriz De Avaliação"), `${skill} should include an evaluation matrix`);
    assert(content.includes("## Sinais De Alerta"), `${skill} should include warning signals`);
    assert(content.includes("## Racionalizações Comuns"), `${skill} should counter common model rationalizations`);
    assert(content.includes("## Exemplo De Saída"), `${skill} should include a concrete output example`);
  }

  const doctrineSkill = await readFile(join(governanceRoot, "skills", "doctrine-alignment", "SKILL.md"), "utf8");
  assert(doctrineSkill.includes("topologia de fluxo de valor"), "Doctrine alignment skill should evaluate value-stream topology");
  assert(doctrineSkill.includes("organograma em pasta"), "Doctrine alignment skill should reject org-chart-first structure");
  assert(doctrineSkill.includes("Especialista revisando tudo aumenta qualidade"), "Doctrine alignment skill should counter specialist-by-default rationalization");

  const navChainSkill = await readFile(join(governanceRoot, "skills", "nav-chain", "SKILL.md"), "utf8");
  assert(navChainSkill.includes("Checar fluxo de valor"), "Nav Chain skill should verify value-stream routing");
  assert(navChainSkill.includes("platform não assume decisão de produto"), "Nav Chain skill should prevent platform ownership drift");
  assert(navChainSkill.includes("Especialista acionado sem gatilho"), "Nav Chain skill should warn on specialist routes without triggers");

  const handoffSkill = await readFile(join(governanceRoot, "skills", "department-handoff", "SKILL.md"), "utf8");
  assert(handoffSkill.includes("Use Team Topologies como lente"), "Department handoff skill should use Team Topologies as a lens");
  assert(handoffSkill.includes("Carga cognitiva"), "Department handoff skill should evaluate cognitive load");
  assert(handoffSkill.includes("Handoff por organograma"), "Department handoff skill should reject org-chart handoffs");

  const frameworkChangeReview = await readFile(join(governanceRoot, "playbooks", "framework-change-review.playbook.md"), "utf8");
  assert(frameworkChangeReview.includes("Mudança de scaffold"), "Framework change review should map scaffold changes to required governance checks");
  assert(frameworkChangeReview.includes("Mudança de GitHub/release"), "Framework change review should map GitHub/release changes to required governance checks");
  assert(frameworkChangeReview.includes("Mudança de skill/playbook/workflow/role"), "Framework change review should map asset changes to required governance checks");
  assert(frameworkChangeReview.includes("não pode seguir para commit/PR"), "Framework change review should define a hard stop for blocked governance");
  assert(frameworkChangeReview.includes("topologia de fluxo de valor"), "Framework change review should evaluate operational topology");
  assert(frameworkChangeReview.includes("organograma em pasta"), "Framework change review should reject org-chart-first changes");

  const frameworkChangeSkill = await readFile(join(governanceRoot, "skills", "framework-change", "SKILL.md"), "utf8");
  assert(frameworkChangeSkill.includes("fluxo de valor"), "Framework change skill should evaluate value flow");
  assert(frameworkChangeSkill.includes("Especialistas, platform ou Product Ops"), "Framework change skill should check capability ownership");

  const doctrineAlignment = await readFile(join(governanceRoot, "playbooks", "doctrine-alignment-review.playbook.md"), "utf8");
  for (const principle of [
    "Business as a Product",
    "Strategy antes de Delivery",
    "Progressão acima de scaffolding",
    "Topologia de fluxo de valor",
    "Trabalho local de produto é primário",
    "Delivery exige readiness"
  ]) {
    assert(doctrineAlignment.includes(principle), `Doctrine alignment review should explicitly check principle: ${principle}`);
  }
  assert(doctrineAlignment.includes("organograma em pasta"), "Doctrine alignment review should block org-chart-first structure");
  assert(doctrineAlignment.includes("especialista sem gatilho"), "Doctrine alignment review should block specialist capabilities without triggers");

  const navChainAudit = await readFile(join(governanceRoot, "playbooks", "nav-chain-audit.playbook.md"), "utf8");
  assert(navChainAudit.includes("intent-map.yaml"), "Nav Chain audit should verify intent-map usage");
  assert(navChainAudit.includes("leanos.yaml"), "Nav Chain audit should verify activation state usage");
  assert(navChainAudit.includes("routing-map.yaml"), "Nav Chain audit should verify routing-map usage");
  assert(navChainAudit.includes("activation_required"), "Nav Chain audit should protect inactive-area activation gates");
  assert(navChainAudit.includes("root não carrega skills profundas"), "Nav Chain audit should protect root AGENT boundaries");
  assert(navChainAudit.includes("root -> departamento -> área -> role/skill/playbook"), "Nav Chain audit should define the canonical navigation chain");
  assert(navChainAudit.includes("Fluxo de valor"), "Nav Chain audit should evaluate value-stream routing");
  assert(navChainAudit.includes("especialista sem gatilho"), "Nav Chain audit should prevent specialist routes without clear triggers");

  const assetQuality = await readFile(join(governanceRoot, "playbooks", "asset-quality-review.playbook.md"), "utf8");
  assert(assetQuality.includes("nome por capacidade/tema"), "Asset quality review should prevent action-only skill names");
  assert(assetQuality.includes("output verificável"), "Asset quality review should require verifiable outputs");
  assert(assetQuality.includes("inventário atualizado"), "Asset quality review should require inventory updates");

  const handoffReview = await readFile(join(governanceRoot, "playbooks", "department-handoff-review.playbook.md"), "utf8");
  assert(handoffReview.includes("source of truth"), "Department handoff review should protect ownership of source of truth");
  assert(handoffReview.includes("Evidência de handoff"), "Department handoff review should require handoff evidence");
  assert(handoffReview.includes("Engineering não recebeu ideia bruta"), "Department handoff review should block raw ideas reaching Engineering");
  assert(handoffReview.includes("produtor / consumidor / validador"), "Department handoff review should identify producer, consumer and verifier");
  assert(handoffReview.includes("Team Topologies"), "Department handoff review should classify interactions with Team Topologies");
  assert(handoffReview.includes("Carga cognitiva"), "Department handoff review should evaluate cognitive load");

  const founderExperience = await readFile(join(governanceRoot, "playbooks", "founder-experience-review.playbook.md"), "utf8");
  assert(founderExperience.includes("O que já temos"), "Founder experience review should enforce founder-friendly response framing");
  assert(founderExperience.includes("não força o founder a escolher departamentos"), "Founder experience review should protect founder-friendly routing");
  assert(founderExperience.includes("reduz confusão"), "Founder experience review should evaluate clarity over ceremony");
  assert(founderExperience.includes("uma pergunta por vez"), "Founder experience review should keep founder prompts guided and lightweight");
}
