// assets/js/header.js
(function () {
  // Localiza el <script> que cargó este archivo (para leer data-attrs)
  var script = document.currentScript || (function () {
    var ss = document.getElementsByTagName('script');
    for (var i = ss.length - 1; i >= 0; i--) {
      if (ss[i].src && ss[i].src.indexOf('assets/js/header.js') !== -1) return ss[i];
    }
    return null;
  })();

  // BASE del sitio (p.ej. "/sanandoando/"). Si es un user site, "/".
  var BASE = (script && script.getAttribute('data-base')) || '/';
  if (BASE.substr(-1) !== '/') BASE += '/';

  // Helpers
  function link(p) { return BASE + (p || '').replace(/^\/+/, ''); }
  function isExternal(href) { return /^https?:\/\//i.test(href); }

  // -------------------------------
  // MENÚ CONFIGURABLE (ARRAY-DRIVEN)
  // -------------------------------
  // Define tus items aquí. 'path' se usa para el href (relativo a BASE).
  // 'match' indica qué prefijo de path activa el botón.
  var NAV_ITEMS = [
    { label: 'Inicio',      path: '',            match: /^$/ },               // home
    { label: 'Artículos',   path: 'posts/',      match: /^posts\// },
    { label: 'Recursos',    path: 'recursos/',   match: /^recursos\// },
    { label: 'Sobre nosotros', path: 'sobre/',   match: /^sobre\// },
    { label: 'Privacidad',  path: 'privacidad/', match: /^privacidad\// },
    { label: 'Apóyanos ☕️', path: 'apoyanos/',   match: /^apoyanos\// }
  ];

  // (Opcional) Items extra por data-attrs:
  // data-extra1-label="Blog" data-extra1-href="https://midominio.com/blog"
  // data-extra2-label="Docs" data-extra2-href="/ruta/externa"
  // Hasta 5 extras por simplicidad.
  for (var i = 1; i <= 5; i++) {
    var lbl = script && script.getAttribute('data-extra' + i + '-label');
    var href = script && script.getAttribute('data-extra' + i + '-href');
    if (lbl && href) {
      // Si el href es externo (http/https), lo respetamos tal cual;
      // si no, lo tratamos como path relativo a BASE.
      var item = isExternal(href)
        ? { label: lbl, external: true, href: href, match: /^$/ } // no se activa nunca
        : { label: lbl, path: href.replace(/^\/+/, ''), match: new RegExp('^' + href.replace(/^\/+/, '')) };
      NAV_ITEMS.push(item);
    }
  }

  // ---------------------------
  // RENDER DEL NAV (SIN INLINE)
  // ---------------------------
  function buildNavHTML() {
    var html = '<nav class="nav-global" style="padding:12px 16px;text-align:center;background:#1c1d26;">';
    NAV_ITEMS.forEach(function (item) {
      var href = item.external ? item.href : link(item.path);
      html += '<a href="' + href + '"'
           +  ' class="button"'
           +  (item.external ? ' target="_blank" rel="noopener"' : '')
           +  ' style="display:inline-block;margin:4px 6px;">'
           +  item.label
           +  '</a>';
    });
    html += '</nav>';
    return html;
  }

  // ---------------------------
  // MARCA ACTIVO SEGÚN LA URL
  // ---------------------------
  function markActive(container) {
    // path = ruta sin BASE (p.ej. "posts/index.html" o "posts/")
    var path = window.location.pathname;
    if (BASE !== '/') {
      if (path.indexOf(BASE) === 0) path = path.slice(BASE.length);
    } else {
      if (path.charAt(0) === '/') path = path.slice(1);
    }
    // Normaliza home
    if (path === '') path = ''; // home
    // Si estás en /carpeta/ y el servidor sirve index.html, a veces path termina en "/"
    // Eso ya coincide con los 'match' tipo /^posts\//

    var links = container.getElementsByTagName('a');

    // Determina qué índice debe estar activo
    var activeIndex = -1;
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      var it = NAV_ITEMS[i];
      if (it.external) continue; // externos no se activan
      if (!it.match) continue;
      try {
        if (it.match.test(path)) { activeIndex = i; break; }
        // Tratamiento especial para home: '' o 'index.html'
        if (it.path === '' && (path === '' || path === 'index.html')) { activeIndex = i; break; }
      } catch (e) {
        // Si el regex falla, ignoramos ese item
      }
    }

    if (activeIndex > -1 && links[activeIndex]) {
      links[activeIndex].className += ' primary';
    }
  }

  // ---------------------------
  // INYECCIÓN EN EL DOCUMENTO
  // ---------------------------
  function inject() {
    var container = document.getElementById('site-header');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-header';
      document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = buildNavHTML();
    markActive(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
