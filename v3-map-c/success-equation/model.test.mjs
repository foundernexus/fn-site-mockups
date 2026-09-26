import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate, formatPercent, formatRatio} from './model.mjs';
test('one participant changes only their three decisions in a fixed four-leader team', () => {
  const r = calculate(3,80,85,1);
  assert.equal(r.total,12); assert.equal(r.covered,3);
  assert.ok(Math.abs(r.withSupport - .85 ** 3 * .8 ** 9) < 1e-12);
  assert.equal(formatPercent(r.without),'6.87%');
  assert.equal(formatPercent(r.withSupport),'8.24%');
  assert.equal(formatRatio(r.ratio),'1.20×');
});
test('participation changes coverage, not total decisions or per-decision uplift', () => {
  const one=calculate(3,80,85,1), all=calculate(3,80,85,4);
  assert.equal(one.total,all.total); assert.equal(all.covered,12);
  assert.equal(all.withSupport,all.fullTeam);
  assert.equal(formatPercent(all.withSupport),'14.22%');
  assert.equal(formatRatio(all.ratio),'2.07×');
});
test('participation alone cannot manufacture improvement', () => {
  assert.equal(calculate(3,80,85,0).ratio,1);
  assert.equal(calculate(3,80,80,4).ratio,1);
  assert.ok(calculate(3,85,80,4).withSupport < calculate(3,85,80,1).withSupport);
});
test('zero, perfect and tiny probabilities remain valid', () => {
  assert.equal(calculate(3,0,85,1).ratio,null);
  assert.equal(calculate(3,0,85,1).withSupport,0);
  assert.equal(calculate(3,0,85,4).withSupport,.85 ** 12);
  assert.equal(calculate(3,80,0,4).withSupport,0);
  assert.equal(calculate(10,100,100,4).withSupport,1);
  assert.equal(formatPercent(0),'0.00%');
  assert.equal(formatPercent(.0000001),'<0.01%');
  assert.equal(formatRatio(null),'Undefined');
});
test('invalid inputs are rejected', () => {
  for(const args of [[0,80,85,1],[11,80,85,1],[3,101,85,1],[3,80,-1,1],[3,80,85,5],[3,80,85,-1],[3,80,85,1.5],[3,NaN,85,1]]) assert.throws(()=>calculate(...args),RangeError);
});
