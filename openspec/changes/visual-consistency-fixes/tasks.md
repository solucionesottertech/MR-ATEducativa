# Tasks: Visual Consistency Fixes

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~140 (80 deletions + 60 modifications) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| WU4 | Delete redundant "Nuestro proceso" section | PR 1 (single) | `pnpm build` | N/A — static markup | Remove entire `<section>` L456-528 in index.astro |
| WU1 | Fix swapped brand colors on 2 service pages | PR 1 (single) | `rg 'teal-' src/pages/servicios/formacion-convivencia.astro` (expect empty) | N/A — static markup | Revert 2 service page files |
| WU2 | Replace generic Tailwind colors with brand tokens | PR 1 (single) | `rg 'to-(blue\|red\|amber\|emerald)-100' src/` (expect empty) | N/A — static markup | Revert 5 files (casos-exito, TestimonialCard, ServiceCard, index stats, global.css) |
| WU3 | Remove redundant footer CTA block | PR 1 (single) | `rg 'CTAButton' src/components/Footer.astro` (expect empty) | N/A — static markup | Revert Footer.astro |

## Phase 1: Cleanup — Delete Redundant Section (WU4)

- [x] 1.1 **Delete "Nuestro proceso" section** in `src/pages/index.astro` L456-528. Remove the entire `<section class="section-padding bg-section-vibrant ...">` block (73 lines). Verify no other code references it.
- [x] 1.2 **Verify build** — run `pnpm build` and confirm zero errors. Run `rg 'Nuestro proceso' src/` to confirm removal.

## Phase 2: Fix Swapped Brand Colors (WU1)

- [x] 2.1 **formacion-convivencia.astro** — swap ALL `teal-*` → `naranja-*` (7 occurrences: L17 hero blur, L68 border, L70 bg, L71 text, L77 hover bg, L78 icon text, L94 CTA gradient). Hero blur L17: `bg-teal-400/20` → `bg-naranja-300/20`. L18 `bg-rosa-400/20` stays (secondary accent, brand-compliant).
- [x] 2.2 **gestion-recursos.astro** — swap ALL `naranja-*` → `teal-*` (7 occurrences: L17 hero blur, L69 border, L71 bg, L72 text, L78 hover bg, L79 icon text, L95 CTA gradient). Hero blur L17: `bg-naranja-400/20` → `bg-teal-300/20`. L18 `bg-teal-400/20` stays (matches page brand).
- [x] 2.3 **Verify** — `rg 'teal-' src/pages/servicios/formacion-convivencia.astro` returns empty. `rg 'naranja-' src/pages/servicios/gestion-recursos.astro` returns empty.

## Phase 3: Generic → Brand Color Replacement (WU2)

- [x] 3.1 **casos-exito.astro stats** (L108-120) — replace gradient endpoints: `to-blue-100` → `to-primary-100`, `to-red-100` → `to-rosa-100`, `to-amber-100` → `to-naranja-100`, `to-emerald-100` → `to-teal-100`.
- [x] 3.2 **TestimonialCard.astro P/S/R blocks** (L57-93) — Problem: `red-*`/`rose-*` → `primary-*` family (bg-gradient-to-r from-primary-50 to-primary-50, border-primary-100, bg-primary-100, text-primary-600/700/800). Solution: `blue-*`/`indigo-*` → `rosa-*` family. Result: `emerald-*`/`green-*` → `teal-*` family.
- [x] 3.3 **ServiceCard.astro badge** (L96-103) — drop `border` class and `colors.badgeBorder` from class:list. Remove `style="border-opacity: 0.3;"`. Prepend colored dot: `<span class="w-1.5 h-1.5 rounded-full {colors.iconBg}"></span>` before the label text.
- [x] 3.4 **index.astro stats** (L125/129/133/137) — replace `hover:shadow-liderazgo` → `hover:shadow-card-hover`, `hover:shadow-pedagogica` → `hover:shadow-card-hover`, `hover:shadow-convivencia` → `hover:shadow-card-hover`, `hover:shadow-recursos` → `hover:shadow-card-hover`.
- [x] 3.5 **global.css** (L688-692) — delete the dead `.shadow-liderazgo`, `.shadow-pedagogica`, `.shadow-convivencia`, `.shadow-recursos` CSS rules and their comment line.
- [x] 3.6 **Verify** — `rg 'to-(blue|red|amber|emerald)-100' src/` returns empty. `rg 'border-opacity' src/components/ServiceCard.astro` returns empty. `rg 'shadow-liderazgo\|shadow-pedagogica\|shadow-convivencia\|shadow-recursos' src/` returns empty.

## Phase 4: Footer CTA Removal (WU3)

- [x] 4.1 **Footer.astro** — delete CTA block L9-20 (`<!-- CTA Section -->` through closing `</div>`). Delete unused import `import CTAButton from './CTAButton.astro';` at L3.
- [x] 4.2 **Verify** — `rg 'CTAButton' src/components/Footer.astro` returns empty. `rg 'CTA Section' src/components/Footer.astro` returns empty. Run `pnpm build` for final clean compile.

## Phase 5: Final Verification

- [x] 5.1 **Build gate** — `pnpm build` completes with zero errors.
- [x] 5.2 **Static assertions** — run all 5 `rg` patterns from tasks 2.3, 3.6, 4.2; all return empty.
- [x] 5.3 **Manual responsive check** — `pnpm dev`, visually verify at 375/768/1024px: service pages (convivencia=naranja, recursos=teal), casos-exito stats gradients, testimonial P/S/R colors, ServiceCard badge dot, index stats hover shadow, footer without CTA.
