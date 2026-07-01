# LeanOS

## Propósito

Shell local do LeanOS.

## Use Quando

Use para localizar runtime, standard library e arquivos internos do agente.

## Fonte da Verdade

`runtime/context/current-focus.md`

## Arquivos

- `runtime/context/`
- `runtime/index/`
- `runtime/scratch/`
- `runtime/traces/`
- `standard/`

## Pastas Relacionadas

- `../AGENT.md`
- `../example-ai-product-os/`

## Navegação

Use este README para escolher o próximo arquivo específico. Não carregue arquivos sem relação com o pedido.

## Notas para Agentes

Runtime vive em `.leanos/runtime/`. Padrões do framework vivem em `.leanos/standard/`. Workflows de negócio vivem no OS do produto. Traces são diagnósticos locais, não telemetria. Scratch é local e ignorado pelo Git para scripts temporários.
