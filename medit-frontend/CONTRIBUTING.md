# # Contributor Guidelines

## Frontend

### Start project

clone git repository
cd medit-frontend

npm i

setup .env file
add certificate files

npm run install:api


### IDE Setup

Ide: visual studio code

### Extensions

Code formatter: Prettier - Code formatter

### New branchs

Every new branch must have the branch as its base. 
For each task on Jira make a separate branch, if they are small make a single branch for each story.

### Commit Guidelines

Commento in inglese prefissato dal codice dello sviluppo di riferimento e dal tipo di
attività:

```issue-key: [feat|fix|refactor|chore] - description```

Esempio:

```YCP-123: feat - add new api for spid privacy```

- `feat` is for adding a new feature
- `fix` is for fixing a bug
- `refactor` is for changing code for peformance or convenience purpose (e.g. readibility)
- `chore` is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)
