#!/bin/bash

# 獲取環境變數或使用默認值
API_URL=${VITE_API_URL:-/api}

echo "=== 前端容器啟動 ==="
echo "設置 API URL 為: $API_URL"
echo "當前工作目錄: $(pwd)"
echo "HTML 目錄內容:"
ls -la /usr/share/nginx/html/

# 替換構建後的 JavaScript 文件中的 API URL
echo "開始替換 API URL..."
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|/api|$API_URL|g" {} \;

echo "API URL 替換完成"
echo "檢查替換結果..."
grep -r "VITE_API_URL\|/api" /usr/share/nginx/html/ || echo "未找到相關內容"

echo "啟動 nginx..."
exec nginx -g "daemon off;" 