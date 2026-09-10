/**
 * Chatbot entry point.
 *
 * Reads the build-time page index + favicon from the mount node, then renders
 * the Preact <App/> into #chatbot-widget. Everything is bundled by Hugo's
 * `js.Build` (esbuild) and served from 'self' — no CDN scripts, no runtime
 * eval — so it stays CSP-safe (a `script-src` without 'unsafe-eval' still runs
 * it).
 *
 * Ported from the Solo Enterprise for agentgateway docs assistant
 * (solo-io/docs assets/js/chatbot).
 */

import { html, render } from '../vendor/preact-htm.module.js';
import { App } from './app.js';

const AGENT_ENDPOINT = 'https://assistant.docs.solo.io';

/**
 * Backend products (doc-workflow).
 *
 * Every query is sent to the doc-workflow backend tagged with a `product`, which
 * selects the documentation corpus to answer from. Each `id` MUST exactly match a
 * product key configured in the backend's `doc-workflow.config.yaml` (the live
 * list is served by `GET https://assistant.docs.solo.io/products`). An unknown id
 * does NOT error — the backend silently falls back to its default product (the
 * wrong corpus) — so keep these ids in sync with that file.
 *
 * This site is the open source agentregistry documentation, so there is one
 * product and the in-widget selector is hidden automatically
 * (see `SHOW_PRODUCT_SELECTOR`).
 *
 * WHEN A SECOND CORPUS IS ADDED — the enterprise distribution is already indexed
 * as its own backend product, `solo-enterprise-for-agentregistry`:
 *   1. Add an entry to PRODUCTS below — `{ id: '<exact backend product key>',
 *      label: '<short menu label>', description: '<one-line menu hint>' }`.
 *   2. That is all the UI needs: `SHOW_PRODUCT_SELECTOR` flips to true once PRODUCTS
 *      has more than one entry, and the dropdown in app.js renders one row per
 *      entry straight from this array — so the selector reappears with both
 *      options, no markup changes required.
 *   3. Revisit `DEFAULT_PRODUCT`, and consider having `detectProductFromPath()`
 *      (in app.js) pick the default from the URL instead of always returning
 *      DEFAULT_PRODUCT.
 * A persisted selection is only restored if it still matches a known product id
 * (see `readRestoredState` in app.js), so stale selections after a catalog change
 * self-heal.
 */
const PRODUCTS = [
  {
    id: 'agentregistry',
    label: 'Open source',
    description: 'agentregistry docs',
  },
  // Enterprise corpus — uncomment to offer both. The `id` below already matches
  // the backend product key:
  // {
  //   id: 'solo-enterprise-for-agentregistry',
  //   label: 'Enterprise',
  //   description: 'Solo Enterprise for agentregistry docs',
  // },
];
const DEFAULT_PRODUCT = 'agentregistry';
// The selector is shown only when there is more than one product to choose from.
const SHOW_PRODUCT_SELECTOR = PRODUCTS.length > 1;

/**
 * Load the page index embedded by Hugo at build time.
 * Returns an array of { title, url, section } objects.
 */
function loadPageIndex() {
  try {
    const el = document.getElementById('chatbot-page-index');
    if (el) return JSON.parse(el.textContent);
  } catch (e) {
    console.warn('Chatbot: could not load page index', e);
  }
  return [];
}

function mount() {
  const mountEl = document.getElementById('chatbot-widget');
  if (!mountEl) return;

  const favicon = mountEl.dataset.favicon || '';
  const pageIndex = loadPageIndex();

  render(
    html`<${App}
      agentEndpoint=${AGENT_ENDPOINT}
      products=${PRODUCTS}
      defaultProduct=${DEFAULT_PRODUCT}
      showProductSelector=${SHOW_PRODUCT_SELECTOR}
      pageIndex=${pageIndex}
      favicon=${favicon}
    />`,
    mountEl
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
