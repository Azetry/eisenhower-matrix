import React from 'react';
import { CheckCircle, Calendar, Flag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { zhTW, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const CompletedTasks = ({ completedTasks, onNavigateBack, onToggleCompletion }) => {
  const { t, i18n } = useTranslation();
  
  // 添加除錯資訊
  console.log('CompletedTasks received:', completedTasks);
  
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

  const getQuadrantInfo = (quadrant) => {
    const quadrantInfo = {
      q1: { title: t('q1.title'), color: 'text-red-600', bgColor: 'bg-red-50' },
      q2: { title: t('q2.title'), color: 'text-blue-600', bgColor: 'bg-blue-50' },
      q3: { title: t('q3.title'), color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
      q4: { title: t('q4.title'), color: 'text-gray-600', bgColor: 'bg-gray-50' }
    };
    return quadrantInfo[quadrant] || quadrantInfo.q1;
  };

  const handleToggleCompletion = (taskId) => {
    onToggleCompletion(taskId);
  };

  // 簡化顯示邏輯，直接顯示所有已完成任務
  const renderTasks = () => {
    if (!completedTasks || completedTasks.length === 0) {
      return (
        <div className="text-center py-16">
          <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">{t('no.completed.tasks')}</h3>
          <p className="text-gray-600">{t('no.completed.tasks.description')}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {completedTasks.map((task) => {
          const quadrantInfo = getQuadrantInfo(task.quadrant);
          return (
            <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 flex-1">
                  <button
                    onClick={() => handleToggleCompletion(task.id)}
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 border-green-500 flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </button>
                  
                  <h4 className="font-medium text-gray-900 line-through">
                    {task.title}
                  </h4>
                </div>
                
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${quadrantInfo.bgColor}`}>
                  <span className={`text-xs font-medium ${quadrantInfo.color}`}>
                    {quadrantInfo.title}
                  </span>
                </div>
              </div>
              
              {task.description && (
                <p className="text-sm text-gray-600 mb-3 line-through">
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
                      <span>{format(new Date(task.dueDate), 'MM/dd', { 
                        locale: i18n.language === 'zh-TW' ? zhTW : enUS 
                      })}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-400">
                  {task.completedAt ? (
                    `${t('completed.at')}: ${format(new Date(task.completedAt), 'MM/dd HH:mm', { 
                      locale: i18n.language === 'zh-TW' ? zhTW : enUS 
                    })}`
                  ) : (
                    `${t('completed')}`
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>{t('back.to.matrix')}</span>
              </button>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{t('completed.tasks')}</h1>
                  <p className="text-lg text-gray-600">{t('completed.tasks.subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{completedTasks ? completedTasks.length : 0}</div>
              <div className="text-sm text-gray-500">{t('completed.count')}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {renderTasks()}
      </main>
    </div>
  );
};

export default CompletedTasks; 