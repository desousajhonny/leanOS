export function guidedConversation(): string {
  return `# Conversa Guiada

## Propósito

Fazer o LeanOS parecer guiado para founders sem transformar workflows em formulários rígidos.

Use esta foundation quando um agente, workflow ou playbook precisar pedir contexto, classificação, priorização, confirmação ou decisão ao founder.

## Regra Central

Quando o founder precisar escolher entre caminhos previsíveis, use opções numeradas em vez de apenas perguntas abertas.

Use:

- a UI nativa de seleção da aplicação host quando disponível;
- 3 a 5 opções numeradas;
- uma opção "não tenho certeza / me ajude a decidir";
- uma pergunta por vez quando a decisão mudar estado, roadmap, MVP, issue, PR ou implementação;
- linguagem simples e amigável ao founder antes de paths técnicos;
- resposta livre apenas como fallback se o founder não escolher uma opção.

Se não houver UI nativa de seleção disponível, escreva opções numeradas diretamente no chat.

Sempre permita:

\`\`\`text
Você pode responder com o número da opção.
\`\`\`

Não apresente texto livre como caminho principal quando a decisão puder ser guiada por opções.

## Quando Usar Perguntas Guiadas

Use perguntas guiadas quando:

- o founder precisa escolher um destino para uma ideia;
- o modelo não tem contexto obrigatório;
- uma decisão muda roadmap, MVP, issue, PR, implementação, launch ou estado de aprendizado;
- uma atualização de arquivo depende de confirmação do founder;
- o founder pode não saber o comando ou nome de workflow correto do LeanOS.

Não use perguntas guiadas quando:

- a resposta é um esclarecimento factual simples;
- o founder já deu uma decisão clara;
- o modelo pode resumir com segurança e pedir confirmação;
- a pergunta criaria falsa precisão cedo demais.

## Tipos de Pergunta

### Pergunta de Discovery

Use para entender contexto ausente.

Exemplo:

\`\`\`text
Quem essa ideia ajudaria primeiro?

1. Um usuario novo tentando entender o produto
2. Um usuario ativo tentando concluir uma tarefa
3. Um cliente pagante com problema operacional
4. O founder/time interno
5. Nao sei ainda, me ajude a descobrir
\`\`\`

### Pergunta de Decisão

Use para escolher o próximo caminho.

Exemplo:

\`\`\`text
Qual destino faz mais sentido para essa ideia agora?

1. Refinar melhor comigo
2. Registrar como hipotese para validar depois
3. Guardar como candidata ao roadmap
4. Descartar por enquanto
5. Nao sei, me ajude a decidir
\`\`\`

### Pergunta de Prioridade

Use para ordenar urgência ou impacto.

Exemplo:

\`\`\`text
Por que essa ideia parece importante agora?

1. Resolve uma dor clara do usuario
2. Pode aumentar conversao ou receita
3. Reduz trabalho manual
4. Melhora retencao ou experiencia
5. Ainda e so uma intuicao
\`\`\`

### Pergunta de Confirmação

Use antes de atualizações duráveis ou ações externas.

Exemplo:

\`\`\`text
Posso registrar essa ideia como candidata ao roadmap?

1. Sim, registre no backlog
2. Nao, vamos apenas manter na conversa
3. Quero ajustar a ideia antes
\`\`\`

### Pergunta de Risco

Use quando um caminho puder introduzir risco.

Exemplo:

\`\`\`text
Essa ideia envolve dados sensiveis, login, pagamento ou permissoes?

1. Sim
2. Nao
3. Talvez, nao tenho certeza
\`\`\`

## Regras de Escrita

- Faça uma pergunta guiada importante por vez.
- Prefira opções selecionáveis nativas quando o host suportar; caso contrário, use opções numeradas.
- Não faça um questionário longo a menos que o playbook exija explicitamente um formulário de intake.
- Coloque a decisão humana antes de paths de arquivo.
- Explique a recomendação antes de pedir confirmação.
- Se o founder responder com um número, reafirme o significado selecionado antes de continuar.
- Se o founder responder livremente mesmo assim, mapeie a resposta para a opção mais próxima e diga como você interpretou.

## Formato da Saída

Formato recomendado:

\`\`\`text
Minha leitura:
<avaliação curta>

Proximo passo:
<caminho recomendado>

Escolha uma opcao:
1. <opção>
2. <opção>
3. <opção>
4. Nao sei, me ajude a decidir

Voce pode responder so com o numero ou do seu jeito.
\`\`\`

## Linhas Vermelhas

- Não tome uma decisão pelo founder quando a decisão mudar estado durável.
- Não esconda atualizações de arquivo atrás de linguagem amigável.
- Não exponha paths técnicos antes que o founder entenda a decisão.
- Não use exploração aberta como padrão para decisões previsíveis.
`;
}
