import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaPlus, FaCode, FaProjectDiagram, FaBriefcase, FaEdit, FaTrash, FaChartLine } from 'react-icons/fa';
import DashboardStats from '../components/dashboard/DashboardStats';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import ActionButton from '../components/ui/ActionButton';
import Modal from '../components/ui/Modal';
import SkillForm from '../components/forms/SkillForm';
import ProjectForm from '../components/forms/ProjectForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import { 
  fetchSkills, 
  deleteSkill, 
  createSkill, 
  updateSkill 
} from '../redux/Slices/SkillThunk';
import { 
  fetchProjects, 
  deleteProject, 
  createProject, 
  updateProject 
} from '../redux/Slices/Projectthunk';
import { 
  fetchExperiences, 
  deleteExperience, 
  createExperience, 
  updateExperience 
} from '../redux/Slices/ExperienceThunk';
import { calculateSkillsByCategory, calculateProjectsByTechnology, generateExperienceTimeline } from '../utils/dashboardUtils';
import ItemList from '../components/dashboard/ItemList';
import BarChart from '../components/dashboard/BarChart';
import FloatingMenu from '../components/ui/FloatingMenu';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('overview');
  const [activeForm, setActiveForm] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');

  const { skills, loading: skillsLoading } = useSelector(state => state.skills);
  const { projects, loading: projectsLoading } = useSelector(state => state.projects);
  const { experiences, loading: experiencesLoading } = useSelector(state => state.experiences);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchExperiences());
  }, [dispatch]);

  // Calculate statistics and analytics
  const stats = {
    totalProjects: projects?.length || 0,
    totalSkills: skills?.length || 0,
    totalExperiences: experiences?.length || 0,
    skillsByCategory: calculateSkillsByCategory(skills),
    projectsByTechnology: calculateProjectsByTechnology(projects),
    experienceTimeline: generateExperienceTimeline(experiences)
  };

  const handleFormSubmit = async (formData, type) => {
    try {
      switch (type) {
        case 'skill':
          await dispatch(itemToEdit 
            ? updateSkill({ id: itemToEdit._id, skillData: formData })
            : createSkill(formData));
          break;
        case 'project':
          await dispatch(itemToEdit 
            ? updateProject({ id: itemToEdit._id, projectData: formData })
            : createProject(formData));
          break;
        case 'experience':
          await dispatch(itemToEdit 
            ? updateExperience({ id: itemToEdit._id, experienceData: formData })
            : createExperience(formData));
          break;
      }
      setActiveForm(null);
      setItemToEdit(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderFormContent = () => {
    switch (activeForm) {
      case 'skill':
        return (
          <SkillForm
            skillToEdit={itemToEdit}
            onSubmit={(data) => handleFormSubmit(data, 'skill')}
            onCancel={() => {
              setActiveForm(null);
              setItemToEdit(null);
            }}
          />
        );
      case 'project':
        return (
          <ProjectForm
            projectToEdit={itemToEdit}
            onSubmit={(data) => handleFormSubmit(data, 'project')}
            onCancel={() => {
              setActiveForm(null);
              setItemToEdit(null);
            }}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experienceToEdit={itemToEdit}
            onSubmit={(data) => handleFormSubmit(data, 'experience')}
            onCancel={() => {
              setActiveForm(null);
              setItemToEdit(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <DashboardStats stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCharts data={stats} timeFilter={timeFilter} />
              <BarChart
                data={stats.projectsByTechnology}
                title="Technologies Usage"
                className="h-[300px]"
              />
            </div>
          </>
        );
      case 'skills':
        return (
          <ItemList
            items={skills}
            loading={skillsLoading}
            onEdit={(item) => handleEdit(item, 'skill')}
            onDelete={(id) => handleDelete(id, 'skill')}
            renderItem={(skill) => ({
              title: skill.name,
              subtitle: skill.category,
              icon: <i className={`fab ${skill.icon} text-${skill.iconColor}`} />,
              tags: [skill.category]
            })}
          />
        );
      case 'projects':
        return (
          <ItemList
            items={projects}
            loading={projectsLoading}
            onEdit={(item) => handleEdit(item, 'project')}
            onDelete={(id) => handleDelete(id, 'project')}
            renderItem={(project) => ({
              title: project.title,
              subtitle: project.description,
              image: project.imageUrl,
              tags: project.technologies
            })}
          />
        );
      case 'experiences':
        return (
          <ItemList
            items={experiences}
            loading={experiencesLoading}
            onEdit={(item) => handleEdit(item, 'experience')}
            onDelete={(id) => handleDelete(id, 'experience')}
            renderItem={(experience) => ({
              title: experience.title,
              subtitle: experience.company,
              description: experience.description,
              date: `${new Date(experience.startDate).getFullYear()} - ${
                experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'
              }`,
              tags: experience.technologies
            })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your portfolio content and track analytics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {['overview', 'skills', 'projects', 'experiences'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${activeSection === section 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {renderSectionContent()}
        </div>

        {/* Floating Action Button Menu */}
        <FloatingMenu onAddItem={setActiveForm} />

        {/* Forms Modals */}
        {activeForm && (
          <Modal
            isOpen={!!activeForm}
            onClose={() => {
              setActiveForm(null);
              setItemToEdit(null);
            }}
            title={`${itemToEdit ? 'Edit' : 'Add'} ${activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}`}
          >
            {renderFormContent()}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
