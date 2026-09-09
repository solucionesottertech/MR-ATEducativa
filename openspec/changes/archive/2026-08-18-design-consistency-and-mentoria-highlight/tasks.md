# Tasks: Design Consistency & Mentoría Highlight

## Apply Status

- [x] All implementation and verification tasks completed in standard mode.
- [x] Focused build, palette, forbidden-pattern, color-binding, route, and static responsive assertions passed.
- [ ] Browser-based visual inspection at 375px, 768px, 1024px, and 1440px remains unavailable in the apply environment.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~170 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Decision needed before apply | No |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low
```

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| A | Fix color foundation (hex values + mentoria palette) | PR 1 | `pnpm build && grep -E "#202c4c\|#d95986\|#ffbb5d\|#7bb6b3\|#6B4C9A" tailwind.config.mjs src/styles/global.css` | N/A (config-only) | Revert tailwind.config.mjs + global.css changes |
| B | Mentoría page restyle (editorial pattern) | PR 1 | `pnpm build && ! grep -E "blur-3xl\|dots-pattern\|animate-gradient\|rosa-" src/pages/servicios/mentoria-directores.astro` | Manual QA at /servicios/mentoria-directores | Revert mentoria-directores.astro changes |
| C | Add Mentoría to services grid + Home highlight | PR 1 | `pnpm build && grep "mentoria" src/data/services.ts src/pages/servicios/index.astro src/components/ServiceCard.astro src/components/Header.astro` | Manual QA at / and /servicios | Revert services.ts + index.astro + ServiceCard.astro + Header.astro changes |
| D | ServiceCard cleanup (remove generic patterns) | PR 1 | `pnpm build && ! grep -E "hover:-translate-y-2\|hover:shadow-2xl\|-bottom-8 -right-8" src/components/ServiceCard.astro` | Manual QA at / and /servicios | Revert ServiceCard.astro changes |

All work units ship in a single PR (under 400-line budget).

## Phase A: Color Foundation (Low Risk)

### [x] Task A.1: Fix hex values in tailwind.config.mjs
- **Description**: Update 4 principal shade hex values in both base and area palettes: `primary.700`/`liderazgo.700` → `#202c4c`, `rosa.500`/`pedagogica.500` → `#d95986`, `naranja.500`/`convivencia.500` → `#ffbb5d`, `teal.500`/`recursos.500` → `#7bb6b3`
- **Files**: `tailwind.config.mjs` (lines 24, 70, 35, 78, 57, 88, 46, 98)
- **Acceptance**: `grep -E "#202c4c|#d95986|#ffbb5d|#7bb6b3" tailwind.config.mjs` returns 8 matches; `grep -E "#202F55|#C9527F|#FBB44E|#7CBDB6" tailwind.config.mjs` returns 0 matches
- **Dependencies**: none

### [x] Task A.2: Add mentoria palette to tailwind.config.mjs
- **Description**: Add `mentoria` color ramp (50-700) based on `#6B4C9A` after `recursos` palette
- **Files**: `tailwind.config.mjs` (insert after line 101)
- **Acceptance**: `mentoria` object with shades 50-700 exists; `mentoria.500` = `#6B4C9A`
- **Dependencies**: none

### [x] Task A.3: Fix CSS custom properties in global.css
- **Description**: Update 5 CSS custom properties to exact hex: `--color-primary`/`--color-liderazgo` → `#202c4c`, `--color-pedagogica` → `#d95986`, `--color-convivencia` → `#ffbb5d`, `--color-recursos` → `#7bb6b3`
- **Files**: `src/styles/global.css` (lines 9, 14-17)
- **Acceptance**: `grep -E "#202c4c|#d95986|#ffbb5d|#7bb6b3" src/styles/global.css` returns 5 matches; old approximations removed
- **Dependencies**: none

### [x] Task A.4: Add mentoria CSS custom property and utilities
- **Description**: Add `--color-mentoria: #6B4C9A` to `:root`; add `.accent-mentoria`, `.bg-mentoria-subtle`, `.border-mentoria` utilities after existing area utilities
- **Files**: `src/styles/global.css` (insert after line 17, after line 300)
- **Acceptance**: `--color-mentoria` exists; `.accent-mentoria { color: var(--color-mentoria); }`; `.bg-mentoria-subtle` and `.border-mentoria` defined
- **Dependencies**: A.2 (mentoria Tailwind palette)

## Phase B: Mentoría Restyle (Medium Risk)

### [x] Task B.1: Remove generic AI patterns from mentoria-directores.astro
- **Description**: Remove `blur-3xl` blobs (lines 22-23, 565-566), `dots-pattern` (lines 24, 567), `animate-gradient` (none present but verify)
- **Files**: `src/pages/servicios/mentoria-directores.astro` (hero section lines 20-25, CTA section lines 563-568)
- **Acceptance**: `grep -E "blur-3xl|dots-pattern|animate-gradient" src/pages/servicios/mentoria-directores.astro` returns 0 matches
- **Dependencies**: none

### [x] Task B.2: Replace rosa-* with mentoria-* throughout mentoria-directores.astro
- **Description**: Replace all `rosa-*` class references (~40 occurrences) with `mentoria-*` equivalents: `rosa-500` → `mentoria-500`, `rosa-100` → `mentoria-100`, `rosa-400` → `mentoria-400`, `rosa-300` → `mentoria-300`, `rosa-700` → `mentoria-700`, `rosa-600` → `mentoria-600`, `rosa-50` → `mentoria-50`
- **Files**: `src/pages/servicios/mentoria-directores.astro` (lines 22, 30, 36, 98, 149, 160, 169, 173, 177, 181, 185, 189, 200, 209, 216, 223, 230, 237, 244, 255, 267-271, 277, 286, 290, 294, 298, 302, 306, 310, 314, 325, 335, 345, 354, 358, 362, 366, 370, 444, 446, 449)
- **Acceptance**: `grep "rosa-" src/pages/servicios/mentoria-directores.astro` returns 0 matches; `grep "mentoria-" src/pages/servicios/mentoria-directores.astro` returns ~40 matches
- **Dependencies**: A.2, A.4 (mentoria tokens exist)

### [x] Task B.3: Convert 6 step cards to editorial numbering with border-top separators
- **Description**: Replace floating card pattern (lines 157-378) with editorial style: remove `bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-lg hover:-translate-y-1`, replace number badges (`w-12 h-12 bg-rosa-500 rounded-xl ...`) with monospace `01`-`06` using `font-mono text-mentoria-500 text-sm tracking-wider`, add `border-t border-neutral-200 pt-6` separators
- **Files**: `src/pages/servicios/mentoria-directores.astro` (lines 159, 160-162, 199, 200-202, 254, 255-257, 276, 277-279, 324, 325-327, 344, 345-347)
- **Acceptance**: Each step card has `border-t border-neutral-200 pt-6`; number uses `font-mono text-mentoria-500`; no `hover:shadow-lg hover:-translate-y-1` on cards
- **Dependencies**: B.1, B.2

### [x] Task B.4: Fix color leaks in Modalidades and Redes sections
- **Description**: Replace `naranja-100`/`naranja-700` eyebrow (line 421) with `mentoria-100`/`mentoria-700`; replace `teal-100`/`teal-700` eyebrow (line 480) with `mentoria-100`/`mentoria-700`; replace role tile colors (lines 493, 503, 513) with `mentoria-500`/`mentoria-600`/`mentoria-700` shades
- **Files**: `src/pages/servicios/mentoria-directores.astro` (lines 421, 480, 493, 503, 513)
- **Acceptance**: No `naranja-*` or `teal-*` in Modalidades/Redes sections; role tiles use distinct mentoria shades
- **Dependencies**: B.2

### [x] Task B.5: Update CTA gradient endpoint
- **Description**: Change CTA section gradient from `to-rosa-600` to `to-mentoria-600` (line 563)
- **Files**: `src/pages/servicios/mentoria-directores.astro` (line 563)
- **Acceptance**: `grep "to-mentoria-600" src/pages/servicios/mentoria-directores.astro` returns 1 match
- **Dependencies**: B.2

## Phase C: Index Highlight (Low Risk)

### [x] Task C.1: Add Mentoría entry to services.ts
- **Description**: Add 5th `serviceAreas` entry with slug `mentoria-directores`, name `Mentoría para Directores`, color `mentoria`, tagline `Fortalecemos el liderazgo directivo desde la realidad de cada escuela.`, description, metaDescription, keywords, icon, iconSvg, subdimensions (3 subdimensions: Mentoría situada, Plan individual, Seguimiento)
- **Files**: `src/data/services.ts` (insert after line 253)
- **Acceptance**: `serviceAreas.length` = 5; `serviceAreas[4].slug` = `mentoria-directores`; `serviceAreas[4].color` = `mentoria`; legacy `services` array auto-derives 5th entry
- **Dependencies**: A.2 (mentoria Tailwind palette)

### [x] Task C.2: Add mentoria key to servicios/index.astro colorMap
- **Description**: Add `mentoria` key to `colorMap` with bg `bg-mentoria-50`, text `text-mentoria-700`, border `border-mentoria-200`, gradient `from-mentoria-500 to-mentoria-700`, iconSvg (purple icon)
- **Files**: `src/pages/servicios/index.astro` (insert after line 34)
- **Acceptance**: `colorMap.mentoria` exists with all required keys; prevents undefined-color crash from 5th serviceAreas entry
- **Dependencies**: C.1, A.2

### [x] Task C.3: Update "Cuatro" to "Cinco" in servicios/index.astro
- **Description**: Change "Cuatro áreas de especialización" (line 77) and "Nuestras cuatro áreas" (line 83) to "Cinco"
- **Files**: `src/pages/servicios/index.astro` (lines 77, 83)
- **Acceptance**: `grep "Cinco" src/pages/servicios/index.astro` returns 2 matches
- **Dependencies**: C.1

### [x] Task C.4: Add Mentoría highlight section to index.astro
- **Description**: Insert new section between Services (ends line 170) and Nuestro Método (starts line 172): editorial 2-col layout with `border-t-2 border-mentoria-500 pt-6`, eyebrow `text-mentoria-600`, heading, description, CTA button linking to `/servicios/mentoria-directores`; right column with 3 key points using `border-t border-neutral-200 pt-4` + monospace `01`/`02`/`03`
- **Files**: `src/pages/index.astro` (insert after line 170)
- **Acceptance**: Section exists between Services and Nuestro Método; uses `mentoria-*` tokens; CTA links to `/servicios/mentoria-directores`; editorial style (no full-width purple background)
- **Dependencies**: C.1, A.2, A.4

### [x] Task C.5: Update grid layout and stats for 5 services
- **Description**: Change Services grid from `lg:grid-cols-4` to `lg:grid-cols-3` (line 162); change stat "4" to "5" (line 139); change "Cuatro áreas" to "Cinco áreas" (lines 154, 158)
- **Files**: `src/pages/index.astro` (lines 139, 154, 158, 162)
- **Acceptance**: Grid uses `lg:grid-cols-3`; stat shows "5"; text says "Cinco áreas"
- **Dependencies**: C.1

### [x] Task C.6: Add mentoria-directores mapping to ServiceCard.astro color maps
- **Description**: Add `mentoria-directores` key to `colorMap` (iconBg `bg-[#6B4C9A]`, badgeBg `bg-[#f4f0f9]`, badgeText `text-[#6B4C9A]`), `hexColors` (`#6B4C9A`), `areaLabels` (`Mentoría`), `icons` (purple icon SVG)
- **Files**: `src/components/ServiceCard.astro` (insert after lines 35, 45, 55, 71)
- **Acceptance**: `colorMap['mentoria-directores']` exists; `hexColors['mentoria-directores']` = `#6B4C9A`; `areaLabels['mentoria-directores']` = `Mentoría`; `icons['mentoria-directores']` exists
- **Dependencies**: C.1

### [x] Task C.7: Add Mentoría icon to Header.astro serviceIcons
- **Description**: Add `/servicios/mentoria-directores` key to `serviceIcons` with icon SVG and color `text-mentoria-500`
- **Files**: `src/components/Header.astro` (insert after line 22)
- **Acceptance**: `serviceIcons['/servicios/mentoria-directores']` exists with icon and color
- **Dependencies**: C.1, A.2

## Phase D: ServiceCard Cleanup (Low Risk)

### [x] Task D.1: Remove hover lift and oversized shadow
- **Description**: Remove `hover:-translate-y-2 hover:shadow-2xl` (line 79) and replace with `hover:shadow-card-hover`; remove `shadow-md` from icon container (line 102)
- **Files**: `src/components/ServiceCard.astro` (lines 79, 102)
- **Acceptance**: `grep -E "hover:-translate-y-2|hover:shadow-2xl" src/components/ServiceCard.astro` returns 0 matches; `grep "shadow-md" src/components/ServiceCard.astro` returns 0 matches
- **Dependencies**: none

### [x] Task D.2: Remove decorative corner circle
- **Description**: Remove corner circle element (lines 127-131) with `-bottom-8 -right-8 w-32 h-32 rounded-full opacity-5`
- **Files**: `src/components/ServiceCard.astro` (lines 127-131)
- **Acceptance**: `grep -E "-bottom-8 -right-8|rounded-full opacity-5" src/components/ServiceCard.astro` returns 0 matches
- **Dependencies**: none

### [x] Task D.3: Reduce icon container size
- **Description**: Change icon container from `w-14 h-14` to `w-10 h-10` (line 102); change icon SVG from `w-8 h-8` to `w-5 h-5` (lines 60-72)
- **Files**: `src/components/ServiceCard.astro` (lines 60, 63, 66, 69, 102)
- **Acceptance**: Icon container uses `w-10 h-10`; SVG icons use `w-5 h-5`
- **Dependencies**: none

## Verification Tasks

### [x] Task V.1: Build verification
- **Description**: Run `pnpm build` to ensure all 10 pages compile without errors
- **Acceptance**: Exit code 0; no TypeScript or Astro compilation errors
- **Dependencies**: All phases complete

### [x] Task V.2: Hex value regression check
- **Description**: Verify exact hex values in config and CSS; verify old approximations removed
- **Acceptance**: `grep -E "#202c4c|#d95986|#ffbb5d|#7bb6b3|#6B4C9A" tailwind.config.mjs src/styles/global.css` returns matches; `grep -E "#202F55|#C9527F|#FBB44E|#7CBDB6" tailwind.config.mjs src/styles/global.css` returns 0 matches
- **Dependencies**: Phase A complete

### [x] Task V.3: Forbidden pattern check
- **Description**: Verify generic AI patterns removed from mentoria-directores.astro and ServiceCard.astro
- **Acceptance**: `grep -E "blur-3xl|dots-pattern|animate-gradient" src/pages/servicios/mentoria-directores.astro` returns 0 matches; `grep -E "hover:-translate-y-2|hover:shadow-2xl|-bottom-8 -right-8" src/components/ServiceCard.astro` returns 0 matches
- **Dependencies**: Phase B, D complete

### [x] Task V.4: Color swap regression check
- **Description**: Verify convivencia uses `naranja-*` (not `teal-*`); verify recursos uses `teal-*` (not `naranja-*`)
- **Acceptance**: `grep "naranja-" src/pages/servicios/formacion-convivencia.astro` returns matches; `grep "teal-" src/pages/servicios/gestion-recursos.astro` returns matches
- **Dependencies**: Phase A complete

### [x] Task V.5: 5th entry safety check
- **Description**: Verify `servicios/index.astro` colorMap contains `mentoria` key before `services.ts` entry ships
- **Acceptance**: `grep "mentoria:" src/pages/servicios/index.astro` returns match
- **Dependencies**: Phase C complete

### [x] Task V.6: Visual QA (static responsive review; browser unavailable in apply environment)
- **Description**: Manual visual QA at all 10 pages @375/768/1024/1280 viewports; verify palette matches official, Mentoría uses purple, no layout break, Home highlight sits between Services and Nuestro Método
- **Acceptance**: All pages render correctly; Mentoría page uses editorial pattern; Home highlight visible; ServiceCards use subtle hover
- **Dependencies**: All phases complete

## Execution Order

**Sequential** (each phase depends on previous):
1. **Phase A** (Color Foundation) — no dependencies, config-only
2. **Phase B** (Mentoría Restyle) — depends on A (mentoria tokens)
3. **Phase C** (Index Highlight) — depends on A (mentoria tokens), can run parallel with B
4. **Phase D** (ServiceCard Cleanup) — no dependencies on other phases, but logically after C (C adds mentoria mapping, D cleans up)

**Parallel opportunities**:
- Phase B and Phase C can run in parallel (both depend only on Phase A)
- Phase D can run in parallel with Phase B and C (no dependencies)

**Recommended order**: A → B → C → D (matches design document recommendation)

## Summary

| Phase | Tasks | Focus | Est. Lines |
|-------|-------|-------|-----------|
| A | 4 | Color foundation (hex fixes + mentoria palette) | ~30 |
| B | 5 | Mentoría page restyle (editorial pattern) | ~60 |
| C | 7 | Index highlight + services grid + mappings | ~55 |
| D | 3 | ServiceCard cleanup (remove generic patterns) | ~25 |
| **Total** | **25** | | **~170** |

All tasks ship in a **single PR** (under 400-line budget).
