# Delta for seo-and-conversion

## MODIFIED Requirements

### Requirement: Strategic CTAs

"Diagnóstico gratuito 30 min" SHALL aparecer como CTA primario en: Hero (Home), final de cada página de servicio y página de Contacto. Todos los CTAs MUST enlazar a `/contacto`. Cada página SHALL exponer su propio CTA contextual; no SHALL renderizarse un CTA global en el footer.
(Previously: requería el CTA primario en Hero, páginas de servicio, Contacto Y footer)

#### Scenario: CTA consistency

- GIVEN cualquier página del embudo principal
- WHEN un usuario busca la acción
- THEN el texto del botón CTA primario SHALL ser "Diagnóstico gratuito 30 min" o "Solicitar diagnóstico"
- AND SHALL apuntar a `/contacto`

#### Scenario: No duplicate footer CTA

- GIVEN cualquier página con su propio CTA contextual
- WHEN un usuario llega al footer
- THEN el footer SHALL NOT renderizar un bloque CTA "Diagnóstico gratuito"
- AND SHALL aparecer exactamente un CTA primario por página
