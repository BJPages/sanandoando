// assets/js/header.js
(function () {
  // 1) Detecta el <script> que cargó header.js y toma data-base (raíz del sitio)
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('assets/js/header.js') !== -1) return scripts[i];
    }
    return null;
  })();

  // Si usas GitHub Pages en repositorio de proyecto, usa "/TU_REPO/"
  // Si usas username.github.io (sin repo), usa "/"
  var BASE = (script && script.getAttribute('data-base')) || '/';

  // Normaliza BASE para que siempre termine con "/"
  if (BASE.substr(-1) !== '/') BASE += '/';

  // 2) Construye los enlaces con BASE
  function link(p) { return BASE + p.replace(/^\/+/, ''); }

  var navHTML = ''
    + '<nav class="nav-global" style="padding:12px 16px;text-align:center;background:#1c1d26;">'
    + '  <a href="' + link('') + '" class="button" style="display:inline-block;margin:4px 6px;">Inicio</a>'
    + '  <a href="' + link('posts/') + '" class="button" style="display:inline-block;margin:4px 6px;">Artículos</a>'
    + '  <a href="' + link('recursos/') + '" class="button" style="display:inline-block;margin:4px 6px;">Recursos</a>'
    + '  <a href="' + link('sobre/') + '" class="button" style="display:inline-block;margin:4px 6px;">Sobre mí</a>'
    + '  <a href="' + link('privacidad/') + '" class="button" style="display:inline-block;margin:4px 6px;">Privacidad</a>'
    + '</nav>';

  // 3) Inserta en #site-header si existe; si no, lo crea al inicio del <body>
  function inject() {
    var container = document.getElementById('site-header');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-header';
      document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = navHTML;

    // 4) Marca activo según la URL
    var path = window.location.pathname;
    // Si el sitio es /TU_REPO/, recorta el prefijo para comparar
    if (BASE !== '/') {
      var repoPrefix = BASE;
      if (path.indexOf(repoPrefix) === 0) path = path.slice(repoPrefix.length);
    } else if (path.charAt(0) === '/') {
      path = path.slice(1);
    }
    // path vacío = home
    var links = container.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      // normaliza href para comparar
      var normalized = href;
      if (BASE !== '/' && href.indexOf(BASE) === 0) normalized = href.slice(BASE.length);
      if (BASE === '/' && normalized.charAt(0) === '/') normalized = normalized.slice(1);
      // home
      if ((normalized === '' || normalized === './') && (path === '' || path === 'index.html')) {
        links[i].className += ' primary';
      }
      // secciones
      if (path.indexOf('posts/') === 0 && normalized === 'posts/') links[i].className += ' primary';
      if (path.indexOf('recursos/') === 0 && normalized === 'recursos/') links[i].className += ' primary';
      if (path.indexOf('sobre/') === 0 && normalized === 'sobre/') links[i].className += ' primary';
      if (path.indexOf('privacidad/') === 0 && normalized === 'privacidad/') links[i].className += ' primary';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
