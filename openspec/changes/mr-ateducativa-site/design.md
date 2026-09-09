# Design: MR Ateducativa Site

## Technical Approach

Astro static site (zero JS by default) + Tailwind CSS, deployed as HTML to Hostinger. Three capabilities map to one layered architecture: `BaseLayout` is the shared shell hosting SEO meta, analytics snippets, header, and footer; page-level frontmatter feeds it `title`/`description`/`schema` props. Forms POST natively to Web3Forms (no JS for submission). SEO and conversion (CTAs, schema, lead magnets) are component-injected through the layout. Progressive enhancement adds minimal JS islands only for: mobile nav toggle, form validation UX, and analytics event tracking.

## Architecture Decisions

| # | Decision | Option vs Tradeoff → Choice |
|---|----------|-----------------------------|
| 1 | Framework | Astro (HTML-only default, islands) vs Next.js SSG (heavier, overkill) → **Astro** |
| 2 | Styling | Tailwind utility-first vs CSS-in-JS vs vanilla → **Tailwind** (mobile-first, purge, fast) |
| 3 | Single base layout | One `BaseLayout` with props vs per-page layouts → **One layout** (DRY meta + analytics, props specialise) |
| 4 | Content source | TypeScript data files (`site.ts`, `services.ts`, `nav.ts`) vs hard-code per page → **Data files** (client edits one place, no CMS needed) |
| 5 | Forms | Native HTML POST to Web3Forms (no JS submit) vs JS fetch API → **Native POST** + optional progressive-enhancement fetch for inline errors |
| 6 | Analytics injection | `BaseLayout` `<head>` `<script defer>` vs per-page → **Layout** (guaranteed on every page, once) |
| 7 | SEO/schema | Frontmatter props → `SchemaJsonLd` component per page vs static JSON-LD → **Component** (typed, reusable, validates per page type) |
| 8 | Blog | Astro Content Collections (Markdown) vs MDX vs hard-coded → **Content Collections** (type-safe, easy client editing) |
| 9 | Islands strategy | Ship zero JS; islands only for nav toggle, validation UX, event tracking → **Minimal islands** (preserves INP < 200ms) |

## Data Flow

```
Page frontmatter (title, desc, schemaType, path)
      │
      ▼
BaseLayout.astro ── <head> ── meta/title/canonical/OG ── SchemaJsonLd ── Analytics(defer)
      │            ── <body> ── Header (nav + CTA)
      │                         ── <slot/> (page content)
      │                         ── Footer (CTA, links)
      ▼
[Contact/Diagnosis Form] ──HTML POST──► Web3Forms API ──redirect──► /gracias-{type}
                                          │
                                   Umami event (form-submit) ◄── inline script before nav

[CTA button] ──click──► /contacto  (+ Umami event cta-diagnostico)
[Lead magnet] ──email POST──► Web3Forms ──redirect──► /gracias-lead (+ event lead-download)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Create | Astro config: site URL, Tailwind integration, sitemap integration |
| `tailwind.config.mjs` | Create | Breakpoints 375/768/1024/1280, content paths |
| `src/styles/global.css` | Create | Tailwind directives, font-display swap, skip-link styles |
| `src/data/site.ts` | Create | Site-wide config: name, url, og defaults, nav items |
| `src/data/services.ts` | Create | 4 service areas metadata (title, slug, keywords, schema) |
| `src/layouts/BaseLayout.astro` | Create | Shared shell: meta, schema slot, analytics, header, footer |
| `src/components/Header.astro` | Create | Nav + dropdown + mobile hamburger island |
| `src/components/Footer.astro` | Create | Contact info, links, CTA |
| `src/components/CTAButton.astro` | Create | Reusable "Diagnóstico gratuito" CTA + event tracking |
| `src/components/ServiceCard.astro` | Create | Service summary card (Home + service index) |
| `src/components/TestimonialCard.astro` | Create | Casos de éxito placeholder card |
| `src/components/Breadcrumbs.astro` | Create | Breadcrumb nav + BreadcrumbList JSON-LD |
| `src/components/SchemaJsonLd.astro` | Create | Renders JSON-LD by type prop (ProfessionalService/Service/FAQ/Article) |
| `src/components/ContactForm.astro` | Create | Web3Forms contact (5 fields) + honeypot + validation |
| `src/components/DiagnosisForm.astro` | Create | Web3Forms diagnosis (8 fields) + honeypot + validation |
| `src/components/LeadMagnetForm.astro` | Create | Email capture for lead magnets |
| `src/components/Analytics.astro` | Create | Umami + Clarity defer scripts |
| `src/pages/index.astro` | Create | Home landing transaccional |
| `src/pages/servicios/{liderazgo,pedagogica,convivencia,recursos}.astro` | Create | 4 service pages |
| `src/pages/sobre-nosotros.astro` | Create | Trayectoria + equipo |
| `src/pages/casos-exito.astro` | Create | Testimonios placeholder |
| `src/pages/contacto.astro` | Create | Contact form + info + FAQ |
| `src/pages/blog/index.astro` | Create | Blog index scaffolding |
| `src/pages/blog/[slug].astro` | Create | Dynamic article page |
| `src/content/blog/*.md` | Create | 1-2 placeholder articles |
| `src/pages/recursos/[slug].astro` | Create | Lead magnet landing + form |
| `src/pages/gracias-{contacto,diagnostico,lead}.astro` | Create | 3 thank-you pages |
| `public/robots.txt` | Create | Allow all + sitemap ref |
| `public/og-default.png` | Create | Placeholder OG image |

## Interfaces / Contracts

```ts
// src/data/site.ts
export const site = {
  name: "MR Ateducativa",
  url: "https://mr-ateducativa.cl",
  lang: "es-CL",
  ogImage: "/og-default.png",
};

// BaseLayout props (Astro frontmatter)
interface LayoutProps {
  title: string;        // 50-60 chars
  description: string;  // 150-160 chars
  path: string;         // for canonical
  schema?: SchemaType;  // 'ProfessionalService' | 'Service' | 'FAQPage' | 'Article' | 'BreadcrumbList'
  schemaData?: object;  // JSON-LD payload
  breadcrumb?: { name: string; path: string }[];
}

// SchemaJsonLd props: { schema, data } → <script type="application/ld+json">
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Component renders correct meta/schema | Snapshot or DOM assert in Astro component tests (if enabled) |
| Integration | Form POST → Web3Forms success redirect | Manual + curl to Web3Forms sandbox |
| Integration | Analytics scripts present + defer | Lighthouse audit, HTML source inspection |
| E2E | Full funnel: Home → Service → CTA → Contact → Gracias | Playwright (fase 2) or manual click-through |
| Performance | CWV targets met | Lighthouse CI: LCP<2.5s, CLS<0.1, score>90 |
| Accessibility | WCAG 2.1 AA | axe-core / Lighthouse a11y audit |
| SEO | JSON-LD validates, sitemap complete | Google Rich Results Test + sitemap inspector |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Static site generation only.

## Migration / Rollout

No data migration required (fresh build). Deploy plan: `astro build` → upload `dist/` to Hostinger. WordPress backup to external storage before removal. Rollback per proposal: restore WP backup or `dist/` backup on Hostinger.

## Open Questions

- [ ] Web3Forms access key, Umami website ID, Clarity project ID — client provisioning
- [ ] Astro `@astrojs/sitemap` vs manual sitemap.xml — recommend integration