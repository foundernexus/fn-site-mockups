// An illustrative multiplicative index, not a business-success probability.
export function calculate(decisions, scoreA, scoreB) {
  if (!Number.isInteger(decisions) || decisions < 1 || decisions > 30 ||
      ![scoreA, scoreB].every(value => Number.isFinite(value) && value >= 0 && value <= 100)) {
    throw new RangeError('Use 1–30 decisions and scores between 0 and 100.');
  }
  const series = score => Array.from({length: decisions + 1}, (_, i) => 100 * (score / 100) ** i);
  const a = series(scoreA), b = series(scoreB);
  return {a, b, finalA: a[decisions], finalB: b[decisions], ratio: a[decisions] === 0 ? null : b[decisions] / a[decisions]};
}

export function formatScore(value) {
  if (value > 0 && value < 0.01) return '<0.01';
  return value.toFixed(2);
}

export function formatRatio(value) {
  if (value === null) return 'Not defined';
  if (value > 0 && value < 0.01) return '<0.01×';
  if (value >= 1000) return value.toExponential(2) + '×';
  return value.toFixed(2) + '×';
}
