# Proposal: Visual Consistency Fixes

## Intent
Fix 13 visual inconsistencies across MR Ateducativa where broken CSS classes, swapped brand colors, generic Tailwind colors, an invalid CSS property, and a redundant footer CTA break the unified 4-color brand system agreed with the client.

## Scope

### In Scope
- Fix `hover:shadow-{liderazgo,pedagogica,convivencia,recursos}` in `index.astro` (CSS classes misused as Tailwind utilities → broken `hover:` prefix).
- Correct swapped colors: `formacion-convivencia.astro` (teal → naranja), `gestion-recursos.astro` (naranja → teal).
- Replace generic Tailwind colors (`to-blue-100`, `to-red-100`, `to-amber-100`, `to-emerald-100`) with brand colors in `casos-exito.astro` stats, `index.astro` process badges, `TestimonialCard.astro` Problem/Solution/Result.
- Fix invalid `border-opacity: 0.3` in `ServiceCard.astro` badge → colored background + colored dot.
- Remove redundant footer CTA block (`Footer.astro` lines 9-20); pages keep contextual CTAs.
- Resolve "Nuestro proceso" overlap in `index.astro` (merge into "Nuestro método" — see question round).
- Codify brand color rules in a new `visual-design-system` spec.

### Out of Scope
- Fase 4 pages (client selects later).
- New features or new pages.
- Text/image content changes.
- SEO copy or schema changes.

## Capabilities

### New Capabilities
- `visual-design-system`: 4-color brand bindings (Liderazgo=navy, Pedagógica=rosa, Convivencia=naranja, Recursos=teal), uniform-color section rules (Método/Modalidades=navy), `ServiceCard` badge style, and the rule that brand colors replace generic Tailwind colors.

### Modified Capabilities
- `seo-and-conversion`: `Strategic CTAs` requirement drops "footer" from required CTA surfaces — every route already has a page-level CTA, so the footer CTA is removed to eliminate duplicates.

## Approach
Four work units in one PR (strategy: single-pr; authored delta well under the 800-line budget): (1) critical class/color swaps; (2) generic→brand color replacement; (3) footer CTA removal; (4) "Nuestro proceso" overlap resolution.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/ServiceCard.astro` | Modified | Badge: colored bg + colored dot; remove invalid `border-opacity` |
| `src/components/TestimonialCard.astro` | Modified | Problem/Solution/Result → brand colors |
| `src/components/Footer.astro` | Modified | Remove CTA block (lines 9-20) |
| `src/pages/index.astro` | Modified | Fix hover classes, process badges, "Nuestro proceso" overlap |
| `src/pages/casos-exito.astro` | Modified | Stats gradients → brand endpoints |
| `src/pages/servicios/formacion-convivencia.astro` | Modified | Colors: teal → naranja |
| `src/pages/servicios/gestion-recursos.astro` | Modified | Colors: naranja → teal |
| `openspec/specs/visual-design-system/spec.md` | New | Brand color rules spec |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Removing footer CTA lowers bottom-of-page conversion | Low | Every page already has its own CTA; monitor Umami `cta-diagnostico` events |
| "Nuestro proceso" removal drops useful content | Med | Default: merge unique steps into "Nuestro método", don't delete; client confirms |
| A generic color reference is missed during the sweep | Med | Grep for generic color classes; use engram palette rules as a checklist |

## Rollback Plan
`git revert` the single PR. Footer CTA block and "Nuestro proceso" section restored. No data or migrations involved.

## Dependencies
- `tailwind.config.mjs` color tokens (`primary`, `rosa`, `naranja`, `teal`) must exist and be referenced consistently.

## Success Criteria
- [ ] No generic Tailwind colors (`blue-`/`red-`/`amber-`/`emerald-`) on brand surfaces in `src/`.
- [ ] Each service page uses its assigned brand color for subdimensions and CTA.
- [ ] `ServiceCard` badge renders colored bg + colored dot with no invalid CSS.
- [ ] Exactly one CTA per page (footer CTA removed).
- [ ] `visual-design-system` spec exists and all fixes conform to it.

## Proposal question round
- Q1: For the "Nuestro proceso" overlap — merge its 3 steps into "Nuestro método" (6 steps) or remove entirely? Default assumption: merge, preserving any unique steps.