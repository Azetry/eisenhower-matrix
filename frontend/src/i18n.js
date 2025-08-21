import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  'zh-TW': {
    translation: {
      // Header
      'app.title': '艾森豪矩陣',
      'app.subtitle': '任務管理工具',
      'add.task': '新增任務',
      'urgent.important': '緊急且重要',
      'important.not.urgent': '重要但不緊急',
      'urgent.not.important': '緊急但不重要',
      'not.urgent.not.important': '既不緊急也不重要',
      'app.description': '艾森豪矩陣幫助您根據任務的緊急性和重要性來分類和管理任務。將任務拖拽到對應的象限中，優先處理重要且緊急的任務。',
      
      // Matrix
      'matrix.title': '任務矩陣',
      'matrix.subtitle': '拖拽任務到對應的象限中來組織您的任務',
      'q1.title': '緊急且重要',
      'q1.subtitle': '立即處理',
      'q1.description': '這些任務需要立即關注和處理',
      'q2.title': '重要但不緊急',
      'q2.subtitle': '計劃處理',
      'q2.description': '這些任務需要計劃和準備',
      'q3.title': '緊急但不重要',
      'q3.subtitle': '委託處理',
      'q3.description': '這些任務可以委託或簡化',
      'q4.title': '既不緊急也不重要',
      'q4.subtitle': '考慮刪除',
      'q4.description': '這些任務可以考慮刪除',
      
      // Usage Tips
      'usage.tips': '使用建議',
      'priority.strategy': '優先級策略',
      'time.allocation': '時間分配',
      'q1.strategy': '第一象限：立即處理，避免積累',
      'q2.strategy': '第二象限：重點投入，提前規劃',
      'q3.strategy': '第三象限：簡化流程，提高效率',
      'q4.strategy': '第四象限：定期清理，減少干擾',
      'q1.time': '第一象限：20% 時間',
      'q2.time': '第二象限：65% 時間',
      'q3.time': '第三象限：15% 時間',
      'q4.time': '第四象限：0% 時間',
      
      // Task Modal
      'modal.add.task': '新增任務',
      'modal.edit.task': '編輯任務',
      'task.title': '任務標題',
      'task.description': '任務描述',
      'task.quadrant': '象限',
      'task.priority': '優先級',
      'task.dueDate': '截止日期',
      'task.title.placeholder': '輸入任務標題',
      'task.description.placeholder': '輸入任務描述（可選）',
      'priority.high': '高',
      'priority.medium': '中',
      'priority.low': '低',
      'cancel': '取消',
      'create': '創建',
      'update': '更新',
      'save': '儲存',
      'edit.task': '編輯任務',
      'delete.task': '刪除任務',
      'confirm.delete': '確定要刪除這個任務嗎？',
      
      // Common
      'loading': '載入中...',
      'enter.title': '請輸入任務標題',
      'task': '任務',
      'drag.task.here': '拖拽任務到此處',
      
      // Language
      'language': '語言',
      'chinese': '繁體中文',
      'english': 'English',
      'completed.tasks': '已完成任務',
      'completed.tasks.subtitle': '查看您已完成的所有任務',
      'completed.count': '已完成',
      'no.completed.tasks': '尚無已完成任務',
      'no.completed.tasks.description': '當您完成任務時，它們會出現在這裡',
      'back.to.matrix': '返回矩陣',
      'completed.at': '完成於',
      'all.completed.tasks': '所有已完成任務',
      'completed': '已完成'
    }
  },
  'en': {
    translation: {
      // Header
      'app.title': 'Eisenhower Matrix',
      'app.subtitle': 'Task Management Tool',
      'add.task': 'Add Task',
      'urgent.important': 'Urgent & Important',
      'important.not.urgent': 'Important, Not Urgent',
      'urgent.not.important': 'Urgent, Not Important',
      'not.urgent.not.important': 'Not Urgent, Not Important',
      'app.description': 'The Eisenhower Matrix helps you categorize and manage tasks based on their urgency and importance. Drag and drop tasks into the appropriate quadrants and prioritize important and urgent tasks.',
      
      // Matrix
      'matrix.title': 'Task Matrix',
      'matrix.subtitle': 'Drag and drop tasks into the corresponding quadrants to organize your tasks',
      'q1.title': 'Urgent & Important',
      'q1.subtitle': 'Do First',
      'q1.description': 'These tasks require immediate attention and action',
      'q2.title': 'Important, Not Urgent',
      'q2.subtitle': 'Schedule',
      'q2.description': 'These tasks need planning and preparation',
      'q3.title': 'Urgent, Not Important',
      'q3.subtitle': 'Delegate',
      'q3.description': 'These tasks can be delegated or simplified',
      'q4.title': 'Not Urgent, Not Important',
      'q4.subtitle': 'Eliminate',
      'q4.description': 'These tasks can be considered for deletion',
      
      // Usage Tips
      'usage.tips': 'Usage Tips',
      'priority.strategy': 'Priority Strategy',
      'time.allocation': 'Time Allocation',
      'q1.strategy': '• Quadrant 1: Handle immediately, avoid accumulation',
      'q2.strategy': '• Quadrant 2: Focus investment, plan ahead',
      'q3.strategy': '• Quadrant 3: Simplify processes, improve efficiency',
      'q4.strategy': '• Quadrant 4: Regular cleanup, reduce interference',
      'q1.time': '• Quadrant 1: 20% of time',
      'q2.time': '• Quadrant 2: 65% of time',
      'q3.time': '• Quadrant 3: 15% of time',
      'q4.time': '• Quadrant 4: 0% of time',
      
      // Task Modal
      'modal.add.task': 'Add Task',
      'modal.edit.task': 'Edit Task',
      'task.title': 'Task Title',
      'task.description': 'Task Description',
      'task.quadrant': 'Quadrant',
      'task.priority': 'Priority',
      'task.dueDate': 'Due Date',
      'task.title.placeholder': 'Enter task title',
      'task.description.placeholder': 'Enter task description (optional)',
      'priority.high': 'High',
      'priority.medium': 'Medium',
      'priority.low': 'Low',
      'cancel': 'Cancel',
      'create': 'Create',
      'update': 'Update',
      'save': 'Save',
      'edit.task': 'Edit Task',
      'delete.task': 'Delete Task',
      'confirm.delete': 'Are you sure you want to delete this task?',
      
      // Common
      'loading': 'Loading...',
      'enter.title': 'Please enter task title',
      'task': 'Task',
      'drag.task.here': 'Drag task here',
      
      // Language
      'language': 'Language',
      'chinese': '繁體中文',
      'english': 'English',
      'completed.tasks': 'Completed Tasks',
      'completed.tasks.subtitle': 'View all your completed tasks',
      'completed.count': 'Completed',
      'no.completed.tasks': 'No completed tasks yet',
      'no.completed.tasks.description': 'When you complete tasks, they will appear here',
      'back.to.matrix': 'Back to Matrix',
      'completed.at': 'Completed at',
      'all.completed.tasks': 'All Completed Tasks',
      'completed': 'Completed'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-TW',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 