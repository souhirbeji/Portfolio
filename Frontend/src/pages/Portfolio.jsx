import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('all');

  // Simulation des appels API
  useEffect(() => {
    // Fetch user data
    setUser({
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Développeur Full Stack passionné',
      avatar: '/avatar.jpg'
    });

    // Fetch projects
    setProjects([
      {
        title: 'Portfolio moderne',
        description: 'Portfolio personnel avec React et Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
        imageUrl: '/images/portfolio-modern.jpg',
        githubLink: 'https://github.com',
        demoLink: 'https://demo.com',
        category: 'fullstack'
      },
      {
        title: "E-commerce Modern",
        description: "Application e-commerce complète avec panier et paiement",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        imageUrl: '/images/ecommerce-app.jpg',
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        category: "fullstack"
      },
      {
        title: "Application Mobile",
        description: "Application mobile de suivi fitness",
        technologies: ["React Native", "Firebase", "Redux"],
        imageUrl: '/images/fitness-app.jpg',
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        category: "mobile"
      },
      {
        title: "Dashboard Analytics",
        description: "Tableau de bord d'analyse de données",
        technologies: ["Vue.js", "D3.js", "Node.js"],
        imageUrl: '/images/dashboard-analytics.jpg',
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        category: "frontend"
      }
    ]);

    // Fetch experiences
    setExperiences([
      {
        title: 'Développeur Full Stack',
        company: 'Tech Company',
        location: 'Paris',
        startDate: '2022-01-01',
        description: 'Développement d\'applications web modernes',
        technologies: ['React', 'Node.js', 'MongoDB']
      }
    ]);

    // Fetch skills
    setSkills([
      { name: 'React', level: 5, category: 'frontend' },
      { name: 'Node.js', level: 4, category: 'backend' },
      { name: 'MongoDB', level: 4, category: 'backend' }
    ]);
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'mobile', name: 'Mobile' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Profile Section */}
        <div className="text-center mb-16">
          {user?.avatar && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-violet-500"
            />
          )}
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent mb-4"
          >
            {user?.firstName} {user?.lastName}
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {user?.bio}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {['about', 'projects', 'skills', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-500 to-teal-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              } transition-all`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'projects' && (
            <>
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
            </>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} />
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < skill.level
                                  ? 'bg-teal-500'
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
