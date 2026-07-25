# 7DEJV.os — interaktywna makieta etapu 1

Lekka makieta HTML/CSS/JavaScript bez backendu, bazy danych i rzeczywistych integracji.

## Uruchomienie

Otwórz plik `index.html` w przeglądarce albo uruchom prosty serwer statyczny:

```bash
cd mockup
python -m http.server 8080
```

Następnie otwórz `http://localhost:8080`.

## Elementy działające w interfejsie

- przełączanie modułów Dashboard, Zamówienia i Pakowanie,
- podzakładki aktualnego modułu,
- otwieranie zamówień i zgłoszeń w kartach roboczych,
- przełączanie, przypinanie i zamykanie kart,
- zachowanie otwartych kart podczas nawigacji w bieżącej sesji,
- zwijanie, wysuwanie i przypinanie panelu agentów,
- wybór zgłoszenia i przejście do powiązanego zamówienia,
- otwarcie panelu pakowania,
- demonstracyjne potwierdzanie produktów.

## Ograniczenia etapu 1

- dane istnieją wyłącznie w pamięci przeglądarki,
- odświeżenie strony przywraca stan początkowy,
- brak komunikacji z PrestaShop, DPD, Gmailem i innymi usługami,
- brak rzeczywistych operacji biznesowych,
- komunikaty i działania agentów są demonstracyjne.
