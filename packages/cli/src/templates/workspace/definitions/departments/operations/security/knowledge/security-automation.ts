import { securityKnowledge } from "./security-knowledge-template.js";

export function securityAutomationKnowledge(): string {
  return securityKnowledge(
    "Security Automation Readiness",
    "Define which automated security checks are required before production, and when they can be safely activated for the current stack.",
    [
      "Detected language, framework, package manager and build/test commands.",
      "Status of secret scanning, dependency audit, SAST/code scanning, IaC/config scanning and API/security checks.",
      "Which checks are required for PR, pre-deploy and production release gates.",
      "Which checks are deferred, why they are deferred and what must happen before activation.",
      "False-positive triage owner and minimum response expectations."
    ],
    [
      "Não crie workflows de scanner até stack, package manager e comandos estáveis serem conhecidos.",
      "Secret scanning and dependency audit must be explicitly enabled, planned or deferred with reason before production.",
      "SAST/code scanning should be enabled when the language/framework is supported and code exists.",
      "IaC/config scanning is required only when infrastructure/config files exist.",
      "Security automation status must be reviewed before production deploy."
    ],
    [
      "Não adicione workflows frágeis de Security que falham em todo projeto por padrão.",
      "Não desative scanners de Security existentes ou alertas de dependência sem review humano explícito.",
      "Não marque deploy de produção como pronto sem decisão de automação de Security.",
      "Não contorne achado crítico de scanner sem owner, motivo e follow-up.",
      "Não comite tokens de scanner, credenciais ou segredos de provider."
    ],
    [
      "../playbooks/security-automation-readiness.playbook.md",
      "../playbooks/pre-deploy-security-review.playbook.md",
      "../playbooks/vulnerability-response.playbook.md",
      "../playbooks/ai-generated-code-security-review.playbook.md"
    ],
    ["OWASP Top 10", "OWASP API Security Top 10", "OWASP Secure Coding with AI", "NIST SSDF", "CIS Controls"]
  );
}
