# site-pages Specification

10 páginas estáticas con estructura mobile-first, navegación y SEO-optimized placeholder copy para el sitio institucional transaccional de MR Ateducativa.

## Requirements

### Requirement: Site Structure
The system MUST render 10 static pages with mobile-first responsive layout at breakpoints 375px, 768px, 1024px, and 1280px.

| Page | Route | Core Content |
|------|-------|-------------|
| Home | `/` | Transactional hero, services summary, Mentoría highlight, CTA diagnóstico, testimonials |
| Liderazgo | `/servicios/liderazgo` | MINEDUC area: institutional leadership, PEI/PME |
| Pedagógica | `/servicios/pedagogica` | MINEDUC area: pedagogical advisory, SIMCE results |
| Convivencia | `/servicios/convivencia` | MINEDUC area: school coexistence, climate |
| Recursos | `/servicios/recursos` | MINEDUC area: resource management, SEP financing |
| Mentoría | `/servicios/mentoria-directores` | Strategic mentorship for school principals |
| Nosotros | `/sobre-nosotros` | Marilyn's track record + strategic partners team |
| Casos de Éxito | `/casos-exito` | Placeholder testimonials, problem→solution→result |
| Contacto | `/contacto` | Contact form + info + map |
| Blog | `/blog` | Scaffolding index + 1-2 placeholder articles |

#### Scenario: Mobile-first navigation

- GIVEN a user on a 375px viewport
- WHEN they tap the hamburger menu
- THEN a slide-in panel SHALL display Home, Servicios (dropdown), Nosotros, Casos de Éxito, Blog, and CTA button
- AND touch targets MUST be at least 44x44px

#### Scenario: Desktop navigation

- GIVEN a user on a 1024px+ viewport
- WHEN they view any page
- THEN the header SHALL show: Logo | Servicios (dropdown) | Nosotros | Casos de Éxito | Blog | [CTA: Diagnóstico Gratuito]

#### Scenario: Mentoría as the fifth service

- GIVEN the Home services grid and the Servicios dropdown
- WHEN they render
- THEN they SHALL include Mentoría (`/servicios/mentoria-directores`) as the fifth service
- AND a Mentoría entry SHALL exist in `services.ts`

### Requirement: Placeholder Content
Every page MUST include SEO-optimized placeholder copy (H1 con keyword + diferenciador, meta description 150-160 caracteres, estructura Dolor→Solución→Prueba social→Acción). Content blocks SHALL be marked with HTML comments indicating what the client must replace.

#### Scenario: Placeholder clarity
- GIVEN a service page with placeholder content
- WHEN the client inspects the source
- THEN each content block SHALL have a comment like `<!-- CLIENTE: Reemplazar con [descripción] -->`
- AND no lorem ipsum SHALL appear in published content

### Requirement: Accessibility
All pages MUST meet WCAG 2.1 AA: contrast ratio ≥ 4.5:1, skip-to-content link, logical heading hierarchy (H1→H2→H3), labels on all form inputs, and keyboard-navigable tab order.

#### Scenario: Keyboard navigation
- GIVEN a user navigating with Tab key only
- WHEN they move through any page
- THEN focus order SHALL follow visual layout
- AND focus ring SHALL be visible on all interactive elements

### Requirement: Performance
All pages MUST render HTML with zero JavaScript by default (Astro static). LCP targets: < 2.5s, CLS < 0.1. Images SHALL use WebP/AVIF with explicit width/height attributes and lazy loading.

#### Scenario: Core Web Vitals compliance
- GIVEN the site deployed on Hostinger
- WHEN measured with Lighthouse
- THEN Performance score SHALL be > 90
- AND LCP SHALL be < 2.5s on 3G throttling

### Requirement: Home Mentoría Highlight Section

The Home page SHALL include a Mentoría highlight section placed between the Services section and the Nuestro Método section, using a purple accent and a CTA to `/servicios/mentoria-directores`.

#### Scenario: Section placement

- GIVEN the `/` page
- WHEN it renders
- THEN the Mentoría section SHALL appear after Services and before Nuestro Método

#### Scenario: Editorial style and CTA

- GIVEN the Mentoría highlight section on Home
- WHEN it renders
- THEN it SHALL use the purple accent `#6B4C9A` with editorial styling (eyebrow + heading + description + CTA)
- AND the CTA SHALL link to `/servicios/mentoria-directores`
