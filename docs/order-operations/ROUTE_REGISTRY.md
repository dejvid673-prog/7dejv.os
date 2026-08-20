# Route Registry v2

Rejestr jest kontraktem dla nawigacji, routera, breadcrumbs, uprawnień i testów smoke.

| Route | Ekran |
|---|---|
| `/` | Dashboard |
| `/dashboard/problems` | Problemy i priorytety |
| `/orders` | Lista zamówień |
| `/orders/:orderId` | Szczegóły zamówienia |
| `/picking` | Kompletacja |
| `/packing` | Pakowanie |
| `/packages` | Paczki |
| `/shipments` | Przesyłki |
| `/problems` | Centrum problemów |
| `/shipping/dpd` | DPD |
| `/shipping/inpost` | InPost |
| `/shipping/dhl` | DHL |
| `/shipping/fish` | Ryby / dostawa własna |
| `/shipping/pallets` | Palety |
| `/products` | Produkty |
| `/stock` | Stany magazynowe |
| `/reservations` | Rezerwacje |
| `/shortages` | Braki |
| `/stock-movements` | Ruchy magazynowe |
| `/channels` | Kanały sprzedaży |
| `/channels/prestashop` | PrestaShop |
| `/channels/allegro` | Allegro |
| `/channels/erli` | ERLI |
| `/customers` | Klienci |
| `/customers/:customerId` | Karta klienta |
| `/messages` | Wiadomości |
| `/messages/gmail` | Gmail |
| `/messages/allegro` | Wiadomości Allegro |
| `/messages/erli` | Wiadomości ERLI |
| `/messages/templates` | Szablony |
| `/returns` | Zwroty |
| `/claims` | Reklamacje |
| `/payments` | Płatności |
| `/cod` | Pobrania |
| `/refunds` | Refundacje |
| `/settlements` | Rozliczenia |
| `/routes` | Trasy |
| `/map` | Mapa |
| `/tasks` | Zadania |
| `/alerts` | Alerty |
| `/reports` | Raporty operacyjne |
| `/automation/rules` | Reguły automatyzacji |
| `/automation/runs` | Historia automatyzacji |
| `/agents` | Agenci AI |
| `/integrations` | Integracje |
| `/users` | Użytkownicy |
| `/roles` | Role i uprawnienia |
| `/audit-log` | Audit log |
| `/settings` | Ustawienia |

## Reguły odbioru
- każdy wpis ma odpowiadający ekran;
- każda pozycja nawigacji wskazuje wpis registry;
- żaden wpis nie może renderować wyłącznie placeholdera;
- dynamiczne routes mają co najmniej jeden fixture demonstracyjny;
- test smoke przechodzi po wszystkich routes.
