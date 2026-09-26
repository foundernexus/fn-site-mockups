import {calculate, formatScore, formatRatio} from './model.mjs';

const controls = ['decisions', 'score-a', 'score-b'].map(id => document.getElementById(id));
const presets = {small: [10, 80, 85], equal: [10, 80, 80], long: [20, 80, 85]};
const presetButtons = [...document.querySelectorAll('[data-preset]')];
let announcement;
const write = (id, text) => { document.getElementById(id).textContent = text; };

function render(announce = true) {
  const [n, a, b] = controls.map(control => Number(control.value));
  const model = calculate(n, a, b);
  write('decisions-value', n);
  write('score-a-value', a + ' / 100');
  write('score-b-value', b + ' / 100');
  controls[0].setAttribute('aria-valuetext', n + (n === 1 ? ' decision' : ' decisions'));
  controls[1].setAttribute('aria-valuetext', a + ' out of 100');
  controls[2].setAttribute('aria-valuetext', b + ' out of 100');
  write('ratio', formatRatio(model.ratio));
  write('mobile-ratio', formatRatio(model.ratio));
  document.getElementById('ratio').classList.toggle('compact', formatRatio(model.ratio).length > 7);
  document.getElementById('ratio').classList.toggle('undefined', model.ratio === null);
  write('result-a', formatScore(model.finalA));
  write('result-b', formatScore(model.finalB));
  const delta = b - a;
  const summary = (delta === 0 ? 'Same score' : Math.abs(delta) + '-point score ' + (delta > 0 ? 'increase' : 'decrease')) + ' across ' + n + (n === 1 ? ' decision' : ' decisions');
  write('assumption-summary', summary);
  const resultDescription = `Scenario A ends at ${formatScore(model.finalA)} and Scenario B at ${formatScore(model.finalB)}, out of 100, after ${n} decisions. Scores are illustrative, not success probabilities.`;
  write('chart-description', resultDescription);
  write('chart-end', 'Decision ' + n);
  write('result-note', model.ratio === null
    ? 'Scenario A has a zero score, so the ratio is undefined. The model scores are illustrative, not a forecast of company success.'
    : 'This ratio compares model scores. It is not a forecast of company success or a measured membership benefit.');
  for (const key of ['a', 'b']) {
    const points = model[key].map((score, i) => [42 + 496 * i / n, 192 - 172 * score / 100]);
    document.getElementById('line-' + key).setAttribute('d', points.map(([x, y], i) => (i ? 'L' : 'M') + x.toFixed(2) + ',' + y.toFixed(2)).join(' '));
    const end = document.getElementById('end-' + key);
    end.setAttribute('cx', points[n][0]);
    end.setAttribute('cy', points[n][1]);
  }
  presetButtons.forEach(button => button.setAttribute('aria-pressed', String(presets[button.dataset.preset].every((value, i) => value === Number(controls[i].value)))));
  clearTimeout(announcement);
  if (announce) announcement = setTimeout(() => write('result-status', summary + '. ' + resultDescription + ' Modeled ratio: ' + formatRatio(model.ratio) + '.'), 250);
}
function setExample(values) {
  controls.forEach((control, i) => { control.value = values[i]; });
  render();
}
controls.forEach(control => control.addEventListener('input', () => render()));
presetButtons.forEach(button => button.addEventListener('click', () => setExample(presets[button.dataset.preset])));
document.getElementById('reset').addEventListener('click', () => setExample(presets.small));
document.getElementById('login').addEventListener('click', () => document.getElementById('prototype-notice').showModal());
render(false);
