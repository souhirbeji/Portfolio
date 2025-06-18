import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaCode, FaLightbulb, FaRocket, FaChartBar, FaBrain } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/Slices/Projectthunk';
import { useLanguage } from '../contexts/LanguageContext';
import { incrementViewCount } from '../redux/Slices/ViewSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.projects);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchProjects());
    // Incrémenter le compteur uniquement lors de la visite de la page d'accueil
    dispatch(incrementViewCount());
  }, [dispatch]);

  const skills = [
    {
      icon: <FaCode className="text-4xl text-violet-500" />,
      title: t('home.skills.items.webdev.title'),
      type: 'webdev',
      description: t('home.skills.items.webdev.description')
    },
    {
      icon: <FaChartBar className="text-4xl text-teal-500" />,
      title: t('home.skills.items.dataAnalysis.title'),
      type: 'dataAnalysis',
      description: t('home.skills.items.dataAnalysis.description')
    },
    {
      icon: <FaBrain className="text-4xl text-purple-500" />,
      title: t('home.skills.items.ai.title'),
      type: 'ai',
      description: t('home.skills.items.ai.description')
    }
  ];

  const themes = [
    {
      gradient: 'from-violet-500 to-purple-500',
      tagBg: 'bg-violet-100',
      tagText: 'text-violet-600',
      iconColor: 'text-violet-500',
      bgHover: 'group-hover:bg-violet-50'
    },
    {
      gradient: 'from-teal-500 to-emerald-500',
      tagBg: 'bg-teal-100',
      tagText: 'text-teal-600',
      iconColor: 'text-teal-500',
      bgHover: 'group-hover:bg-teal-50'
    },
    {
      gradient: 'from-blue-500 to-cyan-500',
      tagBg: 'bg-blue-100',
      tagText: 'text-blue-600',
      iconColor: 'text-blue-500',
      bgHover: 'group-hover:bg-blue-50'
    }
  ];

  const featuredProjects = projects ? projects.filter(project => project.favorite).slice(0, 3) : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8"
            >
                {t('home.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group px-8 py-3 bg-gradient-to-r from-violet-500 to-teal-500 text-white rounded-full hover:opacity-90 flex items-center"
              >
                {t('home.hero.cta.contact')}
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 border-2 border-violet-500 text-violet-500 rounded-full hover:bg-violet-50"
              >
                {t('home.hero.cta.projects')}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 to-teal-100/20" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.3, 0.5]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-grid-pattern"
            style={{
              backgroundSize: '30px 30px',
              backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)'
            }}
          />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.featuredProjects.title')}
            </h2>
            <p className="text-gray-600">
              {t('home.featuredProjects.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>{t('projects.loading')}</p>
            ) : error ? (
              <p>{t('projects.error')} {error}</p>
            ) : (
              featuredProjects.map((project, index) => {
                const theme = themes[index % themes.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg group relative"
                  >
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`} />
                    </div>

                    <div className="relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-sm ${theme.tagBg} ${theme.tagText}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          to="/projects"
                          className={`inline-flex items-center ${theme.tagText} hover:opacity-80`}
                        >
                          {t('home.featuredProjects.viewMore')}
                          <FaArrowRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              {t('home.skills.title')}
            </h2>
            <p className="text-gray-600">
              {t('home.skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((service, index) => {
              const theme = themes[index % themes.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-all"
                >
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`} />
                  </div>
                  <div className="relative">
                    <div className={`mb-4 ${theme.iconColor}`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {t(`home.skills.items.${service.type}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`home.skills.items.${service.type}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-violet-500 to-teal-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/90 mb-8">
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-violet-500 rounded-full hover:bg-gray-100 transition-colors"
            >
              {t('home.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;