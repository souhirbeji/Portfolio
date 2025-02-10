export const calculateSkillsByCategory = (skills = []) => {
  return skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {});
};

export const calculateProjectsByTechnology = (projects = []) => {
  const techCount = {};
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });
  return techCount;
};

export const generateExperienceTimeline = (experiences = []) => {
  return experiences
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map(exp => ({
      title: exp.title,
      company: exp.company,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : new Date(),
      duration: calculateDuration(exp.startDate, exp.endDate)
    }));
};

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
    (end.getMonth() - start.getMonth());
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  return {
    years,
    months,
    totalMonths: diffInMonths
  };
};
