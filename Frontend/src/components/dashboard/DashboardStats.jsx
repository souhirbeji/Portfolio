import { motion } from 'framer-motion';
import { FaProjectDiagram, FaCode, FaBriefcase, FaChartLine } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FaProjectDiagram,
      color: 'bg-violet-500',
      growth: '+12%',
    },
    {
      title: 'Skills Mastered',
      value: stats.totalSkills,
      icon: FaCode,
      color: 'bg-blue-500',
      growth: '+8%',
    },
    {
      title: 'Work Experience',
      value: `${stats.totalExperiences} Years`,
      icon: FaBriefcase,
      color: 'bg-green-500',
      growth: '+15%',
    },
    {
      title: 'Portfolio Views',
      value: '1.2K',
      icon: FaChartLine,
      color: 'bg-amber-500',
      growth: '+25%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium">{stat.growth}</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
