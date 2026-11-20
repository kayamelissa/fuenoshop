/* Fueno çerez onayı — Google Consent Mode v2 + Meta Pixel consent */
(function () {
  var KEY = 'fueno_consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    var g = v === 'granted' ? 'granted' : 'denied';
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g
      });
    }
    if (window.fbq) { window.fbq('consent', g === 'granted' ? 'grant' : 'revoke'); }
    (window.dataLayer = window.dataLayer || []).push({ event: 'consent_update', consent_state: g });
  }
  var en = (document.documentElement.lang || '').indexOf('en') === 0 ||
           /[?&]lang=en/.test(location.search);
  var T = en ? {
    text: 'We use cookies to measure site traffic and to show you relevant ads. You can accept or reject non-essential cookies.',
    more: 'Privacy & cookie policy', yes: 'Accept', no: 'Reject', prefs: 'Cookie settings'
  } : {
    text: 'Site trafiğini ölçmek ve size uygun reklamlar gösterebilmek için çerez kullanıyoruz. Zorunlu olmayan çerezleri kabul edebilir ya da reddedebilirsiniz.',
    more: 'Gizlilik ve çerez politikası', yes: 'Kabul et', no: 'Reddet', prefs: 'Çerez tercihleri'
  };
  var css = '#fueno-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
    'background:#141010;color:#F7F1E8;border:1px solid rgba(247,241,232,.14);border-radius:14px;' +
    'box-shadow:0 18px 50px -20px rgba(0,0,0,.75);padding:18px 20px;font:14px/1.5 Inter,system-ui,sans-serif}' +
    '#fueno-cc p{margin:0 0 12px}#fueno-cc a{color:#E4C99B}' +
    '#fueno-cc .b{display:flex;gap:10px;flex-wrap:wrap}' +
    '#fueno-cc button{flex:1 1 120px;min-height:44px;border-radius:999px;font:600 14px Inter,system-ui,sans-serif;cursor:pointer;border:1px solid #C9A87C}' +
    '#fueno-cc .y{background:#C9A87C;color:#16100A}#fueno-cc .n{background:transparent;color:#F7F1E8}';
  function style() {
    if (document.getElementById('fueno-cc-style')) return;
    var s = document.createElement('style'); s.id = 'fueno-cc-style'; s.textContent = css;
    document.head.appendChild(s);
  }
  function close() { var b = document.getElementById('fueno-cc'); if (b) b.remove(); }
  function choose(v) { set(v); apply(v); close(); }
  function banner() {
    style();
    if (document.getElementById('fueno-cc')) return;
    var d = document.createElement('div');
    d.id = 'fueno-cc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-live', 'polite');
    d.setAttribute('aria-label', T.prefs);
    d.innerHTML = '<p>' + T.text + ' <a href="/gizlilik/">' + T.more + '</a></p>' +
      '<div class="b"><button type="button" class="n">' + T.no + '</button>' +
      '<button type="button" class="y">' + T.yes + '</button></div>';
    d.querySelector('.y').addEventListener('click', function () { choose('granted'); });
    d.querySelector('.n').addEventListener('click', function () { choose('denied'); });
    document.body.appendChild(d);
  }
  window.fuenoCookieSettings = banner;
  function init() {
    if (!get()) banner();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); banner(); }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
