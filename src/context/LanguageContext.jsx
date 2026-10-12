import { createContext, useContext, useState, useEffect } from 'react';
import { I18N } from '../constants/i18n';
import { CATEGORY_LABELS } from '../constants/categories';

const LanguageContext = createContext();

function detectInitialLanguage() {
  const saved = localStorage.getItem('econ_lang');
  if (saved && ['ru', 'en', 'uz'].includes(saved)) return saved;

  const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (browser.startsWith('ru') || browser.startsWith('be') || browser.startsWith('uk')) return 'ru';
  if (browser.startsWith('uz')) return 'uz';
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem('econ_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, ...args) => {
    const dict = I18N[lang] || I18N.ru;
    const value = dict[key];
    if (typeof value === 'function') {
      return value(...args);
    }
    return value || key;
  };

  const getCategoryLabel = (catId) => {
    const dict = CATEGORY_LABELS[lang] || CATEGORY_LABELS.ru;
    return dict[catId] || catId;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getCategoryLabel }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
