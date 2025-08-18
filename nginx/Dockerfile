FROM nginx:alpine

# 複製配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 創建日誌目錄
RUN mkdir -p /var/log/nginx

# 暴露端口
EXPOSE 80

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"] 