// End-to-end smoke and performance test: serves public/, drives the app in headless Chrome,
// fails on any page error, checks the PDF set and DXF export, then times a large three-floor project.
// Usage: npm run test:e2e   (set CHROME_PATH if Chrome is not in the default macOS location)
import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDxf } from '../../public/lib/dxf.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const dl = fs.mkdtempSync(path.join(os.tmpdir(), 'zhugao-e2e-'));
const failures = [], ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) failures.push(msg); };

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage(); await page.setViewport({ width: 1366, height: 900 });
const cdp = await page.createCDPSession(); await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dl });
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/favicon|ERR_|net::/.test(m.text())) errors.push(m.text()); });
page.on('dialog', d => d.accept());
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 60000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await page.evaluate(fn)) return true; await wait(300); } return false; };
const files = () => fs.readdirSync(dl);

try {
  await page.goto(`${base}/?test=1`, { waitUntil: 'networkidle0' });
  ok(await page.$('[data-home="sample"]') !== null, 'home page loads');
  await page.evaluate(() => { document.querySelector('[data-home="sample"]').click(); });
  await wait(800); await page.evaluate(() => document.querySelector('[data-tour="skip"]')?.click());
  for (const t of ['plan', '3d', 'spec', 'est', 'pm', 'ver', 'plan']) { await page.evaluate(t => document.querySelector(`[data-tab="${t}"]`).click(), t); await wait(t === '3d' ? 3500 : 400); }
  ok(errors.length === 0, `all tabs open without errors${errors.length ? ': ' + errors.join(' | ') : ''}`);

  // sketching a rough box with a pencil creates a room
  const before = await page.evaluate(() => window.__zhugaoTest.stats().rooms);
  await page.evaluate(async () => {
    document.querySelector('[data-tab="plan"]').click(); document.querySelector('#rail [data-tool="sketch"]').click();
    const cv = document.querySelector('#plan'), r = cv.getBoundingClientRect(), C2 = [[60, 60], [260, 64], [262, 200], [58, 198], [61, 62]], pts = [];
    for (let s = 0; s < 4; s++) for (let i = 0; i < 20; i++) { const t = i / 20, [a, b] = [C2[s], C2[s + 1]]; pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
    pts.push(C2[4]);
    const ev = (type, [x, y]) => cv.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, pointerType: 'pen', isPrimary: true, clientX: r.left + x, clientY: r.top + y, pressure: .5, buttons: type === 'pointerup' ? 0 : 1 }));
    ev('pointerdown', pts[0]); pts.forEach(p => ev('pointermove', p)); ev('pointerup', pts.at(-1));
    document.querySelector('#rail [data-tool="select"]').click();
  });
  ok(await page.evaluate(() => window.__zhugaoTest.stats().rooms) === before + 1, 'pencil sketch creates a room');

  // cabinet editor and section view
  await page.evaluate(async () => { const w = ms => new Promise(r => setTimeout(r, ms)); document.querySelector('[data-tab="spec"]').click(); await w(300); [...document.querySelectorAll('[data-pick^="items:"]')].find(b => b.textContent.includes('衣櫃')).click(); await w(500); document.querySelector('[data-act="cabEdit"]').click(); });
  await wait(600); ok(await page.evaluate(() => document.querySelector('#cabDlg').open && !!document.querySelector('#cabFront')), 'cabinet editor opens'); await page.evaluate(() => document.querySelector('#cabDlg').close());

  // DXF export
  await page.evaluate(() => document.querySelector('[data-exp="dxf"]').click());
  ok(await until(() => true, 1) && await (async () => { for (let i = 0; i < 20 && !files().some(f => f.endsWith('.dxf')); i++) await wait(300); return files().some(f => f.endsWith('.dxf')); })(), 'DXF downloads');
  const dxfFile = files().find(f => f.endsWith('.dxf'));
  if (dxfFile) { const r = parseDxf(fs.readFileSync(path.join(dl, dxfFile), 'utf8')); ok(r.segs.length > 300 && Object.keys(r.layers).length >= 10, `DXF parses back: ${r.segs.length} segments, ${Object.keys(r.layers).length} layers`); }

  // full PDF set (without renders, which need a GPU path trace)
  await page.evaluate(async () => { const w = ms => new Promise(r => setTimeout(r, ms)); document.querySelector('[data-tab="plan"]').click(); await w(300); document.querySelector('[data-exp="pdf"]').click(); await w(400); document.querySelectorAll('#pdfDlg [data-pdf]').forEach(c => { c.checked = c.dataset.pdf !== 'renders'; }); document.querySelector('#pdfGo').click(); });
  await until(() => /完成|失敗|沒有/.test(document.querySelector('#pdfProg')?.textContent || ''), 120000);
  const prog = await page.evaluate(() => document.querySelector('#pdfProg').textContent), pages = +(/共 (\d+) 頁/.exec(prog) || [])[1];
  ok(pages >= 25, `PDF set generates (${prog})`);

  // large project: three floors, ~150 items and ~100 points per floor
  const big = makeBig(3);
  await page.evaluate(pj => window.__zhugaoTest.load(pj), big); await wait(500);
  const st = await page.evaluate(() => window.__zhugaoTest.stats());
  const m = await page.evaluate(() => ({ draw: window.__zhugaoTest.drawMs(10), changed: window.__zhugaoTest.changedMs(5), hit: window.__zhugaoTest.hitMs(300), estimate: window.__zhugaoTest.estimateMs(5) }));
  console.log(`      large floor: ${st.walls} walls, ${st.rooms} rooms, ${st.items} items, ${st.mep} points`);
  console.log(`      draw ${m.draw.toFixed(1)} ms, edit update ${m.changed.toFixed(1)} ms, hit test ${m.hit.toFixed(2)} ms, estimate ${m.estimate.toFixed(1)} ms`);
  ok(m.draw < 40, 'large plan redraws in under 40 ms'); ok(m.changed < 150, 'edits update in under 150 ms'); ok(m.hit < 2, 'hit testing under 2 ms'); ok(m.estimate < 60, 'estimate under 60 ms');
  await page.evaluate(() => { document.querySelector('[data-tab="3d"]').click(); const c = document.querySelector('#floorsChk'); c.checked = true; c.dispatchEvent(new Event('change')); }); await wait(2500);
  const b3 = await page.evaluate(() => window.__zhugaoTest.build3dMs());
  console.log(`      3D build with all three floors: ${b3 == null ? 'n/a' : b3.toFixed(0) + ' ms'}`); ok(b3 == null || b3 < 3000, '3D builds all floors in under 3 s');
  ok(errors.length === 0, `no errors during the run${errors.length ? ': ' + errors.join(' | ') : ''}`);
} catch (e) { failures.push(String(e)); console.error(e); }
await browser.close(); server.close(); fs.rmSync(dl, { recursive: true, force: true });
console.log(failures.length ? `\n${failures.length} check(s) failed` : '\nall checks passed');
process.exit(failures.length ? 1 : 0);

function makeBig(floors) {
  let n = 0; const id = () => 'b' + (n++).toString(36);
  const kinds = ['sofa', 'armchair', 'coffee', 'bed', 'nightstand', 'wardrobe', 'table', 'chair', 'desk', 'shelf', 'cabinet', 'plant', 'rug', 'counter', 'upper'];
  const sheets = [];
  for (let f = 0; f < floors; f++) {
    const walls = [], rooms = [], items = [], mep = [], openings = [], pipes = [], key = new Set(), cols = 6, rows = 5, cw = 3200, ch = 3000;
    const wall = (x1, y1, x2, y2) => { const k = [x1, y1, x2, y2].join(); if (key.has(k)) return; key.add(k); const w = { id: id(), x1, y1, x2, y2, t: 120, h: 3000 }; walls.push(w); return w; };
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const x = c * cw, y = r * ch; rooms.push({ id: id(), name: `房間 ${f + 1}-${c}${r}`, x, y, w: cw, h: ch, floor: ['oak', 'tile', 'stone'][(c + r) % 3], ...(r === 0 ? { tile: { w: 600, h: 600, j: 2, pat: 'grid', org: 'center', rot: 0 } } : {}) });
      const top = wall(x, y, x + cw, y), left = wall(x, y, x, y + ch); wall(x + cw, y, x + cw, y + ch); wall(x, y + ch, x + cw, y + ch);
      if (top) openings.push({ id: id(), wallId: top.id, type: (c + r) % 2 ? 'door' : 'window', pos: 1600, w: 900, h: 2100, sill: 900, side: 1, hinge: 1 });
      if (left && c === 0) openings.push({ id: id(), wallId: left.id, type: 'window', pos: 1500, w: 1500, h: 1300, sill: 900, side: 1, hinge: 1 });
      for (let i = 0; i < 5; i++) { const k = kinds[(c * 7 + r * 3 + i) % kinds.length]; items.push({ id: id(), kind: k, code: `F${items.length + 1}`, name: k, x: x + 500 + (i % 3) * 900, y: y + 600 + Math.floor(i / 3) * 1400, w: 800, d: 500, h: 800, rot: 0, mat: 'oak', z: 0, note: '' }); }
      for (let i = 0; i < 4; i++) mep.push({ id: id(), kind: i ? 'outlet' : 'light', fx: 'down', code: `M${mep.length + 1}`, x: x + 400 + i * 700, y: y + 300, h: i ? 300 : 2700, note: '' });
      pipes.push({ id: id(), kind: 'cold', pts: [[x + 200, y + 200], [x + cw - 200, y + 200], [x + cw - 200, y + ch - 200]] });
    }
    sheets.push({ id: id(), no: `A-0${f + 1}`, title: `${f + 1}F`, level: { name: `${f + 1}F`, z: f * 3200, fh: 3200 }, walls, rooms, items, mep, openings, pipes, marks: [], texts: [], dims: [], sections: [], views: [], comments: [] });
  }
  return { name: '效能測試三層透天', code: 'T01', active: sheets[0].id, sheets };
}
