import SwiftUI

struct ResultView: View {
    @EnvironmentObject private var store: ScanStore
    @State private var scan: ScanExport
    @State private var url: URL
    @State private var name: String
    @FocusState private var naming: Bool

    init(saved: SavedScan) {
        _scan = State(initialValue: saved.scan)
        _url = State(initialValue: saved.url)
        _name = State(initialValue: saved.scan.name)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                PlanPreview(scan: scan)
                    .frame(height: 340)
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color.line, lineWidth: 1))

                VStack(alignment: .leading, spacing: 6) {
                    Text("房間名稱").font(.caption).foregroundStyle(Color.muted)
                    TextField("例如：主臥、客廳", text: $name)
                        .font(.title3.weight(.semibold)).foregroundStyle(Color.ink)
                        .focused($naming).submitLabel(.done)
                        .padding(.horizontal, 12).padding(.vertical, 10)
                        .background(Color.white, in: RoundedRectangle(cornerRadius: 10))
                        .overlay(RoundedRectangle(cornerRadius: 10).stroke(naming ? Color.forest : Color.line, lineWidth: naming ? 1.5 : 1))
                        .onSubmit(rename)
                        .onChange(of: naming) { _, focused in if !focused { rename() } }
                }

                stats

                ShareLink(item: url, subject: Text(scan.name), message: Text("築稿房間掃描檔")) {
                    Label("分享掃描檔", systemImage: "square.and.arrow.up")
                }
                .buttonStyle(PrimaryButtonStyle())

                Text("用 AirDrop、LINE 或「檔案」傳到電腦，在築稿網站匯入這個 .zhugao-scan.json 檔，就會變成一張可編輯的新圖面。檔案也存在這台手機的「檔案 > 我的 iPhone > 築稿掃描」裡。")
                    .font(.footnote).foregroundStyle(Color.ink2).fixedSize(horizontal: false, vertical: true)

                if !scan.objects.isEmpty { objectList }
            }
            .padding(20)
        }
        .background(Color.paper.ignoresSafeArea())
        .navigationTitle(scan.name)
        .navigationBarTitleDisplayMode(.inline)
        .scrollDismissesKeyboard(.interactively)
    }

    private var stats: some View {
        let doors = scan.openings.filter { $0.type == "door" }.count, windows = scan.openings.filter { $0.type == "window" }.count
        let xs = scan.walls.flatMap { [$0.x1, $0.x2] }, ys = scan.walls.flatMap { [$0.y1, $0.y2] }
        let w = (xs.max() ?? 0) - (xs.min() ?? 0), d = (ys.max() ?? 0) - (ys.min() ?? 0)
        return VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                chip("\(scan.walls.count)", "面牆")
                chip("\(doors)", "扇門")
                chip("\(windows)", "扇窗")
                chip("\(scan.objects.count)", "件家具")
            }
            Text("外框約 \(w.formatted()) × \(d.formatted()) mm，牆高 \((scan.walls.first?.h ?? 0).formatted()) mm")
                .font(.footnote.monospacedDigit()).foregroundStyle(Color.muted)
        }
    }

    private func chip(_ n: String, _ label: String) -> some View {
        VStack(spacing: 2) {
            Text(n).font(.title3.weight(.semibold).monospacedDigit()).foregroundStyle(Color.ink)
            Text(label).font(.caption).foregroundStyle(Color.muted)
        }
        .frame(maxWidth: .infinity).padding(.vertical, 10)
        .background(Color.sage, in: RoundedRectangle(cornerRadius: 12))
    }

    private var objectList: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("偵測到的家具").font(.subheadline.weight(.medium)).foregroundStyle(Color.muted)
            VStack(spacing: 0) {
                ForEach(Array(scan.objects.enumerated()), id: \.offset) { i, o in
                    HStack {
                        Text(Labels.name(of: o)).foregroundStyle(Color.ink)
                        Spacer()
                        Text("\(o.w) × \(o.d) × \(o.h)").font(.subheadline.monospacedDigit()).foregroundStyle(Color.ink2)
                    }
                    .padding(.horizontal, 14).padding(.vertical, 11)
                    if i < scan.objects.count - 1 { Divider().padding(.leading, 14) }
                }
            }
            .background(Color.sheet, in: RoundedRectangle(cornerRadius: 14))
            .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.line, lineWidth: 1))
        }
    }

    private func rename() {
        let n = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !n.isEmpty, n != scan.name else { name = scan.name; return }
        var next = scan; next.name = n
        if let u = try? store.save(next, replacing: url) { scan = next; url = u }
    }
}
