# Domain Model v2

## Zasada nadrzędna
`Order`, `Package` i `Shipment` są oddzielnymi encjami. Jedno zamówienie może mieć wiele paczek i wiele przesyłek. Kanał sprzedaży nie definiuje modelu wewnętrznego — adapter mapuje dane zewnętrzne do wspólnego core.

## Encje rdzeniowe

### Order
- id, externalReference, channelId
- customerId, billingAddressId, deliveryAddressId
- paymentStatus, operationalStatus
- createdAt, promisedAt, notes
- items[]
- alerts[], tasks[], auditEvents[]

### OrderItem
- productId, sku, ean, name
- quantityOrdered, quantityPicked, quantityPacked
- unitWeightExpected

### Product / Stock
- Product: sku, ean, name, variant, expectedWeight, handlingFlags
- StockItem: onHand, reserved, available, location
- StockReservation
- StockMovement

### Package
- orderId
- packageType, tareWeight
- expectedWeight, actualWeight
- dimensions
- packageItems[]

### Shipment
- orderId
- carrierId, serviceId
- packageIds[]
- trackingNumber
- status

### Customer / Messages
- Customer, Address
- MessageThread, Message
- channel: Gmail / Allegro / ERLI / internal

### Finance
- Payment
- CODSettlement
- Refund
- Settlement

### After-sales
- Return
- ReturnItem
- Claim

### Operations
- Task
- Alert
- Route / RouteStop
- Integration / SyncJob / IntegrationEvent
- User / Role / Permission
- AuditEvent

## Flagi obsługi produktu
Przykładowe: `LIQUID`, `HEAVY`, `LIVE_FISH`, `PALLET_ONLY`, `FRAGILE`, `OWN_TRANSPORT`, `WEIGHT_SENSITIVE`.

## Zasada wagi
`expectedPackageWeight = sum(item.expectedUnitWeight * quantity) + tareWeight`.
System porównuje wagę oczekiwaną z rzeczywistą i generuje alert, jeśli tolerancja zostanie przekroczona.

## Adaptery
- SalesChannelAdapter: PrestaShop, Allegro, ERLI
- CarrierAdapter: DPD, InPost, DHL, own transport
- MessageAdapter: Gmail, Allegro, ERLI

UI komunikuje się z kontraktem aplikacji, nie bezpośrednio z API dostawcy.
