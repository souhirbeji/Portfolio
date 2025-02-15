import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-lg bg-violet-100 dark:bg-gray-700 text-violet-600 dark:text-violet-300 flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm font-medium">
        {language === 'fr' ? 'EN' : 'FR'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
