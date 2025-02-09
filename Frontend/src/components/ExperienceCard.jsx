import { motion } from 'framer-motion';

const ExperienceCard = ({ experience }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
      <p className="text-violet-500 dark:text-violet-400 mb-2">{experience.company}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-3">
        {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Présent'}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech, i) => (
          <span 
            key={i}
            className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
