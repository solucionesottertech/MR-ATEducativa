# Guía de Post-Deploy — MR Ateducativa

## ✅ Estado actual del sitio

- **Código completo**: 39/41 tareas implementadas
- **Build exitoso**: 17 páginas generadas
- **3 problemas CRITICAL resueltos**: DiagnosisForm, BreadcrumbList, scripts de validación
- **Pendiente**: Lighthouse audit + forms testing (post-deploy)

---

## 📋 Checklist de post-deploy

### Fase 1: Subir archivos a Hostinger

#### 1.1 Generar build de producción
```bash
cd "/Users/rfaundez/Developer/proyectos/MR Ateducativa"
pnpm run build
```

Esto genera la carpeta `dist/` con todos los archivos estáticos.

#### 1.2 Eliminar WordPress actual
⚠️ **IMPORTANTE**: Haz backup antes de eliminar

1. Entra al panel de Hostinger
2. Ve a **Hosting → mr-ateducativa.cl → Administrador de archivos**
3. Navega a `public_html/`
4. **Descarga una copia de seguridad** de todo el contenido actual (zip)
5. Elimina TODO el contenido de `public_html/`

#### 1.3 Subir archivos nuevos
1. En el Administrador de archivos de Hostinger
2. Navega a `public_html/`
3. Sube **TODO el contenido de la carpeta `dist/`** (no la carpeta, sino su contenido)
4. Estructura final en Hostinger:
   ```
   public_html/
   ├── index.html
   ├── contacto/
   │   └── index.html
   ├── servicios/
   │   ├── liderazgo/
   │   │   └── index.html
   │   ├── pedagogica/
   │   │   └── index.html
   │   ├── convivencia/
   │   │   └── index.html
   │   └── recursos/
   │       └── index.html
   ├── sobre-nosotros/
   │   └── index.html
   ├── casos-exito/
   │   └── index.html
   ├── blog/
   │   ├── index.html
   │   └── [articulos]/
   │       └── index.html
   ├── recursos/
   │   └── [lead-magnets]/
   │       └── index.html
   ├── gracias-contacto/
   │   └── index.html
   ├── gracias-diagnostico/
   │   └── index.html
   ├── gracias-lead/
   │   └── index.html
   ├── _astro/
   │   └── [archivos CSS/JS optimizados]
   ├── sitemap-index.xml
   ├── sitemap-0.xml
   └── robots.txt
   ```

#### 1.4 Verificar que el sitio carga
- Abre https://mr-ateducativa.cl en tu navegador
- Navega por las principales secciones
- Verifica que el diseño se ve bien en mobile y desktop

---

### Fase 2: Configurar Web3Forms (formularios)

#### 2.1 Crear cuenta en Web3Forms
1. Ve a https://web3forms.com
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Regístrate con tu correo (contacto@ottertech.cl o el que prefieras)
4. Confirma tu correo electrónico

#### 2.2 Crear Access Key
1. Una vez dentro del dashboard de Web3Forms
2. Ve a **"API Keys"** o **"Access Keys"**
3. Haz clic en **"Create New Key"**
4. Nombre: `MR Ateducativa - Contacto`
5. Email de destino: el correo de Marilyn (marilyn@mr-ateducativa.cl)
6. Copia el **Access Key** (algo como `abc123-def456-ghi789`)
7. **Guárdalo en un lugar seguro**

#### 2.3 Reemplazar placeholder en el código
1. Abre el archivo `src/components/ContactForm.astro`
2. Busca la línea:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
3. Reemplaza `YOUR_WEB3FORMS_ACCESS_KEY` con tu access key real:
   ```html
   <input type="hidden" name="access_key" value="abc123-def456-ghi789" />
   ```
4. Repite el proceso en `src/components/DiagnosisForm.astro`
5. Repite el proceso en `src/components/LeadMagnetForm.astro`

#### 2.4 Reconstruir y subir
```bash
pnpm run build
```
Sube nuevamente el contenido de `dist/` a Hostinger (sobrescribe los archivos).

#### 2.5 Probar formularios
1. Ve a https://mr-ateducativa.cl/contacto
2. Llena el formulario de contacto con datos de prueba
3. Envía el formulario
4. Verifica que:
   - ✅ Se redirige a `/gracias-contacto`
   - ✅ Marilyn recibe el correo con los datos
   - ✅ El evento de Umami se dispara (verificar en dashboard de Umami)
5. Repite con el formulario de diagnóstico gratuito
6. Repite con el formulario de lead magnet

---

### Fase 3: Configurar Umami (analytics)

#### 3.1 Crear cuenta en Umami Cloud
1. Ve a https://cloud.umami.is
2. Haz clic en **"Sign Up"**
3. Regístrate con tu correo
4. Confirma tu correo electrónico

#### 3.2 Registrar sitio web
1. Dentro del dashboard de Umami
2. Haz clic en **"Add a website"** o **"Add new site"**
3. Completa los datos:
   - **Domain**: `mr-ateducativa.cl`
   - **Site Name**: `MR Ateducativa`
4. Umami te dará un **Website ID** (algo como `12345678-abcd-efgh-ijkl-1234567890ab`)
5. **Copia el Website ID**

#### 3.3 Reemplazar placeholder en el código
1. Abre el archivo `src/components/Analytics.astro`
2. Busca la línea:
   ```html
   <script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR_UMAMI_WEBSITE_ID"></script>
   ```
3. Reemplaza `YOUR_UMAMI_WEBSITE_ID` con tu ID real:
   ```html
   <script defer src="https://cloud.umami.is/script.js" data-website-id="12345678-abcd-efgh-ijkl-1234567890ab"></script>
   ```

#### 3.4 Reconstruir y subir
```bash
pnpm run build
```
Sube nuevamente el contenido de `dist/` a Hostinger.

#### 3.5 Verificar analytics
1. Espera 5-10 minutos
2. Ve al dashboard de Umami
3. Verifica que:
   - ✅ Aparecen visitas en tiempo real
   - ✅ Las páginas vistas se registran correctamente
   - ✅ Los eventos de formularios aparecen (cuando envíes un formulario)

---

### Fase 4: Configurar Microsoft Clarity (heatmaps)

#### 4.1 Crear proyecto en Clarity
1. Ve a https://clarity.microsoft.com
2. Inicia sesión con tu cuenta Microsoft (o crea una)
3. Haz clic en **"Create a new project"**
4. Completa los datos:
   - **Project name**: `MR Ateducativa`
   - **Project website**: `https://mr-ateducativa.cl`
   - **Industry**: Education
5. Acepta los términos y crea el proyecto

#### 4.2 Obtener Project ID
1. Clarity te mostrará un script de instalación
2. Busca el **Project ID** en el script (algo como `abc123def4`)
3. También puedes encontrarlo en: **Settings → Installation → Tracking code**

#### 4.3 Reemplazar placeholder en el código
1. Abre el archivo `src/components/Analytics.astro`
2. Busca la sección de Clarity:
   ```html
   <script type="text/javascript">
     (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
     })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
   </script>
   ```
3. Reemplaza `YOUR_CLARITY_PROJECT_ID` con tu ID real:
   ```html
   <script type="text/javascript">
     (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
     })(window, document, "clarity", "script", "abc123def4");
   </script>
   ```

#### 4.4 Reconstruir y subir
```bash
pnpm run build
```
Sube nuevamente el contenido de `dist/` a Hostinger.

#### 4.5 Verificar heatmaps
1. Espera 24-48 horas para que se acumulen datos
2. Ve al dashboard de Clarity
3. Verifica que:
   - ✅ Aparecen grabaciones de sesiones
   - ✅ Los heatmaps se generan para las páginas principales
   - ✅ Puedes ver dónde hacen clic los usuarios

---

### Fase 5: Ejecutar Lighthouse audit

#### 5.1 Instalar Lighthouse (si no lo tienes)
Lighthouse viene integrado en Chrome DevTools, no necesitas instalar nada.

#### 5.2 Ejecutar audit desde Chrome
1. Abre Chrome y ve a https://mr-ateducativa.cl
2. Abre DevTools: `Cmd+Option+I` (Mac) o `Ctrl+Shift+I` (Windows/Linux)
3. Ve a la pestaña **"Lighthouse"**
4. Configura el audit:
   - **Mode**: Navigation
   - **Device**: Mobile (importante, es mobile-first)
   - **Categories**: marca todas (Performance, Accessibility, Best Practices, SEO)
5. Haz clic en **"Analyze page load"**
6. Espera 30-60 segundos

#### 5.3 Interpretar resultados
**Objetivos mínimos:**
- ✅ Performance: >90
- ✅ Accessibility: >90
- ✅ Best Practices: >90
- ✅ SEO: >90

**Métricas clave:**
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

#### 5.4 Si hay problemas
Lighthouse te dará recomendaciones específicas. Los problemas más comunes:

**Performance:**
- Imágenes muy grandes → optimizar con WebP/AVIF
- CSS/JS sin minificar → Astro ya lo hace automáticamente
- Falta caché → configurar en Hostinger

**Accessibility:**
- Contraste de colores bajo → ajustar colores en Tailwind config
- Falta alt text en imágenes → agregar a todas las imágenes
- Navegación por teclado → verificar tab order

**SEO:**
- Falta meta description → agregar a todas las páginas
- Titles muy largos/cortos → ajustar a 50-60 caracteres
- Falta canonical URL → verificar que BaseLayout lo genera

#### 5.5 Guardar reporte
1. En el reporte de Lighthouse, haz clic en **"Save as HTML"**
2. Guarda el archivo para referencia
3. Si hay problemas críticos, crea un issue para corregirlos

---

### Fase 6: Verificación final

#### 6.1 Checklist de verificación
- [ ] Sitio carga en https://mr-ateducativa.cl
- [ ] Todas las páginas navegan correctamente
- [ ] Diseño responsive en mobile y desktop
- [ ] Formularios envían correos correctamente
- [ ] Umami registra visitas y eventos
- [ ] Clarity graba sesiones y genera heatmaps
- [ ] Lighthouse scores >90 en todas las categorías
- [ ] Sitemap.xml accesible en https://mr-ateducativa.cl/sitemap-index.xml
- [ ] robots.txt correcto
- [ ] Schema JSON-LD presente (verificar con Rich Results Test)

#### 6.2 Herramientas de verificación
- **Rich Results Test**: https://search.google.com/test/rich-results
  - Verifica que el schema JSON-LD es válido
- **Google Search Console**: https://search.google.com/search-console
  - Registra el sitio
  - Envía el sitemap
  - Monitorea indexación
- **PageSpeed Insights**: https://pagespeed.web.dev
  - Alternativa online a Lighthouse
  - Compara mobile vs desktop

#### 6.3 Monitoreo continuo
- **Umami**: revisa semanalmente métricas de tráfico
- **Clarity**: revisa mensualmente heatmaps y grabaciones
- **Search Console**: revisa semanalmente indexación y errores
- **Lighthouse**: ejecuta mensualmente para monitorear performance

---

## 🎯 Próximos pasos después del deploy

### Contenido real (Marilyn debe enviar)
- [ ] Paleta de colores con códigos hex
- [ ] Logo principal + extendido (de Alfonso)
- [ ] Textos de las 4 áreas de servicio
- [ ] Trayectoria de Marilyn y equipo
- [ ] Casos de éxito con testimonios
- [ ] Fotos profesionales

### Mejoras futuras
- [ ] Reemplazar contenido placeholder con contenido real
- [ ] Agregar más artículos de blog
- [ ] Crear lead magnets reales (PDFs)
- [ ] Optimizar imágenes con WebP/AVIF
- [ ] Agregar más casos de éxito
- [ ] Integrar con LinkedIn de Marilyn
- [ ] Configurar Google My Business

---

## 📞 Soporte

Si tienes problemas durante el deploy o configuración:
1. Revisa los logs de errores en Hostinger
2. Verifica que las access keys sean correctas
3. Consulta la documentación de cada servicio:
   - Web3Forms: https://web3forms.com/docs
   - Umami: https://umami.is/docs
   - Clarity: https://docs.microsoft.com/clarity

---

**Fecha de creación**: 31 de julio de 2026  
**Proyecto**: MR Ateducativa  
**Stack**: Astro + Tailwind CSS + pnpm  
**Hosting**: Hostinger (mr-ateducativa.cl)
