/**
 * Markdown Configuration - Setup for marked + highlight.js + DOMPurify
 *
 * Everything is bundled from the vendored ESM copies in assets/js/vendor, so
 * nothing is pulled from a CDN at runtime — which also keeps the widget inside
 * a CSP that forbids 'unsafe-eval' and allows only a short script-src list.
 *
 * `DOMPurify` sanitizes the HTML that `marked` emits before it reaches the
 * `dangerouslySetInnerHTML` sink in the message list. Model responses are
 * untrusted input, and prod's CSP allows `script-src 'unsafe-inline'`, so an
 * unsanitized `<img onerror=...>` (or similar) in a response would otherwise
 * execute.
 *
 * ── Highlighting: YAML ONLY ─────────────────────────────────────────────────
 * This site registers exactly one highlight.js grammar, YAML, and every other
 * code block renders as plain escaped text.
 *
 * The reason is measured, not arbitrary. highlight.js colors keywords, strings,
 * variables, and comments; a command line contains none of those, so a `sh`
 * block such as `arctl apply -f agent.yaml` produces ZERO token spans however
 * it is highlighted. The docs corpus is ~228 `sh` fences, ~55 `console`, and
 * ~10 `yaml`, so shell is nearly all of it and none of it can gain color.
 * Hugo's own Chroma rendering of those same `sh` blocks is equally plain, so
 * plain shell in an answer matches the surrounding page.
 *
 * Consequences to keep in mind when editing this file:
 *   - NEVER call `hljs.highlightAuto()`. With one grammar registered it would
 *     force YAML onto shell text and color it wrongly.
 *   - To support another language, vendor its grammar from
 *     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/<lang>.min.js
 *     and register it below. The full 36-language build was dropped on purpose:
 *     it cost 120 KB and an extra request to color nothing.
 */

import { marked } from '../vendor/marked.esm.js';
import DOMPurify from '../vendor/purify.es.mjs';
import hljs from '../vendor/hljs-core.min.js';
import yamlGrammar from '../vendor/hljs-yaml.min.js';

hljs.registerLanguage('yaml', yamlGrammar);

// `yml` is an alias the grammar declares itself; list both for the lookup below.
const YAML_LANGS = new Set(['yaml', 'yml']);

let markedConfigured = false;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Does an untagged code block look like YAML?
 *
 * Answers are not always fenced with a language, and highlight.js' auto
 * detection is unavailable here (see the header). This checks the first
 * non-empty line only, and requires a `key:` or `key: value` shape or a `---`
 * document marker — deliberately tight, so a command line like
 * `docker run -e FOO=bar` is never mistaken for YAML.
 */
function looksLikeYaml(code) {
  const firstLine = String(code).split('\n').find((l) => l.trim().length > 0);
  if (!firstLine) return false;
  const line = firstLine.trim();
  if (line === '---') return true;
  return /^[A-Za-z_][A-Za-z0-9_.-]*:(\s|$)/.test(line);
}

/**
 * Highlight one fenced code block, or escape it when it is not YAML.
 * Returns { html, language }, where `language` is '' for a plain block.
 */
function renderCode(code, lang) {
  const requested = String(lang || '').trim().split(/\s+/)[0].toLowerCase();

  const isYaml = YAML_LANGS.has(requested) || (!requested && looksLikeYaml(code));
  if (isYaml) {
    try {
      return {
        html: hljs.highlight(code, { language: 'yaml' }).value,
        language: 'yaml',
      };
    } catch (err) {
      console.error('Highlight error:', err);
    }
  }

  return { html: escapeHtml(code), language: requested };
}

/**
 * Configure marked.
 *
 * NOTE: highlighting goes through a custom `code` RENDERER, not the `highlight`
 * option. marked removed that option in v5, so on the vendored v11.1.1 the
 * option is accepted and then silently ignored — solo-io/docs still passes it,
 * which is why in-chat code blocks render there as plain monospace text with
 * hljs theme stylesheets loaded for nothing.
 *
 * The emitted markup stays `<pre><code …>…</code></pre>` on one line, because
 * MarkdownRenderer.flush() matches exactly that shape when it injects the
 * per-block copy buttons (see ui.js).
 */
export function configureMarked() {
  if (!markedConfigured) {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    marked.use({
      renderer: {
        code(code, infostring) {
          // marked v11 hands the renderer an object in some call paths and
          // positional arguments in others; accept both.
          const isObj = typeof code === 'object' && code !== null;
          const text = String(isObj ? code.text : code);
          const lang = isObj ? code.lang : infostring;

          const { html, language } = renderCode(text, lang);
          const classes = ['hljs'];
          if (language) classes.push(`language-${language}`);
          return `<pre><code class="${escapeHtml(classes.join(' '))}">${html}</code></pre>\n`;
        },
      },
    });
    markedConfigured = true;
  }

  return marked;
}

/**
 * Parse markdown to HTML
 * @param {string} content - Markdown content
 * @returns {string} HTML string
 */
export function parseMarkdown(content) {
  const md = configureMarked();

  if (md && typeof md.parse === 'function') {
    return sanitize(md.parse(content));
  }

  // Fallback to plain text with basic escaping
  return escapeHtml(content).replace(/\n/g, '<br>');
}

/**
 * Sanitize marked's HTML output before it is injected as raw HTML.
 * Strips scripts, inline event handlers, and javascript: URLs while keeping
 * the safe subset markdown produces (links, code/pre, tables, hljs spans, …).
 * If DOMPurify is somehow unavailable, fall back to escaping the whole string
 * rather than trusting it.
 * @param {string} htmlOut - HTML from marked.parse
 * @returns {string} Sanitized HTML
 */
function sanitize(htmlOut) {
  if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
    return DOMPurify.sanitize(htmlOut);
  }
  return escapeHtml(htmlOut);
}
