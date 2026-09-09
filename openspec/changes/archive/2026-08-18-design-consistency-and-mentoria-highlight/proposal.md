# Proposal: Design Consistency & Mentoría Highlight

## Intent

The Tailwind palette drifts from the official brand colors, and Mentoría borrows Pedagogía's pink instead of its own identity. The Mentoría page and ServiceCard carry generic AI patterns clashing with the editorial reference style. This change fixes the palette, assigns Mentoría a distinct purple, and removes the generic patterns.

## Scope

### In Scope
- Correct 4 hex values to official palette (`tailwind.config.mjs` + `global.css`)
- Add `mentoria` purple palette (`#6B4C9A` + shades) + CSS custom property
- Restyle `mentoria-directores.astro`: drop blobs/dots/animated gradients; editorial numbering + `border-top` separators; rosa→purple
- Add Mentoría highlight section to `index.astro` + entry in `services.ts`
- Clean `ServiceCard.astro`: remove aggressive hover lift, decorative corner circle, oversized shadowed icons

### Out of Scope
- Playfair Display / Source Sans 3 typography swap (deferred brand decision)
- Full editorial redesign of the other 4 service pages (only their color tokens shift)

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `visual-design-system`: Color Palette Binding grows 4→5 areas (add Mentoría→purple `#6B4C9A`, `mentoria-*`); add editorial constraints (no blobs/dots/animated gradients/gradient badges; monospace numbering; `border-top` separators; punctual color accents); tighten ServiceCard (no aggressive hover lift, no decorative corner circle, no oversized shadowed icons)
- `site-pages`: Site Structure adds Mentoría as 5th service page; Home gains a Mentoría highlight section between Services and Nuestro Método

## Approach

Four sequential, independently-shippable phases:

| Phase | Focus | Risk |
|-------|-------|------|
| A — Color Foundation | Fix 4 hex + purple palette + aliases | Low |
| B — Mentoría Restyle | Editorial restyle + rosa→purple | Medium |
| C — Index Highlight | Mentoría section + `services.ts` entry | Low |
| D — ServiceCard Cleanup | Remove generic hover/decorative patterns | Low |

## Affected Areas

- `tailwind.config.mjs`, `global.css` — 4 hex fixes + new `mentoria` palette + accent utilities
- `src/pages/servicios/mentoria-directores.astro` — editorial restyle, purple
- `src/pages/index.astro` — new Mentoría highlight section
- `src/components/ServiceCard.astro` — hover/decorative cleanup
- `src/data/services.ts` — add Mentoría entry
- `src/components/Header.astro` — Mentoría color mapping

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Color shift affects entire site | High | Visual QA all pages post-Phase A; deltas small |
| Mentoría missing from `services.ts` | Medium | Add entry in Phase C before referencing |

## Rollback Plan

Each phase is a separate commit and reverts independently via `git revert <sha>`. Phase A is config-only.

## Dependencies

- None external.

## Success Criteria

- [ ] All 5 service areas bind to official hex in `tailwind.config.mjs` + `global.css`
- [ ] Mentoría page uses purple `#6B4C9A`, never `rosa-*`
- [ ] No `blur-3xl`, `dots-pattern`, or `animate-gradient` on Mentoría page
- [ ] Mentoría appears in the Home highlight section and the services grid
- [ ] ServiceCard has no `hover:-translate-y-2` and no decorative corner circle
- [ ] No regression on the other 4 service pages
