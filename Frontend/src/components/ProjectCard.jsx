import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      {project.imageUrl && (
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, i) => (
          <span 
            key={i} 
            className="px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        {project.githubLink && (
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-violet-500 dark:text-gray-300"
          >
            GitHub
          </a>
        )}
        {project.demoLink && (
          <a 
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-500 dark:text-gray-300"
          >
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
