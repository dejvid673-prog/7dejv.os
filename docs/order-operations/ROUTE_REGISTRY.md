# Route Registry v2.1

Rejestr jest kontraktem dla nawigacji, routera, breadcrumbs, uprawnień i testów smoke. Każda widoczna podzakładka ma własną kanoniczną trasę. Aliasy wejściowe mogą przekierować do trasy kanonicznej, ale testy używają tras z tej tabeli.

| Route | Moduł | Ekran / podzakładka |
|---|---|---|
| `/` | Dashboard | Dzisiaj |
| `/dashboard/problems` | Dashboard | Problemy |
| `/dashboard/priorities` | Dashboard | Priorytety |
| `/orders` | Zamówienia i wysyłka | Zamówienia |
| `/orders/:orderId` | Zamówienia i wysyłka | Szczegóły zamówienia |
| `/picking` | Zamówienia i wysyłka | Kompletacja |
| `/packing` | Zamówienia i wysyłka | Pakowanie |
| `/packages` | Zamówienia i wysyłka | Paczki |
| `/shipments` | Zamówienia i wysyłka | Przesyłki |
| `/problems` | Zamówienia i wysyłka | Problemy |
| `/shipping/dpd` | Zamówienia i wysyłka | DPD |
| `/shipping/inpost` | Zamówienia i wysyłka | InPost |
| `/shipping/dhl` | Zamówienia i wysyłka | DHL |
| `/shipping/fish` | Zamówienia i wysyłka | Ryby / dostawa własna |
| `/shipping/pallets` | Zamówienia i wysyłka | Palety |
| `/products` | Produkty i magazyn | Produkty |
| `/stock` | Produkty i magazyn | Stany |
| `/reservations` | Produkty i magazyn | Rezerwacje |
| `/shortages` | Produkty i magazyn | Braki |
| `/stock-movements` | Produkty i magazyn | Ruchy magazynowe |
| `/channels` | Kanały sprzedaży | Podsumowanie |
| `/channels/prestashop` | Kanały sprzedaży | PrestaShop |
| `/channels/allegro` | Kanały sprzedaży | Allegro |
| `/channels/erli` | Kanały sprzedaży | ERLI |
| `/customers` | Klienci | Klienci |
| `/customers/history` | Klienci | Historia |
| `/customers/segments` | Klienci | Segmenty |
| `/customers/:customerId` | Klienci | Karta klienta |
| `/messages` | Wiadomości | Wszystkie |
| `/messages/gmail` | Wiadomości | Gmail |
| `/messages/allegro` | Wiadomości | Allegro |
| `/messages/erli` | Wiadomości | ERLI |
| `/messages/templates` | Wiadomości | Szablony |
| `/returns` | Zwroty i reklamacje | Zwroty |
| `/claims` | Zwroty i reklamacje | Reklamacje |
| `/payments` | Finanse | Płatności |
| `/cod` | Finanse | Pobrania |
| `/refunds` | Finanse | Refundacje |
| `/settlements` | Finanse | Rozliczenia |
| `/routes` | Trasy | Lista tras |
| `/routes/planning` | Trasy | Planowanie |
| `/map` | Trasy | Mapa |
| `/tasks` | Zadania | Moje |
| `/tasks/team` | Zadania | Zespół |
| `/alerts` | Zadania | Alerty |
| `/reports/operations` | Raporty | Operacje |
| `/reports/shipping` | Raporty | Wysyłki |
| `/reports/warehouse` | Raporty | Magazyn |
| `/reports/sales` | Raporty | Sprzedaż |
| `/automation/rules` | Automatyzacje | Reguły |
| `/automation/runs` | Automatyzacje | Historia wykonań |
| `/agents` | Agenci AI | Zespół agentów |
| `/agents/queue` | Agenci AI | Kolejka |
| `/agents/history` | Agenci AI | Historia |
| `/integrations/channels` | Integracje | Kanały |
| `/integrations/carriers` | Integracje | Przewoźnicy |
| `/integrations/messages` | Integracje | Wiadomości |
| `/integrations/logs` | Integracje | Logi |
| `/users` | System | Użytkownicy |
| `/roles` | System | Role i uprawnienia |
| `/audit-log` | System | Audit log |
| `/settings` | System | Ustawienia |

## Reguły dynamiczne
- `/orders/:orderId` musi posiadać co najmniej jeden fixture i otwierać wskazane zamówienie po bezpośrednim wejściu w URL.
- `/customers/:customerId` musi posiadać co najmniej jeden fixture i pokazywać klienta wraz z powiązanymi zamówieniami i wiadomościami.
- trasy statyczne takie jak `/customers/history` i `/customers/segments` mają pierwszeństwo przed dopasowaniem dynamicznego `:customerId`.

## Reguły odbioru
- każdy wpis ma odpowiadający ekran;
- każda pozycja głównej i górnej nawigacji wskazuje wpis registry;
- żaden wpis nie może renderować wyłącznie placeholdera;
- dynamiczne routes mają co najmniej jeden fixture demonstracyjny;
- bezpośrednie wejście w URL i odświeżenie widoku zachowuje ekran w środowisku preview;
- test smoke iteruje po registry, a nie po osobnej ręcznie utrzymywanej liście;
- router, sidebar, subnav, breadcrumbs, permissions i testy korzystają z tego samego źródła danych.
