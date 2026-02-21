# ottonova-coding-challenge

Coding challenge for Quality Assurance Engineer.

This repository contains a Cypress test suite covering critical flows and validations for the ottonova insurance calculator.

The goal of this assignment is to demonstrate:

- test design & prioritization
- understanding of product requirements
- ability to implement UI and API automation
- maintainable, CI-ready test structure

---

## 1. Running the Project

### Install dependencies

```bash
npm ci
```

### Open Cypress UI

```bash
npm run cy:open
```

### Run tests (headless)

```bash
npm run cy:run
```

### Run tests in Chrome (headless)

```bash
npm run cy:chrome
```

---

## 2. Code Quality

### Lint

```bash
npm run lint
```

### Lint with auto-fix

```bash
npm run lint:fix
```

### Format code

```bash
npm run format
```

### Detect unused files/exports

```bash
npm run usage
```

---

## 3. Scope of Automation

The test suite focuses on validating critical user flows and business rules:

- Calculator happy path (up to the Result page, excluding lead submission, but including full form data such as email and phone)
- Employment and salary selection
- Birthdate validation rules
- Insurance type selection
- Localization support (currently DE only, but designed to be extended for EN and other languages)
- API validation using PokeAPI

Tests are designed to be deterministic, readable, and CI-friendly.

---

## 4. CI

GitHub Actions pipeline:

- installs dependencies
- runs ESLint
- executes Cypress tests in Chrome

The pipeline ensures fast feedback on pull requests and stable execution across environments.
