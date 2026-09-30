(() => {
  const controls = [...document.querySelectorAll('[data-topic-filter]')];
  const rows = [...document.querySelectorAll('.event-row')];
  const count = document.getElementById('events-count');
  if (!count) return;
  controls.forEach(button => button.addEventListener('click', () => {
    const topic = button.dataset.topicFilter;
    controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    let visible = 0;
    rows.forEach(row => {
      row.hidden = topic !== 'all' && row.dataset.topic !== topic;
      if (!row.hidden) visible++;
    });
    count.textContent = `${visible} upcoming ${visible === 1 ? 'session' : 'sessions'}${topic === 'all' ? '' : ' · ' + button.textContent}`;
  }));
})();
