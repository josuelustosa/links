# Plano de implementação — Links V2

## Objetivo

Implementar o frame `V3 / Mobile 390 / Links / Dark` no projeto estático atual,
mantendo HTML, CSS e JavaScript puros. A aba **Links** é o estado inicial da
página; a aba **Sobre** permanece disponível pela navegação em tabs.

## Referência visual

- Viewport de referência: `390 × 1080px`.
- Superfície: `#101113` com gradiente radial laranja discreto no topo.
- Coluna: `342px` em viewport de 390px, com `24px` de padding lateral e `32px`
  de padding superior.
- Perfil, ações, tabs, divisor e assinatura reutilizam a base aprovada da aba
  Sobre; não devem ser duplicados.
- Tabs: `342 × 56px`; Links inicia ativa e Sobre permanece inativa.
- Lista: um contato em destaque, três links regulares e um CTA comercial, com
  espaçamento vertical de aproximadamente `16px` entre cards.

## Conteúdo aprovado

Manter a ordem abaixo no `data/site.json`:

1. **Falar por e-mail** — `Contato direto para oportunidades`.
2. **LinkedIn** — `Perfil profissional`.
3. **GitHub** — `Projetos e códigos`.
4. **Currículo** — `Baixar PDF`.
5. **Sua página de links, do seu jeito** — `Crie sua própria página
   personalizada com o que importa.`; ação `Obtenha sua página`.

O item de e-mail atual deve ser transformado no card destacado, sem duplicar
outro link de e-mail na lista. O CTA comercial conserva o `mailto:` atual,
com assunto e corpo preenchidos.

## Escopo

1. Evoluir `links.js` para renderizar título, descrição, variante e ação do
   CTA a partir do JSON.
2. Reestruturar os cards em uma lista semântica: os cards de contato e padrão
   usam um único `a` por `li`; o CTA usa `article` e mantém o único link na
   pílula de ação, sem controles interativos aninhados.
3. Implementar três variantes visuais:
   - `contact`: card de e-mail em superfície elevada com acento laranja,
     ícone em disco laranja e seta para a direita;
   - `default`: card de superfície, borda discreta, ícone em disco laranja e
     indicador de abertura externa quando aplicável;
   - `cta`: card com borda laranja, ícone de globo contornado, texto em duas
     linhas e ação visual em formato de pílula.
4. Preservar o suporte a `visible`, `newTab`, `href` e `rel="noopener
   noreferrer"` para links externos.
5. Reutilizar `tabs.js`, `theme.js`, `share.js` e a estrutura compartilhada
   de `index.html`; a mudança fica restrita ao painel Links e à sua renderização.

## Dados

Manter os campos mínimos definidos no plano V2 (`id`, `title`, `description`,
`href`, `icon`, `featured` e `visible`) e acrescentar:

```json
{
  "id": "email",
  "title": "Falar por e-mail",
  "description": "Contato direto para oportunidades",
  "href": "mailto:josuelustosa.job@gmail.com",
  "icon": "envelope",
  "variant": "contact",
  "featured": true,
  "visible": true,
  "newTab": false
}
```

- `variant`: `contact`, `default` ou `cta`; controla apenas a apresentação.
- `actionLabel`: obrigatório para `variant: "cta"`; usado na pílula visual e
  no nome acessível do link.
- `featured` continua disponível por compatibilidade com o plano V2, mas a
  apresentação passa a ser definida por `variant`.
- A ordem do array é a ordem de exibição.

## Ícones e assets

Aplicar a política de Phosphor Icons do plano V2. Antes de codificar, baixar
somente os SVGs individuais aprovados, em peso `regular`, e incluí-los em
`assets/icons/phosphor/regular/`:

- `envelope`, `linkedin-logo`, `github-logo`, `file-text`, `globe`,
  `arrow-right` e `arrow-square-out`.

Confirmar os nomes no catálogo oficial do Phosphor antes do download. Criar ou
atualizar `assets/icons/phosphor/manifest.json` com nome, peso, versão, origem
e local de uso de cada asset. Os SVGs antigos em `assets/icons/*.svg` só serão
removidos quando não houver referências remanescentes.

Os ícones decorativos recebem `alt=""` e `aria-hidden="true"`. A informação
de abertura em nova aba deve integrar o nome acessível do link, não depender
somente do ícone visual.

## Decisões visuais e de acessibilidade

- Cards regulares e de contato ocupam a largura da coluna e usam altura mínima
  próxima de `68px`; o CTA tem altura intrínseca, sem cortar o texto.
- Os discos de ícone têm `40 × 40px`; indicadores à direita usam área visual
  de pelo menos `24 × 24px`.
- O card destacado usa texto de alto contraste sobre uma superfície elevada com
  acento laranja; descrições dos cards regulares usam token de texto
  secundário.
- Os cards de contato e padrão são clicáveis por inteiro; no CTA, somente a
  pílula de ação é clicável. Ambos têm foco visível em `--accent`, estados de
  hover e toque sem alterar a ordem do conteúdo.
- O tema claro deve manter contraste, fronteiras e hierarquia sem filtros de
  inversão aplicados aos novos SVGs.
- Em 320px e 360px, títulos e descrições podem quebrar linha; não haverá
  rolagem horizontal nem truncamento do CTA.
- Os SVGs serão locais; requisições locais em runtime são aceitáveis, mas não
  pode haver dependência remota para ícones.

## Arquivos envolvidos

- `data/site.json`: nova ordem, textos aprovados, variantes e `actionLabel`.
- `src/js/links.js`: renderer semântico de cards e metadados de acessibilidade.
- `src/styles/index.css`, `tokens.css`, `base.css`, `shell.css` e
  `links.css`: entrada, tokens, composição compartilhada e variantes
  exclusivas da aba Links.
- `index.html`: manter somente o contêiner do painel Links, se a estrutura
  atual for suficiente.
- `assets/icons/phosphor/regular/` e `manifest.json`: SVGs individuais e seu
  inventário.
- `NOTICE.md`: conferir se a atribuição existente ainda cobre os novos assets.

## Sequência de implementação

1. Modularizar o CSS conforme a organização definida no plano V2, sem alterar
   o visual existente.
2. Confirmar os ícones no Phosphor e adicionar os SVGs locais com manifest.
3. Atualizar o schema e os textos de `data/site.json`.
4. Evoluir `links.js` e a semântica dos links externos.
5. Implementar os estilos das três variantes nos temas escuro e claro.
6. Revisar/remover assets antigos que ficarem sem uso.
7. Validar responsividade, teclado, contraste e destinos dos links.

## Critérios de aceite

- Links é a aba inicial no viewport de 390px.
- Perfil compartilhado, tabs, divisor e rodapé preservam o comportamento da
  aba Sobre.
- A lista exibe exatamente os cinco itens aprovados, na ordem definida.
- O e-mail é o único card de contato destacado; LinkedIn, GitHub e Currículo
  usam cards regulares; o CTA usa sua variante própria.
- Título, descrição e ação do CTA vêm exclusivamente do JSON.
- Todos os links externos têm `target="_blank"`, `rel="noopener noreferrer"`
  e indicação acessível de abertura externa.
- Não há corte nem overflow em 320px, 360px, 390px, 768px, 1024px e desktop
  amplo.
- Links, tab e ação de CTA têm foco visível, área de toque adequada e contraste
  AA nos dois temas.
- Não há requisições remotas de ícones; todos os SVGs usados são locais e
  registrados no manifest.

## Validação com os planos existentes

- **PLAN_V2.md:** este plano preserva a stack estática, o JSON como fonte de
  conteúdo, as tabs acessíveis, o tema persistente, os SVGs locais Phosphor e
  o CTA comercial previstos para a V2. A largura da coluna foi alinhada à
  referência de `390px` no plano principal.
- **PLAN_SOBRE_V2.md:** reutiliza perfil, ações, tabs, tokens, largura mobile e
  comportamento responsivo já aprovados, sem duplicar sua implementação.
