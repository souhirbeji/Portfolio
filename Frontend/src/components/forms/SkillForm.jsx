import { useState } from 'react';
import { motion } from 'framer-motion';

const SkillForm = ({ skill, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    level: skill?.level || 1,
    category: skill?.category || 'frontend'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Skill Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Level (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
          >
            {skill ? 'Update' : 'Create'} Skill
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default SkillForm;
