import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTerms } from '../context/TermsContext';
import { useToast } from '../context/ToastContext';
import { CATEGORIES } from '../constants/categories';
import TermModal from '../components/admin/TermModal';
import ImportModal from '../components/admin/ImportModal';
import {
  Lock,
  Shield,
  LogOut,
  ArrowLeft,
  Plus,
  Download,
  Upload,
  RotateCcw,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Layers,
  Globe2
} from 'lucide-react';

export default function AdminPage() {
  const { isAuthenticated, login, logout } = useAuth();
  const { lang, getCategoryLabel, t } = useLanguage();
  const { terms, addTerm, updateTerm, deleteTerm, importTerms, resetTerms, exportTermsAsJson } = useTerms();
  const { showToast } = useToast();

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Admin table state
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('all');

  // Modals state
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [termToEdit, setTermToEdit] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (login(passcode)) {
      setLoginError(false);
      setPasscode('');
      showToast('Вход в панель администратора выполнен', 'success');
    } else {
      setLoginError(true);
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = terms.length;
    const filledTri = terms.filter(t => t.ru?.term && t.en?.term && t.uz?.term).length;
    const completeness = total > 0 ? Math.round((filledTri / total) * 100) : 0;
    const usedCategories = new Set(terms.map(t => t.category)).size;

    return { total, completeness, usedCategories };
  }, [terms]);

  // Filtered terms for admin table
  const filteredTerms = useMemo(() => {
    return terms.filter(item => {
      if (adminCategory !== 'all' && item.category !== adminCategory) {
        return false;
      }
      if (adminSearch.trim()) {
        const q = adminSearch.toLowerCase().trim();
        const ru = (item.ru?.term || '').toLowerCase().includes(q);
        const en = (item.en?.term || '').toLowerCase().includes(q);
        const uz = (item.uz?.term || '').toLowerCase().includes(q);
        const cat = getCategoryLabel(item.category || '').toLowerCase().includes(q);
        return ru || en || uz || cat;
      }
      return true;
    });
  }, [terms, adminCategory, adminSearch, getCategoryLabel]);

  // Handlers
  const handleOpenAdd = () => {
    setTermToEdit(null);
    setIsTermModalOpen(true);
  };

  const handleOpenEdit = (term) => {
    setTermToEdit(term);
    setIsTermModalOpen(true);
  };

  const handleSaveTerm = (formData) => {
    if (termToEdit) {
      updateTerm(termToEdit.id, formData);
      showToast(t('savedToast'), 'success');
    } else {
      addTerm(formData);
      showToast(t('savedToast'), 'success');
    }
  };

  const handleDelete = (id) => {
    deleteTerm(id);
    setDeleteConfirmId(null);
    showToast(t('deletedToast'), 'info');
  };

  const handleImportPayload = (parsedTerms) => {
    try {
      const count = importTerms(parsedTerms);
      showToast(t('importSuccess', count), 'success');
    } catch {
      showToast(t('importError'), 'error');
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm(t('confirmReset'))) {
      resetTerms();
      showToast('База данных сброшена до стандартных 10 терминов', 'info');
    }
  };

  // ==========================================
  // VIEW 1: UNAUTHENTICATED (PASSCODE LOGIN)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <main className="admin-login-view">
        <div className="login-card">
          <div className="login-card-header">
            <div className="lock-icon-badge">
              <Lock size={28} />
            </div>
            <h1 className="login-title">{t('adminTitle')}</h1>
            <p className="login-subtitle">{t('adminSub')}</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form">
            {loginError && (
              <div className="form-error-alert">
                <AlertCircle size={16} />
                <span>{t('adminPassError')}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="admin-pass-input" className="form-label">
                {t('adminPassPrompt')}
              </label>
              <input
                id="admin-pass-input"
                type="password"
                className="form-input"
                placeholder={t('adminPassPh')}
                value={passcode}
                onChange={e => {
                  setPasscode(e.target.value);
                  setLoginError(false);
                }}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              <Shield size={16} />
              <span>{t('adminLoginBtn')}</span>
            </button>
          </form>

          <div className="login-card-footer">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} />
              <span>{t('backToSite')}</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const termToDelete = terms.find(t => t.id === deleteConfirmId);

  return (
    <main className="admin-dashboard-view">
      {/* Top Admin Bar */}
      <section className="admin-topbar">
        <div className="admin-topbar-container">
          <div className="topbar-left">
            <Link to="/" className="btn btn-secondary btn-sm back-site-btn">
              <ArrowLeft size={16} />
              <span>{t('backToSite')}</span>
            </Link>
            <div className="admin-badge-tag">
              <Shield size={16} />
              <span>Admin Studio</span>
            </div>
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={logout}
              title={t('adminLogout')}
            >
              <LogOut size={16} />
              <span>{t('adminLogout')}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="admin-content-container">
        {/* KPI Metrics Row */}
        <section className="admin-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon-wrap kpi-blue">
              <Layers size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">{t('adminStatsTotal')}</span>
              <strong className="kpi-value">{stats.total}</strong>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap kpi-purple">
              <Globe2 size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">{t('adminStatsLangReady')}</span>
              <strong className="kpi-value">{stats.completeness}%</strong>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap kpi-emerald">
              <CheckCircle2 size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">{t('adminStatsCategories')}</span>
              <strong className="kpi-value">{stats.usedCategories} / 6</strong>
            </div>
          </div>
        </section>

        {/* Action Controls & Filters Bar */}
        <section className="admin-controls-card">
          <div className="controls-search-row">
            <div className="search-bar-wrap admin-search-wrap">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder={t('searchAdminPh')}
                value={adminSearch}
                onChange={e => setAdminSearch(e.target.value)}
              />
            </div>

            <select
              className="form-select admin-category-select"
              value={adminCategory}
              onChange={e => setAdminCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {getCategoryLabel(cat.id)}
                </option>
              ))}
            </select>
          </div>

          <div className="controls-buttons-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>{t('addTermBtn')}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={exportTermsAsJson}
              title={t('exportBtn')}
            >
              <Download size={16} />
              <span>{t('exportBtn')}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsImportModalOpen(true)}
              title={t('importBtn')}
            >
              <Upload size={16} />
              <span>{t('importBtn')}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleResetToDefaults}
              title={t('resetDefaultsBtn')}
            >
              <RotateCcw size={16} />
              <span>{t('resetDefaultsBtn')}</span>
            </button>
          </div>
        </section>

        {/* Data Table */}
        <section className="admin-table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('colTerm')}</th>
                  <th>{t('colCategory')}</th>
                  <th>{t('colLanguages')}</th>
                  <th>{t('colDate')}</th>
                  <th className="text-right">{t('colActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTerms.length > 0 ? (
                  filteredTerms.map(term => {
                    const currentLangTitle = term[lang]?.term || term.ru?.term || term.en?.term || term.uz?.term || '—';
                    return (
                      <tr key={term.id} className="admin-table-row">
                        <td className="term-cell">
                          <strong className="term-primary-name">{currentLangTitle}</strong>
                          <div className="term-langs-sub">
                            {term.ru?.term && <span>RU: {term.ru.term}</span>}
                            {term.en?.term && <span>EN: {term.en.term}</span>}
                            {term.uz?.term && <span>UZ: {term.uz.term}</span>}
                          </div>
                        </td>
                        <td>
                          <span className={`category-tag category-tag-${term.category || 'other'}`}>
                            {getCategoryLabel(term.category || 'other')}
                          </span>
                        </td>
                        <td>
                          <div className="lang-indicators">
                            <span className={`lang-indicator ${term.ru?.term ? 'filled' : 'empty'}`}>
                              RU
                            </span>
                            <span className={`lang-indicator ${term.en?.term ? 'filled' : 'empty'}`}>
                              EN
                            </span>
                            <span className={`lang-indicator ${term.uz?.term ? 'filled' : 'empty'}`}>
                              UZ
                            </span>
                          </div>
                        </td>
                        <td className="date-cell">
                          {term.dateAdded ? new Date(term.dateAdded).toLocaleDateString() : '—'}
                        </td>
                        <td className="actions-cell text-right">
                          <button
                            type="button"
                            className="btn-icon-action edit-btn"
                            onClick={() => handleOpenEdit(term)}
                            title={t('actionEdit')}
                            aria-label={`Редактировать ${currentLangTitle}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action delete-btn"
                            onClick={() => setDeleteConfirmId(term.id)}
                            title={t('actionDelete')}
                            aria-label={`Удалить ${currentLangTitle}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="table-empty-cell">
                      {t('noSearchResults', adminSearch || adminCategory)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Term Modal (Add / Edit) */}
      {isTermModalOpen && (
        <TermModal
          key={termToEdit ? termToEdit.id : 'new'}
          isOpen={isTermModalOpen}
          onClose={() => setIsTermModalOpen(false)}
          onSave={handleSaveTerm}
          termToEdit={termToEdit}
        />
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImportPayload}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)} role="dialog">
          <div className="modal-container confirm-modal-container" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{t('actionDelete')}</h3>
            <p className="confirm-modal-text">
              {t('confirmDelete', termToDelete?.[lang]?.term || termToDelete?.ru?.term || 'этот термин')}
            </p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteConfirmId(null)}
              >
                {t('cancelBtn')}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                <Trash2 size={16} />
                <span>{t('actionDelete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
