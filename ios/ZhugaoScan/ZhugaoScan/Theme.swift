import SwiftUI

extension Color {
    static let forest = Color(red: 0x2E / 255, green: 0x4A / 255, blue: 0x37 / 255)
    static let paper = Color(red: 0xF3 / 255, green: 0xF2 / 255, blue: 0xEC / 255)
    static let sheet = Color(red: 0xFC / 255, green: 0xFC / 255, blue: 0xF9 / 255)
    static let sage = Color(red: 0xEC / 255, green: 0xEF / 255, blue: 0xE3 / 255)
    static let line = Color(red: 0xE2 / 255, green: 0xE1 / 255, blue: 0xD8 / 255)
    static let ink = Color(red: 0x23 / 255, green: 0x24 / 255, blue: 0x1F / 255)
    static let ink2 = Color(red: 0x47 / 255, green: 0x48 / 255, blue: 0x3F / 255)
    static let muted = Color(red: 0x6B / 255, green: 0x6B / 255, blue: 0x62 / 255)
    static let wallInk = Color(red: 0x2A / 255, green: 0x2A / 255, blue: 0x27 / 255)
    static let oak = Color(red: 0xD9 / 255, green: 0xBC / 255, blue: 0x90 / 255)
    static let glass = Color(red: 0x4E / 255, green: 0x62 / 255, blue: 0x6C / 255)
}

struct PillButtonStyle: ButtonStyle {
    var filled: Bool
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline.weight(.semibold))
            .padding(.horizontal, 16).padding(.vertical, 10)
            .foregroundStyle(filled ? Color.paper : Color.ink)
            .background(filled ? Color.forest : Color.sheet.opacity(0.95), in: Capsule())
            .overlay(Capsule().stroke(filled ? Color.clear : Color.line, lineWidth: 1))
            .opacity(configuration.isPressed ? 0.8 : 1)
    }
}

struct PrimaryButtonStyle: ButtonStyle {
    var filled = true
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.body.weight(.semibold))
            .frame(maxWidth: .infinity, minHeight: 50)
            .foregroundStyle(filled ? Color.paper : Color.forest)
            .background(filled ? Color.forest : Color.sheet, in: RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(filled ? Color.clear : Color.forest.opacity(0.35), lineWidth: 1))
            .opacity(configuration.isPressed ? 0.85 : 1)
    }
}

/// The 築稿 mark: a room plan with a door swing, drawn in the 64-unit logo grid.
struct LogoMark: View {
    var size: CGFloat = 44
    var body: some View {
        Canvas { ctx, sz in
            let k = sz.width / 64
            ctx.fill(Path(roundedRect: CGRect(x: 0, y: 0, width: 64 * k, height: 64 * k), cornerRadius: 14 * k), with: .color(.forest))
            var swing = Path(); swing.move(to: CGPoint(x: 34 * k, y: 50 * k)); swing.addLine(to: CGPoint(x: 34 * k, y: 36.5 * k))
            swing.addArc(center: CGPoint(x: 34 * k, y: 50 * k), radius: 13.5 * k, startAngle: .degrees(-90), endAngle: .degrees(180), clockwise: true); swing.closeSubpath()
            ctx.fill(swing, with: .color(.oak))
            var walls = Path(); walls.move(to: CGPoint(x: 20.5 * k, y: 50 * k))
            for p in [(14, 50), (14, 14), (50, 14), (50, 50), (34, 50)] { walls.addLine(to: CGPoint(x: CGFloat(p.0) * k, y: CGFloat(p.1) * k)) }
            ctx.stroke(walls, with: .color(.paper), style: StrokeStyle(lineWidth: 5 * k, lineJoin: .miter))
            ctx.stroke(Path { $0.move(to: CGPoint(x: 50 * k, y: 31 * k)); $0.addLine(to: CGPoint(x: 40 * k, y: 31 * k)) }, with: .color(.paper), lineWidth: 5 * k)
            ctx.stroke(Path { $0.move(to: CGPoint(x: 34 * k, y: 50 * k)); $0.addLine(to: CGPoint(x: 34 * k, y: 36 * k)) }, with: .color(.paper), lineWidth: 2.6 * k)
        }
        .frame(width: size, height: size)
        .accessibilityHidden(true)
    }
}
