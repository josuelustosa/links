# Plano de implementação — Sobre V2

## Objetivo

Implementar o frame `V3 / Mobile 390 / Sobre / Dark` no projeto estático atual,
mantendo HTML, CSS e JavaScript puros. A aba **Links** será o estado inicial;
a aba **Sobre** permanece disponível pela navegação em tabs.

## Referência visual

- Viewport de referência: `390 × 1080px`.
- Superfície: `#101113` com gradiente radial laranja discreto no topo.
- Coluna: `342px` em viewport de 390px, com `24px` de padding lateral e `32px`
  de padding superior.
- Espaçamento entre blocos: `32px`.
- Fonte: Jura nos pesos 400, 500, 600 e 700.
- Avatar: imagem de `138 × 138px` dentro de um aro de `152 × 152px`; ações
  circulares: `44 × 44px`.
- Tabs: `342 × 56px`; a aba Links inicia ativa.
- Conteúdo: bio, catorze tags de tecnologia de `40 × 40px`, divisor e
  assinatura.

## Escopo

1. Reestruturar a página com perfil compartilhado, ações de compartilhar/tema,
   `tablist`, painéis Links e Sobre, divisor e rodapé.
2. Renderizar perfil, bio e tecnologias a partir de `data/site.json`.
3. Reutilizar `tabs.js`, `theme.js`, `share.js` e `links.js`, conectando-os em
   `app.js`.
4. Implementar o visual da aba Sobre e uma base funcional para a aba Links. A
   fidelidade visual da aba Links será tratada pelo frame próprio dela.
5. Usar SVGs locais: Devicons para JavaScript, TypeScript, React, Next, Vue,
   Figma, Node, Docker, MySQL, Git, Android, iOS, OpenAI e Claude Code;
   Phosphor para compartilhar, tema e localização.

## Dados e assets

O JSON deve guardar a biografia aprovada e uma coleção `technologies` com
`id`, `label` e `icon`. Os ícones serão carregados localmente em
`assets/icons/devicons/` e `assets/icons/phosphor/regular/`.

A foto de perfil usa o asset local otimizado
`assets/img/perfil-josue-lustosa.webp`. A versão de origem permanece em
`assets/img/perfil-josue-lustosa-secao.jpg` e a imagem exibida recebe dimensões
explícitas e prioridade de carregamento.

## Decisões de implementação

- Não fixar a altura em `1080px`: usar `min-height: 100svh` e alturas
  intrínsecas, permitindo leitura em telas menores.
- Usar Grid no bloco de mídia para centralizar o avatar sem um espaçador vazio.
- Criar o aro do avatar com uma borda laranja externa e um intervalo na cor do
  fundo, transmitindo transparência nos dois temas.
- Permitir quebra das tecnologias abaixo de 390px, sem rolagem horizontal.
- Manter o compartilhamento como cópia da URL canônica, conforme o plano V2.
- Aplicar foco visível e nomes acessíveis aos botões de ícone.
- Usar `#121212` no rótulo da tab ativa: o branco previsto no Figma não atinge
  contraste AA a 16px sobre `#FE5626`.

## Arquivos envolvidos

- `index.html`: estrutura semântica e pontos de montagem.
- `src/styles/style.css`: tokens, layout e responsividade.
- `data/site.json`: bio e tecnologias.
- `src/js/app.js`: carregamento dos dados e inicialização.
- `src/js/about.js`: renderização segura do conteúdo Sobre.
- `src/js/tabs.js`, `src/js/theme.js`, `src/js/share.js` e `src/js/links.js`:
  integração das interações existentes.

## Critérios de aceite

- Estado Sobre fiel no viewport 390px de largura.
- Sem corte ou overflow em 320px e 360px.
- Tabs acessíveis por clique, ArrowLeft, ArrowRight, Home e End.
- Botões de compartilhar e tema com área mínima de 44px e feedback acessível.
- Catorze tecnologias com nomes acessíveis e SVGs locais.
- Sem requisições remotas de ícones em runtime; usar somente SVGs locais.
- Tema e conteúdo de links continuam funcionais.
