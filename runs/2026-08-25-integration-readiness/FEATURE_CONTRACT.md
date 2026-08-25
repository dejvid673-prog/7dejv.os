# FEATURE_CONTRACT — Product Owner / Architect

## Problem i cel
Panel ma już ekran Integracje, ale część statusów jest wpisana jako dane demonstracyjne. Operator musi od razu widzieć różnicę między: makietą, snapshotem, adapterem gotowym do konfiguracji oraz realnym połączeniem.

## User flow
1. Operator otwiera `Integracje`.
2. Widzi listę usług i ich jawny tryb danych.
3. Widzi, czy usługa jest `demo`, `ready`, `connected`, `error` lub `disabled`.
4. Może uruchomić lokalne sprawdzenie gotowości konfiguracji.
5. Panel nie prosi o sekret i nie sugeruje udanego połączenia, jeśli backend nie istnieje.

## Must
- centralny rejestr konektorów;
- stan i tryb danych per integracja;
- czytelny opis następnego kroku;
- GitHub oznaczony jako snapshot/source-of-truth, nie API live;
- PrestaShop/Allegro/ERLI/n8n jako `ready` lub `demo`, dopóki backend nie potwierdzi połączenia;
- brak sekretów w frontendzie.

## Should
- lokalny timestamp ostatniego sprawdzenia gotowości;
- stan dostępny tekstowo, nie tylko kolorem;
- możliwość rozszerzenia registry przez przyszły backend.

## Could
- później endpoint `/api/integrations/status` zastępujący statyczne metadane.

## OUT
- OAuth i token exchange;
- realne requesty biznesowe;
- formularze kluczy API.

## Dane
Każdy adapter: `id`, `name`, `area`, `transport`, `mode`, `status`, `sourceKind`, `nextStep`, `secretPolicy`.

## Edge cases
- brak registry -> pozostaje istniejący widok i pojawia się komunikat o braku metadanych;
- nieznana integracja -> nie jest automatycznie oznaczana jako connected;
- błąd localStorage -> status nadal renderuje się bez timestampu;
- brak backendu -> przycisk sprawdza tylko gotowość lokalnej konfiguracji.

## Acceptance
AC1. UI nigdy nie używa `connected`, jeśli registry nie potwierdza realnego źródła live.
AC2. Każdy konektor ma opis źródła danych i następnego kroku.
AC3. Sekrety mają politykę `server-only` lub `none`.
AC4. GitHub pozostaje `snapshot`.
AC5. Istniejący ekran Source of Truth nie jest nadpisywany.
AC6. Nawigacja Integracje i pozostałe moduły pozostają działające.

STATUS: PASS
OWNER: product-owner-architect
INPUT_USED: PROJECT_VISION.md, AGENTS.md, agents/product-owner-architect.md, mockup/modules-extension.js
DECISIONS: najpierw readiness boundary, bez live API
CHANGED_FILES: runs/2026-08-25-integration-readiness/FEATURE_CONTRACT.md
ACCEPTANCE_CHECK: kryteria zdefiniowane
RISKS: brak backendu ogranicza test live
NEXT_AGENT: ux-ui-designer
NEXT_TASK: zaprojektować status readiness bez przebudowy istniejącego modułu Integracje
