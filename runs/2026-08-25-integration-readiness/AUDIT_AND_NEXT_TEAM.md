# AUDIT AND NEXT TEAM — Orchestrator

## Werdykt bieżącego cyklu
`DONE — QA PASS`

Bieżące zadanie integration readiness przeszło pełny pipeline:

`orchestrator -> product-owner-architect -> ux-ui-designer -> fullstack-developer -> content-writer -> qa-tester -> orchestrator`

Artefakty:
- `BUILD_BRIEF.md`
- `FEATURE_CONTRACT.md`
- `UI_SPEC.md`
- `IMPLEMENTATION_REPORT.md`
- `CONTENT_PASS.md`
- `QA_REPORT.md`

## Co jest dobre

### A. Multi-agent process — PASS
- istnieje nadrzędny `AGENTS.md`;
- role mają osobne kontrakty;
- pipeline ma handoffy i bramki;
- ten cykl pozostawił kompletny ślad decyzji w `runs/`;
- QA wykonało niezależny test, a nie tylko zaakceptowało deklarację Developera.

### B. Integration readiness — PASS
- jeden registry opisuje konektory;
- UI odróżnia readiness od live connection;
- brak sekretów i requestów zewnętrznych;
- Source of Truth nie został naruszony;
- stany i breakpointy zostały przetestowane w Playwright.

## Znaleziska całego repo

### P1 — dokumentacja nadrzędna jest niespójna z aktualnym stanem
`README.md` i `DALSZE_DZIALANIA.md` nadal opisują projekt jako Etap 1 i zabraniają backendu/realnych integracji. Jest to sprzeczne z:
- aktualnym poleceniem użytkownika,
- `AGENTS.md`,
- operacyjnym `mockup/README.md`,
- przygotowaniem do kolejnych integracji.

**Ryzyko:** kolejny agent może poprawnie przeczytać źródła, ale dostać sprzeczne polecenia z repo i zatrzymać rozwój.

**Owner następnego zadania:** Orchestrator + Product Owner / Architect.

### P1 — brak backend foundation
Repo nie ma obecnie manifestu/aplikacji backendowej (`package.json` ani `pyproject.toml` nie są obecne jako aplikacja produkcyjna). Nie istnieje endpoint statusu integracji, warstwa serwerowa ani trwały model danych.

**Ryzyko:** nie można bezpiecznie podłączyć PrestaShop/Allegro/DPD bez umieszczania sekretów po niewłaściwej stronie.

### P1 — polityka sekretów istnieje tylko jako kontrakt
Frontend prawidłowo mówi `server-only`, ale nie ma jeszcze serwera, secret store ani procedury rotacji/konfiguracji.

**Ryzyko:** pierwsza realna integracja może zostać wdrożona ad hoc.

### P2 — brak stałego CI dla testów UI/API
QA w tym cyklu użyło lokalnego Node + Playwright, ale repo nie ma utrwalonego test harnessu uruchamianego automatycznie przy zmianach.

**Ryzyko:** regresje mogą pojawić się po kolejnych commitach.

### P2 — dane biznesowe nadal są rozproszone jako demo
Zamówienia, wiadomości, produkty i część integracji nadal bazują na tablicach w kodzie frontendu. Registry integracji jest już oddzielone, ale reszta domen nie ma adapterów danych.

### P2 — brak zweryfikowanego deployment pipeline
Repo wskazuje docelowy `chatgpt.site`, ale nie posiada automatycznej, audytowalnej ścieżki repo -> test -> publikacja -> smoke test.

## Najlepsze następne zadanie

### `STAGE-02: Backend Foundation + PrestaShop Read-Only Adapter`

Dlaczego PrestaShop jako pierwszy:
1. jest naturalnym źródłem produktów i części danych operacyjnych panelu;
2. integracja read-only ma mniejsze ryzyko niż rozpoczęcie od zapisu/OAuth marketplace;
3. pozwala sprawdzić architekturę sekretów, statusów, błędów i adapterów bez wykonywania zmian biznesowych;
4. po poprawnym wzorcu można reużyć boundary dla Allegro, ERLI, DPD i n8n.

## Zespół wymagany do następnego zadania

### Core — obowiązkowy
1. `orchestrator` — prowadzi stage transition i bramki.
2. `product-owner-architect` — aktualizuje źródła prawdy, kontrakt API i model danych.
3. `fullstack-developer` w roli **Backend/API Lead** — tworzy backend foundation i adapter.
4. `qa-tester` w roli **API/Integration QA** — kontrakty, błędy, timeouty, retry, testy read-only.

### Nowi specjaliści — zalecani jako osobne role
5. `security-secrets-engineer` — secret storage, env policy, redaction logów, rotacja i granice dostępu.
6. `prestashop-integration-specialist` — Webservice/API, paginacja, mapowanie produktów/zamówień, ograniczenia wersji PrestaShop.
7. `devops-deployment-engineer` — środowisko backendu, health/readiness, CI i bezpieczne przekazywanie sekretów.

### On-call — nie muszą prowadzić całego cyklu
8. `ux-ui-designer` — tylko dla statusów loading/error/offline/partial-sync w panelu.
9. `content-writer` — tylko dla finalnego microcopy błędów/synchronizacji.

## Kolejność następnego pipeline

`orchestrator`
-> `product-owner-architect`
-> `security-secrets-engineer`
-> `prestashop-integration-specialist`
-> `fullstack-developer (Backend/API Lead)`
-> `devops-deployment-engineer`
-> `ux-ui-designer` (jeśli status UI się zmienia)
-> `content-writer` (jeśli copy się zmienia)
-> `qa-tester (API/Integration QA)`
-> `orchestrator`

## Gate przed rozpoczęciem kodowania backendu

Najpierw należy:
1. uaktualnić `README.md` i `DALSZE_DZIALANIA.md` do Stage 2;
2. wybrać runtime backendu (Python/FastAPI albo Node/TypeScript) i sposób deploymentu;
3. ustalić wyłącznie nazwy zmiennych środowiskowych — bez wpisywania sekretów do repo;
4. zdefiniować read-only endpointy pierwszego adaptera;
5. zdefiniować test fixtures i kryteria braku zapisu do PrestaShop.

## Orchestrator handoff

STATUS: PASS
OWNER: orchestrator
INPUT_USED: komplet bieżącego runu, AGENTS.md, repo tree, README.md, DALSZE_DZIALANIA.md, mockup/README.md
DECISIONS: bieżący feature DONE; następny krok to Stage 2 i backend read-only
CHANGED_FILES: runs/2026-08-25-integration-readiness/AUDIT_AND_NEXT_TEAM.md
ACCEPTANCE_CHECK: pełny pipeline + audyt + rekomendacja zespołu wykonane
RISKS: największe ryzyko to sprzeczna dokumentacja oraz rozpoczęcie live API bez secret boundary
NEXT_AGENT: orchestrator
NEXT_TASK: rozpocząć Stage 2 od aktualizacji source-of-truth docs i kontraktu PrestaShop read-only
