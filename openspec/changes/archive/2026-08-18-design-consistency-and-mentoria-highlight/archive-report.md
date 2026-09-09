# Archive Report: design-consistency-and-mentoria-highlight

**Archived**: 2026-08-18
**Mode**: hybrid (Engram + OpenSpec filesystem)
**Status**: Intentional standard archive — PASS_WITH_WARNINGS, no critical findings, no blockers.

## Executive Summary

The Tailwind palette drifted from the official brand colors, and Mentoría borrowed Pedagogía's pink instead of its own identity; the Mentoría page and ServiceCard carried generic AI patterns clashing with the editorial reference style. This change fixed the 4 drifted hex values, added a dedicated `mentoria` purple identity (`#6B4C9A`, Tailwind ramp 50–700 + CSS var + accent utilities), restyled `mentoria-directores.astro` with an editorial pattern (monospace numbering, `border-top` separators, punctual purple accents, no blobs/dots/animated gradients), removed generic patterns from `ServiceCard`, and added Mentoría as the fifth service with a Home highlight section. Implemented in four sequential phases (A→D), each a separate revertible commit. Verified: build exit 0 with 17 static pages, 5/5 requirements and 15/15 scenarios compliant.

## Lineage (Engram Observation IDs Read)

| Artifact | Engram ID | Topic Key |
|----------|-----------|-----------|
| explore | #485 | `sdd/design-consistency-and-mentoria-highlight/explore` |
| proposal | #486 | `sdd/design-consistency-and-mentoria-highlight/proposal` |
| spec | #487 | `sdd/design-consistency-and-mentoria-highlight/spec` |
| design | #488 | `sdd/design-consistency-and-mentoria-highlight/design` |
| tasks | #489 | `sdd/design-consistency-and-mentoria-highlight/tasks` |
| apply-progress | #490 | `sdd/design-consistency-and-mentoria-highlight/apply-progress` |
| verify-report | #491 | `sdd/design-consistency-and-mentoria-highlight/verify-report` |
| archive-report | this report | `sdd/design-consistency-and-mentoria-highlight/archive-report` |

Filesystem artifacts read: `proposal.md`, `specs/{visual-design-system,site-pages}/spec.md`, `design.md`, `tasks.md`, `verify-report.md` (all from the change folder, now archived).

## Implementation Status

- Phase A (Color Foundation): ✅ Complete — 4 principal hex corrected in `tailwind.config.mjs` + `global.css` (5 CSS vars); `mentoria` ramp 50–700 added + `--color-mentoria` + `.accent-mentoria`/`.bg-mentoria-subtle`/`.border-mentoria` utilities
- Phase B (Mentoría Restyle): ✅ Complete — editorial restyle (6 mono-numbered step rows with `border-top` separators, punctual purple), `rosa-*`→`mentoria-*` (~40 refs), naranja/teal leaks fixed, CTA gradient endpoint `to-mentoria-600`, forbidden patterns removed
- Phase C (Index Highlight): ✅ Complete — 5th `serviceAreas` entry, `colorMap.mentoria`, "Cinco" copy, `lg:grid-cols-3` grid, Home highlight between Services and Nuestro Método, ServiceCard/Header mappings, Footer marker
- Phase D (ServiceCard Cleanup): ✅ Complete — no `hover:-translate-y-2`/`hover:shadow-2xl`, no decorative corner circle, icon `w-10 h-10` + svg `w-5 h-5`, no `shadow-md`

## Verification Status (final state, per verify-report #491)

- Build: ✅ PASS — `pnpm build` exit 0, 17 static pages
- Requirements: 5/5 ✅
- Scenarios: 15/15 ✅
- Blockers: 0
- CRITICAL findings: 0
- Verdict: PASS_WITH_WARNINGS
- Validator: `gentle-ai sdd-verify-validate` admitted the report (valid:true, verdict:pass_with_warnings)

## Task Completion

25/25 tasks complete and marked `[x]` in `tasks.md` (verify-report: tasks incomplete = 0). The single `[ ]` line in the Apply Status section of `tasks.md` is a documented limitation note (browser-based visual inspection unavailable in the apply environment), not a pending implementation task; it corresponds to the verify-report warning and is carried below as a known limitation. No archive-time reconciliation was required.

## Files Modified

- `tailwind.config.mjs` — Fixed 4 hex values (base + area palettes) + added `mentoria` palette ramp
- `src/styles/global.css` — Fixed 5 CSS custom properties + added `--color-mentoria` and mentoria utilities
- `src/data/services.ts` — Added Mentoría as 5th service entry (single source of truth; legacy `services` auto-derives)
- `src/data/site.ts` — Updated navigation with Mentoría
- `src/pages/index.astro` — Added Mentoría highlight section (editorial 2-col, between Services and Nuestro Método); grid → `lg:grid-cols-3`, stat → "5", "Cinco áreas" copy
- `src/pages/servicios/index.astro` — Added `mentoria` to colorMap; "Cuatro" → "Cinco" copy
- `src/pages/servicios/mentoria-directores.astro` — Full editorial restyle with purple tokens
- `src/components/ServiceCard.astro` — Phase C mentoria mapping + Phase D generic-pattern cleanup
- `src/components/Header.astro` — Added Mentoría icon mapping
- `src/components/Footer.astro` — Updated Mentoría color marker

## Spec Sync (source of truth)

- `openspec/specs/visual-design-system/spec.md` — Merged: **MOD-001** Color Palette Binding replaced (4→5 areas, exact-hex binding, 2 new scenarios: Mentoría purple, exact hexes); **NEW-001** Editorial Restraints appended; **NEW-002** ServiceCard Presentation Constraints appended. 4 pre-existing requirements preserved (Uniform Section Colors, Brand Colors Over Generic Colors, ServiceCard Badge Styling, Shadow Utility Constraints). Purpose line updated 4→5 áreas for coherence.
- `openspec/specs/site-pages/spec.md` — Merged: **MOD-001** Site Structure replaced (9→10 pages, Mentoría row, new "Mentoría as the fifth service" scenario); **NEW-001** Home Mentoría Highlight Section appended. 3 pre-existing requirements preserved (Placeholder Content, Accessibility, Performance). Intro updated 9→10 páginas for coherence.

## Known Limitations

- Browser-based visual QA at 375px / 768px / 1024px / 1280px pending (manual, post-deploy). The apply environment had no browser automation; static source inspection, build success (exit 0), and grep assertions covered all spec scenarios. Touch-target sizing (44×44px) is enforced via `global.css` `.btn` rules but was not visually confirmed at 375px.

## Rollback Plan

Each phase is a separate commit; revert individually via `git revert <sha>`:
- Phase A: `git revert <sha-A>` (config-only: `tailwind.config.mjs` + `src/styles/global.css`)
- Phase B: `git revert <sha-B>` (`src/pages/servicios/mentoria-directores.astro`)
- Phase C: `git revert <sha-C>` (`services.ts`, `index.astro`, `servicios/index.astro`, `ServiceCard.astro`, `Header.astro`, `Footer.astro`, `site.ts`)
- Phase D: `git revert <sha-D>` (`ServiceCard.astro` cleanup)

Note: the project working directory is not git-tracked at this time; SHAs to be resolved from the delivery PR history when available.

## Next Steps

- Manual visual QA at 375px, 768px, 1024px, 1440px
- Consider full editorial redesign (Playfair Display typography) as a separate change
- Optional follow-up (suggestion from verify-report): editorial pass on `servicios/index.astro` hero/CTA if the services index should match the Mentoría reference style; standardize darker derived badge text shades as tokens if reused

## Contradictions

None. All sources agree on final state: build exit 0 / 17 pages, 5/5 requirements, 15/15 scenarios, PASS_WITH_WARNINGS with browser QA as the sole warning.
