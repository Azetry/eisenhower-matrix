#!/bin/bash

# 艾森豪矩陣任務管理工具停止腳本

echo "🛑 停止艾森豪矩陣任務管理工具..."

# 檢查Docker是否運行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker未運行"
    exit 1
fi

# 停止服務
echo "⏹️ 停止所有服務..."
docker-compose down

# 清理未使用的資源（可選）
read -p "是否清理未使用的Docker資源？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 清理未使用的資源..."
    docker system prune -f
    echo "✅ 清理完成"
fi

echo ""
echo "🎉 服務已停止"
echo ""
echo "🚀 重新啟動: ./start.sh"
echo "📋 查看狀態: docker-compose ps" 