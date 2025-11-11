// assets/js/header.js
(function () {
  // --- detectar <script> para leer data-attrs ---
  var script = document.currentScript || (function () {
    var ss = document.getElementsByTagName('script');
    for (var i = ss.length - 1; i >= 0; i--) {
      if (ss[i].src && ss[i].src.indexOf('assets/js/header.js') !== -1) return ss[i];
    }
    return null;
  })();

  // BASE del sitio (p.ej. "/sanandoando/"). Si es user site, "/".
  var BASE = (script && script.getAttribute('data-base')) || '/';
  if (BASE.substr(-1) !== '/') BASE += '/';
  function link(p) { return BASE + (p || '').replace(/^\/+/, ''); }

  // ================
  // MENÚ (array-driven)
  // ================
  var NAV_ITEMS = [
    { label: 'Inicio',          path: '',            match: /^$/ },               // home
    { label: 'Artículos',       path: 'posts/',      match: /^posts\// },
    { label: 'Recursos',        path: 'recursos/',   match: /^recursos\// },
    { label: 'Sobre nosotros',  path: 'sobre/',      match: /^sobre\// },
    { label: 'Privacidad',      path: 'privacidad/', match: /^privacidad\// },
    { label: 'Apóyanos ☕️',     path: 'apoyanos/',   match: /^apoyanos\// }
  ];

  // Extras por data-* (opcional)
  for (var i = 1; i <= 5; i++) {
    var lbl = script && script.getAttribute('data-extra' + i + '-label');
    var href = script && script.getAttribute('data-extra' + i + '-href');
    if (lbl && href) {
      var isExt = /^https?:\/\//i.test(href);
      NAV_ITEMS.push(isExt
        ? { label: lbl, external: true, href: href, match: /^$/ }
        : { label: lbl, path: href.replace(/^\/+/, ''), match: new RegExp('^' + href.replace(/^\/+/, '')) }
      );
    }
  }

  // ================
  // Aviso flotante con recuerdo semanal
  // ================
  var NOTICE_DEFAULT = 'Aviso: En Sanando Ando no somos psicólogos ni terapeutas. Somos un grupo de apoyo que comparte información y experiencias para acompañarte en tu proceso de sanación. Si atraviesas un momento difícil, buscar ayuda profesional es una muestra de fortaleza, no de debilidad.';
  var noticeText = (script && script.getAttribute('data-notice')) || NOTICE_DEFAULT;
  var noticeDays = parseInt((script && script.getAttribute('data-notice-days')) || '7', 10);
  if (!(noticeDays > 0)) noticeDays = 7;

  var NOTICE_KEY = 'sa_notice_last_close';
  var COOKIE_KEY = 'sa_notice_last_close';

  function nowTs() { return Date.now(); }
  function ms(days) { return days * 24 * 60 * 60 * 1000; }

  function getLS(k) {
    try { return localStorage.getItem(k); } catch(e) { return null; }
  }
  function setLS(k, v) {
    try { localStorage.setItem(k, v); } catch(e) {}
  }
  function setCookie(name, value, days) {
    try {
      var d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/';
    } catch(e){}
  }
  function getCookie(name) {
    try {
      var pattern = "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1") + "=([^;]*)";
      var m = document.cookie.match(new RegExp(pattern));
      return m ? decodeURIComponent(m[1]) : null;
    } catch(e){ return null; }
  }

  function shouldShowNotice() {
    var ts = parseInt(getLS(NOTICE_KEY) || getCookie(COOKIE_KEY) || '0', 10);
    if (!ts) return true;
    return (nowTs() - ts) >= ms(noticeDays);
  }

  function renderNotice() {
    if (!noticeText || !shouldShowNotice()) return;

    var wrap = document.createElement('div');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Aviso');
    Object.assign(wrap.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      maxWidth: '520px',
      zIndex: '9999',
      background: 'rgba(28,29,38,0.96)',
      color: '#fff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      padding: '14px 16px',
      fontSize: '14px',
      lineHeight: '1.45',
      backdropFilter: 'saturate(120%) blur(2px)'
    });

    var text = document.createElement('div');
    text.textContent = noticeText;

    var row = document.createElement('div');
    Object.assign(row.style, { marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' });

    var ok = document.createElement('button');
    ok.type = 'button';
    ok.textContent = 'Entendido';
    ok.setAttribute('aria-label', 'Cerrar aviso');
    Object.assign(ok.style, {
      background: '#00c170',
      color: '#0a0a0a',
      border: '0',
      borderRadius: '999px',
      padding: '8px 12px',
      fontWeight: '700',
      cursor: 'pointer'
    });

    var more = document.createElement('a');
    more.href = link('sobre/');
    more.textContent = 'Saber más';
    more.rel = 'noopener';
    Object.assign(more.style, {
      color: '#9adcff',
      textDecoration: 'underline',
      fontWeight: '600'
    });

    var closeX = document.createElement('button');
    closeX.type = 'button';
    closeX.setAttribute('aria-label', 'Cerrar');
    closeX.innerHTML = '×';
    Object.assign(closeX.style, {
      marginLeft: 'auto',
      background: 'transparent',
      color: '#fff',
      border: '0',
      fontSize: '18px',
      lineHeight: '1',
      cursor: 'pointer',
      padding: '4px 8px'
    });

    function dismiss() {
      var t = String(nowTs());
      setLS(NOTICE_KEY, t);
      setCookie(COOKIE_KEY, t, noticeDays);
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }

    ok.onclick = dismiss;
    closeX.onclick = dismiss;

    row.appendChild(ok);
    row.appendChild(more);
    row.appendChild(closeX);

    wrap.appendChild(text);
    wrap.appendChild(row);

    // Responsive tweak (en móviles lo movemos un poco)
    function adjustForMobile() {
      if (window.innerWidth < 480) {
        wrap.style.left = '10px';
        wrap.style.right = '10px';
        wrap.style.bottom = '10px';
        wrap.style.maxWidth = 'unset';
      } else {
        wrap.style.right = '';
      }
    }
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);

    document.body.appendChild(wrap);
  }

  // ================
  // Render Nav
  // ================
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

  function markActive(container) {
    var path = window.location.pathname;
    if (BASE !== '/') {
      if (path.indexOf(BASE) === 0) path = path.slice(BASE.length);
    } else {
      if (path.charAt(0) === '/') path = path.slice(1);
    }
    if (path === '') path = '';

    var links = container.getElementsByTagName('a');
    var activeIndex = -1;
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      var it = NAV_ITEMS[i];
      if (it.external) continue;
      if (!it.match) continue;
      try {
        if (it.match.test(path)) { activeIndex = i; break; }
        if (it.path === '' && (path === '' || path === 'index.html')) { activeIndex = i; break; }
      } catch(e){}
    }
    if (activeIndex > -1 && links[activeIndex]) {
      links[activeIndex].className += ' primary';
    }
  }

  function injectNav() {
    var container = document.getElementById('site-header');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-header';
      document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = buildNavHTML();
    markActive(container);
  }

  function boot() {
    injectNav();
    renderNotice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
