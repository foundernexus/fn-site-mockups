(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const q = (s, root = document) => root.querySelector(s);
  const all = (s, root = document) => [...root.querySelectorAll(s)];
  const params = new URLSearchParams(window.__VEN_PAGE_QUERY__ || window.__VEN_PAGE_QUERY__);

  const toggle = q('.v-menu-toggle');
  const nav = q('#v-primary-nav');
  const closeMenu = (focus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    const mark = q('span', toggle);
    if (mark) mark.textContent = '＋';
    if (focus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      const mark = q('span', toggle);
      if (mark) mark.textContent = open ? '−' : '＋';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    matchMedia('(min-width:1121px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  }

  const data = window.VEN_EXAMPLES || {roles: [], equation: []};
  const roleSelect = q('#role-example-select');
  if (roleSelect) {
    roleSelect.disabled = false;
    const showRole = (announce = false) => {
      const role = data.roles.find(r => r.key === roleSelect.value);
      if (!role) return;
      q('[data-role-challenge]').textContent = role.workedExample.challenge;
      q('[data-role-perspective]').textContent = role.workedExample.partner;
      q('[data-role-next]').textContent = role.workedExample.next;
      q('.v-example-challenge .v-note').textContent = 'Example · ' + role.label;
      const link = q('.v-role-detail-link');
      const rolePath = 'role-' + role.key + '.html';
      const routePrefix = (window.__VEN_FULL_ROUTE__ || '').replace(/[^/]*$/, '');
      link.href = window.__VEN_ROOT_URL__ && routePrefix
        ? window.__VEN_ROOT_URL__ + '#/' + routePrefix + rolePath
        : rolePath;
      link.textContent = role.supportCta + ' →';
      if (announce) q('[data-role-status]').textContent = role.label + ' example shown.';
    };
    if (data.roles.some(r => r.key === params.get('role'))) roleSelect.value = params.get('role');
    showRole();
    roleSelect.addEventListener('change', () => showRole(true));
  }
  const equationSelect = q('#equation-example-select');
  const showEquation = (announce = false) => {
    if (!equationSelect) return;
    const x = data.equation.find(item => item.key === equationSelect.value);
    if (!x) return;
    for (const [attr, key] of [['challenge','challenge'],['partner','partner'],['carry','carryForward']]) {
      const element = q('[data-equation-' + attr + ']');
      if (element) element.textContent = x[key];
    }
    const choice = q('[data-equation-next]');
    if (choice) choice.textContent = x.choice || x.next;
    const options = q('[data-equation-options]');
    if (options) {
      options.replaceChildren();
      for (const option of x.nextOptions || []) {
        const article = document.createElement('article');
        const title = document.createElement('h4');
        const body = document.createElement('p');
        title.textContent = option.title;
        body.textContent = option.body;
        article.append(title, body);
        options.append(article);
      }
    }
    const status = q('[data-equation-status]');
    if (status && announce) status.textContent = x.label + ' decision example shown.';
  };
  if (equationSelect) {
    equationSelect.disabled = false;
    showEquation();
    equationSelect.addEventListener('change', () => showEquation(true));
  }

  const form = q('[data-inquiry-form]');
  if (form) {
    const partner = form.id === 'partner-form';
    const review = q(partner ? '#partner-review' : '#request-review');
    const summary = q(partner ? '#partner-summary' : '#request-summary');
    const focusLabel = q('[data-partner-focus-label]');
    const updateType = () => {
      if (focusLabel) focusLabel.textContent = form.elements.type.value === 'vc' ? 'Where could your portfolio leaders use perspective?' : 'Who do you serve best?';
    };
    if (partner && ['advisor', 'vc'].includes(params.get('type'))) {
      form.elements.type.value = params.get('type');
    } else if (!partner) {
      if (['individual', 'team'].includes(params.get('intent'))) form.elements.intent.value = params.get('intent');
      const role = data.roles.find(r => r.key === params.get('role'));
      if (role) form.elements.role.value = role.label;
    }
    form.addEventListener('change', updateType);
    updateType();
    const names = {intent:'Exploring for',type:'Partnership',name:'Name',email:'Email',company:'Company or firm',role:'Role',stage:'Funding stage',priority:'Work to explore',focus:'Relevant audience and decisions',interest:'What to explore'};
    const values = {individual:'Myself',team:'My colleagues',advisor:'Advisor',vc:'Venture firm'};
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      summary.replaceChildren();
      for (const [key, raw] of new FormData(form)) {
        const value = String(raw).trim();
        if (!value) continue;
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = names[key] || key;
        dd.textContent = (key === 'intent' || key === 'type') ? values[value] || value : value;
        summary.append(dt, dd);
      }
      form.hidden = true;
      review.hidden = false;
      q('#review-title').focus();
    });
    q('[data-edit-request]').addEventListener('click', () => {
      review.hidden = true;
      form.hidden = false;
      q('#name').focus();
    });
    q('[data-clear-request]').addEventListener('click', () => {
      const clearedIntent = !partner ? form.elements.intent.value : null;
      form.reset();
      if (clearedIntent) form.elements.intent.value = clearedIntent;
      updateType();
      summary.replaceChildren();
      review.hidden = true;
      form.hidden = false;
      q('#name').focus();
    });
    form.hidden = false;
  }

  const copy = q('#copy-sponsor');
  if (copy) copy.disabled = false;
  if (copy) copy.addEventListener('click', async () => {
    const note = q('#sponsor-note');
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(note.innerText);
      q('#copy-status').textContent = 'Conversation starter copied.';
    } catch (_) {
      const range = document.createRange();
      range.selectNodeContents(note);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      q('#copy-status').textContent = 'Text selected. Use your usual copy command to copy it.';
    }
  });
  const print = q('#print-overview');
  if (print) print.disabled = false;
  if (print) print.addEventListener('click', () => window.print());

  for (const filter of all('[data-topic-filter]')) {
   filter.disabled = false;
   filter.addEventListener('click', () => {
    all('[data-topic-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
    const topic = filter.dataset.topicFilter;
    let count = 0;
    for (const event of all('#event-list .v-event')) {
      event.hidden = topic !== 'all' && event.dataset.topic !== topic;
      if (!event.hidden) count++;
    }
    q('#event-filter-status').textContent = count + (count === 1 ? ' session shown.' : ' sessions shown.');
   });
  }
})();
