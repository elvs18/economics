import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Shield, X, AlertCircle } from 'lucide-react';

export default function AdminLoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  // Keyboard navigation (Esc to close)
  useEffect(() => {
    if (!isLoginModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLoginModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isLoginModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(passcode)) {
      setError(false);
      setPasscode('');
      showToast('Вход в панель администратора выполнен', 'success');
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
    setPasscode('');
    closeLoginModal();
  };

  return (
    <div
      className="modal-overlay admin-login-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-modal-title"
    >
      <div
        className="modal-container admin-login-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header admin-login-modal-header">
          <div className="login-modal-header-info">
            <div className="lock-icon-badge-sm">
              <Lock size={18} />
            </div>
            <h3 id="admin-login-modal-title" className="modal-title">
              {t('adminTitle')}
            </h3>
          </div>
          <button
            type="button"
            className="icon-btn modal-close-btn"
            onClick={handleClose}
            aria-label={t('close')}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-modal-body">
          <p className="admin-login-modal-desc">{t('adminSub')}</p>

          {error && (
            <div className="form-error-alert">
              <AlertCircle size={16} />
              <span>{t('adminPassError')}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="admin-modal-pass-input" className="form-label">
              {t('adminPassPrompt')}
            </label>
            <input
              id="admin-modal-pass-input"
              type="password"
              className="form-input"
              placeholder={t('adminPassPh')}
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              autoFocus
              required
            />
          </div>

          <div className="admin-login-modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              {t('cancelBtn')}
            </button>
            <button type="submit" className="btn btn-primary">
              <Shield size={16} />
              <span>{t('adminLoginBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
