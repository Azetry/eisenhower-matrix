# 艾森豪矩陣任務管理工具

## 📋 目錄

- [專案簡介](#專案簡介)
- [功能特色](#功能特色)
- [技術架構](#技術架構)
- [快速開始](#快速開始)
  - [Docker Compose 部署](#使用docker-compose推薦)
  - [Port 配置](#自定義-port-配置)
  - [手動安裝](#手動安裝)
- [使用說明](#使用說明)
- [四象限說明](#四象限說明)
- [API文檔](#api文檔)
- [部署說明](#部署說明)
- [Port 配置進階指南](#port-配置進階指南)
- [貢獻指南](#貢獻指南)
- [授權](#授權)

## 專案簡介

這是一個基於艾森豪矩陣（Eisenhower Matrix）的任務管理工具，幫助用戶根據任務的緊急性和重要性來分類和管理任務。

## 功能特色

- **四象限分類**：緊急且重要、重要但不緊急、緊急但不重要、既不緊急也不重要
- **任務管理**：新增、編輯、刪除、完成任務
- **拖拽排序**：直觀的拖拽操作來重新排序任務
- **數據持久化**：使用Redis存儲任務數據
- **響應式設計**：支援桌面和移動設備
- **Docker部署**：一鍵部署到任何環境

## 技術架構

- **前端**：React.js + TypeScript + Tailwind CSS
- **後端**：Node.js + Express.js
- **數據庫**：Redis
- **部署**：Docker + Docker Compose
- **反向代理**：Nginx

## 快速開始

### 使用Docker Compose（推薦）

```bash
# 克隆專案
git clone <repository-url>
cd eisenhower-matrix

# 啟動服務
./start.sh

# 訪問應用
http://localhost:3000
```

### 自定義 Port 配置

您可以自定義各個服務的 port，避免使用預設的 80 port（需要 root 權限）。

#### 方法 1: 使用互動式腳本（推薦）

```bash
# 運行互動式 port 設定腳本
./set-ports.sh
```

#### 方法 2: 創建 .env 文件

```bash
# 複製環境變數範例文件
cp env.example .env

# 編輯 .env 文件，設定您想要的 port
# 例如：NGINX_PORT=8080
```

#### 方法 3: 直接在命令行設定

```bash
# 使用 8080 port 作為 nginx 入口
NGINX_PORT=8080 ./start.sh

# 或者設定多個 port
NGINX_PORT=8080 FRONTEND_PORT=3001 BACKEND_PORT=5002 ./start.sh
```

#### 可配置的 Port

| 服務 | 環境變數 | 預設值 | 說明 |
|------|----------|--------|------|
| Nginx | `NGINX_PORT` | 80 | 反向代理入口（建議：8080, 9000） |
| 前端 | `FRONTEND_PORT` | 3000 | 前端應用服務 |
| 後端 | `BACKEND_PORT` | 5001 | 後端 API 服務 |
| Redis | `REDIS_PORT` | 6379 | Redis 數據庫服務 |

#### 範例配置

**使用 8080 port 作為 nginx 入口：**
```bash
# .env 文件內容
NGINX_PORT=8080
FRONTEND_PORT=3000
BACKEND_PORT=5001
REDIS_PORT=6379
```

啟動後訪問：
- 🌐 Nginx 代理: http://localhost:8080
- 📱 前端應用: http://localhost:3000  
- 🔧 後端 API: http://localhost:5001

**注意事項：**
- 確保選擇的 port 沒有被其他服務使用
- 建議使用 1024 以上的 port 避免權限問題
- 使用 nginx 時建議通過 nginx 的 port 訪問應用

### 手動安裝

```bash
# 安裝依賴
cd frontend && npm install
cd ../backend && npm install

# 啟動Redis
redis-server

# 啟動後端
cd backend && npm run dev

# 啟動前端
cd frontend && npm start
```

## 使用說明

1. **新增任務**：點擊"新增任務"按鈕，填寫任務名稱和描述
2. **分類任務**：將任務拖拽到對應的象限中
3. **編輯任務**：點擊任務卡片進行編輯
4. **完成任務**：勾選任務完成狀態
5. **刪除任務**：點擊刪除按鈕移除任務

## 四象限說明

- **第一象限（緊急且重要）**：立即處理的重要任務
- **第二象限（重要但不緊急）**：計劃和準備的重要任務
- **第三象限（緊急但不重要）**：可以委託或簡化的任務
- **第四象限（既不緊急也不重要）**：可以考慮刪除的任務

## API文檔

### 任務相關API

- `GET /api/tasks` - 獲取所有任務
- `POST /api/tasks` - 創建新任務
- `PUT /api/tasks/:id` - 更新任務
- `DELETE /api/tasks/:id` - 刪除任務

## 部署說明

詳細的部署說明請參考 `docs/deployment.md` 文件。

## Port 配置進階指南

### 檢查 Port 使用情況

```bash
# 檢查特定 port 是否被占用
lsof -i :8080

# 檢查所有監聽的 port
netstat -tulpn | grep LISTEN
```

### 故障排除

#### Port 被占用錯誤

如果遇到 "port already in use" 錯誤：

1. **停止佔用 port 的服務：**
   ```bash
   # 停止所有 Docker 服務
   ./stop.sh
   
   # 或者停止特定 port 的服務
   sudo lsof -ti:8080 | xargs kill -9
   ```

2. **選擇其他 port：**
   ```bash
   # 使用 9000 port
   NGINX_PORT=9000 ./start.sh
   ```

3. **重新啟動服務：**
   ```bash
   ./start.sh
   ```

#### 權限問題

如果使用 80 port 遇到權限錯誤：

```bash
# 使用 sudo 運行（不推薦）
sudo ./start.sh

# 或者使用自定義 port（推薦）
NGINX_PORT=8080 ./start.sh
```

### 生產環境配置

生產環境建議使用以下配置：

```bash
# .env 文件
NGINX_PORT=443  # HTTPS
FRONTEND_PORT=3000
BACKEND_PORT=5001
REDIS_PORT=6379
```

### 多環境配置

可以為不同環境創建不同的配置文件：

```bash
# 開發環境
cp env.example .env.dev
# 編輯 .env.dev

# 生產環境  
cp env.example .env.prod
# 編輯 .env.prod

# 使用特定環境配置
docker-compose --env-file .env.prod up -d
```

## 貢獻指南

歡迎提交Issue和Pull Request來改進這個專案。

## 授權

MIT License 