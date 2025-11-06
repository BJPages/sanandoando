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

  // Optional social links via data-attrs (only Facebook is required for now)
  var links = {
    facebook: script && script.getAttribute('data-facebook'),
    instagram: script && script.getAttribute('data-instagram'),
    twitter: script && script.getAttribute('data-twitter'),
    github: script && script.getAttribute('data-github'),
    email: script && script.getAttribute('data-email')
  };

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

  var year = new Date().getFullYear();
  var footerHTML =
    '<section id="footer">' +
      iconHTML() +
      '<ul class="copyright">' +
        '<li>© <span>'+year+'</span> Sanación &amp; Narcisismo</li>' +
        '<li>Design: <a href="http://html5up.net" target="_blank" rel="noopener">HTML5 UP</a></li>' +
      '</ul>' +
    '</section>';

  function inject() {
    // Prefer #site-footer if present, else append at end of body
    var container = document.getElementById('site-footer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-footer';
      document.body.appendChild(container);
    }
    container.innerHTML = footerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
