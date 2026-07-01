# Jornadas Do Founder

Esta pasta contém documentação interna de design do framework.

Ela não é gerada no workspace do cliente e não deve ser copiada para `examples/client-workspace/`.

## Propósito

As Jornadas do Founder descrevem como uma intenção do founder deve passar pelo LeanOS antes de virar workflow, playbook, decisão de ativação ou asset gerado.

Use esta pasta para desenhar e testar a jornada humana antes de alterar o scaffold.

## Arquivos

- `journey-template.md`: template para descrever uma jornada de intenção do founder.
- `journey-map.md`: checklist das jornadas que ainda precisam ser escritas.
- `idea-calibration.md`: jornada canônica para começar, calibrar ou avaliar qualquer ideia antes de MVP, roadmap ou delivery.
- `pull-request-review.md`: jornada de review de PR via Engineering e `pr-validation`.
- `ready-for-launch.md`: jornada de readiness de lançamento antes de Growth, deploy ou learning loop.
- `security-hardening-cycle.md`: jornada de auditoria e fortalecimento de Security para vulnerabilidades, LGPD, dados de cliente, token vazado, APIs e AI app security.
- `pricing-source-of-truth.md`: jornada para planos, preços, cobrança, paywall, checkout e entitlements via Growth Finance.
- `spend-budget-control.md`: jornada para gastos, orçamento, burn, runway, ferramentas pagas, mídia paga e custos variáveis via Growth Finance.
- `growth-experiment-learning.md`: jornada para planejar experimento de Growth, colar resultados manuais e tomar decisão com evidência.

## Regra

Toda jornada deve ser testável.

Se uma jornada diz que o modelo deve ir de um arquivo para outro, o workspace deve fornecer evidência:

- uma rota em `AGENT.md`;
- uma explicação em README;
- um path em YAML/index;
- uma role apontando para uma skill ou playbook;
- ou um workflow declarando o handoff.

Se não houver evidência, a rota do framework ainda está implícita demais.
