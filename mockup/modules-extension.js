(() => {
  "use strict";

  const modules = {
    messages: {
      title: "Wiadomości",
      subtabs: ["Wszystkie", "Do odpowiedzi", "Wymagają decyzji"],
      description: "Wiadomości klientów przetwarzane przez wyspecjalizowanego agenta obsługi klienta.",
      areas: ["Wiadomości powiązane z zamówieniami", "Zgłoszenia wymagające decyzji", "Propozycje odpowiedzi agenta"]
    },
    routes: {
      title: "Mapa i trasy",
      subtabs: ["Mapa", "Trasy", "Punkty pozyskania", "Palety"],
      description: "Planowanie dostaw ryb, punktów pozyskiwania oraz możliwych dostaw paletowych po drodze.",
      areas: ["Zamówienia ryb i palet", "Punkty pozyskiwania ryb", "Przygotowanie danych dla kierowcy"]
    },
    products: {
      title: "Produkty",
      subtabs: ["Katalog", "Stany", "Pakowanie", "Problemy"],
      description: "Operacyjny panel produktów zintegrowany docelowo z danymi PrestaShop.",
      areas: ["Dane produktów i wariantów", "Stany i rezerwacje", "Wymagania pakowania i wysyłki"]
    },
    agents: {
      title: "Agenci",
      subtabs: ["Lista agentów", "Konfiguracja", "Testy", "Historia", "Błędy"],
      description: "Miejsce zarządzania, testowania i rozwijania agentów 7DEJV.os.",
      areas: ["Zakresy odpowiedzialności", "Instrukcje, wersje i testy", "Historia działań i błędów"]
    },
    integrations: {
      title: "Integracje",
      subtabs: ["Źródła prawdy", "E-commerce", "Przewoźnicy", "Mapowanie", "Logi"],
      description: "Wspólny panel przyszłych integracji marketplace, PrestaShop i przewoźników.",
      areas: ["Platformy e-commerce", "Przewoźnicy i usługi", "Statusy połączeń i logi"]
    },
    settings: {
      title: "Ustawienia",
      subtabs: ["Ogólne", "Użytkownicy", "Statusy", "Motywy", "Aktualizacje"],
      description: "Konfiguracja panelu, użytkowników, statusów wewnętrznych, motywów i aktualizacji.",
      areas: ["Ustawienia systemowe", "Statusy, role i personalizacja", "Wersja systemu i aktualizacje"]
    }
  };

  const nav = document.getElementById("mainNav");
  const moduleTitle = document.getElementById("moduleTitle");
  const subnav = document.getElementById("subnav");
  const tabs = document.getElementById("workspaceTabs");
  const workspace = document.getElementById("workspace");

  let activeModule = null;
  let activeSubtab = null;

  function esc(value) {
    return String(value).replace(/[&<>'"]/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[char]));
  }

  function resetExtensionSelection() {
    activeModule = null;
    activeSubtab = null;
    nav?.querySelectorAll("[data-extension-module]").forEach(button => button.classList.remove("is-active"));
  }

  function renderSubtabs(moduleId) {
    const module = modules[moduleId];
    if (!module || !subnav) return;

    subnav.innerHTML = module.subtabs.map(label => `
      <button type="button" class="${label === activeSubtab ? "is-active" : ""}" data-extension-subtab="${esc(label)}">
        ${esc(label)}
      </button>
    `).join("");
  }

  function renderModuleTab(moduleId) {
    const module = modules[moduleId];
    if (!module || !tabs) return;

    tabs.innerHTML = `
      <div class="workspace-tab is-active" role="button" tabindex="0" aria-current="page">
        <span class="workspace-tab-label">◆ ${esc(module.title)}</span>
      </div>
    `;
  }

  function renderModuleWorkspace(moduleId) {
    const module = modules[moduleId];
    if (!module || !workspace) return;

    if (moduleId === "integrations" && activeSubtab === "Źródła prawdy") {
      renderSourceOfTruth();
      return;
    }

    workspace.innerHTML = `
      <div class="module-placeholder">
        <div class="page-head">
          <div>
            <span class="eyebrow">Moduł główny 7DEJV.os</span>
            <h2>${esc(module.title)}</h2>
            <p>${esc(module.description)}</p>
          </div>
          <span class="module-placeholder-status">Szkielet modułu — bez integracji</span>
        </div>

        <div class="module-placeholder-grid">
          <section class="module-placeholder-card">
            <h3>Aktualna podzakładka</h3>
            <p>Wybrano obszar:</p>
            <strong>${esc(activeSubtab)}</strong>
            <p>Na tym etapie działa nawigacja. Funkcje biznesowe będą dodawane kolejno po zatwierdzeniu układu.</p>
          </section>

          <section class="module-placeholder-card">
            <h3>Planowany zakres</h3>
            <ul>
              ${module.areas.map(area => `<li>${esc(area)}</li>`).join("")}
            </ul>
          </section>

          <section class="module-placeholder-card">
            <h3>Następny krok</h3>
            <p>Ten moduł nie wykonuje jeszcze żadnych operacji zewnętrznych i nie zapisuje danych.</p>
            <strong>Najpierw ustalimy jego dokładny układ i pierwszy przepływ pracy.</strong>
          </section>
        </div>
      </div>
    `;
  }

  function renderSourceOfTruth() {
    const source = window.RAFISH_GITHUB_SOURCE;
    if (!source) {
      workspace.innerHTML = `<div class="module-placeholder"><section class="panel"><div class="panel-body"><strong>Brak migawki GitHub.</strong><p>Dane źródłowe nie zostały załadowane.</p></div></section></div>`;
      return;
    }

    const summary = source.summary;
    const visibilityLabel = value => value === "private" ? "Prywatne" : "Publiczne";
    const statusLabel = value => ({
      canonical: "Kanoniczne",
      primary: "Główne źródło",
      secondary: "Źródło pomocnicze",
      reference: "Referencyjne",
      empty: "Puste",
      unclassified: "Do klasyfikacji"
    }[value] || value);

    workspace.innerHTML = `
      <div class="source-truth-view">
        <div class="page-head">
          <div><span class="eyebrow">GitHub online first</span><h2>Źródło prawdy systemu</h2><p>Dane pochodzą z aktualnego odczytu repozytoriów właściciela ${esc(source.owner)}. Zamówienia i dane klientów w pozostałych widokach nadal są demonstracyjne.</p></div>
          <span class="source-snapshot">Stan: ${esc(source.generatedAtLabel)}</span>
        </div>

        <div class="source-summary-grid">
          <article><span>Repozytoria</span><strong>${summary.repositories}</strong><em>${summary.publicRepos} publicznych · ${summary.privateRepos} prywatnych</em></article>
          <article><span>Pliki na main</span><strong>${summary.files}</strong><em>pełny skan drzew GitHub</em></article>
          <article><span>Kanoniczne</span><strong>${summary.canonical}</strong><em>7dejv-agent-os</em></article>
          <article class="has-warning"><span>Do obsługi</span><strong>${summary.openFindings}</strong><em>rozbieżności i braki</em></article>
        </div>

        <div class="source-layout">
          <section class="panel source-table-panel">
            <header class="panel-header"><div><h3>Repozytoria</h3><span>Gałąź domyślna: main, o ile repo nie jest puste</span></div></header>
            <div class="table-wrap"><table class="data-table source-table"><thead><tr><th>Repozytorium</th><th>Rola</th><th>Dostęp</th><th>Pliki</th><th>Indeks kodu</th></tr></thead><tbody>
              ${source.repositories.map(repo => `<tr><td><strong>${esc(repo.name)}</strong>${repo.note ? `<span>${esc(repo.note)}</span>` : ""}</td><td><span class="source-role source-role-${esc(repo.role)}">${esc(statusLabel(repo.role))}</span></td><td>${esc(visibilityLabel(repo.visibility))}</td><td><strong>${repo.files}</strong></td><td><span class="source-index ${repo.indexed ? "is-ready" : ""}">${repo.indexed ? "Gotowy" : "Brak"}</span></td></tr>`).join("")}
            </tbody></table></div>
          </section>

          <aside class="panel source-findings">
            <header class="panel-header"><div><h3>Ustalenia audytu</h3><span>Tylko fakty potwierdzone w GitHub</span></div></header>
            <div class="panel-body">
              ${source.findings.map((finding, index) => `<article><span>${index + 1}</span><div><strong>${esc(finding.title)}</strong><p>${esc(finding.detail)}</p></div></article>`).join("")}
            </div>
          </aside>
        </div>
      </div>`;
  }

  function openModule(moduleId, requestedSubtab) {
    const module = modules[moduleId];
    if (!module) return;

    activeModule = moduleId;
    activeSubtab = requestedSubtab && module.subtabs.includes(requestedSubtab)
      ? requestedSubtab
      : module.subtabs[0];

    nav?.querySelectorAll(".nav-item").forEach(button => button.classList.remove("is-active"));
    nav?.querySelector(`[data-extension-module="${moduleId}"]`)?.classList.add("is-active");

    if (moduleTitle) moduleTitle.textContent = module.title;
    renderSubtabs(moduleId);
    renderModuleTab(moduleId);
    renderModuleWorkspace(moduleId);
  }

  document.addEventListener("click", event => {
    const extensionButton = event.target.closest("[data-extension-module]");
    if (extensionButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openModule(extensionButton.dataset.extensionModule);
      return;
    }

    const extensionSubtab = event.target.closest("[data-extension-subtab]");
    if (extensionSubtab && activeModule) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openModule(activeModule, extensionSubtab.dataset.extensionSubtab);
      return;
    }

    if (event.target.closest("[data-module], [data-tab-id], [data-open-order], [data-open-ticket], [data-open-packing], [data-module-jump]")) {
      resetExtensionSelection();
    }
  }, true);

  document.getElementById("globalSearch")?.addEventListener("keydown", event => {
    if (event.key === "Enter") resetExtensionSelection();
  }, true);
})();
