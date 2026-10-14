import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { X, Copy, Check, Bookmark, ChevronLeft, ChevronRight, Languages } from 'lucide-react';

export default function TermDetailModal({
  isOpen,
  term,
  onClose,
  onNext,
  onPrev,
  totalCount
}) {
  const { lang, getCategoryLabel, t } = useLanguage();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [copiedLang, setCopiedLang] = useState(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !term) return null;

  const langData = term[lang] || term.ru || term.en || term.uz || {};
  const termTitle = langData.term || term.ru?.term || term.en?.term || term.uz?.term || '—';
  const definition = langData.definition || '—';
  const example = langData.example || '';

  // All available translations
  const langList = [
    { code: 'uz', name: 'O‘zbekcha', data: term.uz },
    { code: 'ru', name: 'Русский', data: term.ru },
    { code: 'en', name: 'English', data: term.en }
  ].filter(l => l.data?.term);

  const handleCopyAll = () => {
    let textToCopy = `${termTitle}\n\n${definition}`;
    if (example) {
      textToCopy += `\n\n${t('exampleLabel')}: ${example}`;
    }

    const translations = langList
      .filter(l => l.code !== lang)
      .map(l => `${l.code.toUpperCase()}: ${l.data.term}`)
      .join('\n');

    if (translations) {
      textToCopy += `\n\n${t('languagesLabel') || 'Tarjimalar'}:\n${translations}`;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      showToast(t('copySuccess'), 'success', 2000);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleCopySingle = (lCode, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLang(lCode);
      showToast(t('copySuccess'), 'success', 1500);
      setTimeout(() => setCopiedLang(null), 1500);
    }).catch(() => {});
  };

  return (
    <div className="modal-overlay term-detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="term-modal-title">
      <div className="modal-container term-detail-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header term-detail-header">
          <div className="term-detail-meta">
            <span className={`category-tag category-tag-${term.category || 'other'}`}>
              {getCategoryLabel(term.category || 'other')}
            </span>
          </div>

          <div className="term-detail-header-actions">
            <button
              type="button"
              className="card-action-btn"
              onClick={handleCopyAll}
              title={t('copySuccess')}
              aria-label="Copy all term data"
            >
              {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
            </button>
            <button
              type="button"
              className="icon-btn modal-close-btn"
              onClick={onClose}
              aria-label={t('close')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="term-detail-body">
          {/* Main Term Title */}
          <h2 id="term-modal-title" className="term-detail-title">
            {termTitle}
          </h2>

          {/* Translations Pill List */}
          {langList.length > 0 && (
            <div className="term-detail-translations">
              <div className="term-detail-section-title">
                <Languages size={14} />
                <span>{t('languagesLabel') || 'Tarjimalar / Переводы'}</span>
              </div>
              <div className="term-detail-translations-grid">
                {langList.map(item => {
                  const isCurrent = item.code === lang;
                  return (
                    <div
                      key={item.code}
                      className={`term-detail-trans-card ${isCurrent ? 'active-lang' : ''}`}
                      onClick={() => handleCopySingle(item.code, item.data.term)}
                      title="Nusxalash uchun bosing"
                    >
                      <div className="trans-card-header">
                        <span className="trans-code">{item.code.toUpperCase()}</span>
                        <span className="trans-name">{item.name}</span>
                        <span className="trans-copy-icon">
                          {copiedLang === item.code ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                        </span>
                      </div>
                      <div className="trans-term-val">{item.data.term}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Definition */}
          <div className="term-detail-section">
            <span className="term-detail-section-title">
              {t('definitionLabel') || t('formDefLabel') || 'Taʼrif / Определение'}
            </span>
            <div className="term-detail-definition-card">
              <p className="term-detail-definition-text">{definition}</p>
            </div>
          </div>

          {/* Example / Formula */}
          {example && (
            <div className="term-detail-section">
              <div className="term-detail-example-card">
                <div className="example-header">
                  <Bookmark size={15} className="example-icon" />
                  <span className="example-label">{t('exampleLabel')}</span>
                </div>
                <p className="example-body">{example}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Prev / Next Navigation only */}
        {totalCount && totalCount > 1 && (
          <div className="modal-footer term-detail-footer">
            <div className="term-detail-nav-group">
              <button
                type="button"
                className="btn btn-secondary btn-sm nav-btn"
                onClick={onPrev}
                title={t('termNavPrev') || 'Предыдущий'}
              >
                <ChevronLeft size={16} />
                <span className="nav-btn-text">{t('termNavPrev') || 'Предыдущий'}</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm nav-btn"
                onClick={onNext}
                title={t('termNavNext') || 'Следующий'}
              >
                <span className="nav-btn-text">{t('termNavNext') || 'Следующий'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
