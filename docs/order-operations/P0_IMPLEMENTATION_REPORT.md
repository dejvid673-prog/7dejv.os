# P0 Implementation Report — 2026-08-20

## Status
Pierwsza paczka hardeningu P0 została przejęta bezpośrednio przez koordynatora po wyczerpaniu limitu Replit. Implementacja nie została rozpoczęta od zera — bazuje na istniejącym prototypie i zatwierdzonych kontraktach.

## Zaimplementowano lokalnie
- kanoniczny router URL dla modułów i podzakładek;
- dynamiczne `/orders/:orderId` i `/customers/:customerId`;
- centralny rejestr 17 statusów i legalnych przejść;
- blokowanie nielegalnych skoków statusu;
- powrót z problemu do zapamiętanego legalnego etapu;
- kompletację przez faktyczny SKU/EAN i kontrolę wymaganych ilości;
- osobne encje logiczne `Order`, `Package`, `Shipment`;
- `Package.items`, typ opakowania, tara, carrier, actual weight;
- wyliczanie expected weight z pozycji + tary;
- kontrolę wielopaczkowości względem ilości zamówionych;
- human approval gate dla rozbieżności wagi;
- mock Shipment z `packageIds` i trackingiem;
- dynamiczny Audit Log dla ważnych działań;
- lokalny serwer SPA z fallbackiem dla bezpośredniego wejścia/odświeżenia route.

## Dowody testowe
- `node --check app.js`: PASS;
- `python3 -m py_compile server.py`: PASS;
- route smoke: 62/62, failures 0;
- testy domenowe: 13/13 PASS;
- fallback HTTP dla 62 tras (w tym dynamiczne): failures 0.

Testy domenowe obejmują m.in. blokadę `READY_FOR_PICKING -> SHIPPED`, odrzucenie obcego skanu, akceptację EAN, kontrolę kompletności kompletacji, powrót z problemu do poprzedniego statusu, zgodność ilości wielopaczkowych, wzór expected weight, blokadę rozbieżności wagi, rozwiązanie problemu podziału paczek, tworzenie Shipment z package IDs oraz wpis AuditEvent.

## Gate niezamknięty
Visual QA nie jest oznaczony jako PASS. Przeglądarka dostępna w środowisku koordynatora blokuje lokalne `127.0.0.1` oraz `file://` polityką organizacji. Nie wolno traktować testów logicznych jako dowodu poprawności wizualnej. Visual QA pozostaje osobnym gate do wykonania w normalnym środowisku przeglądarkowym.

## Następny krok
1. zsynchronizować kod prototypu z gałęzią `agent/order-operations-prototype-v2`;
2. uruchomić Visual QA na komputerze użytkownika / środowisku preview;
3. poprawić regresje wizualne, jeśli wystąpią;
4. przejść do P1 bez dodawania nowego zakresu przed zamknięciem P0.
