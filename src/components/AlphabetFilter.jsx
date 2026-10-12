import { useLanguage } from '../context/LanguageContext';
import { getAlphabetForLanguage } from '../constants/alphabets';

export default function AlphabetFilter({ selectedLetter, onSelectLetter, availableLetters = new Set() }) {
  const { lang, t } = useLanguage();
  const alphabet = getAlphabetForLanguage(lang);

  return (
    <div className="alphabet-filter-wrap" role="toolbar" aria-label="Алфавитный навигатор">
      <div className="alphabet-scroll-container">
        <button
          type="button"
          className={`alphabet-btn all-btn ${!selectedLetter ? 'active' : ''}`}
          onClick={() => onSelectLetter(null)}
        >
          {t('allAlphabet')}
        </button>

        {alphabet.map(letter => {
          const isSelected = selectedLetter === letter;
          const hasTerms = availableLetters.has(letter.toUpperCase());

          return (
            <button
              key={letter}
              type="button"
              className={`alphabet-btn ${isSelected ? 'active' : ''} ${hasTerms ? 'has-terms' : 'disabled-letter'}`}
              onClick={() => onSelectLetter(isSelected ? null : letter)}
              disabled={!hasTerms && !isSelected}
              title={hasTerms ? `Буква ${letter}` : `Нет терминов на букву ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
