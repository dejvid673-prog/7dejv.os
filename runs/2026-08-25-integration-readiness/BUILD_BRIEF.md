# BUILD BRIEF — Integration Readiness

TASK_ID: `integration-readiness-2026-08-25`
TYPE: `integration / feature`

## USER_GOAL
Przy użyciu Orchestratora poprowadzić zespół Product Owner -> UX/UI -> Full-Stack -> Content -> QA przez realne zadanie rozwojowe RaFish Ops, a następnie wykonać audyt i wskazać zespół do kolejnego zadania.

## CEL BIEŻĄCEGO CYKLU
Oddzielić w panelu stan danych demonstracyjnych od gotowości do danych live oraz przygotować bezpieczną warstwę adapterów integracyjnych bez sekretów w frontendzie.

## IN SCOPE
- centralny rejestr adapterów integracji;
- jawne stany: `demo`, `ready`, `connected`, `error`, `disabled`;
- bezpieczne metadane konektorów bez sekretów;
- ekran statusu integracji rozróżniający dane demo od połączenia live;
- komunikaty operacyjne i wskazanie następnego kroku;
- dokumentacja handoffów pięciu agentów;
- QA i audyt końcowy.

## OUT OF SCOPE
- prawdziwe logowanie OAuth;
- wpisywanie tokenów/API keys w przeglądarce;
- zapis do PrestaShop, Allegro, ERLI lub DPD;
- backend produkcyjny;
- migracja całego frontendu do React/Vite.

## DOTKNIĘTE MODUŁY
- Integracje;
- pośrednio Produkty i Zamówienia jako przyszli konsumenci adapterów.

## RYZYKA
- UI może sugerować aktywne połączenie mimo braku backendu;
- przypadkowe umieszczenie sekretu w kodzie przeglądarkowym;
- duplikowanie statusów integracji w kilku plikach;
- regresja istniejącej nawigacji.

## ACCEPTANCE CRITERIA
1. Jeden centralny rejestr adapterów opisuje wszystkie integracje.
2. Każda integracja ma jednoznaczny `mode/status`, który nie udaje połączenia live.
3. UI wyjaśnia, czy dane są demo, snapshotem czy pochodzą z API.
4. Brak pól i kodu przeznaczonego do przechowywania sekretów w frontendzie.
5. Istniejący moduł `Źródła prawdy` nadal działa.
6. QA wykonuje niezależną kontrolę kodu i wystawia werdykt.
