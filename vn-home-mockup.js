const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
function closeMenu() { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
toggle.addEventListener('click', () => { const open = header.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-path]').forEach(link => link.addEventListener('click', () => { document.querySelector('#interest-path').value = link.dataset.path; }));
const dialog = document.querySelector('#session-dialog');
document.querySelectorAll('[data-session]').forEach(button => button.addEventListener('click', () => { document.querySelector('#session-title').textContent = button.dataset.session; dialog.showModal(); }));
document.querySelector('#dialog-done').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-partner').addEventListener('click', () => {
  const title = document.querySelector('#session-title').textContent;
  const decision = document.querySelector('[name="decision"]');
  if (decision && !decision.value.trim()) decision.value = title;
  document.querySelector('#interest-path').value = 'Individual membership';
  dialog.close();
});
document.querySelector('#interest-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#interest-status');
  const decision = event.target.decision.value.trim();
  status.hidden = false;
  status.textContent = decision
    ? 'Preview complete. In the live flow, FounderNexus would follow up about that decision, confirm your company and role, and arrange a conversation. Nothing has been sent or saved.'
    : 'Preview complete. In the live flow, FounderNexus would follow up to confirm your company and role and arrange a conversation. Nothing has been sent or saved.';
  status.focus();
});
