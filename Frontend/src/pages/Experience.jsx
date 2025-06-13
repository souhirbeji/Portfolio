import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaMedal, FaLightbulb, FaCode, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences } from '../redux/Slices/ExperienceThunk';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector(state => state.experiences);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
              {t('experience.title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </motion.div>

          {/* Experiences */}
          <div className="space-y-12">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{t('experience.error')} {error}</p>
              </div>
            ) : (
              experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                    {/* Top bar with gradient */}
                    <div className="h-2 bg-gradient-to-r from-violet-500 to-teal-500"></div>
                    
                    <div className="p-6">
                      {/* Header with role and company */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-violet-100 rounded-full text-violet-600">
                            <FaBriefcase className="text-xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors">
                              {exp.title}
                            </h3>
                            <span className="text-gray-600">
                              {exp.company}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 text-sm">
                          <FaCalendar className="text-violet-600" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <FaCode className="text-teal-500" />
                          <h4 className="font-semibold text-gray-700">
                            {t('experience.timeline.technologies')}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-gradient-to-r from-violet-50 to-teal-50 border border-violet-100 text-violet-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FaMedal className="text-amber-500" />
                          <h4 className="font-semibold text-gray-700">
                            {t('experience.timeline.achievements')}
                          </h4>
                        </div>
                        <div className="space-y-2 pl-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="p-1 bg-amber-100 rounded-full text-amber-600 mt-1 flex-shrink-0">
                                <FaArrowRight className="text-xs" />
                              </div>
                              <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors">
                                {achievement}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom action area (optional) */}
                    <div className="px-6 py-3 bg-gray-50 flex justify-end">
                      <a 
                        href="#" 
                        className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        Plus de détails
                        <FaArrowRight className="text-xs" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
              {t('experience.cta.title')}
              <FaLightbulb className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
