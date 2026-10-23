# 築稿掃描（iOS）

用 iPhone 或 iPad 的 LiDAR 搭配 Apple RoomPlan 掃描房間，輸出 `.zhugao-scan.json`，再匯入築稿網站變成平面圖。檔案格式見 [EXPORT_FORMAT.md](EXPORT_FORMAT.md)。

## 需求

- **編譯：** Xcode 26 以上，專案由 `project.yml` 透過 XcodeGen 產生。
- **掃描：** 配備 LiDAR 的裝置，也就是 iPhone 12 Pro 以後的 Pro 與 Pro Max，或 2020 年以後的 iPad Pro，系統為 iOS 17 以上。
- **其他裝置：** 沒有 LiDAR 的裝置與模擬器只能使用「載入範例掃描」。

## 在模擬器試用

```bash
xcodegen generate
open ZhugaoScan.xcodeproj
```

在 Xcode 選一台 iPhone 模擬器後按執行，再點「載入範例掃描」，就能試用平面圖預覽、命名和分享流程。

## 安裝到自己的 iPhone

1. 用傳輸線把 iPhone 接上這台 Mac，在 iPhone 上點「信任這部電腦」。
2. 打開 `ZhugaoScan.xcodeproj`，點左側的 **ZhugaoScan** 專案，選 **Signing & Capabilities** 分頁。
3. **Team** 選你的 Apple ID。如果還沒有，先到 Xcode › Settings › Accounts 加入。免費的 Apple ID 也可以，但安裝後 7 天內有效，之後要重新安裝。
4. 如果出現 Bundle Identifier 已被使用的錯誤，把 `app.zhugao.scan` 改成獨一無二的名稱，例如 `app.zhugao.scan.你的名字`。
5. 在 Xcode 上方的執行目標選你的 iPhone，按 ▶︎ 執行。
6. 第一次執行時，iPhone 會提示開發者不受信任：到「設定 › 一般 › VPN 與裝置管理」，信任你的 Apple ID 後再開啟 App。
7. 使用 iOS 16 以後的系統時，還需要到「設定 › 隱私權與安全性 › 開發者模式」打開開發者模式，並重新開機。

## 使用方式

1. 點「開始掃描」，拿著手機慢慢繞房間一圈，鏡頭對準牆面與地板交界。
2. 點「完成掃描」，等 RoomPlan 整理出 3D 模型後，點「使用這次掃描」。
3. 在結果頁替房間命名，再按「分享掃描檔」用 AirDrop、LINE 或「檔案」傳到電腦。
4. 掃描檔也會保存在「檔案 › 我的 iPhone › 築稿掃描」。
