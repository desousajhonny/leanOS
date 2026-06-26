# Jornadas Do Founder

Esta pasta contém documentação interna de design do framework.

Ela não é gerada no workspace do cliente e não deve ser copiada para `examples/client-workspace/`.

## Propósito

As Jornadas do Founder descrevem como uma intenção do founder deve passar pelo LeanOS antes de virar workflow, playbook, decisão de ativação ou asset gerado.

Use esta pasta para desenhar e testar a jornada humana antes de alterar o scaffold.

## Arquivos

- `journey-template.md`: template para descrever uma jornada de intenção do founder.
- `journey-map.md`: checklist das jornadas que ainda precisam ser escritas.

## Regra

Toda jornada deve ser testável.

Se uma jornada diz que o modelo deve ir de um arquivo para outro, o workspace deve fornecer evidência:

- uma rota em `AGENT.md`;
- uma explicação em README;
- um path em YAML/index;
- uma role apontando para uma skill ou playbook;
- ou um workflow declarando o handoff.

Se não houver evidência, a rota do framework ainda está implícita demais.
