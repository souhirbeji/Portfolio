import { createContext, useContext, useState } from 'react';
import fr from '../lib/fr.json';
import en from '../lib/en.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'fr';
  });

  const translations = {
    fr,
    en
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const setLanguageAndSave = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: setLanguageAndSave,
      toggleLanguage,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
