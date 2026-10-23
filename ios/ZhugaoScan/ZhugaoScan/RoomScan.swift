import SwiftUI
import RoomPlan

enum RoomScanSupport {
    static var isSupported: Bool { RoomCaptureSession.isSupported }
}

extension ScanConverter {
    static func export(from room: CapturedRoom, name: String, date: Date = Date()) -> ScanExport {
        func raw(_ s: CapturedRoom.Surface, _ k: RawSurface.Kind) -> RawSurface {
            RawSurface(kind: k, id: s.identifier, parent: s.parentIdentifier, transform: s.transform, dimensions: s.dimensions)
        }
        var surfaces = room.walls.map { raw($0, .wall) }
        surfaces += room.doors.map { raw($0, .door) }
        surfaces += room.windows.map { raw($0, .window) }
        surfaces += room.openings.map { raw($0, .opening) }
        let objects = room.objects.map { RawObject(category: String(describing: $0.category), transform: $0.transform, dimensions: $0.dimensions) }
        return export(name: name, date: date, surfaces: surfaces, objects: objects)
    }
}

/// Owns the RoomCaptureView and turns its delegate callbacks into published state.
final class ScanController: NSObject, ObservableObject, RoomCaptureViewDelegate {
    enum Phase { case scanning, processing, done, failed }
    @Published var phase: Phase = .scanning
    @Published var room: CapturedRoom?
    @Published var errorText: String?
    let view: RoomCaptureView

    override init() {
        view = RoomCaptureView(frame: .zero)
        super.init()
        view.delegate = self
    }

    // RoomCaptureViewDelegate requires NSSecureCoding; the controller is never archived.
    static var supportsSecureCoding: Bool { true }
    func encode(with coder: NSCoder) {}
    required init?(coder: NSCoder) { return nil }

    func start() { phase = .scanning; view.captureSession.run(configuration: RoomCaptureSession.Configuration()) }
    func finish() { phase = .processing; view.captureSession.stop() }
    func cancel() { view.captureSession.stop() }

    func captureView(shouldPresent roomDataForProcessing: CapturedRoomData, error: Error?) -> Bool { true }

    func captureView(didPresent processedResult: CapturedRoom, error: Error?) {
        DispatchQueue.main.async {
            if let error { self.errorText = error.localizedDescription; self.phase = .failed; return }
            self.room = processedResult; self.phase = .done
        }
    }
}

struct RoomCaptureContainer: UIViewRepresentable {
    let controller: ScanController
    func makeUIView(context: Context) -> RoomCaptureView { controller.view }
    func updateUIView(_ uiView: RoomCaptureView, context: Context) {}
}

/// Full-screen scan: live RoomPlan coaching, then RoomPlan's own result model, then hand-off.
struct ScanFlowView: View {
    @StateObject private var controller = ScanController()
    @Environment(\.dismiss) private var dismiss
    var onFinish: (ScanExport) -> Void

    var body: some View {
        ZStack(alignment: .top) {
            RoomCaptureContainer(controller: controller).ignoresSafeArea()
            HStack {
                Button("取消") { controller.cancel(); dismiss() }
                    .buttonStyle(PillButtonStyle(filled: false))
                Spacer()
                switch controller.phase {
                case .scanning:
                    Button("完成掃描") { controller.finish() }.buttonStyle(PillButtonStyle(filled: true))
                case .processing:
                    HStack(spacing: 8) { ProgressView().tint(.white); Text("正在整理房間模型") }
                        .font(.subheadline).foregroundStyle(.white)
                        .padding(.horizontal, 14).padding(.vertical, 9).background(.black.opacity(0.55), in: Capsule())
                case .done:
                    Button("使用這次掃描") {
                        if let room = controller.room { onFinish(ScanConverter.export(from: room, name: "新掃描")) }
                        dismiss()
                    }.buttonStyle(PillButtonStyle(filled: true))
                case .failed:
                    Button("重新掃描") { controller.start() }.buttonStyle(PillButtonStyle(filled: true))
                }
            }
            .padding(.horizontal, 16).padding(.top, 8)
            if let err = controller.errorText, controller.phase == .failed {
                Text("掃描沒有完成：\(err)").font(.footnote).foregroundStyle(.white)
                    .padding(12).background(.black.opacity(0.6), in: RoundedRectangle(cornerRadius: 10))
                    .padding(.top, 64).padding(.horizontal, 16)
            }
        }
        .onAppear { controller.start() }
        .onDisappear { controller.cancel() }
        .statusBarHidden()
    }
}
