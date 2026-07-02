// Interactive catalog preview — matches the real localhost:12121 UI
// Catalog tab (Servers / Skills / Agents / Prompts) and Deployed tab.

(function () {
  // ===== Catalog data =====
  const CATALOG = {
    servers: [
      { ns: "data",            name: "google-drive",  desc: "Google Drive file search and read",                 rating: 3.5, ver: "0.9.5", pkgs: 1 },
      { ns: "data",            name: "postgres",      desc: "PostgreSQL query and schema inspection",            rating: 4.8, ver: "3.0.0", pkgs: 1 },
      { ns: "data",            name: "sqlite",        desc: "SQLite query and schema tools",                     rating: 3.8, ver: "1.0.0", pkgs: 1 },
      { ns: "platform",        name: "brave-search",  desc: "Web search via Brave Search API",                   rating: 4.2, ver: "0.9.5", pkgs: 1 },
      { ns: "platform",        name: "fetch",         desc: "HTTP fetch with HTML-to-Markdown conversion",       rating: 4.7, ver: "1.8.2", pkgs: 1 },
      { ns: "platform",        name: "filesystem",    desc: "Read and write local filesystem paths",             rating: 4.9, ver: "2.4.0", pkgs: 1 },
      { ns: "sebastianmaniak", name: "ops-server",    desc: "Devops",                                            ver: "0.1.0", pkgs: 1, noStar: true },
      { ns: "security",        name: "github",        desc: "GitHub repository, issues, and PR tooling with audit logs", rating: 4.7, ver: "2.2.0", pkgs: 1 },
      { ns: "sre",             name: "memory",        desc: "Long-term memory for SRE incident agents",          rating: 4.6, ver: "3.1.0", pkgs: 1 },
      { ns: "sre",             name: "pagerduty",     desc: "Incidents, schedules, and on-call queries",         rating: 4.5, ver: "1.4.0", pkgs: 1 },
      { ns: "platform",        name: "slack",         desc: "Slack messaging and channel search",                rating: 4.4, ver: "2.1.0", pkgs: 1 },
    ],
    skills: [
      { name: "data-database-operations",       desc: "Schema migration, backup, and failover procedures",       rating: 4.4, ver: "1.3.0", pkgs: 1, team: "team:data" },
      { name: "platform-best-practices",        desc: "Kubernetes deployment standards, SLA tiers, health check conventions, and team ownership mappings for platform operations", ver: "1.0.0", pkgs: 1, noStar: true },
      { name: "platform-capacity-planning",     desc: "Forecasting and HPA/VPA tuning guidance",                 rating: 4.5, ver: "1.4.0", pkgs: 1, team: "team:platform" },
      { name: "platform-ci-cd-best-practices",  desc: "Pipeline structure, secrets handling, and rollout safety",rating: 4.2, ver: "1.5.0", pkgs: 1, team: "team:platform" },
      { name: "platform-cost-optimization",     desc: "Cloud cost analysis and rightsizing recommendations",     rating: 4.4, ver: "2.0.0", pkgs: 1, team: "team:platform" },
      { name: "platform-disaster-recovery",     desc: "RTO/RPO targets and DR drill procedures",                 rating: 4.6, ver: "1.0.0", pkgs: 1, team: "team:platform" },
      { name: "platform-kubernetes-troubleshooting", desc: "Diagnose pod, node, and control-plane issues",       rating: 4.9, ver: "2.3.0", pkgs: 1, team: "team:platform" },
      { name: "platform-deployment-strategies", desc: "Blue/green, canary, and rolling deployment plans",         rating: 4.5, ver: "1.5.0", pkgs: 1, team: "team:platform" },
      { name: "sre-incident-response",          desc: "On-call playbook and escalation handling",                rating: 4.9, ver: "3.4.1", pkgs: 1, team: "team:sre" },
      { name: "sre-oncall-handbook",            desc: "Runbook generation from past postmortems",                rating: 4.7, ver: "1.2.0", pkgs: 1, team: "team:sre" },
      { name: "sre-pagerduty-integration",      desc: "Page on-call from agents and post structured updates",     rating: 4.6, ver: "1.0.0", pkgs: 1, team: "team:sre" },
      { name: "data-sql-explainer",             desc: "Explain query plans and propose index changes",           rating: 4.4, ver: "0.8.0", pkgs: 1, team: "team:data" },
      { name: "data-warehouse-modeling",        desc: "Dimensional modeling and incremental ETL patterns",        rating: 4.3, ver: "0.9.0", pkgs: 1, team: "team:data" },
      { name: "security-audit-trail",           desc: "Reconstruct and summarize audit events",                  rating: 4.3, ver: "0.5.1", pkgs: 1, team: "team:security" },
      { name: "security-soc2-evidence",         desc: "Evidence collection helpers for SOC2 controls",            rating: 4.5, ver: "0.7.0", pkgs: 1, team: "team:security" },
      { name: "hello-world-template",           desc: "Starter template — useful for forking",                   ver: "1.0.0", pkgs: 1, noStar: true },
    ],
    agents: [
      { name: "datadbadminagent",       desc: "Schema review, migration safety, and slow-query triage", rating: 4.5, ver: "1.0.0", repo: true, team: "team:data" },
      { name: "platformcostagent",      desc: "Cloud spend analysis and FinOps recommendations",         rating: 4.3, ver: "1.1.0", repo: true, team: "team:platform" },
      { name: "platformopsagent",       desc: "Platform Ops Agent — deployment management, escalation, incident response", ver: "latest", repo: true, tags: ["adk","python"], provider: "openAI", model: "gpt-4o" },
      { name: "platformreleaseagent",   desc: "Coordinates multi-service deployments and rollbacks",     rating: 4.8, ver: "2.0.0", repo: true, team: "team:platform" },
      { name: "securitycomplianceagent",desc: "Continuous SOC2/ISO27001 evidence collection",             rating: 4.2, ver: "1.0.0", repo: true, team: "team:security" },
      { name: "sreincidentagent",       desc: "Sev1 incident triage, paging, and comms",                  rating: 4.9, ver: "3.0.0", repo: true, team: "team:sre" },
      { name: "sreoncallagent",         desc: "On-call assistant for runbook lookup and pager triage",   rating: 4.6, ver: "1.4.0", repo: true, team: "team:sre" },
    ],
    prompts: [
      { name: "engineering/pr-review",  desc: "Code review prompt with security checklist",              rating: 4.5, ver: "1.0.0", pkgs: 1 },
    ],
  };

  // ===== Deployed data =====
  const DEPLOYED = {
    agents: [
      { name: "platformopsagent",            ver: "latest",  provider: "kubernetes-default", origin: "managed",   status: "running", date: "5/22/2026" },
      { name: "argo-rollouts-conversion-agent", ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "cilium-debug-agent",          ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "cilium-manager-agent",        ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "cilium-policy-agent",         ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "helm-agent",                  ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "istio-agent",                 ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "k8s-agent",                   ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "kgateway-agent",              ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "observability-agent",         ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
      { name: "tracing-agent",               ver: "unknown", provider: "kubernetes-default", origin: "discovered", status: "running", date: "5/22/2026" },
    ],
    servers: [
      { name: "data/postgres",   ver: "3.0.0",  provider: "kubernetes-default", origin: "managed", status: "running", date: "5/22/2026" },
      { name: "platform/slack",  ver: "2.1.0",  provider: "kubernetes-default", origin: "managed", status: "running", date: "5/22/2026" },
    ],
  };

  // ===== Tab definitions =====
  const TYPE_TABS = [
    { key: "servers",
      label: "Servers",
      iconStroke: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 1 1-8.49-8.49l9.19-9.19a4 4 0 1 1 5.66 5.66L9.41 17.41a2 2 0 1 1-2.83-2.83l8.49-8.49"/></svg>',
      rowIcon: null /* uses 2-letter badge */ },
    { key: "skills",
      label: "Skills",
      iconStroke: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
      rowIcon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>' },
    { key: "agents",
      label: "Agents",
      iconStroke: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>',
      rowIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>' },
    { key: "prompts",
      label: "Prompts",
      iconStroke: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
      rowIcon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>' },
  ];

  // ===== State =====
  const state = {
    view: "catalog",        // "catalog" | "deployed"
    type: "servers",        // type tab in catalog view
    query: "",
    sort: "Name",
    verifiedOrg: false,
    verifiedPub: false,
    depFilter: { provider: "All providers", origin: "All origins", status: "All statuses", query: "" },
    deployed: new Set(),
  };

  const root = document.getElementById("catalog-preview");
  const appBar = document.getElementById("preview-appbar");
  if (!root || !appBar) return;

  function escape(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ===== Catalog view =====
  function renderCatalog() {
    const items = CATALOG[state.type];
    const filtered = items.filter(i => {
      if (state.query) {
        const q = state.query.toLowerCase();
        const hay = (i.ns ? i.ns + "/" : "") + i.name + " " + (i.desc || "");
        if (!hay.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    root.innerHTML = `
      <div class="cat-tabstrip">
        ${TYPE_TABS.map(t => `
          <button class="cat-tab ${t.key === state.type ? "active" : ""}" data-type="${t.key}">
            ${t.iconStroke}
            <span>${t.label}</span>
            <span class="count">${CATALOG[t.key].length}</span>
          </button>
        `).join("")}
        <div class="cat-tabstrip-actions">
          <button class="cat-btn cat-btn-primary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="cat-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Import
          </button>
          <button class="cat-btn cat-btn-icon" title="Refresh">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          </button>
        </div>
      </div>

      <div class="cat-filterbar">
        <div class="cat-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input id="cat-search-input" type="text" placeholder="Search ${state.type}…" value="${escape(state.query)}">
        </div>
        <div class="cat-sort">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
          <select class="cat-select" id="cat-sort">
            <option ${state.sort === "Name" ? "selected" : ""}>Name</option>
            <option ${state.sort === "Newest" ? "selected" : ""}>Newest</option>
            <option ${state.sort === "Rating" ? "selected" : ""}>Rating</option>
          </select>
        </div>
        ${state.type === "servers" ? `
        <div class="cat-checks">
          <label class="cat-check"><input type="checkbox" ${state.verifiedOrg ? "checked" : ""} id="cat-vorg">Verified Org</label>
          <label class="cat-check"><input type="checkbox" ${state.verifiedPub ? "checked" : ""} id="cat-vpub">Verified Publisher</label>
        </div>` : ""}
      </div>

      <div class="cat-list">
        ${filtered.length
          ? filtered.map((i, idx) => renderRow(i, idx)).join("")
          : `<div class="cat-empty">No ${state.type} match “${escape(state.query)}”.</div>`}
      </div>
    `;
    wireCatalog();
  }

  function renderRow(item, idx) {
    const fullName = item.ns ? `${item.ns}/${item.name}` : item.name;
    const tabDef = TYPE_TABS.find(t => t.key === state.type);
    const isDeployed = state.deployed.has(state.type + ":" + fullName);

    const leading = tabDef.rowIcon
      ? `<div class="icon">${tabDef.rowIcon}</div>`
      : `<div class="badge">${(item.ns || item.name).slice(0,2).toUpperCase()}</div>`;

    const tags = (item.tags || []).map(t => `<span class="tag">${escape(t)}</span>`).join("");

    const desc = item.noStar
      ? escape(item.desc || "")
      : (item.rating !== undefined ? `<span class="star">★</span>${item.rating} <span class="sep">·</span> ${escape(item.desc || "")}` : escape(item.desc || ""))
        + (item.team ? ` <span class="sep">·</span> ${escape(item.team)}` : "");

    // Meta line
    const meta = [];
    meta.push(`<span>${escape(item.ver)}</span>`);
    meta.push(`<span>May 22, 2026</span>`);
    if (item.pkgs) {
      meta.push(`<span class="pkg-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        ${item.pkgs}
      </span>`);
    }
    if (item.repo) {
      meta.push(`<span class="repo-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
        Repo
      </span>`);
    }
    if (item.provider) {
      meta.push(`<span class="pkg-icon">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
        ${escape(item.provider)}
      </span>`);
    }
    if (item.model) {
      meta.push(`<span class="pkg-icon">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>
        ${escape(item.model)}
      </span>`);
    }

    return `
      <div class="cat-row" data-idx="${idx}">
        ${leading}
        <div>
          <div class="name">${escape(fullName)}${tags}</div>
          <div class="desc">${desc}</div>
          <div class="meta">${meta.join("")}</div>
        </div>
        <button class="cat-deploy ${isDeployed ? "deployed" : ""}">
          ${isDeployed
            ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Deployed'
            : '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg> Deploy'}
        </button>
      </div>
    `;
  }

  function wireCatalog() {
    root.querySelectorAll(".cat-tab[data-type]").forEach(t => {
      t.addEventListener("click", () => {
        state.type = t.dataset.type;
        state.query = "";
        renderCatalog();
      });
    });
    const search = root.querySelector("#cat-search-input");
    if (search) {
      search.addEventListener("input", (e) => {
        state.query = e.target.value;
        // re-render just the list
        const list = root.querySelector(".cat-list");
        const items = CATALOG[state.type].filter(i => {
          if (!state.query) return true;
          const hay = (i.ns ? i.ns + "/" : "") + i.name + " " + (i.desc || "");
          return hay.toLowerCase().includes(state.query.toLowerCase());
        });
        list.innerHTML = items.length
          ? items.map((i, idx) => renderRow(i, idx)).join("")
          : `<div class="cat-empty">No ${state.type} match “${escape(state.query)}”.</div>`;
        bindDeploys();
      });
    }
    const sort = root.querySelector("#cat-sort");
    if (sort) sort.addEventListener("change", e => { state.sort = e.target.value; });
    const vorg = root.querySelector("#cat-vorg");
    if (vorg) vorg.addEventListener("change", e => { state.verifiedOrg = e.target.checked; });
    const vpub = root.querySelector("#cat-vpub");
    if (vpub) vpub.addEventListener("change", e => { state.verifiedPub = e.target.checked; });
    bindDeploys();
  }

  function bindDeploys() {
    root.querySelectorAll(".cat-row").forEach(row => {
      const btn = row.querySelector(".cat-deploy");
      const idx = parseInt(row.dataset.idx, 10);
      const item = CATALOG[state.type][idx];
      if (!btn || !item) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const fullName = item.ns ? `${item.ns}/${item.name}` : item.name;
        const key = state.type + ":" + fullName;
        if (state.deployed.has(key)) return;
        btn.innerHTML = '<span class="spin"></span> Deploying…';
        setTimeout(() => {
          state.deployed.add(key);
          btn.classList.add("deployed");
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Deployed';
        }, 900);
      });
    });
  }

  // ===== Deployed view =====
  function renderDeployed() {
    const f = state.depFilter;
    const filterFn = (item) => {
      if (f.query && !(item.name + " " + item.provider + " " + item.origin).toLowerCase().includes(f.query.toLowerCase())) return false;
      if (f.provider !== "All providers" && item.provider !== f.provider) return false;
      if (f.origin !== "All origins" && item.origin !== f.origin) return false;
      if (f.status !== "All statuses" && item.status !== f.status.toLowerCase()) return false;
      return true;
    };
    const agents = DEPLOYED.agents.filter(filterFn);
    const servers = DEPLOYED.servers.filter(filterFn);
    const total = agents.length + servers.length;

    root.innerHTML = `
      <div class="dep-head">
        <h3>Deployed Resources</h3>
        <div class="sub">${total} resources running</div>
      </div>
      <div class="dep-filters">
        <div class="cat-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input id="dep-search" type="text" placeholder="Search deployments…" value="${escape(f.query)}">
        </div>
        <div class="right">
          <select class="cat-select" id="dep-provider">
            <option>All providers</option>
            <option ${f.provider === "kubernetes-default" ? "selected" : ""}>kubernetes-default</option>
          </select>
          <select class="cat-select" id="dep-origin">
            <option>All origins</option>
            <option ${f.origin === "managed" ? "selected" : ""}>managed</option>
            <option ${f.origin === "discovered" ? "selected" : ""}>discovered</option>
          </select>
          <select class="cat-select" id="dep-status">
            <option>All statuses</option>
            <option ${f.status === "Running" ? "selected" : ""}>Running</option>
          </select>
        </div>
      </div>
      ${agents.length ? `
        <div class="dep-section-head">Agents <span class="count">${agents.length}</span></div>
        ${agents.map(renderDepRow).join("")}
      ` : ""}
      ${servers.length ? `
        <div class="dep-section-head">Servers <span class="count">${servers.length}</span></div>
        ${servers.map(renderDepRow).join("")}
      ` : ""}
      ${!total ? `<div class="cat-empty">No deployments match these filters.</div>` : ""}
    `;
    wireDeployed();
  }

  function renderDepRow(item) {
    return `
      <div class="dep-row">
        <div class="icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>
        </div>
        <div>
          <div class="name">${escape(item.name)}</div>
          <div class="meta">
            <span>${escape(item.ver)}</span>
            <span>${escape(item.provider)}</span>
            <span>${escape(item.origin)}</span>
            <span class="cal">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${escape(item.date)}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function wireDeployed() {
    const search = root.querySelector("#dep-search");
    if (search) search.addEventListener("input", e => { state.depFilter.query = e.target.value; renderDeployed(); root.querySelector("#dep-search").focus(); });
    ["provider","origin","status"].forEach(k => {
      const el = root.querySelector(`#dep-${k}`);
      if (el) el.addEventListener("change", e => { state.depFilter[k] = e.target.value; renderDeployed(); });
    });
  }

  // ===== App-bar wiring =====
  function renderAppBar() {
    appBar.querySelectorAll(".preview-appbar-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.view === state.view);
    });
  }
  appBar.querySelectorAll(".preview-appbar-tab").forEach(t => {
    t.addEventListener("click", () => {
      state.view = t.dataset.view;
      renderAppBar();
      if (state.view === "catalog") renderCatalog(); else renderDeployed();
    });
  });

  renderAppBar();
  renderCatalog();
})();
