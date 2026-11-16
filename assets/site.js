/* Fueno Coffee & Roastery — fuenoshop.com
   Tema, dil (TR/EN), navigasyon, galeri ve menü etkileşimleri. */
(function () {
  'use strict';

  var root = document.documentElement;
  var LS_THEME = 'fueno-theme';
  var LS_LANG = 'fueno-lang';

  /* Arama normalizasyonu — Türkçe harfleri ASCII'ye indirger, böylece
     "fistik" yazan da "FISTIKLI"yı bulur. build_site.py içindeki norm()
     ile birebir aynı davranmalı. setLang() bunu kullandığı için en üstte. */
  var FOLD = { 'ı':'i','İ':'i','I':'i','i':'i','ş':'s','Ş':'s','ğ':'g','Ğ':'g',
               'ü':'u','Ü':'u','ö':'o','Ö':'o','ç':'c','Ç':'c',
               'â':'a','Â':'a','î':'i','û':'u' };
  function normalize(v) {
    return String(v || '')
      .replace(/[ıİIişŞğĞüÜöÖçÇâÂîû]/g, function (ch) { return FOLD[ch]; })
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---------------------------------------------------------------- THEME */
  var themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    var dark = theme !== 'light';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(dark));
      themeBtn.querySelector('.sr-only').textContent =
        dark ? themeBtn.dataset.labelLight : themeBtn.dataset.labelDark;
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0B0908' : '#FBF8F3');
  }

  var storedTheme = null;
  try { storedTheme = localStorage.getItem(LS_THEME); } catch (e) {}
  applyTheme(storedTheme ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(LS_THEME, next); } catch (e) {}
    });
  }

  /* ----------------------------------------------------------------- I18N */
  var UI_EN = window.FUENO_UI_EN || {};
  var MENU_EN = window.FUENO_MENU_EN || [];
  var currentLang = 'tr';

  /* Türkçe metinler sayfada zaten var; ilk yüklemede önbelleğe alıyoruz. */
  var uiNodes = [].slice.call(document.querySelectorAll('[data-i18n]'));
  uiNodes.forEach(function (el) {
    var attr = el.dataset.i18nAttr;
    el.dataset.trCache = attr ? (el.getAttribute(attr) || '') : el.textContent;
  });

  var catNodes = [].slice.call(document.querySelectorAll('.category'));
  catNodes.forEach(function (cat) {
    var nameEl = cat.querySelector('.cat-name');
    if (nameEl) nameEl.dataset.trCache = nameEl.textContent;
    var cnt = cat.querySelector('.cat-count');
    if (cnt) cnt.dataset.tmplTr = cnt.dataset.tmpl;
    [].slice.call(cat.querySelectorAll('.product')).forEach(function (p) {
      var n = p.querySelector('.product-name');
      var d = p.querySelector('.product-desc');
      if (n) n.dataset.trCache = n.textContent;
      if (d) d.dataset.trCache = d.textContent;
      p.dataset.searchTr = p.dataset.search || '';
    });
  });

  function setLang(lang, persist) {
    currentLang = lang === 'en' ? 'en' : 'tr';
    var en = currentLang === 'en';
    root.setAttribute('lang', currentLang);

    uiNodes.forEach(function (el) {
      var key = el.dataset.i18n;
      var attr = el.dataset.i18nAttr;
      var val = en ? (UI_EN[key] != null ? UI_EN[key] : el.dataset.trCache) : el.dataset.trCache;
      if (attr) el.setAttribute(attr, val); else el.textContent = val;
    });

    catNodes.forEach(function (cat, ci) {
      var src = MENU_EN[ci];
      var nameEl = cat.querySelector('.cat-name');
      if (nameEl) nameEl.textContent = en && src ? src.name : nameEl.dataset.trCache;

      var cnt = cat.querySelector('.cat-count');
      if (cnt) {
        cnt.dataset.tmpl = en && UI_EN['menu.count'] ? UI_EN['menu.count'] : cnt.dataset.tmplTr;
        cnt.textContent = cnt.dataset.tmpl.replace('{n}', cat.dataset.total || '');
      }

      [].slice.call(cat.querySelectorAll('.product')).forEach(function (p, pi) {
        var item = src && src.products ? src.products[pi] : null;
        var n = p.querySelector('.product-name');
        var d = p.querySelector('.product-desc');
        if (n) n.textContent = en && item ? item.name : n.dataset.trCache;
        if (d) d.textContent = en && item ? (item.desc || '') : d.dataset.trCache;
        p.dataset.search = normalize(
          (n ? n.textContent : '') + ' ' + (d ? d.textContent : '') + ' ' +
          (nameEl ? nameEl.textContent : ''));
      });
    });

    document.title = en && UI_EN['meta.title'] ? UI_EN['meta.title'] : (document.body.dataset.titleTr || document.title);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      if (!desc.dataset.trCache) desc.dataset.trCache = desc.getAttribute('content');
      desc.setAttribute('content', en && UI_EN['meta.desc'] ? UI_EN['meta.desc'] : desc.dataset.trCache);
    }

    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
    });

    if (persist) {
      try { localStorage.setItem(LS_LANG, currentLang); } catch (e) {}
      var url = new URL(window.location.href);
      if (currentLang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      history.replaceState(null, '', url.toString() .replace(/\?$/, ''));
    }
    applySearch();
  }

  document.body.dataset.titleTr = document.title;

  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var savedLang = null;
  try { savedLang = localStorage.getItem(LS_LANG); } catch (e) {}
  var initialLang = urlLang || savedLang ||
    ((navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'tr');
  if (initialLang === 'en') setLang('en', false);
  else setLang('tr', false);

  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang, true); });
  });

  /* ------------------------------------------------------------ MOBILE NAV */
  var nav = document.getElementById('site-nav');
  var navToggle = document.getElementById('nav-toggle');
  var scrim = document.getElementById('nav-scrim');

  /* Çekmece açıkken başlık "yapışık" görünümüne geçmeli; aksi halde
     şeffaf başlığın açık renk yazıları beyaz çekmecenin üstünde kayboluyor. */
  function syncHeaderState(navOpen) {
    var h = document.querySelector('.site-header');
    if (!h) return;
    h.classList.toggle('is-stuck', navOpen || window.scrollY > 24);
    h.classList.toggle('nav-open', !!navOpen);
  }

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    syncHeaderState(false);
  }
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      if (scrim) scrim.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      syncHeaderState(open);
    });
  }
  if (scrim) scrim.addEventListener('click', closeNav);
  if (nav) nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });

  /* ------------------------------------------------------- HEADER / SPY */
  var header = document.querySelector('.site-header');
  var toTop = document.getElementById('to-top');
  var navLinks = [].slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 24 || (nav && nav.classList.contains('is-open')));
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    var active = null;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= 140) active = s.id; });
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + active);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------ HERO SLAYTI */
  var slides = [].slice.call(document.querySelectorAll('.hero-slide'));
  var dots = [].slice.call(document.querySelectorAll('.hero-dots button'));
  if (slides.length > 1) {
    var idx = 0, timer = null;
    var SLIDE_MS = 6500;

    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === idx)); });
    }
    function start() {
      stop();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(function () { show(idx + 1); }, SLIDE_MS);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); start(); });
    });
    /* Sekme arkaplandayken boşuna dönmesin. */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  /* --------------------------------------------------------------- REVEAL */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------- LIGHTBOX */
  var lb = document.getElementById('lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  var shots = [].slice.call(document.querySelectorAll('.gallery button'));
  var lbIndex = 0;

  function openLb(i) {
    if (!lb || !shots.length) return;
    lbIndex = (i + shots.length) % shots.length;
    var src = shots[lbIndex].dataset.full;
    var alt = shots[lbIndex].querySelector('img').alt;
    lbImg.src = src; lbImg.alt = alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  shots.forEach(function (b, i) { b.addEventListener('click', function () { openLb(i); }); });
  if (lb) {
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    lb.querySelector('.lightbox-close').addEventListener('click', closeLb);
    lb.querySelector('.prev').addEventListener('click', function (e) { e.stopPropagation(); openLb(lbIndex - 1); });
    lb.querySelector('.next').addEventListener('click', function (e) { e.stopPropagation(); openLb(lbIndex + 1); });
  }
  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('is-open')) {
      if (e.key === 'Escape') closeNav();
      return;
    }
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
    if (e.key === 'ArrowRight') openLb(lbIndex + 1);
  });

  /* ------------------------------------------------- MENU: accordion + search */
  catNodes.forEach(function (cat) {
    cat.addEventListener('toggle', function () {
      if (!cat.open) return;
      catNodes.forEach(function (o) { if (o !== cat) o.open = false; });
      setTimeout(function () {
        var top = cat.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }, 90);
    });
  });

  var search = document.getElementById('menu-search');
  var clearBtn = document.getElementById('menu-search-clear');
  var emptyMsg = document.getElementById('menu-search-empty');

  function applySearch() {
    if (!search) return;
    var q = normalize(search.value);
    var total = 0;
    catNodes.forEach(function (cat) {
      var shown = 0;
      [].slice.call(cat.querySelectorAll('.product')).forEach(function (p) {
        var vis = !q || (p.dataset.search || '').indexOf(q) !== -1;
        p.hidden = !vis;
        if (vis) shown++;
      });
      cat.hidden = Boolean(q) && shown === 0;
      cat.open = q ? shown > 0 : false;
      var c = cat.querySelector('.cat-count');
      if (c && c.dataset.tmpl) {
        c.textContent = c.dataset.tmpl.replace('{n}', q ? shown : (cat.dataset.total || shown));
      }
      total += shown;
    });
    if (clearBtn) clearBtn.hidden = !q;
    if (emptyMsg) emptyMsg.hidden = !q || total > 0;
  }

  if (search) {
    search.addEventListener('input', applySearch);
    clearBtn.addEventListener('click', function () {
      search.value = ''; applySearch(); search.focus();
    });
  }

  /* --------------------------------------------- boş iletişim satırlarını gizle */
  document.querySelectorAll('[data-hide-if-empty]').forEach(function (el) {
    var v = el.querySelector('.info-value');
    if (!v || !v.textContent.trim()) el.hidden = true;
  });
})();
