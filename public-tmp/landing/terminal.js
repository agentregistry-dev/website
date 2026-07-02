// Interactive arctl terminal demo
// Workos-style menu — pick Build / Deploy / Publish, watch the real commands play out.
// Keyboard: 1/2/3 to pick, ↑↓ to navigate, Enter to run, Esc to go back.

(function () {
  // ---- Flows: each is a sequence of typed prompts + their outputs ----
  // Lines: { t: <type>, text, typing?: boolean, pause?: ms }
  // Types: prompt, comment, head, row, ok, dim, warn, blue, blank

  const FLOWS = {
    build: {
      title: "Build an agent",
      desc: "Scaffold, build, and run a new agent locally",
      doc: "https://aregistry.ai/docs/agents/",
      lines: [
        { t: "comment", text: "# Scaffold a new agent project" },
        { t: "prompt", text: "arctl agent init adk python dice", typing: true },
        { t: "ok",   text: "✓ Created project ./dice" },
        { t: "dim",  text: "  · framework: adk · language: python" },
        { t: "dim",  text: "  · model: gemini-2.0-flash" },
        { t: "dim",  text: "  · files: agent.yaml, agent.py, Dockerfile" },
        { t: "blank" },
        { t: "comment", text: "# Add an MCP server from the registry" },
        { t: "prompt", text: "arctl agent add-mcp data/postgres --project-dir dice", typing: true },
        { t: "ok",   text: "✓ Added data/postgres@3.0.0 to dice/agent.yaml" },
        { t: "blank" },
        { t: "comment", text: "# Build the Docker image" },
        { t: "prompt", text: "arctl agent build ./dice --push", typing: true },
        { t: "dim",  text: "  → docker build ./dice" },
        { t: "dim",  text: "  → docker push ghcr.io/myorg/dice:v0.1.0" },
        { t: "ok",   text: "✓ Pushed ghcr.io/myorg/dice:v0.1.0" },
        { t: "blank" },
        { t: "comment", text: "# Run it locally" },
        { t: "prompt", text: "arctl agent run ./dice", typing: true },
        { t: "blue", text: "✓ dice agent running · http://localhost:8080" },
        { t: "dim",  text: "  Ready. Try: \"roll a 20-sided die\"" },
      ],
    },

    deploy: {
      title: "Deploy an MCP server",
      desc: "Pull from the catalog and wire your IDE through agentgateway",
      doc: "https://aregistry.ai/docs/mcp/",
      lines: [
        { t: "comment", text: "# Browse what's available" },
        { t: "prompt", text: "arctl mcp list", typing: true },
        { t: "head", text: "NAME                     VERSION  TYPE   DEPLOYED" },
        { t: "row",  text: "data/postgres            3.0.0    npm    False" },
        { t: "row",  text: "platform/brave-search    0.9.5    npm    False" },
        { t: "row",  text: "platform/filesystem      2.4.0    npm    False" },
        { t: "row",  text: "sebastianmaniak/ops-server 0.1.0  oci    False" },
        { t: "blank" },
        { t: "comment", text: "# Deploy data/postgres to the local cluster" },
        { t: "prompt", text: "arctl deployments create data/postgres", typing: true },
        { t: "ok",   text: "✓ Pulled @modelcontextprotocol/server-postgres@3.0.0" },
        { t: "ok",   text: "✓ Scheduled to kubernetes-default" },
        { t: "ok",   text: "✓ Configured agentgateway → /mcp/data/postgres" },
        { t: "blank" },
        { t: "comment", text: "# Wire it into your IDE" },
        { t: "prompt", text: "arctl configure cursor", typing: true },
        { t: "ok",   text: "✓ Cursor settings.json updated" },
        { t: "blue", text: "  · 1 MCP server now available in Cursor" },
        { t: "dim",  text: "  → http://localhost:12121/gateway" },
      ],
    },

    publish: {
      title: "Publish a skill",
      desc: "Package a SKILL.md, push the image, register it in the catalog",
      doc: "https://aregistry.ai/docs/skills/",
      lines: [
        { t: "comment", text: "# Scaffold a new skill" },
        { t: "prompt", text: "arctl skill init hello-world-template", typing: true },
        { t: "ok",   text: "✓ Created ./hello-world-template" },
        { t: "dim",  text: "  · files: SKILL.md, examples/, references/" },
        { t: "blank" },
        { t: "comment", text: "# Build & push the image" },
        { t: "prompt", text: "arctl skill build ./hello-world-template --push", typing: true },
        { t: "dim",  text: "  → docker build ./hello-world-template" },
        { t: "ok",   text: "✓ Pushed docker.io/user/hello-world-template:v1.0.0" },
        { t: "blank" },
        { t: "comment", text: "# Register it in agentregistry" },
        { t: "prompt", text: "arctl skill publish hello-world-template --docker-url docker.io/user", typing: true },
        { t: "ok",   text: "✓ Catalog entry created" },
        { t: "ok",   text: "✓ Visible at http://localhost:12121/catalog/skills" },
        { t: "blank" },
        { t: "comment", text: "# Attach it to an agent" },
        { t: "prompt", text: "arctl agent add-skill hello-world-template --project-dir myagent", typing: true },
        { t: "blue", text: "✓ Added hello-world-template@1.0.0 to myagent" },
      ],
    },
  };

  const OPTIONS = [
    { key: "build",   label: "Build an agent" },
    { key: "deploy",  label: "Deploy an MCP server" },
    { key: "publish", label: "Publish a skill" },
  ];

  // ---- State ----
  let active = 0;          // index in OPTIONS while in menu
  let mode = "menu";       // 'menu' | 'playing' | 'done'
  let abortToken = 0;      // increments to cancel running animations

  const body = document.getElementById("terminal-body");
  const terminal = document.getElementById("terminal");

  function escape(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function classFor(t) {
    return ({
      prompt: "t-prompt",
      head:   "t-head",
      row:    "t-name",
      dim:    "t-dim",
      ok:     "t-ok",
      warn:   "t-warn",
      blue:   "t-blue",
      comment:"t-comment",
      blank:  "",
    })[t] || "";
  }

  // ---------- Menu render ----------
  function renderMenu() {
    mode = "menu";
    abortToken++;
    body.innerHTML = `
      <div class="terminal-greeting">Looks like your registry is ready. What would you like to do today?</div>
      <div class="terminal-menu" id="menu">
        ${OPTIONS.map((o, i) => `
          <button class="terminal-option ${i === active ? "active" : ""}" data-idx="${i}">
            <span class="cursor-mark">▸</span>
            <span class="opt-num">${i + 1}.</span>
            <span>${escape(o.label)}</span>
          </button>
        `).join("")}
      </div>
      <div class="terminal-foot">
        <span>↑↓ to navigate</span>
        <span class="sep">·</span>
        <span>↵ to select</span>
      </div>
    `;
    body.scrollTop = 0;
    body.querySelectorAll(".terminal-option").forEach(btn => {
      btn.addEventListener("click", () => {
        active = parseInt(btn.dataset.idx, 10);
        run(OPTIONS[active].key);
      });
      btn.addEventListener("mouseenter", () => {
        active = parseInt(btn.dataset.idx, 10);
        body.querySelectorAll(".terminal-option").forEach((b, i) =>
          b.classList.toggle("active", i === active));
      });
    });
  }

  function updateMenuActive() {
    body.querySelectorAll(".terminal-option").forEach((b, i) =>
      b.classList.toggle("active", i === active));
  }

  // ---------- Flow playback ----------
  async function run(key) {
    mode = "playing";
    const token = ++abortToken;
    const flow = FLOWS[key];
    body.innerHTML = `
      <div class="terminal-greeting" style="margin-bottom:14px;">
        <span style="color:#8E867A;">▸ ${escape(flow.title)}</span>
        <a href="${flow.doc}" target="_blank" rel="noopener" style="color:#8839EF; font-size:12px; margin-left:10px; text-decoration:underline;">docs ↗</a>
      </div>
      <div id="flow-out"></div>
    `;
    const out = body.querySelector("#flow-out");

    for (let i = 0; i < flow.lines.length; i++) {
      if (token !== abortToken) return; // cancelled
      const ln = flow.lines[i];
      if (ln.t === "blank") {
        const br = document.createElement("div");
        br.style.height = "8px";
        out.appendChild(br);
        await sleep(120);
        continue;
      }

      const div = document.createElement("div");
      div.className = classFor(ln.t);
      out.appendChild(div);

      if (ln.typing && ln.text) {
        const txt = ln.text;
        for (let c = 0; c < txt.length; c++) {
          if (token !== abortToken) return;
          div.innerHTML = escape(txt.slice(0, c + 1)) + '<span class="cursor"></span>';
          body.scrollTop = body.scrollHeight;
          await sleep(22 + Math.random() * 32);
        }
        div.innerHTML = escape(txt);
        await sleep(380);
      } else {
        div.textContent = ln.text;
        body.scrollTop = body.scrollHeight;
        await sleep(ln.t === "ok" || ln.t === "blue" ? 200 : 80);
      }
    }

    if (token !== abortToken) return;
    mode = "done";

    const foot = document.createElement("div");
    foot.innerHTML = `
      <button class="terminal-back" id="back-btn">
        <span style="font-size:14px;">↺</span> Try another flow <span style="opacity:.6;">·  Esc</span>
      </button>
    `;
    foot.style.marginTop = "18px";
    out.appendChild(foot);
    body.querySelector("#back-btn")?.addEventListener("click", renderMenu);
  }

  // ---------- Keyboard ----------
  function onKey(e) {
    if (mode === "menu") {
      if (e.key === "ArrowDown") {
        active = (active + 1) % OPTIONS.length;
        updateMenuActive();
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        active = (active - 1 + OPTIONS.length) % OPTIONS.length;
        updateMenuActive();
        e.preventDefault();
      } else if (e.key === "Enter") {
        run(OPTIONS[active].key);
        e.preventDefault();
      } else if (e.key >= "1" && e.key <= String(OPTIONS.length)) {
        active = parseInt(e.key, 10) - 1;
        updateMenuActive();
        run(OPTIONS[active].key);
        e.preventDefault();
      }
    } else if (mode === "playing" || mode === "done") {
      if (e.key === "Escape") {
        renderMenu();
        e.preventDefault();
      }
    }
  }

  // ---- Init ----
  document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
    // listen on the terminal when focused, AND globally so users don't have to click
    terminal.addEventListener("keydown", onKey);
    window.addEventListener("keydown", (e) => {
      // only swallow keys if the terminal is the user's intended target
      // (don't hijack while they're typing in inputs elsewhere)
      const target = e.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      // Only the digit/arrow/escape keys we care about
      if (["ArrowUp","ArrowDown","Enter","Escape","1","2","3"].includes(e.key)) {
        onKey(e);
      }
    });
  });
})();
