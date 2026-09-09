# Exploration: design-consistency-and-mentoria-highlight

## Current State Analysis

### Color Palette (tailwind.config.mjs)

The current palette uses **approximate** hex values, not the official ones from the client:

| Color | Current | Official | Delta |
|-------|---------|----------|-------|
| primary-700 (Navy) | `#202F55` | `#202c4c` | Slight blue shift |
| rosa-500 (Rosa) | `#C9527F` | `#d95986` | More saturated pink |
| teal-500 (Teal) | `#7CBDB6` | `#7bb6b3` | Slight hue shift |
| naranja-500 (Amber) | `#FBB44E` | `#ffbb5d` | More orange |

The `global.css` mirrors these approximate values in CSS custom properties (lines 9-17). The gradient utilities (lines 393-426) use the **official** hex values inline, creating a mismatch between the Tailwind classes and the CSS utilities.

### Service Alias Colors (tailwind.config.mjs lines 62-101)

The `liderazgo`, `pedagogica`, `convivencia`, and `recursos` color aliases inherit the same approximate values. These need updating to match official palette.

### Purple Color — MISSING

No purple (`#6B4C9A`) exists anywhere in the config. The Mentoría page currently uses `rosa` (pink) as its accent, which is wrong — it should have its own distinct color.

### Mentoría Page (mentoria-directores.astro) — Style Issues

**Generic AI patterns found:**
- Hero: `rounded-full blur-3xl` decorative blobs (lines 22-23)
- Hero: `dots-pattern` (line 24)
- Hero: gradient badge with `bg-rosa-500/20 text-rosa-300 border border-rosa-400/20` (lines 30-32)
- Steps section: Numbers in colored circles with `shadow-lg shadow-rosa-500/25` (lines 160-161, 200-201, etc.)
- Steps cards: `hover:shadow-lg hover:-translate-y-1 transition-all` (lines 159, 199, 254, etc.)
- Badges: `bg-rosa-100 text-rosa-700` and `bg-teal-100 text-teal-700` (lines 267-271, 334-336)
- CTA section: gradient background with `rounded-full blur-3xl` blobs (lines 563-567)

**Structural differences from liderazgo.astro:**
- liderazgo uses a simpler layout: description section → subdimensions → "Ideal para" → CTA
- mentoria has 7+ sections with complex grids, numbered step cards, modalidades, redes, etc.
- liderazgo has no hover effects on cards — uses clean `shadow-sm border border-primary-200`
- mentoria uses `hover:shadow-lg hover:-translate-y-1` extensively

### Liderazgo Page (liderazgo.astro) — Reference Style

- Hero: gradient background with `animate-gradient`, blobs, dots pattern (lines 16-21)
- Subdimensions: clean cards with `shadow-sm border border-primary-200` (line 69)
- Step numbers: simple `bg-primary-100 rounded-xl` circles (line 71)
- No hover lift effects
- CTA: simple gradient background (line 109)

### Index Page (index.astro) — Current Structure

Sections in order:
1. Hero (with extensive decorative elements — blobs, floating circles, geometric shapes, dots/grid patterns)
2. Stats (4-column grid with colored cards)
3. Services (4 service cards via ServiceCard component)
4. Nuestro Método (6 steps with icons in gradient circles)
5. Tres formas de trabajar (3 modalities)
6. CTA Diagnóstico (gradient with blobs)
7. Testimonials
8. DiagnosticoModal

**Mentoría is NOT highlighted anywhere** — only appears in navigation dropdown.

### Reference Mockup (Maquetas) — Editorial Style

Key differences from current implementation:
- **Typography**: Playfair Display (serif) for headings, Source Sans 3 for body — vs Plus Jakarta Sans + Inter
- **Numbers**: Monospace font for step numbers (01, 02, 03) with color accents — vs colored circles with shadows
- **Cards**: Asymmetric border-radius `18px 18px 18px 60px` — vs uniform `rounded-2xl`
- **Testimonials**: Subtle rotation (`rotate(-1.2deg)`, `rotate(1.1deg)`) — vs no rotation
- **Separators**: `border-top` for list items — vs card-based layouts
- **Colors**: Punctual accents (eyebrow text, number colors) — vs full background fills
- **Spacing**: Generous with `clamp()` — vs fixed Tailwind spacing
- **No decorative blobs, animated gradients, icons in colored circles, gradient badges, dots patterns**

### ServiceCard Component

- Uses colored circle icons (`w-14 h-14 rounded-xl ... shadow-md`) — a "generic AI" pattern
- Has decorative circle in corner (`-bottom-8 -right-8 w-32 h-32 rounded-full`)
- Uses `hover:-translate-y-2 hover:shadow-2xl` — aggressive hover

## Affected Areas

### Files to Modify

1. **`tailwind.config.mjs`** — Fix 4 color values + add purple palette
2. **`src/styles/global.css`** — Fix CSS custom properties + add purple accents + remove/clean generic utilities
3. **`src/pages/servicios/mentoria-directores.astro`** — Full style overhaul to match editorial pattern + use purple
4. **`src/pages/index.astro`** — Add Mentoría highlight section
5. **`src/components/ServiceCard.astro`** — Remove generic AI patterns (hover lift, decorative circle, icon in colored circle)
6. **`src/components/Header.astro`** — Add Mentoría icon/color mapping
7. **`src/data/site.ts`** — Already has Mentoría in nav (confirmed)
8. **`src/data/services.ts`** — May need Mentoría service area entry if it should appear in services grid

### Files Affected Indirectly

- All pages using the corrected Tailwind colors (visual shift across entire site)
- `src/pages/servicios/liderazgo.astro` — Uses `animate-gradient` and blobs in hero
- Other service pages using similar patterns

## Approaches

### Approach 1: Surgical Fixes — Minimal Disruption

**What**: Fix colors only, add purple, restyle mentoria page, add index highlight section.

- **Pros**: Low risk, focused changes, easy to review
- **Cons**: Leaves generic AI patterns on other pages (ServiceCard, index hero, etc.)
- **Effort**: Low-Medium

### Approach 2: Design Consistency Pass (Recommended)

**What**: Fix colors + restyle mentoria + add index highlight + clean ServiceCard + remove worst generic AI patterns site-wide.

- **Pros**: Addresses all client concerns in one pass, consistent result
- **Cons**: Larger diff, more files touched
- **Effort**: Medium

### Approach 3: Full Editorial Redesign

**What**: Adopt Playfair Display typography, asymmetric borders, editorial layout across all pages.

- **Pros**: Matches mockups exactly
- **Cons**: Massive scope, changes brand identity, likely out of scope for this change
- **Effort**: High

## Recommendation

**Approach 2 (Design Consistency Pass)** with these priorities:

### Phase A: Color Foundation (low risk, high impact)
1. Fix `tailwind.config.mjs` color values to official palette
2. Add `mentoría` purple palette (`#6B4C9A` with shades)
3. Update `global.css` CSS custom properties to match
4. Update service alias colors (`pedagogica`, `convivencia`, `recursos`)

### Phase B: Mentoría Page Restyle (medium risk, high impact)
1. Replace rosa references with purple throughout
2. Remove decorative blobs, dots patterns, animated gradients
3. Restyle step cards: remove `hover:shadow-lg hover:-translate-y-1`, remove shadow circles
4. Use editorial numbering pattern (monospace numbers with color, `border-top` separators)
5. Simplify badges to text-only with color accent

### Phase C: Index Highlight Section (low risk, medium impact)
1. Add a dedicated section between Services and Nuestro Método (or after Testimonials)
2. Editorial style: eyebrow label, heading, brief description, CTA to `/servicios/mentoria-directores`
3. Use purple accent color for visual distinction

### Phase D: ServiceCard Cleanup (low risk, medium impact)
1. Remove `hover:-translate-y-2 hover:shadow-2xl` → use subtler hover
2. Remove decorative circle in corner
3. Simplify icon treatment (smaller, no shadow)

## Specific Changes by File

### tailwind.config.mjs

```
primary-700: '#202F55' → '#202c4c'
rosa-500: '#C9527F' → '#d95986'
teal-500: '#7CBDB6' → '#7bb6b3'
naranja-500: '#FBB44E' → '#ffbb5d'

Add new color:
mentoria: {
  50: '#f3eef8',
  100: '#e7ddf1',
  200: '#d0bbe3',
  300: '#b999d5',
  400: '#9170b8',
  500: '#6B4C9A',  // Principal
  600: '#5a3f82',
  700: '#4a336a',
}

Update service aliases:
pedagogica-500: '#C9527F' → '#d95986'
convivencia-500: '#FBB44E' → '#ffbb5d'
recursos-500: '#7CBDB6' → '#7bb6b3'
```

### global.css

```
Update CSS variables:
--color-primary: #202c4c (was #202F55)
--color-pedagogica: #d95986 (was #C9527F)
--color-convivencia: #ffbb5d (was #FBB44E)
--color-recursos: #7bb6b3 (was #7CBDB6)
Add: --color-mentoria: #6B4C9A

Add accent classes:
.accent-mentoria { color: var(--color-mentoria); }
.bg-mentoria-subtle { background-color: #f3eef8; }
.border-mentoria { border-color: var(--color-mentoria); }
```

### mentoria-directores.astro

Major restyle needed:
- Hero: Replace blobs with clean solid background (`bg-primary-800`)
- Remove dots-pattern overlay
- Replace gradient badge with simple text eyebrow
- Steps section: Replace numbered circles with monospace numbers + `border-top` pattern
- Remove all `hover:shadow-lg hover:-translate-y-1` from step cards
- Replace `shadow-lg shadow-rosa-500/25` number circles with simple colored text
- Change all `rosa` references to `mentoria` purple
- Simplify modalidades cards (remove shadow-lg, remove "Más solicitado" badge animation)
- CTA: Remove blobs, use solid navy background

### index.astro

Add section after Services (or before CTA Diagnóstico):
```astro
<!-- Mentoría Highlight -->
<section class="section-padding bg-white">
  <div class="container-page">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="eyebrow text-mentoria-500">Mentoría Directiva</span>
        <h2 class="heading-h2 text-neutral-900 mt-4 mb-6">
          Acompañamiento directo para directores escolares
        </h2>
        <p class="body-lg text-neutral-600 mb-8">
          Mentoría estratégica situada en la realidad de cada establecimiento. 
          No reemplazamos al director — desarrollamos su capacidad para liderarlo.
        </p>
        <a href="/servicios/mentoria-directores" class="btn ...">
          Conocer el servicio
        </a>
      </div>
      <div>
        <!-- Editorial visual: number list or key differentiators -->
      </div>
    </div>
  </div>
</section>
```

### ServiceCard.astro

- Remove `hover:-translate-y-2 hover:shadow-2xl` → use `hover:shadow-card-hover`
- Remove decorative circle (lines 128-131)
- Reduce icon size from `w-14 h-14` to `w-10 h-10` and remove `shadow-md`
- Consider removing gradient background on card (`bg-gradient-to-br`)

## Risks

1. **Color shift across entire site**: Changing official palette values will affect every page. Visual QA needed.
2. **Mentoría not in services data**: The `services.ts` array doesn't include Mentoría — it's only in `site.ts` nav. The index services grid won't show it unless we add it to `services.ts`.
3. **Breaking changes in CSS utilities**: Some gradient utilities use hardcoded hex values that already match the official palette — these would NOT need changing, creating potential confusion.
4. **Typography change deferred**: The mockup uses Playfair Display + Source Sans 3, but the current site uses Plus Jakarta Sans + Inter. This is a larger brand decision — recommend deferring unless client specifically requests it.

## Ready for Proposal

**Yes** — the exploration is complete. The orchestrator should:
1. Present the color corrections as a quick win (low risk)
2. Propose the Mentoría page restyle with editorial patterns
3. Propose the index highlight section
4. Ask the client if they want to also adopt Playfair Display typography (bigger scope)
