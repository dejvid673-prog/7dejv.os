(() => {
  "use strict";

  const roster = [
    { name: "Koordynator", count: 1, status: "online" },
    { name: "Zamówienia", count: 1, status: "online" },
    { name: "DPD", count: 1, status: "online" },
    { name: "Ryby", count: 1, status: "online" },
    { name: "Klient", count: 1, status: "demo" }
  ];

  const totalDemoReports = 5;
  let scheduled = false;

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function alignNavigationLabels() {
    const orderNav = document.querySelector('[data-module="orders"]');
    const orderLabel = orderNav?.querySelectorAll("span")[1];
    setText(orderLabel, "Zamówienia + wysyłka");

    const moduleTitle = document.getElementById("moduleTitle");
    if (moduleTitle?.textContent === "Zamówienia") {
      moduleTitle.textContent = "Zamówienia i wysyłka";
    }

    document.querySelectorAll(".workspace-tab-label").forEach(label => {
      if (label.textContent.includes("Zamówienia") && !label.textContent.includes("wysyłka")) {
        label.textContent = label.textContent.replace("Zamówienia", "Zamówienia + wysyłka");
      }
    });
  }

  function alignWorkspaceCopy() {
    const eyebrow = [...document.querySelectorAll(".page-head .eyebrow")]
      .find(node => node.textContent.trim() === "Sytuacja operacyjna");
    const dashboardDescription = eyebrow?.parentElement?.querySelector("p");
    setText(
      dashboardDescription,
      "Problemy wysyłkowe i zgłoszenia klientów przetworzone przez agentów."
    );

    const ordersHeading = [...document.querySelectorAll(".page-head h2")]
      .find(node => node.textContent.trim() === "Lista zamówień");
    setText(ordersHeading, "Lista zamówień i realizacji");
  }

  function alignVisibleCounters() {
    setText(document.getElementById("dashboardNavCount"), String(totalDemoReports));
    setText(document.getElementById("agentRailCount"), String(totalDemoReports));

    const openReportsCount = document.querySelector("#agentSummary .agent-stat:first-child strong");
    setText(openReportsCount, String(totalDemoReports));
  }

  function ensureAgentRoster() {
    const summary = document.getElementById("agentSummary");
    const body = summary?.parentElement;
    if (!summary || !body) return;

    let agentRoster = document.getElementById("agentRoster");
    if (!agentRoster) {
      agentRoster = document.createElement("div");
      agentRoster.id = "agentRoster";
      agentRoster.className = "agent-roster";
      agentRoster.setAttribute("aria-label", "Aktywni agenci demonstracyjni");
      summary.insertAdjacentElement("afterend", agentRoster);
    }

    const expected = roster.map(agent => agent.name).join("|");
    if (agentRoster.dataset.roster !== expected) {
      agentRoster.dataset.roster = expected;
      agentRoster.innerHTML = roster.map(agent => `
        <div class="agent-roster-item ${agent.status === "demo" ? "is-demo" : ""}">
          <span class="agent-roster-dot" aria-hidden="true"></span>
          <span class="agent-roster-name">${agent.name}</span>
          <strong>${agent.count}</strong>
        </div>
      `).join("");
    }
  }

  function ensureCustomerReportInAgentQueue() {
    const queue = document.getElementById("agentQueue");
    const filter = document.getElementById("agentFilter");
    if (!queue || !filter) return;

    const existing = document.getElementById("customerReportTicket");
    if (filter.value !== "all") {
      existing?.remove();
      return;
    }
    if (existing) return;

    const ticket = document.createElement("button");
    ticket.id = "customerReportTicket";
    ticket.type = "button";
    ticket.className = "agent-ticket is-customer-report";
    ticket.dataset.openOrder = "10542";
    ticket.setAttribute("aria-label", "Otwórz zamówienie 10542 powiązane ze zgłoszeniem klienta");
    ticket.innerHTML = `
      <div class="priority-score medium">78</div>
      <div>
        <strong>Klient prosi o zmianę adresu</strong>
        <span>Agent obsługi klienta · #10542 · 7 min · demo</span>
      </div>
    `;

    const lowerPriorityTicket = [...queue.querySelectorAll(".agent-ticket")]
      .find(item => Number(item.querySelector(".priority-score")?.textContent || 0) < 78);

    if (lowerPriorityTicket) queue.insertBefore(ticket, lowerPriorityTicket);
    else queue.appendChild(ticket);
  }

  function ensureCustomerReportOnDashboard() {
    const queuePanel = [...document.querySelectorAll(".panel")]
      .find(panel => panel.querySelector(".panel-header h3")?.textContent.trim() === "Kolejka priorytetów");
    if (!queuePanel || document.getElementById("dashboardCustomerReport")) return;

    const report = document.createElement("article");
    report.id = "dashboardCustomerReport";
    report.className = "issue-row is-customer-report";
    report.dataset.openOrder = "10542";
    report.setAttribute("role", "button");
    report.setAttribute("tabindex", "0");
    report.setAttribute("aria-label", "Otwórz zamówienie 10542 powiązane ze zgłoszeniem klienta");
    report.innerHTML = `
      <div class="priority-score medium">78</div>
      <div class="issue-copy">
        <strong>Klient prosi o zmianę adresu</strong>
        <span>Wiadomość została sklasyfikowana przez agenta obsługi klienta.</span>
      </div>
      <div class="issue-meta">
        <strong>Agent klienta</strong>
        <span>#10542 · 7 min · demo</span>
      </div>
    `;

    const lowerPriorityRow = [...queuePanel.querySelectorAll(".issue-row")]
      .find(item => Number(item.querySelector(".priority-score")?.textContent || 0) < 78);

    if (lowerPriorityRow) queuePanel.insertBefore(report, lowerPriorityRow);
    else queuePanel.appendChild(report);
  }

  function improveControlLabels() {
    const pin = document.getElementById("toggleAgentPin");
    const close = document.getElementById("toggleAgentPanel");
    const overview = document.getElementById("tabsOverview");

    if (pin) pin.setAttribute("aria-label", "Przypnij lub odepnij panel agentów");
    if (close) close.setAttribute("aria-label", "Zwiń panel agentów");
    if (overview) overview.setAttribute("aria-label", "Pokaż liczbę otwartych kart");
  }

  function applyCorrections() {
    scheduled = false;
    alignNavigationLabels();
    alignWorkspaceCopy();
    alignVisibleCounters();
    ensureAgentRoster();
    ensureCustomerReportInAgentQueue();
    ensureCustomerReportOnDashboard();
    improveControlLabels();
  }

  function scheduleCorrections() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(applyCorrections);
  }

  const observer = new MutationObserver(scheduleCorrections);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  document.getElementById("agentFilter")?.addEventListener("change", scheduleCorrections);
  scheduleCorrections();
})();
