import {calculate, formatPercent, formatRatio} from './model.mjs';
const inputs = ['decisions', 'baseline', 'supported', 'participants'].map(id => document.getElementById(id));
const defaults = [3, 80, 85, 4];
const write = (id, text) => { document.getElementById(id).textContent = text; };
let announcement;
function render(announce = true) {
  const [d, a, b, m] = inputs.map(input => Number(input.value));
  const result = calculate(d, a, b, m);
  write('decisions-value', d);
  write('baseline-value', a + '%');
  write('supported-value', b + '%');
  write('participants-value', m + ' of 4');
  write('assumption-summary', `${d} decisions per leader · ${a}% baseline → ${b}% with support`);
  inputs[0].setAttribute('aria-valuetext', d + ' decisions per leader');
  inputs[1].setAttribute('aria-valuetext', a + ' percent');
  inputs[2].setAttribute('aria-valuetext', b + ' percent');
  inputs[3].setAttribute('aria-valuetext', m + ' of 4 leaders');
  write('baseline-result', formatPercent(result.without));
  write('supported-result', formatPercent(result.withSupport));
  write('ratio', formatRatio(result.ratio));
  document.getElementById('ratio').classList.toggle('compact', formatRatio(result.ratio).length > 6);
  write('coverage', `${result.covered} of ${result.total} decisions`);
  write('mobile-result', formatPercent(result.withSupport));
  write('example-context', `Example assumptions: four leaders, ${d} ${d === 1 ? "decision" : "decisions"} each. Chance per decision: ${a}% without added support; ${b}% with it.`);
  write('result-caption', `Hypothetical probability that all ${result.total} modeled decisions achieve their intended outcome`);
  write('ratio-label', result.ratio === null ? 'Zero baseline; ratio undefined' : 'Relative likelihood in this model');
  write('coverage-note', b > a ? 'The higher assumed probability applies only to participating leaders’ decisions.' : b === a ? 'With equal assumptions, adding participants does not change the modeled result.' : 'With a lower support assumption, adding participants reduces the modeled result.');
  document.querySelectorAll('.leader-node').forEach((node, i) => node.classList.toggle('active', i < m));

  clearTimeout(announcement);
  if (announce) announcement = setTimeout(() => write('result-status', `${m} of 4 leaders participating. Baseline ${formatPercent(result.without)}. With support ${formatPercent(result.withSupport)}. Relative likelihood ${formatRatio(result.ratio)}. Hypothetical results, not company success odds.`), 250);
}
inputs.forEach(input => input.addEventListener('input', () => render()));
document.getElementById('reset').addEventListener('click', () => { inputs.forEach((input, i) => { input.value = defaults[i]; }); render(); });
document.getElementById('login').addEventListener('click', () => document.getElementById('prototype-notice').showModal());
render(false);
