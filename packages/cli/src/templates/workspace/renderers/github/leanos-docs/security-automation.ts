export function securityAutomationReadiness(): string {
  return `# Security Automation Readiness

## Propósito

Track which automated security checks should be enabled for this repository before production readiness.

Este arquivo é apenas orientação no scaffold inicial. Não crie workflows de scanner somente a partir deste arquivo.

## Read First

- \`../../<product-slug>-os/operations/security/AGENT.md\`
- \`../../<product-slug>-os/operations/security/knowledge/security-automation.md\`
- \`../../<product-slug>-os/operations/security/playbooks/security-automation-readiness.playbook.md\`
- \`../../<product-slug>-os/operations/devops/knowledge/ci-cd.md\`

## Candidate Checks

- Secret scanning
- Dependency audit / dependency review
- SAST / code scanning
- IaC or config scanning
- API security checks
- Container scanning, when containers exist
- License/supply-chain review, when dependencies matter

## Activation Rules

- Enable only after language, framework, package manager and stable commands are known.
- Prefer GitHub-native security features when available and appropriate.
- Não crie workflows bloqueantes de CI antes de o projeto ter comandos confiáveis de build/test.
- Não desabilite nem contorne scanners existentes sem revisão humana explícita.
- Não armazene tokens de scanner, tokens de provider ou segredos em arquivos versionados.

## Readiness Matrix

| Check | Status | Required Before Production | Notes |
|---|---|---|---|
| Secret scanning | not_configured | yes | Enable or document provider limitation. |
| Dependency audit | not_configured | yes | Depends on package manager. |
| SAST / code scanning | not_configured | recommended | Enable when language/framework is supported. |
| IaC/config scanning | not_applicable | conditional | Required when infra/config files exist. |
| API security checks | not_configured | conditional | Required for public or sensitive APIs. |

## Condições de Parada

- Production deploy requested while security automation status is unknown.
- Critical dependency or secret finding has no owner or mitigation.
- Scanner workflow would be created without known stack/build/test commands.
- Security automation requires paid/provider features the founder has not confirmed.
`;
}
