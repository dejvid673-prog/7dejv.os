# Screen Matrix v2

| Moduł | Ekrany / podzakładki | Obowiązkowa interakcja prototypowa |
|---|---|---|
| Dashboard | Dzisiaj, Problemy, Priorytety | otwarcie kolejki / zamówienia |
| Zamówienia | Lista, Szczegóły | filtry, wyszukiwanie, otwarcie zamówienia |
| Kompletacja | Do kompletacji, W toku | skan/potwierdzenie pozycji |
| Pakowanie | Do spakowania, W toku, Zakończone | potwierdzanie produktów, wybór opakowania, waga |
| Paczki | Lista paczek | utworzenie/podział paczek mock |
| Przesyłki | Lista, tracking | wybór przewoźnika, mock nadania |
| Problemy | Krytyczne, Ostrzeżenia, Informacyjne | rozwiązanie problemu i powrót do procesu |
| Przewoźnicy | DPD, InPost, DHL | mock usług, walidacja wagi, etykieta demonstracyjna |
| Transport własny | Ryby, Palety | przypisanie do trasy |
| Produkty | Katalog | wyszukiwanie, karta produktu |
| Magazyn | Stany, Rezerwacje, Braki, Ruchy | korelacja ze zleceniem / filtrowanie |
| Kanały | PrestaShop, Allegro, ERLI | status synchronizacji, ręczny mock sync |
| Klienci | Lista, Karta klienta | powiązane zamówienia i wiadomości |
| Wiadomości | Wszystkie, Gmail, Allegro, ERLI, Szablony | otwarcie wątku, draft odpowiedzi mock |
| Zwroty | Zwroty | utworzenie zwrotu mock |
| Reklamacje | Reklamacje | rejestracja decyzji mock |
| Finanse | Płatności, Pobrania, Refundacje, Rozliczenia | filtry, human-gate dla refundacji |
| Trasy | Lista, Planowanie | przypisanie stopów, zmiana kolejności |
| Mapa | Mapa tras | interaktywne punkty demonstracyjne |
| Zadania | Moje, Zespół | zmiana statusu/przypisania |
| Alerty | Alerty | otwarcie kontekstu |
| Raporty | Operacje, Wysyłki, Magazyn, Sprzedaż | zmiana zakresu i KPI mock |
| Automatyzacje | Reguły, Historia | włącz/wyłącz regułę mock, historia wykonań |
| Agenci AI | Zespół, Kolejka, Historia | wybór agenta/zadania, bez autonomicznych operacji |
| Integracje | Kanały, przewoźnicy, Gmail | status, test połączenia mock, odłączenie z potwierdzeniem |
| System | Użytkownicy, Role, Audit log, Ustawienia | zmiana widoku roli, filtry audytu, ustawienia UI |

## Stany ekranu
Każdy typ ekranu przewiduje odpowiednie warianty: `loading`, `success`, `empty`, `warning`, `error`. W prototypie muszą istnieć co najmniej reprezentatywne przykłady stanów innych niż success.
