import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ArrowLeft, ArrowRight, Shuffle, RotateCcw, Globe, ChevronDown, Check } from 'lucide-react';

export default function FlashcardTrainer({ isOpen, onClose, terms = [] }) {
  const { lang, setLang, getCategoryLabel, t } = useLanguage();
  const [deck, setDeck] = useState(() => [...terms]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

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

  const handleNext = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % deck.length);
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleShuffle = useCallback(() => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleFlip, handleNext, handlePrev]);

  if (!isOpen || deck.length === 0) return null;

  const currentTerm = deck[currentIndex];
  const langData = currentTerm?.[lang] || currentTerm?.ru || currentTerm?.en || currentTerm?.uz || {};
  const termTitle = langData.term || '—';
  const definition = langData.definition || '—';
  const example = langData.example || '';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container quiz-modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header quiz-modal-header">
          <div className="quiz-header-info">
            <h3 className="modal-title">{t('quizTitle')}</h3>
          </div>

          <div className="quiz-header-actions">
            {/* Language Dropdown Curtain ("Шторка") */}
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
                title="Выбрать язык карточек / Select language"
              >
                <Globe size={13} className="lang-globe-icon" />
                <span className="lang-current-code">{lang.toUpperCase()}</span>
                <ChevronDown
                  size={12}
                  className={`lang-chevron-icon ${isLangDropdownOpen ? 'rotated' : ''}`}
                />
              </button>

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

        {/* 3D Flip Card */}
        <div className="quiz-stage">
          <div
            className={`quiz-flip-card ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
            tabIndex={0}
            role="button"
            aria-label="Перевернуть карточку"
          >
            <div className="flip-card-inner">
              {/* Front side: Term */}
              <div className="flip-card-front">
                <div className="card-top-row">
                  <span className={`category-tag category-tag-${currentTerm.category || 'other'}`}>
                    {getCategoryLabel(currentTerm.category || 'other')}
                  </span>
                  <span className="card-side-label">{t('cardSideTerm')}</span>
                </div>

                <div className="front-center">
                  <h2 className="quiz-term-title">{termTitle}</h2>
                </div>

                <div className="card-bottom-hint">
                  <RotateCcw size={14} />
                  <span>{t('flipHint')}</span>
                </div>
              </div>

              {/* Back side: Definition & Example */}
              <div className="flip-card-back">
                <div className="card-top-row">
                  <span className={`category-tag category-tag-${currentTerm.category || 'other'}`}>
                    {getCategoryLabel(currentTerm.category || 'other')}
                  </span>
                  <span className="card-side-label">{t('cardSideDef')}</span>
                </div>

                <div className="back-content">
                  <p className="quiz-definition">{definition}</p>
                  {example && (
                    <div className="quiz-example-box">
                      <strong>{t('exampleLabel')}:</strong>
                      <p>{example}</p>
                    </div>
                  )}
                </div>

                <div className="card-bottom-hint">
                  <RotateCcw size={14} />
                  <span>{t('flipHint')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="quiz-controls">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrev}
            title="Предыдущая карточка (Стрелка влево)"
          >
            <ArrowLeft size={16} />
            <span>{t('prevCard')}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleShuffle}
            title="Перемешать колоду"
          >
            <Shuffle size={16} />
            <span>{t('shuffleCards')}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            title="Следующая карточка (Стрелка вправо)"
          >
            <span>{t('nextCard')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
