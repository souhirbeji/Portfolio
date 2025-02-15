import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { sendMessage } from '../redux/Slices/MessageThunk';
import Toast from '../components/ui/Toast'; // Assurez-vous d'avoir ce composant

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.messages);
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/souhirbeji', color: 'hover:text-gray-800' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/souhir-beji-3952021b4/', color: 'hover:text-blue-600' },  ];

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'beji.souhirpro@gmail.com' },
    { icon: <FaMapMarkerAlt />, label: 'Localisation', value: 'Paris, France' },
    { icon: <FaPhone />, label: 'Téléphone', value: '+33 6 99 62 24 61' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendMessage(formData)).unwrap();
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      // Show success message
      setToastMessage(t('contact.form.success'));
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      // Show error message
      setToastMessage(t('contact.form.error'));
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
              {t('contact.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{t('contact.info.title')}</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-violet-500">{item.icon}</span>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="text-gray-800 dark:text-gray-200">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{t('contact.social.title')}</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className={`text-2xl text-gray-600 dark:text-gray-400 ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6"
            >
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600
                    focus:ring-2 focus:ring-violet-500 focus:border-transparent
                    transition duration-150 ease-in-out"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600
                    focus:ring-2 focus:ring-violet-500 focus:border-transparent
                    transition duration-150 ease-in-out"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600
                    focus:ring-2 focus:ring-violet-500 focus:border-transparent
                    transition duration-150 ease-in-out resize-none"
                  required
                  disabled={loading}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-500 to-teal-500 text-white rounded-lg
                  hover:opacity-90 transition-opacity duration-150 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center"
              >
                {loading ? (
                  <span className="inline-block animate-spin mr-2">⌛</span>
                ) : null}
                {loading ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Toast pour les notifications */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Contact;
