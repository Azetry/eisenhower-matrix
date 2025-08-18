#!/bin/bash

# 艾森豪矩陣任務管理工具啟動腳本

echo "🚀 啟動艾森豪矩陣任務管理工具..."

# 檢查Docker是否運行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker未運行，請先啟動Docker"
    exit 1
fi

# 檢查Docker Compose是否可用
if ! docker-compose --version > /dev/null 2>&1; then
    echo "❌ Docker Compose不可用，請檢查安裝"
    exit 1
fi

echo "✅ Docker環境檢查通過"

# 停止現有服務
echo "🛑 停止現有服務..."
docker-compose down

# 構建並啟動服務
echo "🔨 構建並啟動服務..."
docker-compose up -d --build

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 10

# 檢查服務狀態
echo "📊 檢查服務狀態..."
docker-compose ps

# 檢查健康狀態
echo "🏥 檢查服務健康狀態..."
if curl -s http://localhost:${BACKEND_PORT:-5001}/health > /dev/null; then
    echo "✅ 後端服務運行正常"
else
    echo "❌ 後端服務可能未正常啟動"
fi

if curl -s http://localhost:${FRONTEND_PORT:-3000} > /dev/null; then
    echo "✅ 前端服務運行正常"
else
    echo "❌ 前端服務可能未正常啟動"
fi

echo ""
echo "🎉 艾森豪矩陣任務管理工具啟動完成！"
echo ""
echo "📱 前端應用: http://localhost:${FRONTEND_PORT:-3000}"
echo "🔧 後端API: http://localhost:${BACKEND_PORT:-5001}"
echo "🌐 Nginx代理: http://localhost:${NGINX_PORT:-80}"
echo ""
echo "📋 查看日誌: docker-compose logs -f"
echo "🛑 停止服務: docker-compose down"
echo "🔄 重啟服務: docker-compose restart" 