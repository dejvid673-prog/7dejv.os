# 7DEJV.os — interaktywna makieta

Lekka makieta HTML/CSS/JavaScript bez backendu, bazy danych i rzeczywistych integracji.

## Aktualizacja lokalnej kopii

Jeżeli repozytorium znajduje się już na komputerze:

```powershell
cd "$HOME\Desktop\7dejv.os"
git pull
```

Po aktualizacji wykonaj w przeglądarce twarde odświeżenie:

```text
Ctrl + F5
```

## Uruchomienie

```powershell
python -m http.server 8080 --directory "$HOME\Desktop\7dejv.os\mockup"
```

Następnie otwórz:

```text
http://localhost:8080
```

## Pliki makiety

- `index.html` — główny szkielet,
- `styles.css` — zaakceptowany podstawowy styl,
- `app.js` — bazowe dane i interakcje etapu 1,
- `prompt-alignment.css` — małe korekty zgodności z pierwotnym promptem,
- `prompt-alignment.js` — demonstracyjny agent klienta, zgłoszenie klienta i ujednolicenie opisów,
- `modules-extension.css` — układ pełnej nawigacji i ekranów startowych,
- `modules-extension.js` — działająca nawigacja dodatkowych modułów.

## Główne moduły w lewym menu

- Dashboard,
- Zamówienia + wysyłka,
- Pakowanie,
- Wiadomości,
- Mapa i trasy,
- Produkty,
- Agenci,
- Integracje,
- Ustawienia.

Dashboard, Zamówienia + wysyłka i Pakowanie zawierają dotychczasowe interakcje. Pozostałe moduły mają działającą nawigację, podzakładki i lekkie ekrany startowe. Nie wykonują jeszcze funkcji biznesowych.

## Elementy działające w interfejsie

- przełączanie wszystkich głównych modułów,
- podzakładki aktualnego modułu,
- otwieranie zamówień i zgłoszeń w kartach roboczych,
- przełączanie, przypinanie i zamykanie kart,
- zachowanie otwartych kart podczas nawigacji w bieżącej sesji,
- zwijanie, wysuwanie i przypinanie panelu agentów,
- wybór zgłoszenia i przejście do powiązanego zamówienia,
- demonstracyjne zgłoszenie klienta przetworzone przez agenta,
- filtrowanie kolejki według agentów,
- otwarcie panelu pakowania,
- demonstracyjne potwierdzanie produktów.

## Kopia zaakceptowanego wyglądu

Stan sprzed późniejszych korekt znajduje się w gałęzi:

```text
backup/stage-01-approved-ui-2026-07-26
```

Instrukcja przywracania:

```text
stages/stage-01-mockup/BACKUP.md
```

## Ograniczenia

- dane istnieją wyłącznie w pamięci przeglądarki,
- odświeżenie strony przywraca stan początkowy,
- nowe moduły są obecnie szkieletami do kolejnego projektowania,
- brak komunikacji z PrestaShop, DPD, Gmailem i innymi usługami,
- brak rzeczywistych operacji biznesowych,
- komunikaty i działania agentów są demonstracyjne.
