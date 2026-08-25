(() => {
  "use strict";

  const STORAGE_KEY = "rafish.integrationReadiness.lastCheckedAt";
  const workspace = document.getElementById("workspace");
  const moduleTitle = document.getElementById("moduleTitle");

  const esc = value => String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));

  function getRegistry() {
    const registry = window.RAFISH_INTEGRATION_REGISTRY;
    if (!registry || !Array.isArray(registry.adapters)) return null;
    return registry;
  }

  function getLastCheckedAt() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function setLastCheckedAt(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {
      // localStorage is optional; readiness rendering must keep working without it.
    }
  }

  function formatTimestamp(value) {
    if (!value) return "Jeszcze nie sprawdzano";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Brak poprawnej daty";
    return new Intl.DateTimeFormat("pl-PL", {
      dateStyle: "short",
      timeStyle: "medium"
    }).format(date);
  }

  function modeLabel(mode) {
    return ({
      demo: "Demo",
      ready: "Gotowy do konfiguracji",
      connected: "Źródło aktywne",
      error: "Błąd",
      disabled: "Wyłączony"
    })[mode] || "Nieznany";
  }

  function card(adapter) {
    return `
      <article class="integration-readiness-card" data-mode="${esc(adapter.mode)}">
        <div class="integration-readiness-card-head">
          <div>
            <span class="eyebrow">${esc(adapter.area)}</span>
            <h4>${esc(adapter.name)}</h4>
          </div>
          <span class="integration-mode integration-mode-${esc(adapter.mode)}">${esc(modeLabel(adapter.mode))}</span>
        </div>
        <dl class="integration-readiness-meta">
          <div><dt>Źródło danych</dt><dd>${esc(adapter.sourceKind)}</dd></div>
          <div><dt>Transport</dt><dd>${esc(adapter.transport)}</dd></div>
          <div><dt>Polityka sekretów</dt><dd>${esc(adapter.secretPolicy === "none" ? "Brak sekretu" : "Tylko backend")}</dd></div>
        </dl>
        <p><strong>Następny krok:</strong> ${esc(adapter.nextStep)}</p>
      </article>`;
  }

  function syncLegacyTable(registry) {
    const rows = workspace?.querySelectorAll(".ops-table tbody tr") || [];
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const name = cells[0]?.textContent?.trim();
      const adapter = registry.adapters.find(item => item.name === name);
      if (!adapter || cells.length < 4) return;
      cells[2].innerHTML = `<span class="ops-badge integration-mode-${esc(adapter.mode)}">${esc(modeLabel(adapter.mode))}</span>`;
      cells[3].textContent = adapter.transport;
    });
  }

  function renderReadiness() {
    if (!workspace || moduleTitle?.textContent?.trim() !== "Integracje") return;
    if (workspace.querySelector(".source-truth-view")) return;

    const existing = workspace.querySelector("#integrationReadinessPanel");
    if (existing) return;

    const registry = getRegistry();
    const view = workspace.querySelector(".ops-view");
    if (!view) return;

    const actionButton = view.querySelector('[data-ops-action="integration-check"]');
    if (actionButton) {
      actionButton.textContent = "Sprawdź gotowość";
      actionButton.setAttribute("aria-describedby", "integrationReadinessStatus");
    }

    if (!registry) {
      const fallback = document.createElement("section");
      fallback.id = "integrationReadinessPanel";
      fallback.className = "panel integration-readiness-panel";
      fallback.innerHTML = `<div class="panel-body"><strong>Brak rejestru adapterów</strong><p>Pokazano podstawowy widok integracji. Nie oznaczamy żadnego połączenia jako aktywne.</p></div>`;
      view.appendChild(fallback);
      return;
    }

    syncLegacyTable(registry);

    const section = document.createElement("section");
    section.id = "integrationReadinessPanel";
    section.className = "panel integration-readiness-panel";
    section.setAttribute("aria-labelledby", "integrationReadinessTitle");
    section.innerHTML = `
      <header class="panel-header integration-readiness-header">
        <div>
          <h3 id="integrationReadinessTitle">Gotowość adapterów</h3>
          <span>Stan techniczny bez przechowywania sekretów w przeglądarce</span>
        </div>
        <span class="integration-readiness-last-check">Ostatnie sprawdzenie: <strong data-integration-last-check>${esc(formatTimestamp(getLastCheckedAt()))}</strong></span>
      </header>
      <div class="integration-readiness-grid">
        ${registry.adapters.map(card).join("")}
      </div>
      <div id="integrationReadinessStatus" class="integration-readiness-status" role="status" aria-live="polite">
        Dane oznaczone jako „Gotowy do konfiguracji” nie są jeszcze połączeniem live. Sekrety pozostają po stronie przyszłego backendu.
      </div>`;

    const callout = view.querySelector(".ops-callout");
    if (callout) view.insertBefore(section, callout);
    else view.appendChild(section);
  }

  function runLocalReadinessCheck() {
    const registry = getRegistry();
    const status = document.getElementById("integrationReadinessStatus");
    if (!registry || !status) return;

    const invalid = registry.adapters.filter(adapter => {
      const validMode = ["demo", "ready", "connected", "error", "disabled"].includes(adapter.mode);
      const validSecretPolicy = ["server-only", "none"].includes(adapter.secretPolicy);
      return !adapter.id || !adapter.name || !adapter.sourceKind || !validMode || !validSecretPolicy;
    });

    const now = new Date().toISOString();
    setLastCheckedAt(now);
    const target = document.querySelector("[data-integration-last-check]");
    if (target) target.textContent = formatTimestamp(now);

    if (invalid.length) {
      status.textContent = `Wykryto ${invalid.length} niepoprawne wpisy rejestru. Sprawdzenie nie wykonywało połączeń zewnętrznych.`;
      return;
    }

    status.textContent = `Rejestr adapterów jest spójny (${registry.adapters.length} usług). Nie wykonano połączeń zewnętrznych — test dotyczył wyłącznie gotowości lokalnej konfiguracji.`;
  }

  document.addEventListener("click", event => {
    const button = event.target.closest('[data-ops-action="integration-check"]');
    if (!button) return;
    queueMicrotask(runLocalReadinessCheck);
  });

  if (workspace) {
    const observer = new MutationObserver(() => queueMicrotask(renderReadiness));
    observer.observe(workspace, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", renderReadiness, { once: true });
  queueMicrotask(renderReadiness);
})();
