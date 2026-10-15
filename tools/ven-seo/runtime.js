(() => {
  'use strict';
  const node = document.getElementById('ven-page-context');
  if (!node) return;
  const context = JSON.parse(node.textContent);
  const base = new URL(context.basePath, location.origin);
  const virtual = 'https://ven.local/';
  const directory = new Set(['clean/experts.html', 'clean/experts-2.html']);

  function destination(route, search = '', hash = '') {
    const query = new URLSearchParams(search);
    if (directory.has(route) && query.has('page')) {
      const requested = Number(query.get('page'));
      const page = Math.min(context.advisorPages, Math.max(1, Number.isInteger(requested) ? requested : 1));
      route = page === 1 ? 'clean/experts.html' : 'clean/experts-2.html';
      query.delete('page');
    }
    if (!Object.prototype.hasOwnProperty.call(context.routes, route)) return null;
    const url = new URL(context.routes[route], base);
    url.search = query.toString();
    url.hash = hash;
    return url.href;
  }

  function legacyTarget(hash, outerSearch = '') {
    if (!hash.startsWith('#/')) return null;
    const legacy = new URL(hash.slice(2).replace(/%23/gi, '#'), virtual);
    const query = new URLSearchParams(outerSearch);
    for (const [key, value] of legacy.searchParams) query.set(key, value);
    return destination(legacy.pathname.slice(1), query.toString(), legacy.hash);
  }

  function localTarget(href) {
    if (!href || /^(mailto:|tel:|data:|blob:|javascript:|\/\/)/i.test(href)) return null;
    if (href.startsWith('#/')) return legacyTarget(href, location.search);
    if (href.startsWith('#')) return null;
    if (/^https?:/i.test(href)) {
      const url = new URL(href);
      if (url.origin === base.origin && [base.pathname, base.pathname + 'index.html'].includes(url.pathname)) {
        return legacyTarget(url.hash, url.search);
      }
      return null;
    }
    const url = new URL(href, virtual + context.route + location.search);
    return destination(url.pathname.slice(1), url.search, url.hash);
  }

  function redirectLegacy() {
    const target = legacyTarget(location.hash, location.search);
    if (target && target !== location.href) {
      location.replace(target);
      return true;
    }
    return false;
  }

  window.__VEN_ROOT_URL__ = base.href;
  window.__VEN_PAGE_ROUTE__ = context.route.split('/').pop();
  window.__VEN_FULL_ROUTE__ = context.route;
  window.__VEN_PAGE_QUERY__ = location.search;
  window.__VEN_SEO_TITLE__ = context.title;
  window.__VEN_HAS_PAGE__ = target => !!localTarget(target);
  window.__VEN_NAVIGATE__ = target => { const next = localTarget(target); if (next) location.assign(next); };
  window.__VEN_REDIRECT__ = target => { const next = localTarget(target); if (next) location.replace(next); };

  if (redirectLegacy()) return;
  if (directory.has(context.route) && new URLSearchParams(location.search).has('page')) {
    const target = destination(context.route, location.search, location.hash);
    if (target && target !== location.href) { location.replace(target); return; }
  }

  function rewrite(link) {
    const target = localTarget(link.getAttribute('href'));
    if (target) link.setAttribute('href', target);
  }
  function rewriteAll(root) {
    if (root.matches?.('a[href]')) rewrite(root);
    root.querySelectorAll?.('a[href]').forEach(rewrite);
  }
  rewriteAll(document);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') rewrite(record.target);
      else record.addedNodes.forEach(node => { if (node.nodeType === 1) rewriteAll(node); });
    }
  });
  observer.observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['href']});
  addEventListener('hashchange', redirectLegacy);
})();
