# seo-and-conversion Specification

SEO on-page transaccional, Schema JSON-LD, lead magnets scaffolding, CTAs estratégicos e internal linking para posicionar y convertir en el sitio MR Ateducativa.

## Requirements

### Requirement: SEO On-Page
Every page MUST include unique title (50-60 chars), meta description (150-160 chars), canonical URL, Open Graph tags, and keyword-optimized H1. The `<html>` element SHALL use `lang="es-CL"`.

| Page | Title Pattern | H1 Pattern |
|------|--------------|------------|
| Home | ATE Chile — MR Ateducativa | Construimos soluciones desde la realidad de tu comunidad |
| Servicios | [Área] — ATE Chile — MR Ateducativa | Asesoría en [área]: diagnóstico + soluciones a medida |
| Nosotros | Sobre MR Ateducativa — ATE Chile | Fundadora + equipo de socios estratégicos |
| Contacto | Contacto — MR Ateducativa | Diagnóstico gratuito 30 min |
| Blog | Blog — MR Ateducativa | Recursos y guías |

#### Scenario: Complete metadata per page
- GIVEN any page in the site
- WHEN rendered in a browser
- THEN `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:image` SHALL be present and unique
- AND `<html lang="es-CL">` SHALL be set

### Requirement: Schema Markup
The system MUST include JSON-LD structured data per page type: `ProfessionalService` + `Organization` (Home), `Service` + `BreadcrumbList` (Services), `Article` (Blog), `FAQPage` (Contacto). ALL schema blocks SHALL validate against schema.org.

#### Scenario: Home schema
- GIVEN the Home page renders
- WHEN a search engine crawls it
- THEN JSON-LD SHALL include `@type: ProfessionalService` with name, url, logo, contactPoint, areaServed (CL)

#### Scenario: Service page schema
- GIVEN any /servicios/* page
- WHEN crawled
- THEN JSON-LD SHALL include `Service` with serviceType, provider, and `BreadcrumbList` with correct hierarchy

### Requirement: Lead Magnets Scaffolding
The system SHALL implement 3 lead magnet pages with placeholder content: download landing (`/recursos/{slug}`), email capture form (Web3Forms), and thank-you page (`/gracias-lead`). PDF files SHALL be placeholders.

#### Scenario: Lead magnet flow
- GIVEN a user on a blog post
- WHEN they click the "Descargar guía" CTA
- THEN they SHALL land on `/recursos/{slug}` with email form
- WHEN they submit their email
- THEN Umami SHALL fire event `lead-download`
- AND they SHALL redirect to `/gracias-lead` with download link

### Requirement: Strategic CTAs
"Diagnóstico gratuito 30 min" SHALL appear as primary CTA in: Hero (Home), end of each service page, Contact page, footer. All CTAs MUST link to `/contacto`.

#### Scenario: CTA consistency
- GIVEN any page in the main funnel
- WHEN a user scans for action
- THEN the primary CTA button text SHALL be "Diagnóstico gratuito 30 min" or "Solicitar diagnóstico"
- AND it SHALL point to `/contacto`

### Requirement: Internal Linking
Service pages SHALL cross-link to related services and Casos de Éxito. Blog posts SHALL link to relevant services. Breadcrumbs SHALL appear on all internal pages (`Home > [Section] > [Page]`).

#### Scenario: Service cross-linking
- GIVEN a user on `/servicios/liderazgo`
- WHEN they scroll past the main content
- THEN they SHALL see contextual links to related services and `/casos-exito`

### Requirement: Dependencies
- `site-pages`: pages where SEO, schema, and CTAs are applied
- `forms-and-analytics`: lead magnet form and conversion events

#### Scenario: Integration integrity
- GIVEN all three specs are implemented
- WHEN the site is built
- THEN every page SHALL have SEO metadata AND schema markup
- AND lead magnet pages SHALL fire conversion events via Umami
