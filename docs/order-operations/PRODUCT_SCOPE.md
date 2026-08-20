# 7DEJV Order Operations — Product Scope v2

## Cel
Zbudować kompletny, klikalny prototyp centrum operacyjnego obsługi zamówień dla PrestaShop, Allegro i ERLI. Prototyp ma odwzorować codzienną pracę: import zamówienia → walidacja → kompletacja → pakowanie → ważenie → paczki → wysyłka → synchronizacja → obsługa posprzedażowa.

## Zasada produktu
Pracownik nie powinien szukać, co ma zrobić następne. System ma prowadzić go przez kolejkę pracy i eksponować wyjątki.

## Zakres prototypu
Każdy widoczny moduł i każda podzakładka muszą mieć działający ekran demonstracyjny. Niedopuszczalne są martwe odnośniki, puste ekrany i „coming soon”. Integracje pozostają mockami — bez prawdziwych tokenów i operacji zewnętrznych.

### Moduły
1. Dashboard
2. Zamówienia i wysyłka
3. Produkty i magazyn
4. Kanały sprzedaży
5. Klienci
6. Wiadomości
7. Zwroty i reklamacje
8. Finanse
9. Trasy i mapa
10. Zadania
11. Raporty
12. Automatyzacje
13. Agenci AI
14. Integracje
15. System

## Krytyczne workflow
- zamówienie bez problemu: nowe → kompletacja → pakowanie → ważenie → paczki → wysyłka;
- zamówienie problemowe: wykrycie wyjątku → centrum problemów → rozwiązanie → powrót do procesu;
- zamówienie wielopaczkowe;
- waga oczekiwana vs rzeczywista;
- pobranie i oczekiwanie na płatność;
- zwrot/reklamacja/refundacja mock;
- wiadomość klienta powiązana z zamówieniem;
- dostawa własna/ryby/palety i planowanie trasy;
- role i widoczność funkcji;
- audit log każdej ważnej operacji demonstracyjnej.

## Poza zakresem pierwszego prototypu
- prawdziwe API i sekrety,
- realne płatności/refundacje,
- prawdziwe generowanie etykiet,
- produkcyjny backend i baza danych,
- automatyczne destrukcyjne działania agentów AI.

## Źródła decyzji
- aktualne wymagania użytkownika,
- istniejący mockup w `mockup/`,
- historyczne review Stage 1,
- kanoniczne/referencyjne procedury w `7dejv-agent-os`.
