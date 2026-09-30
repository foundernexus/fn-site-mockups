'use strict';

const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
if (menuButton && primaryNav) {
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); primaryNav.classList.remove('is-open'); };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('is-open', !isOpen);
  });
  primaryNav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 1201px)').addEventListener('change', closeMenu);
  document.querySelector('.site-header').classList.add('menu-ready');
}

// The examples remain ordinary, complete articles until enhancement is ready.
// The shortlist is held only in this page's memory, with no storage or requests.
const explorer = document.querySelector('.challenge-explorer');
const shortlist = document.querySelector('.challenge-shortlist');
if (explorer && shortlist) {
  const triggers = Array.from(explorer.querySelectorAll('[data-challenge]'));
  const situations = Array.from(explorer.querySelectorAll('[data-situation]'));
  const saveButtons = Array.from(explorer.querySelectorAll('[data-keep]'));
  const items = shortlist.querySelector('.shortlist-items');
  const status = shortlist.querySelector('.shortlist-status');
  const inquiryLink = shortlist.querySelector('.shortlist-link');
  const clearButton = shortlist.querySelector('.shortlist-clear');
  const selected = [];
  const byKey = new Map(situations.map(panel => [panel.dataset.situation, panel]));
  let viewingKey = triggers[0] && triggers[0].dataset.challenge;

  const renderShortlist = () => {
    items.replaceChildren();
    for (let i = 0; i < 2; i += 1) {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'slot-number';
      number.textContent = '0' + (i + 1);
      item.append(number);
      const key = selected[i];
      const label = document.createElement('span');
      if (key) {
        const panel = byKey.get(key);
        label.textContent = panel.dataset.question;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'shortlist-remove';
        remove.textContent = '×';
        remove.setAttribute('aria-label', 'Remove ' + panel.dataset.category.toLowerCase() + ' question');
        remove.addEventListener('click', () => {
          selected.splice(selected.indexOf(key), 1);
          renderShortlist();
          // The initiating control is removed. Return focus to an existing
          // question control rather than letting the browser lose the focus.
          const trigger = triggers.find(button => button.dataset.challenge === key);
          if (trigger) trigger.focus();
        });
        item.append(label, remove);
      } else {
        item.className = 'is-empty';
        label.textContent = i === 0 ? 'A question to start with' : 'Room for one more';
        item.append(label);
      }
      items.append(item);
    }
    saveButtons.forEach(button => {
      const kept = selected.includes(button.dataset.keep);
      button.setAttribute('aria-pressed', String(kept));
      button.textContent = kept ? 'Remove this question' : 'Keep this question';
    });
    status.textContent = selected.length === 2
      ? 'Two questions kept. Remove one to choose another.'
      : selected.length === 1
        ? 'One question kept. You can add one more.'
        : 'None yet. Choose a question that sounds familiar.';
    clearButton.disabled = selected.length === 0;
    const query = new URLSearchParams({ intent: 'individual' });
    if (selected.length) query.set('challenges', selected.join(','));
    inquiryLink.href = 'apply.html?' + query.toString();
    const text = document.createTextNode(selected.length ? 'Explore membership with these questions ' : 'Bring your own challenges ');
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    inquiryLink.replaceChildren(text, arrow);
  };

  const showSituation = key => {
    if (!byKey.has(key)) return;
    viewingKey = key;
    triggers.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.challenge === key)));
    situations.forEach(panel => { panel.hidden = panel.dataset.situation !== key; });
  };

  triggers.forEach(button => {
    button.addEventListener('click', () => showSituation(button.dataset.challenge));
  });
  saveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.keep;
      const savedIndex = selected.indexOf(key);
      if (savedIndex !== -1) selected.splice(savedIndex, 1);
      else if (selected.length < 2) selected.push(key);
      else {
        status.textContent = 'You have two questions already. Remove one before keeping another.';
        return;
      }
      renderShortlist();
    });
  });
  clearButton.addEventListener('click', () => {
    selected.length = 0;
    renderShortlist();
    const currentSave = saveButtons.find(button => button.dataset.keep === viewingKey);
    if (currentSave) currentSave.focus();
  });
  // These steps come last so a failed enhancement leaves every example readable.
  situations.forEach(panel => {
    panel.querySelector('h3').textContent = panel.dataset.category;
    panel.querySelector('.eyebrow').textContent = panel.querySelector('.eyebrow').textContent.split(' · ')[0];
    panel.setAttribute('aria-labelledby', 'challenge-' + panel.dataset.situation);
  });
  explorer.querySelector('.challenge-index').hidden = false;
  saveButtons.forEach(button => { button.hidden = false; });
  shortlist.hidden = false;
  renderShortlist();
  showSituation(viewingKey);
  explorer.classList.add('is-enhanced');
}

document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
