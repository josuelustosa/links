# Configuração de conteúdo

O conteúdo exibido na página é mantido em [`data/site.json`](../data/site.json).
Edite somente os valores necessários e preserve a sintaxe JSON: chaves e textos
entre aspas duplas, itens separados por vírgula e sem comentários.

## Perfil e tecnologias

O objeto `profile` contém nome, cargo, localização, foto, biografia e a lista de
tecnologias. Cada tecnologia usa:

```json
{
  "id": "typescript",
  "label": "TypeScript",
  "icon": "typescript"
}
```

`icon` deve corresponder a um SVG local em `assets/icons/devicons/`.

## Links

Os itens no array `links` são exibidos na mesma ordem do arquivo. Campos usados:

| Campo | Obrigatório | Uso |
| --- | --- | --- |
| `id` | Sim | Identificador estável e único. |
| `title` | Sim | Título visível do card. |
| `description` | Sim | Texto complementar do card. |
| `href` | Sim | URL, caminho local ou `mailto:` de destino. |
| `icon` | Sim | Nome de um ícone Phosphor local. |
| `variant` | Sim | `contact`, `default` ou `cta`. |
| `visible` | Sim | Define se o item será renderizado. |
| `newTab` | Sim | Abre o destino em nova aba quando `true`. |
| `actionLabel` | Para `cta` | Texto da pílula clicável do CTA. |
| `featured` | Não | Mantido por compatibilidade; a aparência é controlada por `variant`. |

Exemplo de link externo:

```json
{
  "id": "linkedin",
  "title": "LinkedIn",
  "description": "Perfil profissional",
  "href": "https://www.linkedin.com/in/usuario/",
  "icon": "linkedin-logo",
  "variant": "default",
  "visible": true,
  "newTab": true
}
```

Para links externos, use `newTab: true`; o site aplica automaticamente
`target="_blank"`, `rel="noopener noreferrer"` e o aviso acessível de abertura
em nova aba.

## Ícones

Os ícones de interface estão em `assets/icons/phosphor/regular/`; o inventário e
a origem de cada asset ficam em `assets/icons/phosphor/manifest.json`. Não use
CDNs ou URLs remotas para novos ícones.

Antes de publicar uma alteração, execute a página localmente e confirme que o
JSON é válido, os destinos estão corretos e não há overflow nos viewports
mobile.
