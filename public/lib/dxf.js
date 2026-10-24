// DXF interchange for 築稿: a writer for AutoCAD R12 ASCII DXF (readable by every CAD program)
// and a reader that flattens LINE, POLYLINE, LWPOLYLINE, ARC, CIRCLE, SPLINE, TEXT, MTEXT and block
// references into plain segments and texts. Plan coordinates are mm with y pointing down; DXF y points up.

const esc = s => String(s ?? '').replace(/[\r\n]+/g, ' ').replace(/[^\x20-\x7e]/g, c => '\\U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
const num = v => (Math.round(v * 1000) / 1000).toString();

export class DxfWriter {
  constructor() { this.layers = new Map([['0', 7]]); this.out = []; this.min = [Infinity, Infinity]; this.max = [-Infinity, -Infinity]; }
  layer(name, color = 7) { if (!this.layers.has(name)) this.layers.set(name, color); return this; }
  pt(code, x, y) { const Y = -y; this.min = [Math.min(this.min[0], x), Math.min(this.min[1], Y)]; this.max = [Math.max(this.max[0], x), Math.max(this.max[1], Y)]; this.out.push(code, num(x), code + 10, num(Y)); }
  head(type, layer, ltype) { this.layer(layer); this.out.push(0, type, 8, layer); if (ltype) this.out.push(6, ltype); }
  line(layer, x1, y1, x2, y2, ltype) { if (Math.hypot(x2 - x1, y2 - y1) < .01) return; this.head('LINE', layer, ltype); this.pt(10, x1, y1); this.pt(11, x2, y2); }
  poly(layer, pts, closed = false, ltype) {
    if (pts.length < 2) return; this.head('POLYLINE', layer, ltype); this.out.push(66, 1, 10, 0, 20, 0, 70, closed ? 1 : 0);
    for (const [x, y] of pts) { this.out.push(0, 'VERTEX', 8, layer); this.pt(10, x, y); }
    this.out.push(0, 'SEQEND', 8, layer);
  }
  circle(layer, x, y, r) { this.head('CIRCLE', layer); this.pt(10, x, y); this.out.push(40, num(r)); }
  // a0/a1 are plan angles in radians (y down); DXF arcs run counter-clockwise in degrees with y up
  arc(layer, x, y, r, a0, a1, ltype) { this.head('ARC', layer, ltype); this.pt(10, x, y); this.out.push(40, num(r), 50, num(-a1 * 180 / Math.PI), 51, num(-a0 * 180 / Math.PI)); }
  text(layer, x, y, h, str, rot = 0, align = 'left') {
    if (!str) return; this.head('TEXT', layer); this.pt(10, x, y); this.out.push(40, num(h), 1, esc(str));
    if (rot) this.out.push(50, num(-rot * 180 / Math.PI));
    if (align !== 'left') { this.out.push(72, align === 'center' ? 1 : 2, 73, 2); this.pt(11, x, y); }
  }
  toString() {
    const o = [], p = (...a) => { for (let i = 0; i < a.length; i += 2) o.push(String(a[i]), String(a[i + 1])); };
    const [x0, y0] = isFinite(this.min[0]) ? this.min : [0, 0], [x1, y1] = isFinite(this.max[0]) ? this.max : [1000, 1000];
    p(0, 'SECTION', 2, 'HEADER', 9, '$ACADVER', 1, 'AC1009', 9, '$INSUNITS', 70, 4, 9, '$MEASUREMENT', 70, 1, 9, '$EXTMIN', 10, num(x0), 20, num(y0), 9, '$EXTMAX', 10, num(x1), 20, num(y1), 0, 'ENDSEC');
    p(0, 'SECTION', 2, 'TABLES');
    p(0, 'TABLE', 2, 'LTYPE', 70, 2);
    p(0, 'LTYPE', 2, 'CONTINUOUS', 70, 0, 3, 'Solid line', 72, 65, 73, 0, 40, 0);
    p(0, 'LTYPE', 2, 'DASHED', 70, 0, 3, '__ __ __', 72, 65, 73, 2, 40, 300, 49, 200, 49, -100);
    p(0, 'ENDTAB');
    p(0, 'TABLE', 2, 'LAYER', 70, this.layers.size);
    for (const [name, color] of this.layers) p(0, 'LAYER', 2, esc(name), 70, 0, 62, color, 6, 'CONTINUOUS');
    p(0, 'ENDTAB', 0, 'ENDSEC');
    p(0, 'SECTION', 2, 'ENTITIES'); for (let i = 0; i < this.out.length; i += 2) o.push(String(this.out[i]), String(this.out[i + 1])); p(0, 'ENDSEC', 0, 'EOF');
    return o.join('\r\n') + '\r\n';
  }
}

/* ---------------- reader ---------------- */
const UNIT_MM = { 0: 1, 1: 25.4, 2: 304.8, 4: 1, 5: 10, 6: 1000, 14: 100 };
// DXF files saved by Traditional Chinese AutoCAD are often Big5 rather than UTF-8
export function decodeDxf(buf) {
  const head = new TextDecoder('latin1').decode(buf.slice(0, Math.min(buf.byteLength, 4000)));
  const big5 = /\$DWGCODEPAGE\s*\r?\n\s*3\s*\r?\n\s*ANSI_950/i.test(head);
  let text = new TextDecoder(big5 ? 'big5' : 'utf-8').decode(buf);
  if (!big5 && text.includes('�')) { try { text = new TextDecoder('big5').decode(buf); } catch (e) { /* keep utf-8 */ } }
  return text;
}
const unesc = s => s.replace(/\\U\+([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
const cleanMtext = s => unesc(s).replace(/\\P/g, ' ').replace(/\\[A-Za-z][^;\\{}]*;/g, '').replace(/\\[~]/g, ' ').replace(/[{}]/g, '').replace(/%%[cC]/g, 'Ø').replace(/%%[dD]/g, '°').replace(/%%[pP]/g, '±').trim();

function pairs(text) {
  const lines = text.split(/\r\n|\r|\n/), out = [];
  for (let i = 0; i + 1 < lines.length; i += 2) out.push([parseInt(lines[i].trim(), 10), lines[i + 1]]);
  return out;
}
// split a flat list of group pairs into entities that start at code 0
function entities(list, from, to) {
  const res = []; let cur = null;
  for (let i = from; i < to; i++) { const [c, v] = list[i]; if (c === 0) { cur = { type: v.trim(), g: [] }; res.push(cur); } else if (cur) cur.g.push([c, v]); }
  return res;
}
const val = (e, code, d) => { const p = e.g.find(q => q[0] === code); return p ? p[1] : d; };
const fnum = (e, code, d = 0) => { const v = parseFloat(val(e, code, NaN)); return isFinite(v) ? v : d; };

export function parseDxf(text, opts = {}) {
  const list = pairs(text), maxSegs = opts.maxSegs || 60000;
  let units = 4; const blocks = {}, ents = [];
  let i = 0;
  while (i < list.length) {
    if (list[i][0] === 0 && list[i][1].trim() === 'SECTION' && list[i + 1]?.[0] === 2) {
      const name = list[i + 1][1].trim(); let j = i + 2; while (j < list.length && !(list[j][0] === 0 && list[j][1].trim() === 'ENDSEC')) j++;
      if (name === 'HEADER') { for (let k = i + 2; k < j; k++) if (list[k][0] === 9 && list[k][1].trim() === '$INSUNITS') units = parseInt(list[k + 1][1], 10) || 4; }
      if (name === 'ENTITIES') ents.push(...entities(list, i + 2, j));
      if (name === 'BLOCKS') {
        const bl = entities(list, i + 2, j); let b = null;
        for (const e of bl) { if (e.type === 'BLOCK') { b = { name: val(e, 2, '').trim(), bx: fnum(e, 10), by: fnum(e, 20), ents: [] }; blocks[b.name] = b; } else if (e.type === 'ENDBLK') b = null; else if (b) b.ents.push(e); }
      }
      i = j + 1; continue;
    }
    i++;
  }
  const k = (opts.unitScale || UNIT_MM[units] || 1), segs = [], texts = [], layers = {};
  let truncated = false;
  const pushSeg = (layer, a, b) => { if (segs.length >= maxSegs) { truncated = true; return; } segs.push([a[0] * k, -a[1] * k, b[0] * k, -b[1] * k, layer]); layers[layer] = (layers[layer] || 0) + 1; };
  const arcPts = (cx, cy, r, a0, a1) => { let d = a1 - a0; while (d <= 0) d += 360; const n = Math.max(4, Math.min(64, Math.ceil(d / 8))); return Array.from({ length: n + 1 }, (_, i2) => { const t = (a0 + d * i2 / n) * Math.PI / 180; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }); };
  const bulgePts = (p, q, b) => { if (!b) return [p, q]; const th = 4 * Math.atan(b), dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy); if (L < 1e-9) return [p, q]; const r = L / (2 * Math.sin(th / 2)), mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, h = r * Math.cos(th / 2), cx = mx - dy / L * h, cy = my + dx / L * h; let a0 = Math.atan2(p[1] - cy, p[0] - cx); const n = Math.max(2, Math.ceil(Math.abs(th) / .2)); return Array.from({ length: n + 1 }, (_, i2) => { const t = a0 + th * i2 / n; return [cx + Math.abs(r) * Math.cos(t), cy + Math.abs(r) * Math.sin(t)]; }); };
  function walk(list2, M, depth, layerOverride) {
    const T = (x, y) => [M[0] * x + M[1] * y + M[4], M[2] * x + M[3] * y + M[5]];
    const strip = (layer, pts) => { for (let n = 1; n < pts.length; n++) pushSeg(layer, T(...pts[n - 1]), T(...pts[n])); };
    for (let ix = 0; ix < list2.length; ix++) {
      const e = list2[ix]; let layer = (val(e, 8, '0') || '0').trim(); if (layer === '0' && layerOverride) layer = layerOverride;
      switch (e.type) {
        case 'LINE': strip(layer, [[fnum(e, 10), fnum(e, 20)], [fnum(e, 11), fnum(e, 21)]]); break;
        case 'LWPOLYLINE': {
          const vs = []; let cur = null;
          for (const [c, v] of e.g) { if (c === 10) { cur = [parseFloat(v), 0, 0]; vs.push(cur); } else if (c === 20 && cur) cur[1] = parseFloat(v); else if (c === 42 && cur) cur[2] = parseFloat(v); }
          const closed = (parseInt(val(e, 70, 0), 10) & 1) === 1, pts = [];
          for (let n = 0; n < vs.length; n++) { const q = vs[(n + 1) % vs.length]; if (n === vs.length - 1 && !closed) { pts.push([vs[n][0], vs[n][1]]); break; } const seg = bulgePts([vs[n][0], vs[n][1]], [q[0], q[1]], vs[n][2]); pts.push(...(n ? seg.slice(1) : seg)); }
          strip(layer, pts); break;
        }
        case 'POLYLINE': {
          const closed = (parseInt(val(e, 70, 0), 10) & 1) === 1, vs = [];
          while (list2[ix + 1] && list2[ix + 1].type === 'VERTEX') { ix++; vs.push([fnum(list2[ix], 10), fnum(list2[ix], 20), fnum(list2[ix], 42)]); }
          if (list2[ix + 1] && list2[ix + 1].type === 'SEQEND') ix++;
          const pts = [];
          for (let n = 0; n < vs.length; n++) { const q = vs[(n + 1) % vs.length]; if (n === vs.length - 1 && !closed) { pts.push([vs[n][0], vs[n][1]]); break; } const seg = bulgePts([vs[n][0], vs[n][1]], [q[0], q[1]], vs[n][2]); pts.push(...(n ? seg.slice(1) : seg)); }
          strip(layer, pts); break;
        }
        case 'ARC': strip(layer, arcPts(fnum(e, 10), fnum(e, 20), fnum(e, 40), fnum(e, 50), fnum(e, 51))); break;
        case 'CIRCLE': strip(layer, arcPts(fnum(e, 10), fnum(e, 20), fnum(e, 40), 0, 360)); break;
        case 'SPLINE': { const xs = e.g.filter(q => q[0] === 10).map(q => parseFloat(q[1])), ys = e.g.filter(q => q[0] === 20).map(q => parseFloat(q[1])); strip(layer, xs.map((x, n) => [x, ys[n]])); break; }
        case 'TEXT': case 'MTEXT': {
          const raw = e.type === 'MTEXT' ? e.g.filter(q => q[0] === 3).map(q => q[1]).join('') + val(e, 1, '') : val(e, 1, ''), s = cleanMtext(raw); if (!s) break;
          const p = T(fnum(e, 10), fnum(e, 20)), sc = Math.hypot(M[0], M[2]);
          texts.push([p[0] * k, -p[1] * k, fnum(e, 40, 250) * sc * k, s.slice(0, 80), layer]); layers[layer] = (layers[layer] || 0) + 1; break;
        }
        case 'INSERT': case 'DIMENSION': {
          const b = blocks[(val(e, 2, '') || '').trim()]; if (!b || depth > 4) break;
          const sx = e.type === 'INSERT' ? fnum(e, 41, 1) : 1, sy = e.type === 'INSERT' ? fnum(e, 42, 1) : 1, rot = (e.type === 'INSERT' ? fnum(e, 50, 0) : 0) * Math.PI / 180, ix0 = e.type === 'INSERT' ? fnum(e, 10) : 0, iy0 = e.type === 'INSERT' ? fnum(e, 20) : 0;
          const c = Math.cos(rot), s2 = Math.sin(rot), L = [c * sx, -s2 * sy, s2 * sx, c * sy, ix0 - (c * sx * b.bx - s2 * sy * b.by), iy0 - (s2 * sx * b.bx + c * sy * b.by)];
          const N = [M[0] * L[0] + M[1] * L[2], M[0] * L[1] + M[1] * L[3], M[2] * L[0] + M[3] * L[2], M[2] * L[1] + M[3] * L[3], M[0] * L[4] + M[1] * L[5] + M[4], M[2] * L[4] + M[3] * L[5] + M[5]];
          walk(b.ents, N, depth + 1, layer); break;
        }
      }
    }
  }
  walk(ents, [1, 0, 0, 1, 0, 0], 0, null);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const s of segs) { x0 = Math.min(x0, s[0], s[2]); x1 = Math.max(x1, s[0], s[2]); y0 = Math.min(y0, s[1], s[3]); y1 = Math.max(y1, s[1], s[3]); }
  return { segs, texts, layers, units, truncated, bounds: isFinite(x0) ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null };
}

// pairs of parallel lines 60–350 mm apart become walls along their centre line
export function wallsFromSegs(segs, { minT = 60, maxT = 350, minLen = 300 } = {}) {
  const ls = segs.map(s => { const dx = s[2] - s[0], dy = s[3] - s[1], L = Math.hypot(dx, dy); return L < minLen ? null : { x1: s[0], y1: s[1], x2: s[2], y2: s[3], L, ux: dx / L, uy: dy / L, used: false }; }).filter(Boolean);
  ls.sort((a, b) => b.L - a.L);
  const walls = [];
  for (const a of ls) {
    if (a.used) continue; let best = null;
    for (const b of ls) {
      if (b === a || b.used) continue;
      if (Math.abs(a.ux * b.uy - a.uy * b.ux) > .02) continue;
      const d = Math.abs((b.x1 - a.x1) * -a.uy + (b.y1 - a.y1) * a.ux); if (d < minT || d > maxT) continue;
      const t1 = (b.x1 - a.x1) * a.ux + (b.y1 - a.y1) * a.uy, t2 = (b.x2 - a.x1) * a.ux + (b.y2 - a.y1) * a.uy, lo = Math.max(0, Math.min(t1, t2)), hi = Math.min(a.L, Math.max(t1, t2));
      if (hi - lo < Math.min(a.L, b.L) * .5 || hi - lo < minLen) continue;
      if (!best || d < best.d) best = { b, d, lo, hi };
    }
    if (!best) continue; a.used = best.b.used = true;
    const side = Math.sign((best.b.x1 - a.x1) * -a.uy + (best.b.y1 - a.y1) * a.ux), nx = -a.uy * side * best.d / 2, ny = a.ux * side * best.d / 2;
    walls.push({ x1: a.x1 + a.ux * best.lo + nx, y1: a.y1 + a.uy * best.lo + ny, x2: a.x1 + a.ux * best.hi + nx, y2: a.y1 + a.uy * best.hi + ny, t: Math.round(best.d / 10) * 10 });
  }
  return walls;
}
