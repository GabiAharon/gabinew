import '../styles/globals.css'
import Layout from '../components/Layout'
import { useState, createContext, useContext, useEffect } from 'react'

export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('he');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gabiLang');
        if (saved === 'en' || saved === 'he') {
          setLanguage(saved);
          document.documentElement.dir = saved === 'he' ? 'rtl' : 'ltr';
          document.documentElement.lang = saved;
        } else {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'he';
        }
      } catch (e) {}
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gabiLang', lang);
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      } catch (e) {}
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      <Layout language={language}>
        <Component {...pageProps} />
      </Layout>
    </LanguageContext.Provider>
  );
}

export default MyApp;
