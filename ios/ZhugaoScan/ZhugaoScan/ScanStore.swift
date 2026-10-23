import Foundation

struct SavedScan: Identifiable, Hashable {
    var url: URL
    var scan: ScanExport
    var id: URL { url }
}

/// Keeps exports as files in Documents, which the Files app can see (UIFileSharingEnabled).
@MainActor
final class ScanStore: ObservableObject {
    @Published private(set) var scans: [SavedScan] = []
    private let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]

    init() { reload() }

    func reload() {
        let urls = (try? FileManager.default.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil)) ?? []
        scans = urls.filter { $0.lastPathComponent.hasSuffix(".zhugao-scan.json") }
            .compactMap { u in (try? Data(contentsOf: u)).flatMap { try? ScanExport.decode($0) }.map { SavedScan(url: u, scan: $0) } }
            .sorted { $0.scan.scannedAt > $1.scan.scannedAt }
    }

    /// Writes the scan, replacing the previous file when its name changed. Returns the new file URL.
    @discardableResult
    func save(_ scan: ScanExport, replacing old: URL? = nil) throws -> URL {
        let url = dir.appendingPathComponent(scan.fileName)
        try scan.encoded().write(to: url, options: .atomic)
        if let old, old != url { try? FileManager.default.removeItem(at: old) }
        reload()
        return url
    }

    func delete(_ s: SavedScan) {
        try? FileManager.default.removeItem(at: s.url)
        reload()
    }
}
