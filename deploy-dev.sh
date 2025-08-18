#!/bin/bash

echo "🚀 開始部署開發環境..."

# 檢查 Docker 是否運行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未運行，請先啟動 Docker"
    exit 1
fi

# 停止現有容器
echo "🛑 停止現有容器..."
docker-compose -f docker-compose.dev.yml down

# 清理舊的構建緩存
echo "🧹 清理構建緩存..."
docker system prune -f

# 構建並啟動開發服務
echo "🔨 構建並啟動開發服務..."
docker-compose -f docker-compose.dev.yml up --build -d

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 10

# 檢查服務狀態
echo "📊 檢查服務狀態..."
docker-compose -f docker-compose.dev.yml ps

echo "✅ 開發環境部署完成！"
echo "🌐 前端 (開發模式): http://localhost:3000"
echo "🔧 後端 API: http://localhost:5001"
echo ""
echo "📝 查看日誌: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 停止服務: docker-compose -f docker-compose.dev.yml down"
echo "🔄 重新構建前端: docker-compose -f docker-compose.dev.yml up --build frontend" 