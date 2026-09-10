/**
 * Chatbot - Preact component for the agentregistry docs assistant.
 *
 * Ported from the Solo Enterprise for agentgateway docs assistant
 * (solo-io/docs assets/js/chatbot/app.js). htm parses its templates with its
 * own parser (no `new Function`, no in-browser eval), so the whole widget is
 * CSP-safe: it runs under a `script-src` that lacks 'unsafe-eval'. Everything
 * ships inside the single Hugo `js.Build` (esbuild) bundle served from 'self'.
 *
 * State is persisted to sessionStorage so conversations survive full-page
 * navigations in this Hugo static site.
 */

import { html, Component } from '../vendor/preact-htm.module.js';
import { ChatStreamer, ErrorType } from './stream.js';
import { ThinkingAnimator, MarkdownRenderer } from './ui.js';
import { parseMarkdown } from './markdown.js';

const STORAGE_KEY = 'chatbot-state';
const INPUT_STORAGE_KEY = 'chatbot-input';
const MAX_CONTEXT_PAGES = 3;
const INPUT_SAVE_DEBOUNCE_MS = 300;
const HISTORY_LIMIT_NOTE_AT = 3;   // show history-limit note after this many user messages
const NEW_CHAT_TOOLTIP_AT = 10;    // show new-chat note after this many user messages

/**
 * A URL is only eligible as a context page if it is same-origin AND sits under
 * the docs tree. This site is flat and unversioned — every docs page lives at
 * `/docs/<section>/<page>/` — so there is no version segment to match, unlike
 * the versioned agentgateway docs this widget came from. The marketing pages
 * outside /docs/ are not in the corpus, so they are not eligible.
 */
const DOCS_PATH_RE = /^\/docs(\/|$)/;

// Delegated code-block copy button icons (buttons are injected into rendered
// markdown by the MarkdownRenderer, so they live outside Preact's control).
const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // ── Visible state ────────────────────────────────────────
      isOpen: false,
      isExpanded: false,
      isProcessing: false,
      userInput: '',
      messages: [],
      // Holds the active doc-workflow product id (see PRODUCTS in index.js),
      // sent as `product` on every query. Named `selectedModel` historically.
      selectedModel: props.defaultProduct,
      contextPages: [],

      // ── Internal / UI state ──────────────────────────────────
      showThinking: false,
      sessionId: '',
      showContextMenu: false,
      showModelMenu: false,
      historyLimitNoteShown: false,
      historyLimitNoteIndex: -1,
      showNewConvBanner: false,

      // Feedback
      showFeedbackModal: false,
      feedbackModalIndex: -1,
      feedbackComment: '',
      copiedMessageIndex: -1,

      // @ Mention
      showMentionMenu: false,
      mentionFilter: '',
      mentionSelectedIndex: 0,
      mentionStartPos: -1,
      filteredMentionPages: [],
    };

    // Non-reactive helpers
    this.pageIndex = props.pageIndex || [];
    this.streamer = new ChatStreamer(props.agentEndpoint);
    this.thinkingAnimator = new ThinkingAnimator();
    this.markdownRenderer = new MarkdownRenderer(parseMarkdown);
    this.currentEventSource = null;
    this._saveInputTimer = null;
    this._pendingStreamTokens = '';
    this._streamRenderScheduled = false;
    this._streamRenderRafId = null;
    this._streamRenderTimer = null;

    // Element refs (set via callback refs)
    this.inputEl = null;
    this.messagesContainerEl = null;
    this.spacerEl = null;
    this.mentionListEl = null;
    this.thinkingDotsEl = null;
    this.feedbackInputEl = null;
    this.contextWrapEl = null;
    this.modelWrapEl = null;
  }

  // ─── Lifecycle ─────────────────────────────────────────────

  componentDidMount() {
    // Clear persisted state on hard refresh (F5 / Ctrl+R / refresh button)
    const navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry && navEntry.type === 'reload') {
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }

    // Restore persisted conversation + textarea content into one setState.
    const restored = this.readRestoredState();
    const savedInput = this.readSavedInput();
    const patch = { ...restored };
    if (savedInput) patch.userInput = savedInput;

    // First visit (no restored session): pick product from the URL.
    if (!restored.sessionId) {
      patch.selectedModel = this.detectProductFromPath();
    }

    this.setState(patch, () => {
      if (this.state.userInput) this.autoResizeInput();
      if (this.state.isOpen) {
        if (!this.state.sessionId) {
          this.setState({ sessionId: this.generateSessionId() });
        }
        requestAnimationFrame(() => {
          this.autoResizeInput();
          if (this.inputEl) this.inputEl.focus();
        });
      }
    });

    window.addEventListener('keydown', this.onWindowKeydown);
    window.addEventListener('beforeunload', this.onBeforeUnload);
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onWindowKeydown);
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    document.removeEventListener('click', this.onDocumentClick);
  }

  onWindowKeydown = (e) => {
    if (e.key === 'Escape') this.close();
  };

  onBeforeUnload = () => {
    this.flushInputSave();
    this.finalizeAndSave();
  };

  // Close context / product menus when clicking outside their wrappers.
  onDocumentClick = (e) => {
    if (this.state.showContextMenu && this.contextWrapEl && !this.contextWrapEl.contains(e.target)) {
      this.setState({ showContextMenu: false });
    }
    if (this.state.showModelMenu && this.modelWrapEl && !this.modelWrapEl.contains(e.target)) {
      this.setState({ showModelMenu: false });
    }
  };

  // Delegated handler for code-block copy buttons injected by the renderer.
  handleRootClick = (e) => {
    const btn = e.target.closest && e.target.closest('.chatbot-code-copy');
    if (!btn) return;
    const code = decodeURIComponent(btn.dataset.code || '');
    navigator.clipboard.writeText(code).then(() => {
      btn.innerHTML = CHECK_ICON;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = COPY_ICON;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {});
  };

  // ─── Persistence ───────────────────────────────────────────

  /**
   * Save conversation state to sessionStorage.
   * Only finalized messages are persisted (no streaming / loading flags).
   */
  saveState() {
    try {
      const s = this.state;
      const state = {
        isOpen: s.isOpen,
        sessionId: s.sessionId,
        selectedModel: s.selectedModel,
        contextPages: s.contextPages,
        messages: s.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          markdown: msg.markdown || '',
          isError: msg.isError || false,
          isRateLimited: msg.isRateLimited || false,
          contextPages: msg.contextPages || [],
          feedback: msg.feedback || null
        }))
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Chatbot: could not save state', e);
    }
  }

  /**
   * Read persisted conversation state from sessionStorage into a state patch.
   * Called once during mount.
   */
  readRestoredState() {
    const patch = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return patch;

      const state = JSON.parse(raw);

      if (state.sessionId) patch.sessionId = state.sessionId;
      // Only honour a persisted selection that still maps to a known product;
      // otherwise keep the default. Guards against stale ids cached from an
      // earlier catalog (e.g. the legacy 'standalone'/'kubernetes' values).
      if (state.selectedModel && this.props.products.some((p) => p.id === state.selectedModel)) {
        patch.selectedModel = state.selectedModel;
      }

      if (Array.isArray(state.contextPages)) {
        patch.contextPages = state.contextPages;
      }

      if (Array.isArray(state.messages) && state.messages.length > 0) {
        patch.messages = state.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          markdown: msg.markdown || '',
          isError: msg.isError || false,
          isRateLimited: msg.isRateLimited || false,
          isStreaming: false,
          isLoading: false,
          showAvatar: msg.role === 'assistant',
          contextPages: msg.contextPages || [],
          feedback: msg.feedback || null
        }));
        patch.isExpanded = true;
      }

      if (state.isOpen) patch.isOpen = true;
    } catch (e) {
      console.warn('Chatbot: could not restore state', e);
    }
    return patch;
  }

  /**
   * Debounced save of textarea input to localStorage.
   * Removes the key when the input is empty.
   */
  debouncedSaveInput() {
    clearTimeout(this._saveInputTimer);
    this._saveInputTimer = setTimeout(() => {
      try {
        if (this.state.userInput) {
          localStorage.setItem(INPUT_STORAGE_KEY, this.state.userInput);
        } else {
          localStorage.removeItem(INPUT_STORAGE_KEY);
        }
      } catch (e) {
        console.warn('Chatbot: could not save input state', e);
      }
    }, INPUT_SAVE_DEBOUNCE_MS);
  }

  /**
   * Immediately flush any pending debounced input save.
   * Called on beforeunload to avoid losing data.
   */
  flushInputSave() {
    clearTimeout(this._saveInputTimer);
    try {
      if (this.state.userInput) {
        localStorage.setItem(INPUT_STORAGE_KEY, this.state.userInput);
      } else {
        localStorage.removeItem(INPUT_STORAGE_KEY);
      }
    } catch (_) { /* ignore during unload */ }
  }

  /**
   * Read textarea input from localStorage. Called once during mount.
   */
  readSavedInput() {
    try {
      return localStorage.getItem(INPUT_STORAGE_KEY) || '';
    } catch (e) {
      console.warn('Chatbot: could not restore input state', e);
      return '';
    }
  }

  /** Clear saved textarea input and cancel any pending save. */
  clearSavedInput() {
    clearTimeout(this._saveInputTimer);
    try {
      localStorage.removeItem(INPUT_STORAGE_KEY);
    } catch (_) { /* ignore */ }
  }

  /**
   * Finalize any in-flight streaming message and save.
   * Called on beforeunload to capture partial responses.
   */
  finalizeAndSave() {
    if (this.currentEventSource) {
      this.currentEventSource.close();
      this.currentEventSource = null;
    }
    this.clearStreamRenderScheduler();
    const messages = this.state.messages;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.isStreaming) {
      try {
        this.flushPendingStreamTokensSync();
        const htmlOut = this.markdownRenderer.flush();
        if (htmlOut) lastMsg.content = htmlOut;
        lastMsg.markdown = this.markdownRenderer.getContent();
      } catch (_) { /* ignore flush errors during unload */ }
      lastMsg.isStreaming = false;
      lastMsg.isLoading = false;
    }
    this.setState({ isProcessing: false });
    this.saveState();
  }

  // ─── Open / Close / Reset ──────────────────────────────────

  toggle() {
    this.setIsOpen(!this.state.isOpen);
  }

  open() {
    this.setIsOpen(true);
  }

  close() {
    if (this.state.showFeedbackModal) {
      this.closeFeedbackModal();
      return;
    }
    this.setIsOpen(false);
  }

  /** Central handler for isOpen transitions (was the Alpine $watch('isOpen')). */
  setIsOpen(open) {
    if (open) {
      const patch = { isOpen: true };
      if (!this.state.sessionId) patch.sessionId = this.generateSessionId();
      this.setState(patch, () => {
        requestAnimationFrame(() => {
          this.autoResizeInput();
          if (this.inputEl) this.inputEl.focus();
        });
        this.saveState();
      });
    } else {
      this.stopActiveStream();
      this.setState({
        isOpen: false,
        showContextMenu: false,
        showModelMenu: false,
        showMentionMenu: false,
        mentionFilter: '',
        mentionSelectedIndex: 0,
        mentionStartPos: -1,
        filteredMentionPages: [],
      }, () => this.saveState());
    }
  }

  /**
   * Start a new conversation: clears messages, context, input,
   * and generates a fresh session ID.
   */
  newChat() {
    this.stopActiveStream();
    this.thinkingAnimator.stop();
    this.markdownRenderer.reset();
    this.setState({
      messages: [],
      isExpanded: false,
      isProcessing: false,
      showThinking: false,
      contextPages: [],
      showContextMenu: false,
      showModelMenu: false,
      showFeedbackModal: false,
      feedbackModalIndex: -1,
      feedbackComment: '',
      showMentionMenu: false,
      mentionFilter: '',
      mentionSelectedIndex: 0,
      mentionStartPos: -1,
      filteredMentionPages: [],
      historyLimitNoteShown: false,
      historyLimitNoteIndex: -1,
      showNewConvBanner: false,
      sessionId: this.generateSessionId(),
    }, () => {
      this.saveState();
      requestAnimationFrame(() => {
        this.autoResizeInput();
        if (this.inputEl) this.inputEl.focus();
        if (this.spacerEl) this.spacerEl.style.minHeight = '0';
      });
    });
  }

  /**
   * Export the current conversation as a Markdown file download.
   */
  exportChat() {
    const messages = this.state.messages;
    if (messages.length === 0) return;

    const lines = [
      '# agentregistry Assistant Conversation',
      '',
      `**Date:** ${new Date().toLocaleString()}`,
      `**Model:** ${this.getModelLabel()}`,
      '',
      '---',
      ''
    ];

    for (const msg of messages) {
      if (msg.role === 'user') {
        lines.push('## User', '', msg.content, '');
      } else if (msg.role === 'assistant') {
        lines.push('## Assistant', '');
        if (msg.isError) {
          lines.push(`> **Error:** ${msg.content}`);
        } else if (msg.markdown) {
          lines.push(msg.markdown);
        } else {
          const tmp = document.createElement('div');
          tmp.innerHTML = msg.content;
          lines.push(tmp.innerText);
        }
        lines.push('');
      }
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Stop any active streaming connection without clearing messages.
   */
  stopActiveStream() {
    if (this.currentEventSource) {
      this.currentEventSource.close();
      this.currentEventSource = null;
    }
    this.clearStreamRenderScheduler();
    const messages = this.state.messages;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.isStreaming) {
      lastMsg.isStreaming = false;
      lastMsg.isLoading = false;
    }
    this.thinkingAnimator.stop();
    this.setState({ isProcessing: false, showThinking: false, messages });
  }

  // ─── URL Validation ────────────────────────────────────────

  /**
   * Check whether a URL is eligible as a context page.
   * Must be same-origin AND under a recognised docs version path.
   */
  isValidDocsUrl(url) {
    try {
      const parsed = new URL(url, window.location.origin);
      if (parsed.hostname !== window.location.hostname) return false;
      return DOCS_PATH_RE.test(parsed.pathname);
    } catch (_) {
      return false;
    }
  }

  // ─── Page Context ──────────────────────────────────────────

  /**
   * Look up a human-readable title for a URL from the page index.
   * Falls back to a breadcrumb derived from the last path segments.
   */
  getTitleForUrl(url) {
    try {
      const pathname = new URL(url, window.location.origin).pathname.replace(/\/$/, '');
      const page = this.pageIndex.find(
        (p) => p.url.replace(/\/$/, '') === pathname
      );
      if (page) return page.title;
    } catch (_) { /* fall through to breadcrumb */ }

    try {
      const segments = new URL(url, window.location.origin)
        .pathname.replace(/\/$/, '')
        .split('/')
        .filter(Boolean);
      return segments.length === 0 ? 'Home page' : segments.slice(-2).join(' / ');
    } catch (_) {
      return 'Page';
    }
  }

  /**
   * Normalise a URL to a canonical form for deduplication:
   * absolute URL with trailing slash, no query or hash.
   */
  normaliseUrl(url) {
    const parsed = new URL(
      url.startsWith('http')
        ? url
        : window.location.origin + (url.startsWith('/') ? '' : '/') + url
    );
    let pathname = parsed.pathname;
    if (!pathname.endsWith('/')) pathname += '/';
    return parsed.origin + pathname;
  }

  /**
   * Add the current page to contextPages.
   * Silently no-ops if the page is invalid or a duplicate.
   * Pages beyond MAX_CONTEXT_PAGES are kept in the UI (shown as
   * overflow pills) but are NOT sent in the API request.
   */
  addCurrentPage() {
    const url = window.location.href;
    if (!this.isValidDocsUrl(url)) return;
    const normalised = this.normaliseUrl(url);
    if (this.state.contextPages.some((p) => p.url === normalised)) return;
    const contextPages = [...this.state.contextPages, { title: this.getTitleForUrl(normalised), url: normalised }];
    this.setState({ contextPages }, () => this.saveState());
  }

  /**
   * Add a page from the page index (via @ mention) to contextPages.
   */
  addContextPage(page) {
    const fullUrl = page.url.startsWith('http')
      ? page.url
      : window.location.origin + page.url;
    if (this.state.contextPages.some((p) => p.url === fullUrl)) return;
    const contextPages = [...this.state.contextPages, { title: page.title, url: fullUrl }];
    this.setState({ contextPages }, () => this.saveState());
  }

  /**
   * Remove a context page by index.
   */
  removeContextPage(index) {
    const contextPages = this.state.contextPages.slice();
    contextPages.splice(index, 1);
    this.setState({ contextPages }, () => this.saveState());
  }

  // ─── Paste & Drop ──────────────────────────────────────────

  /**
   * Handle pasted content – if it's a plain URL paste, add as a pill.
   */
  handlePaste(event) {
    const text = (event.clipboardData && event.clipboardData.getData('text')) || '';
    const urls = this.extractUrls(text);
    if (urls.length > 0 && text.trim() === urls[0]) {
      event.preventDefault();
      urls.forEach((url) => this.addPastedUrl(url));
    }
  }

  /**
   * Handle dropped content – extract URLs and add as pills.
   */
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const text = (event.dataTransfer && event.dataTransfer.getData('text')) || '';
    const htmlData = (event.dataTransfer && event.dataTransfer.getData('text/html')) || '';

    // Try HTML first (drag from browser)
    const urlFromHtml = this.extractUrlFromHtml(htmlData);
    if (urlFromHtml) { this.addPastedUrl(urlFromHtml); return; }

    // Plain-text URLs
    const urls = this.extractUrls(text);
    if (urls.length > 0) { urls.forEach((u) => this.addPastedUrl(u)); return; }

    // Fallback: insert text at cursor
    const pos = (this.inputEl && this.inputEl.selectionStart) || this.state.userInput.length;
    const userInput = this.state.userInput.substring(0, pos) + text + this.state.userInput.substring(pos);
    this.setState({ userInput }, () => {
      this.autoResizeInput();
      this.debouncedSaveInput();
    });
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Extract valid docs URLs from plain text.
   */
  extractUrls(text) {
    const urlRe = /(https?:\/\/[^\s]+|\/docs\/[^\s]+)/gi;
    return (text.match(urlRe) || [])
      .map((u) => u.replace(/[,;.!?)]*$/, ''))
      .filter((u) => u.length > 0 && this.isValidDocsUrl(u));
  }

  /**
   * Extract a valid docs URL from an HTML href attribute.
   */
  extractUrlFromHtml(htmlStr) {
    try {
      const m = htmlStr.match(/href=["']([^"']+)["']/);
      if (m && this.isValidDocsUrl(m[1])) return m[1];
    } catch (_) { /* ignore */ }
    return null;
  }

  /**
   * Add a URL (from paste/drop) as a context page pill.
   */
  addPastedUrl(url) {
    if (!this.isValidDocsUrl(url)) return;
    try {
      const fullUrl = this.normaliseUrl(url);
      if (this.state.contextPages.some((p) => p.url === fullUrl)) return;
      const contextPages = [...this.state.contextPages, { title: this.getTitleForUrl(fullUrl), url: fullUrl }];
      this.setState({ contextPages }, () => this.saveState());
    } catch (_) { /* invalid URL */ }
  }

  // ─── @ Mention System ──────────────────────────────────────

  /**
   * Check the textarea for an active @ mention trigger.
   * Updates `filteredMentionPages` so the render can bind to a stable
   * array instead of calling a filter function on every render.
   */
  checkForMention() {
    const input = this.inputEl;
    if (!input) return;

    const cursorPos = input.selectionStart;
    const text = this.state.userInput;

    // Walk backward from cursor to find '@'
    let atPos = -1;
    for (let i = cursorPos - 1; i >= 0; i--) {
      if (text[i] === '@') { atPos = i; break; }
      if (text[i] === '\n') break;
    }

    if (atPos >= 0) {
      const charBefore = atPos > 0 ? text[atPos - 1] : ' ';
      if (atPos === 0 || /\s/.test(charBefore)) {
        const filter = text.substring(atPos + 1, cursorPos);
        this.setState({
          mentionStartPos: atPos,
          mentionFilter: filter,
          mentionSelectedIndex: 0,
          filteredMentionPages: this.computeFilteredPages(filter),
          showMentionMenu: true,
        });
        return;
      }
    }

    this.closeMentionMenu();
  }

  /**
   * The path prefix that the mention popup's page list is scoped to.
   *
   * On the versioned agentgateway docs this returned the current version
   * segment, so a mention could only pull in pages from the version being
   * read. This site has no versions, so the whole docs tree is one scope and
   * the prefix is constant. The page index the partial emits is already
   * limited to /docs/, so this is belt-and-braces.
   */
  getVersionPrefix() {
    return '/docs/';
  }

  /**
   * Compute filtered page results for the mention popup.
   *
   * The current page is treated specially:
   *  - It is marked with `_isCurrentPage: true` and hoisted to the
   *    top of the list so users can quickly add the page they are on.
   *  - It is matched by its real title/section/url AND by the alias
   *    "current page", so typing "@current" will surface it.
   *  - There is always only ONE entry per page (no duplicates).
   *  - If the current page is already in contextPages it is omitted.
   */
  computeFilteredPages(filter = '') {
    const versionPrefix = this.getVersionPrefix();
    const scoped = versionPrefix
      ? this.pageIndex.filter((p) => p.url.startsWith(versionPrefix))
      : this.pageIndex;

    // Identify the current page's pathname for matching
    let currentPathname = null;
    const currentUrl = window.location.href;
    if (this.isValidDocsUrl(currentUrl)) {
      const normalised = this.normaliseUrl(currentUrl);
      // Only treat as current page if not already added
      if (!this.state.contextPages.some((p) => p.url === normalised)) {
        currentPathname = new URL(normalised).pathname;
      }
    }

    const terms = filter.toLowerCase().trim();
    const termList = terms ? terms.split(/\s+/) : [];

    // Helper: does a page match the filter terms?
    const matchesFilter = (haystack) =>
      termList.length === 0 || termList.every((t) => haystack.includes(t));

    let currentPageResult = null;
    const otherResults = [];

    for (const page of scoped) {
      const pagePath = page.url.replace(/\/$/, '');
      const isCurrentPage =
        currentPathname && pagePath === currentPathname.replace(/\/$/, '');

      const haystack = `${page.title} ${page.section} ${page.url}`.toLowerCase();
      // Current page also matches the alias "current page"
      const fullHaystack = isCurrentPage
        ? `current page ${haystack}`
        : haystack;

      if (!matchesFilter(fullHaystack)) continue;

      if (isCurrentPage && !currentPageResult) {
        currentPageResult = { ...page, _isCurrentPage: true };
      } else {
        otherResults.push(page);
        if (otherResults.length >= 8) break;
      }
    }

    // Hoist the current page to the top
    if (currentPageResult) {
      return [currentPageResult, ...otherResults.slice(0, 7)];
    }
    return otherResults.slice(0, 8);
  }

  /**
   * Select a page from the mention popup: remove the @filter text
   * from the textarea and add the page to contextPages.
   */
  selectMention(page) {
    const cursorPos = (this.inputEl && this.inputEl.selectionStart) || this.state.userInput.length;
    const before = this.state.userInput.substring(0, this.state.mentionStartPos);
    const after = this.state.userInput.substring(cursorPos);
    const userInput = before + after;

    this.setState({ userInput }, () => {
      if (page._isCurrentPage) {
        this.addCurrentPage();
      } else {
        this.addContextPage(page);
      }
      this.closeMentionMenu();
      this.debouncedSaveInput();
      requestAnimationFrame(() => { if (this.inputEl) this.inputEl.focus(); });
    });
  }

  closeMentionMenu() {
    this.setState({
      showMentionMenu: false,
      mentionFilter: '',
      mentionSelectedIndex: 0,
      mentionStartPos: -1,
      filteredMentionPages: [],
    });
  }

  /**
   * Insert '@' at the cursor and trigger the mention popup.
   * Called from the context dropdown "Mention a page" button.
   */
  insertMention() {
    const input = this.inputEl;
    if (!input) return;

    const cursorPos = input.selectionStart;
    const before = this.state.userInput.substring(0, cursorPos);
    const after = this.state.userInput.substring(cursorPos);
    const prefix = before.length > 0 && !/\s$/.test(before) ? ' ' : '';
    const userInput = before + prefix + '@' + after;

    this.setState({ userInput }, () => {
      const newPos = cursorPos + prefix.length + 1;
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(newPos, newPos);
        this.checkForMention();
      });
      this.debouncedSaveInput();
    });
  }

  // ─── Product ───────────────────────────────────────────────

  getModelLabel() {
    const p = this.props.products.find((x) => x.id === this.state.selectedModel);
    return p ? p.label : this.state.selectedModel;
  }

  // Choose the default product for a fresh session. There is only one product
  // today, so this always returns the default. When a second product is added,
  // branch on the URL here (e.g. a `/standalone/` path segment).
  detectProductFromPath() {
    return this.props.defaultProduct;
  }

  // ─── Input ─────────────────────────────────────────────────

  handleInput(e) {
    const userInput = e.target.value;
    this.setState({ userInput }, () => {
      this.autoResizeInput();
      this.checkForMention();
      this.debouncedSaveInput();
    });
  }

  /**
   * Auto-resize the textarea to fit its content.
   * Operates directly on the DOM element to avoid a reactive cycle.
   */
  autoResizeInput() {
    const el = this.inputEl;
    if (!el) return;
    const min = 68;
    const max = 150;
    el.style.height = '0px';
    el.style.height = Math.max(min, Math.min(el.scrollHeight, max)) + 'px';
  }

  scrollMentionIntoView() {
    requestAnimationFrame(() => {
      const list = this.mentionListEl;
      if (!list) return;
      const items = list.querySelectorAll('.chatbot-mention-item');
      const active = items[this.state.mentionSelectedIndex];
      if (active) active.scrollIntoView({ block: 'nearest' });
    });
  }

  handleKeydown(event) {
    // ── Mention popup keyboard navigation ──────────────────
    if (this.state.showMentionMenu) {
      const filtered = this.state.filteredMentionPages;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.setState({ mentionSelectedIndex: Math.min(this.state.mentionSelectedIndex + 1, filtered.length - 1) }, () => this.scrollMentionIntoView());
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.setState({ mentionSelectedIndex: Math.max(this.state.mentionSelectedIndex - 1, 0) }, () => this.scrollMentionIntoView());
        return;
      }
      if ((event.key === 'Enter' || event.key === 'Tab') && filtered.length > 0) {
        event.preventDefault();
        this.selectMention(filtered[this.state.mentionSelectedIndex]);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeMentionMenu();
        return;
      }
    }

    // ── Send on Enter ──────────────────────────────────────
    if (event.key === 'Enter' && !event.shiftKey && !this.state.isProcessing) {
      event.preventDefault();
      this.sendQuery();
    }
  }

  // ─── Query ─────────────────────────────────────────────────

  clearStreamRenderScheduler() {
    if (this._streamRenderRafId !== null) {
      window.cancelAnimationFrame(this._streamRenderRafId);
      this._streamRenderRafId = null;
    }
    if (this._streamRenderTimer !== null) {
      clearTimeout(this._streamRenderTimer);
      this._streamRenderTimer = null;
    }
    this._streamRenderScheduled = false;
  }

  scheduleStreamRender() {
    if (this._streamRenderScheduled) return;
    this._streamRenderScheduled = true;

    const run = () => {
      this._streamRenderScheduled = false;
      this._streamRenderRafId = null;
      this._streamRenderTimer = null;
      this.flushPendingStreamTokens();
    };

    if (typeof window.requestAnimationFrame === 'function') {
      this._streamRenderRafId = window.requestAnimationFrame(run);
    } else {
      this._streamRenderTimer = setTimeout(run, 16);
    }
  }

  // Apply pending tokens to the last streaming message and re-render.
  flushPendingStreamTokens() {
    const changed = this.flushPendingStreamTokensSync();
    if (changed) this.setState({ messages: this.state.messages });
  }

  // Core token flush that mutates the last message in place.
  // Returns true if anything changed (caller triggers the re-render).
  flushPendingStreamTokensSync() {
    if (!this._pendingStreamTokens) return false;

    const messages = this.state.messages;
    const idx = messages.length - 1;
    const msg = messages[idx];
    if (!msg || msg.role !== 'assistant' || !msg.isStreaming) {
      this._pendingStreamTokens = '';
      return false;
    }

    this.markdownRenderer.addToken(this._pendingStreamTokens);
    this._pendingStreamTokens = '';

    const htmlOut = this.markdownRenderer.render();
    msg.content = htmlOut;

    if (this.markdownRenderer.getContent().length > 0 && this.state.showThinking) {
      this.thinkingAnimator.stop();
      msg.isLoading = false;
      // showThinking flip happens via setState in flushPendingStreamTokens
      this.state.showThinking = false;
    }
    return true;
  }

  async sendQuery() {
    const query = this.state.userInput.trim();
    if (!query || this.state.isProcessing) return;

    let sessionId = this.state.sessionId;
    if (!sessionId) {
      sessionId = this.generateSessionId();
    }

    // Snapshot context pages (only first MAX_CONTEXT_PAGES are sent)
    const capturedContextPages = this.state.contextPages.map((p) => ({ ...p }));
    const pages = capturedContextPages
      .slice(0, MAX_CONTEXT_PAGES)
      .map((p) => p.url)
      .join(',');

    // Push user message
    const messages = [...this.state.messages, {
      role: 'user',
      content: query,
      contextPages: capturedContextPages
    }];

    const isExpanded = this.state.isExpanded || messages.length === 1;

    const userMsgCount = messages.filter((m) => m.role === 'user').length;
    let historyLimitNoteShown = this.state.historyLimitNoteShown;
    let historyLimitNoteIndex = this.state.historyLimitNoteIndex;
    let showNewConvBanner = this.state.showNewConvBanner;
    if (userMsgCount === HISTORY_LIMIT_NOTE_AT) {
      historyLimitNoteShown = true;
      historyLimitNoteIndex = messages.length - 1;
    }
    if (userMsgCount === NEW_CHAT_TOOLTIP_AT) {
      showNewConvBanner = true;
    }

    // Streaming assistant message placeholder
    messages.push({
      role: 'assistant',
      content: '',
      isStreaming: true,
      showAvatar: true,
      isLoading: true,
      isError: false,
      feedback: null
    });

    this.markdownRenderer.reset();
    this.clearStreamRenderScheduler();
    this._pendingStreamTokens = '';
    this.clearSavedInput();

    this.setState({
      isProcessing: true,
      sessionId,
      messages,
      isExpanded,
      historyLimitNoteShown,
      historyLimitNoteIndex,
      showNewConvBanner,
      userInput: '',
      contextPages: [],
      showThinking: true,
      showMentionMenu: false,
      mentionFilter: '',
      mentionSelectedIndex: 0,
      mentionStartPos: -1,
      filteredMentionPages: [],
    }, () => {
      this.saveState();
      // Thinking dots animator starts via its ref callback on mount.
      this.scrollUserMessageToTop();
    });

    try {
      this.currentEventSource = await this.streamer.stream(query, {
        sessionId,
        product: this.state.selectedModel,
        pages,

        onToken: (token) => {
          this._pendingStreamTokens += token;
          this.scheduleStreamRender();
        },

        onDone: () => {
          this.clearStreamRenderScheduler();
          this.flushPendingStreamTokensSync();
          const htmlOut = this.markdownRenderer.flush();
          const messages2 = this.state.messages;
          const idx = messages2.length - 1;
          const msg = messages2[idx];
          if (msg && msg.role === 'assistant') {
            msg.content = htmlOut;
            msg.markdown = this.markdownRenderer.getContent();
            msg.isStreaming = false;
            msg.isLoading = false;
          }
          this.thinkingAnimator.stop();
          this.setState({
            messages: messages2,
            showThinking: false,
            isProcessing: false,
          }, () => this.saveState());
          this.currentEventSource = null;
          requestAnimationFrame(() => {
            if (this.inputEl) this.inputEl.focus();
            if (this.spacerEl) this.spacerEl.style.minHeight = '0';
          });
        },

        onError: (errorMessage, errorType) => {
          console.error('Stream error:', errorMessage, errorType);
          this.clearStreamRenderScheduler();
          this._pendingStreamTokens = '';
          this.thinkingAnimator.stop();
          const messages2 = this.state.messages;
          const idx = messages2.length - 1;
          messages2[idx].content = errorMessage;
          messages2[idx].isError = true;
          messages2[idx].isRateLimited = errorType === ErrorType.RATE_LIMITED;
          messages2[idx].isStreaming = false;
          messages2[idx].isLoading = false;
          this.setState({
            messages: messages2,
            showThinking: false,
            isProcessing: false,
          }, () => this.saveState());
          this.currentEventSource = null;
          requestAnimationFrame(() => {
            if (this.spacerEl) this.spacerEl.style.minHeight = '0';
          });
        }
      });
    } catch (error) {
      console.error('Chat error:', error);
      this.clearStreamRenderScheduler();
      this._pendingStreamTokens = '';
      this.thinkingAnimator.stop();
      const messages2 = this.state.messages;
      const idx = messages2.length - 1;
      messages2[idx].content = `Error: ${error.message}`;
      messages2[idx].isError = true;
      messages2[idx].isStreaming = false;
      messages2[idx].isLoading = false;
      this.setState({
        messages: messages2,
        showThinking: false,
        isProcessing: false,
      }, () => this.saveState());
      this.currentEventSource = null;
      requestAnimationFrame(() => {
        if (this.spacerEl) this.spacerEl.style.minHeight = '0';
      });
    }
  }

  // ─── Feedback ──────────────────────────────────────────────

  /**
   * Submit a thumb-up or thumb-down for an assistant message.
   * The vote is sent to the backend immediately (fire-and-forget).
   * For thumb-down, a comment modal is shown afterwards; the vote
   * has already been recorded even if the user dismisses the modal.
   */
  async submitFeedback(index, type) {
    const messages = this.state.messages;
    const msg = messages[index];
    if (!msg || msg.role !== 'assistant' || msg.feedback) return;

    // Record feedback in UI immediately
    msg.feedback = type;
    this.setState({ messages }, () => this.saveState());

    // Find the user query that prompted this response
    const userMsg = index > 0 ? messages[index - 1] : null;
    const query = userMsg && userMsg.role === 'user' ? userMsg.content : '';

    // Send vote to backend (fire-and-forget)
    try {
      await fetch(`${this.props.agentEndpoint}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.state.sessionId,
          messageIndex: index,
          type,
          query,
          response: msg.markdown || msg.content
        })
      });
    } catch (e) {
      console.warn('Chatbot: could not submit feedback', e);
    }

    // Show comment modal for thumb-down
    if (type === 'down') {
      this.setState({
        feedbackModalIndex: index,
        feedbackComment: '',
        showFeedbackModal: true,
      }, () => {
        requestAnimationFrame(() => { if (this.feedbackInputEl) this.feedbackInputEl.focus(); });
      });
    }
  }

  /**
   * Submit the optional comment from the thumb-down modal.
   * Only sends if the user typed something.
   */
  async submitFeedbackComment() {
    const comment = this.state.feedbackComment.trim();
    const index = this.state.feedbackModalIndex;
    this.closeFeedbackModal();

    if (!comment) return;

    try {
      await fetch(`${this.props.agentEndpoint}/feedback/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.state.sessionId,
          messageIndex: index,
          comment
        })
      });
    } catch (e) {
      console.warn('Chatbot: could not submit feedback comment', e);
    }
  }

  /**
   * Close the feedback comment modal without sending anything extra.
   * The thumb-down vote was already sent when the button was clicked.
   */
  closeFeedbackModal() {
    this.setState({
      showFeedbackModal: false,
      feedbackModalIndex: -1,
      feedbackComment: '',
    });
  }

  // ─── Utilities ─────────────────────────────────────────────

  async copyMessage(index) {
    const msg = this.state.messages[index];
    if (!msg) return;
    let text = msg.markdown;
    if (!text) {
      const tmp = document.createElement('div');
      tmp.innerHTML = msg.content;
      text = tmp.innerText;
    }
    try {
      await navigator.clipboard.writeText(text);
      this.setState({ copiedMessageIndex: index });
      setTimeout(() => { this.setState({ copiedMessageIndex: -1 }); }, 2000);
    } catch (_) {}
  }

  generateSessionId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  scrollUserMessageToTop() {
    // Wait for the browser to complete layout after the DOM update before
    // computing scroll position. A double-rAF is used so the measurement
    // happens after any pending CSS height transitions (e.g. the expanded
    // class change) have been picked up by layout.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const c = this.messagesContainerEl;
        const spacer = this.spacerEl;
        if (!c) return;

        // The spacer sits after all messages. Grow it so there is enough
        // scrollable height to push the latest user message to the very top.
        if (spacer) spacer.style.minHeight = c.clientHeight + 'px';

        // children: [welcome?, ...message wrappers (one per message), spacer]
        // after sendQuery pushes user msg + assistant placeholder, the user
        // message is the third-to-last child (before assistant + spacer).
        const children = c.children;
        const userMsgEl = children[children.length - 3];
        if (!userMsgEl) return;

        c.scrollTo({
          top: c.scrollTop + (userMsgEl.getBoundingClientRect().top - c.getBoundingClientRect().top - 8),
          behavior: 'smooth'
        });
      });
    });
  }

  isLastMessage(index) {
    return index === this.state.messages.length - 1;
  }

  // ─── Render ────────────────────────────────────────────────

  render() {
    return [this.renderTrigger(), this.renderDialog()];
  }

  renderTrigger() {
    return html`
      <button
        onClick=${() => this.toggle()}
        class="chatbot-trigger"
        style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998; display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.875rem 1.5rem; font-size: 1rem; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; border: none; border-radius: 9999px; font-weight: 500; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 18px rgba(124,58,237,0.45);"
        onMouseOver=${(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(124,58,237,0.55)'; }}
        onMouseOut=${(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(124,58,237,0.45)'; }}
        aria-label="Ask AI"
      >
        <svg class="shrink-0 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Ask AI</span>
      </button>
    `;
  }

  renderDialog() {
    const s = this.state;
    if (!s.isOpen) return null;

    return html`
      <div
        onClick=${this.handleRootClick}
        style="animation: dialogSlideIn 0.2s ease-out"
        class=${'chatbot-dialog fixed bottom-24 right-4 z-[9999] w-[min(700px,calc(100vw-2rem))] h-[50vh] max-h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden transition-[height] duration-300 sm:bottom-24 sm:right-6' + (s.isExpanded ? ' expanded' : '')}
      >
        ${this.renderHeader()}
        ${this.renderMessages()}
        ${this.renderInput()}
        ${this.renderFeedbackModal()}
      </div>
    `;
  }

  renderHeader() {
    const s = this.state;
    return html`
      <div class="chatbot-header flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shrink-0">
        <div class="chatbot-header-title flex items-center gap-2.5 text-[15px] font-semibold text-gray-900 dark:text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-violet-600">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>agentregistry assistant</span>
        </div>
        <div class="flex items-center gap-1">
          <button
            onClick=${() => this.newChat()}
            class="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer transition-all duration-150 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="New Chat"
            title="New conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          ${s.messages.length > 0 && html`
            <button
              onClick=${() => this.exportChat()}
              class="flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-lg text-gray-500 cursor-pointer transition-all duration-150 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              aria-label="Export conversation"
              title="Export as Markdown"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          `}
          <button
            onClick=${() => this.setIsOpen(false)}
            class="chatbot-minimize flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-lg text-gray-500 cursor-pointer transition-all duration-150 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            aria-label="Minimize"
            title="Minimize conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  renderMessages() {
    const s = this.state;
    return html`
      <div
        ref=${(el) => this.messagesContainerEl = el}
        class="chatbot-messages flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4"
      >
        ${s.messages.length === 0 && html`
          <div class="chatbot-welcome text-center py-4 px-5 text-gray-800 dark:text-gray-400 text-sm">
            <p>Ask me anything about agentregistry: publishing artifacts, deployments, the arctl CLI, or the registry API.</p>
            <p>Note: AI-generated content might contain errors; please verify and test all returned information.</p>
            <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">Tip: one topic per conversation gives the best results. Use the <strong class="font-medium">+</strong> button in the chat header to start a new conversation.</p>
          </div>
        `}

        ${s.messages.map((msg, index) => this.renderMessage(msg, index))}

        <div ref=${(el) => this.spacerEl = el} style="flex-shrink: 0"></div>
      </div>
    `;
  }

  renderMessage(msg, index) {
    const s = this.state;
    return html`
      <div key=${index}>
        <div class=${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
          ${msg.role === 'user'
            ? this.renderUserMessage(msg)
            : this.renderAssistantMessage(msg, index)}
        </div>
        ${s.historyLimitNoteShown && index === s.historyLimitNoteIndex && html`
          <div class="mt-2 flex items-start gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg text-[11px] text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>The assistant keeps a rolling history of 3 exchanges. Any older messages are no longer included in the context.</span>
          </div>
        `}
      </div>
    `;
  }

  renderUserMessage(msg) {
    const contextPages = msg.contextPages || [];
    return html`
      <div class="flex flex-col items-end gap-1.5 max-w-[85%]">
        <div class="chatbot-message user px-4 py-2 rounded-2xl rounded-br-sm text-sm leading-relaxed font-normal break-words">${msg.content}</div>
        ${contextPages.length > 0 && html`
          <div class="flex flex-wrap gap-1 pr-1">
            ${contextPages.map((cp, cpIdx) => html`
              <a
                key=${cpIdx}
                href=${cp.url}
                class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-violet-100/90 dark:bg-violet-500/20 border border-violet-300/50 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200/90 dark:hover:bg-violet-500/30 hover:border-violet-400 dark:hover:border-violet-500/40 rounded-md text-[11px] font-medium cursor-pointer transition-colors no-underline"
                title="Go to page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span class="truncate max-w-[200px]">${cp.title}</span>
              </a>
            `)}
          </div>
        `}
      </div>
    `;
  }

  renderAssistantMessage(msg, index) {
    const s = this.state;
    const showThinkingDots = msg.isStreaming && s.showThinking && this.isLastMessage(index);
    const showFeedbackRow = !msg.isError && !msg.isStreaming && msg.content;
    return html`
      <div class="chatbot-message assistant flex gap-3 items-start w-full pr-4">
        <div class=${'chatbot-avatar shrink-0 w-8 h-8 flex items-center justify-center rounded-lg p-1 relative' + (msg.isLoading ? ' loading' : '')}>
          <img src=${this.props.favicon} alt="Agent" class="w-full h-full transition-all duration-200" />
        </div>

        <div class="chatbot-message-content flex-1 min-w-0">
          ${showThinkingDots && html`
            <div class="chatbot-thinking mb-1">
              <div class="thinking-dots inline-flex gap-1" ref=${(el) => { this.thinkingDotsEl = el; if (el) this.thinkingAnimator.start(el); }}>
                <span class="dot">•</span>
                <span class="dot">•</span>
                <span class="dot">•</span>
              </div>
            </div>
          `}

          ${!msg.isError && html`
            <div class="chatbot-response text-gray-900 dark:text-gray-200 text-sm leading-relaxed" dangerouslySetInnerHTML=${{ __html: msg.content }}></div>
          `}

          ${msg.isError && (msg.isRateLimited
            ? html`
              <div class="chatbot-error chatbot-error-rate-limit bg-amber-50 dark:bg-amber-600/10 border border-amber-200 dark:border-amber-600/30 text-amber-700 dark:text-amber-400 px-4 py-3 rounded-lg text-[13px] flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <div class="font-medium mb-1">Rate limit reached</div>
                  <div class="text-amber-600 dark:text-amber-300/80">${msg.content}</div>
                </div>
              </div>
            `
            : html`
              <div class="chatbot-error bg-red-50 dark:bg-red-600/10 border border-red-200 dark:border-red-600/30 text-red-600 px-4 py-3 rounded-lg text-[13px]">${msg.content}</div>
            `)}

          ${showFeedbackRow && this.renderFeedbackRow(msg, index)}
        </div>
      </div>
    `;
  }

  renderFeedbackRow(msg, index) {
    const s = this.state;
    const upClass = msg.feedback === 'up'
      ? 'text-green-500 dark:text-green-400'
      : (!msg.feedback
        ? 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400'
        : 'text-gray-200 dark:text-gray-700');
    const downClass = msg.feedback === 'down'
      ? 'text-red-500 dark:text-red-400'
      : (!msg.feedback
        ? 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400'
        : 'text-gray-200 dark:text-gray-700');
    const copyClass = s.copiedMessageIndex === index
      ? 'text-green-500 dark:text-green-400'
      : 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400';
    return html`
      <div class="flex items-center gap-0.5 mt-1.5 -ml-1">
        <button
          onClick=${() => this.submitFeedback(index, 'up')}
          disabled=${!!msg.feedback}
          class=${'p-1 bg-transparent border-none rounded transition-colors duration-150 ' + upClass}
          style=${msg.feedback && msg.feedback !== 'up' ? 'cursor:default' : 'cursor:pointer'}
          aria-label="Thumbs up"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
        </button>
        <button
          onClick=${() => this.submitFeedback(index, 'down')}
          disabled=${!!msg.feedback}
          class=${'p-1 bg-transparent border-none rounded transition-colors duration-150 ' + downClass}
          style=${msg.feedback && msg.feedback !== 'down' ? 'cursor:default' : 'cursor:pointer'}
          aria-label="Thumbs down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
          </svg>
        </button>
        <button
          onClick=${() => this.copyMessage(index)}
          class=${'p-1 bg-transparent border-none rounded transition-colors duration-150 cursor-pointer ' + copyClass}
          aria-label=${s.copiedMessageIndex === index ? 'Copied' : 'Copy message as markdown'}
          title=${s.copiedMessageIndex === index ? 'Copied!' : 'Copy message'}
        >
          ${s.copiedMessageIndex !== index
            ? html`
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
            : html`
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `}
        </button>
      </div>
    `;
  }

  renderInput() {
    const s = this.state;
    return html`
      <div class="chatbot-input-container px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shrink-0">

        ${s.showNewConvBanner && html`
          <div class="flex items-center justify-between gap-2 mb-2 px-3 py-2 bg-gray-100 dark:bg-gray-700/60 rounded-lg text-[11px] text-gray-500 dark:text-gray-400">
            <span>Switching topics? Starting a new conversation improves accuracy.</span>
            <button
              onClick=${() => this.newChat()}
              class="shrink-0 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium bg-transparent border-none cursor-pointer p-0 transition-colors"
            >Start new conversation</button>
          </div>
        `}

        <div class="chatbot-input-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors duration-150 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">

          ${s.contextPages.length > 0 && html`
            <div class="px-3 pt-2.5 pb-0 flex flex-wrap gap-1.5">
              ${s.contextPages.map((page, pageIdx) => html`
                <span
                  key=${page.url}
                  class=${'inline-flex items-center gap-1.5 max-w-full px-2 py-1 border rounded-lg text-xs font-medium ' + (pageIdx < 3 ? 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400')}
                  title=${pageIdx >= 3 ? 'Exceeds the 3-page limit — this page will not be sent as context.' : ''}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span class="truncate max-w-[150px]">${page.title}</span>
                  <button
                    onClick=${() => this.removeContextPage(pageIdx)}
                    class=${'shrink-0 ml-0.5 p-0 bg-transparent border-none cursor-pointer transition-colors ' + (pageIdx < 3 ? 'text-violet-400 hover:text-violet-700 dark:hover:text-violet-200' : 'text-red-400 hover:text-red-700 dark:hover:text-red-200')}
                    aria-label="Remove page context"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </span>
              `)}
            </div>
          `}

          ${this.renderMentionMenu()}

          <textarea
            ref=${(el) => this.inputEl = el}
            value=${s.userInput}
            onInput=${(e) => this.handleInput(e)}
            onKeyDown=${(e) => this.handleKeydown(e)}
            onPaste=${(e) => this.handlePaste(e)}
            onDrop=${(e) => this.handleDrop(e)}
            onDragOver=${(e) => this.handleDragOver(e)}
            class="w-full box-border px-3 py-2.5 bg-transparent border-none font-inherit text-sm text-gray-900 dark:text-gray-50 resize-none leading-relaxed outline-none overflow-y-auto placeholder:text-gray-400"
            style="height: 68px"
            placeholder="Ask about agentregistry... (type @ to mention a page, paste/drag links here)"
            rows="1"
          ></textarea>

          <div class="flex items-center justify-between px-1.5 pb-1.5">
            ${this.renderContextMenu()}
            ${this.renderSendRow()}
          </div>
        </div>
      </div>
    `;
  }

  renderMentionMenu() {
    const s = this.state;
    if (!(s.showMentionMenu && s.filteredMentionPages.length > 0)) {
      return html`<div class="relative"></div>`;
    }
    return html`
      <div class="relative">
        <div class="chatbot-mention-menu absolute bottom-full left-0 right-0 mb-1 mx-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
          <div ref=${(el) => this.mentionListEl = el} class="chatbot-mention-list max-h-[240px] overflow-y-auto py-1">
            ${s.filteredMentionPages.map((page, mIdx) => html`
              <button
                key=${page._isCurrentPage ? '__current__' : page.url}
                onClick=${() => this.selectMention(page)}
                onMouseEnter=${() => this.setState({ mentionSelectedIndex: mIdx })}
                class=${'chatbot-mention-item w-full flex flex-col gap-0.5 px-3 py-2 text-left bg-transparent border-none cursor-pointer text-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors ' + (mIdx === s.mentionSelectedIndex ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300' : 'text-gray-700 dark:text-gray-200')}
              >
                <div class="flex items-center gap-1.5">
                  <span class="font-medium truncate">${page.title}</span>
                  ${page._isCurrentPage && html`
                    <span class="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400">Current page</span>
                  `}
                </div>
                <span class="text-[11px] text-gray-400 dark:text-gray-500 truncate">${page.section ? page.section + ' — ' + page.url : page.url}</span>
              </button>
            `)}
          </div>
          <div class="px-3 py-1.5 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-2">
            <span class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">↑↓</span> navigate
            <span class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">↵</span> select
            <span class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">esc</span> dismiss
          </div>
        </div>
      </div>
    `;
  }

  renderContextMenu() {
    const s = this.state;
    return html`
      <div class="relative" ref=${(el) => this.contextWrapEl = el}>
        <button
          onClick=${() => this.setState({ showContextMenu: !s.showContextMenu })}
          class=${'flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-lg cursor-pointer transition-all duration-150 ' + (s.contextPages.length > 0 ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700')}
          aria-label="Add context"
          title="Add context"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

        ${s.showContextMenu && html`
          <div class="absolute bottom-full left-0 mb-1.5 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1.5 z-10">
            <button
              onClick=${() => { this.addCurrentPage(); this.setState({ showContextMenu: false }); }}
              class="w-full flex items-center gap-3 px-3 py-2 text-left bg-transparent border-none cursor-pointer text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-gray-400 dark:text-gray-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span class="flex-1">Add this page</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-gray-400 dark:text-gray-500">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button
              onClick=${() => { this.setState({ showContextMenu: false }); this.insertMention(); }}
              class="w-full flex items-center gap-3 px-3 py-2 text-left bg-transparent border-none cursor-pointer text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-gray-400 dark:text-gray-500">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
              </svg>
              <span class="flex-1">Mention a page</span>
            </button>
          </div>
        `}
      </div>
    `;
  }

  renderSendRow() {
    const s = this.state;
    const canSend = s.userInput.trim() && !s.isProcessing;
    return html`
      <div class="flex items-center gap-1">
        ${this.props.showProductSelector && this.renderProductSelector()}
        <button
          onClick=${() => this.sendQuery()}
          disabled=${s.isProcessing || !s.userInput.trim()}
          class=${'chatbot-submit flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer transition-all duration-150 active:scale-95 disabled:cursor-not-allowed ' + (canSend ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-sm' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500')}
          aria-label="Send"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;
  }

  /*
    Product (deployment-model) selector.

    HIDDEN while there is only one product: `showProductSelector` is derived in
    assets/js/chatbot/index.js from `PRODUCTS.length > 1`. The dropdown below
    renders one row per entry in `products`, so when a second product is added
    to the PRODUCTS array (e.g. a standalone enterprise corpus) the selector
    AUTOMATICALLY reappears with both options — no markup changes needed here.
    See the PRODUCTS block in index.js for the full checklist.
  */
  renderProductSelector() {
    const s = this.state;
    return html`
      <div class="relative" ref=${(el) => this.modelWrapEl = el}>
        <button
          onClick=${() => this.setState({ showModelMenu: !s.showModelMenu })}
          class="flex items-center gap-1 px-2 py-1.5 bg-transparent border-none rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span>${this.getModelLabel()}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </button>

        ${s.showModelMenu && html`
          <div class="absolute bottom-full right-0 mb-1.5 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1.5 z-10">
            ${this.props.products.map((p) => html`
              <button
                key=${p.id}
                onClick=${() => this.setState({ selectedModel: p.id, showModelMenu: false }, () => this.saveState())}
                class=${'w-full flex items-center justify-between px-3 py-2 text-left bg-transparent border-none cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ' + (s.selectedModel === p.id ? 'text-gray-900 dark:text-gray-50 font-medium' : 'text-gray-600 dark:text-gray-300')}
              >
                <div>
                  <div>${p.label}</div>
                  <div class="text-[11px] text-gray-400 dark:text-gray-500 font-normal">${p.description}</div>
                </div>
                ${s.selectedModel === p.id && html`
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-violet-600 shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                `}
              </button>
            `)}
          </div>
        `}
      </div>
    `;
  }

  renderFeedbackModal() {
    const s = this.state;
    if (!s.showFeedbackModal) return null;
    return html`
      <div
        onClick=${() => this.closeFeedbackModal()}
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 rounded-2xl"
      >
        <div
          onClick=${(e) => e.stopPropagation()}
          style="animation: dialogSlideIn 0.15s ease-out"
          class="w-[min(400px,calc(100%-2rem))] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-5"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-50 m-0">What could be improved?</h3>
            <button
              onClick=${() => this.closeFeedbackModal()}
              class="flex items-center justify-center w-6 h-6 bg-transparent border-none rounded text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p class="m-0 mb-2 text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
            Your feedback helps us improve assistant answers and identify docs gaps we should fix.
          </p>
          <textarea
            ref=${(el) => this.feedbackInputEl = el}
            value=${s.feedbackComment}
            onInput=${(e) => this.setState({ feedbackComment: e.target.value })}
            onKeyDown=${(e) => { if (e.key === 'Escape') { e.stopPropagation(); this.closeFeedbackModal(); } }}
            class="w-full box-border px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-50 resize-none outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors font-inherit"
            rows="3"
            placeholder="Tell us what went wrong (optional)..."
          ></textarea>
          <div class="mt-3 rounded-lg border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 px-3 py-2 text-[12px] leading-relaxed text-violet-800 dark:text-violet-200">
            <p class="m-0">
              Need more help? Join us on Discord:
              <a
                href="https://discord.gg/Af8bX99dbX"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-violet-700 dark:text-violet-300 underline hover:text-violet-600 dark:hover:text-violet-200"
              >https://discord.gg/Af8bX99dbX</a>
            </p>
            <p class="m-0 mt-2">
              Want to use your own agent? Add the Solo MCP server to query our docs directly. Get started here:
              <a
                href="https://search.solo.io/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-violet-700 dark:text-violet-300 underline hover:text-violet-600 dark:hover:text-violet-200"
              >https://search.solo.io/</a>.
            </p>
          </div>
          <div class="flex items-center justify-end gap-2 mt-3">
            <button
              onClick=${() => this.closeFeedbackModal()}
              class="px-3 py-1.5 bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-inherit"
            >Skip</button>
            <button
              onClick=${() => this.submitFeedbackComment()}
              disabled=${!s.feedbackComment.trim()}
              class="px-3 py-1.5 bg-violet-600 border-none rounded-lg text-sm text-white cursor-pointer hover:bg-violet-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-inherit"
            >Submit</button>
          </div>
        </div>
      </div>
    `;
  }
}
