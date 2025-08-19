import React, { useState, useEffect } from 'react';
import EisenhowerMatrix from './components/EisenhowerMatrix.jsx';
import TaskModal from './components/TaskModal.jsx';
import Header from './components/Header.jsx';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState({
    q1: [],
    q2: [],
    q3: [],
    q4: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  // 獲取所有任務
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('獲取任務失敗');
      }
    } catch (error) {
      console.error('獲取任務錯誤:', error);
    } finally {
      setLoading(false);
    }
  };

  // 創建新任務
  const createTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks(prev => ({
          ...prev,
          [newTask.quadrant]: [...prev[newTask.quadrant], newTask]
        }));
        setIsModalOpen(false);
        return true;
      } else {
        console.error('創建任務失敗');
        return false;
      }
    } catch (error) {
      console.error('創建任務錯誤:', error);
      return false;
    }
  };

  // 更新任務
  const updateTask = async (taskId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => {
          const newTasks = { ...prev };
          // 從原象限移除任務
          Object.keys(newTasks).forEach(quadrant => {
            newTasks[quadrant] = newTasks[quadrant].filter(task => task.id !== taskId);
          });
          // 添加到新象限
          newTasks[updatedTask.quadrant].push(updatedTask);
          return newTasks;
        });
        setIsModalOpen(false);
        setEditingTask(null);
        return true;
      } else {
        console.error('更新任務失敗');
        return false;
      }
    } catch (error) {
      console.error('更新任務錯誤:', error);
      return false;
    }
  };

  // 刪除任務
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(prev => {
          const newTasks = { ...prev };
          Object.keys(newTasks).forEach(quadrant => {
            newTasks[quadrant] = newTasks[quadrant].filter(task => task.id !== taskId);
          });
          return newTasks;
        });
        return true;
      } else {
        console.error('刪除任務失敗');
        return false;
      }
    } catch (error) {
      console.error('刪除任務錯誤:', error);
      return false;
    }
  };

  // 切換任務完成狀態
  const toggleTaskCompletion = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => {
          const newTasks = { ...prev };
          Object.keys(newTasks).forEach(quadrant => {
            newTasks[quadrant] = newTasks[quadrant].map(task => 
              task.id === taskId ? updatedTask : task
            );
          });
          return newTasks;
        });
        return true;
      } else {
        console.error('切換任務狀態失敗');
        return false;
      }
    } catch (error) {
      console.error('切換任務狀態錯誤:', error);
      return false;
    }
  };

  // 移動任務到不同象限
  const moveTask = async (taskId, newQuadrant) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/move`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quadrant: newQuadrant }),
      });

      if (response.ok) {
        const movedTask = await response.json();
        setTasks(prev => {
          const newTasks = { ...prev };
          // 從原象限移除任務
          Object.keys(newTasks).forEach(quadrant => {
            newTasks[quadrant] = newTasks[quadrant].filter(task => task.id !== taskId);
          });
          // 添加到新象限
          newTasks[newQuadrant].push(movedTask);
          return newTasks;
        });
        return true;
      } else {
        console.error('移動任務失敗');
        return false;
      }
    } catch (error) {
      console.error('移動任務錯誤:', error);
      return false;
    }
  };

  // 編輯任務
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 關閉模態框
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // 處理任務提交
  const handleTaskSubmit = async (taskData) => {
    if (editingTask) {
      return await updateTask(editingTask.id, taskData);
    } else {
      return await createTask(taskData);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={() => setIsModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <EisenhowerMatrix
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={deleteTask}
          onToggleCompletion={toggleTaskCompletion}
          onMoveTask={moveTask}
        />
      </main>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App; 