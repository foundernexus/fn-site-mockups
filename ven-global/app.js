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
}

const decisions = {
  customers: { role: 'Win customers · Marketing, sales and customer leaders', title: '“Where is growth getting stuck?”', context: 'Demand is coming in, but too few prospects become lasting customers.', support: 'Leaders who have worked through acquisition, sales handoffs or retention at a similar stage.', next: 'Identify the weakest handoff and choose one change to test before adding spend.' },
  delivery: { role: 'Scale delivery · Engineering, operations and customer leaders', title: '“Why are commitments outpacing capacity?”', context: 'New tools are in place, but work still gets stuck between teams.', support: 'Operators who have untangled similar handoffs across delivery, engineering and customer teams.', next: 'Locate the bottleneck and clarify the handoff before adding another tool or process.' },
  team: { role: 'Build the team · People leaders, functional leaders and CEOs', title: '“Another hire, or clearer ownership?”', context: 'The company has grown. Responsibilities have not kept pace.', support: 'Leaders who have redesigned responsibilities and made senior hires at a similar stage.', next: 'Define what needs an owner, then decide whether to develop, reorganize or hire.' },
  capital: { role: 'Allocate capital · Finance, operations and functional leaders', title: '“What should we fund, postpone or stop?”', context: 'Several priorities look promising. The budget cannot stretch to all of them.', support: 'Leaders who have weighed similar growth investments against runway and operating constraints.', next: 'Set decision criteria and identify which investment needs more evidence before a commitment.' },
  direction: { role: 'Choose what’s next · Strategy, product, marketing leaders and CEOs', title: '“Is this opportunity worth changing our priorities?”', context: 'A new market or product opportunity competes with the plan already underway.', support: 'Leaders who have tested adjacent opportunities while protecting their core business.', next: 'Define a focused test and the evidence that would justify a larger commitment.' }
};

document.querySelectorAll('.role-button').forEach(button => {
  button.addEventListener('click', () => {
    const decision = decisions[button.dataset.role];
    if (!decision) return;
    document.querySelectorAll('.role-button').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    ['role', 'title', 'context', 'support', 'next'].forEach(key => {
      const target = document.getElementById('decision-' + key);
      if (target) target.textContent = decision[key];
    });
  });
});

document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
