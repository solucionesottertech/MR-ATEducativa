# Proposal: MR Ateducativa Site

## Intent

Reemplazar el sitio WordPress en construcción por un sitio estático transaccional en Astro + Tailwind que posicione a Marilyn Reyes como ATE de referencia en Chile, capture leads de sostenedores/directivos y permita deploy en Hostinger sin backend.

## Scope

### In Scope
- 9 páginas estáticas: Home, 4 servicios (áreas MINEDUC), Sobre Nosotros, Casos de Éxito, Contacto, Blog
- Astro + Tailwind CSS, HTML puro, zero JS por defecto
- Formularios con Web3Forms (POST endpoint, 250 envíos/mes gratis)
- Analytics privacy-friendly: Umami Cloud + Microsoft Clarity (sin cookie banner)
- SEO transaccional on-page completo + Schema JSON-LD (ProfessionalService, Service, FAQ, BreadcrumbList, Article)
- Lead magnets scaffolding (estructura con placeholders, PDFs reales en fase 2)
- Accesibilidad WCAG 2.1 AA
- robots.txt, sitemap.xml, Open Graph, hreflang es-CL
- Migración: eliminar WordPress, subir nuevo sitio a Hostinger (dominio ya enlazado)
- Contenido: placeholders claros; Marilyn envía contenido real post-entrega
- Documentación básica de edición manual (sin CMS)

### Out of Scope
- CMS visual (fase 2 opcional: Astro + Sanity)
- PDFs reales de lead magnets (fase 2)
- Email nurturing automatizado (fase 2)
- Blog posts con contenido real (solo scaffolding + 1-2 ejemplos)
- E-commerce / pasarelas de pago

## Capabilities

> Contracto con sdd-spec. Sin specs existentes en `openspec/specs/` — todas son nuevas.

### New Capabilities
- `site-pages`: 9 páginas estáticas, estructura de información, navegación, mobile-first responsive
- `contact-forms`: integración Web3Forms (contacto + diagnóstico), validación, mensajes de confirmación
- `analytics-tracking`: snippets Umami Cloud + Microsoft Clarity en `<head>`, privacy-friendly sin consent banner
- `seo-optimization`: SEO on-page transaccional, Schema JSON-LD, robots/sitemap, Open Graph, internal linking, hreflang
- `lead-magnets`: scaffolding de 3 lead magnets (TOFU/MOFU/BOFU) con placeholders para PDFs reales
- `site-migration`: eliminación de WordPress, deploy estático a Hostinger, dominio enlazado

### Modified Capabilities
- None (proyecto nuevo, sin specs previas)

## Approach

Astro genera HTML puro con zero JS por defecto → máximo SEO y Core Web Vitals. Tailwind para diseño mobile-first. Web3Forms recibe POST del formulario HTML (sin backend). Umami + Clarity como scripts defer en `<head>`. Deploy estático: `astro build` → subir `dist/` a Hostinger vía FTP/git.

**Plan de migración**: desarrollar nuevo sitio en paralelo → backup WordPress → eliminar WP → subir `dist/` a Hostinger (dominio ya apunta a Hostinger, solo deploy).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `openspec/specs/site-pages/` | New | Spec de 9 páginas estáticas |
| `openspec/specs/contact-forms/` | New | Spec de Web3Forms |
| `openspec/specs/analytics-tracking/` | New | Spec de Umami + Clarity |
| `openspec/specs/seo-optimization/` | New | Spec SEO transaccional |
| `openspec/specs/lead-magnets/` | New | Spec scaffolding lead magnets |
| `openspec/specs/site-migration/` | New | Spec migración Hostinger |
| `/` (raíz proyecto) | New | Nuevo proyecto Astro + Tailwind desde cero |
| `wp-content/`, `wp-admin/` | Removed | Eliminación WordPress actual |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Contenido pendiente del cliente | High | Placeholders claros + documento de contenido requerido |
| Sin CMS visual → edición difícil para cliente | Med | Documentación de edición manual + ejemplos Markdown |
| SEO timeline 3-6 meses | High | Expectativas realistas con cliente desde la entrega |
| Migración dominio rompe SEO existente | Low | Backup WP antes de eliminar; dominio ya enlazado en Hostinger |
| Límite 250 envíos/mes Web3Forms | Med | Monitorear; upgrade a plan pago si se excede |
| Hostinger compartido limita performance | Low | HTML estático = cero overhead servidor |

## Rollback Plan

1. Antes de eliminar WordPress: backup completo (`wp-content/`, base de datos) a almacenamiento externo
2. Mantener `dist/` anterior en Hostinger como `dist-backup-{fecha}/`
3. Si nuevo sitio falla: restaurar WordPress desde backup o re-deployar `dist-backup/`
4. Git branch `main` protegido; rollback = revert commit + redeploy
5. Dominio permanece enlazado a Hostinger (no cambia DNS), minimiza riesgo

## Dependencies

- Web3Forms (API key requerida al implementar formularios)
- Umami Cloud (account + website ID)
- Microsoft Clarity (project ID)
- Hostinger (acceso FTP/git confirmado por cliente)
- Contenido real: Marilyn provee tras entrega del primer slice

## Success Criteria

- [ ] Lighthouse >90 en Performance, Accessibility, Best Practices, SEO (todas las categorías)
- [ ] Mobile-first responsive validado en 375px / 768px / 1024px / 1280px
- [ ] Accesibilidad WCAG 2.1 AA verificada (contraste 4.5:1, tab order, alt text, labels)
- [ ] SEO técnico completo: robots, sitemap, canonical, JSON-LD, Open Graph hreflang es-CL
- [ ] Formularios Web3Forms funcionales (envío → confirmación)
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Analytics Umami + Clarity registrando eventos en producción
- [ ] Sitio desplegado en Hostinger con dominio mr-ateducativa.cl
- [ ] WordPress eliminado sin pérdida de datos (backup externo)