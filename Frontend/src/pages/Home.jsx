import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/Slices/Projectthunk';

const Home = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const services = [
    {
      icon: <FaCode className="text-4xl text-violet-500" />,
      title: "Développement Web",
      description: "Création d'applications web modernes et réactives"
    },
    {
      icon: <FaLightbulb className="text-4xl text-teal-500" />,
      title: "UI/UX Design",
      description: "Design d'interfaces utilisateur intuitives"
    },
    {
      icon: <FaRocket className="text-4xl text-purple-500" />,
      title: "Optimisation",
      description: "Amélioration des performances et SEO"
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
                Créons ensemble votre présence numérique
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Développeur Full Stack spécialisé dans la création d'applications web modernes et performantes.
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
                Me Contacter
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 border-2 border-violet-500 text-violet-500 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20"
              >
                Voir mes Projets
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 to-teal-100/20 dark:from-violet-900/20 dark:to-teal-900/20" />
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
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Projets en Vedette
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Découvrez quelques-unes de mes réalisations récentes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>Loading projects...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={project.link}
                      className="inline-flex items-center text-violet-500 hover:text-violet-600"
                    >
                      En savoir plus
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Des solutions adaptées à vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
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
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-white/90 mb-8">
              Discutons de vos idées et transformons-les en réalité.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-violet-500 rounded-full hover:bg-gray-100 transition-colors"
            >
              Contactez-moi
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
