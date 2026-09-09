# Proposal: MR Ateducativa Corporate Identity Overhaul

## Intent

El cliente envió la información corporativa REAL. El sitio actual es placeholder (4 servicios, copy genérica, paleta azul provisional, logo placeholder). Este cambio reemplaza la identidad y el contenido por los oficiales: paleta navy/rosa/teal/naranja, logo MR ATEducativa (libro+birrete), foto de Marilyn Reyes Molina, 10 servicios con textos completos, y secciones nuevas (Método, Formas de trabajar, Experiencia y Resultados, Equipo).

## Scope

### In Scope
- Paleta oficial en `tailwind.config.mjs`: primary `#202c4c`, rosa `#d95986`, teal `#7bb6b3`, naranja `#ffbb5d` (con verificación de contraste AA)
- Logo real (MR ATEducativa, libro+birrete) en `BaseLayout`/`Header`/`Footer`
- Menú: Inicio | Nosotros | Servicios | Experiencia y Resultados | Equipo | Contacto
- `src/data/services.ts` con 10 servicios + descripciones extensas
- 10 páginas `/servicios/{slug}` dinámicas con contenido real
- Contenido real en Nosotros (bio Marilyn: PUC, Magíster, Salamanca, Lisboa, 20 años), Contacto (formulario detallado + datos), Home
- Sección "Nuestro Método" (6 pasos: Escuchamos→Investigamos→Diagnosticamos→Diseñamos→Implementamos→Evaluamos)
- Sección "Tres formas de trabajar" (Capacitación, Asesoría Especializada, Acompañamiento Institucional)
- Página Equipo + página Experiencia y Resultados
- Foto de Marilyn (`Información/Foto Marilyn.png`) integrada
- Footer actualizado con datos de contacto reales

### Out of Scope
- Lead magnets y PDFs reales (deferido a fase 2)
- Blog /cms visual
- Pasarelas de pago / e-commerce
- Rediseño de stack (sigue Astro+Tailwind+pnpm, Web3Forms, Umami, Clarity)

## Capabilities

### New Capabilities
- `brand-identity`: paleta oficial (navy/rosa/teal/naranja), logo libro+birrete, reglas de uso de color seguro en contraste AA
- `services-catalog`: 10 servicios corporativos con texto completo, páginas dinámicas, cross-linking
- `methodology-team`: Nuestro Método (6 pasos), Tres formas de trabajar, Equipo, Experiencia y Resultados

### Modified Capabilities
- `site-pages`: navegación reestructurada (Inicio/Nosotros/Servicios/Experiencia y Resultados/Equipo/Contacto), Blog fuera, Casos de Éxito → Experiencia y Resultados, contenido placeholder → real
- `seo-and-conversion`: títulos/H1/CTA/meta actualizados a identidad corporativa, internal linking contra nueva estructura
- `forms-and-analytics`: formulario de contacto con campos reales detallados; mantener CTA diagnóstico; config de access key real de Web3Forms

## Approach

Actualizar tokens de Tailwind + data file central de servicios → páginas dinámicas (`getStaticPaths` sobre 10 slugs) → reemplazar copy placeholder con textos reales → reestructurar Header/Footer/data de navegación → integrar logo y foto. Sin backend nuevo: Web3Forms/Umani/Clarity ya cableados.

### Patrón de migración de rutas
| Ruta actual | Destino |
|---|---|
| `/servicios/{liderazgo,pedagogica,convivencia,recursos}` | 4 de los 10 nuevos slugs (renombrar al título oficial) |
| `/casos-exito` | → `/experiencia-y-resultados` |
| (nuevo) Equipo, 6 servicios nuevos, Método, Formas de trabajar | páginas nuevas |
| `/blog` | fuera del menú (mantener scaffolding oculto, fase 2) |

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tailwind.config.mjs` | Modified | Paleta oficial reemplaza azul + colores por área |
| `src/data/services.ts`, `src/data/site.ts` | Modified | 10 servicios + nav real |
| `src/components/{Header,Footer,BaseLayout,ServiceCard}.astro` | Modified | Logo, menú, footer |
| `src/pages/servicios/*` | New/Modified | 10 páginas dinámicas |
| `src/pages/{index,sobre-nosotros,contacto}.astro` | Modified | Copy real |
| `src/pages/experiencia-y-resultados.astro` | New |
| `src/pages/equipo.astro` | New |
| `public/` | New | Logo + `Foto Marilyn.png` optimizada (WebP/AVIF) |
| `openspec/specs/{site-pages,seo-and-conversion,forms-and-analytics}/spec.md` | Modified | deltas |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Naranja `#ffbb5d` sobre blanco falla contraste AA | High | Reservar naranja para fondos/acentos, no texto; texto siempre navy/neutral |
| 10 servicios inflan revisión (>400 líneas) | High | Chained PRs por slot (paleta+nav / data+servicios / páginas) |
| Bio/foto con derechos de imagen | Med | Confirmar autorización de uso con Marilyn |
| Rutas viejas indexadas (casos-exito) | Med | Redirects 301 a nueva ruta en Hostinger |

## Rollback Plan

1. Es cambio de contenido/identidad sobre sitio deployable: rollback = revert commit + redeploy `dist/`
2. Mantener `tailwind.config.mjs` anterior en git history
3. Antes de eliminar página, verificar que no esté indexada; si lo está, dejar redirect antes de remover
4. Backup de `public/` de logo viejo antes de reemplazar

## Dependencies

- Info corporativa real: ya recibida en `Información/` (textos, colores, foto)
- Web3Forms access key real (config al implementar contacto)
- Confirmación de Marilyn: uso de foto + definición de Equipo (sola vs red de colaboradores)

## Success Criteria

- [ ] Paleta oficial aplicada consistente y contraste AA verificado
- [ ] Logo real integrado en Header/Footer/layout
- [ ] Menú: Inicio | Nosotros | Servicios | Experiencia y Resultados | Equipo | Contacto
- [ ] 10 páginas de servicios con contenido completo
- [ ] Textos reales en Home, Nosotros, Contacto
- [ ] Secciones Método (6 pasos), Formas de trabajar (3), Experiencia y Resultados, Equipo
- [ ] Foto de Marilyn integrada optimizada (WebP/AVIF, width/height)
- [ ] `pnpm build` exitoso sin errores
- [ ] Lighthouse Accessibility ≥ 90 mantenida con nueva paleta