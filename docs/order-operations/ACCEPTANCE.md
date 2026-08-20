# Acceptance Gates — Order Operations Prototype v2

Prototyp nie jest uznany za ukończony na podstawie deklaracji wykonawcy. Wymaga dowodów i przeglądu koordynatora.

## P0 — kompletność strukturalna
- 100% routes z `ROUTE_REGISTRY.md` ma działające widoki;
- 0 martwych pozycji menu;
- 0 ekranów ograniczonych do `coming soon` / pustego placeholdera;
- wszystkie dynamiczne route mają fixture demonstracyjny;
- nawigacja główna, podzakładki i breadcrumbs są spójne.

## P0 — krytyczne workflow
Muszą przejść demonstracyjnie:
1. nowe zamówienie → kompletacja → pakowanie → ważenie → paczki → wysyłka;
2. problem → centrum problemów → rozwiązanie → powrót do procesu;
3. zamówienie wielopaczkowe;
4. rozbieżność wagi;
5. zwrot/refundacja mock z potwierdzeniem;
6. wiadomość klienta → zamówienie → odpowiedź draft mock;
7. transport własny → trasa.

## P0 — integralność domeny
- Order, Package i Shipment pozostają oddzielnymi encjami;
- statusy są wybierane z jednego rejestru;
- każda ważna akcja demonstracyjna może zostać pokazana w audit log;
- UI nie zawiera prawdziwych tokenów, kluczy ani danych osobowych.

## P1 — UX operacyjny
- Dashboard eksponuje wyjątki i kolejne działania;
- lista zamówień ma szybkie filtry i wyszukiwanie;
- panel pakowania eksponuje SKU/EAN, ilość, wagę i postęp;
- różnica wagi oczekiwanej/rzeczywistej jest widoczna;
- akcje destrukcyjne wymagają potwierdzenia;
- role zmieniają widoczność funkcji demonstracyjnie.

## P1 — stany i dostępność
- reprezentatywne loading/empty/warning/error;
- obsługa klawiatury dla głównych kontrolek;
- widoczny focus;
- sensowne etykiety formularzy i kontrolek;
- brak krytycznych problemów kontrastu w głównych ekranach.

## Test smoke
Dla każdego route:
- otwórz;
- sprawdź nagłówek;
- sprawdź aktywną nawigację;
- sprawdź obecność głównej treści/akcji;
- sprawdź brak nieobsłużonego błędu JS;
- sprawdź, że ekran nie jest placeholderem.

## Wynik
- `PASS`: wszystkie P0 i P1 spełnione lub P1 ma wyłącznie drobne poprawki kosmetyczne bez wpływu na workflow;
- `HOLD`: działa rdzeń, ale brakuje wymaganej funkcji/ekranu P1;
- `BLOCKED`: brak P0, niespójny model, martwe routes albo krytyczny błąd działania.
