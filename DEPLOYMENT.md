# 艾森豪矩陣應用部署指南

## 概述

本應用已從 Create React App (CRA) 遷移到 Vite，提供更快的開發體驗和更好的構建性能。

## 前置要求

- Docker 和 Docker Compose
- Node.js 18+ (本地開發)
- npm 或 yarn

## 手動安裝依賴

在 `frontend` 目錄中執行以下命令：

```bash
cd frontend

# 移除 CRA 相關依賴
npm uninstall react-scripts @testing-library/jest-dom @testing-library/react @testing-library/user-event

# 安裝 Vite 和相關依賴
npm install --save-dev vite @vitejs/plugin-react
```

## 部署方式

### 1. 生產環境部署

使用生產環境配置部署：

```bash
# 給腳本執行權限
chmod +x deploy.sh

# 執行部署
./deploy.sh
```

或者手動執行：

```bash
docker-compose up --build -d
```

### 2. 開發環境部署

使用開發環境配置部署：

```bash
# 給腳本執行權限
chmod +x deploy-dev.sh

# 執行開發環境部署
./deploy-dev.sh
```

或者手動執行：

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

## 環境配置

### 生產環境
- 前端：http://localhost:3000 (Nginx 服務靜態文件)
- 後端：http://localhost:5001
- Nginx：http://localhost:80

### 開發環境
- 前端：http://localhost:3000 (Vite 開發服務器)
- 後端：http://localhost:5001

## 構建流程

### 生產構建
1. 使用 Node.js 18 Alpine 鏡像構建
2. 安裝依賴並構建應用 (`npm run build`)
3. 使用 Nginx Alpine 鏡像服務靜態文件
4. 啟用 gzip 壓縮和靜態資源緩存

### 開發構建
1. 使用 Node.js 18 Alpine 鏡像
2. 安裝依賴
3. 啟動 Vite 開發服務器 (`npm run dev`)
4. 支持熱重載和源碼映射

## 常用命令

```bash
# 查看服務狀態
docker-compose ps

# 查看日誌
docker-compose logs -f

# 停止服務
docker-compose down

# 重新構建前端
docker-compose up --build frontend

# 清理 Docker 緩存
docker system prune -f
```

## 開發工作流

1. 修改前端代碼
2. Vite 自動熱重載
3. 測試功能
4. 構建生產版本：`npm run build`
5. 部署到生產環境

## 性能優化

- 使用 Vite 進行快速構建
- 啟用 gzip 壓縮
- 靜態資源長期緩存
- 代碼分割優化
- 多階段 Docker 構建

## 故障排除

### 常見問題

1. **端口衝突**：確保 3000、5001、80 端口未被佔用
2. **構建失敗**：檢查 Node.js 版本和依賴安裝
3. **熱重載不工作**：檢查 Docker 卷掛載配置

### 日誌查看

```bash
# 查看前端日誌
docker-compose logs frontend

# 查看後端日誌
docker-compose logs backend

# 查看 Nginx 日誌
docker-compose logs nginx
```

## 更新日誌

- **v2.0.0**: 從 CRA 遷移到 Vite
- 優化 Docker 構建流程
- 添加開發環境配置
- 改進部署腳本 