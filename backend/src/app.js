const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const redisManager = require('./config/redis');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5001;

// 中間件
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分鐘
  max: 100 // 限制每個IP 15分鐘內最多100個請求
});
app.use('/api/', limiter);

// 健康檢查端點
app.get('/health', async (req, res) => {
  try {
    const redisStatus = redisManager.isClientConnected() ? 'connected' : 'disconnected';
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      redis: redisStatus
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      error: error.message 
    });
  }
});

// API 路由
app.use('/api/tasks', require('./routes/tasks'));

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '伺服器內部錯誤' });
});

// 404 處理
app.use('*', (req, res) => {
  res.status(404).json({ error: '端點不存在' });
});

// 啟動服務器
async function startServer() {
  try {
    // 先連接到 Redis
    await redisManager.connect();
    
    // 啟動 Express 服務器
    app.listen(PORT, () => {
      console.log(`伺服器運行在端口 ${PORT}`);
    });
  } catch (error) {
    console.error('啟動服務器失敗:', error);
    process.exit(1);
  }
}

startServer();

// 優雅關閉
process.on('SIGTERM', async () => {
  console.log('收到 SIGTERM 信號，正在關閉服務器...');
  await redisManager.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('收到 SIGINT 信號，正在關閉服務器...');
  await redisManager.disconnect();
  process.exit(0);
});

module.exports = app; 