# QA Strategy – Digital Assistant (Insurance Tariff Calculator)

This document describes a risk-based QA strategy for the Digital Assistant: a web app that calculates premiums for multiple insurance products (comprehensive, civil-servant, clinic, dental) and provides follow-up actions (consultation appointment, offer email, signup).

## Environment strategy

- **Production:** read-only checks and monitoring only (no data creation), to protect real users and business operations.
- **Non-production (dev/stage):** full read-write testing, including data creation, modification, and integration validation.

---

## 1) Types of tests I would create (test pyramid: fast → slow)

### A. Unit / Component tests (fastest layer)

- Field validations (dates, age rules, required fields, income format).
- Business rules and thresholds (e.g., salary limits, eligibility conditions for full insurance).
- Formatting/parsing (currency input like `80.000`, locale-specific date parsing).

### B. API / Contract tests

- Tariff calculation endpoints: response schema, status codes, error handling, boundaries.
- Follow-up actions (consultation request, offer email, signup): payload validation, responses, idempotency.
- Third-party integrations (e.g., email providers, CRM/lead systems, appointment services): requests triggered correctly, errors handled gracefully.
- Analytics/tracking validation at API/network level: key user actions tracked once, correct payload, respect consent.

### C. E2E UI tests (Cypress)

Critical end-to-end flows only, because the decision tree is complex:

- branch → calculation → result → follow-up action
- High-risk UI validations (birthdate, salary, phone, email).
- Cookie banner handling (Accept is covered; Deny/Settings should be covered as well).

### CI/CD execution strategy (risk-based)

- **PR-gate:** unit + contract + 3–5 critical E2E smoke tests (fast, deterministic, blocks regressions).
- **Nightly:** extended E2E + cross-browser smoke + optional visual regression (broader coverage, less PR noise).
- **Pre-release:** exploratory session + accessibility pass + performance smoke (final human + non-functional validation).

### D. Exploratory / Manual testing

Manual testing remains important where automation has low ROI or the product is evolving:

- Frequently changing requirements or unstable logic (automation becomes expensive and fragile).
- Early-stage discovery where exploration is more valuable than regression.
- Complex UI interactions (overlays, animations, conditional forms) that are hard to automate reliably.
- UX/visual checks (layout, responsiveness, copy clarity).
- Rare edge-case combinations where automation maintenance outweighs benefit.

### E. Non-functional testing

- Performance smoke: pages must remain responsive; calculation and result steps must not degrade.
- Production monitoring: frontend errors, conversion signals, calculation failures/timeouts.
- Targeted load/stress tests for key endpoints (tariff calculation, lead submission) using k6/JMeter (as needed).
  In addition to pre-release testing, I would rely on runtime quality indicators such as frontend error monitoring, conversion funnel metrics, and alerts on calculation failures to detect issues not caught during pre-release testing.

### F. Risk-based prioritization

Test coverage and automation depth are driven by business and regulatory risk:

- Premium calculation correctness (financial impact).
- Conversion-critical flows (result page + follow-up actions).
- Eligibility/branching logic driven by employment status and legal constraints.
- Secure handling of personal data in lead forms and integrations.

### G. Security, privacy and GDPR compliance

- Ensure personal data is handled securely in lead forms and integrations.
- Ensure no sensitive data appears in URLs, logs, or analytics events.
- Consent/tracking validation: analytics only after consent.
- Idempotency checks to prevent duplicate lead submissions.
- Basic security smoke checks (HTTPS enforcement, safe error handling without data leakage).

---

## 2) Test cases and automation strategy

### Automated (highest ROI)

#### A. Happy path per major branch (high-level coverage)

Employment statuses:

- Employed
- Self-employed
- Civil servant
- Civil service trainee
- Student
- In training

Insurance types:

- Comprehensive health insurance
- Supplemental dental insurance
- Supplemental hospital insurance

This creates a matrix, but it should not explode into hundreds of tests.
Instead:

- UI E2E: one representative happy path per major branch (or pairwise coverage: employment × insurance type).
- Branching and business rules are validated primarily via unit/API tests rather than UI.

#### B. Critical business thresholds and branching

- Employee income below/above threshold (eligibility + messaging).
- Boundary values ±1 € (e.g., 77,399 / 77,400 / 77,401).
- Start date selection: valid/invalid dates and different widgets (dropdown vs datepicker).

#### C. Birthdate validation (implemented in this assignment)

- Future date
- Too young (16 or 18 depending on branch)
- Too old (101+)
- Empty/incomplete input
- Locale/format variations

#### D. Children flow

- 0 children
- 1 child
- Maximum limit (10)
- Invalid child data (birthdate validations, etc.)

#### E. Result page + follow-up actions

- Result page matches selected branch (sanity: blocks visible, prices not empty).
- Follow-up actions route correctly.
- Lead form validation (email/phone required).
- Non-prod: validate outgoing requests (intercept/API) and successful responses.

### Manual / exploratory (recommended)

- Copy/localization review across the decision tree.
- Visual/UX checks without visual regression pipeline.
- Rare combinations with low frequency but complex legal logic.
- Cross-browser/mobile exploration for tricky UI widgets.

---

## 3) Edge case examples (observed)

### Case A – Employee salary threshold messaging

Entering salary exactly at the PKV eligibility boundary (77,400 €) triggers an informational message referencing a different threshold (69,750 €).
This suggests a mismatch between the trigger logic and displayed copy.
This behavior should be verified against the legal requirement to confirm whether the boundary is strictly greater than 77,400 or inclusive.

### Case B – Silent limit when adding children (max 10)

After reaching 10 children, the “+ Kind hinzufügen” button disappears with no explanation.
Expected: clear feedback (message, disabled button with hint, or alternative path such as contacting support).

### Case C – Single-character names

Strict “min 2 characters” validation may block legitimate users in rare cases.
Validation rules should be aligned with real document constraints or clarified as a product decision.

### Case D – Inconsistent birthdate validation feedback (user vs child)

The same invalid input produces different UI feedback between the user birthdate step and the child birthdate step.
Expected: consistent behavior (either explicit error message everywhere, or disabled continue with clear inline feedback everywhere).

### Case E – Client-side validation bypass (script-like payload)

Client-side validation blocks script-like input in name fields.
However, if the request is forced manually, backend may accept it as plain text.
This highlights the need for strict output encoding/sanitization in downstream systems (CRM, email templates, admin UI) to prevent potential stored XSS.
