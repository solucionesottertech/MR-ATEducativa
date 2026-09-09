# Exploration: mr-ateducativa-site

**Date**: 2026-07-30
**Change**: mr-ateducativa-site
**Project**: MR Ateducativa
**Skill Resolution**: paths-injected — 4 skills (seo, best-practices, accessibility, design-taste-frontend)

---

## 1. Site Structure

### Pages Required

| Page | URL | Purpose | Funnel Stage |
|------|-----|---------|--------------|
| Home | `/` | Landing page transaccional, narrativa centrada en el cliente | Awareness |
| Liderazgo | `/servicios/liderazgo` | Área MINEDUC: liderazgo institucional | Consideration |
| Pedagógica | `/servicios/pedagogica` | Área MINEDUC: asesoría pedagógica | Consideration |
| Convivencia | `/servicios/convivencia` | Área MINEDUC: convivencia escolar | Consideration |
| Recursos | `/servicios/recursos` | Área MINEDUC: gestión de recursos | Consideration |
| Sobre Nosotros | `/sobre-nosotros` | Fundadora + equipo de socios estratégicos | Consideration |
| Casos de Éxito | `/casos-exito` | Testimonios y resultados comprobables | Decision |
| Contacto | `/contacto` | Formulario + agendamiento | Decision |
| Blog | `/blog` | Recursos y contenido transaccional | Awareness |

### Jerarquía de Información

```
mr-ateducativa.cl
├── / (Home — landing transaccional)
├── /servicios/
│   ├── /servicios/liderazgo
│   ├── /servicios/pedagogica
│   ├── /servicios/convivencia
│   └── /servicios/recursos
├── /sobre-nosotros
├── /casos-exito
├── /contacto
└── /blog/
```

### Navegación y Flujo de Usuario

**Desktop nav**: Logo | Servicios (dropdown) | Sobre Nosotros | Casos de Éxito | Blog | [CTA: Diagnóstico Gratuito]

**Mobile nav**: Hamburger → slide-in panel con misma estructura + CTA prominente

**Flujo de conversión**:
1. Usuario llega por búsqueda orgánica → Home
2. Navega a servicio específico → Landing page de área
3. Lee casos de éxito → Confianza
4. Hace clic en "Diagnóstico Gratuito" → Formulario de contacto
5. Recibe email nurturing (7 emails en 30 días)

---

## 2. Competencia ATE Chile

### Análisis Comparativo

| Competidor | Tipo | Fortalezas | Debilidades | Oportunidades |
|------------|------|------------|-------------|---------------|
| **grupoeducativo.cl** | Corporativa | Marca establecida, múltiples servicios | Genérica, no personalizada, SEO débil | Posicionar como "socio estratégico" vs "proveedor" |
| **fch.cl** | Fundación | Credibilidad institucional, respaldo MINEDUC | Enfoque corporativo frío, poca conversión | Narrativa cálida, centrada en el cliente |
| **educacion2020.cl** | Consultora | Contenido abundante, blog activo | Sobrecarga de información, sin CTA claro | Enfoque en conversión, no en información |
| **educarchile.cl** | Portal | Autoridad, dominio grande | Contenido genérico, poca especialización ATE | Nicho específico "ATE + diagnóstico contextual" |

### Diferenciación Clave

**Posicionamiento MR Ateducativa**: "Diagnóstico contextual + soluciones a medida" vs charlas puntuales

**Mensaje diferenciador**: No vendemos servicios preempaquetados. Escuchamos, diagnosticamos y diseñamos soluciones desde la realidad de tu comunidad.

**Ventajas competitivas**:
- ATE persona natural con respaldo MINEDUC (cursos certificables, financiables con SEP)
- Enfoque estratégico de largo plazo (no intervenciones puntuales)
- Equipo de socios estratégicos especializados
- Investigación de campo como base de cada intervención

---

## 3. Narrativa SEO Transaccional

### Keywords Transaccionales por Página

**Home**:
- Primaria: "ATE Chile" | "asistencia técnica educativa"
- Secundaria: "consultora educacional colegios" | "asesoría educativa Chile"
- Long-tail: "asistencia técnica educativa para colegios"

**Servicios (por área)**:
- `/servicios/liderazgo`: "asesoría liderazgo educacional" | "mejorar liderazgo colegio"
- `/servicios/pedagogica`: "asesoría pedagógica colegios" | "mejorar resultados académicos"
- `/servicios/convivencia`: "asesoría convivencia escolar" | "solución convivencia colegio"
- `/servicios/recursos`: "gestión recursos educativos" | "optimizar recursos colegio"

**Sobre Nosotros**:
- "ATE experiencia Chile" | "consultora educativa con experiencia"

**Casos de Éxito**:
- "casos éxito ATE Chile" | "resultados asesoría educativa"

**Contacto**:
- "contratar ATE Chile" | "cotizar asesoría educativa" | "diagnóstico gratuito colegio"

### Funnel de Conversión

| Etapa | Contenido | CTA | Keyword |
|-------|-----------|-----|---------|
| **Awareness** | Blog posts, guías, checklist | Lead magnet "10 señales..." | informacional |
| **Consideration** | Landing pages servicio, casos éxito | "Agendar reunión" | transaccional |
| **Decision** | Diagnóstico gratuito, formulario | "Solicitar diagnóstico" | alta intención |

### Copywriting Framework

- **H1**: Dolor del cliente + solución + diferenciador
- **Meta description**: Problema + solución + CTA (150-160 chars)
- **Estructura por página**: Dolor → Solución → Prueba social → Acción

**Ejemplo H1 Home**: "Construimos soluciones educativas desde la realidad de tu comunidad"
**Ejemplo CTA**: "Dime qué necesitas y te acompaño"

### Lead Magnets por Etapa

- **TOFU** (Awareness): "10 señales de que tu colegio necesita una ATE" — PDF descargable
- **MOFU** (Consideration): Casos de éxito detallados + webinar "Diagnóstico Educativo"
- **BOFU** (Decision): Diagnóstico gratuito 30 minutos — formulario de agendamiento

---

## 4. Arquitectura de Información

### Mapa del Sitio Completo

```
mr-ateducativa.cl
├── /                              → Home (landing transaccional)
├── /servicios                     → Índice servicios
│   ├── /servicios/liderazgo       → Área 1: Liderazgo
│   ├── /servicios/pedagogica      → Área 2: Pedagógica
│   ├── /servicios/convivencia     → Área 3: Convivencia
│   └── /servicios/recursos        → Área 4: Recursos
├── /sobre-nosotros                → Fundadora + equipo
├── /casos-exito                   → Testimonios + resultados
├── /contacto                      → Formulario + agendamiento
├── /blog/                         → Índice blog
│   └── /blog/{slug}               → Posts individuales
├── /robots.txt
├── /sitemap.xml
└── /llms.txt                      → (opcional, emerging)
```

### URLs Amigables para SEO

| Regla | Ejemplo |
|-------|---------|
| Sin caracteres especiales | `/servicios/liderazgo` ✅ |
| Palabras clave en URL | `/servicios/convivencia-escolar` ✅ |
| URLs cortas (< 75 chars) | `/casos-exito` ✅ |
| Sin parámetros | `?page=2` ❌ → paginación interna |
| HTTPS siempre | `https://mr-ateducativa.cl/...` |

### Internal Linking Strategy

- **Home** → enlaza a todas las páginas de servicio (CTAs contextuales)
- **Cada servicio** → enlaza a servicios relacionados + casos de éxito + contacto
- **Blog posts** → enlazan a servicio relevante + lead magnet
- **Casos de éxito** → enlazan al servicio específico + contacto
- **Sobre nosotros** → enlaza a servicios + casos de éxito
- **Breadcrumbs** en todas las páginas internas (Home > Servicios > [Área])

### Schema Markup por Página

| Página | Schema | Propiedades Clave |
|--------|--------|-------------------|
| Home | `ProfessionalService` + `Organization` | name, url, logo, sameAs, contactPoint, areaServed |
| Servicios | `Service` + `BreadcrumbList` | serviceType, provider, areaServed, hasOfferCatalog |
| Sobre Nosotros | `Person` + `Organization` | name, jobTitle, worksFor, alumniOf |
| Casos de Éxito | `Review` + `AggregateRating` | reviewBody, author, ratingValue |
| Contacto | `ContactPage` + `FAQPage` | mainEntity (preguntas frecuentes) |
| Blog | `Article` + `BreadcrumbList` | headline, author, datePublished, dateModified |

---

## 5. Componentes de Conversión

### Lead Magnets por Etapa del Funnel

| Etapa | Lead Magnet | Captura | Ubicación |
|-------|-------------|---------|-----------|
| TOFU | "10 señales de que tu colegio necesita una ATE" | Formulario email | Blog posts, Home |
| MOFU | "Guía: Cómo elegir la ATE correcta para tu colegio" | Formulario email | Páginas servicio |
| BOFU | "Diagnóstico gratuito 30 min" | Formulario agendamiento | Home, Contacto, Todos los servicios |

### Formularios y Micro-Conversiones

**Formulario de contacto** (5 campos):
1. Nombre completo
2. Email
3. Teléfono (opcional)
4. Tipo de establecimiento (select: Sostenedor / Directivo / Jefe UTP / Otro)
5. Mensaje / Necesidad

**Formulario de diagnóstico gratuito** (campos adicionales):
- Nombre del colegio
- Comuna / Región
- Cantidad de alumnos
- Área de interés (select multiple: 4 áreas MINEDUC)

**Micro-conversiones**:
- Descarga de lead magnet (captura email)
- Suscripción a newsletter
- Clic en "Agendar reunión" (redirige a calendario)

### Social Proof

- **Testimonios**: 3-5 testimonios con nombre, cargo, colegio
- **Casos de éxito**: 2-3 casos detallados con problema → solución → resultado
- **Badges MINEDUC**: Logo MINEDUC, mención "ATE certificada", "Cursos financiables con SEP"
- **Números**: "X colegios acompañados", "X años de experiencia"

### CTA Principal

**"Diagnóstico Gratuito 30 minutos"**
- Ubicación: Hero (Home), final de cada página de servicio, sidebar blog, footer
- Formulario: nombre, email, colegio, área de interés
- Confirmación: email automático + agendamiento en calendario

---

## 6. Consideraciones Técnicas

### Stack Confirmado

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| Framework | Astro | HTML puro por defecto, zero JS, Islands architecture |
| CSS | Tailwind CSS | Diseño rápido, consistente, mobile-first |
| Deploy | Hostinger (estáticos) | Cliente ya tiene hosting contratado |
| Blog | Astro + Markdown/MDX | SEO-friendly, fácil de mantener |

### Mobile-First

- Diseñar primero para 375px (iPhone SE) → escalar a desktop
- Breakpoints Tailwind: `sm:640` `md:768` `lg:1024` `xl:1280`
- Touch targets: mínimo 44x44px
- Typography: 16px base, sin zoom necesario
- Navegación: hamburger en mobile, horizontal en desktop

### Performance (Core Web Vitals)

| Métrica | Target | Estrategia |
|---------|--------|------------|
| LCP | < 2.5s | Hero image preload, font-display: swap |
| INP | < 200ms | Zero JS por defecto (Astro), lazy-load interactividad |
| CLS | < 0.1 | Reservar espacio para imágenes, font size ajuste |

**Optimizaciones**:
- Imágenes: WebP/AVIF, lazy loading, width/height attributes
- Fuentes: Self-hosted, font-display: swap
- CSS: Purge Tailwind, critical CSS inline
- Scripts: defer/async, solo lo necesario

### Accesibilidad WCAG 2.1

| Nivel | Requisito | Implementación |
|-------|-----------|----------------|
| A | Alt text en imágenes | Descriptivo, no decorativas |
| A | Labels en formularios | `<label>` asociado a cada input |
| A | Navegación por teclado | Tab order lógico, focus visible |
| AA | Contraste 4.5:1 | Verificar paleta vs fondo |
| AA | Skip links | "Saltar al contenido principal" |
| AA | Heading hierarchy | H1 > H2 > H3, sin saltos |
| AA | Focus no obscurecido | `scroll-margin-top` para sticky nav |

### SEO Técnico

| Elemento | Implementación |
|----------|---------------|
| robots.txt | Allow all, sitemap reference |
| sitemap.xml | Auto-generado por Astro |
| canonical | Self-referencing en cada página |
| meta robots | index, follow (default) |
| Open Graph | og:title, og:description, og:image por página |
| Twitter Card | twitter:card, twitter:title, twitter:description |
| hreflang | `es-CL` (Chile) |
| lang attribute | `<html lang="es-CL">` |
| Structured data | JSON-LD por página (ver sección 4) |

---

## Approaches

### Approach 1: Astro + Tailwind CSS (Recomendado)

**Descripción**: Sitio estático con Astro como framework, Tailwind para estilos, deploy en Hostinger.

- **Pros**: Máximo SEO (HTML puro), zero JS por defecto, performance excelente, deploy simple (archivos estáticos), Islands architecture para interactividad cuando se necesite
- **Cons**: Edición manual por cliente (no hay CMS visual), necesita flujo de deploy, learning curve mínimo para Astro
- **Esfuerzo**: Medium

### Approach 2: HTML + CSS + JS Puro

**Descripción**: Sitio estático sin framework, HTML semántico, CSS vanilla o Bootstrap.

- **Pros**: Simple, sin dependencias, deploy trivial, fácil de mantener
- **Cons**: Sin build optimization, sin hot reload, código repetitivo, sin Islands architecture, harder de escalar
- **Esfuerzo**: Low

### Approach 3: Next.js SSG

**Descripción**: Next.js con exportación estática, React components.

- **Pros**: SSR/SSG flexible, ecosystem React, buena DX
- **Cons**: Bundle más pesado, más complejo para sitio estático, hosting más complejo, overkill para landing page
- **Esfuerzo**: Medium-High

---

## Recommendation

**Approach 1: Astro + Tailwind CSS** es la mejor opción por estas razones:

1. **SEO máximo**: HTML puro por defecto, sin JavaScript innecesario
2. **Performance**: Core Web Vitals fáciles de pasar (LCP < 1s posible)
3. **Deploy en Hostinger**: Solo archivos estáticos, sin servidor
4. **Blog nativo**: Markdown/MDX para contenido transaccional
5. **Escalabilidad**: Islands architecture permite agregar interactividad sin penalización
6. **Mobile-first**: Tailwind facilita diseño responsive
7. **Mantenimiento**: Cliente puede actualizar contenido via Markdown

**Alternativa si el cliente necesita CMS visual**: Considerar Astro + Sanity o Astro + Contentful para blogging futuro.

---

## Risks

1. **Contenido pendiente**: El cliente debe proveer textos, fotos, casos de éxito. Sin ellos el plazo se posterga.
2. **Hostinger limitations**: Hosting compartido puede limitar performance (mitigado con HTML estático)
3. **Sin CMS**: El cliente no podrá editar contenido fácilmente sin conocimiento técnico
4. **SEO timeline**: Los resultados de SEO orgánico toman 3-6 meses en materializarse
5. **Competencia establecida**: Grupos educativos con más autoridad de dominio
6. **Alcance del contenido**: Definir claramente qué produce el cliente vs qué produce OtterTech

---

## Ready for Proposal

**Yes** — La exploración está completa con:
- Estructura del sitio definida (9 páginas + blog)
- Competencia analizada (4 competidores)
- Estrategia SEO transaccional con keywords por página
- Arquitectura de información con URLs y schema markup
- Componentes de conversión con lead magnets y formularios
- Stack técnico confirmado (Astro + Tailwind)
- Riesgos identificados y mitigaciones propuestas

**Siguiente fase recomendada**: `sdd-propose` — Crear propuesta formal con alcance, enfoque y plan de rollback.
