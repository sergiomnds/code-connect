# Plano — Página de Login (Code Connect)

## Contexto

`apps/web` ainda é o template gerado pelo Vite: `App.tsx` com contador, CSS puro, sem Tailwind, sem testes, sem router e sem nenhuma estrutura de componentes. O CLAUDE.md, porém, exige **atomic design**, **Tailwind** e **um teste por componente** — ou seja, a primeira tela real do produto precisa também estabelecer essa base.

O objetivo é entregar a tela de **Login** fiel ao layout definido (card escuro centralizado, banner à esquerda, formulário à direita, login social Github/Gmail) e, ao mesmo tempo, deixar o layout base pronto para a tela de **Cadastro**, que reaproveita tudo trocando apenas o banner e os campos do formulário.

Decisões confirmadas:
- Instalar Tailwind v4 + Vitest/RTL, e também **react-router** (rotas `/login` e `/cadastro`).
- Formulário controlado com `useState` + validação simples (sem react-hook-form/zod).
- Submit apenas via prop `onSubmit` — sem chamada HTTP (a API ainda não tem auth).

## Assets disponíveis

- `apps/web/public/banner-login.png` — banner da esquerda (já contém a logo "code connect").
- `apps/web/public/github.png`, `apps/web/public/gmail.png` — ícones sociais.
- Sobras do template a remover: `src/assets/hero.png`, `react.svg`, `vite.svg`, `public/icons.svg`, `src/App.css`, `src/App.tsx`.

## Passo 1 — Base de tooling

**Dependências** (`cd apps/web`):
```
pnpm add react-router
pnpm add -D tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

**`apps/web/vite.config.ts`** — adicionar o plugin do Tailwind e o bloco `test`:
```ts
/// <reference types="vitest/config" />
plugins: [react(), tailwindcss()],
test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.ts'], css: true }
```

**`apps/web/src/test/setup.ts`** — `import '@testing-library/jest-dom/vitest'`.

**`apps/web/tsconfig.app.json`** — acrescentar `"vitest/globals"` e `"@testing-library/jest-dom"` em `types`; incluir `"strict": true` (o template não tem) para o código novo nascer estrito.

**Scripts**: `"test": "vitest run"` e `"test:watch": "vitest"` em `apps/web/package.json`; `"web:test": "pnpm --filter web test"` no `package.json` da raiz.

**`apps/web/src/index.css`** — substituir o CSS do template por `@import "tailwindcss";` + bloco `@theme` com os tokens da marca extraídos do layout:

| token | valor | uso |
|---|---|---|
| `--color-background` | `#0B1013` | fundo da página |
| `--color-surface` | `#2E2E2E` | card |
| `--color-field` | `#8C8C8C` | fundo dos inputs |
| `--color-accent` | `#84F58C` | botão primário / links de destaque |
| `--color-accent-strong` | `#3FCF56` | hover do botão |
| `--color-muted` | `#D9D9D9` | textos secundários / bordas |

Também no `index.css`: `html, body, #root { height: 100% }` e `body { background: var(--color-background) }`.

## Passo 2 — Estrutura atomic design

Criar `apps/web/src/components/{atoms,molecules,organisms,templates}` e `apps/web/src/pages`. Cada componente é uma pasta com `Componente.tsx`, `Componente.test.tsx` e `index.ts`.

### Atoms
- **`Input`** — `<input>` estilizado (fundo `field`, texto escuro, rounded-md, `focus-visible` ring verde). Encaminha todas as props nativas + `id`, `aria-invalid`.
- **`Label`** — `<label htmlFor>` branco, `text-sm`.
- **`Button`** — variantes `primary` (verde, texto escuro, largura total) e `ghost`; aceita `children` e um `icon` opcional à direita (a seta `→` do layout, como SVG inline).
- **`Checkbox`** — input `type="checkbox"` com estilo custom (quadrado, check verde) + label opcional.
- **`TextLink`** — wrapper do `Link` do react-router (ou `<a>` quando `href` externo), com sublinhado.

### Molecules
- **`FormField`** — `Label` + `Input` + mensagem de erro (`role="alert"`); gera `id` via `useId` e liga `htmlFor`/`aria-describedby`. **É a peça-chave de reuso**: o formulário de cadastro monta seus campos diferentes só compondo `FormField`.
- **`FormOptionsRow`** — `Checkbox` "Lembrar-me" + `TextLink` "Esqueci a senha" em `flex justify-between`.
- **`Divider`** — linha com texto centralizado; texto vem por `children` ("ou entre com outras contas").
- **`SocialLoginList`** — recebe `providers: { name, iconSrc, onClick }[]`; renderiza botões com ícone + rótulo (Github, Gmail).
- **`AuthPrompt`** — pergunta + link de ação (`"Ainda não tem conta?"` / `"Crie seu cadastro!"` com o emoji 📋); props `question`, `actionLabel`, `to` — a tela de cadastro usa o inverso ("Já tem conta? / Faça login!").

### Organisms
- **`LoginForm`** — título "Login", subtítulo "Boas-vindas! Faça seu login.", campos *Email ou usuário* e *Senha*, `FormOptionsRow`, `Button` "Login →", `Divider`, `SocialLoginList`, `AuthPrompt`.
  - Estado local: `useState` para `identifier`, `password`, `remember` e `errors`.
  - Validação simples no submit: campos obrigatórios; se o identifier contiver `@`, valida formato de email.
  - Props: `onSubmit(values: LoginFormValues)` e `onSocialLogin?(provider: string)`.

### Templates
- **`AuthTemplate`** — **o ponto central do reuso pedido**. Props:
  ```ts
  { banner: { src: string; alt: string }; children: ReactNode }
  ```
  Renderiza: fundo escuro ocupando a viewport com o padrão decorativo de elos (SVG inline decorativo, `aria-hidden`, baixa opacidade), card centralizado (`rounded-2xl bg-surface`, `max-w-4xl`), grid de 2 colunas (`grid md:grid-cols-2`) com a imagem do banner à esquerda e `children` à direita. No mobile o banner some (`hidden md:block`) e o formulário ocupa a largura toda.
  A página de cadastro depois será só `<AuthTemplate banner={bannerCadastro}><SignUpForm/></AuthTemplate>`.

### Pages
- **`LoginPage`** — `AuthTemplate` com `banner-login.png` + `LoginForm`, passando um `onSubmit` que por ora só faz `console.log`/no-op.
- **`SignUpPage`** — placeholder mínimo usando o mesmo `AuthTemplate` (sem formulário real), só para a rota existir.

## Passo 3 — Roteamento

- Apagar `src/App.css`, `src/assets/*` do template e `public/icons.svg`.
- `src/App.tsx` → define as `Routes`: `/` redireciona para `/login`, `/login` → `LoginPage`, `/cadastro` → `SignUpPage`.
- `src/main.tsx` → envolver `<App />` em `<BrowserRouter>`; ajustar o import para `./App` (sem extensão `.tsx`).
- `index.html` → `lang="pt-BR"` e `<title>Code Connect</title>`.

## Passo 4 — Testes

Um teste por componente cobrindo o caminho essencial (não smoke test), conforme CLAUDE.md:
- `Input` / `Label` / `Checkbox`: renderiza, associa label e reflete interação do usuário (`userEvent.type` / `click`).
- `Button`: dispara `onClick`, respeita `disabled`, renderiza o ícone.
- `FormField`: label ligado ao input via `getByLabelText`, e a mensagem de erro aparece com `role="alert"` e `aria-invalid`.
- `SocialLoginList`: renderiza um botão por provider e chama `onClick` com o provider certo.
- `AuthPrompt` / `Divider` / `FormOptionsRow`: renderizam textos e disparam os callbacks/links.
- `LoginForm` (principal): preencher os dois campos + submeter chama `onSubmit` com os valores; submeter vazio mostra erros e **não** chama `onSubmit`.
- `AuthTemplate`: renderiza o banner com o `alt` correto e o conteúdo filho.
- `LoginPage`: renderiza dentro de `MemoryRouter` e mostra título "Login" e o link para `/cadastro`.

## Verificação

```bash
pnpm web:test      # (script novo) todos os testes de componente passando
pnpm web:lint      # oxlint limpo
pnpm web:build     # tsc -b && vite build sem erros de tipo
pnpm web:dev       # abrir /login e conferir visualmente contra o layout
```
Checagem manual em `/login`: layout de 2 colunas com o banner, foco visível por teclado em todos os campos/botões, erro ao submeter vazio, link "Crie seu cadastro!" navegando para `/cadastro`, e responsividade (banner oculto abaixo de `md`).
