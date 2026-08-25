# CONTENT_PASS — Content Writer

## Terminologia kanoniczna
- `Gotowy do konfiguracji` — adapter/boundary jest przygotowany, ale nie ma potwierdzonego połączenia live.
- `Źródło aktywne` — źródło faktycznie używane w aktualnej architekturze.
- `Demo` — dane demonstracyjne.
- `Błąd` — konfiguracja/adapter zgłasza problem.
- `Wyłączony` — integracja celowo nieaktywna.
- `Sprawdź gotowość` — lokalna kontrola registry; nie sugeruje połączenia z usługą.

## Teksty zatwierdzone
- `Gotowość adapterów`
- `Stan techniczny bez przechowywania sekretów w przeglądarce`
- `Ostatnie sprawdzenie`
- `Źródło danych`
- `Transport`
- `Polityka sekretów`
- `Następny krok`
- komunikat: `Nie wykonano połączeń zewnętrznych — test dotyczył wyłącznie gotowości lokalnej konfiguracji.`

## Korekty znaczeniowe względem starego UI
- `Sprawdź połączenia` -> `Sprawdź gotowość`.
- statusy typu `Test API OK` nie są już traktowane jako dowód aktywnego połączenia w nowej warstwie.
- `GitHub` opisuje snapshot, a nie nieokreślone live API.

## Empty / error / safety copy
- brak registry: `Brak rejestru adapterów` + informacja, że żadne połączenie nie zostaje oznaczone jako aktywne.
- invalid registry: liczba niepoprawnych wpisów + jawna informacja, że nie wykonano połączeń zewnętrznych.

## Ocena
Teksty nie obiecują funkcji, której panel nie wykonuje. Terminologia jest operacyjna i krótsza od technicznego opisu implementacji.

STATUS: PASS
OWNER: content-writer
INPUT_USED: UI_SPEC.md, IMPLEMENTATION_REPORT.md, integration-registry.js, integration-readiness.js
DECISIONS: readiness != live connection
CHANGED_FILES: runs/2026-08-25-integration-readiness/CONTENT_PASS.md
ACCEPTANCE_CHECK: copy jednoznaczne, bez fałszywych obietnic
RISKS: po dodaniu backendu teksty `ready/connected` muszą być zasilane realnym statusem serwera
NEXT_AGENT: qa-tester
NEXT_TASK: niezależnie sprawdzić AC, stany, bezpieczeństwo, responsywność i regresję Source of Truth
