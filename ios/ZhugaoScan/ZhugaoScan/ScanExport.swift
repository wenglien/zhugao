import Foundation
import simd

/// The file the web app imports. See EXPORT_FORMAT.md for the field reference.
struct ScanExport: Codable, Equatable, Hashable {
    var format = "zhugao-scan"
    var version = 1
    var name: String
    var scannedAt: Date
    var walls: [Wall]
    var openings: [Opening]
    var objects: [Item]

    struct Wall: Codable, Equatable, Hashable {
        var x1: Int, y1: Int, x2: Int, y2: Int
        var t: Int
        var h: Int
        var length: Double { hypot(Double(x2 - x1), Double(y2 - y1)) }
    }

    struct Opening: Codable, Equatable, Hashable {
        var type: String        // "door" | "window" | "opening"
        var wall: Int           // index into walls
        var pos: Int            // mm from wall start (x1,y1) to the opening centre
        var w: Int
        var h: Int
        var sill: Int
    }

    struct Item: Codable, Equatable, Hashable {
        var category: String    // RoomPlan category name, e.g. "bed", "storage"
        var kind: String        // 築稿 furniture kind, e.g. "bed", "wardrobe"
        var x: Int, y: Int      // centre
        var w: Int, d: Int, h: Int
        var rot: Int            // degrees, clockwise in plan view
    }

    var fileName: String {
        let f = DateFormatter(); f.dateFormat = "yyyyMMdd-HHmm"
        let safe = name.replacingOccurrences(of: "/", with: "-").trimmingCharacters(in: .whitespaces)
        return "\(safe.isEmpty ? "掃描" : safe)-\(f.string(from: scannedAt)).zhugao-scan.json"
    }

    func encoded() throws -> Data {
        let enc = JSONEncoder()
        enc.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
        enc.dateEncodingStrategy = .iso8601
        return try enc.encode(self)
    }

    static func decode(_ data: Data) throws -> ScanExport {
        let dec = JSONDecoder(); dec.dateDecodingStrategy = .iso8601
        return try dec.decode(ScanExport.self, from: data)
    }
}

// MARK: - Labels

enum Labels {
    static let category: [String: String] = [
        "storage": "收納櫃", "refrigerator": "冰箱", "stove": "爐台", "bed": "床", "sink": "水槽",
        "washerDryer": "洗衣機", "toilet": "馬桶", "bathtub": "浴缸", "oven": "烤箱", "dishwasher": "洗碗機",
        "table": "桌子", "sofa": "沙發", "chair": "椅子", "fireplace": "壁爐", "television": "電視", "stairs": "樓梯"
    ]
    static func name(of item: ScanExport.Item) -> String { category[item.category] ?? item.category }
    static let opening: [String: String] = ["door": "門", "window": "窗", "opening": "開口"]
}

// MARK: - Conversion

/// A RoomPlan surface reduced to what the converter needs, so real scans and the
/// built-in sample go through exactly the same maths.
struct RawSurface {
    enum Kind { case wall, door, window, opening }
    var kind: Kind
    var id: UUID
    var parent: UUID?
    var transform: simd_float4x4
    var dimensions: simd_float3
}

struct RawObject {
    var category: String
    var transform: simd_float4x4
    var dimensions: simd_float3
}

enum ScanConverter {
    static let defaultThickness = 120

    /// RoomPlan world space is metres, y up. Plan space is millimetres with x right and
    /// y down, which looking from above is world +z. The origin moves to the min corner of the walls.
    static func export(name: String, date: Date, surfaces: [RawSurface], objects: [RawObject]) -> ScanExport {
        let walls = surfaces.filter { $0.kind == .wall }
        func pos(_ m: simd_float4x4) -> simd_float3 { simd_float3(m.columns.3.x, m.columns.3.y, m.columns.3.z) }
        func axis(_ m: simd_float4x4) -> SIMD2<Double> {
            let v = SIMD2(Double(m.columns.0.x), Double(m.columns.0.z)); let l = simd_length(v)
            return l > 1e-6 ? v / l : SIMD2(1, 0)
        }
        func plan(_ p: simd_float3) -> SIMD2<Double> { SIMD2(Double(p.x) * 1000, Double(p.z) * 1000) }

        // wall end points in plan millimetres, before shifting the origin
        var segs: [(a: SIMD2<Double>, b: SIMD2<Double>, t: Int, h: Int, id: UUID)] = []
        var floorY = Float.greatestFiniteMagnitude
        for w in walls {
            let c = plan(pos(w.transform)), u = axis(w.transform), half = Double(w.dimensions.x) * 500
            let t = w.dimensions.z > 0.01 ? Int((Double(w.dimensions.z) * 1000).rounded()) : defaultThickness
            segs.append((c - u * half, c + u * half, t, Int((Double(w.dimensions.y) * 1000).rounded()), w.id))
            floorY = min(floorY, pos(w.transform).y - w.dimensions.y / 2)
        }
        if floorY == .greatestFiniteMagnitude { floorY = 0 }
        let pts = segs.flatMap { [$0.a, $0.b] }
        let origin = SIMD2(pts.map(\.x).min() ?? 0, pts.map(\.y).min() ?? 0)
        let r = { (v: Double) -> Int in Int(v.rounded()) }

        let outWalls = segs.map { s in
            ScanExport.Wall(x1: r(s.a.x - origin.x), y1: r(s.a.y - origin.y), x2: r(s.b.x - origin.x), y2: r(s.b.y - origin.y), t: s.t, h: s.h)
        }

        var outOpenings: [ScanExport.Opening] = []
        for s in surfaces where s.kind != .wall && !segs.isEmpty {
            let c = plan(pos(s.transform))
            let idx = s.parent.flatMap { p in segs.firstIndex { $0.id == p } } ?? nearest(c, segs.map { ($0.a, $0.b) })
            let seg = segs[idx], d = seg.b - seg.a, len = simd_length(d)
            let along = len > 0 ? simd_dot(c - seg.a, d / len) : 0
            let w = Double(s.dimensions.x) * 1000, h = Double(s.dimensions.y) * 1000
            let sill = max(0, Double(pos(s.transform).y - s.dimensions.y / 2 - floorY) * 1000)
            let type: String = s.kind == .door ? "door" : s.kind == .window ? "window" : "opening"
            outOpenings.append(.init(type: type, wall: idx, pos: r(min(max(along, w / 2), max(w / 2, len - w / 2))), w: r(w), h: r(h), sill: type == "door" ? 0 : r(sill)))
        }

        let outObjects = objects.map { o -> ScanExport.Item in
            let c = plan(pos(o.transform)), u = axis(o.transform)
            var deg = atan2(u.y, u.x) * 180 / .pi; deg = (deg.truncatingRemainder(dividingBy: 360) + 360).truncatingRemainder(dividingBy: 360)
            let h = Double(o.dimensions.y) * 1000
            return .init(category: o.category, kind: kind(for: o.category, height: h),
                         x: r(c.x - origin.x), y: r(c.y - origin.y),
                         w: r(Double(o.dimensions.x) * 1000), d: r(Double(o.dimensions.z) * 1000), h: r(h), rot: r(deg) % 360)
        }
        return ScanExport(name: name, scannedAt: date, walls: outWalls, openings: outOpenings, objects: outObjects)
    }

    static func kind(for category: String, height: Double) -> String {
        switch category {
        case "storage": return height > 1500 ? "wardrobe" : "cabinet"
        case "refrigerator": return "fridge"
        case "stove", "oven", "dishwasher": return "counter"
        case "sink": return "vanity"
        case "television": return "tvstand"
        case "bed", "sofa", "table", "chair", "toilet", "bathtub": return category
        default: return "cabinet"
        }
    }

    private static func nearest(_ p: SIMD2<Double>, _ segs: [(SIMD2<Double>, SIMD2<Double>)]) -> Int {
        var best = 0, bd = Double.infinity
        for (i, s) in segs.enumerated() {
            let d = s.1 - s.0, l2 = simd_length_squared(d)
            let t = l2 > 0 ? min(1, max(0, simd_dot(p - s.0, d) / l2)) : 0
            let dist = simd_length(p - (s.0 + d * t))
            if dist < bd { bd = dist; best = i }
        }
        return best
    }
}

// MARK: - Sample scan (simulator / demo)

enum SampleScan {
    /// A 5.0 × 3.8 m bedroom shaped like RoomPlan output, run through the real converter.
    static func make() -> ScanExport {
        func tf(_ x: Float, _ y: Float, _ z: Float, yaw: Float) -> simd_float4x4 {
            let c = cos(yaw), s = sin(yaw)
            return simd_float4x4(columns: (simd_float4(c, 0, -s, 0), simd_float4(0, 1, 0, 0), simd_float4(s, 0, c, 0), simd_float4(x, y, z, 1)))
        }
        let H: Float = 2.7, W: Float = 5.0, D: Float = 3.8
        let north = UUID(), south = UUID(), east = UUID(), west = UUID()
        let surfaces: [RawSurface] = [
            .init(kind: .wall, id: north, parent: nil, transform: tf(0, H / 2, -D / 2, yaw: 0), dimensions: [W, H, 0]),
            .init(kind: .wall, id: east, parent: nil, transform: tf(W / 2, H / 2, 0, yaw: .pi / 2), dimensions: [D, H, 0]),
            .init(kind: .wall, id: south, parent: nil, transform: tf(0, H / 2, D / 2, yaw: .pi), dimensions: [W, H, 0]),
            .init(kind: .wall, id: west, parent: nil, transform: tf(-W / 2, H / 2, 0, yaw: -.pi / 2), dimensions: [D, H, 0]),
            .init(kind: .door, id: UUID(), parent: south, transform: tf(1.6, 1.0, D / 2, yaw: .pi), dimensions: [0.9, 2.0, 0]),
            .init(kind: .window, id: UUID(), parent: north, transform: tf(-0.8, 1.55, -D / 2, yaw: 0), dimensions: [1.8, 1.3, 0]),
            .init(kind: .window, id: UUID(), parent: east, transform: tf(W / 2, 1.5, -0.6, yaw: .pi / 2), dimensions: [1.2, 1.2, 0]),
            .init(kind: .opening, id: UUID(), parent: nil, transform: tf(-W / 2, 1.05, 0.9, yaw: -.pi / 2), dimensions: [1.0, 2.1, 0])
        ]
        let objects: [RawObject] = [
            .init(category: "bed", transform: tf(-1.2, 0.25, -0.85, yaw: 0), dimensions: [1.6, 0.5, 2.1]),
            .init(category: "storage", transform: tf(2.2, 1.1, 0.9, yaw: .pi / 2), dimensions: [1.8, 2.2, 0.6]),
            .init(category: "table", transform: tf(-1.6, 0.375, 1.5, yaw: 0), dimensions: [1.4, 0.75, 0.7]),
            .init(category: "chair", transform: tf(-1.6, 0.45, 0.95, yaw: .pi), dimensions: [0.5, 0.9, 0.5]),
            .init(category: "television", transform: tf(1.1, 0.25, -1.7, yaw: 0), dimensions: [1.6, 0.5, 0.4]),
            .init(category: "storage", transform: tf(0.55, 0.25, 1.65, yaw: .pi), dimensions: [0.45, 0.5, 0.4])
        ]
        return ScanConverter.export(name: "範例主臥", date: Date(), surfaces: surfaces, objects: objects)
    }
}
