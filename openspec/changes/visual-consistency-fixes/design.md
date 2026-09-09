# Design: Visual Consistency Fixes

## Technical Approach

Presentation-layer-only fixes across 8 Astro/Tailwind files. Ordering dissolves the WU2/WU4 tension: **WU4 first** (delete "Nuestro proceso"), so WU2 never edits the badges/shadows that deletion removes; then WU1, WU2 (surviving surfaces), WU3. Conformance: new `visual-design-system` spec + `seo-and-conversion` delta.

## Architecture Decisions

### Decision: Apply WU4 before WU2

| Option | Tradeoff | Decision |
|---|---|---|
| WU2 then WU4 | Fix then delete "Nuestro proceso" — wasted edits, orphan-ref risk | Rejected |
| WU4 then WU2 | Delete first; WU2 touches only surviving surfaces | **Chosen** |

**Rationale**: "Nuestro proceso" (L456-528) is the only place the WU2 generic badges and broken `hover:shadow-{area}` co-occur — deletion removes them; WU2 then fixes the same classes in the surviving index stats and casos-exito.

### Decision: "Nuestro proceso" — full removal, no prose merge

| Option | Tradeoff | Decision |
|---|---|---|
| Fold phrasing into "Nuestro método" | Breaches proposal OOS "Text/image content changes"; marginal value | Rejected |
| Remove the whole section | Loses 3 cards, all redundant | **Chosen** |

**Rationale**: The 3 steps are a strict subset of the 6 método steps (Diagnosticamos / Diseñamos / Implementamos at L225/239/254), the "Acompañamiento Institucional" modalidad card (L332), and the standalone "Diagnóstico gratuito 30 min" CTA (L354-385); the only unique claim "30 minutos" already lives at L373.

### Decision: `hover:shadow-*` → `hover:shadow-card-hover`; delete dead CSS

| Option | Tradeoff | Decision |
|---|---|---|
| (a) add `liderazgo` etc. to `boxShadow` | Violates "Shadow Utility Constraints" spec (only `sm/md/lg/card/card-hover`) | Rejected |
| (b) replace with defined token `hover:shadow-card-hover` | Loses per-area tint; spec-compliant, keeps hover | **Chosen** |
| (c) drop `hover:`, plain `.shadow-{area}` | Always-on shadow, no hover feedback | Rejected |

**Rationale**: `.shadow-{area}` are plain CSS in `global.css` L689-692, not Tailwind utilities — `hover:shadow-{area}` compiles to nothing. After (b) they are unreferenced → delete L688-692.

### Decision: TestimonialCard P/S/R — one fixed brand mapping

Problem→`primary` (navy), Solution→`rosa`, Result→`teal`, uniform across testimonials; per-testimonial `accent` still colors border/quote/avatar. Removes all `red/blue/indigo/emerald/green/rose-*` classes.

### Decision: ServiceCard badge — colored dot, no `border-opacity`

Drop `border`+`badgeBorder`+ invalid `style="border-opacity: 0.3;"` (utility name, not CSS). Keep `badgeBg`+`badgeText`; prepend dot `<span class="w-1.5 h-1.5 rounded-full {colors.iconBg}"></span>`.

### Decision: Footer CTA — surgical delete + drop unused import

Delete Footer.astro L9-20 (`<!-- CTA Section -->` block) and the now-unused `import CTAButton from './CTAButton.astro';` (L3). Grid + copyright are self-contained.

### Decision: WU1 sweeps the whole page, not just subdimensions

On each affected service page, swap EVERY non-brand-color token to the page's brand token — subdimension card border/bg/number badge, hover tint, CTA gradient, AND hero blur accents (two shades 300/400 of the page brand for variety).

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/index.astro` | Modify | WU4: delete "Nuestro proceso" L456-528. WU2: stats `hover:shadow-{area}`→`hover:shadow-card-hover` (L125/129/133/137). |
| `src/pages/casos-exito.astro` | Modify | WU2: stats `to-{blue,red,amber,emerald}-100`→`to-{liderazgo,pedagogica,convivencia,recursos}-100` (L108-120). |
| `src/components/TestimonialCard.astro` | Modify | WU2: P/S/R→`primary`/`rosa`/`teal` family tokens (L57-93). |
| `src/components/ServiceCard.astro` | Modify | WU2: badge drop `border`+`border-opacity`, add dot (L96-103). |
| `src/components/Footer.astro` | Modify | WU3: delete CTA block L9-20 + unused `CTAButton` import (L3). |
| `src/pages/servicios/formacion-convivencia.astro` | Modify | WU1: subdim+CTA `teal-*`→`naranja-*`; hero blurs → two `naranja` shades. |
| `src/pages/servicios/gestion-recursos.astro` | Modify | WU1: subdim+CTA `naranja-*`→`teal-*`; hero blurs → two `teal` shades. |
| `src/styles/global.css` | Modify | WU2: delete dead `.shadow-{liderazgo,pedagogica,convivencia,recursos}` (L688-692). |
| `openspec/changes/visual-consistency-fixes/design.md` | Create | This document. |

## Interfaces / Contracts

No new interfaces. Ratifies spec-phase `visual-design-system` and the `seo-and-conversion` delta. `tailwind.config.mjs` unchanged — all referenced brand tokens already exist; `ServiceCard.colorMap` signature unchanged (dot reuses existing `iconBg` key).

## Testing Strategy

Project config: `testing.available: false` — no test runner.

| Layer | What | Approach |
|-------|------|----------|
| Build | compiles cleanly | `pnpm build`; assert zero errors. |
| Static | no banned generic colors / broken area shadows / `border-opacity` in ServiceCard / `CTAButton` in Footer / "Nuestro proceso" in index | `rg` each pattern in `src`; all return empty. |
| Static | service pages area-correct | Convivencia has no `teal-`; Recursos has no `naranja-` (subdim+CTA+blur scope). |
| Visual | brand rendering at 375/768/1024px | manual `pnpm dev` check on 4 service pages, casos-exito stats, testimonials, ServiceCard badge. |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS, executable-file classification, or process-integration boundary. Pure static markup edits.

## Migration / Rollout

No migration. Rollback: `git revert` the single PR restores the footer CTA and "Nuestro proceso". No data.

## Open Questions

- [ ] casos-exito L143 `via-purple-600` is generic but `purple` is NOT in the spec's explicit banned list (`blue/red/amber/emerald/green/rose/indigo`). Default: leave as-is; flag for client confirmation to extend the sweep to `purple`.
- [ ] `ServiceCard.colorMap` uses raw hex (`bg-[#202c4c]`) vs tokens (`bg-liderazgo-700`). Both brand-compliant; hex→token polish deferred unless requested.