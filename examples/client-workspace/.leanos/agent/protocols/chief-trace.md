# Protocolo de Trace do Chief

## Propósito

Crie um trace local seguro de diagnóstico que explique como o LeanOS Chief interpretou o pedido do founder, qual rota selecionou, quais arquivos carregou, o que perguntou, o que decidiu, onde parou e o que deve acontecer em seguida.

Use este protocolo para debugar se o LeanOS seguiu a Navigation Chain.

## Frases de Gatilho

Use este protocolo quando o founder disser algo como:

- "gere um trace"
- "quero diagnosticar o Chief"
- "o que o LeanOS fez nessa conversa?"
- "por onde ele passou?"
- "registre esse fluxo"
- "quero mandar um relatorio para o framework"
- "debug LeanOS"
- "trace this LeanOS session"

## Regras de Segurança

- Traces são locais e opt-in.
- Peça confirmação antes de escrever um arquivo de trace.
- Não armazene transcrições completas de chat.
- Não armazene tokens, segredos, credenciais, valores de .env ou chaves privadas.
- Não copie código privado, registros de clientes ou conteúdo proprietário longo.
- Resuma respostas do founder em vez de citar detalhes sensíveis.
- Redija qualquer coisa que pareça token, senha, lista de emails, chave de API, dado de cliente ou URL de produção quando isso não for necessário para diagnóstico de roteamento.
- Se um trace expuser informação sensível, pare e explique o que precisa ser redigido primeiro.

## Quando Criar

Crie um trace quando:

- o founder pedir explicitamente um registro de diagnóstico;
- um fluxo LeanOS se comportar de forma inesperada e o founder quiser inspecionar;
- o founder quiser compartilhar um relatório compacto com o mantenedor do framework LeanOS;
- um comando ou workflow pedir evidência de trace durante testes.

Não crie trace por padrão para toda interação normal de produto.

## Carregue Primeiro

Read:

- `../../traces/README.md`
- `../../traces/trace-template.md`
- `../../traces/trace-index.yaml`
- `../../../AGENT.md`

Depois inspecione apenas os arquivos já envolvidos na rota da sessão ou a menor rota ausente necessária para explicar o diagnóstico.

## Nome do Arquivo de Trace

Use:

```text
.leanos/traces/YYYY-MM-DD-<short-kebab-intent>.trace.md
```

Exemplos:

- `.leanos/traces/2026-06-24-github-sync.trace.md`
- `.leanos/traces/2026-06-24-feature-delivery.trace.md`
- `.leanos/traces/2026-06-24-start-leanos.trace.md`

## Processo

1. Confirme que o founder quer um trace local.
2. Identifique a intenção do founder em uma frase curta.
3. Registre a rota selecionada, um arquivo por linha.
4. Registre a menor lista de arquivos carregados ou esperados.
5. Resuma perguntas feitas e respostas recebidas.
6. Registre decisões, confirmações e motivos de parada.
7. Registre atualizações propostas e se foram confirmadas.
8. Registre arquivos ausentes ou quebras na Navigation Chain.
9. Registre a próxima rota sugerida.
10. Peça confirmação antes de escrever o arquivo de trace e atualizar `trace-index.yaml`.

## Atualizações Permitidas

Depois de confirmação explícita do founder, escreva:

- `../../traces/YYYY-MM-DD-<short-kebab-intent>.trace.md`
- `../../traces/trace-index.yaml`

## Atualizações Proibidas

Não atualize:

- arquivos de estratégia de produto;
- arquivos de knowledge de operations;
- roles, skills, playbooks ou workflows;
- `.github/`;
- code;
- arquivos env;
- serviços remotos.

Este protocolo documenta o que aconteceu. Ele não executa trabalho de produto.

## Saída Esperada

Before writing, show:

```text
Resumo do trace:
- Intent:
- Route:
- Files loaded:
- Stop reason:
- Sensitive data risk:
- Proposed trace file:

Você quer que eu escreva este trace local?
```

Depois de escrever, diga ao founder qual arquivo de trace foi criado e lembre-o de revisar/redigir antes de compartilhar fora do workspace.
