# CHAT-B

## Status

Status: PRACA W TOKU

## Aktywny cykl

Data: 2026-07-26

Trwa porównanie zaakceptowanej makiety z pierwotnym promptem funkcjonalnym użytkownika. Przed zmianami utworzono gałąź kopii zapasowej `backup/stage-01-approved-ui-2026-07-26` wskazującą zaakceptowany stan panelu.

## Cel cyklu

- sprawdzić zgodność rozmieszczenia głównych elementów z pierwotnym promptem,
- zachować zaakceptowany styl i układ trzech kolumn,
- poprawić wyłącznie braki istotne dla rdzenia etapu 1,
- nie dodawać backendu, integracji ani nowych pełnych modułów,
- udokumentować elementy odłożone na późniejsze etapy.

## Stan przed zmianami

- działa główna nawigacja: Dashboard, Zamówienia i Pakowanie,
- działają podzakładki aktualnego modułu,
- działają karty robocze: otwieranie, przełączanie, przypinanie i zamykanie,
- otwarte karty są zachowywane podczas nawigacji w bieżącej sesji,
- działa stały prawy panel agentów wraz ze zwijaniem, wysuwaniem i przypinaniem,
- działa kolejka zgłoszeń sortowana według priorytetu 1–100,
- działa przejście ze zgłoszenia do powiązanego zamówienia,
- działa demonstracyjna lista zamówień i filtrowanie,
- działa centralny widok szczegółów zamówienia,
- działa panel pakowania z miniaturą, nazwą, SKU, wagą i ilością,
- funkcje zewnętrzne pozostają demonstracyjne i nie wykonują rzeczywistych operacji.

## Decyzja użytkownika obowiązująca w tym cyklu

Zaakceptowane jako baza dalszej pracy:

- ciemne lewe menu,
- jasny centralny obszar roboczy,
- stały prawy panel agentów,
- układ lewa nawigacja / centralna praca / panel agentów,
- górne podzakładki i karty robocze,
- techniczny, uporządkowany styl,
- obecna ogólna kolorystyka i gęstość informacji.

Pełny zapis decyzji znajduje się w `stages/stage-01-mockup/UI_DECISIONS.md`.

## Ograniczenia

- nie dodawać backendu,
- nie dodawać bazy danych,
- nie dodawać rzeczywistych integracji,
- nie dodawać API DPD, Allegro, Gmaila ani PrestaShop,
- nie dodawać prawdziwych agentów ani harmonogramów,
- nie dodawać logowania, ról, map ani systemu aktualizacji,
- nie zmieniać zaakceptowanego głównego kierunku wizualnego.

## Blokady

Brak blokady repozytorium.

## Następny krok

Zakończyć porównanie promptu, wprowadzić minimalne korekty interfejsu, sprawdzić składnię i zaktualizować ten raport.