export const calculateSkillsByCategory = (skills) => {
  if (!Array.isArray(skills)) return {};
  return skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {});
};

export const calculateProjectsByTechnology = (projects) => {
  if (!Array.isArray(projects)) return {};
  const techCount = projects.reduce((acc, project) => {
    project.technologies?.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {});

  return techCount;
};

export const generateExperienceTimeline = (experiences) => {
  if (!Array.isArray(experiences)) return [];
  
  // Create a new array instead of modifying the original
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });

  return sortedExperiences.map(exp => ({
    date: new Date(exp.startDate).getFullYear(),
    company: exp.company,
    title: exp.title,
    duration: exp.period
  }));
};

export const getDashboardStats = (projects, skills, experiences) => {
  return {
    totalProjects: Array.isArray(projects) ? projects.length : 0,
    totalSkills: Array.isArray(skills) ? skills.length : 0,
    totalExperiences: Array.isArray(experiences) ? experiences.length : 0,
    recentActivities: Array.isArray(experiences) ? 
      experiences.slice(0, 3).map(exp => ({
        type: 'experience',
        title: exp.title,
        company: exp.company,
        date: new Date(exp.startDate).toLocaleDateString()
      })) : []
  };
};
