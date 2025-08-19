# 構建階段
FROM node:18-alpine AS builder

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴（包括開發依賴，因為構建需要）
RUN npm ci

# 複製源代碼
COPY . .

# 設置環境變數來避免架構相關的問題
ENV NODE_ENV=production
ENV ROLLUP_SKIP_NATIVE_ADDON=true

# 接受構建參數
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# 構建應用
RUN npm run build

# 生產階段
FROM nginx:alpine

# 安裝必要的工具
RUN apk add --no-cache bash

# 複製構建產物到 nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製自定義 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 創建環境變數替換腳本
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 暴露端口
EXPOSE 80

# 使用自定義啟動腳本
CMD ["/docker-entrypoint.sh"] 