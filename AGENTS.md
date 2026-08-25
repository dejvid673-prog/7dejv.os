# RaFish Ops — Multi-Agent Web Team

Ten plik jest nadrzędnym kontraktem dla zespołu agentów rozwijających RaFish Ops / 7DEJV.os.

## Zespół

1. `orchestrator` — koordynuje cały przebieg i bramki jakości.
2. `product-owner-architect` — wymagania, zakres, architektura informacji i kontrakt funkcjonalny.
3. `ux-ui-designer` — UX, wireframes, design system, komponenty i responsywność.
4. `fullstack-developer` — implementacja, integracje, stan, bezpieczeństwo i testowalność.
5. `content-writer` — mikrocopy, teksty UI, SEO tylko tam, gdzie ma zastosowanie.
6. `qa-tester` — regresja, dostępność, responsywność, błędy i kryteria akceptacji.

## Zasada nadrzędna

Żaden agent nie uznaje zadania za zakończone samodzielnie. Wynik przechodzi przez handoff i bramkę kolejnego agenta. `qa-tester` ma prawo zwrócić zadanie do dowolnego wcześniejszego etapu.

## Obowiązkowy pipeline

`USER -> orchestrator -> product-owner-architect -> ux-ui-designer -> fullstack-developer -> content-writer -> qa-tester -> orchestrator -> DONE`

Możliwe pętle naprawcze:

- QA -> Developer: błędy techniczne.
- QA -> UX/UI: problemy użyteczności, WCAG, responsywności.
- QA -> Product Owner: błędny zakres lub niespełnione wymaganie.
- Content -> UX/UI: tekst nie mieści się lub zmienia hierarchię informacji.
- Developer -> Product Owner: sprzeczny albo niewykonalny kontrakt.

## Wspólny format handoffu

Każdy agent kończy pracę blokiem:

```text
STATUS: PASS | NEEDS_CHANGES | BLOCKED
OWNER: <agent-id>
INPUT_USED: <źródła i pliki>
DECISIONS: <najważniejsze decyzje>
CHANGED_FILES: <pliki albo NONE>
ACCEPTANCE_CHECK: <spełnione / niespełnione punkty>
RISKS: <ryzyka>
NEXT_AGENT: <agent-id>
NEXT_TASK: <jedno konkretne zadanie>
```

## Źródła prawdy

Przed zmianami agent czyta w tej kolejności:

1. aktualne polecenie użytkownika,
2. `PROJECT_VISION.md`,
3. `AGENTS.md`,
4. `agents/registry.json`,
5. własny plik w `agents/`,
6. `workflows/web-build-pipeline.md`,
7. pliki kodu dotyczące zadania,
8. materiały historyczne z `stages/` tylko jako kontekst.

Nowsze polecenie użytkownika ma pierwszeństwo przed starszymi dokumentami.

## Zakazy

- nie udawaj wykonanej integracji, jeśli istnieje tylko makieta,
- nie zapisuj sekretów, tokenów ani haseł w repo lub frontendzie,
- nie zmieniaj zakresu bez odnotowania decyzji,
- nie usuwaj działającej funkcji tylko po to, by uprościć implementację,
- nie omijaj QA,
- nie zatwierdzaj własnej pracy jako jedyny recenzent.

## Definition of Done

Zmiana jest DONE dopiero gdy:

- wymaganie jest jednoznacznie spełnione,
- UX ma kompletne stany: default/loading/empty/error/success/disabled tam, gdzie są potrzebne,
- kod nie ma oczywistych błędów i nie łamie istniejących przepływów,
- interfejs działa na desktopie i w węższych viewportach,
- dostępność klawiaturą i semantyka są sprawdzone,
- teksty UI są spójne,
- QA wystawi `PASS`,
- orchestrator przygotuje końcowe podsumowanie zmian i ryzyk.
