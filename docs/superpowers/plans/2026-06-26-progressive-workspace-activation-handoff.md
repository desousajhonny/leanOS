# Handoff De Progressive Workspace Activation

## Branch

Continuar em `feature/progressive-workspace-activation`.

Não criar uma nova branch a menos que a branch atual seja mergeada primeiro.

## Estado Atual De Commits

Commits recentes nesta branch:

- `8d664d2 feat: add progressive activation state`
- `2fb5eab feat: generate strategy-only initial workspace`

O working tree estava limpo quando este handoff foi escrito.

## O Que Já Foi Feito

- `leanos.yaml` agora inclui estado de ativação progressiva:
  - departamentos e áreas ativos;
  - departamentos e áreas inativos;
  - departamentos e áreas disponíveis;
  - departamentos e áreas selecionados pelo founder no wizard;
  - `missing_asset_behavior: return_activation_required`.
- A geração inicial do scaffold agora cria apenas Strategy.
- Operations e Growth não são gerados durante o setup inicial.
- Comandos ligados a áreas inativas não são gerados durante o setup inicial.
- O `AGENT.md` raiz roteia solicitações de áreas inativas por `activation_required` em vez de apontar para pastas ou arquivos de comando ausentes.
- Workflows de Strategy foram ajustados para não referenciar paths inativos de Operations/Growth como assets carregáveis.
- `examples/client-workspace` foi regenerado como preview Strategy-only.

Verificado antes do commit:

```powershell
packages\cli\node_modules\.bin\tsc.CMD -p packages\cli\tsconfig.json
node packages\cli\scripts\validate-generator.mjs
git diff --check
```

## Próximo Slice

Implementar o fluxo prático de ativação: como o LeanOS Chief cria o próximo departamento ou área quando o founder chega ao estágio correto.

A próxima implementação deve responder:

- Onde a lógica de ativação vive?
- Como o Chief decide que uma área inativa deve ser ativada?
- Como o Chief cria os arquivos corretos sem gerar o framework inteiro?
- Como o Chief atualiza `leanos.yaml`, indexes, arquivos de contexto e estado de preview depois da ativação?
- Como o Chief comunica ativação naturalmente, sem soar mecânico?

## Regras De Experiência Do Founder

O Chief não deve dizer apenas: `activation_required`.

O Chief deve explicar o próximo passo operacional natural:

```text
Esse pedido já passou do ponto de estratégia. Minha sugestão é abrir Product Ops agora para transformar isso em escopo executável.
```

O Chief deve pedir confirmação antes de criar novos departamentos ou áreas:

```text
Posso ativar Operations/Product Ops e criar os arquivos mínimos para esse próximo passo?
```

O Chief não deve carregar ou referenciar arquivos de departamentos inativos como se eles já existissem.

O Chief deve sempre ler `leanos.yaml` primeiro e distinguir:

- `active_*`: existe e pode ser carregado agora;
- `inactive_*`: disponível depois, mas ainda não presente;
- `founder_selected_*`: selecionado no wizard, mas ainda bloqueado por maturidade do negócio.

## Condições De Ativação Sugeridas

### Operations / Product Ops

Ativar quando Strategy tem contexto suficiente e o founder quer transformar strategy em delivery:

- problema, ICP e proposta de valor estão minimamente claros;
- um item de roadmap/backlog existe ou está sendo promovido;
- founder pergunta sobre MVP, escopo, Epic, Feature, PRD, critérios, stories ou construção;
- Chief consegue explicar por que Strategy sozinha não é mais suficiente.

### Operations / Design

Ativar quando delivery precisa de trabalho de UX ou experiência de produto:

- Product Ops ou escopo de MVP existe;
- founder pede telas, fluxos, protótipo, design system, copy, acessibilidade ou componentes;
- uma Feature depende de clareza de interação do usuário.

### Operations / Engineering

Ativar quando a implementação se torna concreta:

- Feature está definida o suficiente para planejamento;
- Product Ops confirmou escopo e critérios;
- founder pede código, branch, testes, implementação, PR ou review.

### Operations / DevOps

Ativar quando a execução precisa de infraestrutura ou tooling externo:

- GitHub sync, GitHub Projects, CI/CD, deploy, ambientes, release, observabilidade ou configuração de repositório entram no fluxo;
- founder confirma uma ação externa ou remota.

### Growth

Ativar quando existe algo para lançar, testar ou aprender externamente:

- landing page, posicionamento, aquisição, lançamento, feedback de clientes, pricing, onboarding, churn ou aprendizado de sucesso se tornam relevantes;
- Strategy ou Product Ops produziu uma hipótese concreta, escopo de MVP ou objetivo de aprendizado.

## Ordem Recomendada Para A Próxima Implementação

1. Definir um service/helper de ativação na camada do generator da CLI que consiga produzir arquivos para uma área inativa solicitada.
2. Adicionar um update seguro de estado de ativação para `leanos.yaml`.
3. Regenerar indexes e arquivos de contexto depois da ativação.
4. Adicionar instruções voltadas ao Chief para propostas de ativação e linguagem de confirmação.
5. Adicionar cobertura de validator para ativar `operations.product-ops` a partir de um workspace Strategy-only.
6. Estender o mesmo padrão para Design, Engineering, DevOps e Growth.
