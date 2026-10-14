import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Moon, Sun, Shield, GraduationCap, Globe, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ onOpenQuiz }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, openLoginModal } = useAuth();
  const location = useLocation();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const isAdminPage = location.pathname.startsWith('/admin');

  // Languages metadata
  const languages = [
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'uz', label: 'Oʻzbekcha', short: 'UZ' }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    if (!isLangDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const handleSelectLang = (code, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLang(code);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo">
          <div className="brand-icon-wrap">
            <BookOpen className="brand-icon" size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-title">{t('appTitle')}</span>
            <span className="brand-badge">Hub</span>
          </div>
        </Link>

        <div className="header-actions">
          {/* Quiz Button - placed next to Admin button as requested */}
          {!isAdminPage && onOpenQuiz && (
            <button
              type="button"
              className="btn btn-secondary btn-sm header-quiz-btn"
              onClick={onOpenQuiz}
              title={t('quizTitle')}
            >
              <GraduationCap size={15} />
              <span className="header-quiz-text">{t('quizBtn')}</span>
            </button>
          )}

          {/* Admin link badge or login trigger */}
          {isAuthenticated ? (
            <Link
              to="/admin"
              className={`btn btn-sm header-admin-btn ${isAdminPage ? 'btn-primary' : 'btn-outline-admin'}`}
              title="Admin Panel"
            >
              <Shield size={14} />
              <span className="admin-btn-text">Admin</span>
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-outline-admin header-admin-btn"
              onClick={openLoginModal}
              title="Панель администратора"
            >
              <Shield size={14} />
              <span className="admin-btn-text">Admin</span>
            </button>
          )}

          {/* Smooth Language Dropdown ("Шторка") */}
          <div className="lang-dropdown-wrapper" ref={langDropdownRef}>
            <button
              type="button"
              className={`lang-dropdown-trigger ${isLangDropdownOpen ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLangDropdownOpen(prev => !prev);
              }}
              aria-expanded={isLangDropdownOpen}
              aria-haspopup="listbox"
              title="Выбрать язык / Select language"
            >
              <Globe size={13} className="lang-globe-icon" />
              <span className="lang-current-code">{lang.toUpperCase()}</span>
              <ChevronDown
                size={12}
                className={`lang-chevron-icon ${isLangDropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            {/* Dropdown Curtain / Меню-шторка */}
            {isLangDropdownOpen && (
              <div className="lang-dropdown-curtain" role="listbox">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={lang === item.code}
                    className={`lang-dropdown-item ${lang === item.code ? 'selected' : ''}`}
                    onClick={(e) => handleSelectLang(item.code, e)}
                    onPointerDown={(e) => handleSelectLang(item.code, e)}
                  >
                    <span className="lang-item-code">{item.short}</span>
                    <span className="lang-item-name">{item.label}</span>
                    {lang === item.code && (
                      <Check size={14} className="lang-item-check" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            className="icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
