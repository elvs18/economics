import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Moon, Sun, Shield, GraduationCap } from 'lucide-react';

export default function Navbar({ onOpenQuiz }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

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
          {/* Quiz Button (Only visible on main page) */}
          {!isAdminPage && onOpenQuiz && (
            <button
              type="button"
              className="btn btn-secondary btn-sm header-quiz-btn"
              onClick={onOpenQuiz}
              title={t('quizTitle')}
            >
              <GraduationCap size={16} />
              <span>{t('quizBtn')}</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="lang-switcher" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
              onClick={() => setLang('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}
              onClick={() => setLang('uz')}
            >
              UZ
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            className="icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin link badge if authenticated or if on admin page */}
          {isAuthenticated && (
            <Link
              to="/admin"
              className={`btn btn-sm ${isAdminPage ? 'btn-primary' : 'btn-outline-admin'}`}
              title="Admin Panel"
            >
              <Shield size={15} />
              <span className="admin-btn-text">Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
