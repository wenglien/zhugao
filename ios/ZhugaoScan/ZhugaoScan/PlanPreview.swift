import SwiftUI

/// Top-down drawing of a scan in the same visual language as the 築稿 web plan:
/// black poché walls, door swings, triple-line windows and oak furniture blocks.
struct PlanPreview: View {
    let scan: ScanExport
    var showLabels = true

    var body: some View {
        Canvas { ctx, size in
            let b = bounds()
            let pad: CGFloat = 34
            let s = min((size.width - pad * 2) / max(b.width, 1), (size.height - pad * 2) / max(b.height, 1))
            let ox = (size.width - b.width * s) / 2 - b.minX * s, oy = (size.height - b.height * s) / 2 - b.minY * s
            func P(_ x: Double, _ y: Double) -> CGPoint { CGPoint(x: x * s + ox, y: y * s + oy) }

            // grid every 500 mm
            var grid = Path()
            var gx = (b.minX / 500).rounded(.down) * 500
            while gx <= b.maxX { grid.move(to: P(gx, b.minY)); grid.addLine(to: P(gx, b.maxY)); gx += 500 }
            var gy = (b.minY / 500).rounded(.down) * 500
            while gy <= b.maxY { grid.move(to: P(b.minX, gy)); grid.addLine(to: P(b.maxX, gy)); gy += 500 }
            ctx.stroke(grid, with: .color(Color.forest.opacity(0.07)), lineWidth: 0.5)

            // objects under walls
            for o in scan.objects {
                var c = ctx
                c.translateBy(x: P(Double(o.x), Double(o.y)).x, y: P(Double(o.x), Double(o.y)).y)
                c.rotate(by: .degrees(Double(o.rot)))
                let r = CGRect(x: -Double(o.w) * s / 2, y: -Double(o.d) * s / 2, width: Double(o.w) * s, height: Double(o.d) * s)
                c.fill(Path(r), with: .color(Color.oak.opacity(0.55)))
                c.stroke(Path(r), with: .color(Color(red: 0.55, green: 0.45, blue: 0.3)), lineWidth: 1)
                if showLabels, min(r.width, r.height) > 22 {
                    c.rotate(by: .degrees(-Double(o.rot)))
                    c.draw(Text(Labels.name(of: o)).font(.system(size: 10, weight: .semibold)).foregroundStyle(Color(red: 0.31, green: 0.26, blue: 0.19)), at: .zero)
                }
            }

            // walls
            for w in scan.walls {
                var p = Path(); p.move(to: P(Double(w.x1), Double(w.y1))); p.addLine(to: P(Double(w.x2), Double(w.y2)))
                ctx.stroke(p, with: .color(.wallInk), style: StrokeStyle(lineWidth: max(2, Double(w.t) * s), lineCap: .square))
            }

            // openings
            for o in scan.openings where scan.walls.indices.contains(o.wall) {
                let w = scan.walls[o.wall], len = max(w.length, 1)
                let ux = Double(w.x2 - w.x1) / len, uy = Double(w.y2 - w.y1) / len, nx = -uy, ny = ux
                let cx = Double(w.x1) + ux * Double(o.pos), cy = Double(w.y1) + uy * Double(o.pos), hw = Double(o.w) / 2, t = Double(w.t)
                let a = (cx - ux * hw, cy - uy * hw), bb = (cx + ux * hw, cy + uy * hw)
                var gap = Path(); gap.move(to: P(a.0, a.1)); gap.addLine(to: P(bb.0, bb.1))
                ctx.stroke(gap, with: .color(.sheet), lineWidth: max(3, t * s + 2))
                for e in [a, bb] {
                    var j = Path(); j.move(to: P(e.0 - nx * t / 2, e.1 - ny * t / 2)); j.addLine(to: P(e.0 + nx * t / 2, e.1 + ny * t / 2))
                    ctx.stroke(j, with: .color(.wallInk), lineWidth: 1.2)
                }
                switch o.type {
                case "window":
                    for k in [-t / 2, 0, t / 2] {
                        var l = Path(); l.move(to: P(a.0 + nx * k, a.1 + ny * k)); l.addLine(to: P(bb.0 + nx * k, bb.1 + ny * k))
                        ctx.stroke(l, with: .color(.glass), lineWidth: k == 0 ? 1.6 : 0.9)
                    }
                case "door":
                    // leaf swings into the side the room centre is on
                    let mid = center(), side: Double = ((mid.x - cx) * nx + (mid.y - cy) * ny) >= 0 ? 1 : -1
                    let hinge = P(a.0, a.1), tip = P(a.0 + nx * side * Double(o.w), a.1 + ny * side * Double(o.w))
                    var leaf = Path(); leaf.move(to: hinge); leaf.addLine(to: tip)
                    ctx.stroke(leaf, with: .color(.ink), lineWidth: 2)
                    let a1 = atan2(tip.y - hinge.y, tip.x - hinge.x), a2 = atan2(P(bb.0, bb.1).y - hinge.y, P(bb.0, bb.1).x - hinge.x)
                    var df = a2 - a1; while df > .pi { df -= 2 * .pi }; while df < -.pi { df += 2 * .pi }
                    var arc = Path(); arc.addArc(center: hinge, radius: Double(o.w) * s, startAngle: .radians(a1), endAngle: .radians(a1 + df), clockwise: df < 0)
                    ctx.stroke(arc, with: .color(.ink), style: StrokeStyle(lineWidth: 1, dash: [4, 3]))
                default:
                    var l = Path(); l.move(to: P(a.0, a.1)); l.addLine(to: P(bb.0, bb.1))
                    ctx.stroke(l, with: .color(.muted), style: StrokeStyle(lineWidth: 1, dash: [2, 3]))
                }
            }

            // overall dimensions
            if !scan.walls.isEmpty {
                let wb = wallBounds()
                let top = P(wb.minX, wb.minY), right = P(wb.maxX, wb.minY)
                var d = Path(); d.move(to: CGPoint(x: top.x, y: top.y - 18)); d.addLine(to: CGPoint(x: right.x, y: right.y - 18))
                ctx.stroke(d, with: .color(.ink2), lineWidth: 0.8)
                ctx.draw(Text(mm(wb.width)).font(.system(size: 11, weight: .medium).monospacedDigit()).foregroundStyle(Color.ink2), at: CGPoint(x: (top.x + right.x) / 2, y: top.y - 28))
                let bot = P(wb.minX, wb.maxY)
                var v = Path(); v.move(to: CGPoint(x: top.x - 18, y: top.y)); v.addLine(to: CGPoint(x: bot.x - 18, y: bot.y))
                ctx.stroke(v, with: .color(.ink2), lineWidth: 0.8)
                var vc = ctx; vc.translateBy(x: top.x - 28, y: (top.y + bot.y) / 2); vc.rotate(by: .degrees(-90))
                vc.draw(Text(mm(wb.height)).font(.system(size: 11, weight: .medium).monospacedDigit()).foregroundStyle(Color.ink2), at: .zero)
            }
        }
        .background(Color.sheet)
        .accessibilityLabel("掃描平面圖預覽，\(scan.walls.count) 面牆、\(scan.openings.count) 個門窗開口、\(scan.objects.count) 件家具")
    }

    private func mm(_ v: Double) -> String { Int(v.rounded()).formatted(.number) }

    private func wallBounds() -> CGRect {
        let xs = scan.walls.flatMap { [Double($0.x1), Double($0.x2)] }, ys = scan.walls.flatMap { [Double($0.y1), Double($0.y2)] }
        guard let x0 = xs.min(), let x1 = xs.max(), let y0 = ys.min(), let y1 = ys.max() else { return CGRect(x: 0, y: 0, width: 4000, height: 3000) }
        return CGRect(x: x0, y: y0, width: x1 - x0, height: y1 - y0)
    }

    private func bounds() -> CGRect {
        var r = wallBounds()
        for o in scan.objects { r = r.union(CGRect(x: Double(o.x) - Double(max(o.w, o.d)) / 2, y: Double(o.y) - Double(max(o.w, o.d)) / 2, width: Double(max(o.w, o.d)), height: Double(max(o.w, o.d)))) }
        return r.insetBy(dx: -250, dy: -250)
    }

    private func center() -> CGPoint { let b = wallBounds(); return CGPoint(x: b.midX, y: b.midY) }
}
