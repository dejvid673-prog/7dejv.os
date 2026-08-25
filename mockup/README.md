# RaFish Ops — interaktywny panel operacyjny

Frontend HTML/CSS/JavaScript przygotowany jako warstwa operacyjna 7DEJV.os. Dane biznesowe są nadal demonstracyjne, ale główne moduły mają już kompletne widoki i przepływy UI gotowe do podpięcia pod adaptery API.

## Uruchomienie lokalne

```powershell
cd "$HOME\Desktop\7dejv.os"
git pull
python -m http.server 8080 --directory "$HOME\Desktop\7dejv.os\mockup"
```

Następnie otwórz `http://localhost:8080`.

## Moduły

- Dashboard — KPI, alerty, otwarte karty, kolejka operacyjna.
- Zamówienia + wysyłka — istniejący przepływ zamówień.
- Pakowanie — istniejący przepływ kompletacji.
- Wiadomości — wspólna kolejka Allegro / sklep / ERLI / e-mail, filtrowanie, statusy i akcje gotowe do adaptera API.
- Mapa i trasy — widok operacyjny tras, plan kierowcy i makieta mapy pod przyszły provider map.
- Produkty — katalog SKU, EAN, stany, rezerwacje, problemy i uruchamianie audytu.
- Agenci — pięć ról: Product Owner / Architekt, UX/UI Designer, Full-Stack Developer, Content Writer, QA Tester oraz pipeline wdrożeniowy.
- Integracje — GitHub jako źródło prawdy oraz statusy PrestaShop, Allegro, ERLI, DPD i n8n.
- Ustawienia — podstawowa konfiguracja workspace i ustawienia lokalne.

## Architektura integracji

UI jest przygotowane jako warstwa nad adapterami. Obecne dane demonstracyjne mogą zostać podmienione kolejno na:

1. PrestaShop Webservice / REST,
2. Allegro OAuth2 + REST,
3. ERLI API,
4. DPD API,
5. n8n webhook / REST,
6. backend autoryzacji i ról.

Sekrety i tokeny nie mogą znajdować się w repozytorium ani w kodzie przeglądarkowym.

### Integration readiness

Warstwa gotowości integracji jest rozdzielona na:

- `integration-registry.js` — centralny rejestr konektorów i jawne stany `demo / ready / connected / error / disabled`,
- `integration-readiness.js` — bezpieczne rozszerzenie widoku `Integracje`, lokalna walidacja registry i komunikaty stanu,
- `integration-readiness.css` — responsywny układ kart gotowości.

`Sprawdź gotowość` nie wykonuje requestów do zewnętrznych usług. Kontroluje wyłącznie spójność lokalnego rejestru adapterów i zapisuje czas ostatniej kontroli w `localStorage`.

Status `Źródło aktywne` może być użyty wyłącznie dla źródła, które rzeczywiście ma aktywny charakter w aktualnej architekturze. Obecnie GitHub oznacza wersjonowaną migawkę, natomiast PrestaShop, Allegro, ERLI, DPD i n8n pozostają gotowe do przyszłej konfiguracji backendowej.

## Dane i stan

- dane zamówień, klientów, produktów i agentów pozostają demonstracyjne,
- część preferencji użytkownika jest zapisywana w `localStorage`,
- GitHub Source of Truth korzysta z wersjonowanej migawki,
- moduły biznesowe nie wykonują jeszcze zewnętrznych operacji zapisu.

## QA / dostępność

Nowe widoki korzystają z istniejącej semantyki panelu, tabel przewijalnych poziomo oraz breakpointów dla tabletów i urządzeń mobilnych. Akcje są elementami `button`, pola filtrów są obsługiwane klawiaturą, a tekst statusów nie opiera się wyłącznie na kolorze.

Warstwa integration readiness została sprawdzona statycznie oraz w headless Chromium przez Playwright: renderowanie stanów, akcja lokalnego sprawdzenia, fallback bez registry oraz responsywny układ 3/2/1 kolumna.

## Publikacja

Kod źródłowy panelu znajduje się w katalogu `mockup/`. Docelowy adres publikacji Sites:

`https://rafish-ops.rafish-ai1998.chatgpt.site`

Samo repozytorium nie przechowuje konfiguracji publikacji ani sekretów Sites.
