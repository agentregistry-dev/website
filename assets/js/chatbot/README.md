# Chatbot module

The agentregistry docs assistant — the "Ask AI" widget on `/docs/` pages.

Ported from the Solo Enterprise for agentgateway docs assistant
(`solo-io/docs`, `assets/js/chatbot/`). The logic is the same; see
[Differences from solo-io/docs](#differences-from-solo-iodocs).

## Architecture

```
assets/js/chatbot/
├── index.js      # Entry point — reads the page index, renders <App/>
├── app.js        # The Preact component: state, persistence, all markup
├── stream.js     # ChatStreamer — SSE streaming from the assistant endpoint
├── ui.js         # ThinkingAnimator + MarkdownRenderer (buffered streaming render)
└── markdown.js   # marked + highlight.js + DOMPurify configuration
```

| Module | Responsibility |
| --- | --- |
| `index.js` | Reads `#chatbot-page-index` and the mount node's `data-favicon`, then renders `<App/>` into `#chatbot-widget`. Holds `AGENT_ENDPOINT` and `PRODUCTS`. |
| `app.js` | One Preact class component. Conversation state, `sessionStorage` persistence, page context, `@` mention autocomplete, feedback, export, and every piece of markup. |
| `stream.js` | An `EventSource`-shaped handle over `fetch()` + `ReadableStream`, so HTTP status codes (429 in particular) are visible before the stream opens. No UI concerns. |
| `ui.js` | `ThinkingAnimator` (the bouncing dots) and `MarkdownRenderer`, which buffers tokens and reveals an unfinished code block line by line. |
| `markdown.js` | Configures marked for GFM, highlights code with highlight.js, and sanitizes the result with DOMPurify before it reaches `dangerouslySetInnerHTML`. |

## Dependencies

All of them are vendored in [`assets/js/vendor/`](../vendor/README.md) and
bundled into one file, so the widget contacts no third-party origin at runtime:
preact + htm, marked, DOMPurify, and highlight.js (core plus the YAML grammar).

The two highlight.js theme stylesheets stay separate, at `assets/css/vendor/`,
because the enabled one has to follow the reader's theme. Both are wired up in
[`layouts/_partials/chatbot.html`](../../../layouts/_partials/chatbot.html).

## Highlighting: YAML only

Only YAML is highlighted; every other code block is plain escaped text. The
reason is measured: highlight.js colors keywords, strings, variables and
comments, so a command line such as `arctl apply -f agent.yaml` yields zero
token spans no matter which grammar runs. This corpus is ~228 `sh` fences, ~55
`console` and ~10 `yaml`, and Hugo's own Chroma output for those `sh` blocks is
equally plain — so plain shell in an answer matches the page around it.

An untagged fence is treated as YAML when its first non-empty line is `---` or
has a `key:` shape. `highlightAuto()` must never be called: with one grammar
registered it would force YAML onto shell text. To add a language, vendor its
grammar and register it — see the header of `markdown.js`.

## Build

Hugo Pipes (esbuild) bundles the modules from the partial:

```go-html-template
{{- $opts := dict "targetPath" "js/chatbot.bundle.js" "minify" hugo.IsProduction "target" "es2015" "format" "iife" -}}
{{- $js := resources.Get "js/chatbot/index.js" | js.Build $opts | fingerprint -}}
```

htm parses its templates with its own parser — no `new Function`, no runtime
eval — so the bundle runs under a `script-src` that forbids `'unsafe-eval'`.

## Backend

Queries go to `GET {AGENT_ENDPOINT}/query?q=…&product=…&sessionId=…&pages=…` and
stream back as SSE `token`, `done`, and `error` events. Feedback goes to
`POST /feedback` and `POST /feedback/comment`.

`product` selects the documentation corpus. This site sends `agentregistry` (the
open source corpus); the enterprise corpus is `solo-enterprise-for-agentregistry`.
An id must match the backend's own list, which
`GET https://assistant.docs.solo.io/products` returns — an unknown id does **not**
error: the backend falls back to its default product and answers from the wrong
corpus. The `PRODUCTS` comment in `index.js` carries the full checklist for
adding the second corpus; the in-widget selector appears on its own once there
are two.

## Differences from solo-io/docs

- **Eligible URLs.** `DOCS_PATH_RE` in `app.js` matches `/docs/…`. The
  agentgateway docs are versioned by path segment (`/latest/…`, `/2.3.x/…`), so
  there that regex matched a version. `getVersionPrefix()` returns a constant
  `/docs/` here for the same reason.
- **Tailwind.** solo-io/docs ships a generated utility sheet (`chatbot.tw.css`)
  because its theme's Tailwind bundle is precompiled. This site compiles
  Tailwind itself, and Tailwind v4's automatic source detection scans this
  directory, so all 225 utility classes the widget renders at runtime already
  land in `main.css` — no generated sheet and no `@source` line needed. They
  never appear in Hugo's emitted HTML or in `hugo_stats.json`, so if a future
  Tailwind or Hugo change narrows that detection, the widget loses its layout
  wholesale; `@source "../js/chatbot"` in `assets/css/main.css` is the fix, but
  note that Hugo's `css.TailwindCSS` did not honour that path when tried.
- **Where it renders.** The docs partial gates on the agentgateway product; this
  one gates on `.Section == "docs"`.

## Customization

Endpoint and corpus: the `AGENT_ENDPOINT` and `PRODUCTS` constants in `index.js`.

Animation timing and keyframes live in `assets/css/chatbot.css`:
`dialogSlideIn`, `spin` (avatar), `bounceSingle` (thinking dots), `blink` (code
cursor), and `codeLine` (code line reveal).
