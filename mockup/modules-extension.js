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
      subtabs: ["E-commerce", "Przewoźnicy", "Mapowanie", "Logi"],
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
