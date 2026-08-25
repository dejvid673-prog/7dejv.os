# Workflow: Multi-Agent Web Build

## Cel
Jedna procedura dla feature'ów, redesignu i rozbudowy RaFish Ops.

## 0. Orchestrator — intake
- przeczytaj polecenie i źródła prawdy;
- sklasyfikuj zadanie;
- utwórz Build Brief;
- wskaż zakres IN/OUT i ryzyka.

**Gate 0:** brief jest jednoznaczny.

## 1. Product Owner / Architect
Tworzy `FEATURE_CONTRACT`: flow, wymagania, dane, edge cases i mierzalne acceptance criteria.

**Gate 1:** każde wymaganie ma kryterium akceptacji.

## 2. UX/UI Designer
Tworzy `UI_SPEC`: layout, komponenty, interakcje, stany, breakpointy i dostępność.

**Gate 2:** wszystkie elementy kontraktu są odwzorowane w UX lub jawnie oznaczone jako bez-UI.

## 3. Full-Stack Developer
Implementuje najmniejszą pełną zmianę spełniającą kontrakt. Uruchamia dostępne testy i przygotowuje `IMPLEMENTATION_REPORT`.

**Gate 3:** brak znanego błędu blokującego podstawowy flow.

## 4. Content Writer
Wykonuje `CONTENT_PASS`: etykiety, CTA, komunikaty stanów i terminologia.

**Gate 4:** tekst nie wprowadza użytkownika w błąd i mieści się w projektowanym UI.

## 5. QA Tester
Wykonuje niezależny `QA_REPORT` dla funkcji, regresji, responsywności, WCAG, stanów i bezpieczeństwa.

**Gate 5:** `QA: PASS`.

Jeżeli FAIL:
- technika -> Developer -> ponownie QA;
- UX/WCAG -> UX/UI -> Developer -> Content (jeśli tekst dotknięty) -> QA;
- wymagania -> Product Owner -> cały wymagany fragment pipeline'u -> QA;
- copy -> Content -> QA.

## 6. Orchestrator — finalizacja
- sprawdza komplet handoffów;
- porównuje wynik z pierwotnym poleceniem;
- wymienia zmienione pliki, testy, ograniczenia i rzeczy nadal demonstracyjne;
- może oznaczyć DONE wyłącznie po QA PASS.

## Tryb szybkiej poprawki
Drobny bug może użyć: `Orchestrator -> Product Owner (mini contract) -> Developer -> QA -> Orchestrator`.
Nie używaj trybu szybkiego dla redesignu, nowych funkcji, integracji ani zmian przepływu użytkownika.

## Szablon zadania

```text
TASK_ID:
USER_GOAL:
TYPE: feature | bug | redesign | content | integration | audit
IN_SCOPE:
OUT_OF_SCOPE:
FILES/MODULES:
DATA/INTEGRATIONS:
ACCEPTANCE_CRITERIA:
CURRENT_OWNER:
STATUS:
HANDOFF_NOTES:
```
