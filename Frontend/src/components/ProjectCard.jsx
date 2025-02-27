import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const categoryThemes = [
  {
    gradient: 'from-violet-500 to-purple-500',
    bgHover: 'hover:bg-violet-50',
    tagBg: 'bg-violet-100',
    tagText: 'text-violet-600',
    buttonBg: 'bg-violet-100',
    buttonText: 'text-violet-600',
  },
  {
    gradient: 'from-teal-500 to-emerald-500',
    bgHover: 'hover:bg-teal-50',
    tagBg: 'bg-teal-100',
    tagText: 'text-teal-600',
    buttonBg: 'bg-teal-100',
    buttonText: 'text-teal-600',
  },
  {
    gradient: 'from-blue-500 to-cyan-500',
    bgHover: 'hover:bg-blue-50',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-600',
    buttonBg: 'bg-blue-100',
    buttonText: 'text-blue-600',
  }
];

const ProjectCard = ({ project, index = 0 }) => {
  const theme = categoryThemes[index % categoryThemes.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`} />
      </div>

      <div className="relative">
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span 
              key={i} 
              className={`px-3 py-1 rounded-full text-sm ${theme.tagBg} ${theme.tagText}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {project.githubLink && (
              <motion.a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 ${theme.buttonHover} transition-colors`}
                whileHover={{ scale: 1.05 }}
              >
                <FaGithub className="inline-block mr-1" />
                GitHub
              </motion.a>
            )}
            {project.demoLink && (
              <motion.a 
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 ${theme.buttonHover} transition-colors`}
                whileHover={{ scale: 1.05 }}
              >
                <FaExternalLinkAlt className="inline-block mr-1" />
                Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
