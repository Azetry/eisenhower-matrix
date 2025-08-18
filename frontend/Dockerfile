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

# 構建應用
RUN npm run build

# 生產階段
FROM nginx:alpine

# 複製構建產物到 nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製自定義 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"] 