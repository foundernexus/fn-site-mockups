import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate, formatScore, formatRatio} from './model.mjs';

test('the example computes the original multiplicative model without rounding inputs', () => {
  const result = calculate(10, 80, 85);
  assert.ok(Math.abs(result.finalA - 10.73741824) < 1e-10);
  assert.ok(Math.abs(result.finalB - 19.687440434072) < 1e-10);
  assert.equal(formatRatio(result.ratio), '1.83×');
  assert.equal(result.a.length, 11);
  assert.equal(result.a[0], 100);
});
test('equal, lower and perfect alternative scores are handled honestly', () => {
  assert.equal(calculate(10, 80, 80).ratio, 1);
  assert.ok(calculate(10, 85, 80).ratio < 1);
  assert.equal(calculate(30, 100, 100).finalB, 100);
  assert.equal(calculate(1, 80, 85).finalB, 85);
});
test('zero references and tiny scores never produce an infinite or misleading rounded multiplier', () => {
  assert.equal(calculate(10, 0, 85).ratio, null);
  assert.equal(calculate(10, 0, 0).ratio, null);
  assert.equal(calculate(10, 80, 0).ratio, 0);
  assert.equal(formatRatio(null), 'Not defined');
  assert.equal(formatScore(0), '0.00');
  assert.equal(formatScore(calculate(30, 1, 2).finalA), '<0.01');
  assert.equal(formatRatio(0.0001), '<0.01×');
  assert.equal(formatRatio(10000), '1.00e+4×');
});
test('longer sequences reduce the absolute scores while widening the ratio for a positive shift', () => {
  const shorter = calculate(10, 80, 85), longer = calculate(20, 80, 85);
  assert.ok(longer.finalB < shorter.finalB);
  assert.ok(longer.ratio > shorter.ratio);
});
test('invalid assumptions are rejected', () => {
  for (const args of [[0,80,85],[31,80,85],[1.5,80,85],[10,-1,85],[10,80,101],[10,NaN,85]]) {
    assert.throws(() => calculate(...args), RangeError);
  }
});
