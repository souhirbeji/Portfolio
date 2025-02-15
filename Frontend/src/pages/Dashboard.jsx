import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaPlus, FaCode, FaProjectDiagram, FaBriefcase, FaEdit, FaTrash, FaChartLine, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/dashboard/DashboardStats';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import ActionButton from '../components/ui/ActionButton';
import Modal from '../components/ui/Modal';
import SkillForm from '../components/forms/SkillForm';
import ProjectForm from '../components/forms/ProjectForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import LanguageToggle from '../components/ui/LanguageToggle';
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
import { fetchMessages, replyToMessage } from '../redux/Slices/MessageSlice';
import { calculateSkillsByCategory, calculateProjectsByTechnology, generateExperienceTimeline } from '../utils/dashboardUtils';
import ItemList from '../components/dashboard/ItemList';
import BarChart from '../components/dashboard/BarChart';
import FloatingMenu from '../components/ui/FloatingMenu';
import QuoteCard from '../components/dashboard/QuoteCard';
import { useLanguage } from '../contexts/LanguageContext';
import Toast from '../components/ui/Toast';
import { fetchViewCount } from '../redux/Slices/ViewSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const [activeForm, setActiveForm] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [replyTexts, setReplyTexts] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const { skills, loading: skillsLoading } = useSelector(state => state.skills);
  const { projects, loading: projectsLoading } = useSelector(state => state.projects);
  const { experiences, loading: experiencesLoading } = useSelector(state => state.experiences);
  const { messages, loading } = useSelector(state => state.messages);
  const { count: viewCount } = useSelector(state => state.views);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchExperiences());
    dispatch(fetchMessages());
    
    // Récupération initiale du compteur de vues
    dispatch(fetchViewCount());
    
    // Mise à jour toutes les 30 secondes
    const interval = setInterval(() => {
      dispatch(fetchViewCount());
    }, 30000);
    
    return () => clearInterval(interval);
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

  const handleEdit = (item, type) => {
    setItemToEdit(item);
    setActiveForm(type);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        switch (type) {
          case 'skill':
            await dispatch(deleteSkill(id)).unwrap();
            break;
          case 'project':
            await dispatch(deleteProject(id)).unwrap();
            break;
          case 'experience':
            await dispatch(deleteExperience(id)).unwrap();
            break;
          default:
            console.error('Type de suppression non reconnu:', type);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    // Navigate to login page
    navigate('/auth');
  };

  const handleReply = async (messageId, reply) => {
    try {
      setShowToast(true);
      setToastMessage("Envoi de la réponse...");
      setToastType('info');
      await dispatch(replyToMessage({ id: messageId, reply })).unwrap();
      setToastMessage("Réponse envoyée avec succès");
      setToastType('success');
      setShowToast(true);
      setReplyTexts(prev => ({
        ...prev,
        [messageId]: ''
      }));
    } catch (error) {
      setToastMessage("Erreur lors de l'envoi de la réponse");
      setToastType('error');
      setShowToast(true);
      console.error('Error replying to message:', error);
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
          <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 shadow-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-600">Total Projects</h3>
                <p className="text-3xl font-bold text-orange-500">{stats.totalProjects}</p>
              </motion.div>
              
              <motion.div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 shadow-lg border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-600">Total Skills</h3>
                <p className="text-3xl font-bold text-emerald-500">{stats.totalSkills}</p>
              </motion.div>
              
              <motion.div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-6 shadow-lg border border-sky-200">
                <h3 className="text-lg font-semibold text-sky-600">Experiences</h3>
                <p className="text-3xl font-bold text-sky-500">{stats.totalExperiences}</p>
              </motion.div>
              
              <motion.div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-6 shadow-lg border border-violet-200">
                <h3 className="text-lg font-semibold text-violet-600">Profile Views</h3>
                <p className="text-3xl font-bold text-violet-500">{viewCount}</p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Charts Section */}
              <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 rounded-2xl p-6 shadow-lg border border-violet-200"
                >
                  <h3 className="text-xl font-semibold mb-6 text-violet-600 dark:text-violet-300 border-b border-violet-200 pb-3 text-center">
                    Skills & Technologies Overview
                  </h3>
                  <div className="flex items-center min-h-[400px]">
                      <DashboardCharts data={stats} timeFilter={timeFilter} />

                      <div className="flex flex-col items-center space-y-4" style= {{position: 'absolute', right: '430px', top: '269px', border: '1px solid #e5e7eb', padding: '10px', borderRadius: '10px'}}>                      
                        <img src="https://media1.giphy.com/media/0UcWwQreelWsR48UtD/giphy.gif?cid=6c09b952y79frmlqttu83fllkaj3cqtmmq9lrukqxb8wuhyo&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" alt="Analytics" className="w-80 h-80" />
                      </div>

                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 shadow-lg border border-emerald-200"
                >
                  <h3 className="text-xl font-semibold mb-6 text-emerald-600 dark:text-emerald-300 border-b border-emerald-200 pb-3 text-center">
                    Project Distribution
                  </h3>
                  <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-full max-w-2xl">
                      <BarChart
                        data={stats.projectsByTechnology}
                        title="Technologies Usage"
                        className="h-[300px]"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 shadow-lg border border-orange-200"
                >
                  <QuoteCard />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg border border-sky-200"
                >
                  <h3 className="text-xl font-semibold mb-4 text-sky-600 dark:text-sky-300 border-b border-sky-200 pb-3">
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {[1].map((_, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-sky-400"></div>

                        <span className="text-sky-600 dark:text-sky-300">
                          Created PowerBi Project
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
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
              date: `${experience.period}`,
              tags: experience.technologies
            })}
          />
        );
      case 'messages':
        return (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} 
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg
                  ${message.status === 'replied' ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      message.status === 'replied' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {message.status === 'replied' ? 'Répondu' : 'En attente'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-4">{message.message}</p>
                {message.status === 'pending' ? (
                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600
                        focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Votre réponse..."
                      value={replyTexts[message._id] || ''}
                      onChange={(e) => setReplyTexts(prev => ({
                        ...prev,
                        [message._id]: e.target.value
                      }))}
                    />
                    <button
                      onClick={() => handleReply(message._id, replyTexts[message._id])}
                      disabled={!replyTexts[message._id]?.trim() || loading}
                      className="mt-2 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors duration-200"
                    >
                     {t('dashboard.actions.send')}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="font-semibold text-green-600 dark:text-green-400">Réponse envoyée:</p>
                    <p className="mt-2">{message.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100/20 to-teal-100/20 dark:from-violet-900/20 dark:to-teal-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header with Logout Button */}
        <div className="mb-12 relative">
          <div className="absolute right-0 top-0 flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-teal-500 text-white rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>{t('dashboard.actions.logout')}</span>
            </button>
          </div>

          {/* Existing header content */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
                {t('dashboard.title')}
              </span>
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('dashboard.subtitle')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Updated design with gradient */}
        <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
          <nav className="flex space-x-2">
            {['overview', 'skills', 'projects', 'experiences', 'messages'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2
                  ${activeSection === section 
                    ? 'bg-gradient-to-r from-violet-500 to-teal-500 text-white shadow-lg' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              >
                {getTabIcon(section)}
                <span>{t(`dashboard.sections.${section}`)}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 to-teal-100/20 dark:from-violet-900/20 dark:to-teal-900/20" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.3, 0.5]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-grid-pattern"
            style={{
              backgroundSize: '30px 30px',
              backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)'
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 transition-all duration-300 ease-in-out">
          {renderSectionContent()}
        </div>

        {/* Keep existing FloatingMenu and Modal */}
        <FloatingMenu onAddItem={setActiveForm} />
        
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
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

// Helper function to get tab icons
const getTabIcon = (section) => {
  switch (section) {
    case 'overview':
      return <FaChartLine className="w-4 h-4" />;
    case 'skills':
      return <FaCode className="w-4 h-4" />;
    case 'projects':
      return <FaProjectDiagram className="w-4 h-4" />;
    case 'experiences':
      return <FaBriefcase className="w-4 h-4" />;
    case 'messages':
      return <FaEnvelope className="w-4 h-4" />;
    default:
      return null;
  }
};

export default Dashboard;
