# MASTER PROTOTYPE AUDIT — 7DEJV Order Operations v2

Data audytu: 2026-08-20
Branch: `agent/order-operations-prototype-v2`
Audytowany artefakt: `7DEJV_Order_Operations_Prototype_v2` (HTML/CSS/JS)

## 1. Werdykt

**Status: BLOCKED dla zamknięcia etapu, DOBRA BAZA do dalszych poprawek.**

Prototyp ma szerokie pokrycie wizualne i 60 renderowanych kombinacji moduł/podzakładka, ale nie spełnia jeszcze wszystkich P0 z `ACCEPTANCE.md`. Najważniejszy problem: aktualny smoke test sprawdza funkcje renderujące, a nie prawdziwe routes z `ROUTE_REGISTRY.md`.

Nie należy przebudowywać projektu od zera. Należy zachować istniejący layout, dane demonstracyjne, dashboard, listę zamówień, panel agentów, podstawy kompletacji/pakowania i rozszerzać je minimalnymi poprawkami kontraktowymi.

## 2. Co już działa i należy zachować

- kompletne główne menu 15 modułów;
- 60 renderowanych kombinacji modułów i podzakładek bez `Brak widoku` / `coming soon` w obecnym renderer smoke;
- realistyczne fixtures: zwykłe zamówienie, 19.8 kg, 27 kg, COD, brak płatności, brak telefonu, zwrot, reklamacja, zły tracking, ryby, paleta, wielopaczkowość;
- wyszukiwanie zamówień;
- otwieranie szczegółów zamówienia w kartach roboczych;
- podstawowa kompletacja i potwierdzanie pozycji;
- podstawowy ekran pakowania;
- oddzielne widoki Paczek i Przesyłek;
- porównanie wagi oczekiwanej/rzeczywistej i alert rozbieżności;
- human confirmation UI dla anulowania, refundacji, wiadomości AI i odłączenia integracji;
- centrum problemów;
- draft odpowiedzi AI wymagający zatwierdzenia;
- demonstracyjna mapa tras;
- mock integracji;
- widoczny focus dla głównych przycisków i podstawowe media queries;
- brak znalezionych sekretów/tokenów/API keys i brak zewnętrznych URL w kodzie prototypu;
- poprawna składnia JavaScript (`node --check`).

## 3. P0 — blokery kontraktu

### P0-01 — brak prawdziwego routingu
**Problem:** UI przełącza moduły przez stan JavaScript (`st.m`, `st.sub`). Nie istnieją URL routes `/orders`, `/packing`, `/customers/:customerId`, `/audit-log` itd.
**Narusza:** `ROUTE_REGISTRY.md`, `ACCEPTANCE.md` P0.
**Naprawa:** wprowadzić jeden route registry w kodzie i synchronizację URL ↔ ekran; dynamiczne order/customer fixtures.
**Agent prowadzący:** A4 Frontend Engineer.
**Review:** A3 Schema/Domain + A8 QA.
**Skills/procedury:** `cs-frontend-engineer`, `7dejv-stage-registry-builder`, `S003_TESTY_I_QA_PRO`.

### P0-02 — smoke test nie testuje kontraktu routes
**Problem:** `smoke()` iteruje po `M[module].s`, wywołuje `render()` i szuka tekstu. Nie otwiera routes, nie testuje aktywnej nawigacji, DOM, głównej akcji ani runtime błędów.
**Naprawa:** route-driven smoke test oparty o ten sam registry co router; później browser E2E.
**Agent:** A8 QA.
**Skills:** `7dejv-eval-generator`, `S003_TESTY_I_QA_PRO`.

### P0-03 — statusy nie są jednym rejestrem wykonywalnym
**Problem:** statusy są stringami w fixtures i akcjach; nie ma centralnego registry allowed transitions. `resolve` ustawia każde zamówienie na `READY_FOR_PICKING`.
**Narusza:** `STATUS_MACHINE.md` i P0 integralności domeny.
**Naprawa:** jeden `STATUS_REGISTRY` + `TRANSITIONS`; operacje korzystają wyłącznie z legalnych przejść i zapisują poprzedni/legalny etap.
**Agent:** A3 Schema/Domain Architect.
**Skills:** `7dejv-stage-registry-builder`, `7dejv-json-schema-hardener`.

### P0-04 — rozwiązanie problemu nie wraca do ostatniego legalnego etapu
**Problem:** każda akcja Resolve wymusza `READY_FOR_PICKING`, również dla błędów z późniejszych etapów.
**Naprawa:** Alert/Problem przechowuje `resumeStatus`; Resolve przywraca tylko legalny etap.
**Agent:** A5 Workflow Engineer.
**Review:** A3.
**Skills:** `S002_AUDYT_I_DEBUG_PRO`, `7dejv-stage-registry-builder`.

### P0-05 — wielopaczkowość jest wizualna, nie domenowa
**Problem:** `add-package` dodaje pustą paczkę o hard-coded expected 5.2 kg. Brak `packageItems[]`, przypisania OrderItem → Package i walidacji sum ilości.
**Narusza:** `DOMAIN_MODEL.md`, wymagany workflow wielopaczkowy.
**Naprawa:** utworzyć model `packages[]` z `packageItems[]`, kontrolą ilości i expected weight wyliczaną z itemów + tare.
**Agent:** A3 + A5.
**Skills:** `7dejv-json-schema-hardener`, `skill-orderpanelmvp-builder` jako referencja UX, `S003`.

### P0-06 — waga oczekiwana jest hard-coded
**Problem:** kontrakt wymaga `sum(expectedUnitWeight * quantity) + tareWeight`, natomiast prototyp przechowuje gotowe liczby `expected`.
**Naprawa:** package type/tare + wyliczenie expected weight z package items; tolerancja centralna.
**Agent:** A3/A5.
**Skills:** schema hardener + QA.

### P0-07 — brak human gate po przekroczeniu tolerancji wagi
**Problem:** alert rozbieżności jest widoczny, ale `Utwórz mock przesyłki` pozostaje możliwe bez zatwierdzenia rozbieżności.
**Narusza:** `STATUS_MACHINE.md` human gates.
**Naprawa:** blokada przejścia do shipment albo jawne `Akceptuj rozbieżność…` z confirmation + AuditEvent.
**Agent:** A5 + A7 Security.
**Skills:** `7dejv-agent-security-auditor`, `S003`.

### P0-08 — mock nadania nie tworzy Shipment
**Problem:** akcja tylko wyświetla `alert()`. Nie powstaje demonstracyjny `Shipment`, tracking, status ani AuditEvent.
**Naprawa:** mock adapter tworzy obiekt Shipment powiązany z Package IDs i aktualizuje UI.
**Agent:** A6 Integration Architect + A5.
**Skills:** `cs-backend-engineer`, `skill-dpd-api-adapter` (mock-first).

### P0-09 — audit log jest statyczny
**Problem:** ważne akcje nie zapisują `AuditEvent`; ekran logu pokazuje tylko trzy wpisane przykłady.
**Narusza:** `ACCEPTANCE.md` P0.
**Naprawa:** centralne `auditEvents[]`; status, scan, weight, package, resolve, refund mock, message approval, integration disconnect, shipment mock zapisują event.
**Agent:** A3 + A5.
**Skills:** schema architect / S003.

### P0-10 — brak dynamicznej karty klienta jako route/fixture
**Problem:** jest tabela klientów, lecz nie ma wykonanej ścieżki `/customers/:customerId` z powiązanymi zamówieniami i wiadomościami.
**Naprawa:** fixture Customer + karta klienta + linkowanie Orders/MessageThreads.
**Agent:** A4 + A5.
**Skills:** `cs-frontend-engineer`, `skill-html-css-js-backoffice`.

## 4. P1 — wymagane po P0

### P1-01 — kompletacja akceptuje tylko pierwszy item
`scan` ignoruje wpisaną wartość i potwierdza pierwszy element. `Zakończ kompletację` nie blokuje brakujących pozycji.

### P1-02 — brak wyboru typu opakowania/tary
Panel pakowania pokazuje paczki, ale nie realizuje kontraktu package type/tare.

### P1-03 — brak reprezentatywnego loading state
Są empty/error/warning, brak loading.

### P1-04 — role są częściowo symulowane
Tylko rola `Magazyn` ma częściowy redirect. Nawigacja nie jest filtrowana wg permission matrix; brak pełnego scenariusza Manager/Customer Service/Accounting/Read-only.

### P1-05 — regresja workspace tabs
W nowym prototypie zniknęły sprawdzone wcześniej: zamykanie i przypinanie kart oraz zachowanie kontekstu w formie z historycznej makiety.

### P1-06 — panel agentów stracił część UX
Brak zwijania/przypinania; przycisk `Filtr` nie ma obsłużonej akcji. Powiązanie ticket → order działa.

### P1-07 — Routes/Planowanie nie pozwala zmieniać kolejności stopów
Ekran jest tabelą; wymagane minimum to przypisanie stopów i reorder.

### P1-08 — mapa ma nieinteraktywne punkty
Piny są wizualne, brak wyboru punktu/kontekstu zamówienia.

### P1-09 — Kanały nie mają ręcznego mock sync
Pokazują status synchronizacji, ale brak wymaganej akcji.

### P1-10 — magazyn to generyczne dane
Brakuje realnej korelacji Stock/Reservation/Shortage z Order/OrderItem i filtrowania.

### P1-11 — Zadania nie mają zmiany statusu/przypisania
Widok statyczny.

### P1-12 — Raporty nie mają zmiany zakresu
KPI są statyczne.

### P1-13 — Automatyzacje nie mają toggle reguły
Widok statyczny.

### P1-14 — Finanse nie mają filtrów
Refund confirmation istnieje.

### P1-15 — przycisk Edytuj w draft AI jest martwy
Nie ma handlera ani edycji treści.

### P1-16 — dostępność elementów klikanych
`rowlink`/tickety są klikanymi `div`/`tr` bez pełnego keyboard semantics (`tabindex`, role/Enter/Space). Focus CSS istnieje dla głównych buttonów.

### P1-17 — brak breadcrumbs
Wymagane w P0 structural consistency, ale nie blokuje pracy nad workflow; wdrożyć razem z routerem.

## 5. P2/P3

- poprawić etykiety statusów dla polskiego operatora przy zachowaniu enumów wewnętrznych;
- unikać generycznego tekstu `wartość` w ekranach warehouse;
- poprawić rozróżnienie ostrzeżenia vs problem blokujący;
- ujednolicić tabele i toolbar między modułami;
- dopracować węższy desktop/tablet po zakończeniu P0/P1;
- ewentualne korekty kosmetyczne dopiero po visual QA.

## 6. Evidence

- `node --check app.js` — PASS.
- renderer smoke deklaruje 60 widoków i brak brakującego renderera — traktować wyłącznie jako test funkcji rendererów, nie route smoke.
- statyczny audit kodu potwierdził brak realnego routera URL, centralnego transition registry i dynamicznego audit log.
- secret scan: brak wykrytych tokenów/kluczy/sekretów w prototypie.
- external URL scan: brak zależności od zewnętrznych URL.
- próba lokalnego browser-run w środowisku koordynatora została zablokowana przez politykę runtime (`ERR_BLOCKED_BY_ADMINISTRATOR`), dlatego nie wolno oznaczyć Visual QA jako wykonane. Visual QA pozostaje HOLD do wykonania w środowisku preview/Replit lub innym dozwolonym browser runnerze.

## 7. Kolejność napraw

1. P0-01 + P0-02 — route registry/router/smoke.
2. P0-03 + P0-04 + P0-09 — status machine, resume status, audit events.
3. P0-05 + P0-06 + P0-07 — prawdziwy model paczek i gate wagi.
4. P0-08 — Shipment mock adapter.
5. P0-10 — Customer dynamic route.
6. P1-01/P1-02 — hardening picking/packing.
7. P1 role/accessibility/workspace tabs/agents.
8. P1 funkcje modułów pomocniczych.
9. browser E2E + visual QA + security/repository/docs audit.

## 8. Zasada koordynatora

Nie rozszerzać teraz zakresu o nowe moduły. Każda poprawka ma zamykać konkretny wpis P0/P1. `DONE` wykonawcy nie oznacza PASS: wymagany jest dowód, QA i ponowna kontrola koordynatora.
