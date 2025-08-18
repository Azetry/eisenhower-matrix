const express = require('express');
const redisManager = require('../config/redis');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// 獲取所有任務
router.get('/', async (req, res) => {
  try {
    const redisClient = redisManager.getClient();
    const tasks = await redisClient.hGetAll('tasks');
    const taskArray = Object.values(tasks).map(task => JSON.parse(task));
    
    // 按象限分組
    const quadrants = {
      q1: taskArray.filter(task => task.quadrant === 'q1'),
      q2: taskArray.filter(task => task.quadrant === 'q2'),
      q3: taskArray.filter(task => task.quadrant === 'q3'),
      q4: taskArray.filter(task => task.quadrant === 'q4')
    };
    
    res.json(quadrants);
  } catch (error) {
    console.error('獲取任務失敗:', error);
    res.status(500).json({ error: '獲取任務失敗' });
  }
});

// 創建新任務
router.post('/', async (req, res) => {
  try {
    const { title, description, quadrant, priority, dueDate } = req.body;
    
    if (!title || !quadrant) {
      return res.status(400).json({ error: '標題和象限是必填項' });
    }
    
    const task = {
      id: uuidv4(),
      title,
      description: description || '',
      quadrant,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const redisClient = redisManager.getClient();
    await redisClient.hSet('tasks', task.id, JSON.stringify(task));
    
    res.status(201).json(task);
  } catch (error) {
    console.error('創建任務失敗:', error);
    res.status(500).json({ error: '創建任務失敗' });
  }
});

// 更新任務
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const redisClient = redisManager.getClient();
    const existingTask = await redisClient.hGet('tasks', id);
    if (!existingTask) {
      return res.status(404).json({ error: '任務不存在' });
    }
    
    const task = JSON.parse(existingTask);
    const updatedTask = {
      ...task,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await redisClient.hSet('tasks', id, JSON.stringify(updatedTask));
    
    res.json(updatedTask);
  } catch (error) {
    console.error('更新任務失敗:', error);
    res.status(500).json({ error: '更新任務失敗' });
  }
});

// 刪除任務
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const redisClient = redisManager.getClient();
    const existingTask = await redisClient.hGet('tasks', id);
    if (!existingTask) {
      return res.status(404).json({ error: '任務不存在' });
    }
    
    await redisClient.hDel('tasks', id);
    
    res.status(204).send();
  } catch (error) {
    console.error('刪除任務失敗:', error);
    res.status(500).json({ error: '刪除任務失敗' });
  }
});

// 切換任務完成狀態
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    
    const redisClient = redisManager.getClient();
    const existingTask = await redisClient.hGet('tasks', id);
    if (!existingTask) {
      return res.status(404).json({ error: '任務不存在' });
    }
    
    const task = JSON.parse(existingTask);
    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString();
    
    await redisClient.hSet('tasks', id, JSON.stringify(task));
    
    res.json(task);
  } catch (error) {
    console.error('切換任務狀態失敗:', error);
    res.status(500).json({ error: '切換任務狀態失敗' });
  }
});

// 移動任務到不同象限
router.patch('/:id/move', async (req, res) => {
  try {
    const { id } = req.params;
    const { quadrant } = req.body;
    
    if (!quadrant || !['q1', 'q2', 'q3', 'q4'].includes(quadrant)) {
      return res.status(400).json({ error: '無效的象限值' });
    }
    
    const redisClient = redisManager.getClient();
    const existingTask = await redisClient.hGet('tasks', id);
    if (!existingTask) {
      return res.status(404).json({ error: '任務不存在' });
    }
    
    const task = JSON.parse(existingTask);
    task.quadrant = quadrant;
    task.updatedAt = new Date().toISOString();
    
    await redisClient.hSet('tasks', id, JSON.stringify(task));
    
    res.json(task);
  } catch (error) {
    console.error('移動任務失敗:', error);
    res.status(500).json({ error: '移動任務失敗' });
  }
});

module.exports = router; 