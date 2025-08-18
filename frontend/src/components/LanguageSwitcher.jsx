import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100">
        <Globe className="h-4 w-4" />
        <span>{t('language')}</span>
        <span className="text-xs font-medium">
          {currentLanguage === 'zh-TW' ? '中' : 'EN'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={() => changeLanguage('zh-TW')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
              currentLanguage === 'zh-TW' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            {t('chinese')}
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
              currentLanguage === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            {t('english')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 