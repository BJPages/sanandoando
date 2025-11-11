// assets/js/footer.js
(function () {
  // Detect script element to read data-* attributes
  var script = document.currentScript || (function () {
    var ss = document.getElementsByTagName('script');
    for (var i = ss.length - 1; i >= 0; i--) {
      if (ss[i].src && ss[i].src.indexOf('assets/js/footer.js') !== -1) return ss[i];
    }
    return null;
  })();

  // Base path for GitHub Pages project (e.g., "/sanandoando/")
  var BASE = (script && script.getAttribute('data-base')) || '/';
  if (BASE.substr(-1) !== '/') BASE += '/';

  // Optional social links via data-attrs
  var links = {
    facebook:  script && script.getAttribute('data-facebook'),
    instagram: script && script.getAttribute('data-instagram'),
    twitter:   script && script.getAttribute('data-twitter'),
    github:    script && script.getAttribute('data-github'),
    email:     script && script.getAttribute('data-email')
  };

  // AdSense config via data-attrs
  var ADS_CLIENT = (script && script.getAttribute('data-adsense')) || ''; // e.g., ca-pub-5069721968454102
  var ADS_SLOT   = (script && script.getAttribute('data-ad-slot')) || ''; // e.g., 1234567890 (optional)
  var NO_ADS     = (script && script.getAttribute('data-no-ads')) === 'true';

  function iconHTML() {
    var html = '<ul class="icons">';
    if (links.twitter)   html += '<li><a href="'+links.twitter+'" target="_blank" rel="noopener" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>';
    if (links.facebook)  html += '<li><a href="'+links.facebook+'" target="_blank" rel="noopener" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>';
    if (links.instagram) html += '<li><a href="'+links.instagram+'" target="_blank" rel="noopener" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>';
    if (links.github)    html += '<li><a href="'+links.github+'" target="_blank" rel="noopener" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>';
    if (links.email)     html += '<li><a href="mailto:'+links.email+'" class="icon solid alt fa-envelope"><span class="label">Email</span></a></li>';
    html += '</ul>';
    return html;
  }

  function buildFooterHTML() {
    var year = new Date().getFullYear();
    // contenedor para anuncio en el footer (solo si hay adsense y no está desactivado)
    var adHost = (ADS_CLIENT && !NO_ADS) ? '<div id="sa-footer-ad" style="margin-top:12px"></div>' : '';
    return '' +
      '<section id="footer">' +
        iconHTML() +
        '<ul class="copyright">' +
          '<li>Design: <a href="http://html5up.net" target="_blank" rel="noopener">HTML5 UP</a></li>' +
        '</ul>' +
        adHost +
      '</section>';
  }

  function injectFooter() {
    // Prefer #site-footer if present, else append at end of body
    var container = document.getElementById('site-footer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-footer';
      document.body.appendChild(container);
    }
    container.innerHTML = buildFooterHTML();
  }

  // Load AdSense script once, if client is provided
  function ensureAdSense() {
    if (!ADS_CLIENT) return;
    if (window.__adsenseLoaded) return;

    // Avoid duplicate if already present in DOM
    var existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    if (existing) { window.__adsenseLoaded = true; return; }

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADS_CLIENT);
    s.setAttribute('crossorigin', 'anonymous');
    s.onload = function(){ window.__adsenseLoaded = true; };
    document.head.appendChild(s);
  }

  // Insert a manual responsive ad block into footer (optional)
  function injectFooterAd() {
    if (!ADS_CLIENT || NO_ADS) return;
    if (!ADS_SLOT) return; // if there is no slot, assume Auto Ads only

    var host = document.getElementById('sa-footer-ad');
    if (!host) return;

    // Prevent duplicates
    if (host.querySelector('.sa-footer-adsbygoogle')) return;

    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle sa-footer-adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', ADS_CLIENT);
    ins.setAttribute('data-ad-slot', ADS_SLOT);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    host.appendChild(ins);

    // Render ad (with retry if script not ready yet)
    function pushAd() {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // If ads script not yet ready, retry shortly
        setTimeout(pushAd, 200);
      }
    }
    pushAd();
  }

  function boot() {
    injectFooter();
    ensureAdSense();
    // small delay to allow the ads script to be ready
    setTimeout(injectFooterAd, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

