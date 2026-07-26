# Kopia zaakceptowanej makiety etapu 1

## Zabezpieczony stan

Gałąź kopii zapasowej:

`backup/stage-01-approved-ui-2026-07-26`

Commit źródłowy:

`ba7706826e6ee0f3148dd14d00d122e4af2bde9c`

Jest to stan po akceptacji głównego wyglądu i układu, a przed późniejszymi korektami zgodności z pierwotnym promptem.

## Obejrzenie kopii lokalnie bez zmiany `main`

```powershell
git fetch origin
git switch -c review-approved-ui --track origin/backup/stage-01-approved-ui-2026-07-26
```

Powrót do bieżącej wersji:

```powershell
git switch main
git pull
```

Po obejrzeniu kopii lokalną gałąź pomocniczą można usunąć:

```powershell
git branch -D review-approved-ui
```

## Przywrócenie tylko katalogu makiety

Poniższe polecenia przywracają pliki `mockup/` z kopii do aktualnej gałęzi bez przepisywania historii Git:

```powershell
git fetch origin
git switch main
git pull
git restore --source origin/backup/stage-01-approved-ui-2026-07-26 -- mockup
git status
git add mockup
git commit -m "[CHAT-B] restore approved stage 1 UI"
```

Przed wykonaniem commitu należy otworzyć makietę i sprawdzić, czy przywrócono właściwy wariant.

## Zasady bezpieczeństwa

- nie używać `git reset --hard` bez sprawdzenia lokalnych zmian,
- nie używać `git push --force`,
- przed przywróceniem wykonać `git status`,
- niezapisane lokalne zmiany najpierw zatwierdzić albo odłożyć przez `git stash`.
