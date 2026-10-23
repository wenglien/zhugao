# 築稿掃描匯出格式（`*.zhugao-scan.json`）

築稿掃描 App 用 Apple RoomPlan 掃描房間後，輸出這個 JSON 檔。築稿網站讀取它，建立一張新的平面圖面。

## 座標系統

- **單位：** 全部是公釐（mm），整數。
- **平面座標：** x 向右、y 向下，與築稿網站平面圖相同。
- **對應 RoomPlan 世界座標（公尺，y 朝上）：**
  - `x = world.x × 1000`
  - `y = world.z × 1000`
  - 從上往下看，RoomPlan 的 +z 正好朝畫面下方，所以直接沿用 +z，平面圖不會左右鏡像。
- **原點：** 所有牆端點中最小的 x 與最小的 y，因此牆座標都 ≥ 0；家具座標也以同一個原點換算。
- **角度：** `rot` 為度數，在平面圖上順時針為正（y 向下時 `atan2` 的方向），範圍 0–359。物件的本地 x 軸（寬度方向）旋轉 `rot` 度後就是它在平面上的方向。

## 結構

```json
{
  "format": "zhugao-scan",
  "version": 1,
  "name": "主臥",
  "scannedAt": "2026-10-22T07:01:45Z",
  "walls": [
    { "x1": 0, "y1": 0, "x2": 5000, "y2": 0, "t": 120, "h": 2700 }
  ],
  "openings": [
    { "type": "window", "wall": 0, "pos": 1700, "w": 1800, "h": 1300, "sill": 900 }
  ],
  "objects": [
    { "category": "bed", "kind": "bed", "x": 1300, "y": 1050, "w": 1600, "d": 2100, "h": 500, "rot": 0 }
  ]
}
```

### 頂層欄位

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `format` | 字串 | 固定為 `"zhugao-scan"`，匯入時用來辨識檔案 |
| `version` | 整數 | 目前為 `1`。日後欄位有不相容的變更才會增加 |
| `name` | 字串 | 使用者在 App 裡取的房間名稱 |
| `scannedAt` | 字串 | 掃描時間，ISO 8601（UTC） |
| `walls` | 陣列 | 牆面，見下表 |
| `openings` | 陣列 | 門、窗與無門片的開口 |
| `objects` | 陣列 | RoomPlan 偵測到的家具與設備 |

### `walls[]`

| 欄位 | 說明 |
| --- | --- |
| `x1, y1, x2, y2` | 牆中心線的兩個端點 |
| `t` | 牆厚。RoomPlan 通常回報厚度 0，這時預設為 **120** |
| `h` | 牆高，取自 RoomPlan 的牆面尺寸 |

### `openings[]`

| 欄位 | 說明 |
| --- | --- |
| `type` | `"door"`、`"window"` 或 `"opening"`（沒有門片的開口） |
| `wall` | 所在牆面在 `walls` 陣列中的索引。iOS 17 以後優先使用 RoomPlan 的 `parentIdentifier`，沒有時改用最近的牆 |
| `pos` | 從牆起點（`x1, y1`）沿牆量到開口**中心**的距離，已夾在牆長範圍內 |
| `w`, `h` | 開口寬度與高度 |
| `sill` | 窗台高度，從最低的牆底（視為完成地坪）量起；門固定為 0 |

開門方向沒有輸出，RoomPlan 不提供這項資訊。網站匯入後預設朝房間內側開，可再手動翻轉。

### `objects[]`

| 欄位 | 說明 |
| --- | --- |
| `category` | RoomPlan 的原始分類名稱，例如 `storage`、`refrigerator` |
| `kind` | 對應的築稿家具種類，見下表 |
| `x`, `y` | 物件中心 |
| `w`, `d`, `h` | 寬（本地 x）、深（本地 z）、高 |
| `rot` | 見上方「角度」 |

#### RoomPlan 分類 → 築稿 `kind`

| RoomPlan `category` | `kind` |
| --- | --- |
| `bed` | `bed` |
| `sofa` | `sofa` |
| `table` | `table` |
| `chair` | `chair` |
| `storage` | 高度大於 1500 mm 為 `wardrobe`，其餘為 `cabinet` |
| `refrigerator` | `fridge` |
| `stove`, `oven`, `dishwasher` | `counter` |
| `sink` | `vanity` |
| `toilet` | `toilet` |
| `bathtub` | `bathtub` |
| `television` | `tvstand` |
| `washerDryer`, `fireplace`, `stairs`，以及未來新增的分類 | `cabinet` |

匯入端如果遇到不認識的 `kind`，建議當成 `cabinet` 處理，並保留 `category` 作為名稱參考。

## 匯入到築稿網站的建議對應

- **牆：** `walls[i]` → 圖面上的 `walls`（`x1, y1, x2, y2, t, h` 欄位相同）。
- **門窗：** `openings[i]` → `openings`，用 `wall` 索引找到新建的牆 id。`pos`、`w`、`h`、`sill` 直接沿用；`type: "opening"` 可當成沒有門片的門。
- **家具：** `objects[i]` → `items`，`kind`、`w`、`d`、`h`、`rot`、`x`、`y` 直接沿用；名稱可用分類中文名（床、收納櫃、冰箱等），編號依網站的規則產生。
- **房間：** 檔案沒有空間（room）多邊形，可以用牆的外框建立一個以 `name` 命名的空間。
