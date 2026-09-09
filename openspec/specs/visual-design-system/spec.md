# visual-design-system Specification

## Purpose

Codifica el sistema de color de 5 áreas de servicio acordado con el cliente. Vincula cada área de servicio a un color oficial, impone colores uniformes por sección, reemplaza colores genéricos de Tailwind por tokens de marca, y restringe el estilo de badges, sombras y patrones decorativos.

## Requirements

### Requirement: Color Palette Binding

Cada área de servicio SHALL corresponder a exactamente un color oficial de marca, referenciado mediante tokens de Tailwind y con el valor hex exacto (sin aproximaciones).

| Área | Color | Hex | Token Tailwind |
|------|-------|-----|----------------|
| Liderazgo | navy | `#202c4c` | `primary-*` / `liderazgo-*` |
| Gestión Pedagógica | rosa | `#d95986` | `rosa-*` / `pedagogica-*` |
| Formación y Convivencia | naranja | `#ffbb5d` | `naranja-*` / `convivencia-*` |
| Gestión de Recursos | teal | `#7bb6b3` | `teal-*` / `recursos-*` |
| Mentoría | púrpura | `#6B4C9A` | `mentoria-*` |

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

### Requirement: Uniform Section Colors

Las secciones "Nuestro Método" y "Modalidades" SHALL usar un único color uniforme (navy/`primary-*`) en todos sus pasos, tarjetas y badges, sin importar el área de contenido.

#### Scenario: Sección método uniforme

- GIVEN la sección "Nuestro Método" de la Home
- WHEN se renderiza
- THEN todos los pasos y badges SHALL usar tokens `primary-*`
- AND ningún paso SHALL usar rosa, naranja ni teal

#### Scenario: Sección modalidades uniforme

- GIVEN la sección "Modalidades" de la Home
- WHEN se renderiza
- THEN todas las tarjetas SHALL usar tokens `primary-*`

### Requirement: Brand Colors Over Generic Colors

Las superficies de marca SHALL usar tokens de color de marca. Los colores genéricos de Tailwind (`blue-*`, `red-*`, `amber-*`, `emerald-*`, `green-*`, `rose-*`, `indigo-*`) MUST NOT aparecer en superficies de marca (stats, badges, tarjetas Problema/Solución/Resultado, acentos de sección).

#### Scenario: Sin colores genéricos en stats

- GIVEN los bloques de stats de `/casos-exito`
- WHEN se renderizan
- THEN los gradientes SHALL terminar en tokens de marca, no en `to-blue-100`, `to-red-100`, `to-amber-100` ni `to-emerald-100`

#### Scenario: Sin colores genéricos en testimonios

- GIVEN un bloque Problema/Solución/Resultado de `TestimonialCard`
- WHEN se renderiza
- THEN SHALL usar tokens de marca, no `red-*`, `blue-*` ni `emerald-*`

### Requirement: ServiceCard Badge Styling

El badge de área del `ServiceCard` SHALL renderizar un fondo de color con un indicador de punto de color usando el color de marca de la tarjeta. Propiedades CSS inválidas (ej. `border-opacity: 0.3`) MUST NOT estar presentes.

#### Scenario: Badge renderiza correctamente

- GIVEN un `ServiceCard` de cualquier área
- WHEN se renderiza
- THEN el badge SHALL mostrar fondo de color y punto de color del área
- AND no SHALL quedar ningún estilo inline `border-opacity`

### Requirement: Shadow Utility Constraints

Las utilidades de sombra SHALL referenciar únicamente tokens `boxShadow` definidos (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-card`, `shadow-card-hover`). Clases como `hover:shadow-liderazgo` o `shadow-{color}` MUST NOT usarse, porque los nombres de color no son tokens de sombra.

#### Scenario: Sombras hover válidas

- GIVEN cualquier tarjeta con sombra en hover
- WHEN se hace hover
- THEN la sombra SHALL provenir de un token de sombra definido
- AND no SHALL quedar ninguna clase `hover:shadow-{área}` en el markup

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
