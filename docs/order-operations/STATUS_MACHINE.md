# Status Machine v2

## Statusy operacyjne zamówienia
- `NEW`
- `PAYMENT_PENDING`
- `VALIDATED`
- `STOCK_PROBLEM`
- `READY_FOR_PICKING`
- `PICKING`
- `PICKED`
- `PACKING`
- `PACKED`
- `READY_TO_SHIP`
- `SHIPPED`
- `DELIVERED`
- `ON_HOLD`
- `CANCELLED`
- `RETURN_REQUESTED`
- `RETURNED`
- `CLAIM`

## Główna ścieżka
`NEW → VALIDATED → READY_FOR_PICKING → PICKING → PICKED → PACKING → PACKED → READY_TO_SHIP → SHIPPED → DELIVERED`

## Odnogi kontrolowane
- `NEW → PAYMENT_PENDING → VALIDATED`
- `VALIDATED → STOCK_PROBLEM → READY_FOR_PICKING`
- etapy przed wysyłką mogą przejść do `ON_HOLD` przy błędzie danych, płatności, magazynu lub wysyłki;
- `ON_HOLD` wraca wyłącznie do ostatniego legalnego etapu po rozwiązaniu problemu;
- anulowanie jest możliwe tylko przed finalną wysyłką i wymaga potwierdzenia;
- zwrot/reklamacja zaczynają osobny proces posprzedażowy po wysyłce/dostawie.

## Zasady
- statusy kanałów zewnętrznych są mapowane przez adapter i nie zastępują statusów wewnętrznych;
- każda zmiana statusu tworzy `AuditEvent`;
- automatyzacja nie może ominąć etapu wymagającego człowieka;
- w prototypie destrukcyjne akcje są symulowane i wymagają potwierdzenia UI.

## Human gates w prototypie
- anulowanie zamówienia;
- refundacja;
- ręczne wymuszenie statusu;
- zaakceptowanie istotnej rozbieżności wagi;
- wysłanie przygotowanej przez AI odpowiedzi;
- odłączenie integracji.
