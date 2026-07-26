(() => {
  "use strict";

  const STORAGE_ROOT = "7dejvos.demo";
  const CURRENT_USER_KEY = `${STORAGE_ROOT}.currentUser`;
  const CUSTOM_USER_KEY = `${STORAGE_ROOT}.customUser`;
  const COLOR_MODES = ["vivid", "technical"];
  const PALETTE = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink"];

  const BASE_USERS = [
    { id: "admin", name: "Administrator", role: "Pełny widok", initials: "D" },
    { id: "packing", name: "Pakowanie", role: "Stanowisko pakowania", initials: "P" },
    { id: "customer", name: "Obsługa klienta", role: "Wiadomości i zgłoszenia", initials: "O" }
  ];

  const WIDGETS = [
    { id: "metric-critical", title: "Krytyczne zgłoszenia", group: "metrics", color: "red" },
    { id: "metric-decisions", title: "Wymagają decyzji", group: "metrics", color: "orange" },
    { id: "metric-ready", title: "Gotowe do pakowania", group: "metrics", color: "green" },
    { id: "metric-packing", title: "Aktywne pakowanie", group: "metrics", color: "blue" },
    { id: "panel-priorities", title: "Kolejka priorytetów", group: "panels", color: "purple" },
    { id: "panel-activity", title: "Ostatnia aktywność", group: "panels", color: "cyan" }
  ];

  const DEFAULT_ORDERS = {
    admin: {
      metrics: ["metric-critical", "metric-decisions", "metric-ready", "metric-packing"],
      panels: ["panel-priorities", "panel-activity"]
    },
    packing: {
      metrics: ["metric-ready", "metric-packing", "metric-critical", "metric-decisions"],
      panels: ["panel-priorities", "panel-activity"]
    },
    customer: {
      metrics: ["metric-critical", "metric-decisions", "metric-ready", "metric-packing"],
      panels: ["panel-priorities", "panel-activity"]
    }
  };

  let editMode = false;
  let dragWidgetId = null;
  let scheduled = false;

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function getCustomUser() {
    return safeParse(localStorage.getItem(CUSTOM_USER_KEY), null);
  }

  function getUsers() {
    const custom = getCustomUser();
    return custom ? [...BASE_USERS, custom] : BASE_USERS;
  }

  function getCurrentUserId() {
    const requested = localStorage.getItem(CURRENT_USER_KEY) || "admin";
    return getUsers().some(user => user.id === requested) ? requested : "admin";
  }

  function getCurrentUser() {
    return getUsers().find(user => user.id === getCurrentUserId()) || BASE_USERS[0];
  }

  function configKey(userId) {
    return `${STORAGE_ROOT}.dashboard.${userId}`;
  }

  function defaultConfig(userId) {
    const base = DEFAULT_ORDERS[userId] || DEFAULT_ORDERS.admin;
    return {
      colorMode: "vivid",
      hidden: [],
      orders: {
        metrics: [...base.metrics],
        panels: [...base.panels]
      },
      colors: Object.fromEntries(WIDGETS.map(widget => [widget.id, widget.color]))
    };
  }

  function getConfig() {
    const userId = getCurrentUserId();
    const defaults = defaultConfig(userId);
    const saved = safeParse(localStorage.getItem(configKey(userId)), {});
    return {
      colorMode: COLOR_MODES.includes(saved.colorMode) ? saved.colorMode : defaults.colorMode,
      hidden: Array.isArray(saved.hidden) ? saved.hidden : defaults.hidden,
      orders: {
        metrics: Array.isArray(saved.orders?.metrics) ? saved.orders.metrics : defaults.orders.metrics,
        panels: Array.isArray(saved.orders?.panels) ? saved.orders.panels : defaults.orders.panels
      },
      colors: { ...defaults.colors, ...(saved.colors || {}) }
    };
  }

  function saveConfig(config) {
    localStorage.setItem(configKey(getCurrentUserId()), JSON.stringify(config));
  }

  function notify(message) {
    const region = document.getElementById("toastRegion");
    if (!region) return;
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    region.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function esc(value) {
    return String(value).replace(/[&<>'"]/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[char]));
  }

  function identifyDashboardWidgets() {
    const workspace = document.getElementById("workspace");
    if (!workspace) return new Map();

    const heading = [...workspace.querySelectorAll(".page-head h2")]
      .find(node => node.textContent.trim() === "Problemy wymagające uwagi");
    if (!heading) return new Map();

    const nodes = new Map();
    const metricMap = {
      "Krytyczne zgłoszenia": "metric-critical",
      "Wymagają decyzji": "metric-decisions",
      "Gotowe do pakowania": "metric-ready",
      "Aktywne pakowanie": "metric-packing"
    };
    const panelMap = {
      "Kolejka priorytetów": "panel-priorities",
      "Ostatnia aktywność": "panel-activity"
    };

    workspace.querySelectorAll(".metric-card").forEach(card => {
      const label = card.querySelector(":scope > span")?.textContent.trim();
      const id = metricMap[label];
      if (id) {
        card.dataset.dashboardWidget = id;
        nodes.set(id, card);
      }
    });

    workspace.querySelectorAll(".content-grid > .panel").forEach(panel => {
      const label = panel.querySelector(".panel-header h3")?.textContent.trim();
      const id = panelMap[label];
      if (id) {
        panel.dataset.dashboardWidget = id;
        nodes.set(id, panel);
      }
    });

    return nodes;
  }

  function reorderContainer(container, orderedIds) {
    if (!container) return;
    const existing = [...container.children].filter(node => node.dataset.dashboardWidget);
    const current = existing.map(node => node.dataset.dashboardWidget);
    const desired = orderedIds.filter(id => existing.some(node => node.dataset.dashboardWidget === id));
    existing.forEach(node => {
      const id = node.dataset.dashboardWidget;
      if (!desired.includes(id)) desired.push(id);
    });
    if (current.join("|") === desired.join("|")) return;
    desired.forEach(id => {
      const node = existing.find(item => item.dataset.dashboardWidget === id);
      if (node) container.appendChild(node);
    });
  }

  function createWidgetControls(widgetId) {
    const controls = document.createElement("div");
    controls.className = "dashboard-widget-controls";
    controls.dataset.personalizationControl = "true";
    controls.innerHTML = `
      <button class="widget-control-button widget-drag-handle" type="button" draggable="true" data-widget-drag="${widgetId}" title="Przeciągnij panel" aria-label="Przeciągnij panel">↕</button>
      ${["red", "orange", "green", "blue", "purple", "pink"].map(color => `
        <button class="widget-color-dot" type="button" data-widget-color-choice="${color}" data-widget-id="${widgetId}" title="Kolor ${color}" aria-label="Ustaw kolor ${color}"></button>
      `).join("")}
      <button class="widget-control-button" type="button" data-widget-hide="${widgetId}" title="Ukryj panel" aria-label="Ukryj panel">×</button>
    `;
    return controls;
  }

  function ensureEditBanner(workspace) {
    const existing = workspace.querySelector(".dashboard-edit-banner");
    if (!editMode) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const banner = document.createElement("div");
    banner.className = "dashboard-edit-banner";
    banner.dataset.personalizationControl = "true";
    banner.innerHTML = `
      <span>Tryb układania aktywny: przeciągaj panele za uchwyt, zmieniaj kolory albo ukrywaj elementy.</span>
      <button class="button small" type="button" data-layout-edit-toggle>Zakończ układanie</button>
    `;
    const head = workspace.querySelector(".page-head");
    head?.insertAdjacentElement("afterend", banner);
  }

  function applyDashboardPersonalization() {
    scheduled = false;
    const workspace = document.getElementById("workspace");
    const widgets = identifyDashboardWidgets();
    if (!workspace || widgets.size === 0) return;

    const config = getConfig();
    document.body.dataset.dashboardColors = config.colorMode;
    document.body.classList.toggle("dashboard-edit-mode", editMode);

    const metricGrid = workspace.querySelector(".metric-grid");
    const contentGrid = workspace.querySelector(".content-grid");
    reorderContainer(metricGrid, config.orders.metrics);
    reorderContainer(contentGrid, config.orders.panels);

    widgets.forEach((node, id) => {
      node.dataset.widgetColor = PALETTE.includes(config.colors[id]) ? config.colors[id] : "blue";
      node.classList.toggle("is-user-hidden", config.hidden.includes(id));
      const controls = node.querySelector(":scope > .dashboard-widget-controls");
      if (editMode && !controls) node.appendChild(createWidgetControls(id));
      if (!editMode && controls) controls.remove();
    });

    ensureEditBanner(workspace);
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(applyDashboardPersonalization);
  }

  function updateUserUI() {
    const user = getCurrentUser();
    const card = document.querySelector(".user-card");
    if (card) {
      card.id = "sidebarUserMenu";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Zmień użytkownika lub otwórz logowanie demonstracyjne");
      const avatar = card.querySelector(".avatar");
      const name = card.querySelector("strong");
      const role = card.querySelector("span");
      if (avatar) avatar.textContent = user.initials;
      if (name) name.textContent = user.name;
      if (role) role.textContent = user.role;
    }

    const avatar = document.querySelector("#topbarUserButton .topbar-user-avatar");
    const name = document.querySelector("#topbarUserButton .topbar-user-name");
    const role = document.querySelector("#topbarUserButton .topbar-user-role");
    if (avatar) avatar.textContent = user.initials;
    if (name) name.textContent = user.name;
    if (role) role.textContent = user.role;
  }

  function ensureTopbarControls() {
    const actions = document.querySelector(".topbar-actions");
    if (!actions || document.getElementById("topbarPersonalization")) return;

    const controls = document.createElement("div");
    controls.id = "topbarPersonalization";
    controls.className = "topbar-personalization";
    controls.innerHTML = `
      <button class="topbar-layout-button" id="dashboardLayoutButton" type="button" title="Dostosuj dashboard">☷ <span>Układ</span></button>
      <button class="topbar-user-button" id="topbarUserButton" type="button" title="Zmień użytkownika">
        <span class="topbar-user-avatar">D</span>
        <span class="topbar-user-copy"><strong class="topbar-user-name">Administrator</strong><span class="topbar-user-role">Pełny widok</span></span>
      </button>
    `;
    actions.insertBefore(controls, actions.firstChild);
    updateUserUI();
  }

  function closeOverlay() {
    document.querySelector(".personalization-overlay")?.remove();
  }

  function openLayoutDialog() {
    closeOverlay();
    const config = getConfig();
    const user = getCurrentUser();
    const overlay = document.createElement("div");
    overlay.className = "personalization-overlay";
    overlay.innerHTML = `
      <section class="personalization-dialog" role="dialog" aria-modal="true" aria-labelledby="layoutDialogTitle">
        <header class="personalization-header">
          <div><span class="eyebrow">Profil: ${esc(user.name)}</span><h2 id="layoutDialogTitle">Dostosuj dashboard</h2></div>
          <button class="icon-button" type="button" data-close-personalization aria-label="Zamknij">×</button>
        </header>
        <div class="personalization-body">
          <section class="personalization-section">
            <h3>Widoczne panele</h3>
            <p>Ustawienia są zapisywane lokalnie oddzielnie dla każdego użytkownika demonstracyjnego.</p>
            <div class="personalization-grid">
              ${WIDGETS.map(widget => `
                <div class="personalization-card">
                  <label><input type="checkbox" data-widget-visible="${widget.id}" ${config.hidden.includes(widget.id) ? "" : "checked"}> ${esc(widget.title)}</label>
                </div>
              `).join("")}
            </div>
          </section>
          <section class="personalization-section">
            <h3>Kolorystyka</h3>
            <div class="personalization-actions">
              <button class="button ${config.colorMode === "vivid" ? "primary" : ""}" type="button" data-color-mode="vivid">Wyraziste kolory</button>
              <button class="button ${config.colorMode === "technical" ? "primary" : ""}" type="button" data-color-mode="technical">Techniczna neutralna</button>
            </div>
          </section>
          <section class="personalization-section">
            <h3>Kolejność paneli</h3>
            <p>Włącz tryb układania, zamknij okno i przeciągaj panele za uchwyt ↕.</p>
            <div class="personalization-actions">
              <button class="button primary" type="button" data-layout-edit-toggle>${editMode ? "Wyłącz przesuwanie" : "Włącz przesuwanie"}</button>
              <button class="button" type="button" data-layout-reset>Przywróć układ profilu</button>
            </div>
          </section>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
  }

  function openUserDialog() {
    closeOverlay();
    const currentId = getCurrentUserId();
    const overlay = document.createElement("div");
    overlay.className = "personalization-overlay";
    overlay.innerHTML = `
      <section class="personalization-dialog is-compact" role="dialog" aria-modal="true" aria-labelledby="userDialogTitle">
        <header class="personalization-header">
          <div><span class="eyebrow">Profile robocze</span><h2 id="userDialogTitle">Użytkownik i logowanie</h2></div>
          <button class="icon-button" type="button" data-close-personalization aria-label="Zamknij">×</button>
        </header>
        <div class="personalization-body">
          <section class="personalization-section">
            <h3>Przełącz użytkownika</h3>
            <div class="user-switch-list">
              ${getUsers().map(user => `
                <button class="user-switch-item ${user.id === currentId ? "is-active" : ""}" type="button" data-switch-user="${esc(user.id)}">
                  <span class="topbar-user-avatar">${esc(user.initials)}</span>
                  <span><strong>${esc(user.name)}</strong><span>${esc(user.role)}</span></span>
                  <span class="user-role-chip">${user.id === currentId ? "aktywny" : "przełącz"}</span>
                </button>
              `).join("")}
            </div>
          </section>
          <section class="personalization-section">
            <h3>Logowanie demonstracyjne</h3>
            <div class="demo-login-note">To jest makieta interfejsu. Formularz nie uwierzytelnia użytkownika, nie wysyła hasła i nie nadaje prawdziwych uprawnień.</div>
            <form class="demo-login-form" id="demoLoginForm">
              <label>Nazwa użytkownika<input name="displayName" required maxlength="32" placeholder="np. Kierownik zmiany"></label>
              <label>Profil pracy<select name="role"><option value="Pełny widok">Administrator</option><option value="Stanowisko pakowania">Pakowanie</option><option value="Wiadomości i zgłoszenia">Obsługa klienta</option></select></label>
              <label>Hasło demonstracyjne<input name="password" type="password" placeholder="nie jest sprawdzane" autocomplete="off"></label>
              <div class="personalization-actions" style="align-self:end"><button class="button primary" type="submit">Wejdź do makiety</button><button class="button" type="button" data-demo-logout>Wyloguj demo</button></div>
            </form>
          </section>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
  }

  function switchUser(userId) {
    if (!getUsers().some(user => user.id === userId)) return;
    localStorage.setItem(CURRENT_USER_KEY, userId);
    editMode = false;
    updateUserUI();
    closeOverlay();
    scheduleApply();
    notify(`Aktywny profil: ${getCurrentUser().name}.`);
  }

  function saveCurrentOrder(group, container) {
    const config = getConfig();
    config.orders[group] = [...container.querySelectorAll(":scope > [data-dashboard-widget]")]
      .map(node => node.dataset.dashboardWidget);
    saveConfig(config);
  }

  function handleDragOver(event) {
    if (!dragWidgetId || !editMode) return;
    const target = event.target.closest("[data-dashboard-widget]");
    if (!target || target.dataset.dashboardWidget === dragWidgetId) return;
    const source = document.querySelector(`[data-dashboard-widget="${dragWidgetId}"]`);
    if (!source || source.parentElement !== target.parentElement) return;
    event.preventDefault();
    const rect = target.getBoundingClientRect();
    const before = target.parentElement.classList.contains("metric-grid")
      ? event.clientX < rect.left + rect.width / 2
      : event.clientY < rect.top + rect.height / 2;
    target.parentElement.insertBefore(source, before ? target : target.nextSibling);
  }

  document.addEventListener("dragstart", event => {
    const handle = event.target.closest("[data-widget-drag]");
    if (!handle || !editMode) return;
    dragWidgetId = handle.dataset.widgetDrag;
    const widget = handle.closest("[data-dashboard-widget]");
    widget?.classList.add("is-dragging");
    event.dataTransfer?.setData("text/plain", dragWidgetId);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  });

  document.addEventListener("dragover", handleDragOver);

  document.addEventListener("drop", event => {
    if (!dragWidgetId || !editMode) return;
    const source = document.querySelector(`[data-dashboard-widget="${dragWidgetId}"]`);
    if (!source) return;
    event.preventDefault();
    const group = source.parentElement?.classList.contains("metric-grid") ? "metrics" : "panels";
    saveCurrentOrder(group, source.parentElement);
    notify("Kolejność paneli została zapisana dla użytkownika.");
  });

  document.addEventListener("dragend", () => {
    document.querySelectorAll(".is-dragging").forEach(node => node.classList.remove("is-dragging"));
    dragWidgetId = null;
  });

  document.addEventListener("click", event => {
    const personalControl = event.target.closest(
      "#dashboardLayoutButton, #topbarUserButton, #sidebarUserMenu, [data-close-personalization], [data-switch-user], [data-layout-edit-toggle], [data-layout-reset], [data-color-mode], [data-widget-hide], [data-widget-color-choice], [data-widget-drag], [data-demo-logout]"
    );
    if (personalControl || event.target.classList.contains("personalization-overlay")) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    if (event.target.closest("#dashboardLayoutButton")) {
      openLayoutDialog();
      return;
    }
    if (event.target.closest("#topbarUserButton, #sidebarUserMenu")) {
      openUserDialog();
      return;
    }
    if (event.target.closest("[data-close-personalization]")) {
      closeOverlay();
      return;
    }
    if (event.target.classList.contains("personalization-overlay")) {
      closeOverlay();
      return;
    }

    const switchButton = event.target.closest("[data-switch-user]");
    if (switchButton) {
      switchUser(switchButton.dataset.switchUser);
      return;
    }

    const editButton = event.target.closest("[data-layout-edit-toggle]");
    if (editButton) {
      editMode = !editMode;
      closeOverlay();
      scheduleApply();
      notify(editMode ? "Włączono przesuwanie paneli." : "Zakończono układanie paneli.");
      return;
    }

    const resetButton = event.target.closest("[data-layout-reset]");
    if (resetButton) {
      localStorage.removeItem(configKey(getCurrentUserId()));
      closeOverlay();
      scheduleApply();
      notify("Przywrócono domyślny układ profilu.");
      return;
    }

    const colorMode = event.target.closest("[data-color-mode]");
    if (colorMode) {
      const config = getConfig();
      config.colorMode = colorMode.dataset.colorMode;
      saveConfig(config);
      closeOverlay();
      scheduleApply();
      notify("Zmieniono sposób kolorowania dashboardu.");
      return;
    }

    const hideButton = event.target.closest("[data-widget-hide]");
    if (hideButton) {
      const config = getConfig();
      if (!config.hidden.includes(hideButton.dataset.widgetHide)) config.hidden.push(hideButton.dataset.widgetHide);
      saveConfig(config);
      scheduleApply();
      return;
    }

    const colorButton = event.target.closest("[data-widget-color-choice]");
    if (colorButton) {
      const config = getConfig();
      config.colors[colorButton.dataset.widgetId] = colorButton.dataset.widgetColorChoice;
      saveConfig(config);
      scheduleApply();
      return;
    }

    if (event.target.closest("[data-widget-drag]")) return;

    const logout = event.target.closest("[data-demo-logout]");
    if (logout) {
      localStorage.removeItem(CUSTOM_USER_KEY);
      localStorage.setItem(CURRENT_USER_KEY, "admin");
      updateUserUI();
      closeOverlay();
      scheduleApply();
      notify("Zakończono sesję demonstracyjną. Aktywny: Administrator.");
    }
  }, true);

  document.addEventListener("change", event => {
    const checkbox = event.target.closest("[data-widget-visible]");
    if (!checkbox) return;
    const config = getConfig();
    const id = checkbox.dataset.widgetVisible;
    config.hidden = checkbox.checked
      ? config.hidden.filter(item => item !== id)
      : [...new Set([...config.hidden, id])];
    saveConfig(config);
    scheduleApply();
  });

  document.addEventListener("submit", event => {
    if (event.target.id !== "demoLoginForm") return;
    event.preventDefault();
    const form = new FormData(event.target);
    const name = String(form.get("displayName") || "Użytkownik").trim().slice(0, 32) || "Użytkownik";
    const role = String(form.get("role") || "Pełny widok");
    const custom = {
      id: "custom",
      name,
      role,
      initials: name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "U"
    };
    localStorage.setItem(CUSTOM_USER_KEY, JSON.stringify(custom));
    localStorage.setItem(CURRENT_USER_KEY, custom.id);
    updateUserUI();
    closeOverlay();
    scheduleApply();
    notify(`Uruchomiono demonstracyjny profil: ${name}.`);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeOverlay();
    const card = event.target.closest?.("#sidebarUserMenu");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openUserDialog();
    }
  });

  const workspace = document.getElementById("workspace");
  if (workspace) {
    new MutationObserver(scheduleApply).observe(workspace, { childList: true, subtree: true });
  }

  ensureTopbarControls();
  updateUserUI();
  scheduleApply();
})();
