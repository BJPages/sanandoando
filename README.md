# Sanación Emocional & Narcisismo — Sitio estático (HTML5 UP: Photon)

Sitio web gratuito y estático para compartir **guías, reflexiones y recursos** sobre sanación emocional y relaciones con personas narcisistas. Optimizado para **GitHub Pages** y monetización pasiva mediante **donaciones** y **afiliados**.

- **Demo/Producción** (GitHub Pages): `https://bjpages.github.io/sanandoando/`
- **Plantilla base**: [HTML5 UP – Photon](https://html5up.net/photon) (adaptada)

---

## 🧱 Estructura
/
├─ index.html
├─ 404.html
├─ robots.txt
├─ sitemap.xml
├─ .nojekyll
├─ posts/
│ ├─ index.html
│ └─ como-identificar-narcisista-encubierto.html
├─ recursos/
│ └─ index.html
├─ sobre/
│ └─ index.html
├─ privacidad/
│ └─ index.html
└─ assets/
├─ css/ (main.css, noscript.css)
├─ js/ (jquery.min.js, main.js, etc.)
└─ images/ (pic01.jpg, cover.jpg, …)


> Asegúrate de subir también la carpeta `assets/` y sus subcarpetas (puedes **arrastrar la carpeta completa** en GitHub → *Add file → Upload files*).

---

## 🚀 Publicación (sin terminal)

1. **Crea el repo** en GitHub y súbelo (arrastrando carpetas).  
2. Activa **GitHub Pages**:  
   `Settings → Pages → Source: Branch = main · Folder = /root → Save`  
3. Espera ~1–2 min y abre la URL pública que GitHub muestre.
4. (Opcional) Si tu plantilla usa carpetas con `_` (underscore), deja un archivo **`.nojekyll`** vacío en la raíz para evitar que Jekyll las ignore.

---

## ➕ Añadir un nuevo artículo

1. Duplica `posts/como-identificar-narcisista-encubierto.html` y renómbralo (ej. `posts/diario-anti-gaslighting.html`).  
2. Edita `<title>`, `meta description`, el contenido del post y (si usas) el bloque **JSON-LD**.  
3. En `posts/index.html`, duplica un `<li>` del listado y enlaza tu nuevo archivo.  
4. Actualiza `sitemap.xml` con la nueva URL (ej. `https://TU_USUARIO.github.io/TU_REPO/posts/diario-anti-gaslighting.html`).

> Tip SEO: usa **slugs** (nombres de archivo) descriptivos, en minúsculas y con guiones.

---

## 💸 Donaciones y afiliados

- **Ko-fi / Buy Me a Coffee**: edita los enlaces en `index.html` y `recursos/index.html`.  
- **Amazon Afiliados** (u otros): reemplaza `TU_TAG_AFILIADO` en los enlaces marcados.  
- Puedes agregar más recursos en `recursos/index.html` (recuerda `rel="nofollow sponsored"`).

---

## 🔍 SEO básico incluido

- **`<title>` y `meta description`** por página.  
- **Open Graph / Twitter** para compartir con imagen (`assets/cover.jpg`).  
- **`sitemap.xml`** y **`robots.txt`** ya listos (actualiza `TU_USUARIO`/`TU_REPO`).  
- **JSON-LD** en posts (tipo `Article`) y en `index.html` (tipo `WebSite`).  
- URL limpias por sección (`/posts/`, `/recursos/`, etc.).

---

## 🛠 Personalización rápida

- **Marca** (nombres, colores, textos del héroe): editar en `index.html`.  
- **Imágenes**: coloca tus JPG/PNG en `assets/images/` y actualiza las rutas `<img>`.  
- **Botones y navegación**: los enlaces a `posts/`, `recursos/`, `sobre/`, `privacidad/` ya están conectados.

---

## ❓ Problemas comunes

- **No carga el CSS/JS**: revisa rutas relativas (por ejemplo, en páginas dentro de subcarpetas usa `../assets/...`).  
- **404 en GitHub Pages**: verifica que `index.html` esté en la **raíz** y Pages apunte a **/root**.  
- **Imágenes no aparecen**: revisa mayúsculas/minúsculas en el nombre del archivo (GitHub es case-sensitive).  
- **Carpetas no suben**: usa el método de **arrastrar carpeta** (crea subcarpetas automáticamente) o **GitHub Desktop**.

---

## 📄 Créditos y Licencia

Este sitio está basado en la plantilla **Photon** de **HTML5 UP**.  
- **Autor plantillas**: AJ (@ajlkn)  
- **Licencia**: **Creative Commons Attribution 3.0** (CCA 3.0) — *uso personal y comercial permitido con atribución*.  
- **Créditos de la plantilla** (tal como indica el README original):  
  - **Demo Images**: Unsplash  
  - **Icons**: Font Awesome  
  - **Other**: jQuery, Responsive Tools

> Revisa el README original de Photon para detalles de licencia y créditos. :contentReference[oaicite:0]{index=0}

**Atribución recomendada en el footer**:
© AÑO Sanación & Narcisismo · Design: HTML5 UP (html5up.net)


---

## 🧭 Roadmap sugerido

- [ ] Agregar 2–3 artículos iniciales.  
- [ ] Subir `assets/cover.jpg` (1200×630 aprox.) para tarjetas sociales.  
- [ ] Ajustar enlaces Ko-fi y afiliados reales.  
- [ ] Conectar Google Search Console y enviar `sitemap.xml`.  
- [ ] (Opcional) Página de **Contacto** con email/links.

---

## 🤝 Contribuciones

Sugerencias, issues o mejoras vía **Pull Request**/**Issues** en GitHub.  
Cualquier cambio debe mantener compatibilidad con **GitHub Pages** (sitio 100% estático).
