# UI_SPEC — UX/UI Designer

## Layout
Nie przebudowywać istniejącego modułu `Integracje`. Zachować:
- nagłówek strony,
- podzakładki,
- istniejącą tabelę,
- `Źródła prawdy` jako osobny widok.

Pod tabelą dodać sekcję `Gotowość adapterów` z kompaktowymi kartami konektorów.

## Karta konektora
Każda karta pokazuje:
1. nazwę usługi,
2. status tekstowy,
3. typ źródła danych,
4. transport/protokół,
5. jednozdaniowy `Następny krok`.

## Stany
- `demo` — dane demonstracyjne, brak połączenia;
- `ready` — boundary/adapter przygotowany, wymaga backendowej konfiguracji;
- `connected` — tylko gdy status potwierdza backend/live source;
- `error` — konfiguracja istnieje, ale kontrola wykazała błąd;
- `disabled` — integracja celowo wyłączona.

Status zawsze ma tekst. Kolor jest wyłącznie dodatkowym sygnałem.

## Akcja „Sprawdź połączenia”
Do czasu backendu zmienić znaczenie operacyjne na `Sprawdź gotowość` w warstwie rozszerzającej. Kliknięcie:
- nie wykonuje requestu do zewnętrznej usługi,
- odświeża lokalny timestamp,
- pokazuje komunikat: sprawdzono metadane adapterów; połączenia live wymagają backendu.

## Empty/error
- brak registry: komunikat „Brak rejestru adapterów — pokazano podstawowy widok integracji.”
- błąd localStorage: brak timestampu, ale bez blokowania widoku.

## Responsive
- >= 1200 px: 3 karty w rzędzie;
- 760–1199 px: 2 karty;
- < 760 px: 1 karta;
- nie wymuszać poziomego scrolla kart.

## Accessibility
- sekcja ma `aria-labelledby`;
- status i source kind są tekstowe;
- komunikat po sprawdzeniu ma `role=status` / `aria-live=polite`;
- karta nie jest klikalna, jeśli nie wykonuje akcji;
- nie dodawać sztucznych tabindexów.

## Ograniczenia
- żadnych pól token/API key;
- żadnego przycisku „Połącz”, dopóki nie istnieje bezpieczny backend flow;
- nie zmieniać `Źródła prawdy`.

STATUS: PASS
OWNER: ux-ui-designer
INPUT_USED: FEATURE_CONTRACT.md, agents/ux-ui-designer.md, mockup/modules-extension.js
DECISIONS: progressive enhancement zamiast przebudowy modułu
CHANGED_FILES: runs/2026-08-25-integration-readiness/UI_SPEC.md
ACCEPTANCE_CHECK: wszystkie AC mają reprezentację UI lub są świadomie bez-UI
RISKS: istniejący przycisk w bazowym module ma starszy tekst; runtime skoryguje etykietę
NEXT_AGENT: fullstack-developer
NEXT_TASK: wdrożyć registry + runtime enhancer + responsywne style bez sekretów i bez live requestów
