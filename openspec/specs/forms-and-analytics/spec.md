# forms-and-analytics Specification

Formularios vía Web3Forms, analytics privacy-first con Umami Cloud + Microsoft Clarity, y tracking de eventos de conversión para el sitio MR Ateducativa.

## Requirements

### Requirement: Contact and Diagnosis Forms
The system MUST implement two Web3Forms-powered forms: contact (5 fields) and free diagnosis (8 fields). Both SHALL POST to `https://api.web3forms.com/submit` with honeypot anti-spam and client-side validation.

| Form | Fields | Success Behavior |
|------|--------|-----------------|
| Contacto | Nombre, Email, Teléfono (opcional), Tipo establecimiento (select), Mensaje | Redirect to `/gracias-contacto` |
| Diagnóstico | +Colegio, Comuna/Región, N° alumnos, Área interés (multi-select) | Redirect to `/gracias-diagnostico` |

#### Scenario: Successful form submission
- GIVEN a user fills all required fields with valid data
- WHEN they submit the form
- THEN the data SHALL POST to Web3Forms with the configured access key
- AND the user SHALL be redirected to a confirmation page
- AND a conversion event SHALL fire in Umami

#### Scenario: Validation failure
- GIVEN a user submits a form with empty required fields or invalid email
- WHEN they click submit
- THEN client-side validation SHALL display error messages in Spanish next to each invalid field
- AND the form SHALL NOT POST until all validations pass

#### Scenario: Honeypot spam prevention
- GIVEN a bot fills the hidden honeypot field
- WHEN the form is submitted
- THEN Web3Forms SHALL reject the submission silently
- AND no email SHALL be delivered

### Requirement: Analytics and Heatmaps
The system MUST include Umami Cloud (100k events/month, privacy-first, no cookie banner) and Microsoft Clarity (heatmaps + session recordings) via deferred scripts in `<head>`. Umami SHALL track page views and custom conversion events.

#### Scenario: Privacy-compliant analytics
- GIVEN a visitor loads any page
- WHEN Umami and Clarity scripts execute
- THEN no cookie consent banner SHALL be required (GDPR-compliant, no personal data)
- AND page view SHALL register in Umami dashboard

### Requirement: Conversion Event Tracking
The system SHALL track three conversion events via Umami custom events: CTA click (`cta-diagnostico`), form submit (`form-submit`), and lead magnet download (`lead-download`).

#### Scenario: CTA click tracking
- GIVEN a user clicks any "Diagnóstico Gratuito" CTA button
- WHEN the click event fires
- THEN Umami SHALL register event `cta-diagnostico` with page context

#### Scenario: Form conversion tracking
- GIVEN a user successfully submits a contact or diagnosis form
- WHEN the success redirect occurs
- THEN Umami SHALL fire event `form-submit` before navigation

### Requirement: Dependency: site-pages
This spec depends on `site-pages` for page routes hosting forms and analytics snippets.

#### Scenario: Snippet injection
- GIVEN the Astro layout component
- WHEN rendering any page
- THEN Umami script SHALL be injected via `<script defer data-website-id="..." src="...">`
- AND Clarity script SHALL be injected via `<script defer>...</script>`
