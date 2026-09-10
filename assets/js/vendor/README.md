# Vendored JS libraries for the chatbot widget

These files are vendored (committed to the repo) so the chatbot has **zero
external CDN script dependencies**: no third-party origin is contacted when a
docs page loads, a `script-src 'self'` needs no CDN entry, and the framework
tests' console-error spec does not depend on network access. Every file here
goes through Hugo's `js.Build` bundle, which also sidesteps a CSP that forbids `'unsafe-eval'`, and
keeps the widget portable to other Hugo doc sites (copy this directory along
with `assets/js/chatbot/` and `layouts/_partials/chatbot.html`).

Upstream (`solo-io/docs`) vendors only the three markdown/sanitizer modules and
loads the full 36-language highlight.js build from cdnjs. Here it is the core
plus one grammar, bundled — ~22 KB against 120 KB and one fewer request.

| File | Library | Version | Source |
|------|---------|---------|--------|
| `preact-htm.module.js` | htm/preact standalone (preact core + hooks + htm's `html` tagged template, bundled, no external imports) | htm 3.1.1 (bundles preact 10.x) | https://unpkg.com/htm@3.1.1/preact/standalone.module.js |
| `marked.esm.js` | marked (markdown renderer), dependency-free ESM | 11.1.1 | https://unpkg.com/marked@11.1.1/lib/marked.esm.js |
| `purify.es.mjs` | DOMPurify (HTML sanitizer), dependency-free ESM. Sanitizes `marked` output before it is injected via `dangerouslySetInnerHTML`, since model responses are untrusted and prod's CSP allows `script-src 'unsafe-inline'`. | 3.4.11 | https://unpkg.com/dompurify@3.4.11/dist/purify.es.mjs |
| `hljs-core.min.js` | highlight.js core (ESM), no bundled grammars | 11.9.0 | https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/core.min.js |
| `hljs-yaml.min.js` | highlight.js YAML grammar (ESM). The ONLY grammar registered — see the header of `assets/js/chatbot/markdown.js` for why, and for how to add another. | 11.9.0 | https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/yaml.min.js |

Exports of `preact-htm.module.js`: `html, h, render, Component, createContext,
useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle,
useMemo, useCallback, useContext, useDebugValue, useErrorBoundary`.

## Updating

1. Re-download from unpkg with a new pinned version (same URLs, bump the version).
2. Verify the file is still self-contained (no `import ... from "bare-specifier"`)
   and valid ESM:

   ```sh
   node --input-type=module -e "console.log(Object.keys(await import('./assets/js/vendor/preact-htm.module.js')).join(','))"
   node --input-type=module -e "console.log(typeof (await import('./assets/js/vendor/marked.esm.js')).marked.parse)"
   node --input-type=module -e "console.log(typeof (await import('./assets/js/vendor/purify.es.mjs')).default)"
   ```

   (DOMPurify's `.sanitize` only materializes when a DOM/`window` is present, so
   in Node the default export is the `createDOMPurify` factory — `function`. In
   the browser it is a ready instance with `.sanitize`.)
3. Rebuild the site and re-test the chatbot.

Note: the highlight.js *script* is intentionally NOT vendored — it loads from
cdnjs.cloudflare.com, which prod's CSP `script-src` allowlists, and the widget
degrades gracefully if it's absent. Its theme *stylesheets* ARE vendored (in
`assets/css/vendor/hljs-github{,-dark}.min.css`) because prod's `style-src`
does not include cdnjs, so CDN-hosted CSS gets blocked.
