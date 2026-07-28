# Agenci i skille — wersja robocza dla wyglądu i architektury

Poniższy zestaw jest dobrany pod etap makiety, architekturę UI i kontrolę spójności. Najpierw pracuje mały rdzeń, a dopiero potem dochodzą role rozszerzające.

## 1) Rdzeń zespołu na teraz

| Rola | Odpowiedzialność | Co sprawdza |
|---|---|---|
| Koordynator zakresu | pilnuje granic etapu i kolejności prac | czy nie wchodzi backend, integracje i rzeczy produkcyjne |
| UX Architect | ustala hierarchię ekranów i układ informacji | czy lewy panel, centrum i prawy panel nie konkurują ze sobą |
| Frontend Prototyper | składa makietę HTML/CSS/JS | czy komponenty są klikalne, czytelne i spójne |
| Visual QA | sprawdza wygląd, odstępy i responsywność | czy projekt trzyma się FHD 24" i nie rozjeżdża się wizualnie |
| Prompt Compliance Reviewer | porównuje wynik z założeniem użytkownika | czy ekran nie gubi kluczowych funkcji i priorytetów |

## 2) Role rozszerzające dla architektury i wyglądu

| Rola | Po co ją dodać |
|---|---|
| Design System Agent | pilnuje kolorów, tokenów, odstępów i spójności komponentów |
| Layout & Density Agent | dopasowuje gęstość informacji do pracy operacyjnej |
| Workspace Tabs Agent | projektuje karty robocze, ich aktywację i zamykanie |
| Persistent Right Rail Agent | dba o panel agentów i szczegóły zamówienia bez konfliktu przestrzeni |
| Operations Table Agent | optymalizuje tabelę zamówień, filtry i statusy |
| State & Interaction Agent | opisuje stany pusty / loading / selected / pinned / error |
| Mobile / Narrow QA Agent | sprawdza zachowanie na mniejszych ekranach |

## 3) Skille potrzebne teraz

| Skill | Zastosowanie |
|---|---|
| `scope-control` | oddziela makietę od funkcji produkcyjnych |
| `backoffice-layout` | projektuje układ menu, centrum i prawego panelu |
| `workspace-tabs` | odpowiada za karty robocze podobne do przeglądarki |
| `persistent-agent-panel` | projektuje zwijany i przypinany prawy panel agentów |
| `operations-dashboard` | pokazuje problemy i działania operacyjne |
| `order-table-design` | buduje zwartą tabelę zamówień i filtry |
| `packing-panel-design` | wspiera panel pakowania i listę pozycji |
| `mock-data` | tworzy spójne dane demonstracyjne |
| `visual-audit` | sprawdza spójność, kontrast i zachowanie ekranów |

## 4) Skille pomocnicze z zewnątrz repo

Te skille nie są częścią samej logiki etapu 1, ale mogą pomóc, gdy będziemy dopracowywać układ albo później przenosić makietę do kodu.

| Skill | Kiedy użyć |
|---|---|
| `product-design:audit` | gdy trzeba ocenić istniejący ekran lub flow |
| `product-design:ideate` | gdy chcemy wygenerować warianty wizualne |
| `product-design:image-to-code` | gdy wybierzemy konkretny obraz lub makietę do odtworzenia |
| `ps9-admin-panel-builder` | gdy przechodzimy do budowy panelu PrestaShop 9 |
| `ps9-module-foundation` | gdy porządkujemy strukturę modułu |
| `ps9-module-qa-release` | gdy przygotowujemy testy i wydanie |
| `prestashop-module-dev` | gdy zaczynamy pracę nad właściwym modułem |
| `github:github` | gdy potrzebna jest orientacja w repo i PR-ach |
| `github:yeet` | gdy publikujemy zmiany na GitHubie |

## 5) Zalecana kolejność pracy

1. Koordynator zakresu.
2. UX Architect.
3. Frontend Prototyper.
4. Visual QA.
5. Prompt Compliance Reviewer.
6. Dopiero potem role rozszerzające, jeśli makieta nadal czegoś nie domyka.

## 6) Czego tu nie dodawać teraz

- backendu,
- realnych integracji,
- automatyzacji agentów,
- logowania i uprawnień,
- pełnej warstwy produktów,
- DPD i innych zewnętrznych API.

To ma pozostać roboczy zestaw do architektury strony i wyglądu.
