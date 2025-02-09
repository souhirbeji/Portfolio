import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillForm from '../components/forms/SkillForm';
import ProjectForm from '../components/forms/ProjectForm';
import ExperienceForm from '../components/forms/ExperienceForm';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const stats = [
    { title: 'Total Projects', value: '12', trend: '+2', color: 'bg-violet-500' },
    { title: 'Messages', value: '24', trend: '+5', color: 'bg-teal-500' },
    { title: 'Profile Views', value: '1.2k', trend: '+15%', color: 'bg-amber-500' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSubmit = async (formData) => {
    // Implement your API calls here
    console.log('Form submitted:', formData);
    setActiveForm(null);
    setEditItem(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Forms Section */}
        <div className="mb-8 space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setActiveForm('skill');
                setEditItem(null);
              }}
              className="px-4 py-2 bg-violet-500 text-white rounded-lg"
            >
              Add Skill
            </button>
            <button
              onClick={() => {
                setActiveForm('project');
                setEditItem(null);
              }}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg"
            >
              Add Project
            </button>
            <button
              onClick={() => {
                setActiveForm('experience');
                setEditItem(null);
              }}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg"
            >
              Add Experience
            </button>
          </div>
          {activeForm === 'skill' && <SkillForm onSubmit={handleSubmit} editItem={editItem} />}
          {activeForm === 'project' && <ProjectForm onSubmit={handleSubmit} editItem={editItem} />}
          {activeForm === 'experience' && <ExperienceForm onSubmit={handleSubmit} editItem={editItem} />}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
              <div className="mt-4 flex items-baseline space-x-4">
                <span className="text-4xl font-semibold">{stat.value}</span>
                <span className="text-green-500 text-sm">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Projects & Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
                <div
                  key={project}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-all"
                >
                  {project}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Messages Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', message: 'Interested in collaboration' },
                { name: 'Jane Smith', message: 'Great portfolio!' },
              ].map((msg, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-all"
                >
                  <h4 className="font-medium">{msg.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
