import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaCode, FaProjectDiagram, FaBriefcase, FaTimes } from 'react-icons/fa';

const FloatingMenu = ({ onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'skill', icon: FaCode, color: 'bg-violet-500 hover:bg-violet-600', label: 'Add Skill' },
    { id: 'project', icon: FaProjectDiagram, color: 'bg-blue-500 hover:bg-blue-600', label: 'Add Project' },
    { id: 'experience', icon: FaBriefcase, color: 'bg-green-500 hover:bg-green-600', label: 'Add Experience' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-4"
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => {
                  onAddItem(item.id);
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white ${item.color}
                  transform hover:scale-110 transition-transform duration-200 relative group`}
              >
                <item.icon className="w-5 h-5" />
                <span className="absolute right-full mr-4 px-2 py-1 bg-gray-800 text-white text-sm rounded-md 
                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white
          ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-violet-500 hover:bg-violet-600'}
          transform transition-transform duration-200 hover:scale-110`}
        whileHover={{ rotate: isOpen ? 0 : 45 }}
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaPlus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingMenu;
