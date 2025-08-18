# Eisenhower Matrix Frontend

艾森豪矩陣任務管理工具前端應用程式

## 功能特色

- 📊 **艾森豪矩陣**：根據任務的緊急性和重要性分類任務
- 🎯 **任務管理**：新增、編輯、刪除、完成任務
- 🔄 **拖拽操作**：直觀的拖拽介面來移動任務
- 🌐 **多語言支援**：支援繁體中文和英文
- 📱 **響應式設計**：適配各種螢幕尺寸
- ⚡ **即時更新**：與後端 API 即時同步

## 多語言功能

應用程式現在支援兩種語言：

- **繁體中文** (zh-TW) - 預設語言
- **English** (en) - 英文介面

### 語言切換

- 點擊右上角的語言切換按鈕
- 選擇您偏好的語言
- 語言設定會自動保存到瀏覽器本地儲存

### 支援的語言內容

- 應用程式標題和描述
- 象限標題和說明
- 任務表單標籤和按鈕
- 使用建議和提示
- 錯誤訊息和確認對話框

## 技術架構

- **React 18** - 前端框架
- **Vite** - 建構工具
- **Tailwind CSS** - 樣式框架
- **react-beautiful-dnd** - 拖拽功能
- **react-i18next** - 國際化支援
- **date-fns** - 日期處理

## 開發環境設定

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建構生產版本

```bash
npm run build
```

### 程式碼檢查

```bash
npm run lint
```

## 專案結構

```
src/
├── components/          # React 組件
│   ├── Header.jsx      # 頁面標題和語言切換
│   ├── EisenhowerMatrix.jsx  # 主要矩陣組件
│   ├── Quadrant.jsx    # 象限組件
│   ├── TaskCard.jsx    # 任務卡片組件
│   ├── TaskModal.jsx   # 任務編輯模態框
│   └── LanguageSwitcher.jsx  # 語言切換組件
├── i18n.js             # 國際化配置
├── App.jsx             # 主要應用程式組件
└── main.jsx            # 應用程式入口點
```

## 環境變數

在 `.env` 檔案中設定：

```env
VITE_API_URL=http://localhost:5001
```

## 部署

應用程式可以部署到任何靜態網站託管服務：

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案！

## 授權

MIT License
