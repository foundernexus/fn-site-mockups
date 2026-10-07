(() => {
  'use strict';
  const params = new URLSearchParams(window.__VEN_PAGE_QUERY__ || window.__VEN_PAGE_QUERY__);
  document.querySelectorAll('[data-engagement-gallery]').forEach(gallery => {
    const tabs = [...gallery.querySelectorAll('[role="tab"]')];
    const activate = (tab, moveFocus=false) => {
      tabs.forEach(item => {
        const chosen = item === tab;
        item.setAttribute('aria-selected', String(chosen));
        item.tabIndex = chosen ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !chosen;
      });
      if (moveFocus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        let next;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { e.preventDefault(); activate(tabs[next], true); }
      });
    });
    const requested = tabs.find(tab => tab.dataset.mode === params.get('format'));
    if (requested) activate(requested);
  });
  const form = document.querySelector('#membership-form');
  if (form) {
    const priority = document.querySelector('[data-inquiry-priority-label]');
    const title = document.querySelector('.v-page-head h1');
    const lead = document.querySelector('.v-page-head .v-lead');
    const updateIntent = () => {
      const team = form.elements.intent.value === 'team';
      priority.textContent = team ? 'Which leaders or operating challenges could use support? (optional)' : 'What are your top two challenges this month? (optional)';
      title.textContent = team ? 'Let’s talk about support for your team.' : 'Let’s start with your role and company.';
      lead.textContent = team ? 'Share who you’d like to support and the work they own. You don’t need to join yourself. Each eligible colleague has their own priorities and trial.' : 'Explore membership in the VEN community for yourself. We can discuss your current work, dedicated Partner, participation and individual trial.';
      form.elements.priority.placeholder = team ? 'A role or responsibility is enough to start.' : 'A sentence on each is plenty.';
      document.querySelector('[data-fit-detail="context"]').textContent = team ? 'The leaders you’d like to support, the work they own and your company context.' : 'Your role, company backing, milestones and current priorities.';
      document.querySelector('[data-fit-detail="support"]').textContent = team ? 'How each member’s dedicated Partner connects useful experience to their work.' : 'How your dedicated Partner connects useful experience to your work.';
      document.querySelector('[data-fit-detail="questions"]').textContent = team ? 'Participation, each colleague’s individual trial and the practical arrangements before deciding.' : 'Participation, your individual trial and the practical arrangements before deciding.';
    };
    form.addEventListener('change', updateIntent);
    form.addEventListener('reset', () => setTimeout(updateIntent, 0));
    updateIntent();
  }
})();