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
    { id: 'fullstack', name: t('projects.categories.fullstack') },
    { id: 'data Analysis', name: t('projects.categories.data analysis') },
    { id: 'AI/ML', name: t('projects.categories.AI/ML') }
  ];

  const filteredProjects = projects ? (filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)) : [];

  const categoryThemes = [
    {
      gradient: 'from-violet-500 to-purple-500',
      bgHover: 'hover:bg-violet-50',
      tagBg: 'bg-violet-100',
      tagText: 'text-violet-600',
      buttonBg: 'bg-violet-100',
      buttonText: 'text-violet-600'
    },
    {
      gradient: 'from-teal-500 to-emerald-500',
      bgHover: 'hover:bg-teal-50',
      tagBg: 'bg-teal-100',
      tagText: 'text-teal-600',
      buttonBg: 'bg-teal-100',
      buttonText: 'text-teal-600'
    },
    {
      gradient: 'from-blue-500 to-cyan-500',
      bgHover: 'hover:bg-blue-50',
      tagBg: 'bg-blue-100',
      tagText: 'text-blue-600',
      buttonBg: 'bg-blue-100',
      buttonText: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
            {t('projects.title')}
          </h1>
          <p className="text-gray-600">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => {
                const theme = categoryThemes[index % categoryThemes.length];
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      filter === category.id
                        ? `${theme.buttonBg} ${theme.buttonText} shadow-md`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            {t('projects.loading')}
          </motion.p>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500"
          >
            {t('projects.error')} {error}
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-teal-50/50" />
      </div>
    </div>
  );
};

export default Projects;
