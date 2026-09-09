# Delta Spec: site-pages

## MODIFIED Requirements

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

(Previously: 9 static pages; no Mentoría page and no Home highlight.)

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

## ADDED Requirements

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
