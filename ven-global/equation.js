(() => {
  const examples = {
    sales: { question: '“Should we add salespeople?”', experience: 'A peer who has scaled a similar sales motion.', decision: 'Check conversion bottlenecks before adding headcount.', value: 'Keep budget available until the team knows what to scale.' },
    marketing: { question: '“Which channel deserves more budget?”', experience: 'An operator who has tested channels at a similar stage.', decision: 'Run a focused test before making a larger commitment.', value: 'Put what you learn into the next budget decision.' },
    hiring: { question: '“Is this a hiring problem or an ownership problem?”', experience: 'A leader who has redesigned responsibilities while scaling.', decision: 'Clarify ownership before opening a new role.', value: 'Give the next hire a clearer remit and protect team capacity.' }
  };
  document.querySelectorAll('[data-example]').forEach(button => {
    button.addEventListener('click', () => {
      const example = examples[button.dataset.example];
      if (!example) return;
      document.querySelectorAll('[data-example]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      ['question', 'experience', 'decision', 'value'].forEach(key => {
        document.getElementById('example-' + key).textContent = example[key];
      });
    });
  });
})();
