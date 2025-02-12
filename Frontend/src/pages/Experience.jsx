import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaMedal, FaCode, FaLightbulb, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences } from '../redux/Slices/ExperienceThunk';

const Experience = () => {
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector(state => state.experiences);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
              Parcours Professionnel
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mon parcours professionnel reflète ma passion pour le développement web 
              et mon engagement constant pour l'innovation et l'excellence technique.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-violet-500 to-teal-500" />

            {/* Experiences */}
            <div className="space-y-12">
              {loading ? (
                <p>Loading experiences...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline dot with ping animation */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-violet-500 rounded-full">
                      <div className="absolute w-full h-full rounded-full bg-violet-500 animate-ping opacity-20" />
                    </div>

                    {/* Content card */}
                    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      {/* Header */}
                      <div className="flex items-center gap-2 text-violet-500 mb-2">
                        <FaBriefcase className="text-xl" />
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                      </div>

                      {/* Company info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {exp.company}, {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendar />
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 bg-${exp.color}-100 dark:bg-${exp.color}-900 
                              text-${exp.color}-600 dark:text-${exp.color}-300 rounded-full text-sm`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <FaMedal className="text-teal-500 mt-1" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-teal-500 text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Discutons de votre projet
              <FaLightbulb className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
