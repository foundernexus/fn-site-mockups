(() => {
  const button = document.querySelector('[data-copy-starter]');
  if (!button) return;
  const status = document.querySelector('[data-copy-starter-status]');
  button.addEventListener('click', async () => {
    const summary = document.querySelector('#request-summary');
    const rows = [...summary.querySelectorAll('dt')].map(dt => dt.textContent + ': ' + dt.nextElementSibling.textContent);
    const text = 'VEN conversation starter\n' + rows.join('\n');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Conversation starter copied. Nothing has been sent.'; }
    catch (_) { const range = document.createRange(); range.selectNodeContents(summary); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Details selected. Use your usual copy command. Nothing has been sent.'; }
  });
  document.querySelector('[data-clear-request]').addEventListener('click', () => {status.textContent = '';});
})();