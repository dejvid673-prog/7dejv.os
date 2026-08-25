(() => {
  "use strict";

  const modules = {
    messages: { title: "Wiadomości", subtabs: ["Wszystkie", "Do odpowiedzi", "Wymagają decyzji"] },
    routes: { title: "Mapa i trasy", subtabs: ["Mapa", "Trasy", "Punkty pozyskania", "Palety"] },
    products: { title: "Produkty", subtabs: ["Katalog", "Stany", "Pakowanie", "Problemy"] },
    agents: { title: "Agenci", subtabs: ["Lista agentów", "Konfiguracja", "Testy", "Historia", "Błędy"] },
    integrations: { title: "Integracje", subtabs: ["Źródła prawdy", "E-commerce", "Przewoźnicy", "Mapowanie", "Logi"] },
    settings: { title: "Ustawienia", subtabs: ["Ogólne", "Użytkownicy", "Statusy", "Motywy", "Aktualizacje"] }
  };

  const data = {
    messages: [
      ["MSG-1042", "Anna Kowalska", "Allegro", "Zmiana adresu przed wysyłką", "Do odpowiedzi", "8 min", "AL-240825-018"],
      ["MSG-1041", "Marek Nowak", "Sklep", "Czy kredę można stosować przy jesiotrach?", "Wymaga decyzji", "23 min", "PS-8104"],
      ["MSG-1039", "Piotr Lis", "E-mail", "Prośba o fakturę", "Gotowa odpowiedź", "41 min", "PS-8098"],
      ["MSG-1038", "Katarzyna Wrona", "ERLI", "Kiedy paczka zostanie nadana?", "Do odpowiedzi", "1 h", "ER-1842"]
    ],
    routes: [
      ["TR-12", "Mazowieckie — ryby", 9, 286, "41 przesyłek", "Gotowa"],
      ["TR-13", "Lubelskie — ryby", 7, 331, "28 przesyłek", "Do optymalizacji"],
      ["TR-14", "Palety zachód", 4, 428, "5 palet", "Szkic"]
    ],
    products: [
      ["KR-GR-24", "Kreda granulowana 24 kg", 128, 14, "5900000002411", "OK"],
      ["KR-BR-24", "Kreda bryły i grudy 24 kg", 73, 9, "5900000002428", "OK"],
      ["KAR-TON-19", "Karma tonąca 19 kg", 31, 18, "Brak", "Uwaga"],
      ["BAK-500", "Bakterie do oczek 500 g", 56, 4, "5900000005009", "Do publikacji"]
    ],
    agents: [
      ["Product Owner / Architekt", "Wymagania, architektura, priorytety", "Aktywny", 3, 98],
      ["UX/UI Designer", "Design system, przepływy, responsywność", "Aktywny", 2, 96],
      ["Full-Stack Developer", "Frontend, integracje, adaptery API", "Aktywny", 5, 94],
      ["Content Writer", "Treści, etykiety UI, SEO", "Gotowy", 1, 97],
      ["QA Tester", "Testy, WCAG, regresja", "Aktywny", 4, 95]
    ],
    integrations: [
      ["PrestaShop", "E-commerce", "Do podłączenia", "REST / Webservice"],
      ["Allegro", "Marketplace", "Do podłączenia", "OAuth2 + REST"],
      ["ERLI", "Marketplace", "Planowane", "API"],
      ["DPD", "Przewoźnik", "Test API OK", "REST"],
      ["n8n", "Automatyzacje", "Planowane", "Webhook / REST"],
      ["GitHub", "Źródło prawdy", "Aktywne", "Snapshot repo"]
    ]
  };

  const nav = document.getElementById("mainNav");
  const moduleTitle = document.getElementById("moduleTitle");
  const subnav = document.getElementById("subnav");
  const tabs = document.getElementById("workspaceTabs");
  const workspace = document.getElementById("workspace");
  let activeModule = null;
  let activeSubtab = null;

  const esc = value => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const badge = value => `<span class="ops-badge ops-badge-${esc(String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">${esc(value)}</span>`;
  const metric = (label, value, note) => `<article class="ops-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong><em>${esc(note)}</em></article>`;
  const empty = text => `<section class="ops-empty"><strong>Brak pozycji</strong><p>${esc(text)}</p></section>`;

  function pageHead(kicker, title, description, action = "") {
    return `<div class="page-head ops-page-head"><div><span class="eyebrow">${esc(kicker)}</span><h2>${esc(title)}</h2><p>${esc(description)}</p></div>${action}</div>`;
  }

  function table(headers, rows) {
    return `<div class="ops-table-wrap"><table class="data-table ops-table"><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
  }

  function renderSubtabs() {
    subnav.innerHTML = modules[activeModule].subtabs.map(label => `<button type="button" class="${label === activeSubtab ? "is-active" : ""}" data-extension-subtab="${esc(label)}">${esc(label)}</button>`).join("");
  }

  function renderModuleTab() {
    tabs.innerHTML = `<div class="workspace-tab is-active" role="button" tabindex="0" aria-current="page"><span class="workspace-tab-label">◆ ${esc(modules[activeModule].title)} · ${esc(activeSubtab)}</span></div>`;
  }

  function renderMessages() {
    const filter = activeSubtab === "Do odpowiedzi" ? "Do odpowiedzi" : activeSubtab === "Wymagają decyzji" ? "Wymaga decyzji" : null;
    const rows = data.messages.filter(x => !filter || x[4] === filter);
    workspace.innerHTML = `<div class="ops-view">${pageHead("Centrum komunikacji", "Wiadomości klientów", "Jedna kolejka dla Allegro, sklepu, ERLI i e-maila. Agent przygotowuje odpowiedź, człowiek zatwierdza decyzje ryzykowne.", `<button class="primary-button" data-ops-action="new-message" type="button">+ Nowa wiadomość</button>`)}
      <div class="ops-metrics">${metric("Do odpowiedzi", 2, "najstarsza 1 h")}${metric("Decyzje", 1, "wymaga operatora")}${metric("Gotowe", 1, "odpowiedź agenta")}${metric("SLA", "94%", "dzisiaj")}</div>
      <section class="panel"><header class="panel-header"><div><h3>Kolejka</h3><span>${rows.length} widoczne zgłoszenia</span></div><input class="ops-filter" data-ops-filter="messages" placeholder="Filtruj klienta, kanał, zamówienie…"></header>
      ${rows.length ? table(["ID", "Klient", "Kanał", "Temat", "Status", "Wiek", "Zamówienie"], rows.map(r => `<tr data-search-row="${esc(r.join(" "))}"><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${badge(r[2])}</td><td><button class="ops-link" data-ops-action="open-message" data-id="${esc(r[0])}" type="button">${esc(r[3])}</button></td><td>${badge(r[4])}</td><td>${esc(r[5])}</td><td>${esc(r[6])}</td></tr>`)) : empty("Brak wiadomości w tym filtrze.")}</section></div>`;
  }

  function renderRoutes() {
    if (activeSubtab === "Mapa") {
      workspace.innerHTML = `<div class="ops-view">${pageHead("Planowanie logistyki", "Mapa operacyjna", "Widok przygotowany pod przyszły adapter map i optymalizację tras. Punkty i trasy pozostają obecnie demonstracyjne.", `<button class="primary-button" data-ops-action="optimize" type="button">Optymalizuj trasy</button>`)}
      <div class="ops-route-layout"><section class="ops-map-mock"><div class="ops-map-grid"></div><span class="ops-pin p1">1</span><span class="ops-pin p2">2</span><span class="ops-pin p3">3</span><span class="ops-pin p4">4</span><div class="ops-map-legend"><strong>9 punktów</strong><span>286 km · trasa TR-12</span></div></section><aside class="panel"><header class="panel-header"><div><h3>Najbliższa trasa</h3><span>Mazowieckie — ryby</span></div></header><div class="panel-body ops-stack"><p><strong>41 przesyłek</strong> do obsługi w 9 punktach.</p><p>Priorytet: minimalizacja czasu transportu żywych ryb i kontrola okien dostaw.</p><button class="secondary-button" data-ops-action="route-details" type="button">Otwórz plan kierowcy</button></div></aside></div></div>`;
      return;
    }
    workspace.innerHTML = `<div class="ops-view">${pageHead("Planowanie logistyki", activeSubtab, "Trasy, punkty pozyskania i palety w jednym miejscu.", `<button class="primary-button" data-ops-action="new-route" type="button">+ Nowa trasa</button>`)}<section class="panel">${table(["ID", "Nazwa", "Punkty", "Kilometry", "Ładunek", "Status"], data.routes.map(r => `<tr><td><strong>${r[0]}</strong></td><td>${esc(r[1])}</td><td>${r[2]}</td><td>${r[3]} km</td><td>${esc(r[4])}</td><td>${badge(r[5])}</td></tr>`))}</section></div>`;
  }

  function renderProducts() {
    const onlyProblems = activeSubtab === "Problemy";
    const rows = data.products.filter(r => !onlyProblems || r[5] !== "OK");
    workspace.innerHTML = `<div class="ops-view">${pageHead("Katalog operacyjny", "Produkty", "Kontrola SKU, EAN, stanów, rezerwacji i gotowości ofertowej przed publikacją do kanałów sprzedaży.", `<button class="primary-button" data-ops-action="audit-products" type="button">Uruchom audyt</button>`)}
      <div class="ops-metrics">${metric("SKU", data.products.length, "widoczne demo")}${metric("Problemy", 2, "EAN / publikacja")}${metric("Rezerwacje", 45, "szt. w zamówieniach")}${metric("Pokrycie EAN", "75%", "3 z 4")}</div>
      <section class="panel"><header class="panel-header"><div><h3>${esc(activeSubtab)}</h3><span>Źródło docelowe: PrestaShop</span></div><input class="ops-filter" data-ops-filter="products" placeholder="Filtruj SKU lub nazwę…"></header>${table(["SKU", "Produkt", "Stan", "Rezerwacje", "EAN", "Kontrola"], rows.map(r => `<tr data-search-row="${esc(r.join(" "))}"><td><strong>${esc(r[0])}</strong></td><td><button class="ops-link" data-ops-action="open-product" data-id="${esc(r[0])}" type="button">${esc(r[1])}</button></td><td>${r[2]}</td><td>${r[3]}</td><td>${esc(r[4])}</td><td>${badge(r[5])}</td></tr>`))}</section></div>`;
  }

  function renderAgents() {
    workspace.innerHTML = `<div class="ops-view">${pageHead("Agent OS", "Zespół agentów", "Pięć ról pracuje jako jeden pipeline: wymaganie → projekt → implementacja → treść → test.", `<button class="primary-button" data-ops-action="run-agent-cycle" type="button">Uruchom cykl QA</button>`)}
      <div class="ops-agent-grid">${data.agents.map((a, i) => `<article class="ops-agent-card"><div class="ops-agent-icon">${i + 1}</div><div><span class="eyebrow">Agent ${i + 1}</span><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p></div><div class="ops-agent-stats"><span>${badge(a[2])}</span><strong>${a[3]} zadań</strong><em>${a[4]}% jakości</em></div><button class="secondary-button" data-ops-action="agent-details" data-id="${esc(a[0])}" type="button">Szczegóły</button></article>`).join("")}</div>
      <section class="panel"><header class="panel-header"><div><h3>Pipeline wdrożeniowy</h3><span>Bieżący etap: domknięcie panelu operacyjnego</span></div></header><div class="panel-body ops-pipeline"><span class="done">Architektura</span><b>→</b><span class="done">UX/UI</span><b>→</b><span class="active">Implementacja</span><b>→</b><span>Content</span><b>→</b><span>QA</span></div></section></div>`;
  }

  function renderIntegrations() {
    if (activeSubtab === "Źródła prawdy") return renderSourceOfTruth();
    const rows = data.integrations.filter(r => activeSubtab === "E-commerce" ? ["E-commerce", "Marketplace"].includes(r[1]) : activeSubtab === "Przewoźnicy" ? r[1] === "Przewoźnik" : true);
    workspace.innerHTML = `<div class="ops-view">${pageHead("Adaptery systemowe", "Integracje", "Warstwa statusów i konfiguracji. Sekrety nie są przechowywane w makiecie ani w repozytorium.", `<button class="primary-button" data-ops-action="integration-check" type="button">Sprawdź połączenia</button>`)}
      <section class="panel">${table(["Usługa", "Obszar", "Status", "Tryb"], rows.map(r => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${badge(r[2])}</td><td>${esc(r[3])}</td></tr>`))}</section>
      <div class="ops-callout"><strong>Zasada integracji</strong><p>UI korzysta z adapterów. Dane demo można podmienić na API bez zmiany struktury modułów.</p></div></div>`;
  }

  function renderSettings() {
    const saved = JSON.parse(localStorage.getItem("rafishOpsSettings") || "{}");
    workspace.innerHTML = `<div class="ops-view">${pageHead("Konfiguracja", "Ustawienia", "Ustawienia demonstracyjne są zapisywane lokalnie w tej przeglądarce.")}
      <div class="ops-settings-grid"><section class="panel"><header class="panel-header"><div><h3>Panel</h3><span>Ogólne zachowanie interfejsu</span></div></header><div class="panel-body ops-form"><label>Nazwa workspace<input id="opsWorkspaceName" value="${esc(saved.workspaceName || "RaFish Ops")}"></label><label><input id="opsCompactMode" type="checkbox" ${saved.compact ? "checked" : ""}> Tryb kompaktowy tabel</label><label><input id="opsConfirmActions" type="checkbox" ${saved.confirm !== false ? "checked" : ""}> Potwierdzaj działania operacyjne</label><button class="primary-button" data-ops-action="save-settings" type="button">Zapisz ustawienia</button></div></section>
      <section class="panel"><header class="panel-header"><div><h3>Role i bezpieczeństwo</h3><span>Docelowo po stronie backendu</span></div></header><div class="panel-body ops-stack"><p><strong>Administrator</strong> — pełny zakres.</p><p><strong>Pakowanie</strong> — zamówienia, pakowanie, etykiety.</p><p><strong>Obsługa klienta</strong> — wiadomości i podgląd zamówień.</p><div class="ops-callout"><strong>Ważne</strong><p>Makieta nie implementuje uwierzytelnienia serwerowego.</p></div></div></section></div></div>`;
  }

  function renderSourceOfTruth() {
    const source = window.RAFISH_GITHUB_SOURCE;
    if (!source) { workspace.innerHTML = `<div class="ops-view">${empty("Brak migawki GitHub.")}</div>`; return; }
    const s = source.summary;
    workspace.innerHTML = `<div class="ops-view">${pageHead("GitHub online first", "Źródło prawdy systemu", `Migawka repozytoriów właściciela ${source.owner}. Dane zamówień i klientów pozostają demonstracyjne.`, `<span class="source-snapshot">Stan: ${esc(source.generatedAtLabel)}</span>`)}
      <div class="ops-metrics">${metric("Repozytoria", s.repositories, `${s.publicRepos} publicznych · ${s.privateRepos} prywatnych`)}${metric("Pliki na main", s.files, "pełny skan")}${metric("Kanoniczne", s.canonical, "7dejv-agent-os")}${metric("Do obsługi", s.openFindings, "rozbieżności")}</div>
      <div class="source-layout"><section class="panel">${table(["Repozytorium", "Rola", "Dostęp", "Pliki"], source.repositories.map(r => `<tr><td><strong>${esc(r.name)}</strong></td><td>${badge(r.role)}</td><td>${esc(r.visibility)}</td><td>${r.files}</td></tr>`))}</section><aside class="panel source-findings"><header class="panel-header"><div><h3>Ustalenia audytu</h3><span>Potwierdzone w GitHub</span></div></header><div class="panel-body">${source.findings.map((f, i) => `<article><span>${i + 1}</span><div><strong>${esc(f.title)}</strong><p>${esc(f.detail)}</p></div></article>`).join("")}</div></aside></div></div>`;
  }

  function render() {
    ({ messages: renderMessages, routes: renderRoutes, products: renderProducts, agents: renderAgents, integrations: renderIntegrations, settings: renderSettings }[activeModule] || renderMessages)();
  }

  function openModule(moduleId, requestedSubtab) {
    if (!modules[moduleId]) return;
    activeModule = moduleId;
    activeSubtab = modules[moduleId].subtabs.includes(requestedSubtab) ? requestedSubtab : modules[moduleId].subtabs[0];
    nav?.querySelectorAll(".nav-item").forEach(b => b.classList.remove("is-active"));
    nav?.querySelector(`[data-extension-module="${moduleId}"]`)?.classList.add("is-active");
    moduleTitle.textContent = modules[moduleId].title;
    renderSubtabs(); renderModuleTab(); render();
  }

  function toast(message) {
    const region = document.getElementById("toastRegion");
    if (!region) return;
    const el = document.createElement("div"); el.className = "toast"; el.textContent = message; region.appendChild(el); setTimeout(() => el.remove(), 2600);
  }

  document.addEventListener("input", event => {
    const filter = event.target.closest("[data-ops-filter]");
    if (!filter) return;
    const q = filter.value.trim().toLowerCase();
    workspace.querySelectorAll("[data-search-row]").forEach(row => row.hidden = !row.dataset.searchRow.toLowerCase().includes(q));
  });

  document.addEventListener("click", event => {
    const ext = event.target.closest("[data-extension-module]");
    if (ext) { event.preventDefault(); event.stopImmediatePropagation(); openModule(ext.dataset.extensionModule); return; }
    const sub = event.target.closest("[data-extension-subtab]");
    if (sub && activeModule) { event.preventDefault(); event.stopImmediatePropagation(); openModule(activeModule, sub.dataset.extensionSubtab); return; }
    const action = event.target.closest("[data-ops-action]");
    if (action) {
      const type = action.dataset.opsAction;
      if (type === "save-settings") {
        localStorage.setItem("rafishOpsSettings", JSON.stringify({ workspaceName: document.getElementById("opsWorkspaceName")?.value || "RaFish Ops", compact: !!document.getElementById("opsCompactMode")?.checked, confirm: !!document.getElementById("opsConfirmActions")?.checked }));
        toast("Ustawienia zapisane lokalnie.");
      } else if (type === "run-agent-cycle") toast("Cykl agentów uruchomiony w trybie demonstracyjnym.");
      else if (type === "audit-products") toast("Audyt: 2 produkty wymagają uwagi.");
      else if (type === "integration-check") toast("Sprawdzono statusy adapterów demonstracyjnych.");
      else if (type === "optimize") toast("Optymalizacja trasy przygotowana w trybie demonstracyjnym.");
      else toast(`Akcja „${action.textContent.trim()}” jest gotowa do podpięcia pod adapter API.`);
      return;
    }
    if (event.target.closest("[data-module], [data-tab-id], [data-open-order], [data-open-ticket], [data-open-packing], [data-module-jump]")) {
      activeModule = null; activeSubtab = null;
      nav?.querySelectorAll("[data-extension-module]").forEach(b => b.classList.remove("is-active"));
    }
  }, true);
})();
