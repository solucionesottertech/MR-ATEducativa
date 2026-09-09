# Apply Progress: Design Consistency & Mentoría Highlight

## Status

- Mode: Standard (`strict_tdd=false`; testing unavailable)
- Delivery: single-pr; forecast Low (~170 changed lines)
- Apply state: implementation complete; verification complete with browser-QA limitation
- Tasks completed: 25/25 (including the requested Footer and five-section simplification acceptance criteria)

## Completed Tasks

### Phase A — Color Foundation

- [x] A.1 Fixed the eight principal Tailwind shade bindings to the official navy, rosa, naranja, and teal hex values.
- [x] A.2 Added the `mentoria` Tailwind ramp from 50 through 700 with `#6B4C9A` as 500.
- [x] A.3 Fixed the five brand/service CSS custom properties in `global.css`.
- [x] A.4 Added `--color-mentoria`, `.accent-mentoria`, `.bg-mentoria-subtle`, and `.border-mentoria`.

### Phase B — Mentoría Restyle

- [x] B.1 Removed Mentoría hero and CTA blur blobs and dot-pattern decorations.
- [x] B.2 Replaced all `rosa-*` references on the Mentoría page with `mentoria-*` references.
- [x] B.3 Converted six process cards to `font-mono` editorial numbers `01`–`06` with `border-t border-neutral-200 pt-6` separators.
- [x] B.4 Replaced Modalidades and Redes color leaks with Mentoría tokens, including distinct 500/600/700 role accents, and updated the final CTA gradient endpoint to `to-mentoria-600`.
- [x] B.5 Simplified the page into five semantic sections by grouping related content while preserving the service information.

### Phase C — Index Highlight and Service Integration

- [x] C.1 Added the fifth `serviceAreas` entry for `mentoria-directores`.
- [x] C.2 Added the `mentoria` color mapping to `servicios/index.astro`.
- [x] C.3 Updated service-count copy from four to five areas and added the editorial two-column Mentoría highlight between Services and Nuestro Método on Home.
- [x] C.4 Updated the Home statistics/services grid and added Mentoría color, label, hex, and icon mappings to `ServiceCard.astro`.
- [x] C.5 Added the Mentoría icon mapping to `Header.astro`.
- [x] C.6 Updated the Footer Mentoría marker to `bg-mentoria-500`.
- [x] C.7 Verified the Home, services grid, dropdown, Footer, and Mentoría navigation links.

### Phase D — ServiceCard Cleanup

- [x] D.1 Replaced aggressive hover lift/shadow with `hover:border-neutral-300 hover:shadow-card-hover` and removed icon shadow.
- [x] D.2 Removed the decorative corner circle.
- [x] D.3 Reduced icon containers to `w-10 h-10` and SVG icons to `w-5 h-5`.

## Verification

- [x] V.1 `pnpm build` — passed; 17 static pages generated, exit code 0.
- [x] V.2 Forbidden-pattern assertion — passed; Mentoría page has no `blur-3xl`, `dots-pattern`, or `animate-gradient`.
- [x] V.3 Official hex assertion — passed; all required values present and stale approximations absent.
- [x] V.4 Color-binding regression — passed; Convivencia retains `naranja-*` and Recursos retains `teal-*` with no cross-token matches.
- [x] V.5 Static safety assertion — passed; `servicios/index.astro` contains `mentoria` mapping before the fifth data entry is rendered.
- [x] V.6 Static responsive review — passed by source/build inspection; browser visual inspection is unavailable in this environment.

## Work Unit Evidence

| Work unit | Focused test command and exact result | Runtime harness command/scenario and exact result | Rollback boundary |
|---|---|---|---|
| A — Color Foundation | `pnpm build` and official/stale hex assertions — build exit 0; required values present; stale values absent | N/A — configuration/token-only boundary; no runtime behavior introduced | Revert `tailwind.config.mjs` and `src/styles/global.css` token changes |
| B — Mentoría Restyle | `rg -n 'blur-3xl|dots-pattern|animate-gradient|rosa-' src/pages/servicios/mentoria-directores.astro` — no matches; build exit 0 | `pnpm preview --host 127.0.0.1` + `curl` for `/servicios/mentoria-directores` — HTTP 200 | Revert `src/pages/servicios/mentoria-directores.astro` only |
| C — Index Highlight | `pnpm build` + route/data token assertions — exit 0; Home, services grid, Header, Footer, and data mappings present | Preview + `curl` for `/` and `/servicios` — HTTP 200 for both; generated route files present | Revert `src/data/services.ts`, `src/pages/index.astro`, `src/pages/servicios/index.astro`, `src/components/Header.astro`, and `src/components/Footer.astro` |
| D — ServiceCard Cleanup | `rg -n 'hover:-translate-y-2|hover:shadow-2xl|shadow-md|-bottom-8 -right-8|rounded-full opacity-5' src/components/ServiceCard.astro` — no matches; build exit 0 | Preview + generated Home/services route smoke check — HTTP 200; five service entries render | Revert `src/components/ServiceCard.astro` only |

## Files Changed

- `tailwind.config.mjs`
- `src/styles/global.css`
- `src/pages/servicios/mentoria-directores.astro`
- `src/data/services.ts`
- `src/data/site.ts`
- `src/pages/servicios/index.astro`
- `src/pages/index.astro`
- `src/components/ServiceCard.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `openspec/changes/design-consistency-and-mentoria-highlight/tasks.md`

## Notes

- The project has no test runner and no browser automation available; verification uses the documented build, grep, static route, preview, and source-level responsive checks.
- The official mapping remains `convivencia → naranja` and `recursos → teal`; no swap was introduced.
