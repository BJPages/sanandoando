// assets/js/posts.js
(function () {
  // Detectar el <script> para usar data-base en GitHub Pages (/sanandoando/)
  var script = document.currentScript || (function () {
    var ss = document.getElementsByTagName('script');
    for (var i = ss.length - 1; i >= 0; i--) {
      if (ss[i].src && ss[i].src.indexOf('assets/js/posts.js') !== -1) return ss[i];
    }
    return null;
  })();

  var BASE = (script && script.getAttribute('data-base')) || '/';
  if (BASE.substr(-1) !== '/') BASE += '/';
  function link(p) { return BASE + p.replace(/^\/+/, ''); }

  // Helpers
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  // Elementos
  var elListWrap   = qs('#list-wrap');
  var elDetailWrap = qs('#detail-wrap');
  var elList       = qs('#post-list');
  var elSearch     = qs('#search');
  var elTagBar     = qs('#tag-bar');

  // Meta dinámicos (para SEO en detalle)
  var meta = {
    docTitle: qs('title'),
    docDesc:  qs('meta[name="description"]'),
    ogTitle:  qs('meta[property="og:title"]'),
    ogDesc:   qs('meta[property="og:description"]'),
    ogType:   qs('meta[property="og:type"]'),
    ogUrl:    qs('meta[property="og:url"]'),
    ogImage:  qs('meta[property="og:image"]'),
    canonical: (function(){
      var linkEl = qs('link[rel="canonical"]');
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel','canonical');
        document.head.appendChild(linkEl);
      }
      return linkEl;
    })()
  };

  var state = { posts: [], tags: [], activeTag: null };

  function buildTags(posts) {
    var set = new Set();
    posts.forEach(function(p){ (p.tags||[]).forEach(function(t){ set.add(t); }); });
    state.tags = Array.from(set).sort();
  }

  function renderTagBar() {
    if (!elTagBar) return;
    var html = ['<button class="button small" data-tag="">Todos</button>']
      .concat(state.tags.map(function(t){ return '<button class="button small" data-tag="'+t+'">'+t+'</button>'; }))
      .join(' ');
    elTagBar.innerHTML = html;

    qsa('#tag-bar [data-tag]').forEach(function(btn){
      btn.addEventListener('click', function(){
        state.activeTag = this.getAttribute('data-tag') || null;
        renderList();
      });
    });
  }

  function renderList() {
    if (!elList) return;
    var term = (elSearch && elSearch.value || '').toLowerCase();
    var filtered = state.posts.filter(function(p){
      var haystack = (p.title + ' ' + p.description + ' ' + (p.tags||[]).join(' ')).toLowerCase();
      var passTerm = haystack.indexOf(term) > -1;
      var passTag = !state.activeTag || (p.tags||[]).indexOf(state.activeTag) > -1;
      return passTerm && passTag;
    });

    elList.innerHTML = '';
    filtered.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'post-item';

      var imgHtml = p.image ? (
        '<span class="image fit" style="max-width:560px;display:block;margin:.5rem 0;"><img src="' + p.image + '" alt=""></span>'
      ) : '';

      var url = 'index.html?slug=' + encodeURIComponent(p.slug);
      li.innerHTML =
        '<h3><a href="' + url + '">' + (p.title||'') + '</a></h3>' +
        (p.date ? ('<p style="margin:.25rem 0;color:#888;">' + p.date + (p.reading_time ? ' · ' + p.reading_time : '') + '</p>') : '') +
        (imgHtml) +
        '<p>' + (p.description||'') + '</p>' +
        '<p>' + (p.tags && p.tags.length ? p.tags.map(function(t){ return '<span class="tag" style="display:inline-block;margin:.1rem .3rem;padding:.2rem .5rem;border:1px solid #ddd;border-radius:999px;font-size:.8rem;color:#555;">#'+t+'</span>'; }).join(' ') : '') + '</p>' +
        '<p><a class="button" href="' + url + '">Leer</a></p>';

      elList.appendChild(li);
    });

    // Mostrar lista, ocultar detalle
    if (elListWrap) elListWrap.style.display = '';
    if (elDetailWrap) elDetailWrap.style.display = 'none';

    // Reset metas
    document.title = 'Artículos – Sanación & Narcisismo';
    if (meta.docDesc)   meta.docDesc.setAttribute('content','Listado de artículos sobre sanación emocional y narcisismo.');
    if (meta.ogTitle)   meta.ogTitle.setAttribute('content','Artículos – Sanación & Narcisismo');
    if (meta.ogDesc)    meta.ogDesc.setAttribute('content','Listado de artículos sobre sanación emocional y narcisismo.');
    if (meta.ogType)    meta.ogType.setAttribute('content','website');
    if (meta.ogUrl)     meta.ogUrl.setAttribute('content', location.origin + location.pathname);
    if (meta.canonical) meta.canonical.setAttribute('href', location.origin + location.pathname);
  }

  function renderDetail(slug) {
    var post = state.posts.find(function(p){ return p.slug === slug; });
    if (!post) {
      if (elDetailWrap) elDetailWrap.innerHTML =
        '<section class="main style1"><div class="container"><h2>Artículo no encontrado</h2><p>Revisa el slug: <code>'+slug+'</code></p><p><a class="button" href="index.html">Volver al listado</a></p></div></section>';
      if (elListWrap) elListWrap.style.display = 'none';
      if (elDetailWrap) elDetailWrap.style.display = '';
      return;
    }

    var imgHtml = post.image ? ('<div class="image fit" style="margin-bottom:1rem;"><img src="'+post.image+'" alt=""></div>') : '';
    var tagsHtml = (post.tags && post.tags.length)
      ? ('<p>' + post.tags.map(function(t){ return '<span class="tag" style="display:inline-block;margin:.1rem .3rem;padding:.2rem .5rem;border:1px solid #ddd;border-radius:999px;font-size:.8rem;color:#555;">#'+t+'</span>'; }).join(' ') + '</p>')
      : '';

    elDetailWrap.innerHTML =
      '<section id="header"><div class="inner">' +
      '<h1>'+ (post.title||'Artículo') +'</h1>' +
      '<p>'+ [post.date||'', post.reading_time||''].filter(Boolean).join(' · ') + '</p>' +
      '</div></section>' +
      '<section class="main style1"><div class="container">' +
      imgHtml +
      '<article class="post-content">' + (post.content_html || '<p>Sin contenido.</p>') + '</article>' +
      tagsHtml +
      '<hr style="margin:2rem 0;" />' +
      '<p><a href="index.html" class="button">&larr; Volver a artículos</a></p>' +
      '</div></section>';

    // Mostrar detalle, ocultar lista
    if (elListWrap) elListWrap.style.display = 'none';
    if (elDetailWrap) elDetailWrap.style.display = '';

    // Metas dinámicos (SEO/OG)
    var fullUrl = location.origin + location.pathname + '?slug=' + encodeURIComponent(post.slug);
    document.title = post.title + ' – Sanación & Narcisismo';
    if (meta.docDesc)   meta.docDesc.setAttribute('content', post.description || '');
    if (meta.ogTitle)   meta.ogTitle.setAttribute('content', post.title);
    if (meta.ogDesc)    meta.ogDesc.setAttribute('content', post.description || '');
    if (meta.ogType)    meta.ogType.setAttribute('content', 'article');
    if (meta.ogUrl)     meta.ogUrl.setAttribute('content', fullUrl);
    if (meta.ogImage)   meta.ogImage.setAttribute('content', post.image || link('assets/cover.jpg'));
    if (meta.canonical) meta.canonical.setAttribute('href', fullUrl);

    // JSON-LD dinámico
    var ld = document.getElementById('ld-article');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'ld-article';
      document.head.appendChild(ld);
    }
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title || 'Artículo',
      "description": post.description || '',
      "author": { "@type":"Person", "name":"Francisco Fernandez" },
      "datePublished": post.date || '',
      "image": post.image || link('assets/cover.jpg'),
      "mainEntityOfPage": fullUrl
    });
  }

  function boot() {
    fetch(link('posts/posts.json'), { cache: 'no-store' })
      .then(function(r){ return r.json(); })
      .then(function(posts){
        posts.sort(function(a,b){ return (b.date||'').localeCompare(a.date||''); });
        state.posts = posts;
        buildTags(posts);

        var slug = getParam('slug');
        if (slug) {
          renderDetail(slug);
        } else {
          renderTagBar();
          renderList();
        }

        if (elSearch) elSearch.addEventListener('input', renderList);

        window.addEventListener('popstate', function(){
          var s = getParam('slug');
          if (s) renderDetail(s); else { renderTagBar(); renderList(); }
        });

        if (elList) {
          elList.addEventListener('click', function(e){
            var a = e.target.closest('a[href*="?slug="]');
            if (a) {
              e.preventDefault();
              var url = new URL(a.href, location.origin);
              history.pushState(null, '', url.pathname + url.search);
              renderDetail(url.searchParams.get('slug'));
            }
          });
        }
      })
      .catch(function(err){
        console.error('No se pudo cargar posts.json', err);
        if (elList) elList.innerHTML = '<li>No se pudo cargar la lista de artículos.</li>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
