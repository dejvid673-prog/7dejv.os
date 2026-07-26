# Porównanie makiety z pierwotnym promptem

Data przeglądu: 2026-07-26

## Cel

Porównać zaakceptowaną makietę etapu 1 z pierwotnym opisem panelu 7DEJV.os i poprawić wyłącznie elementy, które mają znaczenie dla rdzenia obecnego etapu. Przegląd nie rozszerza prac o backend, rzeczywiste integracje ani pełne moduły przyszłych etapów.

## Kopia zapasowa

Przed wprowadzeniem zmian utworzono gałąź:

`backup/stage-01-approved-ui-2026-07-26`

Gałąź wskazuje zaakceptowany stan panelu sprzed niniejszych korekt i pozwala łatwo porównać lub przywrócić poprzednią wersję.

## Wynik ogólny

Główny układ jest zgodny z pierwotnym kierunkiem projektu i znajduje się we właściwym miejscu:

- główne moduły są w lewym menu,
- podzakładki bieżącego modułu są u góry,
- karty robocze znajdują się nad centralnym obszarem,
- centralny obszar służy do pracy nad zamówieniem lub pakowaniem,
- prawa strona jest zarezerwowana dla agentów,
- dashboard pokazuje wyjątki i zadania, a nie rozbudowaną analitykę,
- panel pakowania eksponuje miniaturę, nazwę, SKU, wagę i ilość,
- DPD, ryby i palety są podsekcjami obsługi zamówień, a nie osobnymi modułami głównymi.

Nie ma podstaw do szerokiej zmiany zaakceptowanego układu.

## Porównanie obszarów

### 1. Prawy panel agentów

**Pierwotne wymaganie:** kilku agentów, kolejka oceniana 1–100 przez koordynatora, zwijanie i przypinanie, zachowanie kontekstu przy zmianie zakładek.

**Stan przed korektą:** kolejka 1–100, filtry, rozmowa, zwijanie i przypinanie były obecne. Brakowało jednak szybkiego, widocznego przeglądu zespołu agentów.

**Korekta:** dodano kompaktową listę agentów demonstracyjnych wraz z liczbą zgłoszeń. Nie utworzono panelu konfiguracji agentów, ponieważ należy on do późniejszego etapu.

### 2. Dashboard

**Pierwotne wymaganie:** minimum informacji, główne problemy wysyłkowe oraz wiadomości klientów przetworzone do postaci zgłoszeń agentów.

**Stan przed korektą:** dashboard prawidłowo pokazywał problemy wysyłkowe i kolejkę agentów, ale opis nie wskazywał wprost zgłoszeń klientów.

**Korekta:** doprecyzowano opis dashboardu i dodano demonstracyjne zgłoszenie klienta przetworzone przez agenta. Zgłoszenie prowadzi do powiązanego zamówienia, ale nie wysyła wiadomości i nie łączy się z Gmailem.

### 3. Zamówienia i wysyłka

**Pierwotne wymaganie:** wspólny obszar zamówień, DPD, ryb i palet.

**Stan przed korektą:** moduł nazywał się tylko `Zamówienia`, natomiast podzakładki DPD, Ryby i Palety były już prawidłowo umieszczone u góry.

**Korekta:** zmieniono widoczną nazwę modułu na `Zamówienia + wysyłka` / `Zamówienia i wysyłka`. Nie zmieniono wewnętrznego identyfikatora modułu ani nie uzależniono systemu od DPD.

### 4. Szczegóły zamówienia

**Pierwotne wymaganie:** szybki podgląd zamówienia bez utraty kontekstu oraz brak konfliktu z panelem agentów.

**Stan:** szczegóły otwierają się w centralnej karcie roboczej. Jest to właściwsze od tworzenia drugiego stałego panelu po prawej stronie, ponieważ prawa kolumna pozostaje przeznaczona dla agentów.

**Decyzja:** zachować obecne rozwiązanie. Edycja danych pozostaje demonstracyjna zgodnie z zakresem etapu 1.

### 5. Panel pakowania

**Pierwotne wymaganie:** szybkie wyszukiwanie i bardzo czytelne pozycje: miniatura, tytuł, waga i ilość.

**Stan:** wymagane informacje są obecne, wraz z SKU, wagą łączną, potwierdzaniem pozycji i postępem.

**Decyzja:** układ jest właściwy. Dalsze zmiany powinny wynikać wyłącznie z testów ergonomii.

### 6. Karty robocze

**Pierwotne wymaganie:** szybkie przełączanie zadań i powrót do wcześniejszej pracy.

**Stan:** karty można otwierać, przełączać, przypinać i zamykać. Stan jest zachowywany podczas bieżącej sesji, ale nie po odświeżeniu strony.

**Decyzja:** zakres etapu 1 jest spełniony. Trwałe odtwarzanie sesji należy wdrożyć dopiero po wyborze produkcyjnej architektury frontendu.

### 7. Nawigacja

**Pierwotne wymaganie:** brak duplikowania zakładek między lewą i górną nawigacją.

**Stan:** lewe menu zawiera moduły główne, a górny pasek podzakładki. Struktura jest poprawna.

**Decyzja:** nie zmieniać.

## Funkcje celowo niewdrożone w etapie 1

Poniższe elementy występują w wizji docelowej, ale ich implementacja teraz byłaby przekroczeniem zakresu:

- rozbudowany panel zarządzania agentami,
- mapa dostaw ryb i palet,
- pełna skrzynka wiadomości klientów,
- integracje marketplace i przewoźników,
- ustawienia systemowe,
- użytkownicy, role i motywy,
- instalator aktualizacji i łatek,
- pełny panel produktów,
- backend, baza danych i trwały zapis,
- prawdziwe API PrestaShop, DPD, Allegro i Gmail.

Nie należy dodawać pustych rozbudowanych ekranów tylko po to, aby wizualnie pokazać przyszły zakres.

## Korekty wykonane w tym przeglądzie

- zabezpieczono zaakceptowaną wersję w osobnej gałęzi,
- doprecyzowano nazwę modułu zamówień i wysyłki,
- dodano widoczny, kompaktowy przegląd agentów,
- dodano demonstracyjne zgłoszenie klienta przetworzone przez agenta,
- doprecyzowano opis dashboardu,
- poprawiono etykiety dostępności i widoczny fokus klawiatury,
- zachowano główną kolorystykę i układ trzech kolumn.

## Następny krok

Przejść scenariusz z `ACCEPTANCE.md` po pobraniu aktualnej wersji i zgłosić wyłącznie konkretne błędy interakcji lub drobne problemy ergonomiczne. Po ich usunięciu etap 1 może zostać zamknięty.
