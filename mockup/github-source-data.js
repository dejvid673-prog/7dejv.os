(() => {
  "use strict";

  // Migawka utworzona wyłącznie z odczytu GitHub. Dane demonstracyjne panelu
  // zamówień nie są częścią tego zbioru i nie powinny być z nim mieszane.
  window.RAFISH_GITHUB_SOURCE = Object.freeze({
    owner: "dejvid673-prog",
    generatedAt: "2026-08-24",
    generatedAtLabel: "24.08.2026",
    summary: Object.freeze({
      repositories: 16,
      publicRepos: 10,
      privateRepos: 6,
      files: 885,
      canonical: 1,
      openFindings: 3
    }),
    repositories: Object.freeze([
      { name: "7dejv-agent-os", role: "canonical", visibility: "public", files: 331, indexed: false, note: "Kanoniczne źródło agentów, skilli, workflow i promptów" },
      { name: "7dejv-skills-prompts", role: "primary", visibility: "private", files: 203, indexed: false },
      { name: "7dejv-ai-command-center", role: "primary", visibility: "private", files: 110, indexed: true },
      { name: "7dejv-staw-expert", role: "primary", visibility: "private", files: 74, indexed: true },
      { name: "7dejv.os", role: "primary", visibility: "public", files: 28, indexed: false, note: "Repozytorium tego dashboardu" },
      { name: "airtable-agent", role: "primary", visibility: "public", files: 1, indexed: false, note: "Główna gałąź zawiera tylko plik startowy; rozwój jest na gałęzi funkcjonalnej" },
      { name: "7dejv-prestashop", role: "secondary", visibility: "private", files: 26, indexed: false },
      { name: "repetytorium", role: "secondary", visibility: "public", files: 1, indexed: false },
      { name: "n8n_7d", role: "secondary", visibility: "public", files: 1, indexed: false },
      { name: "Agent-repo", role: "reference", visibility: "private", files: 1, indexed: false },
      { name: "7dejv-dawid", role: "reference", visibility: "private", files: 2, indexed: true },
      { name: "bufor-github", role: "reference", visibility: "public", files: 17, indexed: true },
      { name: "n8n", role: "empty", visibility: "public", files: 0, indexed: false, note: "Repozytorium puste" },
      { name: "allegro", role: "unclassified", visibility: "public", files: 51, indexed: false, note: "Nowe repo domenowe niewpisane do kanonicznego indeksu" },
      { name: "ideas", role: "unclassified", visibility: "public", files: 18, indexed: false, note: "Nowe repo niewpisane do kanonicznego indeksu" },
      { name: "7dejv-prestashop-resources", role: "unclassified", visibility: "public", files: 21, indexed: false, note: "Nowe repo niewpisane do kanonicznego indeksu" }
    ]),
    findings: Object.freeze([
      { title: "Kanoniczny indeks pomija 3 repozytoria", detail: "allegro, ideas i 7dejv-prestashop-resources istnieją online, ale nie figurują jeszcze w inventory/repositories-index.md." },
      { title: "Repozytorium n8n jest puste", detail: "GitHub zwraca brak drzewa Git dla gałęzi głównej. Repo nie wnosi obecnie danych do panelu." },
      { title: "Dashboard pozostaje makietą etapu 1", detail: "Repo 7dejv.os nie ma backendu ani połączeń operacyjnych; informacje o zamówieniach, klientach i agentach są jawnie demonstracyjne." }
    ])
  });
})();
