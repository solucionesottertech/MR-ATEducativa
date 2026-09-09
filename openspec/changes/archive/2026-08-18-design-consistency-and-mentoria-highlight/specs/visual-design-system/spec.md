# Delta Spec: visual-design-system

## MODIFIED Requirements

### Requirement: Color Palette Binding

Cada área de servicio SHALL corresponder a exactamente un color oficial de marca, referenciado mediante tokens de Tailwind y con el valor hex exacto (sin aproximaciones).

| Área | Color | Hex | Token Tailwind |
|------|-------|-----|----------------|
| Liderazgo | navy | `#202c4c` | `primary-*` / `liderazgo-*` |
| Gestión Pedagógica | rosa | `#d95986` | `rosa-*` / `pedagogica-*` |
| Formación y Convivencia | naranja | `#ffbb5d` | `naranja-*` / `convivencia-*` |
| Gestión de Recursos | teal | `#7bb6b3` | `teal-*` / `recursos-*` |
| Mentoría | púrpura | `#6B4C9A` | `mentoria-*` |

(Previously: 4 áreas; sin fila de Mentoría y sin exigir hex exactos.)

#### Scenario: Vinculación área-color

- GIVEN una página o tarjeta de servicio de un área
- WHEN se renderizan subdimensiones, acentos o CTA
- THEN SHALL usar únicamente el color de marca asignado a esa área

#### Scenario: Colores intercambiados

- GIVEN `/servicios/formacion-convivencia` y `/servicios/gestion-recursos`
- WHEN cada página se renderiza
- THEN los elementos de convivencia SHALL usar tokens `naranja-*` (nunca `teal-*`)
- AND los elementos de recursos SHALL usar tokens `teal-*` (nunca `naranja-*`)

#### Scenario: Mentoría usa su propio púrpura

- GIVEN la página `/servicios/mentoria-directores` o su tarjeta de servicio
- WHEN se renderiza
- THEN SHALL usar tokens `mentoria-*` con hex `#6B4C9A`
- AND MUST NOT usar tokens `rosa-*`

#### Scenario: Hex exactos sin aproximaciones

- GIVEN `tailwind.config.mjs` y `global.css`
- WHEN se definen los colores de área
- THEN los hex SHALL coincidir con la tabla oficial
- AND MUST NOT persistir aproximaciones como `#202F55`, `#C9527F`, `#FBB44E` ni `#7CBDB6`

## ADDED Requirements

### Requirement: Editorial Restraints

La página de Mentoría y las tarjetas de servicio SHALL seguir el patrón editorial de referencia. Los patrones genéricos de IA (blobs `rounded-full` + `blur-3xl`, `dots-pattern`, `animate-gradient`, badges con relleno de gradiente) MUST NOT aparecer en `mentoria-directores.astro` ni en `ServiceCard.astro`.

#### Scenario: Sin patrones genéricos en Mentoría

- GIVEN `/servicios/mentoria-directores`
- WHEN se renderiza
- THEN MUST NOT haber `blur-3xl`, `dots-pattern` ni `animate-gradient`

#### Scenario: Numeración editorial con separadores

- GIVEN una lista numerada de pasos o subdimensiones en Mentoría
- WHEN se renderiza
- THEN los números SHALL usar fuente monoespaciada (`01`, `02`, `03`)
- AND los ítems SHALL separarse con `border-top`, no con tarjetas flotantes

#### Scenario: Acentos de color puntuales

- GIVEN un acento de color en la página de Mentoría
- WHEN se renderiza
- THEN el color SHALL aplicarse de forma puntual (texto, eyebrow, borde o número)
- AND no SHALL rellenar fondos de secciones completas

### Requirement: ServiceCard Presentation Constraints

El componente `ServiceCard` SHALL presentar una interacción sobria, sin patrones decorativos genéricos.

#### Scenario: Hover sutil

- GIVEN un `ServiceCard`
- WHEN se hace hover
- THEN MUST NOT aplicar `hover:-translate-y-2` ni `hover:shadow-2xl`
- AND el cambio SHALL limitarse a un token de sombra/borde sutil (ej. `shadow-card-hover`)

#### Scenario: Sin círculo decorativo

- GIVEN un `ServiceCard`
- WHEN se renderiza
- THEN MUST NOT haber círculo decorativo en esquina (`-bottom-8 -right-8 ... rounded-full`)

#### Scenario: Icono sobrio

- GIVEN un `ServiceCard`
- WHEN se renderiza
- THEN el contenedor del icono SHALL ser ≤ `w-10 h-10`
- AND MUST NOT llevar sombra (`shadow-md`) ni sombra de color
