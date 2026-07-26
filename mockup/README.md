# 7DEJV.os — interaktywna makieta etapu 1

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
- `prompt-alignment.js` — demonstracyjny agent klienta, zgłoszenie klienta i ujednolicenie opisów.

## Elementy działające w interfejsie

- przełączanie modułów Dashboard, Zamówienia + wysyłka i Pakowanie,
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

Stan sprzed korekt zgodności znajduje się w gałęzi:

```text
backup/stage-01-approved-ui-2026-07-26
```

Instrukcja przywracania:

```text
stages/stage-01-mockup/BACKUP.md
```

## Ograniczenia etapu 1

- dane istnieją wyłącznie w pamięci przeglądarki,
- odświeżenie strony przywraca stan początkowy,
- brak komunikacji z PrestaShop, DPD, Gmailem i innymi usługami,
- brak rzeczywistych operacji biznesowych,
- komunikaty i działania agentów są demonstracyjne.
