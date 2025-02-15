import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaLanguage, FaGlobe, FaCheck } from 'react-icons/fa';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      code: 'fr', 
      label: 'Français',
      icon: <FaGlobe className="w-5 h-5 text-blue-500" />
    },
    { 
      code: 'en', 
      label: 'English',
      icon: <FaGlobe className="w-5 h-5 text-red-500" />
    }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center space-x-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <FaLanguage className="w-5 h-5 text-violet-500" />
        <span className="text-gray-700 dark:text-gray-200">{currentLang.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 right-0 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center justify-between transition-colors
                  ${language === lang.code ? 'bg-violet-50 dark:bg-violet-900/20' : ''}
                  ${language === lang.code ? 'text-violet-600 dark:text-violet-300' : 'text-gray-700 dark:text-gray-200'}
                  hover:bg-gray-50 dark:hover:bg-gray-700
                `}
              >
                <div className="flex items-center space-x-2">
                  {lang.icon}
                  <span>{lang.label}</span>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <FaCheck className="w-4 h-4 text-violet-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
