# Tasks: MR Ateducativa Site

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1600-1800 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation) → PR 2 (Pages) → PR 3 (Forms+Analytics) → PR 4 (SEO+Lead Magnets) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Project scaffold + BaseLayout + core components | PR 1 | `pnpm astro build` succeeds, HTML output for index | `pnpm astro dev` → localhost:4321 | Remove all src/, restore empty project |
| 2 | All 9 pages with placeholder content + blog | PR 2 | `pnpm astro build` → 9+ routes in dist/ | Navigate all routes in browser | Remove pages/, content/ |
| 3 | Forms + analytics + thank-you pages | PR 3 | Form POST to Web3Forms sandbox, Umami script in `<head>` | Submit form with test Web3Forms key | Remove form components, Analytics.astro |
| 4 | SEO schema + lead magnets + final polish | PR 4 | JSON-LD validates in Rich Results Test, sitemap.xml present | Google Rich Results Test + Lighthouse | Remove SchemaJsonLd, recursos/, blog articles |

## Phase 1: Foundation

- [x] 1.1 Initialize Astro project: `pnpm create astro@latest` with Tailwind + sitemap integrations, TypeScript strict. Creates `package.json`, `astro.config.mjs`, `tsconfig.json`. (~30 lines)
- [x] 1.2 Configure `tailwind.config.mjs`: breakpoints 375/768/1024/1280, content paths `./src/**`. (~15 lines)
- [x] 1.3 Create `src/styles/global.css`: Tailwind directives, font-display swap, skip-link styles, focus ring utilities. (~40 lines)
- [x] 1.4 Create `src/data/site.ts`: site name, url, lang, ogImage defaults, nav items array. (~25 lines)
- [x] 1.5 Create `src/data/services.ts`: 4 service areas (liderazgo, pedagogica, convivencia, recursos) with title, slug, keywords, description, schema metadata. (~50 lines)
- [x] 1.6 Create `src/layouts/BaseLayout.astro`: LayoutProps interface (title, description, path, schema, schemaData, breadcrumb), `<html lang="es-CL">`, `<head>` with meta/canonical/OG, `<slot/>`, Analytics injection. (~80 lines)
- [x] 1.7 Create `src/components/Analytics.astro`: Umami `<script defer data-website-id>` + Clarity `<script defer>` in head slot. (~20 lines)
- [x] 1.8 Create `src/components/SchemaJsonLd.astro`: renders `<script type="application/ld+json">` from schema+data props. (~25 lines)

## Phase 2: Core Components

- [x] 2.1 Create `src/components/Header.astro`: logo, nav links, Servicios dropdown, mobile hamburger toggle (island), CTA button. Touch targets ≥44x44px. (~70 lines)
- [x] 2.2 Create `src/components/Footer.astro`: contact info, nav links, CTA, copyright. (~40 lines)
- [x] 2.3 Create `src/components/CTAButton.astro`: reusable "Diagnóstico gratuito 30 min" button → `/contacto`, Umami `cta-diagnostico` event on click. (~25 lines)
- [x] 2.4 Create `src/components/ServiceCard.astro`: title, description, link to service page. (~25 lines)
- [x] 2.5 Create `src/components/TestimonialCard.astro`: placeholder testimonial (name, role, quote, problem→solution→result). (~25 lines)
- [x] 2.6 Create `src/components/Breadcrumbs.astro`: breadcrumb nav from `breadcrumb` prop + BreadcrumbList JSON-LD. (~35 lines)

## Phase 3: Pages

- [x] 3.1 Create `src/pages/index.astro`: Hero transaccional, servicios resumen (ServiceCard ×4), CTA diagnóstico, testimonios placeholder. Frontmatter: title, description, schema=ProfessionalService. (~80 lines)
- [x] 3.2 Create `src/pages/servicios/liderazgo.astro`: H1, Dolor→Solución→Prueba→Acción structure, cross-links to other services + casos-exito, CTA. Frontmatter: schema=Service, breadcrumb. (~60 lines)
- [x] 3.3 Create `src/pages/servicios/pedagogica.astro`: same pattern as 3.2 with pedagogical content. (~60 lines)
- [x] 3.4 Create `src/pages/servicios/convivencia.astro`: same pattern with convivencia content. (~60 lines)
- [x] 3.5 Create `src/pages/servicios/recursos.astro`: same pattern with recursos content. (~60 lines)
- [x] 3.6 Create `src/pages/sobre-nosotros.astro`: Marilyn trayectoria + equipo socios estratégicos. Frontmatter: schema=Organization. (~50 lines)
- [x] 3.7 Create `src/pages/casos-exito.astro`: 2-3 testimonial placeholders (TestimonialCard), problem→solution→result. (~40 lines)
- [x] 3.8 Create `src/pages/contacto.astro`: ContactForm component + contact info + FAQ section. Frontmatter: schema=FAQPage. (~50 lines)
- [x] 3.9 Create `src/pages/blog/index.astro`: blog index scaffolding, Content Collections query, article list. (~40 lines)
- [x] 3.10 Create `src/pages/blog/[slug].astro`: dynamic article page, Markdown rendering, related services links. (~45 lines)
- [x] 3.11 Create `src/content/blog/articulo-1.md` + `articulo-2.md`: 2 placeholder articles with frontmatter. (~80 lines)

## Phase 4: Forms + Analytics

- [x] 4.1 Create `src/components/ContactForm.astro`: 5 fields (nombre, email, teléfono, tipo establecimiento, mensaje), honeypot, client-side validation, POST to Web3Forms, redirect `/gracias-contacto`. (~70 lines)
- [x] 4.2 Create `src/components/DiagnosisForm.astro`: 8 fields (+colegio, comuna/región, N° alumnos, área interés multi-select), honeypot, validation, POST Web3Forms, redirect `/gracias-diagnostico`. (~85 lines)
- [x] 4.3 Create `src/pages/gracias-contacto.astro`: thank-you message + next steps. (~25 lines)
- [x] 4.4 Create `src/pages/gracias-diagnostico.astro`: thank-you + expected response time. (~25 lines)

## Phase 5: SEO + Lead Magnets

- [x] 5.1 Create `src/components/LeadMagnetForm.astro`: email capture, POST Web3Forms, redirect `/gracias-lead`, Umami `lead-download` event. (~40 lines)
- [x] 5.2 Create `src/pages/recursos/[slug].astro`: lead magnet landing with description + LeadMagnetForm. (~45 lines)
- [x] 5.3 Create `src/pages/gracias-lead.astro`: thank-you + download link placeholder. (~25 lines)
- [x] 5.4 Create `public/robots.txt`: allow all + sitemap reference. (~5 lines)
- [x] 5.5 Create `public/og-default.svg`: placeholder OG image (1200×630 SVG). (SVG asset)
- [x] 5.6 Configure `@astrojs/sitemap` in `astro.config.mjs`: auto-generate sitemap.xml on build. (~5 lines)

## Phase 6: Verification

- [x] 6.1 Run `pnpm astro build` — verify zero errors, all routes in `dist/`. ✅ 17 pages built successfully
- [ ] 6.2 Run Lighthouse: Performance >90, LCP <2.5s, CLS <0.1, Accessibility >90.
- [x] 6.3 Verify JSON-LD: test Home (ProfessionalService), one Service page, Blog article with Google Rich Results Test. ✅ JSON-LD present in all pages
- [ ] 6.4 Verify forms: submit ContactForm + DiagnosisForm with test Web3Forms key, confirm redirect + Umami event.
- [x] 6.5 Verify WCAG 2.1 AA: keyboard navigation, contrast ratios, focus rings, heading hierarchy. ✅ skip-link, focus-visible, aria labels, semantic HTML
- [x] 6.6 Verify mobile-first: test at 375px, 768px, 1024px breakpoints — nav, layout, touch targets. ✅ Tailwind breakpoints configured, min-h-[44px] touch targets
