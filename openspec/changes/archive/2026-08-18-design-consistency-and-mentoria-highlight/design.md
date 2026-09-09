# Design: Design Consistency & Mentoría Highlight

## Technical Approach

Four sequential commits, each independently revertible via `git revert`. Phase A is config-only (Tailwind tokens + CSS vars). Phase B rewrites one page. Phase C adds a data entry + a new Home section + touch-ups to ServiceCard, Header, and the services index. Phase D strips generic patterns from ServiceCard. **No phase touches the other 4 service pages except Phase A's token-value drift fix** — their `blur-3xl`/`dots-pattern`/`animate-gradient` heroes stay (explicitly out of scope).

Codebase fact: the area→color-family mapping is already correct (`convivencia`→naranja, `recursos`→teal). The drift is **hex values only**. The spec's "Colores intercambiados" scenario is a regression guard, not a fix.

## Architecture Decisions

### Decision: Purple palette storage
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Tailwind tokens only | Matches markup; no runtime var | Rejected alone |
| CSS custom props only | Good for accent utils; weak in Astro classes | Rejected alone |
| **Both (dual-layer)** | Mirrors existing `rosa-*` + `--color-pedagogica` + `.accent-pedagogica` | **Chosen** |

Rationale: every existing area uses both a Tailwind ramp and a CSS var + accent utilities. Mentoría must mirror this or `.accent-mentoria` won't exist.

### Decision: Home highlight section layout
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Full-width purple banner | Fills bg — violates "punctual accent" | Rejected |
| Card grid | Generic, not editorial | Rejected |
| **Editorial 2-col (text + pulled quote/points)** | Asymmetric, punctual purple, matches reference | **Chosen** |

### Decision: Mentoría in services.ts
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep separate, hardcode in index | Grid won't include it; spec requires grid entry | Rejected |
| **Add 5th `serviceAreas` entry** | Single source of truth; auto-flows to Home grid, servicios index, legacy `services` | **Chosen** |

### Decision: Services grid with 5 cards
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep `lg:grid-cols-4` (4+1) | Orphan card on row 2 | Rejected |
| **`lg:grid-cols-3` (3+2)** | Balanced editorial; applied atomically with entry add | **Chosen** |

### Decision: Phase C also touches ServiceCard color mapping
Phase C adds the 5th service, which renders a 5th ServiceCard. Without a `mentoria-directores` mapping it falls back to navy. So the **color/hex/label/icon mapping** for Mentoría lands in Phase C (color correctness); the **generic-pattern removal** (hover lift, corner circle, oversized icon) lands in Phase D. Disjoint concerns, same file, clean phase intent.

## Data Flow

    services.ts (5) ──► index.astro grid (ServiceCard ×5)
                   └──► servicios/index.astro (serviceAreas ×5)
    tailwind.config.mjs ──► mentoria-* tokens ──► purple markup everywhere
    global.css ──► --color-mentoria + .accent-mentoria ──► Mentoría page + Home highlight

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `tailwind.config.mjs` | Modify | Fix 4 principal hex (both base+area palettes: `primary/liderazgo .700`→`#202c4c`, `rosa/pedagogica .500`→`#d95986`, `naranja/convivencia .500`→`#ffbb5d`, `teal/recursos .500`→`#7bb6b3`); add `mentoria` ramp 50–700 |
| `src/styles/global.css` | Modify | Fix `--color-primary/--color-liderazgo/--color-pedagogica/--color-convivencia/--color-recursos`; add `--color-mentoria: #6B4C9A` + `.accent-mentoria`/`.bg-mentoria-subtle`/`.border-mentoria`. (Existing `.text-gradient-*`/`.badge-*` already use correct hex — untouched.) |
| `src/pages/servicios/mentoria-directores.astro` | Modify | Remove `blur-3xl`+`dots-pattern` (hero L22-24, CTA L565-566); `rosa-*`→`mentoria-*` (~40 refs); 6 step cards (L157-378) → `border-top` + `font-mono` `01`–`06`; fix `naranja`/`teal` leaks (Modalidades eyebrow, Redes eyebrow + 3 role tiles); CTA `to-rosa-600`→`to-mentoria-600` |
| `src/pages/index.astro` | Modify | Insert Mentoría highlight between Services (ends L170) and Nuestro Método (starts L172); grid `lg:grid-cols-4`→`lg:grid-cols-3`; stat "4"→"5" (L139); "Cuatro"→"Cinco" (L154, L158) |
| `src/pages/servicios/index.astro` | Modify | **Add `mentoria` to `colorMap`** (prevents undefined-color crash from 5th `serviceAreas` entry); "Cuatro"→"Cinco" (L77, L83) |
| `src/components/ServiceCard.astro` | Modify | Phase C: add `mentoria-directores` to `colorMap`/`hexColors`/`areaLabels`/`icons` (`#6B4C9A`). Phase D: remove `hover:-translate-y-2 hover:shadow-2xl` (L79)→`hover:shadow-card-hover`; remove corner circle (L127-131); icon `w-14 h-14 shadow-md` (L102)→`w-10 h-10` no shadow, svg `w-8`→`w-5` |
| `src/data/services.ts` | Modify | Add 5th `serviceAreas` entry: slug `mentoria-directores`, name `Mentoría para Directores`, color `mentoria`, tagline/description/subdimensions. `services` legacy array auto-derives. |
| `src/components/Header.astro` | Modify | Add `/servicios/mentoria-directores` to `serviceIcons` with `text-mentoria-500` + icon (nav already lists it via `site.ts`) |

## Interfaces / Contracts

New `mentoria` Tailwind ramp:
```js
mentoria: {
  50:'#F4F0F9', 100:'#E9E1F3', 200:'#D4C5E8', 300:'#BFAADD',
  400:'#9A7BC0', 500:'#6B4C9A', 600:'#5C4089', 700:'#4D3478',
}
```
Editorial step row replacing floating card:
```html
<div class="border-t border-neutral-200 pt-6">
  <span class="font-mono text-mentoria-500 text-sm tracking-wider">01</span>
  <h3 class="heading-h3 mt-2 text-neutral-900">...</h3>
</div>
```
Home highlight (inserted section, punctual purple):
```html
<section class="section-padding bg-white">
  <div class="container-page grid md:grid-cols-2 gap-12 items-center">
    <div class="border-t-2 border-mentoria-500 pt-6">
      <p class="eyebrow text-mentoria-600">Mentoría para Directores</p>
      <h2 class="heading-h2 ...">...</h2>
      <p class="body-lg ...">...</p>
      <a href="/servicios/mentoria-directores" class="... border-mentoria-600 text-mentoria-700 ...">Conocer el programa</a>
    </div>
    <div><!-- pulled quote or 3 key points with border-top + mono 01/02/03 --></div>
  </div>
</section>
```

## Testing Strategy

No test framework installed (only `astro build`). Strategy = build-time + grep assertions + manual QA.

| Layer | What | Approach |
|-------|------|----------|
| Build | All 10 pages compile | `pnpm build` exits 0 — catches undefined-class crash from 5th `serviceAreas` entry hitting `servicios/index.astro` colorMap |
| Assertion | Forbidden patterns gone | grep: `mentoria-directores.astro` has no `blur-3xl\|dots-pattern\|animate-gradient\|rosa-`; `ServiceCard.astro` has no `hover:-translate-y-2\|hover:shadow-2xl\|-bottom-8 -right-8` |
| Assertion | Exact hex | grep: config+css contain `#202c4c`, `#d95986`, `#ffbb5d`, `#7bb6b3`, `#6B4C9A`; do NOT contain `#202F55`, `#C9527F`, `#FBB44E`, `#7CBDB6` |
| Regression | No color swap | grep: `formacion-convivencia.astro` uses `naranja-*` (not `teal-*`); `gestion-recursos.astro` uses `teal-*` (not `naranja-*`) |
| Regression | 5th entry safe | `servicios/index.astro` colorMap contains `mentoria` key before `services.ts` entry ships |
| Visual QA | All pages @375/768/1024/1280 | Manual: palette matches official, Mentoría purple, no layout break, Home highlight sits between Services and Nuestro Método |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No data migration. Each phase = one commit, revertible via `git revert <sha>`. Phase A config-only (lowest risk). Phase C is the riskiest (5 files) — visual QA of Home + servicios index required after it. Recommended order: A → B → C → D.

## Open Questions

- [ ] Mentoría "Redes" section: 3 role tiles as distinct mentoria shades (500/600/700) or neutral bg + purple border? (Recommendation: mentoria shades.)
- [ ] Regenerate full tint ramps around corrected principal hex, or fix only the principal shade? (Recommendation: principal only — spec forbids exactly the 4 listed approximations.)
