#!/bin/bash

# Port 設定腳本
echo "🔧 艾森豪矩陣任務管理工具 - Port 設定"

# 檢查是否已有 .env 文件
if [ -f ".env" ]; then
    echo "📁 發現現有的 .env 文件"
    read -p "是否要覆蓋現有配置？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 操作已取消"
        exit 1
    fi
fi

# 獲取用戶輸入
echo ""
echo "請輸入您想要的 port 配置："
echo ""

# Nginx port
read -p "Nginx port (預設: 80): " nginx_port
nginx_port=${nginx_port:-80}

# Frontend port
read -p "前端 port (預設: 3000): " frontend_port
frontend_port=${frontend_port:-3000}

# Backend port
read -p "後端 port (預設: 5001): " backend_port
backend_port=${backend_port:-5001}

# Redis port
read -p "Redis port (預設: 6379): " redis_port
redis_port=${redis_port:-6379}

# 創建 .env 文件
echo "📝 創建 .env 文件..."
cat > .env << EOF
# Nginx 配置
NGINX_PORT=${nginx_port}

# 其他服務配置
REDIS_PORT=${redis_port}
BACKEND_PORT=${backend_port}
FRONTEND_PORT=${frontend_port}
EOF

echo ""
echo "✅ .env 文件已創建！"
echo ""
echo "📋 當前配置："
echo "   Nginx: ${nginx_port}"
echo "   前端: ${frontend_port}"
echo "   後端: ${backend_port}"
echo "   Redis: ${redis_port}"
echo ""
echo "🚀 現在您可以運行以下命令啟動服務："
echo "   ./start.sh"
echo ""
echo "🌐 服務啟動後，您可以通過以下 URL 訪問："
echo "   Nginx 代理: http://localhost:${nginx_port}"
echo "   前端應用: http://localhost:${frontend_port}"
echo "   後端 API: http://localhost:${backend_port}"
echo ""
echo "💡 提示：您也可以直接編輯 .env 文件來修改配置" 