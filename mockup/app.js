(() => {
  "use strict";

  const modules = {
    dashboard: { title: "Dashboard", subtabs: ["Problemy", "Aktywność agentów"] },
    orders: { title: "Zamówienia", subtabs: ["Wszystkie", "DPD", "Ryby", "Palety", "Problemy"] },
    packing: { title: "Pakowanie", subtabs: ["Do spakowania", "W toku", "Zakończone"] }
  };

  const orders = [
    {
      id: "10542", customer: "Anna Kowalska", phone: "600 314 225", city: "Łódź", date: "25.07, 17:48", value: "289,00 zł",
      payment: "Opłacone", operational: "Wymaga decyzji", fulfillment: "DPD", priority: 96, issue: "Brak numeru lokalu",
      address: "ul. Piotrkowska 84, 90-102 Łódź", note: "Klient prosi o wysyłkę jeszcze dziś.",
      products: [
        { sku: "SE-ALG-5L", name: "Antyglon PRO 5 l", weight: 5.2, qty: 1, image: "5L" },
        { sku: "SE-BIO-1L", name: "Bakterie startowe do stawu 1 l", weight: 1.1, qty: 2, image: "1L" }
      ]
    },
    {
      id: "10541", customer: "Tomasz Nowak", phone: "501 772 110", city: "Kutno", date: "25.07, 17:20", value: "740,00 zł",
      payment: "Opłacone", operational: "Gotowe do pakowania", fulfillment: "Ryby", priority: 88, issue: "Termin transportu żywych ryb",
      address: "ul. Sadowa 11, 99-300 Kutno", note: "Dostawa własna — kontakt przed wyjazdem.",
      products: [
        { sku: "RYB-WIO-12", name: "Wiosłonos 9–13 cm", weight: 0.18, qty: 6, image: "RYB" },
        { sku: "TR-TLEN-01", name: "Worek transportowy z tlenem", weight: 0.12, qty: 2, image: "O2" }
      ]
    },
    {
      id: "10540", customer: "Marek Zieliński", phone: "604 010 442", city: "Płock", date: "25.07, 16:55", value: "2 890,00 zł",
      payment: "Pobranie", operational: "Wymaga decyzji", fulfillment: "Paleta", priority: 81, issue: "Waga przekracza profil DPD",
      address: "ul. Portowa 7, 09-400 Płock", note: "Możliwa dostawa własna przy trasie ryb.",
      products: [
        { sku: "SE-ZEOL-25", name: "Zeolit do stawu 25 kg", weight: 25, qty: 8, image: "25K" },
        { sku: "SE-WAP-20", name: "Preparat mineralny 20 kg", weight: 20, qty: 4, image: "20K" }
      ]
    },
    {
      id: "10539", customer: "Karolina Maj", phone: "698 002 418", city: "Warszawa", date: "25.07, 16:32", value: "129,00 zł",
      payment: "Opłacone", operational: "Gotowe do pakowania", fulfillment: "DPD", priority: 62, issue: "Brak problemów",
      address: "ul. Żwirki 18/5, 02-092 Warszawa", note: "Brak uwag.",
      products: [
        { sku: "SE-CLAR-1L", name: "Klarownik wody 1 l", weight: 1.1, qty: 1, image: "1L" },
        { sku: "SE-TEST-PH", name: "Test pH do oczka wodnego", weight: 0.2, qty: 1, image: "pH" }
      ]
    },
    {
      id: "10538", customer: "Piotr Lis", phone: "690 411 250", city: "Łowicz", date: "25.07, 15:41", value: "418,00 zł",
      payment: "Opłacone", operational: "W pakowaniu", fulfillment: "DPD", priority: 54, issue: "Kontrola ilości",
      address: "ul. Polna 21, 99-400 Łowicz", note: "Zamówienie rozpoczęte na stanowisku 2.",
      products: [
        { sku: "SE-BAK-5L", name: "Bakterie do filtracji 5 l", weight: 5.2, qty: 2, image: "5L" },
        { sku: "SE-SIAT-01", name: "Siatka ochronna do stawu", weight: 1.8, qty: 1, image: "NET" }
      ]
    },
    {
      id: "10537", customer: "Ewa Wójcik", phone: "608 903 334", city: "Sieradz", date: "25.07, 15:18", value: "94,00 zł",
      payment: "Oczekuje", operational: "Nowe", fulfillment: "DPD", priority: 43, issue: "Oczekiwanie na płatność",
      address: "ul. Krótka 4, 98-200 Sieradz", note: "Nie przekazywać do pakowania przed płatnością.",
      products: [{ sku: "SE-KARM-2K", name: "Karma dla karpi koi 2 kg", weight: 2.1, qty: 1, image: "2K" }]
    }
  ];

  const agents = [
    { id: "coord", name: "Koordynator" },
    { id: "orders", name: "Agent zamówień" },
    { id: "dpd", name: "Agent DPD" },
    { id: "fish", name: "Agent ryb" }
  ];

  const tickets = [
    { id: "T-014", priority: 96, agent: "coord", orderId: "10542", title: "Adres wymaga uzupełnienia", text: "Brak numeru lokalu. Wysyłka DPD nie powinna zostać przygotowana bez potwierdzenia adresu.", action: "Otwórz zamówienie i zweryfikuj adres.", age: "4 min" },
    { id: "T-013", priority: 88, agent: "fish", orderId: "10541", title: "Ustal termin transportu ryb", text: "Zamówienie zawiera żywe ryby i wymaga potwierdzenia dnia realizacji dostawy własnej.", action: "Sprawdź dane klienta i termin.", age: "11 min" },
    { id: "T-012", priority: 81, agent: "orders", orderId: "10540", title: "Przekroczony profil paczki", text: "Łączna masa produktów wskazuje na przesyłkę paletową lub dostawę własną.", action: "Zweryfikuj sposób realizacji.", age: "19 min" },
    { id: "T-011", priority: 72, agent: "dpd", orderId: "10538", title: "Pakowanie pozostaje otwarte", text: "Sesja pakowania zamówienia trwa dłużej niż pozostałe aktywne sesje demonstracyjne.", action: "Otwórz panel pakowania.", age: "31 min" }
  ];

  const state = {
    module: "dashboard",
    subtab: "Problemy",
    tabs: [{ id: "home", type: "module", module: "dashboard", title: "Dashboard", pinned: true }],
    activeTabId: "home",
    selectedTicketId: "T-014",
    agentPanelOpen: true,
    agentPanelPinned: false,
    agentFilter: "all",
    orderSearch: "",
    orderFilter: "all",
    packingOrderId: "10539",
    packingConfirmed: {}
  };

  const el = {
    shell: document.getElementById("appShell"),
    mainNav: document.getElementById("mainNav"),
    moduleTitle: document.getElementById("moduleTitle"),
    subnav: document.getElementById("subnav"),
    tabs: document.getElementById("workspaceTabs"),
    workspace: document.getElementById("workspace"),
    agentPanel: document.getElementById("agentPanel"),
    agentSummary: document.getElementById("agentSummary"),
    agentQueue: document.getElementById("agentQueue"),
    agentConversation: document.getElementById("agentConversation"),
    agentFilter: document.getElementById("agentFilter"),
    toggleAgentPanel: document.getElementById("toggleAgentPanel"),
    toggleAgentPin: document.getElementById("toggleAgentPin"),
    agentPanelRail: document.getElementById("agentPanelRail"),
    agentRailCount: document.getElementById("agentRailCount"),
    toastRegion: document.getElementById("toastRegion"),
    globalSearch: document.getElementById("globalSearch")
  };

  const esc = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const agentName = id => agents.find(agent => agent.id === id)?.name || id;
  const priorityClass = score => score >= 90 ? "high" : score >= 70 ? "medium" : "low";
  const badgeClass = value => ["Wymaga decyzji", "Oczekuje"].includes(value) ? "danger" : ["W pakowaniu", "Ryby", "Paleta"].includes(value) ? "warning" : ["Opłacone", "Gotowe do pakowania"].includes(value) ? "success" : "info";

  function toast(message) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    el.toastRegion.appendChild(node);
    window.setTimeout(() => node.remove(), 2500);
  }

  function ensureModuleTab(moduleId) {
    let tab = state.tabs.find(item => item.type === "module" && item.module === moduleId);
    if (!tab) {
      tab = { id: `module-${moduleId}`, type: "module", module: moduleId, title: modules[moduleId].title, pinned: false };
      state.tabs.push(tab);
    }
    return tab;
  }

  function setModule(moduleId) {
    if (!modules[moduleId]) return;
    state.module = moduleId;
    state.subtab = modules[moduleId].subtabs[0];
    state.activeTabId = ensureModuleTab(moduleId).id;
    render();
  }

  function openOrder(orderId) {
    const order = orders.find(item => item.id === orderId);
    if (!order) return;
    const id = `order-${orderId}`;
    if (!state.tabs.some(tab => tab.id === id)) state.tabs.push({ id, type: "order", orderId, title: `Zamówienie #${orderId}`, pinned: false });
    state.activeTabId = id;
    state.module = "orders";
    state.subtab = "Wszystkie";
    render();
  }

  function openTicket(ticketId) {
    const ticket = tickets.find(item => item.id === ticketId);
    if (!ticket) return;
    state.selectedTicketId = ticketId;
    const id = `ticket-${ticketId}`;
    if (!state.tabs.some(tab => tab.id === id)) state.tabs.push({ id, type: "ticket", ticketId, title: `${ticketId}: ${ticket.title}`, pinned: false });
    state.activeTabId = id;
    state.agentPanelOpen = true;
    render();
  }

  function openPacking(orderId) {
    const order = orders.find(item => item.id === orderId) || orders.find(item => item.operational === "Gotowe do pakowania");
    if (!order) return;
    state.packingOrderId = order.id;
    const id = `packing-${order.id}`;
    if (!state.tabs.some(tab => tab.id === id)) state.tabs.push({ id, type: "packing", orderId: order.id, title: `Pakowanie #${order.id}`, pinned: false });
    state.activeTabId = id;
    state.module = "packing";
    state.subtab = "Do spakowania";
    render();
  }

  function activateTab(tabId) {
    const tab = state.tabs.find(item => item.id === tabId);
    if (!tab) return;
    state.activeTabId = tabId;
    if (tab.type === "module") state.module = tab.module;
    if (tab.type === "order") state.module = "orders";
    if (tab.type === "packing") { state.module = "packing"; state.packingOrderId = tab.orderId; }
    if (tab.type === "ticket") { state.selectedTicketId = tab.ticketId; state.agentPanelOpen = true; }
    render();
  }

  function closeTab(tabId) {
    const tab = state.tabs.find(item => item.id === tabId);
    if (!tab || tab.pinned) { if (tab?.pinned) toast("Najpierw odepnij kartę, aby ją zamknąć."); return; }
    const index = state.tabs.findIndex(item => item.id === tabId);
    state.tabs.splice(index, 1);
    if (state.activeTabId === tabId) {
      const fallback = state.tabs[Math.max(0, index - 1)] || state.tabs[0];
      state.activeTabId = fallback.id;
      state.module = fallback.type === "module" ? fallback.module : fallback.type === "packing" ? "packing" : "orders";
    }
    render();
  }

  function togglePinTab(tabId) {
    const tab = state.tabs.find(item => item.id === tabId);
    if (!tab) return;
    tab.pinned = !tab.pinned;
    state.tabs.sort((a, b) => Number(b.pinned) - Number(a.pinned));
    renderTabs();
  }

  function renderNav() {
    el.moduleTitle.textContent = modules[state.module].title;
    el.mainNav.querySelectorAll("[data-module]").forEach(button => button.classList.toggle("is-active", button.dataset.module === state.module));
  }

  function renderSubnav() {
    el.subnav.innerHTML = modules[state.module].subtabs.map(label => `<button type="button" class="${state.subtab === label ? "is-active" : ""}" data-subtab="${esc(label)}">${esc(label)}</button>`).join("");
  }

  function renderTabs() {
    el.tabs.innerHTML = state.tabs.map(tab => `
      <div class="workspace-tab ${tab.id === state.activeTabId ? "is-active" : ""}" data-tab-id="${tab.id}" role="button" tabindex="0">
        <span class="workspace-tab-label">${tab.pinned ? "◆ " : ""}${esc(tab.title)}</span>
        <button class="tab-action" type="button" data-tab-pin="${tab.id}" title="${tab.pinned ? "Odepnij" : "Przypnij"}">${tab.pinned ? "◇" : "◆"}</button>
        ${tab.pinned ? "" : `<button class="tab-action" type="button" data-tab-close="${tab.id}" title="Zamknij">×</button>`}
      </div>`).join("");
  }

  function renderDashboard() {
    return `
      <div class="page-head"><div><span class="eyebrow">Sytuacja operacyjna</span><h2>Problemy wymagające uwagi</h2><p>Wyjątki i zadania utworzone na danych demonstracyjnych.</p></div><button class="button" data-demo>Odśwież kontrolę</button></div>
      <div class="metric-grid">
        <article class="metric-card critical" data-open-ticket="T-014"><span>Krytyczne zgłoszenia</span><strong>1</strong><em>Najwyższy priorytet: 96/100</em></article>
        <article class="metric-card warning" data-module-jump="orders"><span>Wymagają decyzji</span><strong>2</strong><em>Adres i profil przesyłki</em></article>
        <article class="metric-card success" data-module-jump="packing"><span>Gotowe do pakowania</span><strong>2</strong><em>Jedno zamówienie z rybami</em></article>
        <article class="metric-card" data-open-ticket="T-011"><span>Aktywne pakowanie</span><strong>1</strong><em>Najstarsza sesja: 31 min</em></article>
      </div>
      <div class="content-grid">
        <section class="panel"><header class="panel-header"><div><h3>Kolejka priorytetów</h3><span>Ocena koordynatora 1–100</span></div><button class="button small" data-agent-open>Panel agentów</button></header>
          ${[...tickets].sort((a,b)=>b.priority-a.priority).map(ticket => `<article class="issue-row" data-open-ticket="${ticket.id}"><div class="priority-score ${priorityClass(ticket.priority)}">${ticket.priority}</div><div class="issue-copy"><strong>${esc(ticket.title)}</strong><span>${esc(ticket.text)}</span></div><div class="issue-meta"><strong>${esc(agentName(ticket.agent))}</strong><span>#${ticket.orderId} · ${ticket.age}</span></div></article>`).join("")}
        </section>
        <section class="panel"><header class="panel-header"><div><h3>Ostatnia aktywność</h3><span>Dane demonstracyjne</span></div></header><div class="panel-body activity-list">
          <div class="activity-item"><span class="activity-line"></span><div><strong>Agent DPD zakończył kontrolę</strong><span>Sprawdzono 12 przesyłek. Utworzono jedno zgłoszenie.</span></div></div>
          <div class="activity-item"><span class="activity-line"></span><div><strong>Koordynator zmienił priorytet</strong><span>Zgłoszenie T-014 podniesiono do 96/100.</span></div></div>
          <div class="activity-item"><span class="activity-line"></span><div><strong>Zamówienie przekazane do pakowania</strong><span>Zamówienie #10539 oczekuje na stanowisko.</span></div></div>
        </div></section>
      </div>`;
  }

  function filteredOrders() {
    const query = state.orderSearch.trim().toLowerCase();
    return orders.filter(order => (!query || [order.id, order.customer, order.phone, order.city, order.issue].join(" ").toLowerCase().includes(query)) && (state.orderFilter === "all" || order.fulfillment === state.orderFilter || order.operational === state.orderFilter));
  }

  function renderOrders() {
    return `
      <div class="page-head"><div><span class="eyebrow">Obsługa operacyjna</span><h2>Lista zamówień</h2><p>Kliknij wiersz, aby otworzyć szczegóły w karcie roboczej.</p></div><button class="button" data-demo>Operacje zbiorcze — makieta</button></div>
      <div class="table-toolbar"><input id="orderSearch" type="search" value="${esc(state.orderSearch)}" placeholder="Numer, klient, telefon, miasto lub problem…"><select id="orderFilter"><option value="all">Wszystkie typy</option><option value="DPD" ${state.orderFilter==="DPD"?"selected":""}>DPD</option><option value="Ryby" ${state.orderFilter==="Ryby"?"selected":""}>Ryby</option><option value="Paleta" ${state.orderFilter==="Paleta"?"selected":""}>Paleta</option><option value="Gotowe do pakowania" ${state.orderFilter==="Gotowe do pakowania"?"selected":""}>Gotowe do pakowania</option></select></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Zamówienie</th><th>Klient</th><th>Data</th><th>Wartość</th><th>Płatność</th><th>Status</th><th>Realizacja</th><th>Priorytet</th><th>Problem</th></tr></thead><tbody>
      ${filteredOrders().map(order => `<tr data-open-order="${order.id}"><td><strong>#${order.id}</strong></td><td class="customer-cell"><strong>${esc(order.customer)}</strong><span>${esc(order.city)} · ${esc(order.phone)}</span></td><td>${esc(order.date)}</td><td><strong>${esc(order.value)}</strong></td><td><span class="badge ${badgeClass(order.payment)}">${esc(order.payment)}</span></td><td><span class="badge ${badgeClass(order.operational)}">${esc(order.operational)}</span></td><td><span class="badge ${badgeClass(order.fulfillment)}">${esc(order.fulfillment)}</span></td><td><div class="priority-score ${priorityClass(order.priority)}">${order.priority}</div></td><td>${esc(order.issue)}</td></tr>`).join("") || `<tr><td colspan="9">Brak wyników.</td></tr>`}
      </tbody></table></div>`;
  }

  function renderOrder(orderId) {
    const order = orders.find(item => item.id === orderId);
    if (!order) return "";
    const related = tickets.filter(ticket => ticket.orderId === order.id);
    const weight = order.products.reduce((sum,item)=>sum+item.weight*item.qty,0).toFixed(1);
    return `
      <div class="page-head"><div><span class="eyebrow">Szczegóły zamówienia</span><h2>#${order.id} — ${esc(order.customer)}</h2><p>Szczegóły pozostają w centralnym obszarze, a prawa strona należy do agentów.</p></div><div class="page-actions"><button class="button" data-demo>Edytuj — makieta</button><button class="button primary" data-open-packing="${order.id}">Przejdź do pakowania</button></div></div>
      <div class="split-view"><div class="order-summary">
        <section class="panel"><header class="panel-header"><div><h3>Dane realizacji</h3><span>Podgląd operacyjny</span></div><span class="badge ${badgeClass(order.operational)}">${esc(order.operational)}</span></header><div class="panel-body info-grid">
          <div class="info-card"><span>Klient</span><strong>${esc(order.customer)}<br>${esc(order.phone)}</strong></div><div class="info-card"><span>Adres</span><strong>${esc(order.address)}</strong></div><div class="info-card"><span>Płatność</span><strong>${esc(order.payment)} · ${esc(order.value)}</strong></div><div class="info-card"><span>Realizacja</span><strong>${esc(order.fulfillment)} · ${order.priority}/100</strong></div><div class="info-card"><span>Waga</span><strong>${weight} kg</strong></div><div class="info-card"><span>Notatka</span><strong>${esc(order.note)}</strong></div>
        </div></section>
        <section class="panel"><header class="panel-header"><div><h3>Zawartość zamówienia</h3><span>${order.products.length} pozycje</span></div></header><div class="panel-body product-mini-list">${order.products.map(product=>`<div class="product-mini"><div class="product-thumb">${esc(product.image)}</div><div><strong>${esc(product.name)}</strong><span>${esc(product.sku)} · ${product.weight} kg/szt.</span></div><div class="product-qty">× ${product.qty}</div></div>`).join("")}</div></section>
      </div><aside class="order-summary"><section class="panel"><header class="panel-header"><div><h3>Zgłoszenia agentów</h3><span>${related.length} powiązane</span></div></header><div class="panel-body">${related.length?related.map(ticket=>`<div class="conversation-card" data-open-ticket="${ticket.id}" style="cursor:pointer;margin-bottom:8px"><h3>${ticket.priority}/100 · ${esc(ticket.title)}</h3><p>${esc(ticket.text)}</p></div>`).join(""):`<p>Brak aktywnych zgłoszeń.</p>`}</div></section><section class="panel"><header class="panel-header"><div><h3>Historia demonstracyjna</h3><span>Bez trwałego zapisu</span></div></header><div class="panel-body timeline"><div class="timeline-item"><strong>Zamówienie utworzone</strong><span>${esc(order.date)}</span></div><div class="timeline-item"><strong>Analiza agenta</strong><span>Typ: ${esc(order.fulfillment)}</span></div><div class="timeline-item"><strong>Status</strong><span>${esc(order.operational)}</span></div></div></section></aside></div>`;
  }

  function renderTicket(ticketId) {
    const ticket = tickets.find(item => item.id === ticketId);
    const order = orders.find(item => item.id === ticket?.orderId);
    if (!ticket) return "";
    return `<div class="page-head"><div><span class="eyebrow">Zgłoszenie agenta</span><h2>${esc(ticket.id)} — ${esc(ticket.title)}</h2><p>Priorytet ustalony przez koordynatora na danych demonstracyjnych.</p></div><button class="button primary" data-open-order="${ticket.orderId}">Otwórz zamówienie #${ticket.orderId}</button></div><div class="content-grid"><section class="panel"><header class="panel-header"><div><h3>Opis problemu</h3><span>${esc(agentName(ticket.agent))}</span></div><div class="priority-score ${priorityClass(ticket.priority)}">${ticket.priority}</div></header><div class="panel-body"><div class="conversation-card"><h3>${esc(ticket.title)}</h3><p>${esc(ticket.text)}</p><p><strong>Sugerowane działanie:</strong> ${esc(ticket.action)}</p></div></div></section><section class="panel"><header class="panel-header"><div><h3>Powiązanie</h3><span>Dane demonstracyjne</span></div></header><div class="panel-body"><div class="info-card"><span>Zamówienie</span><strong>#${ticket.orderId}</strong></div><div class="info-card" style="margin-top:8px"><span>Klient</span><strong>${esc(order?.customer||"—")}</strong></div><div class="conversation-actions" style="margin-top:10px"><button class="button small" data-demo>Rozwiązane — makieta</button><button class="button small" data-demo>Odłóż — makieta</button></div></div></section></div>`;
  }

  function currentPackingOrder() { return orders.find(item => item.id === state.packingOrderId) || orders[0]; }

  function renderPacking(orderId) {
    if (orderId) state.packingOrderId = orderId;
    const order = currentPackingOrder();
    const confirmed = state.packingConfirmed[order.id] || {};
    const count = order.products.filter(product => confirmed[product.sku]).length;
    const percent = Math.round(count/order.products.length*100);
    const weight = order.products.reduce((sum,item)=>sum+item.weight*item.qty,0).toFixed(1);
    return `<div class="page-head"><div><span class="eyebrow">Stanowisko pakowania</span><h2>Pakowanie zamówienia #${order.id}</h2><p>Miniatura, tytuł, waga i ilość są widoczne bez przechodzenia do innych ekranów.</p></div><button class="button" data-open-order="${order.id}">Szczegóły zamówienia</button></div><div class="packing-search"><input id="packingSearch" type="search" value="#${order.id}" placeholder="Numer zamówienia, klient lub telefon…"><button class="button" data-packing-search>Wyszukaj</button></div><div class="packing-layout"><section class="packing-products">${order.products.map(product=>{const ok=Boolean(confirmed[product.sku]);return `<article class="packing-product ${ok?"is-confirmed":""}"><div class="packing-thumb">${esc(product.image)}</div><div><h3>${esc(product.name)}</h3><p>${esc(product.sku)} · ${product.weight} kg/szt. · łącznie ${(product.weight*product.qty).toFixed(1)} kg</p></div><div class="packing-qty"><strong>${product.qty}</strong><span>sztuki do spakowania</span></div><div><button class="button ${ok?"":"primary"}" data-confirm-product="${product.sku}">${ok?"Potwierdzono ✓":"Potwierdź"}</button></div></article>`}).join("")}</section><aside class="panel packing-summary"><header class="panel-header"><div><h3>Podsumowanie</h3><span>Sesja demonstracyjna</span></div></header><div class="panel-body"><dl><div><dt>Klient</dt><dd>${esc(order.customer)}</dd></div><div><dt>Realizacja</dt><dd>${esc(order.fulfillment)}</dd></div><div><dt>Pozycje</dt><dd>${order.products.length}</dd></div><div><dt>Łączna waga</dt><dd>${weight} kg</dd></div><div><dt>Potwierdzone</dt><dd>${count}/${order.products.length}</dd></div></dl><div style="margin-top:14px"><div class="progress"><span style="width:${percent}%"></span></div><p style="color:var(--muted);font-size:9px">Postęp: ${percent}%</p></div><button class="button primary" style="width:100%" data-finish-packing ${percent<100?"disabled":""}>Zakończ — makieta</button><p style="color:var(--muted);font-size:8px">Akcja nie zapisuje danych i nie nadaje przesyłki.</p></div></aside></div>`;
  }

  function renderWorkspace() {
    const tab = state.tabs.find(item => item.id === state.activeTabId);
    if (tab?.type === "order") el.workspace.innerHTML = renderOrder(tab.orderId);
    else if (tab?.type === "ticket") el.workspace.innerHTML = renderTicket(tab.ticketId);
    else if (tab?.type === "packing") el.workspace.innerHTML = renderPacking(tab.orderId);
    else if (state.module === "dashboard") el.workspace.innerHTML = renderDashboard();
    else if (state.module === "orders") el.workspace.innerHTML = renderOrders();
    else el.workspace.innerHTML = renderPacking();
  }

  function renderAgentPanel() {
    const critical = tickets.filter(item=>item.priority>=90).length;
    const urgent = tickets.filter(item=>item.priority>=70&&item.priority<90).length;
    el.agentSummary.innerHTML = `<div class="agent-stat"><strong>${tickets.length}</strong><span>otwarte</span></div><div class="agent-stat"><strong>${critical}</strong><span>krytyczne</span></div><div class="agent-stat"><strong>${urgent}</strong><span>pilne</span></div>`;
    el.agentFilter.innerHTML = `<option value="all">Wszyscy agenci</option>${agents.map(agent=>`<option value="${agent.id}" ${state.agentFilter===agent.id?"selected":""}>${esc(agent.name)}</option>`).join("")}`;
    const visible = tickets.filter(item=>state.agentFilter==="all"||item.agent===state.agentFilter).sort((a,b)=>b.priority-a.priority);
    el.agentQueue.innerHTML = visible.map(ticket=>`<button class="agent-ticket ${ticket.id===state.selectedTicketId?"is-active":""}" data-agent-ticket="${ticket.id}"><div class="priority-score ${priorityClass(ticket.priority)}">${ticket.priority}</div><div><strong>${esc(ticket.title)}</strong><span>${esc(agentName(ticket.agent))} · #${ticket.orderId} · ${ticket.age}</span></div></button>`).join("");
    const selected = tickets.find(item=>item.id===state.selectedTicketId)||tickets[0];
    el.agentConversation.innerHTML = `<div class="conversation-card"><h3>${esc(selected.title)}</h3><p>${esc(selected.text)}</p><div class="conversation-meta"><span class="badge ${selected.priority>=90?"danger":"warning"}">${selected.priority}/100</span><span class="badge info">${esc(agentName(selected.agent))}</span><span class="badge">#${selected.orderId}</span></div><div class="conversation-actions"><button class="button small primary" data-open-order="${selected.orderId}">Otwórz zamówienie</button><button class="button small" data-open-ticket="${selected.id}">Pełne zgłoszenie</button></div></div>`;
    el.agentPanel.classList.toggle("is-collapsed",!state.agentPanelOpen);
    el.agentPanel.classList.toggle("is-pinned",state.agentPanelPinned);
    el.shell.classList.toggle("agent-collapsed",!state.agentPanelOpen);
    el.toggleAgentPin.setAttribute("aria-pressed",String(state.agentPanelPinned));
    el.toggleAgentPin.textContent=state.agentPanelPinned?"◆":"◇";
    el.agentRailCount.textContent=String(tickets.length);
  }

  function render() { renderNav(); renderSubnav(); renderTabs(); renderWorkspace(); renderAgentPanel(); }

  document.addEventListener("click", event => {
    const moduleButton=event.target.closest("[data-module]"); if(moduleButton){setModule(moduleButton.dataset.module);return;}
    const subtab=event.target.closest("[data-subtab]"); if(subtab){state.subtab=subtab.dataset.subtab;renderSubnav();toast(`Podzakładka „${state.subtab}” — makieta.`);return;}
    const close=event.target.closest("[data-tab-close]"); if(close){event.stopPropagation();closeTab(close.dataset.tabClose);return;}
    const pin=event.target.closest("[data-tab-pin]"); if(pin){event.stopPropagation();togglePinTab(pin.dataset.tabPin);return;}
    const tab=event.target.closest("[data-tab-id]"); if(tab){activateTab(tab.dataset.tabId);return;}
    const order=event.target.closest("[data-open-order]"); if(order){openOrder(order.dataset.openOrder);return;}
    const ticket=event.target.closest("[data-open-ticket]"); if(ticket){openTicket(ticket.dataset.openTicket);return;}
    const packing=event.target.closest("[data-open-packing]"); if(packing){openPacking(packing.dataset.openPacking);return;}
    const jump=event.target.closest("[data-module-jump]"); if(jump){setModule(jump.dataset.moduleJump);return;}
    if(event.target.closest("[data-agent-open]")){state.agentPanelOpen=true;renderAgentPanel();return;}
    const agentTicket=event.target.closest("[data-agent-ticket]"); if(agentTicket){state.selectedTicketId=agentTicket.dataset.agentTicket;renderAgentPanel();return;}
    const confirm=event.target.closest("[data-confirm-product]"); if(confirm){const order=currentPackingOrder();state.packingConfirmed[order.id]||={};state.packingConfirmed[order.id][confirm.dataset.confirmProduct]=!state.packingConfirmed[order.id][confirm.dataset.confirmProduct];renderWorkspace();return;}
    if(event.target.closest("[data-packing-search]")){const input=document.getElementById("packingSearch");const query=input.value.replace(/[^0-9]/g,"");const found=orders.find(item=>item.id.includes(query)||item.customer.toLowerCase().includes(input.value.toLowerCase()));found?openPacking(found.id):toast("Nie znaleziono zamówienia demonstracyjnego.");return;}
    if(event.target.closest("[data-finish-packing]")){toast("Pakowanie zakończone demonstracyjnie. Dane nie zostały zapisane.");return;}
    if(event.target.closest("[data-demo]"))toast("To działanie jest wyłącznie elementem makiety etapu 1.");
  });

  document.addEventListener("keydown",event=>{const tab=event.target.closest?.("[data-tab-id]");if(tab&&(event.key==="Enter"||event.key===" ")){event.preventDefault();activateTab(tab.dataset.tabId);}});
  el.agentFilter.addEventListener("change",event=>{state.agentFilter=event.target.value;renderAgentPanel();});
  el.toggleAgentPanel.addEventListener("click",()=>{state.agentPanelOpen=false;renderAgentPanel();});
  el.agentPanelRail.addEventListener("click",()=>{state.agentPanelOpen=true;renderAgentPanel();});
  el.toggleAgentPin.addEventListener("click",()=>{state.agentPanelPinned=!state.agentPanelPinned;toast(state.agentPanelPinned?"Panel agentów przypięty.":"Panel agentów odpięty.");renderAgentPanel();});
  document.getElementById("openTopAlert").addEventListener("click",()=>openTicket("T-014"));
  document.getElementById("tabsOverview").addEventListener("click",()=>toast(`Otwarte karty: ${state.tabs.length}.`));
  el.globalSearch.addEventListener("keydown",event=>{if(event.key!=="Enter")return;const query=event.target.value.trim().toLowerCase();const found=orders.find(item=>[item.id,item.customer,item.phone].join(" ").toLowerCase().includes(query));found?openOrder(found.id):toast("Nie znaleziono zamówienia demonstracyjnego.");});
  el.workspace.addEventListener("input",event=>{if(event.target.id==="orderSearch"){state.orderSearch=event.target.value;const pos=event.target.selectionStart;renderWorkspace();const input=document.getElementById("orderSearch");input?.focus();input?.setSelectionRange(pos,pos);}});
  el.workspace.addEventListener("change",event=>{if(event.target.id==="orderFilter"){state.orderFilter=event.target.value;renderWorkspace();}});

  render();
})();
