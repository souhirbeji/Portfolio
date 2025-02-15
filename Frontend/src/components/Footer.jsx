import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/souhirbeji' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/souhir-beji-3952021b4/' },
  ];

  const navigationLinks = [
    { name: t('footer.links.portfolio'), path: '/projects' },
    { name: t('footer.links.about'), path: '/about' },
    { name: t('footer.links.contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
                Portfolio
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('footer.followMe')}
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Portfolio. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
