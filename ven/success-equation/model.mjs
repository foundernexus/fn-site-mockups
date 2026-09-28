// Hypothetical probability of all independent modeled decisions meeting their intended outcomes.
// This is not an estimate of company success or measured membership effectiveness.
export function calculate(perLeader, baseline, supported, participants, teamSize = 4) {
  if (!Number.isInteger(perLeader) || perLeader < 1 || perLeader > 10 ||
      !Number.isInteger(teamSize) || teamSize < 1 || teamSize > 10 ||
      !Number.isInteger(participants) || participants < 0 || participants > teamSize ||
      ![baseline, supported].every(v => Number.isFinite(v) && v >= 0 && v <= 100)) {
    throw new RangeError('Invalid decision, team or probability assumptions.');
  }
  const total = perLeader * teamSize, covered = perLeader * participants;
  const a = baseline / 100, b = supported / 100;
  const without = a ** total;
  const withSupport = b ** covered * a ** (total - covered);
  return {total, covered, without, withSupport, fullTeam: b ** total,
    ratio: without === 0 ? null : withSupport / without};
}
export function formatPercent(value) {
  const percent = value * 100;
  return percent > 0 && percent < 0.01 ? '<0.01%' : percent.toFixed(2) + '%';
}
export function formatRatio(value) {
  if (value === null) return 'Undefined';
  if (value > 0 && value < 0.01) return '<0.01×';
  if (value >= 1000) return value.toExponential(1) + '×';
  return value.toFixed(2) + '×';
}
