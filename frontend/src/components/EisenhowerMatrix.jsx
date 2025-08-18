import React from 'react';
import Quadrant from './Quadrant.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

const EisenhowerMatrix = ({ tasks, onEditTask, onDeleteTask, onToggleCompletion, onMoveTask }) => {
  const { t } = useTranslation();
  
  const quadrants = [
    {
      id: 'q1',
      title: t('q1.title'),
      subtitle: t('q1.subtitle'),
      description: t('q1.description'),
      color: 'q1',
      icon: '🚨'
    },
    {
      id: 'q2',
      title: t('q2.title'),
      subtitle: t('q2.subtitle'),
      description: t('q2.description'),
      color: 'q2',
      icon: '📋'
    },
    {
      id: 'q3',
      title: t('q3.title'),
      subtitle: t('q3.subtitle'),
      description: t('q3.description'),
      color: 'q3',
      icon: '⏰'
    },
    {
      id: 'q4',
      title: t('q4.title'),
      subtitle: t('q4.subtitle'),
      description: t('q4.description'),
      color: 'q4',
      icon: '🗑️'
    }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      // 任務被移動到不同的象限
      onMoveTask(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('matrix.title')}</h2>
        <p className="text-gray-600">{t('matrix.subtitle')}</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {quadrants.map((quadrant) => (
            <Quadrant
              key={quadrant.id}
              {...quadrant}
              tasks={tasks[quadrant.id] || []}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onToggleCompletion={onToggleCompletion}
            />
          ))}
        </div>
      </DragDropContext>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('usage.tips')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">{t('priority.strategy')}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{t('q1.strategy')}</li>
              <li>{t('q2.strategy')}</li>
              <li>{t('q3.strategy')}</li>
              <li>{t('q4.strategy')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">{t('time.allocation')}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{t('q1.time')}</li>
              <li>{t('q2.time')}</li>
              <li>{t('q3.time')}</li>
              <li>{t('q4.time')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EisenhowerMatrix; 