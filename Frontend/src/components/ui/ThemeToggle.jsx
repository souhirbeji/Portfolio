import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg flex items-center space-x-2 ${
        isDark 
          ? 'bg-gray-700 text-yellow-400' 
          : 'bg-violet-100 text-violet-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
      <span className="text-sm font-medium">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
