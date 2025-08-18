# Port 配置說明

## 自定義 Port 配置

您可以通過環境變數來自定義各個服務的 port，而不使用預設值。

## 環境變數

創建一個 `.env` 文件在專案根目錄，並設定以下變數：

```bash
# Nginx 反向代理 port (預設: 80)
NGINX_PORT=8080

# Redis 服務 port (預設: 6379)
REDIS_PORT=6379

# 後端 API 服務 port (預設: 5001)
BACKEND_PORT=5001

# 前端服務 port (預設: 3000)
FRONTEND_PORT=3000
```

## 使用方法

### 方法 1: 使用 .env 文件

1. 複製 `env.example` 文件為 `.env`：
   ```bash
   cp env.example .env
   ```

2. 編輯 `.env` 文件，修改您想要的 port：
   ```bash
   NGINX_PORT=8080
   ```

3. 啟動服務：
   ```bash
   ./start.sh
   ```

### 方法 2: 直接在命令行設定

```bash
NGINX_PORT=8080 FRONTEND_PORT=3001 BACKEND_PORT=5002 docker-compose up -d
```

### 方法 3: 匯出環境變數

```bash
export NGINX_PORT=8080
export FRONTEND_PORT=3001
export BACKEND_PORT=5002
./start.sh
```

## 範例配置

### 使用 8080 port 作為 nginx 入口

```bash
# .env 文件
NGINX_PORT=8080
FRONTEND_PORT=3000
BACKEND_PORT=5001
REDIS_PORT=6379
```

啟動後，您可以通過以下 URL 訪問：
- Nginx 代理: http://localhost:8080
- 前端應用: http://localhost:3000
- 後端 API: http://localhost:5001

### 使用 9000 port 作為 nginx 入口

```bash
# .env 文件
NGINX_PORT=9000
FRONTEND_PORT=3000
BACKEND_PORT=5001
REDIS_PORT=6379
```

啟動後，您可以通過以下 URL 訪問：
- Nginx 代理: http://localhost:9000
- 前端應用: http://localhost:3000
- 後端 API: http://localhost:5001

## 注意事項

1. **Port 衝突**: 確保您選擇的 port 沒有被其他服務使用
2. **防火牆設定**: 如果使用自定義 port，請確保防火牆允許該 port 的連接
3. **反向代理**: 使用 nginx 時，建議通過 nginx 的 port 訪問應用，而不是直接訪問前端或後端服務
4. **環境變數優先級**: 命令行設定的環境變數會覆蓋 `.env` 文件中的設定

## 檢查當前配置

啟動服務後，腳本會顯示所有服務的 URL：

```bash
./start.sh
```

輸出範例：
```
📱 前端應用: http://localhost:3000
🔧 後端API: http://localhost:5001
🌐 Nginx代理: http://localhost:8080
```

## 故障排除

如果遇到 port 被占用的錯誤：

1. 檢查 port 是否被其他服務使用：
   ```bash
   lsof -i :8080
   ```

2. 停止佔用 port 的服務或選擇其他 port

3. 重新啟動服務：
   ```bash
   ./stop.sh
   ./start.sh
   ``` 