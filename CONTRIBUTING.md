# Contributor Guidelines

## Backend
### IDE Setup

Intellij Ultimate o Community

#### Code Formatter

1. Nei settings di Intellj abilitare Editorconfig su `Editor > Code Style`
2. Impostare l'hard wrap a 120 (non 100)
4. Fare un test per vedere che tutto funzioni a dovere:
    1. Aprire la una classe con un po' di codice dentro
    2. Forzare un Reformat Code + Rearrange Code + Optimize Imports;
    3. Verificare che la classe non sia cambiata di una virgola;
5. Impostare le seguenti tre voci in fase di commit (le altre non servono):
    1. Reformat Code
    2. Rearrange Code
    3. Optimize Imports

#### Sonarlint

- Install Sonarlint plugin on intellij https://www.sonarsource.com/products/sonarlint/
- abilitare l'analisi sonar nella finestra di commit di Intellij

### Git & PRs

#### Commit message

Commento in inglese prefissato dal codice dello sviluppo di riferimento e dal tipo di
attività:

```issue-key: [feat|fix|refactor|chore] - description```

Esempio:

```YCP-123: feat - add new api for spid privacy```

- `feat` is for adding a new feature
- `fix` is for fixing a bug
- `refactor` is for changing code for peformance or convenience purpose (e.g. readibility)
- `chore` is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)

#### Branching model

- `main` for production ready branch
- `develop` for development features

No direct commits allowed on these branches.

#### Branch Naming

Direct commits on `main` and `develop` branches are disabled

- `hotfix/[main|develop]/SCBOB-123`: for hotfixes
- `feature/SCBOB-123`: for new features
- `bugfix/[main|develop]/SCBOB-123`: for bugfixes
- `fix/[main|develop]/my-fix`: for quick fix outside of an issue/ticket
- `test/my-test`:  for experimenting outside of an issue/ticket

#### Pull Requests

File changed in a PR must be related only to the feature. Refactoring and other chore activities must be
done in separate PRs.

### Testing

- When possible prefer unit tests over integration test
- Classes in the root of the modules should at lease 80% coverage
- Code related to business rules should always be tested
- use `*Test.java` suffix for unit tests, `*IT.java` for integration tests

### Tools

- Error Handling
    - Doc: https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html
    - Demo: https://dev.to/noelopez/spring-rest-exception-handling-problem-details-2hkj


