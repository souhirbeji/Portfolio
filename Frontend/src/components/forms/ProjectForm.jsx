import { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    imageUrl: project?.imageUrl || '',
    githubLink: project?.githubLink || '',
    demoLink: project?.demoLink || '',
    category: project?.category || 'frontend'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const technologies = formData.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech);
    onSubmit({ ...formData, technologies });
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
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({...formData, technologies: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
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
            <option value="fullstack">Full Stack</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub Link</label>
          <input
            type="url"
            value={formData.githubLink}
            onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Demo Link</label>
          <input
            type="url"
            value={formData.demoLink}
            onChange={(e) => setFormData({...formData, demoLink: e.target.value})}
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
          >
            {project ? 'Update' : 'Create'} Project
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

export default ProjectForm;
