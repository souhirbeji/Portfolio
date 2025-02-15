import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/Slices/Projectthunk';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.projects);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const categories = [
    { id: 'all', name: t('projects.categories.all') },
    { id: 'frontend', name: t('projects.categories.frontend') },
    { id: 'fullstack', name: t('projects.categories.fullstack') },
    { id: 'mobile', name: t('projects.categories.mobile') }
  ];

  const filteredProjects = projects ? (filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)) : [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            {t('projects.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category.id
                    ? 'bg-white dark:bg-gray-700 shadow-md'
                    : 'hover:bg-white dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>{t('projects.loading')}</p>
        ) : error ? (
          <p>{t('projects.error')} {error}</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
