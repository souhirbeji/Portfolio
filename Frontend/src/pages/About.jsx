import { motion } from 'framer-motion';
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaJava, FaDatabase, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiFirebase } from 'react-icons/si';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaCode, FaBookReader, FaDumbbell, FaFilm } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '../redux/Slices/SkillThunk';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ICONS } from '../utils/constants';

const About = () => {
  const dispatch = useDispatch();
  const { skills, loading: skillsLoading, error: skillsError } = useSelector(state => state.skills);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // Fonction pour mettre la première lettre en majuscule
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Regrouper les compétences par catégorie
  const groupedSkills = skills ? skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) : {};

  const getIconComponent = (iconName, category) => {
    const iconData = ICONS[category]?.find(i => i.name === iconName);
    if (iconData) {
      const IconComponent = iconData.icon;
      return <IconComponent className={`text-xl text-${iconData.color}`} />;
    }
    return null;
  };

  const passions = {
    anime: {
      title: t('passions.categories.anime.title'),
      icon: <SiMyanimelist className="text-4xl text-blue-600" />,
      description: t('passions.categories.anime.description'),
      favorites: ["Attack on Titan", "Death Note", "Full Metal Alchemist", "Monster"],
      quote: t('passions.categories.anime.quote')
    },
    philosophy: {
      title: t('passions.categories.philosophy.title'),
      icon: <FaBookReader className="text-4xl text-purple-600" />,
      description: t('passions.categories.philosophy.description'),
      interests: ["Existentialisme", "Stoïcisme", "Philosophie de l'esprit"],
      philosophers: ["Albert Camus", "Friedrich Nietzsche", "Marcus Aurelius"]
    },
    sport: {
      title: t('passions.categories.sport.title'),
      icon: <FaDumbbell className="text-4xl text-red-600" />,
      description: t('passions.categories.sport.description'),
      activities: ["Musculation", "Course à pied", "Yoga"],
      goals: ["Amélioration continue", "Discipline", "Bien-être"]
    }
  };

  const renderPassionItems = (items, className) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-3 py-1 ${className} rounded-full text-sm`}
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header section - unchanged */}
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent text-center">
            {t('about.title')}
          </h1>

          <div className="mb-12">
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Passionate about Web Development, Data and AI, I create innovative digital solutions
            </p>
          </div>

          {/* Technical Skills Section - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">{t('about.technicalSkills.title')}</h2>
            {skillsLoading ? (
              <p>{t('about.technicalSkills.loading')}</p>
            ) : skillsError ? (
              <p>Error: {skillsError}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-violet-500">{capitalizeFirstLetter(category)}</h3>
                    <ul className="space-y-4">
                      {skills.map((skill) => (
                        <li key={skill._id} className="flex items-center space-x-3">
                          {getIconComponent(skill.icon, skill.category)}
                          <span>{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-violet-500 to-teal-500 my-16 opacity-20"></div>

          {/* Passions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">{t('about.passions.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(passions).map(([key, passion], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-teal-500" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      {passion.icon}
                      <h3 className="text-xl font-bold">{passion.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {passion.description}
                    </p>

                    {passion.favorites && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Favoris :</h4>
                        <div className="flex flex-wrap gap-2">
                          {passion.favorites.map((item, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {passion.interests && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">{t(`passions.categories.${key}.interests.title`)}</h4>
                        {renderPassionItems(
                          t(`passions.categories.${key}.interests.items`),
                          "bg-violet-100 text-violet-600"
                        )}
                      </div>
                    )}

                    {passion.activities && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">{t(`passions.categories.${key}.activities.title`)}</h4>
                        {renderPassionItems(
                          t(`passions.categories.${key}.activities.items`),
                          "bg-teal-100 text-teal-600"
                        )}
                      </div>
                    )}

                    {passion.goals && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">{t(`passions.categories.${key}.goals.title`)}</h4>
                        {renderPassionItems(
                          t(`passions.categories.${key}.goals.items`),
                          "bg-amber-100 text-amber-600"
                        )}
                      </div>
                    )}

                    {passion.quote && (
                      <div className="mt-4 italic text-gray-600">
                        "{passion.quote}"
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section - unchanged */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-violet-100 to-teal-100 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">{t('about.collaboration.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('about.collaboration.subtitle')}
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-colors"
              >
                {t('about.collaboration.cta')}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
