import React from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Target, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ onAddTask, onShowCompletedTasks, completedTasksCount }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isMatrixPage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">{t('app.title')}</h1>
            </div>
            <span className="text-lg text-gray-600">{t('app.subtitle')}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isMatrixPage && (
              <>
                <button
                  onClick={onAddTask}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>{t('add.task')}</span>
                </button>
                
                <button
                  onClick={onShowCompletedTasks}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>{t('completed.tasks')}</span>
                  {completedTasksCount > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {completedTasksCount}
                    </span>
                  )}
                </button>
              </>
            )}
            
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 