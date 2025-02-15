import { motion } from 'framer-motion';
import { FaProjectDiagram, FaCode, FaBriefcase, FaChartLine } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FaProjectDiagram,
      color: 'bg-gradient-to-br from-violet-500 to-purple-600',
      growth: '+12%',
    },
    {
      title: 'Skills Mastered',
      value: stats.totalSkills,
      icon: FaCode,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      growth: '+8%',
    },
    {
      title: 'Work Experience',
      value: `${stats.totalExperiences} Years`,
      icon: FaBriefcase,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      growth: '+15%',
    },
    {
      title: 'Portfolio Views',
      value: '1.2K',
      icon: FaChartLine,
      color: 'bg-gradient-to-br from-amber-500 to-orange-600',
      growth: '+25%',
    },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.color} rounded-2xl p-6 shadow-lg text-white`}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-sm opacity-75">{stat.title}</span>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">
              {stat.growth}
            </span>
            <span className="ml-2 opacity-75">vs last month</span>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default DashboardStats;
