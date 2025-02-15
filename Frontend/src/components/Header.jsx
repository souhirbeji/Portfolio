import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './ui/LanguageToggle';
import LanguageSelector from './ui/LanguageSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/experience', label: 'Expérience' },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-700 dark:text-gray-200 hover:text-violet-500 dark:hover:text-violet-400 transition-colors ${
                  location.pathname === link.path ? 'text-violet-500 dark:text-violet-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-gray-700 dark:text-gray-200 hover:text-violet-500 dark:hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
