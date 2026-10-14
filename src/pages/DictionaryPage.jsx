import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTerms } from '../context/TermsContext';
import CategoryFilter from '../components/CategoryFilter';
import AlphabetFilter from '../components/AlphabetFilter';
import TermCard from '../components/TermCard';
import TermDetailModal from '../components/TermDetailModal';
import FlashcardTrainer from '../components/FlashcardTrainer';
import { Search, X, GraduationCap, FilterX } from 'lucide-react';

export default function DictionaryPage({ isQuizOpen, setIsQuizOpen }) {
  const { lang, t } = useLanguage();
  const { terms } = useTerms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);

  // Available letters from terms in current language
  const availableLetters = useMemo(() => {
    const letters = new Set();
    terms.forEach(term => {
      const termTitle = term[lang]?.term || term.ru?.term || term.en?.term || term.uz?.term || '';
      if (termTitle) {
        const firstLetter = termTitle.trim()[0]?.toUpperCase();
        if (firstLetter) letters.add(firstLetter);
      }
    });
    return letters;
  }, [terms, lang]);

  // Filtered terms based on search, category, and alphabet
  const filteredTerms = useMemo(() => {
    return terms.filter(item => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Alphabet Filter
      if (selectedLetter) {
        const title = (item[lang]?.term || item.ru?.term || item.en?.term || item.uz?.term || '').trim();
        if (!title.toUpperCase().startsWith(selectedLetter.toUpperCase())) {
          return false;
        }
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const ruMatch = (item.ru?.term || '').toLowerCase().includes(q) ||
                        (item.ru?.definition || '').toLowerCase().includes(q) ||
                        (item.ru?.example || '').toLowerCase().includes(q);
        const enMatch = (item.en?.term || '').toLowerCase().includes(q) ||
                        (item.en?.definition || '').toLowerCase().includes(q) ||
                        (item.en?.example || '').toLowerCase().includes(q);
        const uzMatch = (item.uz?.term || '').toLowerCase().includes(q) ||
                        (item.uz?.definition || '').toLowerCase().includes(q) ||
                        (item.uz?.example || '').toLowerCase().includes(q);
        return ruMatch || enMatch || uzMatch;
      }

      return true;
    });
  }, [terms, selectedCategory, selectedLetter, searchQuery, lang]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter(null);
  };

  // Find index of selected term in currently filtered list
  const selectedTermIndex = useMemo(() => {
    if (!selectedTerm) return -1;
    return filteredTerms.findIndex(t => t.id === selectedTerm.id);
  }, [selectedTerm, filteredTerms]);

  const handleNextTerm = () => {
    if (filteredTerms.length <= 1 || selectedTermIndex === -1) return;
    const nextIdx = (selectedTermIndex + 1) % filteredTerms.length;
    setSelectedTerm(filteredTerms[nextIdx]);
  };

  const handlePrevTerm = () => {
    if (filteredTerms.length <= 1 || selectedTermIndex === -1) return;
    const prevIdx = (selectedTermIndex - 1 + filteredTerms.length) % filteredTerms.length;
    setSelectedTerm(filteredTerms[prevIdx]);
  };

  return (
    <main className="dictionary-main">
      {/* Hero Search Section */}
      <section className="hero-search-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('appTitle')}</h1>
          <p className="hero-subtitle">{t('appSub')}</p>

          <div className="search-bar-wrap">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder={t('searchPh')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search dictionary terms"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="content-container">
        {/* Category Chips Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={catId => {
            setSelectedCategory(catId);
            setSelectedLetter(null);
          }}
          terms={terms}
        />

        {/* Horizontal Alphabet Navigator */}
        <AlphabetFilter
          selectedLetter={selectedLetter}
          onSelectLetter={setSelectedLetter}
          availableLetters={availableLetters}
        />

        {/* Statistics & Quick Actions Bar */}
        <div className="stats-row">
          <div className="stats-counters">
            <span className="stats-label">{t('totalStats')}<strong>{terms.length}</strong></span>
            {(searchQuery || selectedCategory !== 'all' || selectedLetter) && (
              <span className="stats-found">
                • {t('foundStats')}<strong>{filteredTerms.length}</strong>
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm quiz-trigger-btn"
            onClick={() => setIsQuizOpen(true)}
            title={t('quizTitle')}
          >
            <GraduationCap size={16} />
            <span>{t('quizBtn')}</span>
          </button>
        </div>

        {/* Terms Feed Grid */}
        {filteredTerms.length > 0 ? (
          <div className="terms-grid">
            {filteredTerms.map(term => (
              <TermCard
                key={term.id}
                term={term}
                onSelect={setSelectedTerm}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <FilterX size={42} />
            </div>
            <h3 className="empty-title">
              {searchQuery ? t('noSearchResults', searchQuery) : t('emptyTitle')}
            </h3>
            <p className="empty-desc">
              {searchQuery ? 'Попробуйте изменить поисковый запрос или сбросить фильтры.' : t('emptyDesc')}
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm reset-btn"
              onClick={handleResetFilters}
            >
              {t('resetFilters')}
            </button>
          </div>
        )}
      </div>

      {/* Term Detail Modal */}
      {selectedTerm && (
        <TermDetailModal
          isOpen={Boolean(selectedTerm)}
          term={selectedTerm}
          onClose={() => setSelectedTerm(null)}
          onNext={filteredTerms.length > 1 ? handleNextTerm : undefined}
          onPrev={filteredTerms.length > 1 ? handlePrevTerm : undefined}
          totalCount={filteredTerms.length}
        />
      )}

      {/* Flashcard Trainer Modal */}
      {isQuizOpen && (
        <FlashcardTrainer
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          terms={filteredTerms.length > 0 ? filteredTerms : terms}
        />
      )}
    </main>
  );
}
