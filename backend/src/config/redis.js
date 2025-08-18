const Redis = require('redis');

class RedisManager {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    if (this.client && this.isConnected) {
      return this.client;
    }

    try {
      this.client = Redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        socket: {
          keepAlive: true,
          reconnectStrategy: (retries) => {
            console.log(`Redis 重連嘗試 ${retries}`);
            return Math.min(retries * 100, 3000);
          }
        },
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        maxRetriesPerRequest: 3
      });

      this.client.on('error', (err) => {
        console.error('Redis 連線錯誤:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Redis 連線成功');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('Redis 準備就緒');
        this.isConnected = true;
      });

      this.client.on('end', () => {
        console.log('Redis 連線結束');
        this.isConnected = false;
      });

      this.client.on('reconnecting', () => {
        console.log('Redis 正在重連...');
        this.isConnected = false;
      });

      await this.client.connect();
      return this.client;
    } catch (error) {
      console.error('Redis 連線失敗:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      try {
        await this.client.quit();
        this.isConnected = false;
        console.log('Redis 連線已關閉');
      } catch (error) {
        console.error('關閉 Redis 連線失敗:', error);
      }
    }
  }

  getClient() {
    if (!this.client || !this.isConnected) {
      throw new Error('Redis 連線未建立或已斷開');
    }
    return this.client;
  }

  isClientConnected() {
    return this.isConnected;
  }
}

// 建立單例實例
const redisManager = new RedisManager();

module.exports = redisManager; 