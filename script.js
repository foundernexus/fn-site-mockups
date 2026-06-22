const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");

toggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

const decisions = document.querySelector("#decisions");
const without = document.querySelector("#without");
const withFn = document.querySelector("#with");

const decisionValue = document.querySelector("#decisionValue");
const withoutValue = document.querySelector("#withoutValue");
const withValue = document.querySelector("#withValue");
const withoutResult = document.querySelector("#withoutResult");
const withResult = document.querySelector("#withResult");
const improvementResult = document.querySelector("#improvementResult");

function percent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function updateCalculator() {
  const n = Number(decisions.value);
  const base = Number(without.value) / 100;
  const improved = Number(withFn.value) / 100;
  const withoutProbability = Math.pow(base, n);
  const withProbability = Math.pow(improved, n);
  const improvement = withProbability / withoutProbability;

  decisionValue.textContent = n;
  withoutValue.textContent = `${without.value}%`;
  withValue.textContent = `${withFn.value}%`;
  withoutResult.textContent = percent(withoutProbability);
  withResult.textContent = percent(withProbability);
  improvementResult.textContent = `${Math.max(1, improvement).toFixed(0)}x`;
}

[decisions, without, withFn].forEach((input) => input?.addEventListener("input", updateCalculator));
updateCalculator();

document.querySelector(".application-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const original = button.innerHTML;
  button.innerHTML = "Interest saved locally<span aria-hidden=\"true\">✓</span>";
  window.setTimeout(() => {
    button.innerHTML = original;
  }, 1800);
});
