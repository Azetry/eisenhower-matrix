import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard.jsx';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Quadrant = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  color, 
  icon, 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onToggleCompletion 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className={`quadrant quadrant-${color} min-h-[400px]`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-700">
            {tasks.filter(task => !task.completed).length}
          </div>
          <div className="text-xs text-gray-500">{t('task')}</div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-opacity-80' : ''
            }`}
          >
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Plus className="h-8 w-8 mb-2" />
                <p className="text-sm">{t('drag.task.here')}</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-3 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                    >
                      <TaskCard
                        task={task}
                        onEdit={() => onEditTask(task)}
                        onDelete={() => onDeleteTask(task.id)}
                        onToggleCompletion={() => onToggleCompletion(task.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Quadrant; 