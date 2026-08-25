(() => {
  "use strict";

  const adapters = [
    {
      id: "prestashop",
      name: "PrestaShop",
      area: "E-commerce",
      transport: "REST / Webservice",
      mode: "ready",
      status: "Adapter gotowy",
      sourceKind: "Dane demonstracyjne",
      nextStep: "Skonfiguruj poświadczenia wyłącznie w backendzie i dodaj endpoint statusu.",
      secretPolicy: "server-only"
    },
    {
      id: "allegro",
      name: "Allegro",
      area: "Marketplace",
      transport: "OAuth2 + REST",
      mode: "ready",
      status: "Adapter gotowy",
      sourceKind: "Dane demonstracyjne",
      nextStep: "Dodać backendowy OAuth2 oraz bezpieczne przechowywanie tokenów.",
      secretPolicy: "server-only"
    },
    {
      id: "erli",
      name: "ERLI",
      area: "Marketplace",
      transport: "API",
      mode: "ready",
      status: "Adapter gotowy",
      sourceKind: "Dane demonstracyjne",
      nextStep: "Dodać backendowy klient API i mapowanie kategorii/statusów.",
      secretPolicy: "server-only"
    },
    {
      id: "dpd",
      name: "DPD",
      area: "Przewoźnik",
      transport: "REST",
      mode: "ready",
      status: "Adapter gotowy",
      sourceKind: "Brak odczytu live w panelu",
      nextStep: "Podłączyć backendowy health check i operacje przesyłek po stronie serwera.",
      secretPolicy: "server-only"
    },
    {
      id: "n8n",
      name: "n8n",
      area: "Automatyzacje",
      transport: "Webhook / REST",
      mode: "ready",
      status: "Adapter gotowy",
      sourceKind: "Brak odczytu live w panelu",
      nextStep: "Dodać podpisywane webhooki lub serwerowy klient REST.",
      secretPolicy: "server-only"
    },
    {
      id: "github",
      name: "GitHub",
      area: "Źródło prawdy",
      transport: "Snapshot repo",
      mode: "connected",
      status: "Snapshot aktywny",
      sourceKind: "Wersjonowana migawka",
      nextStep: "Zachować widoczną datę migawki; live API nie jest wymagane dla tego widoku.",
      secretPolicy: "none"
    }
  ];

  window.RAFISH_INTEGRATION_REGISTRY = Object.freeze({
    version: "1.0.0",
    generatedAt: "2026-08-25",
    adapters: Object.freeze(adapters.map(adapter => Object.freeze({ ...adapter })))
  });
})();
