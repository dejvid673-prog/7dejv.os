# 7DEJV.os — baza materiałów projektu

To repozytorium jest wspólną bazą wiedzy dla dwóch rozmów ChatGPT pracujących nad projektem **7DEJV.os**.

## Cel

Repo zawiera wyselekcjonowane materiały, indeks źródeł, role agentów, skille, workflow, zasady współpracy i wytyczne etapów. Nie jest jeszcze repozytorium kodu produkcyjnego.

## Współpraca dwóch czatów

- **CHAT-A** zapisuje `README_A.md` i czyta `README_B.md`.
- **CHAT-B** zapisuje `README_B.md` i czyta `README_A.md`.
- Oba czaty czytają `PROJECT_VISION.md`, `SOURCE_INDEX.md` oraz katalog aktualnego etapu.
- Przed pracą każdy czat sprawdza plik drugiego czatu.
- Po pracy aktualizuje własny plik przekazania.
- Nie edytować pliku komunikacyjnego drugiego czatu.

## Kolejność użycia

1. `PROJECT_VISION.md`
2. `README_A.md` i `README_B.md`
3. `stages/stage-01-mockup/README.md`
4. `stages/stage-01-mockup/SCOPE.md`
5. `stages/stage-01-mockup/AGENTS.md`
6. `stages/stage-01-mockup/SKILLS.md`
7. `stages/stage-01-mockup/ACCEPTANCE.md`
8. materiały wskazane w `SOURCE_INDEX.md`

## Aktualny etap

**Etap 1: interaktywna makieta backoffice.**

Prompt wykonawczy użytkownik wkleja bezpośrednio do rozmowy ChatGPT. Repo zapewnia kontekst, źródła i zasady pracy, ale nie zastępuje promptu.

## Zasada nadrzędna

Na etapie 1 budujemy makietę i nawigację. Nie budujemy backendu, realnych integracji ani automatyzacji agentów.
