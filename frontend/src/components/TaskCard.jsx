import React from 'react';
import { Edit, Trash2, Calendar, Flag, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { zhTW, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const TaskCard = ({ task, onEdit, onDelete, onToggleCompletion }) => {
  const { t, i18n } = useTranslation();
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return t('priority.high');
      case 'medium':
        return t('priority.medium');
      case 'low':
        return t('priority.low');
      default:
        return t('priority.medium');
    }
  };

  const handleToggleCompletion = (e) => {
    e.stopPropagation();
    onToggleCompletion();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(t('confirm.delete'))) {
      onDelete();
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1">
          <button
            onClick={handleToggleCompletion}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors duration-200 ${
              task.completed ? 'bg-green-500 border-green-500' : 'hover:border-gray-400'
            }`}
          >
            {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
          </button>
          
          <h4 className={`font-medium text-gray-900 flex-1 ${
            task.completed ? 'line-through' : ''
          }`}>
            {task.title}
          </h4>
        </div>
        
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            title={t('edit.task')}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            title={t('delete.task')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-sm text-gray-600 mb-3 ${
          task.completed ? 'line-through' : ''
        }`}>
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            <Flag className="w-3 h-3" />
            <span>{getPriorityText(task.priority)}</span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.dueDate), 'MM/dd', { locale: i18n.language === 'zh-TW' ? zhTW : enUS })}</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {format(new Date(task.createdAt), 'MM/dd HH:mm', { locale: i18n.language === 'zh-TW' ? zhTW : enUS })}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 