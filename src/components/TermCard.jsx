import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Copy, Check, Bookmark, Calendar } from 'lucide-react';

export default function TermCard({ term }) {
  const { lang, getCategoryLabel, t } = useLanguage();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Extract term info in active language or fallback
  const langData = term[lang] || term.ru || term.en || term.uz || {};
  const termTitle = langData.term || term.en?.term || term.ru?.term || '—';
  const definition = langData.definition || '—';
  const example = langData.example || '';

  // Other languages for preview pills
  const otherLangs = ['ru', 'en', 'uz'].filter(l => l !== lang && term[l]?.term);

  const handleCopy = () => {
    const textToCopy = `${termTitle}\n\n${definition}${example ? `\n\nПример/Формула: ${example}` : ''}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      showToast(t('copySuccess'), 'success', 2000);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback
    });
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <article className="term-card" id={`term-${term.id}`}>
      <div className="term-card-header">
        <span className={`category-tag category-tag-${term.category || 'other'}`}>
          {getCategoryLabel(term.category || 'other')}
        </span>

        <button
          type="button"
          className="card-action-btn copy-btn"
          onClick={handleCopy}
          title="Копировать термин и определение"
          aria-label="Copy term content"
        >
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        </button>
      </div>

      <h3 className="term-card-title">{termTitle}</h3>

      {/* Multilingual preview pills */}
      {otherLangs.length > 0 && (
        <div className="term-alt-langs">
          {otherLangs.map(l => (
            <span key={l} className="alt-lang-pill" title={`${l.toUpperCase()}: ${term[l].term}`}>
              <span className="alt-lang-code">{l.toUpperCase()}</span>
              <span className="alt-lang-text">{term[l].term}</span>
            </span>
          ))}
        </div>
      )}

      <p className="term-card-definition">{definition}</p>

      {example && (
        <div className="term-card-example">
          <div className="example-header">
            <Bookmark size={13} className="example-icon" />
            <span className="example-label">{t('exampleLabel')}</span>
          </div>
          <p className="example-body">{example}</p>
        </div>
      )}

      {term.dateAdded && (
        <div className="term-card-footer">
          <span className="term-date">
            <Calendar size={12} />
            <span>{formatDate(term.dateAdded)}</span>
          </span>
        </div>
      )}
    </article>
  );
}
