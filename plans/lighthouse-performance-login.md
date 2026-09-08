# Correção dos problemas de performance do Lighthouse em `/login`

## Contexto

Um relatório Lighthouse 13.4.1 rodado em `http://localhost:5174/login` retornou métricas ruins:

| Métrica | Valor | Score |
|---|---|---|
| First Contentful Paint | 2.5 s | 0.13 |
| Largest Contentful Paint | 5.0 s | 0.08 |
| Speed Index | 2.6 s | 0.39 |

O run também abortou com `runtimeError: PROTOCOL_TIMEOUT` (`Runtime.evaluate` durante `_resizeViewport`, artefato `FullPageScreenshot`), ou seja o relatório está **incompleto** — só as métricas de timing e alguns audits binários chegaram.

Duas conclusões da análise do código:

1. **A medição foi feita contra o dev server do Vite**, que serve ESM não-bundled, sem minificação e com HMR. Isso infla FCP/LCP e é a causa provável do próprio `PROTOCOL_TIMEOUT`. Nenhum número dessa medição é comparável a produção.
2. **Ainda assim existem problemas reais de caminho crítico no código**, que valem correção independentemente do ambiente de medição.

Objetivo: eliminar os gargalos reais e re-medir corretamente, contra o build de produção.

## Problemas reais identificados

### 1. Fontes carregadas por `@import` dentro do CSS — bloqueia o FCP

[apps/web/src/index.css:1-2](apps/web/src/index.css#L1-L2) começa com dois `@import url("https://fonts.googleapis.com/...")`. Isso cria uma cadeia serial: HTML → bundle CSS → parse → CSS do Google Fonts → arquivo da fonte em `fonts.gstatic.com`. Quatro round-trips antes de qualquer texto pintar. É a causa direta do FCP alto.

### 2. Material Symbols Outlined inteira baixada para 3 glifos — é o pior item

O atom [Icon.tsx](apps/web/src/components/atoms/Icon/Icon.tsx) renderiza um `<span class="material-symbols-outlined">`, e a variable font completa (centenas de KB) é baixada para renderizar apenas `arrow_forward`, `assignment` e `login` (usados em [LoginForm.tsx:95,107](apps/web/src/components/organisms/LoginForm/LoginForm.tsx#L95) e [SignUpForm.tsx:114,127](apps/web/src/components/organisms/SignUpForm/SignUpForm.tsx#L114)).

### 3. Banner é o elemento LCP e pesa ~320 KB

`public/banner-login.png` = 407×636 px, **319 KB**; `banner-cadastro.png` = 407×683 px, **347 KB**. Renderizado em `md:w-[407px]` — as dimensões estão certas, o formato é que está errado. WebP na mesma resolução deve ficar em 40–60 KB.

### 4. Nenhuma `<img>` tem `width`/`height` — CLS e reflow

Em [AuthTemplate.tsx](apps/web/src/components/templates/AuthTemplate/AuthTemplate.tsx) (banner + duas `deco-shape.svg`) e em [SocialLoginList.tsx](apps/web/src/components/molecules/SocialLoginList/SocialLoginList.tsx) (ícones sociais), nenhuma imagem declara dimensões intrínsecas, e o banner não tem `fetchpriority="high"` apesar de ser o LCP.

### 5. Faltam hints de conexão e `<meta name="description">`

[apps/web/index.html](apps/web/index.html) não tem `preconnect` para `fonts.gstatic.com` nem meta description (audit de SEO).

## Plano de execução

### Passo 1 — Substituir a fonte de ícones por SVG inline

Reescrever [apps/web/src/components/atoms/Icon/Icon.tsx](apps/web/src/components/atoms/Icon/Icon.tsx):

- Manter a assinatura pública `<Icon name="arrow_forward" />` para não tocar em `Button`, `LoginForm`, `SignUpForm` nem em `AuthPrompt`.
- Trocar o `<span>` por um `<svg>` com `viewBox="0 -960 960 960"` (grid do Material Symbols), `fill="currentColor"`, `width`/`height` de `1em`, `aria-hidden="true"` e `focusable="false"`.
- Mapa local `const paths: Record<string, string>` com os 3 glifos: `arrow_forward`, `assignment`, `login` (paths do Material Symbols Outlined, weight 400, grade 0, opsz 24).
- Tipar `name` como a união das chaves do mapa, em vez de `string`, para que um glifo inexistente vire erro de compilação.
- `currentColor` + `1em` preserva o comportamento atual dentro do `Button` (herda cor e tamanho do texto), então nenhuma classe Tailwind precisa mudar.

Remover em seguida:
- O `@import` do Material Symbols e o bloco `.material-symbols-outlined { ... }` de [index.css](apps/web/src/index.css).

Atualizar os testes existentes, que hoje afirmam o contrato antigo:
- [Icon.test.tsx](apps/web/src/components/atoms/Icon/Icon.test.tsx) — as duas asserções checam `toHaveTextContent('arrow_forward')` e `toHaveClass('material-symbols-outlined')`. Substituir por: renderiza um `<svg>`, mantém `aria-hidden="true"`, preserva classes customizadas, e renderiza path diferente para `name` diferente.
- [Icon.a11y.test.tsx](apps/web/src/components/atoms/Icon/Icon.a11y.test.tsx) — deve continuar passando sem mudanças.

### Passo 2 — Mover a fonte Prompt para o `<head>` com preconnect

Em [apps/web/index.html](apps/web/index.html), remover o `@import` restante do `index.css` e adicionar antes do `<title>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap" />
<meta name="description" content="..." />
```

Manter `display=swap` (já está) e apenas os pesos 400/600, que são os únicos usados.

### Passo 3 — Gerar WebP dos banners

- Adicionar `sharp` como `devDependency` de `apps/web`.
- Criar `apps/web/scripts/optimize-images.mjs`: lê `public/banner-*.png`, escreve `public/banner-*.webp` (mesma resolução, `quality: 80`) e `public/banner-*@2x.webp` (2×, para telas retina), e imprime o antes/depois em KB.
- Registrar `"images": "node scripts/optimize-images.mjs"` em `apps/web/package.json` e o proxy `web:images` no `package.json` da raiz, seguindo o padrão dos scripts `web:*` existentes.
- Rodar o script e commitar os `.webp` gerados (os PNGs ficam como fallback).

### Passo 4 — Ajustar o markup das imagens

Em [AuthTemplate.tsx](apps/web/src/components/templates/AuthTemplate/AuthTemplate.tsx):

- Estender `AuthTemplateProps.banner` com `width` e `height` (e opcionalmente `webpSrc`/`webpSrcSet`), passados de [LoginPage.tsx](apps/web/src/pages/LoginPage/LoginPage.tsx) e [SignUpPage.tsx](apps/web/src/pages/SignUpPage/SignUpPage.tsx).
- Envolver o banner em `<picture>`: `<source type="image/webp" srcSet="/banner-login.webp 1x, /banner-login@2x.webp 2x" />` + o `<img>` PNG atual como fallback, agora com `width`, `height`, `fetchPriority="high"` e `decoding="async"`. **Sem** `loading="lazy"` — é o LCP.
- Nas duas `deco-shape.svg`: adicionar `width={407}`, `height` correspondente ao viewBox do SVG, `loading="lazy"` e `decoding="async"` (são decorativas, fora do caminho crítico).

Em [SocialLoginList.tsx](apps/web/src/components/molecules/SocialLoginList/SocialLoginList.tsx): adicionar `width={32} height={32}` e `loading="lazy"` no `<img>` do provider.

Atualizar os testes de `AuthTemplate`, `LoginPage` e `SignUpPage` que consultam o banner por `getByAltText` — o elemento continua sendo um `<img>` dentro de `<picture>`, então as queries devem seguir válidas, mas as props novas do `banner` precisam ser refletidas nos fixtures de teste.

### Passo 5 — Re-medir corretamente

Todo o relatório original foi contra o dev server. A referência válida é o build de produção:

```bash
pnpm web:build
pnpm web:preview   # serve o dist/ minificado, sem HMR
```

Rodar o Lighthouse contra a URL do `preview` (não a do `dev`). Se o `PROTOCOL_TIMEOUT` persistir mesmo em preview, rodar o Lighthouse pela CLI em vez do painel do DevTools, que é menos sensível a timeout de protocolo.

## Verificação

1. `pnpm web:images` — confirmar no output que os banners caíram de ~320 KB para a faixa de dezenas de KB.
2. `cd apps/web && pnpm test` — toda a suíte (incluindo os testes `.a11y.test.tsx`) deve passar; os testes de `Icon` foram reescritos no Passo 1.
3. `pnpm web:lint` e `pnpm web:build` sem erros (o build valida a tipagem nova de `Icon.name` e das props de `banner`).
4. `pnpm web:dev` — inspeção visual de `/login` e `/cadastro`: os três ícones aparecem idênticos ao design, o banner carrega, nada quebrou de layout.
5. Aba Network do DevTools em produção: nenhuma requisição para `Material+Symbols`, o banner servido como `.webp`, e o CSS do Google Fonts partindo direto do HTML (não mais em cascata a partir do bundle CSS).
6. Novo Lighthouse contra `pnpm web:preview` — LCP e FCP devem cair drasticamente; guardar esse número como a linha de base real.

## Fora de escopo

- Auto-hospedar a fonte Prompt (`.woff2` local + `@font-face`) eliminaria o último domínio de terceiros do caminho crítico. Vale como passo seguinte se, mesmo depois disso, a fonte continuar aparecendo nos audits de render-blocking.
- Code-splitting por rota: com apenas duas páginas pequenas, não compensa hoje.
