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
- `modules-extension.js` — działająca nawigacja dodatkowych modułów,
- `dashboard-personalization.css` — kolory, tryb edycji dashboardu, profile i okna dialogowe,
- `dashboard-personalization.js` — ustawienia paneli, kolejność, profile użytkowników i logowanie demonstracyjne.

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

## Personalizacja użytkownika

Przycisk `Układ` w górnym pasku pozwala:

- pokazywać i ukrywać panele dashboardu,
- przełączać wyrazistą albo neutralną kolorystykę,
- włączyć przeciąganie paneli,
- zmieniać kolejność kafli i dużych paneli,
- wybierać kolor poszczególnych elementów,
- przywrócić domyślny układ danego profilu.

Kliknięcie profilu użytkownika na dole lewego menu albo przycisku użytkownika u góry pozwala:

- przełączyć profil Administrator,
- przełączyć profil Pakowanie,
- przełączyć profil Obsługa klienta,
- utworzyć własny profil demonstracyjny,
- wykonać demonstracyjne wylogowanie.

Ustawienia personalizacji są przechowywane w `localStorage` osobno dla każdego profilu. Nie jest to prawdziwe logowanie i nie istnieje kontrola uprawnień po stronie serwera.

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
- demonstracyjne potwierdzanie produktów,
- personalizacja widoczności, kolorów i kolejności paneli dashboardu,
- przełączanie demonstracyjnych profili użytkowników.

## Kopie bezpieczeństwa

Stan sprzed późniejszych korekt znajduje się w gałęzi:

```text
backup/stage-01-approved-ui-2026-07-26
```

Stan bezpośrednio przed dodaniem personalizacji użytkownika znajduje się w:

```text
backup/before-dashboard-personalization-2026-07-27
```

Instrukcja wcześniejszego przywracania:

```text
stages/stage-01-mockup/BACKUP.md
```

## Ograniczenia

- dane biznesowe istnieją wyłącznie w pamięci przeglądarki,
- karty robocze i proces pakowania wracają do stanu początkowego po odświeżeniu,
- ustawienia dashboardu i profil demonstracyjny są zapisane tylko lokalnie w bieżącej przeglądarce,
- nowe moduły są obecnie szkieletami do kolejnego projektowania,
- brak komunikacji z PrestaShop, DPD, Gmailem i innymi usługami,
- brak prawdziwego logowania, autoryzacji i ról serwerowych,
- brak rzeczywistych operacji biznesowych,
- komunikaty i działania agentów są demonstracyjne.
