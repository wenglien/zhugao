import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultPlan, schedule, payments, addWorkdays, toDate, fromDate } from '../../public/lib/pm.js';

const stats = { ping: 30, baths: 2, tileRooms: 2, ac: 2, cabs: 6 };

test('default plan follows the renovation sequence and skips phases that do not apply', () => {
  const full = defaultPlan(stats, '2026-11-02');
  assert.equal(full.tasks[0].name, '保護與拆除');
  assert.equal(full.tasks.at(-1).name, '驗收交屋');
  const bare = defaultPlan({ ping: 10, baths: 0, tileRooms: 0, ac: 0, cabs: 0 }, '2026-11-02');
  assert.ok(!bare.tasks.some(t => t.key === 'ac' || t.key === 'wet' || t.key === 'cab'));
  // woodwork normally waits for AC and wet work; with both skipped it falls back to plumbing and electrical
  const wood = bare.tasks.find(t => t.key === 'wood'), mep = bare.tasks.find(t => t.key === 'mep');
  assert.deepEqual(wood.after, [mep.id]);
});

test('tasks start after their dependencies and skip Sundays', () => {
  const plan = { start: '2026-11-01', tasks: [{ id: 'a', days: 3, after: [] }, { id: 'b', days: 2, after: ['a'] }, { id: 'c', days: 1, after: [] }], pays: [] };
  const s = schedule(plan), row = id => s.rows.find(r => r.t.id === id);
  assert.equal(s.start, '2026-11-02', '2026-11-01 is a Sunday, work starts Monday');
  assert.equal(row('a').start, '2026-11-02'); assert.equal(row('a').end, '2026-11-04');
  assert.equal(row('b').start, '2026-11-05'); assert.equal(row('b').end, '2026-11-06');
  assert.equal(row('c').start, '2026-11-02');
  const sat = addWorkdays(toDate('2026-11-07'), 1); assert.equal(fromDate(sat), '2026-11-09', 'Saturday + 1 workday skips Sunday');
  assert.equal(fromDate(addWorkdays(toDate('2026-11-07'), 1, true)), '2026-11-08', 'Sunday counts when Sunday work is on');
});

test('a dependency cycle does not hang', () => {
  const plan = { start: '2026-11-02', tasks: [{ id: 'a', days: 1, after: ['b'] }, { id: 'b', days: 1, after: ['a'] }], pays: [] };
  const s = schedule(plan); assert.equal(s.rows.length, 2);
});

test('payment milestones split the total and default to 100%', () => {
  const plan = defaultPlan(stats, '2026-11-02'), ps = payments(plan, 1000000);
  assert.equal(ps.reduce((a, p) => a + p.pct, 0), 100);
  assert.equal(ps.reduce((a, p) => a + p.amount, 0), 1000000);
  assert.ok(ps.slice(1).every(p => plan.tasks.some(t => t.id === p.after)));
});
