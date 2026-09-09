# Guía de Estructura de Encabezados para SEO

Esta guía documenta las mejores prácticas de estructura de encabezados HTML implementadas en MR Ateducativa. Úsala como referencia para todos los proyectos futuros.

## 📋 Reglas Fundamentales

### 1. Un solo H1 por página
- **Regla**: Cada página debe tener exactamente un `<h1>`
- **Por qué**: El H1 es la señal principal del tema de la página para los motores de búsqueda
- **Ejemplo correcto**:
  ```html
  <h1>Asesoría Educativa en Chile | MR Ateducativa</h1>
  ```
- **Error común**: Múltiples H1 en una página o H1 ausente

### 2. Jerarquía lógica H1 → H2 → H3 → H4 → H5 → H6
- **Regla**: Nunca saltes niveles de encabezado
- **Correcto**: H1 → H2 → H3
- **Incorrecto**: H1 → H3 (salta H2) o H2 → H4 (salta H3)
- **Por qué**: Los lectores de pantalla y los motores de búsqueda usan esta jerarquía para entender la estructura del contenido

### 3. H1 conciso y con palabras clave
- **Regla**: Máximo 8-10 palabras, debe incluir el tema principal
- **Ejemplo bueno**: "Soluciones Educativas desde la Realidad de tu Comunidad"
- **Ejemplo malo**: "Construimos soluciones educativas integrales y personalizadas desde la realidad específica de cada comunidad educativa"
- **Por qué**: Los H1 largos diluyen la señal SEO y son difíciles de leer

### 4. Coincidencia semántica entre tag HTML y clase CSS
- **Regla**: El nivel del tag HTML debe coincidir con la clase de estilo visual
- **Correcto**: `<h2 class="heading-h2">` o `<h3 class="heading-h3">`
- **Incorrecto**: `<h3 class="heading-h2">` (tag dice H3, visualmente parece H2)
- **Por qué**: Los motores de búsqueda leen el tag HTML, no la clase CSS. Si hay discrepancia, el SEO se rompe

## 🎯 Patrones de Implementación

### Patrón 1: Página con secciones principales
```html
<h1>Título Principal de la Página</h1>

<section>
  <h2>Sección Principal 1</h2>
  <p>Contenido...</p>
</section>

<section>
  <h2>Sección Principal 2</h2>
  <h3>Subsección 2.1</h3>
  <p>Contenido...</p>
  <h3>Subsección 2.2</h3>
  <p>Contenido...</p>
</section>

<section>
  <h2>Sección Principal 3</h2>
  <p>Contenido...</p>
</section>
```

### Patrón 2: Tarjetas de servicios/productos
```html
<h1>Nuestros Servicios</h1>

<h2>Áreas de Servicio</h2>
<div class="grid">
  <article>
    <h2>Servicio 1</h2>  <!-- H2 porque es una sección principal -->
    <p>Descripción...</p>
  </article>
  <article>
    <h2>Servicio 2</h2>
    <p>Descripción...</p>
  </article>
</div>
```

### Patrón 3: Tarjetas con etiquetas internas (NO usar encabezados)
```html
<!-- ❌ INCORRECTO -->
<article>
  <h4>Problema</h4>  <!-- NO es un encabezado de sección -->
  <p>Texto del problema...</p>
</article>

<!-- ✅ CORRECTO -->
<article>
  <span class="font-bold uppercase text-xs">Problema</span>
  <p>Texto del problema...</p>
</article>
```

### Patrón 4: Pasos de un proceso
```html
<h2>¿Cómo funciona?</h2>

<!-- Opción A: Si son secciones principales -->
<h3>Paso 1: Diagnóstico</h3>
<p>Descripción...</p>

<h3>Paso 2: Implementación</h3>
<p>Descripción...</p>

<!-- Opción B: Si son subsecciones de un H2 -->
<div class="step">
  <h3 class="heading-h3">Diagnóstico</h3>  <!-- Clase coincide con tag -->
  <p>Descripción...</p>
</div>
```

## 🔍 Checklist de Auditoría SEO

Antes de publicar, verifica:

- [ ] Cada página tiene exactamente un `<h1>`
- [ ] El H1 contiene las palabras clave principales
- [ ] El H1 tiene máximo 8-10 palabras
- [ ] No hay saltos en la jerarquía (H1→H3 sin H2)
- [ ] Los tags HTML coinciden con las clases CSS (h2 usa heading-h2)
- [ ] Las etiquetas visuales (como "Problema/Solución/Resultado") usan `<span>` o `<p>`, no `<h4>`
- [ ] Los encabezados son descriptivos y claros
- [ ] No hay encabezados vacíos

## 🚨 Errores Comunes y Soluciones

### Error 1: Etiquetas visuales como encabezados
```html
<!-- ❌ MAL -->
<h4>Problema</h4>
<p>Texto...</p>

<!-- ✅ BIEN -->
<span class="font-bold text-sm uppercase">Problema</span>
<p>Texto...</p>
```

### Error 2: Desajuste tag/clase
```html
<!-- ❌ MAL: Tag dice H3, visualmente es H2 -->
<h3 class="heading-h2">Servicio</h3>

<!-- ✅ BIEN: Tag y clase coinciden -->
<h2 class="heading-h2">Servicio</h2>
```

### Error 3: Saltar niveles
```html
<!-- ❌ MAL: Salta de H2 a H4 -->
<h2>Sección Principal</h2>
<h4>Subsección</h4>

<!-- ✅ BIEN: Jerarquía completa -->
<h2>Sección Principal</h2>
<h3>Subsección</h3>
```

### Error 4: H1 demasiado largo
```html
<!-- ❌ MAL: 15 palabras -->
<h1>Construimos soluciones educativas integrales y personalizadas desde la realidad específica de cada comunidad educativa</h1>

<!-- ✅ BIEN: 8 palabras -->
<h1>Soluciones Educativas desde la Realidad de tu Comunidad</h1>
```

### Error 5: H1 vago sin palabras clave
```html
<!-- ❌ MAL: No dice qué es la página -->
<h1>Más que una asesoría</h1>

<!-- ✅ BIEN: Claro y con keywords -->
<h1>Equipo MR Ateducativa | Asesoría Educativa en Chile</h1>
```

## 📊 Ejemplo de Estructura Completa

### Página de Servicios (ejemplo real)
```html
<h1>Soluciones Educativas Diseñadas desde las Necesidades Reales</h1>

<h2>Elige el Área que tu Establecimiento Necesita</h2>
<div class="grid">
  <article>
    <h2 class="heading-h2">Liderazgo</h2>  <!-- H2 porque es sección principal -->
    <p>Fortalece el liderazgo institucional...</p>
  </article>
  <article>
    <h2 class="heading-h2">Gestión Pedagógica</h2>
    <p>Mejora la gestión curricular...</p>
  </article>
</div>

<h2>¿No Encuentras el Servicio que Necesitas?</h2>
<p>Diseñaremos una solución a medida...</p>
```

### Página de Casos de Éxito (ejemplo real)
```html
<h1>Casos de Éxito</h1>

<h2>¿Tu Establecimiento Será el Próximo Caso de Éxito?</h2>
<p>Estos son algunos de nuestros resultados...</p>

<!-- Testimonios sin encabezados internos -->
<article>
  <span class="font-bold uppercase">Problema</span>  <!-- span, NO h4 -->
  <p>Descripción del problema...</p>
  
  <span class="font-bold uppercase">Solución</span>
  <p>Nuestra solución...</p>
  
  <span class="font-bold uppercase">Resultado</span>
  <p>Resultados obtenidos...</p>
</article>
```

## 🎓 Recursos Adicionales

- [Guía de Google sobre SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Estructura de encabezados W3C](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [Accesibilidad de encabezados](https://webaim.org/techniques/semanticstructure/)

## 📝 Notas de Implementación

Esta guía fue creada a partir de la auditoría y corrección de la estructura de encabezados del proyecto MR Ateducativa. Los fixes aplicados incluyeron:

1. Cambio de `<h4>` a `<span>` en etiquetas de tarjetas de testimonios
2. Corrección de 5 tarjetas de `<h3>` a `<h2>` en página de servicios
3. Ajuste de 6 pasos de `heading-h2` a `heading-h3` en página de mentoría
4. Corrección de `<h2>` a `<h3>` en sección de descarga de recursos
5. Mejora de H1 en páginas de inicio y sobre nosotros

**Fecha de creación**: Agosto 2026  
**Proyecto de referencia**: MR Ateducativa  
**Versión**: 1.0
