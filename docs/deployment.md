# 艾森豪矩陣任務管理工具 - 部署指南

## 系統要求

- Docker 20.10+
- Docker Compose 2.0+
- 至少 2GB RAM
- 至少 10GB 磁盤空間

## 快速部署

### 1. 克隆專案

```bash
git clone <repository-url>
cd eisenhower-matrix
```

### 2. 環境配置

創建環境變數文件（可選）：

```bash
# 後端環境變數
cp backend/.env.example backend/.env

# 前端環境變數
cp frontend/.env.example frontend/.env
```

### 3. 啟動服務

```bash
# 構建並啟動所有服務
docker-compose up -d --build

# 查看服務狀態
docker-compose ps

# 查看日誌
docker-compose logs -f
```

### 4. 訪問應用

- **前端應用**: http://localhost:3000
- **後端API**: http://localhost:5001
- **Nginx代理**: http://localhost:80 (或 http://localhost)

## 詳細部署步驟

### 手動部署（不使用Docker）

#### 後端部署

1. **安裝依賴**
```bash
cd backend
npm install
```

2. **配置Redis**
```bash
# 安裝Redis
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# 啟動Redis
redis-server
```

3. **啟動後端服務**
```bash
cd backend
npm run dev
```

#### 前端部署

1. **安裝依賴**
```bash
cd frontend
npm install
```

2. **構建生產版本**
```bash
npm run build
```

3. **啟動開發服務器**
```bash
npm start
```

### 生產環境部署

#### 使用Docker Compose

1. **生產環境配置**
```bash
# 創建生產環境的docker-compose文件
cp docker-compose.yml docker-compose.prod.yml
```

2. **修改生產環境配置**
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - /app/node_modules
  
  frontend:
    environment:
      - REACT_APP_API_URL=http://your-domain.com/api
      - REACT_APP_ENV=production
    volumes:
      - ./frontend:/app
      - /app/node_modules
```

3. **啟動生產服務**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### 使用Nginx作為反向代理

1. **配置Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

2. **重啟Nginx**
```bash
sudo systemctl restart nginx
```

## 環境變數配置

### 後端環境變數

```bash
# backend/.env
NODE_ENV=production
PORT=5001
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 前端環境變數

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5001
REACT_APP_ENV=development
REACT_APP_TITLE=艾森豪矩陣任務管理工具
```

## 數據庫管理

### Redis數據備份

```bash
# 備份數據
docker exec eisenhower-redis redis-cli BGSAVE

# 複製備份文件
docker cp eisenhower-redis:/data/dump.rdb ./backup/

# 恢復數據
docker cp ./backup/dump.rdb eisenhower-redis:/data/
docker exec eisenhower-redis redis-cli BGREWRITEAOF
```

### 數據持久化

Redis數據會自動持久化到Docker volume中：

```bash
# 查看volume
docker volume ls

# 備份volume
docker run --rm -v eisenhower-matrix_redis_data:/data -v $(pwd):/backup alpine tar czf /backup/redis_backup.tar.gz -C /data .
```

## 監控和日誌

### 查看服務狀態

```bash
# 查看所有容器狀態
docker-compose ps

# 查看特定服務日誌
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
docker-compose logs redis

# 實時查看日誌
docker-compose logs -f [service_name]
```

### 健康檢查

```bash
# 檢查後端健康狀態
curl http://localhost:5001/health

# 檢查Nginx狀態
curl http://localhost/health
```

## 故障排除

### 常見問題

1. **端口衝突**
```bash
# 檢查端口使用情況
netstat -tulpn | grep :80
netstat -tulpn | grep :3000
netstat -tulpn | grep :5001

# 修改docker-compose.yml中的端口映射
```

2. **Redis連接失敗**
```bash
# 檢查Redis容器狀態
docker-compose ps redis

# 檢查Redis日誌
docker-compose logs redis

# 重啟Redis服務
docker-compose restart redis
```

3. **前端無法連接後端**
```bash
# 檢查環境變數
echo $REACT_APP_API_URL

# 檢查後端服務狀態
curl http://localhost:5001/health
```

### 重啟服務

```bash
# 重啟特定服務
docker-compose restart [service_name]

# 重啟所有服務
docker-compose restart

# 完全重建服務
docker-compose down
docker-compose up -d --build
```

## 安全配置

### 防火牆設置

```bash
# Ubuntu/Debian
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### SSL/TLS配置

1. **獲取SSL證書**
```bash
# 使用Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

2. **配置HTTPS**
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # 其他配置...
}
```

## 性能優化

### 前端優化

1. **啟用Gzip壓縮**
2. **配置靜態資源緩存**
3. **使用CDN加速**

### 後端優化

1. **Redis連接池配置**
2. **API響應緩存**
3. **數據庫查詢優化**

### 系統優化

1. **調整Docker資源限制**
2. **配置系統swap**
3. **優化文件描述符限制**

## 備份和恢復

### 完整備份腳本

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# 備份Redis數據
docker exec eisenhower-redis redis-cli BGSAVE
sleep 5
docker cp eisenhower-redis:/data/dump.rdb $BACKUP_DIR/

# 備份配置文件
cp docker-compose.yml $BACKUP_DIR/
cp -r nginx/ $BACKUP_DIR/
cp -r backend/ $BACKUP_DIR/
cp -r frontend/ $BACKUP_DIR/

# 創建備份歸檔
tar -czf "${BACKUP_DIR}.tar.gz" -C $BACKUP_DIR .
rm -rf $BACKUP_DIR

echo "備份完成: ${BACKUP_DIR}.tar.gz"
```

### 恢復腳本

```bash
#!/bin/bash
# restore.sh

if [ -z "$1" ]; then
    echo "請指定備份文件路徑"
    exit 1
fi

BACKUP_FILE=$1
RESTORE_DIR="./restore_$(date +%Y%m%d_%H%M%S)"

mkdir -p $RESTORE_DIR
tar -xzf $BACKUP_FILE -C $RESTORE_DIR

# 恢復Redis數據
docker cp $RESTORE_DIR/dump.rdb eisenhower-redis:/data/
docker exec eisenhower-redis redis-cli BGREWRITEAOF

# 恢復配置文件
cp $RESTORE_DIR/docker-compose.yml ./
cp -r $RESTORE_DIR/nginx/ ./
cp -r $RESTORE_DIR/backend/ ./
cp -r $RESTORE_DIR/frontend/ ./

# 重啟服務
docker-compose down
docker-compose up -d --build

rm -rf $RESTORE_DIR
echo "恢復完成"
```

## 更新和維護

### 更新應用

```bash
# 拉取最新代碼
git pull origin main

# 重新構建並啟動服務
docker-compose down
docker-compose up -d --build
```

### 定期維護

1. **清理Docker資源**
```bash
# 清理未使用的鏡像
docker image prune -f

# 清理未使用的容器
docker container prune -f

# 清理未使用的volumes
docker volume prune -f
```

2. **更新依賴**
```bash
# 更新後端依賴
cd backend && npm update

# 更新前端依賴
cd frontend && npm update
```

3. **監控系統資源**
```bash
# 查看系統資源使用情況
docker stats

# 查看磁盤使用情況
df -h
```

## 支援和聯繫

如果您在部署過程中遇到問題，請：

1. 檢查本文檔的故障排除部分
2. 查看GitHub Issues
3. 提交新的Issue描述問題
4. 聯繫開發團隊

---

*最後更新: 2024年12月* 