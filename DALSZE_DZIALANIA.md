# DALSZE DZIAŁANIA — 7DEJV.os

Ten plik jest wspólną instrukcją operacyjną dla dwóch rozmów ChatGPT.

## Role

### CHAT-A — audyt i koordynacja

CHAT-A:
- czyta repozytorium i zmiany od ostatniego audytu,
- sprawdza zgodność z aktualnym etapem,
- wykrywa braki, konflikty, duplikaty i przekroczenie zakresu,
- aktualizuje `AUDIT_REPORT.md`,
- aktualizuje ten plik wyłącznie wtedy, gdy następne działania rzeczywiście się zmieniły,
- zapisuje własny status w `README_A.md`,
- nie edytuje `README_B.md`,
- nie wykonuje pracy implementacyjnej przeznaczonej dla CHAT-B.

### CHAT-B — wykonanie

CHAT-B:
- czyta `README.md`, `PROJECT_VISION.md`, `README_A.md`, `README_B.md`, ten plik i pliki aktualnego etapu,
- wykonuje wyłącznie zadania oznaczone poniżej jako aktywne,
- nie rozszerza zakresu bez decyzji użytkownika,
- zapisuje postęp, blokady i wykonane działania w `README_B.md`,
- nie edytuje `README_A.md`,
- nie zmienia `AUDIT_REPORT.md`, chyba że użytkownik wyda takie polecenie.

## Harmonogram współpracy

Automatyzacje ChatGPT mogą działać najwyżej raz na godzinę. Dlatego oba czaty pracują co godzinę, ale z przesunięciem.

- CHAT-A — audyt: o pełnej godzinie, np. 20:00, 21:00, 22:00.
- CHAT-B — praca: 10 minut po pełnej godzinie, np. 20:10, 21:10, 22:10.

Takie przesunięcie daje CHAT-B około 50 minut pracy przed następnym audytem.

## Zasada pracy w toku

Jeżeli `README_B.md` zawiera status `PRACA W TOKU`, CHAT-A:
- nie zastępuje aktualnego zadania nowym,
- nie zmienia priorytetu tego zadania bez wyraźnego błędu lub blokady,
- może dopisać uwagi do kolejnego cyklu.

CHAT-B przed rozpoczęciem zadania wpisuje w `README_B.md`:

`Status: PRACA W TOKU`

Po zakończeniu wpisuje:

`Status: ZAKOŃCZONE`

albo:

`Status: ZABLOKOWANE`

## Aktualne zadanie

### Priorytet 1

Przygotować interaktywną makietę etapu 1 zgodnie z promptem użytkownika i katalogiem `stages/stage-01-mockup/`.

### Wymagane minimum

- działające przełączanie głównych modułów,
- działające otwieranie i przełączanie kart roboczych,
- możliwość zamknięcia i przypięcia karty,
- zachowanie otwartych kart podczas zmiany modułu,
- działające zwijanie, wysuwanie i przypinanie panelu agentów,
- demonstracyjne widoki: Dashboard, Zamówienia, Szczegóły zamówienia i Pakowanie,
- realistyczne dane demonstracyjne,
- brak backendu i rzeczywistych integracji.

### Działania do wykonania przez CHAT-B

1. Przeczytać materiały aktualnego etapu.
2. Przeanalizować prompt użytkownika.
3. Zaproponować strukturę makiety i komponentów.
4. Wykonać pierwszy spójny wariant makiety.
5. Sprawdzić działanie nawigacji i kart.
6. Zapisać w `README_B.md`:
   - co wykonano,
   - co działa,
   - co jest wyłącznie wizualne,
   - jakie wystąpiły blokady,
   - jaki jest następny najmniejszy krok.

## Czego teraz nie wykonywać

- backendu,
- bazy danych,
- rzeczywistego API,
- DPD, Allegro, Gmaila i PrestaShop API,
- prawdziwych agentów i harmonogramów,
- logowania i uprawnień,
- systemu aktualizacji,
- pełnego panelu produktów,
- map i planowania tras,
- zmian wykraczających poza makietę etapu 1.

## Reguła braku zmian

Jeżeli od ostatniego cyklu nie ma zmian:
- CHAT-A zapisuje `brak istotnych zmian` i nie tworzy nowych zadań,
- CHAT-B nie powtarza ukończonej pracy i nie wymyśla dodatkowych modułów.

## Kryterium zakończenia aktualnego zadania

Zadanie uznaje się za zakończone, gdy użytkownik może przejść przez podstawowe ekrany, otworzyć kilka kart, przełączać je, przypiąć panel agentów i wrócić do wcześniejszej karty bez utraty widoku.
