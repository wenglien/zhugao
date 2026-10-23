import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var store: ScanStore
    @State private var scanning = false
    @State private var path: [SavedScan] = []
    @State private var saveError: String?
    private let supported = RoomScanSupport.isSupported

    var body: some View {
        NavigationStack(path: $path) {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    header
                    scanCard
                    if !store.scans.isEmpty { savedList }
                    tips
                }
                .padding(.horizontal, 20).padding(.vertical, 16)
            }
            .background(Color.paper.ignoresSafeArea())
            .navigationDestination(for: SavedScan.self) { ResultView(saved: $0) }
            .fullScreenCover(isPresented: $scanning) {
                ScanFlowView { open($0) }
            }
            .alert("無法儲存掃描檔", isPresented: Binding(get: { saveError != nil }, set: { if !$0 { saveError = nil } })) {
                Button("好") {}
            } message: { Text(saveError ?? "") }
        }
        .tint(.forest)
    }

    private var header: some View {
        HStack(spacing: 14) {
            LogoMark(size: 48)
            VStack(alignment: .leading, spacing: 2) {
                Text("築稿掃描").font(.title2.weight(.bold)).foregroundStyle(Color.ink)
                Text("用 LiDAR 掃描房間，帶回築稿變成平面圖").font(.subheadline).foregroundStyle(Color.muted)
            }
        }
        .padding(.top, 8)
    }

    private var scanCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            if supported {
                Text("拿著手機慢慢繞房間一圈").font(.headline).foregroundStyle(Color.ink)
                Text("鏡頭對準牆面與地板交界，畫面會標出偵測到的牆、門窗和家具。掃描完成後可以預覽平面圖、命名並分享檔案。")
                    .font(.subheadline).foregroundStyle(Color.ink2).fixedSize(horizontal: false, vertical: true)
                Button { scanning = true } label: { Label("開始掃描", systemImage: "viewfinder") }
                    .buttonStyle(PrimaryButtonStyle())
            } else {
                Label("這台裝置無法使用 LiDAR 掃描", systemImage: "exclamationmark.triangle")
                    .font(.headline).foregroundStyle(Color.ink)
                Text("房間掃描需要配備 LiDAR 的裝置：iPhone 12 Pro 以後的 Pro 與 Pro Max 機型，或 2020 年以後的 iPad Pro。你仍然可以載入範例掃描，看看匯出的平面圖長什麼樣子。")
                    .font(.subheadline).foregroundStyle(Color.ink2).fixedSize(horizontal: false, vertical: true)
            }
            Button { open(SampleScan.make()) } label: { Label("載入範例掃描", systemImage: "square.dashed") }
                .buttonStyle(PrimaryButtonStyle(filled: !supported))
        }
        .padding(18)
        .background(Color.sheet, in: RoundedRectangle(cornerRadius: 16))
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color.line, lineWidth: 1))
    }

    private var savedList: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("已儲存的掃描").font(.subheadline.weight(.medium)).foregroundStyle(Color.muted)
            VStack(spacing: 0) {
                ForEach(store.scans) { s in
                    NavigationLink(value: s) {
                        HStack(spacing: 12) {
                            PlanPreview(scan: s.scan, showLabels: false)
                                .frame(width: 56, height: 56).clipShape(RoundedRectangle(cornerRadius: 8))
                                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.line, lineWidth: 1))
                            VStack(alignment: .leading, spacing: 3) {
                                Text(s.scan.name).font(.body.weight(.semibold)).foregroundStyle(Color.ink)
                                Text("\(s.scan.scannedAt.formatted(date: .abbreviated, time: .shortened))，\(s.scan.walls.count) 面牆、\(s.scan.objects.count) 件家具")
                                    .font(.caption).foregroundStyle(Color.muted)
                            }
                            Spacer()
                            Image(systemName: "chevron.right").font(.caption.weight(.semibold)).foregroundStyle(Color.muted)
                        }
                        .padding(.horizontal, 14).padding(.vertical, 10)
                    }
                    .contextMenu { Button("刪除", systemImage: "trash", role: .destructive) { store.delete(s) } }
                    if s != store.scans.last { Divider().padding(.leading, 82) }
                }
            }
            .background(Color.sheet, in: RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color.line, lineWidth: 1))
        }
    }

    private var tips: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("掃描小技巧").font(.subheadline.weight(.medium)).foregroundStyle(Color.muted)
            ForEach(["打開房間所有燈，避免強烈逆光", "門保持打開，掃描完一間再走到下一間", "鏡子與大片玻璃容易誤判，必要時回到築稿手動修正", "掃描尺寸僅供規劃參考，施工前請再現場丈量"], id: \.self) { t in
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Circle().fill(Color.forest).frame(width: 5, height: 5)
                    Text(t).font(.footnote).foregroundStyle(Color.ink2)
                }
            }
        }
        .padding(.top, 4)
    }

    private func open(_ scan: ScanExport) {
        do {
            let url = try store.save(scan)
            path = [SavedScan(url: url, scan: scan)]
        } catch { saveError = error.localizedDescription }
    }
}
