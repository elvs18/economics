import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong>Economics Hub</strong> — {t('appSub')}.
          </p>
          <span className="footer-note">
            Разработано для студентов и исследователей в области экономики.
          </span>
        </div>

        <div className="footer-right">
          <Link
            to="/admin"
            className="footer-admin-link"
            title={isAuthenticated ? 'Перейти в панель автора' : 'Вход для автора словаря'}
          >
            {isAuthenticated ? (
              <span className="admin-status-pill">
                <ShieldCheck size={14} />
                <span>Автор: активен</span>
              </span>
            ) : (
              <span className="admin-secret-trigger" aria-label="Author Access">
                <Lock size={14} />
              </span>
            )}
          </Link>
        </div>
      </div>
    </footer>
  );
}
