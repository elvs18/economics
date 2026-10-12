import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../constants/categories';
import { X, Globe, Save } from 'lucide-react';

export default function TermModal({ isOpen, onClose, onSave, termToEdit }) {
  const { lang, getCategoryLabel, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(() => lang || 'ru');
  const [category, setCategory] = useState(() => termToEdit?.category || 'macro');
  const [formData, setFormData] = useState(() => ({
    ru: {
      term: termToEdit?.ru?.term || '',
      definition: termToEdit?.ru?.definition || '',
      example: termToEdit?.ru?.example || ''
    },
    en: {
      term: termToEdit?.en?.term || '',
      definition: termToEdit?.en?.definition || '',
      example: termToEdit?.en?.example || ''
    },
    uz: {
      term: termToEdit?.uz?.term || '',
      definition: termToEdit?.uz?.definition || '',
      example: termToEdit?.uz?.example || ''
    }
  }));
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFieldChange = (langKey, field, value) => {
    setFormData(prev => ({
      ...prev,
      [langKey]: {
        ...prev[langKey],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that at least one language has a title and definition
    const hasRu = formData.ru.term.trim() && formData.ru.definition.trim();
    const hasEn = formData.en.term.trim() && formData.en.definition.trim();
    const hasUz = formData.uz.term.trim() && formData.uz.definition.trim();

    if (!hasRu && !hasEn && !hasUz) {
      setError(t('validationError'));
      return;
    }

    onSave({
      category,
      ru: formData.ru,
      en: formData.en,
      uz: formData.uz
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container term-modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {termToEdit ? t('formEditTitle') : t('formAddTitle')}
          </h3>
          <button
            type="button"
            className="icon-btn modal-close-btn"
            onClick={onClose}
            aria-label={t('close')}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="term-modal-form">
          {error && <div className="form-error-alert">{error}</div>}

          {/* Category selection */}
          <div className="form-group">
            <label className="form-label" htmlFor="term-category-select">
              {t('formCategory')}
            </label>
            <select
              id="term-category-select"
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>
                  {getCategoryLabel(cat.id)}
                </option>
              ))}
            </select>
          </div>

          {/* Language Tabs */}
          <div className="lang-tabs-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'ru'}
              className={`lang-tab-btn ${activeTab === 'ru' ? 'active' : ''} ${formData.ru.term ? 'filled' : ''}`}
              onClick={() => setActiveTab('ru')}
            >
              <Globe size={14} />
              <span>{t('formLangRu')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'en'}
              className={`lang-tab-btn ${activeTab === 'en' ? 'active' : ''} ${formData.en.term ? 'filled' : ''}`}
              onClick={() => setActiveTab('en')}
            >
              <Globe size={14} />
              <span>{t('formLangEn')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'uz'}
              className={`lang-tab-btn ${activeTab === 'uz' ? 'active' : ''} ${formData.uz.term ? 'filled' : ''}`}
              onClick={() => setActiveTab('uz')}
            >
              <Globe size={14} />
              <span>{t('formLangUz')}</span>
            </button>
          </div>

          {/* Tab Content for selected language */}
          <div className="tab-panel-content">
            <div className="form-group">
              <label className="form-label" htmlFor={`term-title-${activeTab}`}>
                {t('formTermLabel')} ({activeTab.toUpperCase()})
              </label>
              <input
                id={`term-title-${activeTab}`}
                type="text"
                className="form-input"
                placeholder={t('formTermPh')}
                value={formData[activeTab].term}
                onChange={e => handleFieldChange(activeTab, 'term', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor={`term-def-${activeTab}`}>
                {t('formDefLabel')} ({activeTab.toUpperCase()})
              </label>
              <textarea
                id={`term-def-${activeTab}`}
                rows={4}
                className="form-textarea"
                placeholder={t('formDefPh')}
                value={formData[activeTab].definition}
                onChange={e => handleFieldChange(activeTab, 'definition', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor={`term-ex-${activeTab}`}>
                {t('formExLabel')} ({activeTab.toUpperCase()})
              </label>
              <textarea
                id={`term-ex-${activeTab}`}
                rows={2}
                className="form-textarea"
                placeholder={t('formExPh')}
                value={formData[activeTab].example}
                onChange={e => handleFieldChange(activeTab, 'example', e.target.value)}
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {t('cancelBtn')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{t('saveBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
