import { motion } from 'framer-motion';
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaJava, FaDatabase, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiFirebase } from 'react-icons/si';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaCode, FaBookReader, FaDumbbell, FaFilm } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '../redux/Slices/SkillThunk';

const About = () => {
  const dispatch = useDispatch();
  const { skills, loading: skillsLoading, error: skillsError } = useSelector(state => state.skills);

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

  const passions = {
    anime: {
      title: "Anime & Manga",
      icon: <SiMyanimelist className="text-4xl text-blue-600" />,
      description: "Passionné par la culture japonaise et les animes, j'apprécie particulièrement les œuvres qui mélangent action et réflexion philosophique.",
      favorites: ["Attack on Titan", "Death Note", "Full Metal Alchemist", "Monster"],
      quote: "Le voyage est plus important que la destination."
    },
    philosophy: {
      title: "Philosophie",
      icon: <FaBookReader className="text-4xl text-purple-600" />,
      description: "La philosophie m'aide à développer un esprit critique et à voir le monde sous différents angles.",
      interests: ["Existentialisme", "Stoïcisme", "Philosophie de l'esprit"],
      philosophers: ["Albert Camus", "Friedrich Nietzsche", "Marcus Aurelius"]
    },
    sport: {
      title: "Sport",
      icon: <FaDumbbell className="text-4xl text-red-600" />,
      description: "Le sport est essentiel pour maintenir un équilibre entre corps et esprit.",
      activities: ["Musculation", "Course à pied", "Yoga"],
      goals: ["Amélioration continue", "Discipline", "Bien-être"]
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto" // Changed from max-w-4xl to max-w-7xl for wider content
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent text-center">
            À Propos de Moi
          </h1>

          <div className="mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
              Passionné par le développement web depuis plus de 5 ans, je crée des solutions numériques 
              innovantes qui allient performance et expérience utilisateur exceptionnelle.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Compétences Techniques</h2>
              <div className="grid gap-6">
                {skillsLoading ? (
                  <p>Loading skills...</p>
                ) : skillsError ? (
                  <p>Error: {skillsError}</p>
                ) : (
                  Object.entries(groupedSkills).map(([category, skills]) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-violet-500">{capitalizeFirstLetter(category)}</h3>
                      <ul className="space-y-4">
                        {skills.map((skill) => (
                          <li key={skill._id} className="flex items-center space-x-3">
                            <span className="text-xl"><i className={`fab ${skill.icon} text-${skill.iconColor}`} /></span>
                            <span>{skill.name}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Right column - Passions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Mes Passions</h2>
              <div className="grid gap-6">
                {Object.entries(passions).map(([key, passion], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow"
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

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {passion.description}
                      </p>

                      {passion.favorites && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Favoris :</h4>
                          <div className="flex flex-wrap gap-2">
                            {passion.favorites.map((item, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {passion.interests && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Centres d'intérêt :</h4>
                          <div className="flex flex-wrap gap-2">
                            {passion.interests.map((item, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {passion.activities && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Activités :</h4>
                          <div className="flex flex-wrap gap-2">
                            {passion.activities.map((item, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {passion.quote && (
                        <div className="mt-4 italic text-gray-600 dark:text-gray-400">
                          "{passion.quote}"
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact section at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-violet-100 to-teal-100 dark:from-violet-900 dark:to-teal-900 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Envie de collaborer ?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Je suis toujours ouvert aux nouvelles opportunités et aux projets intéressants.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-colors"
              >
                Me Contacter
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
