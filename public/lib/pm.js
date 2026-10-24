// Project management for 築稿: a renovation schedule built from the design, crew assignment,
// site inspection checklists and payment milestones. Pure functions only, so they can be unit tested.

// Typical Taiwanese renovation sequence. days = fixed + per ping (3.3058 m²); `when` decides if the phase applies.
export const PHASES = [
  { key: 'demo', name: '保護與拆除', fixed: 2, per: .05, after: [], checks: ['地面、電梯與門框保護完成', '拆除範圍與保留項目確認', '廢棄物清運'] },
  { key: 'mep', name: '水電配管', fixed: 3, per: .12, after: ['demo'], checks: ['插座、開關位置與高度依圖放樣', '給排水管試壓（無滲漏）', '電箱迴路標示'] },
  { key: 'ac', name: '空調配管', fixed: 1, per: .03, after: ['mep'], when: s => s.ac > 0, checks: ['冷媒管保溫完整', '排水管坡度確認'] },
  { key: 'wet', name: '泥作與防水', fixed: 3, per: .05, perBath: 3, after: ['mep'], when: s => s.baths > 0 || s.tileRooms > 0, checks: ['浴室防水層施作並試水 24 小時', '磁磚排版依地坪分割圖', '洩水坡度確認'] },
  { key: 'wood', name: '木作天花與隔間', fixed: 4, per: .18, after: ['ac', 'wet'], checks: ['天花高度依天花平面圖', '燈具、冷氣出風口開孔位置', '間接燈槽尺寸確認'] },
  { key: 'paint', name: '油漆', fixed: 4, per: .12, after: ['wood'], checks: ['批土研磨平整', '牆面色號依材質板', '收邊與矽利康'] },
  { key: 'floor', name: '地坪', fixed: 2, per: .08, after: ['paint'], checks: ['地坪材質與色號確認', '踢腳板收邊', '門片與地坪間隙'] },
  { key: 'cab', name: '系統櫃安裝', fixed: 2, per: 0, perCab: .4, after: ['floor'], when: s => s.cabs > 0, checks: ['櫃體尺寸與立面圖相符', '門片水平與五金調整', '吊衣桿與抽屜滑軌順暢'] },
  { key: 'fit', name: '燈具與衛浴設備', fixed: 2, per: .02, after: ['cab', 'floor'], checks: ['燈具色溫與點位', '衛浴設備安裝與排水測試', '開關迴路測試'] },
  { key: 'clean', name: '家具進場與細清', fixed: 2, per: .02, after: ['fit'], checks: ['家具尺寸與擺放位置', '全室細清'] },
  { key: 'handover', name: '驗收交屋', fixed: 1, per: 0, after: ['clean'], checks: ['屋主驗收清單簽認', '保固書與使用說明交付'] }
];
export const PAYS = [['簽約訂金', 30, ''], ['水電完成', 30, 'mep'], ['木作完成', 30, 'wood'], ['驗收尾款', 10, 'handover']];

const id = () => Math.random().toString(36).slice(2, 10);
// s: { ping, baths, tileRooms, ac, cabs }
export function defaultPlan(s, start) {
  const keys = new Set(PHASES.filter(p => !p.when || p.when(s)).map(p => p.key)), byKey = {};
  const tasks = PHASES.filter(p => keys.has(p.key)).map(p => {
    const days = Math.max(1, Math.round(p.fixed + p.per * s.ping + (p.perBath || 0) * s.baths + (p.perCab || 0) * s.cabs));
    const t = { id: id(), key: p.key, name: p.name, days, after: [], crew: '', phone: '', done: false, checks: p.checks.map(text => ({ id: id(), text, ok: false })) };
    byKey[p.key] = t; return t;
  });
  // dependencies on skipped phases fall through to whatever those phases depended on
  const resolve = k => keys.has(k) ? [k] : (PHASES.find(p => p.key === k)?.after || []).flatMap(resolve);
  for (const t of tasks) t.after = [...new Set(PHASES.find(p => p.key === t.key).after.flatMap(resolve))].map(k => byKey[k].id);
  const pays = PAYS.map(([name, pct, k]) => ({ id: id(), name, pct, after: k && byKey[k] ? byKey[k].id : '', paid: false }));
  return { start, tasks, pays };
}

// dates are YYYY-MM-DD; work happens Monday to Saturday unless `sundays` is true
export const toDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const fromDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export function addWorkdays(d, n, sundays = false) {
  const r = new Date(d); let left = n;
  while (left > 0) { r.setDate(r.getDate() + 1); if (sundays || r.getDay() !== 0) left--; }
  return r;
}
export function firstWorkday(d, sundays = false) { const r = new Date(d); while (!sundays && r.getDay() === 0) r.setDate(r.getDate() + 1); return r; }

// earliest start for every task from its dependencies; returns { rows, end, days } with start/end per task (end inclusive)
export function schedule(plan, sundays = false) {
  const byId = new Map(plan.tasks.map(t => [t.id, t])), memo = new Map(), base = firstWorkday(toDate(plan.start), sundays);
  const startOf = (t, seen = new Set()) => {
    if (memo.has(t.id)) return memo.get(t.id); if (seen.has(t.id)) return base; seen.add(t.id);
    let s = base;
    for (const a of t.after || []) { const p = byId.get(a); if (!p) continue; const e = endOf(p, seen), n = addWorkdays(e, 1, sundays); if (n > s) s = n; }
    memo.set(t.id, s); return s;
  };
  const endOf = (t, seen) => addWorkdays(startOf(t, seen), Math.max(1, t.days) - 1, sundays);
  const rows = plan.tasks.map(t => { const s = startOf(t), e = endOf(t, new Set()); return { t, start: fromDate(s), end: fromDate(e) }; });
  const end = rows.reduce((m, r) => r.end > m ? r.end : m, fromDate(base));
  const days = Math.round((toDate(end) - base) / 864e5) + 1;
  return { rows, start: fromDate(base), end, days };
}

export function payments(plan, total) {
  return plan.pays.map(p => ({ ...p, amount: Math.round(total * p.pct / 100) }));
}
