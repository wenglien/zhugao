import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DxfWriter, parseDxf, wallsFromSegs } from '../../public/lib/dxf.js';

const near = (a, b, eps = 0.5) => assert.ok(Math.abs(a - b) <= eps, `${a} ≈ ${b}`);

test('writer output parses back with the same geometry, layers and Chinese text', () => {
  const d = new DxfWriter();
  d.line('A-WALL', 0, 0, 3000, 0);
  d.poly('A-AREA', [[0, 0], [3000, 0], [3000, 2000], [0, 2000]], true);
  d.text('A-AREA-IDEN', 1500, 1000, 200, '客廳 25.0 m2', 0, 'center');
  const r = parseDxf(d.toString());
  assert.equal(r.units, 4);
  assert.deepEqual(Object.keys(r.layers).sort(), ['A-AREA', 'A-AREA-IDEN', 'A-WALL']);
  // plan y points down, DXF y up: a plan line at y=0 stays at y=0, the room's far edge comes back at y=2000
  const wall = r.segs.find(s => s[4] === 'A-WALL'); near(wall[0], 0); near(wall[2], 3000); near(wall[1], 0);
  assert.equal(r.segs.filter(s => s[4] === 'A-AREA').length, 4);
  assert.ok(r.segs.some(s => s[4] === 'A-AREA' && Math.abs(s[1] - 2000) < 1));
  assert.equal(r.texts[0][3], '客廳 25.0 m2');
});

test('door arcs keep their sweep', () => {
  const d = new DxfWriter(); d.arc('A-DOOR', 0, 0, 900, 0, Math.PI / 2);
  const r = parseDxf(d.toString()), xs = r.segs.flatMap(s => [s[0], s[2]]), ys = r.segs.flatMap(s => [s[1], s[3]]);
  near(Math.max(...xs), 900, 1); near(Math.min(...xs), 0, 1); near(Math.max(...ys), 900, 1); near(Math.min(...ys), 0, 1);
});

const dxf = body => ['0', 'SECTION', '2', 'HEADER', '9', '$INSUNITS', '70', '5', '0', 'ENDSEC', ...body].join('\n');
test('units, LWPOLYLINE bulges and block inserts are expanded', () => {
  const text = dxf([
    '0', 'SECTION', '2', 'BLOCKS', '0', 'BLOCK', '2', 'D', '10', '0', '20', '0', '0', 'LINE', '8', '0', '10', '0', '20', '0', '11', '90', '21', '0', '0', 'ENDBLK', '0', 'ENDSEC',
    '0', 'SECTION', '2', 'ENTITIES',
    '0', 'LWPOLYLINE', '8', 'W', '90', '2', '70', '0', '10', '0', '20', '0', '42', '1', '10', '100', '20', '0',
    '0', 'INSERT', '8', 'DOOR', '2', 'D', '10', '500', '20', '0', '50', '90',
    '0', 'ENDSEC', '0', 'EOF']);
  const r = parseDxf(text);
  assert.equal(r.units, 5);
  const arc = r.segs.filter(s => s[4] === 'W'); assert.ok(arc.length > 4, 'bulge becomes several segments');
  assert.ok(Math.max(...arc.flatMap(s => [Math.abs(s[1]), Math.abs(s[3])])) > 400, 'semicircle bulge reaches the radius (50 cm = 500 mm)');
  const door = r.segs.find(s => s[4] === 'DOOR');
  near(door[0], 5000); near(door[2], 5000); near(Math.abs(door[3] - door[1]), 900, 1);
});

test('parallel line pairs become walls along their centre line', () => {
  const segs = [[0, 0, 4000, 0], [0, 120, 4000, 120], [0, 2000, 1000, 2000]];
  const ws = wallsFromSegs(segs);
  assert.equal(ws.length, 1); near(ws[0].y1, 60); near(ws[0].y2, 60); assert.equal(ws[0].t, 120);
});
