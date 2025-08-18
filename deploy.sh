#!/bin/bash

echo "🚀 開始部署艾森豪矩陣應用..."

# 檢查 Docker 是否運行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未運行，請先啟動 Docker"
    exit 1
fi

# 停止現有容器
echo "🛑 停止現有容器..."
docker-compose down

# 清理舊的構建緩存
echo "🧹 清理構建緩存..."
docker system prune -f

# 構建並啟動服務
echo "🔨 構建並啟動服務..."
docker-compose up --build -d

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 10

# 檢查服務狀態
echo "📊 檢查服務狀態..."
docker-compose ps

echo "✅ 部署完成！"
echo "🌐 前端: http://localhost:3000"
echo "🔧 後端 API: http://localhost:5001"
echo "📱 Nginx: http://localhost:80"
echo ""
echo "📝 查看日誌: docker-compose logs -f"
echo "🛑 停止服務: docker-compose down" 