# Personalizacja dashboardu — makieta

Data: 2026-07-27

## Zakres

Na podstawie adnotacji użytkownika dodano demonstracyjną personalizację panelu 7DEJV.os.

## Funkcje

### Profile użytkowników

Dostępne profile demonstracyjne:

- Administrator,
- Pakowanie,
- Obsługa klienta,
- własny profil utworzony przez formularz demonstracyjny.

Kliknięcie profilu na dole lewego menu albo przycisku użytkownika u góry otwiera przełącznik użytkownika.

Nie jest to prawdziwe uwierzytelnianie. Formularz nie sprawdza hasła, nie łączy się z backendem i nie nadaje uprawnień.

### Układ dashboardu

Przycisk `Układ` w górnym pasku pozwala:

- pokazywać i ukrywać panele,
- wybrać wyrazistą lub neutralną kolorystykę,
- włączyć tryb przesuwania paneli,
- przywrócić układ domyślny dla profilu.

Po włączeniu trybu przesuwania można:

- przeciągać kafle statystyk,
- zmieniać kolejność dużych paneli,
- ustalać kolor każdego panelu,
- ukrywać pojedyncze elementy.

### Zapisywanie ustawień

Ustawienia są przechowywane wyłącznie w `localStorage` przeglądarki i są rozdzielone według profilu użytkownika demonstracyjnego.

Odświeżenie strony zachowuje personalizację, ale usunięcie danych witryny lub użycie innej przeglądarki ją usuwa.

## Kolorystyka

Dodano wyraźne akcenty kolorystyczne dla:

- głównych kafli dashboardu,
- dużych paneli dashboardu,
- ikon modułów w lewym menu.

Podstawowy zaakceptowany układ i ciemne lewe menu pozostają zachowane.

## Kopia bezpieczeństwa

Stan przed wprowadzeniem personalizacji zapisano w gałęzi:

`backup/before-dashboard-personalization-2026-07-27`

Wcześniejszy zaakceptowany wariant etapu 1 nadal znajduje się w:

`backup/stage-01-approved-ui-2026-07-26`

## Ograniczenia

- brak prawdziwego logowania,
- brak serwera użytkowników,
- brak kontroli uprawnień,
- brak synchronizacji ustawień między urządzeniami,
- brak trwałego zapisu w bazie danych,
- personalizacja obejmuje obecnie dashboard, a nie wszystkie przyszłe moduły.
